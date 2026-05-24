// Single source of truth for brand and contact details.
// All TODO(operator) markers must be filled before public launch.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://operateai.com.au",
  email: "team@operateai.com.au",
  telephone: "TODO(operator): +61 ...",
  abn: "ABN 51 559 921 362",
  tagline:
    "AI agents, automation, hosting and training for Australian businesses. Built in Perth. Delivered online worldwide.",
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
  sameAs: [
    "TODO(operator): https://www.linkedin.com/company/operateai",
    "TODO(operator): https://x.com/operateai",
  ],
  founded: "2026",
  copyrightYear: 2026,
} as const;

export const NAV_LABELS = {
  services: "Services",
  industries: "Industries",
  perth: "Perth",
  bookAudit: "Book audit",
} as const;
