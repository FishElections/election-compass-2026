import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Beyachad (leader: Naftali Bennett). Veteran through member party Yesh Atid
 * (joint-list rule, methodology v1.1; reports/track-record/beyachad.md).
 * Bennett 2026 has no predecessor. Facts copied from
 * reports/track-record/verified/{agreements,major-legislation,legal}.md and
 * reports/track-record/review-summary.md. No peace or normalization agreement
 * qualifies (Lapid period checked; Turkey 2022 does not qualify).
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const faction = (id: number) =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);
const odata = (query: string) => src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${query}`);
const billRecord = (id: number) => odata(`KNS_Bill(${id})?$format=json`);
const billInitiators = (id: number) => odata(`KNS_BillInitiator?$filter=BillID%20eq%20${id}&$format=json`);
const billSession = (id: number) => odata(`KNS_PlmSessionItem?$filter=ItemID%20eq%20${id}&$format=json`);
const person = (id: number) => odata(`KNS_PersonToPosition?$filter=PersonID%20eq%20${id}&$format=json`);

const DOV_HOZ_BILL = "https://fs.knesset.gov.il/20/law/20_ls1_381465.pdf";

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("ynet", "https://www.ynet.co.il/news/article/s1ibdii5fe"),
      src("walla", "https://www.walla.co.il/news/politics/383955473"),
      src("times-of-israel", "https://www.timesofisrael.com/bennett-liberman-unveil-byachad-yisrael-beytenu-knesset-slates-for-upcoming-election/"),
      src("jpost", "https://jpost.com/israel-election-2026/article-907717"),
    ],
    legalSourcesChecked: [
      src("haaretz", "https://www.haaretz.co.il/news/law/2019-01-30/ty-article/.premium/0000017f-dba4-d3ff-a7ff-fba4eac80000"),
      src("haaretz", "https://www.haaretz.com/israel-news/elections/.premium-police-investigating-suspected-bennett-campaign-fund-violations-from-2012-1.6895675"),
      src("times-of-israel", "https://www.timesofisrael.com/turkey-issues-arrest-warrants-for-netanyahu-other-israeli-leaders-over-genocide-in-gaza/"),
      src("jpost", "https://www.jpost.com/international/article-873111"),
    ],
    predecessors: [
      {
        id: "yesh-atid",
        sources: [
          src("walla", "https://www.walla.co.il/news/politics/3833294"),
          src("calcalist", "https://www.calcalist.co.il/local_news/article/hkljptspwl"),
          src("times-of-israel", "https://www.timesofisrael.com/lapid-unveils-yesh-atid-lineup-for-byachad-electoral-slate/"),
          src("times-of-israel", "https://www.timesofisrael.com/wave-of-yesh-atid-mks-quit-election-run-as-joint-slate-with-bennett-falters-in-polls/"),
          src("jpost", "https://jpost.com/israel-election-2026/article-907717"),
          src("walla", "https://www.walla.co.il/news/politics/3866049"),
        ],
      },
    ],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", predecessorId: "yesh-atid", sources: [faction(967)] },
      { knesset: 25, from: "2022-11-15", predecessorId: "yesh-atid", sources: [faction(1102)] },
    ],
    // §3.4 item 3: no law passes §3.3, so up to 3 major laws, credited to Yesh
    // Atid by name. Basic Laws first (newest first), then the largest cost.
    // Verified #2, Basic Law: State Budget 2009–2013 (temporary provision)
    // (Amendment 3), bill 480895, is left out as no longer in force (v1.7):
    // Knesset data lists the Basic Law it amended as "נושן" (obsolete),
    // KNS_IsraelLaw(2002342). The verified file names no further eligible law
    // (committee bill 2223298 is not credited, v1.6).
    achievements: [
      {
        id: "basic-law-government-amendment-2014",
        // v1.7 in-force check: Basic Law: The Government is in force (Knesset
        // data). Parts of this amendment were later changed: the 19-minister and
        // 4-deputy caps were removed by Amendment 8 (2020, bill 2087638) and
        // ministers without portfolio restored by Amendment 3 (2015, bill
        // 564215). Kept; flagged for contributor review.
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2014-03-10",
        creditedTo: "yesh-atid",
        sources: [billRecord(479913), billInitiators(479913), billSession(479913), person(23640)],
      },
      {
        id: "dov-hoz-airport-law-2017",
        type: "major-legislation",
        role: "initiated",
        basicLaw: false,
        date: "2017-03-22",
        creditedTo: "yesh-atid",
        costEstimate: { value: 4_000_000_000, sources: [src("knesset", DOV_HOZ_BILL)] },
        sources: [
          billRecord(579102),
          billInitiators(579102),
          billSession(579102),
          ...[23591, 23596, 23597, 23598, 23599, 23600, 23631, 23632, 30074].map(person),
          src("knesset", DOV_HOZ_BILL),
        ],
      },
    ],
    legalCases: [],
  },
  text: {
    he: {
      leaderName: "נפתלי בנט",
      achievements: {
        "basic-law-government-amendment-2014": {
          title: "חוק-יסוד: הממשלה (תיקון)",
          summary: "תיקון לחוק-יסוד: הממשלה.",
          ledBy: "ח״כ רונן הופמן (יש עתיד) ואחרים",
        },
        "dov-hoz-airport-law-2017": {
          title: "חוק שדה התעופה דב הוז (הוראות מיוחדות), התשע\"ז-2017",
          summary: "קובע ששדה דב ימשיך לשמש שדה תעופה אזרחי כל עוד מתקיימת בו פעילות תעופה צבאית.",
          ledBy: "תשעה ח״כים מיש עתיד, מתוך 69 יוזמים",
        },
      },
      legalCases: {},
      predecessors: { "yesh-atid": { name: "יש עתיד" } },
    },
    en: {
      leaderName: "Naftali Bennett",
      achievements: {
        "basic-law-government-amendment-2014": {
          title: "Basic Law: The Government (Amendment)",
          summary: "Amends Basic Law: The Government.",
          ledBy: "MK Ronen Hoffman (Yesh Atid) and others",
        },
        "dov-hoz-airport-law-2017": {
          title: "Dov Hoz Airport (Special Provisions) Law, 2017",
          summary: "Keeps Sde Dov operating as a civilian airport for as long as military flights continue there.",
          ledBy: "Nine Yesh Atid MKs, among 69 initiators",
        },
      },
      legalCases: {},
      predecessors: { "yesh-atid": { name: "Yesh Atid" } },
    },
    ar: {
      leaderName: "نفتالي بينيت",
      achievements: {
        "basic-law-government-amendment-2014": {
          title: "قانون أساس: الحكومة (تعديل)",
          summary: "تعديل لقانون أساس: الحكومة.",
          ledBy: "عضو الكنيست رونين هوفمان (يش عتيد) وآخرون",
        },
        "dov-hoz-airport-law-2017": {
          title: "قانون مطار دوف هوز (أحكام خاصة)، 2017",
          summary: "ينصّ على استمرار عمل مطار سديه دوف مطارًا مدنيًا ما دام النشاط الجوي العسكري قائمًا فيه.",
          ledBy: "تسعة أعضاء كنيست من يش عتيد، من بين 69 مبادرًا",
        },
      },
      legalCases: {},
      predecessors: { "yesh-atid": { name: "يش عتيد" } },
    },
  },
};
