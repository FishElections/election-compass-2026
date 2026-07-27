import { partyTopicStances } from "@/data/partyTopicStances";
import { getCounterArguments } from "@/data/counterArguments";
import { Locale } from "@/i18n/config";
import { ChallengeCardResult, StanceSide } from "@/types";

export function getPartySide(
  partyId: string,
  topicId: string
): StanceSide | undefined {
  return partyTopicStances.find(
    (s) => s.partyId === partyId && s.topicId === topicId
  )?.side;
}

export function getArgumentByTopic(topicId: string, locale: Locale) {
  return getCounterArguments(locale).find((a) => a.id === topicId);
}

export function computeOpennessScore(results: ChallengeCardResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + r.reaction, 0);
  return Math.round((total / results.length) * 100);
}

export type OpennessTierKey = "skeptic" | "balanced" | "ideologue";

export function getOpennessTierKey(score: number): OpennessTierKey {
  if (score >= 70) return "skeptic";
  if (score >= 40) return "balanced";
  return "ideologue";
}

/** Locale-invariant — title/description text lives in the dictionary. */
export const opennessTierEmoji: Record<OpennessTierKey, string> = {
  skeptic: "🧪",
  balanced: "⚖️",
  ideologue: "🏛️",
};
