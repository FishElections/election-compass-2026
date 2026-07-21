"use client";

import { motion } from "framer-motion";
import { Lightbulb, Scale, Shield } from "lucide-react";
import { quickStanceLabels } from "@/data/quickStanceLabels";
import { getArgumentByTopic } from "@/utils/challenge";
import { OpennessReaction, StanceSide } from "@/types";
import { Progress } from "@/components/ui/progress";

interface ChallengeCardProps {
  topicId: string;
  userSide: StanceSide;
  sourceLabel: string | null;
  index: number;
  total: number;
  onReact: (reaction: OpennessReaction) => void;
}

const reactionOptions: {
  reaction: OpennessReaction;
  icon: typeof Lightbulb;
  label: string;
}[] = [
  {
    reaction: 1,
    icon: Lightbulb,
    label: "נקודה למחשבה / מעורר ספק בריא",
  },
  {
    reaction: 0.5,
    icon: Scale,
    label: "מכיר את הטיעון, אך מעדיף את השיקול שלי",
  },
  {
    reaction: 0,
    icon: Shield,
    label: "טיעון לא משכנע / נשאר איתן בעמדתי",
  },
];

export function ChallengeCard({
  topicId,
  userSide,
  sourceLabel,
  index,
  total,
  onReact,
}: ChallengeCardProps) {
  const argument = getArgumentByTopic(topicId);
  const labels = quickStanceLabels[topicId];
  if (!argument || !labels) return null;

  const oppositeSide: StanceSide = userSide === "pro" ? "con" : "pro";
  const userPositionLabel =
    userSide === "pro" ? labels.proLabel : labels.conLabel;
  const oppositeTitle =
    oppositeSide === "pro"
      ? argument.proPositionTitle
      : argument.conPositionTitle;
  const oppositeArgument =
    oppositeSide === "pro"
      ? argument.proPositionArgument
      : argument.conPositionArgument;

  return (
    <div>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-dark">
          <span>
            כרטיס {index + 1} מתוך {total}
          </span>
          <span>{labels.topic}</span>
        </div>
        <Progress value={((index + 1) / total) * 100} />
      </div>

      <motion.div
        key={topicId}
        initial={{ opacity: 0, rotateX: -8, y: 16 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformPerspective: 800 }}
        className="rounded-2xl border border-gray bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-5 rounded-xl bg-navy/5 px-4 py-3 text-sm">
          <span className="font-semibold text-navy">
            {sourceLabel ? `העמדה של ${sourceLabel}: ` : "העמדה שלך: "}
          </span>
          <span className="text-foreground">{userPositionLabel}</span>
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-dark">
          טיעון המחנה הנגדי
        </p>
        <h2 className="mb-3 text-lg font-bold text-navy sm:text-xl">
          {oppositeTitle}
        </h2>
        <p className="leading-relaxed text-foreground">{oppositeArgument}</p>

        <p className="mt-8 mb-3 text-sm font-semibold text-navy">
          איך הטיעון הזה מרגיש לך?
        </p>
        <div className="flex flex-col gap-2">
          {reactionOptions.map((option) => (
            <button
              key={option.reaction}
              type="button"
              onClick={() => onReact(option.reaction)}
              className="flex items-center gap-3 rounded-xl border-2 border-gray px-4 py-3 text-right text-sm font-medium text-foreground transition-colors hover:border-navy hover:bg-gray-light cursor-pointer"
            >
              <option.icon className="h-5 w-5 shrink-0 text-navy" />
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
