import {
  TOP_PLACES,
  womenRepresentation,
  type CandidateListCore,
  type WomenRepresentation,
} from "./core";
import { candidateLinks } from "./links";
import { candidateListsCore } from "./parties/registry";

export {
  CANDIDATE_LISTS_CHECKED_ON,
  CANDIDATE_LISTS_INDEX_URL,
  TOP_PLACES,
  WOMEN_SOURCE,
} from "./core";

export interface Candidate {
  place: number;
  name: string;
  /** The candidate's page on their party's site (top 20 only), if one exists. */
  url?: string;
}

export interface CandidateList extends Omit<CandidateListCore, "names"> {
  candidates: Candidate[];
  women?: WomenRepresentation;
}

/** The party's official list, or undefined for a party without one. */
export function getCandidateList(partyId: string): CandidateList | undefined {
  const core = candidateListsCore[partyId];
  if (!core) return undefined;
  const links = candidateLinks[partyId]?.byPlace ?? {};
  const { names, ...rest } = core;
  return {
    ...rest,
    candidates: names.map((name, i) => ({
      place: i + 1,
      name,
      url: i < TOP_PLACES ? links[i + 1] : undefined,
    })),
    women: womenRepresentation[partyId],
  };
}
