"use client";

/**
 * פרסת 120 מושבי הכנסת, צבועה לפי חלוקת מנדטים אמיתית (לא דמו).
 *
 * שלא כמו KnessetHorseshoe שבמדריך - שהוא דקורטיבי עם צבעים דמיוניים -
 * כאן כל מושב נצבע בצבע המפלגה שקיבלה אותו בתוחלת הסימולציה, והמושבים
 * מסודרים לפי זווית (מקשת שמאל לקשת ימין) כך שכל מפלגה מופיעה כטריז רציף.
 *
 * הגיאומטריה זהה ל-KnessetHorseshoe בכוונה (אותן 4 קשתות, אותו עיגול
 * לעשירית) כדי לשמור על עקביות ויזואלית ולמנוע אי-התאמות הידרציה.
 */

const ROWS: Array<[radius: number, seats: number]> = [
  [150, 38],
  [122, 32],
  [94, 27],
  [66, 23],
];

interface SeatPos {
  cx: number;
  cy: number;
  angle: number;
}

// כל 120 המיקומים, ממוינים לפי זווית: PI (קצה אחד של הקשת) עד 0 (הקצה
// השני). הסדר הזה הופך רצף מפלגות לטריז ויזואלי רציף.
const seatPositions: SeatPos[] = (() => {
  const positions: SeatPos[] = [];
  for (const [radius, count] of ROWS) {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI - (Math.PI * i) / (count - 1);
      positions.push({
        cx: Math.round((160 + radius * Math.cos(angle)) * 10) / 10,
        cy: Math.round((170 - radius * Math.sin(angle)) * 10) / 10,
        angle,
      });
    }
  }
  // זווית יורדת = מעבר רציף לאורך חצי-הגורן.
  return positions.sort((a, b) => b.angle - a.angle);
})();

export interface KnessetSeatDatum {
  color: string;
  partyId: string;
}

interface KnessetSeatsProps {
  /** בדיוק 120 מושבים, כבר מסודרים לפי הגוש/מפלגה הרצויים. */
  seats: KnessetSeatDatum[];
  ariaLabel: string;
}

export function KnessetSeats({ seats, ariaLabel }: KnessetSeatsProps) {
  return (
    <svg
      width="320"
      height="188"
      viewBox="0 0 320 188"
      role="img"
      aria-label={ariaLabel}
      className="max-w-full"
    >
      {seatPositions.map((pos, i) => {
        const datum = seats[i];
        return (
          <circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r={5.2}
            fill={datum ? datum.color : "#e2e8f0"}
            stroke="#ffffff"
            strokeWidth={0.8}
          />
        );
      })}
    </svg>
  );
}
