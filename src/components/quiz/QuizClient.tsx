"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, SkipForward } from "lucide-react";
import { getActiveQuestions, useQuizHydrated, useQuizStore } from "@/store/quizStore";
import { likertOptions } from "@/data/likert";
import { CategoryId, QuizMode, StanceValue } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/quiz/CategoryBadge";
import { LikertButton } from "@/components/quiz/LikertButton";
import { QuestionMoreInfo } from "@/components/quiz/QuestionMoreInfo";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { TopicPriorityStep } from "@/components/quiz/TopicPriorityStep";
import { PmChoiceStep } from "@/components/quiz/PmChoiceStep";
import { trackEvent } from "@/lib/analytics";

type QuizPhase = "intro" | "questions" | "priority" | "pm";

export function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode: QuizMode = searchParams.get("mode") === "long" ? "long" : "short";
  const hydrated = useQuizHydrated();
  const [phase, setPhase] = useState<QuizPhase>("intro");

  const {
    mode: storedMode,
    currentIndex,
    answers,
    categoryWeights,
    categoryOrder,
    startQuiz,
    answerQuestion,
    goPrev,
    skip,
    setCategoryWeight,
    resetCategoryWeights,
    setPmChoice,
  } = useQuizStore();

  const activeQuestions = useMemo(
    () => getActiveQuestions(mode, storedMode === mode ? categoryOrder : []),
    [mode, storedMode, categoryOrder]
  );

  // הצעת ברירת מחדל לשלב השקלול: הנושא שהמשתמש בחר ראשון מסומן "חשוב לי".
  const prioritySuggestion = useRef<CategoryId | null>(null);

  if (!hydrated) return null;

  const answeredCount = Object.values(answers).filter(
    (v) => v !== undefined
  ).length;
  const resumeAvailable = storedMode === mode && answeredCount > 0;

  const currentQuestion = activeQuestions[currentIndex];
  const total = activeQuestions.length;
  const isLast = currentIndex === total - 1;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  function handleStart(order: CategoryId[]) {
    startQuiz(mode, order);
    setPhase("questions");
    trackEvent("quiz_start", { mode, ordered_topics: order.length });
    if (order.length > 0) {
      trackEvent("category_order", { mode, order: order.join(",") });
    }
  }

  function handleResume() {
    setPhase("questions");
    trackEvent("quiz_resume", { mode, answered: answeredCount });
  }

  function finishQuestions() {
    if (mode === "long") {
      const { categoryWeights: weights, categoryOrder: order } =
        useQuizStore.getState();
      if (Object.keys(weights).length === 0 && order.length > 0) {
        prioritySuggestion.current = order[0];
        setCategoryWeight(order[0], 1.5);
      }
      setPhase("priority");
    } else {
      setPhase("pm");
    }
  }

  function handleAnswer(value: StanceValue) {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, value);
    if (isLast) {
      finishQuestions();
    }
  }

  function handleSkip() {
    if (isLast) {
      finishQuestions();
    } else {
      skip();
    }
  }

  function handlePriorityContinue() {
    const weightedCount = Object.keys(
      useQuizStore.getState().categoryWeights
    ).length;
    trackEvent("topic_priority_step", { skipped: false, weightedCount });
    setPhase("pm");
  }

  function handlePrioritySkip() {
    resetCategoryWeights();
    trackEvent("topic_priority_step", { skipped: true, weightedCount: 0 });
    setPhase("pm");
  }

  function handlePmChoice(partyId: string | "none") {
    setPmChoice(partyId);
    trackEvent("pm_choice", { party: partyId });
    router.push("/results");
  }

  function handlePmSkip() {
    setPmChoice(null);
    trackEvent("pm_choice", { party: "skipped" });
    router.push("/results");
  }

  if (phase === "intro") {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-20 sm:py-16">
          <QuizIntro
            mode={mode}
            resumeAtQuestion={resumeAvailable ? currentIndex + 1 : null}
            onStart={handleStart}
            onResume={handleResume}
          />
        </div>
      </main>
    );
  }

  if (phase === "priority") {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-20 sm:py-16">
          <TopicPriorityStep
            suggestedCategory={prioritySuggestion.current}
            onContinue={handlePriorityContinue}
            onSkip={handlePrioritySkip}
          />
        </div>
      </main>
    );
  }

  if (phase === "pm") {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-20 sm:py-16">
          <PmChoiceStep onChoose={handlePmChoice} onSkip={handlePmSkip} />
        </div>
      </main>
    );
  }

  if (!currentQuestion) return null;

  return (
    <main className="flex-1">
      <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-20 sm:py-16">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-dark">
            <span>
              שאלה {currentIndex + 1} מתוך {total}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="relative py-1.5">
            <Progress value={progressPercent} />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-ambient ring-2 ring-sapphire transition-[right] duration-500 ease-out"
              style={{ right: `${progressPercent}%` }}
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sapphire/50" />
            </span>
          </div>
        </div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mb-5">
            <CategoryBadge category={currentQuestion.category} />
          </div>
          <h1 className="font-display mb-8 text-2xl font-normal leading-snug text-navy sm:text-3xl">
            {currentQuestion.text}
          </h1>

          <div className="flex flex-col gap-3">
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

        <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between border-t border-gray bg-background/90 px-4 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-6 sm:backdrop-blur-none">
          <Button
            variant="ghost"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <ChevronRight className="h-4 w-4" />
            שאלה קודמת
          </Button>
          <Button variant="ghost" onClick={handleSkip}>
            דלג על שאלה
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
