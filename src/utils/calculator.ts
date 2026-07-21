import { parties } from "@/data/parties";
import { partyStances } from "@/data/party_stances";
import { categories, questions } from "@/data/questions";
import { CategoryId, Party, PartyResult, UserAnswers } from "@/types";

const MAX_DISTANCE_PER_QUESTION = 4; // |2 - (-2)|

const stanceLookup: Record<string, Record<string, number>> = {};
for (const stance of partyStances) {
  if (!stanceLookup[stance.partyId]) stanceLookup[stance.partyId] = {};
  stanceLookup[stance.partyId][stance.questionId] = stance.stanceValue;
}

function calculatePartyMatch(party: Party, answers: UserAnswers): PartyResult {
  const answeredQuestionIds = Object.keys(answers).filter(
    (id) => answers[id] !== undefined
  );

  if (answeredQuestionIds.length === 0) {
    return { party, matchPercentage: 0, answeredCount: 0 };
  }

  let totalDistance = 0;
  for (const questionId of answeredQuestionIds) {
    const userValue = answers[questionId] ?? 0;
    const partyValue = stanceLookup[party.id]?.[questionId] ?? 0;
    totalDistance += Math.abs(userValue - partyValue);
  }

  const maxPossibleDistance =
    MAX_DISTANCE_PER_QUESTION * answeredQuestionIds.length;
  const score = (1 - totalDistance / maxPossibleDistance) * 100;

  return {
    party,
    matchPercentage: Math.round(score),
    answeredCount: answeredQuestionIds.length,
  };
}

export function calculateAllMatches(answers: UserAnswers): PartyResult[] {
  return parties
    .map((party) => calculatePartyMatch(party, answers))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function getPartyStance(partyId: string, questionId: string): number {
  return stanceLookup[partyId]?.[questionId] ?? 0;
}

export function getPartyCategoryAverages(
  partyId: string
): Record<CategoryId, number> {
  const sums: Record<string, { total: number; count: number }> = {};
  for (const category of categories) {
    sums[category.id] = { total: 0, count: 0 };
  }
  for (const question of questions) {
    const value = getPartyStance(partyId, question.id);
    sums[question.category].total += value;
    sums[question.category].count += 1;
  }
  const averages = {} as Record<CategoryId, number>;
  for (const category of categories) {
    const { total, count } = sums[category.id];
    averages[category.id] = count > 0 ? total / count : 0;
  }
  return averages;
}
