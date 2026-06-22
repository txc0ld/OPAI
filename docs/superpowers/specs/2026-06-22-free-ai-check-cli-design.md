# Free AI Check — Operator Accelerator CLI (Design Spec)

**Date:** 2026-06-22
**Status:** Approved to build (operator accelerator scope)
**Source of truth:** the "Free AI Check — Delivery SOP (Trade Businesses)" (operator-supplied). This CLI automates the *grunt work* of that SOP; the operator keeps the judgment, the final review, and the send.

## Goal
`tools/check-cli/` — one command gathers everything the SOP's Layer A + Layer B need, auto-scores Red/Amber/Green, and drafts the one-page report (Phase 3 template) in the brand voice. The operator reviews and sends. Mirrors the `tools/audit-cli/` pattern (tsx, commander, zod, @anthropic-ai/sdk, picocolors).

## Non-goals (kept human, by design)
- Sending the report (preserves "checked by a real person, not a bot").
- Fabricating anything the APIs can't see (owner replies, Q&A, service-area suburbs, directory presence/NAP) — these are surfaced as "couldn't check automatically".
- A web/instant flow (later; this is the CLI foundation).

## Pipeline
1. **Layer A — what AI says** (3 proxies; consumer ChatGPT app + Google AI Overviews have no API, so 1–2 manual incognito spot-checks remain):
   - **Perplexity** (`sonar`) — answer + **citations** (most valuable).
   - **OpenAI** Responses API with `web_search_preview` tool — ChatGPT-with-search proxy.
   - **Gemini** (`gemini-2.0-flash`) with `google_search` grounding — Google AI proxy.
   - Prompts (per SOP, business details substituted): `best [trade] in [suburb]`, `who's a good emergency [trade] near [suburb]`, `I've got [urgent job] in [suburb], who should I call`, `reliable [trade] [suburb] for [job]`, `[business] [suburb] reviews`.
   - Record per engine: named / mentioned / absent; who got recommended instead; any wrong info; (Perplexity) sources cited.
2. **Layer B — source audit:**
   - **Google Places API (New)** `places:searchText` → first match → rating, userRatingCount, primaryType/types, regularOpeningHours, websiteUri, nationalPhoneNumber, businessStatus, up-to-5 reviews (timestamps), photo count.
   - **Website scan** — fetch HTML; detect plain-text services, a "starting from"/callout price (`/\$\s?\d/`), suburb mentions, substantial text vs image-only.
   - **PageSpeed Insights API** (mobile) — performance score, basic mobile signal.
3. **Triage (R/A/G)** computed by rule over the gathered signals; dimensions: AI visibility, GBP completeness, website readability, reviews (volume/recency), directory & NAP (default "not auto-checked — manual" unless extended later). Pick the worst Red as the suggested headline.
4. **Report** — Claude **`claude-opus-4-8`** drafts the Phase-3 one-page template from the data: short version, what was asked, what it said, the #1 thing, two quick wins, "where this could be", DIY path + done-for-you path, dated-snapshot footer. Brand voice (blunt Perth tradie, plain, en-AU). Only uses provided data; labels unknowns honestly; if the business looks great, says so and pivots to monitoring/maintenance.
5. **Outputs** — `checks/<business-slug>-<YYYY-MM-DD>.md` (draft) + append a row to `checks/checks-log.csv` (`date,business,trade,suburb,top_finding,ai_visibility,gbp,website,reviews,directory,sent,replied,converted,amount` — tool fills through the scores; `sent/replied/converted/amount` left blank for the operator). Prints R/A/G summary + Claude token/cost estimate.

## Config / env (all optional; degrade gracefully, never logged)
`ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_MAPS_API_KEY` (Places + PageSpeed). A missing key skips that source and the report notes it. `check dry-run` reports which keys are present and what would run, with no API calls.

## File structure
```
tools/check-cli/
  package.json        # @anthropic-ai/sdk, commander, zod, picocolors; tsx; type:module
  tsconfig.json
  cli.ts              # commander: `check run`, `check dry-run`
  src/config.ts       # env keys + availability (no values logged), model ids
  src/types.ts        # zod input + result types
  src/gather/perplexity.ts | openai.ts | gemini.ts | places.ts | website.ts | pagespeed.ts
  src/triage.ts       # R/A/G rules + headline pick
  src/report.ts       # Claude synthesis -> markdown (Phase-3 template + brand voice)
  src/log.ts          # append CSV row (create header if missing)
  README.md
```

## Guardrails (SOP rules 1–3)
1. Never fabricate — report prompt restricted to supplied data; unknowns labelled.
2. Non-deterministic AI — run the key recommendation prompt twice where cheap; frame as dated snapshot.
3. If genuinely good — say so, pitch monitoring/maintenance instead of inventing problems.

## Verification
`pnpm exec tsc --noEmit` clean; `check dry-run` works with no keys; live API responses verified on the operator's first real run (cannot be tested here without keys). Review with the `audit-cli-reviewer` agent.

## The moat (SOP Phase 5)
`checks-log.csv` accumulates a proprietary picture of how WA trades look to AI — fuel for articles, hooks, and the data moat. The CLI makes the log a byproduct of every run.
