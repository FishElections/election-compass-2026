import type { Metadata } from "next";
import Script from "next/script";
import { Heebo, Rubik, Secular_One } from "next/font/google";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import "./globals.css";

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

// Read at request time (not a NEXT_PUBLIC_ var, so it is NOT inlined at build)
// — lets `docker run -e SITE_URL=…` set the public origin without rebuilding.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// Google Analytics measurement id (e.g. G-XXXXXXX). Read at request time so it
// can be set with `docker run -e GA_ID=…` without a rebuild. Analytics is off
// when unset.
const gaId = process.env.GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "מצפן בחירות 2026",
  description: "ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה ביותר.",
};

// Render every page per-request instead of prerendering it at build time.
// SITE_URL and GA_ID are only present in the running container (docker run
// --env-file), not during `docker build`. Without this, static pages bake in
// the build-time values — GA_ID is undefined then, so analytics (and the
// quiz_start events) never load on the homepage/quiz. Per-request rendering
// reads the real runtime env, so GA fires on every page.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
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
