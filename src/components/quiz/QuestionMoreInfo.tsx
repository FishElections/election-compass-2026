import { Lightbulb, Pin, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionMoreInfo as QuestionMoreInfoData } from "@/types";

interface QuestionMoreInfoProps {
  questionId: string;
  moreInfo: QuestionMoreInfoData;
}

export function QuestionMoreInfo({
  questionId,
  moreInfo,
}: QuestionMoreInfoProps) {
  return (
    <Accordion key={questionId} type="single" collapsible className="mt-2">
      <AccordionItem value="more-info" className="border-none">
        <AccordionTrigger className="rounded-xl border-2 border-gray/80 bg-white px-4 py-3 text-sm font-semibold text-navy no-underline hover:border-amber/50 hover:bg-amber-light/20 hover:no-underline [&[data-state=open]]:border-amber/50 [&[data-state=open]]:bg-amber-light/20">
          <span className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 shrink-0 text-amber" />
            רוצה להבין יותר? לחץ למידע נוסף והקשר
          </span>
        </AccordionTrigger>
        <AccordionContent className="!pb-0">
          <div className="mt-3 flex flex-col gap-4 rounded-xl border border-gray/80 bg-white p-5">
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-dark">
                <Pin className="h-3.5 w-3.5" />
                הקשר ורקע בקצרה
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {moreInfo.summary}
              </p>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-dark">
                <Scale className="h-3.5 w-3.5" />
                טיעוני התומכים והמתנגדים
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-success/30 bg-success-light/40 p-3">
                  <p className="mb-1 text-xs font-bold text-success">
                    טיעון התומכים
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {moreInfo.proArguments}
                  </p>
                </div>
                <div className="rounded-lg border border-rose-300 bg-rose-50 p-3">
                  <p className="mb-1 text-xs font-bold text-rose-700">
                    טיעון המתנגדים
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {moreInfo.conArguments}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
