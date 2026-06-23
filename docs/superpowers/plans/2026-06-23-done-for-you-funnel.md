# Done-for-you Funnel — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add a "Done-for-you" always-on service offering page at `/done-for-you/`, with conversion entry points from the header nav, a new home-page section, and a band on the `/check/` page.

**Architecture:** Pure marketing/frontend in `web/` (Next 16 App Router, server components). Mirrors the existing `app/check/page.tsx` structure: composed `<Section>` primitives, `MonoLabel`/`CheckButton`, design tokens, and `lib/schema` JSON-LD. Orgo runs the actual service — nothing here provisions or hosts anything.

**Tech Stack:** Next 16, React 19, Tailwind v4 tokens (`tokens.css`), existing UI primitives.

**Scope note:** This replaces the shelved "OperateAI Agents platform" spec. The setup/hosting is handled inside Orgo; this repo only carries the service's marketing funnel.

---

## Task 1: Offering content + pricing constant

**Files:** Modify `web/lib/business.ts`, `web/lib/nav.ts`

- [ ] **Step 1:** In `web/lib/business.ts`, add an exported `DONE_FOR_YOU` constant with a **clearly-flagged placeholder price** (`priceFrom`, `currency`, `setup`). One obvious edit location before deploy.
- [ ] **Step 2:** In `web/lib/nav.ts`, add `{ href: "/done-for-you/", label: "Done-for-you" }` to `PRIMARY_NAV` (renders in desktop + mobile header automatically).
- [ ] **Step 3:** Commit: `M-funnel: add done-for-you offering constant + nav link`.

## Task 2: The offering page

**Files:** Create `web/app/done-for-you/page.tsx`

- [ ] **Step 1:** Build the page as a server component mirroring `app/check/page.tsx`: `Metadata` export, `JsonLd` with `buildWebPage` + `buildService` + `buildBreadcrumb` (NOT `buildFaqPage` — the `<Faq>` component emits that itself).
- [ ] **Step 2:** Sections (alternating tones): hero (price anchor + dual CTA), "why one-off decays", "what we do" card grid, "free check vs always-on" compare, "you're always in control" trust band (monitor-first, you approve before anything goes live), pricing band, `<Faq>`, final CTA band.
- [ ] **Step 3:** Verify it renders: `cd web && pnpm dev --port 3456` → visit `/done-for-you/` (or rely on Task 5 smoke). Commit: `M-funnel: add /done-for-you/ offering page`.

## Task 3: Home-page entry section

**Files:** Create `web/components/home/done-for-you-cta.tsx`, modify `web/app/page.tsx`

- [ ] **Step 1:** Create a `DoneForYouCta` section component (mirrors `home/check-cta.tsx` shape) linking to `/done-for-you/`.
- [ ] **Step 2:** Insert `<DoneForYouCta />` into `app/page.tsx` after `<HowItWorksGrid />` (explains the work → we do it for you).
- [ ] **Step 3:** Commit: `M-funnel: home-page done-for-you upsell section`.

## Task 4: /check/ page band

**Files:** Modify `web/app/check/page.tsx`

- [ ] **Step 1:** Add a band after the "What happens next" section: "Prefer we just handle it, always on? → See Done-for-you" linking to `/done-for-you/`.
- [ ] **Step 2:** Commit: `M-funnel: link /check/ to done-for-you offering`.

## Task 5: Wire route into sitemap + smoke test, then verify

**Files:** Modify `web/app/sitemap.ts`, `web/__tests__/routes.smoke.test.ts`

- [ ] **Step 1:** Add `"/done-for-you/"` to `staticRoutes` in `sitemap.ts`.
- [ ] **Step 2:** Add `{ path: "/done-for-you/", needle: /<hero headline regex>/i }` to `ROUTES` in `routes.smoke.test.ts`.
- [ ] **Step 3:** Run gates: `cd web && npx tsc --noEmit && pnpm lint && pnpm exec playwright test routes.smoke`. Expected: tsc clean, lint clean, all routes (incl. new one) pass.
- [ ] **Step 4:** Invoke `/route-smoke-check` (full Playwright + tsc + route coverage diff).
- [ ] **Step 5:** Invoke `nextjs16-reviewer` on the new/changed `web/` files; fix anything it flags.
- [ ] **Step 6:** Commit: `M-funnel: sitemap + smoke coverage for /done-for-you/`.

---

## Self-review
- **Coverage:** page (Task 2), nav (Task 1), home section (Task 3), /check/ band (Task 4), discoverability + tests (Task 5) — matches the three approved entry points (nav, home, /check/).
- **Placeholder:** the price is the one intentional placeholder, isolated to `DONE_FOR_YOU` in `business.ts` with a flag comment; surfaced to the user before deploy.
- **No double schema:** page omits `buildFaqPage`; `<Faq>` emits it.
