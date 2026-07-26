import { Info, Lock, Calculator, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-20 sm:pt-24">
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
          אוהד בר אלי (
          <a
            href="mailto:ohadoo20@gmail.com"
            className="text-sapphire hover:underline"
          >
            ohadoo20@gmail.com
          </a>
          ) ואיתי אילת (
          <a
            href="mailto:itay.ey@gmail.com"
            className="text-sapphire hover:underline"
          >
            itay.ey@gmail.com
          </a>
          )
        </p>
        <p className="mt-4 leading-relaxed text-gray-dark">
          ותודה מכל הלב לטובה בני, בת זוגתי (של אוהד), שבזכות האמונה שלה
          בפרויקט הזה הוא קם ונולד.
        </p>
      </div>
    </main>
  );
}
