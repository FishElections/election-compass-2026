import { Suspense } from "react";
import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "שאלון עמדות",
  description:
    "ענו על 20 או 58 שאלות עמדה וגלו תוך דקות אילו מפלגות הכי מתאימות לכם - בלי הטיה ובלי פרסום.",
};

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizClient />
    </Suspense>
  );
}
