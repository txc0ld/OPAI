#!/usr/bin/env -S npx tsx
/**
 * @aao/check-cli
 *
 * Operator accelerator for the Free AI Check SOP.
 *
 * Automates the grunt work of a free AI visibility check for a trade business:
 *   1. Builds prompts from the business/suburb/trade inputs.
 *   2. Gathers answers from Perplexity, OpenAI, and Gemini (each skipped
 *      gracefully if the API key is missing).
 *   3. Fetches Google Places data and runs a PageSpeed check (both skipped
 *      gracefully if GOOGLE_MAPS_API_KEY is missing).
 *   4. Fetches the business website and checks basic content signals.
 *   5. Scores each dimension Red/Amber/Green.
 *   6. Calls Claude (Opus 4.8) to draft the structured JSON report.
 *   7. Renders a premium branded HTML report + plain-text fallback.
 *   8. Writes <slug>-<date>.html (primary) + <slug>-<date>.txt + log CSV. Never sends.
 *
 * Missing API keys are never thrown — each gatherer returns a graceful
 * "available: false" result and the pipeline continues. Key values are
 * never logged.
 */

import { Command } from "commander";
import pc from "picocolors";
import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";

import { keyStatus, ENV } from "./src/config.js";
import { CheckInputSchema, defaultUrgentJob } from "./src/types.js";
import type { GatheredData } from "./src/types.js";
import { gatherPerplexity } from "./src/gather/perplexity.js";
import { gatherOpenAI } from "./src/gather/openai.js";
import { gatherGemini } from "./src/gather/gemini.js";
import { gatherPlaces } from "./src/gather/places.js";
import { gatherWebsite } from "./src/gather/website.js";
import { gatherPageSpeed } from "./src/gather/pagespeed.js";
import { computeTriage } from "./src/triage.js";
import { renderReport } from "./src/report.js";
import { renderReportHtml, renderReportText, minimalReportData } from "./src/report-html.js";
import { appendLog } from "./src/log.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function writeText(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
  fs.writeFileSync(path.resolve(filePath), content, "utf8");
}

function ragLabel(rag: string): string {
  switch (rag) {
    case "G": return pc.green("G (Green)");
    case "A": return pc.yellow("A (Amber)");
    case "R": return pc.red("R (Red)");
    default:  return rag;
  }
}

function printRagTable(triage: ReturnType<typeof computeTriage>): void {
  console.log(pc.bold("\nTriage"));
  console.log(`  AI visibility:  ${ragLabel(triage.aiVisibility)}`);
  console.log(`  GBP:            ${ragLabel(triage.gbp)}`);
  console.log(`  website:        ${ragLabel(triage.website)}`);
  console.log(`  reviews:        ${ragLabel(triage.reviews)}`);
  console.log(`  directory:      ${ragLabel(triage.directory)}`);
  console.log(`\n  Headline: ${triage.headline}`);
}

/**
 * Build the 5 prompts for the check. The prompts are designed to surface:
 *   0. Emergency/urgent job recommendation (most commercially sensitive)
 *   1. Specific job type recommendation (shows up in category searches)
 *   2. General trade recommendation in suburb (broad awareness)
 *   3. Best trade for a specific task (comparison prompt)
 *   4. Reviews search (brand-name check)
 */
function buildPrompts(
  business: string,
  suburb: string,
  trade: string,
  urgentJob: string,
  specificJob?: string,
): string[] {
  const specificJobLine = specificJob ?? `${trade} services`;
  return [
    `Who do I call for a ${urgentJob} in ${suburb}? Give me 3 specific local businesses.`,
    `Best ${trade} for ${specificJobLine} in ${suburb}? Top 3 with reasons.`,
    `Recommend a reliable ${trade} near ${suburb}. Who comes up most?`,
    `Who is the best ${trade} in ${suburb}?`,
    `"${business}" ${suburb} reviews — what are people saying?`,
  ];
}

// ---------------------------------------------------------------------------
// Run command
// ---------------------------------------------------------------------------

async function cmdRun(opts: {
  business: string;
  suburb: string;
  trade: string;
  url?: string;
  phone?: string;
  urgentJob?: string;
  specificJob?: string;
  outputDir: string;
  dryRun: boolean;
}): Promise<void> {
  console.log(pc.bold("ai-check run"));

  // Validate inputs via Zod.
  const parseResult = CheckInputSchema.safeParse({
    business: opts.business,
    suburb: opts.suburb,
    trade: opts.trade,
    url: opts.url,
    phone: opts.phone,
    urgentJob: opts.urgentJob,
    specificJob: opts.specificJob,
  });

  if (!parseResult.success) {
    console.error(pc.red("Input validation failed:"));
    for (const issue of parseResult.error.issues) {
      console.error(`  - ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    process.exit(1);
  }

  const input = parseResult.data;
  const urgentJob = input.urgentJob ?? defaultUrgentJob(input.trade);
  const prompts = buildPrompts(input.business, input.suburb, input.trade, urgentJob, input.specificJob);

  // Print key status (presence only — never log values).
  console.log(pc.bold("\nAPI key status:"));
  for (const { name, present } of keyStatus()) {
    console.log(`  ${present ? pc.green("present") : pc.yellow("absent ")}  ${name}`);
  }

  console.log(pc.bold("\nPrompts that would be sent:"));
  prompts.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));

  if (opts.dryRun) {
    console.log(pc.bold("\nSources that would run:"));
    console.log(`  Perplexity:      ${ENV.perplexity ? pc.green("would run") : pc.yellow("would skip (no key)")}`);
    console.log(`  ChatGPT:         ${ENV.openai    ? pc.green("would run") : pc.yellow("would skip (no key)")}`);
    console.log(`  Gemini:          ${ENV.gemini    ? pc.green("would run") : pc.yellow("would skip (no key)")}`);
    console.log(`  Google Places:   ${ENV.google    ? pc.green("would run") : pc.yellow("would skip (no key)")}`);
    console.log(`  Website:         ${input.url     ? pc.green("would run") : pc.yellow("would skip (no URL)")}`);
    console.log(`  PageSpeed:       ${(ENV.google && input.url) ? pc.green("would run") : pc.yellow("would skip")}`);
    console.log(`  Claude report:   ${ENV.anthropic ? pc.green("would run") : pc.yellow("would skip (no key)")}`);
    console.log(pc.green("\ndry-run OK — no API calls made"));
    return;
  }

  // ---------------------------------------------------------------------------
  // Live run — gather data from all sources.
  // ---------------------------------------------------------------------------

  const today = new Date().toISOString().slice(0, 10);
  const meta = { business: input.business, suburb: input.suburb, date: today };

  console.log(pc.bold("\nGathering data..."));

  // Run AI engines + Places in parallel; website + pagespeed can follow.
  const [perplexity, openai, gemini, places] = await Promise.all([
    gatherPerplexity(prompts).then((r) => {
      console.log(`  Perplexity:    ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
    gatherOpenAI(prompts).then((r) => {
      console.log(`  ChatGPT:       ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
    gatherGemini(prompts).then((r) => {
      console.log(`  Gemini:        ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
    gatherPlaces(input.business, input.suburb).then((r) => {
      console.log(`  Google Places: ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
  ]);

  const [website, pagespeed] = await Promise.all([
    gatherWebsite(input.url, input.suburb).then((r) => {
      console.log(`  Website:       ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
    gatherPageSpeed(input.url).then((r) => {
      console.log(`  PageSpeed:     ${r.available ? pc.green("ran") : pc.yellow(`skipped — ${r.note}`)}`);
      return r;
    }),
  ]);

  // Bundle gathered data.
  const data: GatheredData = {
    input,
    prompts,
    perplexity,
    openai,
    gemini,
    places,
    website,
    pagespeed,
  };

  // Triage.
  const triage = computeTriage(data);
  printRagTable(triage);

  // Output file paths.
  const slug = slugify(input.business);
  const filename = `${slug}-${today}`;
  const outputDir = path.resolve(opts.outputDir);

  let htmlContent: string;
  let textContent: string;

  if (ENV.anthropic) {
    // Full report via Claude.
    console.log(pc.bold("\n[Claude] Drafting report..."));
    const client = new Anthropic({ apiKey: ENV.anthropic });
    const result = await renderReport(client, input, data, triage, today);
    htmlContent = result.html;
    textContent = result.text;
    console.log(pc.green("  report drafted"));
  } else {
    // Fallback: render a minimal HTML + text report from triage data.
    console.log(pc.yellow("\n[Claude] skipped — ANTHROPIC_API_KEY not set"));
    console.log(pc.yellow("  Writing fallback report (still useful for manual review)."));

    const enginesRan = [perplexity, openai, gemini]
      .filter((e) => e.available)
      .map((e) => e.engine)
      .join(", ") || "none";

    const fallbackData = minimalReportData(
      `Claude report skipped (no API key). Engines that ran: ${enginesRan}. Triage: ${triage.headline}`,
    );
    htmlContent = renderReportHtml(fallbackData, meta);
    textContent = renderReportText(fallbackData, meta);
  }

  // Write HTML report (primary deliverable).
  const htmlPath = path.join(outputDir, `${filename}.html`);
  writeText(htmlPath, htmlContent);

  // Write plain-text version alongside.
  const textPath = path.join(outputDir, `${filename}.txt`);
  writeText(textPath, textContent);

  // Append log row.
  appendLog(outputDir, {
    date: today,
    business: input.business,
    trade: input.trade,
    suburb: input.suburb,
    top_finding: triage.headline,
    ai_visibility: triage.aiVisibility,
    gbp: triage.gbp,
    website: triage.website,
    reviews: triage.reviews,
    directory: triage.directory,
  });

  const logPath = path.join(outputDir, "checks-log.csv");

  console.log(pc.bold("\nDone."));
  console.log(`  HTML report: ${htmlPath}`);
  console.log(`  Text report: ${textPath}`);
  console.log(`  Log:         ${logPath}`);
  console.log(pc.yellow("\n  Review before sending. This is a draft."));
}

// ---------------------------------------------------------------------------
// CLI plumbing
// ---------------------------------------------------------------------------

const program = new Command();
program
  .name("ai-check")
  .description("Operator accelerator for the Free AI Check: gather AI + Google signals and draft the report.")
  .version("0.1.0");

program
  .command("run")
  .description("Run the Free AI Check for a trade business.")
  .requiredOption("--business <s>", "Business trading name")
  .requiredOption("--suburb <s>", "Suburb to search within")
  .requiredOption("--trade <s>", "Trade type (e.g. plumber, electrician)")
  .option("--url <s>", "Business website URL")
  .option("--phone <s>", "Business phone number")
  .option("--urgent-job <s>", "Urgent job phrase (e.g. 'burst pipe'); derived from trade if omitted")
  .option("--specific-job <s>", "Specific job type (e.g. 'hot water system install')")
  .option("--output-dir <s>", "Directory to write outputs into", "./checks")
  .option("--dry-run", "Print key status + prompts; make no API calls", false)
  .action(async (opts) => {
    try {
      await cmdRun({
        business: opts.business as string,
        suburb: opts.suburb as string,
        trade: opts.trade as string,
        url: opts.url as string | undefined,
        phone: opts.phone as string | undefined,
        urgentJob: opts.urgentJob as string | undefined,
        specificJob: opts.specificJob as string | undefined,
        outputDir: opts.outputDir as string,
        dryRun: opts.dryRun as boolean,
      });
    } catch (err) {
      if (err instanceof Anthropic.APIError) {
        console.error(pc.red(`\nFAILED: Anthropic API ${err.status} — ${err.message}`));
        const retry = err.headers?.["retry-after"];
        if (retry) console.error(pc.dim(`  retry-after: ${retry}`));
      } else {
        console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
      }
      process.exit(1);
    }
  });

program.parseAsync(process.argv).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.error(pc.red(`\nFAILED: Anthropic API ${err.status} — ${err.message}`));
    const retry = err.headers?.["retry-after"];
    if (retry) console.error(pc.dim(`  retry-after: ${retry}`));
  } else {
    console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
  }
  process.exit(1);
});
