import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Likud (leader: Benjamin Netanyahu). Facts copied from
 * reports/track-record/verified/{agreements,reforms-legislation,legal}.md,
 * reports/track-record/veteran-status.md and reports/track-record/likud.md
 * (leader sources). Methodology v1.6: peace and normalization agreements only.
 *
 * Major laws (v1.6 §3.4 item 3): the reforms above passed the impact test, but
 * no law did, so up to 3 laws the party led are shown too, from
 * verified/major-legislation.md. All three are Basic-Law amendments, which
 * count as Basic Laws, newest first.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const faction = (id: number) =>
  src("knesset", `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Faction(${id})`);

// Shared sources
const GOV_18K_2022 =
  "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/prospectuses_18k_report_2022/en/Prospectuses_prospectuses_18k_report_2022.pdf";
const DECISION_59 = "https://www.gov.il/he/departments/policies/2013_des59";
const CELLULAR_BILL = "https://fs.knesset.gov.il//18/law/18_ls1_174766.pdf";
const COMPTROLLER_CELLULAR =
  "https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2024/2024.07-75A/2024.07-75A-104-Cellular.pdf";
const TOI_TURKEY_WARRANTS =
  "https://www.timesofisrael.com/turkey-issues-arrest-warrants-for-netanyahu-other-israeli-leaders-over-genocide-in-gaza/";
const COURT_INDICTMENT =
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%2F20%2F560%2F030%2Fv45&fileName=20030560.V45&type=2";
const COURT_BAR_ON =
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%5C97%5C340%5C025%5CD06&fileName=97025340_D06.txt&type=2";
const odata = "https://knesset.gov.il/Odata/ParliamentInfo.svc";
const billSources = (billId: number, personId: number): SourceRef[] => [
  src("knesset", `${odata}/KNS_Bill(${billId})?$format=json`),
  src("knesset", `${odata}/KNS_BillInitiator?$filter=BillID%20eq%20${billId}&$format=json`),
  src("knesset", `${odata}/KNS_PlmSessionItem?$filter=ItemID%20eq%20${billId}&$format=json`),
  src("knesset", `${odata}/KNS_PersonToPosition?$filter=PersonID%20eq%20${personId}&$format=json`),
];
const COURT_AMEDI =
  "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%5C01%5C590%5C077%5CF12&fileName=01077590_F12.txt&type=2";

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [
      src("times-of-israel", "https://www.timesofisrael.com/liveblog_entry/likud-submits-35-person-knesset-slate-featuring-9-netanyahu-appointees-just-4-women/"),
      src("walla", "https://www.walla.co.il/news/politics/383955473"),
      src("n12", "https://www.mako.co.il/news-politics/2026_q3/Article-2ddf4a5b99180a1027.htm"),
    ],
    legalSourcesChecked: [
      src("courts", COURT_INDICTMENT),
      src("courts", COURT_BAR_ON),
      src("courts", COURT_AMEDI),
    ],
    // Same name since 1977 (v1.3 same-name rule); no predecessor needed.
    predecessors: [],
    knessetPeriods: [
      { knesset: 24, from: "2021-04-06", to: "2022-11-15", sources: [faction(962)] },
      { knesset: 25, from: "2022-11-15", sources: [faction(1096)] },
    ],
    achievements: [
      {
        id: "likud-egypt-1979",
        type: "agreement",
        role: "prime-minister",
        category: "peace",
        country: "EG",
        relation: "establish",
        inForce: true,
        signedText: true,
        date: "1979-03-26",
        sources: [
          src("un-treaties", "https://treaties.un.org/doc/Publication/UNTS/Volume%201138/volume-1138-I-17855-English.pdf"),
          src("gov-il", "https://www.gov.il/en/pages/peace-with-egypt"),
          src("times-of-israel", "https://www.timesofisrael.com/a-look-at-the-landmark-egypt-israel-peace-treaty-sealed-40-years-ago/"),
        ],
        steps: [
          {
            id: "camp-david",
            date: "1978-09-17",
            sources: [src("gov-il", "https://www.gov.il/en/pages/camp-david-accords")],
          },
        ],
      },
      {
        id: "likud-lebanon-1983",
        type: "agreement",
        role: "prime-minister",
        category: "peace",
        country: "LB",
        relation: "establish",
        inForce: false,
        signedText: true,
        date: "1983-05-17",
        sources: [
          src("knesset", "https://fs.knesset.gov.il//10/Plenum/10_ptm_236562.DOC"),
          src("knesset", "https://fs.knesset.gov.il/10/Plenum/10_ptm_530053.pdf"),
          src("walla", "https://news.walla.co.il/item/3830607"),
          src("israel-hayom", "https://www.israelhayom.co.il/news/world-news/middle-east/article/20328088"),
          src("jpost", "https://www.jpost.com/middle-east/article-900727"),
        ],
        steps: [
          {
            id: "knesset-approval",
            date: "1983-05-16",
            sources: [src("knesset", "https://fs.knesset.gov.il//10/Plenum/10_ptm_236428.DOC")],
          },
        ],
      },
      {
        id: "likud-uae-2020",
        type: "agreement",
        role: "prime-minister",
        category: "peace",
        country: "AE",
        relation: "establish",
        inForce: true,
        signedText: true,
        date: "2020-09-15",
        sources: [
          src("gov-il", "https://www.gov.il/BlobFolder/news/the-abraham-accords-declaration-15-dep-2020/en/English_ABRAHAM_ACCORDS_Israel-UAE-treaty-15-Sept-2020.pdf"),
          src("un-treaties", "https://treaties.un.org/Pages/showDetails.aspx?objid=08000002805a7d1f&clang=_en"),
          src("times-of-israel", "https://www.timesofisrael.com/marking-dawn-of-new-middle-east-israel-signs-historic-deals-with-uae-bahrain/"),
        ],
      },
      {
        id: "likud-bahrain-2020",
        type: "agreement",
        role: "prime-minister",
        category: "normalization",
        country: "BH",
        relation: "establish",
        inForce: true,
        signedText: true,
        date: "2020-10-18",
        sources: [
          src("un-treaties", "https://treaties.un.org/Pages/showDetails.aspx?objid=08000002805a7d2b&clang=_en"),
          src("times-of-israel", "https://www.timesofisrael.com/israel-bahrain-sign-historic-agreement-formally-establishing-diplomatic-ties/"),
          src("gov-il", GOV_18K_2022),
        ],
        steps: [
          {
            id: "abraham-declaration",
            date: "2020-09-15",
            sources: [
              src("gov-il", "https://www.gov.il/BlobFolder/news/the-abraham-accords-declaration-15-dep-2020/en/English_ABRAHAM_ACCORDS_Abraham-Accords-Israel-Bahrain-Agreement-15-Sep-2020.pdf"),
            ],
          },
        ],
      },
      {
        id: "likud-morocco-2020",
        type: "agreement",
        role: "prime-minister",
        category: "normalization",
        country: "MA",
        relation: "restore",
        inForce: true,
        signedText: true,
        date: "2020-12-22",
        sources: [
          src("walla", "https://www.walla.co.il/news/politics/3406817"),
          src("gov-il", GOV_18K_2022),
          src("times-of-israel", "https://www.timesofisrael.com/israel-morocco-ink-deals-agree-to-reopen-mutual-liaison-offices-within-weeks/"),
          src("ynet", "https://www.ynetnews.com/article/byqclddyge"),
        ],
      },
      {
        id: "reform-open-skies-2013",
        type: "reform",
        role: "led",
        nationwide: true,
        date: "2013-04-21",
        sources: [
          src("gov-il", DECISION_59),
          src("times-of-israel", "https://www.timesofisrael.com/israel-signs-open-skies-deal-with-eu/"),
          src("globes", "https://en.globes.co.il/en/article-1000851526"),
        ],
        scale: {
          kind: "market-size",
          // International passengers (arriving + departing), all Israeli airports, 2012.
          value: 12_515_000,
          sources: [src("cbs", "https://www.cbs.gov.il/he/publications/DocLib/2014/ShnatonTransportAndCommunications/st24_08.xls")],
        },
        impact: {
          goalSources: [
            src("gov-il", DECISION_59),
            src("gov-il", "https://www.gov.il/he/departments/policies/2006_des441"),
          ],
          intendedDirection: "decrease",
          // Israeli airlines' share of aircraft movements, from CBS Statistical
          // Abstract 2020 table 19.9 (2010: 30,811 of 81,180; 2019: 44,372 of 152,904).
          before: { value: 38.0, date: "2010-12-31" },
          after: { value: 29.0, date: "2019-12-31" },
          evaluationSources: [
            src("bank-of-israel", "https://www.boi.org.il/media/cuod3wrf/%D7%9E%D7%97%D7%A7%D7%A8-%D7%A9%D7%9E%D7%99%D7%99%D7%9D-%D7%A4%D7%AA%D7%95%D7%97%D7%99%D7%9D.pdf"),
            src("cbs", "https://www.cbs.gov.il/he/publications/DocLib/2020/19.ShnatonTransportandRoadSafety/st19_09.xls"),
          ],
        },
      },
      {
        id: "reform-cellular-2010-2012",
        type: "reform",
        role: "led",
        nationwide: true,
        // Government bill (Economic Policy bill for 2011–2012) stating the goal.
        date: "2010-10-18",
        sources: [
          src("knesset", CELLULAR_BILL),
          src("haaretz", "https://www.haaretz.co.il/news/elections/2015-03-11/ty-article/0000017f-dbcf-df9c-a17f-ffdf28be0000"),
          src("times-of-israel", "https://www.timesofisrael.com/the-scrappy-co-op-thats-banking-on-breaking-the-monopoly/"),
          src("calcalist", "https://www.calcalist.co.il/local/articles/0,7340,L-3631304,00.html"),
          src("globes", "https://www.globes.co.il/news/article.aspx?did=1001287689"),
        ],
        scale: {
          kind: "market-size",
          // Revenues of the main cellular companies in 2010 (services and equipment).
          value: 19_000_000_000,
          sources: [src("state-comptroller", COMPTROLLER_CELLULAR)],
        },
        impact: {
          goalSources: [src("knesset", CELLULAR_BILL)],
          intendedDirection: "decrease",
          // Average revenue per user, index Q3 2010 = 100; Bank of Israel: about
          // 40% lower in Q3 2012 than in Q3 2010.
          before: { value: 100, date: "2010-09-30" },
          after: { value: 60, date: "2012-09-30" },
          evaluationSources: [
            src("bank-of-israel", "https://boi.org.il/media/jr0j5j4e/%D7%AA%D7%99%D7%91%D7%94-%D7%91-12-2.pdf"),
            src("state-comptroller", COMPTROLLER_CELLULAR),
          ],
        },
      },
      {
        id: "basic-law-jerusalem-amendment-3",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2024-10-29",
        sources: [
          // Published law text (Reshumot), read 2026-10-19.
          src("knesset", "https://fs.knesset.gov.il/25/law/25_lsr_5106966.pdf"),
          ...billSources(2201428, 30839),
        ],
      },
      {
        id: "basic-law-government-amendment-12",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2023-03-22",
        sources: billSources(2201424, 30701),
      },
      {
        id: "basic-law-government-amendment-11",
        type: "major-legislation",
        role: "initiated",
        basicLaw: true,
        date: "2022-12-26",
        sources: billSources(2198130, 30772),
      },
    ],
    legalCases: [
      {
        id: "legal-cases-1000-2000-4000",
        jurisdiction: "IL",
        status: "on-trial",
        since: "2019-02-28",
        statusConfirmed: true,
        sources: [
          src("courts", COURT_INDICTMENT),
          src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%5C19%5C480%5C028%5Cy01&fileName=19028480.Y01&type=2"),
          src("courts", "https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%5C20%5C920%5C025%5Cv67&fileName=20025920.V67&type=2"),
          src("times-of-israel", "https://www.timesofisrael.com/netanyahu-to-stand-trial-for-bribery-and-breach-of-trust-pending-hearing/"),
          src("times-of-israel", "https://www.timesofisrael.com/ag-announces-netanyahu-to-stand-trial-for-bribery-fraud-and-breach-of-trust/"),
          src("ynet", "https://www.ynet.co.il/articles/0,7340,L-5629347,00.html"),
          src("walla", "https://www.walla.co.il/news/law/3337573"),
          src("ynet", "https://www.ynet.co.il/news/article/h1ipsdijme"),
          src("n12", "https://www.mako.co.il/news-politics/2026_q4/Article-1cd38e1ab4921a1026.htm"),
          src("times-of-israel", "https://www.timesofisrael.com/netanyahu-requests-presidential-pardon-in-corruption-trial-doesnt-admit-guilt/"),
          src("jpost", "https://www.jpost.com/israel-news/politics-and-diplomacy/article-876684"),
          src("times-of-israel", "https://www.timesofisrael.com/liveblog_entry/after-trump-comments-herzog-says-israel-is-a-sovereign-state-no-decision-made-yet-on-pardon/"),
          src("ynet", "https://www.ynet.co.il/news/article/skmasujt11g"),
          src("walla", "https://www.walla.co.il/news/politics/3833233"),
          src("walla", "https://www.walla.co.il/news/politics/3868349"),
        ],
      },
      {
        id: "legal-icc-palestine-2024",
        jurisdiction: "ICC",
        status: "arrest-warrant-issued",
        since: "2024-11-21",
        statusConfirmed: true,
        sources: [
          src("jpost", "https://www.jpost.com/breaking-news/article-830135"),
          src("haaretz", "https://www.haaretz.com/israel-news/2024-11-21/ty-article/icc-issues-arrest-warrants-for-netanyahu-gallant-for-alleged-gaza-war-crimes/00000193-4ea1-d68e-a1db-eea50b420000"),
          src("times-of-israel", "https://www.timesofisrael.com/icc-denies-israeli-bid-to-halt-gaza-probe-maintains-warrants-for-netanyahu-gallant/"),
          src("times-of-israel", "https://www.timesofisrael.com/icc-members-vote-to-dismiss-embattled-prosecutor-behind-netanyahu-arrest-warrant/"),
          src("jpost", "https://www.jpost.com/international/article-909613"),
        ],
      },
      {
        id: "legal-turkey-gaza-2025",
        jurisdiction: "TR",
        status: "arrest-warrant-issued",
        since: "2025-11-07",
        statusConfirmed: false,
        lastConfirmedOn: "2025-11-07",
        sources: [
          src("times-of-israel", TOI_TURKEY_WARRANTS),
          src("jpost", "https://www.jpost.com/international/article-873111"),
        ],
      },
      {
        id: "legal-turkey-flotilla-2026",
        jurisdiction: "TR",
        status: "arrest-warrant-issued",
        since: "2026-04-10",
        statusConfirmed: false,
        lastConfirmedOn: "2026-08-21",
        sources: [
          src("jpost", "https://www.jpost.com/middle-east/article-892649"),
          src("times-of-israel", "https://www.timesofisrael.com/as-turkey-reportedly-seeks-to-jail-them-israeli-leaders-blast-erdogan-for-massacring-kurds/"),
          src("ynet", "https://www.ynetnews.com/article/byzseasdml"),
          src("times-of-israel", "https://www.timesofisrael.com/turkey-issues-fresh-genocide-arrest-warrant-for-netanyahu-amid-growing-syria-tensions/"),
          src("times-of-israel", "https://www.timesofisrael.com/liveblog_entry/turkey-issues-arrest-warrant-for-netanyahu-over-interception-of-gaza-aid-flotilla/"),
        ],
      },
      {
        id: "legal-spain-mavi-marmara-2015",
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
      {
        id: "legal-bar-on-hebron-1997",
        jurisdiction: "IL",
        status: "closed",
        // The sources give only the year the investigation opened.
        since: "1997-01-01",
        sincePrecision: "year",
        endedOn: "1997-04-18",
        statusConfirmed: true,
        sources: [src("courts", COURT_BAR_ON)],
      },
      {
        id: "legal-amedi-2000",
        jurisdiction: "IL",
        status: "closed",
        // The sources give only the year the investigation opened.
        since: "1999-01-01",
        sincePrecision: "year",
        endedOn: "2000-09-27",
        statusConfirmed: true,
        sources: [src("courts", COURT_AMEDI)],
      },
    ],
  },
  text: {
    he: {
      leaderName: "בנימין נתניהו",
      achievements: {
        "likud-egypt-1979": {
          title: "חוזה השלום בין ישראל למצרים",
          summary: "מסיים את מצב המלחמה בין ישראל למצרים ומכונן שלום; בתוקף מ-25 באפריל 1979.",
          primeMinister: "מנחם בגין",
          steps: { "camp-david": "הסכמי קמפ דייוויד" },
        },
        "likud-lebanon-1983": {
          title: "ההסכם בין ישראל ללבנון (הסכם 17 במאי)",
          summary: "קובע את סיום מצב המלחמה בין ישראל ללבנון; בוטל על ידי לבנון במרץ 1984.",
          primeMinister: "מנחם בגין",
          steps: { "knesset-approval": "אישור הכנסת" },
        },
        "likud-uae-2020": {
          title: "הסכמי אברהם: חוזה השלום עם איחוד האמירויות",
          summary: "מכונן שלום, יחסים דיפלומטיים ונורמליזציה מלאה בין ישראל לאיחוד האמירויות הערביות.",
          primeMinister: "בנימין נתניהו",
        },
        "likud-bahrain-2020": {
          title: "ההודעה המשותפת של ישראל ובחריין (הסכמי אברהם)",
          summary: "מכוננת יחסים דיפלומטיים, יחסי שלום וידידות בין ישראל לבחריין; בתוקף מ-10 בדצמבר 2020.",
          primeMinister: "בנימין נתניהו",
          steps: { "abraham-declaration": "הצהרת הסכמי אברהם (וושינגטון)" },
        },
        "likud-morocco-2020": {
          title: "ההצהרה המשותפת של ארה״ב, מרוקו וישראל",
          summary: "ישראל ומרוקו התחייבו לחדש מגעים רשמיים מלאים; היחסים חודשו בדצמבר 2020.",
          primeMinister: "בנימין נתניהו",
        },
        "reform-open-skies-2013": {
          title: "הסכם השמיים הפתוחים עם האיחוד האירופי",
          summary: "החלטת ממשלה 59 אישרה הסכם תעופה בין ישראל לאיחוד האירופי; שר התחבורה ישראל כ״ץ חתם ביוני 2013.",
          indicator: "נתח חברות התעופה הישראליות בתנועות המטוסים (%)",
          scaleUnit: "נוסעים בינלאומיים בנמלי התעופה בישראל (2012)",
        },
        "reform-cellular-2010-2012": {
          title: "הרפורמה בשוק הסלולר",
          summary: "משרד התקשורת בראשות משה כחלון פתח את שוק הסלולר למפעילים חדשים והקל על מעבר בין ספקים.",
          indicator: "מחיר השירות הסלולרי, מדד משוער (2010 = 100)",
          scaleUnit: "ש״ח הכנסות חברות הסלולר (2010)",
        },
        "basic-law-jerusalem-amendment-3": {
          title: "חוק-יסוד: ירושלים בירת ישראל (תיקון מס' 3)",
          summary: "נציגות רשמית של מדינה זרה תוקם בירושלים רק אם היא מואמנת לישראל; המדינה תעודד הקמת נציגויות כאלה.",
          ledBy: "ח״כ דן אילוז (הליכוד) ואחרים",
        },
        "basic-law-government-amendment-12": {
          title: "חוק־יסוד: הממשלה (תיקון מס' 12)",
          summary: "קובע שנבצרות זמנית של ראש הממשלה תהיה רק בשל אי-מסוגלות פיזית או נפשית, באישורים מוגדרים.",
          ledBy: "ח״כ אופיר כץ (הליכוד) ואחרים",
        },
        "basic-law-government-amendment-11": {
          title: "חוק-יסוד: הממשלה (תיקון מס' 11)",
          summary: "מאפשר למנות במשרד שר נוסף, האחראי לתחומים מסוימים בכפוף לשר הממונה על המשרד.",
          ledBy: "ח״כ ניסים ואטורי (הליכוד) ואחרים",
        },
      },
      legalCases: {
        "legal-cases-1000-2000-4000": {
          description: "תיקים 1000, 2000 ו-4000: כתב אישום בעבירות שוחד, מרמה והפרת אמונים הוגש לבית המשפט המחוזי בירושלים ב-28 בינואר 2020.",
        },
        "legal-icc-palestine-2024": {
          description: "בית הדין הפלילי הבינלאומי הוציא צו מעצר בחשד לפשעי מלחמה ולפשעים נגד האנושות בעזה. ישראל דוחה את סמכותו.",
        },
        "legal-turkey-gaza-2025": {
          description: "התביעה באיסטנבול הוציאה צווי מעצר נגד 37 חשודים בגין \"רצח עם ופשעים נגד האנושות\" בעזה.",
        },
        "legal-turkey-flotilla-2026": {
          description: "כתב אישום של התובע הראשי באיסטנבול בעניין יירוט משט \"סומוד\"; בית משפט באיסטנבול הוציא צו מעצר ב-14 ביולי 2026.",
        },
        "legal-spain-mavi-marmara-2015": {
          description: "שופט בבית המשפט הלאומי הורה למשטרה לדווח על הגעתו, בעקבות תלונה בעניין המאווי מרמרה מ-2010; הרכב שופטים ביטל זאת.",
        },
        "legal-bar-on-hebron-1997": {
          description: "פרשת בר-און–חברון: חקירה משטרתית נפתחה ב-1997; היועץ המשפטי לממשלה סגר אותה מחוסר ראיות מספיקות ב-18 באפריל 1997.",
        },
        "legal-amedi-2000": {
          description: "פרשת עמדי: חקירה משטרתית מ-1999 בחשד לשוחד, הפרת אמונים וניסיון לקבלת דבר במרמה; נסגרה מחוסר ראיות מספיקות.",
        },
      },
      predecessors: {},
    },
    en: {
      leaderName: "Benjamin Netanyahu",
      achievements: {
        "likud-egypt-1979": {
          title: "Israel–Egypt Peace Treaty",
          summary: "Ends the state of war between Israel and Egypt and establishes peace; in force from 25 April 1979.",
          primeMinister: "Menachem Begin",
          steps: { "camp-david": "Camp David Accords" },
        },
        "likud-lebanon-1983": {
          title: "Israel–Lebanon Agreement of 17 May 1983",
          summary: "Sets the end of the state of war between Israel and Lebanon; annulled by Lebanon in March 1984.",
          primeMinister: "Menachem Begin",
          steps: { "knesset-approval": "Knesset approval" },
        },
        "likud-uae-2020": {
          title: "Abraham Accords: Israel–UAE Peace Treaty",
          summary: "Establishes peace, diplomatic relations and full normalization between Israel and the United Arab Emirates.",
          primeMinister: "Benjamin Netanyahu",
        },
        "likud-bahrain-2020": {
          title: "Israel–Bahrain Joint Communiqué (Abraham Accords)",
          summary: "Establishes diplomatic, peaceful and friendly relations between Israel and Bahrain; in force from 10 December 2020.",
          primeMinister: "Benjamin Netanyahu",
          steps: { "abraham-declaration": "Abraham Accords Declaration (Washington)" },
        },
        "likud-morocco-2020": {
          title: "US–Morocco–Israel Joint Declaration",
          summary: "Commits Israel and Morocco to resume full official contacts; relations were restored in December 2020.",
          primeMinister: "Benjamin Netanyahu",
        },
        "reform-open-skies-2013": {
          title: "Open Skies Agreement with the European Union",
          summary: "Government Decision 59 approved the Israel–EU aviation agreement; Transport Minister Yisrael Katz signed it in June 2013.",
          indicator: "Israeli airlines' share of aircraft movements (%)",
          scaleUnit: "international passengers at Israeli airports (2012)",
        },
        "reform-cellular-2010-2012": {
          title: "Cellular Market Reform",
          summary: "The Communications Ministry under Moshe Kahlon opened the cellular market to new operators and eased switching providers.",
          indicator: "Cellular service price, approx. index (2010 = 100)",
          scaleUnit: "NIS in cellular company revenues (2010)",
        },
        "basic-law-jerusalem-amendment-3": {
          title: "Basic Law: Jerusalem, Capital of Israel (Amendment 3)",
          summary: "A foreign state's official mission in Jerusalem must be accredited to Israel; the state will encourage such missions.",
          ledBy: "MK Dan Illouz (Likud) and others",
        },
        "basic-law-government-amendment-12": {
          title: "Basic Law: The Government (Amendment No. 12)",
          summary: "Limits declaring a prime minister temporarily incapacitated to physical or mental inability, with set approval steps.",
          ledBy: "MK Ofir Katz (Likud) and others",
        },
        "basic-law-government-amendment-11": {
          title: "Basic Law: The Government (Amendment No. 11)",
          summary: "Allows appointing an additional minister in a ministry, responsible for set areas under the ministry's minister.",
          ledBy: "MK Nissim Vaturi (Likud) and others",
        },
      },
      legalCases: {
        "legal-cases-1000-2000-4000": {
          description: "Cases 1000, 2000 and 4000: indictment for bribery, fraud and breach of trust filed with the Jerusalem District Court on 28 January 2020.",
        },
        "legal-icc-palestine-2024": {
          description: "The ICC issued an arrest warrant over alleged war crimes and crimes against humanity in Gaza. Israel rejects the court's jurisdiction.",
        },
        "legal-turkey-gaza-2025": {
          description: "Istanbul prosecutor's office issued arrest warrants against 37 suspects over \"genocide and crimes against humanity\" in Gaza.",
        },
        "legal-turkey-flotilla-2026": {
          description: "Istanbul chief prosecutor's indictment over the Global Sumud flotilla interception; an Istanbul court issued an arrest warrant on 14 July 2026.",
        },
        "legal-spain-mavi-marmara-2015": {
          description: "A National Court judge ordered police to report his arrival, over a 2010 Mavi Marmara complaint; a court panel cancelled this.",
        },
        "legal-bar-on-hebron-1997": {
          description: "Bar-On/Hebron affair: police investigation opened in 1997; the Attorney General closed it for insufficient evidence on 18 April 1997.",
        },
        "legal-amedi-2000": {
          description: "Amedi affair: 1999 police investigation of suspected bribery, breach of trust and attempted fraud; closed for insufficient evidence.",
        },
      },
      predecessors: {},
    },
    ar: {
      leaderName: "بنيامين نتنياهو",
      achievements: {
        "likud-egypt-1979": {
          title: "معاهدة السلام بين إسرائيل ومصر",
          summary: "تُنهي حالة الحرب بين إسرائيل ومصر وتُقيم السلام؛ سارية منذ 25 أبريل 1979.",
          primeMinister: "مناحيم بيغن",
          steps: { "camp-david": "اتفاقيات كامب ديفيد" },
        },
        "likud-lebanon-1983": {
          title: "الاتفاق بين إسرائيل ولبنان (اتفاق 17 أيار 1983)",
          summary: "ينصّ على إنهاء حالة الحرب بين إسرائيل ولبنان؛ ألغاه لبنان في مارس 1984.",
          primeMinister: "مناحيم بيغن",
          steps: { "knesset-approval": "مصادقة الكنيست" },
        },
        "likud-uae-2020": {
          title: "اتفاقيات أبراهام: معاهدة السلام مع الإمارات",
          summary: "تُقيم السلام والعلاقات الدبلوماسية والتطبيع الكامل بين إسرائيل والإمارات العربية المتحدة.",
          primeMinister: "بنيامين نتنياهو",
        },
        "likud-bahrain-2020": {
          title: "البيان المشترك بين إسرائيل والبحرين (اتفاقيات أبراهام)",
          summary: "يُقيم علاقات دبلوماسية وسلمية وودية بين إسرائيل والبحرين؛ ساري المفعول منذ 10 ديسمبر 2020.",
          primeMinister: "بنيامين نتنياهو",
          steps: { "abraham-declaration": "إعلان اتفاقيات أبراهام (واشنطن)" },
        },
        "likud-morocco-2020": {
          title: "الإعلان المشترك للولايات المتحدة والمغرب وإسرائيل",
          summary: "التزمت إسرائيل والمغرب باستئناف الاتصالات الرسمية الكاملة؛ واستُؤنفت العلاقات في ديسمبر 2020.",
          primeMinister: "بنيامين نتنياهو",
        },
        "reform-open-skies-2013": {
          title: "اتفاقية الأجواء المفتوحة مع الاتحاد الأوروبي",
          summary: "أقرّ قرار الحكومة 59 اتفاقية الطيران بين إسرائيل والاتحاد الأوروبي، ووقّعها وزير المواصلات يسرائيل كاتس في يونيو 2013.",
          indicator: "حصة شركات الطيران الإسرائيلية من حركة الطائرات (%)",
          scaleUnit: "مسافر دولي في مطارات إسرائيل (2012)",
        },
        "reform-cellular-2010-2012": {
          title: "إصلاح سوق الهواتف الخلوية",
          summary: "فتحت وزارة الاتصالات برئاسة موشيه كحلون سوق الخلوي أمام مشغّلين جدد وسهّلت الانتقال بين المزوّدين.",
          indicator: "سعر الخدمة الخلوية، مؤشر تقريبي (2010 = 100)",
          scaleUnit: "شيكل من إيرادات شركات الخلوي (2010)",
        },
        "basic-law-jerusalem-amendment-3": {
          title: "قانون أساس: القدس عاصمة إسرائيل (التعديل رقم 3)",
          summary: "لا تُقام في القدس ممثلية رسمية لدولة أجنبية إلا إذا كانت معتمدة لدى إسرائيل؛ وتشجّع الدولة إقامة مثل هذه الممثليات.",
          ledBy: "عضو الكنيست دان إيلوز (الليكود) وآخرون",
        },
        "basic-law-government-amendment-12": {
          title: "قانون أساس: الحكومة (التعديل رقم 12)",
          summary: "يحصر إعلان تعذّر قيام رئيس الحكومة بمهامه مؤقتًا في العجز الجسدي أو النفسي، وفق إجراءات مصادقة محددة.",
          ledBy: "عضو الكنيست أوفير كاتس (الليكود) وآخرون",
        },
        "basic-law-government-amendment-11": {
          title: "قانون أساس: الحكومة (التعديل رقم 11)",
          summary: "يتيح تعيين وزير إضافي في وزارة، مسؤول عن مجالات محددة بإشراف الوزير المسؤول عن الوزارة.",
          ledBy: "عضو الكنيست نيسيم فاتوري (الليكود) وآخرون",
        },
      },
      legalCases: {
        "legal-cases-1000-2000-4000": {
          description: "الملفات 1000 و2000 و4000: قُدّمت لائحة اتهام بالرشوة والاحتيال وخيانة الأمانة إلى المحكمة المركزية في القدس في 28 يناير 2020.",
        },
        "legal-icc-palestine-2024": {
          description: "أصدرت المحكمة الجنائية الدولية مذكرة اعتقال بشأن جرائم حرب وجرائم ضد الإنسانية مزعومة في غزة. وترفض إسرائيل ولاية المحكمة.",
        },
        "legal-turkey-gaza-2025": {
          description: "أصدرت النيابة العامة في إسطنبول مذكرات اعتقال بحق 37 مشتبهًا بهم بتهمة \"الإبادة الجماعية والجرائم ضد الإنسانية\" في غزة.",
        },
        "legal-turkey-flotilla-2026": {
          description: "لائحة اتهام من المدعي العام في إسطنبول بشأن اعتراض أسطول \"الصمود\"؛ وأصدرت محكمة في إسطنبول مذكرة اعتقال في 14 يوليو 2026.",
        },
        "legal-spain-mavi-marmara-2015": {
          description: "أمر قاضٍ في المحكمة الوطنية الشرطةَ بالإبلاغ عن وصوله إثر شكوى بشأن سفينة مافي مرمرة عام 2010؛ وألغت هيئة قضائية ذلك.",
        },
        "legal-bar-on-hebron-1997": {
          description: "قضية بار-أون/الخليل: فُتح تحقيق شرطي عام 1997، وأغلقه المستشار القضائي للحكومة لعدم كفاية الأدلة في 18 أبريل 1997.",
        },
        "legal-amedi-2000": {
          description: "قضية عميدي: تحقيق شرطي عام 1999 بشبهة الرشوة وخيانة الأمانة ومحاولة الاحتيال؛ أُغلق لعدم كفاية الأدلة.",
        },
      },
      predecessors: {},
    },
  },
};
