import Link from "next/link";
import {
  Zap,
  ListChecks,
  ChevronLeft,
  Lock,
  ScrollText,
  Brain,
  Flame,
} from "lucide-react";
import { InteractiveFlagBackdrop } from "@/components/InteractiveFlagBackdrop";
import { CompassMark } from "@/components/CompassMark";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="relative overflow-hidden">
        <InteractiveFlagBackdrop className="pointer-events-none absolute -inset-y-16 inset-x-[-15%] opacity-[0.18]" />

        <div className="absolute left-3 top-3 z-20 flex -rotate-[8deg] flex-col overflow-hidden rounded shadow-md lg:hidden">
          <span className="bg-gradient-to-l from-success to-emerald-light px-3 py-1 text-[10px] font-bold tracking-wide text-white">
            100% אובייקטיבי
          </span>
          <span className="bg-white px-3 py-1 text-[10px] font-bold tracking-wide text-navy">
            0% ממומן
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-sapphire">
                <CompassMark animate className="h-6 w-6 text-sapphire" />
                <span>כלי אזרחי בלתי תלוי · בחירות 2026</span>
              </div>
              <h1 className="font-display text-4xl font-normal leading-[1.15] text-navy sm:text-6xl">
                למי הכי{" "}
                <span className="text-gradient-sapphire-emerald font-bold">
                  מתאים לך
                </span>{" "}
                להצביע?
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-dark sm:text-lg">
                ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה
                הטובה ביותר. אמלק; השוואה מבוססת נתונים, בלי הטיה ובלי פרסום.
              </p>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <div className="relative flex min-h-[190px] items-center overflow-hidden">
                <div className="absolute left-1/2 top-1/2 flex w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] flex-col gap-3">
                  <div className="bg-gradient-to-l from-success to-emerald-light py-3 text-center text-lg font-bold tracking-wide text-white shadow-lg sm:text-xl">
                    100% אובייקטיבי
                  </div>
                  <div className="bg-white py-3 text-center text-lg font-bold tracking-wide text-navy shadow-lg sm:text-xl">
                    0% ממומן
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <Link
              href="/quiz?mode=short"
              className="group block lg:col-span-7"
            >
              <div className="notch-card bg-grain relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 text-white transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-6px_rgba(37,99,235,0.4)] sm:p-10">
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="font-display relative z-10 text-3xl font-normal">
                  מסלול מהיר
                </h2>
                <p className="relative z-10 mt-3 max-w-md flex-1 text-sm leading-relaxed text-white/75">
                  25 שאלות מרכזיות שייתנו לכם תמונה מהירה וברורה. מתאים כשהזמן
                  קצר.
                </p>
                <div className="relative z-10 mt-8 flex items-center justify-between text-sm">
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

            <Link href="/quiz?mode=long" className="group block lg:col-span-5">
              <div className="flex h-full flex-col rounded-2xl border border-gray/80 bg-white p-8 shadow-ambient transition-all duration-200 group-hover:-translate-y-1 group-hover:border-sapphire/50 group-hover:shadow-ambient-lg">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sapphire/10 text-sapphire">
                  <ListChecks className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-normal text-navy">
                  מסלול מקיף
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-dark">
                  61 שאלות על פני כל הנושאים, לתוצאה מדויקת ומעמיקה יותר.
                </p>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-gray-light px-3 py-1 font-medium text-navy">
                    כ־10 דקות
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-navy">
                    התחילו כאן
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mt-2">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-dark">
            עוד באתר
          </p>
          <div className="divide-y divide-gray overflow-hidden rounded-2xl border border-gray/80 bg-white">
            <Link
              href="/platforms"
              className="group flex items-center gap-6 p-7 transition-colors hover:bg-success-light/20"
            >
              <span className="font-display shrink-0 text-3xl font-normal text-gray-dark/50 transition-colors group-hover:text-success">
                01
              </span>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                <ScrollText className="h-7 w-7" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-display text-xl font-normal text-navy">
                  סיכומי מצעי המפלגות
                </h3>
                <p className="mt-1 text-sm text-gray-dark sm:text-base">
                  עמדות רשמיות, נושא אחרי נושא
                </p>
              </div>
              <ChevronLeft className="h-5 w-5 shrink-0 text-gray-dark transition-transform group-hover:-translate-x-1" />
            </Link>

            <Link
              href="/hot-topics"
              className="group flex items-center gap-6 p-7 transition-colors hover:bg-coral/10"
            >
              <span className="font-display shrink-0 text-3xl font-normal text-gray-dark/50 transition-colors group-hover:text-coral">
                02
              </span>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-coral/15 text-coral">
                <Flame className="h-7 w-7" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-display text-xl font-normal text-navy">
                  הנושאים החמים
                </h3>
                <p className="mt-1 text-sm text-gray-dark sm:text-base">
                  הסברים פשוטים לסוגיות הכי שנויות במחלוקת, בלי קשר למפלגות
                </p>
              </div>
              <ChevronLeft className="h-5 w-5 shrink-0 text-gray-dark transition-transform group-hover:-translate-x-1" />
            </Link>

            <Link
              href="/challenge"
              className="group flex items-center gap-6 p-7 transition-colors hover:bg-amber-light/20"
            >
              <span className="font-display shrink-0 text-3xl font-normal text-gray-dark/50 transition-colors group-hover:text-amber">
                03
              </span>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
                <Brain className="h-7 w-7" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-display text-xl font-normal text-navy">
                  מפרק הבועות
                </h3>
                <p className="mt-1 text-sm text-gray-dark sm:text-base">
                  בחרתם כבר מפלגה? בחנו את העמדות שלכם מול הטיעונים החזקים
                  ביותר של המחנה הנגדי
                </p>
              </div>
              <ChevronLeft className="h-5 w-5 shrink-0 text-gray-dark transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gray-light px-5 py-3 text-sm text-gray-dark">
          <Lock className="h-4 w-4 shrink-0 text-navy" />
          <span>התשובות שלכם אנונימיות לחלוטין ואינן נשמרות בשרת.</span>
        </div>
      </div>
    </main>
  );
}
