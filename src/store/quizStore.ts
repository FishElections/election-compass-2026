import { create } from "zustand";
import { questions, shortQuestions } from "@/data/questions";
import { Question, QuizMode, StanceValue, UserAnswers } from "@/types";

interface QuizState {
  mode: QuizMode;
  activeQuestions: Question[];
  currentIndex: number;
  answers: UserAnswers;
  startQuiz: (mode: QuizMode) => void;
  answerQuestion: (questionId: string, value: StanceValue) => void;
  goNext: () => void;
  goPrev: () => void;
  skip: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  mode: "short",
  activeQuestions: shortQuestions,
  currentIndex: 0,
  answers: {},

  startQuiz: (mode) =>
    set({
      mode,
      activeQuestions: mode === "short" ? shortQuestions : questions,
      currentIndex: 0,
      answers: {},
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

  reset: () =>
    set({
      currentIndex: 0,
      answers: {},
    }),
}));
