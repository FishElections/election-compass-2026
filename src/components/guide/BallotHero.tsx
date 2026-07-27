"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDictionary } from "@/i18n/DictionaryProvider";

/** קלפי מצוירת עם פתק שנופל פנימה בלופ עדין. */
export function BallotHero() {
  const reduceMotion = useReducedMotion();
  const { dict } = useDictionary();

  return (
    <div
      className="relative mx-auto mt-9 h-[150px] w-[190px]"
      role="img"
      aria-label={dict.guide.ballotHeroAlt}
    >
      <motion.div
        className="absolute right-[62px] z-0 flex h-[46px] w-[66px] items-center justify-center rounded-md border-2 border-navy bg-white text-2xl font-black text-navy"
        animate={
          reduceMotion
            ? undefined
            : { top: [-6, 0, 34, 46], opacity: [0, 1, 1, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.6, 0.8] }
        }
        style={{ top: reduceMotion ? 0 : undefined }}
      >
        פּ
      </motion.div>
      <div className="absolute bottom-0 z-10 h-24 w-[190px] rounded-2xl bg-gradient-to-br from-sapphire to-[#1d4ed8] shadow-[0_14px_34px_-10px_rgba(37,99,235,0.55)]">
        <div className="absolute -top-[7px] right-[35px] h-2 w-[120px] rounded-full bg-navy" />
      </div>
    </div>
  );
}
