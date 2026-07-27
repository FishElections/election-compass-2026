import { Locale } from "@/i18n/config";
import { PlatformTopicKey } from "@/types";
import { platformTopicsCore } from "./core";
import { platformTopicLabelsHe } from "./he";

export interface PlatformTopicMeta {
  key: PlatformTopicKey;
  label: string;
  icon: string;
}

const labelsByLocale: Record<Locale, typeof platformTopicLabelsHe> = {
  he: platformTopicLabelsHe,
};

export function getPlatformTopics(locale: Locale): PlatformTopicMeta[] {
  const labels = labelsByLocale[locale];
  return platformTopicsCore.map((t) => {
    const label = labels[t.key];
    if (!label) throw new Error(`Missing ${locale} label for platform topic "${t.key}"`);
    return { key: t.key, icon: t.icon, label };
  });
}
