"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  BookOpen,
  HelpCircle,
  Key,
  Shield,
  Sparkles,
} from "lucide-react";
import { parties } from "@/data/parties";
import { Topic } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";

interface PartyGroupProps {
  label: string;
  ids: string[];
  tone: "support" | "oppose" | "neutral";
}

function PartyGroup({ label, ids, tone }: PartyGroupProps) {
  const toneClasses: Record<typeof tone, string> = {
    support: "border-success/30 bg-success-light/30",
    oppose: "border-rose-300 bg-rose-50",
    neutral: "border-amber/30 bg-amber-light/30",
  };
  const dotClasses: Record<typeof tone, string> = {
    support: "bg-success",
    oppose: "bg-rose-600",
    neutral: "bg-amber",
  };

  return (
    <div className={cn("rounded-xl border p-4", toneClasses[tone])}>
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", dotClasses[tone])} />
        {label}
      </p>
      {ids.length === 0 ? (
        <p className="text-sm text-gray-dark">אין מפלגות בקטגוריה זו</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {ids.map((id) => {
            const party = parties.find((p) => p.id === id);
            if (!party) return null;
            return (
              <Link
                key={id}
                href={`/parties/${id}`}
                className="flex items-center gap-2 rounded-full border border-gray/60 bg-white py-1 pl-3 pr-1.5 text-sm font-medium text-navy transition-colors hover:border-sapphire"
              >
                <PartyLogo party={party} size="sm" />
                {party.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray/80 bg-white shadow-ambient transition-all duration-200 hover:shadow-ambient-lg">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-6 text-right cursor-pointer"
      >
        <div className="flex-1">
          <span className="mb-2 inline-block rounded-full bg-sapphire/10 px-3 py-1 text-xs font-semibold text-sapphire">
            {topic.category}
          </span>
          <h3 className="font-display text-xl font-normal text-navy">
            {topic.title}
          </h3>
          {!expanded && (
            <p className="mt-2 text-sm leading-relaxed text-gray-dark">
              {topic.hook}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-dark transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="flex flex-col gap-4 border-t border-gray px-6 pb-6 pt-4">
          <p className="text-sm font-medium italic leading-relaxed text-gray-dark">
            {topic.hook}
          </p>

          <div className="rounded-xl bg-gray-light p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gray-dark">
              <BookOpen className="h-3.5 w-3.5" />
              מה קורה כאן, במילים פשוטות
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {topic.simpleExplanation}
            </p>
          </div>

          {topic.keyTerm && (
            <div className="rounded-xl border border-amber/30 bg-amber-light/30 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber">
                <Key className="h-3.5 w-3.5" />
                מונח מפתח: {topic.keyTerm.term}
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {topic.keyTerm.definition}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-sapphire/20 bg-sapphire/5 p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-sapphire">
              <HelpCircle className="h-3.5 w-3.5" />
              למה יש על זה ויכוח?
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {topic.whyControversial}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-success/30 bg-success-light/40 p-4">
              <p className="mb-2 text-xs font-bold text-success">
                יש הטוענים בעד
              </p>
              <div className="flex flex-col gap-3">
                {topic.argumentsFor.map((arg, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-foreground">
                      {arg.title}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {arg.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4">
              <p className="mb-2 text-xs font-bold text-rose-700">
                ויש הטוענים נגד
              </p>
              <div className="flex flex-col gap-3">
                {topic.argumentsAgainst.map((arg, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-foreground">
                      {arg.title}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {arg.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {topic.funFact && (
            <div className="rounded-xl border border-dashed border-gold/50 bg-gold/5 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                עובדה מעניינת
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {topic.funFact}
              </p>
            </div>
          )}

          {topic.partyStancesSummary && (
            <div className="flex flex-col gap-3 border-t border-gray pt-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-navy">
                <Shield className="h-3.5 w-3.5" />
                איפה המפלגות עומדות?
              </p>
              <PartyGroup
                label="תומכים באופן פעיל"
                ids={topic.partyStancesSummary.support}
                tone="support"
              />
              <PartyGroup
                label="מתנגדים בתקיפות"
                ids={topic.partyStancesSummary.oppose}
                tone="oppose"
              />
              <PartyGroup
                label="מורכב / פשרה"
                ids={topic.partyStancesSummary.splitOrNeutral}
                tone="neutral"
              />
            </div>
          )}

          {topic.relatedQuestionId && (
            <Link
              href="/quiz?mode=long"
              className="inline-flex items-center gap-1 text-sm font-semibold text-sapphire hover:underline"
            >
              רוצה לענות על השאלה הקשורה בשאלון?
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
