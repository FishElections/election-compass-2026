import { partyStances } from "@/data/party_stances";
import { categoriesCore, questionsCore } from "@/data/questions/core";
import { isBelowThreshold, isPollSnapshotFresh, noteFor } from "@/data/polls";
import { Locale } from "@/i18n/config";
import {
  CategoryId,
  CategoryWeights,
  ExclusionReason,
  Party,
  PartyNoteId,
  PartyResult,
  QuizFilters,
  UserAnswers,
} from "@/types";

const MAX_DISTANCE_PER_QUESTION = 4; // |2 - (-2)|

const stanceLookup: Record<string, Record<string, number>> = {};
for (const stance of partyStances) {
  if (!stanceLookup[stance.partyId]) stanceLookup[stance.partyId] = {};
  stanceLookup[stance.partyId][stance.questionId] = stance.stanceValue;
}

const questionCategoryLookup: Record<string, CategoryId> = {};
for (const question of questionsCore) {
  questionCategoryLookup[question.id] = question.category;
}

/**
 * משקל קיטוב לכל שאלה: נגזר מפיזור עמדות המפלגות עליה (סטיית תקן על פני כל
 * המפלגות), ומנורמל כך שממוצע המשקלים על פני כל השאלות הוא 1.
 *
 * הרציונל: שאלה שבה כל המפלגות כמעט מסכימות לא עוזרת להבחין ביניהן, אבל
 * במדד מרחק לינארי רגיל היא סופרת באותו משקל כמו שאלה שנויה במחלוקת אמיתית
 * - וכך "גוררת" הפרשי ניקוד קטנים על פני שאלות רבות בלי משמעות אידאולוגית,
 * מה שמעניק יתרון מבני למפלגה שנוקטת עמדות מתונות באופן עקבי (כי היא כמעט
 * לעולם לא רחוקה מאוד מאף תשובה אפשרית). שקלול לפי קיטוב מצמצם את היתרון
 * הזה ומגדיל את השפעתן של השאלות שבאמת מבדילות בין מפלגות.
 */
const questionPolarizationWeight: Record<string, number> = (() => {
  const valuesByQuestion: Record<string, number[]> = {};
  for (const stance of partyStances) {
    (valuesByQuestion[stance.questionId] ??= []).push(stance.stanceValue);
  }

  const stdevByQuestion: Record<string, number> = {};
  for (const [questionId, values] of Object.entries(valuesByQuestion)) {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance =
      values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
    stdevByQuestion[questionId] = Math.sqrt(variance);
  }

  const stdevs = Object.values(stdevByQuestion);
  const meanStdev = stdevs.reduce((sum, v) => sum + v, 0) / stdevs.length;

  const weights: Record<string, number> = {};
  for (const [questionId, stdev] of Object.entries(stdevByQuestion)) {
    // רצפת ביטחון: גם שאלה עם הסכמה כמעט מוחלטת בין המפלגות שומרת על השפעה
    // מינימלית, למקרה של שאלות עתידיות עם קיטוב אפסי.
    weights[questionId] = meanStdev > 0 ? Math.max(stdev / meanStdev, 0.1) : 1;
  }
  return weights;
})();

function weightFor(
  questionId: string,
  categoryWeights: CategoryWeights | undefined
): number {
  const category = questionCategoryLookup[questionId];
  const categoryWeight = categoryWeights ? categoryWeights[category] ?? 1 : 1;
  const polarizationWeight = questionPolarizationWeight[questionId] ?? 1;
  return categoryWeight * polarizationWeight;
}

function calculatePartyMatch(
  party: Party,
  answers: UserAnswers,
  categoryWeights?: CategoryWeights
): PartyResult {
  const answeredQuestionIds = Object.keys(answers).filter(
    (id) => answers[id] !== undefined
  );

  if (answeredQuestionIds.length === 0) {
    return { party, matchPercentage: 0, answeredCount: 0, excludedBy: [], notes: [] };
  }

  let totalDistance = 0;
  let maxPossibleDistance = 0;
  let dotProduct = 0;
  let userMagnitudeSquared = 0;
  let partyMagnitudeSquared = 0;
  for (const questionId of answeredQuestionIds) {
    const userValue = answers[questionId] ?? 0;
    const partyValue = stanceLookup[party.id]?.[questionId] ?? 0;
    const weight = weightFor(questionId, categoryWeights);
    totalDistance += weight * Math.abs(userValue - partyValue);
    maxPossibleDistance += weight * MAX_DISTANCE_PER_QUESTION;
    dotProduct += weight * userValue * partyValue;
    userMagnitudeSquared += weight * userValue * userValue;
    partyMagnitudeSquared += weight * partyValue * partyValue;
  }

  // כל הקטגוריות הנענות סומנו "לא חשוב בכלל" (משקל 0): נופלים חזרה לחישוב
  // בלתי-משוקלל כדי למנוע חלוקה ב-0 (NaN), במקום ל"ענוש" בציון שרירותי.
  if (maxPossibleDistance === 0) {
    return calculatePartyMatch(party, answers, undefined);
  }

  const distanceScore = (1 - totalDistance / maxPossibleDistance) * 100;

  /**
   * ציון כיווני (דמיון קוסינוס): בודק האם הכיוון הכללי של העמדות שלכם תואם
   * את כיוון המפלגה, ולא רק את המרחק המספרי הגולמי. הסיבה: מדד מרחק גרידא
   * מעניק יתרון מבני למפלגה שנוקטת עמדות מתונות בעקביות על פני כל הנושאים
   * (כי היא כמעט לעולם לא רחוקה *מאוד* מאף תשובה אפשרית) - גם כשמשתמש
   * מתאים אידאולוגית בבירור למפלגה אחרת שנוקטת עמדות נחרצות יותר. דמיון
   * כיווני לא "מעניש" מפלגה על נחרצות יתר כשהכיוון תואם, ולכן מזהה נכון גם
   * התאמות אידאולוגיות מובהקות שמדד מרחק גרידא היה מדרג נמוך מדי בטעות.
   * כשלמשתמש אין שום סימן כיווני (כל התשובות "ניטרלי" - הווקטור אפס), חוזרים
   * לציון המרחק, כי כיוון של וקטור אפס אינו מוגדר.
   */
  const directionScore =
    userMagnitudeSquared > 0 && partyMagnitudeSquared > 0
      ? ((dotProduct / Math.sqrt(userMagnitudeSquared * partyMagnitudeSquared)) +
          1) *
        50
      : distanceScore;

  const score = 0.5 * distanceScore + 0.5 * directionScore;

  return {
    party,
    matchPercentage: Math.round(score),
    answeredCount: answeredQuestionIds.length,
    // הסינון הוא שכבה נפרדת שרצה אחרי החישוב, ב-calculateAllMatches.
    excludedBy: [],
    notes: [],
  };
}

/**
 * מעל הפרש כזה בין שתי מפלגות, ההעדפה הרכה (גודל) לא מתערבת. הרעיון:
 * "רציתי מפלגה גדולה" הוא שיקול אמיתי, אבל הוא לא אמור להקפיץ מפלגה עם
 * 61% מעל מפלגה עם 84%. הוא כן אמור לסדר נכון בין 78% ל-77%. הגבול הזה
 * הוא ההבדל בין שובר-שוויון לבין זיהום של ציון ההתאמה.
 */
const TIE_BREAK_MARGIN = 2;

/** אילו מסננים הופעלו בפועל, לצורך התצוגה במסך התוצאות. */
export interface FilterOutcome {
  results: PartyResult[];
  /**
   * true כשהסינון פסל *את כל* המפלגות ולכן בוטל. מסך תוצאות ריק הוא באג
   * מבחינת המשתמש - עדיף להחזיר את הרשימה המלאה ולהסביר. באותה רוח של
   * הנסיגה הקיימת כשכל הקטגוריות סומנו "לא חשוב בכלל".
   */
  droppedAsEmpty: boolean;
  /** false כשנתוני הסקרים ישנים מדי ולכן מסנן אחוז החסימה לא הופעל. */
  pollDataFresh: boolean;
}

function exclusionsFor(
  party: Party,
  filters: QuizFilters,
  pollDataFresh: boolean
): ExclusionReason[] {
  const reasons: ExclusionReason[] = [];

  if (party.sectors.some((s) => filters.excludedSectors.includes(s))) {
    reasons.push("sector");
  }

  // מפלגה בלי שיוך גוש מתועד לעולם לא נפסלת בגללו - היעדר מקור אינו עדות.
  const stance = party.bloc?.stance;
  if (stance) {
    // "anti" מקבל גם את המפלגות שאינן משויכות לאף גוש: הן אינן בגוש
    // המתנגד, אך ודאי אינן ממליצות על נתניהו, וזו השאלה שנשאלה.
    const wantsPro = filters.blocPreference === "pro";
    const wantsAnti = filters.blocPreference === "anti";
    if (wantsPro && stance !== "pro-netanyahu") reasons.push("bloc");
    if (wantsAnti && stance === "pro-netanyahu") reasons.push("bloc");
  }

  if (filters.hideBelowThreshold && pollDataFresh && isBelowThreshold(party.id)) {
    reasons.push("threshold");
  }

  return reasons;
}

/**
 * ההעדפה הרכה: +1 למפלגה שתואמת את מה שהמשתמש ביקש, 0 אחרת. הערך משמש
 * *רק* בתוך מרווח TIE_BREAK_MARGIN ולעולם לא נכנס ל-matchPercentage.
 */
function preferenceRank(party: Party, filters: QuizFilters): number {
  if (filters.sizePreference === "any") return 0;
  const note = noteFor(party.id);
  if (filters.sizePreference === "large") return note === "large" ? 1 : 0;
  return note === "small" || note === "near-threshold" ? 1 : 0;
}

function notesFor(party: Party): PartyNoteId[] {
  const note = noteFor(party.id);
  return note ? [note] : [];
}

export function calculateAllMatches(
  parties: Party[],
  answers: UserAnswers,
  categoryWeights: CategoryWeights | undefined,
  locale: Locale,
  filters?: QuizFilters,
  now?: Date
): PartyResult[] {
  return calculateWithFilters(parties, answers, categoryWeights, locale, filters, now)
    .results;
}

export function calculateWithFilters(
  parties: Party[],
  answers: UserAnswers,
  categoryWeights: CategoryWeights | undefined,
  locale: Locale,
  filters?: QuizFilters,
  now?: Date
): FilterOutcome {
  const pollDataFresh = isPollSnapshotFresh(now);

  const scored = parties.map((party) => ({
    ...calculatePartyMatch(party, answers, categoryWeights),
    notes: notesFor(party),
  }));

  if (!filters) {
    return { results: sortResults(scored, locale, undefined), droppedAsEmpty: false, pollDataFresh };
  }

  const filtered = scored.map((result) => ({
    ...result,
    excludedBy: exclusionsFor(result.party, filters, pollDataFresh),
  }));

  // כל המפלגות נפסלו: מבטלים את הסינון ומסמנים, במקום להציג מסך ריק.
  if (filtered.every((r) => r.excludedBy.length > 0)) {
    return {
      results: sortResults(
        filtered.map((r) => ({ ...r, excludedBy: [] })),
        locale,
        undefined
      ),
      droppedAsEmpty: true,
      pollDataFresh,
    };
  }

  return {
    results: sortResults(filtered, locale, filters),
    droppedAsEmpty: false,
    pollDataFresh,
  };
}

function sortResults(
  results: PartyResult[],
  locale: Locale,
  filters: QuizFilters | undefined
): PartyResult[] {
  /**
   * ההעדפה הרכה מיושמת כמפתח מיון (אחוז + בונוס חסום), ולא כהשוואה מותנית
   * בתוך ה-comparator. זה לא ניואנס סגנוני: comparator שמפעיל כלל "רק אם
   * ההפרש קטן מ-2" אינו יחס סדר תקין - עם 80, 79 ו-77 הוא יכול לקבוע
   * שהראשון לפני השני, השני לפני השלישי, והשלישי לפני הראשון. Array.sort
   * מול יחס כזה מחזיר תוצאה שתלויה באלגוריתם המיון.
   *
   * מפתח מספרי הוא תמיד עקבי, והבונוס החסום ל-TIE_BREAK_MARGIN שומר על אותה
   * התנהגות מובטחת: ההעדפה יכולה להפוך סדר רק בין מפלגות שההפרש ביניהן
   * אינו עולה על 2 נקודות.
   */
  const sortKey = (r: PartyResult): number =>
    r.matchPercentage +
    (filters ? preferenceRank(r.party, filters) * TIE_BREAK_MARGIN : 0);

  return [...results].sort((a, b) => {
    // מי שעבר את הסינון תמיד לפני מי שנפסל, בלי קשר לאחוז.
    const aExcluded = a.excludedBy.length > 0 ? 1 : 0;
    const bExcluded = b.excludedBy.length > 0 ? 1 : 0;
    if (aExcluded !== bExcluded) return aExcluded - bExcluded;

    const byKey = sortKey(b) - sortKey(a);
    if (byKey !== 0) return byKey;

    // שוויון במפתח: המפלגה שתואמת את ההעדפה קודמת, ורק אז סדר אלפביתי.
    if (filters) {
      const byRank =
        preferenceRank(b.party, filters) - preferenceRank(a.party, filters);
      if (byRank !== 0) return byRank;
    }
    return a.party.name.localeCompare(b.party.name, locale);
  });
}

export function getPartyStance(partyId: string, questionId: string): number {
  return stanceLookup[partyId]?.[questionId] ?? 0;
}

export function getPartyCategoryAverages(
  partyId: string
): Record<CategoryId, number> {
  const sums: Record<string, { total: number; count: number }> = {};
  for (const category of categoriesCore) {
    sums[category.id] = { total: 0, count: 0 };
  }
  for (const question of questionsCore) {
    const value = getPartyStance(partyId, question.id);
    sums[question.category].total += value;
    sums[question.category].count += 1;
  }
  const averages = {} as Record<CategoryId, number>;
  for (const category of categoriesCore) {
    const { total, count } = sums[category.id];
    averages[category.id] = count > 0 ? total / count : 0;
  }
  return averages;
}
