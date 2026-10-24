import type { CandidateListCore } from "../core";
import { list as amchaYisrael } from "./amcha-yisrael";
import { list as beyachad } from "./beyachad";
import { list as hadashTaal } from "./hadash-taal";
import { list as hademocratim } from "./hademocratim";
import { list as hamiluimnikim } from "./hamiluimnikim";
import { list as likud } from "./likud";
import { list as otzmaYehudit } from "./otzma-yehudit";
import { list as raam } from "./raam";
import { list as religiousZionism } from "./religious-zionism";
import { list as shas } from "./shas";
import { list as yahadutHatorah } from "./yahadut-hatorah";
import { list as yashar } from "./yashar";
import { list as yisraelBeiteinu } from "./yisrael-beiteinu";

/** One official list per party id (src/data/parties/core.ts). */
export const candidateListsCore: Record<string, CandidateListCore> = {
  "amcha-yisrael": amchaYisrael,
  "beyachad": beyachad,
  "hadash-taal": hadashTaal,
  "hademocratim": hademocratim,
  "hamiluimnikim": hamiluimnikim,
  "likud": likud,
  "otzma-yehudit": otzmaYehudit,
  "raam": raam,
  "religious-zionism": religiousZionism,
  "shas": shas,
  "yahadut-hatorah": yahadutHatorah,
  "yashar": yashar,
  "yisrael-beiteinu": yisraelBeiteinu,
};
