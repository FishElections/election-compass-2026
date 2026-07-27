import { Suspense } from "react";
import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz/QuizClient";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/metadata";

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
    alternates: alternatesFor(lang, "/quiz"),
  };
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizClient />
    </Suspense>
  );
}
