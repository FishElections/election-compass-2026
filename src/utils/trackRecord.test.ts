import { describe, expect, test } from "vitest";
import {
  FULL_TERM_DAYS,
  combinedSeatDays,
  isGoalMet,
  isIsoDate,
  isVeteran,
  validatePartyTrackRecord,
} from "./trackRecord";
import type {
  AchievementCore,
  LegalCaseCore,
  LegislationCore,
  PartyTrackRecordCore,
  SourceRef,
} from "@/data/trackRecord/core";
import type { SourcePublisherId } from "@/data/trackRecord/sources";

/*
 * Fixtures are fictional: made-up ids, dates and URL paths on the approved
 * hosts. They exist only to prove each rule is enforced.
 */

function src(publisher: SourcePublisherId, url: string, extra: Partial<SourceRef> = {}): SourceRef {
  return { publisher, url, accessed: "2026-10-01", ...extra };
}

const knessetSrc = src("knesset", "https://main.knesset.gov.il/fixture");
const govSrc = src("gov-il", "https://www.gov.il/fixture");
const evalSrc = src("bank-of-israel", "https://www.boi.org.il/fixture");

function law(overrides: Partial<LegislationCore> = {}): LegislationCore {
  return {
    id: "law-a",
    type: "legislation",
    role: "initiated",
    date: "2015-03-01",
    sources: [knessetSrc],
    impact: {
      goalSources: [knessetSrc],
      intendedDirection: "increase",
      before: { value: 10, date: "2014-01-01" },
      after: { value: 20, date: "2018-01-01" },
      evaluationSources: [evalSrc],
    },
    ...overrides,
  };
}

function record(overrides: Partial<PartyTrackRecordCore> = {}): PartyTrackRecordCore {
  return {
    asOf: "2026-10-01",
    leaderSources: [src("cec", "https://bechirot.gov.il/fixture")],
    predecessors: [],
    knessetPeriods: [{ knesset: 1, from: "2010-01-01", to: "2016-01-01", sources: [knessetSrc] }],
    achievements: [law()],
    legalCases: [],
    ...overrides,
  };
}

function errorsFor(r: PartyTrackRecordCore): string[] {
  return validatePartyTrackRecord("fixture", r);
}

describe("dates", () => {
  test("accepts real YYYY-MM-DD dates only", () => {
    expect(isIsoDate("2024-02-29")).toBe(true);
    expect(isIsoDate("2023-02-29")).toBe(false);
    expect(isIsoDate("2026-13-01")).toBe(false);
    expect(isIsoDate("1/2/2026")).toBe(false);
  });
});

describe("veteran status (§2.4)", () => {
  test("overlapping periods are counted once", () => {
    const days = combinedSeatDays(
      [
        { knesset: 1, from: "2010-01-01", to: "2010-01-11", sources: [] },
        { knesset: 2, from: "2010-01-06", to: "2010-01-16", sources: [] },
      ],
      "2026-10-01"
    );
    expect(days).toBe(15);
  });

  test("an open period runs until the snapshot date", () => {
    expect(combinedSeatDays([{ knesset: 1, from: "2026-09-21", sources: [] }], "2026-10-01")).toBe(10);
  });

  test("exactly one full term is veteran, one day less is not", () => {
    const from = "2010-01-01";
    const fullTermEnd = new Date(Date.parse(`${from}T00:00:00Z`) + FULL_TERM_DAYS * 86_400_000)
      .toISOString()
      .slice(0, 10);
    const dayShort = new Date(Date.parse(`${fullTermEnd}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

    expect(isVeteran(record({ knessetPeriods: [{ knesset: 1, from, to: fullTermEnd, sources: [] }] }))).toBe(true);
    expect(isVeteran(record({ knessetPeriods: [{ knesset: 1, from, to: dayShort, sources: [] }] }))).toBe(false);
  });

  test("a non-veteran party cannot carry achievements or legal cases", () => {
    const short = [{ knesset: 1, from: "2025-01-01", sources: [knessetSrc] }];
    expect(errorsFor(record({ knessetPeriods: short }))).toContainEqual(
      expect.stringContaining("not a veteran party")
    );
    expect(errorsFor(record({ knessetPeriods: short, achievements: [] }))).toEqual([]);
  });

  test("a period held by a predecessor must name a documented predecessor (§2.3)", () => {
    const periods = [{ knesset: 1, from: "2010-01-01", to: "2016-01-01", predecessorId: "old", sources: [knessetSrc] }];
    expect(errorsFor(record({ knessetPeriods: periods }))).toContainEqual(
      expect.stringContaining('unknown predecessor "old"')
    );
    expect(
      errorsFor(record({ knessetPeriods: periods, predecessors: [{ id: "old", sources: [govSrc] }] }))
    ).toEqual([]);
  });
});

describe("a valid record", () => {
  test("passes with no errors", () => {
    expect(errorsFor(record())).toEqual([]);
  });
});

describe("sources (§5)", () => {
  test("every fact needs at least one source", () => {
    expect(errorsFor(record({ achievements: [law({ sources: [] })] }))).toContainEqual(
      expect.stringContaining("no source")
    );
  });

  test("a URL off the publisher's own address is rejected", () => {
    const wiki = src("knesset", "https://en.wikipedia.org/wiki/Fixture");
    expect(errorsFor(record({ achievements: [law({ sources: [wiki] })] }))).toContainEqual(
      expect.stringContaining("is not a knesset address")
    );
  });

  test("a publisher that is not on the list is rejected", () => {
    const blog = { publisher: "some-blog", url: "https://blog.example/x", accessed: "2026-10-01" } as unknown as SourceRef;
    expect(errorsFor(record({ achievements: [law({ sources: [blog] })] }))).toContainEqual(
      expect.stringContaining("is not on the source list")
    );
  });

  test("links must be https", () => {
    const plain = src("knesset", "http://main.knesset.gov.il/fixture");
    expect(errorsFor(record({ achievements: [law({ sources: [plain] })] }))).toContainEqual(
      expect.stringContaining("not https")
    );
  });

  test("archive copies must be on the Wayback Machine", () => {
    const bad = src("knesset", "https://main.knesset.gov.il/fixture", { archiveUrl: "https://archive.ph/x" });
    const good = src("knesset", "https://main.knesset.gov.il/fixture", {
      archiveUrl: "https://web.archive.org/web/2026/https://main.knesset.gov.il/fixture",
    });
    expect(errorsFor(record({ achievements: [law({ sources: [bad] })] }))).toContainEqual(
      expect.stringContaining("archive copy")
    );
    expect(errorsFor(record({ achievements: [law({ sources: [good] })] }))).toEqual([]);
  });

  test("a source read after the snapshot date is rejected", () => {
    const late = src("knesset", "https://main.knesset.gov.il/fixture", { accessed: "2026-12-01" });
    expect(errorsFor(record({ achievements: [law({ sources: [late] })] }))).toContainEqual(
      expect.stringContaining("after the snapshot")
    );
  });

  test("news alone needs 2 independent publishers", () => {
    const ynet = src("ynet", "https://www.ynet.co.il/fixture");
    const calcalist = src("calcalist", "https://www.calcalist.co.il/fixture");
    const haaretz = src("haaretz", "https://www.haaretz.co.il/fixture");
    const corroboration = expect.stringContaining("2 independent news outlets");

    expect(errorsFor(record({ achievements: [law({ sources: [ynet] })] }))).toContainEqual(corroboration);
    // Same publisher group: still one source.
    expect(errorsFor(record({ achievements: [law({ sources: [ynet, calcalist] })] }))).toContainEqual(corroboration);
    expect(errorsFor(record({ achievements: [law({ sources: [ynet, haaretz] })] }))).toEqual([]);
  });
});

describe("achievements (§3)", () => {
  test("a law whose data does not show its goal was met is rejected", () => {
    const missed = law({
      impact: { ...law().impact, after: { value: 5, date: "2018-01-01" } },
    });
    expect(errorsFor(record({ achievements: [missed] }))).toContainEqual(
      expect.stringContaining("stated goal was met")
    );
  });

  test("a decrease goal is met when the indicator falls", () => {
    expect(
      isGoalMet({ ...law().impact, intendedDirection: "decrease", before: { value: 9, date: "2014-01-01" }, after: { value: 3, date: "2018-01-01" } })
    ).toBe(true);
  });

  test("the evaluation must come from an evaluation body, not news", () => {
    const news = law({ impact: { ...law().impact, evaluationSources: [src("haaretz", "https://www.haaretz.co.il/fixture")] } });
    expect(errorsFor(record({ achievements: [news] }))).toContainEqual(
      expect.stringContaining("expected evaluation")
    );
  });

  test("the measurement must be taken before and after the law", () => {
    const backwards = law({ impact: { ...law().impact, before: { value: 10, date: "2016-01-01" } } });
    expect(errorsFor(record({ achievements: [backwards] }))).toContainEqual(
      expect.stringContaining('"before" is measured after')
    );
  });

  test("a reform needs a positive, officially sourced scale", () => {
    const reform: AchievementCore = {
      id: "reform-a",
      type: "reform",
      role: "led",
      nationwide: true,
      date: "2015-03-01",
      sources: [govSrc],
      scale: { value: 0, sources: [src("haaretz", "https://www.haaretz.co.il/fixture")] },
      impact: law().impact,
    };
    const errors = errorsFor(record({ achievements: [reform] }));
    expect(errors).toContainEqual(expect.stringContaining("scale must be a positive number"));
    expect(errors).toContainEqual(expect.stringContaining("expected official or evaluation"));
  });

  test("at most 5 reforms and laws, while peace agreements are uncapped", () => {
    const laws = Array.from({ length: 6 }, (_, i) => law({ id: `law-${i}` }));
    expect(errorsFor(record({ achievements: laws }))).toContainEqual(expect.stringContaining("at most 5"));

    const peace: AchievementCore[] = Array.from({ length: 3 }, (_, i) => ({
      id: `peace-${i}`,
      type: "peace-agreement",
      role: "prime-minister",
      date: "2015-03-01",
      sources: [src("un-treaties", "https://treaties.un.org/fixture")],
    }));
    expect(errorsFor(record({ achievements: [...laws.slice(0, 5), ...peace] }))).toEqual([]);
  });

  test("ids must be unique", () => {
    expect(errorsFor(record({ achievements: [law(), law()] }))).toContainEqual(
      expect.stringContaining('duplicate id "law-a"')
    );
  });
});

describe("legal record (§4)", () => {
  const court = src("courts", "https://supreme.court.gov.il/fixture");

  function legalCase(overrides: Partial<LegalCaseCore>): LegalCaseCore {
    return { id: "case-a", status: "on-trial", since: "2020-01-01", sources: [court], ...overrides };
  }

  test("open and concluded cases are both valid", () => {
    expect(errorsFor(record({ legalCases: [legalCase({})] }))).toEqual([]);
    expect(
      errorsFor(record({ legalCases: [legalCase({ status: "acquitted", endedOn: "2022-01-01" })] }))
    ).toEqual([]);
  });

  test("an open case cannot have an end date", () => {
    expect(errorsFor(record({ legalCases: [legalCase({ endedOn: "2022-01-01" })] }))).toContainEqual(
      expect.stringContaining("open case cannot have an end date")
    );
  });

  test("a concluded case needs an end date", () => {
    expect(errorsFor(record({ legalCases: [legalCase({ status: "closed" })] }))).toContainEqual(
      expect.stringContaining("concluded case needs an end date")
    );
  });

  test("moral turpitude applies only to convictions", () => {
    expect(
      errorsFor(record({ legalCases: [legalCase({ status: "acquitted", endedOn: "2022-01-01", moralTurpitude: true })] }))
    ).toContainEqual(expect.stringContaining("only to convictions"));
  });

  test("a single news report is not enough", () => {
    expect(
      errorsFor(record({ legalCases: [legalCase({ sources: [src("maariv", "https://www.maariv.co.il/fixture")] })] }))
    ).toContainEqual(expect.stringContaining("2 independent news outlets"));
  });
});
