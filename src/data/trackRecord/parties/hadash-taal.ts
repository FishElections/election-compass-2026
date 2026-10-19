import type { SourceRef } from "../core";
import type { PartyRecordModule } from "./registry";

/**
 * The Joint List (Hadash, Ta'al, Balad). Veteran through its own Joint List
 * factions, 20th–24th Knessets (reports/track-record/veteran-status.md). The
 * 2026 make-up is sourced in reports/track-record/hadash-taal.md (CEC list
 * page via IDI, Times of Israel, Jerusalem Post). Hadash is credited as
 * "Hadash" (methodology v1.3), though its registered name is the Israeli
 * Communist Party.
 *
 * Achievements: no agreement, reform or law passes §3.1–§3.3, so up to 3
 * "major laws" are shown (§3.4 item 3), from verified/major-legislation.md,
 * each credited to the member party whose MK initiated it (v1.6). Its #1
 * there, the Dov Hoz Airport Law (579102), is left out: the member parties of
 * its initiators are inferred, not sourced (review-summary.md, "NEEDS SOURCE").
 * Its #3, Income Tax Ordinance (Amendment 125, temporary provision, 174511),
 * is left out as no longer in force (v1.7): section 11B(g) applied only to
 * tax years 2001–2003 (Reshumot text,
 * https://fs.knesset.gov.il//15/law/15_lsr_300624.pdf). The verified file
 * names no further eligible law. Its #2 is also left out (v1.9, see
 * achievements below), so no item remains.
 *
 * Legal record: none found (verified/legal.md).
 */

const ACCESSED = "2026-10-18";
const src = (publisher: SourceRef["publisher"], url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });
const odata = (path: string) => src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${path}`);
const faction = (id: number) => odata(`KNS_Faction(${id})`);

/** The CEC list page (IDI copy) and two news publishers (hadash-taal.md). */
const composition: SourceRef[] = [
  src("idi", "https://www.idi.org.il/media/32320/%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA.pdf"),
  src("times-of-israel", "https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/"),
  src("jpost", "https://www.jpost.com/israel-election-2026/article-910422"),
];

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", "https://www.idi.org.il/media/32320/%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA.pdf"),
      src("times-of-israel", "https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/"),
      src("jpost", "https://www.jpost.com/israel-election-2026/article-906019"),
    ],
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/"),
      src("maariv", "https://www.maariv.co.il/news/law/article-824474"),
      src("icc", "https://www.icc-cpi.int/"),
    ],
    predecessors: [
      { id: "hadash", sources: composition },
      { id: "taal", sources: composition },
      { id: "balad", sources: composition },
    ],
    knessetPeriods: [
      { knesset: 20, from: "2015-03-31", to: "2019-04-30", sources: [faction(903)] },
      { knesset: 22, from: "2019-10-03", to: "2019-12-30", sources: [faction(940)] },
      { knesset: 23, from: "2020-03-16", to: "2021-01-28", sources: [faction(943)] },
      { knesset: 23, from: "2021-01-28", to: "2021-04-06", sources: [faction(1074)] },
      { knesset: 24, from: "2021-04-06", to: "2022-09-06", sources: [faction(964)] },
    ],
    // v1.9 §3.4: Women's Work Law (Amendment 37), bill 142245, is left out.
    // Its 14-week maternity leave and benefit period were replaced by 15 weeks
    // in the Law on Changes to the Birth and Parenthood Period Arrangement
    // (Legislative Amendments), 2017, bill 2012821
    // (https://fs.knesset.gov.il//20/law/20_lsr_382405.pdf). The verified file
    // names no further eligible law, so no item remains.
    achievements: [],
    legalCases: [],
  },
  text: {
    he: {
      leaderName: "יוסף ג'בארין",
      achievements: {},
      legalCases: {},
      predecessors: {
        hadash: { name: "חד\"ש" },
        taal: { name: "תע\"ל" },
        balad: { name: "בל\"ד" },
      },
    },
    en: {
      leaderName: "Yousef Jabareen",
      achievements: {},
      legalCases: {},
      predecessors: {
        hadash: { name: "Hadash" },
        taal: { name: "Ta'al" },
        balad: { name: "Balad" },
      },
    },
    ar: {
      leaderName: "يوسف جبارين",
      achievements: {},
      legalCases: {},
      predecessors: {
        hadash: { name: "الجبهة الديمقراطية للسلام والمساواة" },
        taal: { name: "الحركة العربية للتغيير" },
        balad: { name: "التجمع الوطني الديمقراطي" },
      },
    },
  },
};
