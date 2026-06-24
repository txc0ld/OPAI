# Content engine + programmatic suburb × trade pages — design

**Date:** 2026-06-24
**Status:** Approved (pending spec review)
**Surfaces:** `web/` (Next.js 16 marketing site)

## Overview

Two independently-shippable subsystems, designed together, both aimed at growing
organic + AI-search (AEO) visibility for OperateAI:

1. **Content engine** — lower-friction article authoring + a batch of new articles.
2. **Programmatic suburb × trade pages** — pages targeting "AI visibility for
   [trade] in [suburb]" under `/ai-visibility/…`, launched at a focused scale.

The design is validated against our `programmatic-seo` and `ai-seo` skills. The
defining principle: every page carries **original data, cited statistics, expert
attribution, and AI-extractable structure** — the difference between templated
pSEO (which Google treats as "scaled content abuse") and pages that actually get
cited and rank.

## Goals & success criteria

- Add a defensible, compounding organic/AEO surface without triggering thin- or
  doorway-content penalties.
- Each programmatic page is genuinely useful to a real [trade] owner in [suburb].
- Clean indexation: pages reachable from site nav, in the sitemap, with unique
  titles/meta/H1, schema, and no orphans.
- Authoring an article drops from "edit 3 files" to "drop one MDX + run one command."
- Measurable via standard GSC reports + monthly manual AI-citation checks.

## Non-goals (this spec)

- No CMS / admin UI. Content is code (TS data + MDX), reviewed via PRs.
- No live API calls during `next build`. All AI output is generated offline,
  reviewed, and committed as static data.
- No third-party-presence work (Reddit/Wikipedia/review sites) — separate effort.
- No paid-ads landing pages.

---

## Subsystem A — Content engine

### A1. Authoring friction fixes

Current authoring requires editing three places per article: the MDX file, the
`LOADERS` map, and the `TAKEAWAYS` map (`app/articles/[slug]/page.tsx`).

- **Takeaways → frontmatter.** Extend `ArticleFrontmatter` with
  `takeaways: string[]` and `updated?: string`. The article page reads
  `meta.takeaways`; delete the `TAKEAWAYS` map.
- **Loaders → codegen.** Turbopack cannot resolve a bare template-literal dynamic
  import, so explicit imports are required. A script
  `web/scripts/gen-article-loaders.mjs` scans `content/articles/*.mdx` and writes
  `web/app/articles/loaders.generated.ts` (explicit `import()` per slug). The
  article page imports the generated map instead of a hand-written one.
  - `package.json`: add `"articles:gen"` script; run it in `prebuild`.
  - The generated file **is committed** so `pnpm dev` works without running codegen.
- Net authoring flow: add `foo.mdx` → `pnpm articles:gen` → done.

### A2. Article batch (4), tuned for AI citation

`ai-seo` citation-share by format: comparison ~33%, original research ~12%,
how-to ~8%. So the batch is **1 research + 1 comparison + 2 guides**:

1. **Original research:** "We asked ChatGPT for the best [trade] in Perth — here's
   who it picked, and why." Doubles as the generator for the leaf-page proprietary
   snippets (Subsystem B).
2. **Comparison:** "AI search vs Google: what actually changed for how Perth
   customers find you." (comparison table format)
3. **Guide:** "Set up your Google Business Profile so AI recommends you."
4. **Guide:** "Why your website is invisible to AI (and the 5-minute fixes)."

Each article applies the GEO/AEO patterns in §C.

---

## Subsystem B — Programmatic suburb × trade pages

### B1. Routes (subfolders, hub-and-spoke)

```
/ai-visibility/                      → index hub: intro + grid of trades + CTA
/ai-visibility/[trade]/              → trade hub: trade-level content + suburb list
/ai-visibility/[trade]/[suburb]/     → leaf page (the money page)
```

All statically generated via `generateStaticParams`. Subfolders (not subdomains)
to consolidate domain authority. Hubs give a crawl path and prevent orphans.

### B2. Launch scope

- **Trades (6):** Plumbers · Electricians · Air-conditioning · Builders ·
  Landscapers · Painters
- **Suburbs (8):** Subiaco · Fremantle · Joondalup · Scarborough · Mount Lawley ·
  Cannington · Midland · Rockingham
- **= 48 leaf pages + 6 trade hubs + 1 index = 55 pages.** Expand in waves once
  GSC shows clean indexation.

### B3. Data model

- `web/lib/programmatic.ts` — single source of truth:
  - `TRADES: Trade[]` where `Trade = { slug; namePlural; nameSingular; tradieWord }`
    (e.g. `electricians` / `electrician` / "sparky").
  - `SUBURBS: Suburb[]` where `Suburb = { slug; name; region }`.
  - Helpers: `allPairs()`, `getTrade(slug)`, `getSuburb(slug)`, `getEntry(t,s)`.
- `web/content/programmatic/entries.ts` — per-pair **reviewed, committed** content
  keyed by `"${trade}/${suburb}"`. Each `Entry`:
  - `intro: string` — unique trade+suburb intro paragraph.
  - `whatAIChecks: string[]` — 3 trade-specific points.
  - `exampleQueries: string[]` — 2–3 natural queries a local would ask.
  - `faqs: { q: string; a: string }[]` — 3–4 trade-specific Q&A.
  - `aiSnapshot?: { summary: string; capturedOn: string; source: string }` — the
    **proprietary** "what AI says about this trade in this suburb right now",
    produced by a real check run (see B5).
  - `stats?: { claim: string; source: string; date: string }[]` — cited stats.

### B4. Leaf page anatomy (people-first + AEO-extractable)

In order, each leaf renders:

1. H1: "Getting [trade] in [suburb] found by AI" (unique per page).
2. **Answer-first intro** (40–60 words) — direct answer, then the suburb+trade intro.
3. **AI snapshot** block — the proprietary `aiSnapshot` with a visible
   `capturedOn` date. *(Quality gate: see B6.)*
4. **"What AI checks for [trade]"** — the 3 points, as a list.
5. **"What locals are asking AI"** — `exampleQueries` rendered as a styled block.
6. **Cited stat(s)** — `stats` with source + date inline.
7. **FAQ** — `faqs`, mirrored into `FAQPage` schema.
8. **Free-check CTA** (`CheckButton`).
9. **Internal links:** trade hub, 4–6 sibling suburbs, 1–2 relevant articles.
10. **"Last updated [date]"** footer line.

Trade hub: trade-level intro, the same answer-first + stats treatment, a grid
linking all suburbs (`ItemList` schema), CTA. Index hub: positioning intro +
trade grid + CTA.

### B5. Proprietary AI snapshot — sourcing (honesty-critical)

The `aiSnapshot` must be **real**, not fabricated — publishing invented "what AI
says" claims would be misleading and would void the proprietary-data advantage.

- Generated by an **offline authoring step** (operator runs the existing
  `tools/check-cli` / check pipeline for each trade×suburb query), **not** during
  `next build` and **not** via runtime API calls.
- Output is reviewed by the operator and committed to `entries.ts` with a
  `capturedOn` date and `source` label.
- Refreshed periodically; `capturedOn` drives the freshness signal.

### B6. Thin-content quality gate

- A leaf page is **indexable only if** it has a non-empty `aiSnapshot` **and**
  non-empty `intro`, `whatAIChecks`, `faqs`. Otherwise the page renders with
  `robots: { index: false }` (still reachable, but not indexed) until filled.
- This makes it impossible to ship a thin page by accident.
- `noindex` leaves are excluded from the sitemap.

---

## C. Cross-cutting SEO / AEO / GEO patterns

Applied to both articles and programmatic pages:

- **GEO authority (Princeton study):** cite sources (+40%), include statistics
  with dates (+37%), authoritative tone (+25%). Expert attribution: author
  "Taylor" with first-hand experience for E-E-A-T. **No keyword stuffing** (−10%).
- **Extractable structure:** lead each section with a direct 40–60-word answer;
  H2/H3 phrased as real questions; tables over prose for comparisons; numbered
  lists for processes; one idea per paragraph.
- **Freshness:** visible "Last updated"/`capturedOn` dates; dated stats.
- **People-first guardrail:** content must be useful to a human reader, not
  AI-bait. Focused scale + original data keeps us clear of scaled-content-abuse.
- **Query fan-out:** hubs cover the topical cluster so we're retrievable for
  related fan-out queries, not just the exact string.

---

## D. Schema, sitemap, robots, machine-readable files

- **Schema (`lib/schema.ts`):**
  - Extend `buildService` to accept an optional `areaServed` override (the suburb).
  - Add `buildItemList(items)` for hubs.
  - Leaf: `WebPage` + `Service`(areaServed=suburb) + `FAQPage` + `BreadcrumbList`.
  - Trade hub: `WebPage` + `BreadcrumbList` + `ItemList`. Index: `WebPage` + `ItemList`.
- **Sitemap (`app/sitemap.ts`):** generate hub + indexable leaf routes from
  `programmatic.ts` + existing static + article routes. `noindex` leaves excluded.
- **Robots (`app/robots.ts`):** already `allow: "/"` for all agents (GPTBot,
  PerplexityBot, ClaudeBot, Google-Extended, Bingbot can crawl). No change required.
- **Machine-readable:** add `web/public/pricing.md` (structured pricing for AI
  buying-agents). `llms.txt` already shipped — add the `/ai-visibility/` hub to it.

## E. Internal linking & discoverability

- Footer gains an "Areas we serve" link to `/ai-visibility/`.
- Leaf ↔ trade hub ↔ sibling suburbs; leaf → relevant articles; articles →
  relevant hubs. No orphan pages.

## F. File inventory

**New**
- `web/lib/programmatic.ts`
- `web/content/programmatic/entries.ts`
- `web/app/ai-visibility/page.tsx`
- `web/app/ai-visibility/[trade]/page.tsx`
- `web/app/ai-visibility/[trade]/[suburb]/page.tsx`
- `web/components/programmatic/*` (section components)
- `web/scripts/gen-article-loaders.mjs`
- `web/app/articles/loaders.generated.ts` (generated, committed)
- `web/public/pricing.md`
- `web/content/articles/*.mdx` (4 new)

**Modified**
- `web/lib/articles.ts` (frontmatter: `takeaways`, `updated`)
- `web/app/articles/[slug]/page.tsx` (read frontmatter takeaways; import generated loaders; remove maps)
- `web/lib/schema.ts` (`buildService` areaServed; `buildItemList`)
- `web/app/sitemap.ts` (programmatic routes)
- `web/components/site-footer.tsx` ("Areas we serve")
- `web/public/llms.txt` (+ hub)
- `web/package.json` (`articles:gen`, `prebuild`)

## G. Build, verify, rollout

- `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build` + Playwright smoke.
- Add smoke coverage: one leaf, one trade hub, the index hub, one new article.
- Run `/route-smoke-check` before push.
- Ship as one branch. After deploy, submit sitemap in GSC; watch indexation +
  Core Web Vitals; monthly manual AI-citation checks for the target queries.
- Expand to the next wave of suburbs/trades only after the first 55 index cleanly.

## H. Risks & mitigations

- **Thin/doorway flag** → focused scale + real per-page AI snapshot + cited stats
  + hubs + quality gate (`noindex` until filled).
- **Scaled-content-abuse** → people-first content, original data, no AI-bait.
- **Fabricated AI claims** → snapshots are real check runs, reviewed, dated.
- **Build flakiness** → no API calls in build; all content is static.
- **Keyword cannibalization** → hub targets the trade cluster; leaves target
  trade+suburb; distinct intents.

## I. Open / future (out of scope now)

- Separate XML sitemap per page type (single sitemap is fine at this scale).
- Automated snapshot-refresh job.
- Repeatable AI article-draft pipeline.
- Third-party presence (Reddit/Wikipedia/review profiles).
