import { describe, expect, test } from "vitest";
import {
  mulberry32,
  runThresholdSimulation,
  type SimPartyInput,
} from "./thresholdSimulation";

/** סקר דמה: שני גושים גדולים ומפלגה אחת ממש על קו החסימה. */
const PARTIES: SimPartyInput[] = [
  { partyId: "big-a", percent: 30, blocId: "left" },
  { partyId: "big-b", percent: 30, blocId: "right" },
  { partyId: "mid-a", percent: 18, blocId: "left" },
  { partyId: "mid-b", percent: 15, blocId: "right" },
  { partyId: "edge", percent: 3.25, blocId: "left" }, // בדיוק על הקו
  { partyId: "below", percent: 1.5, blocId: "right" }, // מתחת לחסימה
];

function baseConfig(overrides = {}) {
  return {
    parties: PARTIES,
    sampleSize: 1000,
    numRuns: 4000,
    thresholdPercent: 3.25,
    totalSeats: 120,
    majoritySeats: 61,
    random: mulberry32(12345),
    ...overrides,
  };
}

describe("runThresholdSimulation", () => {
  test("always allocates exactly totalSeats across parties", () => {
    const result = runThresholdSimulation(baseConfig({ numRuns: 500 }));
    const meanTotal = result.parties.reduce((sum, p) => sum + p.meanSeats, 0);
    // תוחלת המנדטים של כל המפלגות חייבת להסתכם ל-120 בכל ריצה, ולכן גם בממוצע.
    expect(meanTotal).toBeCloseTo(120, 6);
  });

  test("a party exactly on the threshold is roughly a coin flip", () => {
    const result = runThresholdSimulation(baseConfig());
    const edge = result.parties.find((p) => p.partyId === "edge")!;
    // 3.25% עם n=1000 -> SE≈0.56%, והקו ב-3.25% אחרי נרמול. סביב 50%.
    expect(edge.crossProbability).toBeGreaterThan(0.3);
    expect(edge.crossProbability).toBeLessThan(0.7);
  });

  test("a clearly-above party almost always crosses", () => {
    const result = runThresholdSimulation(baseConfig());
    const big = result.parties.find((p) => p.partyId === "big-a")!;
    expect(big.crossProbability).toBeGreaterThan(0.99);
  });

  test("a clearly-below party almost never crosses", () => {
    const result = runThresholdSimulation(baseConfig());
    const below = result.parties.find((p) => p.partyId === "below")!;
    expect(below.crossProbability).toBeLessThan(0.02);
  });

  test("forcedOut party never crosses and gets no seats", () => {
    const result = runThresholdSimulation(
      baseConfig({ forcedOut: new Set(["edge"]) })
    );
    const edge = result.parties.find((p) => p.partyId === "edge")!;
    expect(edge.crossProbability).toBe(0);
    expect(edge.meanSeats).toBe(0);
  });

  test("forcedIn party always crosses", () => {
    const result = runThresholdSimulation(
      baseConfig({ forcedIn: new Set(["edge"]) })
    );
    const edge = result.parties.find((p) => p.partyId === "edge")!;
    expect(edge.crossProbability).toBe(1);
    expect(edge.meanSeats).toBeGreaterThan(0);
  });

  test("the edge party's wasted votes flow to survivors when it falls", () => {
    // כשכופים את מפלגת הקצה החוצה, קולותיה מתבזבזים והמנדטים שלה
    // מתחלקים בין האחרים - סך המנדטים של שאר המפלגות חייב לגדול.
    const withEdge = runThresholdSimulation(baseConfig());
    const withoutEdge = runThresholdSimulation(
      baseConfig({ forcedOut: new Set(["edge"]) })
    );
    const othersWith = withEdge.parties
      .filter((p) => p.partyId !== "edge")
      .reduce((sum, p) => sum + p.meanSeats, 0);
    const othersWithout = withoutEdge.parties
      .filter((p) => p.partyId !== "edge")
      .reduce((sum, p) => sum + p.meanSeats, 0);
    expect(othersWithout).toBeGreaterThan(othersWith);
  });

  test("bloc results cover every bloc with a sane seat range", () => {
    const result = runThresholdSimulation(baseConfig());
    expect(result.blocs.map((b) => b.blocId).sort()).toEqual(["left", "right"]);
    for (const bloc of result.blocs) {
      expect(bloc.p5Seats).toBeLessThanOrEqual(bloc.meanSeats);
      expect(bloc.p95Seats).toBeGreaterThanOrEqual(bloc.meanSeats);
      expect(bloc.majorityProbability).toBeGreaterThanOrEqual(0);
      expect(bloc.majorityProbability).toBeLessThanOrEqual(1);
    }
  });

  test("is deterministic for a fixed seed", () => {
    const a = runThresholdSimulation(baseConfig({ random: mulberry32(7) }));
    const b = runThresholdSimulation(baseConfig({ random: mulberry32(7) }));
    expect(a.parties).toEqual(b.parties);
    expect(a.blocs).toEqual(b.blocs);
  });
});
