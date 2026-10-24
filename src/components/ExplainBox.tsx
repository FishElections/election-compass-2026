import { HelpCircle } from "lucide-react";

/** The site's explanation box (same look as the hot-topics sheet). */
export function ExplainBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-sapphire/20 bg-sapphire/5 p-4">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-sapphire">
        <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </p>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}
