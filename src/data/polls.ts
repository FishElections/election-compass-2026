import { PartyNoteId } from "@/types";

/**
 * תצלום מצב של סקר מנדטים אחד, מתוארך וממוקר.
 *
 * למה קובץ נפרד מ-parties/core.ts: תכונות מפלגה (מגזר, גוש) יציבות לאורך
 * מערכת בחירות שלמה, ואילו מספרי סקרים מתיישנים תוך שבועות. ערבוב שלהם
 * באותו קובץ מוביל לכך שעדכון סקר נוגע בזהות המפלגה, ולכך שאף אחד לא יודע
 * מתי המספר נמדד.
 *
 * שלושה כללים שאסור לוותר עליהם:
 *
 * 1. גודל המפלגה לא נשמר כשדה - הוא *נגזר* מהמנדטים (ראו sizeFor). שדה
 *    שמור היה מתיישן בשקט ברגע שמישהו מעדכן את המספרים בלי לעדכן אותו.
 * 2. כל ממשק שנשען על הנתונים האלה חייב להציג את המקור והתאריך. בלי זה
 *    זו קביעה של האתר, לא ציטוט של סקר.
 * 3. סנאפשוט ישן מ-STALE_AFTER_DAYS מכבה את המסננים שנשענים עליו
 *    (ראו isPollSnapshotFresh). מסנן מושבת עדיף על מסנן שקרי.
 */
export interface PollSnapshot {
  /** תאריך פרסום הסקר, YYYY-MM-DD */
  updatedAt: string;
  /**
   * מזהה הסוקר, בלתי-תלוי-שפה. שם הסוקר הוא טקסט פונה-משתמש בדיוק כמו שם
   * מפלגה - התווית המוצגת נגזרת דרך getFilterLabels(locale).pollSource,
   * לא נשמרת כאן. (באג אמיתי שנתפס בבדיקה: "חדשות 13" נשאר בעברית גם
   * בעמוד האנגלי לפני התיקון.)
   */
  sourceId: "channel13" | "kan11";
  sourceUrl: string;
  /**
   * partyId → מנדטים. מפלגה שלא עברה את אחוז החסימה בסקר מקבלת 0 -
   * ההבחנה בין "0" ל"לא נסקרה בנפרד" נשמרת בכך שכל מפלגה מופיעה כאן.
   */
  seats: Record<string, number>;
}

/** אחוז החסימה הוא 3.25%, שהם 4 מנדטים ב-120. */
export const THRESHOLD_SEATS = 4;

/** אחוז החסימה עצמו, כשבר מכלל הקולות הכשרים. */
export const THRESHOLD_PERCENT = 3.25;

/**
 * גודל המדגם וטעות הדגימה של הסקר. אלה הקלט של סימולטור אחוז החסימה:
 * טעות הדגימה של *כל מפלגה* נגזרת מ-n דרך שגיאת התקן של שיעור
 * (sqrt(p(1-p)/n)), ולא מהמספר הכללי 4.2% - מפלגה קטנה סמוכה לחסימה
 * רגישה לרעש אחרת מגוש גדול, וזה בדיוק מה שהסימולטור בא להראות.
 */
export const SAMPLE_SIZE = 552;
export const MARGIN_OF_ERROR_PERCENT = 4.2;

/**
 * השיעור הממשי (באחוזים) של מפלגות שלא עברו את החסימה בסקר. seats=0
 * מאבד את המידע הזה, ובלעדיו אי אפשר לסמלץ "כמה הן רחוקות מהקו" - לכן
 * הוא נשמר כאן במפורש, מצוטט מאותו פרסום. מפלגות שעברו את החסימה לא
 * מופיעות כאן: השיעור שלהן נגזר מהמנדטים (ראו voteShareFor).
 */
const belowThresholdPercent: Record<string, number> = {
  "kachol-lavan": 0.9,
};

/** מעל הגיל הזה הנתונים לא משמשים לסינון. */
export const STALE_AFTER_DAYS = 30;

/**
 * סקר כאן 11 (קנטאר, דודו חסיד), 11/10/2026: 552 נשאלים, טעות דגימה 4.2%.
 *
 * נבחר סקר יחיד ולא ממוצע: ממוצע מחייב החלטות שקלול שאין להן מקור פומבי
 * אחד לצטט, ואילו סקר בודד ניתן לאימות מלא מול הפרסום. המספרים כאן
 * מסתכמים ל-120 בדיוק, והגושים מתאימים לחלוקה שפורסמה: גוש איזנקוט 50,
 * הקואליציה 53, המפלגות הערביות 13, והמילואימניקים (4) מחוץ לגושים.
 */
export const currentPoll: PollSnapshot = {
  updatedAt: "2026-10-11",
  sourceId: "kan11",
  sourceUrl:
    "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000",
  seats: {
    yashar: 22,
    likud: 20,
    beyachad: 12,
    "otzma-yehudit": 9,
    hademocratim: 8,
    "yahadut-hatorah": 8,
    // הרשימה המשותפת (חד"ש, תע"ל ובל"ד)
    "hadash-taal": 8,
    "yisrael-beiteinu": 8,
    shas: 7,
    raam: 5,
    "religious-zionism": 5,
    "amcha-yisrael": 4,
    hamiluimnikim: 4,
    // מתחת לאחוז החסימה בסקר הזה: כחול לבן 0.9%.
    "kachol-lavan": 0,
  },
};

export function seatsFor(partyId: string): number | undefined {
  return currentPoll.seats[partyId];
}

/**
 * הגודל נגזר בכל קריאה מהמנדטים, כדי שעדכון סקר לא ישאיר תווית ישנה.
 * "near-threshold" הוא 4-5 מנדטים: טווח שבו טעות הדגימה לבדה מספיקה כדי
 * להפיל מפלגה מתחת לחסימה, ולכן הוא ראוי לתגית אזהרה.
 */
export function noteFor(partyId: string): PartyNoteId | undefined {
  const seats = seatsFor(partyId);
  if (seats === undefined) return undefined;
  if (seats < THRESHOLD_SEATS) return "below-threshold";
  if (seats <= 5) return "near-threshold";
  if (seats >= 12) return "large";
  if (seats <= 8) return "small";
  return undefined;
}

export function isBelowThreshold(partyId: string): boolean {
  const seats = seatsFor(partyId);
  // מפלגה שאין עליה נתון לא מוסתרת - היעדר מידע אינו עדות לחולשה.
  return seats !== undefined && seats < THRESHOLD_SEATS;
}

/** מקבל את "היום" כפרמטר כדי שהבדיקות לא יהיו תלויות בשעון המערכת. */
export function isPollSnapshotFresh(now: Date = new Date()): boolean {
  const updated = new Date(`${currentPoll.updatedAt}T00:00:00Z`);
  const ageDays = (now.getTime() - updated.getTime()) / 86_400_000;
  return ageDays <= STALE_AFTER_DAYS;
}

/** סכום השיעורים של המפלגות שלא עברו את החסימה - הקול ה"מבוזבז" בסקר. */
const wastedPercent = Object.values(belowThresholdPercent).reduce(
  (sum, pct) => sum + pct,
  0
);

export interface PollVoteShare {
  partyId: string;
  /** שיעור הקולות באחוזים (0-100). */
  percent: number;
  /** האם המפלגה עברה את החסימה בסקר כפי שפורסם. */
  crossedInPoll: boolean;
}

/**
 * שחזור שיעור הקולות של כל מפלגה מתוך הסקר, כקלט לסימולציה.
 *
 * למפלגה שעברה את החסימה אין לנו את האחוז המדויק שפורסם, רק מנדטים - אז
 * השיעור נגזר: (מנדטים / 120) * (אחוז הקולות שלא בוזבז). זה עקבי-פנימית:
 * הסכום של כל השיעורים (עוברים + לא-עוברים) יוצא 100% בדיוק, והמפלגה
 * שקיבלה 4 מנדטים נוחתת ממש על קו ה-3.25% - מה שהופך אותה למועמדת
 * המובהקת ליפול מתחת לחסימה ברעש דגימה, וזה הלב של התצוגה.
 *
 * זהו שחזור, לא ציטוט: לכן כל ממשק שמשתמש בו חייב להציג מקור ותאריך,
 * ולהבהיר שהסימולציה היא הדגמה ולא תחזית. ראו ההערה בראש הקובץ.
 */
export function getPollVoteShares(): PollVoteShare[] {
  const survivorFactor = (100 - wastedPercent) / 100;
  return Object.entries(currentPoll.seats).map(([partyId, seats]) => {
    const below = belowThresholdPercent[partyId];
    if (seats < THRESHOLD_SEATS) {
      // מפלגה מתחת לחסימה: משתמשים באחוז שפורסם במפורש. אם חסר (לא אמור
      // לקרות), נופלים לאומדן זהיר של מחצית סף החסימה כדי לא לרסק.
      return {
        partyId,
        percent: below ?? THRESHOLD_PERCENT / 2,
        crossedInPoll: false,
      };
    }
    return {
      partyId,
      percent: (seats / 120) * 100 * survivorFactor,
      crossedInPoll: true,
    };
  });
}
