export type CategoryId =
  | "security"
  | "economy"
  | "religion_state"
  | "judiciary"
  | "society";

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export type PlatformTopicKey =
  | "security"
  | "economy"
  | "justice"
  | "religionAndState"
  | "society";

export interface PlatformTopic {
  topicKey: PlatformTopicKey;
  topicName: string;
  summary: string;
  bulletPoints: string[];
}

/**
 * סיווג ספקטרום פוליטי סטנדרטי, בנוסף לתווית החופשית (spectrum).
 * "sectoral" משמש למפלגות שאינן ממוקמות באופן משמעותי על ציר שמאל-ימין
 * (חרדיות ומפלגות המגזר הערבי), כמקובל במיפוי הפוליטי הישראלי.
 */
export type SpectrumCategory =
  | "left"
  | "center-left"
  | "center"
  | "center-right"
  | "right"
  | "far-right"
  | "sectoral";

export interface Party {
  id: string;
  name: string;
  leader: string;
  color: string;
  /** תווית תיאורית בעברית (לשימוש בממשק) */
  spectrum: string;
  /** סיווג סטנדרטי לצורכי בקרת איכות ומיון אובייקטיבי */
  spectrumCategory: SpectrumCategory;
  shortDescription: string;
  logo: string;
  /** נשמר לשימוש עתידי; לא מאוכלס בפועל כדי להימנע משימוש בדימויים לא מורשים של אנשים אמיתיים. */
  leaderSketchUrl?: string;
  platform: PlatformTopic[];
}

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  isShort: boolean;
}

/** -2 = נגד מאוד, -1 = נגד, 0 = ניטרלי, 1 = בעד, 2 = בעד מאוד */
export type StanceValue = -2 | -1 | 0 | 1 | 2;

export interface PartyStance {
  partyId: string;
  questionId: string;
  stanceValue: StanceValue;
}

export interface LikertOption {
  value: StanceValue;
  label: string;
}

export type QuizMode = "short" | "long";

export type UserAnswers = Record<string, StanceValue | undefined>;

export interface PartyResult {
  party: Party;
  matchPercentage: number;
  answeredCount: number;
}

export interface SteelmanArgument {
  id: string;
  topic: string;
  proPositionTitle: string;
  proPositionArgument: string;
  conPositionTitle: string;
  conPositionArgument: string;
}

export type StanceSide = "pro" | "con";

export interface PartyTopicStance {
  partyId: string;
  topicId: string;
  side: StanceSide;
}

/** 1.0 = נקודה למחשבה, 0.5 = מכיר בטיעון, 0 = לא משכנע */
export type OpennessReaction = 1 | 0.5 | 0;

export interface ChallengeCardResult {
  topicId: string;
  userSide: StanceSide;
  reaction: OpennessReaction;
}
