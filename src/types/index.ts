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

/**
 * האות/אותיות הרשמיות של המפלגה בפתק ההצבעה, כפי שנקבעות על ידי ועדת
 * הבחירות המרכזית. שדה זה נשאר undefined עד לפרסום הרשמי - הגשת הרשימות
 * מתבצעת כ-57 יום לפני הבחירות, כך שלרוב אין אות רשמית זמן רב לפני כן.
 */
export interface OfficialBallotLetter {
  letters: string;
  /** תאריך הפרסום הרשמי, בפורמט YYYY-MM-DD */
  confirmedAt: string;
  /** קישור למקור הרשמי (ועדת הבחירות המרכזית) */
  source: string;
}

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
  /** כינוי לשימוש שוטף בממשק (לא בהכרח האות הרשמית בפתק) */
  logo: string;
  /** האות הרשמית בפתק, כשתפורסם. ראו OfficialBallotLetter. */
  officialBallotLetter?: OfficialBallotLetter;
  /** נשמר לשימוש עתידי; לא מאוכלס בפועל כדי להימנע משימוש בדימויים לא מורשים של אנשים אמיתיים. */
  leaderSketchUrl?: string;
  platform: PlatformTopic[];
}

export interface QuestionMoreInfo {
  /** הקשר ורקע עובדתי בקצרה, בשפה פשוטה */
  summary: string;
  /** הטיעון המרכזי של התומכים בהיגד */
  proArguments: string;
  /** הטיעון המרכזי של המתנגדים להיגד */
  conArguments: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  isShort: boolean;
  moreInfo: QuestionMoreInfo;
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

export type IssueCategory =
  | "ביטחון ומדיניות"
  | "דת ומדינה"
  | "משפט וממשל"
  | "כלכלה ויוקר מחיה"
  | "חברה וביטחון פנים";

export interface IssueArgument {
  title: string;
  text: string;
}

export interface PartyStancesSummary {
  /** מזהי מפלגות (Party.id) התומכות באופן פעיל */
  support: string[];
  /** מזהי מפלגות המתנגדות בתקיפות */
  oppose: string[];
  /** מזהי מפלגות עם עמדה מורכבת, מתפשרת או ניטרלית */
  splitOrNeutral: string[];
}

export interface PoliticalIssue {
  id: string;
  category: IssueCategory;
  title: string;
  /** "במילים פשוטות" */
  simpleExplanation: string;
  /** "מה הדילמה המרכזית?" */
  theDilemma: string;
  proArgument: IssueArgument;
  conArgument: IssueArgument;
  partyStancesSummary: PartyStancesSummary;
  /** מזהה השאלה המקבילה בשאלון (Question.id) */
  relatedQuestionId: string;
}

/** קטגוריות עבור עמוד "הנושאים החמים" - עמוד הסברה אזרחי ללא זיקה מפלגתית */
export type TopicCategory =
  | "משפט וממשל"
  | "ביטחון וחוץ"
  | "כלכלה וחברה"
  | "דת ומדינה";

export interface HotTopic {
  id: string;
  category: TopicCategory;
  /** כותרת קליטה, לא יבשה */
  title: string;
  /** משפט או שאלה פותחת שמסקרנת */
  hook: string;
  /** מה זה בעצם קורה כאן, בשפה פשוטה */
  simpleExplanation: string;
  /** למה יש על זה ויכוח בכלל */
  whyControversial: string;
  /** מונח מרכזי שכדאי להכיר, עם הסבר */
  keyTerm?: { term: string; definition: string };
  argumentsFor: IssueArgument[];
  argumentsAgainst: IssueArgument[];
  /** עובדה קטנה שמוסיפה עניין */
  funFact?: string;
}
