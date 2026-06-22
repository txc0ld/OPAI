/**
 * src/gather/website.ts
 *
 * Fetches the business website and analyses basic content signals.
 * Returns unavailable (not an error) if no URL was supplied.
 */

import type { WebsiteResult } from "../types.js";

/**
 * Strips HTML tags from a string, returning plain text.
 */
function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function gatherWebsite(url?: string, suburb?: string): Promise<WebsiteResult> {
  if (!url) {
    return {
      available: false,
      note: "no website supplied",
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    let html: string;
    let reachable: boolean;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AAO-CheckCLI/0.1)",
        },
      });
      clearTimeout(timeout);
      reachable = response.ok;
      html = reachable ? await response.text() : "";
    } catch (fetchErr) {
      clearTimeout(timeout);
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      return {
        available: true,
        reachable: false,
        note: `fetch failed: ${msg}`,
        hasPriceText: false,
        mentionsSuburb: false,
        textLength: 0,
        looksImageHeavy: false,
      };
    }

    if (!reachable) {
      return {
        available: true,
        reachable: false,
        hasPriceText: false,
        mentionsSuburb: false,
        textLength: 0,
        looksImageHeavy: false,
      };
    }

    const plainText = stripTags(html);
    const textLength = plainText.length;

    // Check for price indicators (dollar amounts).
    const hasPriceText = /\$\s?\d/.test(plainText);

    // Check if the suburb is mentioned anywhere in the plain text (case-insensitive).
    const mentionsSuburb = suburb
      ? plainText.toLowerCase().includes(suburb.toLowerCase())
      : false;

    // Rough heuristic: if the page has lots of <img> tags but sparse text,
    // it's probably image-heavy with little readable content.
    const imgCount = (html.match(/<img[\s>]/gi) ?? []).length;
    const looksImageHeavy = imgCount > 5 && textLength < 500;

    return {
      available: true,
      reachable: true,
      hasPriceText,
      mentionsSuburb,
      textLength,
      looksImageHeavy,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      available: true,
      reachable: false,
      note: `unexpected error: ${msg}`,
      hasPriceText: false,
      mentionsSuburb: false,
      textLength: 0,
      looksImageHeavy: false,
    };
  }
}
