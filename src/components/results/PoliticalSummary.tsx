"use client";

import { useMemo } from "react";
import { Compass } from "lucide-react";
import { computePoliticalProfile } from "@/utils/politicalSummary";
import { getCategories } from "@/data/questions";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { Party, UserAnswers } from "@/types";

interface PoliticalSummaryProps {
  answers: UserAnswers;
  parties: Party[];
  topPartyId?: string;
  topPartyName?: string;
}

export function PoliticalSummary({
  answers,
  parties,
  topPartyId,
  topPartyName,
}: PoliticalSummaryProps) {
  const { dict, locale } = useDictionary();
  const t = dict.results.summary;
  const categories = useMemo(() => getCategories(locale), [locale]);
  const profile = useMemo(
    () => computePoliticalProfile(answers, parties, topPartyId),
    [answers, parties, topPartyId]
  );

  if (profile.leans.length === 0) return null;

  const labelOf = (id: string) =>
    categories.find((c) => c.id === id)?.label ?? id;
  const order = categories.map((c) => c.id);
  const leans = [...profile.leans].sort(
    (a, b) => order.indexOf(a.category) - order.indexOf(b.category)
  );
  const topics = profile.topReasons.map(labelOf);

  return (
    <div className="mt-8 rounded-2xl border border-navy/15 bg-navy/[0.03] p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Compass className="h-5 w-5 shrink-0 text-sapphire" />
        <h2 className="font-bold text-navy">{t.title}</h2>
      </div>

      <ul className="flex flex-col gap-2">
        {leans.map(({ category, lean }) => (
          <li
            key={category}
            className="flex items-center justify-between gap-3 border-b border-navy/5 pb-2 last:border-0 last:pb-0"
          >
            <span className="text-sm text-gray-dark">{labelOf(category)}</span>
            <span className="text-sm font-semibold text-navy">
              {t.lean[lean]}
            </span>
          </li>
        ))}
      </ul>

      {topics.length > 0 && topPartyName && (
        <p className="mt-4 leading-relaxed text-navy">
          {t.topMatch
            .replace("{party}", topPartyName)
            .replace("{topics}", topics.join(t.topicsJoin))}
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-gray-dark">
        {t.disclaimer}
      </p>
    </div>
  );
}
