import type { Metadata } from "next";
import { PlatformsClient } from "@/components/platforms/PlatformsClient";
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
    title: dict.platforms.pageTitle,
    description: dict.platforms.pageDescription,
    alternates: alternatesFor(lang, "/platforms"),
  };
}

export default function PlatformsPage() {
  return <PlatformsClient />;
}
