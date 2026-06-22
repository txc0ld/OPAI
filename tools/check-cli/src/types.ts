/**
 * src/types.ts
 *
 * Zod schemas and TypeScript types for the check-cli pipeline.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------

export const CheckInputSchema = z.object({
  business: z.string().min(1, "business name is required"),
  suburb: z.string().min(1, "suburb is required"),
  trade: z.string().min(1, "trade is required"),
  url: z.string().url("url must be a valid URL").optional(),
  phone: z.string().optional(),
  urgentJob: z.string().optional(), // defaults derived from trade if not supplied
  specificJob: z.string().optional(),
});

export type CheckInput = z.infer<typeof CheckInputSchema>;

// ---------------------------------------------------------------------------
// Gatherer result types
// ---------------------------------------------------------------------------

export interface EngineAnswer {
  prompt: string;
  text: string;
  citations?: string[];
}

export interface EngineResult {
  engine: string;
  available: boolean;
  note?: string;
  answers: EngineAnswer[];
}

export interface PlacesData {
  name: string;
  rating: number | null;
  reviewCount: number | null;
  primaryType: string | null;
  types: string[];
  hasHours: boolean;
  openNow: boolean | null;
  website: string | null;
  phone: string | null;
  businessStatus: string | null;
  photoCount: number;
  recentReviews: { rating: number | null; when: string | null }[];
  mapsUri: string | null;
}

export interface PlacesResult {
  available: boolean;
  note?: string;
  data?: PlacesData;
}

export interface WebsiteResult {
  available: boolean;
  note?: string;
  reachable?: boolean;
  hasPriceText?: boolean;
  mentionsSuburb?: boolean;
  textLength?: number;
  looksImageHeavy?: boolean;
}

export interface PageSpeedResult {
  available: boolean;
  note?: string;
  performance?: number; // 0–1 score from Lighthouse
}

// ---------------------------------------------------------------------------
// Triage types
// ---------------------------------------------------------------------------

export type Rag = "R" | "A" | "G";

export interface Triage {
  aiVisibility: Rag;
  gbp: Rag;
  website: Rag;
  reviews: Rag;
  directory: Rag;
  headline: string;
}

// ---------------------------------------------------------------------------
// Bundled gathered data
// ---------------------------------------------------------------------------

export interface GatheredData {
  input: CheckInput;
  prompts: string[];
  perplexity: EngineResult;
  openai: EngineResult;
  gemini: EngineResult;
  places: PlacesResult;
  website: WebsiteResult;
  pagespeed: PageSpeedResult;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TRADE_URGENT_JOBS: Record<string, string> = {
  plumber: "burst pipe",
  plumbing: "burst pipe",
  electrician: "power outage",
  electrical: "power outage",
  sparky: "power outage",
  sparkie: "power outage",
  hvac: "aircon not working",
  "air conditioning": "aircon not working",
  "air con": "aircon not working",
  aircon: "aircon not working",
  builder: "storm damage",
  building: "storm damage",
  roofer: "roof leak",
  roofing: "roof leak",
  locksmith: "locked out",
  pest: "pest infestation",
  "pest control": "pest infestation",
  cleaner: "flood cleanup",
  cleaning: "flood cleanup",
  tiler: "urgent tile repair",
  tiling: "urgent tile repair",
  painter: "urgent paint job",
  painting: "urgent paint job",
  landscaper: "storm garden damage",
  landscaping: "storm garden damage",
};

/**
 * Returns a sensible urgent-job phrase for a given trade.
 * Falls back to "urgent job" if the trade isn't in the map.
 */
export function defaultUrgentJob(trade: string): string {
  const key = trade.toLowerCase().trim();
  return TRADE_URGENT_JOBS[key] ?? "urgent job";
}
