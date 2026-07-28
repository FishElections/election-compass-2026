"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, RotateCcw, SkipForward } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useQuizHydration } from "@/hooks/useQuizHydration";
import { getLikertOptions } from "@/data/likert";
import { QuizMode, StanceValue } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CompassMark } from "@/components/CompassMark";
import { CategoryBadge } from "@/components/quiz/CategoryBadge";
import { LikertButton } from "@/components/quiz/LikertButton";
import { QuestionMoreInfo } from "@/components/quiz/QuestionMoreInfo";
import { TopicPriorityStep } from "@/components/quiz/TopicPriorityStep";
import { trackEvent } from "@/lib/analytics";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { localizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

// How long the chosen option stays highlighted (✓ + pulse) before advancing,
// and how long the "calculating" screen shows before the results page.
const CONFIRM_MS = 340;
const CALC_MS = 900;

// Subtle tap confirmation on supporting devices (Android/Chrome); iOS Safari
// has no Vibration API, so this is a no-op there.
function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(10);
    } catch {
      /* ignore */
    }
  }
}

export function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dict, locale, dir } = useDictionary();
  const t = dict.quiz;
  const likertOptions = getLikertOptions(locale);
  const reduce = useReducedMotion();
  const mode: QuizMode = searchParams.get("mode") === "long" ? "long" : "short";
  const [showPriorityStep, setShowPriorityStep] = useState(false);
  // The option just tapped, shown highlighted during the confirmation window.
  const [pending, setPending] = useState<StanceValue | null>(null);
  // 1 when moving forward, -1 when going back — drives the slide-in direction.
  const [navDir, setNavDir] = useState<1 | -1>(1);
  // True while the "calculating your match" screen shows before /results.
  const [finishing, setFinishing] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    mode: storedMode,
    activeQuestions,
    currentIndex,
    answers,
    categoryWeights,
    resumable,
    startQuiz,
    resumeOrStart,
    dismissResume,
    answerQuestion,
    goNext,
    goPrev,
    skip,
    resetCategoryWeights,
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

  // Never leave a pending advance timer running after unmount.
  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  if (!hasHydrated) return null;
  if (activeQuestions.length === 0) return null;

  const currentQuestion = activeQuestions[currentIndex];
  const total = activeQuestions.length;
  const isLast = currentIndex === total - 1;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  const answeredCount = Object.keys(answers).length;
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const locked = pending !== null || finishing;

  function goToResults() {
    setFinishing(true);
    advanceTimer.current = setTimeout(
      () => router.push(localizedPath("/results", locale)),
      reduce ? 0 : CALC_MS
    );
  }

  function finishQuiz() {
    if (mode === "long") {
      setShowPriorityStep(true);
    } else {
      goToResults();
    }
  }

  function handleAnswer(value: StanceValue) {
    if (!currentQuestion || locked) return;
    answerQuestion(currentQuestion.id, value); // record now; advance after a beat
    setPending(value);
    haptic();
    advanceTimer.current = setTimeout(
      () => {
        setPending(null);
        setNavDir(1);
        if (isLast) finishQuiz();
        else goNext();
      },
      reduce ? 120 : CONFIRM_MS
    );
  }

  function handleSkip() {
    if (locked) return;
    setNavDir(1);
    if (isLast) finishQuiz();
    else skip();
  }

  function handlePrev() {
    if (locked || currentIndex === 0) return;
    setNavDir(-1);
    goPrev();
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (locked) return;
    const threshold = 70;
    const off = info.offset.x;
    if (Math.abs(off) < threshold) return;
    // Forward = flick the card against the reading direction (LTR: swipe left,
    // RTL: swipe right). Forward without answering = skip; the other way = back.
    const forward = dir === "rtl" ? off > 0 : off < 0;
    if (forward) handleSkip();
    else handlePrev();
  }

  function handlePriorityContinue() {
    const weightedCount = Object.keys(categoryWeights).length;
    trackEvent("topic_priority_step", { skipped: false, weightedCount, mode });
    goToResults();
  }

  function handlePrioritySkip() {
    resetCategoryWeights();
    trackEvent("topic_priority_step", { skipped: true, weightedCount: 0, mode });
    goToResults();
  }

  if (finishing) {
    return (
      <main className="flex-1">
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-5 px-4 text-center">
          <CompassMark animate className="h-14 w-14 text-sapphire" />
          <p className="font-display text-xl font-normal text-navy">
            {t.calculating}
          </p>
        </div>
      </main>
    );
  }

  if (resumable && storedMode === mode) {
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

  if (!currentQuestion) return null;

  const enterX = reduce ? 0 : navDir * (dir === "rtl" ? -24 : 24);

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

        {/* Outer layer owns layout + swipe; inner keyed layer slides each
            question in from the direction of travel. */}
        <motion.div
          drag={locked ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragDirectionLock
          onDragEnd={handleDragEnd}
          className="flex min-h-0 flex-1 touch-pan-y flex-col justify-center py-3 lg:block lg:py-0"
        >
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: enterX, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="mb-3 lg:mb-5">
              <CategoryBadge category={currentQuestion.category} />
            </div>
            <h1 className="font-display mb-4 text-[clamp(1.15rem,5.2vw,1.6rem)] font-normal leading-snug text-navy lg:mb-8 lg:text-3xl">
              {currentQuestion.text}
            </h1>

            <div
              className={cn(
                "flex flex-col gap-2 lg:gap-3",
                locked && "pointer-events-none"
              )}
            >
              {likertOptions.map((option) => (
                <LikertButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={selectedValue === option.value}
                  confirmed={pending === option.value}
                  onClick={() => handleAnswer(option.value)}
                />
              ))}
            </div>

            <QuestionMoreInfo
              questionId={currentQuestion.id}
              moreInfo={currentQuestion.moreInfo}
            />
          </motion.div>
        </motion.div>

        <div className="flex shrink-0 items-center justify-between border-t border-gray pt-1.5 lg:mt-10 lg:pt-6">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0 || locked}
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {t.previousQuestion}
          </Button>
          <Button variant="ghost" onClick={handleSkip} disabled={locked}>
            {t.skipQuestion}
            <SkipForward className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </main>
  );
}
