import { Suspense } from "react";
import type { Metadata } from "next";
import { ChallengeClient } from "@/components/challenge/ChallengeClient";
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
    title: dict.challenge.pageTitle,
    description: dict.challenge.pageDescription,
    alternates: { canonical: "/challenge" },
  };
}

export default function ChallengePage() {
  return (
    <Suspense fallback={null}>
      <ChallengeClient />
    </Suspense>
  );
}
