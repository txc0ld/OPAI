/**
 * web/lib/check/types.ts
 *
 * Plain-TypeScript types and helpers for the check pipeline.
 * No zod dependency — validation is handled in the API route.
 */

// ---------------------------------------------------------------------------
// Input type
// ---------------------------------------------------------------------------

export interface CheckInput {
  business: string;
  suburb: string;
  trade: string;
  url?: string;
  phone?: string;
  urgentJob?: string;
  specificJob?: string;
}

/** Normalise a user-supplied website: trim, and prepend https:// if no scheme. */
export function normalizeUrl(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Validate a CheckInput; returns an error string or null. */
export function validateCheckInput(
  raw: Record<string, unknown>,
): { input: CheckInput; error: null } | { input: null; error: string } {
  const business = typeof raw.business === "string" ? raw.business.trim() : "";
  const suburb = typeof raw.suburb === "string" ? raw.suburb.trim() : "";
  const trade = typeof raw.trade === "string" ? raw.trade.trim() : "";
  if (!business) return { input: null, error: "business name is required" };
  if (!suburb) return { input: null, error: "suburb is required" };
  if (!trade) return { input: null, error: "trade is required" };

  return {
    input: {
      business,
      suburb,
      trade,
      url: normalizeUrl(raw.url),
      phone: typeof raw.phone === "string" && raw.phone.trim() ? raw.phone.trim() : undefined,
      urgentJob:
        typeof raw.urgentJob === "string" && raw.urgentJob.trim() ? raw.urgentJob.trim() : undefined,
      specificJob:
        typeof raw.specificJob === "string" && raw.specificJob.trim()
          ? raw.specificJob.trim()
          : undefined,
    },
    error: null,
  };
}

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

// Emergency phrasing for trades where an urgent callout genuinely makes sense.
// Substring match (so free-text like "plumbing", "gas fitter", "concrete
// polishing" all resolve), checked in order. Trades with no entry return
// undefined, and the prompt builder uses a non-emergency "book this week"
// phrasing instead.
const URGENT_JOBS: { match: string[]; job: string }[] = [
  { match: ["plumb"], job: "burst pipe" },
  { match: ["gas fit", "gasfit"], job: "gas leak" },
  { match: ["electric", "sparky", "sparkie"], job: "power outage" },
  { match: ["aircon", "air con", "air-con", "air conditioning", "hvac", "refrigeration"], job: "broken air conditioner" },
  { match: ["roof"], job: "roof leak" },
  { match: ["glaz", "glass"], job: "broken window" },
  { match: ["garage door", "roller door"], job: "stuck door" },
  { match: ["locksmith"], job: "lockout" },
  { match: ["pest", "termite"], job: "pest infestation" },
  { match: ["arborist", "tree lop", "tree remov", "tree surg"], job: "fallen tree" },
  { match: ["tow truck", "towing", "roadside"], job: "breakdown" },
  { match: ["fenc"], job: "storm-damaged fence" },
];

/**
 * Returns an urgent-job phrase for trades where an emergency callout makes
 * sense (substring match against the free-text trade). Returns undefined when
 * no emergency applies (e.g. barber, clinic) so the prompt builder can fall
 * back to a non-emergency immediacy phrasing.
 */
export function urgentJobFor(trade: string): string | undefined {
  const t = trade.toLowerCase().trim();
  for (const { match, job } of URGENT_JOBS) {
    if (match.some((m) => t.includes(m))) return job;
  }
  return undefined;
}
