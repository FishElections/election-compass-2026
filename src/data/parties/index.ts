import { Locale } from "@/i18n/config";
import { Party } from "@/types";
import { partiesCore } from "./core";
import { partiesTextHe } from "./he";
import { partiesTextEn } from "./en";
import { partiesTextAr } from "./ar";

const partiesTextByLocale: Record<Locale, typeof partiesTextHe> = {
  he: partiesTextHe,
  en: partiesTextEn,
  ar: partiesTextAr,
};

/** מפלגות שהמצע שלהן לא מוצג באתר (עמוד המצעים ועמוד הפרופיל), בהחלטת עורכי
 *  האתר (אוקטובר 2026). לרע"ם לא נמצא מצע רשמי לבחירות 2026 (היא חסרה גם
 *  ברשימת המצעים של המכון הישראלי לדמוקרטיה). היא עדיין חלק מהשאלון, מהתוצאות
 *  ומעמוד המפלגה. */
export const HIDDEN_FROM_PLATFORMS: ReadonlySet<string> = new Set(["raam"]);

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
      sectors: p.sectors,
      bloc: p.bloc,
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
