import { Locale } from "@/i18n/config";
import { isVeteran } from "@/utils/trackRecord";
import {
  OPEN_LEGAL_STATUSES,
  trackRecordCore,
  type AchievementCore,
  type LegalCaseCore,
  type PartyTrackRecordCore,
  type SourceRef,
} from "./core";
import type { SourcePublisherId } from "./sources";
import {
  trackRecordTextHe,
  type AchievementText,
  type LegalCaseText,
  type PartyTrackRecordText,
  type TrackRecordLocaleText,
} from "./he";
import { trackRecordTextEn } from "./en";
import { trackRecordTextAr } from "./ar";

const textByLocale: Record<Locale, TrackRecordLocaleText> = {
  he: trackRecordTextHe,
  en: trackRecordTextEn,
  ar: trackRecordTextAr,
};

export type Achievement = AchievementCore & { text: AchievementText };
export type LegalCase = LegalCaseCore & { text: LegalCaseText; isOpen: boolean };

export interface PartyTrackRecord {
  asOf: string;
  isVeteran: boolean;
  legalSourcesChecked: SourceRef[];
  achievements: Achievement[];
  legalCases: LegalCase[];
  predecessorNames: Record<string, string>;
  /** #1 on the list; set for veteran parties. */
  leaderName?: string;
}

export function getPublisherNames(locale: Locale): Record<SourcePublisherId, string> {
  return textByLocale[locale].publishers;
}

/**
 * The researched record for one party, merged with its text in `locale`.
 * `undefined` means the party has not been researched (no sections shown).
 * Throws when any text is missing, so a gap fails the build instead of
 * rendering a blank.
 */
export function getPartyTrackRecord(
  locale: Locale,
  partyId: string
): PartyTrackRecord | undefined {
  const core = trackRecordCore[partyId];
  if (!core) return undefined;

  const text = textByLocale[locale].parties[partyId];
  if (!text) throw new Error(`Missing ${locale} track-record text for party "${partyId}"`);
  return buildPartyTrackRecord(locale, partyId, core, text);
}

/** Merges one party's facts with its text; throws on any missing text. */
export function buildPartyTrackRecord(
  locale: Locale,
  partyId: string,
  core: PartyTrackRecordCore,
  text: PartyTrackRecordText
): PartyTrackRecord {
  const achievements = core.achievements.map((item) => {
    const itemText = text.achievements[item.id];
    if (!itemText) {
      throw new Error(`Missing ${locale} text for achievement "${item.id}" of "${partyId}"`);
    }
    const missing = (what: string) =>
      new Error(`Missing ${locale} ${what} for "${item.id}" of "${partyId}"`);
    if ((item.type === "reform" || item.type === "legislation") && !itemText.indicator) {
      throw missing("indicator");
    }
    if (item.type === "reform" && !itemText.scaleUnit) throw missing("scale unit");
    if ((item.type === "legislation" || item.type === "major-legislation") && !itemText.ledBy) {
      throw missing("ledBy");
    }
    if (item.type === "agreement") {
      if (!itemText.primeMinister) throw missing("prime minister name");
      for (const step of item.steps ?? []) {
        if (!itemText.steps?.[step.id]) throw missing(`step "${step.id}" name`);
      }
    }
    return { ...item, text: itemText };
  });

  const legalCases = core.legalCases.map((legalCase) => {
    const caseText = text.legalCases[legalCase.id];
    if (!caseText) {
      throw new Error(`Missing ${locale} text for legal case "${legalCase.id}" of "${partyId}"`);
    }
    return { ...legalCase, text: caseText, isOpen: OPEN_LEGAL_STATUSES.has(legalCase.status) };
  });

  const predecessorNames: Record<string, string> = {};
  for (const predecessor of core.predecessors) {
    const name = text.predecessors[predecessor.id]?.name;
    if (!name) {
      throw new Error(`Missing ${locale} name for predecessor "${predecessor.id}" of "${partyId}"`);
    }
    predecessorNames[predecessor.id] = name;
  }

  const veteran = isVeteran(core);
  if (veteran && !text.leaderName) {
    throw new Error(`Missing ${locale} leader name for veteran party "${partyId}"`);
  }

  return {
    asOf: core.asOf,
    isVeteran: veteran,
    leaderName: text.leaderName,
    legalSourcesChecked: core.legalSourcesChecked,
    achievements,
    legalCases,
    predecessorNames,
  };
}
