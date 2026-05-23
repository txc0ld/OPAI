// Static mock data for the AAO Operator Dashboard (PRD §12.2).
// No backend, no API calls — every value here is hand-curated for visual realism.
// All currency is AUD. All times are Australia/Perth (AWST).

export type ClientStatus = "active" | "pilot" | "audit" | "paused";
export type SubscriptionTier = "Foundation" | "Operator" | "Embedded" | "Audit";

export type MockClient = {
  slug: string;
  name: string;
  industry: string;
  abn: string;
  region: string;
  subscription: SubscriptionTier;
  workflows: number;
  mrr: number;
  status: ClientStatus;
  startedOn: string;
  nextRenewal: string;
  primaryContact: string;
  primaryEmail: string;
  notes: string;
};

export const MOCK_CLIENTS: MockClient[] = [
  {
    slug: "coastal-concrete",
    name: "Coastal Concrete Constructions",
    industry: "Trades & construction",
    abn: "12 345 678 901",
    region: "Mandurah, WA",
    subscription: "Operator",
    workflows: 3,
    mrr: 14500,
    status: "active",
    startedOn: "2025-08-12",
    nextRenewal: "2026-08-12",
    primaryContact: "Daniel Whittaker",
    primaryEmail: "daniel@coastalconcrete.com.au",
    notes: "Owner-operator, 6 staff, runs jobs out of Xero + Gmail. Friday inbox is the pain.",
  },
  {
    slug: "pilbara-services",
    name: "Pilbara Services Group",
    industry: "Mining services",
    abn: "98 765 432 109",
    region: "Karratha, WA",
    subscription: "Embedded",
    workflows: 5,
    mrr: 28000,
    status: "active",
    startedOn: "2025-04-03",
    nextRenewal: "2026-04-03",
    primaryContact: "Megan Kowalski",
    primaryEmail: "m.kowalski@pilbaraservices.com.au",
    notes: "FIFO scheduling, supplier reconciliation, HSE incident triage. Strict residency requirements.",
  },
  {
    slug: "north-perth-bookkeeping",
    name: "North Perth Bookkeeping",
    industry: "Accounting & bookkeeping",
    abn: "55 111 222 333",
    region: "Mount Lawley, WA",
    subscription: "Foundation",
    workflows: 2,
    mrr: 7500,
    status: "active",
    startedOn: "2025-11-21",
    nextRenewal: "2026-11-21",
    primaryContact: "Priya Anand",
    primaryEmail: "priya@npbookkeeping.com.au",
    notes: "End-of-month reconciliation, BAS prep workflow. Operator approves every output.",
  },
  {
    slug: "henderson-legal",
    name: "Henderson Legal",
    industry: "Legal admin",
    abn: "44 999 888 777",
    region: "Perth CBD, WA",
    subscription: "Foundation",
    workflows: 1,
    mrr: 6500,
    status: "pilot",
    startedOn: "2026-02-09",
    nextRenewal: "2026-05-09",
    primaryContact: "Jonathan Henderson",
    primaryEmail: "j.henderson@hendersonlegal.com.au",
    notes: "8-week pilot — intake triage workflow only. Conversion gate at week 6.",
  },
  {
    slug: "swan-valley-cellars",
    name: "Swan Valley Cellars Co-op",
    industry: "Hospitality & retail",
    abn: "22 444 666 888",
    region: "Swan Valley, WA",
    subscription: "Audit",
    workflows: 0,
    mrr: 0,
    status: "audit",
    startedOn: "2026-04-14",
    nextRenewal: "2026-04-28",
    primaryContact: "Rosalind Pike",
    primaryEmail: "ros@svcellars.com.au",
    notes: "Audit-only engagement. Pilot proposal due end of week.",
  },
  {
    slug: "fremantle-marine",
    name: "Fremantle Marine Logistics",
    industry: "Logistics",
    abn: "33 222 555 777",
    region: "Fremantle, WA",
    subscription: "Operator",
    workflows: 2,
    mrr: 11000,
    status: "paused",
    startedOn: "2025-06-30",
    nextRenewal: "2026-06-30",
    primaryContact: "Wesley Tran",
    primaryEmail: "w.tran@fremantlemarine.com.au",
    notes: "Paused — internal restructure. Resume scheduled May 12.",
  },
];

export type RiskTier = 1 | 2 | 3 | 4 | 5;
export type ApprovalStatus = "pending" | "approved" | "rejected" | "escalated";

export type MockApproval = {
  id: string;
  clientSlug: string;
  workflow: string;
  workflowSlug: string;
  riskTier: RiskTier;
  ageMinutes: number;
  status: ApprovalStatus;
  subject: string;
  bodyLines: string[];
  generatedBy: string;
  modelLine: string;
  diff: string[];
  flag?: string;
  rails: string[];
  sourceContext: { label: string; value: string }[];
  costAud: number;
};

export const MOCK_APPROVALS: MockApproval[] = [
  {
    id: "apv-2041",
    clientSlug: "coastal-concrete",
    workflow: "Lead Intake",
    workflowSlug: "lead-intake",
    riskTier: 2,
    ageMinutes: 4,
    status: "pending",
    subject: "Re: Driveway quote enquiry — 14 Marina Drive, Mandurah",
    bodyLines: [
      "Hi Sarah, thanks for the photos. Based on the slope and the existing crossover I'd suggest a 100mm reinforced slab with broom finish, roughly 78m².",
      "Indicative pricing sits between $9,400 and $11,800 ex GST depending on prep. I've blocked Tuesday 30 April 8:30am for an on-site measure — let me know if that suits.",
      "— Daniel, Coastal Concrete",
    ],
    generatedBy: "Lead Intake agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: [
      "Reply sent to sarah.j@outlook.com from daniel@coastalconcrete.com.au",
      "Calendar hold added: Tue 30 Apr 08:30 AWST — Site measure (Mandurah)",
      "Lead row created in Xero CRM with status: quote pending",
      "Audit log entry written with full context hash",
    ],
    rails: ["topical:on-scope", "output:no-pii-leak", "policy:price-range-only"],
    sourceContext: [
      { label: "Channel", value: "Website enquiry form" },
      { label: "Received", value: "Today · 06:42 AWST" },
      { label: "Attachments", value: "3 photos (front, side, existing crossover)" },
    ],
    costAud: 0.18,
  },
  {
    id: "apv-2042",
    clientSlug: "coastal-concrete",
    workflow: "Quote Prep",
    workflowSlug: "quote-prep",
    riskTier: 3,
    ageMinutes: 17,
    status: "pending",
    subject: "Quote packet — 22 Heron Pde, Halls Head (retaining + slab)",
    bodyLines: [
      "Drafted full quote packet (5 line items, $24,180 ex GST). Detected uncertain ground conditions in photos — flagged for operator review before sending.",
      "Packet includes: site prep, retaining wall (12 lin/m), slab (54m²), drainage, finish coat. PDF attached.",
    ],
    generatedBy: "Quote Prep agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: [
      "Quote PDF generated and attached to Xero deal #4408",
      "Reply drafted to t.morrison@bigpond.net.au — held for approval",
      "Reminder set for follow-up in 5 business days if no response",
    ],
    flag: "Photos show possible reactive clay subgrade — recommend geotech note added before send",
    rails: ["topical:on-scope", "retrieval:material-pricing-current", "output:contains-flag"],
    sourceContext: [
      { label: "Channel", value: "Direct email reply" },
      { label: "Received", value: "Today · 06:29 AWST" },
      { label: "Attachments", value: "7 photos" },
    ],
    costAud: 0.42,
  },
  {
    id: "apv-2043",
    clientSlug: "pilbara-services",
    workflow: "Inbox Ops",
    workflowSlug: "inbox-ops",
    riskTier: 2,
    ageMinutes: 31,
    status: "pending",
    subject: "Re: Invoice query — PO 88412 (BHP NextGen contract)",
    bodyLines: [
      "Hi James, I've reviewed PO 88412. The discrepancy is the FIFO travel allowance line — billed at the August rate, contract uplifted on Sep 1.",
      "Corrected invoice attached, $4,210 net adjustment in your favour. Credit note INV-2025-3481 issued.",
      "— Megan, Pilbara Services",
    ],
    generatedBy: "Inbox Ops agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: [
      "Credit note INV-2025-3481 created in Xero",
      "Reply sent to j.harkness@bhp.com",
      "Workflow handoff to Reconciliation agent for ledger close-out",
    ],
    rails: ["topical:on-scope", "policy:financial-recompute-verified", "output:numeric-check"],
    sourceContext: [
      { label: "Channel", value: "Email — accounts@bhp.com" },
      { label: "Received", value: "Today · 05:58 AWST" },
      { label: "Thread", value: "11 messages, opened 2026-04-19" },
    ],
    costAud: 0.31,
  },
  {
    id: "apv-2044",
    clientSlug: "pilbara-services",
    workflow: "HSE Incident Triage",
    workflowSlug: "hse-triage",
    riskTier: 5,
    ageMinutes: 52,
    status: "pending",
    subject: "S3 incident — Karratha yard, hand laceration during sling change",
    bodyLines: [
      "Drafted internal HSE notification + RTW pathway brief. Worker treated on-site, no lost time. Incident classified S3 (medical treatment, no LTI).",
      "Recommended actions: toolbox talk on sling inspection (this Friday), supplier note re: sling batch lot 884.",
    ],
    generatedBy: "HSE Triage agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required · escalated-tier-5",
    diff: [
      "DRAFT only — no system writes until operator + HSE manager dual-approve",
      "Email queued to hse@pilbaraservices.com.au and m.kowalski@pilbaraservices.com.au",
      "Incident record drafted in IRMS (not yet submitted)",
    ],
    flag: "Tier 5 risk — requires dual approval from operator AND named HSE lead before any external action",
    rails: ["topical:hse-only", "policy:dual-approval-required", "output:no-worker-pii", "policy:no-external-send"],
    sourceContext: [
      { label: "Channel", value: "Foreman SMS to ops line" },
      { label: "Received", value: "Today · 05:37 AWST" },
      { label: "Witnesses", value: "2 named, statements pending" },
    ],
    costAud: 0.68,
  },
  {
    id: "apv-2045",
    clientSlug: "north-perth-bookkeeping",
    workflow: "BAS Prep",
    workflowSlug: "bas-prep",
    riskTier: 4,
    ageMinutes: 78,
    status: "pending",
    subject: "Q3 BAS draft — Westside Auto Detailing (client of NPB)",
    bodyLines: [
      "Drafted Q3 BAS for Westside Auto Detailing. GST collected $18,420, GST paid $7,108, net $11,312 payable.",
      "Two transactions flagged for review: $4,200 entertainment expense (likely partial deduction), $890 fuel without receipt.",
    ],
    generatedBy: "BAS Prep agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required · tier-4",
    diff: [
      "BAS workpaper PDF saved to client's secure folder",
      "Two flagged items added to client's review checklist",
      "DRAFT only — no lodgement until operator (registered BAS agent) approves",
    ],
    flag: "Tier 4 — financial output. Operator must verify flagged transactions before approve.",
    rails: ["topical:bas-only", "policy:registered-bas-agent-approval", "retrieval:ato-rates-current"],
    sourceContext: [
      { label: "Source", value: "Xero feed — Westside Auto Detailing" },
      { label: "Period", value: "Q3 2025-26 (Jan–Mar)" },
      { label: "Transactions", value: "847 reconciled, 2 flagged" },
    ],
    costAud: 1.12,
  },
  {
    id: "apv-2046",
    clientSlug: "henderson-legal",
    workflow: "Intake Triage",
    workflowSlug: "intake-triage",
    riskTier: 3,
    ageMinutes: 113,
    status: "pending",
    subject: "Re: Conveyancing enquiry — 8 Eucalypt Cl, Mt Hawthorn",
    bodyLines: [
      "Hi Aisha, thanks for getting in touch. Based on what you've described (residential settlement, no chain), our fixed-fee conveyancing service is $1,650 inc GST plus disbursements (~$420).",
      "I've attached our standard scope and a calendar link to book a 20-minute discovery call. — Henderson Legal Intake",
    ],
    generatedBy: "Intake Triage agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: [
      "Reply queued — held for solicitor review (pilot policy: every external email reviewed)",
      "Matter shell created in Actionstep (DRAFT, not opened)",
      "Calendar link generated (20-min discovery slot)",
    ],
    rails: ["topical:legal-intake-only", "output:no-legal-advice", "policy:scope-of-engagement-included"],
    sourceContext: [
      { label: "Channel", value: "Website enquiry" },
      { label: "Received", value: "Today · 04:32 AWST" },
    ],
    costAud: 0.16,
  },
  {
    id: "apv-2047",
    clientSlug: "coastal-concrete",
    workflow: "SOP Knowledge",
    workflowSlug: "sop-knowledge",
    riskTier: 1,
    ageMinutes: 142,
    status: "pending",
    subject: "Internal answer — \"What's our policy on weekend pours?\"",
    bodyLines: [
      "Coastal Concrete weekend pour policy (from SOP v3, updated Feb 2026): weekend pours are allowed for jobs ≥ $8,000 with operator approval, premium rate +28%.",
      "Cite: SOP §4.2, last reviewed 2026-02-04.",
    ],
    generatedBy: "SOP Knowledge agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · self-serve",
    diff: ["Internal answer posted to #ops-questions Slack channel", "Citation logged with SOP doc hash"],
    rails: ["topical:internal-only", "retrieval:sop-current", "output:cite-source"],
    sourceContext: [
      { label: "Asked by", value: "Foreman — Aaron P." },
      { label: "Channel", value: "Slack DM to bot" },
    ],
    costAud: 0.04,
  },
  {
    id: "apv-2048",
    clientSlug: "pilbara-services",
    workflow: "Supplier Reconciliation",
    workflowSlug: "supplier-recon",
    riskTier: 3,
    ageMinutes: 188,
    status: "pending",
    subject: "Reconciliation pack — Bridgestone Mining Solutions, March",
    bodyLines: [
      "Reconciled 41 statement lines against Xero. 3 mismatches found, total $1,847.",
      "Drafted query email to Bridgestone AR; held for operator review before send.",
    ],
    generatedBy: "Supplier Recon agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: [
      "Reconciliation workpaper saved to supplier folder",
      "Query email queued to ar@bridgestone-mining.com.au",
      "3 disputed lines tagged in Xero",
    ],
    rails: ["topical:reconciliation-only", "policy:numeric-verification", "output:no-payment-instructions"],
    sourceContext: [
      { label: "Source", value: "Bridgestone statement PDF (received via email)" },
      { label: "Period", value: "March 2026" },
    ],
    costAud: 0.55,
  },
  {
    id: "apv-2049",
    clientSlug: "henderson-legal",
    workflow: "Intake Triage",
    workflowSlug: "intake-triage",
    riskTier: 4,
    ageMinutes: 211,
    status: "pending",
    subject: "Re: Estate dispute enquiry — declined for scope",
    bodyLines: [
      "Hi Margaret, thanks for reaching out. Estate disputes sit outside our current practice scope — we can't take this matter on, but I've included a referral to two firms in Perth that focus on estate litigation.",
      "If your circumstances change or the matter resolves and you'd like help with related conveyancing, please get back in touch. — Henderson Legal Intake",
    ],
    generatedBy: "Intake Triage agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required · tier-4",
    diff: [
      "Reply DRAFTED — solicitor must approve all referrals before send",
      "No matter created (declined for scope)",
      "Referral log entry drafted",
    ],
    flag: "Tier 4 — referral content. Solicitor must verify referral firms still take this work and have no conflicts.",
    rails: ["topical:legal-intake-only", "policy:no-legal-advice", "policy:referral-list-current"],
    sourceContext: [
      { label: "Channel", value: "Website enquiry" },
      { label: "Received", value: "Yesterday · 16:14 AWST" },
    ],
    costAud: 0.21,
  },
  {
    id: "apv-2050",
    clientSlug: "north-perth-bookkeeping",
    workflow: "Inbox Ops",
    workflowSlug: "inbox-ops",
    riskTier: 2,
    ageMinutes: 267,
    status: "pending",
    subject: "Re: \"Have you finished my March numbers yet?\"",
    bodyLines: [
      "Hi Tom, March is reconciled and your P&L is sitting in your Xero — I've shared the link below. BAS draft will be with you by Wednesday.",
      "If you'd like a 15-minute walkthrough, I'm free Tue 11am or Thu 2pm. — Priya, NPB",
    ],
    generatedBy: "Inbox Ops agent",
    modelLine: "Bedrock claude-sonnet (Sydney) · approval-required",
    diff: ["Reply queued to t.bendix@bendixautoparts.com.au", "Calendar offer added with two slots"],
    rails: ["topical:on-scope", "output:no-fabricated-status"],
    sourceContext: [
      { label: "Channel", value: "Email reply" },
      { label: "Received", value: "Yesterday · 14:48 AWST" },
    ],
    costAud: 0.09,
  },
];

export type IncidentSeverity = "S1" | "S2" | "S3" | "S4";
export type IncidentStatus = "open" | "investigating" | "mitigated" | "resolved";

export type MockIncident = {
  id: string;
  severity: IncidentSeverity;
  clientSlug: string;
  workflow: string;
  description: string;
  status: IncidentStatus;
  openedAt: string;
  resolvedAt?: string;
  owner: string;
};

export const MOCK_INCIDENTS: MockIncident[] = [
  {
    id: "INC-0091",
    severity: "S2",
    clientSlug: "pilbara-services",
    workflow: "Supplier Reconciliation",
    description: "Two consecutive reconciliation runs failed against Xero — token refresh stuck in retry loop.",
    status: "investigating",
    openedAt: "2026-04-25 04:18 AWST",
    owner: "Taylor M.",
  },
  {
    id: "INC-0090",
    severity: "S3",
    clientSlug: "coastal-concrete",
    workflow: "Lead Intake",
    description: "Output rail flagged a draft containing competitor pricing language. Held, escalated to operator.",
    status: "mitigated",
    openedAt: "2026-04-24 09:42 AWST",
    owner: "Taylor M.",
  },
  {
    id: "INC-0089",
    severity: "S4",
    clientSlug: "henderson-legal",
    workflow: "Intake Triage",
    description: "Cosmetic — typo in templated signature block. Flagged by operator during pilot review.",
    status: "resolved",
    openedAt: "2026-04-22 11:05 AWST",
    resolvedAt: "2026-04-22 11:34 AWST",
    owner: "Taylor M.",
  },
  {
    id: "INC-0088",
    severity: "S2",
    clientSlug: "north-perth-bookkeeping",
    workflow: "BAS Prep",
    description: "Retrieval rail returned stale ATO rate (Q4 2024 instead of Q3 2025-26). Caught by approval gate. No client impact.",
    status: "resolved",
    openedAt: "2026-04-19 13:20 AWST",
    resolvedAt: "2026-04-19 16:11 AWST",
    owner: "Taylor M.",
  },
  {
    id: "INC-0087",
    severity: "S3",
    clientSlug: "pilbara-services",
    workflow: "HSE Incident Triage",
    description: "Tier-5 draft auto-routed to single approver instead of dual-approval queue. Held; policy gap closed.",
    status: "resolved",
    openedAt: "2026-04-15 08:50 AWST",
    resolvedAt: "2026-04-16 10:02 AWST",
    owner: "Taylor M.",
  },
];

export type LogActor = "operator" | "agent" | "system";
export type LogStatus = "ok" | "held" | "rejected" | "rail-flag" | "error";

export type MockLogEntry = {
  id: string;
  timestamp: string;
  clientSlug: string;
  workflow: string;
  actor: LogActor;
  action: string;
  target: string;
  status: LogStatus;
  costAud: number;
};

export const MOCK_LOGS: MockLogEntry[] = [
  { id: "log-58721", timestamp: "2026-04-25 06:48:11", clientSlug: "coastal-concrete", workflow: "Lead Intake", actor: "agent", action: "draft.created", target: "apv-2041", status: "held", costAud: 0.18 },
  { id: "log-58720", timestamp: "2026-04-25 06:42:02", clientSlug: "coastal-concrete", workflow: "Lead Intake", actor: "system", action: "trigger.received", target: "form-submission/14442", status: "ok", costAud: 0 },
  { id: "log-58719", timestamp: "2026-04-25 06:31:55", clientSlug: "coastal-concrete", workflow: "Quote Prep", actor: "agent", action: "draft.created", target: "apv-2042", status: "held", costAud: 0.42 },
  { id: "log-58718", timestamp: "2026-04-25 06:30:01", clientSlug: "coastal-concrete", workflow: "Quote Prep", actor: "agent", action: "rail.fired", target: "output:contains-flag", status: "rail-flag", costAud: 0 },
  { id: "log-58717", timestamp: "2026-04-25 06:29:12", clientSlug: "coastal-concrete", workflow: "Quote Prep", actor: "system", action: "trigger.received", target: "email/inbox/3819", status: "ok", costAud: 0 },
  { id: "log-58716", timestamp: "2026-04-25 06:00:34", clientSlug: "pilbara-services", workflow: "Inbox Ops", actor: "agent", action: "draft.created", target: "apv-2043", status: "held", costAud: 0.31 },
  { id: "log-58715", timestamp: "2026-04-25 05:58:22", clientSlug: "pilbara-services", workflow: "Inbox Ops", actor: "system", action: "trigger.received", target: "email/inbox/9988", status: "ok", costAud: 0 },
  { id: "log-58714", timestamp: "2026-04-25 05:48:00", clientSlug: "pilbara-services", workflow: "HSE Incident Triage", actor: "agent", action: "draft.created", target: "apv-2044", status: "held", costAud: 0.68 },
  { id: "log-58713", timestamp: "2026-04-25 05:37:29", clientSlug: "pilbara-services", workflow: "HSE Incident Triage", actor: "system", action: "trigger.received", target: "sms/inbound/884" , status: "ok", costAud: 0 },
  { id: "log-58712", timestamp: "2026-04-25 05:31:44", clientSlug: "pilbara-services", workflow: "Supplier Reconciliation", actor: "system", action: "integration.error", target: "xero/oauth-refresh", status: "error", costAud: 0 },
  { id: "log-58711", timestamp: "2026-04-25 04:32:09", clientSlug: "henderson-legal", workflow: "Intake Triage", actor: "agent", action: "draft.created", target: "apv-2046", status: "held", costAud: 0.16 },
  { id: "log-58710", timestamp: "2026-04-24 22:10:55", clientSlug: "north-perth-bookkeeping", workflow: "BAS Prep", actor: "operator", action: "approval.approved", target: "apv-2039", status: "ok", costAud: 0 },
  { id: "log-58709", timestamp: "2026-04-24 22:08:12", clientSlug: "north-perth-bookkeeping", workflow: "BAS Prep", actor: "agent", action: "draft.revised", target: "apv-2039", status: "ok", costAud: 0.22 },
  { id: "log-58708", timestamp: "2026-04-24 21:11:00", clientSlug: "north-perth-bookkeeping", workflow: "BAS Prep", actor: "agent", action: "draft.created", target: "apv-2039", status: "held", costAud: 0.94 },
  { id: "log-58707", timestamp: "2026-04-24 18:42:31", clientSlug: "coastal-concrete", workflow: "Lead Intake", actor: "operator", action: "approval.approved", target: "apv-2038", status: "ok", costAud: 0 },
  { id: "log-58706", timestamp: "2026-04-24 18:38:09", clientSlug: "coastal-concrete", workflow: "Lead Intake", actor: "agent", action: "draft.created", target: "apv-2038", status: "held", costAud: 0.17 },
  { id: "log-58705", timestamp: "2026-04-24 16:14:22", clientSlug: "henderson-legal", workflow: "Intake Triage", actor: "agent", action: "draft.created", target: "apv-2049", status: "held", costAud: 0.21 },
  { id: "log-58704", timestamp: "2026-04-24 15:02:11", clientSlug: "pilbara-services", workflow: "Supplier Reconciliation", actor: "agent", action: "draft.created", target: "apv-2048", status: "held", costAud: 0.55 },
  { id: "log-58703", timestamp: "2026-04-24 14:48:08", clientSlug: "north-perth-bookkeeping", workflow: "Inbox Ops", actor: "agent", action: "draft.created", target: "apv-2050", status: "held", costAud: 0.09 },
  { id: "log-58702", timestamp: "2026-04-24 14:01:02", clientSlug: "coastal-concrete", workflow: "SOP Knowledge", actor: "agent", action: "answer.posted", target: "slack/ops-questions/118", status: "ok", costAud: 0.04 },
  { id: "log-58701", timestamp: "2026-04-24 11:34:45", clientSlug: "henderson-legal", workflow: "Intake Triage", actor: "operator", action: "incident.resolved", target: "INC-0089", status: "ok", costAud: 0 },
  { id: "log-58700", timestamp: "2026-04-24 09:42:18", clientSlug: "coastal-concrete", workflow: "Lead Intake", actor: "agent", action: "rail.fired", target: "output:competitor-language", status: "rail-flag", costAud: 0 },
  { id: "log-58699", timestamp: "2026-04-24 08:11:09", clientSlug: "pilbara-services", workflow: "Inbox Ops", actor: "operator", action: "approval.approved", target: "apv-2037", status: "ok", costAud: 0 },
  { id: "log-58698", timestamp: "2026-04-24 06:55:33", clientSlug: "pilbara-services", workflow: "Inbox Ops", actor: "agent", action: "draft.created", target: "apv-2037", status: "held", costAud: 0.27 },
];

// Workflow templates — the 8 from PRD §10.2
export type MockWorkflowTemplate = {
  slug: string;
  name: string;
  description: string;
  defaultRiskTier: RiskTier;
  activeDeployments: number;
  category: "communication" | "ops" | "finance" | "knowledge" | "safety";
};

export const MOCK_WORKFLOW_TEMPLATES: MockWorkflowTemplate[] = [
  { slug: "lead-intake", name: "Lead Intake", description: "Form / email enquiry → extract → draft reply → queue for approval.", defaultRiskTier: 2, activeDeployments: 3, category: "communication" },
  { slug: "quote-prep", name: "Quote Prep", description: "Photo / spec input → line-item draft → operator review.", defaultRiskTier: 3, activeDeployments: 2, category: "communication" },
  { slug: "inbox-ops", name: "Inbox Ops", description: "Triage overnight inbox, draft replies for priority, batch the noise.", defaultRiskTier: 2, activeDeployments: 4, category: "communication" },
  { slug: "sop-knowledge", name: "SOP Knowledge", description: "Internal Q&A grounded in company SOP corpus, with citations.", defaultRiskTier: 1, activeDeployments: 5, category: "knowledge" },
  { slug: "supplier-recon", name: "Supplier Reconciliation", description: "Statement vs ledger reconciliation with variance flags.", defaultRiskTier: 3, activeDeployments: 2, category: "finance" },
  { slug: "bas-prep", name: "BAS Prep", description: "Quarterly BAS draft from Xero feed, with flag-for-review on edge cases.", defaultRiskTier: 4, activeDeployments: 1, category: "finance" },
  { slug: "intake-triage", name: "Intake Triage", description: "Inbound enquiry classification + scope-fit response or referral.", defaultRiskTier: 3, activeDeployments: 2, category: "communication" },
  { slug: "hse-triage", name: "HSE Incident Triage", description: "Incident report intake → severity classification → notification draft.", defaultRiskTier: 5, activeDeployments: 1, category: "safety" },
];

export type MockDeployment = {
  id: string;
  clientSlug: string;
  workflowSlug: string;
  workflowName: string;
  status: "active" | "paused" | "deploying";
  runs24h: number;
  approvals24h: number;
  approvalRatePct: number;
  cost24hAud: number;
};

export const MOCK_DEPLOYMENTS: MockDeployment[] = [
  { id: "dep-001", clientSlug: "coastal-concrete", workflowSlug: "lead-intake", workflowName: "Lead Intake", status: "active", runs24h: 7, approvals24h: 6, approvalRatePct: 100, cost24hAud: 1.21 },
  { id: "dep-002", clientSlug: "coastal-concrete", workflowSlug: "quote-prep", workflowName: "Quote Prep", status: "active", runs24h: 3, approvals24h: 2, approvalRatePct: 100, cost24hAud: 1.08 },
  { id: "dep-003", clientSlug: "coastal-concrete", workflowSlug: "sop-knowledge", workflowName: "SOP Knowledge", status: "active", runs24h: 11, approvals24h: 11, approvalRatePct: 100, cost24hAud: 0.41 },
  { id: "dep-004", clientSlug: "pilbara-services", workflowSlug: "inbox-ops", workflowName: "Inbox Ops", status: "active", runs24h: 22, approvals24h: 19, approvalRatePct: 95, cost24hAud: 5.84 },
  { id: "dep-005", clientSlug: "pilbara-services", workflowSlug: "supplier-recon", workflowName: "Supplier Reconciliation", status: "active", runs24h: 4, approvals24h: 3, approvalRatePct: 100, cost24hAud: 2.18 },
  { id: "dep-006", clientSlug: "pilbara-services", workflowSlug: "hse-triage", workflowName: "HSE Incident Triage", status: "active", runs24h: 1, approvals24h: 0, approvalRatePct: 100, cost24hAud: 0.68 },
  { id: "dep-007", clientSlug: "pilbara-services", workflowSlug: "sop-knowledge", workflowName: "SOP Knowledge", status: "active", runs24h: 18, approvals24h: 18, approvalRatePct: 100, cost24hAud: 0.71 },
  { id: "dep-008", clientSlug: "pilbara-services", workflowSlug: "intake-triage", workflowName: "Intake Triage", status: "active", runs24h: 5, approvals24h: 5, approvalRatePct: 100, cost24hAud: 0.83 },
  { id: "dep-009", clientSlug: "north-perth-bookkeeping", workflowSlug: "bas-prep", workflowName: "BAS Prep", status: "active", runs24h: 1, approvals24h: 1, approvalRatePct: 100, cost24hAud: 1.16 },
  { id: "dep-010", clientSlug: "north-perth-bookkeeping", workflowSlug: "inbox-ops", workflowName: "Inbox Ops", status: "active", runs24h: 6, approvals24h: 5, approvalRatePct: 83, cost24hAud: 0.59 },
  { id: "dep-011", clientSlug: "henderson-legal", workflowSlug: "intake-triage", workflowName: "Intake Triage", status: "active", runs24h: 4, approvals24h: 3, approvalRatePct: 100, cost24hAud: 0.74 },
];

export type MockIntegration = {
  provider: string;
  category: "email" | "calendar" | "files" | "finance" | "crm" | "commerce" | "infra";
  clientsConnected: number;
  scopes: string[];
  status: "healthy" | "degraded" | "error";
  lastSync: string;
};

export const MOCK_INTEGRATIONS: MockIntegration[] = [
  { provider: "Gmail", category: "email", clientsConnected: 3, scopes: ["gmail.readonly", "gmail.send", "gmail.modify"], status: "healthy", lastSync: "2 min ago" },
  { provider: "Outlook (Microsoft 365)", category: "email", clientsConnected: 2, scopes: ["Mail.Read", "Mail.Send", "Mail.ReadWrite"], status: "healthy", lastSync: "4 min ago" },
  { provider: "Google Calendar", category: "calendar", clientsConnected: 3, scopes: ["calendar.events"], status: "healthy", lastSync: "1 min ago" },
  { provider: "Microsoft Calendar", category: "calendar", clientsConnected: 2, scopes: ["Calendars.ReadWrite"], status: "healthy", lastSync: "3 min ago" },
  { provider: "Google Drive", category: "files", clientsConnected: 2, scopes: ["drive.file"], status: "healthy", lastSync: "12 min ago" },
  { provider: "SharePoint", category: "files", clientsConnected: 2, scopes: ["Sites.ReadWrite.All"], status: "healthy", lastSync: "8 min ago" },
  { provider: "Xero", category: "finance", clientsConnected: 4, scopes: ["accounting.transactions", "accounting.contacts", "accounting.reports.read"], status: "degraded", lastSync: "47 min ago — token refresh stuck (INC-0091)" },
  { provider: "HubSpot", category: "crm", clientsConnected: 1, scopes: ["crm.objects.contacts", "crm.objects.deals"], status: "healthy", lastSync: "6 min ago" },
  { provider: "Shopify", category: "commerce", clientsConnected: 0, scopes: [], status: "healthy", lastSync: "—" },
  { provider: "Webhooks (custom)", category: "infra", clientsConnected: 2, scopes: ["inbound.signed"], status: "healthy", lastSync: "1 min ago" },
  { provider: "CSV (manual upload)", category: "infra", clientsConnected: 3, scopes: ["upload.staged"], status: "healthy", lastSync: "Today 09:00" },
];

export type MockReport = {
  clientSlug: string;
  month: string; // e.g. "2026-03"
  status: "sent" | "draft" | "not-started";
  sentOn?: string;
};

export const MOCK_REPORTS: MockReport[] = [
  { clientSlug: "coastal-concrete", month: "2026-04", status: "draft" },
  { clientSlug: "coastal-concrete", month: "2026-03", status: "sent", sentOn: "2026-04-04" },
  { clientSlug: "coastal-concrete", month: "2026-02", status: "sent", sentOn: "2026-03-05" },
  { clientSlug: "coastal-concrete", month: "2026-01", status: "sent", sentOn: "2026-02-04" },
  { clientSlug: "pilbara-services", month: "2026-04", status: "draft" },
  { clientSlug: "pilbara-services", month: "2026-03", status: "sent", sentOn: "2026-04-03" },
  { clientSlug: "pilbara-services", month: "2026-02", status: "sent", sentOn: "2026-03-04" },
  { clientSlug: "pilbara-services", month: "2026-01", status: "sent", sentOn: "2026-02-03" },
  { clientSlug: "north-perth-bookkeeping", month: "2026-04", status: "not-started" },
  { clientSlug: "north-perth-bookkeeping", month: "2026-03", status: "sent", sentOn: "2026-04-06" },
  { clientSlug: "north-perth-bookkeeping", month: "2026-02", status: "sent", sentOn: "2026-03-07" },
  { clientSlug: "henderson-legal", month: "2026-04", status: "not-started" },
  { clientSlug: "henderson-legal", month: "2026-03", status: "draft" },
  { clientSlug: "fremantle-marine", month: "2026-04", status: "not-started" },
  { clientSlug: "fremantle-marine", month: "2026-03", status: "sent", sentOn: "2026-04-05" },
];

export type MockCost = {
  clientSlug: string;
  monthAud: number;
  budgetAud: number;
  modelSpendAud: number;
  toolSpendAud: number;
  byWorkflow: { workflowSlug: string; workflowName: string; spendAud: number }[];
};

export const MOCK_COSTS: MockCost[] = [
  {
    clientSlug: "coastal-concrete",
    monthAud: 412,
    budgetAud: 800,
    modelSpendAud: 287,
    toolSpendAud: 125,
    byWorkflow: [
      { workflowSlug: "lead-intake", workflowName: "Lead Intake", spendAud: 168 },
      { workflowSlug: "quote-prep", workflowName: "Quote Prep", spendAud: 184 },
      { workflowSlug: "sop-knowledge", workflowName: "SOP Knowledge", spendAud: 60 },
    ],
  },
  {
    clientSlug: "pilbara-services",
    monthAud: 1840,
    budgetAud: 2200,
    modelSpendAud: 1421,
    toolSpendAud: 419,
    byWorkflow: [
      { workflowSlug: "inbox-ops", workflowName: "Inbox Ops", spendAud: 712 },
      { workflowSlug: "supplier-recon", workflowName: "Supplier Reconciliation", spendAud: 481 },
      { workflowSlug: "hse-triage", workflowName: "HSE Incident Triage", spendAud: 88 },
      { workflowSlug: "intake-triage", workflowName: "Intake Triage", spendAud: 309 },
      { workflowSlug: "sop-knowledge", workflowName: "SOP Knowledge", spendAud: 250 },
    ],
  },
  {
    clientSlug: "north-perth-bookkeeping",
    monthAud: 318,
    budgetAud: 350,
    modelSpendAud: 247,
    toolSpendAud: 71,
    byWorkflow: [
      { workflowSlug: "bas-prep", workflowName: "BAS Prep", spendAud: 198 },
      { workflowSlug: "inbox-ops", workflowName: "Inbox Ops", spendAud: 120 },
    ],
  },
  {
    clientSlug: "henderson-legal",
    monthAud: 92,
    budgetAud: 250,
    modelSpendAud: 71,
    toolSpendAud: 21,
    byWorkflow: [{ workflowSlug: "intake-triage", workflowName: "Intake Triage", spendAud: 92 }],
  },
];

export type MockGovernanceTemplate = {
  slug: string;
  name: string;
  description: string;
  category: "workflow" | "governance";
  lastUpdated: string;
};

export const MOCK_TEMPLATES: MockGovernanceTemplate[] = [
  // Workflow templates
  { slug: "tpl-lead-intake", name: "Lead Intake (workflow)", description: "Standard form-to-reply template with operator approval gate.", category: "workflow", lastUpdated: "2026-04-12" },
  { slug: "tpl-quote-prep", name: "Quote Prep (workflow)", description: "Photo/spec → line-item quote packet, operator review.", category: "workflow", lastUpdated: "2026-04-09" },
  { slug: "tpl-inbox-ops", name: "Inbox Ops (workflow)", description: "Overnight triage + priority drafting + morning digest.", category: "workflow", lastUpdated: "2026-04-21" },
  { slug: "tpl-sop-knowledge", name: "SOP Knowledge (workflow)", description: "Internal Q&A grounded in SOP corpus, with citations.", category: "workflow", lastUpdated: "2026-03-30" },
  { slug: "tpl-supplier-recon", name: "Supplier Reconciliation (workflow)", description: "Statement-vs-ledger reconciliation with variance flags.", category: "workflow", lastUpdated: "2026-04-02" },
  { slug: "tpl-bas-prep", name: "BAS Prep (workflow)", description: "Quarterly BAS from Xero with flagged-edge-case review.", category: "workflow", lastUpdated: "2026-04-19" },
  { slug: "tpl-intake-triage", name: "Intake Triage (workflow)", description: "Scope-fit classification + standardised response/referral.", category: "workflow", lastUpdated: "2026-03-25" },
  { slug: "tpl-hse-triage", name: "HSE Incident Triage (workflow)", description: "Incident intake → severity → notification draft + dual approval.", category: "workflow", lastUpdated: "2026-04-15" },
  // Governance templates
  { slug: "tpl-approval-matrix", name: "Approval Matrix", description: "Risk-tier × actor matrix for who approves what.", category: "governance", lastUpdated: "2026-04-10" },
  { slug: "tpl-guardrail-spec", name: "Guardrail Specification", description: "Input, output, topical, dialog, retrieval rail definitions.", category: "governance", lastUpdated: "2026-04-08" },
  { slug: "tpl-risk-register", name: "Risk Register", description: "Per-workflow risk register + mitigation log.", category: "governance", lastUpdated: "2026-03-28" },
  { slug: "tpl-incident-runbook", name: "Incident Response Runbook", description: "S1–S4 severity definitions, escalation paths, comms templates.", category: "governance", lastUpdated: "2026-04-14" },
  { slug: "tpl-monthly-report", name: "Monthly Impact Report", description: "Client-facing monthly report template (exec, ops, risk, next).", category: "governance", lastUpdated: "2026-04-01" },
];

export const MOCK_OPERATOR = {
  email: "operator@operateai.com.au",
  role: "Platform Owner",
  name: "Taylor Mayo",
};

export function getClient(slug: string) {
  return MOCK_CLIENTS.find((c) => c.slug === slug);
}

export function getApproval(id: string) {
  return MOCK_APPROVALS.find((a) => a.id === id);
}

export function approvalsForClient(slug: string) {
  return MOCK_APPROVALS.filter((a) => a.clientSlug === slug);
}

export function deploymentsForClient(slug: string) {
  return MOCK_DEPLOYMENTS.filter((d) => d.clientSlug === slug);
}

export function logsForClient(slug: string) {
  return MOCK_LOGS.filter((l) => l.clientSlug === slug);
}

export function incidentsForClient(slug: string) {
  return MOCK_INCIDENTS.filter((i) => i.clientSlug === slug);
}

export function reportsForClient(slug: string) {
  return MOCK_REPORTS.filter((r) => r.clientSlug === slug);
}

export function costForClient(slug: string) {
  return MOCK_COSTS.find((c) => c.clientSlug === slug);
}

export function totalMrr() {
  return MOCK_CLIENTS.filter((c) => c.status === "active" || c.status === "pilot").reduce((s, c) => s + c.mrr, 0);
}

export function pendingApprovalsCount() {
  return MOCK_APPROVALS.filter((a) => a.status === "pending").length;
}

export function openIncidentsCount() {
  return MOCK_INCIDENTS.filter((i) => i.status !== "resolved").length;
}

export function activeClientsCount() {
  return MOCK_CLIENTS.filter((c) => c.status === "active" || c.status === "pilot").length;
}

export function ageLabel(minutes: number) {
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatAud(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

export function formatAudPrecise(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}
