# מיזוג ה-i18n אל main — מסמך העברה

**המצב בשורה אחת:** האנגלית כבר נכתבה במלואה — תרגומים, פיצול דאטה, switcher,
תיקוני כיווניות. היא פשוט **תקועה על ענף שאף פעם לא נפתח לו PR ל-main**. אין
מה לבנות מחדש; צריך למזג.

---

## למה אין כפתור אנגלית באתר

עבודת ה-i18n נבנתה כ־**stack**: כל PR מוזג לענף שמתחתיו, לא ל-main.

| PR | ענף | מוזג אל | מצב |
|---|---|---|---|
| #32 | `feat/i18n-routing-foundation` | **main** | ✅ נחת ב-main |
| #35 | `feat/i18n-dictionaries` | `feat/i18n-routing-foundation` | ✅ |
| #37 | `feat/i18n-content-split` | `feat/i18n-dictionaries` | ✅ |
| #38 | `feat/i18n-ship-english` | `feat/i18n-content-split` | ✅ |
| #39 | `feat/i18n-bilingual-skill-rewrite` | `feat/i18n-ship-english` | ✅ |

רק #32 הגיע ל-main. כל השאר הצטברו במעלה ה-stack ונעצרו שם — אין PR שמביא
אותם פנימה.

**הענף עם המצב המלא:** `feat/i18n-bilingual-skill-rewrite` (6 קומיטים לפני main).

מאומת עליו: `tsc` נקי, 26 טסטים עוברים (מול 6 ב-main — נוספה חבילת
`locale-coverage`), `en` רשום ב-`src/i18n/config.ts` עם `dir: "ltr"` ו-
`ogLocale: "en_US"`, ו-`src/dictionaries/en.json` שוקל ~20KB.

מבנה הדאטה שם: `src/data/<domain>/{core,he,en,index}.ts` לשבעה דומיינים —
`questions`, `parties`, `hotTopics`, `counterArguments`, `electionGuide`,
`likert`, `platformTopics`. הליבה (מזהים, ערכי עמדה, צבעים, אייקונים) יושבת
פעם אחת ב-`core.ts`; רק טקסט מפוצל לפי שפה. ה-accessors (`getQuestions(locale)`
וכו') **זורקים שגיאה** על מפתח חסר בשפה כלשהי — זו הרשת שתופסת תרגום שנשכח.

---

## המשימה

למזג את `feat/i18n-bilingual-skill-rewrite` אל `main` ולפתוח PR.

`git merge origin/main` על הענף מייצר **21 קבצים בקונפליקט**. שני הצדדים
ערכו בכבדות את אותן קומפוננטות, והם **זרים לחלוטין זה לזה**:

- ל-main יש את כל עבודת המובייל (PR #34, #36) — ל-ענף ה-i18n אין ממנה כלום.
- לענף ה-i18n יש את כל האנגלית — ל-main אין ממנה כלום.

אומת בבדיקה: `ניווט ראשי`, `--mobile-nav-h`, `quiz-progress-v2`, `viewportFit`
ו-`min-h-dvh` — כולם קיימים ב-main וחסרים לגמרי בענף ה-i18n.

**לכן אף צד לא "מנצח" בקונפליקט. כמעט בכל קובץ צריך את שניהם.**

### הקבצים בקונפליקט

```
src/app/[lang]/{about,challenge,hot-topics,how-it-works,news,platforms,quiz}/page.tsx
src/app/[lang]/layout.tsx
src/components/SidebarDrawer.tsx
src/components/challenge/ChallengeCard.tsx
src/components/guide/GuideClient.tsx
src/components/platforms/{PartyDetailSheet,PlatformsClient}.tsx
src/components/quiz/{LikertButton,QuizClient}.tsx
src/components/results/ResultsClient.tsx
src/components/topics/{HotTopicsClient,TopicCard,TopicDetailSheet}.tsx
src/i18n/config.ts
src/store/quizStore.ts
```

`src/app/globals.css` ו-`src/app/[lang]/page.tsx` מתמזגים אוטומטית — לא לגעת.

`src/i18n/config.ts` הוא הקונפליקט היחיד שהוא חד-צדדי: קחו את גרסת ה-i18n
(היא מוסיפה `en` + `ogLocale`; ב-main יש רק `he`).

---

## מה חייב לשרוד מצד המובייל

זה נמדד בדפדפן, לא הוערך. אחרי המיזוג **למדוד מחדש** — לא להניח.

| מה | היכן | הערך שחייב להישמר |
|---|---|---|
| שאלון במסך אחד | `QuizClient` + `LikertButton` | **0px גלילה** ב-375×667 **וגם** ב-375×600 |
| גובה אחיד לאפשרויות | `LikertButton` | 52px, `gap-2` (הפרש ה-`intensityPadding` נשאר רק ב-`sm:` ומעלה) |
| שמירת התקדמות | `quizStore` | מפתח `quiz-progress-v2`, `skipHydration`, מאגר השאלות **לא** נשמר |
| מסך המשך/התחלה מחדש | `QuizClient` | `resumable` מגיע מה-store, לא מ-`useState` בתוך effect |
| `/results` שורד רענון | `useQuizHydration` | חייב להיקרא **גם** ב-`ResultsClient`, לא רק ב-`QuizClient` |
| סרגל ניווט תחתון | `SidebarDrawer` | נייבי מלא, טאב פעיל לבן + פס זהב, `env(safe-area-inset-bottom)` |
| פס שיתוף דביק | `ResultsClient` | `bottom-[var(--mobile-nav-h)]`, מעל סרגל הניווט בדיוק |
| viewport | `[lang]/layout.tsx` | `viewportFit: "cover"` + `themeColor` + manifest + `apple-touch-icon` |
| משוב מגע | רוחבי | `active:` על כל אינטראקטיבי; `hover` lifts עטופים ב-`@media (hover: hover)` |
| ריפוד עליון | הדפים בקונפליקט | `pt-8 lg:pt-20` (הוקטן כשהכפתור הצף ירד מהנייד) — לא להחזיר `pt-20 sm:pt-24` |

מקור מלא עם המדידות: `docs/mobile-ux-plan.md`.

---

## הקונפליקט העדין ביותר: `quizStore.ts`

שני הצדדים שינו אותו לכיוונים שונים, והשילוב **לא טריוויאלי**:

- **main** הוסיף `persist` (מפתח `quiz-progress-v2`, `skipHydration`,
  `partialize` שמשאיר את מאגר השאלות בחוץ, סינון מזהים שנמחקו, ו-`resumable`).
- **ענף ה-i18n** הפך את השאלות לתלויות שפה: `startQuiz(mode, locale)`,
  ו-`retext(locale)` שמרענן את **טקסט** השאלות לפי id בלי לאבד תשובות.

הם **מתחברים יפה** כי המזהים אינם תלויי שפה — אבל רק אם שומרים על שלושת אלה:

1. `partialize` ממשיך לשמור רק `mode` / `currentIndex` / `answers` /
   `categoryWeights`. **אסור** להוסיף `activeQuestions` — הוא נגזר, והוא היה
   מנפח את ה-storage ומקבע טקסט בשפה אחת.
2. `onRehydrateStorage` בונה מחדש את `activeQuestions` **בשפה הנוכחית**, לא
   ב-`"he"` קשיח. שימו לב שערך ברירת המחדל של ה-store בענף ה-i18n הוא
   `getShortQuestions("he")` — זה בסדר כערך התחלתי, אבל ה-rehydrate חייב
   לעבור לשפה האמיתית.
3. החלפת שפה באמצע שאלון קוראת ל-`retext(locale)` ו**לא** ל-`startQuiz` —
   אחרת התשובות נמחקות. זה תרחיש בדיקה חובה.

---

## חוקי ה-i18n שחלים על כל תיקון קונפליקט

מלא ב-`.claude/skills/bilingual-feature` (שוכתב ב-#39 כך שיתאר את התשתית
האמיתית — קראו אותו, לא את הגרסה הישנה). התמצית:

- אין מחרוזות משתמש קשיחות בקומפוננטות. כל מחרוזת מקבלת מפתח **גם** ב-
  `he.json` **וגם** ב-`en.json`, באותה עריכה.
- קומפוננטות לקוח לא מייבאות מילון — הן מקבלות ב-props.
- **מאפיינים לוגיים בלבד**: `ms/me`, `ps/pe`, `start/end`, `text-start/end`,
  `rounded-s/e`, `border-s/e`. זה קריטי כאן: כל עבודת המובייל נכתבה
  RTL-בלבד ומלאה ב-`right-4`, `pr-11`, `text-right`, `rounded-s-full`.
  **כל אחד מהם צריך המרה או הערה שמסבירה למה הוא פיזי-במכוון.**
- אנימציות framer-motion עם תנועה אופקית: הסימן מתהפך עם הכיוון.
  `LikertButton` משתמש ב-`whileHover={{ x: -3 }}` — זה שגוי ב-LTR.
- חצי "קדימה" מצביעים שמאלה בעברית וימינה באנגלית.
- אנגלית ארוכה ב-20–30% מעברית. **השאלון במסך אחד הוא היעד בסיכון הגבוה
  ביותר** — לאמוד מחדש עם המחרוזות האנגליות האמיתיות, לא להניח.

בדיקה עצמית על הקבצים ששונו:

```bash
git diff --name-only | xargs grep -nE '\b(ml|mr|pl|pr)-[0-9]|text-(left|right)\b|\b(left|right)-[0-9]|rounded-[lr]-|border-[lr]-' -- 2>/dev/null
```

---

## אימות לפני שמדווחים שסיימו

ארבעה מעברים: `{/, /en}` × `{375px, desktop}`.

- [ ] `tsc --noEmit` נקי, `eslint` נקי, כל 26 הטסטים עוברים
- [ ] `next build` עובר; עץ הנתיבים מראה `[lang]`
- [ ] שאלון: **0px גלילה** ב-375×667 וב-375×600, **בשתי השפות**
- [ ] רענון באמצע שאלון → מסך המשך/התחלה מחדש; רענון `/results` → התוצאות
- [ ] החלפת שפה באמצע שאלון → הטקסט מתחלף, **התשובות נשמרות**
- [ ] סרגל ניווט תחתון נייבי בשתי השפות; פס השיתוף יושב בדיוק מעליו
- [ ] אין עברית ב-`/en` ואין אנגלית ב-`/`
- [ ] אין גלישה אופקית באף דף באנגלית (הטקסט הארוך יותר)
- [ ] צילומי מסך בשתי השפות

---

## מה לא לעשות

- **לא לכתוב מחדש את האנגלית.** היא קיימת ומאומתת. כל הטקסט שצריך כבר ב-
  `src/data/*/en.ts` וב-`src/dictionaries/en.json`.
- **לא לפתור קונפליקט ב-"take theirs" / "take ours" גורף.** כמעט בכל קובץ
  שני הצדדים תרמו משהו שחייב לשרוד.
- **לא לשנות מזהי שאלות/מפלגות.** ה-store שומר תשובות לפיהם; שינוי שובר
  תוצאות שמורות בשתי השפות.
- **לא לרשום `en`** אם משום מה מחליטים לפצל את המיזוג — כפתור שפה מעל תוכן
  עברי הוא רגרסיה לפי ה-skill.
