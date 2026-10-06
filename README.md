# מצפן בחירות 2026

כלי אזרחי בלתי תלוי לבחירות 2026 בישראל. עונים על שאלון עמדות (מסלול מהיר של 20 שאלות, או מסלול מקיף של 50), ומקבלים התאמה מדורגת לכל המפלגות המתמודדות, לצד אפשרות לשקלל אילו נושאים חשובים לכם יותר.

מעבר לשאלון, האתר כולל:
- **הנושאים החמים** - הסברים פשוטים ונטולי-צד לסוגיות השנויות במחלוקת במדינה, עם מיפוי אופציונלי של עמדות המפלגות
- **סיכומי מצעי המפלגות** - עמדות רשמיות לפי נושא
- **מפרק הבועות** - אתגר לבחינת נקודות עיוורון מול הטיעונים החזקים ביותר של המחנה הנגדי
- **השוואת מפלגות** - השוואה ישירה בין שתי מפלגות לפי קטגוריה

התשובות אנונימיות לחלוטין ואינן נשמרות בשרת.

## פותח על ידי

- **אוהד בר אלי** - [ohadoo20@gmail.com](mailto:ohadoo20@gmail.com)
- **איתי אילת** - [itay.ey@gmail.com](mailto:itay.ey@gmail.com)

## טכנולוגיה

Next.js (App Router) + TypeScript + Tailwind CSS, עם Zustand לניהול מצב השאלון.

### הרצה מקומית

```bash
npm install
npm run dev
```

האתר יעלה בכתובת [http://localhost:3000](http://localhost:3000).

### בדיקות לפני commit

```bash
npx tsc --noEmit
npx eslint src --max-warnings=0
npm run build
```

## תרומה לפרויקט · Contributing

הפרויקט פתוח לתרומות במודל fork & pull: כל אחד יכול לפתוח Pull Request, אך רק
בעלי הקוד (איתי ואוהד) מאשרים וממזגים ל-`main` — ומיזוג ל-`main` הוא מה שמפרסם
לאוויר.

1. עשו **Fork** למאגר, שכפלו את ה-fork שלכם (`git clone`), ואז `npm install`.
2. קראו קודם את [`AGENTS.md`](./AGENTS.md) — לגרסת Next.js כאן יש שינויים שוברים.
   כל שינוי טקסט/ממשק חייב להישלח **בשלוש השפות (he/en/ar)** (ראו
   `.claude/skills/bilingual-feature`).
3. פתחו ענף: `git checkout -b feat/your-change`.
4. לפני push ודאו שהכול עובר (ואל תכניסו סודות או ערכי env ל-commit):
   ```bash
   npx tsc --noEmit
   npx eslint src --max-warnings=0
   npm test
   npm run build
   ```
5. דחפו ל-fork שלכם ופתחו **Pull Request מול `FishElections:main`** עם תיאור ברור.
6. תצוגת Vercel preview תיבנה אוטומטית ב-PR. איתי או אוהד יבדקו, יאשרו וימזגו.

---

**Contributing (English).** This project uses the **fork & pull** model — anyone
can open a PR, but only the code owners (Itay & Ohad) approve and merge to
`main`, and merging to `main` is what deploys.

1. **Fork** the repo, clone *your* fork, then `npm install`.
2. Read [`AGENTS.md`](./AGENTS.md) first — this Next.js version has breaking
   changes. Every UI/text change must ship in **all three languages (he/en/ar)**
   (see `.claude/skills/bilingual-feature`).
3. Branch: `git checkout -b feat/your-change`.
4. Before pushing, make sure these all pass (and don't commit secrets/env values):
   ```bash
   npx tsc --noEmit
   npx eslint src --max-warnings=0
   npm test
   npm run build
   ```
5. Push to your fork and open a **PR against `FishElections:main`** with a clear
   description.
6. A Vercel preview builds automatically on the PR. Itay or Ohad will review,
   approve, and merge — you won't be able to merge yourself (by design).
