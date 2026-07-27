"use client";

import { motion } from "framer-motion";
import { SkipForward, Sparkles } from "lucide-react";
import { getCategories } from "@/data/questions";
import { useQuizStore } from "@/store/quizStore";
import { CategoryId, TopicWeight } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";

const weightActiveClasses: Record<TopicWeight, string> = {
  0: "border-danger bg-danger text-white",
  0.5: "border-coral bg-coral text-white",
  1: "border-gray bg-gray-light text-navy",
  1.5: "border-sapphire bg-sapphire text-white",
  2: "border-amber bg-amber text-white",
};

interface TopicPriorityStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

export function TopicPriorityStep({
  onContinue,
  onSkip,
}: TopicPriorityStepProps) {
  const { categoryWeights, setCategoryWeight } = useQuizStore();
  const { dict, locale } = useDictionary();
  const t = dict.quiz.priorityStep;
  const categories = getCategories(locale);

  const weightOptions: { value: TopicWeight; label: string; activeClass: string }[] = [
    { value: 0, label: t.weights.none, activeClass: weightActiveClasses[0] },
    { value: 0.5, label: t.weights.notImportant, activeClass: weightActiveClasses[0.5] },
    { value: 1, label: t.weights.normal, activeClass: weightActiveClasses[1] },
    { value: 1.5, label: t.weights.important, activeClass: weightActiveClasses[1.5] },
    { value: 2, label: t.weights.critical, activeClass: weightActiveClasses[2] },
  ];

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
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
            {t.heading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-dark">
            {t.description}
          </p>
        </div>
        <Button variant="ghost" onClick={onSkip} className="shrink-0">
          {t.skip}
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
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                {weightOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCategoryWeight(category.id, option.value)}
                    className={cn(
                      "rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer active:scale-[0.97]",
                      weight === option.value
                        ? option.activeClass
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
          {t.continue}
        </Button>
      </div>
    </motion.div>
  );
}
