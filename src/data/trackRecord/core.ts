import type { SourcePublisherId } from "./sources";

/**
 * Locale-independent facts for the veteran-party track record: key
 * achievements and the party leader's legal record.
 *
 * Every rule here comes from docs/track-record-methodology.md (v1.0), which
 * was frozen before any research. The data is a one-time static snapshot:
 * nothing is fetched at runtime and every visitor sees the same thing.
 *
 * Nothing that can be computed is stored. Veteran status is derived from
 * knessetPeriods (see isVeteran in @/utils/trackRecord), so it can never
 * drift from the periods it is based on.
 *
 * validatePartyTrackRecord enforces every rule below, and the data test runs
 * it on each record, so a fact without a source fails the build.
 */

/** A dated, sourced reference. YYYY-MM-DD dates throughout. */
export interface SourceRef {
  publisher: SourcePublisherId;
  /** https URL on one of the publisher's hosts. */
  url: string;
  /** When the source was read. */
  accessed: string;
  /** A web.archive.org copy, when one could be made (§5). */
  archiveUrl?: string;
}

/** A stretch of time the party (or a documented predecessor) held seats (§2.4). */
export interface KnessetPeriod {
  knesset: number;
  /** The day the party's members took their seats. */
  from: string;
  /** The day that Knesset's tenure ended. Omitted for the current Knesset. */
  to?: string;
  /** Set when the seats were held by a predecessor (key into predecessors). */
  predecessorId?: string;
  sources: SourceRef[];
}

/** Documented continuity with an earlier party (§2.3). */
export interface PredecessorCore {
  id: string;
  sources: SourceRef[];
}

/**
 * The measured result for a reform or a law (§3.3): its own stated goal, and
 * an independent evaluation showing the indicator moved in that direction.
 * "Goal met" is checked from these numbers, not entered by hand.
 */
export interface ImpactEvidence {
  /** The purpose clause or official explanatory notes stating the goal. */
  goalSources: SourceRef[];
  intendedDirection: "increase" | "decrease";
  before: { value: number; date: string };
  after: { value: number; date: string };
  evaluationSources: SourceRef[];
}

interface AchievementBase {
  id: string;
  /** Signing date, final reading date, or decision date. */
  date: string;
  sources: SourceRef[];
}

/** §3.1. Credited only to the party of the prime minister leading the coalition. */
export interface PeaceAgreementCore extends AchievementBase {
  type: "peace-agreement";
  role: "prime-minister";
}

/** §3.2. Nationwide, with an officially stated scale, and a measured result. */
export interface ReformCore extends AchievementBase {
  type: "reform";
  role: "led";
  nationwide: true;
  scale: { value: number; sources: SourceRef[] };
  impact: ImpactEvidence;
}

/** §3.3. Only with a measured result showing the law met its own goal. */
export interface LegislationCore extends AchievementBase {
  type: "legislation";
  role: "initiated" | "sponsored";
  impact: ImpactEvidence;
}

export type AchievementCore = PeaceAgreementCore | ReformCore | LegislationCore;

/** §4.3. */
export type LegalStatus =
  | "under-investigation"
  | "indictment-pending-hearing"
  | "on-trial"
  | "convicted-appeal-pending"
  | "convicted-final"
  | "convicted-plea-final"
  | "acquitted"
  | "pardoned"
  | "closed"
  | "ended-other";

export const OPEN_LEGAL_STATUSES: ReadonlySet<LegalStatus> = new Set([
  "under-investigation",
  "indictment-pending-hearing",
  "on-trial",
  "convicted-appeal-pending",
]);

export const CONVICTION_STATUSES: ReadonlySet<LegalStatus> = new Set([
  "convicted-appeal-pending",
  "convicted-final",
  "convicted-plea-final",
]);

/** A criminal proceeding against the leader personally (§4). */
export interface LegalCaseCore {
  id: string;
  status: LegalStatus;
  /** When the proceeding began (e.g. investigation opened, indictment filed). */
  since: string;
  /** Required for concluded statuses, forbidden for open ones. */
  endedOn?: string;
  /** Only on convictions, and only when a court ruled on it. */
  moralTurpitude?: boolean;
  sources: SourceRef[];
}

export interface PartyTrackRecordCore {
  /** Snapshot date shown to visitors ("as of"). */
  asOf: string;
  /** Sources for who is #1 on the list submitted for the 26th Knesset (§2.2). */
  leaderSources: SourceRef[];
  predecessors: PredecessorCore[];
  knessetPeriods: KnessetPeriod[];
  achievements: AchievementCore[];
  legalCases: LegalCaseCore[];
}

/** §3.4: reforms + legislation shown per party. Peace agreements are uncapped. */
export const MAX_REFORMS_AND_LEGISLATION = 5;

/**
 * partyId → record. Empty until research is verified and reviewed (§6).
 * A party with no entry shows no track-record sections.
 */
export const trackRecordCore: Record<string, PartyTrackRecordCore> = {};
