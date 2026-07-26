// Shared with layout.tsx, sitemap.ts and robots.ts so they all resolve the
// same public origin. Read at request time (not a NEXT_PUBLIC_ var, so it is
// NOT inlined at build) — lets `docker run -e SITE_URL=…` set the public
// origin without rebuilding.
export function getSiteUrl(): string {
  return (
    process.env.SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}
