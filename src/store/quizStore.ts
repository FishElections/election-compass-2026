import { create } from "zustand";
import { getQuestions, getShortQuestions } from "@/data/questions";
import { Locale } from "@/i18n/config";
import {
  CategoryId,
  CategoryWeights,
  Question,
  QuizMode,
  StanceValue,
  TopicWeight,
  UserAnswers,
} from "@/types";

interface QuizState {
  mode: QuizMode;
  activeQuestions: Question[];
  currentIndex: number;
  answers: UserAnswers;
  categoryWeights: CategoryWeights;
  startQuiz: (mode: QuizMode, locale: Locale) => void;
  /** Re-fetches activeQuestions' text in a new locale by id, without
   *  touching currentIndex/answers — for a mid-quiz language switch. */
  retext: (locale: Locale) => void;
  answerQuestion: (questionId: string, value: StanceValue) => void;
  goNext: () => void;
  goPrev: () => void;
  skip: () => void;
  setCategoryWeight: (category: CategoryId, weight: TopicWeight) => void;
  resetCategoryWeights: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  mode: "short",
  activeQuestions: getShortQuestions("he"),
  currentIndex: 0,
  answers: {},
  categoryWeights: {},

  startQuiz: (mode, locale) =>
    set({
      mode,
      activeQuestions: mode === "short" ? getShortQuestions(locale) : getQuestions(locale),
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
    }),

  retext: (locale) => {
    const { mode, activeQuestions } = get();
    const freshById = new Map(
      (mode === "short" ? getShortQuestions(locale) : getQuestions(locale)).map(
        (q) => [q.id, q]
      )
    );
    set({
      activeQuestions: activeQuestions.map((q) => freshById.get(q.id) ?? q),
    });
  },

  answerQuestion: (questionId, value) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    }));
    const { currentIndex, activeQuestions } = get();
    if (currentIndex < activeQuestions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  goNext: () => {
    const { currentIndex, activeQuestions } = get();
    if (currentIndex < activeQuestions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  goPrev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  skip: () => {
    const { currentIndex, activeQuestions } = get();
    if (currentIndex < activeQuestions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  setCategoryWeight: (category, weight) =>
    set((state) => ({
      categoryWeights: { ...state.categoryWeights, [category]: weight },
    })),

  resetCategoryWeights: () => set({ categoryWeights: {} }),

  reset: () =>
    set({
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
    }),
}));
