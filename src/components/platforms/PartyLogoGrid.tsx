"use client";

import { Party } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";

interface PartyLogoGridProps {
  parties: Party[];
  onSelect: (party: Party) => void;
  /** המפלגה שפתוחה כרגע בפאנל, כדי לסמן את האריח שלה. */
  activePartyId?: string | null;
  ariaLabel?: string;
}

/** רשת הלוגואים של עמוד המצעים, בכל הרוחבים. בנייד 3 עמודות קומפקטיות; מ-lg
 *  ומעלה 7 עמודות, כך ש-13 המפלגות נכנסות בשתי שורות בלי גלילה. שם המנהיג
 *  מוצג רק מ-sm ומעלה, כי בנייד אין לו מקום באריח. */
export function PartyLogoGrid({
  parties,
  onSelect,
  activePartyId,
  ariaLabel,
}: PartyLogoGridProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-7"
    >
      {parties.map((party) => {
        const isActive = party.id === activePartyId;
        return (
          <li key={party.id}>
            <button
              type="button"
              onClick={() => onSelect(party)}
              aria-label={`${party.name}, ${party.leader}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex h-full w-full cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-2xl border bg-white px-2 py-3 shadow-ambient transition-all hover:-translate-y-0.5 hover:shadow-ambient-lg active:scale-95 sm:gap-2.5 sm:px-3 sm:pb-4 sm:pt-5",
                isActive ? "border-sapphire ring-2 ring-sapphire/30" : "border-gray/80"
              )}
            >
              {/* פס צבע המפלגה, כמו בכרטיסים הישנים. מוצג רק מ-sm: באריח הנייד
                  הקטן הוא מוסיף רעש בלי להוסיף זיהוי. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 hidden h-1.5 sm:block"
                style={{ backgroundColor: party.color }}
              />
              <PartyLogo party={party} size="md" className="sm:h-20 sm:w-20 sm:text-3xl" />
              <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-navy sm:text-sm sm:font-bold">
                {party.name}
              </span>
              <span className="hidden max-w-full truncate text-center text-xs text-gray-dark sm:block">
                {party.leader}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
