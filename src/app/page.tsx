import Link from "next/link";
import { ShieldCheck, Zap, ListChecks, ChevronLeft, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-16 text-center sm:pt-24">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white shadow-md">
          <ShieldCheck className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-extrabold leading-tight text-navy sm:text-5xl">
          מצפן בחירות 2026
        </h1>
        <p className="mt-3 text-xl font-semibold text-navy-light sm:text-2xl">
          למי הכי מתאים לך להצביע?
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-dark sm:text-lg">
          ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה
          ביותר. השוואה מבוססת נתונים, ללא הטיה וללא פרסום.
        </p>

        <div className="mt-12 grid w-full gap-6 sm:grid-cols-2">
          <Link href="/quiz?mode=short" className="group block h-full">
            <Card className="h-full text-right transition-all duration-200 group-hover:-translate-y-1 group-hover:border-navy group-hover:shadow-lg">
              <CardContent className="flex h-full flex-col p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-navy">מסלול מהיר</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-dark">
                  20 שאלות מרכזיות שיתנו לך תמונה מהירה וברורה. מתאים אם
                  הזמן שלכם קצר.
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-gray-light px-3 py-1 font-medium text-navy">
                    כ-3 דקות
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-navy">
                    התחילו כאן
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/quiz?mode=long" className="group block h-full">
            <Card className="h-full text-right transition-all duration-200 group-hover:-translate-y-1 group-hover:border-navy group-hover:shadow-lg">
              <CardContent className="flex h-full flex-col p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <ListChecks className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-navy">מסלול מקיף</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-dark">
                  50 שאלות על פני כל הנושאים, לתוצאה מדויקת ומעמיקה יותר.
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-gray-light px-3 py-1 font-medium text-navy">
                    כ-8 דקות
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-navy">
                    התחילו כאן
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 rounded-full bg-gray-light px-5 py-3 text-sm text-gray-dark">
          <Lock className="h-4 w-4 shrink-0 text-navy" />
          <span>התשובות שלך אנונימיות לחלוטין ואינן נשמרות בשרת.</span>
        </div>
      </div>
    </main>
  );
}
