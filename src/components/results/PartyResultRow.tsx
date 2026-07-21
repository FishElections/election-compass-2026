import { PartyResult } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";

export function PartyResultRow({
  result,
  rank,
}: {
  result: PartyResult;
  rank: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray/80 bg-white px-4 py-3 shadow-ambient transition-all hover:-translate-y-0.5 hover:border-sapphire/40">
      <span className="w-6 shrink-0 text-center text-sm font-bold text-gray-dark">
        {rank}
      </span>
      <PartyLogo party={result.party} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-navy">{result.party.name}</p>
        <p className="truncate text-xs text-gray-dark">{result.party.leader}</p>
      </div>
      <span className="shrink-0 text-lg font-bold text-sapphire">
        {result.matchPercentage}%
      </span>
    </div>
  );
}
