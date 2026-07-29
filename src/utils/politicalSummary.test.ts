import { describe, expect, it } from "vitest";
import { getParties } from "@/data/parties";
import { getQuestions } from "@/data/questions";
import { StanceValue, UserAnswers } from "@/types";
import { computePoliticalProfile } from "./politicalSummary";
import { getPartyStance } from "./calculator";

const parties = getParties("he");
const questions = getQuestions("he");

// SPECTRUM_AXIS isn't exported (it's an implementation detail of the
// direction derivation) - re-derive just enough of it here to pick, for
// every question, the answer value that is most-left / most-right.
const rightnessOfParty: Record<string, number> = {
  left: -0.44,
  "center-left": -0.22,
  center: 0,
  "center-right": 0.18,
  right: 0.34,
  "far-right": 0.45,
};
function questionBeta(questionId: string): number {
  let num = 0;
  let den = 0;
  for (const p of parties) {
    if (p.spectrumCategory === "sectoral") continue;
    const rightness = rightnessOfParty[p.spectrumCategory];
    const s = getPartyStance(p.id, questionId);
    num += s * rightness;
    den += s * s;
  }
  return den > 0 ? num / den : 0;
}

function extremeAnswers(direction: "left" | "right"): UserAnswers {
  const answers: UserAnswers = {};
  for (const q of questions) {
    const beta = questionBeta(q.id);
    const rightValue = beta >= 0 ? 2 : -2;
    answers[q.id] = (direction === "right" ? rightValue : -rightValue) as StanceValue;
  }
  return answers;
}

describe("computePoliticalProfile: category position derived from the user's own answers only", () => {
  it("answering every question at its most-left extreme gives position 0 and an unequivocal 'strongLeft' lean, not a hedging 'lean left'", () => {
    const profile = computePoliticalProfile(extremeAnswers("left"), parties, undefined);
    expect(profile.macros.length).toBeGreaterThan(0);
    for (const m of profile.macros) {
      expect(m.position).toBeCloseTo(0, 5);
      expect(m.lean).toBe("strongLeft");
    }
    expect(profile.overallPosition).toBeCloseTo(0, 5);
  });

  it("answering every question at its most-right extreme gives position 1 and an unequivocal 'strongRight' lean, not a hedging 'lean right'", () => {
    const profile = computePoliticalProfile(extremeAnswers("right"), parties, undefined);
    for (const m of profile.macros) {
      expect(m.position).toBeCloseTo(1, 5);
      expect(m.lean).toBe("strongRight");
    }
    expect(profile.overallPosition).toBeCloseTo(1, 5);
  });

  it("splits leans independently per macro-topic: left on society/religion, right on economy", () => {
    const left = extremeAnswers("left");
    const right = extremeAnswers("right");
    const answers: UserAnswers = {};
    for (const q of questions) {
      const isSocial = q.category === "society" || q.category === "religion_state";
      const isEconomy = q.category === "economy" || q.category === "infrastructure";
      if (isSocial) answers[q.id] = left[q.id];
      else if (isEconomy) answers[q.id] = right[q.id];
      else answers[q.id] = 0 as StanceValue;
    }
    const profile = computePoliticalProfile(answers, parties, undefined);
    const byKey = Object.fromEntries(profile.macros.map((m) => [m.key, m]));
    expect(byKey.social.lean).toBe("strongLeft");
    expect(byKey.economy.lean).toBe("strongRight");
    expect(byKey.security.lean).toBe("center");
    expect(byKey.governance.lean).toBe("center");
  });

  it("never compares the user to a party: an unanswered question contributes nothing, a few answers still yield a bounded profile", () => {
    const answers: UserAnswers = { [questions[0].id]: -2, [questions[1].id]: 2 };
    const profile = computePoliticalProfile(answers, parties, undefined);
    expect(profile.overallPosition).toBeGreaterThanOrEqual(0);
    expect(profile.overallPosition).toBeLessThanOrEqual(1);
    for (const m of profile.macros) {
      expect(m.position).toBeGreaterThanOrEqual(0);
      expect(m.position).toBeLessThanOrEqual(1);
    }
  });

  it("no answers -> no macros, so the topic square is hidden rather than showing a fake center", () => {
    const profile = computePoliticalProfile({}, parties, undefined);
    expect(profile.macros).toEqual([]);
  });

  it("only half-committing to the left extreme on security questions gives a hedged 'left' lean, not the unequivocal 'strongLeft'", () => {
    const left = extremeAnswers("left");
    const securityQuestions = questions.filter((q) => q.category === "security");
    const answers: UserAnswers = {};
    securityQuestions.forEach((q, i) => {
      answers[q.id] = i % 2 === 0 ? left[q.id] : (0 as StanceValue);
    });
    const profile = computePoliticalProfile(answers, parties, undefined);
    const security = profile.macros.find((m) => m.key === "security")!;
    expect(security.position).toBeGreaterThan(0.2);
    expect(security.position).toBeLessThan(0.42);
    expect(security.lean).toBe("left");
  });
});
