import type { PartyTrackRecordText, TrackRecordLocaleText } from "./he";
import { partyRecords } from "./parties/registry";

/** Each party file holds its own he/en/ar text (see ./parties/registry). */
function textFor(locale: "he" | "en" | "ar"): Record<string, PartyTrackRecordText> {
  return Object.fromEntries(
    Object.entries(partyRecords).map(([id, record]) => [id, record.text[locale]])
  );
}

export const trackRecordTextEn: TrackRecordLocaleText = {
  publishers: {
    knesset: "The Knesset",
    "gov-il": "Government of Israel (gov.il)",
    police: "Israel Police",
    "attorney-general": "Office of the Attorney General",
    "state-attorney": "State Attorney's Office",
    courts: "The Judicial Authority",
    cec: "Central Elections Committee",
    reshumot: "Reshumot (Official Gazette)",
    "un-treaties": "UN Treaty Collection",
    icc: "International Criminal Court",
    "state-comptroller": "State Comptroller",
    "bank-of-israel": "Bank of Israel",
    cbs: "Central Bureau of Statistics",
    "knesset-ric": "Knesset Research and Information Center",
    idi: "Israel Democracy Institute",
    "peer-reviewed": "Peer-reviewed study",
    kan: "Kan",
    haaretz: "Haaretz",
    ynet: "Ynet",
    "times-of-israel": "The Times of Israel",
    jpost: "The Jerusalem Post",
    globes: "Globes",
    calcalist: "Calcalist",
    walla: "Walla",
    maariv: "Maariv",
    n12: "N12",
    "israel-hayom": "Israel Hayom",
  },
  parties: textFor("en"),
};
