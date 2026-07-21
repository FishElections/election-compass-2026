"use client";

import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";
import { quickStanceLabels } from "@/data/quickStanceLabels";
import { getArgumentByTopic, computeOpennessScore, getOpennessTier } from "@/utils/challenge";
import { ChallengeCardResult, StanceSide } from "@/types";
import { Button } from "@/components/ui/button";
import { OpennessGauge } from "@/components/challenge/OpennessGauge";

interface SummaryScreenProps {
  results: ChallengeCardResult[];
  onRestart: () => void;
}

export function SummaryScreen({ results, onRestart }: SummaryScreenProps) {
  const score = computeOpennessScore(results);
  const tier = getOpennessTier(score);

  const takeaways = results
    .filter((r) => r.reaction === 1)
    .map((r) => {
      const argument = getArgumentByTopic(r.topicId);
      const labels = quickStanceLabels[r.topicId];
      if (!argument || !labels) return null;
      const oppositeSide: StanceSide = r.userSide === "pro" ? "con" : "pro";
      const title =
        oppositeSide === "pro"
          ? argument.proPositionTitle
          : argument.conPositionTitle;
      return { topic: labels.topic, title };
    })
    .filter((t): t is { topic: string; title: string } => t !== null);

  function share(target: "whatsapp" | "x") {
    const url = window.location.origin;
    const text = `מדד הפתיחות המחשבתית שלי במפרק הבועות: ${score}% - ${tier.emoji} ${tier.title}. בדקו גם אתם:`;
    const shareUrl =
      target === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-lg text-center">
      <h2 className="mb-2 text-2xl font-extrabold text-navy">
        מדד הגמישות המחשבתית שלך
      </h2>
      <p className="mb-8 text-gray-dark">
        כך הגבתם לטיעונים החזקים ביותר של המחנה הנגדי.
      </p>

      <OpennessGauge percentage={score} />

      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-navy/10 px-5 py-2 text-navy">
        <span className="text-xl">{tier.emoji}</span>
        <span className="font-bold">{tier.title}</span>
      </div>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-dark">
        {tier.description}
      </p>

      <div className="mt-8 rounded-2xl border border-gray bg-white p-6 text-right">
        <h3 className="mb-3 font-bold text-navy">כדאי לזכור</h3>
        {takeaways.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {takeaways.map((t) => (
              <li key={t.topic} className="text-sm text-gray-dark">
                <span className="font-semibold text-navy">{t.topic}: </span>
                {t.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-dark">
            הפעם עמדתם איתן מול כל הטיעונים שהוצגו לכם. אין בכך פסול - אבל
            תמיד שווה להקשיב שוב לצד השני מדי פעם.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button onClick={() => share("whatsapp")} variant="success">
          שתפו ב-WhatsApp
        </Button>
        <Button onClick={() => share("x")} variant="outline">
          שתפו ב-X
        </Button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 border-t border-gray pt-6 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          נסו שוב
        </Button>
        <Link href="/">
          <Button variant="ghost">
            <Home className="h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  );
}
