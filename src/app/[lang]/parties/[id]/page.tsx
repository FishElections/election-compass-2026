import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { parties } from "@/data/parties";
import { categories } from "@/data/questions";
import { getPartyCategoryAverages } from "@/utils/calculator";
import { PartyLogo } from "@/components/PartyLogo";
import { BallotLetterBadge } from "@/components/BallotLetterBadge";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/utils/site";
import type { Party } from "@/types";

// ProfilePage wrapping a PoliticalParty, not a bare PoliticalParty: this is our
// profile *about* the party, not the party's own site. Claiming otherwise is
// the kind of misrepresentation Google penalises, and it would compete with the
// parties' real pages for their own brand queries.
function partyJsonLd(party: Party) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/parties/${party.id}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        inLanguage: "he-IL",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${url}#party` },
      },
      {
        "@type": "PoliticalParty",
        "@id": `${url}#party`,
        name: party.name,
        description: party.shortDescription,
        // `leader` is a plain string in our data (no per-politician page), so
        // it becomes a bare Person node rather than a linkable @id.
        leader: { "@type": "Person", name: party.leader },
        ...(party.logoImageUrl
          ? { logo: `${siteUrl}${party.logoImageUrl}` }
          : {}),
      },
      // Breadcrumbs are one of the few rich results Google still shows broadly,
      // and they replace the raw URL under the title in the SERP.
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "דף הבית", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "מפלגות",
            item: `${siteUrl}/platforms`,
          },
          { "@type": "ListItem", position: 3, name: party.name, item: url },
        ],
      },
    ],
  };
}

export function generateStaticParams() {
  return parties.map((party) => ({ id: party.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const party = parties.find((p) => p.id === id);
  if (!party) return {};

  const title = `${party.name} - עמדות ומצע לבחירות 2026`;
  const description = `${party.shortDescription} בדקו כמה אתם מתאימים ל${party.name} במצפן הבחירות.`;

  return {
    title,
    description,
    alternates: { canonical: `/parties/${party.id}` },
    openGraph: { title, description, type: "profile" },
    twitter: { card: "summary", title, description },
  };
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
      <JsonLd data={partyJsonLd(party)} />
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-8 lg:pt-20">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy hover:underline"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה לדף הבית
          </Link>

          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white shadow-ambient-lg sm:flex-row sm:text-right">
            <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative z-10">
              <PartyLogo party={party} size="lg" className="ring-4 ring-white/20" />
            </div>
            <div className="relative z-10 flex-1">
              <h1 className="font-display text-3xl font-normal">{party.name}</h1>
              <p className="text-white/70">
                {party.leader} · {party.spectrum}
              </p>
            </div>
            <div className="relative z-10">
              <BallotLetterBadge party={party} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <p className="leading-relaxed text-foreground">
          {party.shortDescription}
        </p>

        <h2 className="font-display mt-10 mb-4 text-xl font-normal text-navy">
          מיקום כללי לפי קטגוריה
        </h2>
        <div className="flex flex-col gap-5 rounded-2xl border border-gray/80 bg-white p-6 shadow-ambient">
          {categories.map((category) => {
            const value = averages[category.id];
            const percent = ((value + 2) / 4) * 100;
            return (
              <div key={category.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm font-medium text-gray-dark">
                  <span>
                    {category.icon} {category.label}
                  </span>
                  <span className="font-semibold text-navy">
                    {value.toFixed(1)}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-l from-sapphire to-success transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-sapphire/20 bg-sapphire/5 p-5 text-sm text-navy">
          בקרוב: מצע מלא, רשימת חברי כנסת והיסטוריית המפלגה.
        </div>
      </div>
    </main>
  );
}
