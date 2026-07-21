"use client";

import { useState } from "react";
import { parties } from "@/data/parties";
import { categories } from "@/data/questions";
import { getPartyCategoryAverages } from "@/utils/calculator";
import { PartyLogo } from "@/components/PartyLogo";

export default function ComparePage() {
  const [partyAId, setPartyAId] = useState(parties[0].id);
  const [partyBId, setPartyBId] = useState(parties[1].id);

  const partyA = parties.find((p) => p.id === partyAId)!;
  const partyB = parties.find((p) => p.id === partyBId)!;
  const averagesA = getPartyCategoryAverages(partyA.id);
  const averagesB = getPartyCategoryAverages(partyB.id);

  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-20 text-center sm:pt-24">
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            השוואת מפלגות
          </h1>
          <p className="mt-2 text-gray-dark">
            בחרו שתי מפלגות כדי להשוות ביניהן לפי קטגוריה.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="grid grid-cols-2 gap-4">
          <select
            value={partyAId}
            onChange={(e) => setPartyAId(e.target.value)}
            className="rounded-xl border-2 border-gray bg-white px-4 py-3 text-right font-medium text-navy shadow-ambient focus:border-sapphire focus:outline-none"
          >
            {parties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={partyBId}
            onChange={(e) => setPartyBId(e.target.value)}
            className="rounded-xl border-2 border-gray bg-white px-4 py-3 text-right font-medium text-navy shadow-ambient focus:border-sapphire focus:outline-none"
          >
            {parties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex items-center justify-around rounded-2xl border border-gray/80 bg-white p-6 shadow-ambient">
          <div className="flex flex-col items-center gap-2">
            <PartyLogo party={partyA} size="md" />
            <span className="text-sm font-semibold text-navy">
              {partyA.name}
            </span>
          </div>
          <span className="rounded-full bg-gray-light px-3 py-1 text-xs font-bold text-gray-dark">
            מול
          </span>
          <div className="flex flex-col items-center gap-2">
            <PartyLogo party={partyB} size="md" />
            <span className="text-sm font-semibold text-navy">
              {partyB.name}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-gray/80 bg-white p-6 shadow-ambient">
          {categories.map((category) => {
            const valueA = averagesA[category.id];
            const valueB = averagesB[category.id];
            const percentA = ((valueA + 2) / 4) * 100;
            const percentB = ((valueB + 2) / 4) * 100;
            return (
              <div key={category.id}>
                <p className="mb-2 text-sm font-semibold text-navy">
                  {category.icon} {category.label}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-left text-xs text-gray-dark">
                    {valueA.toFixed(1)}
                  </span>
                  <div className="h-2.5 flex-1 rounded-full bg-gray">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentA}%`, backgroundColor: partyA.color }}
                    />
                  </div>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="w-10 text-left text-xs text-gray-dark">
                    {valueB.toFixed(1)}
                  </span>
                  <div className="h-2.5 flex-1 rounded-full bg-gray">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentB}%`, backgroundColor: partyB.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-sapphire/20 bg-sapphire/5 p-5 text-sm text-navy">
          בקרוב: השוואה מפורטת שאלה מול שאלה בין המפלגות שנבחרו.
        </div>
      </div>
    </main>
  );
}
