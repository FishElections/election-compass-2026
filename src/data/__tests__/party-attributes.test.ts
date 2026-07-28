import { describe, expect, test } from "vitest";
import { partiesCore } from "@/data/parties/core";
import {
  nationalSectors,
  partySectors,
  religiousCharacters,
} from "@/data/filters/core";
import { currentPoll, THRESHOLD_SEATS } from "@/data/polls";

/**
 * המסננים פוסלים מפלגות אמיתיות על בסיס התכונות האלה. בדיקה שקטה כאן עדיפה
 * על מפלגה שמוסתרת מהמשתמש בגלל שדה שנשכח או מקור שלא צורף.
 */
describe("party filter attributes", () => {
  /**
   * שני הצירים חייבים להישאר חלוקה מלאה. ברגע שמפלגה מקבלת שני ערכים
   * מאותו ציר - או אפס - נוצרת קטגוריה שיורית, וסינון מפסיק לעשות את מה
   * שכתוב עליו. זה בדיוק הכשל שהפיל את הקטגוריה "יהודית-ציונית".
   */
  test("every party has exactly one national sector", () => {
    for (const party of partiesCore) {
      const national = party.sectors.filter((s) =>
        (nationalSectors as string[]).includes(s)
      );
      expect(national, party.id).toHaveLength(1);
    }
  });

  test("every party has exactly one religious character", () => {
    for (const party of partiesCore) {
      const religious = party.sectors.filter((s) =>
        (religiousCharacters as string[]).includes(s)
      );
      expect(religious, party.id).toHaveLength(1);
    }
  });

  test("excluding a whole axis hides every party — no residual bucket", () => {
    for (const axis of [nationalSectors, religiousCharacters]) {
      for (const party of partiesCore) {
        const covered = party.sectors.some((s) => (axis as string[]).includes(s));
        expect(covered, `${party.id} / ${axis.join("|")}`).toBe(true);
      }
    }
  });

  test("every declared sector is a known sector", () => {
    const known = new Set<string>(partySectors);
    for (const party of partiesCore) {
      for (const sector of party.sectors) {
        expect(known.has(sector), `${party.id}: ${sector}`).toBe(true);
      }
    }
  });

  test("a bloc declaration always carries a source and a date", () => {
    for (const party of partiesCore) {
      if (!party.bloc) continue;
      expect(party.bloc.source, party.id).toMatch(/^https?:\/\//);
      expect(party.bloc.asOf, party.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("poll snapshot", () => {
  test("covers exactly the parties in the app, with no strays", () => {
    const partyIds = new Set(partiesCore.map((p) => p.id));
    const polledIds = new Set(Object.keys(currentPoll.seats));
    for (const id of partyIds) expect(polledIds.has(id), id).toBe(true);
    for (const id of polledIds) expect(partyIds.has(id), id).toBe(true);
  });

  test("seats sum to the 120 of the Knesset, counting only parties above the threshold", () => {
    const seated = Object.values(currentPoll.seats).filter(
      (s) => s >= THRESHOLD_SEATS
    );
    expect(seated.reduce((sum, s) => sum + s, 0)).toBe(120);
  });

  test("is dated and sourced", () => {
    expect(currentPoll.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(currentPoll.sourceUrl).toMatch(/^https?:\/\//);
    expect(currentPoll.sourceId.length).toBeGreaterThan(0);
  });
});
