"use client";

import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface GuideStationProps {
  index: number;
  kicker: string;
  title: string;
  children: ReactNode;
}

/** תחנה אחת במסע: נגלית בגלילה, ומדווחת צפייה לאנליטיקס פעם אחת. */
export function GuideStation({
  index,
  kicker,
  title,
  children,
}: GuideStationProps) {
  const tracked = useRef(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onViewportEnter={() => {
        if (!tracked.current) {
          tracked.current = true;
          trackEvent("guide_station", { station: index });
        }
      }}
      className="border-t-2 border-dashed border-gray/70 px-4 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-sapphire/10 px-4 py-1.5 text-sm font-bold text-sapphire">
          {kicker}
        </span>
        <h2 className="font-display text-2xl font-normal leading-snug text-navy sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
}
