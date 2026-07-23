import { Party } from "@/types";
import { cn } from "@/lib/utils";

interface BallotLetterBadgeProps {
  party: Party;
  className?: string;
}

export function BallotLetterBadge({ party, className }: BallotLetterBadgeProps) {
  const confirmed = party.officialBallotLetter;

  if (confirmed) {
    return (
      <a
        href={confirmed.source}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex flex-col items-center gap-0.5 rounded-md border-2 border-navy bg-white px-4 py-2 shadow-ambient transition-transform hover:-translate-y-0.5",
          className
        )}
        title={`אושר רשמית ב-${confirmed.confirmedAt}`}
      >
        <span className="text-2xl font-black tracking-wider text-navy">
          {confirmed.letters}
        </span>
        <span className="text-[10px] font-medium text-gray-dark">
          האות בפתק
        </span>
      </a>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border-2 border-dashed border-gray-dark/40 bg-white/90 px-4 py-2 text-gray-dark backdrop-blur-sm",
        className
      )}
    >
      <span className="text-sm font-medium">טרם אושרה אות רשמית</span>
      <span className="text-xs">(כינוי נוכחי: {party.logo})</span>
    </div>
  );
}
