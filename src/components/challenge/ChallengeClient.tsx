"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Brain } from "lucide-react";
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
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-20 sm:pt-24">
        {step === "setup" && (
          <>
            <div className="mb-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/10 text-navy">
                <Brain className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">
                מפרק הבועות: אתגר נקודות העיוורון
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-gray-dark">
                בדקו את הפתיחות המחשבתית שלכם מול הטיעונים החזקים ביותר של
                המחנה הנגדי, בלי לחץ ובלי שיפוטיות.
              </p>
            </div>
            <SetupStep presetPartyId={presetPartyId} onStart={handleStart} />
          </>
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
