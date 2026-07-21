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
    <div className="flex items-center gap-4 rounded-xl border border-gray bg-white px-4 py-3">
      <span className="w-6 shrink-0 text-center text-sm font-bold text-gray-dark">
        {rank}
      </span>
      <PartyLogo party={result.party} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-navy">{result.party.name}</p>
        <p className="truncate text-xs text-gray-dark">{result.party.leader}</p>
      </div>
      <span className="shrink-0 text-lg font-bold text-navy">
        {result.matchPercentage}%
      </span>
    </div>
  );
}
