import { Topic, TopicCategory } from "@/types";
import { categorySlugs } from "@/data/hotTopics";
import { TopicCard } from "@/components/topics/TopicCard";

interface TopicShelfProps {
  category: TopicCategory;
  icon: string;
  topics: Topic[];
  isOpened: (id: string) => boolean;
  onOpenTopic: (topic: Topic) => void;
}

export function TopicShelf({
  category,
  icon,
  topics,
  isOpened,
  onOpenTopic,
}: TopicShelfProps) {
  if (topics.length === 0) return null;

  return (
    <section id={`aisle-${categorySlugs[category]}`} className="scroll-mt-24 py-4">
      <div className="mb-3 flex items-baseline gap-2">
        <span aria-hidden className="text-lg">
          {icon}
        </span>
        <h2 className="font-display text-lg font-normal text-navy">{category}</h2>
        <span className="text-xs text-gray-dark">{topics.length} נושאים</span>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {topics.map((topic) => (
          <div key={topic.id} className="w-[260px] shrink-0 sm:w-[280px]">
            <TopicCard
              topic={topic}
              done={isOpened(topic.id)}
              onOpen={() => onOpenTopic(topic)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
