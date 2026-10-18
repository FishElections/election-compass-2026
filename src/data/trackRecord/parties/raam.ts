import type { SourceRef } from "../core";
import type { PartyRecordModule } from "./registry";

/**
 * Ra'am. Veteran through its own factions #973 (24th Knesset) and #1099
 * (25th Knesset), reports/track-record/veteran-status.md. The 1977 "United
 * Arab List" factions #369 and #419 are a different party and are not used.
 *
 * Achievements: no agreement, reform or law passes §3.1–§3.3, so up to 3
 * "major laws" are shown (§3.4 item 3), from verified/major-legislation.md.
 * Its #1 there, the Dov Hoz Airport Law (579102), is left out: Ra'am
 * membership of its initiators is inferred, not sourced (review-summary.md,
 * "NEEDS SOURCE"). The named replacement (167796) has no verified source URL,
 * so it is left out too.
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
    achievements: [
      {
        id: "income-tax-amendment-125",
        type: "major-legislation",
        role: "initiated",
        basicLaw: false,
        date: "2001-02-14",
        costEstimate: {
          value: 300_000_000,
          sources: [src("knesset", "https://fs.knesset.gov.il/15/law/15_ls1_515837.PDF")],
        },
        sources: [
          odata("KNS_Bill(174511)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%20174511&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%20174511&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%20549&$format=json"),
        ],
      },
      {
        id: "public-libraries-amendment-2002",
        type: "major-legislation",
        role: "initiated",
        basicLaw: false,
        date: "2002-06-18",
        costEstimate: {
          value: 70_000_000,
          sources: [src("knesset", "https://fs.knesset.gov.il/15/law/15_ls1_516565.PDF")],
        },
        sources: [
          odata("KNS_Bill(173777)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%20173777&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%20173777&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%20551&$format=json"),
        ],
      },
    ],
    legalCases: [],
  },
  text: {
    he: {
      leaderName: "מנסור עבאס",
      achievements: {
        "income-tax-amendment-125": {
          title: "תיקון פקודת מס הכנסה (מס' 125, הוראת שעה)",
          summary: "בין היוזמים ח\"כ טלב אלסאנע (רע\"ם); אומדן העלות: כ-300 מיליון ש\"ח בשנה.",
        },
        "public-libraries-amendment-2002": {
          title: "חוק הספריות הציבוריות (תיקון), 2002",
          summary: "בין היוזמים ח\"כ האשם מחאמיד (רע\"ם); לפי משרד האוצר, העלות כ-70 מיליון ש\"ח בשנה.",
        },
      },
      legalCases: {},
      predecessors: {},
    },
    en: {
      leaderName: "Mansour Abbas",
      achievements: {
        "income-tax-amendment-125": {
          title: "Income Tax Ordinance (Amendment 125, Temporary Provision)",
          summary: "Co-initiated by MK Talab al-Sana (Ra'am); estimated cost: about NIS 300 million a year.",
        },
        "public-libraries-amendment-2002": {
          title: "Public Libraries Law (Amendment), 2002",
          summary: "Co-initiated by MK Hashem Mahamid (Ra'am); Finance Ministry estimate: about NIS 70 million a year.",
        },
      },
      legalCases: {},
      predecessors: {},
    },
    ar: {
      leaderName: "منصور عباس",
      achievements: {
        "income-tax-amendment-125": {
          title: "تعديل أمر ضريبة الدخل (رقم 125، حكم مؤقت)",
          summary: "من مبادريه عضو الكنيست طلب الصانع (القائمة الموحدة)، وتبلغ كلفته المقدّرة نحو 300 مليون شيكل سنويًا.",
        },
        "public-libraries-amendment-2002": {
          title: "قانون المكتبات العامة (تعديل)، 2002",
          summary: "من مبادريه عضو الكنيست هاشم محاميد (القائمة الموحدة)، وتقدّر وزارة المالية كلفته بنحو 70 مليون شيكل سنويًا.",
        },
      },
      legalCases: {},
      predecessors: {},
    },
  },
};
