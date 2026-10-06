import type { Metadata } from "next";
import { SimulatorClient } from "@/components/simulator/SimulatorClient";
import { isLocale, ogLocaleFor } from "@/i18n/config";
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
  const share = dict.simulator.share;

  // תמונת שיתוף סטטית per-שפה (public/share/simulator-<lang>.png). כתובת
  // יחסית - Next פותר אותה מול metadataBase שמוגדר ב-layout. ריבועית 1254,
  // כפי שסופקה. og:title/description הם טקסט השיתוף הייעודי, לא כותרת העמוד,
  // כדי שתצוגה-מקדימה של הקישור תהיה מזמינה ככל האפשר.
  const ogImage = `/share/simulator-${lang}.png`;

  return {
    title: dict.simulator.pageTitle,
    description: dict.simulator.pageDescription,
    alternates: alternatesFor(lang, "/simulator"),
    openGraph: {
      title: share.ogTitle,
      description: share.ogDescription,
      type: "website",
      locale: ogLocaleFor(lang),
      images: [
        { url: ogImage, width: 1254, height: 1254, alt: share.ogTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: share.ogTitle,
      description: share.ogDescription,
      images: [ogImage],
    },
  };
}

export default function SimulatorPage() {
  return <SimulatorClient />;
}
