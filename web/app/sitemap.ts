import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/use-cases";

const BASE_URL = "https://operateai.com.au";

const MAIN_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/framework", changeFrequency: "monthly", priority: 0.8 },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.8 },
  { path: "/trust", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
];

const SEO_ROUTES: string[] = [
  "/seo/ai-agents-australian-smbs",
  "/seo/ai-lead-handling-trades",
  "/seo/ai-quote-automation-australia",
  "/seo/fractional-ai-operator",
  "/seo/secure-ai-agents-australia",
  "/seo/ai-operations-accountants",
  "/seo/ai-operations-mining-services",
  "/seo/ai-governance-small-business",
  "/seo/ai-inbox-automation",
  "/seo/ai-admin-automation-perth",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const main = MAIN_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const useCases = USE_CASES.map((uc) => ({
    url: `${BASE_URL}/use-cases/${uc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seo = SEO_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...main, ...useCases, ...seo];
}
