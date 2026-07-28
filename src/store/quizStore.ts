import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getQuestions, getShortQuestions } from "@/data/questions";
import { Locale, defaultLocale } from "@/i18n/config";
import { partySectors } from "@/data/filters/core";
import {
  CategoryId,
  CategoryWeights,
  PartySector,
  Question,
  QuizFilters,
  QuizMode,
  StanceValue,
  TopicWeight,
  UserAnswers,
  emptyFilters,
} from "@/types";

interface QuizState {
  mode: QuizMode;
  activeQuestions: Question[];
  currentIndex: number;
  answers: UserAnswers;
  categoryWeights: CategoryWeights;
  filters: QuizFilters;
  /** false until the persisted state has been read back on the client. */
  hasHydrated: boolean;
  /** true when rehydration found a quiz in progress worth offering to resume. */
  resumable: boolean;
  startQuiz: (mode: QuizMode, locale: Locale) => void;
  resumeOrStart: (mode: QuizMode, locale: Locale) => void;
  dismissResume: () => void;
  /** Re-fetches activeQuestions' text in a new locale by id, without touching
   *  currentIndex/answers. Used both for a mid-quiz language switch and to
   *  correct rehydrated text (rebuilt in the default locale) to the active one. */
  retext: (locale: Locale) => void;
  answerQuestion: (questionId: string, value: StanceValue) => void;
  goNext: () => void;
  goPrev: () => void;
  skip: () => void;
  setCategoryWeight: (category: CategoryId, weight: TopicWeight) => void;
  resetCategoryWeights: () => void;
  toggleExcludedSector: (sector: PartySector) => void;
  setFilter: <K extends keyof QuizFilters>(key: K, value: QuizFilters[K]) => void;
  resetFilters: () => void;
  reset: () => void;
}

function questionsForMode(mode: QuizMode, locale: Locale): Question[] {
  return mode === "short" ? getShortQuestions(locale) : getQuestions(locale);
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      mode: "short",
      activeQuestions: getShortQuestions(defaultLocale),
      currentIndex: 0,
      answers: {},
      categoryWeights: {},
      filters: emptyFilters,
      hasHydrated: false,
      resumable: false,

      startQuiz: (mode, locale) =>
        set({
          mode,
          activeQuestions: questionsForMode(mode, locale),
          currentIndex: 0,
          answers: {},
          categoryWeights: {},
          filters: emptyFilters,
          resumable: false,
        }),

      dismissResume: () => set({ resumable: false }),

      // Entering /quiz should not wipe a quiz already in progress — that is the
      // whole point of persisting. Only rebuild from scratch when the track
      // changed or nothing was answered yet.
      resumeOrStart: (mode, locale) => {
        const state = get();
        const sameMode = state.mode === mode;
        const hasProgress = Object.keys(state.answers).length > 0;
        if (sameMode && hasProgress) {
          set({ activeQuestions: questionsForMode(mode, locale) });
          return;
        }
        get().startQuiz(mode, locale);
      },

      retext: (locale) => {
        const { mode, activeQuestions } = get();
        const freshById = new Map(
          questionsForMode(mode, locale).map((q) => [q.id, q])
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

      toggleExcludedSector: (sector) =>
        set((state) => {
          const current = state.filters.excludedSectors;
          const next = current.includes(sector)
            ? current.filter((s) => s !== sector)
            : [...current, sector];
          return { filters: { ...state.filters, excludedSectors: next } };
        }),

      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),

      resetFilters: () => set({ filters: emptyFilters }),

      reset: () =>
        set({
          currentIndex: 0,
          answers: {},
          categoryWeights: {},
          // תשובות הסינון הן הנתון הרגיש ביותר שנשמר - הן נמחקות יחד עם
          // התשובות ולא שורדות "התחלה מחדש".
          filters: emptyFilters,
        }),
    }),
    {
      // Phones evict backgrounded tabs aggressively — a WhatsApp detour used to
      // throw away all 58 answers. Progress lives in localStorage so a reload,
      // a phone call or an app switch resumes where the user left off.
      name: "quiz-progress-v2",
      storage: createJSONStorage(() => localStorage),
      // Hydrating during render would mismatch the server HTML (which has no
      // localStorage); useQuizHydration rehydrates in an effect instead.
      skipHydration: true,
      // activeQuestions is derived from `mode`, so it never goes to storage —
      // persisting the whole question bank would bloat it and freeze the text
      // in one locale.
      partialize: (state) => ({
        mode: state.mode,
        currentIndex: state.currentIndex,
        answers: state.answers,
        categoryWeights: state.categoryWeights,
        filters: state.filters,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // Rebuild the derived question list. Text is built in the default
        // locale here (this callback has no access to the request locale);
        // useQuizHydration calls retext(currentLocale) right after to swap the
        // text to the active locale by id, leaving answers/currentIndex intact.
        const active = questionsForMode(state.mode, defaultLocale);
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
        // מצב שנשמר לפני שהמסננים קיימו כלל אין בו filters, ומיזוג ה-persist
        // שטחי - ולכן צריך למלא ידנית. בנוסף, בדיוק כמו עם מזהי שאלות
        // שנמחקו בין דיפלויים, מסננים על מגזר שכבר לא קיים נזרקים כדי
        // שהמחשבון לא יסנן לפי מזהה שאיננו.
        const knownSectors = new Set<string>(partySectors);
        state.filters = {
          ...emptyFilters,
          ...state.filters,
          excludedSectors: (state.filters?.excludedSectors ?? []).filter((s) =>
            knownSectors.has(s)
          ),
        };
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
