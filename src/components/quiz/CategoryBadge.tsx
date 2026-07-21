import { categories } from "@/data/questions";
import { CategoryId } from "@/types";

export function CategoryBadge({ category }: { category: CategoryId }) {
  const cat = categories.find((c) => c.id === category);
  if (!cat) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sapphire/10 px-4 py-1.5 text-sm font-semibold text-sapphire">
      <span>{cat.icon}</span>
      <span>{cat.label}</span>
    </span>
  );
}
