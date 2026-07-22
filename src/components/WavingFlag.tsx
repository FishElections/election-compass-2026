interface WavingFlagProps {
  className?: string;
}

const BAND_COUNT = 12;
const BAND_HEIGHT = 480 / BAND_COUNT;

/**
 * דגל ישראל דקורטיבי, מצויר ב-SVG.
 * אפקט הבד המרוט מתקבל מסינון feTurbulence/feDisplacementMap חד-פעמי,
 * ותנועת ההתנפנפות מתקבלת מהזזה אופקית מדורגת (CSS) של רצועות אופקיות -
 * גישה שמבטיחה ריפוד ויזואלי אמין בדפדפן, בניגוד לאנימציית SMIL על
 * פרמטרי פילטר שאינה תמיד נצבעת מחדש.
 */
export function WavingFlag({ className }: WavingFlagProps) {
  return (
    <svg
      viewBox="0 0 660 480"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <style>{`
          @keyframes waving-flag-flutter {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(7px); }
          }
          .waving-flag-band {
            animation: waving-flag-flutter 3.6s ease-in-out infinite;
          }
        `}</style>

        <filter id="flag-wave" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            numOctaves="2"
            seed="7"
            baseFrequency="0.01 0.03"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <radialGradient id="flag-fade" cx="50%" cy="50%" r="70%">
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="flag-mask">
          <rect x="0" y="0" width="660" height="480" fill="url(#flag-fade)" />
        </mask>

        <g id="flag-art" filter="url(#flag-wave)">
          <rect x="0" y="0" width="660" height="480" fill="white" />
          <rect x="0" y="45" width="660" height="75" fill="var(--color-sapphire)" />
          <rect x="0" y="360" width="660" height="75" fill="var(--color-sapphire)" />
          <g
            transform="translate(330,240) scale(75)"
            fill="none"
            stroke="var(--color-sapphire)"
            strokeWidth="0.11"
          >
            <path d="M 0,-1 L 0.866,0.5 L -0.866,0.5 Z" />
            <path d="M 0,1 L -0.866,-0.5 L 0.866,-0.5 Z" />
          </g>
        </g>

        {Array.from({ length: BAND_COUNT }).map((_, i) => (
          <clipPath key={i} id={`flag-band-clip-${i}`}>
            <rect
              x={-20}
              y={i * BAND_HEIGHT}
              width={700}
              height={BAND_HEIGHT + 1}
            />
          </clipPath>
        ))}
      </defs>

      <g mask="url(#flag-mask)">
        {Array.from({ length: BAND_COUNT }).map((_, i) => (
          <g
            key={i}
            clipPath={`url(#flag-band-clip-${i})`}
            className="waving-flag-band"
            style={{ animationDelay: `${i * -0.22}s` }}
          >
            <use href="#flag-art" />
          </g>
        ))}
      </g>
    </svg>
  );
}
