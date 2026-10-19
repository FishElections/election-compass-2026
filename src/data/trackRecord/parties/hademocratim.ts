import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * The Democrats (leader: Yair Golan). Veteran through the Israeli Labor Party
 * (merger and rename, reports/track-record/hademocratim.md). Facts copied from
 * reports/track-record/verified/{agreements,major-legislation,legal}.md and
 * reports/track-record/review-summary.md (v1.6 stand-in ruling applied).
 * Methodology v1.6: peace and normalization agreements only.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const faction = (id: number) =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);
const odata = (path: string) =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${path}?$format=json`);
const bill = (id: number) => [
  odata(`KNS_Bill(${id})`),
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_BillInitiator?$filter=BillID%20eq%20${id}&$format=json`),
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PlmSessionItem?$filter=ItemID%20eq%20${id}&$format=json`),
];
const person = (id: number) =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition?$filter=PersonID%20eq%20${id}&$format=json`);

const CEC_LIST = "https://www.gov.il/he/pages/hademokratim_list17";
const WASHINGTON_DECLARATION = "https://fs.knesset.gov.il//13/Plenum/13_ptm_532258.docx";
const JPOST_WASHINGTON = "https://www.jpost.com/history/article-862095";
const WALLA_GOLAN = "https://www.walla.co.il/news/israel/1183063";
const YNET_GOLAN_EN = "https://www.ynetnews.com/articles/0,7340,L-3461591,00.html";
const YNET_GOLAN_HE = "https://www.ynet.co.il/articles/0,7340,L-3461530,00.html";
const HAARETZ_GOLAN = "https://www.haaretz.co.il/misc/2007-10-18/ty-article/0000017f-e0df-d38f-a57f-e6df59de0000";

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("cec", CEC_LIST),
      src("idi", "https://www.idi.org.il/media/32313/%D7%94%D7%93%D7%9E%D7%95%D7%A7%D7%A8%D7%98%D7%99%D7%9D.pdf"),
    ],
    legalSourcesChecked: [
      src("walla", WALLA_GOLAN),
      src("ynet", YNET_GOLAN_EN),
      src("haaretz", HAARETZ_GOLAN),
    ],
    predecessors: [
      {
        id: "labor",
        sources: [
          src("knesset", "https://fs.knesset.gov.il/25/Committees/25_ptv_5792546.doc"),
          src("idi", "https://www.idi.org.il/policy/parties-and-elections/parties/democrats/"),
          src("idi", "https://www.idi.org.il/policy/parties-and-elections/parties/haavoda/"),
          src("jpost", "https://jpost.com/israel-news/article-843691"),
          src("maariv", "https://www.maariv.co.il/news/politics/article-1111356"),
          src("walla", "https://www.walla.co.il/news/politics/3674415"),
          {
            ...src("times-of-israel", "https://www.timesofisrael.com/liveblog_entry/labor-central-committee-near-unanimously-approves-merger-with-meretz/"),
            archiveUrl:
              "https://web.archive.org/web/20240713093811/https://www.timesofisrael.com/liveblog_entry/labor-central-committee-near-unanimously-approves-merger-with-meretz/",
          },
          src("cec", CEC_LIST),
        ],
      },
    ],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", predecessorId: "labor", sources: [faction(963)] },
      { knesset: 25, from: "2022-11-15", predecessorId: "labor", sources: [faction(1100)] },
    ],
    achievements: [
      {
        id: "labor-jordan-1994",
        type: "agreement",
        role: "prime-minister",
        category: "peace",
        country: "JO",
        relation: "establish",
        inForce: true,
        signedText: true,
        date: "1994-10-26",
        creditedTo: "labor",
        sources: [
          src("un-treaties", "https://treaties.un.org/Pages/showDetails.aspx?objid=080000028009bc5b&clang=_en"),
          src("gov-il", "https://www.gov.il/en/pages/peace-with-jordan"),
          src("knesset", WASHINGTON_DECLARATION),
          src("jpost", JPOST_WASHINGTON),
        ],
        steps: [
          {
            id: "washington-declaration",
            date: "1994-07-25",
            sources: [src("knesset", WASHINGTON_DECLARATION), src("jpost", JPOST_WASHINGTON)],
          },
        ],
      },
      // §3.4 item 3: no law passes §3.3, so up to 3 major laws. Basic Laws
      // first, newest first. Bill 2146354 is excluded (v1.6 stand-in ruling);
      // bill 132198 is excluded (member party not sourced, no URL).
      // v1.9: Basic Law: The Government (Amendment 8 and Temporary Provision),
      // 2020, bill 2087638, is left out. Its alternate-government arrangement
      // (ss. 13A, 43A–43H) is repealed, from the start of the 26th Knesset, by
      // Basic Law: The Government (Amendment 13), 2025, bill 2223298
      // (https://fs.knesset.gov.il/25/law/25_lsr_6802943.pdf). The verified file names no further eligible law.
      {
        id: "basic-law-knesset-amendment-41-2014",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2014-05-19",
        creditedTo: "labor",
        sources: [...bill(540974), person(23570)],
      },
    ],
    legalCases: [
      {
        id: "mpcid-neighbor-procedure-2007",
        jurisdiction: "IL",
        status: "ended-other",
        // The sources give only the year the Military Police investigation opened.
        since: "2007-01-01",
        sincePrecision: "year",
        endedOn: "2007-10-18",
        statusConfirmed: true,
        sources: [
          src("walla", WALLA_GOLAN),
          src("ynet", YNET_GOLAN_EN),
          src("ynet", YNET_GOLAN_HE),
          src("haaretz", HAARETZ_GOLAN),
        ],
      },
    ],
  },
  text: {
    he: {
      leaderName: "יאיר גולן",
      achievements: {
        "labor-jordan-1994": {
          title: "חוזה השלום בין ישראל לירדן",
          summary: "מכונן שלום ויחסים דיפלומטיים בין ישראל לירדן; בתוקף מ-10 בנובמבר 1994.",
          primeMinister: "יצחק רבין",
          steps: { "washington-declaration": "הצהרת וושינגטון" },
        },
        "basic-law-knesset-amendment-41-2014": {
          title: "חוק-יסוד: הכנסת (תיקון מס' 41)",
          summary: "תיקון לחוק-יסוד: הכנסת.",
          ledBy: "ח״כ מיכל בירן (העבודה) ואחרים",
        },
      },
      legalCases: {
        "mpcid-neighbor-procedure-2007": {
          description: "חקירת מצ״ח (2007) בעניין נוהל \"אזהרה מוקדמת\"; הפרקליט הצבאי הראשי החליט שלא לנקוט הליך פלילי, אלא צעדים משמעתיים.",
        },
      },
      predecessors: { labor: { name: "מפלגת העבודה הישראלית" } },
    },
    en: {
      leaderName: "Yair Golan",
      achievements: {
        "labor-jordan-1994": {
          title: "Israel–Jordan Peace Treaty",
          summary: "Establishes peace and diplomatic relations between Israel and Jordan; in force from 10 November 1994.",
          primeMinister: "Yitzhak Rabin",
          steps: { "washington-declaration": "Washington Declaration" },
        },
        "basic-law-knesset-amendment-41-2014": {
          title: "Basic Law: The Knesset (Amendment 41)",
          summary: "Amends Basic Law: The Knesset.",
          ledBy: "MK Michal Biran (Labor) and others",
        },
      },
      legalCases: {
        "mpcid-neighbor-procedure-2007": {
          description: "Military Police investigation (2007) of the \"early warning\" procedure; the Military Advocate General decided against criminal proceedings; disciplinary measures instead.",
        },
      },
      predecessors: { labor: { name: "Israeli Labor Party" } },
    },
    ar: {
      leaderName: "يائير غولان",
      achievements: {
        "labor-jordan-1994": {
          title: "معاهدة السلام بين إسرائيل والأردن",
          summary: "تُقيم السلام والعلاقات الدبلوماسية بين إسرائيل والأردن؛ سارية منذ 10 نوفمبر 1994.",
          primeMinister: "إسحاق رابين",
          steps: { "washington-declaration": "إعلان واشنطن" },
        },
        "basic-law-knesset-amendment-41-2014": {
          title: "قانون أساس: الكنيست (التعديل رقم 41)",
          summary: "تعديل لقانون أساس: الكنيست.",
          ledBy: "عضو الكنيست ميخال بيران (العمل) وآخرون",
        },
      },
      legalCases: {
        "mpcid-neighbor-procedure-2007": {
          description: "تحقيق الشرطة العسكرية (2007) في إجراء \"الإنذار المبكر\"؛ قرّر المدعي العسكري العام عدم اتخاذ إجراءات جنائية، واكتُفي بإجراءات تأديبية.",
        },
      },
      predecessors: { labor: { name: "حزب العمل الإسرائيلي" } },
    },
  },
};
