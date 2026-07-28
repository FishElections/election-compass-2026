import { describe, expect, it } from "vitest";
import { getParties } from "@/data/parties";
import { getQuestions } from "@/data/questions";
import { currentPoll, THRESHOLD_SEATS } from "@/data/polls";
import { partySectors } from "@/data/filters/core";
import { QuizFilters, StanceValue, UserAnswers, emptyFilters } from "@/types";
import { calculateAllMatches, calculateWithFilters, getPartyStance } from "./calculator";

const parties = getParties("he");
const questions = getQuestions("he");

/** תאריך קבוע בתוך חלון הטריות של הסנאפשוט, כדי שהבדיקות לא ייפלו עם הזמן. */
const FRESH_NOW = new Date(`${currentPoll.updatedAt}T00:00:00Z`);

function mirrorParty(partyId: string): UserAnswers {
  const answers: UserAnswers = {};
  for (const q of questions) {
    answers[q.id] = getPartyStance(partyId, q.id) as StanceValue;
  }
  return answers;
}

const answers = mirrorParty("likud");

function withFilters(overrides: Partial<QuizFilters>) {
  return calculateWithFilters(
    parties,
    answers,
    undefined,
    "he",
    { ...emptyFilters, ...overrides },
    FRESH_NOW
  );
}

describe("filters never touch the ideological score", () => {
  it("match percentages are identical with and without filters", () => {
    const unfiltered = calculateAllMatches(parties, answers, undefined, "he");
    const filtered = withFilters({
      excludedSectors: ["haredi", "arab"],
      blocPreference: "anti",
      sizePreference: "large",
      hideBelowThreshold: true,
    }).results;

    for (const party of parties) {
      const a = unfiltered.find((r) => r.party.id === party.id)!.matchPercentage;
      const b = filtered.find((r) => r.party.id === party.id)!.matchPercentage;
      expect(b).toBe(a);
    }
  });
});

describe("sector exclusion", () => {
  it("hides exactly the parties belonging to an excluded sector", () => {
    const { results } = withFilters({ excludedSectors: ["arab"] });
    for (const r of results) {
      const isArab = r.party.sectors.includes("arab");
      expect(r.excludedBy.includes("sector")).toBe(isArab);
    }
  });

  it("a party is hidden when either of its two axes is excluded", () => {
    for (const party of parties) {
      for (const sector of party.sectors) {
        const { results } = withFilters({ excludedSectors: [sector] });
        const row = results.find((r) => r.party.id === party.id)!;
        expect(row.excludedBy, `${party.id} / ${sector}`).toContain("sector");
      }
    }
  });

  /**
   * רגרסיה: קטגוריה קודמת בשם "יהודית-ציונית" הוגדרה על החיתוך של שני
   * הצירים, ולכן סינון "מפלגה יהודית" השאיר את ש"ס ויהדות התורה ברשימה -
   * הן יהודיות אך לא ציוניות. הבדיקה נועלת את התיקון.
   */
  it("excluding 'jewish' hides the Haredi parties too", () => {
    const { results } = withFilters({ excludedSectors: ["jewish"] });
    for (const id of ["shas", "yahadut-hatorah"]) {
      const row = results.find((r) => r.party.id === id)!;
      expect(row.excludedBy, id).toContain("sector");
    }
    const survivors = results.filter((r) => r.excludedBy.length === 0);
    expect(survivors.every((r) => r.party.sectors.includes("arab"))).toBe(true);
  });

  it("excluding a religious character leaves the other characters alone", () => {
    const { results } = withFilters({ excludedSectors: ["haredi"] });
    const hidden = results.filter((r) => r.excludedBy.includes("sector"));
    expect(hidden.map((r) => r.party.id).sort()).toEqual([
      "shas",
      "yahadut-hatorah",
    ]);
  });

  it("excluded parties always sort below every party that passed", () => {
    const { results } = withFilters({ excludedSectors: ["arab", "haredi"] });
    const firstExcluded = results.findIndex((r) => r.excludedBy.length > 0);
    const lastPassing = results.map((r) => r.excludedBy.length).lastIndexOf(0);
    expect(firstExcluded).toBeGreaterThan(lastPassing);
  });
});

describe("bloc preference", () => {
  it("'anti' keeps unaligned parties — not recommending Netanyahu is the question asked", () => {
    const { results } = withFilters({ blocPreference: "anti" });
    for (const r of results) {
      const stance = r.party.bloc?.stance;
      expect(r.excludedBy.includes("bloc")).toBe(stance === "pro-netanyahu");
    }
    const unaligned = results.filter((r) => r.party.bloc?.stance === "unaligned");
    expect(unaligned.length).toBeGreaterThan(0);
    for (const r of unaligned) expect(r.excludedBy).not.toContain("bloc");
  });

  it("'pro' keeps only the Netanyahu bloc", () => {
    const { results } = withFilters({ blocPreference: "pro" });
    for (const r of results) {
      const stance = r.party.bloc?.stance;
      expect(r.excludedBy.includes("bloc")).toBe(stance !== "pro-netanyahu");
    }
  });

  it("a party with no recorded bloc is never excluded by the bloc filter", () => {
    const noBloc = parties.map((p) => ({ ...p, bloc: undefined }));
    for (const preference of ["pro", "anti"] as const) {
      const { results } = calculateWithFilters(
        noBloc,
        answers,
        undefined,
        "he",
        { ...emptyFilters, blocPreference: preference },
        FRESH_NOW
      );
      for (const r of results) expect(r.excludedBy).not.toContain("bloc");
    }
  });
});

describe("electoral threshold", () => {
  it("hides only parties polling below the threshold", () => {
    const { results } = withFilters({ hideBelowThreshold: true });
    for (const r of results) {
      const seats = currentPoll.seats[r.party.id];
      const below = seats !== undefined && seats < THRESHOLD_SEATS;
      expect(r.excludedBy.includes("threshold")).toBe(below);
    }
  });

  it("is not applied when the poll snapshot is stale", () => {
    const staleNow = new Date(`${currentPoll.updatedAt}T00:00:00Z`);
    staleNow.setDate(staleNow.getDate() + 365);
    const { results, pollDataFresh } = calculateWithFilters(
      parties,
      answers,
      undefined,
      "he",
      { ...emptyFilters, hideBelowThreshold: true },
      staleNow
    );
    expect(pollDataFresh).toBe(false);
    for (const r of results) expect(r.excludedBy).not.toContain("threshold");
  });
});

describe("soft size preference is a tie-break only", () => {
  it("never reorders parties separated by more than 2 points", () => {
    for (const preference of ["large", "small"] as const) {
      const { results } = withFilters({ sizePreference: preference });
      for (let i = 0; i < results.length - 1; i++) {
        const gap = results[i].matchPercentage - results[i + 1].matchPercentage;
        // סדר יורד תמיד, למעט היפוך בתוך מרווח שובר-השוויון (2 נקודות).
        expect(gap).toBeGreaterThanOrEqual(-2);
      }
    }
  });

  it("puts the preferred party first whenever two parties are within the margin", () => {
    for (const preference of ["large", "small"] as const) {
      const { results } = withFilters({ sizePreference: preference });
      const passing = results.filter((r) => r.excludedBy.length === 0);
      for (let i = 0; i < passing.length - 1; i++) {
        const a = passing[i];
        const b = passing[i + 1];
        if (Math.abs(a.matchPercentage - b.matchPercentage) > 2) continue;
        const prefers = (id: string) =>
          preference === "large"
            ? currentPoll.seats[id] >= 12
            : currentPoll.seats[id] >= THRESHOLD_SEATS &&
              currentPoll.seats[id] <= 8;
        // בתוך המרווח, מפלגה שאינה מועדפת לעולם לא מקדימה מפלגה מועדפת.
        if (!prefers(a.party.id) && prefers(b.party.id)) {
          expect(b.matchPercentage).toBeLessThan(a.matchPercentage - 2);
        }
      }
    }
  });

  it("is a total order — the same input always yields the same ranking", () => {
    // comparator שאינו יחס סדר תקין מחזיר תוצאה תלוית-אלגוריתם. חוזרים על
    // אותה קריאה עם קלט מעורבב ומוודאים שהדירוג יציב.
    const baseline = withFilters({ sizePreference: "large" }).results.map(
      (r) => r.party.id
    );
    for (let seed = 0; seed < 5; seed++) {
      const shuffled = [...parties].sort(() => (seed % 2 === 0 ? 1 : -1));
      const again = calculateWithFilters(
        shuffled, answers, undefined, "he",
        { ...emptyFilters, sizePreference: "large" }, FRESH_NOW
      ).results.map((r) => r.party.id);
      expect(again).toEqual(baseline);
    }
  });
});

describe("fallback when everything is excluded", () => {
  it("drops the filters and flags it instead of returning an empty list", () => {
    const { results, droppedAsEmpty } = withFilters({
      excludedSectors: [...partySectors],
    });
    expect(droppedAsEmpty).toBe(true);
    expect(results).toHaveLength(parties.length);
    for (const r of results) expect(r.excludedBy).toHaveLength(0);
  });

  it("ranks the fallback exactly like an unfiltered run", () => {
    const { results } = withFilters({ excludedSectors: [...partySectors] });
    const unfiltered = calculateAllMatches(parties, answers, undefined, "he");
    expect(results.map((r) => r.party.id)).toEqual(
      unfiltered.map((r) => r.party.id)
    );
  });
});
