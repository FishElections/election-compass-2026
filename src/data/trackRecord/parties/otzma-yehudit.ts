import type { LegalCaseCore, SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Otzma Yehudit. Facts copied from reports/track-record/verified/
 * (major-legislation.md, legal.md), veteran-status.md, review-summary.md and
 * the pass-1 report reports/track-record/otzma-yehudit.md. Nothing here was
 * researched anew.
 *
 * No reform or law passed the impact test, so up to 3 "major laws" are shown
 * (methodology v1.6 §3.4 item 3), ranked by the v1.6 yearly-cost rule.
 * 2210669 (hostages' families benefits) is not credited: no Otzma Yehudit
 * initiator is named in the verified files. Item 3 is therefore 2228138,
 * ranked on its stated NIS 151 million a year.
 *
 * Dates: where a verified row gives only a year or a month, the date is
 * written YYYY-01-01 / YYYY-MM-01 with its precision set, so no day is shown.
 * Where "since" is not stated at all, the earliest dated step of the
 * proceeding in the row is used.
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

const hcj8910 = src(
  "courts",
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%2F22%2F100%2F089%2Fe32&fileName=22089100.E32&type=2"
);
const turkeyGaza = src("times-of-israel", "https://www.timesofisrael.com/turkey-issues-arrest-warrants-for-netanyahu-other-israeli-leaders-over-genocide-in-gaza/");
const turkeyFlotilla = src("times-of-israel", "https://www.timesofisrael.com/as-turkey-reportedly-seeks-to-jail-them-israeli-leaders-blast-erdogan-for-massacring-kurds/");

const legalCases: LegalCaseCore[] = [
  {
    id: "italy-flotilla-investigation",
    jurisdiction: "IT",
    status: "under-investigation",
    since: "2026-06-08",
    statusConfirmed: true,
    sources: [
      src("times-of-israel", "https://www.timesofisrael.com/italy-investigating-ben-gvir-for-alleged-torture-kidnapping-over-gaza-flotilla-video/"),
      src("n12", "https://www.mako.co.il/news-world/2026_q4/Article-fabae70552541a1027.htm"),
      src("times-of-israel", "https://www.timesofisrael.com/italy-names-israeli-defense-minister-idf-chief-others-in-probe-of-flotilla-activists-treatment/"),
    ],
  },
  {
    id: "turkey-gaza-2025",
    jurisdiction: "TR",
    status: "arrest-warrant-issued",
    since: "2025-11-07",
    statusConfirmed: false,
    lastConfirmedOn: "2025-11-07",
    sources: [turkeyGaza, src("jpost", "https://www.jpost.com/international/article-873111")],
  },
  {
    id: "turkey-flotilla-indictment-2026",
    jurisdiction: "TR",
    status: "on-trial",
    since: "2026-04-10",
    statusConfirmed: false,
    lastConfirmedOn: "2026-04-12",
    sources: [turkeyFlotilla, src("jpost", "https://www.jpost.com/middle-east/article-892649")],
  },
  {
    id: "threats-investigation-2021",
    jurisdiction: "IL",
    status: "closed",
    since: "2022-01-01",
    sincePrecision: "year",
    endedOn: "2023-09-28",
    statusConfirmed: true,
    sources: [
      hcj8910,
      src("n12", "https://www.mako.co.il/news-politics/2023_q3/Article-e1564fafcdcda81027.htm"),
      src("maariv", "https://www.maariv.co.il/news/law/Article-1041345"),
    ],
  },
  {
    id: "temple-mount-leaflets",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "1999-01-01",
    sincePrecision: "year",
    endedOn: "2006-11-06",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/06/440/033/H09&fileName=06033440_H09.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/99/990/051/L01&fileName=99051990_L01.txt&type=2"),
      src("walla", "https://www.walla.co.il/news/israel/543774"),
      src("globes", "https://www.globes.co.il/news/article.aspx?did=796986"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-3324596,00.html"),
    ],
  },
  {
    // Start not stated; the conviction of 25.6.2007 is the earliest dated step.
    id: "racist-signs-2001-2002",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "2007-06-25",
    endedOn: "2008-12-07",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/08/660/090/o01&fileName=08090660_o01.txt&type=2"),
      src("ynet", "https://www.ynet.co.il/articles/0,7340,L-3417174,00.html"),
    ],
  },
  {
    // Start not stated; the plea arrangement of 16.3.2003 is the earliest dated step.
    id: "funeral-2002",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "2003-03-16",
    endedOn: "2005-01-09",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/04/090/120/N01&fileName=04120090_N01.txt&type=2"),
    ],
  },
  {
    // Start not stated; the District Court sentence of 21.10.1998 is the earliest dated step.
    id: "kahane-stickers",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "1998-10-21",
    endedOn: "1999-08-22",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/99/670/000/B02&fileName=99000670_B02.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/98/660/072/B04&fileName=98072660_B04.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/99/670/000/B10&fileName=99000670_B10.txt&type=2"),
    ],
  },
  {
    // Start not stated; the District Court decision of 12.2.1998 is the earliest dated step.
    id: "insulting-a-public-servant",
    jurisdiction: "IL",
    status: "convicted-final",
    since: "1998-02-12",
    endedOn: "1998-04-08",
    statusConfirmed: true,
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/98/410/019/D02&fileName=98019410_D02.txt&type=2"),
    ],
  },
  {
    id: "agripas-apartment",
    jurisdiction: "IL",
    status: "on-trial",
    since: "2006-01-01",
    sincePrecision: "month",
    statusConfirmed: false,
    lastConfirmedOn: "2008-03-16",
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/07/900/041/a06&fileName=07041900_a06.txt&type=2"),
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/07/900/041/a07&fileName=07041900_a07.txt&type=2"),
    ],
  },
  {
    id: "magistrates-file-2589-98",
    jurisdiction: "IL",
    status: "on-trial",
    since: "1998-01-01",
    sincePrecision: "year",
    statusConfirmed: false,
    lastConfirmedOn: "2000-07-04",
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/00/630/039/A02&fileName=00039630_A02.txt&type=2"),
    ],
  },
  {
    id: "magistrates-file-4346-97",
    jurisdiction: "IL",
    status: "on-trial",
    since: "1997-01-01",
    sincePrecision: "year",
    statusConfirmed: false,
    lastConfirmedOn: "2002-10-23",
    sources: [
      src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts/02/240/084/A01&fileName=02084240_A01.txt&type=2"),
    ],
  },
  {
    // The remainder of the court's 1993–2007 aggregate, without a number
    // (verified/legal.md open issue 5).
    id: "other-indictments-1993-2007",
    jurisdiction: "IL",
    status: "ended-other",
    since: "1993-01-01",
    sincePrecision: "year",
    endedOn: "2007-01-01",
    endedPrecision: "year",
    statusConfirmed: true,
    sources: [hcj8910],
  },
];

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("ynet", "https://www.ynet.co.il/news/article/sk2911s300gg"),
      src("n12", "https://www.mako.co.il/news-israel-elections/2026/liveblog-5bc9483b18b70a1026.htm"),
    ],
    legalSourcesChecked: uniqueSources(legalCases.flatMap((c) => c.sources)),
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2022-07-03", to: "2022-11-15", sources: [faction(1081)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1106)] },
    ],
    achievements: [
      {
        id: "basic-law-government-amendment-12",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2023-03-22",
        sources: billSources(2201424, [30867]),
      },
      {
        id: "eastern-confrontation-line-tax-benefits",
        type: "major-legislation",
        role: "initiated",
        basicLaw: false,
        date: "2026-06-03",
        sources: billSources(2232339, [30849, 30859, 30867]),
        costEstimate: {
          value: 450_000_000,
          sources: [src("knesset", "https://fs.knesset.gov.il/25/law/25_ls1_11956392.pdf")],
        },
      },
      {
        id: "illegal-stay-prohibition",
        type: "major-legislation",
        role: "initiated",
        basicLaw: false,
        date: "2025-07-09",
        sources: billSources(2228138, [30849, 30859, 30867]),
        costEstimate: {
          value: 151_000_000,
          sources: [src("knesset", "https://fs.knesset.gov.il/25/law/25_ls1_5759937.pdf")],
        },
      },
    ],
    legalCases,
  },
  text: {
    he: {
      leaderName: "איתמר בן גביר",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "חוק־יסוד: הממשלה (תיקון מס' 12)",
          summary: "קובע שנבצרות זמנית של ראש הממשלה תהיה רק בשל אי-מסוגלות פיזית או נפשית, באישורים מוגדרים.",
          ledBy: "ח״כ יצחק קרויזר (עוצמה יהודית) ואחרים",
        },
        "eastern-confrontation-line-tax-benefits": {
          title: "חוק הטבות מס ליישוב אזור קו עימות מזרחי",
          summary: "הטבות מס בהוראת שעה ליישובים באזור קו העימות המזרחי.",
          ledBy: "ח״כים סון הר-מלך, פוגל וקרויזר (עוצמה יהודית) ואחרים",
        },
        "illegal-stay-prohibition": {
          title: "חוק איסור שהייה וישיבה בישראל שלא כדין",
          summary: "אוסר מתן היתר שהייה או חידוש רישיון ישיבה בישראל לפעילי טרור, למורשעים בטרור ולבני משפחתם.",
          ledBy: "ח״כים סון הר-מלך, פוגל וקרויזר (עוצמה יהודית) ואחרים",
        },
      },
      legalCases: {
        "italy-flotilla-investigation": {
          description: "התביעה ברומא פתחה נגדו בחקירה בשל היחס לפעילי משט לעזה, בחשד לחטיפה ולעינויים. החקירה הורחבה ב-16.10.2026.",
        },
        "turkey-gaza-2025": {
          description: "התביעה באיסטנבול הוציאה צווי מעצר נגד 37 חשודים, ובהם בן גביר, בגין ״רצח עם ופשעים נגד האנושות״ בעזה.",
        },
        "turkey-flotilla-indictment-2026": {
          description: "לפי דיווחים, התביעה בטורקיה הגישה כתבי אישום נגד 35 בכירים, ובהם בן גביר, בשל משט ״סומוד״.",
        },
        "threats-investigation-2021": {
          description: "חקירה בחשד לעבירת איומים: שליפת נשק כלפי מאבטחים בדצמבר 2021. נפתחה ב-2022. נגנזה: אין סיכוי סביר להרשעה.",
        },
        "temple-mount-leaflets": {
          description: "תמיכה בארגון טרור, בשל כרוזים מ-1999; הורשע ב-2004, שלושה חודשי עבודות שירות; ערעורו נדחה ובקשת רשות ערעור נדחתה.",
        },
        "racist-signs-2001-2002": {
          description: "הורשע ב-2007 בהחזקת פרסום גזעני, הסתה לגזענות ותמיכה בארגון טרור; זוכה חלקית בערעור; בקשת רשות ערעור נדחתה.",
        },
        "funeral-2002": {
          description: "בהסדר טיעון יוחסה לו ״הפרעה לשוטר בשעת מילוי תפקידו״ (2002); בית המשפט המחוזי הרשיע אותו; בקשת רשות ערעור נדחתה.",
        },
        "kahane-stickers": {
          description: "הורשע בהחזקת חומר תעמולה לארגוני טרור (500 מדבקות) ובהפרת הוראה חוקית; הערעור נדחה; עבודות שירות.",
        },
        "insulting-a-public-servant": {
          description: "הורשע בשתי עבירות של העלבת עובד ציבור ובהתנהגות פסולה במקום ציבורי; הערעור נדחה; בקשת רשות ערעור נדחתה.",
        },
        "agripas-apartment": {
          description: "כתב אישום בינואר 2006 על החזקת פרסום גזעני, החזקת פרסום המסית לאלימות או לטרור ותמיכה בארגון טרור (דירה ברחוב אגריפס).",
        },
        "magistrates-file-2589-98": {
          description: "תיק בית משפט השלום 2589/98: כתב אישום על התנהגות פסולה במקום ציבורי והפרעה לשוטר.",
        },
        "magistrates-file-4346-97": {
          description: "תיק פלילי 4346/97 בבית משפט השלום בירושלים; האישומים אינם מפורטים במקור. ב-2002 ״התיק מחכה עתה לפסק דין״.",
        },
        "other-indictments-1993-2007": {
          description: "כתבי אישום נוספים 1993–2007 שאינם מפורטים בנפרד; סך 15 כתבי האישום לפי היועמ״ש כולל את התיקים לעיל. מאז 2007 לא הועמד לדין.",
        },
      },
      predecessors: {},
    },
    en: {
      leaderName: "Itamar Ben Gvir",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "Basic Law: The Government (Amendment No. 12)",
          summary: "Limits declaring a prime minister temporarily incapacitated to physical or mental inability, with set approval steps.",
          ledBy: "MK Yitzhak Kroizer (Otzma Yehudit) and others",
        },
        "eastern-confrontation-line-tax-benefits": {
          title: "Tax Benefits for Settling the Eastern Confrontation-Line Area",
          summary: "Temporary tax benefits for localities in the eastern confrontation-line area.",
          ledBy: "MKs Son Har-Melech, Fogel and Kroizer (Otzma Yehudit) and others",
        },
        "illegal-stay-prohibition": {
          title: "Law Prohibiting Unlawful Stay and Residence in Israel",
          summary: "Bars stay permits and residence-licence renewals for terror operatives, people convicted of terrorism, and their relatives.",
          ledBy: "MKs Son Har-Melech, Fogel and Kroizer (Otzma Yehudit) and others",
        },
      },
      legalCases: {
        "italy-flotilla-investigation": {
          description: "Rome prosecutors placed him under investigation over the treatment of Gaza flotilla activists, for alleged \"torture and kidnapping\". Expanded 16 October 2026.",
        },
        "turkey-gaza-2025": {
          description: "Istanbul prosecutor's office issued arrest warrants for 37 suspects, including him, over \"genocide and crimes against humanity\" in Gaza.",
        },
        "turkey-flotilla-indictment-2026": {
          description: "Prosecutors in Turkey reportedly filed indictments against 35 officials, including him, over the Sumud flotilla.",
        },
        "threats-investigation-2021": {
          description: "Investigation on suspicion of threats: drawing a weapon at security guards in December 2021. Opened 2022. Closed: no reasonable chance of conviction.",
        },
        "temple-mount-leaflets": {
          description: "Supporting a terrorist organization, over 1999 leaflets; convicted 2004, three months community service; appeal dismissed, leave to appeal denied.",
        },
        "racist-signs-2001-2002": {
          description: "Convicted 2007 of holding a racist publication, incitement to racism and supporting a terrorist organization; partly acquitted on appeal; leave denied.",
        },
        "funeral-2002": {
          description: "Under a plea arrangement, charged with interfering with a police officer (2002); convicted by the District Court; leave to appeal denied.",
        },
        "kahane-stickers": {
          description: "Convicted of holding propaganda for terrorist organizations (500 stickers) and breach of a lawful order; appeal dismissed; community service.",
        },
        "insulting-a-public-servant": {
          description: "Convicted of two counts of insulting a public servant and improper conduct in a public place; appeal dismissed; leave to appeal denied.",
        },
        "agripas-apartment": {
          description: "Indicted January 2006 for holding racist publications and publications inciting violence or terror, and supporting a terrorist organization (Agripas apartment).",
        },
        "magistrates-file-2589-98": {
          description: "Magistrates' Court file 2589/98: indictment for improper conduct in a public place and interfering with a police officer.",
        },
        "magistrates-file-4346-97": {
          description: "Jerusalem Magistrates' Court criminal file 4346/97; charges not stated in the source. In 2002 the file awaited a verdict.",
        },
        "other-indictments-1993-2007": {
          description: "Other indictments 1993–2007 not listed separately; the Attorney General's total of 15 includes the cases above. No indictment since 2007.",
        },
      },
      predecessors: {},
    },
    ar: {
      leaderName: "إيتمار بن غفير",
      achievements: {
        "basic-law-government-amendment-12": {
          title: "قانون أساس: الحكومة (التعديل رقم 12)",
          summary: "يحصر إعلان تعذّر قيام رئيس الحكومة بمهامه مؤقتًا في العجز الجسدي أو النفسي، وفق إجراءات مصادقة محددة.",
          ledBy: "عضو الكنيست يتسحاق كرويزر (عوتسما يهوديت) وآخرون",
        },
        "eastern-confrontation-line-tax-benefits": {
          title: "قانون مزايا ضريبية لإسكان منطقة خط المواجهة الشرقي",
          summary: "مزايا ضريبية مؤقتة لبلدات منطقة خط المواجهة الشرقي.",
          ledBy: "أعضاء الكنيست سون هار-ميلخ وفوغل وكرويزر (عوتسما يهوديت) وآخرون",
        },
        "illegal-stay-prohibition": {
          title: "قانون حظر المكوث والإقامة غير القانونيين في إسرائيل",
          summary: "يحظر منح تصاريح المكوث وتجديد رخص الإقامة في إسرائيل لناشطي الإرهاب والمدانين به وأقاربهم.",
          ledBy: "أعضاء الكنيست سون هار-ميلخ وفوغل وكرويزر (عوتسما يهوديت) وآخرون",
        },
      },
      legalCases: {
        "italy-flotilla-investigation": {
          description: "وضعته النيابة العامة في روما قيد التحقيق بشأن معاملة ناشطي أسطول غزة، للاشتباه بـ«التعذيب والخطف». وُسّع التحقيق في 16 أكتوبر 2026.",
        },
        "turkey-gaza-2025": {
          description: "أصدرت النيابة العامة في إسطنبول مذكرات توقيف بحق 37 مشتبهًا، من بينهم بن غفير، بتهمة «الإبادة الجماعية والجرائم ضد الإنسانية» في غزة.",
        },
        "turkey-flotilla-indictment-2026": {
          description: "أفادت تقارير بأن النيابة في تركيا قدّمت لوائح اتهام بحق 35 مسؤولًا، من بينهم بن غفير، بشأن أسطول «الصمود».",
        },
        "threats-investigation-2021": {
          description: "تحقيق للاشتباه بالتهديد: إشهار سلاح في وجه حراس أمن في ديسمبر 2021، فُتح عام 2022. حُفظ الملف: لا فرصة معقولة للإدانة.",
        },
        "temple-mount-leaflets": {
          description: "دعم منظمة إرهابية بسبب منشورات عام 1999؛ أُدين عام 2004، ثلاثة أشهر خدمة عامة؛ رُفض استئنافه وطلب إذن الاستئناف.",
        },
        "racist-signs-2001-2002": {
          description: "أُدين عام 2007 بحيازة منشور عنصري والتحريض على العنصرية ودعم منظمة إرهابية؛ بُرّئ جزئيًا في الاستئناف؛ رُفض طلب إذن الاستئناف.",
        },
        "funeral-2002": {
          description: "ضمن صفقة ادعاء نُسبت إليه «عرقلة شرطي أثناء أداء واجبه» (2002)؛ أدانته المحكمة المركزية؛ رُفض طلب إذن الاستئناف.",
        },
        "kahane-stickers": {
          description: "أُدين بحيازة مواد دعائية لمنظمات إرهابية (500 ملصق) ومخالفة أمر قانوني؛ رُفض الاستئناف؛ خدمة عامة.",
        },
        "insulting-a-public-servant": {
          description: "أُدين بتهمتين بإهانة موظف عام وبسلوك غير لائق في مكان عام؛ رُفض الاستئناف؛ رُفض طلب إذن الاستئناف.",
        },
        "agripas-apartment": {
          description: "لائحة اتهام في يناير 2006 بحيازة منشور عنصري ومنشور يحرّض على العنف أو الإرهاب ودعم منظمة إرهابية (شقة في شارع أغريباس).",
        },
        "magistrates-file-2589-98": {
          description: "ملف محكمة الصلح 2589/98: لائحة اتهام بسلوك غير لائق في مكان عام وعرقلة شرطي.",
        },
        "magistrates-file-4346-97": {
          description: "ملف جنائي 4346/97 في محكمة الصلح في القدس؛ التهم غير مذكورة في المصدر. عام 2002 كان الملف بانتظار الحكم.",
        },
        "other-indictments-1993-2007": {
          description: "لوائح اتهام أخرى 1993–2007 غير مفصّلة؛ مجموع الـ15 لائحة وفق المستشار القضائي للحكومة يشمل الملفات أعلاه. لم يُقدَّم للمحاكمة منذ 2007.",
        },
      },
      predecessors: {},
    },
  },
};
