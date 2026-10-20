import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Amcha Yisrael (leader: Ofer Winter). Not a veteran party: no Knesset faction
 * of its own (reports/track-record/veteran-status.md), so achievements show
 * "Not applicable" (methodology §2.4). The legal record is shown for every
 * party (v1.7 §4).
 *
 * Leader (§2.2): #1 "ווינטר עופר" on the CEC's 26th-Knesset list page.
 *
 * Legal record: one Military Police (מצ"ח) investigation, December 2014, in
 * which he was questioned under caution as Givati Brigade commander. Haaretz
 * (22 Dec 2014), Walla (22 Dec 2014) and Ynet (23 Dec 2014) reported that the
 * military prosecution was expected to close it, not that it had. Later reports
 * conflict: N12 (2 Jan 2015) says the prosecution decided to close it about two
 * weeks earlier, while Walla (2 Jan 2015) says the investigation was still
 * ongoing. With only one approved outlet for the closure, the status is shown
 * as not confirmed (v1.2), last confirmed open on 22 Dec 2014.
 *
 * Not counted (§4.3): the 2026 Hind Rajab Foundation complaint in Italy (no
 * proceeding opened per the approved sources), the 2014 Rafah "Black Friday"
 * matter (no approved source ties a criminal investigation to him personally),
 * and his February 2026 open testimony at Lahav 433 in the "night meeting"
 * affair (Maariv: "עדות פתוחה"; the suspect named is someone else). The 2015 command note and the
 * reprimand over a call with Bennett are disciplinary, not criminal.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [src("cec", "https://www.gov.il/he/pages/amcha-israel_list6")],
    legalSourcesChecked: [
      src("walla", "https://www.walla.co.il/news/world/3826251"),
      src("maariv", "https://www.maariv.co.il/news/law/article-1287400"),
      src("ynet", "https://www.ynet.co.il/topics/%D7%A2%D7%95%D7%A4%D7%A8_%D7%95%D7%99%D7%A0%D7%98%D7%A8"),
      src("jpost", "https://www.jpost.com/tags/ofer-winter"),
    ],
    predecessors: [],
    knessetPeriods: [],
    achievements: [],
    legalCases: [
      {
        id: "legal-givati-mpcid-2014",
        jurisdiction: "IL",
        status: "under-investigation",
        since: "2014-12-18",
        statusConfirmed: false,
        lastConfirmedOn: "2014-12-22",
        sources: [
          src("haaretz", "https://www.haaretz.co.il/news/law/2014-12-18/ty-article/0000017f-db20-df0f-a17f-df63fc650000"),
          src("ynet", "https://www.ynet.co.il/articles/0,7340,L-4605404,00.html"),
          src("walla", "https://www.walla.co.il/news/military/2812722"),
          src("n12", "https://www.mako.co.il/news-law/crime-q4_2014/Article-f2464685c236a41004.htm"),
          src("haaretz", "https://www.haaretz.co.il/news/politics/2014-12-22/ty-article/0000017f-e012-db22-a17f-fcb3d0f00000"),
          src("ynet", "https://www.ynet.co.il/articles/0,7340,L-4606738,00.html"),
          src("walla", "https://www.walla.co.il/news/military/2816158"),
          src("n12", "https://www.mako.co.il/news-military/security-q1_2015/Article-e7b6488571aaa41004.htm"),
        ],
      },
    ],
  },
  text: {
    he: {
      leaderName: "עופר וינטר",
      achievements: {},
      legalCases: {
        "legal-givati-mpcid-2014": {
          description: "נחקר באזהרה במצ\"ח בחשד שלא דיווח על הטרדות מיניות בחטיבה. בדצמבר 2014 דווח שהפרקליטות הצבאית צפויה לסגור את התיק.",
        },
      },
      predecessors: {},
    },
    en: {
      leaderName: "Ofer Winter",
      achievements: {},
      legalCases: {
        "legal-givati-mpcid-2014": {
          description: "Questioned under caution by Military Police over suspected non-reporting of sexual harassment in his brigade. December 2014 reports said closure was expected.",
        },
      },
      predecessors: {},
    },
    ar: {
      leaderName: "عوفر فينتر",
      achievements: {},
      legalCases: {
        "legal-givati-mpcid-2014": {
          description: "خضع لتحقيق تحت التحذير لدى الشرطة العسكرية للاشتباه بعدم إبلاغه عن تحرش جنسي في لوائه. في ديسمبر 2014 أفيد بتوقع إغلاق الملف.",
        },
      },
      predecessors: {},
    },
  },
};
