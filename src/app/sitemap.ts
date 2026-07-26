import type { MetadataRoute } from "next";
import { parties } from "@/data/parties";
import { getSiteUrl } from "@/utils/site";

// /results and /news are intentionally excluded: /results is a personalized,
// query-param-driven share page (see its own noindex metadata) and /news is
// a placeholder page with no real content yet.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/quiz`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/how-it-works`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/platforms`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/hot-topics`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/challenge`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const partyRoutes: MetadataRoute.Sitemap = parties.map((party) => ({
    url: `${siteUrl}/parties/${party.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...partyRoutes];
}
