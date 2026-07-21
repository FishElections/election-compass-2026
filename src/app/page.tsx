import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ListChecks,
  ChevronLeft,
  Lock,
  ScrollText,
  Brain,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-10 pt-16 text-center sm:pt-24">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white shadow-ambient-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h1 className="font-display text-4xl font-normal leading-tight text-navy sm:text-6xl">
            מצפן בחירות 2026
          </h1>
          <p className="text-gradient-sapphire-emerald mt-3 text-xl font-bold sm:text-2xl">
            למי הכי מתאים לך להצביע?
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-dark sm:text-lg">
            ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה
            ביותר. השוואה מבוססת נתונים, בלי הטיה ובלי פרסום.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-5 sm:grid-cols-5">
          <Link
            href="/quiz?mode=short"
            className="group block sm:col-span-3"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-white shadow-ambient-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-6px_rgba(37,99,235,0.4)]">
              <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="font-display relative z-10 text-2xl font-normal">
                מסלול מהיר
              </h2>
              <p className="relative z-10 mt-2 flex-1 text-sm leading-relaxed text-white/75">
                20 שאלות מרכזיות שייתנו לכם תמונה מהירה וברורה. מתאים כשהזמן
                קצר.
              </p>
              <div className="relative z-10 mt-6 flex items-center justify-between text-sm">
                <span className="rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-md">
                  כ־3 דקות
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  התחילו כאן
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          <Link href="/quiz?mode=long" className="group block sm:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-gray/80 bg-white p-8 shadow-ambient transition-all duration-200 group-hover:-translate-y-1 group-hover:border-sapphire/50 group-hover:shadow-ambient-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sapphire/10 text-sapphire">
                <ListChecks className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-normal text-navy">
                מסלול מקיף
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-dark">
                50 שאלות על פני כל הנושאים, לתוצאה מדויקת ומעמיקה יותר.
              </p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="rounded-full bg-gray-light px-3 py-1 font-medium text-navy">
                  כ־8 דקות
                </span>
                <span className="flex items-center gap-1 font-semibold text-navy">
                  התחילו כאן
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </Link>

          <Link href="/platforms" className="group block sm:col-span-2">
            <div className="flex h-full items-center gap-4 rounded-3xl border border-gray/80 bg-white p-6 shadow-ambient transition-all duration-200 group-hover:-translate-y-1 group-hover:border-success/50">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                <ScrollText className="h-5 w-5" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-navy">סיכומי מצעי המפלגות</h3>
                <p className="text-sm text-gray-dark">
                  עמדות רשמיות, נושא אחרי נושא
                </p>
              </div>
              <ChevronLeft className="h-4 w-4 shrink-0 text-gray-dark transition-transform group-hover:-translate-x-1" />
            </div>
          </Link>

          <Link href="/challenge" className="group block sm:col-span-3">
            <div className="flex h-full items-center gap-4 rounded-3xl border border-amber/30 bg-amber-light/30 p-6 shadow-ambient transition-all duration-200 group-hover:-translate-y-1 group-hover:border-amber/60">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
                <Brain className="h-5 w-5" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-navy">מפרק הבועות</h3>
                <p className="text-sm text-gray-dark">
                  בדקו את הפתיחות המחשבתית שלכם מול הטיעונים החזקים ביותר של
                  המחנה הנגדי
                </p>
              </div>
              <ChevronLeft className="h-4 w-4 shrink-0 text-gray-dark transition-transform group-hover:-translate-x-1" />
            </div>
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gray-light px-5 py-3 text-sm text-gray-dark">
          <Lock className="h-4 w-4 shrink-0 text-navy" />
          <span>התשובות שלכם אנונימיות לחלוטין ואינן נשמרות בשרת.</span>
        </div>
      </div>
    </main>
  );
}
