import { FlagArt } from "@/components/FlagArt";

interface StaticFlagBackdropProps {
  className?: string;
}

/**
 * גרסת הנייד של רקע הדגל: אותה תמונה בדיוק, בלי שום דבר שעולה כסף בזמן ריצה.
 *
 * WavingFlag משרטט 12 רצועות, כל אחת <use> של ציור שנושא פילטר
 * feTurbulence+feDisplacementMap, וכולן מונפשות infinite. מדידה בדפדפן:
 * הפילטר מייקר את הרסטריזציה פי ~4 (1.46ms מול 0.35ms לפריים) — וזה על
 * מעבד דסקטופ; feTurbulence מרונדר ב-CPU ולא ב-GPU, כך שבטלפון זה כפול כמה.
 * הרקע מרונדר ב-488x940 CSS px (גדול מה-viewport) = ~1.8M פיקסלי מכשיר ב-DPR 2.
 *
 * באטימות 0.12 גם הנפנוף וגם רעש הבד אינם נראים ממילא, ולכן בנייד מציירים
 * את הדגל פעם אחת, סטטי. בלי will-change — אין מה להעלות לשכבת קומפוזיטור
 * כשכלום לא זז.
 */
export function StaticFlagBackdrop({ className }: StaticFlagBackdropProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 660 480"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* מזהים נפרדים מאלה של WavingFlag: שני ה-SVG חיים באותו מסמך
              (הענף השני רק display:none), ו-url(#id) נפתר לפי סדר המסמך. */}
          <radialGradient id="static-flag-fade" cx="50%" cy="50%" r="70%">
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="static-flag-mask">
            <rect
              x="0"
              y="0"
              width="660"
              height="480"
              fill="url(#static-flag-fade)"
            />
          </mask>
        </defs>

        <g mask="url(#static-flag-mask)">
          <FlagArt />
        </g>
      </svg>
    </div>
  );
}
