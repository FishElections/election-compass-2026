"use client";

import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { RotateCcw, Home, Sparkles } from "lucide-react";
import { getQuickStanceLabels } from "@/data/quickStanceLabels";
import {
  getArgumentByTopic,
  computeOpennessScore,
  getOpennessTierKey,
  opennessTierEmoji,
} from "@/utils/challenge";
import { ChallengeCardResult, StanceSide } from "@/types";
import { Button } from "@/components/ui/button";
import { Gauge } from "@/components/Gauge";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { localizedPath } from "@/i18n/config";

interface SummaryScreenProps {
  results: ChallengeCardResult[];
  onRestart: () => void;
}

export function SummaryScreen({ results, onRestart }: SummaryScreenProps) {
  const { dict, locale } = useDictionary();
  const t = dict.challenge.summary;
  const score = computeOpennessScore(results);
  const tierKey = getOpennessTierKey(score);
  const tier = { emoji: opennessTierEmoji[tierKey], ...t.tiers[tierKey] };
  const quickStanceLabels = getQuickStanceLabels(locale);

  const takeaways = results
    .filter((r) => r.reaction === 1)
    .map((r) => {
      const argument = getArgumentByTopic(r.topicId, locale);
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
    const url = `${window.location.origin}${localizedPath("/", locale)}`;
    const text = t.shareTextTemplate
      .replace("{score}", String(score))
      .replace("{emoji}", tier.emoji)
      .replace("{tier}", tier.title);
    const shareUrl =
      target === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-lg text-center">
      <h2 className="font-display mb-2 text-3xl font-normal text-navy">
        {t.heading}
      </h2>
      <p className="mb-8 text-gray-dark">
        {t.subtitle}
      </p>

      <div className="rounded-3xl border border-gray/80 bg-white p-8 shadow-ambient-lg">
        <Gauge percentage={score} />

        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2 text-white">
          <span className="text-xl">{tier.emoji}</span>
          <span className="font-bold">{tier.title}</span>
        </div>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-dark">
          {tier.description}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-amber/30 bg-amber-light/40 p-6 text-start">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-navy">
          <Sparkles className="h-4 w-4 text-amber" />
          {t.worthRemembering}
        </h3>
        {takeaways.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {takeaways.map((takeaway) => (
              <li key={takeaway.topic} className="text-sm text-gray-dark">
                <span className="font-semibold text-navy">{takeaway.topic}: </span>
                {takeaway.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-dark">
            {t.noTakeaways}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button onClick={() => share("whatsapp")} variant="success">
          {t.shareWhatsapp}
        </Button>
        <Button onClick={() => share("x")} variant="outline">
          {t.shareX}
        </Button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 border-t border-gray pt-6 sm:flex-row sm:justify-center">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          {t.tryAgain}
        </Button>
        <Link href="/">
          <Button variant="ghost">
            <Home className="h-4 w-4" />
            {t.backToHome}
          </Button>
        </Link>
      </div>
    </div>
  );
}
