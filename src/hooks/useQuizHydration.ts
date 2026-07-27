"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";

/**
 * קורא בחזרה את השאלון השמור מ-localStorage בצד הלקוח.
 *
 * כל דף שמרנדר מתוך quizStore חייב לקרוא לזה — אחרת טעינה ישירה של אותו דף
 * (רענון, או קישור שנפתח מוואטסאפ) מתחילה מ-store ריק. ה-store מוגדר עם
 * skipHydration כדי שה-HTML מהשרת וה-render הראשון בלקוח יהיו זהים, ולכן
 * ה-rehydrate חייב לקרות ב-effect ולא בזמן import.
 *
 * מחזיר false עד שהקריאה הסתיימה, כדי שאפשר יהיה להימנע מהבזק של "לא נמצאו
 * תשובות" לפני שהתשובות השמורות נטענו.
 */
export function useQuizHydration(): boolean {
  useEffect(() => {
    void useQuizStore.persist.rehydrate();
  }, []);

  return useQuizStore((state) => state.hasHydrated);
}
