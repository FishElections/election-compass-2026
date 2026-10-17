/**
 * The closed source list from docs/track-record-methodology.md §5.
 *
 * A source that is not on this list cannot be stored: every SourceRef names
 * one of these publishers, and its URL must sit on one of that publisher's
 * hosts (see validatePartyTrackRecord). Adding or removing a *publisher* is a
 * methodology change (§8). Adding a missing *host* for a publisher already on
 * the list (e.g. an English-edition domain) is a data fix.
 *
 * Display names are user-facing text, so they live in the locale files
 * ({he,en,ar}.ts), not here.
 */

export type SourceKind = "official" | "evaluation" | "news";

export type SourcePublisherId =
  // Official (§5 primary)
  | "knesset"
  | "gov-il"
  | "police"
  | "attorney-general"
  | "state-attorney"
  | "courts"
  | "cec"
  | "reshumot"
  | "un-treaties"
  // Evaluation bodies (§3.2, §3.3)
  | "state-comptroller"
  | "bank-of-israel"
  | "cbs"
  | "knesset-ric"
  | "idi"
  | "peer-reviewed"
  // News outlets (only where the rules allow news)
  | "kan"
  | "haaretz"
  | "ynet"
  | "times-of-israel"
  | "jpost"
  | "globes"
  | "calcalist"
  | "walla"
  | "maariv"
  | "n12"
  | "israel-hayom";

export interface SourcePublisher {
  kind: SourceKind;
  /** A URL matches when its host equals one of these or is a subdomain of one. */
  hosts: string[];
  /**
   * Publishers that share an owner count as ONE source for the "2 independent
   * outlets" rule (§5). Defaults to the publisher's own id.
   */
  group?: string;
}

export const sourcePublishers: Record<SourcePublisherId, SourcePublisher> = {
  knesset: { kind: "official", hosts: ["knesset.gov.il"] },
  "gov-il": { kind: "official", hosts: ["www.gov.il"] },
  police: { kind: "official", hosts: ["www.gov.il"] },
  "attorney-general": { kind: "official", hosts: ["www.gov.il"] },
  "state-attorney": { kind: "official", hosts: ["www.gov.il"] },
  courts: { kind: "official", hosts: ["court.gov.il"] },
  cec: { kind: "official", hosts: ["bechirot.gov.il"] },
  reshumot: { kind: "official", hosts: ["www.gov.il"] },
  "un-treaties": { kind: "official", hosts: ["treaties.un.org"] },

  "state-comptroller": { kind: "evaluation", hosts: ["mevaker.gov.il"] },
  "bank-of-israel": { kind: "evaluation", hosts: ["boi.org.il"] },
  cbs: { kind: "evaluation", hosts: ["cbs.gov.il"] },
  "knesset-ric": { kind: "evaluation", hosts: ["knesset.gov.il"] },
  idi: { kind: "evaluation", hosts: ["idi.org.il"] },
  // Peer-reviewed studies are cited by DOI so the host is fixed.
  "peer-reviewed": { kind: "evaluation", hosts: ["doi.org"] },

  kan: { kind: "news", hosts: ["kan.org.il"] },
  haaretz: { kind: "news", hosts: ["haaretz.co.il", "haaretz.com"] },
  ynet: { kind: "news", hosts: ["ynet.co.il", "ynetnews.com"], group: "yedioth" },
  "times-of-israel": { kind: "news", hosts: ["timesofisrael.com"] },
  jpost: { kind: "news", hosts: ["jpost.com"] },
  globes: { kind: "news", hosts: ["globes.co.il"] },
  calcalist: { kind: "news", hosts: ["calcalist.co.il", "calcalistech.com"], group: "yedioth" },
  walla: { kind: "news", hosts: ["walla.co.il"] },
  maariv: { kind: "news", hosts: ["maariv.co.il"] },
  n12: { kind: "news", hosts: ["mako.co.il", "n12.co.il"] },
  "israel-hayom": { kind: "news", hosts: ["israelhayom.co.il", "israelhayom.com"] },
};

export const sourcePublisherIds = Object.keys(sourcePublishers) as SourcePublisherId[];

/** Archived copies (§5) may only point here. */
export const ARCHIVE_HOST = "web.archive.org";

export function hostMatches(host: string, allowed: string): boolean {
  return host === allowed || host.endsWith(`.${allowed}`);
}
