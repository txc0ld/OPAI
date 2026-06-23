import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { getArticleSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const staticRoutes = ["/", "/check/", "/agent-2-you/", "/done-for-you/", "/how-it-works/", "/articles/", "/about/", "/contact/", "/legal/privacy/", "/legal/terms/"];
  const articleRoutes = getArticleSlugs().map((slug) => `/articles/${slug}/`);
  return [...staticRoutes, ...articleRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" || route === "/check/" ? 1 : 0.7,
  }));
}
