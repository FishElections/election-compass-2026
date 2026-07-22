import { motion } from "framer-motion";
import { StanceValue } from "@/types";
import { cn } from "@/lib/utils";

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
   presence than the middle of the scale, like a real survey dial. */
const intensityPadding: Record<StanceValue, string> = {
  2: "py-5",
  1: "py-4",
  0: "py-3.5",
  [-1]: "py-4",
  [-2]: "py-5",
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
}

export function LikertButton({ value, label, selected, onClick }: LikertButtonProps) {
  const dots = intensityDots[value];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative flex w-full items-center justify-between overflow-hidden rounded-xl border-2 border-gray/80 bg-white px-5 text-right text-base font-semibold text-foreground cursor-pointer",
        intensityPadding[value],
        selected ? selectedStyles[value] : cn("border-gray/80", hoverStyles[value])
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "absolute inset-y-0 right-0 w-1.5 rounded-s-full transition-opacity",
          accentBar[value],
          selected ? "opacity-100" : "opacity-0"
        )}
      />
      <span>{label}</span>
      {dots > 0 && (
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
      )}
    </motion.button>
  );
}
