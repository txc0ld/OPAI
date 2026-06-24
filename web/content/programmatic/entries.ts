// Reviewed, committed content for each trade x suburb page.
// AI snapshots are produced by real check runs (offline), reviewed, and dated.
// A page is only indexable when isIndexable() is true (see Task: quality gate).
export type AiSnapshot = {
  summary: string; // what AI says about this trade in this suburb right now
  capturedOn: string; // ISO date the snapshot was captured
  source: string; // e.g. "ChatGPT (web search), Perplexity"
};

export type StatCite = {
  claim: string;
  source: string;
  date: string;
};

export type Entry = {
  intro: string;
  whatAIChecks: string[];
  exampleQueries: string[];
  faqs: { q: string; a: string }[];
  aiSnapshot?: AiSnapshot;
  stats?: StatCite[];
};

export const ENTRIES: Record<string, Entry> = {
  "plumbers/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for a good plumber, it names two or three by reading Google Business Profiles, reviews and plain-text websites. If your details are messy or stuck in images, AI skips you and recommends the plumber whose information it can actually read.",
    whatAIChecks: [
      "A complete Google Business Profile with every plumbing service listed as plain text, not buried in photos.",
      "Recent, replied-to reviews that mention Subiaco and nearby suburbs.",
      "A website that states your services, callout area and 'from' pricing in words AI can parse.",
    ],
    exampleQueries: [
      "Who's a good emergency plumber in Subiaco who can come today?",
      "Best plumber near Subiaco for a hot water system replacement?",
      "Reliable plumber in Subiaco for a bathroom renovation?",
    ],
    faqs: [
      {
        q: "How do plumbers in Subiaco get recommended by AI?",
        a: "AI recommends the plumbers whose Google Business Profile, reviews and website are the clearest and most complete. Plain-text services, an accurate service area and recent replied-to reviews are the biggest levers.",
      },
      {
        q: "Why isn't my Subiaco plumbing business showing up in ChatGPT?",
        a: "Usually because your services or pricing are locked in images or PDFs, your Google Business Profile is incomplete, or your reviews are thin. AI can't read what isn't plain text, so it recommends a competitor it can.",
      },
      {
        q: "How long does it take to improve AI visibility?",
        a: "Profile and website fixes can be read by AI within days to a few weeks. Review depth builds over a couple of months. Start with the Google Business Profile.",
      },
    ],
    // aiSnapshot + stats are added in Task 11 from a real check run. Until then this page is noindex.
  },
};

export function getEntry(tradeSlug: string, suburbSlug: string): Entry | undefined {
  return ENTRIES[`${tradeSlug}/${suburbSlug}`];
}

// Quality gate: a page is indexable only when it has original data (aiSnapshot)
// and all core editorial fields. Prevents shipping thin pages by accident.
export function isIndexable(entry: Entry | undefined): boolean {
  return Boolean(
    entry &&
      entry.aiSnapshot &&
      entry.aiSnapshot.summary.trim().length > 0 &&
      entry.intro.trim().length > 0 &&
      entry.whatAIChecks.length > 0 &&
      entry.faqs.length > 0,
  );
}
