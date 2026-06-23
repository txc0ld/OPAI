# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# OperateAI repo guide

This repo is the whole operating system for OperateAI (rebranded from AAO Group). The current product is **AI search visibility for Perth local service businesses**: a free **AI Visibility Check** (the wedge) plus done-for-you AI-findable setup. The marketing site, two operator CLIs, the legacy AAO audit pipeline, and sales/legal/client scaffolds all live here. Three surfaces contain actual code — `web/`, `tools/check-cli/`, and `tools/audit-cli/`; everything else is Markdown/JSON assets.

## Stack & version drift

The marketing site (`web/`) runs **Next.js 16, React 19, Tailwind v4** — all <6 months old. Most bugs here are version-drift bugs, not logic bugs.

**Before touching `web/`:** read the relevant guide in `web/node_modules/next/dist/docs/` (per `web/CLAUDE.md` → `web/AGENTS.md`). If the `context7` MCP server is connected, use it for live React 19 / Tailwind v4 / Next 16 docs. Do not cite Next 14/15 patterns from training data.

Valid Claude model IDs (audit CLI under `tools/audit-cli/`): `claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001`. Anything else is retired or hallucinated. The CLI runs the orchestrator pass on `claude-opus-4-8` and the renderer pass on `claude-sonnet-4-6` (see `cli.ts` → `ORCHESTRATOR_MODEL` / `RENDERER_MODEL`). Default to Opus 4.8; drop to Sonnet only where the work is mechanical and quality won't suffer.

## Commands

Package manager is **pnpm** (`pnpm@10.28.2`) in both code surfaces. Run web commands from `web/`, CLI commands from `tools/audit-cli/`.

**web/** (`cd web` first):
- `pnpm install`
- `pnpm dev --port 3456` — dev server (any free port; tests use 3100)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (also runs automatically on every edit via the `lint-on-edit` PostToolUse hook)
- `pnpm exec playwright test` — full smoke suite. The Playwright config auto-starts a dev server on **port 3100** (`reuseExistingServer: true`), so no manual server needed.
- `pnpm exec playwright test routes.smoke` — run one spec file
- `pnpm exec playwright test -g "404 page"` — run a single test by title

**tools/audit-cli/** (`cd tools/audit-cli` first; runs via `tsx`, no build step):
- `pnpm install`; requires `ANTHROPIC_API_KEY` in env (never hardcode, never log)
- `pnpm run audit dry-run --input <input.json>` — validate input + skill presence, **no API calls / no key needed**
- `pnpm run audit run --input <input.json> --output-dir <dir> --client <slug>` — full pipeline
- `pnpm run audit render --input <output.json> --output <report.md>` — re-render Markdown from edited JSON

**tools/check-cli/** (`cd tools/check-cli` first; runs via `tsx`): operator mirror of the web Free AI Check pipeline. Reads API keys from a gitignored `.env`. See `tools/check-cli/README.md` for commands. Keep its `src/report.ts` / `src/report-html.ts` in sync with `web/lib/check/`.

Pre-merge / pre-deploy check: run `/route-smoke-check` before pushing anything that touches `web/` (Playwright + tsc + route coverage diff).

## Architecture

**`web/` — marketing site + Free AI Check.** App Router, `trailingSlash: true`, TypeScript strict, Tailwind v4 (fonts: Hanken Grotesk + JetBrains Mono). Pages are thin; the home page composes section components in `components/home/*`, and the signature motif is `components/ai-readout.tsx`. The funnel is the free **AI Visibility Check** at `/check/`. `lib/business.ts` is the **single source of truth** for brand/contact data — flows into metadata, JSON-LD (`lib/schema.ts`), and UI; optional fields (phone, social) are deliberately `undefined` and omitted from schema until supplied. Design tokens are locked in `app/tokens.css` — dark charcoal and warm paper sections alternate, accent is lime **Signal `#f3fc85`**. Voice: blunt, plain-English, en-AU; company "we" on marketing pages, first-person on `/about`. Articles are MDX in `content/articles/` (rendered via the `LOADERS` map in `app/articles/[slug]/page.tsx`).

**Lead intake + the check pipeline.** Both forms post to `app/api/enquiry/route.ts`, which stores the lead in Neon Postgres (`lib/leads.ts`), emails the operator (`lib/email.ts` → Resend), and adds the email to a Resend Audience. `app/api/check/route.ts` optionally runs the full **gather → triage → report** pipeline in `lib/check/*` (Perplexity, OpenAI, Gemini, Google Places, website scan, PageSpeed → Claude `claude-opus-4-8`), gated by `AUTO_CHECK=1`. Every integration no-ops gracefully when its env var is unset. All env vars are documented in `web/.env.example` (`RESEND_*`, `RESEND_AUDIENCE_ID`, `DATABASE_URL`, `AUTO_CHECK` + gatherer keys).

**`tools/audit-cli/` — the AAO audit pipeline.** A thin two-pass wrapper around the global `aao-*` skills, not a reimplementation. It reads `~/.claude/skills/aao-*/SKILL.md` at runtime and inlines them as a cached (`cache_control: ephemeral`) system block. Pass 1 (orchestrator) loads `aao-audit-pipeline` + the 8 analytical skills and returns structured JSON; pass 2 (renderer) loads `aao-audit-report-renderer` and turns that JSON into a Markdown deliverable. Editing a `SKILL.md` changes behaviour with no code change here. All outputs are **drafts for operator review** — the CLI never calls or sends to client systems.

## Specialised reviewers

- `nextjs16-reviewer` — invoke after edits under `web/` to catch version-drift bugs
- `audit-cli-reviewer` — invoke after edits under `tools/audit-cli/` or anything calling `@anthropic-ai/sdk`

## Path rules

- `web/.env.local` and `web/.vercel/` are blocked by `.claude/settings.json` — do not attempt to edit.

## Workspace layout

```
web/                  # Next.js 16 marketing site + Free AI Check + lead capture (Vercel syd1)
tools/check-cli/      # Operator CLI: the AI Visibility Check pipeline (terminal runs)
tools/audit-cli/      # Earlier AAO audit pipeline (separate product, legacy)
clients/              # Per-client workspaces (template at _template/)
legal-scaffolds/      # MSA, SOW, DPS drafts (counsel review pending)
sales-assets/         # Ad & social content, capability statement, etc.
docs/strategy/        # Current expansion roadmap (docs/superpowers/ = dated specs/plans, historical)
australian_smb_ai_ops_prd.md   # Earlier/broader strategy (legacy context)
OPERATOR_PLAYBOOK.md           # Earlier operating motion (legacy context)
```

The 12 AAO skills live globally at `~/.claude/skills/aao-*` and are listed in the session's available skills.
