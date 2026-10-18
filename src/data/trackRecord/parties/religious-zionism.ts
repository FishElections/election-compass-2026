import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Religious Zionism–Zehut. Facts copied from reports/track-record/
 * verified/major-legislation.md, verified/legal.md, veteran-status.md,
 * review-summary.md and religious-zionism.md (list composition, leader).
 *
 * The 2026 list is a joint list (methodology §2.3, v1.1). Its Knesset seats
 * and major laws come from the member party Religious Zionism (registered as
 * National Union–Tkuma), whose factions are named "הציונות הדתית".
 *
 * Left out: legal row SM-01 (2005 detention). verified/legal.md gives no end
 * date ("not stated"), and a concluded case needs one.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });
const faction = (id: number): SourceRef =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);
const odata = (path: string): SourceRef =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/${path}`);

const IDI_CEC_PRINT = "https://www.idi.org.il/media/32318/%D7%94%D7%A6%D7%99%D7%95%D7%A0%D7%95%D7%AA-%D7%94%D7%93%D7%AA%D7%99%D7%AA.pdf";
const RZP = "religious-zionist-party";

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", IDI_CEC_PRINT),
      src("jpost", "https://www.jpost.com/israel-election-2026/article-907976"),
      src("times-of-israel", "https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/"),
    ],
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/05/940/071/H01&fileName=05071940_H01.txt&type=2"),
      src("ynet", "https://www.ynetnews.com/articles/0,7340,L-4614147,00.html"),
      src("times-of-israel", "https://www.timesofisrael.com/how-bezalel-smotrich-rode-unfiltered-radicalism-and-unforgiving-politics-to-power/"),
      src("times-of-israel", "https://www.timesofisrael.com/smotrich-says-icc-has-issued-warrant-for-his-arrest-promptly-orders-demolition-of-west-bank-hamlet/"),
      src("jpost", "https://www.jpost.com/israel-news/article-896609"),
      src("ynet", "https://www.ynetnews.com/article/rkhzh0dyml"),
    ],
    predecessors: [
      {
        id: RZP,
        sources: [
          src("idi", IDI_CEC_PRINT),
          src("idi", "https://en.idi.org.il/israeli-elections-and-parties/parties/religious-zionist-party/"),
          src("jpost", "https://www.jpost.com/israel-election-2026/article-907976"),
          src("ynet", "https://www.ynetnews.com/article/h19j11ueogl"),
        ],
      },
    ],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", predecessorId: RZP, sources: [faction(961)] },
      { knesset: 25, from: "2022-11-15", to: "2022-11-20", predecessorId: RZP, sources: [faction(1097)] },
      { knesset: 25, from: "2022-11-20", predecessorId: RZP, sources: [faction(1105)] },
    ],
    achievements: [
      {
        id: "basic-law-state-economy-amendment-13",
        type: "major-legislation",
        role: "sponsored",
        basicLaw: true,
        date: "2023-05-22",
        creditedTo: RZP,
        sources: [
          odata("KNS_Bill(2203822)?$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%202203822&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030055&$format=json"),
          src("knesset", "https://fs.knesset.gov.il/25/Plenum/25_ptm_2127049.doc"),
        ],
      },
      {
        id: "basic-law-government-amendment-12",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2023-03-22",
        creditedTo: RZP,
        sources: [
          odata("KNS_Bill(2201424)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%202201424&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%202201424&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030812&$format=json"),
        ],
      },
      {
        id: "basic-law-government-amendment-11",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2022-12-26",
        creditedTo: RZP,
        sources: [
          odata("KNS_Bill(2198130)?$format=json"),
          odata("KNS_BillInitiator?$filter=BillID%20eq%202198130&$format=json"),
          odata("KNS_PlmSessionItem?$filter=ItemID%20eq%202198130&$format=json"),
          odata("KNS_PersonToPosition?$filter=PersonID%20eq%2030812&$format=json"),
        ],
      },
    ],
    legalCases: [
      {
        // Reported; not confirmed by the ICC (verified/legal.md SM-02).
        id: "icc-arrest-warrant-application-2026",
        jurisdiction: "ICC",
        status: "arrest-warrant-requested",
        since: "2026-04-02",
        statusConfirmed: false,
        lastConfirmedOn: "2026-05-19",
        sources: [
          src("times-of-israel", "https://www.timesofisrael.com/smotrich-says-icc-has-issued-warrant-for-his-arrest-promptly-orders-demolition-of-west-bank-hamlet/"),
          src("jpost", "https://www.jpost.com/israel-news/article-896609"),
          src("ynet", "https://www.ynetnews.com/article/rkhzh0dyml"),
        ],
      },
      {
        // verified/legal.md SM-01: arrested 12.7.2005, released without
        // charges; no approved source states the release date.
        id: "detention-2005",
        jurisdiction: "IL",
        status: "ended-other",
        since: "2005-07-12",
        endDateUnknown: true,
        statusConfirmed: true,
        sources: [
          src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/05/940/071/H01&fileName=05071940_H01.txt&type=2"),
          src("ynet", "https://www.ynetnews.com/articles/0,7340,L-4614147,00.html"),
          src("times-of-israel", "https://www.timesofisrael.com/how-bezalel-smotrich-rode-unfiltered-radicalism-and-unforgiving-politics-to-power/"),
        ],
      },
    ],
  },
  text: {
    he: {
      leaderName: "בצלאל סמוטריץ'",
      achievements: {
        "basic-law-state-economy-amendment-13": {
          title: "חוק-יסוד: משק המדינה (תיקון מס' 13)",
          summary: "הצעת חוק ממשלתית שהציג בקריאה הראשונה שר האוצר בצלאל סמוטריץ'.",
        },
        "basic-law-government-amendment-12": {
          title: "חוק-יסוד: הממשלה (תיקון מס' 12)",
          summary: "הצעת חוק פרטית פ/2560/25; בין יוזמיה ח״כ שמחה רוטמן.",
        },
        "basic-law-government-amendment-11": {
          title: "חוק-יסוד: הממשלה (תיקון מס' 11)",
          summary: "הצעת חוק פרטית פ/81/25; ח״כ שמחה רוטמן רשום ראשון בין יוזמיה.",
        },
      },
      legalCases: {
        "icc-arrest-warrant-application-2026": {
          description:
            "לפי דיווחים, לשכת התובע ביקשה צו מעצר נגדו; האישומים המדווחים כוללים העברה כפויה של אוכלוסייה ואפרטהייד. בית הדין לא אישר זאת.",
        },
        "detention-2005": {
          description:
            "נעצר ב-2005 בחשד לקשירת קשר לפשע ולהפרעה לנתיב תחבורה; שוחרר ללא כתב אישום.",
        },
      },
      predecessors: {
        [RZP]: { name: "הציונות הדתית (האיחוד הלאומי–תקומה)" },
      },
    },
    en: {
      leaderName: "Bezalel Smotrich",
      achievements: {
        "basic-law-state-economy-amendment-13": {
          title: "Basic Law: The State Economy (Amendment No. 13)",
          summary: "Government bill presented at first reading by Finance Minister Bezalel Smotrich.",
        },
        "basic-law-government-amendment-12": {
          title: "Basic Law: The Government (Amendment No. 12)",
          summary: "Private bill P/2560/25; its initiators include MK Simcha Rothman.",
        },
        "basic-law-government-amendment-11": {
          title: "Basic Law: The Government (Amendment No. 11)",
          summary: "Private bill P/81/25; MK Simcha Rothman is listed first among its initiators.",
        },
      },
      legalCases: {
        "icc-arrest-warrant-application-2026": {
          description:
            "The prosecutor reportedly requested an arrest warrant against him; reported charges include forcible transfer of population and apartheid. The court has not confirmed.",
        },
        "detention-2005": {
          description:
            "Arrested in 2005 on suspicion of conspiracy to commit a crime and blocking traffic; released without charges.",
        },
      },
      predecessors: {
        [RZP]: { name: "Religious Zionist Party (National Union–Tkuma)" },
      },
    },
    ar: {
      leaderName: "بتسلئيل سموتريتش",
      achievements: {
        "basic-law-state-economy-amendment-13": {
          title: "قانون أساس: اقتصاد الدولة (تعديل رقم 13)",
          summary: "مشروع قانون حكومي قدّمه في القراءة الأولى وزير المالية بتسلئيل سموتريتش.",
        },
        "basic-law-government-amendment-12": {
          title: "قانون أساس: الحكومة (تعديل رقم 12)",
          summary: "مشروع قانون خاص (ف/2560/25)، ومن بين المبادرين إليه عضو الكنيست سيمحا روتمان.",
        },
        "basic-law-government-amendment-11": {
          title: "قانون أساس: الحكومة (تعديل رقم 11)",
          summary: "مشروع قانون خاص (ف/81/25)، ويرد اسم عضو الكنيست سيمحا روتمان أولاً بين المبادرين إليه.",
        },
      },
      legalCases: {
        "icc-arrest-warrant-application-2026": {
          description:
            "أفادت تقارير بأن مكتب المدعي العام طلب إصدار مذكرة اعتقال بحقه، وتشمل التهم المذكورة النقل القسري للسكان والفصل العنصري. ولم تؤكده المحكمة.",
        },
        "detention-2005": {
          description:
            "اعتُقل عام 2005 للاشتباه بالتآمر لارتكاب جريمة وعرقلة حركة المرور؛ وأُفرج عنه دون توجيه لائحة اتهام.",
        },
      },
      predecessors: {
        [RZP]: { name: "حزب الصهيونية الدينية (الاتحاد الوطني–تكوما)" },
      },
    },
  },
};
