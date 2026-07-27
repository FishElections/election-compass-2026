import type { MetadataRoute } from "next";
import { partiesCore } from "@/data/parties/core";
import { getSiteUrl } from "@/utils/site";

// /results and /news are intentionally excluded: /results is a personalized,
// query-param-driven share page (see its own noindex metadata) and /news is
// a placeholder page with no real content yet.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/quiz`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/how-it-works`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/platforms`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/hot-topics`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/challenge`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const partyRoutes: MetadataRoute.Sitemap = partiesCore.map((party) => ({
    url: `${siteUrl}/parties/${party.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...partyRoutes];
}
