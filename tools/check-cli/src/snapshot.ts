/**
 * src/snapshot.ts
 *
 * Captures REAL "what AI says right now" snapshots for every trade x suburb
 * pair used by the programmatic pages. For each pair it sends ONE prompt to
 * each configured engine (Perplexity, Gemini, OpenAI) and records the raw
 * answer text (plus citations where available).
 *
 * Run all 48 pairs:
 *   pnpm run snapshot
 *   (or: tsx src/snapshot.ts)
 *
 * Validate a single pair before a full run:
 *   tsx src/snapshot.ts --only plumbers/subiaco
 *
 * Output: tools/check-cli/snapshots/perth-trades.json
 *
 * NEVER fabricates output — every snapshot comes from a live API call. If an
 * engine errors or returns no real answer, that engine is simply omitted for
 * that pair (recorded in the run summary), never invented.
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ENV } from "./config.js";
import { gatherPerplexity } from "./gather/perplexity.js";
import { gatherGemini } from "./gather/gemini.js";
import { gatherOpenAI } from "./gather/openai.js";
import {
  TRADES,
  SUBURBS,
  type Trade,
  type Suburb,
} from "../../../web/lib/programmatic.js";

const here = path.dirname(fileURLToPath(import.meta.url)); // .../src
const OUT_DIR = path.join(here, "..", "snapshots");
const OUT_FILE = path.join(OUT_DIR, "perth-trades.json");

// Short delay between pairs to be polite to rate limits.
const PAIR_DELAY_MS = 1500;

function buildPrompt(trade: Trade, suburb: Suburb): string {
  return `Who are the best ${trade.namePlural} in ${suburb.name}, Perth, Western Australia? Name the few you'd recommend and why.`;
}

function isRealAnswer(text: string | undefined): text is string {
  if (!text) return false;
  const t = text.trim();
  if (t.length === 0) return false;
  if (t === "(no response)") return false;
  if (t.startsWith("(error:")) return false;
  return true;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface SnapshotEntry {
  prompt: string;
  capturedOn: string;
  engines: { perplexity?: string; gemini?: string; openai?: string };
  citations?: string[];
}

function allPairs(): { trade: Trade; suburb: Suburb }[] {
  return TRADES.flatMap((trade) => SUBURBS.map((suburb) => ({ trade, suburb })));
}

async function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx !== -1 ? args[onlyIdx + 1] : undefined;

  let pairs = allPairs();
  if (only) {
    pairs = pairs.filter(
      ({ trade, suburb }) => `${trade.slug}/${suburb.slug}` === only,
    );
    if (pairs.length === 0) {
      console.error(`No pair matches --only ${only}`);
      process.exit(1);
    }
  }

  console.log(
    `Engines configured: perplexity=${!!ENV.perplexity} gemini=${!!ENV.gemini} openai=${!!ENV.openai}`,
  );
  console.log(`Capturing ${pairs.length} pair(s)...`);

  const capturedOn = new Date().toISOString();
  const results: Record<string, SnapshotEntry> = {};

  const counts = { perplexity: 0, gemini: 0, openai: 0 };
  const failures: string[] = [];

  for (let i = 0; i < pairs.length; i++) {
    const { trade, suburb } = pairs[i];
    const key = `${trade.slug}/${suburb.slug}`;
    const prompt = buildPrompt(trade, suburb);

    // Each engine takes a prompts[] array; we send exactly one prompt.
    const [px, gm, oa] = await Promise.all([
      gatherPerplexity([prompt]),
      gatherGemini([prompt]),
      gatherOpenAI([prompt]),
    ]);

    const entry: SnapshotEntry = { prompt, capturedOn, engines: {} };
    const citations: string[] = [];

    const pxAns = px.answers[0];
    if (px.available && isRealAnswer(pxAns?.text)) {
      entry.engines.perplexity = pxAns.text.trim();
      counts.perplexity++;
      if (Array.isArray(pxAns.citations)) citations.push(...pxAns.citations);
    } else {
      failures.push(`${key} perplexity: ${pxAns?.text ?? px.note ?? "unavailable"}`);
    }

    const gmAns = gm.answers[0];
    if (gm.available && isRealAnswer(gmAns?.text)) {
      entry.engines.gemini = gmAns.text.trim();
      counts.gemini++;
    } else {
      failures.push(`${key} gemini: ${gmAns?.text ?? gm.note ?? "unavailable"}`);
    }

    const oaAns = oa.answers[0];
    if (oa.available && isRealAnswer(oaAns?.text)) {
      entry.engines.openai = oaAns.text.trim();
      counts.openai++;
      if (Array.isArray(oaAns.citations)) citations.push(...oaAns.citations);
    } else {
      failures.push(`${key} openai: ${oaAns?.text ?? oa.note ?? "unavailable"}`);
    }

    if (citations.length > 0) {
      entry.citations = Array.from(new Set(citations));
    }

    results[key] = entry;

    const got = Object.keys(entry.engines).join(",") || "NONE";
    console.log(`[${i + 1}/${pairs.length}] ${key} -> ${got}`);

    if (i < pairs.length - 1) await sleep(PAIR_DELAY_MS);
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(results, null, 2) + "\n", "utf8");

  console.log("\n--- Summary ---");
  console.log(`Pairs captured: ${Object.keys(results).length}`);
  console.log(`Perplexity real answers: ${counts.perplexity}`);
  console.log(`Gemini real answers:     ${counts.gemini}`);
  console.log(`OpenAI real answers:     ${counts.openai}`);
  console.log(`Engine failures/skips:   ${failures.length}`);
  if (failures.length > 0) {
    console.log("Failures:");
    for (const f of failures) console.log(`  - ${f}`);
  }
  console.log(`\nWrote ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
