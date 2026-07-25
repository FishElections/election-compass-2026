/**
 * תוכן עמוד "איך הבחירות בישראל עובדות?" (/how-it-works).
 *
 * עקרונות:
 * - כל עובדה כוללת sourceUrl למקור רשמי. עובדה בלי מקור לא נכנסת.
 *   יש לוודא את תקינות הקישורים לפני כל דיפלוי.
 * - אפס אזכורים של מפלגות או פוליטיקאים אמיתיים - הדוגמאות גנריות
 *   בכוונה ("הסגולים", "הכתומים") כדי לשמור על ניטרליות מוחלטת.
 */

export interface GuideFact {
  emoji: string;
  /** מילה/ביטוי פותח מודגש ("עובדה משוגעת:") */
  lead: string;
  /** גוף העובדה; הקטע בין [[ ]] יודגש במרקר */
  text: string;
  sourceUrl: string;
}

export interface TimelineStep {
  emoji: string;
  title: string;
  text: string;
}

export interface ToyParty {
  name: string;
  seats: number;
  color: string;
}

/** פתקי הדגמה בפרגוד (אותיות דמיוניות) */
export const demoSlips = [
  { letters: "פּ", party: "הסגולים" },
  { letters: "זז", party: "הכתומים" },
  { letters: "קו", party: "הטורקיזים" },
];

/** מפלגות דמיוניות לצעצוע הקואליציה. סה"כ 120 מנדטים. */
export const toyParties: ToyParty[] = [
  { name: "הסגולים", seats: 24, color: "#7c3aed" },
  { name: "הכתומים", seats: 19, color: "#f97316" },
  { name: "הטורקיזים", seats: 17, color: "#0e7490" },
  { name: "הירוקים", seats: 15, color: "#059669" },
  { name: "הכחולים", seats: 14, color: "#2563eb" },
  { name: "הענבר", seats: 12, color: "#d97706" },
  { name: "האפורים", seats: 10, color: "#475569" },
  { name: "הוורודים", seats: 9, color: "#db2777" },
];

/** ציר הזמן מהקלפי ועד ממשלה */
export const formationTimeline: TimelineStep[] = [
  {
    emoji: "🗳️",
    title: "יום הבחירות",
    text: "יום שבתון. מצביעים, ונחים.",
  },
  {
    emoji: "📊",
    title: "תוצאות רשמיות",
    text: "ועדת הבחירות המרכזית סופרת הכול, כולל המעטפות הכפולות.",
  },
  {
    emoji: "🤝",
    title: "הנשיא מתייעץ",
    text: "כל מפלגה ממליצה לנשיא המדינה מי צריך להרכיב את הממשלה.",
  },
  {
    emoji: "🧩",
    title: "מרכיבים קואליציה",
    text: "מי שקיבל את המנדט מהנשיא מנסה להגיע ל-61 תומכים. יש דדליין: עד 28 יום, עם אפשרות הארכה.",
  },
  {
    emoji: "✅",
    title: "הכנסת מצביעה אמון",
    text: "עברה ההצבעה? יש לישראל ממשלה חדשה. 🎉",
  },
];

/** עובדות "למה להצביע" (תחנה 6) */
export const whyVoteFacts: GuideFact[] = [
  {
    emoji: "⚖️",
    lead: "זה צמוד:",
    text: "מנדט אחרון נסגר לפעמים בפער של [[אלפי קולות בודדים]] - בערך כיתה אחת של בית ספר.",
    sourceUrl: "https://www.bechirot.gov.il/",
  },
  {
    emoji: "🏖",
    lead: "אין תירוץ:",
    text: "יום הבחירות הוא [[יום שבתון בתשלום]]. אפשר להצביע וגם להספיק ים.",
    sourceUrl: "https://www.bechirot.gov.il/",
  },
  {
    emoji: "✉️",
    lead: "כולם מצביעים:",
    text: "חיילים, מאושפזים, דיפלומטים ואפילו ימאים בלב ים - כולם מצביעים [[במעטפות כפולות]].",
    sourceUrl: "https://www.bechirot.gov.il/",
  },
];

/** עובדות נקודתיות בתחנות */
export const stationFacts = {
  ballotLetters: {
    emoji: "💡",
    lead: "מילה חדשה!",
    text: "האותיות על הפתקים הן, בין השאר, [[מסורת מימי המדינה הצעירה]], כשחלק מהבוחרים עוד לא קראו עברית.",
    sourceUrl: "https://www.bechirot.gov.il/",
  },
  wastedVotes: {
    emoji: "🎈",
    lead: "עובדה משוגעת:",
    text: "היו מערכות בחירות שבהן [[מאות אלפי קולות פשוט נעלמו]] - הלכו למפלגות שלא עברו את אחוז החסימה.",
    sourceUrl: "https://www.bechirot.gov.il/",
  },
  directElection: {
    emoji: "😯",
    lead: "רגע, מה?!",
    text: "בין 1996 ל-2001 ישראל דווקא ניסתה [[בחירה ישירה לראש הממשלה]] - והרעיון בוטל וחזרנו לשיטה הישנה.",
    sourceUrl: "https://main.knesset.gov.il/",
  },
} satisfies Record<string, GuideFact>;

export const VOTES_PER_SEAT_APPROX = "40,000";
export const THRESHOLD_PERCENT = "3.25%";
export const MAGIC_NUMBER = 61;
export const TOTAL_SEATS = 120;
