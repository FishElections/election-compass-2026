/** The live public origin. Not a secret — it is in every canonical tag. */
const productionSiteUrl = "https://elections-il.com";

// Shared with layout.tsx, sitemap.ts and robots.ts so they all resolve the same
// public origin. SITE_URL still overrides everything (staging, preview envs),
// but the production domain is the baked-in default rather than localhost:
// a prod build that forgets the env var now emits correct canonicals and
// sitemap URLs instead of silently telling Google the site lives on localhost.
export function getSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Dev only, so OG/canonical URLs stay clickable against the local server.
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return productionSiteUrl;
}
