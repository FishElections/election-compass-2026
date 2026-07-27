import { Suspense } from "react";
import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/QuizClient";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.quiz.pageTitle,
    description: dict.quiz.pageDescription,
    alternates: { canonical: "/quiz" },
  };
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizClient />
    </Suspense>
  );
}
