# מצפן בחירות 2026

כלי אזרחי בלתי תלוי לבחירות 2026 בישראל. עונים על שאלון עמדות (מסלול מהיר של 20 שאלות, או מסלול מקיף של 50), ומקבלים התאמה מדורגת לכל המפלגות המתמודדות, לצד אפשרות לשקלל אילו נושאים חשובים לכם יותר.

מעבר לשאלון, האתר כולל:
- **הנושאים החמים** - הסברים פשוטים ונטולי-צד לסוגיות השנויות במחלוקת במדינה, עם מיפוי אופציונלי של עמדות המפלגות
- **סיכומי מצעי המפלגות** - עמדות רשמיות לפי נושא
- **מפרק הבועות** - אתגר לבחינת נקודות עיוורון מול הטיעונים החזקים ביותר של המחנה הנגדי
- **השוואת מפלגות** - השוואה ישירה בין שתי מפלגות לפי קטגוריה

התשובות אנונימיות לחלוטין ואינן נשמרות בשרת.

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
בעלי הקוד (איתי ואוהד) מאשרים וממזגים ל-`main`. ההוראות המלאות נמצאות ב-
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

Contributions are welcome via the fork & pull model — anyone can open a PR, and
only the code owners (Itay & Ohad) approve and merge. See
[`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full guide.
