"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TOTAL_SEATS } from "@/data/electionGuide";
import { useDictionary } from "@/i18n/DictionaryProvider";

/** 4 קשתות של מושבים, מהחיצונית לפנימית. סה"כ 120. */
const ROWS: Array<[radius: number, seats: number]> = [
  [150, 38],
  [122, 32],
  [94, 27],
  [66, 23],
];

/** צבעי הדגמה דמיוניים - במכוון לא צבעים של מפלגות אמיתיות ספציפיות. */
const DEMO_COLORS = [
  "#2563eb",
  "#10b981",
  "#d97706",
  "#f97316",
  "#7c3aed",
  "#0e7490",
];

const seats: Array<{ cx: number; cy: number; color: string }> = [];
{
  let seatIndex = 0;
  for (const [radius, count] of ROWS) {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI - (Math.PI * i) / (count - 1);
      // עיגול לעשירית: תוצאות sin/cos נבדלות ב-ULP בין Node לדפדפן,
      // וערך לא מעוגל גורם לאי-התאמת הידרציה.
      seats.push({
        cx: Math.round((160 + radius * Math.cos(angle)) * 10) / 10,
        cy: Math.round((170 - radius * Math.sin(angle)) * 10) / 10,
        color: DEMO_COLORS[Math.floor(seatIndex / 22) % DEMO_COLORS.length],
      });
      seatIndex++;
    }
  }
}

const seatContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012 } },
};

const seatVariant = {
  hidden: { opacity: 0, scale: 0.2 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/**
 * פרסת 120 מושבי הכנסת, מתמלאת מושב-מושב בגלילה.
 *
 * ה-viewport trigger יושב על ה-wrapper (אלמנט HTML), לא על כל <circle> בנפרד:
 * ל-Safari במובייל יש בעיה ידועה במעקב IntersectionObserver אחרי אלמנטי SVG
 * ישירות, מה שהשאיר את המושבים תקועים ב-opacity:0 (בלתי נראים) בלי שהאנימציה
 * אי-פעם מתחילה. observer יחיד על ה-div אמין בכל דפדפן, והמושבים יורשים את
 * מצב האנימציה דרך variants.
 */
export function KnessetHorseshoe() {
  const reduceMotion = useReducedMotion();
  const { dict } = useDictionary();
  const t = dict.guide.knessetHorseshoe;

  return (
    <figure className="mx-auto mt-7 w-fit text-center">
      <motion.div
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={seatContainer}
      >
        <svg
          width="320"
          height="180"
          viewBox="0 0 320 180"
          role="img"
          aria-label={t.ariaLabelTemplate.replace("{seats}", String(TOTAL_SEATS))}
          className="max-w-full"
        >
          {seats.map((seat, i) => (
            <motion.circle
              key={i}
              cx={seat.cx}
              cy={seat.cy}
              r={5.2}
              fill={seat.color}
              variants={seatVariant}
              style={{ transformOrigin: `${seat.cx}px ${seat.cy}px` }}
            />
          ))}
        </svg>
      </motion.div>
      <figcaption className="mt-1 text-xs text-gray-dark">
        {t.caption}
      </figcaption>
    </figure>
  );
}
