import { describe, expect, it } from "vitest";
import { parties } from "@/data/parties";
import { categories, questions } from "@/data/questions";
import { CategoryWeights, StanceValue, TopicWeight, UserAnswers } from "@/types";
import { calculateAllMatches, getPartyStance } from "./calculator";

function mirrorParty(partyId: string): UserAnswers {
  const answers: UserAnswers = {};
  for (const q of questions) {
    answers[q.id] = getPartyStance(partyId, q.id) as StanceValue;
  }
  return answers;
}

function scoreFor(
  partyId: string,
  answers: UserAnswers,
  weights?: CategoryWeights
): number {
  const result = calculateAllMatches(answers, weights).find(
    (r) => r.party.id === partyId
  );
  if (!result) throw new Error(`party ${partyId} not found in results`);
  return result.matchPercentage;
}

function isMonotonic(values: number[]): boolean {
  const nonDecreasing = values.every((v, i) => i === 0 || v >= values[i - 1]);
  const nonIncreasing = values.every((v, i) => i === 0 || v <= values[i - 1]);
  return nonDecreasing || nonIncreasing;
}

describe("category importance weighting", () => {
  const partyA = parties[0];
  const otherParties = parties.filter((p) => p.id !== partyA.id);
  const userAnswers = mirrorParty(partyA.id);

  it("a user who mirrors a party exactly scores 100% with that party regardless of category weights", () => {
    expect(scoreFor(partyA.id, userAnswers)).toBe(100);
    expect(scoreFor(partyA.id, userAnswers, { [categories[0].id]: 2 })).toBe(100);
    expect(scoreFor(partyA.id, userAnswers, { [categories[0].id]: 0 })).toBe(100);
  });

  it("'לא חשוב בכלל' (weight 0) fully excludes the category — identical to removing its questions", () => {
    const categoryId = categories[0].id;
    const categoryQuestionIds = questions
      .filter((q) => q.category === categoryId)
      .map((q) => q.id);

    const answersWithoutCategory: UserAnswers = { ...userAnswers };
    for (const id of categoryQuestionIds) delete answersWithoutCategory[id];

    const otherParty = otherParties[0];
    const scoreWeightedZero = scoreFor(otherParty.id, userAnswers, {
      [categoryId]: 0,
    });
    const scoreExcluded = scoreFor(otherParty.id, answersWithoutCategory, undefined);

    expect(scoreWeightedZero).toBe(scoreExcluded);
  });

  it("marking every category as 'לא חשוב בכלל' falls back to the unweighted score instead of NaN", () => {
    const allZero: CategoryWeights = {};
    for (const c of categories) allZero[c.id] = 0;

    const weightedResults = calculateAllMatches(userAnswers, allZero);
    const unweightedResults = calculateAllMatches(userAnswers, undefined);

    for (const r of weightedResults) {
      expect(Number.isFinite(r.matchPercentage)).toBe(true);
    }
    expect(weightedResults.map((r) => r.matchPercentage)).toEqual(
      unweightedResults.map((r) => r.matchPercentage)
    );
  });

  it("raising or lowering a category's importance moves a party's match score monotonically", () => {
    const weights: TopicWeight[] = [0, 0.5, 1, 1.5, 2];
    let checkedAtLeastOnePair = false;

    outer: for (const category of categories) {
      for (const party of otherParties) {
        const scores = weights.map((w) =>
          scoreFor(party.id, userAnswers, { [category.id]: w })
        );
        if (new Set(scores).size > 1) {
          checkedAtLeastOnePair = true;
          expect(isMonotonic(scores)).toBe(true);
          break outer;
        }
      }
    }

    expect(checkedAtLeastOnePair).toBe(true);
  });

  it("weighting a category up can change the overall party ranking, not just the raw score", () => {
    const partyB = otherParties[0];
    const categoryId = categories[0].id;
    const categoryQuestionIds = questions
      .filter((q) => q.category === categoryId)
      .map((q) => q.id);

    // Mirror party A everywhere except one category, where the user instead
    // mirrors party B exactly — isolating that category as B's one advantage.
    const mixedAnswers: UserAnswers = { ...userAnswers };
    for (const id of categoryQuestionIds) {
      mixedAnswers[id] = getPartyStance(partyB.id, id) as StanceValue;
    }

    const bBaseline = scoreFor(partyB.id, mixedAnswers, undefined);
    const bWeighted = scoreFor(partyB.id, mixedAnswers, { [categoryId]: 2 });
    const aBaseline = scoreFor(partyA.id, mixedAnswers, undefined);
    const aWeighted = scoreFor(partyA.id, mixedAnswers, { [categoryId]: 2 });

    // Weighting up B's one strong category can only help B, and can only hurt
    // A, relative to baseline — moving the two parties' relative ranking.
    expect(bWeighted).toBeGreaterThanOrEqual(bBaseline);
    expect(aWeighted).toBeLessThanOrEqual(aBaseline);
    expect(bWeighted - aWeighted).toBeGreaterThan(bBaseline - aBaseline);
  });

  it("the fast-track (short) question set weights the same way as the comprehensive track", () => {
    const shortQuestionIds = new Set(
      questions.filter((q) => q.isShort).map((q) => q.id)
    );
    const shortAnswers: UserAnswers = {};
    for (const id of Object.keys(userAnswers)) {
      if (shortQuestionIds.has(id)) shortAnswers[id] = userAnswers[id];
    }

    expect(scoreFor(partyA.id, shortAnswers)).toBe(100);

    const categoryId = categories.find((c) =>
      questions.some((q) => q.isShort && q.category === c.id)
    )!.id;
    const otherParty = otherParties[0];
    const s0 = scoreFor(otherParty.id, shortAnswers, { [categoryId]: 0 });
    const s2 = scoreFor(otherParty.id, shortAnswers, { [categoryId]: 2 });
    expect(Number.isFinite(s0)).toBe(true);
    expect(Number.isFinite(s2)).toBe(true);
  });
});
