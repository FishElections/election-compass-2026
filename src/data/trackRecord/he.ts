import type { SourcePublisherId } from "./sources";

export interface AchievementText {
  /** The official name (e.g. the law's name). */
  title: string;
  /** One factual sentence on what it does. No evaluative adjectives (§3.5). */
  summary: string;
  /** Reforms and legislation: what the before/after numbers measure. */
  indicator?: string;
  /** Reforms: the unit of `scale.value` (e.g. "housing units"). */
  scaleUnit?: string;
  /** Agreements: the prime minister's name at signing. */
  primeMinister?: string;
  /** Agreements: names of earlier steps, by step id. */
  steps?: Record<string, string>;
}

export interface LegalCaseText {
  /** In the source's wording (§4.4). */
  description: string;
}

export interface PartyTrackRecordText {
  /**
   * The #1 on the list (§2.2), whose legal record is shown. Needed because
   * Party.leader can name co-leaders ("A / B"). Veteran parties only.
   */
  leaderName?: string;
  achievements: Record<string, AchievementText>;
  legalCases: Record<string, LegalCaseText>;
  /** predecessorId → the predecessor party's name. */
  predecessors: Record<string, { name: string }>;
}

export interface TrackRecordLocaleText {
  /** Every publisher on the closed list, by display name (§5). */
  publishers: Record<SourcePublisherId, string>;
  parties: Record<string, PartyTrackRecordText>;
}

export const trackRecordTextHe: TrackRecordLocaleText = {
  publishers: {
    knesset: "הכנסת",
    "gov-il": "אתר הממשלה (gov.il)",
    police: "משטרת ישראל",
    "attorney-general": "משרד היועץ המשפטי לממשלה",
    "state-attorney": "פרקליטות המדינה",
    courts: "הרשות השופטת",
    cec: "ועדת הבחירות המרכזית",
    reshumot: "רשומות",
    "un-treaties": "אוסף האמנות של האו״ם",
    icc: "בית הדין הפלילי הבינלאומי",
    "state-comptroller": "מבקר המדינה",
    "bank-of-israel": "בנק ישראל",
    cbs: "הלשכה המרכזית לסטטיסטיקה",
    "knesset-ric": "מרכז המחקר והמידע של הכנסת",
    idi: "המכון הישראלי לדמוקרטיה",
    "peer-reviewed": "מחקר שעבר ביקורת עמיתים",
    kan: "כאן",
    haaretz: "הארץ",
    ynet: "ynet",
    "times-of-israel": "The Times of Israel",
    jpost: "ג׳רוזלם פוסט",
    globes: "גלובס",
    calcalist: "כלכליסט",
    walla: "וואלה",
    maariv: "מעריב",
    n12: "N12",
    "israel-hayom": "ישראל היום",
  },
  parties: {},
};
