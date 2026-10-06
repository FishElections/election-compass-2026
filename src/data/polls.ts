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
  sourceId: "channel13";
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
 * (sqrt(p(1-p)/n)), ולא מהמספר הכללי 3.5% - מפלגה קטנה סמוכה לחסימה
 * רגישה לרעש אחרת מגוש גדול, וזה בדיוק מה שהסימולטור בא להראות.
 */
export const SAMPLE_SIZE = 988;
export const MARGIN_OF_ERROR_PERCENT = 3.5;

/**
 * השיעור הממשי (באחוזים) של מפלגות שלא עברו את החסימה בסקר. seats=0
 * מאבד את המידע הזה, ובלעדיו אי אפשר לסמלץ "כמה הן רחוקות מהקו" - לכן
 * הוא נשמר כאן במפורש, מצוטט מאותו פרסום. מפלגות שעברו את החסימה לא
 * מופיעות כאן: השיעור שלהן נגזר מהמנדטים (ראו voteShareFor).
 */
const belowThresholdPercent: Record<string, number> = {
  balad: 1.9,
  "kachol-lavan": 1.0,
};

/** מעל הגיל הזה הנתונים לא משמשים לסינון. */
export const STALE_AFTER_DAYS = 30;

/**
 * סקר ערוץ 13, 22/07/2026 (מדגם 988 נשאלים, טעות דגימה 3.5%).
 *
 * נבחר סקר יחיד ולא ממוצע: ממוצע מחייב החלטות שקלול שאין להן מקור פומבי
 * אחד לצטט, ואילו סקר בודד ניתן לאימות מלא מול הפרסום. המספרים כאן
 * מסתכמים ל-120 בדיוק, והגושים מתאימים לחלוקה שפורסמה (49 / 60 / 11).
 */
export const currentPoll: PollSnapshot = {
  updatedAt: "2026-07-22",
  sourceId: "channel13",
  sourceUrl:
    "https://www.haaretz.com/israel-news/elections/2026-07-22/ty-article/israel-election-poll-the-democrats-hold-steady-as-arab-parties-gain-ground/0000019f-86d5-ded0-abdf-a6d5fe220000",
  seats: {
    likud: 21,
    yashar: 21,
    beyachad: 14,
    hademocratim: 11,
    "yisrael-beiteinu": 10,
    shas: 8,
    "yahadut-hatorah": 8,
    "otzma-yehudit": 7,
    "hadash-taal": 6,
    "religious-zionism": 5,
    raam: 5,
    "beit-tzioni": 4,
    // מתחת לאחוז החסימה בסקר הזה: בל"ד 1.9%, כחול לבן 1%.
    balad: 0,
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
