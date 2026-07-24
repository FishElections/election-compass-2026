import { parties } from "@/data/parties";
import { partyStances } from "@/data/party_stances";
import { categories, questions } from "@/data/questions";
import {
  CategoryId,
  CategoryWeights,
  Party,
  PartyResult,
  UserAnswers,
} from "@/types";

const MAX_DISTANCE_PER_QUESTION = 4; // |2 - (-2)|

const stanceLookup: Record<string, Record<string, number>> = {};
for (const stance of partyStances) {
  if (!stanceLookup[stance.partyId]) stanceLookup[stance.partyId] = {};
  stanceLookup[stance.partyId][stance.questionId] = stance.stanceValue;
}

const questionCategoryLookup: Record<string, CategoryId> = {};
for (const question of questions) {
  questionCategoryLookup[question.id] = question.category;
}

function weightFor(
  questionId: string,
  categoryWeights: CategoryWeights | undefined
): number {
  if (!categoryWeights) return 1;
  const category = questionCategoryLookup[questionId];
  return categoryWeights[category] ?? 1;
}

function calculatePartyMatch(
  party: Party,
  answers: UserAnswers,
  categoryWeights?: CategoryWeights
): PartyResult {
  const answeredQuestionIds = Object.keys(answers).filter(
    (id) => answers[id] !== undefined
  );

  if (answeredQuestionIds.length === 0) {
    return { party, matchPercentage: 0, answeredCount: 0 };
  }

  let totalDistance = 0;
  let maxPossibleDistance = 0;
  for (const questionId of answeredQuestionIds) {
    const userValue = answers[questionId] ?? 0;
    const partyValue = stanceLookup[party.id]?.[questionId] ?? 0;
    const weight = weightFor(questionId, categoryWeights);
    totalDistance += weight * Math.abs(userValue - partyValue);
    maxPossibleDistance += weight * MAX_DISTANCE_PER_QUESTION;
  }

  const score = (1 - totalDistance / maxPossibleDistance) * 100;

  return {
    party,
    matchPercentage: Math.round(score),
    answeredCount: answeredQuestionIds.length,
  };
}

export function calculateAllMatches(
  answers: UserAnswers,
  categoryWeights?: CategoryWeights
): PartyResult[] {
  return parties
    .map((party) => calculatePartyMatch(party, answers, categoryWeights))
    .sort(
      (a, b) =>
        b.matchPercentage - a.matchPercentage ||
        a.party.name.localeCompare(b.party.name, "he")
    );
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
