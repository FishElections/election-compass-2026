"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, ExternalLink, Check, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getParties } from "@/data/parties";
import {
  getPollVoteShares,
  currentPoll,
  SAMPLE_SIZE,
  MARGIN_OF_ERROR_PERCENT,
  THRESHOLD_PERCENT,
} from "@/data/polls";
import { MAGIC_NUMBER, TOTAL_SEATS } from "@/data/electionGuide";
import { getFilterLabels } from "@/data/filters";
import { BlocStance, Party } from "@/types";
import {
  runThresholdSimulation,
  mulberry32,
  type SimPartyInput,
} from "@/utils/thresholdSimulation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { localizedPath } from "@/i18n/config";
import { KnessetSeats, type KnessetSeatDatum } from "./KnessetSeats";
import { ThresholdBar, type ForceState } from "./ThresholdBar";
import { BlocBar } from "./BlocBar";

const NUM_RUNS = 5000;
// זרע קבוע לריצה הראשונה: SSR והלקוח חייבים להסכים כדי לא לשבור הידרציה.
// "הגרל שוב" מחליף אותו לערך תלוי-זמן, אבל רק בתוך event handler (אחרי mount).
const INITIAL_SEED = 20260722;

// סדר הגושים משמאל לימין בפרסה ובכרטיסים, וצבע ייעודי לכל גוש (נבדל
// מצבעי המפלגות עצמן). unaligned = המפלגות הערביות שאינן בגוש יהודי.
const BLOC_ORDER: BlocStance[] = ["anti-netanyahu", "unaligned", "pro-netanyahu"];
const BLOC_COLORS: Record<BlocStance, string> = {
  "anti-netanyahu": "#2563eb",
  unaligned: "#64748b",
  "pro-netanyahu": "#c2410c",
};

/** חלוקת תוחלת-המנדטים (שברים) למספרים שלמים שמסתכמים ב-120, בשיטת
 *  השארית הגדולה - כדי שהפרסה תצבע בדיוק 120 מושבים. */
function roundSeatsToTotal(
  items: Array<{ partyId: string; meanSeats: number }>,
  total: number
): Record<string, number> {
  const withFloor = items.map((p) => {
    const floor = Math.floor(p.meanSeats);
    return { partyId: p.partyId, seats: floor, rem: p.meanSeats - floor };
  });
  const remaining = total - withFloor.reduce((sum, p) => sum + p.seats, 0);
  withFloor.sort((a, b) => b.rem - a.rem);
  for (let i = 0; i < remaining && i < withFloor.length; i++) {
    withFloor[i].seats += 1;
  }
  const out: Record<string, number> = {};
  for (const p of withFloor) out[p.partyId] = p.seats;
  return out;
}

export function SimulatorClient() {
  const { dict, locale } = useDictionary();
  const t = dict.simulator;

  const parties = useMemo(() => getParties(locale), [locale]);
  const partyById = useMemo(
    () => new Map(parties.map((p) => [p.id, p])),
    [parties]
  );
  const pollSourceLabel = getFilterLabels(locale).pollSource[currentPoll.sourceId];

  // קלט הסימולציה, בלתי-תלוי-שפה: שיעור קולות + גוש לכל מפלגה שבסקר.
  const simInputs: Array<SimPartyInput & { crossedInPoll: boolean }> = useMemo(() => {
    const shares = getPollVoteShares();
    return shares
      .map((s) => {
        const party = partyById.get(s.partyId);
        return {
          partyId: s.partyId,
          percent: s.percent,
          blocId: party?.bloc?.stance,
          crossedInPoll: s.crossedInPoll,
        };
      })
      .filter((s) => partyById.has(s.partyId));
  }, [partyById]);

  // שתי שכבות: ה"pending" מתעדכן מיד בלחיצה (כדי שהכפתור יידלק והמשתמש
  // ירגיש שנרשם קלט), וה"committed" הוא מה שהסימולציה בפועל רצה עליו, ומתעדכן
  // רק אחרי השהיה קצרה עם ספינר. בלי זה החישוב מיידי והתוצאה "קופצת" בלי
  // שהמשתמש מספיק להבין שמשהו השתנה.
  const [forceStates, setForceStates] = useState<Record<string, ForceState>>({});
  const [seed, setSeed] = useState(INITIAL_SEED);
  const [committedForce, setCommittedForce] = useState<Record<string, ForceState>>({});
  const [committedSeed, setCommittedSeed] = useState(INITIAL_SEED);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);

  const commitTimer = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (commitTimer.current !== null) window.clearTimeout(commitTimer.current);
    },
    []
  );

  // חתימה של מצב הכפייה שמתעלמת מ-"auto" (שקול לאין-ערך), כדי שטוגל שחוזר
  // למצב הקיים לא יפעיל חישוב (וספינר) מיותרים.
  const forceSignature = (m: Record<string, ForceState>) =>
    Object.entries(m)
      .filter(([, v]) => v !== "auto")
      .map(([k, v]) => `${k}:${v}`)
      .sort()
      .join(",");

  // מעדכן מיד את הקלט ה-pending (הכפתור נדלק), ואז - אם באמת השתנה משהו -
  // מראה ספינר לרגע לפני ש"מגיש" את הקלט לסימולציה. לחיצה נוספת תוך כדי
  // מאפסת את הטיימר (debounce), כך שרצף לחיצות מחשב רק את המצב הסופי.
  function scheduleCommit(nextForce: Record<string, ForceState>, nextSeed: number) {
    setForceStates(nextForce);
    setSeed(nextSeed);
    if (
      nextSeed === committedSeed &&
      forceSignature(nextForce) === forceSignature(committedForce)
    ) {
      return;
    }
    setIsSimulating(true);
    if (commitTimer.current !== null) window.clearTimeout(commitTimer.current);
    commitTimer.current = window.setTimeout(() => {
      setCommittedForce(nextForce);
      setCommittedSeed(nextSeed);
      setIsSimulating(false);
      commitTimer.current = null;
    }, 550);
  }

  const result = useMemo(() => {
    const forcedIn = new Set<string>();
    const forcedOut = new Set<string>();
    for (const [id, state] of Object.entries(committedForce)) {
      if (state === "in") forcedIn.add(id);
      if (state === "out") forcedOut.add(id);
    }
    return runThresholdSimulation({
      parties: simInputs.map(({ partyId, percent, blocId }) => ({
        partyId,
        percent,
        blocId,
      })),
      sampleSize: SAMPLE_SIZE,
      numRuns: NUM_RUNS,
      thresholdPercent: THRESHOLD_PERCENT,
      totalSeats: TOTAL_SEATS,
      majoritySeats: MAGIC_NUMBER,
      forcedIn,
      forcedOut,
      random: mulberry32(committedSeed),
    });
  }, [simInputs, committedForce, committedSeed]);

  // --- פורמטים תלויי-שפה (Intl) ---
  const percentFmt = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
    [locale]
  );
  const shareFmt = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }),
    [locale]
  );
  const numberFmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const formatPercent = (fraction: number) => percentFmt.format(fraction);
  const formatShare = (percent: number) => shareFmt.format(percent / 100);
  const formatNumber = (n: number) => numberFmt.format(n);

  // --- מפלגות "על הקו": הסתברות מעבר לא-ודאית, או שנפלו בסקר הזה ---
  const bubbleParties = useMemo(() => {
    return result.parties
      .filter(
        (p) =>
          (p.crossProbability > 0.02 && p.crossProbability < 0.98) ||
          !simInputs.find((s) => s.partyId === p.partyId)?.crossedInPoll
      )
      .sort((a, b) => b.crossProbability - a.crossProbability);
  }, [result, simInputs]);

  // המפלגה שהכי קרובה לקו (50%) - ציר ההכרעה, לכותרת.
  const pivotParty = useMemo(() => {
    let best: (typeof result.parties)[number] | null = null;
    let bestDist = Infinity;
    for (const p of result.parties) {
      const dist = Math.abs(p.crossProbability - 0.5);
      if (dist < bestDist) {
        bestDist = dist;
        best = p;
      }
    }
    return best;
  }, [result]);

  // --- פרסת הכנסת: חלוקת 120 מושבים לפי תוחלת, מסודרת לפי גוש ---
  const seatData: KnessetSeatDatum[] = useMemo(() => {
    const intSeats = roundSeatsToTotal(
      result.parties.map((p) => ({ partyId: p.partyId, meanSeats: p.meanSeats })),
      TOTAL_SEATS
    );
    const ordered = [...result.parties].sort((a, b) => {
      const pa = partyById.get(a.partyId);
      const pb = partyById.get(b.partyId);
      const ba = BLOC_ORDER.indexOf(pa?.bloc?.stance as BlocStance);
      const bb = BLOC_ORDER.indexOf(pb?.bloc?.stance as BlocStance);
      if (ba !== bb) return (ba === -1 ? 99 : ba) - (bb === -1 ? 99 : bb);
      return b.meanSeats - a.meanSeats;
    });
    const seats: KnessetSeatDatum[] = [];
    for (const p of ordered) {
      const party = partyById.get(p.partyId);
      const count = intSeats[p.partyId] ?? 0;
      for (let i = 0; i < count; i++) {
        seats.push({ color: party?.color ?? "#94a3b8", partyId: p.partyId });
      }
    }
    return seats;
  }, [result, partyById]);

  // מקרא: מפלגה + מספר מנדטים, לפי גודל יורד.
  const legend = useMemo(() => {
    const intSeats = seatData.reduce<Record<string, number>>((acc, s) => {
      acc[s.partyId] = (acc[s.partyId] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(intSeats)
      .map(([partyId, seats]) => ({ party: partyById.get(partyId)!, seats }))
      .filter((x) => x.party)
      .sort((a, b) => b.seats - a.seats);
  }, [seatData, partyById]);

  // --- גושים, בסדר התצוגה ---
  const blocsOrdered = useMemo(() => {
    return BLOC_ORDER.map((stance) => {
      const b = result.blocs.find((x) => x.blocId === stance);
      return b ? { stance, ...b } : null;
    }).filter((x): x is NonNullable<typeof x> => x !== null);
  }, [result]);

  function setForce(partyId: string, next: ForceState) {
    scheduleCommit({ ...forceStates, [partyId]: next }, seed);
    trackEvent("simulator_force_toggle", { party: partyId, state: next });
  }

  function reshuffle() {
    // הגדלת ה-seed ב-1 נותנת רצף אקראי שונה לגמרי (mulberry32 הוא hash-based),
    // והיא טהורה ודטרמיניסטית - בלי Date.now, כך שהריצה הראשונה (SSR) נשמרת
    // יציבה ואין אי-התאמת הידרציה.
    scheduleCommit(forceStates, seed + 1);
    trackEvent("simulator_run", {});
  }

  function resetAll() {
    scheduleCommit({}, INITIAL_SEED);
  }

  // השיתוף תמיד מצביע על עמוד הסימולטור הנקי (בלי תרחיש פרטי) - הקישור
  // היפה שמקבל תצוגה-מקדימה עם התמונה והטקסט לפי השפה (ראו generateMetadata).
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${localizedPath("/simulator", locale)}`
      : "";
  const shareText = t.share.text;

  function shareWhatsApp() {
    trackEvent("share", { method: "whatsapp", feature: "simulator" });
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function handleShare() {
    if (typeof navigator === "undefined") return;
    try {
      if (navigator.share) {
        trackEvent("share", { method: "native", feature: "simulator" });
        await navigator.share({
          title: t.share.ogTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      }
      if (navigator.clipboard) {
        trackEvent("share", { method: "copy", feature: "simulator" });
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // המשתמש ביטל את השיתוף
    }
  }

  const hasForced = Object.values(forceStates).some((s) => s !== "auto");
  const pivotPartyName = pivotParty
    ? partyById.get(pivotParty.partyId)?.name ?? ""
    : "";

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-16 text-center lg:pt-20">
          <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">{t.subtitle}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
            {t.intro}
          </p>
          <a
            href={currentPoll.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/15"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t.pollMeta
              .replace("{source}", pollSourceLabel)
              .replace("{date}", formatPollDate(currentPoll.updatedAt, locale))
              .replace("{sample}", formatNumber(SAMPLE_SIZE))
              .replace("{moe}", String(MARGIN_OF_ERROR_PERCENT))}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-8">
        {/* Headline */}
        <section className="rounded-2xl border border-gold/30 bg-gradient-to-br from-amber-light/60 to-white p-5 shadow-ambient sm:p-6">
          <p className="text-lg font-black text-navy sm:text-xl">{t.headlineLead}</p>
          {pivotParty && (
            <p className="mt-2 text-sm leading-relaxed text-gray-dark">
              {t.headlinePivot
                .replace("{party}", pivotPartyName)
                .replace("{pct}", formatPercent(pivotParty.crossProbability))}
            </p>
          )}
        </section>

        {/* Share */}
        <section className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-5 text-center sm:flex-row sm:justify-between sm:text-start">
          <div className="flex-1">
            <p className="font-bold text-navy">{t.share.heading}</p>
            <p className="mt-0.5 text-sm text-gray-dark">{t.share.subtitle}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <Button onClick={shareWhatsApp} variant="success">
              <WhatsAppIcon className="h-4 w-4" />
              {t.share.whatsapp}
            </Button>
            <Button onClick={handleShare} variant="outline">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {copied ? t.share.copied : t.share.copyLink}
            </Button>
          </div>
        </section>

        {/* Knesset outcome */}
        <section className="mt-8">
          <h2 className="text-xl font-extrabold text-navy">{t.knessetHeading}</h2>
          <p className="mt-1 text-sm text-gray-dark">{t.knessetSubtitle}</p>
          <figure className="relative mt-5 flex flex-col items-center rounded-2xl border border-gray/80 bg-white p-5 shadow-ambient">
            <div
              className={cn(
                "flex flex-col items-center transition-opacity duration-300",
                isSimulating && "opacity-30"
              )}
            >
              <KnessetSeats
                seats={seatData}
                ariaLabel={t.knessetAriaLabel.replace("{seats}", formatNumber(TOTAL_SEATS))}
              />
              <figcaption className="mt-2 text-xs text-gray-dark">
                {t.knessetCaption.replace("{majority}", formatNumber(MAGIC_NUMBER))}
              </figcaption>
              {/* מקרא המנדטים */}
              <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {legend.map(({ party, seats }) => (
                  <li key={party.id} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: party.color }}
                      aria-hidden
                    />
                    <span className="font-semibold text-navy">{party.name}</span>
                    <span className="tabular-nums text-gray-dark">{formatNumber(seats)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* ספינר מעל הפרסה בזמן חישוב - נותן למשתמש זמן לקלוט שהתוצאה משתנה. */}
            {isSimulating && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                role="status"
                aria-live="polite"
              >
                <Loader2 className="h-8 w-8 animate-spin text-sapphire" />
                <span className="text-sm font-semibold text-navy">
                  {t.simulating}
                </span>
              </div>
            )}
          </figure>
        </section>

        {/* Blocs */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-navy">{t.blocHeading}</h2>
          <p className="mt-1 text-sm text-gray-dark">
            {t.blocSubtitle.replace("{majority}", formatNumber(MAGIC_NUMBER))}
          </p>
          <div
            className={cn(
              "mt-5 grid gap-4 transition-opacity duration-300 sm:grid-cols-3",
              isSimulating && "opacity-30"
            )}
          >
            {blocsOrdered.map((bloc) => (
              <BlocBar
                key={bloc.stance}
                name={t.blocs[bloc.stance]}
                color={BLOC_COLORS[bloc.stance]}
                meanSeats={bloc.meanSeats}
                p5Seats={bloc.p5Seats}
                p95Seats={bloc.p95Seats}
                majorityProbability={bloc.majorityProbability}
                majoritySeats={MAGIC_NUMBER}
                totalSeats={TOTAL_SEATS}
                labels={{
                  averageSeats: t.averageSeats,
                  rangeLabel: t.rangeLabel,
                  majorityChance: t.majorityChance,
                }}
                formatPercent={formatPercent}
                formatNumber={formatNumber}
              />
            ))}
          </div>
        </section>

        {/* On the bubble */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-navy">{t.thresholdHeading}</h2>
          <p className="mt-1 text-sm text-gray-dark">
            {t.thresholdSubtitle.replace("{threshold}", formatShare(THRESHOLD_PERCENT))}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {bubbleParties.map((p) => {
              const party = partyById.get(p.partyId) as Party;
              const input = simInputs.find((s) => s.partyId === p.partyId);
              return (
                <ThresholdBar
                  key={p.partyId}
                  party={party}
                  crossProbability={p.crossProbability}
                  basePercent={p.basePercent}
                  crossedInPoll={input?.crossedInPoll ?? true}
                  force={forceStates[p.partyId] ?? "auto"}
                  onForceChange={(next) => setForce(p.partyId, next)}
                  simulating={isSimulating}
                  labels={{
                    crossChance: t.crossChance,
                    polledAt: t.polledAt,
                    outInThisPoll: t.outInThisPoll,
                    auto: t.forceAuto,
                    forceIn: t.forceIn,
                    forceOut: t.forceOut,
                  }}
                  formatPercent={formatPercent}
                  formatShare={formatShare}
                />
              );
            })}
          </div>
        </section>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reshuffle}
            disabled={isSimulating}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-ambient transition-all hover:-translate-y-0.5 hover:glow-sapphire disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSimulating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            {isSimulating ? t.simulating : t.runAgain}
          </button>
          {hasForced && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-dark underline hover:text-navy"
            >
              {t.resetScenario}
            </button>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-gray-dark">
          {t.runsNote.replace("{runs}", formatNumber(NUM_RUNS))}
        </p>

        {/* Methodology / disclaimer */}
        <section className="mt-12 rounded-2xl border border-gray/80 bg-gray-light/40 p-5 text-sm leading-relaxed text-gray-dark sm:p-6">
          <h2 className="text-base font-extrabold text-navy">{t.methodHeading}</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5">
            {t.methodPoints.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-amber-light/50 p-3 text-[13px] font-medium text-navy">
            {t.disclaimer}
          </p>
        </section>
      </div>
    </main>
  );
}

/** תאריך הסקר בפורמט מקומי (Intl). */
function formatPollDate(iso: string, locale: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
