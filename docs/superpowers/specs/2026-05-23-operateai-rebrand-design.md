# OperateAI rebrand & restructure — design

**Date:** 2026-05-23
**Branch:** `rebrand/operateai`
**Status:** approved by user, ready for implementation planning

## 1. Goal

Rebrand the existing AAO Group marketing site (Next.js 16, App Router) to **OperateAI** with a new content strategy, URL hierarchy, and structured-data layer that aligns with the user-supplied 17-section content spec (helpful-content + local SEO + GEO/AI-search visibility).

Positioning: *AI agents, automation, hosting and training for Australian small and medium businesses. Built in Perth. Delivered online worldwide.*

Primary CTA: **Book an AI Business Audit**.
Homepage H1: **AI agents and automation for small businesses**.

## 2. Decisions (user-confirmed)

| Decision | Choice |
|---|---|
| Final brand name | **OperateAI** |
| Domain placeholder | `https://operateai.com.au` (swap pre-launch if different) |
| Existing pages | **Replace everything per new spec**, except `/legal/privacy` and `/legal/terms` (kept, rebranded only) |
| Insights blog | **Deleted** — 4 posts committed in `e3cfb23` will be removed |
| Uncommitted WIP (34 files) | **Discarded from clean HEAD** |
| Business contact details | **Placeholders** with `TODO(operator):` markers (phone, street address, ABN, social URLs) |
| Reviews/ratings in schema | **None** (no fake reviews per spec §13) |

## 3. Routing & file layout

Next.js App Router, `trailingSlash: true` in `next.config.ts` so canonical URLs match the spec.

```
web/app/
  layout.tsx
  page.tsx                               # homepage
  ai-integration-services/page.tsx
  ai-agents-for-business/page.tsx
  ai-agent-hosting/page.tsx
  ai-training-for-business/page.tsx
  perth-ai-consultant/page.tsx
  book-ai-audit/page.tsx
  industries/page.tsx
  industries/ai-for-accounting-firms/page.tsx
  industries/ai-for-real-estate-agencies/page.tsx
  industries/ai-for-trades-businesses/page.tsx
  industries/ai-for-health-clinics/page.tsx
  industries/ai-for-law-firms/page.tsx
  industries/ai-for-ecommerce-businesses/page.tsx
  legal/privacy/page.tsx                 # kept, rebrand text only
  legal/terms/page.tsx                   # kept, rebrand text only
  sitemap.ts
  robots.ts
  opengraph-image.tsx                    # rebranded "OperateAI"
```

**Deleted route trees:** `/about`, `/contact`, `/framework`, `/pricing`, `/services`, `/trust`, `/use-cases`, `/insights`, `/demo`, `/operator`, `/seo`.

## 4. Component plan

### Keep (rebrand text only)
- `site-header`, `site-footer`
- `cta-band`, `section`, `section-heading`, `button`, `reveal`

### Rewrite copy, keep layout
- `home/hero` — new H1, subhead, CTAs, trust line per spec §2 hero
- `home/problem-band` — new copy per spec §2 problem
- `home/offer-cards` → repurpose as `home/services-grid` (5 service cards linking to service pages)
- `home/use-cases-strip` — new bullets per spec §2 use-cases

### Delete (no equivalent in new spec)
- `home/framework-preview`, `home/governance-band`, `home/pricing-anchor`
- `framework/*` (layer-diagram, layer-section)
- `pricing/*` (pricing-faq, pricing-table)
- `services/offer-section`
- `use-cases/use-case-card`

### Create (new components)
- `home/solution-band` — spec §2 solution
- `home/audience-band` — non-technical vs technical, spec §2 audience
- `home/process-band` — 5-step Audit → Roadmap → Build → Train → Manage
- `home/conversion-band` — closing CTA per spec §2 conversion
- `service/service-page-layout` — shared slot-based layout for the 5 service pages: opening / who-it-is-for / what-is-included / use-cases / CTA / internal links
- `industry/industry-page-layout` — shared template for 6 industry pages
- `faq/faq-section` — reusable accordion, emits FAQPage JSON-LD when used

### Rewrite
- `structured-data.tsx` → accept schema objects as children, drop hardcoded brand strings

## 5. JSON-LD schema pattern

Single module `web/lib/schema.ts` exports typed builders:

```ts
buildOrganization()         // global, layout.tsx
buildWebsite()              // global, layout.tsx
buildLocalBusiness()        // homepage + /perth-ai-consultant only
buildService({ name, url, description })  // per service page
buildFAQPage(items)         // any page rendering visible FAQs
buildWebPage({ url, title, description })  // per page
```

A single `<JsonLd schema={...} />` component renders `<script type="application/ld+json">` with the JSON.stringified payload. Pages assemble the schemas they need and pass them in.

Placeholder values use the constant block:

```ts
// web/lib/business.ts
export const BUSINESS = {
  name: "OperateAI",
  legalName: "TODO(operator): legal entity name",
  url: "https://operateai.com.au",
  telephone: "TODO(operator): +61 ...",
  email: "TODO(operator): hello@operateai.com.au",
  abn: "TODO(operator): ABN",
  address: { // service-area mode: locality only, no street
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: ["Perth", "Western Australia", "Australia", "Worldwide (online)"],
  sameAs: [
    "TODO(operator): https://www.linkedin.com/company/...",
    "TODO(operator): https://x.com/...",
  ],
};
```

LocalBusiness uses `@type: "ProfessionalService"` (consultancy is a service business) with `areaServed` listing Perth/WA/AU/Worldwide and no `streetAddress`.

## 6. Internal linking (per spec §14)

| From | Links to |
|---|---|
| Homepage | all 5 service pages, /perth-ai-consultant/, /book-ai-audit/ |
| /ai-integration-services/ | /ai-agents-for-business/, /ai-agent-hosting/, /ai-training-for-business/, /book-ai-audit/ |
| /ai-agents-for-business/ | /ai-agent-hosting/, /ai-integration-services/, /book-ai-audit/ |
| /ai-agent-hosting/ | /ai-agents-for-business/, /ai-integration-services/, /book-ai-audit/ |
| /ai-training-for-business/ | /ai-integration-services/, /ai-agents-for-business/, /book-ai-audit/ |
| /perth-ai-consultant/ | /ai-integration-services/, /ai-agents-for-business/, /ai-training-for-business/, /book-ai-audit/ |
| /industries/<slug>/ | corresponding 2-3 most-relevant service pages, /book-ai-audit/ |

Header nav: Services dropdown (5 service pages), Industries, Perth, Book Audit.
Footer: full sitemap.

## 7. Booking page

`/book-ai-audit/` — landing page with:
- H1 + spec §9 entry-offer copy
- Deliverables list
- A `data-booking-url` placeholder div (no real embed) plus a "Book a call" button. Operator wires Cal.com / Calendly later by replacing the placeholder.
- FAQPage schema reused.

## 8. Tone & copy rules (per spec §15)

- Clear, commercial, practical, non-hype.
- Avoid "AI replaces staff" framing.
- Emphasise operational value, time savings, consistency, managed support, safe adoption.
- Australian English spelling (per existing site locale `en-AU`).
- No exaggerated claims.

## 9. SEO targets (per spec)

Primary keywords distributed across pages:
- AI agents for business, AI agents for small business → homepage, /ai-agents-for-business/
- AI integration services → /ai-integration-services/
- AI agent hosting, managed AI agents → /ai-agent-hosting/
- AI training for business → /ai-training-for-business/
- AI consultant Perth, AI agents Perth, AI training Perth → /perth-ai-consultant/
- AI for [industry] businesses → /industries/<slug>/

## 10. Commit sequence

1. `chore: discard WIP, branch rebrand/operateai`
2. `chore: prune retired routes` (delete /about /contact /framework /pricing /services /trust /use-cases /insights /demo /operator /seo + their components)
3. `feat(brand): swap AAO Group → OperateAI` (layout metadata, header, footer, structured-data shell, README, package name, next.config trailingSlash, opengraph-image)
4. `feat(home): rebuild homepage per spec §2`
5. `feat(services): 5 service pages + ServicePageLayout + /book-ai-audit/`
6. `feat(local): Perth landing page + LocalBusiness schema`
7. `feat(industries): industry hub + 6 industry pages`
8. `feat(seo): JSON-LD builders + per-page schema`
9. `feat(seo): sitemap, robots, internal linking pass`
10. `test: smoke routes + build verify`

Branch stays local. No push, no PR, no merge to main without explicit user approval.

## 11. Verification

- `pnpm build` succeeds (Next 16 static export where possible)
- `pnpm lint` clean
- `web/__tests__/routes.smoke.test.ts` updated to new route list, passes
- `pnpm dev --port 3456` starts; manual click-through of all new routes
- All `TODO(operator):` markers greppable in one pass

## 12. Out of scope

- Real Cal.com/Calendly booking integration (placeholder only)
- Final brand assets (logo SVG remains existing wordmark, swapped text)
- Performance/Lighthouse optimization beyond current baseline
- Multi-language / i18n
- Cookie banner / consent UI
- Industry-specific case studies or testimonials (none provided, none invented)
- Live deployment / DNS / domain purchase

## 13. Risks

- **Trailing slash flip** may produce 308 redirects from any old indexed `/about` etc. URLs. Acceptable — those pages are being removed deliberately.
- **OG image** is a React-rendered route, not a static PNG — will rebuild on first request post-deploy.
- **Loss of insights content** — 4 blog posts deleted, user confirmed.
- **Placeholders** must be filled before public launch; pre-launch grep for `TODO(operator):` is mandatory.
