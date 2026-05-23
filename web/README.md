# OperateAI — Marketing Site

Production marketing site for **OperateAI** at [operateai.com.au](https://operateai.com.au).

## Stack

- **Next.js 16** (App Router) · TypeScript (strict) · Tailwind v4
- **MDX** for editorial content (Insights, legal placeholders)
- **Playwright** smoke tests (route rendering + console errors)
- **Vercel** deploy target (Sydney region)

## Project layout

```
web/
├── app/                       # App Router routes
│   ├── about/                 # Founder narrative + operating principles
│   ├── contact/               # Calendly embed + enquiry server action
│   ├── framework/             # Sovereign AI Operations Framework (5 layers)
│   ├── insights/              # Insights index + dynamic [slug]
│   ├── legal/                 # Privacy + Terms placeholders
│   ├── pricing/               # Three-column pricing + FAQ
│   ├── services/              # Audit / Pilot / Subscription
│   ├── trust/                 # Trust & Security
│   ├── use-cases/             # Index + 5 vertical detail pages
│   ├── globals.css            # Base layer
│   ├── tokens.css             # Locked design tokens
│   ├── layout.tsx             # Root layout, fonts, metadata
│   ├── opengraph-image.tsx    # Generated OG image
│   ├── icon.tsx               # Generated favicon
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Home
├── components/                # All reusable components, grouped by domain
├── content/insights/          # MDX posts
├── lib/                       # cn, nav, use-cases, insights, email
├── public/                    # Static assets
└── __tests__/                 # Playwright smoke tests
```

## Develop

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Build

```bash
pnpm build
pnpm start
```

## Test

```bash
pnpm dlx playwright test
```

Smoke suite only — covers route rendering and console-error checks. Visual quality is reviewed manually.

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/operateai
RESEND_API_KEY=
PLAUSIBLE_DOMAIN=operateai.com.au
```

The site runs without these set — absent integrations no-op gracefully:

- **Calendly:** if `NEXT_PUBLIC_CALENDLY_URL` is unset, the embed uses the placeholder URL.
- **Resend:** if `RESEND_API_KEY` is unset, enquiry form submissions log to the server console instead of sending email.
- **Plausible:** not yet wired; reserved for future analytics.

## Deploy

Vercel project, region `syd1`. `main` deploys to production; preview deploys per PR.

```bash
vercel --prod
```

## Content

Insights posts live in `content/insights/*.mdx`. Add a new post:

1. Drop a `.mdx` file with frontmatter (`title`, `description`, `date`, `readingMinutes`).
2. Index regenerates on next build.

Legal pages (`app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`) are placeholder copy pending counsel review before public launch.

## Design discipline

Pure monochrome. Tokens locked in `app/tokens.css`. The accent token `--color-signal` (#B8704A) is reserved exclusively for status pills inside product screenshots — it is **not** decorative. Adding a new colour requires updating the design spec at `../docs/superpowers/specs/2026-04-25-aao-group-website-design.md` §2.2 first.

The voice is editorial and plain-English. The following words are not permitted in marketing copy: *transform, unleash, revolutionary, AI-powered, leverage, passionate, robust, cutting-edge, seamless*.

Spelling: en-AU.

## Architecture context

The site reflects the v1 architecture amended on 2026-04-25:

```
Integration → Workflow → Guarded LLM → Approval Queue → Audit
```

Models run via Amazon Bedrock (ap-southeast-2 / Sydney) or Azure (Australia East) where the chosen model is supported. NemoClaw / OpenShell are not part of v1 — they appear only as a sidebar callout on the Framework page.

The approval queue is the product. Everything else supports it.
