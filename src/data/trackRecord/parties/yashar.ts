import type { PartyRecordModule } from "./registry";

/**
 * Not a veteran party: no Knesset faction of its own (reports/track-record/
 * veteran-status.md), so the card shows "Not applicable" (methodology §2.4).
 */
const empty = { achievements: {}, legalCases: {}, predecessors: {} };

export const record: PartyRecordModule = {
  core: {
    asOf: "2026-10-18",
    leaderSources: [],
    legalSourcesChecked: [],
    predecessors: [],
    knessetPeriods: [],
    achievements: [],
    legalCases: [],
  },
  text: { he: empty, en: empty, ar: empty },
};
