import type { PartyTrackRecordCore } from "../core";
import type { PartyTrackRecordText } from "../he";

/**
 * One file per party (src/data/trackRecord/parties/<partyId>.ts), each holding
 * that party's facts and its he/en/ar text side by side. Keeping a party's
 * facts next to their translations makes review easier, and lets parties be
 * edited independently.
 */
export interface PartyRecordModule {
  core: PartyTrackRecordCore;
  text: { he: PartyTrackRecordText; en: PartyTrackRecordText; ar: PartyTrackRecordText };
}

import { record as yashar } from "./yashar";
import { record as amchaYisrael } from "./amcha-yisrael";
import { record as hamiluimnikim } from "./hamiluimnikim";

/** partyId → record. A party with no entry shows no track-record sections. */
export const partyRecords: Record<string, PartyRecordModule> = {
  yashar,
  "amcha-yisrael": amchaYisrael,
  hamiluimnikim,
};
