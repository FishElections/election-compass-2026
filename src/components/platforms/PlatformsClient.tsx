"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { parties } from "@/data/parties";
import { platformTopics } from "@/data/platformTopics";
import { PlatformTopicKey } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CategoryFilter = "all" | PlatformTopicKey;

export function PlatformsClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredParties = useMemo(() => {
    const q = query.trim();
    if (!q) return parties;
    return parties.filter(
      (party) => party.name.includes(q) || party.leader.includes(q)
    );
  }, [query]);

  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-20 text-center sm:pt-24">
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            סיכומי מצעי המפלגות לבחירות 2026
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-dark">
            סקירה ניטרלית, תמציתית ומקיפה של עמדות המפלגות בנושאי הליבה.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-dark" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפש לפי שם מפלגה או מנהיג"
              className="w-full rounded-xl border-2 border-gray bg-white py-3 pr-11 pl-4 text-sm text-foreground shadow-ambient placeholder:text-gray-dark focus:border-sapphire focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                category === "all"
                  ? "border-sapphire bg-sapphire text-white"
                  : "border-gray bg-white text-navy hover:border-sapphire"
              )}
            >
              הכל
            </button>
            {platformTopics.map((topic) => (
              <button
                key={topic.key}
                type="button"
                onClick={() => setCategory(topic.key)}
                className={cn(
                  "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  category === topic.key
                    ? "border-sapphire bg-sapphire text-white"
                    : "border-gray bg-white text-navy hover:border-sapphire"
                )}
              >
                {topic.icon} {topic.label}
              </button>
            ))}
          </div>
        </div>

        {filteredParties.length === 0 ? (
          <p className="mt-14 text-center text-gray-dark">
            לא נמצאו מפלגות התואמות את החיפוש.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredParties.map((party) => {
              const topicsToShow =
                category === "all"
                  ? party.platform
                  : party.platform.filter((t) => t.topicKey === category);

              return (
                <div
                  key={party.id}
                  className="overflow-hidden rounded-2xl border border-gray/80 bg-white shadow-ambient transition-all duration-200 hover:-translate-y-0.5 hover:shadow-ambient-lg"
                >
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: party.color }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <PartyLogo party={party} size="md" />
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-navy">
                          {party.name}
                        </h2>
                        <p className="truncate text-sm text-gray-dark">
                          {party.leader} · {party.spectrum}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-gray-light px-4 py-3 text-sm leading-relaxed text-navy">
                      {party.shortDescription}
                    </div>

                    <div className="mt-4">
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={
                          category !== "all" ? topicsToShow[0]?.topicKey : undefined
                        }
                        key={category}
                      >
                        {topicsToShow.map((topic) => (
                          <AccordionItem key={topic.topicKey} value={topic.topicKey}>
                            <AccordionTrigger>
                              {platformTopics.find((t) => t.key === topic.topicKey)?.icon}{" "}
                              {topic.topicName}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="mb-3 text-sm leading-relaxed text-foreground">
                                {topic.summary}
                              </p>
                              <ul className="flex flex-col gap-1.5">
                                {topic.bulletPoints.map((point) => (
                                  <li
                                    key={point}
                                    className="flex items-start gap-2 text-sm text-gray-dark"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sapphire" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
