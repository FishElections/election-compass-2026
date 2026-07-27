import type { MetadataRoute } from "next";
import { partiesCore } from "@/data/parties/core";
import { getSiteUrl } from "@/utils/site";
import { locales } from "@/i18n/config";

// /results and /news are intentionally excluded: /results is a personalized,
// query-param-driven share page (see its own noindex metadata) and /news is
// a placeholder page with no real content yet.

// Every entry is generated once per bare path and once per registered
// locale, with `alternates.languages` cross-linking the lot — adding a
// locale to `locales` (e.g. Arabic) grows the sitemap for free.
function localizedEntries(
  barePath: string,
  siteUrl: string,
  rest: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [
      l.code,
      `${siteUrl}${l.isDefault ? barePath : `/${l.code}${barePath === "/" ? "" : barePath}`}`,
    ])
  );

  return locales.map((l) => ({
    url: l.isDefault ? `${siteUrl}${barePath}` : `${siteUrl}/${l.code}${barePath === "/" ? "" : barePath}`,
    alternates: { languages },
    ...rest,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticPaths: Array<[string, MetadataRoute.Sitemap[number]["changeFrequency"], number]> = [
    ["/", "weekly", 1],
    ["/quiz", "monthly", 0.9],
    ["/how-it-works", "monthly", 0.7],
    ["/platforms", "weekly", 0.8],
    ["/hot-topics", "weekly", 0.7],
    ["/challenge", "monthly", 0.6],
    ["/about", "monthly", 0.5],
  ];

  const staticRoutes = staticPaths.flatMap(([path, changeFrequency, priority]) =>
    localizedEntries(path, siteUrl, { lastModified, changeFrequency, priority })
  );

  const partyRoutes = partiesCore.flatMap((party) =>
    localizedEntries(`/parties/${party.id}`, siteUrl, {
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...partyRoutes];
}
