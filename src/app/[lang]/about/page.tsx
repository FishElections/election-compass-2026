import type { Metadata } from "next";
import { Info, Lock, Calculator, Users, Mail } from "lucide-react";

// lucide-react dropped brand icons, so inline the official LinkedIn glyph.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const builders = [
  {
    name: "אוהד בר אלי",
    photo: "/team/ohad.jpg",
    linkedin: "https://www.linkedin.com/in/ohad-bar-eli-26181215b",
    email: "ohadoo20@gmail.com",
  },
  {
    name: "איתי אילת",
    photo: "/team/itay.jpg",
    linkedin: "https://www.linkedin.com/in/itayeylath/",
    email: "itay.ey@gmail.com",
  },
];

export const metadata: Metadata = {
  title: "מי אנחנו ואיך מחושבת ההתאמה",
  description:
    "מצפן בחירות 2026 הוא כלי חינמי ובלתי תלוי לבדיקת התאמה למפלגות. גלו איך מחושב אחוז ההתאמה, מה זה מדד המרחק ומדד הכיוון, ומי עומד מאחורי הפרויקט.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-8 lg:pt-20">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-ambient-lg">
            <Info className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            אודות מצפן בחירות 2026
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16">
        <p className="leading-relaxed text-gray-dark">
          מצפן בחירות 2026 הוא כלי חינמי ובלתי תלוי שנועד לעזור לכם להבין
          אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה ביותר, על סמך
          תשובותיכם לשאלון עמדות במגוון נושאי ליבה.
        </p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Calculator className="h-5 w-5 text-sapphire" />
          איך מחושבת ההתאמה?
        </h2>
        <p className="leading-relaxed text-gray-dark">
          לכל שאלה שעניתם עליה, אנו משווים בין העמדה שלכם לעמדת כל מפלגה, בסולם
          שנע בין 2- (נגד מאוד) ל-2+ (בעד מאוד). אחוז ההתאמה הסופי הוא ממוצע של
          שני מדדים משלימים, שכל אחד מהם תופס היבט אחר של &quot;התאמה&quot;:
        </p>
        <div
          className="mt-4 overflow-x-auto rounded-xl border border-sapphire/20 bg-sapphire/5 p-4 text-center text-sm font-medium text-navy"
          dir="ltr"
        >
          Score(%) = 0.5 × DistanceScore + 0.5 × DirectionScore
        </div>
        <p className="mt-4 leading-relaxed text-gray-dark">
          <strong>מדד המרחק</strong>{" "}
          בודק כמה קרובות העמדות בפועל, מספר מול
          מספר: DistanceScore = (1 − Σ(wᵢ × |Uᵢ − Pᵢ|) / Σ(wᵢ × 4)) × 100,
          כאשר U היא עמדתכם, P היא עמדת המפלגה, ו-w הוא משקל השאלה.
        </p>
        <p className="mt-4 leading-relaxed text-gray-dark">
          <strong>מדד הכיוון</strong>{" "}
          בודק דבר אחר: האם הכיוון הכללי של
          העמדות שלכם תואם את כיוון המפלגה על פני כל השאלות יחד, גם אם
          העוצמה שונה (למשל: אתם &quot;בעד&quot; והמפלגה &quot;בעד
          מאוד&quot; באותו נושא בדיוק). בלי המדד הזה, מפלגה שנוקטת עמדות
          מתונות באופן עקבי הייתה זוכה ליתרון לא-מוצדק במדד המרחק לבדו, גם
          מול מי שבבירור מתאים אידאולוגית למפלגה אחרת שנוקטת עמדות נחרצות
          יותר.
        </p>
        <p className="mt-4 leading-relaxed text-gray-dark">
          המפלגות מדורגות מהגבוהה להתאמה הנמוכה ביותר. משקל השאלה (w) מורכב
          משני מרכיבים: במסלול המקיף תוכלו לסמן נושאים שחשובים לכם יותר, וזה
          מייצר משקל גבוה יותר לשאלות בקטגוריה הזו. בנוסף, לכל שאלה יש
          &quot;משקל קיטוב&quot; מובנה, שנגזר ממידת המחלוקת בין המפלגות עליה
          בפועל: שאלה שבה המפלגות מפוזרות על פני כל הסולם (נושא שנוי במחלוקת
          אמיתי) משפיעה יותר על התוצאה משאלה שבה כמעט כל המפלגות מסכימות, כדי
          שההתאמה תשקף בעיקר את מה שבאמת מבדיל בין המפלגות.
        </p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Lock className="h-5 w-5 text-success" />
          פרטיות
        </h2>
        <p className="leading-relaxed text-gray-dark">
          התשובות שלכם אנונימיות לחלוטין ואינן נשמרות בשרת. כל החישוב מתבצע
          בדפדפן שלכם בלבד, וברגע שתסגרו את הדף התשובות נמחקות.
        </p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Users className="h-5 w-5 text-amber" />
          מי בנה את זה
        </h2>
        <p className="leading-relaxed text-gray-dark">
          מצפן בחירות 2026 נבנה בהתנדבות על ידי שני יזמים עצמאיים, מתוך אמונה
          בכלי חינמי, שקוף ובלתי תלוי לבוחר הישראלי.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {builders.map((b) => (
            <div
              key={b.email}
              className="flex flex-col items-center rounded-2xl border border-sapphire/15 bg-white p-6 text-center shadow-ambient-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small static asset from public/, next/image's overhead isn't worth it here */}
              <img
                src={b.photo}
                alt={b.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover shadow-sm ring-4 ring-sapphire/10"
              />
              <h3 className="font-display mt-4 text-lg font-normal text-navy">
                {b.name}
              </h3>
              <a
                href={b.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sapphire hover:underline"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${b.email}`}
                dir="ltr"
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-gray-dark hover:text-sapphire hover:underline"
              >
                <Mail className="h-4 w-4" />
                {b.email}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 leading-relaxed text-gray-dark">
          ותודה מכל הלב לטובה בני, בת זוגתי (של אוהד), שבזכות האמונה שלה
          בפרויקט הזה הוא קם ונולד.
        </p>
      </div>
    </main>
  );
}
