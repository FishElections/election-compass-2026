"use client";

import { useState } from "react";
import { Users, MessageCircleQuestion } from "lucide-react";
import { parties } from "@/data/parties";
import { counterArguments } from "@/data/counterArguments";
import { quickStanceLabels } from "@/data/quickStanceLabels";
import { getPartySide, quickStanceTopicIds } from "@/utils/challenge";
import { StanceSide } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ChallengeDeckItem {
  topicId: string;
  userSide: StanceSide;
}

interface SetupStepProps {
  presetPartyId?: string;
  onStart: (deck: ChallengeDeckItem[], sourceLabel: string | null) => void;
}

export function SetupStep({ presetPartyId, onStart }: SetupStepProps) {
  const presetParty = presetPartyId
    ? parties.find((p) => p.id === presetPartyId)
    : undefined;

  const [showFullChooser, setShowFullChooser] = useState(!presetParty);
  const [method, setMethod] = useState<"party" | "quick">("party");
  const [quickAnswers, setQuickAnswers] = useState<
    Partial<Record<string, StanceSide>>
  >({});

  function startWithParty(partyId: string, partyName: string) {
    const deck: ChallengeDeckItem[] = counterArguments.map((arg) => ({
      topicId: arg.id,
      userSide: getPartySide(partyId, arg.id) ?? "pro",
    }));
    onStart(deck, partyName);
  }

  function startWithQuickAnswers() {
    const deck: ChallengeDeckItem[] = quickStanceTopicIds
      .filter((topicId) => quickAnswers[topicId] !== undefined)
      .map((topicId) => ({
        topicId,
        userSide: quickAnswers[topicId] as StanceSide,
      }));
    onStart(deck, null);
  }

  const allQuickAnswered = quickStanceTopicIds.every(
    (id) => quickAnswers[id] !== undefined
  );

  if (presetParty && !showFullChooser) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray bg-white p-8 shadow-sm">
          <PartyLogo party={presetParty} size="lg" />
          <div>
            <p className="text-sm text-gray-dark">ההתאמה המובילה שלך היא</p>
            <h2 className="text-xl font-bold text-navy">{presetParty.name}</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-dark">
            בואו נבדוק את הטיעונים החזקים ביותר של המחנה הנגדי מול העמדות
            שסביר שהיא מייצגת עבורך.
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => startWithParty(presetParty.id, presetParty.name)}
          >
            התחילו את האתגר
          </Button>
          <button
            type="button"
            onClick={() => setShowFullChooser(true)}
            className="text-sm font-medium text-navy hover:underline cursor-pointer"
          >
            בחרו דרך אחרת
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMethod("party")}
          className={cn(
            "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
            method === "party"
              ? "border-navy bg-navy text-white"
              : "border-gray bg-white text-navy hover:border-navy"
          )}
        >
          <Users className="h-4 w-4" />
          למי אתה מתכנן להצביע?
        </button>
        <button
          type="button"
          onClick={() => setMethod("quick")}
          className={cn(
            "flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
            method === "quick"
              ? "border-navy bg-navy text-white"
              : "border-gray bg-white text-navy hover:border-navy"
          )}
        >
          <MessageCircleQuestion className="h-4 w-4" />
          הצהרת עמדה מהירה
        </button>
      </div>

      {method === "party" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {parties.map((party) => (
            <button
              key={party.id}
              type="button"
              onClick={() => startWithParty(party.id, party.name)}
              className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray bg-white p-4 transition-colors hover:border-navy hover:bg-gray-light cursor-pointer"
            >
              <PartyLogo party={party} size="sm" />
              <span className="text-center text-sm font-medium text-navy">
                {party.name}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {quickStanceTopicIds.map((topicId) => {
            const labels = quickStanceLabels[topicId];
            const answer = quickAnswers[topicId];
            return (
              <div
                key={topicId}
                className="rounded-xl border border-gray bg-white p-4"
              >
                <p className="mb-3 font-semibold text-navy">{labels.topic}</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      setQuickAnswers((prev) => ({ ...prev, [topicId]: "pro" }))
                    }
                    className={cn(
                      "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      answer === "pro"
                        ? "border-navy bg-navy text-white"
                        : "border-gray bg-white text-foreground hover:border-navy"
                    )}
                  >
                    {labels.proLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuickAnswers((prev) => ({ ...prev, [topicId]: "con" }))
                    }
                    className={cn(
                      "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      answer === "con"
                        ? "border-navy bg-navy text-white"
                        : "border-gray bg-white text-foreground hover:border-navy"
                    )}
                  >
                    {labels.conLabel}
                  </button>
                </div>
              </div>
            );
          })}

          <Button
            size="lg"
            disabled={!allQuickAnswered}
            onClick={startWithQuickAnswers}
          >
            התחילו את האתגר
          </Button>
        </div>
      )}
    </div>
  );
}
