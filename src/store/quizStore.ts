import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { categories, questions, shortQuestions } from "@/data/questions";
import {
  CategoryId,
  CategoryWeights,
  Question,
  QuizMode,
  StanceValue,
  TopicWeight,
  UserAnswers,
} from "@/types";

/**
 * רשימת השאלות הפעילה נגזרת ולא נשמרת ב-store: המצב הנשמר ב-localStorage
 * חייב להישאר תקף גם כשתוכן השאלות משתנה בין דיפלויים.
 * כשהמשתמש בחר סדר נושאים, השאלות ממוינות לפיו (מיון יציב); נושאים שלא
 * נבחרו נשארים אחרי הנבחרים, בסדר ברירת המחדל.
 */
export function getActiveQuestions(
  mode: QuizMode,
  categoryOrder: CategoryId[]
): Question[] {
  const base = mode === "short" ? shortQuestions : questions;
  if (categoryOrder.length === 0) return base;
  const rank = new Map<CategoryId, number>(
    categories.map((category, i) => {
      const chosen = categoryOrder.indexOf(category.id);
      return [category.id, chosen === -1 ? categoryOrder.length + i : chosen];
    })
  );
  return [...base].sort(
    (a, b) => (rank.get(a.category) ?? 0) - (rank.get(b.category) ?? 0)
  );
}

/** בחירת "מי מתאים לראש ממשלה": מזהה מפלגה, "none" = אף אחד, null = דילג */
export type PmChoice = string | "none" | null;

interface QuizState {
  mode: QuizMode;
  currentIndex: number;
  answers: UserAnswers;
  categoryWeights: CategoryWeights;
  categoryOrder: CategoryId[];
  pmChoice: PmChoice;
  startQuiz: (mode: QuizMode, categoryOrder?: CategoryId[]) => void;
  answerQuestion: (questionId: string, value: StanceValue) => void;
  goNext: () => void;
  goPrev: () => void;
  skip: () => void;
  setCategoryWeight: (category: CategoryId, weight: TopicWeight) => void;
  resetCategoryWeights: () => void;
  setPmChoice: (choice: PmChoice) => void;
  reset: () => void;
}

const validQuestionIds = new Set(questions.map((q) => q.id));

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      mode: "short",
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
      categoryOrder: [],
      pmChoice: null,

      startQuiz: (mode, categoryOrder = []) =>
        set({
          mode,
          categoryOrder,
          currentIndex: 0,
          answers: {},
          categoryWeights: {},
          pmChoice: null,
        }),

      answerQuestion: (questionId, value) => {
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        }));
        get().goNext();
      },

      goNext: () => {
        const { currentIndex, mode, categoryOrder } = get();
        const total = getActiveQuestions(mode, categoryOrder).length;
        if (currentIndex < total - 1) {
          set({ currentIndex: currentIndex + 1 });
        }
      },

      goPrev: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 });
        }
      },

      skip: () => get().goNext(),

      setCategoryWeight: (category, weight) =>
        set((state) => ({
          categoryWeights: { ...state.categoryWeights, [category]: weight },
        })),

      resetCategoryWeights: () => set({ categoryWeights: {} }),

      setPmChoice: (choice) => set({ pmChoice: choice }),

      reset: () =>
        set({
          currentIndex: 0,
          answers: {},
          categoryWeights: {},
          categoryOrder: [],
          pmChoice: null,
        }),
    }),
    {
      name: "quiz-progress-v1",
      storage: createJSONStorage(() => localStorage),
      // הפעולות אינן נשמרות; רק המצב.
      partialize: (state) => ({
        mode: state.mode,
        currentIndex: state.currentIndex,
        answers: state.answers,
        categoryWeights: state.categoryWeights,
        categoryOrder: state.categoryOrder,
        pmChoice: state.pmChoice,
      }),
      // תשובות לשאלות שכבר לא קיימות (תוכן שהשתנה בין דיפלויים) מסוננות,
      // והאינדקס נתחם לגבולות הרשימה הנוכחית.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<QuizState>;
        const answers: UserAnswers = Object.fromEntries(
          Object.entries(p.answers ?? {}).filter(([id]) =>
            validQuestionIds.has(id)
          )
        );
        const mode: QuizMode = p.mode === "long" ? "long" : "short";
        const categoryOrder = (p.categoryOrder ?? []).filter((id) =>
          categories.some((c) => c.id === id)
        );
        const total = getActiveQuestions(mode, categoryOrder).length;
        const currentIndex = Math.min(
          Math.max(p.currentIndex ?? 0, 0),
          total - 1
        );
        return {
          ...current,
          mode,
          categoryOrder,
          answers,
          currentIndex,
          categoryWeights: p.categoryWeights ?? {},
          pmChoice: p.pmChoice ?? null,
        };
      },
      // ההידרציה נדחית לצד הלקוח (useQuizHydrated) כדי למנוע אי-התאמת SSR.
      skipHydration: true,
    }
  )
);

/**
 * מפעיל את שחזור המצב מ-localStorage ומחזיר האם הוא הושלם.
 * יש לרנדר מצב התלוי ב-store רק אחרי שה-hook מחזיר true.
 */
export function useQuizHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    useQuizStore.persist.hasHydrated()
  );
  useEffect(() => {
    const unsubscribe = useQuizStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    useQuizStore.persist.rehydrate();
    return unsubscribe;
  }, []);
  return hydrated;
}
