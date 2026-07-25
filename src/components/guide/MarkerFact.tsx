import { GuideFact } from "@/data/electionGuide";

/**
 * עובדה בסגנון "מרקר, בלי מסגרת": אימוג'י בצד, מילה פותחת בענבר,
 * והקטע המסומן ב-[[ ]] מקבל מריחת מרקר עדינה.
 */
export function MarkerFact({ fact }: { fact: GuideFact }) {
  const parts = fact.text.split(/\[\[|\]\]/);

  return (
    <p className="mt-5 flex items-start gap-2.5 text-[15px] leading-relaxed text-navy">
      <span className="text-xl leading-6" aria-hidden>
        {fact.emoji}
      </span>
      <span>
        <b className="text-amber">{fact.lead}</b>{" "}
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <mark
              key={i}
              className="rounded-[3px] bg-amber/25 px-0.5 text-inherit"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    </p>
  );
}
