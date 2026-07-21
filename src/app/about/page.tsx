import { Info, Lock, Calculator } from "lucide-react";

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
          שנע בין 2- (נגד מאוד) ל-2+ (בעד מאוד). ההפרש המרבי האפשרי בכל שאלה
          הוא 4. אחוז ההתאמה הכולל מחושב לפי הנוסחה:
        </p>
        <div
          className="mt-4 overflow-x-auto rounded-xl border border-sapphire/20 bg-sapphire/5 p-4 text-center text-sm font-medium text-navy"
          dir="ltr"
        >
          Score(%) = (1 − Σ|U − P| / (4 × N)) × 100
        </div>
        <p className="mt-4 leading-relaxed text-gray-dark">
          כאשר U היא עמדתכם בכל שאלה, P היא עמדת המפלגה, ו-N הוא מספר השאלות
          שעניתם עליהן. ככל שהעמדות קרובות יותר, אחוז ההתאמה גבוה יותר.
          המפלגות מדורגות מהגבוהה להתאמה הנמוכה ביותר.
        </p>

        <h2 className="font-display mt-10 mb-3 flex items-center gap-2 text-xl font-normal text-navy">
          <Lock className="h-5 w-5 text-success" />
          פרטיות
        </h2>
        <p className="leading-relaxed text-gray-dark">
          התשובות שלכם אנונימיות לחלוטין ואינן נשמרות בשרת. כל החישוב מתבצע
          בדפדפן שלכם בלבד, וברגע שתסגרו את הדף התשובות נמחקות.
        </p>
      </div>
    </main>
  );
}
