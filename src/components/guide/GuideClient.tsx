"use client";

import { useEffect } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BallotHero } from "@/components/guide/BallotHero";
import { ChatCallout } from "@/components/guide/ChatCallout";
import { CoalitionBlocks } from "@/components/guide/CoalitionBlocks";
import { GuideStation } from "@/components/guide/GuideStation";
import { GuideTimeline } from "@/components/guide/GuideTimeline";
import { KnessetHorseshoe } from "@/components/guide/KnessetHorseshoe";
import { MarkerFact } from "@/components/guide/MarkerFact";
import { ThresholdDoor } from "@/components/guide/ThresholdDoor";
import {
  getDemoSlips,
  getStationFacts,
  getWhyVoteFacts,
  MAGIC_NUMBER,
  VOTES_PER_SEAT_APPROX,
} from "@/data/electionGuide";
import { trackEvent } from "@/lib/analytics";
import { useDictionary } from "@/i18n/DictionaryProvider";

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-base leading-relaxed text-gray-dark">{children}</p>
  );
}

export function GuideClient() {
  const { dict, locale } = useDictionary();
  const t = dict.guide;
  const demoSlips = getDemoSlips(locale);
  const stationFacts = getStationFacts(locale);
  const whyVoteFacts = getWhyVoteFacts(locale);

  useEffect(() => {
    trackEvent("guide_view");
  }, []);

  return (
    <main className="flex-1">
      {/* Station 0: intro */}
      <section className="px-4 pb-14 pt-24 text-center sm:pt-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-sapphire/10 px-4 py-1.5 text-sm font-bold text-sapphire">
            {t.intro.badge}
          </span>
          <h1 className="font-display text-3xl font-normal leading-tight text-navy sm:text-5xl">
            {t.intro.headingLine1}
            <br />
            {t.intro.headingLine2}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-dark">
            {t.intro.subtitle}
          </p>
          <BallotHero />
          <p className="mx-auto mt-6 w-fit rounded-full border border-gray/80 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-dark shadow-ambient">
            {t.intro.readTimeBadge}
          </p>
          <motion.p
            className="mt-8 font-bold text-sapphire"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            {t.intro.startCta}
            <ChevronDown className="mx-auto h-5 w-5" />
          </motion.p>
        </div>
      </section>

      {/* Station 1: who you vote for */}
      <GuideStation index={1} kicker={t.station1.kicker} title={t.station1.title}>
        <Lead>
          {t.station1.leadStart} <b className="text-navy">{t.station1.leadBold1}</b>{" "}
          {t.station1.leadMid}
        </Lead>
        <div className="mt-7 flex justify-center gap-3.5">
          {demoSlips.map((slip) => (
            <div
              key={slip.letters}
              className="flex h-[72px] w-[92px] flex-col items-center justify-center rounded-lg border-[2.5px] border-navy bg-white shadow-ambient transition-transform hover:-translate-y-1 hover:-rotate-3"
            >
              <b className="text-2xl text-navy">{slip.letters}</b>
              <span className="text-[10px] text-gray-dark">{slip.party}</span>
            </div>
          ))}
        </div>
        <ChatCallout
          question={t.station1.chatQuestion}
          answer={t.station1.chatAnswer}
        />
        <MarkerFact fact={stationFacts.ballotLetters} />
      </GuideStation>

      {/* Station 2: seat count */}
      <GuideStation index={2} kicker={t.station2.kicker} title={t.station2.title}>
        <Lead>{t.station2.lead}</Lead>
        <KnessetHorseshoe />
        <div className="mt-6 rounded-2xl bg-navy p-5 text-center text-white">
          <b className="block text-2xl">
            ≈ {VOTES_PER_SEAT_APPROX} {t.station2.votesLabel}
          </b>
          <span className="text-[13px] opacity-75">{t.station2.votesCaption}</span>
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="nerd" className="border-none">
            <AccordionTrigger className="rounded-xl bg-gray-light px-4 py-3 text-sm font-bold text-navy hover:no-underline">
              {t.station2.accordionTrigger}
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-3 text-sm leading-relaxed text-gray-dark">
              {t.station2.accordionContent}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </GuideStation>

      {/* Station 3: the electoral threshold */}
      <GuideStation index={3} kicker={t.station3.kicker} title={t.station3.title}>
        <Lead>
          {t.station3.leadStart} <b className="text-navy">{t.station3.leadBold}</b>{" "}
          {t.station3.leadEnd}
        </Lead>
        <ThresholdDoor />
        <div className="mt-6 rounded-2xl bg-navy p-5 text-center text-white">
          <b className="block text-2xl">{t.station3.statLine}</b>
          <span className="text-[13px] opacity-75">{t.station3.statCaption}</span>
        </div>
        <MarkerFact fact={stationFacts.wastedVotes} />
      </GuideStation>

      {/* Station 4: the magic number */}
      <GuideStation index={4} kicker={t.station4.kicker} title={t.station4.title}>
        <Lead>
          {t.station4.leadStart}
          {MAGIC_NUMBER} {t.station4.leadMid1}{" "}
          <b className="text-navy">{t.station4.leadBold1}</b>
          {t.station4.leadMid2}{" "}
          <b className="text-navy">{t.station4.leadBold2}</b>{" "}
          {t.station4.leadEnd}
        </Lead>
        <p className="mt-4 text-sm text-gray-dark">{t.station4.prompt}</p>
        <CoalitionBlocks />
      </GuideStation>

      {/* Station 5: the big moment */}
      <GuideStation index={5} kicker={t.station5.kicker} title={t.station5.title}>
        <Lead>{t.station5.lead}</Lead>
        <GuideTimeline />
        <ChatCallout
          question={t.station5.chatQuestion}
          answer={t.station5.chatAnswerTemplate.replace(
            "{n}",
            String(MAGIC_NUMBER)
          )}
        />
        <MarkerFact fact={stationFacts.directElection} />
      </GuideStation>

      {/* Station 6: why vote */}
      <GuideStation index={6} kicker={t.station6.kicker} title={t.station6.title}>
        <div className="mt-5 grid gap-3">
          {whyVoteFacts.map((fact) => (
            <div
              key={fact.id}
              className="rounded-2xl border border-gray/80 bg-white px-4 py-3 shadow-ambient"
            >
              <MarkerFact fact={fact} />
            </div>
          ))}
        </div>
        <p className="mt-7 text-center font-bold text-navy">
          {t.station6.closing}
        </p>
      </GuideStation>

      {/* Station 7: closing CTA */}
      <section className="px-4 pb-20 pt-4">
        <div className="notch-card bg-grain relative mx-auto max-w-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white sm:p-10">
          <h2 className="font-display relative z-10 text-2xl font-normal sm:text-3xl">
            {t.closing.heading}
          </h2>
          <p className="relative z-10 mt-2 text-white/80">{t.closing.subtitle}</p>
          <div className="relative z-10 mt-6">
            <Link href="/quiz?mode=short" onClick={() => trackEvent("guide_cta_quiz")}>
              <Button size="lg">
                {t.closing.cta}
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          <p className="relative z-10 mt-4 text-[13px] text-white/60">
            {t.closing.browseFirstPrefix}
            <Link href="/hot-topics" className="underline hover:text-white">
              {t.closing.browseFirstLink}
            </Link>{" "}
            🔥
          </p>
        </div>
      </section>
    </main>
  );
}
