/**
 * src/gather/pagespeed.ts
 *
 * Fetches the Google PageSpeed Insights score (mobile) for a URL.
 * Gracefully skips if no URL was supplied or GOOGLE_MAPS_API_KEY is not set
 * (the same key is used for the PageSpeed API).
 */

import { ENV } from "../config.js";
import type { PageSpeedResult } from "../types.js";

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
    };
  };
}

export async function gatherPageSpeed(url?: string): Promise<PageSpeedResult> {
  if (!url) {
    return {
      available: false,
      note: "no website URL supplied",
    };
  }

  if (!ENV.google) {
    return {
      available: false,
      note: "GOOGLE_MAPS_API_KEY not set",
    };
  }

  try {
    const encoded = encodeURIComponent(url);
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encoded}&strategy=mobile&key=${ENV.google}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      return {
        available: false,
        note: `PageSpeed API error: HTTP ${response.status} ${response.statusText}`,
      };
    }

    const data = (await response.json()) as PageSpeedResponse;
    const score = data.lighthouseResult?.categories?.performance?.score;

    return {
      available: true,
      performance: score ?? undefined,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      available: false,
      note: `PageSpeed fetch error: ${msg}`,
    };
  }
}
