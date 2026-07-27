import { Locale } from "@/i18n/config";
import { Category, Question, QuestionMoreInfo } from "@/types";
import { categoriesCore, questionsCore } from "./core";
import { categoryLabelsHe, questionsTextHe } from "./he";

const categoryLabelsByLocale: Record<Locale, Record<string, string>> = {
  he: categoryLabelsHe,
};
const questionsTextByLocale: Record<
  Locale,
  Record<string, { text: string; moreInfo: QuestionMoreInfo }>
> = { he: questionsTextHe };

export function getCategories(locale: Locale): Category[] {
  const labels = categoryLabelsByLocale[locale];
  return categoriesCore.map((c) => {
    const label = labels[c.id];
    if (!label) throw new Error(`Missing ${locale} label for category "${c.id}"`);
    return { id: c.id, icon: c.icon, label };
  });
}

export function getQuestions(locale: Locale): Question[] {
  const text = questionsTextByLocale[locale];
  return questionsCore.map((q) => {
    const t = text[q.id];
    if (!t) throw new Error(`Missing ${locale} text for question "${q.id}"`);
    return {
      id: q.id,
      category: q.category,
      isShort: q.isShort,
      text: t.text,
      moreInfo: t.moreInfo,
    };
  });
}

export function getShortQuestions(locale: Locale): Question[] {
  return getQuestions(locale).filter((q) => q.isShort);
}
