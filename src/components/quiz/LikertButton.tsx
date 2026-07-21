import { StanceValue } from "@/types";
import { cn } from "@/lib/utils";

const valueStyles: Record<StanceValue, string> = {
  2: "hover:border-success hover:bg-success-light",
  1: "hover:border-success hover:bg-success-light/60",
  0: "hover:border-gray-dark hover:bg-gray-light",
  [-1]: "hover:border-danger hover:bg-danger-light/60",
  [-2]: "hover:border-danger hover:bg-danger-light",
};

const selectedStyles: Record<StanceValue, string> = {
  2: "border-success bg-success-light text-success",
  1: "border-success bg-success-light/60 text-success",
  0: "border-gray-dark bg-gray-light text-foreground",
  [-1]: "border-danger bg-danger-light/60 text-danger",
  [-2]: "border-danger bg-danger-light text-danger",
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
        "w-full rounded-xl border-2 border-gray bg-white px-5 py-4 text-right text-base font-semibold text-foreground transition-all duration-150 cursor-pointer",
        selected ? selectedStyles[value] : valueStyles[value]
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
