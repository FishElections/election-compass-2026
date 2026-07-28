/**
 * צורות הדגל עצמן — שני הפסים ומגן הדוד — בלי פילטר, מסכה או אנימציה.
 * משותף ל-WavingFlag (דסקטופ) ול-StaticFlagBackdrop (נייד) כדי ששתי
 * הגרסאות לא ייפרדו ויזואלית כשמשנים את הציור.
 *
 * דקורטיבי בלבד וזהה בכל כיווני הכתיבה, ולכן הקואורדינטות פיזיות ולא לוגיות.
 */
export function FlagArt() {
  return (
    <>
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
    </>
  );
}
