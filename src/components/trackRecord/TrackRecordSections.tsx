"use client";

import { HelpCircle } from "lucide-react";
import type { Party } from "@/types";
import {
  getPartyTrackRecord,
  getPublisherNames,
  type Achievement,
  type LegalCase,
  type PartyTrackRecord,
} from "@/data/trackRecord";
import type { SourceRef } from "@/data/trackRecord/core";
import { sourcePublishers, type SourceKind } from "@/data/trackRecord/sources";
import { compareMajorLegislation } from "@/utils/trackRecord";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { cn } from "@/lib/utils";

/**
 * The veteran-party track record (docs/track-record-methodology.md): key
 * achievements and the party leader's legal record, each with its sources.
 *
 * Shown collapsed on the /platforms card and the mobile party sheet, and
 * opened on the party profile page. Everything comes from the static data in
 * src/data/trackRecord; nothing is fetched or computed per visitor.
 */

type Labels = ReturnType<typeof useDictionary>["dict"]["trackRecord"];

function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

function useFormatters() {
  const { locale } = useDictionary();
  // UTC so a stored date is never shifted a day by the visitor's time zone.
  const date = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const yearOnly = new Intl.DateTimeFormat(locale, { year: "numeric", timeZone: "UTC" });
  const monthYear = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", timeZone: "UTC" });
  const number = new Intl.NumberFormat(locale);
  const compact = new Intl.NumberFormat(locale, { notation: "compact", compactDisplay: "long", maximumFractionDigits: 1 });
  const shekels = new Intl.NumberFormat(locale, { style: "currency", currency: "ILS", notation: "compact", compactDisplay: "long", maximumFractionDigits: 1 });
  const regions = new Intl.DisplayNames([locale], { type: "region" });
  return {
    date: (iso: string) => date.format(new Date(`${iso}T00:00:00Z`)),
    year: (iso: string) => yearOnly.format(new Date(`${iso}T00:00:00Z`)),
    /** Shows only as much of the date as the sources give. */
    precise: (iso: string, precision?: "year" | "month") =>
      (precision === "year" ? yearOnly : precision === "month" ? monthYear : date).format(new Date(`${iso}T00:00:00Z`)),
    number: (value: number) => (Math.abs(value) >= 1_000_000 ? compact.format(value) : number.format(value)),
    shekels: (value: number) => shekels.format(value),
    country: (code: string) => regions.of(code) ?? code,
  };
}

const MAX_SOURCES = 3;
const KIND_ORDER: Record<SourceKind, number> = { official: 0, evaluation: 1, news: 2 };

/** §5 (v1.7): at most 3 links, one per publisher, official sources first. */
export function pickSources(sources: SourceRef[]): SourceRef[] {
  const seen = new Set<string>();
  return [...sources]
    .sort((a, b) => KIND_ORDER[sourcePublishers[a.publisher].kind] - KIND_ORDER[sourcePublishers[b.publisher].kind])
    .filter((source) => {
      if (seen.has(source.publisher)) return false;
      seen.add(source.publisher);
      return true;
    })
    .slice(0, MAX_SOURCES);
}

function SourceLinks({ sources }: { sources: SourceRef[] }) {
  const { locale } = useDictionary();
  const names = getPublisherNames(locale);
  return (
    <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
      {pickSources(sources).map((source) => (
        <li key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center text-xs font-semibold text-sapphire hover:underline"
          >
            {names[source.publisher]} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The site's explanation box (same look as the hot-topics sheet). */
function ExplainBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-sapphire/20 bg-sapphire/5 p-4">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-sapphire">
        <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </p>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function Chip({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold text-navy",
        outline ? "border border-gray-dark/40 bg-white" : "bg-gray"
      )}
    >
      {children}
    </span>
  );
}

function AgreementItem({ item, party, record, t }: { item: Achievement; party: Party; record: PartyTrackRecord; t: Labels["achievements"] }) {
  const f = useFormatters();
  if (item.type !== "agreement") return null;
  const credited = item.creditedTo
    ? fill(t.continues, { predecessor: record.predecessorNames[item.creditedTo], party: party.name })
    : party.name;
  return (
    <li className="rounded-xl border border-gray/80 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{item.category === "peace" ? t.peace : t.normalization}</Chip>
        <span className="text-xs text-gray-dark">{f.country(item.country)} · {f.date(item.date)}</span>
      </div>
      <p className="mt-1.5 font-semibold text-navy">{item.text.title}</p>
      <p className="mt-0.5 text-xs text-gray-dark">
        {fill(t.signedUnder, { pm: item.text.primeMinister ?? "", party: credited })}
      </p>
      {!item.inForce && <p className="mt-1 text-xs font-semibold text-navy">{t.neverInForce}</p>}
      {item.steps?.map((step) => (
        <p key={step.id} className="mt-1 text-xs text-gray-dark">
          {fill(t.includes, { step: item.text.steps?.[step.id] ?? "", date: f.date(step.date) })}
        </p>
      ))}
      <SourceLinks sources={item.sources} />
    </li>
  );
}

function ProvenItem({ item, party, record, t }: { item: Achievement; party: Party; record: PartyTrackRecord; t: Labels["achievements"] }) {
  const f = useFormatters();
  const { dir } = useDictionary();
  if (item.type !== "reform" && item.type !== "legislation") return null;
  const { impact } = item;
  return (
    <li className="rounded-xl border border-gray/80 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{item.type === "reform" ? t.reform : t.law}</Chip>
        <span className="text-xs text-gray-dark">{f.date(item.date)}</span>
        {item.creditedTo && (
          <span className="text-xs text-gray-dark">{fill(t.continues, { predecessor: record.predecessorNames[item.creditedTo], party: party.name })}</span>
        )}
      </div>
      <p className="mt-1.5 font-semibold text-navy">{item.text.title}</p>
      <p className="mt-0.5 text-sm text-gray-dark">{item.text.summary}</p>
      {item.type === "reform" && (
        <p className="mt-1 text-xs text-gray-dark">
          {fill(t.scale, { value: f.number(item.scale.value), unit: item.text.scaleUnit ?? "" })}
        </p>
      )}
      {/* Each value sits in its own <bdi> so right-to-left text can't
          reorder the numbers and years; the arrow follows reading direction. */}
      <p className="mt-1.5 rounded-lg bg-gray-light px-2.5 py-1.5 text-xs text-navy">
        <span className="block">{item.text.indicator}</span>
        <span className="block font-semibold">
          <bdi>{f.number(impact.before.value)} ({f.year(impact.before.date)})</bdi>
          {dir === "rtl" ? " ← " : " → "}
          <bdi>{f.number(impact.after.value)} ({f.year(impact.after.date)})</bdi>
        </span>
      </p>
      {item.repealed && <p className="mt-1 text-xs font-semibold text-navy">{fill(t.repealed, { date: f.date(item.repealed.date) })}</p>}
      <p className="mt-1.5 text-xs text-gray-dark">{t.evaluatedBy}</p>
      <SourceLinks sources={impact.evaluationSources} />
      <SourceLinks sources={item.sources} />
    </li>
  );
}

function MajorLawItem({ item, t }: { item: Achievement; t: Labels["achievements"] }) {
  const f = useFormatters();
  if (item.type !== "major-legislation") return null;
  return (
    <li className="rounded-xl border border-dashed border-gray-dark/40 p-3">
      <div className="flex flex-wrap items-center gap-2">
        {item.basicLaw && <Chip outline>{t.basicLaw}</Chip>}
        <span className="text-xs text-gray-dark">{f.date(item.date)} · {item.role === "initiated" ? t.initiated : t.sponsored}</span>
      </div>
      <p className="mt-1.5 font-semibold text-navy">{item.text.title}</p>
      <p className="mt-0.5 text-sm text-gray-dark">{item.text.summary}</p>
      <p className="mt-1 text-xs text-navy">{fill(t.ledBy, { name: item.text.ledBy ?? "" })}</p>
      <p className="mt-1 text-xs text-gray-dark">
        {item.basicLaw
          ? t.whyBasicLaw
          : fill(t.whyCost, { value: item.costEstimate ? f.shekels(item.costEstimate.value) : "" })}
      </p>
      <SourceLinks sources={item.sources} />
    </li>
  );
}

function AchievementsBody({ party, record, t }: { party: Party; record: PartyTrackRecord; t: Labels }) {
  const a = t.achievements;
  const newestFirst = (x: Achievement, y: Achievement) => (x.date < y.date ? 1 : x.date > y.date ? -1 : 0);
  const agreements = record.achievements.filter((x) => x.type === "agreement").sort(newestFirst);
  const proven = record.achievements.filter((x) => x.type === "reform" || x.type === "legislation").sort(newestFirst);
  const major = record.achievements
    .filter((x) => x.type === "major-legislation")
    .sort((x, y) => (x.type === "major-legislation" && y.type === "major-legislation" ? compareMajorLegislation(x, y) : 0));
  const standard = <ExplainBox title={a.standardTitle}>{a.standard}</ExplainBox>;

  if (agreements.length + proven.length + major.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        {standard}
        <p className="text-sm text-gray-dark">{a.empty}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {standard}
      {agreements.length > 0 && (
        <section>
          <h4 className="mb-2 text-sm font-bold text-navy">{a.agreementsHeading}</h4>
          <ul className="flex flex-col gap-2">{agreements.map((item) => <AgreementItem key={item.id} item={item} party={party} record={record} t={a} />)}</ul>
        </section>
      )}
      {proven.length > 0 && (
        <section>
          <h4 className="mb-2 text-sm font-bold text-navy">{a.provenHeading}</h4>
          <ul className="flex flex-col gap-2">{proven.map((item) => <ProvenItem key={item.id} item={item} party={party} record={record} t={a} />)}</ul>
        </section>
      )}
      {!proven.some((x) => x.type === "legislation") && major.length > 0 && (
        <section>
          <h4 className="mb-2 text-sm font-bold text-navy">{a.majorHeading}</h4>
          <ul className="flex flex-col gap-2">{major.map((item) => <MajorLawItem key={item.id} item={item} t={a} />)}</ul>
        </section>
      )}
    </div>
  );
}

function LegalCaseItem({ legalCase, t }: { legalCase: LegalCase; t: Labels["legal"] }) {
  const f = useFormatters();
  const jurisdiction =
    legalCase.jurisdiction === "ICC" ? t.icc : f.country(legalCase.jurisdiction);
  const status = t.statuses[legalCase.status];
  const since = f.precise(legalCase.since, legalCase.sincePrecision);
  const dates = legalCase.endedOn
    ? fill(t.period, { from: since, to: f.precise(legalCase.endedOn, legalCase.endedPrecision) })
    : legalCase.endDateUnknown
      ? fill(t.periodEndUnknown, { from: since })
      : fill(t.since, { date: since });
  // §4.4: open cases and convictions still under appeal carry the line.
  const presumption = legalCase.isOpen || !legalCase.statusConfirmed;
  return (
    <li className="rounded-xl border border-gray/80 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{status}</Chip>
        <span className="text-xs text-gray-dark">{jurisdiction} · {dates}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-navy">{legalCase.text.description}</p>
      {!legalCase.statusConfirmed && legalCase.lastConfirmedOn && (
        <p className="mt-1 text-xs font-semibold text-navy">
          {fill(t.notConfirmed, { status, date: f.date(legalCase.lastConfirmedOn) })}
        </p>
      )}
      {legalCase.moralTurpitude && <p className="mt-1 text-xs text-navy">{t.moralTurpitude}</p>}
      {presumption && <p className="mt-1.5 rounded-lg bg-gray-light px-2.5 py-1.5 text-xs text-navy">{t.presumption}</p>}
      <SourceLinks sources={legalCase.sources} />
    </li>
  );
}

function LegalBody({ record, t }: { record: PartyTrackRecord; t: Labels }) {
  const l = t.legal;
  const newestFirst = (x: LegalCase, y: LegalCase) => (x.since < y.since ? 1 : x.since > y.since ? -1 : 0);
  const open = record.legalCases.filter((c) => c.isOpen).sort(newestFirst);
  const concluded = record.legalCases.filter((c) => !c.isOpen).sort(newestFirst);

  const scope = <ExplainBox title={l.scopeTitle}>{fill(l.intro, { leader: record.leaderName ?? "" })}</ExplainBox>;

  if (record.legalCases.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        {scope}
        <p className="text-sm text-gray-dark">{l.empty}</p>
        <div>
          <p className="text-xs font-bold text-gray-dark">{l.sourcesCheckedTitle}</p>
          <SourceLinks sources={record.legalSourcesChecked} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {scope}
      {[{ heading: l.open, cases: open }, { heading: l.concluded, cases: concluded }].map(
        (group) =>
          group.cases.length > 0 && (
            <section key={group.heading}>
              <h4 className="mb-2 text-sm font-bold text-navy">{group.heading} ({group.cases.length})</h4>
              <ul className="flex flex-col gap-2">{group.cases.map((c) => <LegalCaseItem key={c.id} legalCase={c} t={l} />)}</ul>
            </section>
          )
      )}
    </div>
  );
}

export function TrackRecordSections({ party, expanded = false }: { party: Party; expanded?: boolean }) {
  const { dict, locale } = useDictionary();
  const f = useFormatters();
  const t = dict.trackRecord;
  const record = getPartyTrackRecord(locale, party.id);
  if (!record) return null;

  const asOf = <p className="mt-2 text-xs text-gray-dark">{fill(t.asOf, { date: f.date(record.asOf) })}</p>;
  const label = (
    <div className="mb-1 mt-4 flex items-center gap-2.5">
      <span className="whitespace-nowrap text-xs font-bold text-gray-dark">{t.sectionLabel}</span>
      <div className="h-px flex-1 bg-gray" />
    </div>
  );

  const openCount = record.legalCases.filter((c) => c.isOpen).length;
  const concludedCount = record.legalCases.length - openCount;
  const achievementCount = record.achievements.length;

  return (
    <div>
      {label}
      <Accordion type="multiple" defaultValue={expanded ? ["achievements", "legal"] : []}>
        <AccordionItem value="achievements">
          <AccordionTrigger>
            <span className="inline-flex items-center gap-2">
              {t.achievements.heading}
              {achievementCount > 0 && <Chip>{f.number(achievementCount)}</Chip>}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {record.isVeteran ? (
              <AchievementsBody party={party} record={record} t={t} />
            ) : (
              <p className="text-sm text-gray-dark">{t.notApplicable}</p>
            )}
            {asOf}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="legal">
          <AccordionTrigger>
            <span className="inline-flex flex-wrap items-center gap-2">
              {t.legal.heading}
              {record.legalCases.length > 0 && (
                <Chip>
                  {[
                    openCount > 0 ? fill(t.legal.countOpen, { n: f.number(openCount) }) : null,
                    concludedCount > 0 ? fill(t.legal.countConcluded, { n: f.number(concludedCount) }) : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </Chip>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <LegalBody record={record} t={t} />
            {asOf}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
