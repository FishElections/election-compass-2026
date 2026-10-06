import type { Metadata } from "next";
import { SimulatorClient } from "@/components/simulator/SimulatorClient";
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
    title: dict.simulator.pageTitle,
    description: dict.simulator.pageDescription,
    alternates: alternatesFor(lang, "/simulator"),
  };
}

export default function SimulatorPage() {
  return <SimulatorClient />;
}
