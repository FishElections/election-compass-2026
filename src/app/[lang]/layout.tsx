import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Heebo, Rubik, Secular_One } from "next/font/google";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import { getSiteUrl } from "@/utils/site";
import { isLocale, dirFor } from "@/i18n/config";
import "../globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

const secularOne = Secular_One({
  variable: "--font-secular-one",
  subsets: ["hebrew", "latin"],
  weight: "400",
});

// Google Analytics measurement id (e.g. G-XXXXXXX). Read at request time so it
// can be set with `docker run -e GA_ID=…` without a rebuild. Analytics is off
// when unset.
const gaId = process.env.GA_ID;

const siteName = "מצפן בחירות 2026";
const homeTitle = "בחירות 2026- מצאו את המפלגה המתאימה לכם ביותר";
const description =
  "ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה ביותר.";

// Generic branded card from the same route /results uses for personalized
// shares — /api/og with no query params falls back to "השאלון"/"מצפן" text,
// so every page gets a real preview image instead of none at all.
const defaultOgImage = "/api/og";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description,
    type: "website",
    locale: "he_IL",
    siteName,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description,
    images: [defaultOgImage],
  },
};

// Render every page per-request instead of prerendering it at build time.
// SITE_URL and GA_ID are only present in the running container (docker run
// --env-file), not during `docker build`. Without this, static pages bake in
// the build-time values — GA_ID is undefined then, so analytics (and the
// quiz_start events) never load on the homepage/quiz. Per-request rendering
// reads the real runtime env, so GA fires on every page.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dir = dirFor(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${heebo.variable} ${rubik.variable} ${secularOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SidebarDrawer />
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
