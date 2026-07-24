"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "hot-topics-progress";
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedIds: string[] = [];

function parseIds(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** getSnapshot חייב להחזיר reference יציב כשהנתונים לא השתנו, אחרת
 *  useSyncExternalStore ייכנס ללולאת רינדור אינסופית. */
function getSnapshot(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = parseIds(raw);
  }
  return cachedIds;
}

/** בצד השרת ובזמן ה-hydration הראשוני אין localStorage - מתחילים ריק,
 *  ו-useSyncExternalStore עצמו דואג לעדכן בלי ליצור אי-התאמת hydration.
 *  ה-reference חייב להיות קבוע (לא [] חדש בכל קריאה), אחרת React נכנס
 *  ללולאת רינדור אינסופית. */
const EMPTY_IDS: string[] = [];
function getServerSnapshot(): string[] {
  return EMPTY_IDS;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function addOpenedId(id: string) {
  const current = getSnapshot();
  if (current.includes(id)) return;
  const next = [...current, id];
  cachedIds = next;
  cachedRaw = JSON.stringify(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // localStorage לא זמין (מצב פרטי וכו') - ההתקדמות פשוט לא תישמר
  }
  listeners.forEach((listener) => listener());
}

/**
 * מעקב "עגלת ההבנה" - אילו נושאים חמים המשתמש כבר סימן כ"הבנתי את זה".
 * נשמר מקומית בלבד (localStorage), בלי חשבון משתמש.
 */
export function useTopicProgress() {
  const openedIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const markOpened = useCallback((id: string) => addOpenedId(id), []);
  const isOpened = useCallback((id: string) => openedIds.includes(id), [openedIds]);

  return { openedIds, isOpened, markOpened };
}
