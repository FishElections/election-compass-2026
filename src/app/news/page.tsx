import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <main className="flex-1">
      <div className="bg-dot-grid flex flex-1 items-center justify-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-ambient-lg">
            <Newspaper className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl font-normal text-navy">
            עדכוני בחירות
          </h1>
          <p className="text-gray-dark">
            בקרוב: חדשות ועדכונים שוטפים על מערכת הבחירות לכנסת 2026.
          </p>
          <Link
            href="/"
            className="font-medium text-sapphire hover:underline"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </main>
  );
}
