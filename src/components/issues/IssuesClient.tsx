"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { issues, issueCategories } from "@/data/issues";
import { IssueCategory } from "@/types";
import { IssueCard } from "@/components/issues/IssueCard";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | IssueCategory;

export function IssuesClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredIssues = useMemo(() => {
    const q = query.trim();
    return issues.filter((issue) => {
      const matchesCategory = category === "all" || issue.category === category;
      const matchesQuery =
        !q ||
        issue.title.includes(q) ||
        issue.simpleExplanation.includes(q) ||
        issue.theDilemma.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="flex-1">
      <div className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-20 text-center sm:pt-24">
          <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">
            הנושאים המרכזיים בבחירות 2026
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            רוצה להבין באמת על מה הוויכוח? כאן תמצא את הסוגיות הבוערות
            מוסברות במילים פשוטות.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-dark" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='חפש לפי מילות מפתח (גיוס, עזה, בג"ץ, יוקר המחיה...)'
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
            {issueCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  category === cat
                    ? "border-sapphire bg-sapphire text-white"
                    : "border-gray bg-white text-navy hover:border-sapphire"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <p className="mt-14 text-center text-gray-dark">
            לא נמצאו נושאים התואמים את החיפוש.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
