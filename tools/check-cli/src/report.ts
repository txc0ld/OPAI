/**
 * src/report.ts
 *
 * Calls Claude (Opus 4.8) to produce a structured JSON report for a Perth
 * local business AI visibility check. Returns rendered HTML + plain-text.
 * Never fabricates. Never sends.
 */

import Anthropic from "@anthropic-ai/sdk";
import { MODELS, PRICING } from "./config.js";
import type { CheckInput, GatheredData, Triage } from "./types.js";
import {
  renderReportHtml,
  renderReportText,
  minimalReportData,
  type ReportData,
} from "./report-html.js";

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
  data: ReportData;
  html: string;
  text: string;
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
// JSON schema description (for the prompt)
// ---------------------------------------------------------------------------

const JSON_SCHEMA = `{
  "headline": string,
  "askedPrompts": string[],
  "whatItSaid": string,
  "scorecard": [
    {"label":"AI visibility","rating":"R|A|G","note": string},
    {"label":"Google Business Profile","rating":"R|A|G","note": string},
    {"label":"Website readability","rating":"R|A|G","note": string},
    {"label":"Reviews","rating":"R|A|G","note": string},
    {"label":"Directories & consistency","rating":"R|A|G","note": string}
  ],
  "topIssue": {"title": string, "why": string},
  "fixes": [
    {"title": string, "effort": string, "steps": string[]}
  ],
  "quickWins": string[],
  "closing": string
}`;

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are producing a structured JSON report for a "Free AI Check" for a Perth local service business.

Brand voice: blunt, plain-English Perth local-business-owner tone. en-AU spelling. No em-dashes. No marketing hype. Short sentences. State facts, name specifics.

Four non-negotiable rules:
1. NEVER FABRICATE — use ONLY the data supplied in the user message. If something wasn't gathered (available: false), note it was not checked automatically. Do not invent competitor names, review counts, or scores.
2. DATED SNAPSHOT — frame content as a point-in-time snapshot. AI results move around; the underlying issues are more stable.
3. HONESTY — if the business looks great on a dimension, set rating "G" and say so. Do not invent problems to create urgency. Only flag real issues from the data.
4. JSON ONLY — return ONLY valid JSON matching the schema. No prose before or after. No markdown code fences. No comments. The response must start with { and end with }.`;

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

  return `Produce a structured JSON report for the AI visibility check below.

Return ONLY valid JSON matching this schema exactly:
${JSON_SCHEMA}

Field rules:
- headline: 1-2 plain sentences summarising where they stand (from the data).
- askedPrompts: exactly the prompts that were asked (copy from PROMPTS ASKED below).
- whatItSaid: 1 short paragraph — which competitors were named instead, any wrong info, sources cited (from GATHERED DATA only).
- scorecard: EXACTLY these 5 dimensions in this order. Rating must be "R", "A", or "G". Note must be 4-9 words. If a dimension wasn't gathered, set rating "A" and note "Not checked automatically".
- topIssue.title: the #1 specific thing costing jobs right now (the headline Red finding, or the biggest Amber if no Reds).
- topIssue.why: 1-2 sentences on why it costs them work, specific to their business type and suburb.
- fixes: 2-4 fixes, top issue first. Each fix must be fully actionable. effort e.g. "About 15 minutes". steps must be 3-7 clear imperative do-this-then-that instructions a busy owner can follow.
- quickWins: 2-3 short wins they can do today.
- closing: 1 sentence on the realistic upside if they fix the gaps.

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

SUGGESTED HEADLINE: ${triage.headline}`;
}

// ---------------------------------------------------------------------------
// Defensive JSON parser
// ---------------------------------------------------------------------------

function parseReportJson(raw: string, fallbackHeadline?: string): ReportData {
  // Strip accidental code fences if the model added them.
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "").trim();
  }

  // Find the outer { ... } in case there's leading/trailing prose.
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }

  try {
    const parsed = JSON.parse(cleaned) as Partial<ReportData>;

    // Ensure scorecard has exactly 5 rows with valid ratings.
    const LABELS = [
      "AI visibility",
      "Google Business Profile",
      "Website readability",
      "Reviews",
      "Directories & consistency",
    ] as const;

    const scorecard = LABELS.map((label, i) => {
      const row = parsed.scorecard?.[i];
      const rating = (row?.rating === "R" || row?.rating === "A" || row?.rating === "G")
        ? row.rating
        : "A";
      return {
        label,
        rating: rating as "R" | "A" | "G",
        note: typeof row?.note === "string" && row.note.trim() ? row.note.trim() : "Not checked automatically",
      };
    });

    return {
      headline: typeof parsed.headline === "string" ? parsed.headline : (fallbackHeadline ?? "AI check complete."),
      askedPrompts: Array.isArray(parsed.askedPrompts) ? parsed.askedPrompts.map(String) : [],
      whatItSaid: typeof parsed.whatItSaid === "string" ? parsed.whatItSaid : "",
      scorecard,
      topIssue: {
        title: typeof parsed.topIssue?.title === "string" ? parsed.topIssue.title : "See scorecard above",
        why: typeof parsed.topIssue?.why === "string" ? parsed.topIssue.why : "",
      },
      fixes: Array.isArray(parsed.fixes)
        ? parsed.fixes.map((f) => ({
            title: typeof f?.title === "string" ? f.title : "Fix",
            effort: typeof f?.effort === "string" ? f.effort : "",
            steps: Array.isArray(f?.steps) ? f.steps.map(String) : [],
          }))
        : [],
      quickWins: Array.isArray(parsed.quickWins) ? parsed.quickWins.map(String) : [],
      closing: typeof parsed.closing === "string" ? parsed.closing : "",
    };
  } catch {
    console.error("[report] JSON parse failed — using minimal fallback");
    return minimalReportData(fallbackHeadline);
  }
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
    max_tokens: 8192,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: userPrompt }],
  });
  const ms = Date.now() - t0;

  const raw = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const u = message.usage;
  const usage: ReportUsage = {
    input_tokens: u.input_tokens,
    output_tokens: u.output_tokens,
    cache_creation_input_tokens: u.cache_creation_input_tokens ?? 0,
    cache_read_input_tokens: u.cache_read_input_tokens ?? 0,
  };

  logReportUsage(usage, ms);

  const reportData = parseReportJson(raw, triage.headline);
  const meta = { business: input.business, suburb: input.suburb, date: today };

  const html = renderReportHtml(reportData, meta);
  const text = renderReportText(reportData, meta);

  return { data: reportData, html, text, usage };
}
