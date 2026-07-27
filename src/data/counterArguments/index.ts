import { Locale } from "@/i18n/config";
import { SteelmanArgument } from "@/types";
import { counterArgumentsCore } from "./core";
import { counterArgumentsTextHe } from "./he";
import { counterArgumentsTextEn } from "./en";

const textByLocale: Record<Locale, typeof counterArgumentsTextHe> = {
  he: counterArgumentsTextHe,
  en: counterArgumentsTextEn,
};

export function getCounterArguments(locale: Locale): SteelmanArgument[] {
  const text = textByLocale[locale];
  return counterArgumentsCore.map((c) => {
    const t = text[c.id];
    if (!t) throw new Error(`Missing ${locale} text for counter-argument "${c.id}"`);
    return { id: c.id, ...t };
  });
}
