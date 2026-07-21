"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { parties } from "@/data/parties";
import { ChallengeCardResult, OpennessReaction } from "@/types";
import { SetupStep, ChallengeDeckItem } from "@/components/challenge/SetupStep";
import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { SummaryScreen } from "@/components/challenge/SummaryScreen";

type Step = "setup" | "cards" | "summary";

export function ChallengeClient() {
  const searchParams = useSearchParams();
  const partyParam = searchParams.get("party");
  const presetPartyId = parties.some((p) => p.id === partyParam)
    ? partyParam!
    : undefined;

  const [step, setStep] = useState<Step>("setup");
  const [deck, setDeck] = useState<ChallengeDeckItem[]>([]);
  const [sourceLabel, setSourceLabel] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ChallengeCardResult[]>([]);

  function handleStart(newDeck: ChallengeDeckItem[], label: string | null) {
    setDeck(newDeck);
    setSourceLabel(label);
    setCurrentIndex(0);
    setResults([]);
    setStep("cards");
  }

  function handleReact(reaction: OpennessReaction) {
    const current = deck[currentIndex];
    const nextResults = [
      ...results,
      { topicId: current.topicId, userSide: current.userSide, reaction },
    ];
    setResults(nextResults);

    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep("summary");
    }
  }

  function handleRestart() {
    setStep("setup");
    setDeck([]);
    setSourceLabel(null);
    setCurrentIndex(0);
    setResults([]);
  }

  return (
    <main className="flex-1">
      {step === "setup" && (
        <div className="bg-dot-grid">
          <div className="mx-auto max-w-3xl px-4 pb-2 pt-20 text-center sm:pt-24">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/15 text-amber">
              <Brain className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
              מפרק הבועות: אתגר נקודות העיוורון
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-gray-dark">
              בדקו את הפתיחות המחשבתית שלכם מול הטיעונים החזקים ביותר של
              המחנה הנגדי, בלי לחץ ובלי שיפוטיות.
            </p>
          </div>
        </div>
      )}

      <div
        className={cn(
          "mx-auto max-w-3xl px-4 pb-16",
          step === "setup" ? "pt-10" : "pt-20 sm:pt-24"
        )}
      >
        {step === "setup" && (
          <SetupStep presetPartyId={presetPartyId} onStart={handleStart} />
        )}

        {step === "cards" && deck[currentIndex] && (
          <ChallengeCard
            topicId={deck[currentIndex].topicId}
            userSide={deck[currentIndex].userSide}
            sourceLabel={sourceLabel}
            index={currentIndex}
            total={deck.length}
            onReact={handleReact}
          />
        )}

        {step === "summary" && (
          <SummaryScreen results={results} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}
