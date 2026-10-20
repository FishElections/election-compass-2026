import type { LegalCaseCore, SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Shas. Facts copied from reports/track-record/verified/ (major-legislation.md,
 * legal.md), veteran-status.md and the pass-1 report reports/track-record/shas.md.
 * Nothing here was researched anew.
 *
 * No reform or law passed the impact test, so up to 3 "major laws" are shown
 * (methodology v1.6 §3.4 item 3). All three are Basic-Law amendments, which
 * count as Basic Laws; laws presented by a deputy minister are not credited.
 *
 * Dates: where a verified row gives only a year or a month, the date is
 * written YYYY-01-01 / YYYY-MM-01 with its precision set, so no day is shown.
 */

const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const uniqueSources = (sources: SourceRef[]): SourceRef[] =>
  sources.filter((s, i) => sources.findIndex((o) => o.url === s.url) === i);

const faction = (id: number) => src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);

const odata = "https://knesset.gov.il/Odata/ParliamentInfo.svc";
const billSources = (billId: number, personId: number): SourceRef[] => [
  src("knesset", `${odata}/KNS_Bill(${billId})?$format=json`),
  src("knesset", `${odata}/KNS_BillInitiator?$filter=BillID%20eq%20${billId}&$format=json`),
  src("knesset", `${odata}/KNS_PlmSessionItem?$filter=ItemID%20eq%20${billId}&$format=json`),
  src("knesset", `${odata}/KNS_PersonToPosition?$filter=PersonID%20eq%20${personId}&$format=json`),
];

const hcj8948 = src(
  "courts",
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/22/480/089/v17&fileName=22089480_v17.txt&type=2"
);
const hcj232 = src(
  "courts",
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/16/320/002/h04&fileName=16002320_h04.txt&type=2"
);

const legalCases: LegalCaseCore[] = [
  {
    id: "personal-case-bribery",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "1993-01-01",
    sincePrecision: "year",
    endedOn: "2000-08-23",
    statusConfirmed: true,
    moralTurpitude: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/00/670/055/A05&fileName=00055670_A05.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/99/750/035/F06&fileName=99035750_F06.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/00/670/055/A04&fileName=00055670_A04.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/00/830/084/A14&fileName=00084830_A14.txt&type=2"),
      hcj8948,
      hcj232,
    ],
  },
  {
    id: "public-case-breach-of-trust",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "1999-01-01",
    sincePrecision: "year",
    endedOn: "2003-11-20",
    statusConfirmed: true,
    sources: [hcj232, hcj8948],
  },
  {
    id: "bar-on-hebron",
    jurisdiction: "IL",
    status: "closed",
    since: "1997-04-01",
    sincePrecision: "month",
    endedOn: "2001-12-16",
    statusConfirmed: true,
    sources: [
      hcj8948,
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%5C97%5C340%5C025%5CD06&fileName=97025340_D06.txt&type=2"),
    ],
  },
  {
    id: "investigation-2016-non-tax",
    jurisdiction: "IL",
    status: "closed",
    since: "2016-03-01",
    sincePrecision: "month",
    endedOn: "2021-01-08",
    statusConfirmed: true,
    sources: [
      hcj8948,
      src("n12", "https://www.mako.co.il/news-law/crime-q4_2018/Article-a4284810eff2761004.htm"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-5409986,00.html"),
    ],
  },
  {
    // No court ruling on moral turpitude, so the field is left out.
    id: "tax-offences-plea",
    jurisdiction: "IL",
    status: "convicted-plea-final",
    since: "2021-01-08",
    endedOn: "2022-02-01",
    statusConfirmed: true,
    sources: [hcj8948],
  },
];

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("cec", "https://www.gov.il/he/pages/shas_list19"),
      src("ynet", "https://www.ynet.co.il/news/elections2026/article/hkjzuqtofe"),
    ],
    legalSourcesChecked: uniqueSources(legalCases.flatMap((c) => c.sources)),
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", sources: [faction(971)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1095)] },
    ],
    achievements: [
      {
        id: "basic-law-government-amendment-12",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2023-03-22",
        sources: billSources(2201424, 30601),
      },
      {
        id: "basic-law-government-amendment-11",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2022-12-26",
        sources: billSources(2198130, 30660),
      },
      {
        id: "basic-law-knesset-amendment-49",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2020-06-15",
        sources: billSources(2088342, 30749),
      },
    ],
    legalCases,
  },
  text: {
    he: {
      leaderName: "אריה דרעי",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "חוק־יסוד: הממשלה (תיקון מס' 12)",
          summary: "קובע שנבצרות זמנית של ראש הממשלה תהיה רק בשל אי-מסוגלות פיזית או נפשית, באישורים מוגדרים.",
          ledBy: "ח״כ ינון אזולאי (ש״ס) ואחרים",
        },
        "basic-law-government-amendment-11": {
          title: "חוק-יסוד: הממשלה (תיקון מס' 11)",
          summary: "מאפשר למנות במשרד שר נוסף, האחראי לתחומים מסוימים בכפוף לשר הממונה על המשרד.",
          ledBy: "ח״כ משה ארבל (ש״ס) ואחרים",
        },
        "basic-law-knesset-amendment-49": {
          title: "חוק-יסוד: הכנסת (תיקון מס' 49)",
          summary: "מאפשר לשרים ולסגני שרים להפסיק את חברותם בכנסת בזמן כהונתם ולחזור אליה בסיומה (\"החוק הנורווגי\").",
          ledBy: "ח״כ משה אבוטבול (ש״ס) ואחרים",
        },
      },
      legalCases: {
        "personal-case-bribery": {
          description: "כתב אישום ב-1993 על לקיחת שוחד וניצול תפקידו במשרד הפנים (1984–1990); הורשע; בערעור הופחת העונש לשלוש שנות מאסר.",
        },
        "public-case-breach-of-trust": {
          description: "עבירה אחת של הפרת אמונים: הסדרת 400,000 ש״ח ב-1989 לעמותה שניהל אחיו. שלושה חודשי מאסר על תנאי וקנס.",
        },
        "bar-on-hebron": {
          description: "פרשת בר-און–חברון: באפריל 1997 אומצה המלצה להעמידו לדין בכפוף לשימוע; התיק נסגר על רקע הרשעתו בתיק האישי והתקדמות התיק הציבורי.",
        },
        "investigation-2016-non-tax": {
          description: "חקירה בחשד לשוחד, מרמה, הפרת אמונים והלבנת הון, שהוחלט עליה במרץ 2016; נסגרה: לא נמצא בסיס ראייתי מספיק, למעט ענייני מס.",
        },
        "tax-offences-plea": {
          description: "הסדר טיעון בעבירות מס; הורשע על פי הודאתו לאחר שהתפטר מהכנסת; 12 חודשי מאסר על תנאי וקנס 180,000 ש״ח.",
        },
      },
      predecessors: {},
    },
    en: {
      leaderName: "Aryeh Deri",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "Basic Law: The Government (Amendment No. 12)",
          summary: "Limits declaring a prime minister temporarily incapacitated to physical or mental inability, with set approval steps.",
          ledBy: "MK Yinon Azoulay (Shas) and others",
        },
        "basic-law-government-amendment-11": {
          title: "Basic Law: The Government (Amendment No. 11)",
          summary: "Allows appointing an additional minister in a ministry, responsible for set areas under the ministry's minister.",
          ledBy: "MK Moshe Arbel (Shas) and others",
        },
        "basic-law-knesset-amendment-49": {
          title: "Basic Law: The Knesset (Amendment No. 49)",
          summary: "Lets ministers and deputy ministers leave the Knesset while in office and return afterwards (the \"Norwegian Law\").",
          ledBy: "MK Moshe Abutbul (Shas) and others",
        },
      },
      legalCases: {
        "personal-case-bribery": {
          description: "Indicted 1993 for taking bribes and misusing his position at the Interior Ministry (1984–1990); convicted; appeal reduced sentence to three years.",
        },
        "public-case-breach-of-trust": {
          description: "One count of breach of trust: arranging NIS 400,000 in 1989 for an association run by his brother. Three months suspended, fine.",
        },
        "bar-on-hebron": {
          description: "Bar-On/Hebron affair: April 1997 recommendation to indict, subject to hearing, adopted; closed given his conviction and public-case progress.",
        },
        "investigation-2016-non-tax": {
          description: "Investigation into bribery, fraud, breach of trust and money laundering, ordered March 2016; closed: insufficient evidence, apart from tax matters.",
        },
        "tax-offences-plea": {
          description: "Plea agreement on tax offences; convicted on his admission after resigning from the Knesset; 12 months suspended, NIS 180,000 fine.",
        },
      },
      predecessors: {},
    },
    ar: {
      leaderName: "أرييه درعي",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "قانون أساس: الحكومة (التعديل رقم 12)",
          summary: "يحصر إعلان تعذّر قيام رئيس الحكومة بمهامه مؤقتًا في العجز الجسدي أو النفسي، وفق إجراءات مصادقة محددة.",
          ledBy: "عضو الكنيست ينون أزولاي (شاس) وآخرون",
        },
        "basic-law-government-amendment-11": {
          title: "قانون أساس: الحكومة (التعديل رقم 11)",
          summary: "يتيح تعيين وزير إضافي في وزارة، مسؤول عن مجالات محددة بإشراف الوزير المسؤول عن الوزارة.",
          ledBy: "عضو الكنيست موشيه أربيل (شاس) وآخرون",
        },
        "basic-law-knesset-amendment-49": {
          title: "قانون أساس: الكنيست (التعديل رقم 49)",
          summary: "يتيح للوزراء ونوابهم تعليق عضويتهم في الكنيست خلال توليهم المنصب والعودة إليها بعده (\"القانون النرويجي\").",
          ledBy: "عضو الكنيست موشيه أبوطبول (شاس) وآخرون",
        },
      },
      legalCases: {
        "personal-case-bribery": {
          description: "لائحة اتهام عام 1993 بتلقي رشوة واستغلال منصبه في وزارة الداخلية (1984–1990)؛ أُدين؛ وخُفّف الحكم في الاستئناف إلى ثلاث سنوات سجن.",
        },
        "public-case-breach-of-trust": {
          description: "تهمة واحدة بخيانة الأمانة: ترتيب 400,000 شيكل عام 1989 لجمعية يديرها شقيقه. ثلاثة أشهر سجن مع وقف التنفيذ وغرامة.",
        },
        "bar-on-hebron": {
          description: "قضية بار-أون–الخليل: في أبريل 1997 اعتُمدت توصية بتقديمه للمحاكمة رهنًا بالاستماع؛ أُغلق الملف في ضوء إدانته وتقدّم الملف العام.",
        },
        "investigation-2016-non-tax": {
          description: "تحقيق في الرشوة والاحتيال وخيانة الأمانة وتبييض الأموال، أُمر به في مارس 2016؛ أُغلق لعدم كفاية الأدلة، باستثناء مسائل ضريبية.",
        },
        "tax-offences-plea": {
          description: "صفقة ادعاء في مخالفات ضريبية؛ أُدين باعترافه بعد استقالته من الكنيست؛ 12 شهرًا سجنًا مع وقف التنفيذ وغرامة 180,000 شيكل.",
        },
      },
      predecessors: {},
    },
  },
};
