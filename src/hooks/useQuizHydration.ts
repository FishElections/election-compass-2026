"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { Locale } from "@/i18n/config";

/**
 * קורא בחזרה את השאלון השמור מ-localStorage בצד הלקוח.
 *
 * כל דף שמרנדר מתוך quizStore חייב לקרוא לזה — אחרת טעינה ישירה של אותו דף
 * (רענון, או קישור שנפתח מוואטסאפ) מתחילה מ-store ריק. ה-store מוגדר עם
 * skipHydration כדי שה-HTML מהשרת וה-render הראשון בלקוח יהיו זהים, ולכן
 * ה-rehydrate חייב לקרות ב-effect ולא בזמן import.
 *
 * מקבל את השפה הנוכחית: הטקסט המשוחזר נבנה בשפת ברירת המחדל, ולכן ברגע
 * שההידרציה הסתיימה (וגם בכל החלפת שפה באמצע השאלון) קוראים ל-retext כדי
 * להחליף את הטקסט לשפה הפעילה לפי id — בלי לגעת בתשובות.
 *
 * מחזיר false עד שהקריאה הסתיימה, כדי שאפשר יהיה להימנע מהבזק של "לא נמצאו
 * תשובות" לפני שהתשובות השמורות נטענו.
 */
export function useQuizHydration(locale: Locale): boolean {
  const hasHydrated = useQuizStore((state) => state.hasHydrated);

  useEffect(() => {
    void useQuizStore.persist.rehydrate();
  }, []);

  // Once hydrated, and on every subsequent locale change, refresh the question
  // text to the active locale by id. retext preserves answers/currentIndex, so
  // switching language mid-quiz never wipes progress.
  useEffect(() => {
    if (hasHydrated) useQuizStore.getState().retext(locale);
  }, [locale, hasHydrated]);

  return hasHydrated;
}
