import type { Metadata } from "next";
import { GuideClient } from "@/components/guide/GuideClient";
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
  const { title, description } = dict.home.links.howItWorks;
  return {
    title,
    description,
    alternates: alternatesFor(lang, "/how-it-works"),
  };
}

export default function HowItWorksPage() {
  return <GuideClient />;
}
