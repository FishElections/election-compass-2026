import { Suspense } from "react";
import type { Metadata } from "next";
import { getParties } from "@/data/parties";
import { ResultsClient } from "@/components/results/ResultsClient";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type ResultsSearchParams = { p?: string; s?: string };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<ResultsSearchParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const t = dict.results;

  const { p, s } = await searchParams;
  const party = getParties(lang).find((x) => x.id === p);
  const score = Number(s);

  // Personalized share page driven entirely by query params — not a page
  // anyone should land on from organic search, so keep it out of the index
  // while still letting social crawlers read the OG tags for link previews.
  const robots = { index: false, follow: true };

  if (!party || !Number.isFinite(score)) {
    return {
      title: t.pageTitle,
      description: t.pageDescription,
      robots,
    };
  }

  const rounded = Math.max(0, Math.min(100, Math.round(score)));
  const title = t.shareTitleTemplate
    .replace("{score}", String(rounded))
    .replace("{party}", party.name);
  const description = t.shareDescription;
  const ogImage = `/api/og?p=${encodeURIComponent(party.id)}&s=${rounded}&lang=${lang}`;

  return {
    title,
    description,
    robots,
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
