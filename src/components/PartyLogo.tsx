import { Party } from "@/types";
import { cn } from "@/lib/utils";

interface PartyLogoProps {
  party: Party;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 w-9 text-sm",
  md: "h-14 w-14 text-xl",
  lg: "h-20 w-20 text-3xl",
};

export function PartyLogo({ party, size = "md", className }: PartyLogoProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-extrabold text-white shadow-sm ring-2 ring-white",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: party.color }}
      aria-hidden
    >
      {party.logo}
    </div>
  );
}
