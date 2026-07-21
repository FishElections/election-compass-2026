import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
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

export const metadata: Metadata = {
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
      className={`${heebo.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SidebarDrawer />
        {children}
      </body>
    </html>
  );
}
