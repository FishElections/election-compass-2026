import type { SourcePublisherId } from "./sources";
import { partyRecords } from "./parties/registry";

/**
 * Locale-independent facts for the veteran-party track record: key
 * achievements and the party leader's legal record.
 *
 * Every rule here comes from docs/track-record-methodology.md (currently
 * v1.5; the change log there records each rule change). The data is a
 * one-time static snapshot: nothing is fetched at runtime and every visitor
 * sees the same thing.
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

/**
 * Documented continuity with an earlier party, or a member party of a joint
 * list (§2.3). Its name is locale text.
 */
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
  /** The purpose clause, explanatory notes or decision text stating the goal. */
  goalSources: SourceRef[];
  intendedDirection: "increase" | "decrease";
  before: { value: number; date: string };
  after: { value: number; date: string };
  evaluationSources: SourceRef[];
}

/** A later repeal or replacement, stated on the card as a fact (§3.4 item 4). */
export interface RepealCore {
  date: string;
  sources: SourceRef[];
}

interface AchievementBase {
  id: string;
  /** Signing date, decision date, or final-reading date. */
  date: string;
  sources: SourceRef[];
  /**
   * When the item was led by a predecessor or a joint-list member party, its
   * predecessor id, so the card can name it ("Labor, which … continues").
   */
  creditedTo?: string;
}

/**
 * §3.1. Credited only to the party of the prime minister leading the
 * coalition. Since v1.6 only peace and normalization agreements are shown:
 * no complete dated list of diplomatic relations exists.
 */
export interface AgreementCore extends AchievementBase {
  type: "agreement";
  role: "prime-minister";
  category: "peace" | "normalization";
  /** ISO 3166-1 alpha-2, or "VA" for the Holy See. Names come from Intl. */
  country: string;
  /** "restore": relations existed before and were restored (v1.4). */
  relation: "establish" | "restore";
  /** false: "Signed; never took effect" (v1.3). */
  inForce: boolean;
  /** false: established or restored by announcement, no signed text (v1.4/v1.5). */
  signedText: boolean;
  /** Earlier steps inside the same item, e.g. a declaration before a treaty. */
  steps?: { id: string; date: string; sources: SourceRef[] }[];
}

/** §3.2. Nationwide, with an officially stated scale, and a measured result. */
export interface ReformCore extends AchievementBase {
  type: "reform";
  role: "led";
  nationwide: true;
  /** v1.4: an official market or population size also counts as scale. */
  scale: {
    kind: "budget" | "beneficiaries" | "units" | "market-size";
    value: number;
    sources: SourceRef[];
  };
  impact: ImpactEvidence;
  repealed?: RepealCore;
}

/** §3.3. Only with a measured result showing the law met its own goal. */
export interface LegislationCore extends AchievementBase {
  type: "legislation";
  role: "initiated" | "sponsored";
  impact: ImpactEvidence;
  repealed?: RepealCore;
}

/**
 * §3.4 item 3 (v1.3): shown only when no law passes §3.3. Up to 3, Basic Laws
 * first, then the largest official cost estimate, ties to the newest.
 * Labelled "Major legislation (impact not evaluated)".
 */
export interface MajorLegislationCore extends AchievementBase {
  type: "major-legislation";
  role: "initiated" | "sponsored";
  basicLaw: boolean;
  /** NIS, as stated in the official explanatory notes or cost note. */
  costEstimate?: { value: number; sources: SourceRef[] };
  repealed?: RepealCore;
}

export type AchievementCore =
  | AgreementCore
  | ReformCore
  | LegislationCore
  | MajorLegislationCore;

/** §4.3. */
export type LegalStatus =
  | "under-investigation"
  | "arrest-warrant-issued"
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
  "arrest-warrant-issued",
  "indictment-pending-hearing",
  "on-trial",
  "convicted-appeal-pending",
]);

export const CONVICTION_STATUSES: ReadonlySet<LegalStatus> = new Set([
  "convicted-appeal-pending",
  "convicted-final",
  "convicted-plea-final",
]);

/**
 * Where a proceeding takes place (§4.1, v1.2): "IL" for Israel, "ICC" for the
 * International Criminal Court, or another country's ISO 3166-1 alpha-2 code.
 * Country names come from Intl.DisplayNames, so they need no locale text.
 */
export type Jurisdiction = string;

/** A formally started criminal proceeding against the leader personally (§4). */
export interface LegalCaseCore {
  id: string;
  jurisdiction: Jurisdiction;
  status: LegalStatus;
  /** When the proceeding formally began (e.g. investigation opened, indictment filed). */
  since: string;
  /** Required for concluded statuses, forbidden for open ones. */
  endedOn?: string;
  /**
   * v1.2: false when the current status cannot be confirmed. The card then
   * says "Current status not confirmed. Last confirmed: <status> on <date>".
   */
  statusConfirmed: boolean;
  /** Required when statusConfirmed is false. */
  lastConfirmedOn?: string;
  /** Only on convictions, and only when a court ruled on it. */
  moralTurpitude?: boolean;
  sources: SourceRef[];
}

export interface PartyTrackRecordCore {
  /** Snapshot date shown to visitors ("as of"). */
  asOf: string;
  /**
   * Sources for who is #1 on the list submitted for the 26th Knesset (§2.2).
   * Required for veteran parties only; a non-veteran party's record holds just
   * its Knesset periods, so the card can say "Not applicable".
   */
  leaderSources: SourceRef[];
  /**
   * §4.4 (v1.2): what was searched for the legal record, listed in the ⓘ when
   * no case is found. Required for veteran parties with no legal cases.
   */
  legalSourcesChecked: SourceRef[];
  predecessors: PredecessorCore[];
  knessetPeriods: KnessetPeriod[];
  achievements: AchievementCore[];
  legalCases: LegalCaseCore[];
}

/** §3.4: reforms + laws with proven impact shown per party. Agreements are uncapped. */
export const MAX_REFORMS_AND_LEGISLATION = 5;

/** §3.4 item 3: at most this many "major legislation" items. */
export const MAX_MAJOR_LEGISLATION = 3;

/**
 * partyId → record, built from the per-party files in ./parties (§6: only
 * verified and reviewed facts). A party with no entry shows no sections.
 */
export const trackRecordCore: Record<string, PartyTrackRecordCore> = Object.fromEntries(
  Object.entries(partyRecords).map(([id, record]) => [id, record.core])
);
