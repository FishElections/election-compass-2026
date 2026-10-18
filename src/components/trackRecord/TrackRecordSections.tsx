"use client";

import { useId, useState } from "react";
import { Info } from "lucide-react";
import type { Party } from "@/types";
import {
  getPartyTrackRecord,
  getPublisherNames,
  type Achievement,
  type LegalCase,
  type PartyTrackRecord,
} from "@/data/trackRecord";
import type { SourceRef } from "@/data/trackRecord/core";
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
  const date = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });
  const number = new Intl.NumberFormat(locale);
  const shekels = new Intl.NumberFormat(locale, { style: "currency", currency: "ILS", maximumFractionDigits: 0 });
  const regions = new Intl.DisplayNames([locale], { type: "region" });
  return {
    date: (iso: string) => date.format(new Date(`${iso}T00:00:00Z`)),
    number: (value: number) => number.format(value),
    shekels: (value: number) => shekels.format(value),
    country: (code: string) => regions.of(code) ?? code,
  };
}

function SourceLinks({ sources }: { sources: SourceRef[] }) {
  const { locale } = useDictionary();
  const names = getPublisherNames(locale);
  return (
    <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
      {sources.map((source) => (
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

/** Tap-to-open explanation (not a hover tooltip, so it works on phones). */
function InfoDisclosure({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-gray px-3 text-xs font-semibold text-navy hover:border-sapphire"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </button>
      {open && (
        <div id={panelId} className="mt-2 rounded-xl bg-gray-light p-3 text-xs leading-relaxed text-navy">
          <p className="font-bold">{title}</p>
          <div className="mt-1">{children}</div>
        </div>
      )}
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
      <p className="mt-1.5 rounded-lg bg-gray-light px-2.5 py-1.5 text-xs font-semibold text-navy">
        {fill(t.result, {
          indicator: item.text.indicator ?? "",
          before: f.number(impact.before.value),
          beforeDate: f.date(impact.before.date),
          after: f.number(impact.after.value),
          afterDate: f.date(impact.after.date),
        })}
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
      {item.costEstimate && <p className="mt-1 text-xs text-gray-dark">{fill(t.cost, { value: f.shekels(item.costEstimate.value) })}</p>}
      {item.repealed && <p className="mt-1 text-xs font-semibold text-navy">{fill(t.repealed, { date: f.date(item.repealed.date) })}</p>}
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
  const standard = <InfoDisclosure label={t.infoButton} title={a.standardTitle}>{a.standard}</InfoDisclosure>;

  if (agreements.length + proven.length + major.length === 0) {
    return (
      <div>
        <p className="text-sm text-gray-dark">{a.empty}</p>
        {standard}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
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
      {proven.length === 0 && major.length > 0 && (
        <section>
          <h4 className="text-sm font-bold text-navy">{a.majorHeading}</h4>
          <p className="mb-2 mt-0.5 text-xs text-gray-dark">{a.majorNote}</p>
          <ul className="flex flex-col gap-2">{major.map((item) => <MajorLawItem key={item.id} item={item} t={a} />)}</ul>
        </section>
      )}
      {standard}
    </div>
  );
}

function LegalCaseItem({ legalCase, t }: { legalCase: LegalCase; t: Labels["legal"] }) {
  const f = useFormatters();
  const jurisdiction =
    legalCase.jurisdiction === "ICC" ? t.icc : f.country(legalCase.jurisdiction);
  const status = t.statuses[legalCase.status];
  const dates = legalCase.endedOn
    ? fill(t.period, { from: f.date(legalCase.since), to: f.date(legalCase.endedOn) })
    : fill(t.since, { date: f.date(legalCase.since) });
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

  if (record.legalCases.length === 0) {
    return (
      <div>
        <p className="text-sm text-gray-dark">{l.empty}</p>
        <InfoDisclosure label={l.sourcesCheckedTitle} title={l.sourcesCheckedTitle}>
          <SourceLinks sources={record.legalSourcesChecked} />
        </InfoDisclosure>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-lg border border-gray/80 bg-white px-3 py-2 text-xs leading-relaxed text-navy">
        {fill(l.intro, { leader: record.leaderName ?? "" })}
      </p>
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

  if (!record.isVeteran) {
    return (
      <div>
        {label}
        <p className="rounded-xl border border-dashed border-gray-dark/40 px-3 py-2.5 text-sm text-gray-dark">{t.notApplicable}</p>
      </div>
    );
  }

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
            <AchievementsBody party={party} record={record} t={t} />
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
