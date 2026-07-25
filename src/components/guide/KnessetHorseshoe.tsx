"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TOTAL_SEATS } from "@/data/electionGuide";

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

/** פרסת 120 מושבי הכנסת, מתמלאת מושב-מושב בגלילה. */
export function KnessetHorseshoe() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="mx-auto mt-7 w-fit text-center">
      <svg
        width="320"
        height="180"
        viewBox="0 0 320 180"
        role="img"
        aria-label={`איור של ${TOTAL_SEATS} מושבי הכנסת מסודרים בחצי גורן, צבועים לפי חלוקה דמיונית בין מפלגות`}
        className="max-w-full"
      >
        {seats.map((seat, i) => (
          <motion.circle
            key={i}
            cx={seat.cx}
            cy={seat.cy}
            r={5.2}
            fill={seat.color}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.012 }}
            style={{ transformOrigin: `${seat.cx}px ${seat.cy}px` }}
          />
        ))}
      </svg>
      <figcaption className="mt-1 text-xs text-gray-dark">
        כך זה יכול להיראות (חלוקה דמיונית לגמרי)
      </figcaption>
    </figure>
  );
}
