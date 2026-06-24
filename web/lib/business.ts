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

// Done-for-you (always-on) service offering.
// NOTE: priceFrom + setup are PLACEHOLDERS — set the real numbers before deploy.
// This is the single place to edit them; they flow into the /done-for-you/ page.
export const DONE_FOR_YOU = {
  priceFrom: 490, // PLACEHOLDER — monthly, in AUD
  setup: 990, // PLACEHOLDER — one-off setup, in AUD
  currency: "AUD",
} as const;

// Website design packages (purchasable via Stripe Payment Links, deposit to start).
// PLACEHOLDERS — edit prices/features here, and paste each tier's Stripe Payment Link
// (the deposit charge) into `stripeUrl`. Until a stripeUrl is set, that card's button
// falls back to an enquiry CTA, so the page ships working before Stripe is wired.
export type WebsitePackage = {
  id: string;
  name: string;
  tagline: string;
  priceFrom: number; // full package price, AUD
  deposit: number; // charged now via the Stripe Payment Link, AUD
  blurb: string;
  features: string[];
  timeline: string;
  stripeUrl?: string; // Stripe Payment Link for the deposit; "" = enquiry fallback
  featured?: boolean;
};

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get online",
    priceFrom: 849,
    deposit: 425,
    blurb: "For sole traders and brand-new businesses that need a real presence, fast.",
    features: [
      "One-page site, built mobile-first",
      "AI-readable foundations: plain-text services, suburbs, schema",
      "Contact form and click-to-call",
      "Linked to your Google Business Profile",
    ],
    timeline: "Live in ~1 week",
    stripeUrl: "",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Get found",
    priceFrom: 1490,
    deposit: 745,
    blurb: "The one most local businesses need: found by customers and by AI.",
    features: [
      "Up to 5 pages, custom designed",
      "Professional copy written to be AI-readable",
      "Full AEO + schema so AI can read and recommend you",
      "Reviews system and Google Business Profile optimisation",
      "Enquiry form straight to your inbox",
    ],
    timeline: "Live in ~2–3 weeks",
    stripeUrl: "",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Get booked",
    priceFrom: 3490,
    deposit: 1745,
    blurb: "For multi-service and growing businesses ready to turn traffic into booked jobs.",
    features: [
      "Everything in Business, plus:",
      "Up to 10 pages across your services",
      "Booking or quote-request flow",
      "Advanced AEO and ongoing articles",
      "Integrations: CRM, calendar, payments",
      "60 days of post-launch support",
    ],
    timeline: "Live in ~4 weeks",
    stripeUrl: "",
  },
];

export const NAV_LABELS = {
  howItWorks: "How it works",
  articles: "Articles",
  about: "About",
  check: "Free AI Check",
} as const;
