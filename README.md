# OperateAI

> Get your local business found, recommended and booked by AI.

OperateAI helps **Perth local service businesses** show up when customers ask AI for a recommendation ("who's a good plumber / dentist / physio / [x] near me?") instead of scrolling Google. AI assistants now name two or three businesses and hand over the decision — there is no page two. We get a business onto that shortlist, and ready for the day AI starts booking the work.

The wedge is a free **AI Visibility Check**: a business sends its name + suburb (and website, optionally), and gets back a plain-English rundown of what ChatGPT and Google's AI actually say about them, plus the one thing costing them customers. Paid work is done-for-you "AI-findable" setup: a machine-perfect Google Business Profile, plain-text/AI-readable services and pricing, a reviews engine, and fast response.

Live at **[operateai.com.au](https://www.operateai.com.au)**.

## The funnel

```
ad / Reddit / article
        |
        v
free AI Visibility Check  (/check)
        |
        v
human-reviewed rundown   (emailed to the operator + stored as a lead)
        |
        v
done-for-you AI-findable setup
```

## Repo layout

```
.
├── web/                  # Next.js 16 marketing site + Free AI Check + lead capture (Vercel, syd1)
├── tools/check-cli/      # Operator CLI: the AI Visibility Check pipeline, run from the terminal
├── tools/audit-cli/      # Earlier AAO "AI Operations Audit" pipeline (separate product, legacy)
├── docs/
│   ├── strategy/future-services-roadmap.md   # Current expansion roadmap (research-backed)
│   └── superpowers/                          # Dated design specs + implementation plans (historical)
├── sales-assets/         # Ad & social content, capability statement, etc.
├── legal-scaffolds/      # MSA, SOW, DPS drafts (counsel review pending)
├── clients/              # Per-client workspaces (template at _template/)
├── australian_smb_ai_ops_prd.md   # Earlier/broader strategy (legacy context)
├── OPERATOR_PLAYBOOK.md           # Earlier operating motion (legacy context)
└── vercel.json
```

Two surfaces contain real code: **`web/`** and **`tools/check-cli/`** (plus the legacy `tools/audit-cli/`). Everything else is Markdown/JSON assets.

## Quick start

```bash
cd web
pnpm install
pnpm dev --port 3456      # http://localhost:3456
```

See **[`web/README.md`](web/README.md)** for the full site guide, and **[`tools/check-cli/README.md`](tools/check-cli/README.md)** for the CLI.

## How a lead is handled

Every Free AI Check / contact submission posts to `web/app/api/enquiry/route.ts`, which:

1. **Stores** the lead in **Neon Postgres** (`leads` table) — `web/lib/leads.ts`.
2. **Emails** the operator the enquiry — `web/lib/email.ts` (Resend).
3. **Adds** the email to a **Resend Audience** (marketing list) — `web/lib/email.ts`.

Every integration **no-ops gracefully when its env var is unset**, so the site runs end-to-end with nothing configured (submissions log a stub). Optionally, `AUTO_CHECK=1` runs the full check pipeline server-side and emails the operator a draft report. See `web/.env.example`.

## Stack snapshot

- **Site:** Next.js 16 (App Router, `trailingSlash`), React 19, TypeScript (strict), Tailwind v4, MDX, deployed to Vercel (`syd1`).
- **Free AI Check:** gathers signals from Perplexity, OpenAI, Google (Gemini), Google Places, a website scan and PageSpeed, triages them, and writes the report with Claude (`claude-opus-4-8`).
- **Data:** Neon Postgres (leads) + Resend (email + audience).

## Status

Marketing site shipped and live (Free AI Check funnel, lead capture). Desktop Lighthouse 100/100/100/100; mobile Accessibility/Best-Practices/SEO 100.

Outstanding ops:

- [ ] Set `DATABASE_URL` (Neon) and `RESEND_AUDIENCE_ID` in Vercel for production lead capture + list
- [ ] Counsel review of `legal-scaffolds/`
- [ ] Rotate any API credentials that have been shared in plain text

## Contact

team@operateai.com.au · Perth, Western Australia
