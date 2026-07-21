import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { likertOptions } from "@/data/likert";
import { getPartyStance } from "@/utils/calculator";
import { Party, Question, StanceValue, UserAnswers } from "@/types";

function labelForValue(value: number) {
  return (
    likertOptions.find((o) => o.value === value)?.label ?? "ניטרלי / ללא עמדה"
  );
}

export function AnswerBreakdown({
  questions,
  answers,
  party,
}: {
  questions: Question[];
  answers: UserAnswers;
  party: Party;
}) {
  const answeredQuestions = questions.filter((q) => answers[q.id] !== undefined);

  if (answeredQuestions.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {answeredQuestions.map((question) => {
        const userValue = answers[question.id] as StanceValue;
        const partyValue = getPartyStance(party.id, question.id);
        const agree = Math.abs(userValue - partyValue) <= 1;

        return (
          <AccordionItem key={question.id} value={question.id}>
            <AccordionTrigger>{question.text}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
                <p>
                  <span className="font-semibold text-navy">התשובה שלך: </span>
                  {labelForValue(userValue)}
                </p>
                <p>
                  <span className="font-semibold text-navy">
                    עמדת {party.name}:{" "}
                  </span>
                  {labelForValue(partyValue)}
                </p>
                <span
                  className={
                    agree
                      ? "font-medium text-success"
                      : "font-medium text-danger"
                  }
                >
                  {agree ? "עמדות קרובות" : "עמדות מרוחקות"}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
