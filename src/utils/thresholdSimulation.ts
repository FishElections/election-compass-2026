/**
 * סימולטור אחוז החסימה - מונטה-קרלו על תוצאות סקר יחיד.
 *
 * הרעיון: סקר מודד שיעורי קולות עם טעות דגימה. מפלגה שנמדדה ממש סביב
 * אחוז החסימה (3.25%) יכולה, אך ורק בגלל הרעש הזה, ליפול מתחת לקו או
 * לעבור אותו - ושתי התוצאות משנות לגמרי את חלוקת 120 המנדטים, כי קולות
 * של מפלגה שנפלה "מתבזבזים" ומחולקים מחדש בין מי שעבר.
 *
 * המנוע הזה הוא *טהור*: אין בו שום import מנתוני המפלגות או מהשפה. הוא
 * מקבל שיעורי קולות ומחזיר הסתברויות ותוחלות מנדטים, כדי שאפשר יהיה
 * לבדוק אותו בלי לטעון את כל האתר, ולהזריק RNG דטרמיניסטי בבדיקות.
 *
 * זו הדגמה סטטיסטית, לא תחזית: טעות הדגימה אמיתית, אבל היא רק אחד
 * ממקורות אי-הוודאות (יש גם הטיית סוקר, שינוי עמדות, התפלגות לא-נורמלית).
 * הממשק שמציג את התוצאה אחראי לומר זאת במפורש.
 */

export interface SimPartyInput {
  partyId: string;
  /** שיעור הקולות שנמדד בסקר, באחוזים (0-100). */
  percent: number;
  /** מפתח הגוש לצבירה (למשל עמדה ביחס לנתניהו). חסר = לא נצבר לגוש. */
  blocId?: string;
}

export interface SimulationConfig {
  parties: SimPartyInput[];
  /** גודל המדגם של הסקר. ממנו נגזרת טעות התקן של כל מפלגה. */
  sampleSize: number;
  numRuns: number;
  /** אחוז החסימה, באחוזים (למשל 3.25). */
  thresholdPercent: number;
  /** סך המנדטים לחלוקה (120). */
  totalSeats: number;
  /** רוב (61). ממנו נגזרת הסתברות הרוב של כל גוש. */
  majoritySeats: number;
  /** מפלגות שנכפה עליהן לעבור את החסימה (תרחיש "מה אם"). */
  forcedIn?: ReadonlySet<string>;
  /** מפלגות שנכפה להוציא מהמירוץ לגמרי. */
  forcedOut?: ReadonlySet<string>;
  /** מקור אקראיות; ברירת מחדל Math.random. מוזרק בבדיקות לדטרמיניזם. */
  random?: () => number;
}

export interface PartySimResult {
  partyId: string;
  basePercent: number;
  /** הסתברות שהמפלגה תעבור את החסימה, 0-1. */
  crossProbability: number;
  meanSeats: number;
  minSeats: number;
  maxSeats: number;
}

export interface BlocSimResult {
  blocId: string;
  meanSeats: number;
  /** אחוזון 5 ו-95 של מספר המנדטים - טווח סביר, לא קיצון. */
  p5Seats: number;
  p95Seats: number;
  /** הסתברות שהגוש לבדו מגיע לרוב, 0-1. */
  majorityProbability: number;
}

export interface SimulationResult {
  numRuns: number;
  parties: PartySimResult[];
  blocs: BlocSimResult[];
}

/**
 * דגימה מהתפלגות נורמלית סטנדרטית (Box-Muller). u1 מוגן מפני 0 כדי
 * ש-log לא יתפוצץ; ערך בודד לכל קריאה, פשטות על פני קיטון.
 */
function standardNormal(random: () => number): number {
  let u1 = random();
  while (u1 <= 0) u1 = random();
  const u2 = random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * חלוקת מנדטים בשיטת ד'הונדט (בדר-עופר בלי הסכמי עודפים) - הקצאה
 * חוזרת של מושב למפלגה בעלת המנה הגבוהה votes/(seats+1). זה הליבה
 * המדויקת של השיטה הישראלית; התעלמות מהסכמי העודפים היא קירוב מודע.
 */
function allocateDHondt(
  votes: Array<{ id: string; share: number }>,
  seats: number
): Map<string, number> {
  const result = new Map<string, number>();
  for (const { id } of votes) result.set(id, 0);
  for (let s = 0; s < seats; s++) {
    let bestId: string | null = null;
    let bestQuotient = -1;
    for (const { id, share } of votes) {
      const quotient = share / (result.get(id)! + 1);
      if (quotient > bestQuotient) {
        bestQuotient = quotient;
        bestId = id;
      }
    }
    if (bestId !== null) result.set(bestId, result.get(bestId)! + 1);
  }
  return result;
}

function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0;
  const idx = Math.min(
    sortedAsc.length - 1,
    Math.max(0, Math.floor((p / 100) * sortedAsc.length))
  );
  return sortedAsc[idx];
}

export function runThresholdSimulation(
  config: SimulationConfig
): SimulationResult {
  const {
    parties,
    sampleSize,
    numRuns,
    thresholdPercent,
    totalSeats,
    majoritySeats,
    forcedIn = new Set<string>(),
    forcedOut = new Set<string>(),
    random = Math.random,
  } = config;

  const crossCount = new Map<string, number>();
  const seatSum = new Map<string, number>();
  const seatMin = new Map<string, number>();
  const seatMax = new Map<string, number>();
  for (const p of parties) {
    crossCount.set(p.partyId, 0);
    seatSum.set(p.partyId, 0);
    seatMin.set(p.partyId, Infinity);
    seatMax.set(p.partyId, -Infinity);
  }

  // מספר המנדטים של כל גוש, פֶּר-ריצה - נשמר כדי לחשב אחוזונים והסתברות רוב.
  const blocIds = Array.from(
    new Set(parties.map((p) => p.blocId).filter((b): b is string => !!b))
  );
  const blocSeatsByRun = new Map<string, number[]>();
  for (const b of blocIds) blocSeatsByRun.set(b, []);

  for (let run = 0; run < numRuns; run++) {
    // 1. דגימה: לכל מפלגה, שיעור מופרע בטעות דגימה. מפלגה שנכפתה החוצה
    //    לא רצה כלל (share=0, לא נספרת בסך הקולות).
    const sampled: Array<{ id: string; share: number; forcedOut: boolean }> = [];
    let totalShare = 0;
    for (const p of parties) {
      if (forcedOut.has(p.partyId)) {
        sampled.push({ id: p.partyId, share: 0, forcedOut: true });
        continue;
      }
      const pr = p.percent / 100;
      const se = Math.sqrt(Math.max(pr * (1 - pr), 0) / sampleSize);
      let share = pr + standardNormal(random) * se;
      if (share < 0) share = 0;
      sampled.push({ id: p.partyId, share, forcedOut: false });
      totalShare += share;
    }

    // 2. מי עבר: שיעור מכלל הקולות >= אחוז החסימה, או שנכפה פנימה.
    //    החלוקה מחדש של קולות מבוזבזים קורית מאליה - ד'הונדט רץ רק על
    //    מי שעבר, ולכן המנדטים שלהם גדלים על חשבון מי שנפל.
    const thresholdFraction = thresholdPercent / 100;
    const survivors: Array<{ id: string; share: number }> = [];
    for (const s of sampled) {
      if (s.forcedOut) continue;
      const crossed =
        forcedIn.has(s.id) ||
        (totalShare > 0 && s.share / totalShare >= thresholdFraction);
      if (crossed) {
        crossCount.set(s.id, crossCount.get(s.id)! + 1);
        survivors.push({ id: s.id, share: s.share });
      }
    }

    // 3. חלוקת 120 המנדטים בין מי שעבר.
    const seats = allocateDHondt(survivors, totalSeats);
    const blocTally = new Map<string, number>();
    for (const p of parties) {
      const got = seats.get(p.partyId) ?? 0;
      seatSum.set(p.partyId, seatSum.get(p.partyId)! + got);
      if (got < seatMin.get(p.partyId)!) seatMin.set(p.partyId, got);
      if (got > seatMax.get(p.partyId)!) seatMax.set(p.partyId, got);
      if (p.blocId) {
        blocTally.set(p.blocId, (blocTally.get(p.blocId) ?? 0) + got);
      }
    }
    for (const b of blocIds) {
      blocSeatsByRun.get(b)!.push(blocTally.get(b) ?? 0);
    }
  }

  const partyResults: PartySimResult[] = parties.map((p) => ({
    partyId: p.partyId,
    basePercent: p.percent,
    crossProbability: crossCount.get(p.partyId)! / numRuns,
    meanSeats: seatSum.get(p.partyId)! / numRuns,
    minSeats: Number.isFinite(seatMin.get(p.partyId)!)
      ? seatMin.get(p.partyId)!
      : 0,
    maxSeats: Number.isFinite(seatMax.get(p.partyId)!)
      ? seatMax.get(p.partyId)!
      : 0,
  }));

  const blocResults: BlocSimResult[] = blocIds.map((blocId) => {
    const runs = blocSeatsByRun.get(blocId)!;
    const sorted = [...runs].sort((a, b) => a - b);
    const mean = runs.reduce((sum, v) => sum + v, 0) / (runs.length || 1);
    const majorityHits = runs.filter((v) => v >= majoritySeats).length;
    return {
      blocId,
      meanSeats: mean,
      p5Seats: percentile(sorted, 5),
      p95Seats: percentile(sorted, 95),
      majorityProbability: majorityHits / (runs.length || 1),
    };
  });

  return { numRuns, parties: partyResults, blocs: blocResults };
}

/**
 * PRNG דטרמיניסטי (mulberry32) - לבדיקות בלבד. Math.random לא דטרמיניסטי,
 * וב-Workflow scripts הוא חסום; הזרקת ה-seed נותנת ריצה שחוזרת על עצמה.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
