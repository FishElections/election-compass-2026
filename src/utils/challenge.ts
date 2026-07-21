import { partyTopicStances } from "@/data/partyTopicStances";
import { counterArguments } from "@/data/counterArguments";
import { ChallengeCardResult, StanceSide } from "@/types";

/** ארבעת הנושאים המוצעים למסלול ההצהרה המהירה. */
export const quickStanceTopicIds = [
  "haredi-draft",
  "gaza-control",
  "judicial-reform",
  "religion-state-separation",
];

export function getPartySide(
  partyId: string,
  topicId: string
): StanceSide | undefined {
  return partyTopicStances.find(
    (s) => s.partyId === partyId && s.topicId === topicId
  )?.side;
}

export function getArgumentByTopic(topicId: string) {
  return counterArguments.find((a) => a.id === topicId);
}

export function computeOpennessScore(results: ChallengeCardResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + r.reaction, 0);
  return Math.round((total / results.length) * 100);
}

export interface OpennessTier {
  emoji: string;
  title: string;
  description: string;
}

export function getOpennessTier(score: number): OpennessTier {
  if (score >= 70) {
    return {
      emoji: "🧪",
      title: "ספקן קרטזיאני / חוקר ביקורתי",
      description:
        "אתה מסוגל לראות את המורכבות ולהעריך טיעונים של מחנות יריבים.",
    };
  }
  if (score >= 40) {
    return {
      emoji: "⚖️",
      title: "שקול ומאוזן",
      description: "יש לך עקרונות חזקים, אך אתה קשוב ומבין נימוקים נגדיים.",
    };
  }
  return {
    emoji: "🏛️",
    title: "אידיאולוג נחוש",
    description:
      "ערכי היסוד שלך ברורים ומנומקים, ואתה דבק בהם גם מול אתגרים.",
  };
}
