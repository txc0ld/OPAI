/**
 * src/report.ts
 *
 * Calls Claude (Opus 4.8) to fill in the Phase-3 one-page report template
 * using ONLY the gathered data. Never fabricates; never sends.
 */

import Anthropic from "@anthropic-ai/sdk";
import { MODELS, PRICING } from "./config.js";
import type { CheckInput, GatheredData, Triage } from "./types.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReportUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

export interface ReportResult {
  markdown: string;
  usage: ReportUsage;
}

// ---------------------------------------------------------------------------
// Cost logging (mirrors audit-cli pattern)
// ---------------------------------------------------------------------------

function estimateCostUsd(usage: ReportUsage): number {
  const baseInput = (usage.input_tokens || 0) / 1_000_000;
  const cacheWrite = (usage.cache_creation_input_tokens || 0) / 1_000_000;
  const cacheRead = (usage.cache_read_input_tokens || 0) / 1_000_000;
  const output = (usage.output_tokens || 0) / 1_000_000;
  return (
    baseInput * PRICING.input +
    cacheWrite * PRICING.cacheWrite +
    cacheRead * PRICING.cacheRead +
    output * PRICING.output
  );
}

export function logReportUsage(usage: ReportUsage, ms: number): void {
  const cost = estimateCostUsd(usage);
  const dur = ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
  const u = usage;
  const input = u?.input_tokens ?? 0;
  const output = u?.output_tokens ?? 0;
  const cacheWrite = u?.cache_creation_input_tokens ?? 0;
  const cacheRead = u?.cache_read_input_tokens ?? 0;
  console.log(`  model:              ${MODELS.report}`);
  console.log(`  duration:           ${dur}`);
  console.log(
    `  input tokens:       ${input}` +
      (cacheWrite ? ` (+${cacheWrite} cache write)` : "") +
      (cacheRead ? ` (+${cacheRead} cache read)` : ""),
  );
  console.log(`  output tokens:      ${output}`);
  console.log(`  estimated cost USD: $${cost.toFixed(4)}`);
}

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are drafting a one-page "Free AI Check" report for a Perth trade business.

Brand voice: blunt, plain-English Perth tradie tone. en-AU spelling. No em-dashes. No marketing hype. Short sentences. State facts, name specifics.

Three non-negotiable rules:
1. NEVER FABRICATE — use ONLY the data supplied in the user message. If something wasn't gathered (available: false), write "couldn't check automatically — worth a manual look." Do not invent competitor names, review counts, or scores.
2. DATED SNAPSHOT — frame the whole report as a point-in-time snapshot. AI results move around; the underlying issues are more stable.
3. HONESTY — if the business looks great on a dimension, say so. Do not invent problems to create urgency. Only flag real issues from the data.`;

const PHASE3_TEMPLATE = `**AI Check — [Business], [Suburb]**
*Checked [date] across [engines that ran].*

**The short version:** [one line: absent / wrong info / outranked — or "looks solid"].

**What I asked the AI:**
- "[prompt 1]"
- "[prompt 2]"
- "[prompt 3]"

**What it said about you:** [real result summary; if absent, name the competitors it recommended instead; if Perplexity ran, note the sources it cited].

**The #1 thing costing you jobs right now:** [the headline Red finding, specific — or note they look solid if no Reds].

**Two quick wins:** [two actionable items, grounded in the data].

**Where this could be:** [one sentence on the realistic upside if the gaps are fixed].

*Checked [date] — AI results move around, so this is a snapshot; the underlying issues are stable.*

---

**Want to fix it yourself?**
1. [DIY step 1 — derived from the biggest gap]
2. [DIY step 2]
3. Ask AI assistants directly: search "[business name] [suburb]" in ChatGPT and Google AI and screenshot what comes back.

**Want us to handle it?**
[Done-for-you offer placeholder — operator to personalise before sending]`;

const CONVERSION_FOOTER = `

---

*This report was prepared as a complimentary AI Check. It's a draft for operator review — not a final deliverable. Review all findings before sharing.*`;

function buildUserPrompt(
  input: CheckInput,
  data: GatheredData,
  triage: Triage,
  today: string,
): string {
  const enginesRan = [data.perplexity, data.openai, data.gemini]
    .filter((e) => e.available)
    .map((e) => e.engine);

  const enginesSkipped = [data.perplexity, data.openai, data.gemini]
    .filter((e) => !e.available)
    .map((e) => `${e.engine} (${e.note ?? "key not set"})`);

  return `Fill in the Phase-3 report template below using ONLY the gathered data provided. Do not invent anything not in the data.

For any dimension marked available: false, write "couldn't check automatically — worth a manual look."

Keep the report to one screen. End with the conversion section as templated.

---

TEMPLATE TO FILL:

${PHASE3_TEMPLATE}

${CONVERSION_FOOTER}

---

INPUTS:
${JSON.stringify({ business: input.business, suburb: input.suburb, trade: input.trade, url: input.url, phone: input.phone }, null, 2)}

PROMPTS ASKED:
${data.prompts.map((p, i) => `${i + 1}. ${p}`).join("\n")}

ENGINES THAT RAN: ${enginesRan.length > 0 ? enginesRan.join(", ") : "none"}
ENGINES SKIPPED: ${enginesSkipped.length > 0 ? enginesSkipped.join(", ") : "none"}

GATHERED DATA:
${JSON.stringify(data, null, 2)}

TRIAGE:
${JSON.stringify(triage, null, 2)}

TODAY: ${today}

SUGGESTED HEADLINE: ${triage.headline}

INSTRUCTIONS:
- Replace every [bracket] placeholder with real content from the data above.
- Engines that ran: list only ${enginesRan.length > 0 ? enginesRan.join(", ") : "none"}.
- For skipped engines/sources, say "couldn't check automatically — worth a manual look."
- If no engines ran, note in "What it said about you" that all AI checks were skipped and a manual spot-check in ChatGPT + Google AI is the immediate action.
- Keep it tight. One screen. Plain English. No em-dashes.`;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function renderReport(
  client: Anthropic,
  input: CheckInput,
  data: GatheredData,
  triage: Triage,
  today: string,
): Promise<ReportResult> {
  const userPrompt = buildUserPrompt(input, data, triage, today);

  const t0 = Date.now();
  const message = await client.messages.create({
    model: MODELS.report,
    max_tokens: 4000,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: userPrompt }],
  });
  const ms = Date.now() - t0;

  const markdown = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const u = message.usage;
  const usage: ReportUsage = {
    input_tokens: u?.input_tokens ?? 0,
    output_tokens: u?.output_tokens ?? 0,
    cache_creation_input_tokens: (u as ReportUsage)?.cache_creation_input_tokens ?? 0,
    cache_read_input_tokens: (u as ReportUsage)?.cache_read_input_tokens ?? 0,
  };

  logReportUsage(usage, ms);

  return { markdown, usage };
}
