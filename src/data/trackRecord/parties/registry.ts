import type { PartyTrackRecordCore } from "../core";
import type { PartyTrackRecordText } from "../he";
import { record as likud } from "./likud";
import { record as yisraelBeiteinu } from "./yisrael-beiteinu";
import { record as shas } from "./shas";
import { record as yahadutHatorah } from "./yahadut-hatorah";
import { record as raam } from "./raam";
import { record as religiousZionism } from "./religious-zionism";
import { record as kacholLavan } from "./kachol-lavan";
import { record as otzmaYehudit } from "./otzma-yehudit";
import { record as hadashTaal } from "./hadash-taal";
import { record as hademocratim } from "./hademocratim";
import { record as beyachad } from "./beyachad";
import { record as yashar } from "./yashar";
import { record as amchaYisrael } from "./amcha-yisrael";
import { record as hamiluimnikim } from "./hamiluimnikim";

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

/** partyId → record. A party with no entry shows no track-record sections. */
export const partyRecords: Record<string, PartyRecordModule> = {
  likud,
  "yisrael-beiteinu": yisraelBeiteinu,
  shas,
  "yahadut-hatorah": yahadutHatorah,
  raam,
  "religious-zionism": religiousZionism,
  "kachol-lavan": kacholLavan,
  "otzma-yehudit": otzmaYehudit,
  "hadash-taal": hadashTaal,
  hademocratim,
  beyachad,
  yashar,
  "amcha-yisrael": amchaYisrael,
  hamiluimnikim,
};
