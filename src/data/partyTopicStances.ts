import { PartyTopicStance } from "@/types";

/**
 * מיקום כל מפלגה ("בעד"/"נגד") בכל אחד מנושאי אתגר הספקנות.
 * נגזר מהפרופיל האידאולוגי הכללי של כל מפלגה (ראו src/data/parties.ts),
 * ומשמש לקביעת "טיעון המחנה הנגדי" שיוצג למשתמש.
 */
export const partyTopicStances: PartyTopicStance[] = [
  // הליכוד
  { partyId: "likud", topicId: "haredi-draft", side: "con" },
  { partyId: "likud", topicId: "gaza-control", side: "pro" },
  { partyId: "likud", topicId: "judicial-reform", side: "pro" },
  { partyId: "likud", topicId: "religion-state-separation", side: "con" },
  { partyId: "likud", topicId: "economy-model", side: "pro" },

  // יש עתיד
  { partyId: "yesh-atid", topicId: "haredi-draft", side: "pro" },
  { partyId: "yesh-atid", topicId: "gaza-control", side: "con" },
  { partyId: "yesh-atid", topicId: "judicial-reform", side: "con" },
  { partyId: "yesh-atid", topicId: "religion-state-separation", side: "pro" },
  { partyId: "yesh-atid", topicId: "economy-model", side: "pro" },

  // המחנה הממלכתי
  { partyId: "hamachane-hamamlachti", topicId: "haredi-draft", side: "pro" },
  { partyId: "hamachane-hamamlachti", topicId: "gaza-control", side: "pro" },
  { partyId: "hamachane-hamamlachti", topicId: "judicial-reform", side: "con" },
  {
    partyId: "hamachane-hamamlachti",
    topicId: "religion-state-separation",
    side: "con",
  },
  { partyId: "hamachane-hamamlachti", topicId: "economy-model", side: "con" },

  // ישראל ביתנו
  { partyId: "yisrael-beiteinu", topicId: "haredi-draft", side: "pro" },
  { partyId: "yisrael-beiteinu", topicId: "gaza-control", side: "pro" },
  { partyId: "yisrael-beiteinu", topicId: "judicial-reform", side: "con" },
  {
    partyId: "yisrael-beiteinu",
    topicId: "religion-state-separation",
    side: "pro",
  },
  { partyId: "yisrael-beiteinu", topicId: "economy-model", side: "pro" },

  // ש"ס
  { partyId: "shas", topicId: "haredi-draft", side: "con" },
  { partyId: "shas", topicId: "gaza-control", side: "pro" },
  { partyId: "shas", topicId: "judicial-reform", side: "pro" },
  { partyId: "shas", topicId: "religion-state-separation", side: "con" },
  { partyId: "shas", topicId: "economy-model", side: "con" },

  // יהדות התורה
  { partyId: "yahadut-hatorah", topicId: "haredi-draft", side: "con" },
  { partyId: "yahadut-hatorah", topicId: "gaza-control", side: "pro" },
  { partyId: "yahadut-hatorah", topicId: "judicial-reform", side: "pro" },
  {
    partyId: "yahadut-hatorah",
    topicId: "religion-state-separation",
    side: "con",
  },
  { partyId: "yahadut-hatorah", topicId: "economy-model", side: "con" },

  // הדמוקרטים
  { partyId: "hademocratim", topicId: "haredi-draft", side: "pro" },
  { partyId: "hademocratim", topicId: "gaza-control", side: "con" },
  { partyId: "hademocratim", topicId: "judicial-reform", side: "con" },
  {
    partyId: "hademocratim",
    topicId: "religion-state-separation",
    side: "pro",
  },
  { partyId: "hademocratim", topicId: "economy-model", side: "con" },

  // עוצמה יהודית
  { partyId: "otzma-yehudit", topicId: "haredi-draft", side: "pro" },
  { partyId: "otzma-yehudit", topicId: "gaza-control", side: "pro" },
  { partyId: "otzma-yehudit", topicId: "judicial-reform", side: "pro" },
  {
    partyId: "otzma-yehudit",
    topicId: "religion-state-separation",
    side: "con",
  },
  { partyId: "otzma-yehudit", topicId: "economy-model", side: "pro" },

  // רע"ם
  { partyId: "raam", topicId: "haredi-draft", side: "pro" },
  { partyId: "raam", topicId: "gaza-control", side: "con" },
  { partyId: "raam", topicId: "judicial-reform", side: "con" },
  { partyId: "raam", topicId: "religion-state-separation", side: "con" },
  { partyId: "raam", topicId: "economy-model", side: "con" },

  // חד"ש-תע"ל
  { partyId: "hadash-taal", topicId: "haredi-draft", side: "pro" },
  { partyId: "hadash-taal", topicId: "gaza-control", side: "con" },
  { partyId: "hadash-taal", topicId: "judicial-reform", side: "con" },
  {
    partyId: "hadash-taal",
    topicId: "religion-state-separation",
    side: "pro",
  },
  { partyId: "hadash-taal", topicId: "economy-model", side: "con" },
];
