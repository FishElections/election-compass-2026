"use client";

import { motion, useReducedMotion } from "framer-motion";
import { THRESHOLD_PERCENT } from "@/data/electionGuide";
import { useDictionary } from "@/i18n/DictionaryProvider";

/**
 * דלת אחוז החסימה: מפלגה אחת (4.1%) נכנסת, אחת (2.9%) מוקפצת החוצה.
 * בלי אנימציה (reduced motion) - שתי הדמויות פשוט עומדות במקומן.
 */
export function ThresholdDoor() {
  const reduceMotion = useReducedMotion();
  const { dict } = useDictionary();

  return (
    <div
      className="mx-auto mt-8 flex w-fit items-end justify-center gap-5"
      role="img"
      aria-label={dict.guide.thresholdDoorAlt.replace(
        "{threshold}",
        THRESHOLD_PERCENT
      )}
    >
      <motion.div
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral text-xs font-extrabold text-white"
        animate={reduceMotion ? undefined : { x: [52, 6, 58, 58] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0.2, 0.45, 0.6, 1] }
        }
      >
        2.9%
      </motion.div>

      <div className="relative flex h-[148px] w-[108px] items-center justify-center rounded-t-xl bg-navy">
        <span className="absolute -top-8 rounded-lg bg-amber px-3 py-0.5 text-[13px] font-extrabold text-white">
          {THRESHOLD_PERCENT}+
        </span>
        <div className="h-[122px] w-[66px] rounded-t-lg bg-gradient-to-b from-white to-sapphire/20" />
      </div>

      <motion.div
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-success text-xs font-extrabold text-white"
        animate={reduceMotion ? undefined : { x: [46, -14, -14] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0.2, 0.55, 1] }
        }
      >
        4.1%
      </motion.div>
    </div>
  );
}
