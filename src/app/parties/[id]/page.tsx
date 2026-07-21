import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { parties } from "@/data/parties";
import { categories } from "@/data/questions";
import { getPartyCategoryAverages } from "@/utils/calculator";
import { PartyLogo } from "@/components/PartyLogo";

export function generateStaticParams() {
  return parties.map((party) => ({ id: party.id }));
}

export default async function PartyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const party = parties.find((p) => p.id === id);
  if (!party) notFound();

  const averages = getPartyCategoryAverages(party.id);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy hover:underline"
        >
          <ChevronRight className="h-4 w-4" />
          חזרה לדף הבית
        </Link>

        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray bg-white p-8 text-center sm:flex-row sm:text-right">
          <PartyLogo party={party} size="lg" />
          <div>
            <h1 className="text-2xl font-extrabold text-navy">{party.name}</h1>
            <p className="text-gray-dark">{party.leader}</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-foreground">
          {party.description}
        </p>

        <h2 className="mt-10 mb-4 text-lg font-bold text-navy">
          מיקום כללי לפי קטגוריה
        </h2>
        <div className="flex flex-col gap-4">
          {categories.map((category) => {
            const value = averages[category.id];
            const percent = ((value + 2) / 4) * 100;
            return (
              <div key={category.id}>
                <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-dark">
                  <span>
                    {category.icon} {category.label}
                  </span>
                  <span>{value.toFixed(1)}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray">
                  <div
                    className="h-2.5 rounded-full bg-navy"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-gray bg-gray-light p-5 text-sm text-gray-dark">
          בקרוב: מצע מלא, רשימת חברי כנסת והיסטוריית המפלגה.
        </div>
      </div>
    </main>
  );
}
