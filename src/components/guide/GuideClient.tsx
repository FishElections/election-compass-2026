"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
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
  demoSlips,
  MAGIC_NUMBER,
  stationFacts,
  VOTES_PER_SEAT_APPROX,
  whyVoteFacts,
} from "@/data/electionGuide";
import { trackEvent } from "@/lib/analytics";

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-base leading-relaxed text-gray-dark">{children}</p>
  );
}

export function GuideClient() {
  useEffect(() => {
    trackEvent("guide_view");
  }, []);

  return (
    <main className="flex-1">
      {/* תחנה 0: פתיחה */}
      <section className="px-4 pb-14 pt-24 text-center sm:pt-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-sapphire/10 px-4 py-1.5 text-sm font-bold text-sapphire">
            🧭 המדריך לבוחר · 5 דקות
          </span>
          <h1 className="font-display text-3xl font-normal leading-tight text-navy sm:text-5xl">
            איך פתק אחד
            <br />
            הופך לממשלה?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-dark">
            המדריך הכי פשוט בישראל למנגנון הבחירות. בלי ז&apos;רגון, מבטיחים.
          </p>
          <BallotHero />
          <p className="mx-auto mt-6 w-fit rounded-full border border-gray/80 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-dark shadow-ambient">
            ⏱ 5 דקות קריאה · 0% פוליטיקה, 100% הסבר
          </p>
          <motion.p
            className="mt-8 font-bold text-sapphire"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            בואו נתחיל את המסע
            <ChevronDown className="mx-auto h-5 w-5" />
          </motion.p>
        </div>
      </section>

      {/* תחנה 1: למי מצביעים */}
      <GuideStation index={1} kicker="תחנה 1 · הפתק" title="רגע, למי בכלל מצביעים?">
        <Lead>
          בישראל מצביעים <b className="text-navy">לרשימה</b> — מפלגה עם רשימת
          מועמדים — ולא לאדם אחד. מאחורי הפרגוד מחכה ערימת פתקים, אחד לכל
          מפלגה. בוחרים, שמים במעטפה, וזהו.
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
          question="רגע... אז אני לא מצביע לראש ממשלה? 😯"
          answer="בדיוק. אף אחד בישראל לא בוחר ראש ממשלה ישירות. על זה כל המסע הזה."
        />
        <MarkerFact fact={stationFacts.ballotLetters} />
      </GuideStation>

      {/* תחנה 2: הספירה */}
      <GuideStation index={2} kicker="תחנה 2 · הספירה" title="120 כיסאות, עוגה אחת">
        <Lead>
          כל הארץ היא אזור בחירה אחד. קיבלת 10% מהקולות? קיבלת בערך 10%
          מהכיסאות. פשוט ככה.
        </Lead>
        <KnessetHorseshoe />
        <div className="mt-6 rounded-2xl bg-navy p-5 text-center text-white">
          <b className="block text-2xl">≈ {VOTES_PER_SEAT_APPROX} קולות</b>
          <span className="text-[13px] opacity-75">
            שווים בערך כיסא אחד בכנסת (מָנדָט)
          </span>
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="nerd" className="border-none">
            <AccordionTrigger className="rounded-xl bg-gray-light px-4 py-3 text-sm font-bold text-navy hover:no-underline">
              רוצים להתחכם? 🤓
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-3 text-sm leading-relaxed text-gray-dark">
              חלוקת המנדטים המדויקת נעשית בשיטת באדר-עופר: שיטת חישוב
              שמעניקה קול עודף למפלגות גדולות יחסית, ומאפשרת לשתי מפלגות
              לחתום על &quot;הסכם עודפים&quot; ולאגד את שאריות הקולות שלהן.
              זה כל מה שצריך לדעת כדי להרשים בארוחת שישי.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </GuideStation>

      {/* תחנה 3: אחוז החסימה */}
      <GuideStation index={3} kicker="תחנה 3 · דלת הכניסה" title="אחוז החסימה">
        <Lead>
          מפלגה שלא משיגה לפחות <b className="text-navy">3.25%</b> מהקולות
          הכשרים — נשארת בחוץ. וכל הקולות שלה? מתאדים. לא נספרים לאף אחד.
        </Lead>
        <ThresholdDoor />
        <div className="mt-6 rounded-2xl bg-navy p-5 text-center text-white">
          <b className="block text-2xl">3.25% ≈ 4 מנדטים</b>
          <span className="text-[13px] opacity-75">כרטיס הכניסה המינימלי לכנסת</span>
        </div>
        <MarkerFact fact={stationFacts.wastedVotes} />
      </GuideStation>

      {/* תחנה 4: המספר הקסום */}
      <GuideStation index={4} kicker="תחנה 4 · המספר הקסום ⭐" title="שישים. ואחת.">
        <Lead>
          אף מפלגה לא מגיעה לבד ל-{MAGIC_NUMBER} מתוך 120. בשביל לשלוט צריך
          שותפים — זו <b className="text-navy">קואליציה</b>. כל השאר?{" "}
          <b className="text-navy">אופוזיציה</b> — והתפקיד שלה לבקר, לשאול
          קשות ולהיות ממשלה-בהמתנה.
        </Lead>
        <p className="mt-4 text-sm text-gray-dark">
          👇 נסו בעצמכם — הקישו על מפלגות (דמיוניות לגמרי) ובנו ממשלה:
        </p>
        <CoalitionBlocks />
      </GuideStation>

      {/* תחנה 5: הרגע הגדול */}
      <GuideStation index={5} kicker="תחנה 5 · הרגע הגדול" title="אז מי בעצם ראש הממשלה?">
        <Lead>אחרי שנספרו הקולות, הכדור עובר לנשיא המדינה:</Lead>
        <GuideTimeline />
        <ChatCallout
          question="כלומר... המפלגה הכי גדולה תמיד מנצחת? 🤔"
          answer={`ממש לא בהכרח! מה שקובע זה מי מצליח לחבר ${MAGIC_NUMBER}. קרה כבר שמי שקיבל הכי הרבה קולות נשאר באופוזיציה.`}
        />
        <MarkerFact fact={stationFacts.directElection} />
      </GuideStation>

      {/* תחנה 6: למה להצביע */}
      <GuideStation index={6} kicker="תחנה 6 · למה אכפת לי" title="אז למה שהקול שלי ישנה?">
        <div className="mt-5 grid gap-3">
          {whyVoteFacts.map((fact) => (
            <div
              key={fact.lead}
              className="rounded-2xl border border-gray/80 bg-white px-4 py-3 shadow-ambient"
            >
              <MarkerFact fact={fact} />
            </div>
          ))}
        </div>
        <p className="mt-7 text-center font-bold text-navy">
          ב-27 באוקטובר, הפתק הקטן הזה הוא הקול הכי חזק שיש לכם.
        </p>
      </GuideStation>

      {/* תחנה 7: סגירה */}
      <section className="px-4 pb-20 pt-4">
        <div className="notch-card bg-grain relative mx-auto max-w-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white sm:p-10">
          <h2 className="font-display relative z-10 text-2xl font-normal sm:text-3xl">
            עכשיו אתם יודעים איך זה עובד 🎓
          </h2>
          <p className="relative z-10 mt-2 text-white/80">
            נשאר רק לגלות למי אתם הכי מתאימים.
          </p>
          <div className="relative z-10 mt-6">
            <Link href="/quiz?mode=short" onClick={() => trackEvent("guide_cta_quiz")}>
              <Button size="lg">
                למסלול המהיר — 20 שאלות
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="relative z-10 mt-4 text-[13px] text-white/60">
            או שוטטו קודם ב
            <Link href="/hot-topics" className="underline hover:text-white">
              נושאים החמים
            </Link>{" "}
            🔥
          </p>
        </div>
      </section>
    </main>
  );
}
