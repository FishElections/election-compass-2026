import type { SourceRef } from "../core";
import type { PartyRecordModule } from "./registry";

/**
 * Ra'am. Veteran through its own factions #973 (24th Knesset) and #1099
 * (25th Knesset), reports/track-record/veteran-status.md. The 1977 "United
 * Arab List" factions #369 and #419 are a different party and are not used.
 *
 * Achievements: no agreement, reform or law passes §3.1–§3.3, and no
 * "major law" (§3.4 item 3) from verified/major-legislation.md can be shown:
 * - #1, the Dov Hoz Airport Law (579102): Ra'am membership of its initiators
 *   is inferred, not sourced (review-summary.md, "NEEDS SOURCE").
 * - #2, Income Tax Ordinance (Amendment 125, temporary provision, 174511):
 *   not in force (v1.7). Its section 11B(g) applied only to tax years
 *   2001–2003 (Reshumot text, https://fs.knesset.gov.il//15/law/15_lsr_300624.pdf).
 * - #3, Public Libraries Law (Amendment), 2002 (173777): not in force (v1.7).
 *   The Public Libraries Law, 1975 it amended was repealed by the Public
 *   Libraries Law, 2024 (Knesset data: KNS_IsraelLaw(2000473) "בטל",
 *   2024-07-29; KNS_LawBinding of bill 2219315).
 * - The named replacement (167796) has no verified source URL, and is itself
 *   a 2000 temporary provision.
 * So the section shows "No achievement met our evidence standard".
 *
 * Legal record: none found (verified/legal.md).
 */

const ACCESSED = "2026-10-18";
const src = (publisher: SourceRef["publisher"], url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });
const odata = (path: string) => src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${path}`);
const faction = (id: number) => odata(`KNS_Faction(${id})`);

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", "https://www.idi.org.il/media/32337/רעמ.pdf"),
      src("ynet", "https://www.ynetnews.com/article/mnpvs6cf0"),
      src("ynet", "https://www.ynetnews.com/article/fx6zo1b2t"),
    ],
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/"),
      src("icc", "https://www.icc-cpi.int/"),
    ],
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", sources: [faction(973)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1099)] },
    ],
    achievements: [],
    legalCases: [],
  },
  text: {
    he: {
      leaderName: "מנסור עבאס",
      achievements: {},
      legalCases: {},
      predecessors: {},
    },
    en: {
      leaderName: "Mansour Abbas",
      achievements: {},
      legalCases: {},
      predecessors: {},
    },
    ar: {
      leaderName: "منصور عباس",
      achievements: {},
      legalCases: {},
      predecessors: {},
    },
  },
};
