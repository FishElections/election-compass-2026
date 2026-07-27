import { Locale } from "@/i18n/config";
import { quickStanceTopicIdsCore } from "./core";
import { quickStanceLabelsHe } from "./he";

export const quickStanceTopicIds: string[] = quickStanceTopicIdsCore;

const labelsByLocale: Record<Locale, typeof quickStanceLabelsHe> = {
  he: quickStanceLabelsHe,
};

export function getQuickStanceLabels(
  locale: Locale
): Record<string, { topic: string; proLabel: string; conLabel: string }> {
  const labels = labelsByLocale[locale];
  for (const id of quickStanceTopicIdsCore) {
    if (!labels[id]) throw new Error(`Missing ${locale} quick-stance labels for "${id}"`);
  }
  return labels;
}
