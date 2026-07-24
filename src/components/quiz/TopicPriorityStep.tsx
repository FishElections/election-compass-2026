"use client";

import { motion } from "framer-motion";
import { SkipForward, Sparkles } from "lucide-react";
import { categories } from "@/data/questions";
import { useQuizStore } from "@/store/quizStore";
import { CategoryId, TopicWeight } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const weightOptions: { value: TopicWeight; label: string }[] = [
  { value: 1, label: "רגיל" },
  { value: 1.5, label: "חשוב לי" },
  { value: 2, label: "הכי קריטי לי" },
];

interface TopicPriorityStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function TopicPriorityStep({
  onContinue,
  onSkip,
}: TopicPriorityStepProps) {
  const { categoryWeights, setCategoryWeight } = useQuizStore();

  function currentWeight(category: CategoryId): TopicWeight {
    return categoryWeights[category] ?? 1;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sapphire">
            <Sparkles className="h-4 w-4" />
            <span>שלב אחרון, לגמרי אופציונלי</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
            יש נושאים שחשובים לכם יותר מאחרים?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-dark">
            סמנו נושאים שחשובים לכם במיוחד, ואנחנו נשקלל את זה בחישוב
            ההתאמה. אפשר גם פשוט לדלג ולקבל תוצאה רגילה, ללא שקלול.
          </p>
        </div>
        <Button variant="ghost" onClick={onSkip} className="shrink-0">
          דלג
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const weight = currentWeight(category.id);
          return (
            <div
              key={category.id}
              className="flex flex-col gap-3 rounded-xl border-2 border-gray/80 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex items-center gap-2 text-base font-semibold text-navy">
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </span>
              <div className="flex gap-2">
                {weightOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCategoryWeight(category.id, option.value)}
                    className={cn(
                      "rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                      weight === option.value
                        ? option.value === 2
                          ? "border-amber bg-amber text-white"
                          : option.value === 1.5
                            ? "border-sapphire bg-sapphire text-white"
                            : "border-gray bg-gray-light text-navy"
                        : "border-gray bg-white text-navy hover:border-sapphire"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={onContinue}>
          המשך לתוצאות
        </Button>
      </div>
    </motion.div>
  );
}
