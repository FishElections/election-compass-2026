import { Locale } from "@/i18n/config";
import { LikertOption } from "@/types";
import { likertOptionsCore } from "./core";
import { likertLabelsHe } from "./he";

const labelsByLocale: Record<Locale, typeof likertLabelsHe> = {
  he: likertLabelsHe,
};

export function getLikertOptions(locale: Locale): LikertOption[] {
  const labels = labelsByLocale[locale];
  return likertOptionsCore.map((o) => {
    const label = labels[String(o.value)];
    if (!label) throw new Error(`Missing ${locale} likert label for value "${o.value}"`);
    return { value: o.value, label };
  });
}
