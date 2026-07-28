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

const clamp = (n: number, lo = 0.08, hi = 0.92) => Math.min(hi, Math.max(lo, n));

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

  if (profile.macros.length === 0) return null;

  const labelOf = (id: string) =>
    categories.find((c) => c.id === id)?.label ?? id;
  const topics = profile.topReasons.map(labelOf);

  return (
    <div className="mt-8 rounded-2xl border border-navy/15 bg-navy/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Compass className="h-5 w-5 shrink-0 text-sapphire" />
        <h2 className="font-bold text-navy">{t.title}</h2>
      </div>

      {/* Topic square: one left↔right gauge per macro-topic. The axis is a
          fixed political convention, so each gauge is LTR regardless of page dir. */}
      <div className="grid grid-cols-2 gap-3">
        {profile.macros.map(({ key, position, lean }) => (
          <div
            key={key}
            className="flex flex-col rounded-xl border border-navy/10 bg-white p-3.5"
          >
            <div className="mb-2.5 text-sm font-bold text-navy">
              {t.macro[key]}
            </div>
            <div dir="ltr" className="relative h-1.5 rounded-full bg-gray-light">
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-sapphire shadow-sm"
                style={{ left: `${clamp(position) * 100}%` }}
                aria-hidden
              />
            </div>
            <div
              dir="ltr"
              className="mt-1.5 flex justify-between text-[10px] font-medium text-gray-dark"
            >
              <span>{t.spectrum.left}</span>
              <span>{t.spectrum.right}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-navy">
              {t.lean[lean]}
            </div>
          </div>
        ))}
      </div>

      {topics.length > 0 && topPartyName && (
        <p className="mt-5 leading-relaxed text-navy">
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
