"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain, Check, ChevronDown, ChevronLeft, Link2, RotateCcw } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { parties } from "@/data/parties";
import { calculateAllMatches } from "@/utils/calculator";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { PartyResultCard } from "@/components/results/PartyResultCard";
import { PartyResultRow } from "@/components/results/PartyResultRow";
import { AnswerBreakdown } from "@/components/results/AnswerBreakdown";
import { cn } from "@/lib/utils";

export function ResultsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { answers, activeQuestions, reset } = useQuizStore();
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  // When someone opens a shared link (…/results?p=…&s=…) without having taken
  // the quiz themselves, we greet them with the sharer's result instead of a
  // dead-end.
  const sharedParty = parties.find((p) => p.id === searchParams.get("p"));
  const sharedScore = Number(searchParams.get("s"));

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

  // Fire a single quiz_complete event once real results are shown.
  const completeTracked = useRef(false);
  useEffect(() => {
    if (
      !completeTracked.current &&
      activeQuestions.length > 0 &&
      answeredCount > 0 &&
      topThree[0]
    ) {
      completeTracked.current = true;
      trackEvent("quiz_complete", {
        top_party: topThree[0].party.id,
        match: topThree[0].matchPercentage,
        answered: answeredCount,
      });
    }
  }, [activeQuestions.length, answeredCount, topThree]);

  if (activeQuestions.length === 0 || answeredCount === 0) {
    if (sharedParty && Number.isFinite(sharedScore)) {
      const shownScore = Math.max(0, Math.min(100, Math.round(sharedScore)));
      return (
        <main className="flex-1">
          <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-4 py-24 text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
              style={{ backgroundColor: sharedParty.color }}
            >
              {sharedParty.logo}
            </span>
            <p className="text-sm font-bold uppercase tracking-wider text-sapphire">
              שיתפו איתך תוצאה
            </p>
            <h1 className="font-display text-2xl font-normal leading-snug text-navy">
              קיבלו {shownScore}% התאמה ל{sharedParty.name}
            </h1>
            <p className="text-gray-dark">
              רוצים לגלות לאיזו מפלגה <span className="font-bold">אתם</span> הכי
              מתאימים? ענו על השאלון וקבלו את התוצאות שלכם.
            </p>
            <Link href="/quiz">
              <Button size="lg">
                התחילו בשאלון
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
      );
    }
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

  const topParty = topThree[0]?.party;
  const topScore = topThree[0]?.matchPercentage ?? 0;
  const shareUrl =
    typeof window !== "undefined" && topParty
      ? `${window.location.origin}/results?p=${encodeURIComponent(
          topParty.id
        )}&s=${topScore}`
      : "";
  const shareText = `גיליתי שהמפלגה שהכי מתאימה לי היא ${topParty?.name} (${topScore}% התאמה)! 🚀\nבדקו גם אתם 👇`;

  function shareWhatsApp() {
    trackEvent("share", { method: "whatsapp", party: topParty?.id, match: topScore });
    // wa.me opens the WhatsApp app on mobile and web.whatsapp on desktop.
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function handleCopyLink() {
    if (typeof navigator === "undefined") return;
    try {
      if (navigator.share) {
        trackEvent("share", { method: "native", party: topParty?.id, match: topScore });
        await navigator.share({
          title: "מצפן בחירות 2026",
          text: shareText,
          url: shareUrl,
        });
        return;
      }
      if (navigator.clipboard) {
        trackEvent("share", { method: "copy", party: topParty?.id, match: topScore });
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // המשתמש ביטל את השיתוף
    }
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sapphire">
            הניתוח הושלם
          </p>
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
          {topThree[0] && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-5 text-center sm:flex-row sm:justify-between sm:text-right">
              <div className="flex-1">
                <p className="font-bold text-navy">שתפו את התוצאה שלכם</p>
                <p className="mt-0.5 text-sm text-gray-dark">
                  תנו לחברים לגלות לאיזו מפלגה הם מתאימים.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button onClick={shareWhatsApp} variant="success">
                  <WhatsAppIcon className="h-4 w-4" />
                  שתפו ב-WhatsApp
                </Button>
                <Button onClick={handleCopyLink} variant="outline">
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                  {copied ? "הקישור הועתק" : "העתקת קישור"}
                </Button>
              </div>
            </div>
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

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray pt-8">
          <Button onClick={handleRestart} variant="ghost" size="lg">
            <RotateCcw className="h-4 w-4" />
            התחילו מחדש
          </Button>
        </div>
      </div>
    </main>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
