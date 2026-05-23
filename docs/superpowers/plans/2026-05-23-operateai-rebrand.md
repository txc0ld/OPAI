# OperateAI Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand AAO Group → OperateAI, restructure the site to the new URL hierarchy, and add JSON-LD schema, internal linking, and FAQ schema per the approved design.

**Architecture:** Next.js 16 App Router with `trailingSlash: true`. Foundation modules (`lib/business.ts`, `lib/schema.ts`, `<JsonLd>`, `<FaqSection>`, `<ServicePageLayout>`, `<IndustryPageLayout>`) are built once and reused across all pages. Brand strings live in one place. Pages are page-level files that compose existing chassis components (`Section`, `SectionHeading`, `Button`, `CTABand`, `Reveal`) with new content components.

**Tech Stack:** Next.js 16.2.4 (App Router, Turbopack), React 19.2, TypeScript, Tailwind CSS v4, MDX, Playwright (smoke tests), pnpm 10.

**Reference spec:** `docs/superpowers/specs/2026-05-23-operateai-rebrand-design.md`. The user's source content (verbatim page copy) is the conversation immediately preceding this plan and is reproduced inline below where each page is built.

**Next.js 16 caveat:** `web/AGENTS.md` warns this is a new Next.js with breaking changes — when in doubt about a Next.js API, read `node_modules/next/dist/docs/` before writing code.

**Working directory:** All paths are repo-relative. Run pnpm commands from `web/` unless noted otherwise.

**Placeholders policy:** Business contact details, ABN, phone, address, and social URLs use the `BUSINESS` constant block from Task 3 and are clearly marked `TODO(operator):` so the operator can grep-replace pre-launch.

---

## File-structure overview

### Created
```
web/lib/business.ts                           # brand constants + placeholders
web/lib/schema.ts                             # JSON-LD builders
web/components/json-ld.tsx                    # <JsonLd> renderer
web/components/faq/faq-section.tsx            # accordion + emits FAQPage schema
web/components/service/service-page-layout.tsx
web/components/industry/industry-page-layout.tsx
web/components/home/solution-band.tsx
web/components/home/audience-band.tsx
web/components/home/process-band.tsx
web/components/home/services-grid.tsx         # replaces offer-cards
web/components/home/conversion-band.tsx
web/app/ai-integration-services/page.tsx
web/app/ai-agents-for-business/page.tsx
web/app/ai-agent-hosting/page.tsx
web/app/ai-training-for-business/page.tsx
web/app/perth-ai-consultant/page.tsx
web/app/book-ai-audit/page.tsx
web/app/industries/page.tsx
web/app/industries/ai-for-accounting-firms/page.tsx
web/app/industries/ai-for-real-estate-agencies/page.tsx
web/app/industries/ai-for-trades-businesses/page.tsx
web/app/industries/ai-for-health-clinics/page.tsx
web/app/industries/ai-for-law-firms/page.tsx
web/app/industries/ai-for-ecommerce-businesses/page.tsx
```

### Modified
```
web/app/layout.tsx
web/app/page.tsx
web/app/sitemap.ts
web/app/opengraph-image.tsx
web/app/legal/privacy/page.tsx
web/app/legal/terms/page.tsx
web/app/robots.ts
web/next.config.ts
web/components/site-header.tsx
web/components/site-footer.tsx
web/components/structured-data.tsx
web/components/logo.tsx
web/components/home/hero.tsx
web/components/home/problem-band.tsx
web/components/home/use-cases-strip.tsx
web/components/cta-band.tsx
web/lib/nav.ts
web/__tests__/routes.smoke.test.ts
README.md
```

### Deleted (entire trees)
```
web/app/about/
web/app/contact/
web/app/framework/
web/app/pricing/
web/app/services/
web/app/trust/
web/app/use-cases/
web/app/insights/
web/app/demo/
web/app/operator/
web/app/seo/
web/components/framework/
web/components/pricing/
web/components/services/
web/components/use-cases/
web/components/home/framework-preview.tsx
web/components/home/governance-band.tsx
web/components/home/pricing-anchor.tsx
web/components/home/offer-cards.tsx
web/lib/use-cases.ts   (if exists, no longer referenced)
```

---

## Task 1: Branch + discard WIP

**Files:**
- Modify: working tree state

- [ ] **Step 1: Confirm clean starting point**

Run from repo root:
```bash
git status --short
```
Expected output: list of M/?? entries matching `web/...` files from the conversation `gitStatus` block. If anything outside `web/` is modified, STOP and investigate.

- [ ] **Step 2: Discard WIP changes and untracked files**

```bash
git checkout -- web/
git clean -fd web/
git status --short
```
Expected: empty output (clean tree).

- [ ] **Step 3: Create and switch to feature branch**

```bash
git switch -c rebrand/operateai
git status
```
Expected: `On branch rebrand/operateai`.

- [ ] **Step 4: Commit a marker (empty) to anchor the branch**

```bash
git commit --allow-empty -m "$(cat <<'EOF'
chore: branch rebrand/operateai

Anchor commit for OperateAI rebrand work. See
docs/superpowers/specs/2026-05-23-operateai-rebrand-design.md.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Prune retired routes

**Files:**
- Delete: route directories listed in step 1.

- [ ] **Step 1: Remove retired app routes**

```bash
git rm -r web/app/about web/app/contact web/app/framework web/app/pricing web/app/services web/app/trust web/app/use-cases web/app/insights web/app/demo web/app/operator web/app/seo
```

- [ ] **Step 2: Remove retired components**

```bash
git rm -r web/components/framework web/components/pricing web/components/services web/components/use-cases
git rm web/components/home/framework-preview.tsx web/components/home/governance-band.tsx web/components/home/pricing-anchor.tsx web/components/home/offer-cards.tsx
```

- [ ] **Step 3: Remove orphaned lib files**

Check whether `web/lib/use-cases.ts` exists, and if so remove it (use-cases route is gone):
```bash
test -f web/lib/use-cases.ts && git rm web/lib/use-cases.ts || echo "no use-cases.ts to remove"
```

- [ ] **Step 4: Verify sitemap and page imports compile**

The sitemap and page.tsx still reference removed paths. Don't try to build yet — that's expected. Just sanity-check what's left:
```bash
ls web/app/
```
Expected to see: `layout.tsx page.tsx sitemap.ts robots.ts opengraph-image.tsx legal/ globals.css tokens.css` (no other dirs/files except maybe `not-found.tsx` or `error.tsx` if present — keep those).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: prune retired routes

Removes pre-rebrand marketing, insights, demo, operator, and seo
routes plus their components. Keeps /legal/* (will be rebranded).
Site will not build until subsequent rebrand tasks complete.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Foundation — BUSINESS constants + JSON-LD builders

**Files:**
- Create: `web/lib/business.ts`
- Create: `web/lib/schema.ts`
- Create: `web/components/json-ld.tsx`

- [ ] **Step 1: Create `web/lib/business.ts`**

```ts
// Single source of truth for brand and contact details.
// All TODO(operator) markers must be filled before public launch.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "TODO(operator): OperateAI Pty Ltd (confirm legal entity)",
  url: "https://operateai.com.au",
  email: "TODO(operator): hello@operateai.com.au",
  telephone: "TODO(operator): +61 ...",
  abn: "TODO(operator): ABN ## ### ### ###",
  tagline:
    "AI agents, automation, hosting and training for Australian businesses. Built in Perth. Delivered online worldwide.",
  description:
    "OperateAI helps small and medium businesses integrate practical AI into daily operations — AI agents, workflow automation, staff training, and managed AI agent hosting.",
  address: {
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: [
    "Perth",
    "Western Australia",
    "Australia",
    "Worldwide (online)",
  ],
  sameAs: [
    "TODO(operator): https://www.linkedin.com/company/operateai",
    "TODO(operator): https://x.com/operateai",
  ],
  founded: "2026",
  copyrightYear: 2026,
} as const;

export const NAV_LABELS = {
  services: "Services",
  industries: "Industries",
  perth: "Perth",
  bookAudit: "Book audit",
} as const;
```

- [ ] **Step 2: Create `web/lib/schema.ts`**

```ts
import { BUSINESS } from "@/lib/business";

type SchemaNode = Record<string, unknown>;

export function buildOrganization(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    taxID: BUSINESS.abn,
    description: BUSINESS.description,
    foundingDate: BUSINESS.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    sameAs: BUSINESS.sameAs,
  };
}

export function buildWebsite(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": `${BUSINESS.url}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    inLanguage: "en-AU",
    publisher: { "@id": `${BUSINESS.url}/#organization` },
  };
}

export function buildLocalBusiness(): SchemaNode {
  // ProfessionalService is the correct LocalBusiness subtype for a consultancy.
  // No streetAddress: service-area business only.
  return {
    "@type": "ProfessionalService",
    "@id": `${BUSINESS.url}/#localbusiness`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    description: BUSINESS.description,
    parentOrganization: { "@id": `${BUSINESS.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
    serviceType: [
      "AI integration services",
      "AI agent design and build",
      "Managed AI agent hosting",
      "AI training for business",
      "AI business audit",
    ],
  };
}

export type ServiceSchemaOptions = {
  name: string;
  url: string;
  description: string;
};

export function buildService({ name, url, description }: ServiceSchemaOptions): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    url,
    description,
    provider: { "@id": `${BUSINESS.url}/#organization` },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqPage(items: FaqItem[]): SchemaNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type WebPageOptions = {
  url: string;
  title: string;
  description: string;
};

export function buildWebPage({ url, title, description }: WebPageOptions): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${BUSINESS.url}/#website` },
    inLanguage: "en-AU",
  };
}

export function wrapGraph(nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
```

- [ ] **Step 3: Create `web/components/json-ld.tsx`**

```tsx
type JsonLdProps = {
  schema: Record<string, unknown>;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // schema is constructed server-side from typed builders; safe to stringify.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles for the new files**

Run from `web/`:
```bash
pnpm exec tsc --noEmit
```
Expected: errors on missing routes/components from later tasks are OK; no errors inside `lib/business.ts`, `lib/schema.ts`, or `components/json-ld.tsx`. If those three files have errors, fix before committing.

- [ ] **Step 5: Commit**

```bash
git add web/lib/business.ts web/lib/schema.ts web/components/json-ld.tsx
git commit -m "$(cat <<'EOF'
feat(seo): JSON-LD schema builders + business constants

Adds web/lib/business.ts (single source of brand + contact data with
TODO(operator) placeholders), web/lib/schema.ts (typed builders for
Organization, WebSite, LocalBusiness/ProfessionalService, Service,
FAQPage, WebPage), and the <JsonLd> server component.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Reusable FAQ section component

**Files:**
- Create: `web/components/faq/faq-section.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { buildFaqPage, type FaqItem } from "@/lib/schema";

type FaqSectionProps = {
  heading?: string;
  eyebrow?: string;
  items: FaqItem[];
  tone?: "paper" | "ink";
  emitSchema?: boolean;
};

export function FaqSection({
  heading = "Frequently asked questions",
  eyebrow,
  items,
  tone = "paper",
  emitSchema = true,
}: FaqSectionProps) {
  return (
    <Section tone={tone} aria-labelledby="faq-heading">
      <SectionHeading
        eyebrow={eyebrow}
        title={heading}
        as="h2"
        className="mb-10"
      />
      <dl className="border-[3px] border-black">
        {items.map((item, i) => (
          <div
            key={item.question}
            className={i === 0 ? "" : "border-t-[3px] border-black"}
          >
            <dt>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 font-heading text-[1.0625rem] font-bold uppercase tracking-[-0.01em] hover:bg-[var(--color-primary-container)]">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[1.25rem] leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="border-t-[3px] border-black px-5 py-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
                  {item.answer}
                </dd>
              </details>
            </dt>
          </div>
        ))}
      </dl>
      {emitSchema ? <JsonLd schema={buildFaqPage(items)} /> : null}
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add web/components/faq/faq-section.tsx
git commit -m "$(cat <<'EOF'
feat(faq): reusable FAQ section with FAQPage JSON-LD

<FaqSection> renders an accessible details/summary accordion and
optionally emits FAQPage structured data. Used on the homepage,
service pages, and Perth landing page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Service page layout component

**Files:**
- Create: `web/components/service/service-page-layout.tsx`

- [ ] **Step 1: Create the layout**

```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export type ServicePageLayoutProps = {
  // Page meta passed through for schema/title display.
  pageUrl: string;          // absolute (e.g. https://operateai.com.au/ai-agents-for-business/)
  title: string;            // SEO title
  description: string;      // meta description
  h1: string;
  // Hero opening copy under H1.
  opening: ReactNode;
  // Who it is for (paragraph or list).
  whoItIsFor?: ReactNode;
  // List of items (e.g. what we can integrate, what is included, agent examples, training topics).
  included: { heading: string; items: string[] };
  // Optional secondary list (e.g. agent examples).
  secondaryList?: { heading: string; items: string[] };
  // Body copy slot (e.g. "why managed setup matters", "clear explanation").
  body?: ReactNode;
  // Conversion copy above the CTA.
  conversion?: ReactNode;
  // CTA button text.
  ctaLabel: string;
  // CTA href — defaults to /book-ai-audit/.
  ctaHref?: string;
  // Internal links list (per spec §14).
  relatedLinks: { href: string; label: string }[];
  // Optional FAQ slot — pass <FaqSection ... emitSchema={false} /> here so the
  // service page schema graph below can include FAQPage too.
  faq?: ReactNode;
  // FAQ items used for schema generation (mirrors the visible <FaqSection> items).
  faqItems?: { question: string; answer: string }[];
};

export function ServicePageLayout({
  pageUrl,
  title,
  description,
  h1,
  opening,
  whoItIsFor,
  included,
  secondaryList,
  body,
  conversion,
  ctaLabel,
  ctaHref = "/book-ai-audit/",
  relatedLinks,
  faq,
  faqItems,
}: ServicePageLayoutProps) {
  const nodes = [
    buildWebPage({ url: pageUrl, title, description }),
    buildService({ name: h1, url: pageUrl, description }),
  ];
  if (faqItems && faqItems.length > 0) {
    // Inline FAQPage schema in the same graph rather than the FaqSection emitting separately.
    nodes.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd schema={wrapGraph(nodes)} />

      {/* Hero */}
      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            {BUSINESS.name} — service
          </p>
          <h1 className="mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {h1}
          </h1>
          <div className="mt-8 max-w-[var(--measure)] text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] space-y-5">
            {opening}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Button as="a" href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Who it is for */}
      {whoItIsFor ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <SectionHeading title="Who this is for" as="h2" className="mb-6" />
          <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            {whoItIsFor}
          </div>
        </Section>
      ) : null}

      {/* Included list */}
      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title={included.heading} as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {included.items.map((item) => (
            <li key={item} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Secondary list (e.g. agent examples) */}
      {secondaryList ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <SectionHeading title={secondaryList.heading} as="h2" className="mb-8" />
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {secondaryList.items.map((item) => (
              <li key={item} className="flex gap-3 text-[1rem] leading-[1.5]">
                <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Body slot */}
      {body ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            {body}
          </div>
        </Section>
      ) : null}

      {/* FAQ slot */}
      {faq ? <div className="border-t-[3px] border-black">{faq}</div> : null}

      {/* Conversion */}
      {conversion ? (
        <Section tone="paper" className="border-t-[3px] border-black">
          <div className="max-w-[var(--measure)] text-[1.125rem] leading-[1.6]">
            {conversion}
          </div>
        </Section>
      ) : null}

      {/* CTA band */}
      <CTABand
        headline="Start with an AI Business Audit"
        body="We review your current tools, workflows and opportunities, then identify where AI agents, automation or training can deliver practical value."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />

      {/* Related links */}
      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="Related services" as="h2" className="mb-6" />
        <ul className="flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center border-[3px] border-black bg-[var(--color-surface)] px-5 py-3 font-heading text-[0.875rem] font-bold uppercase tracking-[0.06em] hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add web/components/service/service-page-layout.tsx
git commit -m "$(cat <<'EOF'
feat(service): shared service page layout

Slot-based layout used by /ai-integration-services,
/ai-agents-for-business, /ai-agent-hosting, /ai-training-for-business,
and /perth-ai-consultant. Emits Service + WebPage (+ optional
FAQPage) JSON-LD in a single graph and renders related-services
internal links.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Industry page layout component

**Files:**
- Create: `web/components/industry/industry-page-layout.tsx`

- [ ] **Step 1: Create the layout**

```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";

export type IndustryPageLayoutProps = {
  pageUrl: string;
  title: string;
  description: string;
  industry: string;     // e.g. "accounting firms"
  h1: string;           // e.g. "AI for accounting firms"
  opening: ReactNode;
  useCases: string[];
  relatedLinks: { href: string; label: string }[];
};

export function IndustryPageLayout({
  pageUrl,
  title,
  description,
  industry,
  h1,
  opening,
  useCases,
  relatedLinks,
}: IndustryPageLayoutProps) {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: pageUrl, title, description })])} />

      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            Industries — {industry}
          </p>
          <h1 className="mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {h1}
          </h1>
          <div className="mt-8 max-w-[var(--measure)] text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] space-y-5">
            {opening}
          </div>
          <div className="mt-10">
            <Button as="a" href="/book-ai-audit/" size="lg">
              Discuss AI for your {industry} business
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title={`Common AI use cases for ${industry}`} as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {useCases.map((u) => (
            <li key={u} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        headline={`AI for ${industry}, built around your workflows`}
        body="Start with an AI Business Audit. We will identify the best opportunities, the risks to avoid, and the clearest next steps for implementation."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="Related" as="h2" className="mb-6" />
        <ul className="flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center border-[3px] border-black bg-[var(--color-surface)] px-5 py-3 font-heading text-[0.875rem] font-bold uppercase tracking-[0.06em] hover:bg-black hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add web/components/industry/industry-page-layout.tsx
git commit -m "$(cat <<'EOF'
feat(industry): shared industry page layout

Used by /industries/<slug>/ pages. Emits WebPage JSON-LD and renders
use-case list + CTA + related-service links.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Brand swap — config, layout, nav, logo, header, footer, structured-data, OG image, next.config

**Files:**
- Modify: `web/next.config.ts`
- Modify: `web/lib/nav.ts`
- Modify: `web/components/logo.tsx`
- Modify: `web/components/site-header.tsx`
- Modify: `web/components/site-footer.tsx`
- Modify: `web/components/structured-data.tsx`
- Modify: `web/app/layout.tsx`
- Modify: `web/app/opengraph-image.tsx`
- Modify: `web/components/cta-band.tsx` (default `primaryHref` was `/contact` — change to `/book-ai-audit/`)
- Modify: `web/app/legal/privacy/page.tsx` + `web/app/legal/terms/page.tsx` (brand string swap only)
- Modify: `README.md` (top-level brand line)
- Modify: `web/package.json` (name field)

- [ ] **Step 1: Update `web/next.config.ts` to enable trailing slashes**

Replace file with:
```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default withMDX(nextConfig);
```

- [ ] **Step 2: Replace `web/lib/nav.ts`**

```ts
export const PRIMARY_NAV = [
  { href: "/ai-integration-services/", label: "Integration" },
  { href: "/ai-agents-for-business/", label: "AI Agents" },
  { href: "/ai-agent-hosting/", label: "Hosting" },
  { href: "/ai-training-for-business/", label: "Training" },
  { href: "/industries/", label: "Industries" },
  { href: "/perth-ai-consultant/", label: "Perth" },
] as const;

export const FOOTER_LEGAL = [
  { href: "/legal/privacy/", label: "Privacy" },
  { href: "/legal/terms/", label: "Terms" },
] as const;
```

- [ ] **Step 3: Replace `web/components/logo.tsx`**

The wordmark switches from `[aao]` to `[opai]` and the subtitle from "Australian AI Operations" to "AI for Small Business".

```tsx
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "stacked" | "compact";
  tone?: "ink" | "paper";
  className?: string;
};

export function Logo({ variant = "stacked", tone = "ink", className }: LogoProps) {
  const fg = tone === "ink" ? "text-[var(--color-ink)]" : "text-[var(--color-paper)]";
  const muted = tone === "ink" ? "text-[var(--color-muted)]" : "text-[rgb(246_244_238_/_0.55)]";
  const rule = tone === "ink" ? "border-[var(--color-ink)]" : "border-[var(--color-paper)]";
  const ariaLabel = "OperateAI — AI for small business";

  if (variant === "compact") {
    return (
      <span
        className={cn("inline-flex items-baseline gap-3 leading-none", className)}
        aria-label={ariaLabel}
      >
        <span className="font-sans text-[1.5rem] tracking-[-0.04em] leading-none">
          <span className={cn("font-light", muted)}>[</span>
          <span className={cn("font-semibold", fg)}>opai</span>
          <span className={cn("font-light", muted)}>]</span>
        </span>
        <span className={cn("font-mono text-[0.625rem] uppercase tracking-[0.28em] translate-y-[-2px]", muted)}>
          OperateAI · Perth
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label={ariaLabel}
    >
      <span className="font-sans text-[2rem] tracking-[-0.04em] leading-none">
        <span className={cn("font-light", muted)}>[</span>
        <span className={cn("font-semibold", fg)}>opai</span>
        <span className={cn("font-light", muted)}>]</span>
      </span>
      <span className={cn("mt-2 pt-2 border-t font-mono text-[0.625rem] uppercase tracking-[0.32em]", rule, muted)}>
        OperateAI · AI for Small Business
      </span>
    </span>
  );
}
```

- [ ] **Step 4: Update `web/components/site-header.tsx`**

Replace `aria-label="AAO Group home"` (line 41) with `aria-label="OperateAI home"`, and the "Book audit" `<Link href="/contact">` (line 66 and mobile equivalent line 118) with `<Link href="/book-ai-audit/">`. Keep all other layout intact.

Specific edits:
- Replace `aria-label="AAO Group home"` → `aria-label="OperateAI home"` (1 occurrence)
- Replace both `href="/contact"` → `href="/book-ai-audit/"` (2 occurrences)

- [ ] **Step 5: Update `web/components/site-footer.tsx`**

Replace:
- `aria-label="AAO Group home"` → `aria-label="OperateAI home"`
- `Secure AI operations for Australian businesses.` → `AI agents, automation, hosting and training for Australian small and medium businesses.`
- `ABN 51 559 921 362` → `{BUSINESS.abn}` (and import BUSINESS) — keep visible TODO placeholder
- `© 2026 AAO Group Pty Ltd. All rights reserved.` → `© {BUSINESS.copyrightYear} {BUSINESS.legalName}. All rights reserved.`

Full replacement of the file:
```tsx
import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LEGAL, PRIMARY_NAV } from "@/lib/nav";
import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/cn";

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-black bg-black text-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.5rem,4vw,3rem)] py-12">
        <div className="grid grid-cols-1 border-[3px] border-white md:grid-cols-12">
          <div className="border-b-[3px] border-white p-6 md:col-span-5 md:border-b-0 md:border-r-[3px]">
            <Link href="/" aria-label="OperateAI home" className="inline-block hover:text-[var(--color-primary-container)]">
              <Logo variant="stacked" tone="paper" />
            </Link>
            <p className="mt-8 max-w-[28ch] font-heading text-[2rem] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
              AI agents, automation, hosting and training for Australian small and medium businesses.
            </p>
            <p className="mt-6 max-w-[36ch] font-sans text-[0.9375rem] leading-[1.55] text-white/70">
              Based in Perth, Western Australia. Supporting businesses across Australia and online worldwide.
            </p>
          </div>

          <div className="border-b-[3px] border-white p-6 md:col-span-4 md:border-b-0 md:border-r-[3px]">
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
              Navigate
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-ai-audit/"
                  className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                >
                  Book audit
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 md:col-span-3">
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
              Legal
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-heading text-[0.8125rem] font-bold uppercase tracking-[0.06em] underline-offset-[6px] hover:text-[var(--color-primary-container)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[0.75rem] tracking-[0.04em] text-white/70">
              {BUSINESS.abn}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mt-8 flex flex-col gap-3 border-t-[3px] border-white pt-5",
            "md:flex-row md:items-center md:justify-between",
          )}
        >
          <p className="font-mono text-[0.75rem] tracking-[0.04em] text-white/70">
            &copy; {BUSINESS.copyrightYear} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-container)]">
            Built in Perth · Delivered worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Replace `web/components/structured-data.tsx`**

Now becomes a thin wrapper that emits Organization + WebSite globally, using the builders.

```tsx
import { JsonLd } from "@/components/json-ld";
import { buildOrganization, buildWebsite, wrapGraph } from "@/lib/schema";

export function StructuredData() {
  return <JsonLd schema={wrapGraph([buildOrganization(), buildWebsite()])} />;
}
```

- [ ] **Step 7: Replace `web/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    template: "%s | OperateAI",
  },
  description: BUSINESS.description,
  metadataBase: new URL(BUSINESS.url),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "AI consultancy",
  keywords: [
    "AI agents for business",
    "AI agents for small business",
    "AI automation for business",
    "AI integration services",
    "AI consultant Perth",
    "AI training for business",
    "AI agent hosting",
    "managed AI agents",
    "small business AI automation",
    "Perth AI consultant",
    "AI agents Perth",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    description: BUSINESS.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} — ${BUSINESS.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    description: BUSINESS.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <StructuredData />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Replace `web/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

export const alt = "OperateAI — AI agents, automation, hosting and training for Australian businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0E14",
          color: "#F6F4EE",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              fontFamily: "sans-serif",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontWeight: 200, opacity: 0.55 }}>[</span>
            <span style={{ fontWeight: 700 }}>opai</span>
            <span style={{ fontWeight: 200, opacity: 0.55 }}>]</span>
          </div>
          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: "1px solid #F6F4EE",
              fontSize: 22,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              opacity: 0.65,
              fontFamily: "monospace",
            }}
          >
            OperateAI · AI for Small Business
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            AI agents and automation for small businesses.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              letterSpacing: "-0.005em",
              maxWidth: 900,
              opacity: 0.7,
              fontFamily: "serif",
              fontStyle: "italic",
            }}
          >
            Built in Perth. Delivered across Australia and online worldwide.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.5,
            fontFamily: "sans-serif",
          }}
        >
          <span>Audit · Integration · Agents · Hosting · Training</span>
          <span>operateai.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
  void BUSINESS; // referenced for future variable swap
}
```

- [ ] **Step 9: Update `web/components/cta-band.tsx` defaults**

Change `primaryHref = "/contact"` to `primaryHref = "/book-ai-audit/"` and `primaryLabel = "Book a 15-minute audit"` to `primaryLabel = "Book an AI Business Audit"`.

Specific edits in cta-band.tsx:
- Line 22: `primaryHref = "/contact"` → `primaryHref = "/book-ai-audit/"`
- Line 23: `primaryLabel = "Book a 15-minute audit"` → `primaryLabel = "Book an AI Business Audit"`

- [ ] **Step 10: Rebrand legal pages**

Open `web/app/legal/privacy/page.tsx` and replace every occurrence of `AAO Group` with `OperateAI`, and every occurrence of `aaogroup.au` with `operateai.com.au`. Update any `ABN 51 559 921 362` to `{BUSINESS.abn}` (importing as needed). Same for `web/app/legal/terms/page.tsx`. No structural changes — text-only rebrand.

If those pages don't currently exist or have empty content, leave them as-is for now — they're tracked in Task 16.

- [ ] **Step 11: Update top-level `README.md`**

Read it first, then replace any `AAO Group` references with `OperateAI` and add a one-line note at the top describing the rebrand commit:

```
# OperateAI website (rebranded from AAO Group)
```

(Preserve the rest of the README structure.)

- [ ] **Step 12: Update `web/package.json` name field**

Change `"name": "web"` → `"name": "operateai-web"` (or leave `"web"` if pnpm workspaces depend on the name; if unsure, leave as `"web"` and note in commit message). The package name does not affect rendering.

- [ ] **Step 13: Run typecheck and lint**

```bash
cd web && pnpm exec tsc --noEmit && pnpm lint
```
Expected: errors only on missing pages from later tasks (`/ai-integration-services/page.tsx` etc.) — that's expected. Brand-swap files should have no errors. If layout.tsx or any brand-swap file errors, fix before committing.

- [ ] **Step 14: Commit**

```bash
git add web/next.config.ts web/lib/nav.ts web/components/logo.tsx web/components/site-header.tsx web/components/site-footer.tsx web/components/structured-data.tsx web/app/layout.tsx web/app/opengraph-image.tsx web/components/cta-band.tsx web/app/legal/ README.md web/package.json
git commit -m "$(cat <<'EOF'
feat(brand): swap AAO Group → OperateAI

- layout.tsx metadata, keywords, OG/Twitter card now OperateAI
- site-header/footer rebrand (logo, ARIA labels, copy line, ABN)
- logo component updated wordmark ([aao] → [opai])
- structured-data now emits Organization + WebSite via lib/schema
- cta-band default CTA points at /book-ai-audit/
- opengraph-image rebranded
- nav restructured to new URL hierarchy
- next.config: trailingSlash: true
- /legal/* text rebranded
- README brand line

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: New homepage components

**Files:**
- Modify: `web/components/home/hero.tsx`
- Modify: `web/components/home/problem-band.tsx`
- Modify: `web/components/home/use-cases-strip.tsx`
- Create: `web/components/home/solution-band.tsx`
- Create: `web/components/home/services-grid.tsx`
- Create: `web/components/home/audience-band.tsx`
- Create: `web/components/home/process-band.tsx`
- Create: `web/components/home/conversion-band.tsx`

- [ ] **Step 1: Rewrite `web/components/home/hero.tsx`**

```tsx
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";

const supportPoints = [
  "AI strategy for owners starting from zero",
  "Custom AI agents for sales, admin and ops",
  "Workflow automation for repetitive tasks",
  "Managed hosting, monitoring and improvement",
  "Practical AI training for the whole team",
];

export function Hero() {
  return (
    <section
      data-tone="paper"
      className={cn(
        "blueprint-grid w-full text-[var(--color-on-surface)]",
        "pt-[clamp(3.75rem,7vw,6rem)] pb-[clamp(3.25rem,6vw,5rem)]",
      )}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]">
        <div className="paint-in paint-delay-1 mb-8 flex items-center gap-3">
          <span className="power-dot" aria-hidden="true" />
          <p className="font-heading text-[0.75rem] font-bold uppercase leading-none tracking-[0.08em]">
            OperateAI · Built in Perth
          </p>
        </div>
        <h1
          className={cn(
            "paint-in paint-delay-2 max-w-[15ch]",
            "font-heading [font-size:var(--text-display)] font-bold leading-[0.9] tracking-[-0.055em]",
          )}
        >
          AI agents and automation for small businesses.
        </h1>
        <p className="paint-in paint-delay-3 mt-8 max-w-[44rem] border-l-[3px] border-black pl-5 [font-size:var(--text-lede)] leading-[1.55] text-[var(--color-muted)]">
          OperateAI helps small and medium businesses integrate practical AI
          into their daily operations — from first-time AI training to custom
          AI agents, workflow automation, hosting, management and ongoing
          support.
        </p>
        <ul className="paint-in paint-delay-4 mt-8 grid max-w-[60rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportPoints.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-[1.45] text-[var(--color-ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="paint-in paint-delay-4 mt-10 flex flex-col items-start gap-4 sm:flex-row">
          <Button as="a" href="/book-ai-audit/" size="lg">
            Book an AI Business Audit
          </Button>
          <Button as="a" href="/ai-integration-services/" variant="outline" size="lg">
            Explore AI services
          </Button>
        </div>
        <p className="paint-in paint-delay-5 mt-8 font-mono text-[0.875rem] text-[var(--color-muted)]">
          Based in Perth, Western Australia. Supporting businesses across Australia and online worldwide.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `web/components/home/problem-band.tsx`**

Open the current file, replace its content entirely with:
```tsx
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function ProblemBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="The problem"
        title="Most businesses know AI matters. Few know where to start."
        as="h2"
        className="mb-8"
      />
      <Reveal>
        <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          <p>
            AI tools are everywhere, but most small and medium businesses are
            still stuck at the experimentation stage.
          </p>
          <p>
            You may have staff using ChatGPT casually. You may have tried a few
            automation tools. You may know AI could save time, reduce admin and
            improve customer service — but without a clear implementation plan,
            it becomes another disconnected tool instead of a business
            advantage.
          </p>
          <p>
            OperateAI helps you move from scattered AI usage to structured AI
            systems that support real business workflows.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 3: Create `web/components/home/solution-band.tsx`**

```tsx
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function SolutionBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="What we do"
        title="We help you turn AI into a working business system."
        as="h2"
        className="mb-8"
      />
      <Reveal>
        <div className="max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          <p>OperateAI works with businesses at every level of AI maturity.</p>
          <p>
            If you are starting from zero, we help you understand what AI can
            and cannot do, identify useful opportunities, and train your team
            to use the right tools safely and effectively.
          </p>
          <p>
            If you already have technical staff or existing systems, we help
            design, build, integrate and manage AI agents that connect with
            your workflows, documents, customer interactions and internal
            processes.
          </p>
          <p>
            The goal is simple: practical AI that saves time, improves
            consistency and supports better business operations.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 4: Create `web/components/home/services-grid.tsx`**

```tsx
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    href: "/book-ai-audit/",
    title: "AI Business Audit",
    body: "A structured review of your workflows, tools, bottlenecks and AI opportunities. We identify where AI can create measurable value and where it should be avoided.",
    cta: "Book an audit",
  },
  {
    href: "/ai-integration-services/",
    title: "AI Integration Services",
    body: "We help integrate AI into your daily business processes, including customer support, admin, sales, reporting, operations, documentation and internal knowledge systems.",
    cta: "View integration services",
  },
  {
    href: "/ai-agents-for-business/",
    title: "Custom AI Agents",
    body: "We design and build AI agents that can assist with repetitive tasks, answer business-specific questions, process information, support customers and help staff work faster.",
    cta: "Explore AI agents",
  },
  {
    href: "/ai-agent-hosting/",
    title: "AI Agent Hosting & Management",
    body: "We host, monitor, maintain and improve AI agents so your business is not left managing technical systems alone.",
    cta: "View managed AI hosting",
  },
  {
    href: "/ai-training-for-business/",
    title: "AI Training for Business",
    body: "Practical training for owners, managers and staff — from AI basics to advanced workflows, prompt design, tool selection and safe business usage.",
    cta: "View training options",
  },
];

export function ServicesGrid() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Services"
        title="AI services for every stage of business adoption"
        as="h2"
        className="mb-10"
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.href} delay={i * 60}>
            <Link
              href={s.href}
              className="hard-offset group flex h-full flex-col border-[3px] border-black bg-[var(--color-surface)] p-6 hover:bg-[var(--color-primary-container)]"
            >
              <h3 className="font-heading text-[1.375rem] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.55] text-[var(--color-muted)] group-hover:text-black">
                {s.body}
              </p>
              <span className="mt-6 inline-flex w-fit border-t-[3px] border-black pt-3 font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em]">
                {s.cta} →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 5: Create `web/components/home/audience-band.tsx`**

```tsx
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function AudienceBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Who it's for"
        title="Built for non-technical owners and technical teams"
        as="h2"
        className="mb-10"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="border-[3px] border-black p-6">
          <h3 className="font-heading text-[1.25rem] font-bold uppercase tracking-[-0.02em]">
            Starting from zero
          </h3>
          <p className="mt-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
            For business owners and teams who are new to AI, we provide
            plain-English guidance, practical training and step-by-step
            implementation.
          </p>
        </Reveal>
        <Reveal className="border-[3px] border-black p-6" delay={60}>
          <h3 className="font-heading text-[1.25rem] font-bold uppercase tracking-[-0.02em]">
            With technical staff
          </h3>
          <p className="mt-5 text-[0.9375rem] leading-[1.6] text-[var(--color-muted)]">
            For businesses with more technical personnel, we provide deeper
            support across AI agent design, workflow architecture, automation
            logic, hosting, documentation and ongoing optimisation.
          </p>
        </Reveal>
      </div>
      <p className="mt-8 max-w-[var(--measure)] text-[1rem] leading-[1.6] text-[var(--color-muted)]">
        You do not need to know exactly what you need before speaking with us.
        The first step is identifying where AI can create useful business
        value.
      </p>
    </Section>
  );
}
```

- [ ] **Step 6: Rewrite `web/components/home/use-cases-strip.tsx`**

```tsx
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const USE_CASES = [
  "Customer support assistants trained on your business information",
  "Internal knowledge assistants for policies, procedures and documents",
  "Lead qualification and sales support agents",
  "Automated email, proposal and document drafting workflows",
  "AI-assisted quoting, intake and admin processes",
  "Reporting and data summarisation workflows",
  "Staff training and AI adoption programs",
  "AI agents connected to business tools and databases",
  "AI governance, usage policies and risk controls",
];

export function UseCasesStrip() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="Use cases"
        title="Common AI use cases for small and medium businesses"
        as="h2"
        className="mb-10"
      />
      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map((u, i) => (
          <Reveal as="li" key={u} delay={i * 30} className="flex gap-3 text-[1rem] leading-[1.5]">
            <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
            <span>{u}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 7: Create `web/components/home/process-band.tsx`**

```tsx
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body: "We review your business workflows, tools, pain points, staff capability and AI opportunities.",
  },
  {
    n: "02",
    title: "Roadmap",
    body: "You receive a practical AI implementation plan prioritised by value, complexity, risk and speed of deployment.",
  },
  {
    n: "03",
    title: "Build",
    body: "We configure tools, design workflows, build AI agents and integrate systems where appropriate.",
  },
  {
    n: "04",
    title: "Train",
    body: "We train owners, managers and staff so the AI systems are used properly and consistently.",
  },
  {
    n: "05",
    title: "Manage",
    body: "We provide ongoing hosting, monitoring, updates and optimisation for businesses that want managed AI operations.",
  },
];

export function ProcessBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <SectionHeading
        eyebrow="How we work"
        title="From audit to managed operations"
        as="h2"
        className="mb-10"
      />
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 50} className="border-[3px] border-black bg-[var(--color-surface)] p-5">
            <p className="font-mono text-[0.875rem] leading-none">{s.n}</p>
            <h3 className="mt-6 font-heading text-[1.25rem] font-bold uppercase leading-none tracking-[-0.03em]">
              {s.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.5] text-[var(--color-muted)]">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 8: Create `web/components/home/conversion-band.tsx`**

```tsx
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";

export function ConversionBand() {
  return (
    <Section tone="paper" className="border-t-[3px] border-black">
      <Reveal className="max-w-[var(--measure)] space-y-6">
        <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[1] tracking-[-0.035em]">
          Start with an AI Business Audit
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
          The fastest way to begin is with a focused AI Business Audit. We
          review your current tools, workflows and opportunities, then identify
          where AI agents, automation or training can deliver practical value.
          You will leave with a clear implementation roadmap instead of vague
          AI ideas.
        </p>
        <div className="pt-2">
          <Button as="a" href="/book-ai-audit/" size="lg">
            Book an AI Business Audit
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 9: Verify TypeScript compiles for new components**

```bash
cd web && pnpm exec tsc --noEmit
```
Expected: still errors on missing pages (acceptable). No errors in any `components/home/*.tsx` file. Fix any in-file errors before moving on.

- [ ] **Step 10: Commit**

```bash
git add web/components/home/
git commit -m "$(cat <<'EOF'
feat(home): rebuild homepage components per OperateAI spec

- hero: new H1, subhead, 5 support bullets, dual CTAs
- problem-band: "Most businesses know AI matters" copy
- solution-band (new): "We help you turn AI into a working system"
- services-grid (new, replaces offer-cards): 5 service cards
- audience-band (new): non-technical vs technical
- use-cases-strip: 9 SMB AI use cases
- process-band (new): 5-step Audit→Roadmap→Build→Train→Manage
- conversion-band (new): closing CTA above CTABand

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Rewrite homepage `web/app/page.tsx`

**Files:**
- Modify: `web/app/page.tsx`

- [ ] **Step 1: Replace `web/app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProblemBand } from "@/components/home/problem-band";
import { SolutionBand } from "@/components/home/solution-band";
import { ServicesGrid } from "@/components/home/services-grid";
import { AudienceBand } from "@/components/home/audience-band";
import { UseCasesStrip } from "@/components/home/use-cases-strip";
import { ProcessBand } from "@/components/home/process-band";
import { ConversionBand } from "@/components/home/conversion-band";
import { FaqSection } from "@/components/faq/faq-section";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
  description:
    "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff. Based in Perth, serving Australia and online clients worldwide.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    question: "What does an AI consultant do for a small business?",
    answer:
      "An AI consultant helps a business identify where AI can be used practically, choose the right tools, design workflows, train staff and implement systems such as AI agents, automation and internal knowledge assistants. The goal is to apply AI where it creates measurable operational value.",
  },
  {
    question: "Do we need technical staff to use your AI services?",
    answer:
      "No. OperateAI works with both non-technical business owners and more technical teams. For beginners, we provide plain-English guidance and training. For technical teams, we support deeper workflow design, AI agent architecture, integrations and managed operations.",
  },
  {
    question: "Can you build custom AI agents for our business?",
    answer:
      "Yes. OperateAI can design and build custom AI agents for customer support, admin, sales, internal knowledge, operations, onboarding and other business workflows. Each agent should have a clear purpose, defined boundaries and appropriate business information.",
  },
  {
    question: "Do you offer AI training in Perth?",
    answer:
      "Yes. OperateAI offers AI training for businesses in Perth and across Australia. Training can be delivered for owners, managers, staff and technical personnel, either in person where suitable or online.",
  },
  {
    question: "Do you host and manage AI agents?",
    answer:
      "Yes. OperateAI provides managed AI agent hosting, monitoring, maintenance and optimisation for businesses that want AI systems running without managing the technical details internally.",
  },
  {
    question: "Is AI suitable for every business process?",
    answer:
      "No. AI is useful for many repetitive, information-heavy and support workflows, but it is not suitable for every task. A proper AI audit should identify where AI can help, where human oversight is required, and where automation would create unnecessary risk.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({
            url: BUSINESS.url + "/",
            title: "OperateAI — AI agents and automation for small businesses",
            description:
              "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff.",
          }),
          buildLocalBusiness(),
        ])}
      />
      <Hero />
      <ProblemBand />
      <SolutionBand />
      <ServicesGrid />
      <AudienceBand />
      <UseCasesStrip />
      <ProcessBand />
      <ConversionBand />
      <FaqSection items={FAQS} />
      <CTABand
        headline="Not sure where AI fits your business?"
        body="Start with an AI Business Audit. We will identify the best opportunities, the risks to avoid, and the clearest next steps for implementation."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />
    </>
  );
}
```

- [ ] **Step 2: Start dev server and visit homepage**

```bash
cd web && pnpm dev --port 3456
```
Open `http://localhost:3456/` in a browser. Expected: page renders with new hero, problem, solution, services grid, audience, use cases, process, conversion, FAQ, CTA band. No console errors. Kill the dev server (Ctrl+C) before continuing.

- [ ] **Step 3: Commit**

```bash
git add web/app/page.tsx
git commit -m "$(cat <<'EOF'
feat(home): wire homepage to new component set + LocalBusiness schema

Homepage emits LocalBusiness + WebPage JSON-LD inline (Organization
+ WebSite already global via layout). Renders 6-item FAQPage block.
All CTAs route to /book-ai-audit/.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: `/ai-integration-services/` page

**Files:**
- Create: `web/app/ai-integration-services/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-integration-services/`;
const TITLE = "AI Integration Services for Small Business | OperateAI";
const DESCRIPTION =
  "AI integration services for small and medium businesses. OperateAI helps integrate AI tools, agents and automation into daily workflows. Perth-based, Australia-wide and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-integration-services/" },
};

const FAQS = [
  {
    question: "What is AI integration?",
    answer:
      "AI integration is the process of connecting AI tools, agents and automation into the systems your business already uses — CRMs, helpdesks, document stores, spreadsheets, accounting tools — so AI supports daily operations rather than sitting in a separate app.",
  },
  {
    question: "Do we need to replace our existing tools?",
    answer:
      "No. OperateAI typically integrates AI alongside your existing tools (ChatGPT, Microsoft Copilot, Google Gemini, Notion, Zapier, Make, CRMs, helpdesks, accounting platforms) rather than replacing them.",
  },
  {
    question: "How long does an integration take?",
    answer:
      "A single high-value workflow typically takes 2 to 4 weeks from audit to handover. Larger multi-workflow programs run longer and are scoped on a roadmap after the AI Business Audit.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="AI integration services for small and medium businesses"
      opening={
        <>
          <p>
            AI integration is not about adding another tool to your business.
            It is about connecting AI to the way your business already works.
          </p>
          <p>
            OperateAI helps small and medium businesses integrate AI into
            practical workflows across admin, sales, customer service,
            operations, reporting, documentation and internal knowledge
            management.
          </p>
          <p>We focus on usable systems, not gimmicks.</p>
        </>
      }
      whoItIsFor={
        <p>
          This service is for businesses that want to move beyond casual AI
          usage and start using AI as part of daily operations. You may
          already use tools like ChatGPT, Microsoft Copilot, Google Gemini,
          Notion, Zapier, Make, CRMs, helpdesk software, accounting platforms
          or internal databases. We help identify where AI fits, what should
          be automated, what should stay human-led, and how to make the
          system reliable.
        </p>
      }
      included={{
        heading: "What we can integrate",
        items: [
          "AI chat assistants",
          "Internal knowledge bases",
          "Customer support workflows",
          "Sales and lead qualification workflows",
          "Document generation systems",
          "Email and inbox workflows",
          "CRM and pipeline workflows",
          "Reporting and summarisation workflows",
          "Standard operating procedures",
          "Staff training workflows",
        ],
      }}
      conversion={
        <p>
          The result is a practical AI system that supports your business
          instead of distracting it.
        </p>
      }
      ctaLabel="Book an AI Integration Call"
      relatedLinks={[
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-agent-hosting/", label: "AI Agent Hosting" },
        { href: "/ai-training-for-business/", label: "AI Training" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
```

- [ ] **Step 2: Start dev server and verify the route renders**

```bash
cd web && pnpm dev --port 3456
```
Visit `http://localhost:3456/ai-integration-services/`. Expected: hero with H1, opening paragraphs, "Who this is for", "What we can integrate" list, FAQ, CTA band, related-services links. Kill the dev server.

- [ ] **Step 3: Commit**

```bash
git add web/app/ai-integration-services/
git commit -m "$(cat <<'EOF'
feat(page): /ai-integration-services/ landing page

Builds the AI Integration Services page using ServicePageLayout with
Service + WebPage + FAQPage JSON-LD, 3-item FAQ, and internal links
per spec §14.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: `/ai-agents-for-business/` page

**Files:**
- Create: `web/app/ai-agents-for-business/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agents-for-business/`;
const TITLE = "AI Agents for Business | Custom AI Agents for SMBs | OperateAI";
const DESCRIPTION =
  "Custom AI agents for small and medium businesses. Build AI agents for customer support, admin, sales, operations, documents and internal knowledge workflows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agents-for-business/" },
};

const FAQS = [
  {
    question: "What is the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot follows a fixed script. An AI agent has a defined role, access to the right business information, clear instructions, usage boundaries, and a workflow it is designed to support. Agents can retrieve information, draft responses, process documents and operate across multiple steps.",
  },
  {
    question: "Where do AI agents store our business information?",
    answer:
      "We design agents with a defined knowledge boundary — typically a curated knowledge base of FAQs, policies, documents or procedures that you control. We do not feed customer data into public training pipelines, and access controls are part of every build.",
  },
  {
    question: "Can AI agents connect to our existing tools?",
    answer:
      "Yes. Agents can be wired to CRMs, helpdesks, document stores, ticketing systems, calendars and similar tools where the integration is supported and authorised. Scope is defined per build.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Custom AI agents for business workflows"
      opening={
        <>
          <p>
            AI agents can help your business handle repetitive,
            information-heavy and process-driven work with greater speed and
            consistency.
          </p>
          <p>
            OperateAI designs and builds custom AI agents for small and medium
            businesses. These agents can support staff, assist customers,
            retrieve business information, process documents, draft responses,
            qualify leads and help automate routine workflows.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-on-surface)]">
            An AI agent is not just a chatbot.
          </h2>
          <p>
            A properly designed AI agent has a defined role, access to the
            right business information, clear instructions, usage boundaries
            and a workflow it is designed to support.
          </p>
        </>
      }
      included={{
        heading: "What every agent we build includes",
        items: [
          "Clearly defined role and scope",
          "Curated knowledge base",
          "Guardrails and refusal behaviour",
          "Escalation paths to humans",
          "Documentation for staff and operators",
          "Logging and review hooks",
          "Performance tuning over time",
          "Access controls and data handling rules",
        ],
      }}
      secondaryList={{
        heading: "Agent examples",
        items: [
          "Customer support agent trained on your FAQs, policies and service information",
          "Internal staff assistant trained on procedures, documents and business knowledge",
          "Sales assistant for lead qualification, follow-up and proposal drafting",
          "Operations assistant for task summaries, handovers and workflow support",
          "Admin assistant for intake forms, emails, document drafting and data extraction",
          "Training assistant for onboarding and staff education",
        ],
      }}
      conversion={
        <p>
          Poorly designed AI agents create risk, confusion and inconsistent
          results. OperateAI designs agents with clear scope, guardrails,
          escalation paths, documentation and ongoing improvement. The goal is
          not to replace your team. The goal is to give your team better
          systems.
        </p>
      }
      ctaLabel="Discuss an AI Agent Build"
      relatedLinks={[
        { href: "/ai-agent-hosting/", label: "AI Agent Hosting" },
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
```

- [ ] **Step 2: Verify the route renders**

Run dev (`pnpm dev --port 3456`), visit `/ai-agents-for-business/`, confirm H1, agent examples list, FAQ, CTA. Kill dev.

- [ ] **Step 3: Commit**

```bash
git add web/app/ai-agents-for-business/
git commit -m "feat(page): /ai-agents-for-business/ landing page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: `/ai-agent-hosting/` page

**Files:**
- Create: `web/app/ai-agent-hosting/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-agent-hosting/`;
const TITLE = "AI Agent Hosting & Management | Managed AI Agents | OperateAI";
const DESCRIPTION =
  "Managed AI agent hosting, monitoring and optimisation for businesses. OperateAI hosts and manages AI agents so your team can use AI without technical overhead.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-agent-hosting/" },
};

const FAQS = [
  {
    question: "What does managed AI agent hosting include?",
    answer:
      "Hosting, access management, prompt and knowledge-base maintenance, workflow monitoring, performance reviews, issue troubleshooting, usage reporting, security controls, and ongoing improvement recommendations.",
  },
  {
    question: "How do you handle security and access controls?",
    answer:
      "Every managed agent has defined access controls, logged activity, and a documented data-handling policy. We work with you to set role boundaries, retention rules and escalation paths before go-live.",
  },
  {
    question: "Can we cancel managed hosting?",
    answer:
      "Yes. Managed AI hosting runs on a month-to-month basis after the initial setup period. On cancellation we provide an offboarding handover covering knowledge bases, prompts, configuration and documentation.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Managed AI agent hosting and support"
      opening={
        <>
          <p>
            Building an AI agent is only the first step. To be useful in a
            business, it needs to be hosted, monitored, maintained, updated
            and improved over time.
          </p>
          <p>
            OperateAI provides managed AI agent hosting and support for
            businesses that want the benefits of AI automation without
            carrying the technical burden internally.
          </p>
        </>
      }
      included={{
        heading: "What is included",
        items: [
          "AI agent setup and deployment",
          "Hosting and access management",
          "Prompt and instruction maintenance",
          "Knowledge base updates",
          "Workflow monitoring",
          "Performance reviews",
          "Issue troubleshooting",
          "Usage reporting",
          "Security and access controls",
          "Ongoing improvement recommendations",
        ],
      }}
      conversion={
        <p>
          Managed AI agent hosting is suitable for businesses that want AI
          systems operating reliably across customer support, sales, admin,
          internal knowledge, training or operational workflows. It is
          especially useful when your business does not have an internal AI
          engineer or automation specialist.
        </p>
      }
      ctaLabel="View Managed AI Options"
      relatedLinks={[
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
```

- [ ] **Step 2: Verify the route renders**

Dev server, visit `/ai-agent-hosting/`, confirm content. Kill dev.

- [ ] **Step 3: Commit**

```bash
git add web/app/ai-agent-hosting/
git commit -m "feat(page): /ai-agent-hosting/ landing page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: `/ai-training-for-business/` page

**Files:**
- Create: `web/app/ai-training-for-business/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/ai-training-for-business/`;
const TITLE = "AI Training for Business | Practical AI Training for SMBs | OperateAI";
const DESCRIPTION =
  "Practical AI training for small and medium businesses. Train owners, managers and staff to use AI tools, prompts, workflows and agents safely and effectively.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-training-for-business/" },
};

const FAQS = [
  {
    question: "Do you train teams that have never used AI before?",
    answer:
      "Yes. Our beginner sessions assume zero prior experience and focus on what AI can and cannot do, how to use tools like ChatGPT effectively, and how to avoid common mistakes.",
  },
  {
    question: "Is training delivered in person or online?",
    answer:
      "Both. In-person sessions are available in Perth and on request elsewhere in Australia. Online sessions are available worldwide.",
  },
  {
    question: "Can you tailor training to our business?",
    answer:
      "Yes. Sessions are built around your team capability, the tools you already use, and the workflows where AI can make the biggest difference.",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      h1="Practical AI training for business owners and teams"
      opening={
        <>
          <p>AI training should not be abstract, technical or filled with hype.</p>
          <p>
            OperateAI provides practical AI training for small and medium
            businesses that want their owners, managers and staff to use AI
            tools confidently, safely and productively.
          </p>
        </>
      }
      body={
        <>
          <h2 className="font-heading text-[1.5rem] font-bold uppercase tracking-[-0.02em] text-[var(--color-on-surface)]">
            Training levels
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Beginner</h3>
              <p>
                For teams starting from zero. Learn what AI can do, where it
                fits in business, how to use tools like ChatGPT effectively,
                and how to avoid common mistakes.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Intermediate</h3>
              <p>
                For teams already using AI casually. Learn stronger prompting,
                repeatable workflows, document handling, task automation and
                team-wide usage standards.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[1.125rem] font-bold uppercase tracking-[-0.01em]">Advanced</h3>
              <p>
                For technical or operations-focused teams. Learn AI agent
                workflows, automation planning, knowledge base design, tool
                selection, governance and implementation methods.
              </p>
            </div>
          </div>
        </>
      }
      included={{
        heading: "Training topics",
        items: [
          "AI fundamentals for business",
          "Prompting for practical work",
          "AI for admin, sales and operations",
          "AI-assisted writing and documentation",
          "AI workflow design",
          "AI agents and automation",
          "AI policy and governance",
          "Safe use of business data",
          "Tool selection and implementation",
          "Team adoption and change management",
        ],
      }}
      ctaLabel="Book AI Training"
      relatedLinks={[
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
      faq={<FaqSection items={FAQS} emitSchema={false} />}
      faqItems={FAQS}
    />
  );
}
```

- [ ] **Step 2: Verify the route renders**

Dev server, visit `/ai-training-for-business/`. Kill dev.

- [ ] **Step 3: Commit**

```bash
git add web/app/ai-training-for-business/
git commit -m "feat(page): /ai-training-for-business/ landing page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: `/perth-ai-consultant/` page

**Files:**
- Create: `web/app/perth-ai-consultant/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/service/service-page-layout";
import { FaqSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/perth-ai-consultant/`;
const TITLE = "AI Consultant Perth | AI Agents, Automation & Training | OperateAI";
const DESCRIPTION =
  "Perth AI consultant helping small and medium businesses integrate AI, build AI agents, automate workflows and train staff. Serving Perth, WA, Australia and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/perth-ai-consultant/" },
};

const FAQS = [
  {
    question: "Do you only work with Perth businesses?",
    answer:
      "No. OperateAI is based in Perth, Western Australia and works with businesses across Perth, WA, the rest of Australia, and online clients worldwide.",
  },
  {
    question: "Do you offer in-person consultations in Perth?",
    answer:
      "Yes. For Perth-based clients we offer in-person discovery sessions, audit interviews and on-site training where suitable. Most ongoing work is delivered online.",
  },
  {
    question: "What kinds of Perth businesses do you work with?",
    answer:
      "Local service businesses, professional firms, trades, agencies, ecommerce businesses and growing teams that want AI to support real work — not create more complexity.",
  },
];

export default function Page() {
  return (
    <>
      {/* LocalBusiness schema repeated here so the Perth landing page itself signals local relevance. */}
      <JsonLd schema={wrapGraph([buildLocalBusiness()])} />
      <ServicePageLayout
        pageUrl={PAGE_URL}
        title={TITLE}
        description={DESCRIPTION}
        h1="AI consultant in Perth for small and medium businesses"
        opening={
          <>
            <p>
              OperateAI is a Perth-based AI consultancy helping small and
              medium businesses adopt practical AI systems.
            </p>
            <p>
              We support businesses across Perth and Western Australia with AI
              integration, custom AI agents, workflow automation, staff
              training and managed AI agent hosting.
            </p>
          </>
        }
        whoItIsFor={
          <>
            <p>
              Many Perth businesses know AI could improve operations but are
              unsure where to begin. OperateAI helps identify realistic
              opportunities, design practical systems, train staff and manage
              ongoing AI workflows.
            </p>
            <p>
              We work with local service businesses, professional firms,
              trades, agencies, ecommerce businesses and growing teams that
              want AI to support real work — not create more complexity.
            </p>
            <p>
              Based in Perth, Western Australia. Supporting businesses across
              Perth, WA, Australia-wide and online worldwide.
            </p>
          </>
        }
        included={{
          heading: "How we help Perth businesses",
          items: [
            "AI Business Audit and roadmap",
            "AI integration into your existing tools",
            "Custom AI agent design and build",
            "Managed AI agent hosting",
            "Practical AI training for your team",
            "AI governance and usage policies",
            "Workflow automation",
            "Ongoing improvement and support",
          ],
        }}
        ctaLabel="Book a Perth AI Consultation"
        relatedLinks={[
          { href: "/ai-integration-services/", label: "AI Integration" },
          { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
          { href: "/ai-training-for-business/", label: "AI Training" },
          { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
        ]}
        faq={<FaqSection items={FAQS} emitSchema={false} />}
        faqItems={FAQS}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify the route renders**

Dev server, visit `/perth-ai-consultant/`. Verify second LocalBusiness schema appears in page source (view source, search for `localbusiness`). Kill dev.

- [ ] **Step 3: Commit**

```bash
git add web/app/perth-ai-consultant/
git commit -m "feat(page): /perth-ai-consultant/ Perth local landing page

Emits a second LocalBusiness JSON-LD block on this page to strengthen
local-search relevance signals per Google's relevance/distance/
prominence local-ranking factors.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 15: `/book-ai-audit/` page

**Files:**
- Create: `web/app/book-ai-audit/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { buildService, buildWebPage, wrapGraph } from "@/lib/schema";
import { FaqSection } from "@/components/faq/faq-section";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/book-ai-audit/`;
const TITLE = "Book an AI Business Audit | OperateAI";
const DESCRIPTION =
  "Book an AI Business Audit with OperateAI. A focused review of your workflows, tools, risks and AI opportunities, with a prioritised implementation roadmap.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book-ai-audit/" },
};

const DELIVERABLES = [
  "Workflow review",
  "AI opportunity map",
  "Risk and feasibility assessment",
  "Recommended tools and systems",
  "Prioritised implementation roadmap",
  "Next-step proposal",
];

const FAQS = [
  {
    question: "How long is the audit?",
    answer:
      "The audit is typically delivered over 1 to 2 weeks, depending on the size of your business and the number of workflows under review.",
  },
  {
    question: "What do we need to prepare?",
    answer:
      "An overview of your business, a list of the tools and systems you currently use, the workflows that consume the most time, and (if available) any prior AI tool usage your team has experimented with.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "You receive a prioritised implementation roadmap and a next-step proposal. From there you can engage OperateAI for an AI Integration Sprint, custom AI agent build, training, or managed AI operations — or take the roadmap to another provider.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION }),
          buildService({
            name: "AI Business Audit",
            url: PAGE_URL,
            description:
              "A focused review of your business workflows, tools, risks and AI opportunities, delivering a prioritised AI implementation roadmap.",
          }),
        ])}
      />

      <Section tone="paper">
        <Reveal>
          <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            Entry offer · Audit
          </p>
          <h1 className="mt-5 max-w-[20ch] font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Book an AI Business Audit
          </h1>
          <div className="mt-8 max-w-[var(--measure)] space-y-5 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)]">
            <p>
              A focused review of your business workflows, tools, risks and AI
              opportunities. Best for businesses that want a clear starting
              point before investing in AI implementation.
            </p>
            <p>
              You will leave with a prioritised implementation roadmap instead
              of vague AI ideas.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            {/*
              TODO(operator): replace data-booking-url placeholder with the real
              Cal.com / Calendly URL, then wire this Button to <a href={...}>
              or swap in the booking embed component.
            */}
            <Button
              as="a"
              href="mailto:hello@operateai.com.au?subject=AI%20Business%20Audit%20Enquiry"
              data-booking-url="TODO(operator): https://cal.com/operateai/audit"
              size="lg"
            >
              Book a call
            </Button>
            <Button as="a" href="/ai-integration-services/" variant="outline" size="lg">
              See what comes after
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper" className="border-t-[3px] border-black">
        <SectionHeading title="What you receive" as="h2" className="mb-8" />
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {DELIVERABLES.map((d) => (
            <li key={d} className="flex gap-3 text-[1rem] leading-[1.5]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection items={FAQS} />

      <Section tone="ink" className="border-t-[3px] border-black">
        <Reveal>
          <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[1] tracking-[-0.035em] text-white">
            Ready when you are.
          </h2>
          <p className="mt-6 max-w-[var(--measure)] text-[1.0625rem] leading-[1.6] text-white/75">
            We will identify the best opportunities, the risks to avoid, and
            the clearest next steps for implementation.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href="mailto:hello@operateai.com.au?subject=AI%20Business%20Audit%20Enquiry"
              variant="inverse"
              size="lg"
            >
              Email us to book
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify the route renders**

Dev server, visit `/book-ai-audit/`. Confirm `TODO(operator)` markers in source. Kill dev.

- [ ] **Step 3: Commit**

```bash
git add web/app/book-ai-audit/
git commit -m "$(cat <<'EOF'
feat(page): /book-ai-audit/ booking landing page

Bespoke layout (not ServicePageLayout) because this is the conversion
endpoint. CTA points at a mailto placeholder with a
data-booking-url=\"TODO(operator):\" attribute the operator will
replace with the real Cal.com or Calendly URL pre-launch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Industries hub + 6 industry pages

**Files:**
- Create: `web/app/industries/page.tsx`
- Create: `web/app/industries/ai-for-accounting-firms/page.tsx`
- Create: `web/app/industries/ai-for-real-estate-agencies/page.tsx`
- Create: `web/app/industries/ai-for-trades-businesses/page.tsx`
- Create: `web/app/industries/ai-for-health-clinics/page.tsx`
- Create: `web/app/industries/ai-for-law-firms/page.tsx`
- Create: `web/app/industries/ai-for-ecommerce-businesses/page.tsx`

- [ ] **Step 1: Create `web/app/industries/page.tsx` (hub)**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CTABand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/industries/`;
const TITLE = "AI for [Industry] Businesses | OperateAI";
const DESCRIPTION =
  "AI agents, automation and training tailored to industries — accounting, real estate, trades, health, law and ecommerce. OperateAI helps reduce admin and improve operations.";

export const metadata: Metadata = {
  title: "AI by Industry | OperateAI",
  description: DESCRIPTION,
  alternates: { canonical: "/industries/" },
};

const INDUSTRIES = [
  { slug: "ai-for-accounting-firms", label: "Accounting firms" },
  { slug: "ai-for-real-estate-agencies", label: "Real estate agencies" },
  { slug: "ai-for-trades-businesses", label: "Trades businesses" },
  { slug: "ai-for-health-clinics", label: "Health clinics" },
  { slug: "ai-for-law-firms", label: "Law firms" },
  { slug: "ai-for-ecommerce-businesses", label: "Ecommerce businesses" },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Industries"
          title="AI by industry"
          lede="Practical AI agents, automation and training tailored to common Australian small- and medium-business sectors."
          as="h1"
          className="mb-10"
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i, idx) => (
            <Reveal as="li" key={i.slug} delay={idx * 50}>
              <Link
                href={`/industries/${i.slug}/`}
                className="hard-offset flex h-full flex-col border-[3px] border-black bg-[var(--color-surface)] p-6 hover:bg-[var(--color-primary-container)]"
              >
                <h2 className="font-heading text-[1.375rem] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
                  AI for {i.label.toLowerCase()}
                </h2>
                <span className="mt-6 inline-flex w-fit border-t-[3px] border-black pt-3 font-heading text-[0.75rem] font-bold uppercase tracking-[0.08em]">
                  View →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTABand
        headline="Don't see your industry?"
        body="If your sector is not listed, it does not mean we cannot help. Book an audit and we will assess fit directly."
        primaryLabel="Book an AI Business Audit"
        primaryHref="/book-ai-audit/"
      />
    </>
  );
}
```

- [ ] **Step 2: Create the 6 industry pages**

For each industry, create a `page.tsx` with the metadata and props for `IndustryPageLayout`. Use this template — substitute the industry-specific fields.

**Template (`web/app/industries/<slug>/page.tsx`):**

```tsx
import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/industry/industry-page-layout";
import { BUSINESS } from "@/lib/business";

const SLUG = "<slug-here>";
const INDUSTRY = "<industry-here>"; // e.g. "accounting firms"
const PAGE_URL = `${BUSINESS.url}/industries/${SLUG}/`;
const TITLE = `AI for ${capitalised(INDUSTRY)} | Automation, Agents & Training | OperateAI`;
const DESCRIPTION = `AI services for ${INDUSTRY}. OperateAI helps ${INDUSTRY} teams use AI agents, automation, training and managed workflows to reduce admin and improve operations.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/industries/${SLUG}/` },
};

function capitalised(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Page() {
  return (
    <IndustryPageLayout
      pageUrl={PAGE_URL}
      title={TITLE}
      description={DESCRIPTION}
      industry={INDUSTRY}
      h1={`AI for ${INDUSTRY}`}
      opening={
        <>
          <p>
            {capitalised(INDUSTRY)} businesses deal with repetitive admin,
            customer questions, documentation, follow-ups and operational
            bottlenecks.
          </p>
          <p>
            OperateAI helps {INDUSTRY} teams use practical AI tools, agents
            and automation to reduce manual work, improve consistency and
            support better client service.
          </p>
        </>
      }
      useCases={[
        "Client intake support",
        "Document drafting and summarisation",
        "FAQ and customer support assistants",
        "Follow-up and reminder workflows",
        "Internal knowledge assistants",
        "Sales and lead qualification support",
        "Staff onboarding and training",
        "Reporting and operational summaries",
      ]}
      relatedLinks={[
        { href: "/ai-integration-services/", label: "AI Integration" },
        { href: "/ai-agents-for-business/", label: "Custom AI Agents" },
        { href: "/ai-training-for-business/", label: "AI Training" },
        { href: "/book-ai-audit/", label: "Book an AI Business Audit" },
      ]}
    />
  );
}
```

Now instantiate the template 6 times, substituting:

| File | `SLUG` | `INDUSTRY` |
|---|---|---|
| `industries/ai-for-accounting-firms/page.tsx` | `ai-for-accounting-firms` | `accounting firms` |
| `industries/ai-for-real-estate-agencies/page.tsx` | `ai-for-real-estate-agencies` | `real estate agencies` |
| `industries/ai-for-trades-businesses/page.tsx` | `ai-for-trades-businesses` | `trades businesses` |
| `industries/ai-for-health-clinics/page.tsx` | `ai-for-health-clinics` | `health clinics` |
| `industries/ai-for-law-firms/page.tsx` | `ai-for-law-firms` | `law firms` |
| `industries/ai-for-ecommerce-businesses/page.tsx` | `ai-for-ecommerce-businesses` | `ecommerce businesses` |

Each file is the template above with `SLUG` and `INDUSTRY` constants updated. The page body code is identical otherwise.

- [ ] **Step 3: Verify all industry routes render**

Dev server, visit:
- `/industries/`
- `/industries/ai-for-accounting-firms/`
- `/industries/ai-for-real-estate-agencies/`
- `/industries/ai-for-trades-businesses/`
- `/industries/ai-for-health-clinics/`
- `/industries/ai-for-law-firms/`
- `/industries/ai-for-ecommerce-businesses/`

Each should render H1, opening copy, use cases list, CTA band, related links. Kill dev.

- [ ] **Step 4: Commit**

```bash
git add web/app/industries/
git commit -m "$(cat <<'EOF'
feat(industries): hub + 6 industry pages

Adds /industries/ overview hub and 6 industry-specific landing pages
(accounting firms, real estate agencies, trades businesses, health
clinics, law firms, ecommerce businesses) using IndustryPageLayout.
Each emits a WebPage JSON-LD node.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Sitemap + robots + smoke tests + build verify

**Files:**
- Modify: `web/app/sitemap.ts`
- Modify: `web/app/robots.ts`
- Modify: `web/__tests__/routes.smoke.test.ts`

- [ ] **Step 1: Rewrite `web/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

const BASE_URL = BUSINESS.url;

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/ai-integration-services/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-agents-for-business/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-agent-hosting/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-training-for-business/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/perth-ai-consultant/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/book-ai-audit/", changeFrequency: "monthly", priority: 0.95 },
  { path: "/industries/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/ai-for-accounting-firms/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-real-estate-agencies/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-trades-businesses/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-health-clinics/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-law-firms/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-ecommerce-businesses/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/legal/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
```

- [ ] **Step 2: Rewrite `web/app/robots.ts`**

Read it first to preserve any existing site-specific rules. If it's a simple allow-all file, replace with:
```ts
import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
```

- [ ] **Step 3: Rewrite smoke test `web/__tests__/routes.smoke.test.ts`**

```ts
import { test, expect } from "@playwright/test";

const ROUTES: { path: string; needle: RegExp }[] = [
  { path: "/", needle: /AI agents and automation for small businesses/i },
  { path: "/ai-integration-services/", needle: /AI integration services for small and medium businesses/i },
  { path: "/ai-agents-for-business/", needle: /Custom AI agents for business workflows/i },
  { path: "/ai-agent-hosting/", needle: /Managed AI agent hosting and support/i },
  { path: "/ai-training-for-business/", needle: /Practical AI training for business owners and teams/i },
  { path: "/perth-ai-consultant/", needle: /AI consultant in Perth/i },
  { path: "/book-ai-audit/", needle: /Book an AI Business Audit/i },
  { path: "/industries/", needle: /AI by industry/i },
  { path: "/industries/ai-for-accounting-firms/", needle: /AI for accounting firms/i },
  { path: "/industries/ai-for-real-estate-agencies/", needle: /AI for real estate agencies/i },
  { path: "/industries/ai-for-trades-businesses/", needle: /AI for trades businesses/i },
  { path: "/industries/ai-for-health-clinics/", needle: /AI for health clinics/i },
  { path: "/industries/ai-for-law-firms/", needle: /AI for law firms/i },
  { path: "/industries/ai-for-ecommerce-businesses/", needle: /AI for ecommerce businesses/i },
  { path: "/legal/privacy/", needle: /Privacy/i },
  { path: "/legal/terms/", needle: /Terms/i },
];

for (const { path, needle } of ROUTES) {
  test(`route ${path} renders and contains expected headline`, async ({ page }) => {
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

test("404 page renders for unknown route", async ({ page }) => {
  const response = await page.goto("/totally-nonexistent-route-xyz");
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 4: Run typecheck**

```bash
cd web && pnpm exec tsc --noEmit
```
Expected: clean, no errors.

- [ ] **Step 5: Run lint**

```bash
cd web && pnpm lint
```
Expected: clean. If warnings exist for unused imports in files we changed, fix them.

- [ ] **Step 6: Build production**

```bash
cd web && pnpm build
```
Expected: build succeeds; output lists all 16 routes (7 marketing + 1 hub + 6 industries + 2 legal). Fix any build errors before continuing.

- [ ] **Step 7: Run smoke tests against dev server**

In one terminal:
```bash
cd web && pnpm dev --port 3456
```
In another terminal:
```bash
cd web && PLAYWRIGHT_BASE_URL=http://localhost:3456 pnpm exec playwright test __tests__/routes.smoke.test.ts
```
(Or however the existing Playwright config is wired — check `web/playwright.config.ts` if `PLAYWRIGHT_BASE_URL` does not work.)

Expected: all 18 tests pass. Kill the dev server.

- [ ] **Step 8: Grep for residual brand strings**

From repo root:
```bash
git grep -n -i "aao group" -- ':!docs/' ':!*.md.bak' || echo "no AAO Group residue"
git grep -n "aaogroup.au" -- ':!docs/' || echo "no aaogroup.au residue"
```
Expected: both print the "no ... residue" message. If any matches appear in code files, fix them and re-stage.

- [ ] **Step 9: Grep for TODO(operator) markers**

```bash
git grep -n "TODO(operator)"
```
Expected output (illustrative — exact count may vary as code evolves):
- `web/lib/business.ts` — legalName, email, telephone, abn, sameAs
- `web/app/book-ai-audit/page.tsx` — data-booking-url

These are intentional placeholders for the operator to fill pre-launch. Confirm the list looks correct (no stray TODOs).

- [ ] **Step 10: Commit**

```bash
git add web/app/sitemap.ts web/app/robots.ts web/__tests__/routes.smoke.test.ts
git commit -m "$(cat <<'EOF'
feat(seo): sitemap, robots, smoke tests for new route hierarchy

- sitemap.ts: 16 routes (homepage, 5 services, audit, industries hub
  + 6 industry pages, 2 legal pages) with priorities and changefreq
- robots.ts: allow-all + sitemap pointer
- routes.smoke.test.ts: full Playwright coverage for every public route

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Final verification checklist

- [ ] `git log --oneline` shows expected commit sequence on `rebrand/operateai` branch
- [ ] `pnpm build` (in `web/`) succeeds
- [ ] `pnpm lint` clean
- [ ] `pnpm exec playwright test __tests__/routes.smoke.test.ts` — all routes pass
- [ ] `git grep -i "aao group"` returns nothing in code (docs/ ok)
- [ ] `git grep "TODO(operator)"` returns only the expected operator-fill markers
- [ ] Manual click-through in dev (http://localhost:3456): homepage, each service page, Perth, book-audit, industries hub, each industry page, both legal pages. Every CTA leads to `/book-ai-audit/`. Footer copy reflects OperateAI.
- [ ] Branch is **not** pushed and **not** merged to main. Confirm with user before any push.

---

## Self-review notes

**Spec coverage:** All 17 sections of the user's source content map to a task — positioning (§1) into Hero/footer (T7/T8); homepage copy (§2) into ProblemBand/SolutionBand/ServicesGrid/AudienceBand/UseCasesStrip/ProcessBand/ConversionBand (T8) + page.tsx (T9); service pages (§3-§6) into T10-T13; Perth (§7) into T14; industries (§8) into T16; offer structure (§9) into book-ai-audit (T15) — note: pricing-specific copy is folded into the service-page CTA bands rather than a separate /offers/ page since the spec hierarchy (§16) does not include one; FAQ copy (§10) into per-page FAQS arrays; CTAs (§11) into Button text across pages; GEO entity block (§12) into footer + LocalBusiness schema (T7/T14); schema notes (§13) into T3 builders + per-page usage; internal linking (§14) into `relatedLinks` arrays on each page; Codex prompt (§15) became this plan; hierarchy (§16) is T2/T10-T16; final recommendation (§17) into homepage hero + CTA.

**Placeholder scan:** All `TODO(operator):` markers are explicit and listed in T17 step 9. No vague TODOs.

**Type consistency:** `ServicePageLayoutProps`, `IndustryPageLayoutProps`, `FaqItem`, `BUSINESS`, and the schema builder option types are defined once and referenced consistently across pages.
