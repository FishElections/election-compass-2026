"use client";

import { Check, Dice5, X } from "lucide-react";
import { Party } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";

export type ForceState = "auto" | "in" | "out";

interface ThresholdBarProps {
  party: Party;
  /** הסתברות לעבור את החסימה, 0-1 (כבר משקללת כפייה). */
  crossProbability: number;
  basePercent: number;
  /** האם המפלגה עברה את החסימה בסקר כפי שפורסם. */
  crossedInPoll: boolean;
  force: ForceState;
  onForceChange: (next: ForceState) => void;
  labels: {
    crossChance: string;
    polledAt: string;
    outInThisPoll: string;
    auto: string;
    forceIn: string;
    forceOut: string;
  };
  /** עיצוב הסתברות (שבר 0-1) לפי שפה (Intl). */
  formatPercent: (fraction: number) => string;
  /** עיצוב שיעור הקולות (מספר באחוזים, למשל 3.2) לפי שפה. */
  formatShare: (percent: number) => string;
}

/** צבע סיכון: אדום מתחת ל-40%, ענבר באמצע, ירוק מעל 70%. */
function riskColor(p: number): string {
  if (p >= 0.7) return "var(--color-success)";
  if (p >= 0.4) return "var(--color-amber)";
  return "#dc2626";
}

export function ThresholdBar({
  party,
  crossProbability,
  basePercent,
  crossedInPoll,
  force,
  onForceChange,
  labels,
  formatPercent,
  formatShare,
}: ThresholdBarProps) {
  const fill = Math.max(2, Math.round(crossProbability * 100));
  const color = riskColor(crossProbability);

  const forceButtons: Array<{ value: ForceState; icon: typeof Check; label: string }> = [
    { value: "auto", icon: Dice5, label: labels.auto },
    { value: "in", icon: Check, label: labels.forceIn },
    { value: "out", icon: X, label: labels.forceOut },
  ];

  return (
    <div className="rounded-2xl border border-gray/80 bg-white p-4 shadow-ambient">
      <div className="flex items-center gap-3">
        <PartyLogo party={party} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate font-bold text-navy">{party.name}</span>
            <span
              className="shrink-0 text-lg font-black tabular-nums"
              style={{ color }}
            >
              {formatPercent(crossProbability)}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-gray-dark">
            {crossedInPoll
              ? `${labels.polledAt} ${formatShare(basePercent)}`
              : `${labels.outInThisPoll} · ${formatShare(basePercent)}`}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-gray-light">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${fill}%`, backgroundColor: color }}
          />
        </div>
        <span className="shrink-0 text-[11px] font-semibold text-gray-dark">
          {labels.crossChance}
        </span>
      </div>

      {/* בקרת "מה אם": אוטומטי / כופים לעבור / כופים להוציא. */}
      <div className="mt-3 flex overflow-hidden rounded-lg border border-gray">
        {forceButtons.map((b) => {
          const active = force === b.value;
          return (
            <button
              key={b.value}
              type="button"
              onClick={() => onForceChange(b.value)}
              aria-pressed={active}
              aria-label={b.label}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-1 py-1.5 text-[11px] font-bold transition-colors",
                active
                  ? "bg-navy text-white"
                  : "bg-white text-gray-dark hover:bg-gray-light"
              )}
            >
              <b.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{b.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
