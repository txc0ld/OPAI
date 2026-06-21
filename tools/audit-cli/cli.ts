#!/usr/bin/env -S npx tsx
/**
 * @aao/audit-cli
 *
 * Automates the AAO Operations Audit pipeline:
 *   1. Reads the audit pipeline input JSON.
 *   2. Loads the relevant aao-* SKILL.md files from ~/.claude/skills/.
 *   3. Calls Claude (Opus 4.8) with the orchestrator skill + skill specs as
 *      cached system context, captures structured JSON output.
 *   4. Calls Claude (Sonnet 4.6) a second time with the renderer skill spec +
 *      the JSON output, writes the Markdown report.
 *
 * Prompt caching is applied to the static skill-spec system blocks so the
 * second call hits the cache.
 */

import { Command } from "commander";
import pc from "picocolors";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// The orchestrator pass does the heavy eight-skill analytical reasoning, so it
// runs on Opus. The renderer pass only turns the orchestrator's JSON into
// Markdown, so it stays on the cheaper Sonnet.
const ORCHESTRATOR_MODEL = "claude-opus-4-8";
const RENDERER_MODEL = "claude-sonnet-4-6";

// Per Anthropic public pricing (USD per million tokens), keyed by model so each
// pass is costed against the model it actually used. Rough cost estimate only;
// actual billing comes from the API.
type Pricing = {
  input: number;
  cacheWrite: number;
  cacheRead: number;
  output: number;
};

const PRICING: Record<string, Pricing> = {
  "claude-opus-4-8": { input: 15.0, cacheWrite: 18.75, cacheRead: 1.5, output: 75.0 },
  "claude-sonnet-4-6": { input: 3.0, cacheWrite: 3.75, cacheRead: 0.3, output: 15.0 },
};

const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");

// Skills used by the orchestrator pass (the eight analytical skills + the
// orchestrator itself).
const ORCHESTRATOR_SKILL_NAMES = [
  "aao-audit-pipeline",
  "aao-client-intake-analyst",
  "aao-workflow-discovery-analyst",
  "aao-data-sensitivity-classifier",
  "aao-integration-planner",
  "aao-ai-opportunity-scorer",
  "aao-approval-policy-designer",
  "aao-guardrail-spec-writer",
  "aao-pilot-proposal-writer",
];

const RENDERER_SKILL_NAMES = ["aao-audit-report-renderer"];

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------

// Loose schema — operators sometimes leave placeholder fields, and we want
// dry-run to surface those without failing hard. Top-level keys are required;
// nested validation is informational.
const AuditPipelineInputSchema = z
  .object({
    schema_version: z.string().optional(),
    client_metadata: z
      .object({
        name: z.string(),
        legal_entity: z.string().optional(),
        abn: z.string().optional(),
        industry: z.string().optional(),
        audit_date: z.string().optional(),
        audit_lead: z.string().optional(),
        contact_email: z.string().optional(),
        contact_name: z.string().optional(),
      })
      .passthrough(),
    discovery_transcript: z.string(),
    onboarding_form: z.record(z.unknown()),
    systems_inventory: z.array(z.unknown()),
    commercial_context: z.record(z.unknown()).optional(),
  })
  .passthrough();

type AuditPipelineInput = z.infer<typeof AuditPipelineInputSchema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath: string): unknown {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${abs}`);
  }
  return JSON.parse(fs.readFileSync(abs, "utf8"));
}

function writeJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
  fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), "utf8");
}

function writeText(filePath: string, data: string): void {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
  fs.writeFileSync(path.resolve(filePath), data, "utf8");
}

function loadSkill(name: string): { name: string; markdown: string } {
  const filePath = path.join(SKILLS_DIR, name, "SKILL.md");
  if (!fs.existsSync(filePath)) {
    throw new Error(`Skill not found at ${filePath}`);
  }
  return { name, markdown: fs.readFileSync(filePath, "utf8") };
}

function loadSkills(names: string[]): { name: string; markdown: string }[] {
  return names.map((n) => loadSkill(n));
}

function requireApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.error(
      pc.red(
        "Error: ANTHROPIC_API_KEY is not set. Export it before running this command:",
      ),
    );
    console.error(pc.dim("  export ANTHROPIC_API_KEY=sk-ant-..."));
    process.exit(2);
  }
  return key;
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

type Usage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
};

function estimateCostUsd(usage: Usage, model: string): number {
  const p = PRICING[model] ?? PRICING[ORCHESTRATOR_MODEL];
  const baseInput = (usage.input_tokens || 0) / 1_000_000;
  const cacheWrite = (usage.cache_creation_input_tokens || 0) / 1_000_000;
  const cacheRead = (usage.cache_read_input_tokens || 0) / 1_000_000;
  const output = (usage.output_tokens || 0) / 1_000_000;
  return (
    baseInput * p.input +
    cacheWrite * p.cacheWrite +
    cacheRead * p.cacheRead +
    output * p.output
  );
}

function logUsage(label: string, usage: Usage, ms: number, model: string): void {
  const cost = estimateCostUsd(usage, model);
  console.log(pc.cyan(`  [${label}]`));
  console.log(`    model:              ${model}`);
  console.log(`    duration:           ${fmtDuration(ms)}`);
  console.log(
    `    input tokens:       ${usage.input_tokens.toLocaleString()}` +
      (usage.cache_creation_input_tokens
        ? pc.dim(` (+${usage.cache_creation_input_tokens.toLocaleString()} cache write)`)
        : "") +
      (usage.cache_read_input_tokens
        ? pc.green(` (+${usage.cache_read_input_tokens.toLocaleString()} cache read)`)
        : ""),
  );
  console.log(`    output tokens:      ${usage.output_tokens.toLocaleString()}`);
  console.log(`    estimated cost USD: $${cost.toFixed(4)}`);
}

function buildSkillSystemBlocks(
  skills: { name: string; markdown: string }[],
): Anthropic.TextBlockParam[] {
  // Concatenate all skill specs into a single large cached block. Prompt
  // caching is applied via cache_control: { type: "ephemeral" } on the final
  // block so the whole prefix becomes a cached prefix on subsequent calls.
  const joined = skills
    .map(
      (s) =>
        `<skill name="${s.name}">\n${s.markdown}\n</skill>`,
    )
    .join("\n\n");

  return [
    {
      type: "text",
      text:
        "You are part of the AAO Group operator toolkit. The following are the " +
        "Claude Code Skill specifications you must follow when running the " +
        "AAO Operations Audit pipeline. Treat each <skill> block as authoritative " +
        "for the named skill.\n\nen-AU spelling. Plain confident English. No " +
        "marketing cliché. The pipeline output is a draft for operator review; " +
        "nothing in your output is final or client-ready without operator sign-off.",
    },
    {
      type: "text",
      text: joined,
      cache_control: { type: "ephemeral" },
    },
  ];
}

function extractText(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

function extractJson(text: string): unknown {
  // The model is instructed to return a single JSON object. Strip markdown
  // fences if present, then parse.
  let candidate = text.trim();
  const fenceMatch = candidate.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenceMatch) {
    candidate = fenceMatch[1];
  } else {
    // Find the outermost {...} block.
    const first = candidate.indexOf("{");
    const last = candidate.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      candidate = candidate.slice(first, last + 1);
    }
  }
  return JSON.parse(candidate);
}

// ---------------------------------------------------------------------------
// Pipeline calls
// ---------------------------------------------------------------------------

async function runOrchestrator(
  client: Anthropic,
  input: AuditPipelineInput,
): Promise<{ json: unknown; raw: string; usage: Usage; ms: number }> {
  const skills = loadSkills(ORCHESTRATOR_SKILL_NAMES);
  const system = buildSkillSystemBlocks(skills);

  const userPrompt =
    "Run the AAO Audit Pipeline orchestrator end-to-end against the inputs " +
    "below. Follow the prompt template in the aao-audit-pipeline SKILL.md " +
    "exactly. Return a single JSON object matching the orchestrator output " +
    "schema. Wrap the JSON in a single ```json``` fenced block.\n\n" +
    "INPUT JSON:\n" +
    "```json\n" +
    JSON.stringify(input, null, 2) +
    "\n```";

  const t0 = Date.now();
  const message = await client.messages.create({
    model: ORCHESTRATOR_MODEL,
    max_tokens: 16000,
    system,
    messages: [{ role: "user", content: userPrompt }],
  });
  const ms = Date.now() - t0;
  const raw = extractText(message);
  const json = extractJson(raw);
  return { json, raw, usage: message.usage as Usage, ms };
}

async function runRenderer(
  client: Anthropic,
  pipelineOutput: unknown,
  clientMetadata: Record<string, unknown>,
): Promise<{ markdown: string; usage: Usage; ms: number }> {
  const skills = loadSkills(RENDERER_SKILL_NAMES);
  const system = buildSkillSystemBlocks(skills);

  const userPrompt =
    "Render the supplied audit pipeline output as a Markdown report per the " +
    "aao-audit-report-renderer SKILL.md. Use the supplied client metadata for " +
    "client-facing fields. Output Markdown only — no fenced code wrapping " +
    "around the whole report.\n\n" +
    "AUDIT PIPELINE OUTPUT JSON:\n" +
    "```json\n" +
    JSON.stringify(pipelineOutput, null, 2) +
    "\n```\n\n" +
    "CLIENT METADATA JSON:\n" +
    "```json\n" +
    JSON.stringify(clientMetadata, null, 2) +
    "\n```";

  const t0 = Date.now();
  const message = await client.messages.create({
    model: RENDERER_MODEL,
    max_tokens: 16000,
    system,
    messages: [{ role: "user", content: userPrompt }],
  });
  const ms = Date.now() - t0;
  const markdown = extractText(message);
  return { markdown, usage: message.usage as Usage, ms };
}

// ---------------------------------------------------------------------------
// Subcommands
// ---------------------------------------------------------------------------

function buildClientMetadata(
  input: AuditPipelineInput,
  clientSlug?: string,
): Record<string, unknown> {
  const cm = input.client_metadata as Record<string, unknown>;
  return {
    client_slug: clientSlug ?? "",
    client_legal_name: cm.legal_entity ?? cm.name ?? "",
    client_trading_name: cm.name ?? "",
    client_abn: cm.abn ?? "",
    audit_date_range: cm.audit_date ?? "",
    audit_lead_name: cm.audit_lead ?? "",
    audit_lead_role: "AAO Audit Lead",
    client_contact_name: cm.contact_name ?? "",
    client_contact_role: "",
    client_contact_email: cm.contact_email ?? "",
    client_contact_phone: "",
    report_version: "1.0 (draft)",
    distribution: "",
    classification: `Confidential — ${cm.name ?? "client"} and AAO Group`,
    proposal_date: cm.audit_date ?? "",
    proposal_version: "1.0",
    valid_until_date: "",
  };
}

async function cmdDryRun(opts: { input: string }): Promise<void> {
  console.log(pc.bold("aao-audit dry-run"));
  console.log(pc.dim(`  input: ${path.resolve(opts.input)}`));

  const raw = readJson(opts.input);
  const result = AuditPipelineInputSchema.safeParse(raw);
  if (!result.success) {
    console.error(pc.red("Input JSON failed validation:"));
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    process.exit(1);
  }

  const data = result.data;

  // Soft warnings for placeholder content.
  const warnings: string[] = [];
  if (data.discovery_transcript.includes("{{")) {
    warnings.push("discovery_transcript still contains {{placeholder}} text");
  }
  if (data.client_metadata.name?.includes("{{")) {
    warnings.push("client_metadata.name still contains {{placeholder}} text");
  }
  if (data.systems_inventory.length === 0) {
    warnings.push("systems_inventory is empty");
  }

  // Verify skill files exist.
  const allSkills = [...ORCHESTRATOR_SKILL_NAMES, ...RENDERER_SKILL_NAMES];
  const missingSkills: string[] = [];
  for (const s of allSkills) {
    const p = path.join(SKILLS_DIR, s, "SKILL.md");
    if (!fs.existsSync(p)) missingSkills.push(s);
  }

  console.log(pc.green("  shape:              valid"));
  console.log(`  client name:        ${data.client_metadata.name}`);
  console.log(`  workflows declared: ${(data.onboarding_form as any)?.workflows_of_interest?.length ?? 0}`);
  console.log(`  systems declared:   ${data.systems_inventory.length}`);
  console.log(`  skills required:    ${allSkills.length}`);
  console.log(
    `  skills found:       ${allSkills.length - missingSkills.length}/${allSkills.length}`,
  );
  if (missingSkills.length) {
    console.log(pc.yellow(`  skills missing:     ${missingSkills.join(", ")}`));
  }

  if (warnings.length) {
    console.log(pc.yellow("  warnings:"));
    for (const w of warnings) console.log(pc.yellow(`    - ${w}`));
  }

  console.log(pc.green("dry-run OK — no API calls made"));
}

async function cmdRun(opts: {
  input: string;
  outputDir: string;
  client?: string;
}): Promise<void> {
  const apiKey = requireApiKey();
  console.log(pc.bold("aao-audit run"));
  console.log(pc.dim(`  input:      ${path.resolve(opts.input)}`));
  console.log(pc.dim(`  output dir: ${path.resolve(opts.outputDir)}`));
  console.log(pc.dim(`  models:     ${ORCHESTRATOR_MODEL} (orchestrator), ${RENDERER_MODEL} (renderer)`));

  const raw = readJson(opts.input);
  const input = AuditPipelineInputSchema.parse(raw);

  const client = new Anthropic({ apiKey });

  console.log(pc.bold("\n[1/2] orchestrator"));
  const orchestrator = await runOrchestrator(client, input);
  const pipelineOutPath = path.join(opts.outputDir, "audit-pipeline-output.json");
  writeJson(pipelineOutPath, orchestrator.json);
  logUsage("orchestrator", orchestrator.usage, orchestrator.ms, ORCHESTRATOR_MODEL);
  console.log(pc.green(`  wrote: ${pipelineOutPath}`));

  console.log(pc.bold("\n[2/2] renderer"));
  const clientMetadata = buildClientMetadata(input, opts.client);
  const renderer = await runRenderer(client, orchestrator.json, clientMetadata);
  const deliverablePath = path.join(opts.outputDir, "audit-deliverable.md");
  writeText(deliverablePath, renderer.markdown);
  logUsage("renderer", renderer.usage, renderer.ms, RENDERER_MODEL);
  console.log(pc.green(`  wrote: ${deliverablePath}`));

  const totalCost =
    estimateCostUsd(orchestrator.usage, ORCHESTRATOR_MODEL) +
    estimateCostUsd(renderer.usage, RENDERER_MODEL);
  const totalMs = orchestrator.ms + renderer.ms;
  console.log(pc.bold("\nsummary"));
  console.log(`  total duration:   ${fmtDuration(totalMs)}`);
  console.log(`  total cost USD:   $${totalCost.toFixed(4)}`);
  console.log(pc.green("done"));
}

async function cmdRender(opts: {
  input: string;
  output: string;
  client?: string;
  metadata?: string;
}): Promise<void> {
  const apiKey = requireApiKey();
  console.log(pc.bold("aao-audit render"));
  console.log(pc.dim(`  input:  ${path.resolve(opts.input)}`));
  console.log(pc.dim(`  output: ${path.resolve(opts.output)}`));

  const pipelineOutput = readJson(opts.input);

  let clientMetadata: Record<string, unknown>;
  if (opts.metadata) {
    clientMetadata = readJson(opts.metadata) as Record<string, unknown>;
  } else {
    // Best-effort metadata pulled from the pipeline output itself.
    const po = pipelineOutput as Record<string, unknown>;
    clientMetadata = {
      client_legal_name: po.client_name ?? "",
      client_trading_name: po.client_name ?? "",
      audit_date_range: po.audit_date ?? "",
      audit_lead_name: po.audit_operator ?? "",
      report_version: "1.0 (draft)",
      classification: `Confidential — ${po.client_name ?? "client"} and AAO Group`,
      client_slug: opts.client ?? "",
    };
  }

  const client = new Anthropic({ apiKey });
  const renderer = await runRenderer(client, pipelineOutput, clientMetadata);
  writeText(opts.output, renderer.markdown);
  logUsage("renderer", renderer.usage, renderer.ms, RENDERER_MODEL);
  console.log(pc.green(`done — wrote ${opts.output}`));
}

// ---------------------------------------------------------------------------
// CLI plumbing
// ---------------------------------------------------------------------------

const program = new Command();
program
  .name("aao-audit")
  .description("Automate the AAO Operations Audit pipeline via the Claude API.")
  .version("0.1.0");

const audit = program.command("audit").description("Audit pipeline commands.");

audit
  .command("run")
  .description("Run the full audit pipeline (orchestrator + renderer).")
  .requiredOption("--input <path>", "Path to audit-pipeline-input.json")
  .requiredOption("--output-dir <path>", "Directory to write outputs into")
  .option("--client <slug>", "Client slug, used for metadata")
  .action(async (opts) => {
    try {
      await cmdRun(opts);
    } catch (err) {
      console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
      process.exit(1);
    }
  });

audit
  .command("render")
  .description("Re-render Markdown from an existing pipeline output JSON.")
  .requiredOption("--input <path>", "Path to audit-pipeline-output.json")
  .requiredOption("--output <path>", "Path to write the Markdown report")
  .option("--client <slug>", "Client slug, used for metadata")
  .option("--metadata <path>", "Optional JSON file with client metadata overrides")
  .action(async (opts) => {
    try {
      await cmdRender(opts);
    } catch (err) {
      console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
      process.exit(1);
    }
  });

audit
  .command("dry-run")
  .description("Validate the input JSON without making any API calls.")
  .requiredOption("--input <path>", "Path to audit-pipeline-input.json")
  .action(async (opts) => {
    try {
      await cmdDryRun(opts);
    } catch (err) {
      console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
      process.exit(1);
    }
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(pc.red(`\nFAILED: ${(err as Error).message}`));
  process.exit(1);
});
