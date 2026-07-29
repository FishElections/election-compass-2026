import { partyStances } from "@/data/party_stances";
import { partiesCore } from "@/data/parties/core";
import { questionsCore } from "@/data/questions/core";
import { CategoryId, Party, SpectrumCategory, UserAnswers } from "@/types";

export type Lean =
  | "strongLeft"
  | "left"
  | "center"
  | "right"
  | "strongRight"
  | "mixed";

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

// Position of each spectrum bucket on a 0 (left) → 1 (right) axis. Used only
// to derive each question's inherent direction below (see questionDirection);
// "you" positions no longer compare against party positions directly.
const SPECTRUM_AXIS: Record<Exclude<SpectrumCategory, "sectoral">, number> = {
  left: 0.06,
  "center-left": 0.28,
  center: 0.5,
  "center-right": 0.68,
  right: 0.84,
  "far-right": 0.95,
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

// Each question's inherent left↔right direction and strength, derived once
// from how parties answered it: a regression-through-origin slope of party
// stance against party rightness (spectrum position, "sectoral" excluded, same
// convention as elsewhere). Positive → agreeing is the right-wing answer;
// negative → agreeing is the left-wing answer; magnitude → how polarizing the
// question is. This lets a user's own position be computed from their answers
// alone, with no live comparison to any party.
const questionDirection: Record<string, number> = (() => {
  const rightnessOfParty: Record<string, number> = {};
  for (const p of partiesCore) {
    if (p.spectrumCategory === "sectoral") continue;
    rightnessOfParty[p.id] =
      SPECTRUM_AXIS[p.spectrumCategory as Exclude<SpectrumCategory, "sectoral">] - 0.5;
  }
  const num: Record<string, number> = {};
  const den: Record<string, number> = {};
  for (const s of partyStances) {
    const rightness = rightnessOfParty[s.partyId];
    if (rightness === undefined) continue;
    num[s.questionId] = (num[s.questionId] ?? 0) + s.stanceValue * rightness;
    den[s.questionId] = (den[s.questionId] ?? 0) + s.stanceValue * s.stanceValue;
  }
  const direction: Record<string, number> = {};
  for (const qid of Object.keys(den)) {
    direction[qid] = den[qid] > 0 ? num[qid] / den[qid] : 0;
  }
  return direction;
})();

// A category's left↔right position (0→1), derived purely from the user's own
// answers: each answer is weighted and signed by that question's direction,
// then normalized against the max magnitude reachable by answering every
// question to its most extreme, correctly-directed value. Bounded to [0,1] by
// construction — reaches 0 or 1 only when every answered question in the
// category was taken to its most-left / most-right extreme. null when no
// answered question in this scope has a known direction.
function categoryPosition(
  answered: [string, number][],
  cats?: CategoryId[]
): number | null {
  let raw = 0;
  let maxMagnitude = 0;
  for (const [qid, u] of answered) {
    if (cats && !cats.includes(categoryOf[qid])) continue;
    const beta = questionDirection[qid];
    if (beta === undefined) continue;
    raw += beta * u;
    maxMagnitude += Math.abs(beta) * 2;
  }
  return maxMagnitude > 0 ? 0.5 + (raw / maxMagnitude) * 0.5 : null;
}

// The four intuitive macro-topics shown in the summary square, each grouping
// the finer categories that belong to it.
export type MacroKey = "economy" | "social" | "security" | "governance";

export const MACRO_GROUPS: Record<MacroKey, CategoryId[]> = {
  economy: ["economy", "infrastructure"],
  social: ["society", "religion_state"],
  security: ["security"],
  governance: ["judiciary", "governance"],
};

// "strong" only kicks in once the position is unambiguously near an extreme -
// a middling lean still reads as "leaning", not a flat claim.
function leanFromPosition(pos: number): Lean {
  if (pos < 0.2) return "strongLeft";
  if (pos < 0.42) return "left";
  if (pos > 0.8) return "strongRight";
  if (pos > 0.58) return "right";
  return "center";
}

export interface PoliticalProfile {
  /** Per-category lean, derived from which spectrum group the answers align with. */
  leans: { category: CategoryId; lean: Lean }[];
  /** Categories where the user agrees most strongly with their top party. */
  topReasons: CategoryId[];
  /** The user's overall spot on the 0 (left) → 1 (right) axis. */
  overallPosition: number;
  /** Per macro-topic position (0→1) + lean, for the topic square. */
  macros: { key: MacroKey; position: number; lean: Lean }[];
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

  const overallPosition = categoryPosition(answered) ?? 0.5;

  const macros = (Object.keys(MACRO_GROUPS) as MacroKey[])
    .map((key) => {
      const position = categoryPosition(answered, MACRO_GROUPS[key]);
      return position === null
        ? null
        : { key, position, lean: leanFromPosition(position) };
    })
    .filter((m): m is { key: MacroKey; position: number; lean: Lean } => m !== null);

  return { leans, topReasons, overallPosition, macros };
}
