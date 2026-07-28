import { Locale } from "@/i18n/config";
import { ExclusionReason, PartyNoteId, PartySector } from "@/types";
import { BlocOption, SizeOption } from "./core";
import { filterLabelsHe } from "./he";
import { filterLabelsEn } from "./en";
import { filterLabelsAr } from "./ar";

export interface FilterLabels {
  sectors: Record<PartySector, string>;
  bloc: Record<BlocOption, string>;
  size: Record<SizeOption, string>;
  exclusionReasons: Record<ExclusionReason, string>;
  notes: Record<PartyNoteId, string>;
  /** שם הסוקר, לתצוגה. ראו PollSnapshot.sourceId. */
  pollSource: Record<"channel13", string>;
}

const labelsByLocale: Record<Locale, FilterLabels> = {
  he: filterLabelsHe,
  en: filterLabelsEn,
  ar: filterLabelsAr,
};

export function getFilterLabels(locale: Locale): FilterLabels {
  const labels = labelsByLocale[locale];
  if (!labels) throw new Error(`Missing filter labels for locale "${locale}"`);
  return labels;
}
