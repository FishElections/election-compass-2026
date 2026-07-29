import type { Metadata } from "next";
import { Info, Lock, Calculator, Users, Mail } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/metadata";
import { LinkedinLink } from "@/components/about/LinkedinLink";
import { FEEDBACK_EMAIL } from "@/lib/constants";

// Names come from dict.about.builders.names (same order) since a person's
// name is translated/transliterated text, not locale-invariant like the
// rest of this static bio data. `person` tags the GA linkedin_click event.
const builders = [
  {
    person: "ohad",
    photo: "/team/ohad.jpg",
    linkedin: "https://www.linkedin.com/in/ohad-bar-eli-26181215b",
    email: "ohadoo20@gmail.com",
  },
  {
    person: "itay",
    photo: "/team/itay.jpg",
    linkedin: "https://www.linkedin.com/in/itayeylath/",
    email: "itay.ey@gmail.com",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.about.pageTitle,
    description: dict.about.pageDescription,
    alternates: alternatesFor(lang, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const t = dict.about;

  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-16 lg:pt-20">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-ambient-lg">
            <Info className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            {t.heading}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16">
        <p className="leading-relaxed text-gray-dark">{t.intro}</p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Calculator className="h-5 w-5 text-sapphire" />
          {t.howCalculated.heading}
        </h2>
        <p className="leading-relaxed text-gray-dark">
          {t.howCalculated.intro}
        </p>
        <div
          className="mt-4 overflow-x-auto rounded-xl border border-sapphire/20 bg-sapphire/5 p-4 text-center text-sm font-medium text-navy"
          dir="ltr"
        >
          {t.howCalculated.formula}
        </div>
        <p className="mt-4 leading-relaxed text-gray-dark">
          <strong>{t.howCalculated.distanceLabel}</strong>{" "}
          {t.howCalculated.distanceBody}
        </p>
        <p className="mt-4 leading-relaxed text-gray-dark">
          <strong>{t.howCalculated.directionLabel}</strong>{" "}
          {t.howCalculated.directionBody}
        </p>
        <p className="mt-4 leading-relaxed text-gray-dark">
          {t.howCalculated.weightingBody}
        </p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Lock className="h-5 w-5 text-success" />
          {t.privacy.heading}
        </h2>
        <p className="leading-relaxed text-gray-dark">{t.privacy.body}</p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Users className="h-5 w-5 text-amber" />
          {t.builders.heading}
        </h2>
        <p className="leading-relaxed text-gray-dark">{t.builders.intro}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {builders.map((b, i) => (
            <div
              key={b.email}
              className="flex flex-col items-center rounded-2xl border border-sapphire/15 bg-white p-6 text-center shadow-ambient-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small static asset from public/, next/image's overhead isn't worth it here */}
              <img
                src={b.photo}
                alt={t.builders.names[i]}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover shadow-sm ring-4 ring-sapphire/10"
              />
              <h3 className="font-display mt-4 text-lg font-normal text-navy">
                {t.builders.names[i]}
              </h3>
              <LinkedinLink href={b.linkedin} person={b.person} />
              <a
                href={`mailto:${b.email}`}
                dir="ltr"
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-gray-dark hover:text-sapphire hover:underline"
              >
                <Mail className="h-4 w-4" />
                {b.email}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 leading-relaxed text-gray-dark">{t.builders.thanks}</p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Mail className="h-5 w-5 text-sapphire" />
          {t.feedback.heading}
        </h2>
        <p className="leading-relaxed text-gray-dark">{t.feedback.body}</p>
        <a
          href={`mailto:${FEEDBACK_EMAIL}`}
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl border-2 border-sapphire/20 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:border-sapphire hover:bg-sapphire/5"
        >
          <Mail className="h-4 w-4" />
          {t.feedback.cta}
        </a>
      </div>
    </main>
  );
}
