/**
 * web/lib/check/config.ts
 *
 * Reads API keys from process.env. Key values are NEVER logged.
 * No loadEnvFile call — Vercel / .env.local handles that.
 */

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
  google: process.env.GOOGLE_MAPS_API_KEY,
} as const;

export type EnvKey = keyof typeof ENV;
