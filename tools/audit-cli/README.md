# @aao/audit-cli

A small Node CLI that automates the AAO Operations Audit pipeline. It loads the relevant `aao-*` Claude Code Skills as system context, calls Claude (**Opus 4.8**) to run the eight-stage orchestrator, then calls Claude (**Sonnet 4.6**) a second time to render the final Markdown report. The orchestrator does the heavy analytical reasoning so it runs on Opus; the renderer only reshapes the resulting JSON into Markdown so it stays on the cheaper Sonnet. Replaces the manual "open Claude Code, invoke `aao-audit-pipeline`, then `aao-audit-report-renderer`" flow with a single command.

## Install

```bash
cd tools/audit-cli
pnpm install
```

The CLI runs directly via `tsx` — no build step.

## Configure

Set your Anthropic API key in the environment:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

The CLI also reads `~/.claude/skills/aao-*/SKILL.md` for prompt content. Those skill files must be present on the same machine.

## Usage

Run the full pipeline (orchestrator + renderer) end-to-end:

```bash
pnpm --filter @aao/audit-cli run audit run \
  --client coastal-concrete \
  --input ./clients/coastal-concrete/01-audit/audit-pipeline-input.json \
  --output-dir ./clients/coastal-concrete/01-audit/
```

Re-render the Markdown after editing the JSON output by hand:

```bash
pnpm --filter @aao/audit-cli run audit render \
  --input ./clients/coastal-concrete/01-audit/audit-pipeline-output.json \
  --output ./clients/coastal-concrete/01-audit/audit-deliverable.md
```

Validate an input JSON without making any API calls (no key required):

```bash
pnpm --filter @aao/audit-cli run audit dry-run \
  --input ./clients/coastal-concrete/01-audit/audit-pipeline-input.json
```

## Cost per audit

Rough estimate, depends on input size and model output verbosity. The orchestrator runs on Opus (~5× Sonnet token pricing), the renderer on Sonnet:

- Orchestrator pass (Opus 4.8): ~$2.00–$7.50 USD
- Renderer pass (Sonnet 4.6): ~$0.10–$0.40 USD (cache hit on the skill specs reduces this materially)
- **Typical audit run: $2.00–$8.00 USD**

The CLI prints token counts and a per-call cost estimate to stdout after each call, plus a summary at the end.

## How prompt caching works

Both API calls use a system prompt that contains every relevant `aao-*` SKILL.md inlined as one large block. That block is marked with `cache_control: { type: "ephemeral" }`. The second call (renderer) reuses the orchestrator's cache prefix where the prefixes overlap, and within a single audit run subsequent invocations of the same command also benefit. Cache reads cost a tenth of regular input tokens, so the second call is much cheaper than the first.

## Relationship to the AAO Skills

The CLI is a thin wrapper around the existing skills — it does not duplicate or replace any analysis logic. Specifically:

- **Orchestrator pass** loads `aao-audit-pipeline` plus the eight analytical skills it sequences (`aao-client-intake-analyst`, `aao-workflow-discovery-analyst`, `aao-data-sensitivity-classifier`, `aao-integration-planner`, `aao-ai-opportunity-scorer`, `aao-approval-policy-designer`, `aao-guardrail-spec-writer`, `aao-pilot-proposal-writer`).
- **Renderer pass** loads `aao-audit-report-renderer`.

If a skill is updated in `~/.claude/skills/aao-*/SKILL.md`, the CLI picks up the change on the next invocation with no code change here.

## Output files

A successful `audit run` writes two files into the supplied `--output-dir`:

- `audit-pipeline-output.json` — the structured orchestrator output (the same shape the `aao-audit-pipeline` skill produces by hand).
- `audit-deliverable.md` — the operator-reviewable Markdown report.

Both outputs are drafts. They must be reviewed by the operator before being sent to the client.

## What the CLI does not do

- It does not call any client systems.
- It does not send anything to the client.
- It does not interleave operator-review checkpoints between stages — the orchestrator runs all eight stages in a single API call. If you need stage-by-stage review, run the skills individually inside Claude Code instead.
- It does not store API responses anywhere except the local output files.
