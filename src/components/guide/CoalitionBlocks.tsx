"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { MAGIC_NUMBER, TOTAL_SEATS, getToyParties } from "@/data/electionGuide";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";

/**
 * צעצוע הקואליציה: מקישים על מפלגות דמיוניות ומנסים להגיע ל-61.
 * הבסיס העתידי לסימולטור הקואליציה המלא.
 */
export function CoalitionBlocks() {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const celebrated = useRef(false);
  const { dict, locale, dir } = useDictionary();
  const t = dict.guide.coalitionBlocks;
  const toyParties = getToyParties(locale);

  const sum = toyParties
    .filter((p) => picked.has(p.id))
    .reduce((acc, p) => acc + p.seats, 0);
  const hasGovernment = sum >= MAGIC_NUMBER;

  function toggle(id: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      const nextSum = toyParties
        .filter((p) => next.has(p.id))
        .reduce((acc, p) => acc + p.seats, 0);
      if (nextSum >= MAGIC_NUMBER && !celebrated.current) {
        celebrated.current = true;
        trackEvent("guide_coalition_built", { seats: nextSum });
      }
      return next;
    });
  }

  return (
    <div className="relative mt-6 rounded-2xl border border-gray/80 bg-white p-5 shadow-ambient sm:p-6">
      <div className="flex items-center justify-between font-extrabold text-navy">
        <span>{t.yourCoalition}</span>
        <span
          className={cn(
            "text-3xl transition-colors",
            hasGovernment ? "text-success" : "text-sapphire"
          )}
        >
          {sum}
        </span>
      </div>

      <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-gray-light">
        <div
          className={cn(
            "h-full rounded-full from-sapphire to-emerald-light transition-all duration-300",
            dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
          )}
          style={{ width: `${Math.min(100, (sum / TOTAL_SEATS) * 100)}%` }}
        />
        <div
          className="absolute -bottom-0.5 -top-0.5 w-[3px] rounded bg-amber"
          style={{ insetInlineEnd: `${(MAGIC_NUMBER / TOTAL_SEATS) * 100}%` }}
        />
      </div>
      <p className="mt-1 text-end text-xs font-bold text-amber">
        {t.target} {MAGIC_NUMBER} ▲
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {toyParties.map((party) => {
          const isPicked = picked.has(party.id);
          return (
            <button
              key={party.id}
              type="button"
              aria-pressed={isPicked}
              onClick={() => toggle(party.id)}
              className={cn(
                "cursor-pointer rounded-xl px-3.5 py-2.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5",
                isPicked && "scale-95 opacity-40 hover:translate-y-0"
              )}
              style={{ backgroundColor: party.color }}
            >
              {party.name} · {party.seats}
            </button>
          );
        })}
      </div>

      <div
        className="mt-3 flex h-8 items-center justify-center text-lg font-black text-success"
        aria-live="polite"
      >
        {hasGovernment && (
          <>
            <span className="absolute inset-x-0 top-1/2">
              <ConfettiBurst key={sum >= MAGIC_NUMBER ? "win" : "no"} />
            </span>
            🎉 {t.hasGovernment} ({sum} {t.seatsSuffix})
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => setPicked(new Set())}
        className="mx-auto flex cursor-pointer items-center gap-1 text-[13px] text-gray-dark underline hover:text-navy"
      >
        <RotateCcw className="h-3 w-3" />
        {t.restart}
      </button>
    </div>
  );
}
