import { PartyResult } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { Gauge } from "@/components/Gauge";
import { cn } from "@/lib/utils";

const rankLabel: Record<number, string> = {
  1: "התאמה מובילה",
  2: "מקום שני",
  3: "מקום שלישי",
};

export function PartyResultCard({
  result,
  rank,
}: {
  result: PartyResult;
  rank: number;
}) {
  if (rank === 1) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-white shadow-ambient-lg">
        <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-right">
          <span className="absolute -top-2 right-1/2 translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy shadow sm:static sm:translate-x-0">
            #1 · {rankLabel[1]}
          </span>
          <div className="mt-6 flex shrink-0 flex-col items-center gap-3 sm:mt-0">
            <PartyLogo party={result.party} size="lg" className="ring-4 ring-white/20" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-2xl font-normal">
              {result.party.name}
            </h3>
            <p className="text-sm text-white/70">
              {result.party.leader} · {result.party.spectrum}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {result.party.shortDescription}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <Gauge
              percentage={result.matchPercentage}
              size={120}
              label="התאמה"
              fromColor="var(--color-gold)"
              toColor="var(--color-emerald-light)"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-2xl border border-gray/80 bg-white p-6 text-center shadow-ambient"
      )}
    >
      <span className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full bg-navy-light px-3 py-1 text-xs font-bold text-white shadow">
        #{rank} · {rankLabel[rank] ?? ""}
      </span>

      <div className="mt-3">
        <PartyLogo party={result.party} size="md" />
      </div>

      <h3 className="mt-4 font-bold text-navy">{result.party.name}</h3>
      <p className="text-sm text-gray-dark">
        {result.party.leader} · {result.party.spectrum}
      </p>

      <div className="mt-4">
        <Gauge percentage={result.matchPercentage} size={92} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-dark">
        {result.party.shortDescription}
      </p>
    </div>
  );
}
