"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronLeft,
  HelpCircle,
  Key,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { parties } from "@/data/parties";
import { categoryIcons } from "@/data/hotTopics";
import { Topic } from "@/types";
import { PartyLogo } from "@/components/PartyLogo";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getStanceBreakdown, StanceBreakdown } from "@/lib/topicStance";
import { cn } from "@/lib/utils";

type TabId = "what" | "why" | "args" | "parties";

const baseTabs: { id: TabId; label: string }[] = [
  { id: "what", label: "מה קורה" },
  { id: "why", label: "למה מחלוקת" },
  { id: "args", label: "בעד/נגד" },
];

interface PartyGroupProps {
  label: string;
  ids: string[];
  tone: "support" | "oppose" | "neutral";
}

function PartyGroup({ label, ids, tone }: PartyGroupProps) {
  const toneClasses: Record<typeof tone, string> = {
    support: "border-success/30 bg-success-light/30",
    oppose: "border-rose-300 bg-rose-50",
    neutral: "border-amber/30 bg-amber-light/30",
  };
  const dotClasses: Record<typeof tone, string> = {
    support: "bg-success",
    oppose: "bg-rose-600",
    neutral: "bg-amber",
  };

  return (
    <div className={cn("rounded-xl border p-4", toneClasses[tone])}>
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", dotClasses[tone])} />
        {label}
      </p>
      {ids.length === 0 ? (
        <p className="text-sm text-gray-dark">אין מפלגות בקטגוריה זו</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {ids.map((id) => {
            const party = parties.find((p) => p.id === id);
            if (!party) return null;
            return (
              <Link
                key={id}
                href={`/parties/${id}`}
                className="flex items-center gap-2 rounded-full border border-gray/60 bg-white py-1 pl-3 pr-1.5 text-sm font-medium text-navy transition-colors hover:border-sapphire"
              >
                <PartyLogo party={party} size="sm" />
                {party.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SheetInnerProps {
  topic: Topic;
  breakdown: StanceBreakdown | null;
  done: boolean;
  onMarkDone: (id: string) => void;
}

/**
 * מכיל את הטאבים והכפתור התחתון. ממוקם בתוך הבלוק המותנה שמותקן מחדש בכל
 * פתיחה של הגיליון, כך שהטאב חוזר תמיד ל"מה קורה" בלי צורך ב-effect איפוס.
 */
function SheetInner({ topic, breakdown, done, onMarkDone }: SheetInnerProps) {
  const [tab, setTab] = useState<TabId>("what");
  const [justCelebrated, setJustCelebrated] = useState(false);

  const tabs = breakdown ? [...baseTabs, { id: "parties" as TabId, label: "מפלגות" }] : baseTabs;

  function handleMarkDone() {
    if (done) return;
    onMarkDone(topic.id);
    setJustCelebrated(true);
  }

  return (
    <>
      <div role="tablist" className="flex shrink-0 gap-2 overflow-x-auto border-b border-gray px-5 py-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors cursor-pointer",
              tab === t.id ? "bg-sapphire text-white" : "bg-gray-light text-gray-dark hover:bg-gray"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {tab === "what" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium italic leading-relaxed text-gray-dark">{topic.hook}</p>
            <div className="rounded-xl bg-gray-light p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gray-dark">
                <BookOpen className="h-3.5 w-3.5" />
                מה קורה כאן, במילים פשוטות
              </p>
              <p className="text-sm leading-relaxed text-foreground">{topic.simpleExplanation}</p>
            </div>
            {topic.keyTerm && (
              <div className="rounded-xl border border-amber/30 bg-amber-light/30 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber">
                  <Key className="h-3.5 w-3.5" />
                  מונח מפתח: {topic.keyTerm.term}
                </p>
                <p className="text-sm leading-relaxed text-foreground">{topic.keyTerm.definition}</p>
              </div>
            )}
          </div>
        )}

        {tab === "why" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-sapphire/20 bg-sapphire/5 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-sapphire">
                <HelpCircle className="h-3.5 w-3.5" />
                למה יש על זה ויכוח?
              </p>
              <p className="text-sm leading-relaxed text-foreground">{topic.whyControversial}</p>
            </div>
            {topic.funFact && (
              <div className="rounded-xl border border-dashed border-gold/50 bg-gold/5 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  עובדה מעניינת
                </p>
                <p className="text-sm leading-relaxed text-foreground">{topic.funFact}</p>
              </div>
            )}
          </div>
        )}

        {tab === "args" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-success/30 bg-success-light/40 p-4">
              <p className="mb-2 text-xs font-bold text-success">יש הטוענים בעד</p>
              <div className="flex flex-col gap-3">
                {topic.argumentsFor.map((arg, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-foreground">{arg.title}</p>
                    <p className="text-sm leading-relaxed text-foreground">{arg.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4">
              <p className="mb-2 text-xs font-bold text-rose-700">ויש הטוענים נגד</p>
              <div className="flex flex-col gap-3">
                {topic.argumentsAgainst.map((arg, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-foreground">{arg.title}</p>
                    <p className="text-sm leading-relaxed text-foreground">{arg.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {topic.relatedQuestionId && (
              <Link
                href="/quiz?mode=long"
                className="inline-flex items-center gap-1 text-sm font-semibold text-sapphire hover:underline"
              >
                רוצה לענות על השאלה הקשורה בשאלון?
                <ChevronLeft className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}

        {tab === "parties" && breakdown && topic.partyStancesSummary && (
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-navy">
              <Shield className="h-3.5 w-3.5" />
              {breakdown.label}
            </p>
            <PartyGroup label="תומכות באופן פעיל" ids={topic.partyStancesSummary.support} tone="support" />
            <PartyGroup label="מתנגדות בתקיפות" ids={topic.partyStancesSummary.oppose} tone="oppose" />
            <PartyGroup label="מורכב / פשרה" ids={topic.partyStancesSummary.splitOrNeutral} tone="neutral" />
          </div>
        )}
      </div>

      <div className="relative shrink-0 border-t border-gray px-5 py-4">
        {justCelebrated && <ConfettiBurst key={topic.id} />}
        <button
          type="button"
          onClick={handleMarkDone}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors",
            done
              ? "cursor-default bg-success-light text-success"
              : "cursor-pointer bg-success text-white hover:bg-success/90"
          )}
        >
          <Check className="h-4 w-4" />
          {done ? "נשמר בעגלת ההבנה שלך" : "הבנתי את זה"}
        </button>
      </div>
    </>
  );
}

interface TopicDetailSheetProps {
  topic: Topic | null;
  isOpened: (id: string) => boolean;
  onMarkDone: (id: string) => void;
  onClose: () => void;
}

export function TopicDetailSheet({ topic, isOpened, onMarkDone, onClose }: TopicDetailSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // שומר את הנושא האחרון גם אחרי ש-topic הופך ל-null, כדי שיהיה מה להציג
  // בזמן אנימציית היציאה (במקום שהתוכן ייעלם מיידית לפני שהגיליון נסגר).
  // עדכון ה-state קורה תוך כדי רינדור, לא ב-effect - התבנית המומלצת
  // ל"עדכון state בעקבות שינוי prop" (react.dev/learn/you-might-not-need-an-effect).
  const [renderedTopic, setRenderedTopic] = useState<Topic | null>(topic);
  if (topic && topic !== renderedTopic) {
    setRenderedTopic(topic);
  }

  const open = !!topic;
  const breakdown = renderedTopic ? getStanceBreakdown(renderedTopic) : null;
  const done = renderedTopic ? isOpened(renderedTopic.id) : false;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && renderedTopic && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-navy-dark/60 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col rounded-t-3xl bg-background shadow-2xl focus:outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-[440px] sm:rounded-none"
                initial={isDesktop ? { x: "100%" } : { y: "100%" }}
                animate={isDesktop ? { x: 0 } : { y: 0 }}
                exit={isDesktop ? { x: "100%" } : { y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 320 }}
              >
                <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-gray sm:hidden" />

                <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray px-5 py-4">
                  <div>
                    <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-sapphire/10 px-3 py-1 text-xs font-semibold text-sapphire">
                      <span aria-hidden>{categoryIcons[renderedTopic.category]}</span>
                      {renderedTopic.category}
                    </span>
                    <Dialog.Title asChild>
                      <h3 className="font-display text-lg font-normal leading-snug text-navy">
                        {renderedTopic.title}
                      </h3>
                    </Dialog.Title>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="סגור"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-dark transition-colors hover:bg-gray-light hover:text-navy cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>

                <SheetInner
                  key={renderedTopic.id}
                  topic={renderedTopic}
                  breakdown={breakdown}
                  done={done}
                  onMarkDone={onMarkDone}
                />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
