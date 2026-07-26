/**
 * Single source of truth for supported locales. `dir` and defaults are read
 * from here everywhere (proxy, layout, switcher, calculator, OG route) — never
 * hardcoded as `locale === "he"` — so adding a locale (e.g. Arabic, also RTL)
 * is a one-line addition here plus its dictionary/data files, not a rewrite.
 */
export type Locale = "he"; // add "en", later "ar", here — nothing else changes

export interface LocaleConfig {
  code: Locale;
  dir: "ltr" | "rtl";
  /** Switcher label, written in that locale's own script. */
  label: string;
  isDefault?: boolean;
}

export const locales: LocaleConfig[] = [
  { code: "he", dir: "rtl", label: "עברית", isDefault: true },
];

export const defaultLocale: Locale = locales.find((l) => l.isDefault)!.code;

const localeCodes = new Set<string>(locales.map((l) => l.code));

export function isLocale(value: string): value is Locale {
  return localeCodes.has(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locales.find((l) => l.code === locale)!.dir;
}
