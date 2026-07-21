import { Suspense } from "react";
import { QuizClient } from "@/components/quiz/QuizClient";

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizClient />
    </Suspense>
  );
}
