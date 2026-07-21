"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, ChevronDown, ChevronLeft, RotateCcw, Share2 } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { calculateAllMatches } from "@/utils/calculator";
import { Button } from "@/components/ui/button";
import { PartyResultCard } from "@/components/results/PartyResultCard";
import { PartyResultRow } from "@/components/results/PartyResultRow";
import { AnswerBreakdown } from "@/components/results/AnswerBreakdown";
import { cn } from "@/lib/utils";

export function ResultsClient() {
  const router = useRouter();
  const { answers, activeQuestions, reset } = useQuizStore();
  const [showAll, setShowAll] = useState(false);

  const results = useMemo(() => calculateAllMatches(answers), [answers]);
  const topThree = results.slice(0, 3);
  const rest = results.slice(3);

  const [selectedPartyId, setSelectedPartyId] = useState(
    topThree[0]?.party.id
  );
  const selectedParty =
    topThree.find((r) => r.party.id === selectedPartyId)?.party ??
    topThree[0]?.party;

  const answeredCount = Object.values(answers).filter(
    (v) => v !== undefined
  ).length;

  if (activeQuestions.length === 0 || answeredCount === 0) {
    return (
      <main className="flex-1">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-normal text-navy">
            עדיין לא נמצאו תשובות
          </h1>
          <p className="text-gray-dark">
            כדי לראות תוצאות, צריך קודם לענות על השאלון.
          </p>
          <Link href="/">
            <Button>לדף הבית</Button>
          </Link>
        </div>
      </main>
    );
  }

  function handleRestart() {
    reset();
    router.push("/");
  }

  async function handleShare() {
    const shareData = {
      title: "מצפן בחירות 2026",
      text: `גיליתי שהמפלגה שהכי מתאימה לי היא ${topThree[0]?.party.name} (${topThree[0]?.matchPercentage}% התאמה)! בדקו גם אתם:`,
      url: typeof window !== "undefined" ? window.location.origin : "",
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // המשתמש ביטל את השיתוף
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
    }
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            התוצאות שלכם מוכנות
          </h1>
          <p className="mt-2 text-gray-dark">
            ענית על {answeredCount} מתוך {activeQuestions.length} שאלות. אלו
            שלוש המפלגות שהכי מתאימות לעמדות שלך.
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-4">
          {topThree[0] && (
            <PartyResultCard result={topThree[0]} rank={1} />
          )}
          {topThree.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {topThree.slice(1).map((result, i) => (
                <PartyResultCard
                  key={result.party.id}
                  result={result}
                  rank={i + 2}
                />
              ))}
            </div>
          )}
        </div>

        {rest.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "הסתר מפלגות נוספות" : "הצג את כל שאר המפלגות"}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  showAll && "rotate-180"
                )}
              />
            </Button>
            {showAll && (
              <div className="mt-4 flex flex-col gap-2 text-right">
                {rest.map((result, i) => (
                  <PartyResultRow
                    key={result.party.id}
                    result={result}
                    rank={i + 4}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-14">
          <h2 className="font-display mb-4 text-xl font-normal text-navy">
            פירוט תשובות
          </h2>
          {topThree.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {topThree.map((r) => (
                <button
                  key={r.party.id}
                  onClick={() => setSelectedPartyId(r.party.id)}
                  className={cn(
                    "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                    selectedPartyId === r.party.id
                      ? "border-sapphire bg-sapphire text-white"
                      : "border-gray bg-white text-navy hover:border-sapphire"
                  )}
                >
                  לעומת {r.party.name}
                </button>
              ))}
            </div>
          )}
          {selectedParty && (
            <div className="rounded-2xl border border-gray/80 bg-white px-5 shadow-ambient">
              <AnswerBreakdown
                questions={activeQuestions}
                answers={answers}
                party={selectedParty}
              />
            </div>
          )}
        </div>

        {topThree[0] && (
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-amber/30 bg-amber-light/40 p-6 text-center sm:flex-row sm:text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber text-white">
              <Brain className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-navy">מוכנים לאתגר את עצמכם?</h2>
              <p className="mt-1 text-sm text-gray-dark">
                בדקו את {topThree[0].party.name} מול הטיעונים החזקים ביותר של
                המחנה הנגדי, במפרק הבועות.
              </p>
            </div>
            <Link href={`/challenge?party=${topThree[0].party.id}`}>
              <Button size="lg" variant="amber">
                למפרק הבועות
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-gray pt-8 sm:flex-row">
          <Button onClick={handleShare} variant="default" size="lg">
            <Share2 className="h-4 w-4" />
            שתפו את התוצאה
          </Button>
          <Button onClick={handleRestart} variant="outline" size="lg">
            <RotateCcw className="h-4 w-4" />
            התחילו מחדש
          </Button>
        </div>
      </div>
    </main>
  );
}
