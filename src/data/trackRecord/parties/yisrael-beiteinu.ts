import type { LegalCaseCore, SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Yisrael Beiteinu. Facts copied from reports/track-record/verified/
 * (reforms-legislation.md, legal.md), veteran-status.md and the pass-1 report
 * reports/track-record/yisrael-beiteinu.md. Nothing here was researched anew.
 *
 * Dates: where a verified row gives only a year or a month, the date is
 * written YYYY-01-01 / YYYY-MM-01 with its precision set, so no day is shown.
 *
 * Sugar tax impact: the Bank of Israel reports only a relative change (-16%
 * per capita for high-sugar drinks, Nov 2021-Oct 2022 vs Nov 2020-Oct 2021).
 * It is stored as an index (100 -> 84), dated by the start of each period.
 *
 * Major laws (v1.6 §3.4 item 3): the sugar-tax reform passed the impact
 * test, but no law did, so up to 3 laws the party led are shown too, from
 * verified/major-legislation.md. All three are Basic Laws or Basic-Law
 * amendments, newest first.
 */

const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const uniqueSources = (sources: SourceRef[]): SourceRef[] =>
  sources.filter((s, i) => sources.findIndex((o) => o.url === s.url) === i);

const faction = (id: number) => src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);

const odata = "https://knesset.gov.il/Odata/ParliamentInfo.svc";
const billSources = (billId: number, personIds: number[]): SourceRef[] => [
  src("knesset", `${odata}/KNS_Bill(${billId})?$format=json`),
  src("knesset", `${odata}/KNS_BillInitiator?$filter=BillID%20eq%20${billId}&$format=json`),
  src("knesset", `${odata}/KNS_PlmSessionItem?$filter=ItemID%20eq%20${billId}&$format=json`),
  ...personIds.map((id) => src("knesset", `${odata}/KNS_PersonToPosition?$filter=PersonID%20eq%20${id}&$format=json`)),
];

const decision263 = src("gov-il", "https://www.gov.il/he/departments/policies/dec263_2021");
const financeReview = src(
  "gov-il",
  "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/special-review-120826-1/he/Publications_special-review-120826-1.pdf"
);

const legalCases: LegalCaseCore[] = [
  {
    id: "gesher-haaliyah-1997-1999",
    jurisdiction: "IL",
    status: "closed",
    since: "1997-01-01",
    sincePrecision: "year",
    endedOn: "1999-03-09",
    statusConfirmed: true,
    sources: [
      src("globes", "https://www.globes.co.il/news/article.aspx?did=80724"),
      src("globes", "https://www.globes.co.il/news/article.aspx?did=66063"),
      src("globes", "https://www.globes.co.il/news/article.aspx?did=65232"),
      src("times-of-israel", "https://www.timesofisrael.com/the-one-who-got-away-ex-prosecutor-laments-the-failure-to-indict-liberman/"),
    ],
  },
  {
    id: "bar-on-1997",
    jurisdiction: "IL",
    status: "under-investigation",
    since: "1997-01-01",
    sincePrecision: "year",
    statusConfirmed: false,
    lastConfirmedOn: "1997-04-20",
    sources: [
      src("globes", "https://www.globes.co.il/news/article.aspx?did=64045"),
      src("globes", "https://www.globes.co.il/news/article.aspx?did=108162"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-5122928,00.html"),
      src("times-of-israel", "https://www.timesofisrael.com/the-one-who-got-away-ex-prosecutor-laments-the-failure-to-indict-liberman/"),
    ],
  },
  {
    id: "assault-minor-2001",
    jurisdiction: "IL",
    status: "convicted-plea-final",
    since: "2001-03-06",
    endedOn: "2001-09-25",
    statusConfirmed: true,
    sources: [
      src("globes", "https://www.globes.co.il/news/article.aspx?did=474793"),
      src("globes", "https://www.globes.co.il/news/article.aspx?did=524345"),
      src("walla", "https://www.walla.co.il/news/israel/121198"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-3668196,00.html"),
    ],
  },
  {
    // Start date not confirmed: the sources say 1998 or 2001.
    id: "campaign-financing-first-case",
    jurisdiction: "IL",
    status: "closed",
    since: "1998-01-01",
    sincePrecision: "year",
    endedOn: "2008-08-11",
    statusConfirmed: true,
    sources: [
      src("ynet", "https://www.ynet.co.il/articles/mobile/0,7340,L-3580779,00.html"),
      src("walla", "https://finance.walla.co.il/item/1328027"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-3319229,00.html"),
    ],
  },
  {
    id: "main-investigation-2006-2012",
    jurisdiction: "IL",
    status: "closed",
    since: "2006-04-01",
    sincePrecision: "month",
    endedOn: "2012-12-13",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/06/050/088/P05&fileName=06088050_P05.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/08/410/066/r05&fileName=08066410_r05.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/08/410/066/r08&fileName=08066410_r08.txt&type=2"),
      src("n12", "https://www.mako.co.il/news-law/legal/Article-4b479d4054f4f21004.htm"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-4222790,00.html"),
      src("ynet", "https://www.ynet.co.il/articles/mobile/0,7340,L-4319571,00.html"),
      src("walla", "https://www.walla.co.il/news/israel/2596694"),
      src("ynet", "https://www.ynetnews.com/articles/0,7340,L-4319608,00.html"),
    ],
  },
  {
    id: "ambassador-affair-2010-2013",
    jurisdiction: "IL",
    status: "acquitted",
    since: "2010-03-02",
    endedOn: "2013-11-06",
    statusConfirmed: true,
    sources: [
      src("n12", "https://www.mako.co.il/news-law/legal/Article-c3f807ecdc22721004.htm"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-4325972,00.html"),
      src("walla", "https://www.walla.co.il/news/israel/2601708"),
      src("walla", "https://www.walla.co.il/news/israel/2692297"),
      src("ynet", "https://www.ynet.co.il/articles/mobile/0,7340,L-4450129,00.html"),
      src("ynet", "https://www.ynetnews.com/article/4467002"),
      src("times-of-israel", "https://www.timesofisrael.com/attorney-general-will-not-appeal-liberman-verdict/"),
    ],
  },
  {
    // The verified file lists the first JPost link as http://; stored as https.
    id: "spain-mavi-marmara-2015",
    jurisdiction: "ES",
    status: "ended-other",
    since: "2015-11-01",
    sincePrecision: "month",
    endedOn: "2015-12-01",
    endedPrecision: "month",
    statusConfirmed: false,
    lastConfirmedOn: "2015-12-27",
    sources: [
      src("times-of-israel", "https://www.timesofisrael.com/spanish-judge-seeks-to-prosecute-pm-over-2010-flotilla-raid/"),
      src("jpost", "https://www.jpost.com/Israel-News/Spanish-judge-issues-arrest-warrants-for-Netanyahu-Liberman-others-433198"),
      src("times-of-israel", "https://www.timesofisrael.com/spain-lifts-war-crime-listing-for-netanyahu-6-others/"),
      src("jpost", "https://www.jpost.com/Arab-Israeli-Conflict/Spanish-court-Arrest-warrants-not-enforceable-for-Netanyahu-Liberman-others-438489"),
    ],
  },
];

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("idi", "https://www.idi.org.il/media/32325/%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%91%D7%99%D7%AA%D7%A0%D7%95.pdf"),
      src("maariv", "https://www.maariv.co.il/breaking-news/article-1363710"),
    ],
    legalSourcesChecked: uniqueSources(legalCases.flatMap((c) => c.sources)),
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", sources: [faction(968)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1104)] },
    ],
    achievements: [
      {
        id: "reform-ssb-tax-2022",
        type: "reform",
        role: "led",
        nationwide: true,
        date: "2021-08-01",
        sources: [
          decision263,
          src("knesset-ric", "https://fs.knesset.gov.il/globaldocs/MMM/c5a38888-d63e-eb11-810a-00155d0aee38/2_c5a38888-d63e-eb11-810a-00155d0aee38_11_18232.pdf"),
        ],
        scale: { kind: "budget", value: 900_000_000, sources: [financeReview] },
        impact: {
          goalSources: [decision263],
          intendedDirection: "decrease",
          before: { value: 100, date: "2020-11-01" },
          after: { value: 84, date: "2021-11-01" },
          evaluationSources: [
            src(
              "bank-of-israel",
              "https://boi.org.il/publications/pressreleases/%D7%A0%D7%99%D7%AA%D7%95%D7%97-%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99-%D7%A9%D7%9C-%D7%9E%D7%92%D7%9E%D7%95%D7%AA-%D7%91%D7%A8%D7%9B%D7%99%D7%A9%D7%AA-%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA-%D7%9E%D7%9E%D7%95%D7%AA%D7%A7%D7%99%D7%9D-%D7%91%D7%A2%D7%A7%D7%91%D7%95%D7%AA-%D7%94%D7%98%D7%9C%D7%AA-%D7%94%D7%9E%D7%A1-%D7%A2%D7%9C%D7%99%D7%94%D7%9D/"
            ),
            src("peer-reviewed", "https://doi.org/10.1016/j.puhe.2025.106118"),
          ],
        },
        repealed: {
          date: "2023-03-30",
          sources: [src("gov-il", "https://www.gov.il/he/departments/policies/dec397-2023"), financeReview],
        },
      },
      {
        id: "basic-law-nation-state",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2018-07-17",
        sources: billSources(565913, [4412]),
      },
      {
        id: "basic-law-jerusalem-amendment-2",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2018-01-01",
        sources: billSources(2018487, [4412]),
      },
      {
        id: "basic-law-knesset-amendment-46",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2017-03-14",
        sources: billSources(570495, [30121, 12952, 12938, 4412]),
      },
    ],
    legalCases,
  },
  text: {
    he: {
      leaderName: "אביגדור ליברמן",
      achievements: {
        "reform-ssb-tax-2022": {
          title: "מס קנייה על משקאות ממותקים",
          summary: "בעקבות החלטת ממשלה 263 הטיל שר האוצר ליברמן בצו מס קנייה על משקאות ממותקים מינואר 2022.",
          indicator: "רכישות משקאות עתירי סוכר לנפש (מדד)",
          scaleUnit: "ש״ח הכנסות נוספות ממס ב-2022 (בקירוב)",
        },
        "basic-law-nation-state": {
          title: "חוק-יסוד: ישראל – מדינת הלאום של העם היהודי",
          summary: "הצעת חוק פרטית פ/1989/20 של 11 יוזמים; בין יוזמיה ח״כ רוברט אילטוב (ישראל ביתנו).",
        },
        "basic-law-jerusalem-amendment-2": {
          title: "חוק-יסוד: ירושלים בירת ישראל (תיקון מס' 2)",
          summary: "הצעת חוק פרטית פ/4346/20 של 22 יוזמים; בין יוזמיה ח״כ רוברט אילטוב (ישראל ביתנו).",
        },
        "basic-law-knesset-amendment-46": {
          title: "חוק-יסוד: הכנסת (תיקון מס' 46)",
          summary: "הצעת חוק פרטית פ/2266/20; כל ארבעת יוזמיה היו ח״כים מסיעת ישראל ביתנו.",
        },
      },
      legalCases: {
        "gesher-haaliyah-1997-1999": {
          description: "נחקר בחשד שקיבל טובות הנאה מעמותת גשר העלייה. התיק נסגר: חוסר ראיות בשני עניינים, חלוף זמן בשלישי.",
        },
        "bar-on-1997": {
          description: "פרשת בר-און: המשטרה המליצה להעמידו לדין; ב-20.4.1997 החליט היועץ המשפטי לממשלה כי תימשך החקירה נגדו.",
        },
        "assault-minor-2001": {
          description: "בית משפט השלום בירושלים הרשיע אותו בהסדר טיעון בתקיפת קטין ובאיומים; קנס 7,500 ש״ח ופיצוי 10,000 ש״ח.",
        },
        "campaign-financing-first-case": {
          description: "״התיק הראשון״: עבירות לפי חוק מימון מפלגות, מרמה, הפרת אמונים ורישום כוזב במסמכי תאגיד. נסגר מחוסר ראיות. נפתח ב-1998 או ב-2001.",
        },
        "main-investigation-2006-2012": {
          description: "חקירה בחשד למרמה, הפרת אמונים והלבנת הון; ב-2011 הוחלט להעמידו לדין בכפוף לשימוע; נסגר: אין סיכוי סביר להרשעה.",
        },
        "ambassador-affair-2010-2013": {
          description: "פרשת השגריר: כתב אישום על מרמה והפרת אמונים; הרכב של שלושה שופטים זיכה אותו פה אחד; היועץ המשפטי לממשלה לא ערער.",
        },
        "spain-mavi-marmara-2015": {
          description: "בעקבות תלונה על אירוע המרמרה ב-2010 הורה שופט בבית המשפט הלאומי למשטרה לעקוב אחריו; הרכב שופטים הורה לבטל את הרישומים.",
        },
      },
      predecessors: {},
    },
    en: {
      leaderName: "Avigdor Liberman",
      achievements: {
        "reform-ssb-tax-2022": {
          title: "Purchase tax on sweetened drinks",
          summary: "Under Government Decision 263, Finance Minister Liberman's order imposed a purchase tax on sweetened drinks from January 2022.",
          indicator: "High-sugar drink purchases per capita (index)",
          scaleUnit: "NIS in added tax revenue in 2022 (approx.)",
        },
        "basic-law-nation-state": {
          title: "Basic Law: Israel, Nation-State of the Jewish People",
          summary: "Private bill P/1989/20 with 11 initiators, including Yisrael Beiteinu MK Robert Ilatov.",
        },
        "basic-law-jerusalem-amendment-2": {
          title: "Basic Law: Jerusalem, Capital of Israel (Amendment 2)",
          summary: "Private bill P/4346/20 with 22 initiators, including Yisrael Beiteinu MK Robert Ilatov.",
        },
        "basic-law-knesset-amendment-46": {
          title: "Basic Law: The Knesset (Amendment No. 46)",
          summary: "Private bill P/2266/20; all four initiators were Yisrael Beiteinu MKs.",
        },
      },
      legalCases: {
        "gesher-haaliyah-1997-1999": {
          description: "Investigated on suspicion of receiving benefits from the Gesher HaAliyah association. Closed: insufficient evidence on two matters, time elapsed on the third.",
        },
        "bar-on-1997": {
          description: "Bar-On affair: police recommended indictment; on 20 April 1997 the Attorney General decided the investigation against him would continue.",
        },
        "assault-minor-2001": {
          description: "Jerusalem Magistrates' Court convicted him under a plea agreement of assaulting a minor and threats; NIS 7,500 fine, NIS 10,000 compensation.",
        },
        "campaign-financing-first-case": {
          description: "\"First case\": Party Financing Law offences, fraud, breach of trust, false corporate entries. Closed for insufficient evidence. Start year: 1998 or 2001.",
        },
        "main-investigation-2006-2012": {
          description: "Investigation of fraud, breach of trust, money laundering; 2011 decision to indict subject to a hearing; closed: no reasonable chance of conviction.",
        },
        "ambassador-affair-2010-2013": {
          description: "Ambassador affair: indicted for fraud and breach of trust; a three-judge panel acquitted him unanimously; the Attorney General did not appeal.",
        },
        "spain-mavi-marmara-2015": {
          description: "Over the 2010 Mavi Marmara complaint, a National Court judge told police to monitor him; a court panel ordered the registrations cancelled.",
        },
      },
      predecessors: {},
    },
    ar: {
      leaderName: "أفيغدور ليبرمان",
      achievements: {
        "reform-ssb-tax-2022": {
          title: "ضريبة شراء على المشروبات المحلّاة",
          summary: "بموجب قرار الحكومة 263، فرض وزير المالية ليبرمان بأمرٍ ضريبة شراء على المشروبات المحلّاة اعتبارًا من يناير 2022.",
          indicator: "مشتريات المشروبات عالية السكر للفرد (مؤشر)",
          scaleUnit: "شيكل إيرادات ضريبية إضافية في 2022 (تقريبًا)",
        },
        "basic-law-nation-state": {
          title: "قانون أساس: إسرائيل – الدولة القومية للشعب اليهودي",
          summary: "اقتراح قانون خاص (P/1989/20) بمبادرة 11 عضوًا؛ من مبادريه عضو الكنيست روبرت إيلاتوف (إسرائيل بيتنا).",
        },
        "basic-law-jerusalem-amendment-2": {
          title: "قانون أساس: القدس عاصمة إسرائيل (التعديل رقم 2)",
          summary: "اقتراح قانون خاص (P/4346/20) بمبادرة 22 عضوًا؛ من مبادريه عضو الكنيست روبرت إيلاتوف (إسرائيل بيتنا).",
        },
        "basic-law-knesset-amendment-46": {
          title: "قانون أساس: الكنيست (التعديل رقم 46)",
          summary: "اقتراح قانون خاص (P/2266/20)؛ مبادروه الأربعة جميعًا أعضاء كنيست من كتلة إسرائيل بيتنا.",
        },
      },
      legalCases: {
        "gesher-haaliyah-1997-1999": {
          description: "حُقّق معه للاشتباه بحصوله على منافع من جمعية «غيشر هعلياه». أُغلق الملف: نقص الأدلة في مسألتين، ومرور الوقت في الثالثة.",
        },
        "bar-on-1997": {
          description: "قضية بار-أون: أوصت الشرطة بتقديمه للمحاكمة؛ وفي 20 أبريل 1997 قرّر المستشار القضائي للحكومة مواصلة التحقيق معه.",
        },
        "assault-minor-2001": {
          description: "أدانته محكمة الصلح في القدس ضمن صفقة ادعاء بالاعتداء على قاصر والتهديد؛ غرامة 7,500 شيكل وتعويض 10,000 شيكل.",
        },
        "campaign-financing-first-case": {
          description: "«الملف الأول»: مخالفات لقانون تمويل الأحزاب، واحتيال، وخيانة أمانة، وتسجيل كاذب في مستندات شركة. أُغلق لنقص الأدلة. سنة البدء: 1998 أو 2001.",
        },
        "main-investigation-2006-2012": {
          description: "تحقيق في الاحتيال وخيانة الأمانة وتبييض الأموال؛ قرار عام 2011 بتقديم لائحة اتهام رهنًا بالاستماع؛ أُغلق لعدم وجود فرصة معقولة للإدانة.",
        },
        "ambassador-affair-2010-2013": {
          description: "قضية السفير: لائحة اتهام بالاحتيال وخيانة الأمانة؛ برّأته هيئة من ثلاثة قضاة بالإجماع؛ ولم يستأنف المستشار القضائي للحكومة.",
        },
        "spain-mavi-marmara-2015": {
          description: "بشأن شكوى «مافي مرمرة» لعام 2010، أمر قاضٍ في المحكمة الوطنية الشرطة بمراقبته؛ ثم أمرت هيئة قضائية بإلغاء التسجيلات.",
        },
      },
      predecessors: {},
    },
  },
};
