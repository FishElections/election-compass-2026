/**
 * Single source of truth for supported locales. `dir` and defaults are read
 * from here everywhere (proxy, layout, switcher, calculator, OG route) — never
 * hardcoded as `locale === "he"` — so adding a locale (e.g. Arabic, also RTL)
 * is a one-line addition here plus its dictionary/data files, not a rewrite.
 */
export type Locale = "he" | "en" | "ar";

export interface LocaleConfig {
  code: Locale;
  dir: "ltr" | "rtl";
  /** Switcher label, written in that locale's own script. */
  label: string;
  /** BCP-47-ish locale tag for og:locale / Intl formatting, e.g. "he_IL". */
  ogLocale: string;
  isDefault?: boolean;
}

export const locales: LocaleConfig[] = [
  { code: "he", dir: "rtl", label: "עברית", ogLocale: "he_IL", isDefault: true },
  { code: "en", dir: "ltr", label: "English", ogLocale: "en_US" },
  { code: "ar", dir: "rtl", label: "العربية", ogLocale: "ar_AR" },
];

export const defaultLocale: Locale = locales.find((l) => l.isDefault)!.code;

const localeCodes = new Set<string>(locales.map((l) => l.code));

export function isLocale(value: string): value is Locale {
  return localeCodes.has(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locales.find((l) => l.code === locale)!.dir;
}

export function ogLocaleFor(locale: Locale): string {
  return locales.find((l) => l.code === locale)!.ogLocale;
}

/** Strips a leading non-default-locale prefix (e.g. "/en") from a pathname,
 *  returning the bare path every locale's version is built from. */
export function pathWithoutLocale(pathname: string): string {
  for (const l of locales) {
    if (l.isDefault) continue;
    const prefix = `/${l.code}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

/** The current page's URL in another locale — the default locale gets the
 *  bare path, any other locale gets it prefixed. Used by the language
 *  switcher so switching locale keeps you on the same page. */
export function localizedPath(pathname: string, target: Locale): string {
  const bare = pathWithoutLocale(pathname);
  const targetConfig = locales.find((l) => l.code === target)!;
  if (targetConfig.isDefault) return bare;
  return `/${target}${bare === "/" ? "" : bare}`;
}
