# OperateAI — Marketing Site

Production marketing site for **OperateAI** at [operateai.com.au](https://www.operateai.com.au): the brand, the free **AI Visibility Check** funnel, and durable lead capture.

Audience: **Perth local service businesses** (trades, clinics, salons, hospitality, real estate, ecommerce/brands). Voice: blunt, plain-English, en-AU. Company "we" on marketing pages; the `/about` page stays in the founder's first person.

## Stack

- **Next.js 16** (App Router, `trailingSlash: true`) · React 19 · TypeScript (strict) · Tailwind v4
- **Hanken Grotesk** (display/body) + **JetBrains Mono** (eyebrows/labels), via `next/font/google`
- **MDX** (`@next/mdx`) for articles, with `remark-frontmatter` stripping the YAML block
- **Neon Postgres** (lead storage) + **Resend** (operator email + marketing audience)
- **Playwright** smoke + funnel tests
- **Vercel** deploy (region `syd1`); `main` → production

> This is Next.js 16 / React 19 / Tailwind v4 — read `node_modules/next/dist/docs/` (see `AGENTS.md`) before assuming older patterns. Tailwind v4 gotcha: arbitrary font-size needs `text-[length:var(--x)]` — bare `text-[var(--x)]` is treated as a colour.

## Routes

```
/                                  Home (hero + 8 sections + FAQ)
/check/                            The free AI Visibility Check form
/how-it-works/                     How AI picks, and what we fix
/about/                            Founder page (first-person)
/articles/                         Article index
/articles/[slug]/                  Article (MDX) with reading chrome
/contact/                          Contact form
/legal/privacy/  /legal/terms/     AU legal
icon · opengraph-image · robots.txt · sitemap.xml   (generated)
```

## Project layout

```
web/
├── app/
│   ├── page.tsx                       # Home (renders components/home/* + FAQ + JSON-LD)
│   ├── check/page.tsx                 # AI Visibility Check page
│   ├── how-it-works/ about/ contact/  # + articles/, legal/privacy, legal/terms
│   ├── articles/[slug]/page.tsx       # MDX article renderer (LOADERS map + reading chrome)
│   ├── api/enquiry/route.ts           # Lead intake: store (Neon) + email (Resend) + audience
│   ├── api/check/route.ts             # Optional server-side auto-draft (gated by AUTO_CHECK)
│   ├── layout.tsx tokens.css globals.css
│   ├── icon.tsx opengraph-image.tsx robots.ts sitemap.ts not-found.tsx
├── components/
│   ├── home/                          # hero, the-shift, why-tradies, check-cta, how-it-works-grid,
│   │                                  #   credibility, forward, latest-articles, final-cta
│   ├── ai-readout.tsx                 # The signature "AI answer" card motif
│   ├── check/check-form.tsx           # The check form (posts to /api/enquiry then /api/check)
│   ├── contact/contact-form.tsx
│   ├── mock/examples.tsx              # GBP card, phone answer, reviews, missed-call mockups
│   ├── ui/                            # section, mono-label, check-button, photo
│   ├── site-header.tsx site-footer.tsx logo.tsx
│   ├── article/reading-chrome.tsx faq.tsx json-ld.tsx structured-data.tsx scroll-reveal.tsx
├── lib/
│   ├── business.ts                    # SINGLE SOURCE OF TRUTH for brand + contact data
│   ├── schema.ts                      # JSON-LD builders
│   ├── email.ts                       # Resend: enquiry email, draft email, audience contact
│   ├── leads.ts                       # Neon Postgres lead capture
│   ├── articles.ts nav.ts cn.ts
│   └── check/                         # The Free AI Check pipeline (see below)
├── content/articles/*.mdx             # Published articles
├── public/                            # Static assets (photos, TMAbout.png)
└── __tests__/                         # routes.smoke + funnel Playwright specs
```

## The Free AI Check pipeline (`lib/check/`)

`run.ts` orchestrates **gather → triage → report**:

- **gather/** (in parallel): `perplexity`, `openai`, `gemini`, `places` (Google Places), `website` (content scan), `pagespeed`.
- **triage.ts** scores each dimension Red/Amber/Green.
- **report.ts** sends the gathered data to Claude (`claude-opus-4-8`) which returns structured JSON; `report-html.ts` renders it into a premium HTML report (+ plain text).

It runs two ways:

- **Server-side auto-draft** — `/api/check` runs the pipeline and emails the operator a draft. Off by default; enable with `AUTO_CHECK=1` and the gatherer keys. `maxDuration = 60`, prompts run in parallel to fit.
- **Operator CLI** — `tools/check-cli/` mirrors this pipeline for terminal runs. Editing one should be mirrored in the other.

## Lead capture

`/api/enquiry` handles every check + contact submission (after a honeypot check):

1. `captureLead()` → inserts into the Neon `leads` table (auto-created on first write). Never throws.
2. `sendEnquiryEmail()` → emails the operator (Resend).
3. `addContactToAudience()` → adds the email to a Resend Audience (marketing list).

Each step no-ops when its env var is unset. Field name note: the form's real website field is `url`; `website` is the bot honeypot.

## Commands

```bash
pnpm install
pnpm dev --port 3456          # dev server (any free port)
pnpm build && pnpm start      # production build / serve
pnpm lint                     # ESLint (also runs on every edit via a PostToolUse hook)
pnpm exec playwright test     # smoke + funnel suite (auto-starts a server on port 3100)
```

## Environment variables

Copy `.env.example` → `.env.local` (and set the same vars in Vercel). The site runs with **none** set — every integration no-ops and forms log a stub.

| Var | Purpose |
|---|---|
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` | Operator enquiry email |
| `RESEND_AUDIENCE_ID` | Add submitters to a Resend Audience (marketing list) |
| `DATABASE_URL` | Neon Postgres connection string (lead storage) |
| `AUTO_CHECK` + `ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_MAPS_API_KEY` | Enable + power the server-side auto-draft check |

Vercel applies new env vars only to deployments built **after** the var is added — redeploy after changing them.

## SEO & structured data

- Per-page `title` / `description` / canonical; generated `robots.txt`, `sitemap.xml`, OG image and favicon.
- JSON-LD: global `Organization` + `WebSite` + `LocalBusiness` (`ProfessionalService`, service-area only) via `<StructuredData />`; plus `WebPage`, `Article`, `BreadcrumbList`, and `FAQPage` where relevant.
- `lib/business.ts` is the single source of truth; optional phone/social are omitted from schema until supplied.
- Lighthouse: desktop **100/100/100/100**; mobile Accessibility/Best-Practices/SEO **100**, Performance 91–97 (hero LCP is bound by simulated-4G throttling).

## Design

Tokens are locked in `app/tokens.css`. Dark charcoal (`--color-void` `#0a0a0a`) and warm paper (`#f3f3f0`) sections alternate; the accent is lime **"Signal" `#f3fc85`**. Hanken Grotesk + JetBrains Mono. Editorial rhythm, grain overlay, the `.hl` lime highlighter, and a focus-visible ring. Respects `prefers-reduced-motion`.

## Deploy

Vercel project, region `syd1`. Push to `main` → production; PRs get preview deploys.
