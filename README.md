# OperateAI website (rebranded from AAO Group)

> AI agents, automation, hosting and training for Australian businesses.

This repo contains everything required to operate OperateAI as a managed AI operations business: the marketing site, the operator skill library, the sales asset pack, the legal scaffolds, the per-client workspace template, the operator playbook, and the operator CLI.

## Repo layout

```
.
├── australian_smb_ai_ops_prd.md     # The PRD (source of truth for product, offers, governance)
├── OPERATOR_PLAYBOOK.md             # Day-to-day motion: discovery -> audit -> pilot -> subscription
├── docs/                            # Spec + implementation plan for the marketing site v1
├── web/                             # Marketing site (Next.js, deployed to Vercel)
├── sales-assets/                    # Capability statement, discovery deck, audit sample, etc.
├── legal-scaffolds/                 # MSA, SOW, DPS, AI disclosure, AUP, SLA, cancellation (DRAFT)
├── clients/                         # Per-client workspaces (template at `_template/`)
├── tools/audit-cli/                 # CLI that automates the audit pipeline via Claude API
└── vercel.json                      # Deploy config
```

## Quick start for new operators

1. Read the PRD: `australian_smb_ai_ops_prd.md`
2. Read the playbook: `OPERATOR_PLAYBOOK.md`
3. Familiarise yourself with the 12 AAO skills (live in `~/.claude/skills/aao-*`)
4. Walk the marketing site at https://operateai.com.au (or `cd web && pnpm dev`)
5. Walk the demo agents at https://operateai.com.au/demo
6. To run a real audit: instantiate `clients/_template/` for the client, follow the playbook

## Where the dollar comes from

```
Outbound (week 0)
  |
  v
15-min discovery call (week 1)
  |
  v
AI Operations Audit  $2,500-$7,500   1-2 weeks
  |
  v
First Agent Pilot    $10,000-$30,000  2-4 weeks
  |
  v
Managed Subscription $5,000-$35,000+/mo  ongoing
```

## Stack snapshot

- **Marketing site:** Next.js 16, Tailwind v4, MDX, Vercel (syd1)
- **Skills:** 12 Claude Code Skills at `~/.claude/skills/aao-*` (advisory + preparatory; never act on client systems)
- **Agent runtime (v1):** Deterministic state machine + LangGraph task agents + NeMo Guardrails (input/output/topical/dialog/policy rails)
- **LLM providers:** Claude via Bedrock Sydney; GPT via Azure Australia East where applicable
- **Sandboxing:** NemoClaw / OpenShell reserved for premium / R&D
- **Approval queue:** the product. Everything else supports it.

## Status

v1 marketing site shipped (16 routes, 19/19 smoke tests passing, deployed to Vercel).
v1 operating system shipped (skills, sales pack, legal scaffolds, playbook, demos, operator dashboard skeleton).

Pending before first paid audit:

- [ ] Domain DNS pointed at Vercel (`operateai.com.au` -> Vercel)
- [ ] Counsel review of `legal-scaffolds/`
- [ ] Founder photograph for `/about`
- [ ] First-vertical Calendly event types under `calendly.com/operateai`
- [ ] First 10 outbound contacts per `sales-assets/08-outreach-pack.md`

## Contact

Taylor Mayor  ·  taylor@operateai.com.au  ·  Perth, Western Australia
