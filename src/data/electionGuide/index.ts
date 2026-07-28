import { Locale } from "@/i18n/config";
import {
  toyPartiesCore,
  demoSlipsCore,
  formationTimelineCore,
  whyVoteFactsCore,
  stationFactsCore,
  VOTES_PER_SEAT_APPROX,
  THRESHOLD_PERCENT,
  MAGIC_NUMBER,
  TOTAL_SEATS,
} from "./core";
import {
  toyPartyNamesHe,
  demoSlipPartyNamesHe,
  formationTimelineTextHe,
  whyVoteFactsTextHe,
  stationFactsTextHe,
} from "./he";
import {
  toyPartyNamesEn,
  demoSlipPartyNamesEn,
  formationTimelineTextEn,
  whyVoteFactsTextEn,
  stationFactsTextEn,
} from "./en";
import {
  toyPartyNamesAr,
  demoSlipPartyNamesAr,
  formationTimelineTextAr,
  whyVoteFactsTextAr,
  stationFactsTextAr,
} from "./ar";

export { VOTES_PER_SEAT_APPROX, THRESHOLD_PERCENT, MAGIC_NUMBER, TOTAL_SEATS };

export interface ToyParty {
  id: string;
  name: string;
  seats: number;
  color: string;
}

export interface DemoSlip {
  id: string;
  letters: string;
  party: string;
}

export interface TimelineStep {
  id: string;
  emoji: string;
  title: string;
  text: string;
}

export interface GuideFact {
  id: string;
  emoji: string;
  lead: string;
  text: string;
  sourceUrl: string;
}

const toyPartyNamesByLocale: Record<Locale, typeof toyPartyNamesHe> = {
  he: toyPartyNamesHe,
  en: toyPartyNamesEn,
  ar: toyPartyNamesAr,
};
const demoSlipPartyNamesByLocale: Record<Locale, typeof demoSlipPartyNamesHe> = {
  he: demoSlipPartyNamesHe,
  en: demoSlipPartyNamesEn,
  ar: demoSlipPartyNamesAr,
};
const formationTimelineTextByLocale: Record<Locale, typeof formationTimelineTextHe> = {
  he: formationTimelineTextHe,
  en: formationTimelineTextEn,
  ar: formationTimelineTextAr,
};
const whyVoteFactsTextByLocale: Record<Locale, typeof whyVoteFactsTextHe> = {
  he: whyVoteFactsTextHe,
  en: whyVoteFactsTextEn,
  ar: whyVoteFactsTextAr,
};
const stationFactsTextByLocale: Record<Locale, typeof stationFactsTextHe> = {
  he: stationFactsTextHe,
  en: stationFactsTextEn,
  ar: stationFactsTextAr,
};

export function getToyParties(locale: Locale): ToyParty[] {
  const names = toyPartyNamesByLocale[locale];
  return toyPartiesCore.map((p) => {
    const name = names[p.id];
    if (!name) throw new Error(`Missing ${locale} name for toy party "${p.id}"`);
    return { id: p.id, name, seats: p.seats, color: p.color };
  });
}

export function getDemoSlips(locale: Locale): DemoSlip[] {
  const names = demoSlipPartyNamesByLocale[locale];
  return demoSlipsCore.map((s) => {
    const party = names[s.id];
    if (!party) throw new Error(`Missing ${locale} party name for demo slip "${s.id}"`);
    return { id: s.id, letters: s.letters, party };
  });
}

export function getFormationTimeline(locale: Locale): TimelineStep[] {
  const text = formationTimelineTextByLocale[locale];
  return formationTimelineCore.map((s) => {
    const t = text[s.id];
    if (!t) throw new Error(`Missing ${locale} text for timeline step "${s.id}"`);
    return { id: s.id, emoji: s.emoji, title: t.title, text: t.text };
  });
}

export function getWhyVoteFacts(locale: Locale): GuideFact[] {
  const text = whyVoteFactsTextByLocale[locale];
  return whyVoteFactsCore.map((f) => {
    const t = text[f.id];
    if (!t) throw new Error(`Missing ${locale} text for guide fact "${f.id}"`);
    return { id: f.id, emoji: f.emoji, sourceUrl: f.sourceUrl, lead: t.lead, text: t.text };
  });
}

export function getStationFacts(locale: Locale): Record<string, GuideFact> {
  const text = stationFactsTextByLocale[locale];
  const result: Record<string, GuideFact> = {};
  for (const [key, core] of Object.entries(stationFactsCore)) {
    const t = text[key];
    if (!t) throw new Error(`Missing ${locale} text for station fact "${key}"`);
    result[key] = { id: key, emoji: core.emoji, sourceUrl: core.sourceUrl, lead: t.lead, text: t.text };
  }
  return result;
}
