# Website + agent examples (demo showcase) — design

**Date:** 2026-06-24
**Status:** Approved (pending spec review)
**Surface:** `web/` (Next.js 16 marketing site)

## Overview

Add two demonstration sections so prospects can *see* the quality of websites we
build and understand what the AI agents do:

1. **Website examples** — a device-framed gallery of 4 distinct, high-quality
   website mockups, added as a section on the existing `/websites/` page.
2. **Agent examples** — 5 agent demos (realistic chat transcripts + a plain-English
   control panel), added as a section on the existing `/ioagent/` page.

No new routes, no new nav item. Each example lives where the relevant buyer already is.

## Honesty (non-negotiable)

These are **demonstrations, not client work.** Both sections must:

- Open with one explicit line: *"Example builds and demo conversations —
  illustrations of what we make, not real client work."*
- Tag every website mockup with an **"Example build"** badge and every agent
  transcript with a **"Demo"** badge.
- Use clearly-fictional business names. **No** invented client testimonials,
  logos, star-rating counts presented as real, or fabricated results/metrics.
- Agent demos show illustrative conversations only — no claim that a specific
  result happened for a specific customer.

This mirrors the honesty standard held on the AI snapshots: nothing fabricated is
presented as real.

## Goals & success criteria

- A visitor on `/websites/` sees 4 visibly-different, premium site designs and
  immediately grasps the quality range (trades through to a clinic).
- A visitor on `/ioagent/` understands, concretely, what each agent does and that
  they stay in control ("you approve before it acts").
- Fully on-brand, responsive, accessible; no measurable LCP regression on the two
  pages (images lazy-loaded, sized, `loading="lazy"`).

## Non-goals (this spec)

- No live interactive chat demo (no API endpoint/runtime).
- No live clickable demo *sites* as real routes (gallery is static images).
- No new nav entry or new top-level route.

---

## Section A — Website examples (on `/websites/`)

### A1. The 4 mockups (distinct industries + aesthetics)

| key | Business (fictional) | Trade | Aesthetic direction |
|-----|----------------------|-------|---------------------|
| coastal-plumbing | Coastal Plumbing & Gas | Plumber | Bold, trustworthy, 24/7 emergency; deep blue + charcoal (ties to the site's existing illustrative business) |
| brightwire | Brightwire Electrical | Electrician | Dark, modern, electric-yellow accent, technical |
| tide-co | Tide & Co Building | Builder | Architectural editorial; large type, generous whitespace, stone/neutral palette |
| glow-skin | Glow Skin & Laser | Aesthetic clinic | Elegant, soft blush/cream, serif headings — proves range beyond trades |

Names are checked to be clearly generic/fictional (not matching businesses named
in `tools/check-cli/snapshots/perth-trades.json`). Each mockup is a one-page site:
hero, services, a trust/proof strip (generic, non-attributed), and a contact/CTA.

### A2. How they're produced

- Each mockup is built as a **standalone HTML file** under `design/mockups/<key>.html`
  (committed for reproducibility), styled distinctly with the frontend-design skill.
- Rendered at 1440-wide via the local static-server + Playwright workflow,
  screenshotted to `web/public/work/site-<key>.png` (desktop). Optionally one phone
  crop per mockup later; desktop only for v1.
- The mockup HTML is **not** shipped as a route — only the PNG ships.

### A3. Gallery on the page

- `components/work/browser-frame.tsx` — a CSS browser-window chrome (top bar, traffic-light
  dots, a faux URL pill) wrapping a Next `<Image>`. Reusable, on-brand.
- `components/work/website-gallery.tsx` — renders the 4 items from data: each in a
  `BrowserFrame`, with caption (business · trade) and an "Example build" badge.
  2-up on desktop, 1-up on mobile. Images `loading="lazy"`, explicit width/height.
- Inserted as a new `Section` on `/websites/` (after the packages, before the final
  CTA), with the honesty line as the section intro.

---

## Section B — Agent examples (on `/ioagent/`)

### B1. The 5 agents

| key | Agent | Demo conversation gist | "You approve" note |
|-----|-------|------------------------|--------------------|
| reception | Reception / enquiry | Customer asks about a blocked drain; agent captures address + job + urgency, offers two time windows | Books only times you've opened |
| missed-call | Missed-call follow-up | Instant text-back after a missed call; qualifies the job, says someone will call | Sends only your approved templates |
| reviews | Reviews | After a completed job, asks for a review; drafts a reply to a new review for the owner | You approve every public reply |
| quoting | Quote / booking | Qualifies a job, gives a "from" ballpark with caveats, books a site visit | Quotes only from your price list |
| back-office | Back-office | Chases an overdue invoice politely; summarises the week's admin | Never sends payment threats; flags for you |

All conversations are illustrative and generic (no real names/results).

### B2. Component

- `components/work/agent-demo.tsx` — reuses the existing phone-frame chat styling
  (see `components/mock/examples.tsx` `MissedCall`/`PhoneAnswer`). Props:
  `name`, `tagline`, messages (array of `{ from: "customer" | "agent"; text: string }`),
  `handles: string[]`, `control: string` (the "you approve" line), and a "Demo" badge.
  Renders the phone-frame transcript beside a "What it handles / You stay in control" panel.
- `components/work/agent-demos.tsx` — maps the 5 demos from data, alternating
  transcript/panel sides for rhythm.
- Inserted as a new `Section` on `/ioagent/` (after the plans/positioning, before the
  final CTA), with the honesty line as the section intro.

### B3. Data

- `content/work.ts` — typed: `WEBSITE_EXAMPLES: WebsiteExample[]` and
  `AGENT_DEMOS: AgentDemo[]`. Single source for both galleries.
  - `WebsiteExample = { key; business; trade; blurb; image; alt }`
  - `AgentDemoData = { key; name; tagline; messages: {from;text}[]; handles: string[]; control: string }`

---

## File inventory

**New**
- `design/mockups/coastal-plumbing.html`, `brightwire.html`, `tide-co.html`, `glow-skin.html`
- `web/public/work/site-coastal-plumbing.png`, `site-brightwire.png`, `site-tide-co.png`, `site-glow-skin.png`
- `web/components/work/browser-frame.tsx`
- `web/components/work/website-gallery.tsx`
- `web/components/work/agent-demo.tsx`
- `web/components/work/agent-demos.tsx`
- `web/content/work.ts`

**Modified**
- `web/app/websites/page.tsx` (insert WebsiteGallery section)
- `web/app/ioagent/page.tsx` (insert AgentDemos section)

## Build approach

- Use the **frontend-design** skill (via implementer subagents) for the 4 mockups so
  each is genuinely premium and visually distinct.
- Render/screenshot via the proven local static-server + Playwright flow.
- Build the two reusable components + data, wire into the two pages.
- Subagent-driven execution with per-task spec+quality review (same as prior feature).

## Verify

- `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build` + Playwright smoke.
- Add smoke assertions: `/websites/` shows a gallery heading + an "Example build"
  badge; `/ioagent/` shows the agent-demos heading + a "Demo" badge.
- Visual check of both pages (desktop + mobile) via screenshots before merge.
- `/route-smoke-check` before push.

## Risks & mitigations

- **Mockups look generic/templated** → frontend-design skill, 4 deliberately
  different palettes/layouts, real visual review with screenshots.
- **Honesty drift** → explicit badges + section disclaimer; fictional names checked
  against the snapshot data; no fabricated results — enforced in review.
- **Image weight / LCP** → optimised PNGs, `loading="lazy"`, explicit dimensions,
  Next `<Image>`.
- **Mobile layout** of phone-frame + panel → stack on small screens.

## Out of scope / future

- Live interactive agent chat (API-backed).
- Live clickable demo websites as real (noindexed) routes.
- Phone-frame crops for each website mockup.
- Short auto-playing "watch it work" agent animations.
