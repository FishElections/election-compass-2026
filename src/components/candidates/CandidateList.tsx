"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Party } from "@/types";
import {
  CANDIDATE_LISTS_CHECKED_ON,
  TOP_PLACES,
  WOMEN_SOURCE,
  getCandidateList,
  type Candidate,
} from "@/data/candidateLists";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExplainBox } from "@/components/ExplainBox";
import { useDictionary } from "@/i18n/DictionaryProvider";

/**
 * The party's official candidate list (Central Elections Committee), with the
 * share of women in its realistic places (IDI). Static data from
 * src/data/candidateLists; names stay in Hebrew as published, in every locale.
 */

function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

function CandidateRow({ candidate, newTab }: { candidate: Candidate; newTab: string }) {
  // <bdi lang="he">: Hebrew names keep their own direction on the LTR pages.
  const name = <bdi lang="he">{candidate.name}</bdi>;
  return (
    <li className="flex min-h-9 break-inside-avoid items-center gap-2.5 border-b border-gray-light text-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-light text-xs font-bold text-navy">
        {candidate.place}
      </span>
      {candidate.url ? (
        <a
          href={candidate.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sapphire hover:underline"
        >
          {name}
          <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="sr-only">{newTab}</span>
        </a>
      ) : (
        <span className="text-foreground">{name}</span>
      )}
    </li>
  );
}

export function CandidateListItem({ party }: { party: Party }) {
  const { dict, locale } = useDictionary();
  const t = dict.candidateList;
  const [showAll, setShowAll] = useState(false);
  const list = getCandidateList(party.id);
  if (!list) return null;

  // UTC so a stored date is never shifted a day by the visitor's time zone.
  const dateFormat = new Intl.DateTimeFormat(locale, { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" });
  const date = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 });

  const total = list.candidates.length;
  const shown = showAll ? list.candidates : list.candidates.slice(0, TOP_PLACES);
  const hasLinks = list.candidates.some((c) => c.url);

  return (
    <AccordionItem value="candidate-list">
      <AccordionTrigger>
        {t.heading}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex items-baseline justify-between gap-3 pb-3">
          <span className="text-sm font-bold text-navy">{t.womenLabel}</span>
          <span className="font-display text-2xl text-navy">
            {list.women ? percent.format(list.women.womenPercent / 100) : t.womenNoData}
          </span>
        </div>
        {list.women && (
          <ExplainBox title={t.womenTitle}>
            {(() => {
              // The template names the source mid-sentence; render it as a link there.
              const [before, after = ""] = fill(t.womenText, {
                places: number.format(list.women.realisticPlaces),
                polls: number.format(WOMEN_SOURCE.pollCount),
                from: date(WOMEN_SOURCE.pollsFrom),
                to: date(WOMEN_SOURCE.pollsTo),
              }).split("{source}");
              return (
                <>
                  {before}
                  <a
                    href={WOMEN_SOURCE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sapphire hover:underline"
                  >
                    {t.womenSource}
                  </a>
                  {after}
                </>
              );
            })()}
          </ExplainBox>
        )}

        {/* Columns, not a grid: the list reads down (1–10, then 11–20). */}
        <ol className="mt-4 gap-x-4 sm:columns-2">
          {shown.map((candidate) => (
            <CandidateRow key={candidate.place} candidate={candidate} newTab={t.newTab} />
          ))}
        </ol>

        {total > TOP_PLACES && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="mt-3 min-h-11 w-full cursor-pointer rounded-xl border-2 border-sapphire/20 bg-white px-4 text-sm font-medium text-navy transition-colors hover:border-sapphire active:scale-[0.99]"
          >
            {showAll
              ? fill(t.showTop, { n: number.format(TOP_PLACES) })
              : fill(t.showAll, { n: number.format(total - TOP_PLACES) })}
          </button>
        )}

        <p className="mt-3 text-xs text-gray-dark">{t.namesNote}</p>
        {hasLinks && <p className="mt-1 text-xs text-gray-dark">{t.linksNote}</p>}
        <p className="mt-1 text-xs text-gray-dark">
          {t.source} ·{" "}
          <a
            href={list.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sapphire hover:underline"
          >
            {t.sourceLink} ↗
          </a>{" "}
          · {fill(t.dates, { updated: date(list.updated), checked: date(CANDIDATE_LISTS_CHECKED_ON) })}
        </p>

        {list.notices.length > 0 && (
          <details className="mt-2 text-xs text-gray-dark">
            <summary className="cursor-pointer font-semibold text-navy">{t.noticesTitle}</summary>
            <ul className="mt-1 flex flex-col gap-1">
              {list.notices.map((notice) => (
                <li key={notice} lang="he" dir="rtl" className="leading-relaxed">
                  {notice}
                </li>
              ))}
            </ul>
          </details>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
