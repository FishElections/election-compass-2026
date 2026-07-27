import { locales, localizedPath, type Locale } from "./config";

/**
 * Builds `alternates` for a page's `generateMetadata`: the canonical must
 * point at *this* locale's own URL (not always the bare/Hebrew path), plus
 * `languages` cross-linking every registered locale — grows for free when a
 * locale (e.g. Arabic) is added to `locales`.
 */
export function alternatesFor(lang: Locale, barePath: string) {
  return {
    canonical: localizedPath(barePath, lang),
    languages: Object.fromEntries(
      locales.map((l) => [l.code, localizedPath(barePath, l.code)])
    ),
  };
}
