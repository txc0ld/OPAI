/**
 * web/lib/check/run.ts
 *
 * Orchestrates the full gather → triage → report pipeline.
 * Returns { html, text, triage } — never throws (callers must wrap in try/catch).
 */

import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "./config";
import { urgentJobFor } from "./types";
import type { CheckInput, GatheredData, Triage } from "./types";
import { gatherPerplexity } from "./gather/perplexity";
import { gatherOpenAI } from "./gather/openai";
import { gatherGemini } from "./gather/gemini";
import { gatherPlaces } from "./gather/places";
import { gatherWebsite } from "./gather/website";
import { gatherPageSpeed } from "./gather/pagespeed";
import { computeTriage } from "./triage";
import { renderReport } from "./report";
import { renderReportHtml, renderReportText, minimalReportData } from "./report-html";

export interface RunResult {
  html: string;
  text: string;
  triage: Triage;
}

/**
 * Normalise a free-text trade for natural prompt phrasing: lowercase, and turn
 * "Builder / carpenter" into "builder or carpenter".
 */
function tradePhrase(trade: string): string {
  return trade.replace(/\s*\/\s*/g, " or ").toLowerCase().trim();
}

/** "a" or "an" for the following word (best-effort; free-text is ~always singular). */
function aOrAn(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a";
}

/**
 * Build the 5 prompts for the check — one per real LLM local-search intent,
 * phrased conversationally and safe for any free-text trade:
 *   0. Best / high-intent
 *   1. Recommendation / near-me
 *   2. Immediacy — emergency phrasing if the trade has one, else "book this week"
 *   3. Trust / reviews
 *   4. Brand-name reputation check
 */
function buildPrompts(business: string, suburb: string, trade: string, urgentJob?: string): string[] {
  const t = tradePhrase(trade);
  const immediacy = urgentJob
    ? `Who do I call for ${aOrAn(urgentJob)} ${urgentJob} in ${suburb} right now? Give me 3 specific local businesses.`
    : `I need ${aOrAn(t)} ${t} in ${suburb} as soon as possible — who can I book this week?`;
  return [
    `Who's the best ${t} in ${suburb}, Perth? Name 2-3 you'd recommend and why.`,
    `I need ${aOrAn(t)} ${t} near ${suburb} — who would you recommend, and who comes up most often?`,
    immediacy,
    `What's a trusted ${t} near ${suburb} with genuinely good reviews?`,
    `"${business}" in ${suburb} — what do people say about them, and are they any good?`,
  ];
}

export async function runCheck(input: CheckInput): Promise<RunResult> {
  const urgentJob = input.urgentJob ?? urgentJobFor(input.trade);
  const prompts = buildPrompts(input.business, input.suburb, input.trade, urgentJob);

  // Run all six gatherers in parallel — none depend on each other, so this
  // collapses the gather phase to the slowest single source (was two batches).
  const [perplexity, openai, gemini, places, website, pagespeed] = await Promise.all([
    gatherPerplexity(prompts),
    gatherOpenAI(prompts),
    gatherGemini(prompts),
    gatherPlaces(input.business, input.suburb),
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
  const meta = { business: input.business, suburb: input.suburb, date: today };

  if (!ENV.anthropic) {
    // No Claude key — return a minimal HTML so the email is still useful.
    const enginesRan = [perplexity, openai, gemini]
      .filter((e) => e.available)
      .map((e) => e.engine)
      .join(", ") || "none";

    const fallbackData = minimalReportData(
      `Claude report skipped (no API key). Engines that ran: ${enginesRan}. Triage: ${triage.headline}`,
    );
    const html = renderReportHtml(fallbackData, meta);
    const text = renderReportText(fallbackData, meta);
    return { html, text, triage };
  }

  const client = new Anthropic({ apiKey: ENV.anthropic });
  const result = await renderReport(client, input, data, triage, today);

  return { html: result.html, text: result.text, triage };
}
