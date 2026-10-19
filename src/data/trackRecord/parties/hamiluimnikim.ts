import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * The Reservists and the Economic Party (leaders: Yoaz Hendel / Yaron
 * Zelekha). Not a veteran party (reports/track-record/veteran-status.md,
 * note 4), so achievements show "Not applicable" (methodology §2.4). The legal
 * record is shown for every party (v1.7 §4).
 *
 * Leader (§2.2): #1 on the CEC's 26th-Knesset list page is "הנדל יועז" (on
 * behalf of the Reservists party); Zelekha is #2. The legal record is Hendel's.
 *
 * Legal record: no formally started criminal proceeding against him was found.
 * Not counted (§4.3): 2020 complaints about Communications Ministry decisions,
 * reported only by Telecom News (not on the closed source list) as referred to
 * police "for a decision", with no approved source showing an investigation was
 * opened. The 2012 Natan Eshel affair: Hendel was among those who reported it,
 * not a suspect. The Supreme Court decisions that name him are petitions, not
 * criminal cases.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const empty = { achievements: {}, legalCases: {}, predecessors: {} };

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [src("cec", "https://www.gov.il/he/pages/hamiluimnikim-vehakalkalit_list16")],
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/"),
      src("ynet", "https://www.ynet.co.il/topics/%D7%99%D7%95%D7%A2%D7%96_%D7%94%D7%A0%D7%93%D7%9C"),
      src("jpost", "https://www.jpost.com/tags/yoaz-hendel"),
    ],
    predecessors: [],
    knessetPeriods: [],
    achievements: [],
    legalCases: [],
  },
  text: {
    he: { leaderName: "יועז הנדל", ...empty },
    en: { leaderName: "Yoaz Hendel", ...empty },
    ar: { leaderName: "يوعاز هندل", ...empty },
  },
};
