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
