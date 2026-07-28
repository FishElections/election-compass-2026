"use client";

import { motion } from "framer-motion";
import { Check, Filter, SkipForward } from "lucide-react";
import { currentPoll, isPollSnapshotFresh } from "@/data/polls";
import {
  blocOptions,
  nationalSectors,
  religiousCharacters,
  sizeOptions,
} from "@/data/filters/core";
import { getFilterLabels } from "@/data/filters";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { PartySector } from "@/types";

interface FilterStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function FilterStep({ onContinue, onSkip }: FilterStepProps) {
  const { filters, toggleExcludedSector, setFilter } = useQuizStore();
  const { dict, locale } = useDictionary();
  const t = dict.quiz.filterStep;
  const labels = getFilterLabels(locale);

  const pollFresh = isPollSnapshotFresh();
  const pollDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  }).format(new Date(`${currentPoll.updatedAt}T00:00:00Z`));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sapphire">
            <Filter className="h-4 w-4" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
            {t.heading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-dark">
            {t.description}
          </p>
        </div>
        <Button variant="ghost" onClick={onSkip} className="shrink-0">
          {t.skip}
          <SkipForward className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* שני צירים נפרדים ולא רשימה אחת מעורבבת: "יהודית" ו"חרדית" אינן
            אפשרויות מתחרות באותה שאלה - ש"ס היא שתיהן. */}
        <FilterCard question={t.nationality.question} hint={t.nationality.hint}>
          <ExcludeRow
            sectors={nationalSectors}
            excluded={filters.excludedSectors}
            labels={labels.sectors}
            onToggle={toggleExcludedSector}
          />
        </FilterCard>

        <FilterCard
          question={t.religiousCharacter.question}
          hint={t.religiousCharacter.hint}
        >
          <ExcludeRow
            sectors={religiousCharacters}
            excluded={filters.excludedSectors}
            labels={labels.sectors}
            onToggle={toggleExcludedSector}
          />
        </FilterCard>

        <FilterCard question={t.bloc.question} hint={t.bloc.hint}>
          <ChoiceRow
            options={blocOptions.map((o) => ({ value: o, label: labels.bloc[o] }))}
            selected={filters.blocPreference}
            onSelect={(value) => setFilter("blocPreference", value)}
          />
        </FilterCard>

        {/* גודל ואחוז חסימה חולקים כרטיס אחד. הם אינם אותו מנגנון - האחד
            מסדר מחדש והשני מסתיר, והקבוצות שהם נוגעים בהן זרות זו לזו -
            אבל כשתי שאלות עוקבות הם נקראים כשאלה כפולה על אותו נושא. */}
        <FilterCard question={t.size.question} hint={t.size.hint}>
          <ChoiceRow
            options={sizeOptions.map((o) => ({ value: o, label: labels.size[o] }))}
            selected={filters.sizePreference}
            onSelect={(value) => setFilter("sizePreference", value)}
          />
          <div className="mt-4 border-t border-gray/60 pt-3">
            <button
              type="button"
              aria-pressed={filters.hideBelowThreshold}
              disabled={!pollFresh}
              onClick={() =>
                setFilter("hideBelowThreshold", !filters.hideBelowThreshold)
              }
              className={cn(
                "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-start text-sm font-medium transition-colors",
                !pollFresh && "cursor-not-allowed opacity-50",
                pollFresh && "cursor-pointer active:scale-[0.97]",
                filters.hideBelowThreshold
                  ? "border-sapphire bg-sapphire text-white"
                  : "border-gray bg-white text-navy hover:border-sapphire"
              )}
            >
              {filters.hideBelowThreshold && <Check className="h-3.5 w-3.5" />}
              {t.size.thresholdLabel}
            </button>
            <p className="mt-2 text-xs leading-relaxed text-gray-dark">
              {pollFresh
                ? t.size.thresholdSource
                    .replace("{source}", labels.pollSource[currentPoll.sourceId])
                    .replace("{date}", pollDate)
                : t.size.thresholdStale}
            </p>
          </div>
        </FilterCard>
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={onContinue}>
          {t.continue}
        </Button>
      </div>
    </motion.div>
  );
}

function FilterCard({
  question,
  hint,
  children,
}: {
  question: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-gray/80 bg-white p-4">
      <p className="text-base font-semibold text-navy">{question}</p>
      <p className="mb-3 mt-1 text-xs leading-relaxed text-gray-dark">{hint}</p>
      {children}
    </div>
  );
}

function ExcludeRow({
  sectors,
  excluded,
  labels,
  onToggle,
}: {
  sectors: PartySector[];
  excluded: PartySector[];
  labels: Record<PartySector, string>;
  onToggle: (sector: PartySector) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sectors.map((sector) => {
        const active = excluded.includes(sector);
        return (
          <button
            key={sector}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(sector)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer active:scale-[0.97]",
              active
                ? "border-danger bg-danger text-white"
                : "border-gray bg-white text-navy hover:border-sapphire"
            )}
          >
            {active && <Check className="h-3.5 w-3.5" />}
            {labels[sector]}
          </button>
        );
      })}
    </div>
  );
}

function ChoiceRow<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected === option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer active:scale-[0.97]",
            selected === option.value
              ? "border-sapphire bg-sapphire text-white"
              : "border-gray bg-white text-navy hover:border-sapphire"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
