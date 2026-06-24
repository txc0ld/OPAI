# Website + Agent Examples (Demo Showcase) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a device-framed gallery of 4 example website mockups to `/websites/` and 5 agent conversation demos to `/ioagent/`, so prospects can see build quality and understand what the agents do.

**Architecture:** Static, data-driven. A typed `content/work.ts` holds both datasets. Four standalone HTML mockups (in `design/mockups/`) are rendered to PNGs (committed Playwright script) into `web/public/work/`. Reusable components (`BrowserFrame`, `WebsiteGallery`, `AgentDemo`, `AgentDemos`) render the data and are dropped into the two existing pages. No new routes or nav.

**Tech Stack:** Next.js 16 (App Router, Tailwind v4, TS strict), `next/image`, `@playwright/test` (chromium, for offline mockup rendering), existing UI primitives (`Section`, `MonoLabel`).

## Global Constraints

- Package manager `pnpm@10.28.2`; run web commands from `web/`. Run the mockup render script from repo root.
- TypeScript strict; `trailingSlash: true`; lint runs on edits + `pnpm lint`.
- Reuse existing primitives and design tokens (`var(--color-...)` from `app/tokens.css`); phone-frame styling mirrors `web/components/mock/examples.tsx` (`MissedCall`).
- **Honesty (enforced in every review):** everything is a clearly-labelled demonstration. Website cards carry an "Example build" badge; agent demos carry a "Demo" badge; each section opens with: *"Example builds and demo conversations — illustrations of what we make, not real client work."* Fictional business names only; NONE may match a business named in `tools/check-cli/snapshots/perth-trades.json`. No fabricated testimonials, real-looking review counts presented as real, or claimed results.
- Voice: blunt, plain-English, en-AU. No em-dash-heavy headings.
- Test cycle (no unit runner): `pnpm exec tsc --noEmit` + `pnpm lint` + (where a page changes) a Playwright smoke assertion. Final gate adds `pnpm build` + `/route-smoke-check` + a visual screenshot check.

## Website Mockup Build Procedure (shared by Tasks 3–6)

Each mockup is a **single self-contained HTML file** at `design/mockups/<key>.html`, rendered to `web/public/work/site-<key>.png`.

- One-page site with, in order: a hero (business name, tagline, primary CTA, hero visual via CSS — no external images), a services block, a trust/proof strip (GENERIC and non-attributed — e.g. "Licensed & insured", "20+ years in Perth", "Same-day callouts" — NO fabricated review counts or named testimonials), and a contact/CTA footer.
- Self-contained: inline `<style>`, Google Fonts via `<link>` allowed, CSS/SVG/gradients only — **no external image files** (so rendering is deterministic).
- Distinct visual identity per mockup (see each task) — they must look like four different real businesses, NOT four OperateAI-branded pages. Do not use the Signal lime unless it genuinely suits that mockup's palette.
- Build the HTML with the **frontend-design** skill for genuinely premium quality.
- Render: from repo root run `node design/mockups/render.mjs` (created in Task 3). It loads every `design/mockups/*.html` at viewport 1440×1000, deviceScaleFactor 2, and writes `web/public/work/site-<key>.png`. Verify the PNG exists and looks right.

---

## Task 1: Work data module

**Files:**
- Create: `web/content/work.ts`

**Interfaces:**
- Produces:
  - `type WebsiteExample = { key: string; business: string; trade: string; blurb: string; url: string; image: string; alt: string }`
  - `type AgentMsg = { from: "agent" | "customer"; text: string }`
  - `type AgentDemoData = { key: string; name: string; tagline: string; messages: AgentMsg[]; handles: string[]; control: string }`
  - `WEBSITE_EXAMPLES: WebsiteExample[]` (4) and `AGENT_DEMOS: AgentDemoData[]` (5)

- [ ] **Step 1: Write the data module**

Create `web/content/work.ts`:

```ts
// Demo showcase data. All examples are illustrations, not real client work.
export type WebsiteExample = {
  key: string;
  business: string;
  trade: string;
  blurb: string;
  url: string; // faux URL shown in the browser frame
  image: string; // /work/site-<key>.png
  alt: string;
};

export type AgentMsg = { from: "agent" | "customer"; text: string };

export type AgentDemoData = {
  key: string;
  name: string;
  tagline: string;
  messages: AgentMsg[];
  handles: string[];
  control: string; // the "you stay in control" guarantee
};

export const WEBSITE_EXAMPLES: WebsiteExample[] = [
  {
    key: "coastal-plumbing",
    business: "Coastal Plumbing & Gas",
    trade: "Plumber",
    blurb: "Bold, trust-first, built for 24/7 emergency callouts.",
    url: "coastalplumbing.com.au",
    image: "/work/site-coastal-plumbing.png",
    alt: "Example website mockup for a Perth plumbing business",
  },
  {
    key: "brightwire",
    business: "Brightwire Electrical",
    trade: "Electrician",
    blurb: "Dark, modern and technical, with clear service tiers.",
    url: "brightwire.com.au",
    image: "/work/site-brightwire.png",
    alt: "Example website mockup for a Perth electrical business",
  },
  {
    key: "tide-co",
    business: "Tide & Co Building",
    trade: "Builder",
    blurb: "Architectural and editorial, leading with the work.",
    url: "tideandco.com.au",
    image: "/work/site-tide-co.png",
    alt: "Example website mockup for a Perth building company",
  },
  {
    key: "glow-skin",
    business: "Glow Skin & Laser",
    trade: "Skin clinic",
    blurb: "Elegant and calm, for a premium booking experience.",
    url: "glowskin.com.au",
    image: "/work/site-glow-skin.png",
    alt: "Example website mockup for a Perth skin clinic",
  },
];

export const AGENT_DEMOS: AgentDemoData[] = [
  {
    key: "reception",
    name: "Reception agent",
    tagline: "Answers every enquiry the moment it lands.",
    messages: [
      { from: "customer", text: "Hi, do you do blocked drains? Ours is backing up in Subiaco." },
      { from: "agent", text: "Yes, blocked drains are our bread and butter. Can I grab the address and a contact number so we can get someone out?" },
      { from: "customer", text: "42 Rokeby Rd, 0412 345 678. It's pretty urgent." },
      { from: "agent", text: "Got it. We've got a 1 to 3pm or a 3 to 5pm window today, which suits? I'll lock it in and text you a confirmation." },
    ],
    handles: ["Answers enquiries instantly, day or night", "Captures the address, job and urgency", "Offers real time windows and books the job"],
    control: "books only the times you've opened",
  },
  {
    key: "missed-call",
    name: "Missed-call follow-up",
    tagline: "Never lose a job to a missed call again.",
    messages: [
      { from: "agent", text: "Hi, it's Brightwire Electrical, sorry we missed your call. What can we help with?" },
      { from: "customer", text: "Switchboard keeps tripping and the lights are flickering." },
      { from: "agent", text: "Sounds like it needs a look today. I can have an electrician call you in 10 minutes to sort a time, does this number work?" },
      { from: "customer", text: "Yes please." },
    ],
    handles: ["Texts back missed calls in seconds", "Qualifies the job before you call", "Hands you a warm, ready lead"],
    control: "sends only your approved templates",
  },
  {
    key: "reviews",
    name: "Reviews agent",
    tagline: "More reviews, replied to, without you chasing.",
    messages: [
      { from: "agent", text: "Hi Sarah, thanks for choosing us yesterday. If you've got 20 seconds, a quick Google review means a lot. Here's the link." },
      { from: "customer", text: "Just left you 5 stars!" },
      { from: "agent", text: "Legend, thank you. We really appreciate it." },
    ],
    handles: ["Asks every happy customer for a review", "Drafts replies to new reviews for your OK", "Keeps your rating fresh and recent"],
    control: "you approve every public reply before it posts",
  },
  {
    key: "quoting",
    name: "Quote & booking agent",
    tagline: "Qualifies and books, so you quote less and win more.",
    messages: [
      { from: "customer", text: "Roughly what would a new switchboard cost?" },
      { from: "agent", text: "For a standard home switchboard upgrade we're usually in the $1,200 to $1,800 range, depending on the board and circuits. Want me to book a free site visit for an exact quote?" },
      { from: "customer", text: "Yeah, Thursday if possible." },
      { from: "agent", text: "Thursday 9 to 11am is open, booked. You'll get a confirmation and a reminder the day before." },
    ],
    handles: ["Qualifies the job and gives a ballpark", "Quotes only from your price list", "Books site visits to your calendar"],
    control: "ballparks come from your numbers, never made up",
  },
  {
    key: "back-office",
    name: "Back-office agent",
    tagline: "The admin you hate, handled before you're up.",
    messages: [
      { from: "agent", text: "Morning. Invoice #1042 ($680, Dave K.) is 9 days overdue. I've drafted a friendly reminder, send it?" },
      { from: "customer", text: "Yep, send it." },
      { from: "agent", text: "Sent. Also, 3 quotes are awaiting follow-up and tomorrow has 4 jobs booked. Want the run sheet?" },
      { from: "customer", text: "Please." },
    ],
    handles: ["Chases overdue invoices politely", "Preps quotes and run sheets", "Keeps your tools and schedule in sync"],
    control: "never sends payment threats, flags anything sensitive for you",
  },
];
```

- [ ] **Step 2: Verify**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add web/content/work.ts
git commit -m "feat(work): demo showcase data (website examples + agent demos)"
```

---

## Task 2: BrowserFrame component

**Files:**
- Create: `web/components/work/browser-frame.tsx`

**Interfaces:**
- Produces: `BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string })`

- [ ] **Step 1: Write the component**

Create `web/components/work/browser-frame.tsx`:

```tsx
import Image from "next/image";

// A CSS browser-window chrome wrapping a screenshot. Image is 1440x1000 (rendered at 2x).
export function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_40px_80px_-44px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3" style={{ background: "var(--color-surface-high)" }}>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span
          className="ml-2 truncate rounded-md px-3 py-1 font-mono text-[11px] text-[var(--color-fg-variant)]"
          style={{ background: "var(--color-surface-container)" }}
        >
          {url}
        </span>
      </div>
      <Image src={src} alt={alt} width={1440} height={1000} loading="lazy" className="h-auto w-full" />
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors. (The image files don't exist yet; that's fine — `next/image` with a string src does not require the file at compile time.)

- [ ] **Step 3: Commit**

```bash
git add web/components/work/browser-frame.tsx
git commit -m "feat(work): BrowserFrame component"
```

---

## Task 3: Mockup — Coastal Plumbing & Gas (+ render script)

**Files:**
- Create: `design/mockups/render.mjs`
- Create: `design/mockups/coastal-plumbing.html`
- Create (generated): `web/public/work/site-coastal-plumbing.png`

- [ ] **Step 1: Write the render script**

Create `design/mockups/render.mjs`:

```js
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("design/mockups");
const outDir = path.resolve("web/public/work");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
for (const f of files) {
  const key = f.replace(/\.html$/, "");
  await page.goto("file://" + path.join(dir, f), { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, `site-${key}.png`) });
  console.log("rendered", key);
}
await browser.close();
```

- [ ] **Step 2: Build the mockup (frontend-design skill)**

Create `design/mockups/coastal-plumbing.html` per the Website Mockup Build Procedure. **Identity:** bold, trust-first emergency plumber. Deep navy/charcoal base, a strong warm-or-red accent (NOT lime), heavy confident type, a prominent "Call now, 24/7" CTA, an emergency-callout hero. Sections: hero, services (burst pipes, blocked drains, hot water, gas), trust strip (Licensed & insured · 24/7 emergency · Upfront pricing), contact/CTA. Plumber-appropriate, not OperateAI-branded.

- [ ] **Step 3: Render + verify**

Run: `node design/mockups/render.mjs`
Expected: prints `rendered coastal-plumbing`; `web/public/work/site-coastal-plumbing.png` exists (~1440-wide @2x). Open it and confirm it looks like a premium plumber site.

- [ ] **Step 4: Commit**

```bash
git add design/mockups/render.mjs design/mockups/coastal-plumbing.html web/public/work/site-coastal-plumbing.png
git commit -m "feat(work): Coastal Plumbing mockup + render script"
```

---

## Task 4: Mockup — Brightwire Electrical

**Files:**
- Create: `design/mockups/brightwire.html`
- Create (generated): `web/public/work/site-brightwire.png`

- [ ] **Step 1: Build the mockup (frontend-design skill)**

Create `design/mockups/brightwire.html` per the Website Mockup Build Procedure. **Identity:** dark, modern, technical electrician. Near-black base with an electric blue or amber accent, crisp sans type, a grid/circuit motif (CSS only), clear service tiers (switchboards, EV chargers, lighting, faults). Sections: hero, services with tiers, trust strip (Master Electrician · Same-day faults · 12-month workmanship guarantee), contact/CTA.

- [ ] **Step 2: Render + verify**

Run: `node design/mockups/render.mjs`
Expected: prints `rendered brightwire` (and re-renders existing ones harmlessly); `web/public/work/site-brightwire.png` exists. Confirm it reads as a distinctly different (dark, technical) site from Coastal Plumbing.

- [ ] **Step 3: Commit**

```bash
git add design/mockups/brightwire.html web/public/work/site-brightwire.png
git commit -m "feat(work): Brightwire Electrical mockup"
```

---

## Task 5: Mockup — Tide & Co Building

**Files:**
- Create: `design/mockups/tide-co.html`
- Create (generated): `web/public/work/site-tide-co.png`

- [ ] **Step 1: Build the mockup (frontend-design skill)**

Create `design/mockups/tide-co.html` per the Website Mockup Build Procedure. **Identity:** architectural, editorial builder. Stone/neutral palette (warm greys, off-white), large serif or refined display headings, generous whitespace, a project-led layout (the work is the hero, via CSS image blocks/gradients — no external files). Sections: hero, "what we build" (new homes, renovations, extensions), process/craft note, trust strip (Registered builder · 30 years in Perth · Fixed-price contracts), contact/CTA.

- [ ] **Step 2: Render + verify**

Run: `node design/mockups/render.mjs`
Expected: prints `rendered tide-co`; `web/public/work/site-tide-co.png` exists. Confirm it reads as editorial/architectural, clearly different from the first two.

- [ ] **Step 3: Commit**

```bash
git add design/mockups/tide-co.html web/public/work/site-tide-co.png
git commit -m "feat(work): Tide & Co Building mockup"
```

---

## Task 6: Mockup — Glow Skin & Laser

**Files:**
- Create: `design/mockups/glow-skin.html`
- Create (generated): `web/public/work/site-glow-skin.png`

- [ ] **Step 1: Build the mockup (frontend-design skill)**

Create `design/mockups/glow-skin.html` per the Website Mockup Build Procedure. **Identity:** elegant, calm skin clinic. Soft blush/cream palette, a refined serif for headings, airy spacing, a premium "book a consultation" feel. Sections: hero, treatments (skin, laser, injectables, facials), a calm "why us" note, trust strip (Registered nurses · Consultation-first · Subiaco clinic), book/contact CTA. Proves we build beyond trades.

- [ ] **Step 2: Render + verify**

Run: `node design/mockups/render.mjs`
Expected: prints `rendered glow-skin`; `web/public/work/site-glow-skin.png` exists. Confirm all 4 PNGs now exist and the four look like four different businesses.

- [ ] **Step 3: Commit**

```bash
git add design/mockups/glow-skin.html web/public/work/site-glow-skin.png
git commit -m "feat(work): Glow Skin & Laser mockup"
```

---

## Task 7: WebsiteGallery component + wire into /websites/

**Files:**
- Create: `web/components/work/website-gallery.tsx`
- Modify: `web/app/websites/page.tsx` (insert a section between Packages and Faq, ~line 151–153)
- Modify: `web/__tests__/routes.smoke.test.ts` (add a needle for the gallery)

**Interfaces:**
- Consumes: `WEBSITE_EXAMPLES` (Task 1), `BrowserFrame` (Task 2), `Section`, `MonoLabel`.
- Produces: `WebsiteGallery()`.

- [ ] **Step 1: Write the gallery component**

Create `web/components/work/website-gallery.tsx`:

```tsx
import { BrowserFrame } from "@/components/work/browser-frame";
import { WEBSITE_EXAMPLES } from "@/content/work";

export function WebsiteGallery() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      {WEBSITE_EXAMPLES.map((w) => (
        <figure key={w.key}>
          <BrowserFrame src={w.image} alt={w.alt} url={w.url} />
          <figcaption className="mt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-[var(--color-fg)]">{w.business}</div>
              <div className="mt-0.5 text-[14px] leading-[1.5] text-[var(--color-fg-variant)]">
                {w.trade} · {w.blurb}
              </div>
            </div>
            <span className="flex-none rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">
              Example build
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Insert the section on /websites/**

In `web/app/websites/page.tsx`, add the import near the other component imports:

```tsx
import { WebsiteGallery } from "@/components/work/website-gallery";
```

Then insert this new `Section` immediately AFTER the Packages `</Section>` (the one with `id="packages"`) and BEFORE `<Faq tone="paper" ... />`:

```tsx
      {/* Example builds */}
      <Section tone="paper">
        <MonoLabel tone="light">Example builds</MonoLabel>
        <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
          The kind of site we build.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
          Example builds, not client work, four different businesses, four different looks. Every one is built so AI can
          read the services, area and pricing.
        </p>
        <WebsiteGallery />
      </Section>
```

- [ ] **Step 3: Add a smoke needle**

In `web/__tests__/routes.smoke.test.ts`, change the `/websites/` route's needle to assert the gallery copy is present. Replace the line:

```ts
  { path: "/websites/", needle: /A website AI can read/i },
```

with:

```ts
  { path: "/websites/", needle: /The kind of site we build/i },
```

- [ ] **Step 4: Verify**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds.
Run: `cd web && pnpm exec playwright test routes.smoke -g "/websites/"`
Expected: PASS (gallery heading visible). If a stray dev server on 3456 blocks Playwright, stop it (PowerShell `Get-NetTCPConnection -LocalPort 3456 -State Listen` → `Stop-Process -Id <pid> -Force`) and re-run.

- [ ] **Step 5: Commit**

```bash
git add web/components/work/website-gallery.tsx web/app/websites/page.tsx web/__tests__/routes.smoke.test.ts
git commit -m "feat(work): website examples gallery on /websites/"
```

---

## Task 8: AgentDemo + AgentDemos components + wire into /ioagent/

**Files:**
- Create: `web/components/work/agent-demo.tsx`
- Create: `web/components/work/agent-demos.tsx`
- Modify: `web/app/ioagent/page.tsx` (insert a section after the "What it takes off your plate" `</Section>`, ~line 157)

**Interfaces:**
- Consumes: `AGENT_DEMOS`, `AgentDemoData` (Task 1), `Section`, `MonoLabel`.
- Produces: `AgentDemo({ demo }: { demo: AgentDemoData })`, `AgentDemos()`.

- [ ] **Step 1: Write the AgentDemo component**

Create `web/components/work/agent-demo.tsx`:

```tsx
import type { AgentDemoData } from "@/content/work";

// Phone-frame transcript + a "what it handles / you stay in control" panel.
// Phone styling mirrors components/mock/examples.tsx (the customer's phone:
// agent messages on the left in grey, the other person on the right in signal).
export function AgentDemo({ demo }: { demo: AgentDemoData }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="flex justify-center">
        <div className="w-full max-w-[330px] rounded-[2.4rem] border border-[var(--color-border)] bg-[#0c0c0c] p-2.5 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)]">
          <div className="rounded-[1.9rem] bg-[#111111] p-5">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/15" aria-hidden />
            <div className="grid gap-2.5">
              {demo.messages.map((m, i) =>
                m.from === "agent" ? (
                  <div
                    key={i}
                    className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#262626] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[var(--color-fg)]"
                  >
                    {m.text}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-signal)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--color-on-signal)]"
                  >
                    {m.text}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="inline-block rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">
          Demo
        </span>
        <h3 className="mt-4 text-[22px] font-bold tracking-tight text-[var(--color-fg)]">{demo.name}</h3>
        <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-fg-variant)]">{demo.tagline}</p>
        <ul className="mt-5 grid gap-2.5">
          {demo.handles.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[var(--color-fg)]">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-signal)]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-[14px] leading-[1.5] text-[var(--color-fg-variant)]">
          <span className="font-semibold text-[var(--color-fg)]">You stay in control:</span> {demo.control}.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write the AgentDemos wrapper**

Create `web/components/work/agent-demos.tsx`:

```tsx
import { AgentDemo } from "@/components/work/agent-demo";
import { AGENT_DEMOS } from "@/content/work";

export function AgentDemos() {
  return (
    <div className="mt-12 grid gap-16">
      {AGENT_DEMOS.map((demo, i) => (
        <div key={demo.key} className={i % 2 === 1 ? "lg:[&>div>div:first-child]:order-2" : undefined}>
          <AgentDemo demo={demo} />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Insert the section on /ioagent/**

In `web/app/ioagent/page.tsx`, add the import near the other imports:

```tsx
import { AgentDemos } from "@/components/work/agent-demos";
```

Then insert this new `Section` immediately AFTER the "What it takes off your plate" `</Section>` (the `tone="paper-warm"` JOBS section) and BEFORE the "How it works" `<Section tone="dark">`:

```tsx
      {/* See it in action */}
      <Section tone="void">
        <MonoLabel>See it in action</MonoLabel>
        <h2 className="mt-5 max-w-[24ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          What an agent actually does.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.6] text-[var(--color-fg-variant)]">
          Demo conversations, not real client chats. A taste of the jobs an agent runs for you, and where you stay in
          control.
        </p>
        <AgentDemos />
      </Section>
```

- [ ] **Step 4: Verify**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: build succeeds.
Run: `cd web && pnpm exec playwright test routes.smoke -g "/ioagent/"`
Expected: PASS. (The existing `/ioagent/` needle `/Your own AI agent/i` still matches the hero.)

- [ ] **Step 5: Commit**

```bash
git add web/components/work/agent-demo.tsx web/components/work/agent-demos.tsx web/app/ioagent/page.tsx
git commit -m "feat(work): agent demos section on /ioagent/"
```

---

## Task 9: Full verification + visual review

**Files:** none (verification only)

- [ ] **Step 1: Full local gate**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint && pnpm build && pnpm exec playwright test`
Expected: all green; `/websites/` and `/ioagent/` build with the new sections.

- [ ] **Step 2: Visual check**

Start the dev server (`cd web && pnpm dev --port 3477`), then screenshot `/websites/` and `/ioagent/` (desktop 1440 + mobile 390). Confirm: the 4 site mockups render in browser frames and look distinct/premium; the "Example build" + "Demo" badges and the honesty lines are present; phone-frame demos stack cleanly on mobile; no broken images.

- [ ] **Step 3: Route smoke check**

Run the `/route-smoke-check` workflow per CLAUDE.md.
Expected: passes; the two changed routes still covered.

- [ ] **Step 4: Done**

No commit (verification only). Report results; finishing-a-development-branch handles merge/push.

---

## Self-Review

**Spec coverage:**
- 4 website mockups, distinct aesthetics, fictional names → Tasks 3–6. ✓
- Device-framed gallery on /websites/ with "Example build" badge + honesty line → Tasks 2, 7. ✓
- 5 agent demos (reception, missed-call, reviews, quoting, back-office) with transcript + control panel + "Demo" badge + honesty line → Tasks 1, 8. ✓
- Folded into existing pages, no new routes/nav → Tasks 7, 8. ✓
- Data-driven single source → Task 1. ✓
- Honesty enforced (fictional names checked vs snapshot data, no fabricated results) → Global Constraints + per-task reviews. ✓
- next/image lazy + sized → Task 2. ✓
- Mockup HTML committed for reproducibility (`design/mockups/`), only PNGs shipped → Tasks 3–6. ✓
- Verify (tsc/lint/build/playwright/route-smoke + visual) → Task 9. ✓

**Placeholder scan:** No "TBD/TODO". Tasks 3–6 are design tasks: they give a complete brief (identity, sections, palette, constraints, exact output path, exact render command) — the creative HTML is the deliverable, as intended for frontend-design work.

**Type consistency:** `WebsiteExample` (key/business/trade/blurb/url/image/alt) used by `BrowserFrame`(src/alt/url) + `WebsiteGallery` (Tasks 1,2,7) — consistent. `AgentMsg`(from "agent"|"customer", text) + `AgentDemoData`(key/name/tagline/messages/handles/control) used by `AgentDemo`/`AgentDemos` (Tasks 1,8) — consistent. Image dimensions 1440×1000 match the render viewport (Task 3 procedure) and `BrowserFrame` Image props (Task 2). ✓
