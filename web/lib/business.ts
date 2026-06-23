// Single source of truth for brand and contact details.
// Optional fields are omitted from schema until the operator supplies them.

export const emails = {
  team: "team@operateai.com.au",
  hello: "hello@operateai.com.au",
  legal: "legal@operateai.com.au",
  privacy: "privacy@operateai.com.au",
} as const;

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://www.operateai.com.au",
  email: "team@operateai.com.au",
  telephone: undefined as string | undefined,
  abn: "ABN 51 559 921 362",
  tagline: "Get your local business found, recommended and booked by AI.",
  description:
    "When someone asks AI for a good business in Perth, it names two or three. OperateAI gets Perth local service businesses onto that shortlist and ready for the day AI starts booking the work.",
  address: {
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: ["Perth", "Western Australia"],
  sameAs: [] as string[],
  founded: "2026",
  copyrightYear: 2026,
} as const;

export const NAV_LABELS = {
  howItWorks: "How it works",
  articles: "Articles",
  about: "About",
  check: "Free AI Check",
} as const;
