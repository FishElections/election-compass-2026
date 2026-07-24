"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categoryIcons, categorySlugs, hotTopics, topicCategories } from "@/data/hotTopics";
import { Topic, TopicCategory } from "@/types";
import { TopicCard } from "@/components/topics/TopicCard";
import { TopicShelf } from "@/components/topics/TopicShelf";
import { TopicDetailSheet } from "@/components/topics/TopicDetailSheet";
import { useTopicProgress } from "@/hooks/useTopicProgress";

export function HotTopicsClient() {
  const [query, setQuery] = useState("");
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const { openedIds, isOpened, markOpened } = useTopicProgress();

  const trimmedQuery = query.trim();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return null;
    return hotTopics.filter(
      (topic) =>
        topic.title.includes(trimmedQuery) ||
        topic.hook.includes(trimmedQuery) ||
        topic.simpleExplanation.includes(trimmedQuery)
    );
  }, [trimmedQuery]);

  const activeTopic = useMemo(
    () => hotTopics.find((t) => t.id === activeTopicId) ?? null,
    [activeTopicId]
  );

  const total = hotTopics.length;
  const openedCount = openedIds.length;
  const allDone = openedCount >= total;

  function scrollToAisle(category: TopicCategory) {
    document
      .getElementById(`aisle-${categorySlugs[category]}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="flex-1">
      <div className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-20 text-center sm:pt-24">
          <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">
            🔥 הנושאים החמים
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            בואו נבין ביחד: על מה כולם רבים עכשיו? הסברים פשוטים ונטולי-צד
            לסוגיות הכי שנויות במחלוקת במדינה - ולמי שרוצה להעמיק, גם מיפוי
            של איפה כל מפלגה עומדת.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div id="topics-top" className="flex scroll-mt-24 flex-col gap-4">
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

          {!trimmedQuery && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("topics-top")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="rounded-full border-2 border-gray bg-white px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:border-sapphire cursor-pointer"
              >
                הכל
              </button>
              {topicCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => scrollToAisle(cat)}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-gray bg-white px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:border-sapphire cursor-pointer"
                >
                  <span aria-hidden>{categoryIcons[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-gray bg-white px-4 py-3 shadow-ambient">
            <span aria-hidden className="text-lg">
              🧺
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray">
              <div
                className="h-full rounded-full bg-gradient-to-l from-sapphire to-gold transition-all duration-500"
                style={{ width: `${total ? (openedCount / total) * 100 : 0}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-xs font-bold text-navy">
              {openedCount}/{total} נושאים
            </span>
          </div>
          {allDone && (
            <p className="text-center text-sm font-semibold text-success">
              עברתם על כל הנושאים החמים 🎉 כל הכבוד!
            </p>
          )}
        </div>

        {trimmedQuery ? (
          searchResults && searchResults.length === 0 ? (
            <p className="mt-14 text-center text-gray-dark">
              לא נמצאו נושאים התואמים את החיפוש.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {searchResults?.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  done={isOpened(topic.id)}
                  onOpen={() => setActiveTopicId(topic.id)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="mt-4 flex flex-col divide-y divide-gray/60">
            {topicCategories.map((cat) => (
              <TopicShelf
                key={cat}
                category={cat}
                icon={categoryIcons[cat]}
                topics={hotTopics.filter((t) => t.category === cat)}
                isOpened={isOpened}
                onOpenTopic={(topic: Topic) => setActiveTopicId(topic.id)}
              />
            ))}
          </div>
        )}
      </div>

      <TopicDetailSheet
        topic={activeTopic}
        isOpened={isOpened}
        onMarkDone={markOpened}
        onClose={() => setActiveTopicId(null)}
      />
    </main>
  );
}
