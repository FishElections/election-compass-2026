"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { Party, PlatformTopicKey } from "@/types";
import { platformTopics } from "@/data/platformTopics";
import { PartyLogo } from "@/components/PartyLogo";
import { BallotLetterBadge } from "@/components/BallotLetterBadge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const labels = {
  close: "סגור",
  fullProfileCta: "לצפייה בפרופיל המלא",
};

interface PartyDetailSheetProps {
  party: Party | null;
  defaultTopicKey?: PlatformTopicKey | null;
  onClose: () => void;
}

export function PartyDetailSheet({ party, defaultTopicKey, onClose }: PartyDetailSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // שומר את המפלגה האחרונה גם אחרי ש-party הופך ל-null, כדי שיהיה מה להציג
  // בזמן אנימציית היציאה (במקום שהתוכן ייעלם מיידית לפני שהגיליון נסגר).
  const [renderedParty, setRenderedParty] = useState<Party | null>(party);
  if (party && party !== renderedParty) {
    setRenderedParty(party);
  }

  const open = !!party;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {open && renderedParty && (
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
                className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col rounded-t-3xl bg-background shadow-2xl focus:outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-[440px] sm:rounded-none"
                initial={isDesktop ? { x: "100%" } : { y: "100%" }}
                animate={isDesktop ? { x: 0 } : { y: 0 }}
                exit={isDesktop ? { x: "100%" } : { y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 320 }}
              >
                <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-gray sm:hidden" />

                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray px-5 py-4">
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

                <div className="flex-1 overflow-y-auto px-5 py-5">
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
                      defaultValue={defaultTopicKey ?? undefined}
                      key={renderedParty.id + (defaultTopicKey ?? "")}
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
                    </Accordion>
                  </div>
                </div>

                <div className="shrink-0 border-t border-gray px-5 py-4">
                  <Link
                    href={`/parties/${renderedParty.id}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-sapphire px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-sapphire-light"
                  >
                    {labels.fullProfileCta}
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
