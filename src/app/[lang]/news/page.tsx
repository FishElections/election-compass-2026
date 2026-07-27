import Link from "next/link";
import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Placeholder page with no real content yet — kept out of the index until
// actual news content ships, to avoid a thin/"coming soon" page in search.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.news.pageTitle,
    description: dict.news.pageDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: "/news" },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const t = dict.news;

  return (
    <main className="flex-1">
      <div className="bg-dot-grid flex flex-1 items-center justify-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-ambient-lg">
            <Newspaper className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl font-normal text-navy">
            {t.heading}
          </h1>
          <p className="text-gray-dark">{t.body}</p>
          <Link
            href="/"
            className="font-medium text-sapphire hover:underline"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
