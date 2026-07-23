"use client";

import { useState } from "react";
import { ChevronDown, BookOpen, HelpCircle, Key, Sparkles } from "lucide-react";
import { HotTopic } from "@/types";
import { cn } from "@/lib/utils";

export function TopicCard({ topic }: { topic: HotTopic }) {
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
        </div>
      )}
    </div>
  );
}
