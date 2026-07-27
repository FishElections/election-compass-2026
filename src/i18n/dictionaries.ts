import type { Locale } from "./config";
import type heDict from "@/dictionaries/he.json";

// The he.json shape is the canonical type every locale's dictionary must
// match — TypeScript will flag a missing/extra key in any other locale file
// against this shape, so a translator can't silently drop a key.
export type Dictionary = typeof heDict;

// Only ever called from server components (currently just the root layout).
// Client components never import this directly — they read the resolved
// dictionary through DictionaryProvider/useDictionary instead.
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  he: () => import("@/dictionaries/he.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
