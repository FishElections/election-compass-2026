import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Blue and White. Facts copied from reports/track-record/
 * verified/major-legislation.md, verified/legal.md, veteran-status.md,
 * review-summary.md and kachol-lavan.md (leader).
 *
 * Left out:
 * - Nefesh Achat reform: excluded (conflicting evidence, methodology §3.3).
 * - Major law #3, bill 2210669 (hostages' families benefits): its initiators
 *   sat in the joint National Unity faction and their Blue and White
 *   membership is not sourced (review-summary: NEEDS SOURCE; v1.6 §3.4).
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });
const faction = (id: number): SourceRef =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);
const odata = (path: string): SourceRef =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${path}`);

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", "https://www.idi.org.il/media/32327/%D7%9B%D7%97%D7%95%D7%9C-%D7%9C%D7%91%D7%9F.pdf"),
      src("jpost", "https://www.jpost.com/israel-election-2026/article-907976"),
      src("times-of-israel", "https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/"),
    ],
    legalSourcesChecked: [
      src("ynet", "https://www.ynet.co.il/news/article/hjl5qjtw3"),
      src("walla", "https://www.walla.co.il/news/law/3341843"),
      src("maariv", "https://www.maariv.co.il/news/law/Article-993584"),
      src("ynet", "https://www.ynetnews.com/article/H1UGWgkMI"),
      src("ynet", "https://www.ynetnews.com/article/hj84xovot"),
    ],
    predecessors: [],
    knessetPeriods: [
      { knesset: 21, from: "2019-04-30", to: "2019-10-03", sources: [faction(917)] },
      { knesset: 22, from: "2019-10-03", to: "2020-03-16", sources: [faction(938)] },
      { knesset: 23, from: "2020-03-16", to: "2020-03-29", sources: [faction(1079)] },
      { knesset: 23, from: "2020-03-29", to: "2021-04-06", sources: [faction(946)] },
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", sources: [faction(969)] },
      { knesset: 25, from: "2025-07-08", sources: [faction(1110)] },
    ],
    achievements: [
      {
        id: "basic-law-knesset-amendment-49",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2020-06-15",
        sources: [
          odata("KNS_Bill(2088342)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%202088342&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%202088342&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030696&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030693&$format=json"),
        ],
      },
      {
        id: "basic-law-government-amendment-8",
        // v1.7 in-force check: still in force on the snapshot date. Its
        // alternate-government arrangement is repealed from the start of the
        // 26th Knesset (2026-11-10) by Basic Law: The Government (Amendment 13),
        // bill 2223298 (Knesset data). Kept; flagged for contributor review.
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2020-05-05",
        sources: [
          odata("KNS_Bill(2087638)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%202087638&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%202087638&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030693&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030678&$format=json"),
        ],
      },
    ],
    legalCases: [],
  },
  text: {
    he: {
      leaderName: "בני גנץ",
      achievements: {
        "basic-law-knesset-amendment-49": {
          title: "חוק-יסוד: הכנסת (תיקון מס' 49)",
          summary: "מאפשר לשרים ולסגני שרים להפסיק את חברותם בכנסת בזמן כהונתם ולחזור אליה בסיומה (\"החוק הנורווגי\").",
          ledBy: "ח״כים שפע וגינזבורג (כחול לבן) ואחרים",
        },
        "basic-law-government-amendment-8": {
          title: "חוק-יסוד: הממשלה (תיקון מס' 8 והוראת שעה)",
          summary: "מעגן ממשלת חילופים (רוטציה) עם ראש ממשלה וראש ממשלה חלופי.",
          ledBy: "ח״כים גינזבורג וניסנקורן (כחול לבן) ואחרים",
        },
      },
      legalCases: {},
      predecessors: {},
    },
    en: {
      leaderName: "Benny Gantz",
      achievements: {
        "basic-law-knesset-amendment-49": {
          title: "Basic Law: The Knesset (Amendment No. 49)",
          summary: "Lets ministers and deputy ministers leave the Knesset while in office and return afterwards (the \"Norwegian Law\").",
          ledBy: "MKs Shefa and Ginzburg (Blue and White) and others",
        },
        "basic-law-government-amendment-8": {
          title: "Basic Law: The Government (Amendment 8, Temporary Provision)",
          summary: "Sets up a rotation (\"alternate\") government with a prime minister and an alternate prime minister.",
          ledBy: "MKs Ginzburg and Nissenkorn (Blue and White) and others",
        },
      },
      legalCases: {},
      predecessors: {},
    },
    ar: {
      leaderName: "بيني غانتس",
      achievements: {
        "basic-law-knesset-amendment-49": {
          title: "قانون أساس: الكنيست (تعديل رقم 49)",
          summary: "يتيح للوزراء ونوابهم تعليق عضويتهم في الكنيست خلال توليهم المنصب والعودة إليها بعده (\"القانون النرويجي\").",
          ledBy: "عضوا الكنيست شيفع وغينزبورغ (أزرق أبيض) وآخرون",
        },
        "basic-law-government-amendment-8": {
          title: "قانون أساس: الحكومة (تعديل 8 وحكم مؤقت)",
          summary: "يرسّخ حكومة تناوب برئيس حكومة ورئيس حكومة بديل.",
          ledBy: "عضوا الكنيست غينزبورغ ونيسنكورن (أزرق أبيض) وآخرون",
        },
      },
      legalCases: {},
      predecessors: {},
    },
  },
};
