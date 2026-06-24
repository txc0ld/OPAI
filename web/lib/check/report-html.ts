/**
 * web/lib/check/report-html.ts
 *
 * Deterministic branded HTML renderer for the AI Visibility Check report.
 * All styles are INLINE — email-safe (no <style> class rules, no external CSS).
 * Escape all user/model-generated content before interpolation.
 *
 * Also exports renderReportText() for the plain-text email part.
 */

// ---------------------------------------------------------------------------
// Structured data types (what Claude returns as JSON)
// ---------------------------------------------------------------------------

import type { Rag } from "./types";
export type { Rag };

export interface ScorecardRow {
  label: string;
  rating: Rag;
  note: string;
}

export interface Fix {
  title: string;
  effort: string;
  steps: string[];
}

export interface TopIssue {
  title: string;
  why: string;
}

export interface ReportData {
  headline: string;
  askedPrompts: string[];
  whatItSaid: string;
  scorecard: ScorecardRow[];
  topIssue: TopIssue;
  fixes: Fix[];
  quickWins: string[];
  closing: string;
}

export interface ReportMeta {
  business: string;
  suburb: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Fallback / minimal data for when JSON parsing fails
// ---------------------------------------------------------------------------

export function minimalReportData(headline?: string): ReportData {
  return {
    headline: headline ?? "AI check complete. Review the raw data below.",
    askedPrompts: ["Could not extract prompts from report data."],
    whatItSaid: "Report data could not be parsed. Please review the raw gathered data.",
    scorecard: [
      { label: "AI visibility",           rating: "A", note: "Parse error — review manually" },
      { label: "Google Business Profile", rating: "A", note: "Parse error — review manually" },
      { label: "Website readability",     rating: "A", note: "Parse error — review manually" },
      { label: "Reviews",                 rating: "A", note: "Parse error — review manually" },
      { label: "Directories & consistency", rating: "A", note: "Parse error — review manually" },
    ],
    topIssue: {
      title: "Report could not be generated",
      why: "The model output could not be parsed as valid JSON. Check the raw log.",
    },
    fixes: [
      {
        title: "Retry the report",
        effort: "About 2 minutes",
        steps: [
          "Check the ANTHROPIC_API_KEY is set correctly.",
          "Re-run the check CLI or trigger the API endpoint again.",
          "If the issue persists, inspect the raw model output in the log.",
        ],
      },
    ],
    quickWins: ["Check ChatGPT manually — search your business name and suburb.", "Verify your Google Business Profile is claimed and accurate."],
    closing: "Once the report generates cleanly, you will see exactly where to focus first.",
  };
}

// ---------------------------------------------------------------------------
// HTML escaping
// ---------------------------------------------------------------------------

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------------------------------------------------------------------------
// RAG pill renderer
// ---------------------------------------------------------------------------

function ragPill(rating: Rag): string {
  const configs: Record<Rag, { bg: string; color: string; label: string }> = {
    R: { bg: "#fdecec", color: "#c0392b", label: "Needs work" },
    A: { bg: "#fdf4e3", color: "#b7791f", label: "Some gaps"  },
    G: { bg: "#e9f6ee", color: "#1e7e45", label: "Good"       },
  };
  const cfg = configs[rating] ?? configs["A"];
  return `<span style="display:inline-block;background:${cfg.bg};color:${cfg.color};font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap;letter-spacing:0.02em;">${esc(cfg.label)}</span>`;
}

// ---------------------------------------------------------------------------
// Scorecard rows
// ---------------------------------------------------------------------------

function renderScorecardRows(scorecard: ScorecardRow[]): string {
  return scorecard.map((row, i) => {
    const borderTop = i === 0 ? "" : "border-top:1px solid #ececE6;";
    return `
      <tr>
        <td style="padding:12px 0;${borderTop}vertical-align:middle;width:110px;">${ragPill(row.rating)}</td>
        <td style="padding:12px 0 12px 14px;${borderTop}vertical-align:middle;">
          <span style="font-weight:700;color:#15140f;">${esc(row.label)}</span>
          <span style="color:#6b6a63;margin-left:8px;">${esc(row.note)}</span>
        </td>
      </tr>`;
  }).join("");
}

// ---------------------------------------------------------------------------
// Fix cards
// ---------------------------------------------------------------------------

function renderFixCard(fix: Fix, idx: number): string {
  const steps = fix.steps.map((step) =>
    `<li style="margin-bottom:8px;line-height:1.6;color:#15140f;">${esc(step)}</li>`
  ).join("");

  const marginTop = idx === 0 ? "" : "margin-top:12px;";

  return `
    <div style="${marginTop}border:1px solid #ececE6;border-radius:10px;padding:18px 22px;background:#ffffff;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <span style="font-size:17px;font-weight:700;color:#15140f;line-height:1.3;">${esc(fix.title)}</span>
        <span style="display:inline-block;background:#f7f8e8;color:#5b5e10;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;white-space:nowrap;">${esc(fix.effort)}</span>
      </div>
      <ol style="margin:0;padding-left:20px;">
        ${steps}
      </ol>
    </div>`;
}

// ---------------------------------------------------------------------------
// Quick wins list
// ---------------------------------------------------------------------------

function renderQuickWins(wins: string[]): string {
  return wins.map(win =>
    `<li style="margin-bottom:8px;line-height:1.6;color:#15140f;list-style:none;padding-left:0;">
      <span style="color:#c8d400;font-weight:700;margin-right:8px;">&#10003;</span>${esc(win)}
    </li>`
  ).join("");
}

// ---------------------------------------------------------------------------
// Asked prompts list
// ---------------------------------------------------------------------------

function renderAskedPrompts(prompts: string[]): string {
  return prompts.map(p =>
    `<li style="margin-bottom:8px;line-height:1.6;color:#6b6a63;font-style:italic;">&ldquo;${esc(p)}&rdquo;</li>`
  ).join("");
}

// ---------------------------------------------------------------------------
// Main HTML renderer
// ---------------------------------------------------------------------------

export function renderReportHtml(data: ReportData, meta: ReportMeta): string {
  const { business, suburb, date } = meta;

  const scorecardRows   = renderScorecardRows(data.scorecard);
  const fixCards        = data.fixes.map((f, i) => renderFixCard(f, i)).join("");
  const quickWinsList   = renderQuickWins(data.quickWins);
  const askedPromptList = renderAskedPrompts(data.askedPrompts);

  // Fonts / base styles
  const fontStack = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Visibility Check — ${esc(business)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f1;font-family:${fontStack};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f1;min-height:100vh;">
    <tr>
      <td align="center" style="padding:32px 16px 48px;">

        <!-- Card -->
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border:1px solid #ececE6;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:0;">

              <!-- Header bar -->
              <div style="padding:22px 28px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="font-size:20px;font-weight:800;color:#15140f;letter-spacing:-0.03em;">OperateAI<span style="color:#c8d400;">.</span></span>
                    </td>
                    <td align="right">
                      <span style="font-size:10px;font-variant:small-caps;letter-spacing:0.08em;color:#6b6a63;text-transform:uppercase;">AI Visibility Check</span>
                    </td>
                  </tr>
                </table>
                <!-- Lime rule -->
                <div style="height:3px;background:#f3fc85;margin-top:14px;border-radius:2px;"></div>
              </div>

              <!-- Title block -->
              <div style="padding:24px 28px 20px;">
                <div style="font-size:26px;font-weight:800;color:#15140f;line-height:1.2;letter-spacing:-0.02em;">${esc(business)}</div>
                <div style="font-size:13px;color:#6b6a63;margin-top:6px;">${esc(suburb)} &middot; Checked ${esc(date)} across ChatGPT, Google AI and Perplexity</div>
              </div>

              <!-- Short version callout -->
              <div style="margin:0 28px 24px;background:#faf9f3;border-left:4px solid #f3fc85;border-radius:8px;padding:16px 20px;">
                <div style="font-size:13px;font-weight:700;color:#6b6a63;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">The short version</div>
                <div style="font-size:16px;color:#15140f;line-height:1.55;">${esc(data.headline)}</div>
              </div>

              <!-- Scorecard -->
              <div style="margin:0 28px 24px;">
                <div style="font-size:16px;font-weight:700;color:#15140f;margin-bottom:12px;">Where you stand</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${scorecardRows}
                </table>
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#ececE6;margin:0 28px 24px;"></div>

              <!-- Evidence: what we asked -->
              <div style="margin:0 28px 20px;">
                <div style="font-size:16px;font-weight:700;color:#15140f;margin-bottom:10px;">What we asked AI</div>
                <ul style="margin:0;padding-left:18px;">
                  ${askedPromptList}
                </ul>
              </div>

              <!-- What it said -->
              <div style="margin:0 28px 24px;">
                <div style="font-size:16px;font-weight:700;color:#15140f;margin-bottom:10px;">What it said</div>
                <div style="font-size:14px;color:#15140f;line-height:1.65;">${esc(data.whatItSaid)}</div>
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#ececE6;margin:0 28px 24px;"></div>

              <!-- Top issue dark panel -->
              <div style="margin:0 28px 24px;background:#15140f;border-radius:10px;padding:20px 24px;">
                <div style="font-size:10px;font-weight:700;color:#f3fc85;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">The #1 thing costing you customers</div>
                <div style="font-size:18px;font-weight:700;color:#ffffff;line-height:1.3;margin-bottom:8px;">${esc(data.topIssue.title)}</div>
                <div style="font-size:14px;color:#d8d7cf;line-height:1.6;">${esc(data.topIssue.why)}</div>
              </div>

              <!-- How to fix it -->
              <div style="margin:0 28px 24px;">
                <div style="font-size:16px;font-weight:700;color:#15140f;margin-bottom:14px;">How to fix it, step by step</div>
                ${fixCards}
              </div>

              <!-- Quick wins -->
              <div style="margin:0 28px 24px;background:#faf9f3;border-radius:8px;padding:18px 20px;">
                <div style="font-size:14px;font-weight:700;color:#15140f;margin-bottom:10px;">Quick wins (do these first)</div>
                <ul style="margin:0;padding:0;">
                  ${quickWinsList}
                </ul>
              </div>

              <!-- Where this could be -->
              <div style="margin:0 28px 24px;">
                <div style="font-size:15px;color:#15140f;line-height:1.6;font-style:italic;">${esc(data.closing)}</div>
              </div>

              <!-- CTA -->
              <div style="margin:0 28px 28px;text-align:center;">
                <a href="mailto:team@operateai.com.au" style="display:inline-block;background:#f3fc85;color:#15140f;font-weight:700;font-size:15px;padding:12px 22px;border-radius:999px;text-decoration:none;font-family:${fontStack};">Want this sorted for you? Just reply.</a>
              </div>

              <!-- Footer -->
              <div style="border-top:1px solid #ececE6;padding:18px 28px;text-align:center;">
                <div style="font-size:12px;color:#6b6a63;line-height:1.6;">
                  OperateAI &middot; Perth, WA &middot; <a href="mailto:team@operateai.com.au" style="color:#6b6a63;">team@operateai.com.au</a>
                </div>
                <div style="font-size:11px;color:#9b9a92;margin-top:4px;">
                  Checked ${esc(date)}. AI results move around, so this is a snapshot; the underlying issues are stable.
                </div>
              </div>

            </td>
          </tr>
        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Plain-text renderer (email text/* part + CLI fallback)
// ---------------------------------------------------------------------------

export function renderReportText(data: ReportData, meta: ReportMeta): string {
  const { business, suburb, date } = meta;

  const ragLabel = (r: Rag) => r === "R" ? "Needs work" : r === "A" ? "Some gaps" : "Good";

  const scorecardLines = data.scorecard
    .map(row => `  [${row.rating}] ${row.label}: ${row.note} (${ragLabel(row.rating)})`)
    .join("\n");

  const promptLines = data.askedPrompts
    .map((p, i) => `  ${i + 1}. "${p}"`)
    .join("\n");

  const fixLines = data.fixes.map((fix, i) => {
    const header = `${i + 1}. ${fix.title} (${fix.effort})`;
    const steps = fix.steps.map((s, si) => `      ${si + 1}. ${s}`).join("\n");
    return `${header}\n${steps}`;
  }).join("\n\n");

  const quickWinsLines = data.quickWins.map(w => `  - ${w}`).join("\n");

  return [
    `AI Visibility Check — ${business}, ${suburb}`,
    `Checked ${date} across ChatGPT, Google AI and Perplexity`,
    "",
    "---",
    "",
    "THE SHORT VERSION",
    data.headline,
    "",
    "---",
    "",
    "WHERE YOU STAND",
    scorecardLines,
    "",
    "---",
    "",
    "WHAT WE ASKED AI",
    promptLines,
    "",
    "WHAT IT SAID",
    data.whatItSaid,
    "",
    "---",
    "",
    "THE #1 THING COSTING YOU JOBS",
    data.topIssue.title,
    data.topIssue.why,
    "",
    "---",
    "",
    "HOW TO FIX IT, STEP BY STEP",
    "",
    fixLines,
    "",
    "---",
    "",
    "QUICK WINS",
    quickWinsLines,
    "",
    "---",
    "",
    data.closing,
    "",
    "Want this sorted for you? Reply to this email or contact team@operateai.com.au",
    "",
    "---",
    "OperateAI · Perth, WA · team@operateai.com.au",
    `Checked ${date}. AI results move around, so this is a snapshot; the underlying issues are stable.`,
  ].join("\n");
}
