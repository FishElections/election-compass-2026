import {
  ExclusionReason,
  NationalSector,
  PartyNoteId,
  PartySector,
  ReligiousCharacter,
} from "@/types";

/**
 * שני צירי הסינון המגזרי, כל אחד מהם חלוקה מלאה של כל המפלגות.
 *
 * "חלוקה מלאה" הוא התנאי שמחזיק את הכלי ישר: אין קטגוריה שיורית של
 * "כל השאר", ולכן לכל אפשרות יש משמעות שאפשר לנסח במשפט אחד, וסינון
 * שלה עושה בדיוק את מה שכתוב עליו. בדיקת שלמות הדאטה אוכפת שלכל מפלגה
 * יש בדיוק ערך אחד מכל ציר.
 *
 * שתי הרשימות מוצגות במלואן ואף אפשרות אינה מסומנת מראש. שאלה שמציגה רק
 * "ערבית / חרדית" מייחדת קבוצות מסוימות כחריגות ומטה את התשובה; חלוקה
 * מלאה נותנת לכל משתמש, בשלושת הלוקאלים, את אותו כלי בדיוק.
 */
export const nationalSectors: NationalSector[] = ["arab", "jewish"];

export const religiousCharacters: ReligiousCharacter[] = [
  "haredi",
  "religious-zionist",
  "islamist",
  "non-religious",
];

/** כל ערכי המגזר, לצורך ולידציה של מצב שמור. */
export const partySectors: PartySector[] = [
  ...nationalSectors,
  ...religiousCharacters,
];

export const blocOptions = ["any", "anti", "pro"] as const;
export type BlocOption = (typeof blocOptions)[number];

export const sizeOptions = ["any", "large", "small"] as const;
export type SizeOption = (typeof sizeOptions)[number];

export const exclusionReasons: ExclusionReason[] = ["sector", "bloc", "threshold"];

export const partyNoteIds: PartyNoteId[] = [
  "below-threshold",
  "near-threshold",
  "large",
  "small",
];
