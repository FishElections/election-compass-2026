export type CategoryId =
  | "security"
  | "economy"
  | "infrastructure"
  | "religion_state"
  | "judiciary"
  | "governance"
  | "society";

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

/** 0 = לא חשוב בכלל, 0.5 = לא חשוב, 1 = רגיל, 1.5 = חשוב לי, 2 = הכי קריטי לי */
export type TopicWeight = 0 | 0.5 | 1 | 1.5 | 2;

/** מפתחות חסרים = משקל רגיל (1). זמין בשני המסלולים (מקיף ומהיר). */
export type CategoryWeights = Partial<Record<CategoryId, TopicWeight>>;

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

/**
 * המגזר שהמפלגה מייצגת, בשני צירים בלתי-תלויים.
 *
 * שני הצירים הם *חלוקה מלאה*: לכל מפלגה יש בדיוק ערך אחד בכל ציר, ואין
 * קטגוריה שיורית של "כל השאר". זה לא ניואנס - זו הייתה תקלה אמיתית בגרסה
 * קודמת, שבה קטגוריה בשם "יהודית-ציונית" הוגדרה על החיתוך של שני הצירים.
 * התוצאה: משתמש שסינן "מפלגה יהודית" נשאר עם ש"ס ויהדות התורה ברשימה, כי
 * הן יהודיות אך לא ציוניות. קטגוריה שמערבבת צירים לא עונה נכון על אף אחת
 * מהשאלות שהיא לכאורה שואלת.
 *
 * הפרדת הצירים גם הופכת את הכלי לסימטרי: משתמש ב-/ar מקבל הבחנה בין רע"ם
 * (איסלאמית) לחד"ש-תע"ל ובל"ד (לא-דתיות) בדיוק כפי שמשתמש ב-/he מקבל
 * הבחנה בין חרדית לדתית-לאומית - במקום שהמפלגות הערביות יוצגו כגוש אחד
 * בלתי-מובחן בזמן שהמפלגות היהודיות מפורטות.
 */

/** ציר לאומי. כל מפלגה היא בדיוק אחד מהשניים. */
export type NationalSector = "arab" | "jewish";

/** ציר האופי הדתי. "non-religious" = הדת אינה ציר מרכזי במצע. */
export type ReligiousCharacter =
  | "haredi"
  | "religious-zionist"
  | "islamist"
  | "non-religious";

export type PartySector = NationalSector | ReligiousCharacter;

/**
 * שיוך הגוש כפי שהוא נספר בסקרים הישראליים. שלוש קטגוריות ולא שתיים:
 * המפלגות הערביות נספרות בנפרד משני הגושים, ולכן "לא ממליצה על נתניהו"
 * ו"שייכת לגוש המתנגד" אינם אותו דבר.
 *
 * זוהי הצהרה פומבית שמשתנה בין מערכות בחירות - ולכן מחייבת מקור ותאריך,
 * באותו סטנדרט של officialBallotLetter ושל party_stances.
 */
export type BlocStance = "pro-netanyahu" | "anti-netanyahu" | "unaligned";

export interface PartyBlocDeclaration {
  stance: BlocStance;
  /** תאריך הבדיקה האחרונה, בפורמט YYYY-MM-DD */
  asOf: string;
  /** קישור למקור פומבי שמאמת את השיוך */
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
  /** נתיב ללוגו הרשמי של המפלגה (public/party_logos), כשקיים. ראו PartyLogo. */
  logoImageUrl?: string;
  /** האות הרשמית בפתק, כשתפורסם. ראו OfficialBallotLetter. */
  officialBallotLetter?: OfficialBallotLetter;
  /** נשמר לשימוש עתידי; לא מאוכלס בפועל כדי להימנע משימוש בדימויים לא מורשים של אנשים אמיתיים. */
  leaderSketchUrl?: string;
  /** המגזרים שהמפלגה מייצגת. ראו PartySector. */
  sectors: PartySector[];
  /** שיוך הגוש, כשמתועד. חסר = לא משויך, והמפלגה לעולם לא נפסלת בגללו. */
  bloc?: PartyBlocDeclaration;
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
  /**
   * קישור למקור פומבי אמיתי (מצע רשמי, פרוטוקול הצבעה בכנסת, ריאיון מתועד)
   * שמאמת את הערך. כשהשדה חסר, הערך נגזר מפרופיל אידאולוגי כללי ולא מעמדה
   * מתועדת ספציפית - ראו ההערה בראש party_stances.ts.
   */
  sourceUrl?: string;
  /** תיאור קצר / ציטוט של המקור, בעברית */
  sourceNote?: string;
}

export interface LikertOption {
  value: StanceValue;
  label: string;
}

export type QuizMode = "short" | "long";

export type UserAnswers = Record<string, StanceValue | undefined>;

/** למה מפלגה הוסתרה. משמש גם כמזהה התווית המוצגת על השורה המוסתרת. */
export type ExclusionReason = "sector" | "bloc" | "threshold";

/** תגית מידע בלבד - לא משפיעה על דירוג ולא מסתירה. */
export type PartyNoteId = "below-threshold" | "near-threshold" | "large" | "small";

/** "any" = בלי סינון. ברירת המחדל בכל שדה היא לא לסנן כלום. */
export interface QuizFilters {
  /** מגזרים שהמשתמש לא מוכן להצביע להם */
  excludedSectors: PartySector[];
  /**
   * "pro" = רק מפלגות שימליצו על נתניהו.
   * "anti" = רק מפלגות שלא ימליצו עליו - כולל המפלגות הערביות, שאינן
   * בגוש המתנגד אך ודאי אינן ממליצות עליו.
   */
  blocPreference: "pro" | "anti" | "any";
  /** העדפה רכה: שוברת שוויון בלבד, לעולם לא פוסלת. ראו calculator.ts. */
  sizePreference: "large" | "small" | "any";
  /** הסתרת מפלגות שאינן עוברות את אחוז החסימה בסקרים */
  hideBelowThreshold: boolean;
}

export const emptyFilters: QuizFilters = {
  excludedSectors: [],
  blocPreference: "any",
  sizePreference: "any",
  hideBelowThreshold: false,
};

export interface PartyResult {
  party: Party;
  /**
   * התאמה אידאולוגית בלבד. המסננים לעולם לא נוגעים במספר הזה - ברגע שגודל
   * בסקרים או מגזר נכנסים לתוכו, "83% התאמה" מפסיק להיות מדיד.
   */
  matchPercentage: number;
  answeredCount: number;
  /** ריק = המפלגה עברה את הסינון */
  excludedBy: ExclusionReason[];
  /** תגיות תצוגה בלבד */
  notes: PartyNoteId[];
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

/**
 * קטגוריות עמוד "הנושאים החמים" - העמוד היחיד להסברה אזרחית באתר.
 * מזהה יציב ובלתי-תלוי-שפה; התווית המוצגת נגזרת דרך
 * getCategoryLabels(locale) ב-src/data/hotTopics/index.ts.
 */
export type TopicCategory = "security" | "religion" | "law" | "economy" | "society";

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

export interface Topic {
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
  /**
   * עמדות המפלגות, כשקיימות. אופציונלי במכוון: לא לכל נושא יש עמדות
   * מפלגתיות מבוקרות, וההסבר הבסיסי חייב לעמוד גם בלעדיו.
   */
  partyStancesSummary?: PartyStancesSummary;
  /** מזהה השאלה המקבילה בשאלון (Question.id), כשקיימת */
  relatedQuestionId?: string;
}
