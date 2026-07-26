import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/utils/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /results carries its own noindex meta tag (per-share, driven by query
      // params) — deliberately not disallowed here, otherwise crawlers could
      // never reach that tag and might index a bare, snippet-less URL instead.
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
