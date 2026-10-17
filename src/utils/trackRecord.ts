import {
  CONVICTION_STATUSES,
  MAX_REFORMS_AND_LEGISLATION,
  OPEN_LEGAL_STATUSES,
  type ImpactEvidence,
  type KnessetPeriod,
  type PartyTrackRecordCore,
  type SourceRef,
} from "@/data/trackRecord/core";
import {
  ARCHIVE_HOST,
  hostMatches,
  sourcePublishers,
  type SourceKind,
} from "@/data/trackRecord/sources";

/**
 * Rules from docs/track-record-methodology.md (v1.0), as code. Section numbers
 * in the messages and comments refer to that document.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 86_400_000;

/** A real calendar date in YYYY-MM-DD form (rejects e.g. 2026-02-30). */
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function dayNumber(isoDate: string): number {
  return Date.parse(`${isoDate}T00:00:00Z`) / MS_PER_DAY;
}

/**
 * One full Knesset term: four years under Basic Law: The Knesset, §8.
 * Four years always contain exactly one Feb 29 in this era, hence the +1.
 */
export const FULL_TERM_DAYS = 4 * 365 + 1;

/**
 * Total days the party (with documented predecessors) held seats, counting
 * overlapping periods once. An open period runs until the snapshot date.
 */
export function combinedSeatDays(periods: KnessetPeriod[], asOf: string): number {
  const intervals = periods
    .filter((p) => isIsoDate(p.from) && isIsoDate(p.to ?? asOf))
    .map((p) => [dayNumber(p.from), dayNumber(p.to ?? asOf)] as const)
    .filter(([start, end]) => end > start)
    .sort((a, b) => a[0] - b[0]);

  let total = 0;
  let current: [number, number] | null = null;
  for (const [start, end] of intervals) {
    if (current && start <= current[1]) {
      current[1] = Math.max(current[1], end);
    } else {
      if (current) total += current[1] - current[0];
      current = [start, end];
    }
  }
  if (current) total += current[1] - current[0];
  return total;
}

/** §2.4: veteran = at least one full term of seats, combined. */
export function isVeteran(record: PartyTrackRecordCore): boolean {
  return combinedSeatDays(record.knessetPeriods, record.asOf) >= FULL_TERM_DAYS;
}

/** §3.3: the indicator moved in the direction of the stated goal. */
export function isGoalMet(impact: ImpactEvidence): boolean {
  return impact.intendedDirection === "increase"
    ? impact.after.value > impact.before.value
    : impact.after.value < impact.before.value;
}

interface SourceRules {
  /** Restrict to these kinds of publisher (e.g. evaluations only). */
  kinds?: SourceKind[];
  /**
   * §4.5 / §5: at least one official or evaluation source, or news from at
   * least 2 independent publishers.
   */
  corroborated?: boolean;
}

function checkSources(
  label: string,
  sources: SourceRef[],
  asOf: string,
  rules: SourceRules,
  errors: string[]
): void {
  if (sources.length === 0) {
    errors.push(`${label}: no source`);
    return;
  }

  for (const source of sources) {
    const publisher = sourcePublishers[source.publisher];
    if (!publisher) {
      errors.push(`${label}: "${source.publisher}" is not on the source list (§5)`);
      continue;
    }
    if (rules.kinds && !rules.kinds.includes(publisher.kind)) {
      errors.push(`${label}: ${source.publisher} is a ${publisher.kind} source, expected ${rules.kinds.join(" or ")}`);
    }

    let url: URL | null = null;
    try {
      url = new URL(source.url);
    } catch {
      errors.push(`${label}: invalid URL ${source.url}`);
    }
    if (url) {
      const host = url.hostname;
      if (url.protocol !== "https:") errors.push(`${label}: not https: ${source.url}`);
      if (!publisher.hosts.some((h) => hostMatches(host, h))) {
        errors.push(`${label}: ${host} is not a ${source.publisher} address`);
      }
    }

    if (!isIsoDate(source.accessed)) {
      errors.push(`${label}: accessed date "${source.accessed}" is not YYYY-MM-DD`);
    } else if (source.accessed > asOf) {
      errors.push(`${label}: accessed ${source.accessed} is after the snapshot ${asOf}`);
    }

    if (source.archiveUrl !== undefined) {
      let archive: URL | null = null;
      try {
        archive = new URL(source.archiveUrl);
      } catch {
        errors.push(`${label}: invalid archive URL ${source.archiveUrl}`);
      }
      if (archive && (archive.protocol !== "https:" || archive.hostname !== ARCHIVE_HOST)) {
        errors.push(`${label}: archive copy must be on ${ARCHIVE_HOST}`);
      }
    }
  }

  if (rules.corroborated) {
    const known = sources
      .map((s) => ({ id: s.publisher, publisher: sourcePublishers[s.publisher] }))
      .filter((s) => s.publisher);
    const authoritative = known.some((s) => s.publisher.kind !== "news");
    const newsGroups = new Set(
      known.filter((s) => s.publisher.kind === "news").map((s) => s.publisher.group ?? s.id)
    );
    if (!authoritative && newsGroups.size < 2) {
      errors.push(`${label}: needs an official source or 2 independent news outlets`);
    }
  }
}

function checkDate(label: string, value: string, asOf: string, errors: string[]): boolean {
  if (!isIsoDate(value)) {
    errors.push(`${label}: "${value}" is not YYYY-MM-DD`);
    return false;
  }
  if (value > asOf) {
    errors.push(`${label}: ${value} is after the snapshot ${asOf}`);
    return false;
  }
  return true;
}

function checkUniqueIds(label: string, ids: string[], errors: string[]): void {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${label}: duplicate id "${id}"`);
    seen.add(id);
  }
}

function checkImpact(
  label: string,
  impact: ImpactEvidence,
  itemDate: string,
  asOf: string,
  errors: string[]
): void {
  checkSources(`${label} goal`, impact.goalSources, asOf, { kinds: ["official"] }, errors);
  checkSources(`${label} evaluation`, impact.evaluationSources, asOf, { kinds: ["evaluation"] }, errors);

  for (const point of ["before", "after"] as const) {
    if (!Number.isFinite(impact[point].value)) errors.push(`${label}: ${point} value is not a number`);
    checkDate(`${label} ${point}`, impact[point].date, asOf, errors);
  }
  // The measurement must bracket the item: before it took effect, after it did.
  if (impact.before.date > itemDate) errors.push(`${label}: "before" is measured after the item's date`);
  if (impact.after.date < itemDate) errors.push(`${label}: "after" is measured before the item's date`);
  if (!isGoalMet(impact)) errors.push(`${label}: the data does not show its stated goal was met (§3.3)`);
}

/**
 * Every methodology rule that can be checked mechanically. Returns one message
 * per violation; an empty array means the record is valid.
 */
export function validatePartyTrackRecord(
  partyId: string,
  record: PartyTrackRecordCore
): string[] {
  const errors: string[] = [];
  const { asOf } = record;

  if (!isIsoDate(asOf)) {
    return [`${partyId}: snapshot date "${asOf}" is not YYYY-MM-DD`];
  }

  checkSources(`${partyId} leader`, record.leaderSources, asOf, { corroborated: true }, errors);

  checkUniqueIds(`${partyId} predecessors`, record.predecessors.map((p) => p.id), errors);
  for (const predecessor of record.predecessors) {
    checkSources(`${partyId} predecessor "${predecessor.id}"`, predecessor.sources, asOf, { corroborated: true }, errors);
  }

  const predecessorIds = new Set(record.predecessors.map((p) => p.id));
  for (const period of record.knessetPeriods) {
    const label = `${partyId} Knesset ${period.knesset}`;
    if (checkDate(`${label} start`, period.from, asOf, errors) && period.to !== undefined) {
      if (checkDate(`${label} end`, period.to, asOf, errors) && period.to < period.from) {
        errors.push(`${label}: ends before it starts`);
      }
    }
    if (period.predecessorId !== undefined && !predecessorIds.has(period.predecessorId)) {
      errors.push(`${label}: unknown predecessor "${period.predecessorId}" (§2.3)`);
    }
    checkSources(label, period.sources, asOf, { kinds: ["official"] }, errors);
  }

  checkUniqueIds(`${partyId} achievements`, record.achievements.map((a) => a.id), errors);
  for (const item of record.achievements) {
    const label = `${partyId} ${item.type} "${item.id}"`;
    const dated = checkDate(label, item.date, asOf, errors);
    checkSources(label, item.sources, asOf, { corroborated: true }, errors);

    if (item.type === "reform") {
      if (!(Number.isFinite(item.scale.value) && item.scale.value > 0)) {
        errors.push(`${label}: scale must be a positive number (§3.2)`);
      }
      checkSources(`${label} scale`, item.scale.sources, asOf, { kinds: ["official", "evaluation"] }, errors);
    }
    if ((item.type === "reform" || item.type === "legislation") && dated) {
      checkImpact(label, item.impact, item.date, asOf, errors);
    }
  }
  const capped = record.achievements.filter((a) => a.type !== "peace-agreement").length;
  if (capped > MAX_REFORMS_AND_LEGISLATION) {
    errors.push(`${partyId}: ${capped} reforms/laws, at most ${MAX_REFORMS_AND_LEGISLATION} (§3.4)`);
  }

  checkUniqueIds(`${partyId} legal cases`, record.legalCases.map((c) => c.id), errors);
  for (const legalCase of record.legalCases) {
    const label = `${partyId} legal case "${legalCase.id}"`;
    const started = checkDate(`${label} start`, legalCase.since, asOf, errors);
    const isOpen = OPEN_LEGAL_STATUSES.has(legalCase.status);
    if (isOpen && legalCase.endedOn !== undefined) {
      errors.push(`${label}: an open case cannot have an end date`);
    }
    if (!isOpen) {
      if (legalCase.endedOn === undefined) {
        errors.push(`${label}: a concluded case needs an end date`);
      } else if (checkDate(`${label} end`, legalCase.endedOn, asOf, errors) && started && legalCase.endedOn < legalCase.since) {
        errors.push(`${label}: ends before it starts`);
      }
    }
    if (legalCase.moralTurpitude !== undefined && !CONVICTION_STATUSES.has(legalCase.status)) {
      errors.push(`${label}: moral turpitude applies only to convictions (§4.3)`);
    }
    checkSources(label, legalCase.sources, asOf, { corroborated: true }, errors);
  }

  if (!isVeteran(record) && (record.achievements.length > 0 || record.legalCases.length > 0)) {
    errors.push(`${partyId}: not a veteran party, so it cannot have achievements or legal cases (§2.4)`);
  }

  return errors;
}
