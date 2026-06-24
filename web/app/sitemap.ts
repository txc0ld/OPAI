import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { getArticleSlugs } from "@/lib/articles";
import { TRADES, allPairs } from "@/lib/programmatic";
import { getEntry, isIndexable } from "@/content/programmatic/entries";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const staticRoutes = [
    "/", "/check/", "/ioagent/", "/websites/", "/done-for-you/", "/how-it-works/",
    "/articles/", "/about/", "/contact/", "/legal/privacy/", "/legal/terms/", "/ai-visibility/",
  ];
  const tradeHubs = TRADES.map((t) => `/ai-visibility/${t.slug}/`);
  const leaves = allPairs()
    .filter(({ trade, suburb }) => isIndexable(getEntry(trade.slug, suburb.slug)))
    .map(({ trade, suburb }) => `/ai-visibility/${trade.slug}/${suburb.slug}/`);
  const articleRoutes = getArticleSlugs().map((slug) => `/articles/${slug}/`);

  return [...staticRoutes, ...tradeHubs, ...leaves, ...articleRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" || route === "/check/" ? 1 : 0.7,
  }));
}
