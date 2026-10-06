"use client";

import { cn } from "@/lib/utils";

interface BlocBarProps {
  name: string;
  color: string;
  meanSeats: number;
  p5Seats: number;
  p95Seats: number;
  majorityProbability: number;
  majoritySeats: number;
  totalSeats: number;
  labels: {
    averageSeats: string;
    rangeLabel: string;
    majorityChance: string;
  };
  formatPercent: (fraction: number) => string;
  formatNumber: (n: number) => string;
}

export function BlocBar({
  name,
  color,
  meanSeats,
  p5Seats,
  p95Seats,
  majorityProbability,
  majoritySeats,
  totalSeats,
  labels,
  formatPercent,
  formatNumber,
}: BlocBarProps) {
  const meanRounded = Math.round(meanSeats);
  const widthPct = Math.min(100, (meanSeats / totalSeats) * 100);
  const reachesMajority = majorityProbability >= 0.5;

  return (
    <div className="rounded-2xl border border-gray/80 bg-white p-5 shadow-ambient">
      <div className="flex items-baseline justify-between gap-2">
        <span className="flex items-center gap-2 font-extrabold text-navy">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {name}
        </span>
        <span className="text-3xl font-black tabular-nums" style={{ color }}>
          {formatNumber(meanRounded)}
        </span>
      </div>
      <div className="text-end text-[11px] text-gray-dark">
        {labels.averageSeats}
      </div>

      {/* פס עד 120 עם סימון קו ה-61. */}
      <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-gray-light">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
        <div
          className="absolute -bottom-0.5 -top-0.5 w-[3px] rounded bg-gold"
          style={{ insetInlineStart: `${(majoritySeats / totalSeats) * 100}%` }}
          aria-hidden
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
        <span className="text-gray-dark">
          {labels.rangeLabel} {formatNumber(p5Seats)}–{formatNumber(p95Seats)}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 font-bold tabular-nums",
            reachesMajority
              ? "bg-success-light text-success"
              : "bg-gray-light text-gray-dark"
          )}
        >
          {labels.majorityChance} {formatPercent(majorityProbability)}
        </span>
      </div>
    </div>
  );
}
