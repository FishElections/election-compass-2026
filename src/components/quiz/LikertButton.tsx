import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { StanceValue } from "@/types";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";

const accentBar: Record<StanceValue, string> = {
  2: "bg-success",
  1: "bg-success",
  0: "bg-sapphire",
  [-1]: "bg-danger",
  [-2]: "bg-danger",
};

const hoverStyles: Record<StanceValue, string> = {
  2: "hover:border-success/60 hover:bg-success-light/40",
  1: "hover:border-success/60 hover:bg-success-light/30",
  0: "hover:border-sapphire/50 hover:bg-sapphire/5",
  [-1]: "hover:border-danger/50 hover:bg-danger-light/30",
  [-2]: "hover:border-danger/60 hover:bg-danger-light/40",
};

const selectedStyles: Record<StanceValue, string> = {
  2: "border-success bg-success-light/50 text-success shadow-ambient",
  1: "border-success bg-success-light/30 text-success shadow-ambient",
  0: "border-sapphire bg-sapphire/5 text-sapphire shadow-ambient",
  [-1]: "border-danger bg-danger-light/30 text-danger shadow-ambient",
  [-2]: "border-danger bg-danger-light/50 text-danger shadow-ambient",
};

/* Extremes read as "louder" opinions, so they get a touch more
   presence than the middle of the scale, like a real survey dial.
   Phones get a uniform compact height instead: the graduated padding cost ~24px
   of a screen that has to hold all five options plus the question at once. */
const intensityPadding: Record<StanceValue, string> = {
  2: "py-3 sm:py-5",
  1: "py-3 sm:py-4",
  0: "py-3 sm:py-3.5",
  [-1]: "py-3 sm:py-4",
  [-2]: "py-3 sm:py-5",
};

const intensityDots: Record<StanceValue, number> = {
  2: 2,
  1: 1,
  0: 0,
  [-1]: 1,
  [-2]: 2,
};

interface LikertButtonProps {
  value: StanceValue;
  label: string;
  selected: boolean;
  onClick: () => void;
  /** True for the option just tapped, during the brief confirmation window —
   *  shows a ✓ and a success pulse before the quiz advances. */
  confirmed?: boolean;
}

export function LikertButton({
  value,
  label,
  selected,
  onClick,
  confirmed = false,
}: LikertButtonProps) {
  const dots = intensityDots[value];
  const { dir } = useDictionary();
  const reduce = useReducedMotion();
  // The hover nudge points toward the reading direction: left in RTL, right in LTR.
  const hoverNudgeX = dir === "rtl" ? -3 : 3;
  const active = selected || confirmed;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduce ? undefined : { x: hoverNudgeX }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      animate={confirmed && !reduce ? { scale: [1, 1.04, 1] } : undefined}
      transition={
        confirmed
          ? { duration: 0.34, ease: "easeOut" }
          : { type: "spring", stiffness: 400, damping: 22 }
      }
      className={cn(
        "relative flex min-h-[52px] w-full items-center justify-between overflow-hidden rounded-xl border-2 border-gray/80 bg-white px-5 text-start text-base font-semibold text-foreground cursor-pointer sm:min-h-0",
        intensityPadding[value],
        active ? selectedStyles[value] : cn("border-gray/80", hoverStyles[value])
      )}
      aria-pressed={active}
    >
      <span
        className={cn(
          "absolute inset-y-0 start-0 w-1.5 rounded-s-full transition-opacity",
          accentBar[value],
          active ? "opacity-100" : "opacity-0"
        )}
      />
      <span>{label}</span>
      {confirmed ? (
        <motion.span
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white",
            accentBar[value]
          )}
          aria-hidden
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </motion.span>
      ) : dots > 0 ? (
        <span className="flex items-center gap-1">
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                selected ? accentBar[value] : "bg-gray"
              )}
            />
          ))}
        </span>
      ) : null}
    </motion.button>
  );
}
