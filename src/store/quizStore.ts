import { create } from "zustand";
import { questions, shortQuestions } from "@/data/questions";
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
  startQuiz: (mode: QuizMode) => void;
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
  activeQuestions: shortQuestions,
  currentIndex: 0,
  answers: {},
  categoryWeights: {},

  startQuiz: (mode) =>
    set({
      mode,
      activeQuestions: mode === "short" ? shortQuestions : questions,
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
    }),

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
