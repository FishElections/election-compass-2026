import type { Metadata } from "next";
import { HotTopicsClient } from "@/components/topics/HotTopicsClient";
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
    title: dict.hotTopics.pageTitle,
    description: dict.hotTopics.pageDescription,
    alternates: { canonical: "/hot-topics" },
  };
}

export default function HotTopicsPage() {
  return <HotTopicsClient />;
}
