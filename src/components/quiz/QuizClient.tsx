"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, RotateCcw, SkipForward } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useQuizHydration } from "@/hooks/useQuizHydration";
import { getLikertOptions } from "@/data/likert";
import { QuizMode, StanceValue } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/quiz/CategoryBadge";
import { LikertButton } from "@/components/quiz/LikertButton";
import { QuestionMoreInfo } from "@/components/quiz/QuestionMoreInfo";
import { TopicPriorityStep } from "@/components/quiz/TopicPriorityStep";
import { FilterStep } from "@/components/quiz/FilterStep";
import { trackEvent } from "@/lib/analytics";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { localizedPath } from "@/i18n/config";

export function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dict, locale } = useDictionary();
  const t = dict.quiz;
  const likertOptions = getLikertOptions(locale);
  const mode: QuizMode = searchParams.get("mode") === "long" ? "long" : "short";
  const [showPriorityStep, setShowPriorityStep] = useState(false);
  // ?step=filters נפתח ישירות על שלב המסננים, בלי לגעת בתשובות. זה מה
  // שכפתור "ערכו" במסך התוצאות מקשר אליו.
  const editingFilters = searchParams.get("step") === "filters";
  const [showFilterStep, setShowFilterStep] = useState(editingFilters);

  const {
    mode: storedMode,
    activeQuestions,
    currentIndex,
    answers,
    categoryWeights,
    filters,
    resumable,
    startQuiz,
    resumeOrStart,
    dismissResume,
    answerQuestion,
    goPrev,
    skip,
    resetCategoryWeights,
    resetFilters,
  } = useQuizStore();

  const hasHydrated = useQuizHydration(locale);

  const initializedMode = useRef<QuizMode | null>(null);
  useEffect(() => {
    if (!hasHydrated) return;
    // Guard on mode only: a mid-quiz language switch re-runs this effect (locale
    // is a dep) but must NOT restart the quiz. retext (in useQuizHydration)
    // handles the text; this early-return keeps the answers.
    if (initializedMode.current === mode) return;
    initializedMode.current = mode;

    const state = useQuizStore.getState();
    const hasProgress =
      state.mode === mode && Object.keys(state.answers).length > 0;

    if (hasProgress) {
      resumeOrStart(mode, locale);
    } else {
      startQuiz(mode, locale);
      trackEvent("quiz_start", { mode });
    }
  }, [mode, locale, hasHydrated, startQuiz, resumeOrStart]);

  if (!hasHydrated) return null;
  if (activeQuestions.length === 0) return null;

  const currentQuestion = activeQuestions[currentIndex];
  const total = activeQuestions.length;
  const isLast = currentIndex === total - 1;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  const answeredCount = Object.keys(answers).length;
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  function finishQuiz() {
    // המסלול הארוך מקבל קודם את שקלול הנושאים; שני המסלולים מגיעים לשלב
    // המסננים, שהוא הצמצום האחרון לפני התוצאות.
    if (mode === "long") {
      setShowPriorityStep(true);
    } else {
      setShowFilterStep(true);
    }
  }

  function goToResults() {
    router.push(localizedPath("/results", locale));
  }

  function handleAnswer(value: StanceValue) {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, value);
    if (isLast) {
      finishQuiz();
    }
  }

  function handleSkip() {
    if (isLast) {
      finishQuiz();
    } else {
      skip();
    }
  }

  function handlePriorityContinue() {
    const weightedCount = Object.keys(categoryWeights).length;
    trackEvent("topic_priority_step", { skipped: false, weightedCount, mode });
    setShowPriorityStep(false);
    setShowFilterStep(true);
  }

  function handlePrioritySkip() {
    resetCategoryWeights();
    trackEvent("topic_priority_step", { skipped: true, weightedCount: 0, mode });
    setShowPriorityStep(false);
    setShowFilterStep(true);
  }

  function handleFilterContinue() {
    // מדווחים ספירות בלבד. אילו מגזרים נפסלו הוא הנתון הרגיש ביותר שהאתר
    // אוסף, והוא לא יוצא מהמכשיר. ראו docs/analytics.md.
    trackEvent("quiz_filters", {
      skipped: false,
      sectorCount: filters.excludedSectors.length,
      bloc: filters.blocPreference !== "any",
      size: filters.sizePreference !== "any",
      threshold: filters.hideBelowThreshold,
      mode,
    });
    goToResults();
  }

  function handleFilterSkip() {
    resetFilters();
    trackEvent("quiz_filters", { skipped: true, mode });
    goToResults();
  }

  // כשמגיעים לערוך מסננים מתוך התוצאות, השאלון כבר הושלם - הצעת "להמשיך
  // מאיפה שהפסקת" באמצע היא רק חסימה בדרך.
  if (resumable && storedMode === mode && !editingFilters) {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-normal leading-snug text-navy">
            {t.resume.title}
          </h1>
          <p className="text-gray-dark">
            {t.resume.body
              .replace("{answered}", String(answeredCount))
              .replace("{total}", String(total))}
          </p>
          <div className="flex w-full flex-col gap-3">
            <Button
              size="lg"
              onClick={() => {
                trackEvent("quiz_resume", { mode, answered: answeredCount });
                dismissResume();
              }}
            >
              {t.resume.continue.replace("{question}", String(currentIndex + 1))}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                startQuiz(mode, locale);
                trackEvent("quiz_start", { mode });
              }}
            >
              <RotateCcw className="h-4 w-4" />
              {t.resume.restart}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (showPriorityStep) {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-8 sm:py-16">
          <TopicPriorityStep
            onContinue={handlePriorityContinue}
            onSkip={handlePrioritySkip}
          />
        </div>
      </main>
    );
  }

  if (showFilterStep) {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-8 sm:py-16">
          <FilterStep
            onContinue={handleFilterContinue}
            onSkip={handleFilterSkip}
          />
        </div>
      </main>
    );
  }

  if (!currentQuestion) return null;

  return (
    <main className="flex-1">
      {/* One screen, no scrolling: on a phone the question, all five options and
          the nav have to fit at once — 20 or 58 times in a row. The column is
          exactly the viewport minus the tab bar, and the question block flexes
          into whatever is left over. */}
      <div className="mx-auto flex h-[calc(100dvh-var(--mobile-nav-h))] max-w-2xl flex-col px-4 pb-2 pt-4 lg:h-auto lg:pb-10 lg:pt-16">
        <div className="shrink-0">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-dark sm:text-sm">
            <span>
              {t.questionOfTotal
                .replace("{current}", String(currentIndex + 1))
                .replace("{total}", String(total))}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} />
        </div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex min-h-0 flex-1 flex-col justify-center py-3 lg:block lg:py-0"
        >
          <div className="mb-3 lg:mb-5">
            <CategoryBadge category={currentQuestion.category} />
          </div>
          <h1 className="font-display mb-4 text-[clamp(1.15rem,5.2vw,1.6rem)] font-normal leading-snug text-navy lg:mb-8 lg:text-3xl">
            {currentQuestion.text}
          </h1>

          <div className="flex flex-col gap-2 lg:gap-3">
            {likertOptions.map((option) => (
              <LikertButton
                key={option.value}
                value={option.value}
                label={option.label}
                selected={selectedValue === option.value}
                onClick={() => handleAnswer(option.value)}
              />
            ))}
          </div>

          <QuestionMoreInfo
            questionId={currentQuestion.id}
            moreInfo={currentQuestion.moreInfo}
          />
        </motion.div>

        <div className="flex shrink-0 items-center justify-between border-t border-gray pt-1.5 lg:mt-10 lg:pt-6">
          <Button variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {t.previousQuestion}
          </Button>
          <Button variant="ghost" onClick={handleSkip}>
            {t.skipQuestion}
            <SkipForward className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </main>
  );
}
