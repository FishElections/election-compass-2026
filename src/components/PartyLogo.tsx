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
  if (party.logoImageUrl) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl border border-gray bg-white p-1 shadow-sm",
          sizeClasses[size],
          className
        )}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- small static asset from public/, next/image's overhead isn't worth it here */}
        <img
          src={party.logoImageUrl}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

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
