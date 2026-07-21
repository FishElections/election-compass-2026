import { PartyResult } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";

const rankStyles = [
  {
    ring: "ring-4 ring-gold/60",
    badge: "bg-gold text-white",
    scale: "sm:scale-105",
    label: "התאמה מובילה",
  },
  {
    ring: "ring-2 ring-gray",
    badge: "bg-navy-light text-white",
    scale: "",
    label: "מקום שני",
  },
  {
    ring: "ring-2 ring-gray",
    badge: "bg-navy-light text-white",
    scale: "",
    label: "מקום שלישי",
  },
];

export function PartyResultCard({
  result,
  rank,
}: {
  result: PartyResult;
  rank: number;
}) {
  const style = rankStyles[rank - 1] ?? rankStyles[2];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-2xl border border-gray bg-white p-6 text-center shadow-sm transition-transform",
        style.ring,
        style.scale
      )}
    >
      <span
        className={cn(
          "absolute -top-3 right-1/2 translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold shadow",
          style.badge
        )}
      >
        #{rank} · {style.label}
      </span>

      <div className="mt-3">
        <PartyLogo party={result.party} size="lg" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-navy">{result.party.name}</h3>
      <p className="text-sm text-gray-dark">{result.party.leader}</p>

      <div className="mt-4 text-4xl font-extrabold text-success">
        {result.matchPercentage}%
      </div>
      <p className="text-xs text-gray-dark">התאמה לעמדות שלך</p>

      <p className="mt-4 text-sm leading-relaxed text-gray-dark">
        {result.party.description}
      </p>
    </div>
  );
}
