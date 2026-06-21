# OperateAI Tradie-First Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `web/` marketing site as a WA-tradie funnel whose single north-star action is a free "AI Visibility Check", on the dark/Signal visual system, collapsing the current 16-route AAO/OperateAI site.

**Architecture:** Next.js 16 App Router site. New design tokens (charcoal + Signal acid-green) in `app/tokens.css`; Hanken Grotesk + JetBrains Mono fonts. A small set of shared UI primitives (`Section`, `MonoLabel`, `CheckButton`, `AIReadout`) compose every page. The free check reuses the existing `/api/enquiry` → Resend pipeline with a `source` tag and a manual human-reply flow. Articles become a real content collection that can scale into an authority hub later.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, TypeScript (strict), MDX (`@next/mdx` + `gray-matter`), Playwright (smoke tests), Resend (email), `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-06-21-operateai-tradie-redesign-design.md`

**Branch:** `redesign/tradie-funnel` (already created; the spec + audit-cli commits are on it).

**Before you start:** Per `web/CLAUDE.md`, read the relevant guide in `web/node_modules/next/dist/docs/` before writing code — this is Next 16 / React 19 / Tailwind v4, not Next 14/15. Run all commands from `web/`. Invoke the `nextjs16-reviewer` agent after each page/component task.

---

## File Structure

**Foundation (modify):**
- `web/app/tokens.css` — palette + font vars (charcoal/Signal, Hanken/JetBrains)
- `web/app/globals.css` — body base colours
- `web/app/layout.tsx` — fonts, metadata
- `web/lib/business.ts` — brand/contact/value-prop constants
- `web/lib/nav.ts` — primary nav + footer legal

**Shared UI (create):**
- `web/components/ui/section.tsx` — section/container wrapper
- `web/components/ui/mono-label.tsx` — `label-caps` mono eyebrow
- `web/components/ui/check-button.tsx` — primary CTA link to `/check`
- `web/components/ai-readout.tsx` — the "what AI says" terminal/answer card motif

**Conversion (create/modify):**
- `web/lib/email.ts` — extend payload with tradie-check fields + `source`
- `web/app/api/enquiry/route.ts` — accept + validate new fields
- `web/components/check/check-form.tsx` — the 5-field check form
- `web/app/check/page.tsx` — the conversion page

**Pages (create):** `web/app/how-it-works/page.tsx`, `web/app/about/page.tsx`, `web/app/contact/page.tsx`, `web/app/articles/page.tsx`, `web/app/articles/[slug]/page.tsx`
**Home (create sections + rewrite):** `web/components/home/*` + `web/app/page.tsx`
**Content (create):** `web/lib/articles.ts`, `web/content/articles/your-next-customer-wont-scroll-google.mdx`

**SEO (modify):** `web/lib/schema.ts`, `web/components/structured-data.tsx`, `web/app/sitemap.ts`, `web/app/robots.ts`, `web/app/opengraph-image.tsx`, `web/app/icon.tsx`, `web/app/not-found.tsx`, `web/app/legal/privacy/page.tsx`, `web/app/legal/terms/page.tsx`

**Delete:** the 4 service pages, 6 industry pages + hub, `/perth-ai-consultant`, `/book-ai-audit`, `components/service/`, `components/industry/`, `components/home/particle-canvas.tsx`, `components/home/stage-shell.tsx`, `content/insights/` (after migration), `lib/insights.ts`, `__tests__/particle-scroll.spec.ts`

**Tests (modify):** `web/__tests__/routes.smoke.test.ts`, replace `web/__tests__/particle-scroll.spec.ts` → `web/__tests__/funnel.spec.ts`

---

## Token reference (use these var names everywhere)

After Task 1 these are available globally. Use Tailwind arbitrary values, e.g. `bg-[var(--color-surface)]`, matching the existing codebase style.

| Var | Value | Use |
|---|---|---|
| `--color-surface` | `#121414` | page background |
| `--color-surface-lowest` | `#0c0f0f` | readout terminals |
| `--color-surface-low` | `#1a1c1c` | alt bands |
| `--color-surface-container` | `#1e2020` | cards |
| `--color-surface-high` | `#282a2b` | chips, hover |
| `--color-fg` | `#e2e2e2` | primary text |
| `--color-fg-variant` | `#c8c8b3` | secondary text |
| `--color-signal` | `#f3fc85` | accent (sparingly) |
| `--color-on-signal` | `#1b1d00` | text on Signal |
| `--color-border` | `#2a2a2a` | 1px borders |
| `--color-outline` | `#474838` | stronger borders |
| `--color-warning` | `#ffb86b` | status: warning |
| `--color-error` | `#ffb4ab` | status: error |

---

## Task 1: Design tokens

**Files:**
- Modify: `web/app/tokens.css`
- Modify: `web/app/globals.css` (body colours only)

- [ ] **Step 1: Rewrite `app/tokens.css`**

```css
@theme {
  /* Surfaces (tonal layering, no soft shadows) */
  --color-surface: #121414;
  --color-surface-lowest: #0c0f0f;
  --color-surface-low: #1a1c1c;
  --color-surface-container: #1e2020;
  --color-surface-high: #282a2b;

  /* Text */
  --color-fg: #e2e2e2;
  --color-fg-variant: #c8c8b3;

  /* Signal accent */
  --color-signal: #f3fc85;
  --color-on-signal: #1b1d00;

  /* Borders */
  --color-border: #2a2a2a;
  --color-outline: #474838;

  /* Status */
  --color-warning: #ffb86b;
  --color-error: #ffb4ab;

  /* White opacity tiers (legacy components still resolve these) */
  --color-w70: rgba(226, 226, 226, 0.7);
  --color-w50: rgba(226, 226, 226, 0.5);
  --color-w30: rgba(226, 226, 226, 0.3);
  --color-w10: rgba(226, 226, 226, 0.1);

  /* Legacy aliases mapped onto the new system so unmigrated components work */
  --color-bg: var(--color-surface);
  --color-accent: var(--color-signal);
  --color-paper: var(--color-surface);
  --color-on-surface: var(--color-fg);
  --color-muted: var(--color-fg-variant);
  --color-rule: var(--color-border);

  /* Fonts (CSS vars set by next/font in layout.tsx) */
  --font-sans: var(--font-hanken);
  --font-heading: var(--font-hanken);
  --font-mono: var(--font-jetbrains);

  /* Typographic scale */
  --text-display: clamp(40px, 8vw, 76px);
  --text-section: clamp(28px, 4.5vw, 44px);
  --text-lede: clamp(17px, 2vw, 21px);

  /* Spacing rhythm */
  --section-pad-y: 7rem;
  --section-pad-y-mobile: 4.5rem;
  --container-max: 1200px;
  --measure: 65ch;

  /* Easing */
  --ease: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 2: Set body base colours in `app/globals.css`**

Find the `body` rule (or the `@layer base` body block). Ensure it reads:

```css
body {
  background-color: var(--color-surface);
  color: var(--color-fg);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 3: Verify build compiles**

Run: `pnpm build`
Expected: build succeeds (existing pages still render via legacy aliases; visuals will look transitional until later tasks delete them).

- [ ] **Step 4: Commit**

```bash
git add web/app/tokens.css web/app/globals.css
git commit -m "feat(tokens): charcoal + Signal design tokens"
```

---

## Task 2: Fonts + root metadata

**Files:**
- Modify: `web/app/layout.tsx`

- [ ] **Step 1: Replace the font imports and metadata in `app/layout.tsx`**

Replace the font import block (lines 2, 10–28) and the `<html className>` (line 92). New top of file:

```tsx
import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});
```

Replace the `metadata` object with:

```tsx
export const metadata: Metadata = {
  title: {
    default: "OperateAI | Get your trade business found and recommended by AI",
    template: "%s | OperateAI",
  },
  description: BUSINESS.description,
  metadataBase: new URL(BUSINESS.url),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Local marketing for trades",
  keywords: [
    "get found by AI",
    "AI recommendations for tradies",
    "Google Business Profile for tradies",
    "tradie marketing Perth",
    "get recommended by ChatGPT",
    "AI search for trades",
    "Perth plumber marketing",
    "Perth electrician marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "OperateAI | Get your trade business found and recommended by AI",
    description: BUSINESS.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${BUSINESS.name}. ${BUSINESS.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperateAI | Get your trade business found and recommended by AI",
    description: BUSINESS.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};
```

Update the `<html>` element:

```tsx
    <html lang="en-AU" className={`${hanken.variable} ${mono.variable}`}>
```

- [ ] **Step 2: Verify build compiles**

Run: `pnpm build`
Expected: succeeds; no reference to `Plus_Jakarta_Sans` or `Orbitron` remains.

- [ ] **Step 3: Commit**

```bash
git add web/app/layout.tsx
git commit -m "feat(fonts): Hanken Grotesk + JetBrains Mono, tradie metadata"
```

---

## Task 3: Brand data + nav

**Files:**
- Modify: `web/lib/business.ts`
- Modify: `web/lib/nav.ts`

- [ ] **Step 1: Rewrite `lib/business.ts`**

Keep the shape; change copy + areaServed. `telephone` stays a real open item — leave `undefined` until the founder supplies a mobile (schema omits it automatically).

```ts
// Single source of truth for brand and contact details.
// Optional fields are omitted from schema until the operator supplies them.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://www.operateai.com.au",
  email: "hello@operateai.com.au",
  telephone: undefined as string | undefined,
  abn: "ABN 51 559 921 362",
  tagline: "Get your trade business found, recommended and booked by AI.",
  description:
    "When a Perth homeowner asks AI for a good tradie, it names two or three businesses. OperateAI gets WA trade businesses onto that shortlist — and ready for the day AI starts booking the jobs.",
  address: {
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: ["Perth", "Western Australia"],
  sameAs: [] as string[],
  founded: "2026",
  copyrightYear: 2026,
} as const;

export const NAV_LABELS = {
  howItWorks: "How it works",
  articles: "Articles",
  about: "About",
  check: "Free AI Check",
} as const;
```

- [ ] **Step 2: Rewrite `lib/nav.ts`**

```ts
export const PRIMARY_NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/articles/", label: "Articles" },
  { href: "/about/", label: "About" },
] as const;

// The primary CTA, rendered separately from PRIMARY_NAV in the header/footer.
export const CHECK_CTA = { href: "/check/", label: "Free AI Check" } as const;

export const FOOTER_LEGAL = [
  { href: "/legal/privacy/", label: "Privacy" },
  { href: "/legal/terms/", label: "Terms" },
] as const;
```

- [ ] **Step 3: Point the header/footer CTA at `/check/`**

In `components/site-header.tsx`: change both `href="/book-ai-audit/"` occurrences (lines ~65 and ~122) to `href="/check/"`, and change the link text from `Contact` / `Contact us →` to `Free AI Check` / `Free AI Check →`. Import is not required (literal href). In `components/site-footer.tsx`: change the `href="/book-ai-audit/"` (line ~37) to `href="/check/"` and label `Contact` → `Free AI Check`; update the footer blurb paragraph (lines 14–17) to:

```tsx
          <p className="mt-4 max-w-[360px] text-sm leading-[1.6] text-[var(--color-fg-variant)]">
            I help WA trade businesses get found, recommended and booked — sorted for how
            customers search now, and how AI is about to book them next. Perth, WA.
          </p>
```

And change the footer's right-hand `<span>Delivered worldwide</span>` (line 69) to `<span>Perth, WA</span>`.

- [ ] **Step 4: Verify build compiles**

Run: `pnpm build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add web/lib/business.ts web/lib/nav.ts web/components/site-header.tsx web/components/site-footer.tsx
git commit -m "feat(brand): tradie value prop, nav, header/footer CTA -> /check"
```

---

## Task 4: Shared UI primitives

**Files:**
- Create: `web/components/ui/section.tsx`, `web/components/ui/mono-label.tsx`, `web/components/ui/check-button.tsx`

- [ ] **Step 1: Create `components/ui/section.tsx`**

```tsx
import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer";
  id?: string;
};

export function Section({ children, className, containerClassName, as: Tag = "section", id }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("px-6 py-[var(--section-pad-y-mobile)] lg:px-12 lg:py-[var(--section-pad-y)]", className)}
    >
      <div className={cn("mx-auto w-full max-w-[var(--container-max)]", containerClassName)}>{children}</div>
    </Tag>
  );
}
```

- [ ] **Step 2: Create `components/ui/mono-label.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function MonoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `components/ui/check-button.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";
import { CHECK_CTA } from "@/lib/nav";

type CheckButtonProps = {
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function CheckButton({ label = "See what AI says about you", variant = "solid", className }: CheckButtonProps) {
  return (
    <Link
      href={CHECK_CTA.href}
      className={cn(
        "inline-flex items-center gap-2 rounded px-6 py-3.5 text-[15px] font-bold tracking-tight transition-all duration-300",
        variant === "solid"
          ? "bg-[var(--color-signal)] text-[var(--color-on-signal)] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(243,252,133,0.3)]"
          : "border border-[var(--color-signal)] text-[var(--color-signal)] hover:bg-[var(--color-signal)]/10",
        className,
      )}
    >
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add web/components/ui/
git commit -m "feat(ui): Section, MonoLabel, CheckButton primitives"
```

---

## Task 5: AI-readout motif component

**Files:**
- Create: `web/components/ai-readout.tsx`

- [ ] **Step 1: Create `components/ai-readout.tsx`**

A presentational terminal/answer card. `prompt` is the question; `names` are the businesses the AI "returns"; `hook` is the optional Signal closing line; `dim` greys it out (for the "five years ago" Google-list variant).

```tsx
import { cn } from "@/lib/cn";

type AIReadoutProps = {
  prompt: string;
  names: string[];
  hook?: string;
  caption?: string;
  dim?: boolean;
  className?: string;
};

export function AIReadout({ prompt, names, hook, caption, dim = false, className }: AIReadoutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-5 font-mono text-[13px] leading-[1.7]",
        dim && "opacity-60",
        className,
      )}
    >
      {caption ? (
        <div className="mb-4 text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">{caption}</div>
      ) : null}
      <div className="flex gap-2 text-[var(--color-fg-variant)]">
        <span className="select-none text-[var(--color-signal)]">&gt;</span>
        <span className="text-[var(--color-fg)]">{prompt}</span>
      </div>
      <ol className="mt-3 grid gap-1.5">
        {names.map((name, i) => (
          <li key={name} className="flex gap-2 text-[var(--color-fg)]">
            <span className="select-none text-[var(--color-fg-variant)]">{i + 1}.</span>
            <span>{name}</span>
          </li>
        ))}
      </ol>
      {hook ? (
        <div className="mt-4 flex items-center gap-2 text-[var(--color-signal)]">
          <span className="inline-block h-3 w-[7px] animate-pulse bg-[var(--color-signal)]" aria-hidden />
          {hook}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add web/components/ai-readout.tsx
git commit -m "feat: AIReadout motif component"
```

---

## Task 6: Extend the enquiry pipeline for the check

**Files:**
- Modify: `web/lib/email.ts`
- Modify: `web/app/api/enquiry/route.ts`

- [ ] **Step 1: Extend `EnquiryPayload` and the email body in `lib/email.ts`**

Replace the `EnquiryPayload` type (lines 1–8) with:

```ts
export type EnquiryPayload = {
  source: "ai-visibility-check" | "contact";
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  trade?: string;
  interest?: string;
  message?: string;
};
```

Replace the `rows`/`subject` construction. New `rows` (lines ~31–37) and `subject` (line ~73):

```ts
  const rows = [
    ["Source", payload.source === "ai-visibility-check" ? "AI Visibility Check" : "Contact form"],
    ["Business", payload.company || payload.name],
    ["Contact name", payload.name],
    ["Suburb / area", payload.suburb || "Not supplied"],
    ["Trade", payload.trade || "Not supplied"],
    ["Email", payload.email || "Not supplied"],
    ["Phone", payload.phone || "Not supplied"],
  ];
```

```ts
      subject:
        payload.source === "ai-visibility-check"
          ? `AI Visibility Check: ${payload.company || payload.name} (${payload.suburb || "?"})`
          : `OperateAI contact: ${payload.name}`,
```

In the same `fetch` body, make `reply_to` tolerate a missing email:

```ts
      ...(payload.email ? { reply_to: payload.email } : {}),
```

And make the `text` block tolerate an optional message (line ~38–45):

```ts
  const text = [
    payload.source === "ai-visibility-check" ? "New AI Visibility Check request" : "New OperateAI enquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Notes:",
    payload.message || "(none)",
  ].join("\n");
```

And the html `<p>` (line ~59):

```ts
      <p style="white-space:pre-wrap">${escapeHtml(payload.message || "(none)")}</p>
```

- [ ] **Step 2: Rewrite `app/api/enquiry/route.ts` to validate both sources**

```ts
import { NextResponse } from "next/server";
import { sendEnquiryEmail, type EnquiryPayload } from "@/lib/email";

export const runtime = "nodejs";

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: bots fill the hidden "website" field.
    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const source = clean(body.source) === "contact" ? "contact" : "ai-visibility-check";

    const payload: EnquiryPayload = {
      source,
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone),
      suburb: clean(body.suburb),
      trade: clean(body.trade),
      message: clean(body.message),
    };

    if (source === "ai-visibility-check") {
      if (!payload.company || !payload.suburb || !payload.trade) {
        return NextResponse.json({ error: "Business name, suburb and trade are required." }, { status: 400 });
      }
      if (!payload.email && !payload.phone) {
        return NextResponse.json({ error: "Add an email or a mobile so I can send your rundown." }, { status: 400 });
      }
    } else {
      if (!payload.name || (!payload.email && !payload.phone)) {
        return NextResponse.json({ error: "Add your name and an email or mobile." }, { status: 400 });
      }
    }

    if (payload.email && !isEmail(payload.email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if ((payload.message || "").length > 4000) {
      return NextResponse.json({ error: "Message must be 4000 characters or fewer." }, { status: 400 });
    }

    const result = await sendEnquiryEmail(payload);
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[enquiry]", error);
    return NextResponse.json({ error: "That could not be sent right now." }, { status: 500 });
  }
}
```

- [ ] **Step 3: Verify typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no errors. (The existing `contact-form.tsx` still compiles; it posts `name/email/message` and now needs a `source` — fixed in Task 12.)

- [ ] **Step 4: Commit**

```bash
git add web/lib/email.ts web/app/api/enquiry/route.ts
git commit -m "feat(api): enquiry pipeline accepts AI-visibility-check fields"
```

---

## Task 7: The check form + `/check` page

**Files:**
- Create: `web/components/check/check-form.tsx`
- Create: `web/app/check/page.tsx`

- [ ] **Step 1: Create `components/check/check-form.tsx`**

```tsx
"use client";

import { useId, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

const TRADES = [
  "Plumber",
  "Electrician / sparky",
  "Builder",
  "Carpenter / chippy",
  "Landscaper",
  "Painter",
  "Tiler",
  "Roofer",
  "Concreter",
  "HVAC / air-con",
  "Other",
] as const;

export function CheckForm() {
  const formId = useId();
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [business, setBusiness] = useState("");
  const [suburb, setSuburb] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "ai-visibility-check" }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "That could not be sent.");
      setBusiness(String(data.company || ""));
      setSuburb(String(data.suburb || ""));
      form.reset();
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "That could not be sent.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded border border-[var(--color-border)] bg-[var(--color-surface-lowest)] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-fg-variant)]/60 focus:border-[var(--color-signal)]";
  const labelClass = "block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]";

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-lg border border-[var(--color-signal)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[14px] leading-[1.7] text-[var(--color-fg)]"
      >
        <div className="mb-2 flex items-center gap-2 text-[var(--color-signal)]">
          <span className="inline-block h-3 w-[7px] animate-pulse bg-[var(--color-signal)]" aria-hidden />
          REQUEST RECEIVED
        </div>
        Got it. I&rsquo;ll personally check what AI says about{" "}
        <span className="text-[var(--color-signal)]">{business || "your business"}</span>
        {suburb ? <> in <span className="text-[var(--color-signal)]">{suburb}</span></> : null} and send your rundown
        within one business day. — Taylor
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className={labelClass} htmlFor={`${formId}-company`}>
        Business name
        <input id={`${formId}-company`} name="company" required autoComplete="organization" className={inputClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-suburb`}>
          Suburb / service area
          <input id={`${formId}-suburb`} name="suburb" required className={inputClass} placeholder="e.g. Midland" />
        </label>
        <label className={labelClass} htmlFor={`${formId}-trade`}>
          Trade
          <select id={`${formId}-trade`} name="trade" required defaultValue="" className={inputClass}>
            <option value="" disabled className="bg-[var(--color-surface)]">
              Pick one
            </option>
            {TRADES.map((t) => (
              <option key={t} value={t} className="bg-[var(--color-surface)] text-[var(--color-fg)]">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-email`}>
          Email
          <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Mobile
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>

      <label className={labelClass} htmlFor={`${formId}-message`}>
        Anything you want me to look at? (optional)
        <textarea id={`${formId}-message`} name="message" rows={3} className={inputClass} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send my free check →"}
        </button>
        <p
          role={state === "error" ? "alert" : "status"}
          className={state === "error" ? "text-[13px] text-[var(--color-error)]" : "text-[13px] text-[var(--color-fg-variant)]"}
        >
          {state === "error" ? error : "Your details are only used to send your rundown. No spam."}
        </p>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Create `app/check/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckForm } from "@/components/check/check-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const URL = `${BUSINESS.url}/check/`;
const TITLE = "Free AI Visibility Check";
const DESCRIPTION =
  "Send your business name and suburb. I'll send back a free rundown of what ChatGPT and Google's AI say about you — and the one thing costing you jobs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/check/" },
};

const RUNDOWN = [
  "What ChatGPT and Google's AI actually say when someone asks for a good tradie in your area",
  "Whether you make the shortlist — or get skipped",
  "The one thing costing you jobs right now",
  "How to fix it (no pressure, no jargon)",
];

export default function CheckPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40" containerClassName="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <MonoLabel>Free · one business day · a real person</MonoLabel>
          <h1 className="mt-5 text-[var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            See what AI says about your business.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
            Send your name and suburb. I&rsquo;ll personally check what AI says about you and send back a plain-English
            rundown. It&rsquo;s free because the work proves itself — no catch, no spam.
          </p>
          <ul className="mt-8 grid gap-3">
            {RUNDOWN.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--color-fg)]">
                <span className="mt-1 select-none font-mono text-[var(--color-signal)]" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 lg:p-8">
          <CheckForm />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
        <h2 className="text-[22px] font-bold tracking-tight">What happens next</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ["01", "You send it", "Business name, suburb, trade. Takes about 30 seconds."],
            ["02", "I check it by hand", "I look at what AI says about you — a real person, not an autoresponder."],
            ["03", "You get the rundown", "A plain-English summary and the one thing to fix. No pressure to buy anything."],
          ].map(([n, h, p]) => (
            <li key={n}>
              <div className="font-mono text-[13px] text-[var(--color-signal)]">{n}</div>
              <h3 className="mt-2 font-bold">{h}</h3>
              <p className="mt-1 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Verify the page renders and the form works**

Run: `pnpm dev --port 3100` then in another shell `pnpm exec playwright test` is set up later; for now manually verify: `pnpm build` succeeds and visiting `/check/` shows the form. (With Resend unset the API logs a stub and returns `delivered:false`, and the form still shows the success state.)

Run: `pnpm build`
Expected: succeeds; `/check` appears in the route list.

- [ ] **Step 4: Commit**

```bash
git add web/components/check/ web/app/check/
git commit -m "feat(check): AI Visibility Check form + /check page"
```

---

## Task 8: Articles content collection

**Files:**
- Create: `web/lib/articles.ts`
- Create: `web/content/articles/your-next-customer-wont-scroll-google.mdx`
- Delete: `web/lib/insights.ts`, `web/content/insights/` (after this task)

- [ ] **Step 1: Create `lib/articles.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/articles");

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  author: string;
  tags: string[];
};

export type Article = ArticleFrontmatter & { slug: string };

export function listArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as ArticleFrontmatter) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function formatArticleDate(date: string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" }).format(d);
}
```

- [ ] **Step 2: Create the first article `content/articles/your-next-customer-wont-scroll-google.mdx`**

Use the founder's published article verbatim (frontmatter + body). Paste the full article text the founder supplied into the body; frontmatter:

```mdx
---
title: "Your next customer won't scroll Google. They'll ask AI who to call."
description: "How AI is changing the way Perth homeowners find tradies — and the 3 things to fix this week so you're the one it recommends."
date: "2026-06-18"
readingMinutes: 6
author: "Taylor Mayor"
tags: ["AI search", "Getting found"]
---

How AI is changing the way Perth homeowners find tradies — and the 3 things to fix on your business this week so you're the one it recommends.

[PASTE THE FULL PUBLISHED ARTICLE BODY HERE — the founder-supplied text from "Five years ago, a homeowner in Subiaco…" through the P.S. Convert the section headers to `##`, keep the numbered "3 things to fix" as `###` items, and replace the sign-off contact line with a normal sentence pointing to /check.]
```

> NOTE: This is the only place the published copy lives — paste the exact article text. The bracketed instruction must be fully replaced before the task is considered done (no brackets left in the file).

- [ ] **Step 3: Delete the old insights collection**

```bash
git rm web/lib/insights.ts
git rm -r web/content/insights
```

- [ ] **Step 4: Verify typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: errors ONLY from files that still import `@/lib/insights` (the old home page / any insights route). These are removed/rewritten in later tasks. Note them; do not fix here.

- [ ] **Step 5: Commit**

```bash
git add web/lib/articles.ts web/content/articles/
git commit -m "feat(content): articles collection + first tradie article"
```

---

## Task 9: Articles index + article template

**Files:**
- Create: `web/app/articles/page.tsx`
- Create: `web/app/articles/[slug]/page.tsx`

- [ ] **Step 1: Create `app/articles/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { listArticles, formatArticleDate } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const URL = `${BUSINESS.url}/articles/`;
const TITLE = "Articles";
const DESCRIPTION = "Plain-English guides for WA tradies on getting found, recommended and booked by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  const articles = listArticles();
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>Articles</MonoLabel>
        <h1 className="mt-5 max-w-[18ch] text-[var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Getting found, recommended and booked by AI.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">{DESCRIPTION}</p>

        <ul className="mt-12 grid gap-4">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}/`}
                className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 transition-colors hover:border-[var(--color-signal)]/50 lg:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
                  <span>{formatArticleDate(a.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{a.readingMinutes} min read</span>
                  {a.tags?.[0] ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="text-[var(--color-signal)]">{a.tags[0]}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight group-hover:text-[var(--color-signal)]">
                  {a.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-fg-variant)]">
                  {a.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <CheckButton />
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Create `app/articles/[slug]/page.tsx`**

Note Next 16: `params` is async — `await params`. MDX is rendered by importing the file (the `@next/mdx` + `pageExtensions` config already supports importing `.mdx`).

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";
import { Prose } from "@/components/prose";
import { getArticleSlugs, listArticles, formatArticleDate } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { buildArticle, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

async function loadArticle(slug: string) {
  const meta = listArticles().find((a) => a.slug === slug);
  if (!meta) return null;
  try {
    const mod = await import(`@/content/articles/${slug}.mdx`);
    return { meta, Content: mod.default as React.ComponentType };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = listArticles().find((a) => a.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/articles/${slug}/` },
    openGraph: { type: "article", title: meta.title, description: meta.description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loaded = await loadArticle(slug);
  if (!loaded) notFound();
  const { meta, Content } = loaded;
  const url = `${BUSINESS.url}/articles/${slug}/`;

  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url, title: meta.title, description: meta.description }),
          buildArticle({ url, title: meta.title, description: meta.description, date: meta.date, author: meta.author }),
        ])}
      />
      <Section className="pt-32 lg:pt-40" containerClassName="max-w-[760px]">
        <Link href="/articles/" className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)] hover:text-[var(--color-signal)]">
          ← All articles
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
          <span>{formatArticleDate(meta.date)}</span>
          <span aria-hidden>·</span>
          <span>{meta.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{meta.author}</span>
        </div>
        <h1 className="mt-4 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">{meta.title}</h1>

        <div className="my-10 rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-surface-container)] p-5">
          <p className="text-[14px] text-[var(--color-fg-variant)]">
            Want to know how you currently look to AI?
          </p>
          <div className="mt-3">
            <CheckButton label="Get your free AI check" />
          </div>
        </div>

        <Prose>
          <Content />
        </Prose>

        <div className="mt-14 border-t border-[var(--color-border)] pt-10">
          <CheckButton label="See what AI says about you" />
        </div>
      </Section>
    </>
  );
}
```

> If `components/prose.tsx` does not export `Prose`, check its actual export name and adjust the import (it wraps MDX/long-form text in the codebase). If the styling reads light-on-light after the token change, ensure Prose uses `var(--color-fg)`/`var(--color-fg-variant)`.

- [ ] **Step 3: Verify build + static params**

Run: `pnpm build`
Expected: `/articles` and `/articles/your-next-customer-wont-scroll-google` appear as routes; build succeeds. (Requires Task 10's `buildArticle` — implement Task 10 Step 1 first if the import fails, then return here.)

- [ ] **Step 4: Commit**

```bash
git add web/app/articles/
git commit -m "feat(articles): index + article template with check CTAs"
```

---

## Task 10: SEO/AEO schema updates

**Files:**
- Modify: `web/lib/schema.ts`
- Modify: `web/components/structured-data.tsx`

- [ ] **Step 1: Update `lib/schema.ts`** — fix the LocalBusiness `serviceType`, and add an `Article` builder.

Replace the `serviceType` array inside `buildLocalBusiness` (lines ~57–63) with:

```ts
    serviceType: [
      "Google Business Profile optimisation",
      "AI search visibility for trades",
      "Local SEO for tradies",
      "Online reviews setup",
    ],
```

Add at the end of the file (before/after `wrapGraph`):

```ts
export type ArticleSchemaOptions = {
  url: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export function buildArticle({ url, title, description, date, author }: ArticleSchemaOptions): SchemaNode {
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Person", name: author },
    publisher: { "@id": `${BUSINESS.url}/#organization` },
    mainEntityOfPage: url,
    inLanguage: "en-AU",
  };
}
```

- [ ] **Step 2: Add LocalBusiness to the global structured data** — rewrite `components/structured-data.tsx`:

```tsx
import { JsonLd } from "@/components/json-ld";
import { buildOrganization, buildWebsite, buildLocalBusiness, wrapGraph } from "@/lib/schema";

export function StructuredData() {
  return <JsonLd schema={wrapGraph([buildOrganization(), buildWebsite(), buildLocalBusiness()])} />;
}
```

- [ ] **Step 3: Verify typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors from these files.

- [ ] **Step 4: Commit**

```bash
git add web/lib/schema.ts web/components/structured-data.tsx
git commit -m "feat(seo): LocalBusiness globally + Article JSON-LD, tradie serviceTypes"
```

---

## Task 11: Home page sections

**Files:**
- Create: `web/components/home/hero.tsx`, `the-shift.tsx`, `why-tradies.tsx`, `check-cta.tsx`, `how-it-works-grid.tsx`, `credibility.tsx`, `forward.tsx`, `latest-articles.tsx`, `final-cta.tsx`
- Modify: `web/app/page.tsx`

- [ ] **Step 1: Create `components/home/hero.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { AIReadout } from "@/components/ai-readout";
import Link from "next/link";

export function Hero() {
  return (
    <Section className="pt-32 lg:pt-40" containerClassName="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <MonoLabel>
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-signal)]" aria-hidden />
          Perth, WA
        </MonoLabel>
        <h1 className="mt-5 text-[var(--text-display)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          Your next customer won&rsquo;t scroll Google. They&rsquo;ll ask AI who to call.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[var(--text-lede)] leading-[1.55] text-[var(--color-fg-variant)]">
          More Perth homeowners are asking ChatGPT and Google&rsquo;s AI &ldquo;who&rsquo;s a good tradie?&rdquo; — and
          it only names two or three. If you&rsquo;re not one of them, you don&rsquo;t exist for that job.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CheckButton />
          <Link href="/how-it-works/" className="text-[15px] font-semibold text-[var(--color-fg)] hover:text-[var(--color-signal)]">
            How it works →
          </Link>
        </div>
        <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-[var(--color-fg-variant)]">
          Free · takes you 30 seconds · a real person checks it, not a bot.
        </p>
      </div>
      <AIReadout
        caption="Asked just now"
        prompt="Who's a good emergency plumber in Perth?"
        names={["Coastal Plumbing & Gas", "RapidFlow Plumbers", "Westside Emergency Plumbing"]}
        hook="— is your name here?"
      />
    </Section>
  );
}
```

- [ ] **Step 2: Create `components/home/the-shift.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { AIReadout } from "@/components/ai-readout";

export function TheShift() {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <MonoLabel>What changed</MonoLabel>
      <h2 className="mt-4 max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        SEO got you on the list. AI doesn&rsquo;t show a list — it makes the choice.
      </h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <AIReadout
          dim
          caption="Five years ago — Google"
          prompt="emergency plumber near me"
          names={["10 listings", "…scroll…", "…ads…", "…page two…"]}
        />
        <AIReadout
          caption="Now — AI"
          prompt="Who's a good emergency plumber in Perth?"
          names={["Two or three names", "Picked for the customer", "No scrolling"]}
          hook="No page two."
        />
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create `components/home/why-tradies.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

export function WhyTradies() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <MonoLabel>Why it hits tradies hardest</MonoLabel>
          <h2 className="mt-4 max-w-[18ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Your business lives on local discovery. That&rsquo;s the bit AI is eating first.
          </h2>
        </div>
        <p className="max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          Google, Maps, word of mouth — that&rsquo;s how you get found. Now an AI answer sits above the search results
          on a huge share of searches, and people are asking assistants for a name instead of comparing listings. Being
          findable isn&rsquo;t enough anymore. You have to be the one it&rsquo;s confident enough to recommend.
        </p>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create `components/home/check-cta.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";

const ITEMS = [
  "What AI says about you",
  "Are you on the shortlist",
  "The one thing costing you jobs",
  "How to fix it",
];

export function CheckCta() {
  return (
    <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <MonoLabel>Free check</MonoLabel>
          <h2 className="mt-4 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
            Want to know how you look to AI right now?
          </h2>
          <div className="mt-8">
            <CheckButton />
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[13px] leading-[1.9]">
          <div className="mb-3 text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">You&rsquo;ll get back</div>
          {ITEMS.map((item) => (
            <div key={item} className="flex gap-2 text-[var(--color-fg)]">
              <span className="select-none text-[var(--color-signal)]" aria-hidden>
                ▸
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Create `components/home/how-it-works-grid.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { cn } from "@/lib/cn";

const LEVERS = [
  {
    title: "Google Business Profile, machine-perfect",
    problem: "Half-finished profiles are why AI skips you.",
    fix: "Every service listed, exact suburbs, right categories, real hours, real photos.",
    big: true,
  },
  {
    title: "Plain-text services, prices & area",
    problem: "AI can't read a price inside a JPG or PDF.",
    fix: "Clear words it can actually pick up and quote.",
  },
  {
    title: "Reviews — plenty, recent, replied-to",
    problem: "12 reviews from 2022 reads as closed down.",
    fix: "A simple way to ask every happy customer, and reply to all.",
  },
  {
    title: "Answer fast",
    problem: "Slow callbacks teach AI to stop sending you leads.",
    fix: "Catch missed calls and reply in minutes — the next thing that matters.",
    big: true,
  },
];

export function HowItWorksGrid() {
  return (
    <Section>
      <MonoLabel>How the AI picks who it picks</MonoLabel>
      <h2 className="mt-4 max-w-[22ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        It&rsquo;s not magic. It trusts whatever is clearest. Here&rsquo;s what I fix.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {LEVERS.map((lever) => (
          <div
            key={lever.title}
            className={cn(
              "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-7 transition-colors hover:border-[var(--color-signal)]/50",
              lever.big && "md:col-span-2",
            )}
          >
            <h3 className="text-[19px] font-bold tracking-tight">{lever.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{lever.problem}</p>
            <p className="mt-2 flex gap-2 text-[14px] leading-[1.6] text-[var(--color-fg)]">
              <span className="select-none font-mono text-[var(--color-signal)]" aria-hidden>
                ▸
              </span>
              {lever.fix}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Create `components/home/credibility.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

const POINTS = [
  ["Perth-based", "A real person who knows WA trades — not an overseas agency."],
  ["No lock-in", "No long contracts. The work proves itself or it doesn't."],
  ["Free check first", "I'll show you what's wrong before you spend a cent."],
];

export function Credibility() {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <MonoLabel>Straight up</MonoLabel>
      <h2 className="mt-4 max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
        I&rsquo;m new at this brand, not new at the work. Here&rsquo;s the deal.
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {POINTS.map(([h, p]) => (
          <div key={h} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6">
            <h3 className="font-bold">{h}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-fg-variant)]">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

> When real results/reviews/before-after AI answers exist, replace or augment this section. It is intentionally honest-but-thin for launch (per spec §10).

- [ ] **Step 7: Create `components/home/forward.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

export function Forward() {
  return (
    <Section>
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-8 lg:p-12">
        <MonoLabel>Where this is heading</MonoLabel>
        <p className="mt-5 max-w-[60ch] text-[var(--text-lede)] leading-[1.55] text-[var(--color-fg)]">
          Right now AI <span className="text-[var(--color-signal)]">recommends</span> you. Soon it&rsquo;ll{" "}
          <span className="text-[var(--color-signal)]">book</span> you — checking your diary, requesting quotes, even
          taking a deposit. That&rsquo;s not tomorrow, so don&rsquo;t let anyone panic-sell you robots. But the work to
          be ready is the same work that wins you jobs today. Fix the fundamentals now and you&rsquo;re sorted for both.
        </p>
      </div>
    </Section>
  );
}
```

- [ ] **Step 8: Create `components/home/latest-articles.tsx`**

```tsx
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { listArticles, formatArticleDate } from "@/lib/articles";

export function LatestArticles() {
  const articles = listArticles().slice(0, 3);
  if (articles.length === 0) return null;
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-low)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <MonoLabel>From the site</MonoLabel>
          <h2 className="mt-4 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">Latest</h2>
        </div>
        <Link href="/articles/" className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)] hover:text-[var(--color-signal)]">
          All articles →
        </Link>
      </div>
      <ul className="mt-8 grid gap-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}/`}
              className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 transition-colors hover:border-[var(--color-signal)]/50"
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-fg-variant)]">
                {formatArticleDate(a.date)} · {a.readingMinutes} min read
              </div>
              <h3 className="mt-2 text-[19px] font-bold leading-tight tracking-tight group-hover:text-[var(--color-signal)]">
                {a.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 9: Create `components/home/final-cta.tsx`**

```tsx
import { Section } from "@/components/ui/section";
import { CheckButton } from "@/components/ui/check-button";

export function FinalCta() {
  return (
    <Section className="border-t border-[var(--color-border)]">
      <div className="rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-surface-container)] p-8 text-center lg:p-16">
        <h2 className="mx-auto max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          See what AI says about your business.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          Send your name and suburb. I&rsquo;ll send back a free rundown of what AI says about you — and the one thing
          costing you jobs.
        </p>
        <div className="mt-8 flex justify-center">
          <CheckButton />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 10: Rewrite `app/page.tsx`**

```tsx
import { Hero } from "@/components/home/hero";
import { TheShift } from "@/components/home/the-shift";
import { WhyTradies } from "@/components/home/why-tradies";
import { CheckCta } from "@/components/home/check-cta";
import { HowItWorksGrid } from "@/components/home/how-it-works-grid";
import { Credibility } from "@/components/home/credibility";
import { Forward } from "@/components/home/forward";
import { LatestArticles } from "@/components/home/latest-articles";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: `${BUSINESS.url}/`, title: "OperateAI", description: BUSINESS.description }),
          buildLocalBusiness(),
        ])}
      />
      <Hero />
      <TheShift />
      <WhyTradies />
      <CheckCta />
      <HowItWorksGrid />
      <Credibility />
      <Forward />
      <LatestArticles />
      <FinalCta />
    </>
  );
}
```

- [ ] **Step 11: Verify build**

Run: `pnpm build`
Expected: home builds; no import of `particle-canvas`/`stage-shell`/`insights` remains in `app/page.tsx`.

- [ ] **Step 12: Commit**

```bash
git add web/components/home/ web/app/page.tsx
git commit -m "feat(home): tradie funnel home page sections"
```

---

## Task 12: How-it-works, About, Contact pages

**Files:**
- Create: `web/app/how-it-works/page.tsx`, `web/app/about/page.tsx`, `web/app/contact/page.tsx`
- Modify: `web/components/contact/contact-form.tsx`

- [ ] **Step 1: Create `app/how-it-works/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const URL = `${BUSINESS.url}/how-it-works/`;
const TITLE = "How it works";
const DESCRIPTION =
  "How AI decides which tradie to recommend — and exactly what I do to get you on the shortlist and ready for AI booking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works/" },
};

const STEPS = [
  {
    title: "Google Business Profile, machine-perfect",
    body: "The AI leans on your Google Business Profile harder than anything you own. I list every service as its own line, set your exact service area, fix categories and hours, sort the Q&A, and get real job photos up. A complete, accurate profile is what gives an AI the confidence to put your name forward.",
  },
  {
    title: "Plain-text services, prices & area",
    body: "AI can't read a price inside a flyer or PDF. I put what you do, where you do it, and a 'starting from' or callout price into plain words on your site — the one sentence an AI can pick up and use.",
  },
  {
    title: "Reviews — plenty, recent, replied-to",
    body: "When AI is choosing between two of you, reviews are one of the heaviest things on the scale: the number, how recent, and whether you reply. I set up a one-tap way to ask every happy customer, and a habit of replying to all of them.",
  },
  {
    title: "Answer fast (and get ready for AI booking)",
    body: "Speed is quietly becoming the whole game. If a lead lands and you take three days to call back, AI learns to stop sending them. I help you catch missed calls and reply in minutes — which wins jobs now and readies you for the day AI starts booking them.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION }),
          buildService({ name: "AI search visibility for trades", url: URL, description: DESCRIPTION }),
        ])}
      />
      <Section className="pt-32 lg:pt-40">
        <MonoLabel>How it works</MonoLabel>
        <h1 className="mt-5 max-w-[20ch] text-[var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          It&rsquo;s not magic, and it&rsquo;s not random. Here&rsquo;s how AI picks — and what I fix.
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          AI builds its recommendation from a small handful of sources, and it trusts whatever is clearest, most
          complete, and most consistent. If your details are messy or locked in images, it skips you. Most of your
          competition hasn&rsquo;t fixed this. That&rsquo;s the good news.
        </p>
      </Section>

      <Section className="pt-0">
        <ol className="grid gap-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-7 lg:p-9"
            >
              <div className="font-mono text-[13px] text-[var(--color-signal)]">{String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-2 text-[22px] font-bold tracking-tight">{step.title}</h2>
              <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.7] text-[var(--color-fg-variant)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-low)] p-8 text-center">
          <p className="mx-auto max-w-[48ch] text-[17px] leading-[1.6] text-[var(--color-fg)]">
            Every business is different. There&rsquo;s no fixed package — get the free check first, then we talk about
            what&rsquo;s worth doing.
          </p>
          <div className="mt-6 flex justify-center">
            <CheckButton />
          </div>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Create `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const URL = `${BUSINESS.url}/about/`;
const TITLE = "About";
const DESCRIPTION = "A Perth-based operator helping WA trade businesses get found and recommended by AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40" containerClassName="max-w-[720px]">
        <MonoLabel>About</MonoLabel>
        <h1 className="mt-5 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          A real person in Perth — not an overseas agency.
        </h1>
        <div className="mt-8 grid gap-5 text-[17px] leading-[1.7] text-[var(--color-fg-variant)]">
          <p>
            I&rsquo;m Taylor. I help WA trade businesses get found, recommended and booked in the new world where
            customers ask AI who to call instead of scrolling Google.
          </p>
          <p>
            I&rsquo;m not going to pretend I&rsquo;ve done a thousand of these. I&rsquo;m early, hungry, and I&rsquo;ll
            personally look at your business myself — which is exactly why the free check is worth taking. No call
            centre, no lock-in, no jargon. Just the fundamentals done properly, sorted for how customers search now and
            how AI is about to book them next.
          </p>
        </div>
        <div className="mt-10">
          <CheckButton />
        </div>
      </Section>
    </>
  );
}
```

> Add a real founder photo when supplied (spec §10). Until then the page stands on plain copy.

- [ ] **Step 3: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const URL = `${BUSINESS.url}/contact/`;
const TITLE = "Contact";
const DESCRIPTION = "Get in touch with OperateAI — or take the free AI Visibility Check first.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40" containerClassName="max-w-[720px]">
        <MonoLabel>Contact</MonoLabel>
        <h1 className="mt-5 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Rather just have a chat?
        </h1>
        <p className="mt-5 text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          The fastest start is the{" "}
          <a href="/check/" className="text-[var(--color-signal)] underline-offset-4 hover:underline">
            free AI check
          </a>{" "}
          — but if you&rsquo;d rather email me, drop a line below or write to{" "}
          <a href={`mailto:${BUSINESS.email}`} className="text-[var(--color-signal)] underline-offset-4 hover:underline">
            {BUSINESS.email}
          </a>
          .
        </p>
        <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 lg:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 4: Simplify `components/contact/contact-form.tsx` for the new pipeline**

The old form posts `interest`/`company`/`message` with an AI-services dropdown. Replace its body to post `source: "contact"` and drop the services dropdown. Replace the whole component:

```tsx
"use client";

import { useId, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const formId = useId();
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "That could not be sent.");
      form.reset();
      setState("sent");
      setMessage("Thanks — I'll get back to you.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "That could not be sent.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded border border-[var(--color-border)] bg-[var(--color-surface-lowest)] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-fg-variant)]/60 focus:border-[var(--color-signal)]";
  const labelClass = "block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-name`}>
          Name
          <input id={`${formId}-name`} name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Mobile
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className={labelClass} htmlFor={`${formId}-email`}>
        Email
        <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
      </label>
      <label className={labelClass} htmlFor={`${formId}-message`}>
        What do you need?
        <textarea id={`${formId}-message`} name="message" rows={5} className={inputClass} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send →"}
        </button>
        <p
          role={state === "error" ? "alert" : "status"}
          className={state === "error" ? "text-[13px] text-[var(--color-error)]" : "text-[13px] text-[var(--color-fg-variant)]"}
        >
          {message || "I'll reply by email or text."}
        </p>
      </div>
    </form>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `pnpm build`
Expected: `/how-it-works`, `/about`, `/contact` build; no `defaultInterest` prop references remain.

- [ ] **Step 6: Commit**

```bash
git add web/app/how-it-works/ web/app/about/ web/app/contact/ web/components/contact/contact-form.tsx
git commit -m "feat(pages): how-it-works, about, contact"
```

---

## Task 13: Legal, 404, sitemap, robots, OG image

**Files:**
- Modify: `web/app/legal/privacy/page.tsx`, `web/app/legal/terms/page.tsx`, `web/app/not-found.tsx`, `web/app/sitemap.ts`, `web/app/robots.ts`, `web/app/opengraph-image.tsx`, `web/app/icon.tsx`

- [ ] **Step 1: Rewrite `app/sitemap.ts`** to the new route set.

```ts
import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { getArticleSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const staticRoutes = ["/", "/check/", "/how-it-works/", "/articles/", "/about/", "/contact/", "/legal/privacy/", "/legal/terms/"];
  const articleRoutes = getArticleSlugs().map((slug) => `/articles/${slug}/`);
  return [...staticRoutes, ...articleRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" || route === "/check/" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: Check `app/robots.ts`** references the sitemap URL and disallows nothing important. Ensure it reads:

```ts
import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Update legal pages copy** — open `app/legal/privacy/page.tsx` and ensure the data-handling section states: details from the AI Visibility Check and contact form are used only to prepare and send the requested rundown / reply, are not sold or shared, and are kept only as long as needed to respond. Update `app/legal/terms/page.tsx` to remove references to the deleted services/audit offers and describe the free check + done-for-you work in plain terms. Keep both pages' existing layout components; change only copy. If they reference `/book-ai-audit/`, change to `/check/`.

- [ ] **Step 4: Update `app/not-found.tsx`** — ensure links point to `/` and `/check/` (not deleted routes), and copy matches the tradie voice (e.g. "That page isn't here. Want to see what AI says about your business?" with a `CheckButton`).

- [ ] **Step 5: Update `app/opengraph-image.tsx` and `app/icon.tsx`** — change background to `#121414`, accent to `#f3fc85`, and the OG text to the new tagline ("Get found, recommended and booked by AI."). Keep the existing `ImageResponse` structure; change only colours and text.

- [ ] **Step 6: Verify build**

Run: `pnpm build`
Expected: succeeds; sitemap lists exactly the new routes.

- [ ] **Step 7: Commit**

```bash
git add web/app/legal/ web/app/not-found.tsx web/app/sitemap.ts web/app/robots.ts web/app/opengraph-image.tsx web/app/icon.tsx
git commit -m "feat(seo): sitemap/robots/OG/legal/404 for tradie funnel"
```

---

## Task 14: Delete the old surface area

**Files:**
- Delete: service pages, industry pages + hub, perth, book-ai-audit, service/industry components, particle home components

- [ ] **Step 1: Remove the deleted routes and components**

```bash
git rm -r web/app/ai-integration-services web/app/ai-agents-for-business web/app/ai-agent-hosting web/app/ai-training-for-business
git rm -r web/app/industries
git rm -r web/app/perth-ai-consultant
git rm -r web/app/book-ai-audit
git rm -r web/components/service web/components/industry
git rm web/components/home/particle-canvas.tsx web/components/home/stage-shell.tsx
```

- [ ] **Step 2: Find any dangling imports**

Run: `cd web && pnpm exec tsc --noEmit`
Expected: no errors. If any file still imports a deleted module (e.g. a leftover reference to `ServicePageLayout`, `IndustryPageLayout`, `ParticleCanvas`, `StageShell`, `@/lib/insights`), fix the importing file. There should be none after Tasks 8–13.

- [ ] **Step 3: Grep to confirm nothing references deleted paths**

Run: `cd web && grep -rn "book-ai-audit\|particle-canvas\|stage-shell\|lib/insights\|components/service\|components/industry\|perth-ai-consultant" app components lib __tests__`
Expected: no matches (the `__tests__` matches are handled in Task 15).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove service/industry/audit routes + particle home"
```

---

## Task 15: Tests

**Files:**
- Modify: `web/__tests__/routes.smoke.test.ts`
- Delete + replace: `web/__tests__/particle-scroll.spec.ts` → `web/__tests__/funnel.spec.ts`

- [ ] **Step 1: Rewrite `__tests__/routes.smoke.test.ts`**

```ts
import { test, expect } from "@playwright/test";

const ROUTES: { path: string; needle: RegExp }[] = [
  { path: "/", needle: /ask AI who to call/i },
  { path: "/check/", needle: /See what AI says about your business/i },
  { path: "/how-it-works/", needle: /how AI picks/i },
  { path: "/articles/", needle: /recommended and booked by AI/i },
  { path: "/articles/your-next-customer-wont-scroll-google/", needle: /scroll Google/i },
  { path: "/about/", needle: /real person in Perth/i },
  { path: "/contact/", needle: /just have a chat/i },
  { path: "/legal/privacy/", needle: /Privacy/i },
  { path: "/legal/terms/", needle: /Terms/i },
];

for (const { path, needle } of ROUTES) {
  test(`route ${path} renders and contains expected copy`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText(needle).first()).toBeVisible();
  });
}

test("home page has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("404 renders for unknown route", async ({ page }) => {
  const response = await page.goto("/totally-nonexistent-route-xyz");
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 2: Replace the particle spec with a funnel spec**

```bash
git rm web/__tests__/particle-scroll.spec.ts
```

Create `web/__tests__/funnel.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("home hero shows the AI readout with the hook", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Who's a good emergency plumber in Perth?").first()).toBeVisible();
  await expect(page.getByText("is your name here?").first()).toBeVisible();
});

test("home CTAs point at the free check", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /See what AI says about you/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/check/");
});

test("check form renders required fields", async ({ page }) => {
  await page.goto("/check/");
  await expect(page.getByLabel("Business name")).toBeVisible();
  await expect(page.getByLabel("Suburb / service area")).toBeVisible();
  await expect(page.getByLabel("Trade")).toBeVisible();
  await expect(page.getByRole("button", { name: /send my free check/i })).toBeVisible();
});

test("check form shows the human confirmation after submit", async ({ page }) => {
  await page.goto("/check/");
  await page.getByLabel("Business name").fill("Test Plumbing");
  await page.getByLabel("Suburb / service area").fill("Midland");
  await page.getByLabel("Trade").selectOption("Plumber");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByRole("button", { name: /send my free check/i }).click();
  await expect(page.getByText(/I.ll personally check what AI says about/i)).toBeVisible();
  await expect(page.getByText("Test Plumbing")).toBeVisible();
});
```

- [ ] **Step 3: Run the full smoke + funnel suite**

Run: `cd web && pnpm exec playwright test`
Expected: all tests PASS. The Playwright config auto-starts the dev server on port 3100. (Resend unset → the API returns `delivered:false` and the form still shows the confirmation state, so the confirmation test passes.)

- [ ] **Step 4: Commit**

```bash
git add web/__tests__/
git commit -m "test: smoke + funnel specs for the tradie redesign"
```

---

## Task 16: Final verification + reviewer pass

- [ ] **Step 1: Typecheck, lint, build**

Run: `cd web && pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: all clean.

- [ ] **Step 2: Route smoke check**

Run the project pre-deploy gate: invoke `/route-smoke-check`.
Expected: Playwright + tsc + route coverage all green.

- [ ] **Step 3: nextjs16-reviewer**

Invoke the `nextjs16-reviewer` agent over the changed files under `web/app/**`, `web/components/**`, `web/lib/**`. Fix any version-drift findings (async `params`/`searchParams`, Metadata shape, server/client boundaries, Tailwind v4 tokens). Re-run Step 1 after fixes.

- [ ] **Step 4: Manual smoke in the browser**

Run: `cd web && pnpm dev --port 3456`, open `http://localhost:3456`, and verify: dark charcoal canvas + Signal accents, Hanken/JetBrains fonts loaded, hero readout + hook, every CTA lands on `/check/`, the check form submits to the confirmation state, articles index + the first article render, no console errors.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address reviewer + verification findings"
```

---

## Open items carried from the spec (not blockers for build; needed before launch)

These do not block implementation but must be resolved before the site goes live (spec §10):

1. Rundown turnaround — the check confirmation currently says "within one business day". Confirm/adjust in `components/check/check-form.tsx`.
2. Mobile number — set `BUSINESS.telephone` in `lib/business.ts` (flows into schema, header/footer/contact automatically).
3. Real WA trades photography — none is wired in v1 by design; add to hero/credibility/about when supplied.
4. Real proof/results — replace the honest-but-thin `Credibility` section content when available.
5. Final article text — the MDX body must be the exact published copy (Task 8 Step 2), no bracketed placeholder left.
6. DNS — `operateai.com.au` → Vercel (infra, outside this repo).

---

## Self-Review notes (author)

- **Spec coverage:** IA (Tasks 7–14), free check + manual flow + guardrails (Tasks 6–7), visual language/tokens/motif (Tasks 1–2, 4–5), home layout 11 sections (Task 11 maps each), other pages (Tasks 9, 12, 13), copy/voice (embedded in all page copy), AEO/JSON-LD (Task 10, 13), tests (Task 15), deletions (Task 14). Covered.
- **Honeypot/rate-limit:** honeypot implemented (Task 6); a hard rate-limit is intentionally deferred (serverless; the honeypot + manual review suffice for v1 — noted, not silently dropped).
- **Type consistency:** `EnquiryPayload.source` union used identically in `email.ts`, `route.ts`, `check-form.tsx`, `contact-form.tsx`; `Article`/`listArticles`/`getArticleSlugs`/`formatArticleDate` names consistent across `lib/articles.ts`, articles pages, home, sitemap; `buildArticle`/`buildLocalBusiness`/`buildWebPage`/`buildService` names match `schema.ts`.
