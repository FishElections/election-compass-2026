import { useDictionary } from "@/i18n/DictionaryProvider";

/**
 * Chat-style myth-buster: "you" ask, "🧭 guide" answers.
 * Reserved for the big "wait, what?!" moments — two or three per page, no more.
 */
export function ChatCallout({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const { dict } = useDictionary();
  const t = dict.guide.chatLabels;

  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="max-w-[82%] self-start rounded-2xl rounded-es-md bg-white px-4 py-2.5 text-[14.5px] leading-relaxed shadow-ambient">
        <span className="block text-[11px] font-bold text-gray-dark/70">
          {t.you}
        </span>
        {question}
      </div>
      <div className="max-w-[82%] self-end rounded-2xl rounded-ee-md bg-sapphire px-4 py-2.5 text-[14.5px] leading-relaxed text-white shadow-ambient">
        <span className="block text-[11px] font-bold text-white/70">
          {t.guide}
        </span>
        {answer}
      </div>
    </div>
  );
}
