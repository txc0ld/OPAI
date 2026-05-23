// Single source of truth for brand and contact details.
// All TODO(operator) markers must be filled before public launch.

export const BUSINESS = {
  name: "OperateAI",
  legalName: "Operate AI - by Fantom Labs Tech",
  url: "https://operateai.com.au",
  email: "TODO(operator): hello@operateai.com.au",
  telephone: "TODO(operator): +61 ...",
  abn: "TODO(operator): ABN ## ### ### ###",
  tagline:
    "AI agents, automation, hosting and training for Australian businesses. Built in Perth. Delivered online worldwide.",
  description:
    "OperateAI helps small and medium businesses integrate practical AI into daily operations — AI agents, workflow automation, staff training, and managed AI agent hosting.",
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
