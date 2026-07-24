"use client";

import { ChevronLeft } from "lucide-react";
import { Topic } from "@/types";
import { categoryIcons } from "@/data/hotTopics";
import { getStanceBreakdown } from "@/lib/topicStance";

interface TopicCardProps {
  topic: Topic;
  done: boolean;
  onOpen: () => void;
}

export function TopicCard({ topic, done, onOpen }: TopicCardProps) {
  const breakdown = getStanceBreakdown(topic);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray/80 bg-white text-right shadow-ambient transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ambient-lg cursor-pointer"
    >
      {done && (
        <span
          aria-hidden
          className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-2xl bg-success text-sm font-bold text-white"
        >
          ✓
        </span>
      )}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sapphire/10 px-3 py-1 text-xs font-semibold text-sapphire">
          <span aria-hidden>{categoryIcons[topic.category]}</span>
          {topic.category}
        </span>
        <h3 className="font-display text-lg font-normal leading-snug text-navy">
          {topic.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-dark">
          {topic.hook}
        </p>
      </div>

      {breakdown ? (
        <div className="flex h-1.5 w-full" aria-hidden>
          <span className="h-full bg-success" style={{ width: `${breakdown.supportPct}%` }} />
          <span className="h-full bg-danger" style={{ width: `${breakdown.opposePct}%` }} />
          <span className="h-full bg-amber" style={{ width: `${breakdown.neutralPct}%` }} />
        </div>
      ) : (
        <div className="h-1.5 w-full bg-gray" aria-hidden />
      )}

      <div className="flex items-center justify-between gap-2 border-t border-gray/60 px-5 py-3">
        <span className="text-xs font-medium text-gray-dark">
          {breakdown ? breakdown.label : "אין עדיין מיפוי מפלגתי"}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-sapphire">
          {done ? "לפתוח שוב" : "בואו נבין"}
          <ChevronLeft className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}
