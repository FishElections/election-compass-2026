"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronLeft } from "lucide-react";
import { hotTopics, topicCategories } from "@/data/hotTopics";
import { TopicCategory } from "@/types";
import { TopicCard } from "@/components/topics/TopicCard";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | TopicCategory;

export function HotTopicsClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredTopics = useMemo(() => {
    const q = query.trim();
    return hotTopics.filter((topic) => {
      const matchesCategory = category === "all" || topic.category === category;
      const matchesQuery =
        !q ||
        topic.title.includes(q) ||
        topic.hook.includes(q) ||
        topic.simpleExplanation.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="flex-1">
      <div className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-20 text-center sm:pt-24">
          <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">
            🔥 הנושאים החמים
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            בואו נבין ביחד: על מה כולם רבים עכשיו? הסברים פשוטים לסוגיות
            הכי שנויות במחלוקת במדינה, בלי קשר למפלגות, בלי צד, ובשפה שכל
            אחד יכול להבין.
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
              placeholder="חפש נושא (למשל: שופטים, גיוס, שבת...)"
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
            {topicCategories.map((cat) => (
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

        {filteredTopics.length === 0 ? (
          <p className="mt-14 text-center text-gray-dark">
            לא נמצאו נושאים התואמים את החיפוש.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-gray/80 bg-gray-light p-6 text-center">
          <p className="text-sm text-gray-dark">
            רוצים לדעת גם מה עמדות המפלגות בנושאים האלה?
          </p>
          <Link
            href="/issues"
            className="flex items-center gap-1 text-sm font-semibold text-sapphire hover:underline"
          >
            עברו לעמוד הנושאים המרכזיים לבחירות
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
