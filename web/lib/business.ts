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
    stripeUrl: "https://buy.stripe.com/aFa5kCdBjbxh4ux6qa8og00",
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
    stripeUrl: "https://buy.stripe.com/fZuaEW54NcBl5yB4i28og01",
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
    stripeUrl: "https://buy.stripe.com/4gM14mdBj8l54ux7ue8og02",
  },
];

// iOAgent subscription plans (priced by how many agents you run).
export type AgentPlan = {
  id: string;
  name: string;
  agents: number;
  pricePerMonth: number; // AUD per month
  blurb: string;
  stripeUrl?: string; // Stripe subscription Payment Link; "" = book-a-call fallback
  featured?: boolean;
};

// Shared inclusions across every iOAgent plan. PLACEHOLDER copy — edit freely.
export const IOAGENT_INCLUDES = [
  "Unlimited usage, no per-task fees",
  "24/7 monitoring",
  "GPT-5.5 Pro subscription included",
  "Built and set up for you",
  "Proof-of-work reporting",
  "You approve before it acts",
  "Cancel anytime",
] as const;

// PLACEHOLDER prices — edit here, and paste each tier's Stripe subscription
// Payment Link into stripeUrl. Empty stripeUrl falls back to a book-a-call CTA.
export const IOAGENT_PLANS: AgentPlan[] = [
  {
    id: "solo",
    name: "Solo",
    agents: 1,
    pricePerMonth: 999,
    blurb: "One always-on agent on your biggest time-sink.",
    stripeUrl: "https://buy.stripe.com/9B6fZg40J7h1aSV29U8og03",
    featured: true,
  },
  {
    id: "team",
    name: "Team",
    agents: 3,
    pricePerMonth: 2900,
    blurb: "Three agents across your busiest workflows.",
    stripeUrl: "https://buy.stripe.com/00w3cugNv58T6CF4i28og04",
  },
  {
    id: "fleet",
    name: "Fleet",
    agents: 5,
    pricePerMonth: 5750,
    blurb: "A full fleet running the repetitive work end to end.",
    stripeUrl: "https://buy.stripe.com/3cI28q68R1WH0eh7ue8og05",
  },
];

