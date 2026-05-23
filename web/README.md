# OperateAI — Marketing Site

Production marketing site for **OperateAI** at [operateai.com.au](https://operateai.com.au).

## Stack

- **Next.js 16** (App Router, `trailingSlash: true`) · TypeScript (strict) · Tailwind v4
- **Plus Jakarta Sans** via `next/font/google`
- **MDX** for editorial content (legal placeholders, insights archive)
- **Playwright** smoke tests (route rendering + console errors)
- **Vercel** deploy target (Sydney region)

## Project layout

```
web/
├── app/                                       # App Router routes
│   ├── ai-integration-services/page.tsx
│   ├── ai-agents-for-business/page.tsx
│   ├── ai-agent-hosting/page.tsx
│   ├── ai-training-for-business/page.tsx
│   ├── perth-ai-consultant/page.tsx
│   ├── book-ai-audit/page.tsx
│   ├── industries/page.tsx                    # Industries hub
│   ├── industries/ai-for-*/page.tsx           # 6 industry landing pages
│   ├── legal/privacy/page.tsx
│   ├── legal/terms/page.tsx
│   ├── globals.css                            # Base layer
│   ├── tokens.css                             # Locked design tokens
│   ├── layout.tsx                             # Root layout, fonts, metadata
│   ├── opengraph-image.tsx                    # Generated OG image
│   ├── icon.tsx                               # Generated favicon
│   ├── not-found.tsx                          # 404 page
│   ├── robots.ts
│   ├── sitemap.ts
│   └── page.tsx                               # Home
├── components/
│   ├── home/                                  # 8 homepage sections
│   ├── service/service-page-layout.tsx        # Shared service-page chassis
│   ├── industry/industry-page-layout.tsx      # Shared industry-page chassis
│   ├── faq/faq-section.tsx                    # Reusable FAQ + FAQPage JSON-LD
│   ├── json-ld.tsx
│   ├── structured-data.tsx                    # Global Organization + WebSite
│   └── …                                      # button, cta-band, section, etc.
├── content/insights/                          # MDX archive (no route)
├── lib/business.ts                            # BUSINESS constants + placeholders
├── lib/schema.ts                              # JSON-LD builders
├── lib/cn.ts, lib/nav.ts
├── public/                                    # Static assets
└── __tests__/routes.smoke.test.ts             # Playwright smoke tests
```

## Develop

```bash
pnpm install
pnpm dev --port 3456
```

Open <http://localhost:3456>.

## Build

```bash
pnpm build
pnpm start
```

## Test

```bash
pnpm dlx playwright test
```

Smoke suite covers every public route + a no-console-errors check on the homepage + a 404 check.

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/operateai
RESEND_API_KEY=
PLAUSIBLE_DOMAIN=operateai.com.au
```

The site runs without these set — integrations no-op gracefully.

## Deploy

Vercel project, region `syd1`. `main` deploys to production; preview deploys per PR.

## SEO & structured data

- Global `Organization` + `WebSite` JSON-LD emitted from `app/layout.tsx` via `<StructuredData />`.
- Homepage and `/perth-ai-consultant/` also emit `LocalBusiness` (`@type: "ProfessionalService"`, service-area only, no street address).
- Service pages emit `Service` + `WebPage` + `FAQPage` JSON-LD via `ServicePageLayout`.
- Industry pages emit `WebPage` JSON-LD via `IndustryPageLayout`.

Single source of truth for brand + contact data is `lib/business.ts`. Pre-launch checklist: grep for `TODO(operator):` and fill in the remaining placeholders (email, telephone, social URLs).

## Design discipline

Pure monochrome. Tokens locked in `app/tokens.css`. The accent token `--color-signal` (#B8704A) is reserved exclusively for status pills — it is **not** decorative.

Voice: editorial and plain-English. Spelling: en-AU.
