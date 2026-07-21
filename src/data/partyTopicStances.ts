import { PartyTopicStance } from "@/types";

/**
 * מיקום כל מפלגה ("בעד"/"נגד") בכל אחד מנושאי אתגר הספקנות.
 * נגזר מהפרופיל האידאולוגי הכללי של כל מפלגה (ראו src/data/parties.ts),
 * ומשמש לקביעת "טיעון המחנה הנגדי" שיוצג למשתמש.
 */
export const partyTopicStances: PartyTopicStance[] = [
  // ישר!
  { partyId: "yashar", topicId: "haredi-draft", side: "pro" },
  { partyId: "yashar", topicId: "gaza-control", side: "pro" },
  { partyId: "yashar", topicId: "judicial-reform", side: "con" },
  { partyId: "yashar", topicId: "religion-state-separation", side: "pro" },
  { partyId: "yashar", topicId: "economy-model", side: "con" },

  // הליכוד
  { partyId: "likud", topicId: "haredi-draft", side: "con" },
  { partyId: "likud", topicId: "gaza-control", side: "pro" },
  { partyId: "likud", topicId: "judicial-reform", side: "pro" },
  { partyId: "likud", topicId: "religion-state-separation", side: "con" },
  { partyId: "likud", topicId: "economy-model", side: "pro" },

  // ביחד
  { partyId: "beyachad", topicId: "haredi-draft", side: "pro" },
  { partyId: "beyachad", topicId: "gaza-control", side: "pro" },
  { partyId: "beyachad", topicId: "judicial-reform", side: "con" },
  { partyId: "beyachad", topicId: "religion-state-separation", side: "con" },
  { partyId: "beyachad", topicId: "economy-model", side: "pro" },

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

  // הציונות הדתית
  { partyId: "religious-zionism", topicId: "haredi-draft", side: "con" },
  { partyId: "religious-zionism", topicId: "gaza-control", side: "pro" },
  { partyId: "religious-zionism", topicId: "judicial-reform", side: "pro" },
  {
    partyId: "religious-zionism",
    topicId: "religion-state-separation",
    side: "con",
  },
  { partyId: "religious-zionism", topicId: "economy-model", side: "pro" },

  // יסודות ישראל (המילואימניקים)
  { partyId: "yesodot-israel", topicId: "haredi-draft", side: "pro" },
  { partyId: "yesodot-israel", topicId: "gaza-control", side: "pro" },
  { partyId: "yesodot-israel", topicId: "judicial-reform", side: "con" },
  {
    partyId: "yesodot-israel",
    topicId: "religion-state-separation",
    side: "pro",
  },
  { partyId: "yesodot-israel", topicId: "economy-model", side: "con" },
];
