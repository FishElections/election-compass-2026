import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * United Torah Judaism. Facts copied from reports/track-record/
 * veteran-status.md, verified/legal.md, review-summary.md and
 * yahadut-hatorah.md (leader).
 *
 * Left out: the three major laws in verified/major-legislation.md (bills
 * 2198907, 2201424, 2088342). UTJ is a joint list, and the member party of
 * each initiating MK is not sourced there (review-summary: NEEDS SOURCE;
 * methodology v1.6 §3.4). No predecessors are needed without them.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });
const faction = (id: number): SourceRef =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);

const empty = { achievements: {}, legalCases: {}, predecessors: {} };

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", "https://www.idi.org.il/media/32323/%D7%99%D7%94%D7%93%D7%95%D7%AA-%D7%94%D7%AA%D7%95%D7%A8%D7%94.pdf"),
      src("jpost", "https://www.jpost.com/israel-election-2026/article-907976"),
      src("times-of-israel", "https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/"),
    ],
    // verified/legal.md: Supreme Court decisions database (party-name search)
    // and a site-restricted ICC search. The web searches have no single URL.
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/"),
      src("icc", "https://www.icc-cpi.int/"),
    ],
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-08-15", sources: [faction(965)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1101)] },
    ],
    achievements: [],
    legalCases: [],
  },
  text: {
    he: { ...empty, leaderName: "יעקב אשר" },
    en: { ...empty, leaderName: "Yaakov Asher" },
    ar: { ...empty, leaderName: "يعقوب آشر" },
  },
};
