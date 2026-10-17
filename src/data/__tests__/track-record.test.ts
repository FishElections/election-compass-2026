import { describe, expect, test } from "vitest";
import { partiesCore } from "@/data/parties/core";
import { trackRecordCore } from "@/data/trackRecord/core";
import { sourcePublishers } from "@/data/trackRecord/sources";
import { validatePartyTrackRecord } from "@/utils/trackRecord";

/**
 * Runs every methodology rule (docs/track-record-methodology.md) on the real
 * data. A fact without a source, an address off the source list, or a law
 * whose data does not show its goal was met fails the build here.
 */
describe("track record data", () => {
  test("every record belongs to a party on the site", () => {
    const partyIds = new Set(partiesCore.map((p) => p.id));
    for (const partyId of Object.keys(trackRecordCore)) {
      expect(partyIds.has(partyId), partyId).toBe(true);
    }
  });

  test("every record follows the methodology", () => {
    for (const [partyId, record] of Object.entries(trackRecordCore)) {
      expect(validatePartyTrackRecord(partyId, record), partyId).toEqual([]);
    }
  });

  test("every publisher on the source list has at least one address", () => {
    for (const [id, publisher] of Object.entries(sourcePublishers)) {
      expect(publisher.hosts.length, id).toBeGreaterThan(0);
    }
  });
});
