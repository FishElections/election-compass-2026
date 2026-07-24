import { Suspense } from "react";
import type { Metadata } from "next";
import { parties } from "@/data/parties";
import { ResultsClient } from "@/components/results/ResultsClient";

type ResultsSearchParams = { p?: string; s?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ResultsSearchParams>;
}): Promise<Metadata> {
  const { p, s } = await searchParams;
  const party = parties.find((x) => x.id === p);
  const score = Number(s);

  if (!party || !Number.isFinite(score)) {
    return {
      title: "התוצאות שלי | מצפן בחירות 2026",
      description: "ענו על השאלון וגלו לאיזו מפלגה אתם הכי מתאימים.",
    };
  }

  const rounded = Math.max(0, Math.min(100, Math.round(score)));
  const title = `🎯 קיבלתי ${rounded}% התאמה ל${party.name}`;
  const description = "עשיתי את מצפן הבחירות 2026. מה איתכם? גלו גם אתם 👇";
  const ogImage = `/api/og?p=${encodeURIComponent(party.id)}&s=${rounded}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsClient />
    </Suspense>
  );
}
