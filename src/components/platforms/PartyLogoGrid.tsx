"use client";

import { Party } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";

interface PartyLogoGridProps {
  parties: Party[];
  onSelect: (party: Party) => void;
}

export function PartyLogoGrid({ parties, onSelect }: PartyLogoGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {parties.map((party) => (
        <button
          key={party.id}
          type="button"
          onClick={() => onSelect(party)}
          aria-label={`${party.name}, ${party.leader}`}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-gray/80 bg-white px-2 py-3 shadow-ambient transition-transform hover:-translate-y-0.5 hover:shadow-ambient-lg active:scale-95"
        >
          <PartyLogo party={party} size="md" />
          <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-navy">
            {party.name}
          </span>
        </button>
      ))}
    </div>
  );
}
