import { getCategories } from "@/data/questions";
import { CategoryId } from "@/types";
import { useDictionary } from "@/i18n/DictionaryProvider";

export function CategoryBadge({ category }: { category: CategoryId }) {
  const { locale } = useDictionary();
  const cat = getCategories(locale).find((c) => c.id === category);
  if (!cat) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sapphire/10 px-4 py-1.5 text-sm font-semibold text-sapphire">
      <span>{cat.icon}</span>
      <span>{cat.label}</span>
    </span>
  );
}
