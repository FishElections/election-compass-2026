/**
 * ניסוחים קצרים בגוף ראשון לבחירת עמדה מהירה, לכל אחד מהנושאים.
 * משמשים גם בכרטיסי האתגר לתיאור "העמדה שלך" / "העמדת המפלגה".
 */
export const quickStanceLabels: Record<
  string,
  { topic: string; proLabel: string; conLabel: string }
> = {
  "haredi-draft": {
    topic: "גיוס חרדים",
    proLabel: "בעד חובת גיוס לכולם, ללא פטורים",
    conLabel: "בעד שימור פטור הגיוס ללומדי תורה",
  },
  "gaza-control": {
    topic: "שליטה בעזה",
    proLabel: "בעד שליטה ביטחונית ישראלית מתמשכת",
    conLabel: "בעד העברת אחריות והפחתת השליטה הצבאית",
  },
  "judicial-reform": {
    topic: "רפורמה משפטית",
    proLabel: "בעד רפורמה שמחזקת את הכנסת מול בג\"ץ",
    conLabel: "בעד שימור עצמאות בית המשפט כפי שהיא",
  },
  "religion-state-separation": {
    topic: "דת ומדינה",
    proLabel: "בעד הפרדה מלאה בין דת למדינה",
    conLabel: "בעד שימור האופי היהודי-מסורתי של המדינה",
  },
  "economy-model": {
    topic: "מודל כלכלי",
    proLabel: "בעד כלכלת שוק חופשית ומיסוי נמוך",
    conLabel: "בעד מדינת רווחה חזקה ומיסוי פרוגרסיבי",
  },
};
