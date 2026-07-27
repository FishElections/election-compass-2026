import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Heebo, Rubik, Secular_One, Cairo } from "next/font/google";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import { getSiteUrl } from "@/utils/site";
import { isLocale, dirFor, ogLocaleFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import { alternatesFor } from "@/i18n/metadata";
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

// Heebo/Rubik/Secular One have no Arabic glyphs; Cairo covers Arabic (+ Latin).
// globals.css remaps --font-sans/--font-display to it under html[lang="ar"].
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

// Google Analytics measurement id (e.g. G-XXXXXXX). Read at request time so it
// can be set with `docker run -e GA_ID=…` without a rebuild. Analytics is off
// when unset.
const gaId = process.env.GA_ID;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { siteName, homeTitle, description, appleTitle } = dict.meta;
  // Generic branded card from the same route /results uses for personalized
  // shares — /api/og with no ?p=/?s= falls back to the dictionary's own
  // fallback text, so every page gets a real preview image instead of none.
  const defaultOgImage = `/api/og?lang=${lang}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: homeTitle,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: alternatesFor(lang, "/"),
    openGraph: {
      title: homeTitle,
      description,
      type: "website",
      locale: ogLocaleFor(lang),
      siteName,
      images: [
        { url: defaultOgImage, width: 1200, height: 630, alt: siteName },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description,
      images: [defaultOgImage],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      // Short on purpose: iOS truncates anything longer under the home-screen icon.
      title: appleTitle,
      statusBarStyle: "default",
    },
    // Declaring `apple` alone suppresses Next's automatic favicon detection of
    // app/icon.svg, so the browser-tab compass goes missing — list the icon
    // (SVG + a PNG fallback for browsers that ignore SVG favicons) explicitly.
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/icon.svg",
      apple: "/apple-touch-icon.png",
    },
  };
}

// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to real
// values — without it the sticky quiz footer sits on the iPhone home indicator.
// themeColor tints the mobile browser chrome navy to match the site.
export const viewport: Viewport = {
  themeColor: "#0b132b",
  colorScheme: "light",
  viewportFit: "cover",
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
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${heebo.variable} ${rubik.variable} ${secularOne.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <DictionaryProvider dict={dict} locale={lang} dir={dir}>
          <SidebarDrawer />
          {children}
        </DictionaryProvider>
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
