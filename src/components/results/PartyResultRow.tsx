import { ArrowDown } from "lucide-react";
import { PartyResult } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";

export function PartyResultRow({
  result,
  rank,
  noteLabel,
  preferenceDropLabel,
}: {
  result: PartyResult;
  /** מושמט ברשימת המוסתרות: מספר דירוג למפלגה שסוננה החוצה הוא חסר משמעות. */
  rank?: number;
  noteLabel?: string;
  /** מוצג רק כש-result.droppedByPreference - ראו PartyResult.droppedByPreference. */
  preferenceDropLabel?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray/80 bg-white px-4 py-3 shadow-ambient transition-all hover:-translate-y-0.5 hover:border-sapphire/40">
      {rank !== undefined && (
        <span className="flex w-6 shrink-0 flex-col items-center gap-0.5 text-center text-sm font-bold text-gray-dark">
          {rank}
          {result.droppedByPreference && preferenceDropLabel && (
            <span title={preferenceDropLabel}>
              <ArrowDown
                className="h-3 w-3 shrink-0"
                aria-label={preferenceDropLabel}
              />
            </span>
          )}
        </span>
      )}
      <PartyLogo party={result.party} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-navy">{result.party.name}</p>
        <p className="truncate text-xs text-gray-dark">{result.party.leader}</p>
        {/* שורה נפרדת ולא צירוף לשם המנהיג: על מסך טלפון הצירוף נחתך
            באמצע, וכך דווקא האזהרה על אחוז החסימה היא שנעלמת. */}
        {noteLabel && (
          <span className="mt-1 inline-block rounded-full bg-gray-light px-2 py-0.5 text-[11px] font-medium text-gray-dark">
            {noteLabel}
          </span>
        )}
      </div>
      <span className="shrink-0 text-lg font-bold text-sapphire">
        {result.matchPercentage}%
      </span>
    </div>
  );
}
