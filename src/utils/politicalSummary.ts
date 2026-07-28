import { partyStances } from "@/data/party_stances";
import { questionsCore } from "@/data/questions/core";
import { CategoryId, Party, SpectrumCategory, UserAnswers } from "@/types";

export type Lean = "left" | "center" | "right" | "mixed";

// Coarse left / center / right buckets over the party spectrum. "sectoral"
// parties (Haredi / Arab-sector) aren't placed on the left-right axis by
// convention, so they're excluded from the lean derivation.
const SPECTRUM_GROUP: Record<
  Exclude<SpectrumCategory, "sectoral">,
  "left" | "center" | "right"
> = {
  left: "left",
  "center-left": "left",
  center: "center",
  "center-right": "right",
  right: "right",
  "far-right": "right",
};

const categoryOf: Record<string, CategoryId> = {};
for (const q of questionsCore) categoryOf[q.id] = q.category;

// partyId -> questionId -> stanceValue
const stanceOf: Record<string, Record<string, number>> = {};
for (const s of partyStances) {
  (stanceOf[s.partyId] ??= {})[s.questionId] = s.stanceValue;
}

// 1 = identical stance, 0 = opposite extreme (distance 4).
const closeness = (user: number, party: number) => 1 - Math.abs(user - party) / 4;

export interface PoliticalProfile {
  /** Per-category lean, derived from which spectrum group the answers align with. */
  leans: { category: CategoryId; lean: Lean }[];
  /** Categories where the user agrees most strongly with their top party. */
  topReasons: CategoryId[];
}

export function computePoliticalProfile(
  answers: UserAnswers,
  parties: Party[],
  topPartyId: string | undefined
): PoliticalProfile {
  const groupOf: Record<string, "left" | "center" | "right" | null> = {};
  for (const p of parties) {
    groupOf[p.id] =
      p.spectrumCategory === "sectoral"
        ? null
        : SPECTRUM_GROUP[p.spectrumCategory as Exclude<SpectrumCategory, "sectoral">];
  }

  const answered = Object.entries(answers).filter(([, v]) => v !== undefined) as [
    string,
    number
  ][];
  const byCategory: Record<string, [string, number][]> = {};
  for (const [qid, v] of answered) {
    const c = categoryOf[qid];
    if (c) (byCategory[c] ??= []).push([qid, v]);
  }

  const leans: { category: CategoryId; lean: Lean }[] = [];
  for (const [category, qs] of Object.entries(byCategory)) {
    const sum = { left: 0, center: 0, right: 0 };
    const n = { left: 0, center: 0, right: 0 };
    for (const [qid, u] of qs) {
      for (const p of parties) {
        const g = groupOf[p.id];
        if (!g) continue;
        const s = stanceOf[p.id]?.[qid];
        if (s === undefined) continue;
        sum[g] += closeness(u, s);
        n[g] += 1;
      }
    }
    const avg = {
      left: n.left ? sum.left / n.left : -1,
      center: n.center ? sum.center / n.center : -1,
      right: n.right ? sum.right / n.right : -1,
    };
    const ranked = (["left", "center", "right"] as const)
      .filter((g) => avg[g] >= 0)
      .sort((a, b) => avg[b] - avg[a]);
    if (ranked.length === 0) continue;
    const [best, second] = ranked;
    // Too close to call → "mixed" rather than over-committing to a side.
    const lean: Lean =
      second !== undefined && avg[best] - avg[second] < 0.03 ? "mixed" : best;
    leans.push({ category: category as CategoryId, lean });
  }

  let topReasons: CategoryId[] = [];
  if (topPartyId && stanceOf[topPartyId]) {
    const perCat: { category: CategoryId; align: number }[] = [];
    for (const [category, qs] of Object.entries(byCategory)) {
      let s = 0;
      let cnt = 0;
      for (const [qid, u] of qs) {
        const ps = stanceOf[topPartyId][qid];
        if (ps === undefined) continue;
        s += closeness(u, ps);
        cnt += 1;
      }
      if (cnt > 0) perCat.push({ category: category as CategoryId, align: s / cnt });
    }
    perCat.sort((a, b) => b.align - a.align);
    // Prefer genuinely strong agreement; fall back to the single best category.
    topReasons = perCat.filter((c) => c.align >= 0.6).slice(0, 2).map((c) => c.category);
    if (topReasons.length === 0 && perCat.length) topReasons = [perCat[0].category];
  }

  return { leans, topReasons };
}
