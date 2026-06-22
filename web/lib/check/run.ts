/**
 * web/lib/check/run.ts
 *
 * Orchestrates the full gather → triage → report pipeline.
 * Returns { markdown, triage } — never throws (callers must wrap in try/catch).
 */

import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "./config";
import { defaultUrgentJob } from "./types";
import type { CheckInput, GatheredData, Triage } from "./types";
import { gatherPerplexity } from "./gather/perplexity";
import { gatherOpenAI } from "./gather/openai";
import { gatherGemini } from "./gather/gemini";
import { gatherPlaces } from "./gather/places";
import { gatherWebsite } from "./gather/website";
import { gatherPageSpeed } from "./gather/pagespeed";
import { computeTriage } from "./triage";
import { renderReport } from "./report";

export interface RunResult {
  markdown: string;
  triage: Triage;
}

/**
 * Build the 5 prompts for the check.
 *   0. Emergency/urgent job recommendation
 *   1. Specific job type recommendation
 *   2. General trade recommendation in suburb
 *   3. Best trade for a specific task
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

export async function runCheck(input: CheckInput): Promise<RunResult> {
  const urgentJob = input.urgentJob ?? defaultUrgentJob(input.trade);
  const prompts = buildPrompts(
    input.business,
    input.suburb,
    input.trade,
    urgentJob,
    input.specificJob,
  );

  // Run AI engines + Places in parallel; website + pagespeed follow.
  const [perplexity, openai, gemini, places] = await Promise.all([
    gatherPerplexity(prompts),
    gatherOpenAI(prompts),
    gatherGemini(prompts),
    gatherPlaces(input.business, input.suburb),
  ]);

  const [website, pagespeed] = await Promise.all([
    gatherWebsite(input.url, input.suburb),
    gatherPageSpeed(input.url),
  ]);

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

  const triage = computeTriage(data);

  const today = new Date().toISOString().slice(0, 10);

  if (!ENV.anthropic) {
    // No Claude key — return a minimal markdown summary so the email is still useful.
    const enginesRan = [perplexity, openai, gemini]
      .filter((e) => e.available)
      .map((e) => e.engine)
      .join(", ") || "none";

    const markdown = [
      `# AI Check — ${input.business}, ${input.suburb} (raw data)`,
      `*Checked ${today}. Claude report skipped — ANTHROPIC_API_KEY not set.*`,
      "",
      `**Engines that ran:** ${enginesRan}`,
      "",
      "## Triage",
      `- AI visibility: ${triage.aiVisibility}`,
      `- GBP: ${triage.gbp}`,
      `- Website: ${triage.website}`,
      `- Reviews: ${triage.reviews}`,
      `- Directory: ${triage.directory}`,
      `- Headline: ${triage.headline}`,
    ].join("\n");

    return { markdown, triage };
  }

  const client = new Anthropic({ apiKey: ENV.anthropic });
  const result = await renderReport(client, input, data, triage, today);

  return { markdown: result.markdown, triage };
}
