# @aao/check-cli

Operator accelerator for the **Free AI Check** SOP. Gathers AI engine signals, Google Business Profile data, and website quality indicators for a local business, then drafts a one-page report using Claude. The operator reviews and sends — this tool never sends.

## Install

```bash
cd tools/check-cli
pnpm install
```

## Environment keys

All keys are optional. Missing keys are handled gracefully — the relevant source is skipped and the report notes what couldn't be checked automatically.

| Key | Source | Notes |
|-----|--------|-------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | Required for the Claude report draft. Without it, raw gathered data is written instead. |
| `PERPLEXITY_API_KEY` | [perplexity.ai/settings/api](https://perplexity.ai/settings/api) | Sonar model — searches the web and returns citations. |
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | GPT-4.1 with web search. Requires Responses API access. |
| `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Gemini 2.0 Flash with Google Search grounding. |
| `GOOGLE_MAPS_API_KEY` | [console.cloud.google.com](https://console.cloud.google.com) | Used for both Places API (New) and PageSpeed Insights. Enable both APIs in the same project. |

Export keys before running:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export PERPLEXITY_API_KEY=pplx-...
export OPENAI_API_KEY=sk-...
export GEMINI_API_KEY=AI...
export GOOGLE_MAPS_API_KEY=AIza...
```

## Usage

### Run a check

```bash
tsx cli.ts run \
  --business "Coastal Plumbing" \
  --suburb "Subiaco" \
  --trade "plumber" \
  --url "https://coastalplumbing.com.au" \
  --phone "08 9000 0000" \
  --output-dir ./checks
```

With all optional flags:

```bash
tsx cli.ts run \
  --business "Coastal Plumbing" \
  --suburb "Subiaco" \
  --trade "plumber" \
  --url "https://coastalplumbing.com.au" \
  --phone "08 9000 0000" \
  --urgent-job "burst pipe" \
  --specific-job "hot water system install" \
  --output-dir ./checks
```

### Dry run (no API calls)

```bash
tsx cli.ts run \
  --business "Coastal Plumbing" \
  --suburb "Subiaco" \
  --trade "plumber" \
  --dry-run
```

Prints key status (present/absent, never values) and the prompts that would be sent. Makes zero network calls.

### npm scripts

```bash
pnpm run check    # runs tsx cli.ts
pnpm run dry-run  # runs with --dry-run (no business/suburb/trade args by default)
```

## Output files

All outputs go into `--output-dir` (default `./checks/`):

| File | Description |
|------|-------------|
| `<slug>-<YYYY-MM-DD>.md` | Claude-drafted one-page report. Review before sending. |
| `<slug>-<YYYY-MM-DD>-raw.md` | Fallback when `ANTHROPIC_API_KEY` is absent — raw gathered data + triage. |
| `checks-log.csv` | Running log of all checks. Operator fills `sent`, `replied`, `converted`, `amount` columns. |

## Cost estimate

A full check (all keys present) costs roughly **$0.10–0.40 USD** depending on how many AI engines respond and report length. The Claude Opus 4.8 report draft is the primary cost driver (~$0.08–0.35). AI engine calls (Perplexity, OpenAI, Gemini) add a few cents each.

## Important: review before sending

The draft is a **snapshot**. AI visibility results shift week to week. The report is for operator review and personalisation before it goes to the prospect.

## Manual checks still matter

The consumer **ChatGPT web app** and **Google AI Overviews** are not accessible via standard API. Do 1–2 manual incognito spot-checks:

1. Open ChatGPT (chat.openai.com) in an incognito window.
2. Search: `best [trade] in [suburb]` — note if the business appears.
3. Do the same in Google with AI Overviews enabled.

These are the results the prospect's customers actually see.
