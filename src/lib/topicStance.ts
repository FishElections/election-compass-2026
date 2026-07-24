import { Topic } from "@/types";

export interface StanceBreakdown {
  supportPct: number;
  opposePct: number;
  neutralPct: number;
  supportCount: number;
  opposeCount: number;
  neutralCount: number;
  label: string;
}

/**
 * ממיר את partyStancesSummary לפירוק אחוזים + תווית קריאה-מהירה.
 * מחזיר null כשאין מיפוי מפלגתי לנושא - לא כל נושא הוא מחלוקת מפלגתית.
 */
export function getStanceBreakdown(topic: Topic): StanceBreakdown | null {
  const summary = topic.partyStancesSummary;
  if (!summary) return null;

  const supportCount = summary.support.length;
  const opposeCount = summary.oppose.length;
  const neutralCount = summary.splitOrNeutral.length;
  const total = supportCount + opposeCount + neutralCount;
  if (total === 0) return null;

  const supportPct = Math.round((supportCount / total) * 100);
  const opposePct = Math.round((opposeCount / total) * 100);
  const neutralPct = Math.max(0, 100 - supportPct - opposePct);

  const diff = supportPct - opposePct;
  let label: string;
  if (Math.abs(diff) <= 8) {
    label = `${supportPct}% מול ${opposePct}% — פיצול בין המפלגות`;
  } else if (diff > 0) {
    label = supportPct >= 80 ? "רוב המפלגות תומכות" : "רוב נוטה לתמיכה";
  } else {
    label = opposePct >= 80 ? "רוב המפלגות מתנגדות" : "רוב נוטה להתנגדות";
  }

  return {
    supportPct,
    opposePct,
    neutralPct,
    supportCount,
    opposeCount,
    neutralCount,
    label,
  };
}
