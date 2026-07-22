"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, BookOpen, Scale, Shield } from "lucide-react";
import { parties } from "@/data/parties";
import { PoliticalIssue } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";

type Tab = "explain" | "arguments" | "parties";

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "explain", label: "במילים פשוטות והדילמה", icon: BookOpen },
  { id: "arguments", label: "טיעוני בעד ונגד", icon: Scale },
  { id: "parties", label: "איפה המפלגות עומדות?", icon: Shield },
];

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

export function IssueCard({ issue }: { issue: PoliticalIssue }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("explain");

  return (
    <div className="overflow-hidden rounded-2xl border border-gray/80 bg-white shadow-ambient transition-all duration-200 hover:shadow-ambient-lg">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-6 text-right cursor-pointer"
      >
        <div className="flex-1">
          <span className="mb-2 inline-block rounded-full bg-sapphire/10 px-3 py-1 text-xs font-semibold text-sapphire">
            {issue.category}
          </span>
          <h3 className="font-display text-xl font-normal text-navy">
            {issue.title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gray-dark transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="border-t border-gray px-6 pb-6 pt-4">
          <div className="mb-5 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                  activeTab === tab.id
                    ? "border-sapphire bg-sapphire text-white"
                    : "border-gray bg-white text-navy hover:border-sapphire"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "explain" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-gray-light p-4">
                <p className="mb-1 text-xs font-bold text-gray-dark">
                  📖 במילים פשוטות
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {issue.simpleExplanation}
                </p>
              </div>
              <div className="rounded-xl border border-sapphire/20 bg-sapphire/5 p-4">
                <p className="mb-1 text-xs font-bold text-sapphire">
                  מה הדילמה המרכזית?
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {issue.theDilemma}
                </p>
              </div>
            </div>
          )}

          {activeTab === "arguments" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-success/30 bg-success-light/40 p-4">
                <p className="mb-1 text-sm font-bold text-success">
                  {issue.proArgument.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {issue.proArgument.text}
                </p>
              </div>
              <div className="rounded-xl border border-rose-300 bg-rose-50 p-4">
                <p className="mb-1 text-sm font-bold text-rose-700">
                  {issue.conArgument.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {issue.conArgument.text}
                </p>
              </div>
            </div>
          )}

          {activeTab === "parties" && (
            <div className="flex flex-col gap-4">
              <PartyGroup
                label="תומכים באופן פעיל"
                ids={issue.partyStancesSummary.support}
                tone="support"
              />
              <PartyGroup
                label="מתנגדים בתקיפות"
                ids={issue.partyStancesSummary.oppose}
                tone="oppose"
              />
              <PartyGroup
                label="מורכב / פשרה"
                ids={issue.partyStancesSummary.splitOrNeutral}
                tone="neutral"
              />
            </div>
          )}

          <Link
            href="/quiz?mode=long"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sapphire hover:underline"
          >
            רוצה לענות על השאלה הקשורה בשאלון?
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
