# OperateAI Agents — Design Spec

**Date:** 2026-06-23
**Status:** Approved (brainstorming) — ready for implementation planning
**Owner:** Tay / OperateAI
**Source PRD:** `operateai-agents-PRD.md` (Draft v1, build-ready)
**Branch:** `feat/operateai-agents`

> The next stage after the free AI Visibility Check: provision, host, and operate
> always-on AI agents for Perth local-service clients on Orgo, managed from inside
> the OperateAI monorepo.

---

## 1. Goal & scope

Build the **entire code layer** for OperateAI Agents — PRD Phases 0–3 (A–F) — to
enterprise quality, following the repo's established conventions (typed lib clients
that no-op without their env var, Neon for state, Resend for email, operator CLIs
mirroring `check-cli`/`audit-cli`, design tokens locked in `tokens.css`,
skills-as-behaviour).

**In scope (built complete in this effort):**

- **A. Core** — shared packages: pipeline core + agents core (provider seam, Orgo
  client, Neon registry/events, artifact storage, autonomy).
- **B. Operator CLI** — `tools/agent-cli/`.
- **C. Agent harness** — `tools/agent-harness/` (`operateai-agent`, runs inside Orgo).
- **D. Console** — `app/(console)/agents/` + `app/api/agents/` with Auth.js auth.
- **E. Action safety** — autonomy levels, approval workflow, per-client allowlist,
  proof-of-work, the `act` gate (§8).
- **F. Client portal** — `app/(portal)/`.
- Versioned Orgo templates + skills under `agents/`.

**Built but gated (cannot be *activated* in code):** `propose`/`act` autonomy is
fully implemented but cannot reach `act` without all three of: a counsel-signed
marker in `clients/<slug>/agent.config.json`, `ENABLE_ACT=1`, and the action
category present in the per-client allowlist. The gate is code, so PRD §6 stays
enforced rather than absent.

**Out of scope — operator/external dependencies (cannot complete in code):**

- Live Orgo **Scale** account + `ORGO_API_KEY`.
- Real secret injection into Orgo computers (Anthropic / gatherer keys / `DATABASE_URL` / S3).
- Google Business Profile OAuth app verification (first acting surface).
- Counsel sign-off on the agency clause (hard gate for `act`).
- Real client provisioning / live end-to-end runs against Orgo.

## 2. Locked decisions (from brainstorming)

| Decision | Choice | Rationale |
|---|---|---|
| Build scope | Everything (A–F), propose/act + portal | User directive; `act` gated in code |
| Console auth | **Auth.js v5 magic-link** (Resend + Neon adapter) | Multi-operator, sessions, reuses Resend |
| Artifact store | **S3-compatible (R2/S3)** via `@aws-sdk/client-s3` | Portable, no-ops without `S3_*` |
| Pipeline sharing | **Extract shared workspace packages** | Single source of truth; ends check-cli sync |
| Shared package count | **Two** (`check-core`, `agents-core`) | Clean boundaries: pipeline vs orchestration |
| Economics | PRD `[ASSUMPTION]` defaults | Numbers don't fork architecture; reconcile later |

## 3. Foundational change — pnpm workspace (highest risk; do first)

The repo is **not currently a pnpm workspace**: `web/`, `tools/check-cli`,
`tools/audit-cli` are standalone installs, and a vestigial root `package.json`
(name `web`) duplicates a subset of `web/`'s deps.

**Change:**
- Add root `pnpm-workspace.yaml` with members `web`, `tools/*`, `packages/*`.
- Reconcile the stray root `package.json` into a proper private workspace-root
  manifest (no app deps).
- Add `packages/check-core` and `packages/agents-core` as source-only TS packages
  (no build step — consumed as source via `tsx` for CLIs and Next's
  `transpilePackages` for the web app).

**Risk & mitigation (launch-blocking for M0):**
- `web/lib/check`, `web/lib/orgo`, `web/lib/agents`, `web/lib/storage` remain as
  **thin re-export shims** so every existing `@/lib/...` import keeps working.
- `web/next.config.ts` gains `transpilePackages: ['@operateai/check-core', '@operateai/agents-core']`.
- This step is committed **in isolation** and gated on `pnpm build` + the full
  Playwright route smoke (`/route-smoke-check`) staying green, so it is trivially
  revertable if the Vercel build chain rejects it.

## 4. Shared packages (`packages/`)

### `@operateai/check-core`
Extracted from `web/lib/check/*`: `gather/*`, `triage.ts`, `report.ts`,
`report-html.ts`, `types.ts`, `config.ts`. Single source of truth for the
gather→triage→report pipeline. `web/lib/check/*` and `tools/check-cli/src/*` both
import it; the manual-mirror burden documented in `CLAUDE.md` is removed.

### `@operateai/agents-core`
New. The orchestration layer, web-tree-independent so the harness and CLIs can use
it without pulling in Next:
- `orgo/client.ts`, `orgo/types.ts` — typed Orgo HTTP client.
- `provider.ts` — `ComputeProvider` interface.
- `providers/orgo.ts` — `OrgoProvider` (v1).
- `providers/fly.ts` — `FlyProvider` (interface-complete headless stub).
- `provision.ts` — workspace→launch→inject→verify orchestration.
- `registry.ts` — `client_agents` CRUD (mirrors `leads.ts`).
- `events.ts` — `agent_events` append/query (PoW feed + audit trail).
- `approvals.ts` — `action_approvals` CRUD.
- `autonomy.ts` — monitor/propose/act enforcement + the act-gate.
- `storage.ts` — S3-compatible artifact store.
- `schema.ts` — idempotent in-code migrations (`leads.ts` pattern).
- `config.ts`, `types.ts`.

## 5. Data model (Neon Postgres)

Idempotent `CREATE TABLE IF NOT EXISTS` migrations in `agents-core/schema.ts`,
following the `lib/leads.ts` convention (never throw on missing `DATABASE_URL`).

- **`client_agents`** — per PRD §3 (id, client_slug, lead_id, agent_kind,
  orgo_workspace, orgo_computer, template_ref, tier, status, `autonomy` default
  `monitor`, timestamps; `unique(client_slug, agent_kind)`).
- **`agent_events`** — per PRD §3 (type, summary, payload jsonb, artifact_key).
  Doubles as the client report feed and the action audit trail.
- **`agent_provisions`** — per PRD §3 (async provisioning step state).
- **`action_approvals`** — NEW: `id`, `agent_id` fk, `event_id` fk null,
  `category`, `surface`, `proposed_payload` jsonb, `status`
  (`pending|approved|rejected|applied`), `decided_by`, `decided_at`, timestamps.
- **Auth.js tables** — `users`, `accounts`, `sessions`, `verification_token`
  (Neon/Postgres adapter schema), plus operator/client role mapping
  (email → role, optional `client_slug` for portal scoping).

Per-client **action allowlist + written consent** are version-controlled files in
`clients/<slug>/` (source of truth per §6), loaded at provision and enforced in
the harness — not implicit in the skill.

## 6. Provider seam & provisioning (`agents-core`)

```ts
interface ComputeProvider {
  createWorkspace(clientSlug: string): Promise<WorkspaceRef>
  launch(opts: LaunchOpts): Promise<ComputerRef>       // from template_ref
  lifecycle(id: string, action: 'start'|'stop'|'restart'): Promise<void>
  exec(id: string, cmd: string): Promise<ExecResult>
  putFile(id: string, path: string, bytes: Uint8Array): Promise<void>
  teardown(ref: ComputerRef): Promise<void>
}
```

- `OrgoProvider` implements it over `orgo/client.ts`; the client no-ops/throws
  with a clear error when `ORGO_API_KEY` is unset.
- `FlyProvider` is interface-complete and throws `NotImplemented` behind
  `FLY_API_TOKEN` — the seam is real so headless agents can migrate later.
- `provision.ts` is idempotent/resumable, writing each `agent_provisions` step
  (`workspace|launch|inject|verify|done|failed`). Console/CLI never see Orgo
  specifics. Model spend stays on OperateAI's own Anthropic key inside the
  computer (PRD §2).

## 7. Artifact store (`agents-core/storage.ts`)

S3-compatible (`@aws-sdk/client-s3`, works with Cloudflare R2 or AWS S3):
`put(key, bytes, contentType)` and presigned `get(key)`. No-ops without `S3_*`
env. `agent_events.artifact_key` holds the object key; console and portal render
via presigned GET URLs.

## 8. Action safety (PRD §6 — launch-blocking)

Three autonomy levels on `client_agents.autonomy`:

| Level | Agent may | Ship |
|---|---|---|
| `monitor` | Read, score, report. No writes. | now (unblocked) |
| `propose` | Draft changes → queued for operator approval. | now (machinery), usable |
| `act` | Apply approved-category changes autonomously, with screenshot proof. | built, **gated** |

**Approval workflow:** harness emits `action.proposed` (`agent_events`) +
`action_approvals` row with diff + before-screenshot → console approve/reject →
on approve at `act`, `act-worker` applies and writes `action.applied` +
after-screenshot; at `monitor`/`propose` the operator applies manually and marks
applied. Every action writes an `agent_events` row with a before/after artifact.

**Act-gate (enforced in `autonomy.ts` + harness):** `autonomy='act'` is permitted
only if all hold — (1) `clients/<slug>/agent.config.json: counsel_signoff === true`,
(2) `ENABLE_ACT=1`, (3) the action category is in the per-client allowlist.
`registry.ts` refuses to persist `act` and the harness refuses to execute it
otherwise. Delegated tokens (e.g. GBP OAuth), never stored passwords; one
workspace per client bounds blast radius.

## 9. Agent harness — `tools/agent-harness/` (`operateai-agent`)

tsx runtime executed inside the Orgo computer. Imports both shared packages.

- `verify` — postCreate gate: keys + client config + skill presence (mirrors
  `audit dry-run`).
- `check [--weekly]` — one gather→triage→report pass → `agent_events` + uploaded
  report artifact.
- `report [--monthly]` — render proof-of-work report (reuses check renderer).
- `run` — long-running service loop.
- `act-worker` — executes approved actions (computer-use for no-API surfaces; GBP
  API/OAuth as first acting surface).

## 10. Operator CLI — `tools/agent-cli/` (`agents`)

`commander`-based, mirrors check-cli ergonomics. Subcommands:
`provision --client <slug> --kind <visibility|reception>`, `list`, `status`,
`logs [--follow]`, `exec -- "<cmd>"`, `report`, `pause`, `resume`, `teardown`,
`dry-run` (validates config + skills, **zero external calls**, mirrors audit
dry-run). Imports `agents-core`.

## 11. Console — `app/(console)/agents/` + `app/api/agents/`

- **Auth.js v5 magic-link** via Resend, Neon adapter, middleware-gated; operator
  allowlist via `OPERATOR_EMAILS`.
- **Fleet board** — card per agent: status pill, last check score, last action,
  next cron, tier.
- **Provision flow** — pick client (from leads/`clients/`) → kind → tier → launch,
  with a live provisioning log (polls `agent_provisions`).
- **Agent detail** — ttyd web terminal (via Orgo), live logs, **PoW timeline**
  (`agent_events`), autonomy toggle, **approval queue**, VNC tab only if the agent
  has a desktop.
- **Funnel hook** — "convert to hosted agent" action on any free-check lead.
- `app/api/agents/` (operator-session-gated): provision, lifecycle, status,
  approvals.
- Built on `tokens.css` / Signal `#f3fc85` / Hanken Grotesk + JetBrains Mono.
  **Next 16 / React 19 patterns verified via context7 / `node_modules/next/dist/docs/`
  before writing** (async `params`/`searchParams`, Metadata API, server/client
  boundaries).

## 12. Client portal — `app/(portal)/`

Read-only per-client view: score trend, actions taken, presigned screenshots.
Auth.js client role scoped by email → `client_slug`. Renders real `agent_events`
with an empty-state until data exists. This is the retention surface that makes
the recurring fee visibly earned.

## 13. Templates, skills & client config (`agents/`, `clients/`)

- `agents/visibility-agent/template.yaml` (`orgo.ai/v1`, per PRD §4) +
  `skills/*` (monitor + action skills as `SKILL.md`, runtime-read = behaviour
  change without redeploy).
- `agents/reception-agent/template.yaml` + `skills/*` (v2 product; built at
  monitor/propose).
- `clients/_template/06-agent/agent.config.json` (allowlist, surfaces, default
  autonomy, `counsel_signoff` flag, creds policy) + `agent-consent.md` (written
  consent per §6). Provision reads `clients/<slug>/`.

## 14. Environment variables (`web/.env.example` additions)

`ORGO_API_KEY`, `FLY_API_TOKEN` (optional), `S3_ENDPOINT`, `S3_REGION`,
`S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `AUTH_SECRET`,
`AUTH_URL`, `OPERATOR_EMAILS`, `ENABLE_ACT`. Agent-side secrets reused inside Orgo:
`ANTHROPIC_API_KEY`, gatherer keys, `DATABASE_URL`, `S3_*`. Every integration
no-ops gracefully when its var is unset.

## 15. Testing

- **Vitest units:** provider seam (mock `ComputeProvider`), registry/events,
  **autonomy + allowlist + act-gate**, storage no-op, provision step machine.
- **CLI:** `dry-run` integration (no network).
- **Console:** Playwright smoke — `/(console)` auth redirect + fleet board render
  (extends `routes.smoke`).
- TDD (superpowers) for core logic: provider seam, autonomy gate, provision
  orchestration.
- `nextjs16-reviewer` (after `web/` edits) + `audit-cli-reviewer` (after
  Anthropic-SDK / harness edits) + `/route-smoke-check` before completion.

## 16. Build sequence (milestones — each independently verifiable)

- **M0** — Workspace + `check-core` extraction. Gate: `pnpm build` + route smoke green.
- **M1** — `agents-core`: types, schema, registry, events, storage, Orgo client,
  provider seam, autonomy, approvals.
- **M2** — `agent-cli` (incl. `dry-run`).
- **M3** — `agent-harness` (`verify`/`check`/`report`/`run`/`act-worker`).
- **M4** — Console: Auth.js + fleet + provision + detail + API.
- **M5** — Approval workflow + act-gate end-to-end.
- **M6** — Client portal.
- **M7** — Templates + skills + client config.
- **M8** — Tests + route smoke + specialist reviewers.

## 17. Risks & dependencies

| Risk | Severity | Mitigation |
|---|---|---|
| Workspace conversion breaks Vercel build | High | Re-export shims; isolated commit; gated on build + smoke; revertable |
| Agent acts wrongly on a client listing | High | §8 HITL gate, allowlist, PoW, start at `monitor` |
| Client credential handling | High | Delegated tokens not passwords; per-workspace isolation; written consent |
| Orgo dependency / 25-workspace cap | Medium | Provider seam; `FlyProvider`; Enterprise path; teardown runbook |
| Model spend creeps with client count | Medium | Own keys; ephemeral cache; right-size cadence |
| Legal exposure on autonomous action | Medium | Counsel-signed agency clause gates `act` |

**Hard external dependencies:** Orgo Scale plan; counsel review (for `act`); GBP API
access (first acting surface); the existing `check-core` pipeline (already built).
