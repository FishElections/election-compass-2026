"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, ListOrdered, Play, RotateCcw } from "lucide-react";
import { categories } from "@/data/questions";
import { getActiveQuestions } from "@/store/quizStore";
import { CategoryId, QuizMode } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECONDS_PER_QUESTION = 8;

interface QuizIntroProps {
  mode: QuizMode;
  /** מספר השאלה שניתן להמשיך ממנה (1-based), או null כשאין התקדמות שמורה */
  resumeAtQuestion: number | null;
  onStart: (categoryOrder: CategoryId[]) => void;
  onResume: () => void;
}

export function QuizIntro({
  mode,
  resumeAtQuestion,
  onStart,
  onResume,
}: QuizIntroProps) {
  const [order, setOrder] = useState<CategoryId[]>([]);
  const [freshStart, setFreshStart] = useState(false);

  const questionsForMode = useMemo(() => getActiveQuestions(mode, []), [mode]);
  const countByCategory = useMemo(() => {
    const counts = new Map<CategoryId, number>();
    for (const question of questionsForMode) {
      counts.set(question.category, (counts.get(question.category) ?? 0) + 1);
    }
    return counts;
  }, [questionsForMode]);

  const total = questionsForMode.length;
  const minutes = Math.max(
    2,
    Math.round((total * SECONDS_PER_QUESTION) / 60)
  );

  const showResume = resumeAtQuestion !== null && !freshStart;

  function toggleCategory(id: CategoryId) {
    setOrder((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <h1 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
        {mode === "short" ? "המסלול המהיר" : "המסלול המקיף"}: מה מחכה לך?
      </h1>
      <p className="mt-3 flex items-center gap-2 text-sm text-gray-dark">
        <Clock className="h-4 w-4 shrink-0" />
        <span>
          {total} שאלות ב-{categories.length} נושאים · כ-{minutes} דקות ·
          אפשר לדלג על כל שאלה
        </span>
      </p>

      {showResume ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-sapphire/30 bg-sapphire/5 p-6 text-center">
          <p className="font-bold text-navy">
            יש לך שאלון באמצע — עצרת בשאלה {resumeAtQuestion} מתוך {total}.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" onClick={onResume}>
              המשך מאיפה שעצרתי
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setFreshStart(true)}
            >
              <RotateCcw className="h-4 w-4" />
              התחלה מחדש
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-gray-light/60 p-3 text-sm text-gray-dark">
            <ListOrdered className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              רוצים להתחיל מהנושא שהכי חשוב לכם? הקישו על הנושאים לפי הסדר
              המועדף. לא חובה — אפשר פשוט להתחיל.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {categories.map((category) => {
              const position = order.indexOf(category.id);
              const selected = position !== -1;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border-2 bg-white p-4 text-right transition-colors cursor-pointer",
                    selected
                      ? "border-sapphire"
                      : "border-gray/80 hover:border-sapphire/50"
                  )}
                >
                  <span className="flex items-center gap-2 text-base font-semibold text-navy">
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-sm text-gray-dark">
                      {countByCategory.get(category.id) ?? 0} שאלות
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition-colors",
                        selected
                          ? "bg-sapphire text-white"
                          : "bg-gray-light text-gray-dark"
                      )}
                    >
                      {selected ? position + 1 : "·"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {order.length > 0 && (
              <Button variant="ghost" onClick={() => setOrder([])}>
                <RotateCcw className="h-4 w-4" />
                אפס סדר
              </Button>
            )}
            <Button size="lg" onClick={() => onStart(order)}>
              <Play className="h-4 w-4" />
              מתחילים
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
