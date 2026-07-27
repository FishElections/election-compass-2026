import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  /** false until the persisted state has been read back on the client. */
  hasHydrated: boolean;
  /** true when rehydration found a quiz in progress worth offering to resume. */
  resumable: boolean;
  startQuiz: (mode: QuizMode) => void;
  resumeOrStart: (mode: QuizMode) => void;
  dismissResume: () => void;
  answerQuestion: (questionId: string, value: StanceValue) => void;
  goNext: () => void;
  goPrev: () => void;
  skip: () => void;
  setCategoryWeight: (category: CategoryId, weight: TopicWeight) => void;
  resetCategoryWeights: () => void;
  reset: () => void;
}

function questionsForMode(mode: QuizMode): Question[] {
  return mode === "short" ? shortQuestions : questions;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      mode: "short",
      activeQuestions: shortQuestions,
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
      hasHydrated: false,
      resumable: false,

      startQuiz: (mode) =>
        set({
          mode,
          activeQuestions: questionsForMode(mode),
          currentIndex: 0,
          answers: {},
          categoryWeights: {},
          resumable: false,
        }),

      dismissResume: () => set({ resumable: false }),

      // Entering /quiz should not wipe a quiz already in progress — that is the
      // whole point of persisting. Only rebuild from scratch when the track
      // changed or nothing was answered yet.
      resumeOrStart: (mode) => {
        const state = get();
        const sameMode = state.mode === mode;
        const hasProgress = Object.keys(state.answers).length > 0;
        if (sameMode && hasProgress) {
          set({ activeQuestions: questionsForMode(mode) });
          return;
        }
        get().startQuiz(mode);
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
    }),
    {
      // Phones evict backgrounded tabs aggressively — a WhatsApp detour used to
      // throw away all 58 answers. Progress lives in localStorage so a reload,
      // a phone call or an app switch resumes where the user left off.
      name: "quiz-progress-v2",
      storage: createJSONStorage(() => localStorage),
      // Hydrating during render would mismatch the server HTML (which has no
      // localStorage); QuizClient rehydrates in an effect instead.
      skipHydration: true,
      // activeQuestions is derived from `mode`, so it never goes to storage —
      // persisting the whole question bank would bloat it for no reason.
      partialize: (state) => ({
        mode: state.mode,
        currentIndex: state.currentIndex,
        answers: state.answers,
        categoryWeights: state.categoryWeights,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const active = questionsForMode(state.mode);
        // A deploy may have removed or renamed questions since the answers were
        // saved. Drop ids that no longer exist so the calculator never scores
        // against a question that isn't in the run.
        const validIds = new Set(active.map((q) => q.id));
        const answers: UserAnswers = {};
        for (const [id, value] of Object.entries(state.answers)) {
          if (validIds.has(id)) answers[id] = value;
        }
        state.activeQuestions = active;
        state.answers = answers;
        state.currentIndex = Math.min(
          Math.max(state.currentIndex, 0),
          Math.max(active.length - 1, 0)
        );
        state.hasHydrated = true;
        // Offer to resume rather than either silently dropping the user mid-quiz
        // or silently wiping their answers.
        state.resumable = Object.keys(answers).length > 0;
      },
    }
  )
);
