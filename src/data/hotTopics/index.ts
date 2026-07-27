import { Locale } from "@/i18n/config";
import { Topic } from "@/types";
import { topicsCore, topicCategories, categoryIcons } from "./core";
import { topicsTextHe, categoryLabelsHe } from "./he";
import { topicsTextEn, categoryLabelsEn } from "./en";

export { topicCategories, categoryIcons };

const topicsTextByLocale: Record<Locale, typeof topicsTextHe> = {
  he: topicsTextHe,
  en: topicsTextEn,
};
const categoryLabelsByLocale: Record<Locale, Record<string, string>> = {
  he: categoryLabelsHe,
  en: categoryLabelsEn,
};

export function getHotTopics(locale: Locale): Topic[] {
  const text = topicsTextByLocale[locale];
  return topicsCore.map((topicCore) => {
    const t = text[topicCore.id];
    if (!t) throw new Error(`Missing ${locale} text for topic "${topicCore.id}"`);
    return {
      id: topicCore.id,
      category: topicCore.category,
      title: t.title,
      hook: t.hook,
      simpleExplanation: t.simpleExplanation,
      whyControversial: t.whyControversial,
      keyTerm: t.keyTerm,
      argumentsFor: t.argumentsFor,
      argumentsAgainst: t.argumentsAgainst,
      funFact: t.funFact,
      partyStancesSummary: topicCore.partyStancesSummary,
      relatedQuestionId: topicCore.relatedQuestionId,
    };
  });
}

export function getCategoryLabels(locale: Locale): Record<string, string> {
  return categoryLabelsByLocale[locale];
}
