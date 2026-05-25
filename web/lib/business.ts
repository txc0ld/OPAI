// Single source of truth for brand and contact details.
// Optional fields are omitted from schema until the operator supplies them.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://www.operateai.com.au",
  email: "hello@operateai.com.au",
  telephone: undefined as string | undefined,
  abn: "ABN 51 559 921 362",
  tagline:
    "AI agents, automation, hosting and training for Australian businesses. Delivered online worldwide.",
  description:
    "OperateAI helps small and medium businesses try AI safely. From your first ChatGPT lesson to custom agents, automation, hosting and team training.",
  address: {
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  areaServed: [
    "Perth",
    "Western Australia",
    "Australia",
    "Worldwide (online)",
  ],
  sameAs: [] as string[],
  founded: "2026",
  copyrightYear: 2026,
} as const;

export const NAV_LABELS = {
  services: "Services",
  industries: "Industries",
  perth: "Perth",
  bookAudit: "Contact",
} as const;
