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

interface LikertButtonProps {
  value: StanceValue;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function LikertButton({ value, label, selected, onClick }: LikertButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border-2 border-gray/80 bg-white px-5 py-4 text-right text-base font-semibold text-foreground transition-all duration-150 cursor-pointer",
        selected
          ? selectedStyles[value]
          : cn("hover:-translate-y-0.5", hoverStyles[value])
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
      {label}
    </button>
  );
}
