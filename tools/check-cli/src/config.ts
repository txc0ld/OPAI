/**
 * src/config.ts
 *
 * Reads env keys and exposes availability flags. Key values are NEVER logged.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

// Auto-load tools/check-cli/.env (gitignored) so keys work without a manual
// `export` / `set -a` — important on Windows. Best-effort: if there's no .env,
// fall back to whatever is already in the real environment. Node >= 20.12.
try {
  const here = path.dirname(fileURLToPath(import.meta.url)); // .../src
  process.loadEnvFile(path.join(here, "..", ".env"));
} catch {
  // no local .env — rely on the ambient process environment
}

export const MODELS = { report: "claude-opus-4-8" } as const;

// Per Anthropic public pricing (USD per million tokens). Opus 4.8 pricing.
export const PRICING = {
  input: 15.0,
  cacheWrite: 18.75,
  cacheRead: 1.5,
  output: 75.0,
} as const;

export const ENV = {
  anthropic: process.env.ANTHROPIC_API_KEY,
  perplexity: process.env.PERPLEXITY_API_KEY,
  openai: process.env.OPENAI_API_KEY,
  gemini: process.env.GEMINI_API_KEY,
  google: process.env.GOOGLE_MAPS_API_KEY, // used for Places API + PageSpeed
} as const;

export type EnvKey = keyof typeof ENV;

export function keyStatus(): { name: string; present: boolean }[] {
  return [
    { name: "ANTHROPIC_API_KEY", present: !!ENV.anthropic },
    { name: "PERPLEXITY_API_KEY", present: !!ENV.perplexity },
    { name: "OPENAI_API_KEY", present: !!ENV.openai },
    { name: "GEMINI_API_KEY", present: !!ENV.gemini },
    { name: "GOOGLE_MAPS_API_KEY", present: !!ENV.google },
  ];
}
