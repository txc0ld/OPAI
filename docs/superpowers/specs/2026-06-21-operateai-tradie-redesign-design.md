# OperateAI — Tradie-First Redesign (Design Spec)

**Date:** 2026-06-21
**Status:** Draft for review
**Author:** Taylor Mayor (with Claude)
**Supersedes (for `web/`):** the 6-industry / 4-service AAO→OperateAI marketing site

---

## 1. Ethos & strategy (why this redesign exists)

The company is a **trust-and-distribution business that happens to deliver technology**, not an AI company. The one-line version: *the relationship is the asset; everything else is a commodity we assemble on their behalf.*

Operating principles this redesign must obey:

- **Distribution before product** — own the audience first; the free check *is* the distribution wedge.
- **Be the bridge, not the builder** — assemble what helps (built/bought/affiliated); never compete on tech novelty.
- **Vertical depth before horizontal reach** — dominate one narrow community before touching a second.
- **Sell present value honestly; position the future** — real value today, forward-position on top, never vaporware.
- **Access is the moat, not novelty.**

What it rejects: chasing the novel "nobody's built this" idea; horizontal infrastructure; building product before owning a channel; competing on intelligence/technology (both free, neither ours).

### Decisions locked during brainstorming

| Decision | Choice |
|---|---|
| Strategy vs. supplied design spec | **Ethos governs.** `redesign/DESIGN.md` + `code.html` are a visual kit, not a positioning. |
| Audience (v1) | **WA tradies** — trades business owners + their office/admin. Plain, blunt, proof over promises. One community, deep. |
| Brand / domain | **OperateAI**, on **operateai.com.au** (reuse repo/brand/domain). |
| North-star action | **The free "AI Visibility Check"** (name + suburb → personalised rundown). |
| Build scope | **Approach A** (conversion funnel) now, **structured to grow into Approach B** (authority hub) with no rebuild. |
| Visual language | **Dark modern "Signal"** (keep `DESIGN.md`'s charcoal + acid-green + sharp grid), made tradie-credible by plain copy + real proof. |

### The business model (from the founder's published article)

1. **What we sell:** getting WA tradies *found, recommended, and booked* now that homeowners ask AI ("who's a good plumber in Perth?") instead of scrolling Google. AI names two or three businesses — there's no page two. Concretely we fix: a machine-perfect Google Business Profile; plain-text, AI-readable services/prices/area; a reviews engine (volume, recency, replies); and fast response / missed-call capture (with "AI will book you next" as the honest forward-position).
2. **The wedge (north star):** a free, personalised *"what does AI actually say about you?"* rundown, ending on **the one thing costing you jobs**. Captures the relationship *and* proves present value.
3. **The trust layer:** plain-English articles (the "first deposit of trust").

---

## 2. Information architecture

The 16-route site collapses to a tradie funnel. Everything points at the free check.

### Routes shipped (Approach A)

| Route | Job |
|---|---|
| `/` | The article's argument as a scroll: problem → free check → how I fix it → proof → forward-position. |
| `/check` | **The Free AI Visibility Check** — the conversion page. Every CTA on the site lands here. |
| `/how-it-works` | What "getting found by AI" means + what the done-for-you service does. No price tables. Ends → `/check`. |
| `/articles` | Trust-engine index. Launches with one post; scales to many (Approach-B seed). |
| `/articles/[slug]` | Article template with contextual free-check CTAs. |
| `/about` | The human behind it. Perth-based, real, why WA trades. |
| `/contact` | The "just call me" path (email + mobile + fallback form). |
| `/legal/privacy`, `/legal/terms` | Kept, updated for check data. |

### Routes deleted

`/ai-integration-services`, `/ai-agents-for-business`, `/ai-agent-hosting`, `/ai-training-for-business` (4 service pages); `/industries` hub + all 6 `/industries/ai-for-*` pages; `/perth-ai-consultant` (Perth is now the whole site, folded into home/about); `/book-ai-audit` (replaced by `/check`).

### Scales into Approach B without a rebuild

- `articles` is a real content collection from day one (MDX, tags, author, date, reading time, related posts).
- Home reserves a "latest from the site" slot that renders correctly from n=1 to n=many.
- `/how-it-works` is structured to absorb FAQ / case studies later.

### AEO principle applied to our own site

Because the entire pitch is "be readable and recommendable by AI," the site is the worked example: plain text only (no copy trapped in images), `LocalBusiness` + `Service` + `Article` JSON-LD, semantic headings, fast. The site is also a live demo of the product.

---

## 3. The Free AI Visibility Check (conversion engine)

### Form (`/check`) — five fields, one screen

- Business name *(required)*
- Suburb / service area *(required)*
- Trade *(required — dropdown: plumber, sparky/electrician, builder, chippy/carpenter, landscaper, painter, tiler, roofer, …, + "other")*
- Best contact — email **or** mobile *(required: at least one; mobile because tradies live on SMS)*
- Optional: "anything you want me to look at?" free-text

No account, no calendar, big tap targets, Signal-on-focus inputs, mono labels.

### Flow (v1 — honest, manual)

1. Submit → existing enquiry pipeline (`app/api/enquiry/route.ts` → Resend), tagged `source: "ai-visibility-check"`, delivering all fields to the founder's inbox.
2. Instant on-screen confirmation (human, specific): *"Got it. I'll personally check what AI says about [Business name] in [suburb] and send your rundown within [TURNAROUND]. — Taylor."*
3. **Rundown done by hand** and replied to. No fake "instant AI report" — that would burn the trust we're building.

### What the tradie gets back (the promise, listed on the page before they submit)

1. What ChatGPT / Google's AI actually say to "good [trade] in [suburb]?"
2. Whether they made the shortlist.
3. **The one thing costing them jobs.**
4. A no-pressure "want me to sort it?".

### Guardrails

Honeypot + basic rate-limit on the form; graceful no-op if Resend env is unset (matches current behaviour); one-line privacy note under the button linking to `/legal/privacy` (*"Your details are only used to send your rundown. No spam."*).

### Explicitly NOT in v1 (YAGNI)

No automated AI-report generation, no payments, no booking calendar, no CRM, no login. The free check is a human promise kept by hand.

---

## 4. Visual language

Keep `DESIGN.md`'s dark/Signal system as the skin; discipline it so it reads "sharp local operator who's ahead on AI," not "enterprise SaaS." Trade-credibility comes from the real proof and plain words *inside* the look.

### Palette (working set, from `DESIGN.md`)

- Base canvas `surface #121414`; tonal layers `#1a1c1c` → `#1e2020` (cards) → `#282a2b`. Depth via tonal layering + 1px borders (`#2a2a2a` / `outline-variant`), **never soft shadows**.
- Accent **Signal `#f3fc85`** — used sparingly and only with intent (primary CTAs, "on the shortlist" highlight, active states, live dots). Discipline keeps it premium.
- Text white `#e2e2e2` primary, `#c8c8b3` (`on-surface-variant`) secondary.
- Status: Signal = good/online; high-contrast orange = warning; vibrant red = error — does real work in the check rundown ("missing", "out of date").

### Typography

- **Hanken Grotesk** everywhere — `800` tight-tracked headlines, `400` body. **Replaces** Plus Jakarta Sans. The current `Orbitron` display font is dropped.
- **JetBrains Mono** for `label-caps` labels, metadata, and the "AI readout" device (retained from current stack).

### Signature motif — "the AI readout"

The brand's distinctive device and the bridge between the spec's aesthetic and the pitch. Anywhere we show *what AI says*, render a mono terminal/answer card on the darkest surface: the question typed in, a cursor, the AI naming 2–3 businesses. On the hero it ends on a Signal line *"— is your name here?"*. On `/check` it previews the rundown format. Makes the dark-techy look *mean something*.

### Imagery — the BS-detector antidote

Real WA trades photography only: actual vans, hands, worksites, faces. **No stock, no AI art, no abstract 3D.** Treated to sit in the dark system (grayscale + Signal-toned duotone / `mix-blend`). Real grubby work photos inside a sharp dark interface = "grounded but ahead."

### Components (reuse `DESIGN.md` definitions)

Buttons: solid Signal w/ near-black text (primary), Signal outline (secondary), optional hard-shadow offset on hover. Cards: bento `#1e2020` + 1px border → Signal border on hover. Inputs: dark, 1px border, Signal on focus. Chips/labels: `label-caps` mono. Dividers over boxes for dense info. Radii small (4px controls, 8px cards). Hard shadows (zero blur, 2px) used rarely for emphasis.

### Motion

Restrained, purposeful (reuse existing `scroll-reveal`): live-dot pulse, CTA hover fill/arrow nudge, hero readout "types" once on load. Nothing that screams launch video.

### Accessibility

Signal-on-charcoal and white-on-charcoal are both clear high-contrast. **Signal is only ever a background under dark text, never light text on Signal.** Fully legible on a phone in a ute.

---

## 5. Home page layout (top to bottom)

1. **Header (sticky).** `OperateAI` wordmark + Signal full-stop. Nav: *How it works · Articles · About*. Primary button **Free AI Check**. Small live Signal dot + mono `PERTH, WA`.
2. **Hero.** *Left:* headline **"Your next customer won't scroll Google. They'll ask AI who to call."**; one plain subhead; buttons **See what AI says about you** (→ `/check`) + *How it works*; trust line *"Free · 30 seconds · a real person checks it, not a bot."* *Right:* the **AI-readout card** — `Who's a good emergency plumber in Perth?` → types → names 2–3 → Signal `— is your name here?`.
3. **The shift.** Two readout cards: *Five years ago* (greyed Google list, "scroll…") vs *Now* (sharp AI 2–3 names, Signal). Caption: **"SEO got you on the list. AI doesn't show a list — it makes the choice."**
4. **Why it hits tradies hardest.** Short band: local discovery is your lifeblood; that's what AI eats first. One or two honest mono stats.
5. **Mid-page check CTA.** **"Want to know how you look to AI right now?"** + the four rundown items as a mono checklist. Button → `/check`.
6. **How the AI picks (what I fix).** Bento grid (reuse `code.html` grid): (1) Google Business Profile, machine-perfect (large) · (2) Plain-text services, prices & area · (3) Reviews — plenty, recent, replied-to · (4) Speed / answer fast. Each: plain title, one-line problem, one-line "what I do". Doubles as `/how-it-works` teaser.
7. **Honest credibility band.** Leads with honesty (Perth-based, real person, no lock-in, free because the work proves itself). Real WA trade photo. Slot built to drop in real results / reviews / before-after AI answers later; never looks empty.
8. **Where this is heading (forward-position, no hype).** "Right now AI recommends you; soon it'll book you… that's not tomorrow, so no panic-selling robots. The work to be ready is the same work that wins jobs today."
9. **Latest from the site.** One article card (the "Won't Scroll Google" piece), styled to scale 1→many.
10. **Final CTA.** Full-width, strongest moment: **"See what AI says about your business."** + the P.S. promise restated. Button → `/check`.
11. **Footer.** `OperateAI.`, plain nav, contact (email + mobile), legal, `ABN 51 559 921 362`, *Perth, WA*, and one honest line: *"I help WA trade businesses get found, recommended, and booked — sorted for how customers search now, and how AI is about to book them next."*

---

## 6. Other pages

- **`/check`** — promise + four rundown items (mono readout) + *why free* line; the 5-field form; human confirmation state (as a readout); a 3-step "what happens next" (send it → I check by hand → you get the rundown + no-pressure fix offer).
- **`/how-it-works`** — plain explainer of how AI builds its shortlist; each lever as a section (*problem → what I do → wins jobs today + readies you for AI booking*). No price tables / tiers. Ends → `/check`.
- **`/articles` + `/articles/[slug]`** — clean index (title, hook, date, read time, tag), not broken at n=1; article template with generous measure, Hanken body, mono pull-quotes, author block (Taylor, Perth), related-articles slot, contextual **Free Check** CTA mid + end. Ships the "Won't Scroll Google" article as post #1.
- **`/about`** — who you are, Perth-based, real, why WA trades, why trustworthy; plain (no corporate "we"); real photo; honest about being early. Ends → `/check`.
- **`/contact`** — direct email + mobile + short fallback form (reuse enquiry pipeline). Primary nudge still points at the free check.
- **`/legal/privacy`, `/legal/terms`** — updated for check data (used only to send the rundown; retention; no on-sell). Genuinely clean — we sell trust.
- **Global** — `LocalBusiness` + `Service` JSON-LD on all pages, `Article` on posts; plain text; fast.

---

## 7. Copy & voice

**Voice:** a straight-talking Perth operator who knows the AI shift and refuses to dress it up — confident, plain, a bit blunt, occasionally dry. Talks *to* a tradie.

**Rules:**

1. **Plain English, tradie register.** Short sentences. "Get found," not "optimise discoverability." en-AU; local words (*sparky, arvo, ute, callout*) used sparingly, never costume.
2. **Ban detector-triggering jargon:** *operationalise, leverage, synergy, solutions, cutting-edge, revolutionary, seamless, enterprise, predictive modeling engine.* If the article wouldn't say it, the site doesn't.
3. **Proof over promises.** Every claim concrete/checkable or cut. No invented stats, fake testimonials, or logo soup. Where proof doesn't exist yet, say less.
4. **Present value first, future second.** Never imply a future capability exists now. "AI will book you" is always near-future, anchored by "same work wins jobs today."
5. **One idea per section, one CTA in sight.**
6. **Honest about being early.** No "trusted by hundreds." The advantage is a real person who'll personally look at *your* business.
7. **The free check is always the soft ask**, framed as value to them ("see what AI says about you"), never as lead capture ("book a consultation").

---

## 8. Technical implementation (Next.js 16 / React 19 / Tailwind v4)

> Per `web/CLAUDE.md`: read `web/node_modules/next/dist/docs/` before writing code; this is Next 16 / React 19 / Tailwind v4 — no Next 14/15 patterns.

### Design tokens — `app/tokens.css`

Remap the `@theme` block from black/white + lime (`#000`/`#fff`/`#ccff00`) to the `DESIGN.md` charcoal + Signal set: `--color-surface #121414`, tonal layers, `--color-signal #f3fc85`, text `#e2e2e2`/`#c8c8b3`, borders, status orange/red. Keep legacy aliases populated during migration so unmigrated components still resolve, then remove once all components are migrated. Update `--font-heading`/`--font-sans` to Hanken Grotesk; keep `--font-mono` → JetBrains Mono.

### Fonts — `app/layout.tsx`

Swap `Plus_Jakarta_Sans` → `Hanken_Grotesk` (`next/font/google`, weights 400/600/700/800). Remove `Orbitron`. Keep `JetBrains_Mono`. Update the `<html>` `className` font variables. Rewrite `metadata` (title/description/keywords/OG) for the tradie/AEO positioning.

### Brand data — `lib/business.ts`

Keep `name: "OperateAI"`, `url`, `abn`, Perth address, en-AU. Rewrite `tagline`/`description` to the tradie value prop ("get found, recommended and booked by AI"). Trim `areaServed` to Perth / WA. Supply `telephone` (mobile) — **needs founder input**. Update `NAV_LABELS`.

### Nav — `lib/nav.ts`

`PRIMARY_NAV` → `How it works`, `Articles`, `About` (+ the Free AI Check button rendered separately in the header). Keep `FOOTER_LEGAL`.

### Pages

- **Add:** `app/check/page.tsx`, `app/how-it-works/page.tsx`, `app/articles/page.tsx`, `app/articles/[slug]/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.
- **Rewrite:** `app/page.tsx` (home), `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`, `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.tsx`.
- **Delete:** `app/ai-integration-services/`, `app/ai-agents-for-business/`, `app/ai-agent-hosting/`, `app/ai-training-for-business/`, `app/perth-ai-consultant/`, `app/book-ai-audit/`, `app/industries/` (hub + 6 children).

### Components

- **New:** `components/ai-readout.tsx` (the motif), `components/check/check-form.tsx` (reuses enquiry POST), home section components under `components/home/*` (hero, the-shift, why-tradies, check-cta, how-it-works-grid, credibility, forward-position, latest-articles, final-cta).
- **Reuse:** `scroll-reveal`, `json-ld`/`structured-data`, `site-header`, `site-footer`, `prose`, `faq-section` (for `/how-it-works` later), `cn`, `contact-form` (basis for fallback form).
- **Delete:** `components/service/`, `components/industry/`, and the current particle homepage (`components/home/particle-canvas.tsx`, `stage-shell.tsx`) replaced by the new home sections.

### Content — `content/insights/` → articles

Repurpose the `lib/insights.ts` collection as the articles source: rename to `lib/articles.ts` and move content to `content/articles/`; route is `/articles`. Add `tags` + `author` to frontmatter. Add the **"Your Next Customer Won't Scroll Google"** article as the first post. The 5 existing AAO/generic insight MDX files are archived (removed from routes) unless re-edited to fit the tradie audience.

### API — `app/api/enquiry/route.ts` + `lib/email.ts`

Reuse. Add a `source` field (`ai-visibility-check` | `contact`) and ensure all check fields (business, suburb, trade, contact, note) are captured and emailed. Keep graceful no-op when Resend is unset. Add honeypot + simple rate-limit.

### SEO / AEO — `lib/schema.ts`

Update JSON-LD builders to emit `LocalBusiness` (`ProfessionalService`, Perth service-area, no street address), `Service`, and `Article`. Plain-text, semantic headings, fast LCP. The site must pass its own "is this AI-readable?" test.

### Tests — `web/__tests__/`

Rewrite `routes.smoke.test.ts` for the new route set + headline needles. Replace `particle-scroll.spec.ts` (particle home is gone) with checks for: hero readout renders, `/check` form renders + required fields + confirmation state, no console errors, 404. Run `/route-smoke-check` before deploy.

---

## 9. Out of scope (v1) / YAGNI

- Automated AI-report generation, payments, booking calendars, CRM, user logins.
- A second vertical (FIFO or other) — vertical depth first.
- Pricing tables / productised packages on the site.
- A large content library (the system supports it; we ship one article).

---

## 10. Open items / assumptions (need founder input)

1. **Turnaround** `[TURNAROUND]` for the rundown (e.g. "1 business day").
2. **Mobile number** for `lib/business.ts`, header/footer, SMS contact.
3. **Real photography** — source WA trades photos (or interim treatment plan) before launch; no stock.
4. **Proof assets** — any real results / reviews / before-after AI answers to seed the credibility band (else it runs honest-but-thin by design).
5. **Article final text** — confirm the published "Won't Scroll Google" copy + the contact line / P.S. wording for the site.
6. **Domain/DNS** — `operateai.com.au` → Vercel still pending per repo README.

---

## 11. Success criteria

- One narrow audience (WA tradies), one north-star action (the free check), reachable from every page.
- The site itself is AEO-exemplary (plain text, JSON-LD, fast) — it demonstrates the product.
- Dark/Signal aesthetic retained but reads credible, not generic enterprise AI.
- Articles system ready to scale into the authority hub with no re-architecting.
- `/route-smoke-check` green before deploy.
