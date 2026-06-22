/**
 * src/triage.ts
 *
 * Computes a Red/Amber/Green triage across five dimensions based on the
 * gathered data. Rules are heuristic and documented inline. All thresholds are
 * deliberate starting points — adjust after reviewing real check results.
 */

import type { GatheredData, Triage, Rag } from "./types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if the engine answered a prompt and the business name appears
 * in the answer text (case-insensitive).
 */
function engineMentionsBusiness(answerText: string, businessName: string): boolean {
  return answerText.toLowerCase().includes(businessName.toLowerCase());
}

/**
 * Parses a "relativePublishTimeDescription" string like "2 months ago",
 * "1 week ago", "3 days ago" into an approximate age in days.
 * Returns null if it can't parse.
 */
function parseRelativeAge(when: string | null): number | null {
  if (!when) return null;
  const s = when.toLowerCase();
  const match = s.match(/(\d+)\s+(day|week|month|year)/);
  if (!match) return null;
  const n = parseInt(match[1], 10);
  switch (match[2]) {
    case "day":   return n;
    case "week":  return n * 7;
    case "month": return n * 30;
    case "year":  return n * 365;
    default:      return null;
  }
}

// ---------------------------------------------------------------------------
// Dimension scorers
// ---------------------------------------------------------------------------

/**
 * AI Visibility — are the recommendation prompts returning this business?
 *
 * Rules:
 *   G: business name found in ≥2 engines' recommendation answers
 *   A: business name found in exactly 1 engine, OR only appears in the
 *      reviews-specific prompt answer
 *   R: absent everywhere (or no engines ran, but that case flags in headline)
 */
function scoreAiVisibility(data: GatheredData): { rag: Rag; detail: string } {
  const businessLower = data.input.business.toLowerCase();

  // Identify the "reviews" prompt by index — it's the last prompt (index 4).
  // Recommendation prompts are indices 0–3.
  const recommendationIndices = [0, 1, 2, 3];

  const engines = [data.perplexity, data.openai, data.gemini];
  const availableEngines = engines.filter((e) => e.available);

  if (availableEngines.length === 0) {
    // No engines ran — can't score properly, use amber.
    return { rag: "A", detail: "no AI engines ran — couldn't check automatically" };
  }

  let enginesWithMatch = 0;
  let onlyInReviews = false;

  for (const engine of availableEngines) {
    const recAnswers = recommendationIndices
      .map((i) => engine.answers[i]?.text ?? "")
      .join(" ");
    const reviewAnswer = engine.answers[4]?.text ?? "";

    const inRec = engineMentionsBusiness(recAnswers, businessLower);
    const inReview = engineMentionsBusiness(reviewAnswer, businessLower);

    if (inRec) {
      enginesWithMatch++;
    } else if (!inRec && inReview) {
      // Found only in the reviews prompt, not in recommendations.
      onlyInReviews = true;
    }
  }

  if (enginesWithMatch >= 2) {
    return { rag: "G", detail: `named by ${enginesWithMatch} engines in recommendation results` };
  } else if (enginesWithMatch === 1) {
    return { rag: "A", detail: "named by 1 engine in recommendations" };
  } else if (onlyInReviews) {
    return { rag: "A", detail: "appears in review search results but not recommendation results" };
  } else {
    return { rag: "R", detail: "not named by any AI engine in recommendation results" };
  }
}

/**
 * GBP (Google Business Profile) — based on Places data.
 *
 * Rules:
 *   R: Places unavailable, OR no website, OR no opening hours, OR <10 reviews
 *   A: Some gaps — e.g. <30 reviews OR no photos
 *   G: website + hours + ≥30 reviews
 */
function scoreGbp(data: GatheredData): { rag: Rag; detail: string } {
  const p = data.places;

  if (!p.available || !p.data) {
    return { rag: "R", detail: "no Google Business Profile found (or Places API not checked)" };
  }

  const d = p.data;
  const reviewCount = d.reviewCount ?? 0;
  const hasWebsite = !!d.website;
  const hasHours = d.hasHours;
  const hasPhotos = d.photoCount > 0;

  if (!hasWebsite || !hasHours || reviewCount < 10) {
    const missing: string[] = [];
    if (!hasWebsite) missing.push("no website linked");
    if (!hasHours) missing.push("no opening hours");
    if (reviewCount < 10) missing.push(`only ${reviewCount} reviews`);
    return { rag: "R", detail: missing.join(", ") };
  }

  if (reviewCount < 30 || !hasPhotos) {
    const gaps: string[] = [];
    if (reviewCount < 30) gaps.push(`${reviewCount} reviews (aim for 30+)`);
    if (!hasPhotos) gaps.push("no photos");
    return { rag: "A", detail: gaps.join(", ") };
  }

  return { rag: "G", detail: `website linked, hours set, ${reviewCount} reviews, ${d.photoCount} photos` };
}

/**
 * Website — based on website fetch + pagespeed.
 *
 * Rules:
 *   R: no URL, unreachable, or no plain-text content (no price / no suburb)
 *   A: reachable but missing price text OR suburb mention
 *   G: reachable + hasPriceText + mentionsSuburb
 *      (PageSpeed < 0.5 nudges G→A, A→R)
 */
function scoreWebsite(data: GatheredData): { rag: Rag; detail: string } {
  const w = data.website;
  const ps = data.pagespeed;

  if (!w.available || w.reachable === false) {
    const note = w.note ?? "website not reachable";
    return { rag: "R", detail: note };
  }

  const slowPenalty = ps.available && ps.performance !== undefined && ps.performance < 0.5;
  const slowNote = slowPenalty ? ` (mobile performance score ${Math.round((ps.performance ?? 0) * 100)}%)` : "";

  if (w.hasPriceText && w.mentionsSuburb) {
    if (slowPenalty) {
      return { rag: "A", detail: `content looks good but site is slow on mobile${slowNote}` };
    }
    return { rag: "G", detail: "reachable, mentions suburb, has price information" };
  }

  const missing: string[] = [];
  if (!w.hasPriceText) missing.push("no pricing visible");
  if (!w.mentionsSuburb) missing.push("suburb not mentioned");

  if (slowPenalty) {
    // Slow + missing content signals = Red.
    missing.push(`slow on mobile${slowNote}`);
    return { rag: "R", detail: missing.join(", ") };
  }

  return { rag: "A", detail: missing.join(", ") };
}

/**
 * Reviews — from Places review count + recency.
 *
 * Rules:
 *   R: <10 reviews, OR newest review older than ~180 days
 *   A: 10–40 reviews, OR newest review 30–180 days old
 *   G: >40 reviews AND newest review <30 days old
 */
function scoreReviews(data: GatheredData): { rag: Rag; detail: string } {
  const p = data.places;

  if (!p.available || !p.data) {
    return { rag: "R", detail: "couldn't check reviews — Google Places not available" };
  }

  const d = p.data;
  const reviewCount = d.reviewCount ?? 0;

  // Find the most recent review age in days.
  const ages = d.recentReviews
    .map((r) => parseRelativeAge(r.when))
    .filter((n): n is number => n !== null);
  const newestAgeDays = ages.length > 0 ? Math.min(...ages) : null;

  if (reviewCount < 10) {
    return { rag: "R", detail: `only ${reviewCount} reviews (need 10+)` };
  }

  if (newestAgeDays !== null && newestAgeDays > 180) {
    return {
      rag: "R",
      detail: `${reviewCount} reviews but newest is ~${Math.round(newestAgeDays / 30)} months old`,
    };
  }

  if (reviewCount <= 40 || (newestAgeDays !== null && newestAgeDays > 30)) {
    const parts: string[] = [];
    if (reviewCount <= 40) parts.push(`${reviewCount} reviews (aim for 40+)`);
    if (newestAgeDays !== null && newestAgeDays > 30) {
      parts.push(`newest review ~${Math.round(newestAgeDays / 30)} months ago`);
    }
    return { rag: "A", detail: parts.join(", ") };
  }

  const recencyNote = newestAgeDays !== null ? `, newest ~${newestAgeDays}d ago` : "";
  return { rag: "G", detail: `${reviewCount} reviews${recencyNote}` };
}

/**
 * Directory — always Amber; this is a manual check.
 * The report will flag it needs a manual verification.
 */
function scoreDirectory(): { rag: Rag; detail: string } {
  // Directory listings (Truelocal, Yellow Pages, Hipages, etc.) are not
  // accessible via a free/standard API, so this dimension is always marked
  // Amber to prompt a manual check by the operator.
  return { rag: "A", detail: "couldn't check automatically — worth a manual look" };
}

// ---------------------------------------------------------------------------
// Headline builder
// ---------------------------------------------------------------------------

const RAG_PRIORITY: Rag[] = ["R", "A", "G"];

const DIMENSION_LABELS: Record<keyof Omit<Triage, "headline">, string> = {
  aiVisibility: "AI visibility",
  gbp: "Google Business Profile",
  website: "website",
  reviews: "reviews",
  directory: "directory listings",
};

function buildHeadline(
  dims: Record<keyof Omit<Triage, "headline">, { rag: Rag; detail: string }>,
): string {
  // Priority order for worst-finding selection.
  const priorityOrder: (keyof Omit<Triage, "headline">)[] = [
    "aiVisibility",
    "gbp",
    "reviews",
    "website",
    "directory",
  ];

  for (const rag of RAG_PRIORITY) {
    if (rag === "G") break; // Only report on problems
    for (const dim of priorityOrder) {
      if (dims[dim].rag === rag) {
        return `${DIMENSION_LABELS[dim]}: ${dims[dim].detail}`;
      }
    }
  }

  // All green (or all amber with directory).
  return "Overall they look solid — focus on monitoring and maintaining what's working.";
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function computeTriage(data: GatheredData): Triage {
  const aiVisibility = scoreAiVisibility(data);
  const gbp = scoreGbp(data);
  const website = scoreWebsite(data);
  const reviews = scoreReviews(data);
  const directory = scoreDirectory();

  const dims = { aiVisibility, gbp, website, reviews, directory };
  const headline = buildHeadline(dims);

  return {
    aiVisibility: aiVisibility.rag,
    gbp: gbp.rag,
    website: website.rag,
    reviews: reviews.rag,
    directory: directory.rag,
    headline,
  };
}
