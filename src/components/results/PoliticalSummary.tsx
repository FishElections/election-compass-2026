"use client";

import { useMemo } from "react";
import { Compass } from "lucide-react";
import {
  computePoliticalProfile,
  SPECTRUM_AXIS,
} from "@/utils/politicalSummary";
import { getCategories } from "@/data/questions";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { Party, SpectrumCategory, UserAnswers } from "@/types";

interface PoliticalSummaryProps {
  answers: UserAnswers;
  parties: Party[];
  topPartyId?: string;
  topPartyName?: string;
}

const clamp = (n: number, lo = 0.06, hi = 0.94) => Math.min(hi, Math.max(lo, n));

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

  // Position the non-sectoral parties on the axis, stacking any that share a
  // bucket into vertical lanes so their chips don't overlap.
  const { dots, maxLane, hasSectoral } = useMemo(() => {
    const laneCount: Partial<Record<SpectrumCategory, number>> = {};
    const placed = parties
      .filter((p) => p.spectrumCategory !== "sectoral")
      .map((p) => {
        const bucket = p.spectrumCategory as Exclude<SpectrumCategory, "sectoral">;
        const lane = laneCount[bucket] ?? 0;
        laneCount[bucket] = lane + 1;
        return { party: p, x: SPECTRUM_AXIS[bucket], lane };
      });
    const max = Math.max(0, ...Object.values(laneCount).map((n) => (n ?? 1) - 1));
    return {
      dots: placed,
      maxLane: max,
      hasSectoral: parties.some((p) => p.spectrumCategory === "sectoral"),
    };
  }, [parties]);

  if (profile.leans.length === 0) return null;

  const labelOf = (id: string) =>
    categories.find((c) => c.id === id)?.label ?? id;
  const order = categories.map((c) => c.id);
  const leans = [...profile.leans].sort(
    (a, b) => order.indexOf(a.category) - order.indexOf(b.category)
  );
  const topics = profile.topReasons.map(labelOf);
  const youX = clamp(profile.overallPosition) * 100;

  return (
    <div className="mt-8 rounded-2xl border border-navy/15 bg-navy/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Compass className="h-5 w-5 shrink-0 text-sapphire" />
        <h2 className="font-bold text-navy">{t.title}</h2>
      </div>

      {/* Spectrum: the political axis is a fixed left→right concept, so this
          block is intentionally LTR regardless of page direction. */}
      <div dir="ltr" className="mb-6 select-none">
        <div
          className="relative"
          style={{ height: `${(maxLane + 1) * 26 + 6}px` }}
        >
          {dots.map(({ party, x, lane }) => (
            <span
              key={party.id}
              title={party.name}
              className="absolute flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
              style={{
                left: `${x * 100}%`,
                bottom: `${lane * 26}px`,
                background: party.color,
              }}
            >
              {party.logo}
            </span>
          ))}
        </div>

        <div className="relative h-2 rounded-full bg-gradient-to-r from-gray-light via-gray to-gray-light">
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-navy shadow-ambient"
            style={{ left: `${youX}%` }}
            aria-hidden
          />
        </div>

        <div className="relative mt-2 h-5">
          <span
            className="absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-2 py-0.5 text-[11px] font-bold text-white"
            style={{ left: `${youX}%` }}
          >
            {t.spectrum.you}
          </span>
        </div>

        <div className="mt-1 flex justify-between text-xs font-medium text-gray-dark">
          <span>{t.spectrum.left}</span>
          <span>{t.spectrum.center}</span>
          <span>{t.spectrum.right}</span>
        </div>
      </div>

      {hasSectoral && (
        <p className="mb-5 text-[11px] leading-relaxed text-gray-dark">
          {t.spectrum.sectoralNote}
        </p>
      )}

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
