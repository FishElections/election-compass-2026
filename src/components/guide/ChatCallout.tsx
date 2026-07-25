/**
 * שובר-מיתוס בסגנון שיחת צ'אט: "אתם" שואלים, "🧭 המדריך" עונה.
 * שמור לרגעי ה"רגע, מה?!" הגדולים - פעמיים-שלוש בעמוד, לא יותר.
 */
export function ChatCallout({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <div className="max-w-[82%] self-start rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[14.5px] leading-relaxed shadow-ambient">
        <span className="block text-[11px] font-bold text-gray-dark/70">
          אתם
        </span>
        {question}
      </div>
      <div className="max-w-[82%] self-end rounded-2xl rounded-bl-md bg-sapphire px-4 py-2.5 text-[14.5px] leading-relaxed text-white shadow-ambient">
        <span className="block text-[11px] font-bold text-white/70">
          🧭 המדריך
        </span>
        {answer}
      </div>
    </div>
  );
}
