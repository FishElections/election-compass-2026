import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

// Non-default locales are reached via an explicit prefix (e.g. /en/...).
// The default locale (Hebrew) stays unprefixed at "/" for SEO continuity with
// already-indexed URLs — bare paths are rewritten internally to /he/... so the
// browser's address bar and canonical URL never show the prefix.
const explicitPrefixes = locales
  .filter((l) => !l.isDefault)
  .map((l) => `/${l.code}`);
const defaultPrefix = `/${defaultLocale}`;

function startsWithSegment(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A visitor hitting the default locale's own prefix directly (e.g. /he or
  // /he/quiz) would otherwise get double-prefixed below (/he/he/quiz) — send
  // them to the canonical unprefixed URL instead, so there's exactly one
  // indexable URL per page.
  if (startsWithSegment(pathname, defaultPrefix)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasExplicitLocale = explicitPrefixes.some((prefix) =>
    startsWithSegment(pathname, prefix)
  );
  if (hasExplicitLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `${defaultPrefix}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip framework internals, route handlers (incl. /api/og), and any request
  // for a file with an extension (robots.txt, sitemap.xml, icon.svg, ...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
