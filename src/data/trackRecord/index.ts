import { Locale } from "@/i18n/config";
import { isVeteran } from "@/utils/trackRecord";
import {
  OPEN_LEGAL_STATUSES,
  trackRecordCore,
  type AchievementCore,
  type LegalCaseCore,
} from "./core";
import type { SourcePublisherId } from "./sources";
import {
  trackRecordTextHe,
  type AchievementText,
  type LegalCaseText,
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
  achievements: Achievement[];
  legalCases: LegalCase[];
  predecessorNames: Record<string, string>;
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

  const achievements = core.achievements.map((item) => {
    const itemText = text.achievements[item.id];
    if (!itemText) {
      throw new Error(`Missing ${locale} text for achievement "${item.id}" of "${partyId}"`);
    }
    if (item.type !== "peace-agreement" && !itemText.indicator) {
      throw new Error(`Missing ${locale} indicator for "${item.id}" of "${partyId}"`);
    }
    if (item.type === "reform" && !itemText.scaleUnit) {
      throw new Error(`Missing ${locale} scale unit for "${item.id}" of "${partyId}"`);
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

  return {
    asOf: core.asOf,
    isVeteran: isVeteran(core),
    achievements,
    legalCases,
    predecessorNames,
  };
}
