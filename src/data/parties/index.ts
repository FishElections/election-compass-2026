import { Locale } from "@/i18n/config";
import { Party } from "@/types";
import { partiesCore } from "./core";
import { partiesTextHe } from "./he";

const partiesTextByLocale: Record<Locale, typeof partiesTextHe> = {
  he: partiesTextHe,
};

export function getParties(locale: Locale): Party[] {
  const text = partiesTextByLocale[locale];
  return partiesCore.map((p) => {
    const t = text[p.id];
    if (!t) throw new Error(`Missing ${locale} text for party "${p.id}"`);
    return {
      id: p.id,
      name: t.name,
      leader: t.leader,
      color: p.color,
      spectrum: t.spectrum,
      spectrumCategory: p.spectrumCategory,
      shortDescription: t.shortDescription,
      logo: p.logo,
      logoImageUrl: p.logoImageUrl,
      officialBallotLetter: p.officialBallotLetter,
      leaderSketchUrl: p.leaderSketchUrl,
      platform: p.platform.map((topic) => {
        const topicText = t.platform.find((pt) => pt.topicKey === topic.topicKey);
        if (!topicText) {
          throw new Error(
            `Missing ${locale} platform text for party "${p.id}" topic "${topic.topicKey}"`
          );
        }
        return {
          topicKey: topic.topicKey,
          topicName: topicText.topicName,
          summary: topicText.summary,
          bulletPoints: topicText.bulletPoints,
        };
      }),
    };
  });
}
