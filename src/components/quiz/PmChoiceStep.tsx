"use client";

import { motion } from "framer-motion";
import { SkipForward, UserRound } from "lucide-react";
import { parties } from "@/data/parties";
import { Button } from "@/components/ui/button";

interface PmChoiceStepProps {
  onChoose: (partyId: string | "none") => void;
  onSkip: () => void;
}

/**
 * שאלת בונוס שאינה משפיעה על חישוב ההתאמה: מדד "הלב" לעומת מדד העמדות.
 * התוצאה מוצגת בעמוד התוצאות כהשוואה בין השניים.
 */
export function PmChoiceStep({ onChoose, onSkip }: PmChoiceStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-sapphire">
            <UserRound className="h-4 w-4" />
            <span>שאלת בונוס, מחוץ לחישוב ההתאמה</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
            מי לדעתך המתאים ביותר לכהן כראש הממשלה?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-dark">
            הבחירה לא משפיעה על התוצאה — אבל בעמוד התוצאות נראה לך אם הלב
            והעמדות שלך מצביעים לאותו כיוון.
          </p>
        </div>
        <Button variant="ghost" onClick={onSkip} className="shrink-0">
          דלג
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {parties.map((party) => (
          <button
            key={party.id}
            type="button"
            onClick={() => onChoose(party.id)}
            className="flex items-center gap-3 rounded-xl border-2 border-gray/80 bg-white p-4 text-right transition-colors cursor-pointer hover:border-sapphire"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: party.color }}
            >
              {party.logo}
            </span>
            <span>
              <span className="block font-semibold text-navy">
                {party.leader}
              </span>
              <span className="block text-sm text-gray-dark">{party.name}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={() => onChoose("none")}>
          אף אחד מהם / אין לי דעה
        </Button>
      </div>
    </motion.div>
  );
}
