import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "מצפן בחירות 2026",
  description: "ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה ביותר.",
};

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
      </body>
    </html>
  );
}
