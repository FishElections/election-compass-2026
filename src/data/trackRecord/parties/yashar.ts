import type { SourceRef } from "../core";
import type { SourcePublisherId } from "../sources";
import type { PartyRecordModule } from "./registry";

/**
 * Yashar! (leader: Gadi Eisenkot). Not a veteran party: no Knesset faction of
 * its own (reports/track-record/veteran-status.md), so achievements show "Not
 * applicable" (methodology §2.4). The legal record is shown for every party
 * (v1.7 §4).
 *
 * Leader (§2.2): #1 "איזנקוט גד" on the CEC's 26th-Knesset list page.
 *
 * Legal record: no formally started criminal proceeding against him was found.
 * Not counted (§4.3, formally started only): complaints and requests to
 * investigate (e.g. Likud's 2026 request about suspected foreign interference,
 * which is not about him personally). The Supreme Court decisions found by a
 * search for his name are petitions against him as Chief of Staff, not
 * criminal cases. ICC pages could not be opened (bot block); no approved
 * source reports an ICC proceeding against him.
 */
const ACCESSED = "2026-10-18";
const src = (publisher: SourcePublisherId, url: string): SourceRef => ({ publisher, url, accessed: ACCESSED });

const empty = { achievements: {}, legalCases: {}, predecessors: {} };

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [src("cec", "https://www.gov.il/he/pages/yashar_list_2")],
    legalSourcesChecked: [
      src("courts", "https://supremedecisions.court.gov.il/"),
      src("ynet", "https://www.ynet.co.il/topics/%D7%92%D7%93%D7%99_%D7%90%D7%99%D7%96%D7%A0%D7%A7%D7%95%D7%98"),
      src("jpost", "https://www.jpost.com/tags/gadi-eisenkot"),
    ],
    predecessors: [],
    knessetPeriods: [],
    achievements: [],
    legalCases: [],
  },
  text: {
    he: { leaderName: "גדי איזנקוט", ...empty },
    en: { leaderName: "Gadi Eisenkot", ...empty },
    ar: { leaderName: "غادي آيزنكوت", ...empty },
  },
};
