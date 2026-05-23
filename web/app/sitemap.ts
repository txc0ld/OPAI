import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

const BASE_URL = BUSINESS.url;

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/ai-integration-services/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-agents-for-business/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-agent-hosting/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ai-training-for-business/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/perth-ai-consultant/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/book-ai-audit/", changeFrequency: "monthly", priority: 0.95 },
  { path: "/industries/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/ai-for-accounting-firms/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-real-estate-agencies/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-trades-businesses/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-health-clinics/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-law-firms/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/ai-for-ecommerce-businesses/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/legal/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
