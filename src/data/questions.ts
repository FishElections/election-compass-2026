import { Category, Question } from "@/types";

export const categories: Category[] = [
  { id: "security", label: "ביטחון ומדיניות חוץ", icon: "🛡️" },
  { id: "economy", label: "כלכלה ויוקר מחיה", icon: "💰" },
  { id: "religion_state", label: "דת ומדינה", icon: "🕊️" },
  { id: "judiciary", label: "מערכת המשפט וממשל", icon: "⚖️" },
  { id: "society", label: "חברה ופנים", icon: "🤝" },
];

export const questions: Question[] = [
  // ביטחון
  {
    id: "sec-1",
    category: "security",
    text: "יש להרחיב את ההתיישבות היהודית ביהודה ושומרון.",
    isShort: true,
  },
  {
    id: "sec-2",
    category: "security",
    text: "יש להגביר פעולות צבאיות יזומות נגד ארגוני טרור באזור, גם ללא הסכמה בינלאומית מלאה.",
    isShort: false,
  },
  {
    id: "sec-3",
    category: "security",
    text: "יש לקדם הסכם מדיני קבע שיוביל להקמת מדינה פלסטינית מפורזת לצד ישראל.",
    isShort: true,
  },
  {
    id: "sec-4",
    category: "security",
    text: "יש להעדיף פתרונות דיפלומטיים ומשא ומתן על פני פעולה צבאית ככל האפשר.",
    isShort: false,
  },
  {
    id: "sec-5",
    category: "security",
    text: "יש להגדיל משמעותית את תקציב הביטחון גם על חשבון תקציבים אזרחיים.",
    isShort: false,
  },
  {
    id: "sec-6",
    category: "security",
    text: "יש לשמור על אחיזה ביטחונית קבועה בכל שטחי יהודה ושומרון, ללא נסיגה.",
    isShort: false,
  },
  {
    id: "sec-7",
    category: "security",
    text: "יש לפעול לחידוש מיידי של המגעים המדיניים עם הרשות הפלסטינית.",
    isShort: false,
  },
  {
    id: "sec-8",
    category: "security",
    text: "יש להטיל עונש מוות על מחבלים שביצעו רצח בכוונה תחילה.",
    isShort: true,
  },
  {
    id: "sec-9",
    category: "security",
    text: "יש לצמצם את מספר חיילי המילואים המגויסים ולקצר את תקופות השירות.",
    isShort: false,
  },
  {
    id: "sec-10",
    category: "security",
    text: "יש לפעול להרתעה צבאית אגרסיבית מול איראן, כולל אופציה של תקיפה יזומה.",
    isShort: true,
  },

  // כלכלה
  {
    id: "eco-1",
    category: "economy",
    text: "יש להפריט חברות ממשלתיות כדי להגביר תחרות ויעילות.",
    isShort: true,
  },
  {
    id: "eco-2",
    category: "economy",
    text: "יש להגדיל את קצבאות הביטוח הלאומי ותקציבי הרווחה.",
    isShort: true,
  },
  {
    id: "eco-3",
    category: "economy",
    text: "יש להוריד מיסים על הכנסות גבוהות כדי לעודד השקעות ויזמות.",
    isShort: false,
  },
  {
    id: "eco-4",
    category: "economy",
    text: "יש להעלות את שכר המינימום באופן משמעותי.",
    isShort: true,
  },
  {
    id: "eco-5",
    category: "economy",
    text: "יש לצמצם את מעורבות המדינה ברגולציה על עסקים קטנים.",
    isShort: false,
  },
  {
    id: "eco-6",
    category: "economy",
    text: "יש להגדיל את ההשקעה הממשלתית בדיור ציבורי ובדיור בר השגה.",
    isShort: true,
  },
  {
    id: "eco-7",
    category: "economy",
    text: "יש לעודד תחרות חופשית בשוק ההון ולצמצם פיקוח ממשלתי על הבנקים.",
    isShort: false,
  },
  {
    id: "eco-8",
    category: "economy",
    text: "יש להגדיל את המימון הממשלתי לשירותי בריאות וחינוך ציבוריים.",
    isShort: false,
  },
  {
    id: "eco-9",
    category: "economy",
    text: "יש לקדם רפורמות שיצמצמו את כוחם של ועדי העובדים וההסתדרות.",
    isShort: false,
  },
  {
    id: "eco-10",
    category: "economy",
    text: "יש להטיל מס פרוגרסיבי גבוה יותר על בעלי הון כדי לצמצם פערים חברתיים.",
    isShort: false,
  },

  // דת ומדינה
  {
    id: "rel-1",
    category: "religion_state",
    text: "יש לשמר את המצב הקיים בכל הנוגע לשמירת שבת במרחב הציבורי.",
    isShort: true,
  },
  {
    id: "rel-2",
    category: "religion_state",
    text: "יש לאפשר תחבורה ציבורית מלאה בשבת בכל רחבי הארץ.",
    isShort: true,
  },
  {
    id: "rel-3",
    category: "religion_state",
    text: "יש להמשיך ולתקצב ישיבות ולימוד תורה כערך מרכזי במדינה.",
    isShort: true,
  },
  {
    id: "rel-4",
    category: "religion_state",
    text: "יש לחוקק חוק נישואין וגירושין אזרחיים בישראל.",
    isShort: true,
  },
  {
    id: "rel-5",
    category: "religion_state",
    text: "יש לשמר את פטור הגיוס לתלמידי ישיבות המקדישים עצמם ללימוד תורה.",
    isShort: false,
  },
  {
    id: "rel-6",
    category: "religion_state",
    text: "יש לחייב את כלל הציבור החרדי בגיוס לצבא או בשירות לאומי, ללא פטורים.",
    isShort: false,
  },
  {
    id: "rel-7",
    category: "religion_state",
    text: "יש להרחיב את סמכויות הרבנות הראשית בענייני אישות וכשרות.",
    isShort: false,
  },
  {
    id: "rel-8",
    category: "religion_state",
    text: "יש להפריד לחלוטין בין דת למדינה בכל מוסדות השלטון.",
    isShort: false,
  },
  {
    id: "rel-9",
    category: "religion_state",
    text: "יש להמשיך לממן מוסדות חינוך תורניים באופן מלא מתקציב המדינה.",
    isShort: false,
  },
  {
    id: "rel-10",
    category: "religion_state",
    text: "יש לאפשר ייבוא ומכירה חופשית של מוצרי חמץ בפסח בכל מקום.",
    isShort: false,
  },

  // מערכת המשפט
  {
    id: "jud-1",
    category: "judiciary",
    text: 'יש להעניק לכנסת סמכות לגבור על פסיקות בג"ץ ברוב רגיל.',
    isShort: true,
  },
  {
    id: "jud-2",
    category: "judiciary",
    text: "יש לשמר את עצמאות בית המשפט העליון ואת יכולתו לבטל חוקים.",
    isShort: true,
  },
  {
    id: "jud-3",
    category: "judiciary",
    text: "יש לשנות את הרכב הוועדה לבחירת שופטים כך שלפוליטיקאים יהיה בה רוב.",
    isShort: true,
  },
  {
    id: "jud-4",
    category: "judiciary",
    text: "יש לשמר את הרכב הוועדה לבחירת שופטים הנוכחי, המאזן בין הרשויות.",
    isShort: false,
  },
  {
    id: "jud-5",
    category: "judiciary",
    text: "יש לבטל את עילת הסבירות ככלי לביקורת שיפוטית על החלטות הממשלה.",
    isShort: true,
  },
  {
    id: "jud-6",
    category: "judiciary",
    text: "יש לחזק את עילת הסבירות ככלי לביקורת שיפוטית על שרים ופקידים.",
    isShort: false,
  },
  {
    id: "jud-7",
    category: "judiciary",
    text: 'יש לאפשר לשרים למנות יועצים משפטיים מטעמם ללא אישור היועמ"שית.',
    isShort: false,
  },
  {
    id: "jud-8",
    category: "judiciary",
    text: "יש לשמר את מעמד היועץ המשפטי לממשלה כגורם מייעץ בלתי תלוי.",
    isShort: false,
  },
  {
    id: "jud-9",
    category: "judiciary",
    text: 'יש להגביל את זכות העמידה בבג"ץ רק לנפגעים ישירים מהחלטה.',
    isShort: false,
  },
  {
    id: "jud-10",
    category: "judiciary",
    text: 'יש להרחיב את זכות העמידה בבג"ץ כדי לאפשר ביקורת ציבורית רחבה.',
    isShort: false,
  },

  // חברה
  {
    id: "soc-1",
    category: "society",
    text: "יש לקדם חקיקה המבוססת על ערכי המשפחה המסורתית.",
    isShort: false,
  },
  {
    id: "soc-2",
    category: "society",
    text: "יש להכיר בנישואים אזרחיים ובזוגיות חד-מינית לכל דבר ועניין.",
    isShort: true,
  },
  {
    id: "soc-3",
    category: "society",
    text: "יש להגביל תכנים הנוגעים למגדר ולנטייה מינית במערכת החינוך.",
    isShort: true,
  },
  {
    id: "soc-4",
    category: "society",
    text: "יש לשלב חינוך לשוויון מגדרי ולגיוון בבתי הספר.",
    isShort: true,
  },
  {
    id: "soc-5",
    category: "society",
    text: "יש להעניק עדיפות בקבלה למוסדות ציבור לפי קריטריונים מסורתיים ולא רק שוויוניים.",
    isShort: false,
  },
  {
    id: "soc-6",
    category: "society",
    text: 'יש לקדם ייצוג הולם לנשים, מיעוטים ולהט"ב בכל מוסדות השלטון.',
    isShort: true,
  },
  {
    id: "soc-7",
    category: "society",
    text: "יש להחמיר את מדיניות ההגירה ולהגביל כניסת מהגרי עבודה ומבקשי מקלט.",
    isShort: false,
  },
  {
    id: "soc-8",
    category: "society",
    text: "יש להעניק מעמד חוקי ותנאים הוגנים למהגרי עבודה ומבקשי מקלט השוהים בארץ.",
    isShort: false,
  },
  {
    id: "soc-9",
    category: "society",
    text: "יש להעדיף השקעה ציבורית ביישובים יהודיים על פני יישובים ערביים.",
    isShort: false,
  },
  {
    id: "soc-10",
    category: "society",
    text: "יש להגדיל את התקציב הממשלתי המושקע בפיתוח החברה הערבית ובצמצום פערים.",
    isShort: false,
  },
];

export const shortQuestions = questions.filter((q) => q.isShort);
