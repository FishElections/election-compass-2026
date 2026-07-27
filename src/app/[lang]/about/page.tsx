import type { Metadata } from "next";
import { Info, Lock, Calculator, Users, Mail } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// lucide-react dropped brand icons, so inline the official LinkedIn glyph.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const builders = [
  {
    name: "אוהד בר אלי",
    photo: "/team/ohad.jpg",
    linkedin: "https://www.linkedin.com/in/ohad-bar-eli-26181215b",
    email: "ohadoo20@gmail.com",
  },
  {
    name: "איתי אילת",
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
    alternates: { canonical: "/about" },
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
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-20 sm:pt-24">
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
          {builders.map((b) => (
            <div
              key={b.email}
              className="flex flex-col items-center rounded-2xl border border-sapphire/15 bg-white p-6 text-center shadow-ambient-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small static asset from public/, next/image's overhead isn't worth it here */}
              <img
                src={b.photo}
                alt={b.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover shadow-sm ring-4 ring-sapphire/10"
              />
              <h3 className="font-display mt-4 text-lg font-normal text-navy">
                {b.name}
              </h3>
              <a
                href={b.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sapphire hover:underline"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
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
      </div>
    </main>
  );
}
