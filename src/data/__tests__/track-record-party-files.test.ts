import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { locales } from "@/i18n/config";
import { partiesCore } from "@/data/parties/core";
import { buildPartyTrackRecord } from "@/data/trackRecord";
import { partyRecords, type PartyRecordModule } from "@/data/trackRecord/parties/registry";
import { validatePartyTrackRecord } from "@/utils/trackRecord";

/**
 * Checks every per-party file in src/data/trackRecord/parties on its own:
 * the methodology rules, complete he/en/ar text, and that the file is wired
 * into the registry (a file that isn't registered would silently not show).
 */
const dir = join(__dirname, "../trackRecord/parties");
const partyFiles = readdirSync(dir)
  .filter((name) => name.endsWith(".ts") && name !== "registry.ts")
  .map((name) => name.replace(/\.ts$/, ""));

describe("track-record party files", () => {
  test("every file is named after a party on the site", () => {
    const partyIds = new Set(partiesCore.map((p) => p.id));
    for (const id of partyFiles) expect(partyIds.has(id), id).toBe(true);
  });

  test("every file is registered", () => {
    for (const id of partyFiles) expect(Object.keys(partyRecords), id).toContain(id);
  });

  for (const id of partyFiles) {
    test(`${id}: follows the methodology and is fully translated`, async () => {
      const mod = (await import(`../trackRecord/parties/${id}.ts`)) as { record: PartyRecordModule };
      expect(mod.record, `${id} must export "record"`).toBeDefined();
      expect(validatePartyTrackRecord(id, mod.record.core)).toEqual([]);
      for (const { code } of locales) {
        expect(() => buildPartyTrackRecord(code, id, mod.record.core, mod.record.text[code])).not.toThrow();
      }
    });
  }
});
