/**
 * The official candidate lists for the 2026 (26th Knesset) election, as the
 * Central Elections Committee published them on gov.il, plus the share of
 * women in each list's realistic places as the Israel Democracy Institute
 * published it.
 *
 * Static data, identical for every visitor: nothing is fetched at runtime.
 * Names stay in Hebrew exactly as on the official list (surname first) in
 * every locale, the same way ballot letters do.
 */

/** Index of the committee's lists, linked from every list page. */
export const CANDIDATE_LISTS_INDEX_URL = "https://www.gov.il/he/pages/candidates-lists-26";

/** The date the lists below were last checked against gov.il. */
export const CANDIDATE_LISTS_CHECKED_ON = "2026-10-24";

/** Places shown before "show full list", and the places that may carry a link. */
export const TOP_PLACES = 20;

export interface CandidateListCore {
  /** The list's page on gov.il (Central Elections Committee). */
  sourceUrl: string;
  /** The list's name as the committee publishes it. */
  listTitle: string;
  /** YYYY-MM-DD, from the page's "תאריך פרסום" / "תאריך עדכון". */
  published: string;
  updated: string;
  /** In list order: index 0 is place 1. Hebrew, surname first. */
  names: string[];
  /** The committee's notices under the list (withdrawals, disqualifications), verbatim. */
  notices: string[];
}

export interface WomenRepresentation {
  /** Realistic places: the list's poll average, rounded up (minimum 4). */
  realisticPlaces: number;
  /** As IDI publishes it, e.g. 12.5. */
  womenPercent: number;
}

/** IDI, "בחירות 2026: ייצוג נשים בכנסת הבאה" (22.9.2026). */
export const WOMEN_SOURCE = {
  url: "https://www.idi.org.il/articles/66220",
  published: "2026-09-22",
  /** The polls IDI averaged to set each list's realistic places. */
  pollsFrom: "2026-08-31",
  pollsTo: "2026-09-06",
  pollCount: 9,
} as const;

export const womenRepresentation: Record<string, WomenRepresentation> = {
  yashar: { realisticPlaces: 23, womenPercent: 48 },
  likud: { realisticPlaces: 23, womenPercent: 13 },
  beyachad: { realisticPlaces: 13, womenPercent: 46 },
  hademocratim: { realisticPlaces: 10, womenPercent: 50 },
  "yisrael-beiteinu": { realisticPlaces: 9, womenPercent: 33 },
  "yahadut-hatorah": { realisticPlaces: 8, womenPercent: 0 },
  shas: { realisticPlaces: 8, womenPercent: 0 },
  "hadash-taal": { realisticPlaces: 8, womenPercent: 12.5 },
  "otzma-yehudit": { realisticPlaces: 8, womenPercent: 25 },
  "religious-zionism": { realisticPlaces: 6, womenPercent: 17 },
  raam: { realisticPlaces: 5, womenPercent: 20 },
  "amcha-yisrael": { realisticPlaces: 4, womenPercent: 25 },
  hamiluimnikim: { realisticPlaces: 4, womenPercent: 25 },
};
