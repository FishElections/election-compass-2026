"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, SkipForward } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { likertOptions } from "@/data/likert";
import { QuizMode, StanceValue } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/quiz/CategoryBadge";
import { LikertButton } from "@/components/quiz/LikertButton";
import { QuestionMoreInfo } from "@/components/quiz/QuestionMoreInfo";

export function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode: QuizMode = searchParams.get("mode") === "long" ? "long" : "short";

  const {
    activeQuestions,
    currentIndex,
    answers,
    startQuiz,
    answerQuestion,
    goPrev,
    skip,
  } = useQuizStore();

  const initializedMode = useRef<QuizMode | null>(null);
  useEffect(() => {
    if (initializedMode.current !== mode) {
      initializedMode.current = mode;
      startQuiz(mode);
    }
  }, [mode, startQuiz]);

  if (activeQuestions.length === 0) return null;

  const currentQuestion = activeQuestions[currentIndex];
  const total = activeQuestions.length;
  const isLast = currentIndex === total - 1;
  const progressPercent = ((currentIndex + 1) / total) * 100;
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  function handleAnswer(value: StanceValue) {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, value);
    if (isLast) {
      router.push("/results");
    }
  }

  function handleSkip() {
    if (isLast) {
      router.push("/results");
    } else {
      skip();
    }
  }

  if (!currentQuestion) return null;

  return (
    <main className="flex-1">
      <div className="mx-auto flex max-w-2xl flex-col px-4 pb-10 pt-20 sm:py-16">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-dark">
            <span>
              שאלה {currentIndex + 1} מתוך {total}
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
