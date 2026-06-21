// Single source of truth for brand and contact details.
// Optional fields are omitted from schema until the operator supplies them.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://www.operateai.com.au",
  email: "hello@operateai.com.au",
  telephone: undefined as string | undefined,
  abn: "ABN 51 559 921 362",
  tagline: "Get your trade business found, recommended and booked by AI.",
  description:
    "When a Perth homeowner asks AI for a good tradie, it names two or three businesses. OperateAI gets WA trade businesses onto that shortlist and ready for the day AI starts booking the jobs.",
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
