"use client";

import { useState, type KeyboardEvent } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Party, PlatformTopicKey } from "@/types";
import { getPlatformTopics } from "@/data/platformTopics";
import { PartyLogo } from "@/components/PartyLogo";
import { BallotLetterBadge } from "@/components/BallotLetterBadge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { TrackRecordItems } from "@/components/trackRecord/TrackRecordSections";
import { trackEvent } from "@/lib/analytics";

/** מרחק (px) או מהירות (px/s) של גרירה כלפי מטה שסוגרים את הגיליון בנייד. */
const DISMISS_OFFSET = 120;
const DISMISS_VELOCITY = 600;
/** מרחק החלקה אופקית שמחליף מפלגה — אותו סף כמו בשאלון. */
const SWIPE_THRESHOLD = 70;

/** איך עבר המשתמש בין מפלגות בתוך הפאנל — לאירוע platform_open. */
export type PartyNavigationSource = "button" | "key" | "swipe";

interface PartyDetailSheetProps {
  party: Party | null;
  defaultTopicKey?: PlatformTopicKey | null;
  onClose: () => void;
  /** מעבר למפלגה הבאה (1) או הקודמת (-1) בלי לסגור את הפאנל. */
  onNavigate?: (delta: 1 | -1, source: PartyNavigationSource) => void;
}

export function PartyDetailSheet({
  party,
  defaultTopicKey,
  onClose,
  onNavigate,
}: PartyDetailSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const { dict, locale, dir } = useDictionary();
  const labels = dict.platforms.partyDetailSheet;
  const platformTopics = getPlatformTopics(locale);
  // The panel is anchored to the reading-start edge (right in RTL, left in
  // LTR) — it must also slide in/out from that same edge, so the offscreen
  // x position flips with direction instead of always being "100%".
  const offscreenX = dir === "rtl" ? "100%" : "-100%";

  // שומר את המפלגה האחרונה גם אחרי ש-party הופך ל-null, כדי שיהיה מה להציג
  // בזמן אנימציית היציאה (במקום שהתוכן ייעלם מיידית לפני שהגיליון נסגר).
  const [renderedParty, setRenderedParty] = useState<Party | null>(party);
  // הנושא הפתוח באקורדיון. נקבע מחדש רק כשהפאנל נפתח (מ-null למפלגה), ונשמר
  // במעבר בין מפלגות — כך משווים את אותו נושא בין מפלגות.
  const [openTopic, setOpenTopic] = useState<string>("");
  const [prevParty, setPrevParty] = useState<Party | null>(null);
  // כיוון המעבר האחרון (1 = הבאה, -1 = הקודמת, 0 = פתיחה), לאנימציית התוכן.
  const [navDir, setNavDir] = useState<0 | 1 | -1>(0);
  if (party !== prevParty) {
    setPrevParty(party);
    if (party && !prevParty) {
      setOpenTopic(defaultTopicKey ?? party.platform[0]?.topicKey ?? "");
      setNavDir(0);
    }
  }
  if (party && party !== renderedParty) {
    setRenderedParty(party);
  }

  const open = !!party;

  const navigate = (delta: 1 | -1, source: PartyNavigationSource) => {
    if (!onNavigate) return;
    setNavDir(delta);
    onNavigate(delta, source);
  };

  // "קדימה" בכיוון הקריאה: שמאלה בעברית/ערבית, ימינה באנגלית.
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const target = e.target as HTMLElement;
    if (target.closest("input, textarea, [contenteditable]")) return;
    e.preventDefault();
    const forward = dir === "rtl" ? e.key === "ArrowLeft" : e.key === "ArrowRight";
    navigate(forward ? 1 : -1, "key");
  };

  // Forward = flick against the reading direction (LTR: swipe left, RTL: swipe
  // right), same as the quiz cards.
  const handleSwipeEnd = (_e: unknown, info: PanInfo) => {
    const off = info.offset.x;
    if (Math.abs(off) < SWIPE_THRESHOLD) return;
    const forward = dir === "rtl" ? off > 0 : off < 0;
    navigate(forward ? 1 : -1, "swipe");
  };

  const handleSheetDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_OFFSET || info.velocity.y > DISMISS_VELOCITY) {
      onClose();
    }
  };

  // התוכן החדש נכנס מכיוון התנועה: "הבאה" נכנסת מצד סוף הקריאה.
  const enterX = reduceMotion ? 0 : navDir * (dir === "rtl" ? -24 : 24);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && renderedParty && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-navy-dark/60 lg:backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                onKeyDown={handleKeyDown}
                className="fixed inset-x-0 bottom-0 z-50 h-[85dvh] focus:outline-none sm:inset-y-0 sm:end-auto sm:start-0 sm:h-full sm:w-[440px]"
                initial={isDesktop ? { x: offscreenX } : { y: "100%" }}
                animate={isDesktop ? { x: 0 } : { y: 0 }}
                exit={isDesktop ? { x: offscreenX } : { y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 320 }}
              >
                {/* שכבה נפרדת לגרירה-לסגירה בנייד: אם הגרירה והכניסה חולקות את
                   אותו y, אילוצי הגרירה עוצרים את אנימציית הכניסה והגיליון
                   נשאר מחוץ למסך. הגרירה מתחילה רק מהידית ומהכותרת
                   (dragListener=false), כדי לא להתנגש בגלילת התוכן. */}
                <motion.div
                  drag={isDesktop ? false : "y"}
                  dragListener={false}
                  dragControls={dragControls}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 1 }}
                  onDragEnd={handleSheetDragEnd}
                  className="flex h-full flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-none"
                >
                  <div
                    onPointerDown={(e) => !isDesktop && dragControls.start(e)}
                    className="shrink-0 touch-none sm:touch-auto"
                  >
                    <div className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-gray sm:hidden" />

                    <div className="flex items-center justify-between gap-3 border-b border-gray px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <PartyLogo party={renderedParty} size="md" />
                        <div className="min-w-0">
                          <Dialog.Title asChild>
                            <h3 className="font-display truncate text-lg font-normal leading-snug text-navy">
                              {renderedParty.name}
                            </h3>
                          </Dialog.Title>
                          <p className="truncate text-sm text-gray-dark">
                            {renderedParty.leader} · {renderedParty.spectrum}
                          </p>
                        </div>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          aria-label={labels.close}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-dark transition-colors hover:bg-gray-light hover:text-navy cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>

                  {/* שכבה חיצונית: החלקה אופקית בין מפלגות (נייד בלבד — בעכבר
                      היא הייתה מתנגשת בסימון טקסט). שכבה פנימית, ממופתחת לפי
                      מפלגה: גלילה מתאפסת והתוכן נכנס מכיוון התנועה. */}
                  <motion.div
                    drag={isDesktop || !onNavigate ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    dragDirectionLock
                    onDragEnd={handleSwipeEnd}
                    className="flex min-h-0 flex-1 touch-pan-y flex-col"
                  >
                    <motion.div
                      key={renderedParty.id}
                      initial={{ opacity: 0, x: enterX }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                      className="flex-1 overflow-y-auto overscroll-contain px-5 py-5"
                    >
                      <p className="rounded-xl bg-gray-light px-4 py-3 text-sm leading-relaxed text-navy">
                        {renderedParty.shortDescription}
                      </p>

                      <div className="mt-4">
                        <BallotLetterBadge party={renderedParty} />
                      </div>

                      <div className="mt-5">
                        <Accordion
                          type="single"
                          collapsible
                          value={openTopic}
                          onValueChange={setOpenTopic}
                        >
                          {renderedParty.platform.map((topic) => (
                            <AccordionItem key={topic.topicKey} value={topic.topicKey}>
                              <AccordionTrigger>
                                {platformTopics.find((t) => t.key === topic.topicKey)?.icon}{" "}
                                {topic.topicName}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="mb-3 text-sm leading-relaxed text-foreground">
                                  {topic.summary}
                                </p>
                                <ul className="flex flex-col gap-1.5">
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
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                          {/* Same accordion as the topics: one section open at a time. */}
                          <TrackRecordItems party={renderedParty} />
                        </Accordion>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* מוכרז רק במעבר בין מפלגות, לא בפתיחה (אז הכותרת כבר מוכרזת). */}
                  <p className="sr-only" aria-live="polite">
                    {navDir !== 0 ? renderedParty.name : ""}
                  </p>

                  <div className="shrink-0 border-t border-gray px-5 pb-3 pt-4">
                    <div className="flex items-center gap-2">
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => navigate(-1, "button")}
                          aria-label={labels.previousParty}
                          title={labels.previousParty}
                          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-gray text-navy transition-colors hover:border-sapphire active:scale-95"
                        >
                          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                        </button>
                      )}
                      <Link
                        href={`/parties/${renderedParty.id}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-sapphire px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-sapphire-light"
                      >
                        {labels.fullProfileCta}
                        <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                      </Link>
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => navigate(1, "button")}
                          aria-label={labels.nextParty}
                          title={labels.nextParty}
                          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-gray text-navy transition-colors hover:border-sapphire active:scale-95"
                        >
                          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
                        </button>
                      )}
                    </div>
                    <Link
                      href="/quiz?mode=short"
                      onClick={() => trackEvent("platform_cta_quiz", { location: "panel" })}
                      className="mt-2.5 flex items-center justify-center gap-1 text-sm font-semibold text-sapphire hover:underline"
                    >
                      {labels.quizCta}
                      <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
