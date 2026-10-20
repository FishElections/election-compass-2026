import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getParties, HIDDEN_FROM_PLATFORMS } from "@/data/parties";
import { getPartyTrackRecord } from "@/data/trackRecord";
import { TrackRecordSections } from "@/components/trackRecord/TrackRecordSections";
import { partiesCore } from "@/data/parties/core";
import { getPlatformTopics } from "@/data/platformTopics";
import { PartyLogo } from "@/components/PartyLogo";
import { BallotLetterBadge } from "@/components/BallotLetterBadge";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/utils/site";
import type { Party } from "@/types";
import {
  isLocale,
  ogLocaleFor,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/metadata";

// ProfilePage wrapping a PoliticalParty, not a bare PoliticalParty: this is our
// profile *about* the party, not the party's own site. Claiming otherwise is
// the kind of misrepresentation Google penalises, and it would compete with the
// parties' real pages for their own brand queries.
function partyJsonLd(party: Party, lang: Locale, dict: Dictionary) {
  const siteUrl = getSiteUrl();
  // Locale-aware URLs: the /en profile must point at /en/parties/… , not the
  // Hebrew path, or every locale's structured data claims the same canonical.
  const url = `${siteUrl}${localizedPath(`/parties/${party.id}`, lang)}`;
  const homeUrl = `${siteUrl}${localizedPath("/", lang)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        inLanguage: ogLocaleFor(lang).replace("_", "-"),
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
          {
            "@type": "ListItem",
            position: 1,
            name: dict.nav.home,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.nav.platforms,
            item: `${siteUrl}${localizedPath("/platforms", lang)}`,
          },
          { "@type": "ListItem", position: 3, name: party.name, item: url },
        ],
      },
    ],
  };
}

export function generateStaticParams() {
  return partiesCore.map((party) => ({ id: party.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const party = getParties(lang).find((p) => p.id === id);
  if (!party) return {};
  const dict = await getDictionary(lang);
  const t = dict.partyProfile;

  const title = t.titleTemplate.replace("{party}", party.name);
  const description = t.descriptionTemplate
    .replace("{description}", party.shortDescription)
    .replace("{party}", party.name);

  return {
    title,
    description,
    alternates: alternatesFor(lang, `/parties/${party.id}`),
    openGraph: { title, description, type: "profile" },
    twitter: { card: "summary", title, description },
  };
}

export default async function PartyProfilePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const party = getParties(lang).find((p) => p.id === id);
  if (!party) notFound();
  const dict = await getDictionary(lang);
  const t = dict.partyProfile;
  const platformTopics = getPlatformTopics(lang);
  const showPlatform = !HIDDEN_FROM_PLATFORMS.has(party.id);

  return (
    <main className="flex-1">
      <JsonLd data={partyJsonLd(party, lang, dict)} />
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-8 lg:pt-20">
          <Link
            href="/platforms"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy hover:underline"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {t.backToPlatforms}
          </Link>

          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white shadow-ambient-lg sm:flex-row sm:text-start">
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

      <div className="mx-auto max-w-5xl px-4 pb-16">
        <p className="max-w-3xl leading-relaxed text-foreground">
          {party.shortDescription}
        </p>

        {/* כל הנושאים פתוחים זה לצד זה — אותו תוכן שבפאנל של עמוד המצעים, בלי
            אקורדיון. מספר אי-זוגי של נושאים: האחרון מתפרס על שתי העמודות. */}
        {showPlatform ? (
          <>
            <h2 className="font-display mt-10 mb-4 text-xl font-normal text-navy">
              {t.platformHeading}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {party.platform.map((topic) => (
                <section
                  key={topic.topicKey}
                  className="rounded-2xl border border-gray/80 bg-white p-6 shadow-ambient md:last:odd:col-span-2"
                >
                  <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
                    <span aria-hidden>
                      {platformTopics.find((pt) => pt.key === topic.topicKey)?.icon}
                    </span>
                    {topic.topicName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {topic.summary}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {topic.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-gray-dark"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sapphire" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-xl border border-sapphire/20 bg-sapphire/5 p-5 text-sm text-navy">
            {t.noPlatformNote}
          </div>
        )}

        {/* Veteran-party track record and leader's legal record
            (docs/track-record-methodology.md). */}
        {getPartyTrackRecord(lang, party.id) && (
          <div className="mt-10">
            <TrackRecordSections party={party} />
          </div>
        )}
      </div>
    </main>
  );
}
