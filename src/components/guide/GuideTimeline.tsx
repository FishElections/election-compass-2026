"use client";

import { motion } from "framer-motion";
import { getFormationTimeline } from "@/data/electionGuide";
import { useDictionary } from "@/i18n/DictionaryProvider";

/** ציר הזמן מהקלפי ועד ממשלה - כל תחנה נדלקת בתורה בגלילה. */
export function GuideTimeline() {
  const { locale } = useDictionary();
  const formationTimeline = getFormationTimeline(locale);

  return (
    <div className="mt-7">
      {formationTimeline.map((step, i) => (
        <motion.div
          key={step.id}
          className="flex gap-4"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
        >
          <div className="flex flex-col items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[2.5px] border-sapphire bg-white text-xl">
              {step.emoji}
            </div>
            {i < formationTimeline.length - 1 && (
              <div className="min-h-6 w-[2.5px] flex-1 rounded bg-[repeating-linear-gradient(180deg,var(--color-sapphire),var(--color-sapphire)_4px,transparent_4px,transparent_9px)]" />
            )}
          </div>
          <div className="pb-6">
            <p className="font-bold text-navy">{step.title}</p>
            <p className="text-sm text-gray-dark">{step.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
