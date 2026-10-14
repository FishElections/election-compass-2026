import { PartyStance } from "@/types";

/**
 * מטריצת עמדות מפלגות עבור בחירות 2026, לצורך הדגמת מנוע ההתאמה.
 * הערכים ברוב השאלות נגזרו מפרופיל אידאולוגי כללי לכל מפלגה בכל קטגוריה;
 * הערכים בשאלות sec-7, sec-9, eco-5, eco-9 ו-soc-5 (שהוחלפו בביקורת נאותות),
 * וכן שלושת הערכים הטריטוריאליים של "ישר!" (sec-1, sec-3, sec-6), נקבעו
 * ידנית לפי הצהרות ומצעים פומביים ידועים של כל מפלגה. הנתונים אינם מייצגים
 * הצהרה רשמית של מפלגה כלשהי.
 *
 * הרחבת יולי 2026: נוספו עמדות לשאלות החדשות (sec-11..13, eco-11..12,
 * inf-1..6, rel-11, gov-1..5). ערכים אלה נגזרו משילוב של תיאורי המצע
 * ב-parties.ts ועמדות פומביות מוכרות של המפלגות הקיימות (למשל: רפורמת
 * הכשרות 2021 לעניין rel-11, רפורמות היבוא של משרדי האוצר לעניין eco-12,
 * העמדות המוצהרות על ועדת חקירה ממלכתית לעניין gov-1). למפלגות החדשות
 * בתרחיש (ישר!, ביחד, בית ציוני) הערכים נגזרו מהפרופיל המוצהר של
 * מנהיגיהן. שאלת gov-2 (חטופים) הוסרה ביולי 2026 לאחר שכל החטופים הושבו.
 *
 * הרחבת יולי 2026 (ב'): נוספו בל"ד (בראשות סאמי אבו שחאדה) וכחול לבן (בראשות
 * בני גנץ) לתרחיש. עמדות בל"ד נגזרו מהפרופיל הלאומי-הערבי המוכר של המפלגה
 * (בדומה לחד"ש-תע"ל, אך לאומי יותר ופחות "רשימה משותפת"); עמדות כחול לבן
 * נגזרו מהפרופיל הממלכתי-ביטחוני המוכר של מנהיגיה (בכירי צבא לשעבר,
 * מתנגדים למהפכה המשפטית של 2023).
 *
 * עדכון סריקה שבועית 16.8.2026: עודכנו/אוששו שני ערכים לפי אירועים מהשבוע
 * שקדם לתאריך זה — likud/sec-5 (מקור חדש, ערך ללא שינוי) ו-
 * yisrael-beiteinu/sec-11 (1←2, מקור והערה עודכנו). פירוט מלא ב-
 * reports/party-stance-updates.xlsx.
 *
 * ביקורת נאותות אוגוסט 2026 (מסלול מהיר, 20 שאלות x 14 מפלגות): כל 20 שאלות
 * "המסלול המהיר" לכל 14 המפלגות המתועדות למעלה נבדקו מחדש מול מקורות
 * עצמאיים (מצעים רשמיים, ראיונות, הצבעות בפועל בכנסת), כולל אימות בפועל של
 * כל sourceUrl שכבר היה קיים מול תוכן sourceNote הצמוד לו. תוקנו/עודכנו
 * עשרות ערכים ומקורות; מספר מקורות שהתבררו כשגויים/לא-רלוונטיים
 * (ceci.org.il redirect, mekomit.co.il 403, וכתבת
 * calcalist.co.il/local_news/article/r1t00cyqgje ששימשה בטעות כמקור זהה
 * עבור rel-5 בכמה מפלגות ואינה מזכירה אף אחת מהן) הוסרו. yisrael-beiteinu/
 * sec-11 נשאר כפי שעודכן בסריקה השבועית לעיל (מקור עדכני וממוקד יותר ממה
 * שאותר בביקורת הזו). דוחות המקור המלאים לכל מפלגה נמצאים ב-
 * reports/stance-verification/, ופירוט מלא של כל השינויים ב-
 * reports/party-stance-updates.xlsx.
 *
 * עדכון מפת המפלגות, אוקטובר 2026 (אחרי הגשת הרשימות ב-7-8.9.2026):
 * - נוספו עמך ישראל (עופר וינטר) והמילואימניקים והכלכלית (יועז הנדל / ירון
 *   זליכה). הערכים המתועדים נשענים על ראיונות ומצעים מספטמבר-אוקטובר 2026
 *   (ראו sourceUrl בכל שורה); השאר נגזרו מהפרופיל המוצהר של המנהיגים.
 * - בית ציוני הוסרה: חילי טרופר הצטרף לישר!, ויועז הנדל רץ ברשימה החדשה.
 * - בל"ד הוסרה כרשימה נפרדת: היא רצה במסגרת הרשימה המשותפת (חד"ש, תע"ל
 *   ובל"ד), שממשיכה את המזהה hadash-taal ואת עמדות חד"ש-תע"ל, כי חד"ש
 *   עומדת בראשה.
 *
 * אימות מצעים ועמדות, 14.10.2026 (שבועיים לפני הבחירות):
 * - נבדקו מול מצעים רשמיים שפורסמו לבחירות 2026: ביחד, ישר!, עמך ישראל,
 *   המילואימניקים, והתוכנית הכלכלית-חברתית של הרשימה המשותפת (רשימת המצעים
 *   לפי המכון הישראלי לדמוקרטיה). לליכוד אין מצע מפורט מעבר ל"ששת העמודים".
 * - נוסף סקר העמדות של ynet ו"ידיעות אחרונות" (ספטמבר-אוקטובר 2026), שבו כל
 *   המפלגות נשאלו את אותן שאלות על גיוס, מערכת המשפט, יהודה ושומרון וועדת
 *   החקירה. הליכוד סירב להשיב, ולכן עמדותיו נשענות על הצבעות בפועל.
 * - 37 ערכים עודכנו, ובשורות שנבדקו ה-sourceNote מציין את הערך הקודם.
 */
export const partyStances: PartyStance[] = [
  {
    partyId: "yashar",
    questionId: "sec-1",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ישר! לynet (27.9.26): "ישר! תומכת בחיזוק גושי ההתיישבות ובהקמת יישובים חדשים באופן חוקי, בהתאם לאינטרסים הלאומיים של ישראל ולהמלצות מערכת הביטחון". מתנגדת להחלת ריבונות שתסכן את הרוב היהודי, ולכן 1 ולא 2. (עדכון מ-1-.)',
  },
  { partyId: "yashar", questionId: "sec-2", stanceValue: 1 },
  {
    partyId: "yashar",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.inn.co.il/news/669101",
    sourceNote:
      'איזנקוט (17.5.25): "אני חושב שמדינה פלסטינית זה לא רלוונטי אחרי שבעה באוקטובר". מתווה "היום שאחרי" שהציג בקבינט המלחמה קובע כי ישראל לא תתחייב בחמש השנים הבאות למדינה פלסטינית, ומתנה כל מו"מ עתידי ברפורמות מקיפות ברשות הפלסטינית ובפירוז מוחלט.',
  },
  { partyId: "yashar", questionId: "sec-4", stanceValue: -1 },
  { partyId: "yashar", questionId: "sec-5", stanceValue: 1 },
  {
    partyId: "yashar",
    questionId: "sec-6",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ישר! לynet (27.9.26): "אין לנו תוכנית לפינוי יישובים במסגרת הסדר מדיני", ו"הקמת מדינה פלסטינית אינה עומדת על הפרק". מנגד מתנגדת לריבונות ולאחריות על חייהם האזרחיים של הפלסטינים. (עדכון מ-0.)',
  },
  { partyId: "yashar", questionId: "sec-7", stanceValue: 1 },
  { partyId: "yashar", questionId: "sec-8", stanceValue: 1 },
  { partyId: "yashar", questionId: "sec-9", stanceValue: 1 },
  { partyId: "yashar", questionId: "sec-10", stanceValue: 1 },
  { partyId: "yashar", questionId: "sec-11", stanceValue: -1 },
  { partyId: "yashar", questionId: "sec-12", stanceValue: 1 },
  { partyId: "yashar", questionId: "sec-13", stanceValue: 2 },
  { partyId: "yashar", questionId: "eco-1", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-2", stanceValue: 1 },
  { partyId: "yashar", questionId: "eco-3", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-4", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-5", stanceValue: 2 },
  { partyId: "yashar", questionId: "eco-6", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-7", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-8", stanceValue: 0 },
  { partyId: "yashar", questionId: "eco-9", stanceValue: 2 },
  { partyId: "yashar", questionId: "eco-10", stanceValue: 1 },
  { partyId: "yashar", questionId: "eco-11", stanceValue: 2 },
  {
    partyId: "yashar",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://yasharwitheisenkot.com/principles/economics/",
    sourceNote:
      'מצע ישר! לכלכלה: "נבטל חסמי ייבוא ותקנים ייחודיים לישראל שאין להם הצדקה, ונפתח את השוק לייבוא מקביל", אבל "תוך שימור ועידוד החקלאות הישראלית" - ולכן 1 ולא 2.',
  },
  { partyId: "yashar", questionId: "inf-1", stanceValue: 1 },
  { partyId: "yashar", questionId: "inf-2", stanceValue: 1 },
  { partyId: "yashar", questionId: "inf-3", stanceValue: 0 },
  { partyId: "yashar", questionId: "inf-4", stanceValue: 0 },
  { partyId: "yashar", questionId: "inf-5", stanceValue: 1 },
  { partyId: "yashar", questionId: "inf-6", stanceValue: 0 },
  { partyId: "yashar", questionId: "rel-2", stanceValue: 1 },
  { partyId: "yashar", questionId: "rel-3", stanceValue: -1 },
  {
    partyId: "yashar",
    questionId: "rel-4",
    stanceValue: 1,
    sourceUrl: "https://yasharwitheisenkot.com/principles/lgbtqia/",
    sourceNote:
      'מצע ישר! (ישר! לקהילה הגאה): "נקדם מסלול לרישום זוגיות אזרחית שיהיה זמין לכל זוג, לרבות זוגות חד-מיניים". זהו רישום זוגיות ולא חוק נישואין וגירושין אזרחיים מלא, ובמצע לשוויון מגדרי ישר! מתחייבת גם "להחזרת הסטטוס-קוו" בשירותי הדת, ולכן 1 ולא 2.',
  },
  {
    partyId: "yashar",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14898966",
    sourceNote:
      'ישר! לynet (15.9.26): "המנגנון היחיד לדחיית שירות יהיה הקצאה של עד 3% מכל מחזור שנתי למצטיינים מתחומים שונים ובהם לומדי תורה", ומשתמטים יהיו "נתונים לשלילת הטבות אזרחיות וכלכליות רחבה ולדין פלילי".',
  },
  { partyId: "yashar", questionId: "rel-7", stanceValue: -1 },
  { partyId: "yashar", questionId: "rel-8", stanceValue: 1 },
  { partyId: "yashar", questionId: "rel-9", stanceValue: -1 },
  { partyId: "yashar", questionId: "rel-10", stanceValue: 1 },
  { partyId: "yashar", questionId: "rel-11", stanceValue: 1 },
  {
    partyId: "yashar",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'ישר! לynet (21.9.26): "אנו סבורים שמנגנון ההתגברות מעודד חיכוך מיותר בין מערכת המשפט לבין המערכת הפוליטית ואין לאמצו בישראל". (עדכון מ-1-.)',
  },
  {
    partyId: "yashar",
    questionId: "jud-2",
    stanceValue: 1,
    sourceUrl: "https://yasharwitheisenkot.com/topic/missions/",
    sourceNote:
      'אתר המפלגה: המפלגה תומכת ב"בתי משפט חזקים, עצמאיים ואחראים" כחלק מחיזוק הדמוקרטיה ושלטון החוק בהפרדת רשויות, בהתאם גם להצהרת איזנקוט על "קו אדום" נגד השתלטות פוליטית על מערכת המשפט.',
  },
  {
    partyId: "yashar",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'ישר! לynet (21.9.26): "ישר! תבטל את החוק לפוליטיזציה של הוועדה לבחירת שופטים, ובמקומו תוביל תהליך מקצועי שישאף להסכמות רחבות". (עדכון מ-1-.)',
  },
  { partyId: "yashar", questionId: "jud-5", stanceValue: 0 },
  { partyId: "yashar", questionId: "jud-7", stanceValue: -1 },
  { partyId: "yashar", questionId: "jud-8", stanceValue: 1 },
  { partyId: "yashar", questionId: "jud-9", stanceValue: -1 },
  {
    partyId: "yashar",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'ישר! לynet (3.10.26): "החלטת הממשלה הראשונה שלנו תהיה הקמת ועדת חקירה ממלכתית לטבח 7 באוקטובר. הוועדה תוקם בהתאם לסעיף 1 לחוק ועדות חקירה".',
  },
  { partyId: "yashar", questionId: "gov-3", stanceValue: 1 },
  {
    partyId: "yashar",
    questionId: "gov-4",
    stanceValue: 2,
    sourceUrl: "https://www.srugim.co.il/701279-%D7%90%D7%99%D7%96%D7%A0%D7%A7%D7%95%D7%98-%D7%97%D7%99%D7%99%D7%91%D7%99%D7%9D-%D7%9C%D7%97%D7%AA%D7%95%D7%A8-%D7%9C%D7%A9%D7%9C%D7%95%D7%9D-%D7%9E%D7%AA%D7%95%D7%9A-%D7%A2%D7%95%D7%A6%D7%9E%D7%94",
    sourceNote:
      'איזנקוט (15.8.2022): "ברמה הערכית, אדם עם כתבי אישום לא יכול להיות רה"מ"; "איש ציבור... לא יכול להתמודד לתפקיד ציבורי עם כתב אישום".',
  },
  { partyId: "yashar", questionId: "gov-5", stanceValue: 1 },
  { partyId: "yashar", questionId: "soc-1", stanceValue: 0 },
  {
    partyId: "yashar",
    questionId: "soc-2",
    stanceValue: 2,
    sourceUrl: "https://yasharwitheisenkot.com/principles/lgbtqia/",
    sourceNote:
      'מצע ישר!: "ישר! מחויבת לקידום שוויון זכויות לחברי וחברות קהילת הלהט"ב וחתומה על \'חוקי שגיא לשוויון\'", כולל רישום זוגיות אזרחית לזוגות חד-מיניים ו"תיקון האפליה הקיימת בחוקים הקשורים לזוגיות, הורות ומשפחה". (עדכון מ-0.)',
  },
  {
    partyId: "yashar",
    questionId: "soc-3",
    stanceValue: -2,
    sourceUrl: "https://yasharwitheisenkot.com/principles/lgbtqia/",
    sourceNote:
      'מצע ישר!: "נקדם פרסום של חוזר מנכ"ל המעגן את זכויות התלמידים והמורים הלהט"בים, לרבות הכשרות מתאימות לצוותים חינוכיים", ואיסור טיפולי המרה במערכת החינוך. הפוך מהגבלת תכנים. (עדכון מ-1.)',
  },
  { partyId: "yashar", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "yashar",
    questionId: "soc-6",
    stanceValue: 2,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/sjuuc11rt11g",
    sourceNote:
      'איזנקוט בכנס בתיאטרון ירושלים (28.4.26): "מחצית מחברי הרשימה יהיו נשים" (רשימה מתחלפת גברים/נשים), ושליש מהמועמדים יהיו צעירים.',
  },
  { partyId: "yashar", questionId: "soc-7", stanceValue: 0 },
  { partyId: "yashar", questionId: "soc-10", stanceValue: 0 },
  {
    partyId: "likud",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/b1db8jxngx",
    sourceNote:
      'ממשלת נתניהו קידמה בקצב שיא הרחבת התיישבות ביו"ש -- 41,709 יח"ד קודמו מאז כינון הממשלה (יותר מ-6 השנים שקדמו), ובמאי 2025 אישר הקבינט 22 יישובים חדשים נוספים ובמרץ 2025 עוד 34 יישובים חדשים.',
  },
  { partyId: "likud", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "likud",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.mako.co.il/news-diplomatic/2025_q3/Article-3813be8f7893991027.htm",
    sourceNote:
      'נתניהו (ספטמבר 2025): "אמרנו שלא תקום מדינה פלסטינית - ואכן לא תקום מדינה פלסטינית".',
  },
  { partyId: "likud", questionId: "sec-4", stanceValue: -2 },
  {
    partyId: "likud",
    questionId: "sec-5",
    stanceValue: 2,
    sourceUrl:
      "https://www.themarker.com/news/macroeconomics/2026-08-09/ty-article/0000019f-e5d5-d86b-a59f-e5f79b3b0000",
    sourceNote:
      'ממשלת נתניהו החליטה (9.8.2026) להסיט 850 מיליון ש"ח שיועדו לתמריצי היי-טק ותעסוקה במשרד הכלכלה לטובת רכש ביטחוני דחוף ומסווג.',
  },
  { partyId: "likud", questionId: "sec-6", stanceValue: 2 },
  { partyId: "likud", questionId: "sec-7", stanceValue: 0 },
  { partyId: "likud", questionId: "sec-8", stanceValue: 2 },
  { partyId: "likud", questionId: "sec-9", stanceValue: -1 },
  {
    partyId: "likud",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%AA%D7%A7%D7%A4%D7%94_%D7%94%D7%90%D7%99%D7%A8%D7%90%D7%A0%D7%99%D7%AA_%D7%A2%D7%9C_%D7%99%D7%A9%D7%A8%D7%90%D7%9C_(%D7%99%D7%95%D7%A0%D7%99_2025)",
    sourceNote:
      'ישראל בראשות נתניהו יזמה נגד איראן מבצע צבאי רחב היקף (יוני 2025, "מלחמת 12 הימים") נגד תוכנית הגרעין והטילים. נתניהו: "אילולא שתי הפעולות שביצענו נגד איראן, כבר היו לה פצצות אטום".',
  },
  {
    partyId: "likud",
    questionId: "sec-11",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/article/hk8rt1105xe",
    sourceNote:
      'בספטמבר 2025 תקפה ישראל (בהוראת נתניהו) את צמרת חמאס בדוחה, קטאר, ככל הנראה ללא תיאום מלא עם וושינגטון. טראמפ: "זו הייתה החלטה של ראש הממשלה נתניהו, לא שלי... אני לא מרוצה כלל". בהמשך התנצל נתניהו בפני קטאר בלחץ טראמפ והתחייב לא לחזור על כך.',
  },
  { partyId: "likud", questionId: "sec-12", stanceValue: -1 },
  { partyId: "likud", questionId: "sec-13", stanceValue: 0 },
  { partyId: "likud", questionId: "eco-1", stanceValue: 1 },
  { partyId: "likud", questionId: "eco-2", stanceValue: 0 },
  { partyId: "likud", questionId: "eco-3", stanceValue: 1 },
  {
    partyId: "likud",
    questionId: "eco-4",
    stanceValue: -1,
    sourceUrl: "https://news.walla.co.il/item/1703681",
    sourceNote:
      'נתניהו: "אני תומך בהעלאת שכר המינימום, אבל במצב הכלכלי ששורר כיום בעולם הצעת החוק הזאת הייתה מביאה לאבטלה גדולה מאוד" ותגרום למעסיקים "לפטר אלפי ישראלים". במקום זאת הועדף להרחיב את מס הכנסה השלילי.',
  },
  { partyId: "likud", questionId: "eco-5", stanceValue: 1 },
  { partyId: "likud", questionId: "eco-6", stanceValue: -1 },
  { partyId: "likud", questionId: "eco-7", stanceValue: 1 },
  { partyId: "likud", questionId: "eco-8", stanceValue: -1 },
  { partyId: "likud", questionId: "eco-9", stanceValue: -2 },
  { partyId: "likud", questionId: "eco-10", stanceValue: -1 },
  { partyId: "likud", questionId: "eco-11", stanceValue: 0 },
  {
    partyId: "likud",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/sygx7kdj0",
    sourceNote:
      "הממשלה בראשות הליכוד אישרה את רפורמת הייבוא, אך ארבעה שרי ליכוד נמנעו בהצבעה ושר החקלאות דיכטר (ליכוד) התנגד לחוק - עמדה לא אחידה בתוך הסיעה.",
  },
  { partyId: "likud", questionId: "inf-1", stanceValue: 0 },
  { partyId: "likud", questionId: "inf-2", stanceValue: 0 },
  { partyId: "likud", questionId: "inf-3", stanceValue: 1 },
  { partyId: "likud", questionId: "inf-4", stanceValue: 1 },
  { partyId: "likud", questionId: "inf-5", stanceValue: 0 },
  { partyId: "likud", questionId: "inf-6", stanceValue: -1 },
  {
    partyId: "likud",
    questionId: "rel-2",
    stanceValue: -1,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/b1yh1ijebg",
    sourceNote:
      "הכנסת דחתה הצעת חוק לתחבורה ציבורית מלאה בשבת בקריאה טרומית (58 נגד מול 43 בעד); הקואליציה בראשות הליכוד הצביעה נגד כגוש.",
  },
  { partyId: "likud", questionId: "rel-3", stanceValue: 1 },
  {
    partyId: "likud",
    questionId: "rel-4",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/article/hy3j0ukx11e",
    sourceNote:
      'בדצמבר 2025 יו"ר הכנסת אמיר אוחנה (ליכוד) היה חבר הקואליציה היחיד שהצביע בעד הצעת חוק נישואים אזרחיים של האופוזיציה -- בניגוד לכל שאר סיעת הליכוד, שהצביעה נגד פה אחד, בהתאם להסכם הליכוד-יהדות התורה על שימור הסטטוס קוו.',
  },
  {
    partyId: "likud",
    questionId: "rel-5",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14898966",
    sourceNote:
      'בכנסת ה-25 העבירה הקואליציה בראשות הליכוד את "חוק יסוד: לימוד תורה" וחוק למניעת מעצר משתמטים. לפי ynet (15.9.26), בליכוד אמרו שיפעלו להעברת חוק ההשתמטות מיד אחרי הבחירות, לפני הקמת הממשלה, בהתאם לדרישת ש"ס. בקמפיין נתניהו תוקף את החרדים ומדבר על סנקציות ויעדים, אבל ההצבעות בפועל הן בעד שימור הפטור.',
  },
  { partyId: "likud", questionId: "rel-7", stanceValue: 1 },
  { partyId: "likud", questionId: "rel-8", stanceValue: -1 },
  { partyId: "likud", questionId: "rel-9", stanceValue: 1 },
  { partyId: "likud", questionId: "rel-10", stanceValue: -1 },
  { partyId: "likud", questionId: "rel-11", stanceValue: -1 },
  {
    partyId: "likud",
    questionId: "jud-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/b1lxba3k2",
    sourceNote:
      "הכנסת אישרה בקריאה ראשונה (13-14 במרץ 2023) את חוק השפיטה הכולל פסקת התגברות ברוב רגיל (61 בעד מול 52 נגד), ביוזמת הקואליציה בראשות הליכוד.",
  },
  {
    partyId: "likud",
    questionId: "jud-2",
    stanceValue: -2,
    sourceUrl: "https://m.calcalist.co.il/Article.aspx?guid=r1mr0bmqs",
    sourceNote:
      "חלק ממתווה הרפורמה המשפטית של השר לוין (2023), שכלל גם שינוי הרכב הוועדה לבחירת שופטים לטובת רוב קואליציוני וגם ביטול עילת הסבירות ופסקת התגברות.",
  },
  {
    partyId: "likud",
    questionId: "jud-3",
    stanceValue: 2,
    sourceUrl: "https://www.tachlith.org.il/q-and-a-levin-saar-supreme-court-selection/",
    sourceNote:
      "מתווה לוין-סער (2025) להענקת רוב לנציגי הקואליציה/נבחרי ציבור בוועדה לבחירת שופטים.",
  },
  { partyId: "likud", questionId: "jud-5", stanceValue: 2 },
  { partyId: "likud", questionId: "jud-7", stanceValue: 2 },
  { partyId: "likud", questionId: "jud-8", stanceValue: -2 },
  { partyId: "likud", questionId: "jud-9", stanceValue: 2 },
  {
    partyId: "likud",
    questionId: "gov-1",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'ynet (3.10.26): הליכוד לא מסר עמדה. שרי הליכוד שתמכו בתחילה בוועדה ממלכתית חזרו בהם והטילו וטו על הקמתה, והמפלגה קידמה הצעת חוק לוועדה חלופית "לאומית".',
  },
  { partyId: "likud", questionId: "gov-3", stanceValue: -2 },
  {
    partyId: "likud",
    questionId: "gov-4",
    stanceValue: -2,
    sourceUrl: "https://www.calcalist.co.il/local/articles/0,7340,L-3723502,00.html",
    sourceNote:
      "הליכוד קידם דווקא את כיוון ה'חוק הצרפתי' ההפוך - שנועד למנוע חקירה או הגשת כתב אישום נגד ראש ממשלה מכהן, בהקשר הישיר של כתבי האישום נגד נתניהו.",
  },
  { partyId: "likud", questionId: "gov-5", stanceValue: -2 },
  { partyId: "likud", questionId: "soc-1", stanceValue: 1 },
  {
    partyId: "likud",
    questionId: "soc-2",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/article/hy3j0ukx11e",
    sourceNote:
      'לא אותר מקור ישיר וממוקד בהכרה בזוגיות חד-מינית/נישואים אזרחיים "לכל דבר ועניין" באופן ספציפי. מקור עקיף: הצבעת סיעת הליכוד (למעט אוחנה) נגד חוק נישואים אזרחיים כלליים בדצמבר 2025, וכן שב-2018 נתניהו הצהיר תמיכה עקרונית בפונדקאות לזוגות חד-מיניים אך הצביע נגד תיקון שהיה מיישם זאת בפועל.',
  },
  { partyId: "likud", questionId: "soc-3", stanceValue: 2 },
  { partyId: "likud", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "likud",
    questionId: "soc-6",
    stanceValue: -1,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/r1vsdzmv0",
    sourceNote:
      "הצעת חוק לייצוג הולם/שווה לנשים בדירקטוריונים של חברות ציבוריות נדחתה בקריאה טרומית (49 נגד מול 41 בעד); בין המצביעות נגד מסיעת הליכוד: גלית דיסטל אטבריאן, טלי גוטליב, צגה מלכו, אתי עטיה וקטי שטרית, וגם השרה לשוויון חברתי (ליכוד) התנגדה להצעה.",
  },
  { partyId: "likud", questionId: "soc-7", stanceValue: 1 },
  { partyId: "likud", questionId: "soc-10", stanceValue: -1 },
  {
    partyId: "beyachad",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ביחד לynet (27.9.26): "אנו תומכים בהתיישבות יהודית בכל מקום בו זה נעשה באופן חוקי", ו"תוכנית בנט מ-2012 רואה את שטחי C כחלק עתידי ריבוני של מדינת ישראל". (עדכון מ-1.)',
  },
  { partyId: "beyachad", questionId: "sec-2", stanceValue: 1 },
  {
    partyId: "beyachad",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ביחד לynet (27.9.26): "מתנגדים למדינה פלסטינית ומסירת שטחים". (עדכון מ-1-.)',
  },
  { partyId: "beyachad", questionId: "sec-4", stanceValue: -1 },
  { partyId: "beyachad", questionId: "sec-5", stanceValue: 1 },
  {
    partyId: "beyachad",
    questionId: "sec-6",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ביחד לynet (27.9.26): "מתנגדים לפינוי יישובים יהודיים שנבנו בהתאם לחוק בכל מצב שהוא". (עדכון מ-1.)',
  },
  { partyId: "beyachad", questionId: "sec-7", stanceValue: 1 },
  { partyId: "beyachad", questionId: "sec-8", stanceValue: 2 },
  { partyId: "beyachad", questionId: "sec-9", stanceValue: 1 },
  {
    partyId: "beyachad",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://www.israelhayom.co.il/news/defense/article/21230595",
    sourceNote:
      'בנט (2026): "אם חיזבאללה יורה עלינו -- אנחנו יורים על איראן", לצד אזהרה מפני הסכם חלקי עם איראן.',
  },
  {
    partyId: "beyachad",
    questionId: "sec-11",
    stanceValue: -1,
    sourceUrl: "https://glz.co.il/%D7%92%D7%9C%D7%A6/%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA/%D7%99%D7%A0%D7%99%D7%A8-%D7%A7%D7%95%D7%96%D7%99%D7%9F-%D7%95%D7%A1%D7%A4%D7%99-%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%94/%D7%99%D7%A0%D7%99%D7%A8-%D7%A7%D7%95%D7%96%D7%99%D7%9F-%D7%95%D7%A1%D7%A4%D7%99-%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9426-12-2023-0812/%D7%9C%D7%A4%D7%99%D7%93-%D7%A0%D7%92%D7%93-%D7%A0%D7%AA%D7%A0%D7%99%D7%94%D7%95-%D7%9E%D7%97%D7%A4%D7%A9-%D7%A2%D7%99%D7%9E%D7%95%D7%AA-%D7%A2%D7%9D-%D7%94%D7%90%D7%9E%D7%A8%D7%99%D7%A7%D7%A0%D7%99%D7%9D-%D7%A9%D7%9E%D7%A9%D7%A8%D7%AA-%D7%90%D7%95%D7%AA%D7%95-%D7%A4%D7%95%D7%9C%D7%99%D7%98%D7%99%D7%AA",
    sourceNote:
      'לפיד ביקר בפומבי את נתניהו על כך ש"מחפש עימות עם האמריקנים שמשרת אותו פוליטית". יעד מדיניות חוץ מוצהר נוסף: "שיקום ושינוי כיוון של היחסים עם ארה"ב, חזרה למעמד הדו-מפלגתי" -- עמדה המעדיפה שימור הברית על פני עצמאות המחייבת עימות.',
  },
  { partyId: "beyachad", questionId: "sec-12", stanceValue: 1 },
  { partyId: "beyachad", questionId: "sec-13", stanceValue: 1 },
  { partyId: "beyachad", questionId: "eco-1", stanceValue: 1 },
  {
    partyId: "beyachad",
    questionId: "eco-2",
    stanceValue: 0,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד: "נעלה את קצבת הזקנה לנזקקים ביותר" ונשמור 60% מקצבת הנכות לעובדים, אבל גם "כל הקצבאות וההטבות שמעודדות השתמטות - יבוטלו". הגדלה ממוקדת לצד ביטול קצבאות - 0. (עדכון מ-1-.)',
  },
  { partyId: "beyachad", questionId: "eco-3", stanceValue: 2 },
  { partyId: "beyachad", questionId: "eco-4", stanceValue: -1 },
  { partyId: "beyachad", questionId: "eco-5", stanceValue: 2 },
  {
    partyId: "beyachad",
    questionId: "eco-6",
    stanceValue: 1,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (משבר הדיור): "להגדיל משמעותית את היצע הדירות... ולהבטיח דיור בר-השגה ויציב לזוגות צעירים ולמשרתי מילואים". הדגש על הגדלת היצע ולא על דיור ציבורי, ולכן 1. (עדכון מ-1-.)',
  },
  { partyId: "beyachad", questionId: "eco-7", stanceValue: 1 },
  { partyId: "beyachad", questionId: "eco-8", stanceValue: -1 },
  { partyId: "beyachad", questionId: "eco-9", stanceValue: 2 },
  { partyId: "beyachad", questionId: "eco-10", stanceValue: -1 },
  { partyId: "beyachad", questionId: "eco-11", stanceValue: 1 },
  {
    partyId: "beyachad",
    questionId: "eco-12",
    stanceValue: 2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (יוקר המחיה): "תוך שלוש שנים נוריד את מחירי המזון ב-30%... זו נטו תוצאה של שוק סגור, ריכוזי ובלי תחרות... נצא למלחמת חורמה לפירוק קרטלי המזון".',
  },
  { partyId: "beyachad", questionId: "inf-1", stanceValue: 1 },
  { partyId: "beyachad", questionId: "inf-2", stanceValue: 1 },
  { partyId: "beyachad", questionId: "inf-3", stanceValue: 1 },
  { partyId: "beyachad", questionId: "inf-4", stanceValue: 1 },
  { partyId: "beyachad", questionId: "inf-5", stanceValue: 2 },
  { partyId: "beyachad", questionId: "inf-6", stanceValue: 0 },
  {
    partyId: "beyachad",
    questionId: "rel-2",
    stanceValue: 1,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (דת ומדינה): "כל רשות מקומית תחליט בעצמה על תחבורה ציבורית בשבת לפי צביונה" - תחבורה בשבת כבחירה מקומית ולא בכל רחבי הארץ, ולכן 1. (עדכון מ-0.)',
  },
  {
    partyId: "beyachad",
    questionId: "rel-3",
    stanceValue: -1,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד: "מימון ציבורי יינתן רק למוסדות שמלמדים 100% לימודי ליבה", ו"לא נממן... את מי שמסרב לשרת". (עדכון מ-0.)',
  },
  {
    partyId: "beyachad",
    questionId: "rel-4",
    stanceValue: 2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (דת ומדינה): "כל זוג יוכל להירשם במסלול אזרחי מלא במשרד הפנים". (עדכון מ-0.)',
  },
  {
    partyId: "beyachad",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14898966",
    sourceNote:
      'ביחד לynet (15.9.26): "כל אזרח במדינת ישראל יתגייס לצה״ל או יעשה שירות לאומי אזרחי... ללא פטורים - זה נכון לערבים ונכון גם לחרדים. אין מכסות ואין יעדים, מי שלא יתגייס לא יקבל שקל מהמדינה".',
  },
  {
    partyId: "beyachad",
    questionId: "rel-7",
    stanceValue: -1,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד: מסלול אזרחי מלא לרישום זוגיות, הכרה בכשרות בינלאומית, ו"סמכויות הגיור יחזרו לרבני הקהילות" - צמצום ולא הרחבה של סמכויות הרבנות. (עדכון מ-0.)',
  },
  { partyId: "beyachad", questionId: "rel-8", stanceValue: 0 },
  {
    partyId: "beyachad",
    questionId: "rel-9",
    stanceValue: -2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד: "זרם החינוך הממלכתי (כללי, דתי וחרדי) יהיה זרם החינוך המתוקצב היחיד במדינה... לא ממלכתי, לא על חשבוני!". (עדכון מ-0.)',
  },
  { partyId: "beyachad", questionId: "rel-10", stanceValue: 0 },
  { partyId: "beyachad", questionId: "rel-11", stanceValue: 2 },
  {
    partyId: "beyachad",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/article/r1xfjh0wp",
    sourceNote:
      'לפיד לאחר פסילת עילת הסבירות בבג"ץ (ינואר 2024): "העליון מילא נאמנה את תפקידו... אנחנו נותנים לו גיבוי מלא". בנט (מקור נפרד, ice.co.il): הרפורמה "הצעה מסוכנת שתפגע ביסודות המדינה".',
  },
  {
    partyId: "beyachad",
    questionId: "jud-2",
    stanceValue: 2,
    sourceUrl: "https://www.ice.co.il/local-news/news/article/927041",
    sourceNote:
      'בנט: הרפורמה המשפטית "מסוכנת... תפגע ביסודות המדינה, כלכלתה ואזרחיה", ו"לא ניתן להעביר לקיצון השני של איבוד איזונים ובלמים, סירוס מערכת המשפט". לפיד תמך במפורש ובאופן חד-משמעי בסמכות בג"ץ לבטל חקיקה (ר\' jud-1).',
  },
  {
    partyId: "beyachad",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'ביחד לynet (21.9.26): "נבטל את החוק לבחירת שופטים החדש שיחריב את המערכת ונמנע פוליטיזציה של מערכת המשפט". (עדכון מ-1-.)',
  },
  { partyId: "beyachad", questionId: "jud-5", stanceValue: 0 },
  { partyId: "beyachad", questionId: "jud-7", stanceValue: 0 },
  { partyId: "beyachad", questionId: "jud-8", stanceValue: 0 },
  { partyId: "beyachad", questionId: "jud-9", stanceValue: 0 },
  {
    partyId: "beyachad",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.haaretz.co.il/news/elections/2026-05-12/ty-article/.premium/0000019e-1d2f-d618-adde-1d7f20fc0000",
    sourceNote:
      'בכנס הראשון הרשמי של מפלגת "ביחד" (12.5.2026), בנט: "הדבר הראשון שנעשה [אם נצליח להרכיב ממשלה] יהיה הקמת ועדת חקירה ממלכתית ל-7 באוקטובר". כתבה נוספת (הארץ, 26.4.2026) מאששת התחייבות משותפת של בנט ולפיד להקמתה ביום הראשון לממשלתם.',
  },
  { partyId: "beyachad", questionId: "gov-3", stanceValue: 2 },
  {
    partyId: "beyachad",
    questionId: "gov-4",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/article/r1i4p7gq5",
    sourceNote:
      'עמדה חלוקה בתוך הרשימה: בנט התנגד ב-2022 ל"חוק הנאשם" (ונתן חופש הצבעה), ובקמפיין 2026 אמר שאין לו בעיה שנתניהו יכהן כשר בממשלתו; לפיד תמך בחוק ("נאשם לא יכול להיות ראש ממשלה במדינה שומרת חוק"). (עדכון מ-1.)',
  },
  { partyId: "beyachad", questionId: "gov-5", stanceValue: 1 },
  { partyId: "beyachad", questionId: "soc-1", stanceValue: 0 },
  {
    partyId: "beyachad",
    questionId: "soc-2",
    stanceValue: 2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (קהילה גאה): "נעגן את השוויון בחוק יסוד. נחוקק רישום זוגיות אזרחי שיעניק את מלוא הזכויות. נבטיח הורות שווה מהרגע הראשון". (עדכון מ-0.)',
  },
  {
    partyId: "beyachad",
    questionId: "soc-3",
    stanceValue: -1,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (קהילה גאה): "נאסור בחוק טיפולי המרה, הסתה, ואפליה נגד להט"ב בכל תחום. נבטיח סביבה בטוחה יותר, גם בבתי הספר". (עדכון מ-0.)',
  },
  {
    partyId: "beyachad",
    questionId: "soc-5",
    stanceValue: 2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד: "נפסיק להתייחס לפשיעה המאורגנת כעוד בעיה פלילית... נכריז עליהם רשמית כאיום ביטחוני לאומי", בשיתוף השב"כ וצה"ל. (עדכון מ-1.)',
  },
  {
    partyId: "beyachad",
    questionId: "soc-6",
    stanceValue: 2,
    sourceUrl: "https://be-yahad.org.il/plans/",
    sourceNote:
      'מצע ביחד (מעמד הנשים): "נקבע 50% ייצוג בדרג הבכיר". (עדכון מ-0.)',
  },
  { partyId: "beyachad", questionId: "soc-7", stanceValue: 0 },
  { partyId: "beyachad", questionId: "soc-10", stanceValue: 0 },
  {
    partyId: "otzma-yehudit",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/r14vvrnhbe",
    sourceNote:
      'הקבינט (בשותפות עוצמה יהודית) אישר ב-2026 34 יישובים חדשים ביו"ש (הכשרת 10 מאחזים + 24 יישובים חדשים בשטח C); בן גביר אישית לחץ לכלול את "יישוב הדעת" ברשימה. נכון לאפריל 2026, 212 מתוך 363 מאחזים (58%+) הוקמו תחת הממשלה הנוכחית.',
  },
  { partyId: "otzma-yehudit", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "otzma-yehudit",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.kan.org.il/content/kan-news/politic/953432/",
    sourceNote:
      "הכנסת אישרה בפברואר 2024 ברוב גדול החלטת ממשלה לפיה ישראל תתנגד להטלת מדינה פלסטינית מבחוץ; המפלגה תמכה בהחלטה כחלק מהקואליציה.",
  },
  { partyId: "otzma-yehudit", questionId: "sec-4", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "sec-5", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "sec-6", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "sec-7", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "sec-8", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "sec-9", stanceValue: -2 },
  {
    partyId: "otzma-yehudit",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://www.maariv.co.il/news/politics/article-1305648",
    sourceNote:
      'בן גביר (אפריל 2026) שיבח את "העבודה הנפלאה" במערכה נגד איראן, טען שהאיום הגרעיני הצדיק את המערכה, ורמז ל"הישגים נוספים בזירה האיראנית שטרם נחשפו לציבור".',
  },
  {
    partyId: "otzma-yehudit",
    questionId: "sec-11",
    stanceValue: 2,
    sourceUrl: "https://www.mako.co.il/news-politics/2026_q2/Article-e982cefa43ace91026.htm",
    sourceNote:
      'בן גביר הצהיר שהסכם טראמפ עם איראן אינו מחייב את ישראל, וכי ישראל היא מדינה עצמאית וריבונית שאינה כפופה לארה"ב.',
  },
  { partyId: "otzma-yehudit", questionId: "sec-12", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "sec-13", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "eco-1", stanceValue: 1 },
  { partyId: "otzma-yehudit", questionId: "eco-2", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "eco-3", stanceValue: 1 },
  { partyId: "otzma-yehudit", questionId: "eco-4", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "eco-5", stanceValue: 1 },
  { partyId: "otzma-yehudit", questionId: "eco-6", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "eco-7", stanceValue: 1 },
  { partyId: "otzma-yehudit", questionId: "eco-8", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "eco-9", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "eco-10", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "eco-11", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "eco-12", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "inf-1", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "inf-2", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "inf-3", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "inf-4", stanceValue: 0 },
  { partyId: "otzma-yehudit", questionId: "inf-5", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "inf-6", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "rel-2", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "rel-3", stanceValue: 2 },
  {
    partyId: "otzma-yehudit",
    questionId: "rel-4",
    stanceValue: -2,
    sourceUrl: "https://www.inn.co.il/news/576700",
    sourceNote:
      'בן גביר (רדיו וואלה, 7.9.2022): "הקו האדום שלי הוא נישואי להט"ב" וכי לא יתיר בחקיקה נישואין שאינם "כדת משה וישראל".',
  },
  {
    partyId: "otzma-yehudit",
    questionId: "rel-5",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%97%D7%95%D7%A7_%D7%94%D7%92%D7%99%D7%95%D7%A1",
    sourceNote:
      "הממשלה (בראשות הליכוד, עם ש\"ס, יהדות התורה, עוצמה יהודית והציונות הדתית) קיבלה ב-2023 את החלטה 682 שדחתה את גיוס תלמידי הישיבות עד לחקיקה מוסכמת, בפועל ממשיכה את הפטור בפועל.",
  },
  { partyId: "otzma-yehudit", questionId: "rel-7", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "rel-8", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "rel-9", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "rel-10", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "rel-11", stanceValue: -2 },
  {
    partyId: "otzma-yehudit",
    questionId: "jud-1",
    stanceValue: 2,
    sourceUrl: "https://news.walla.co.il/item/3539088",
    sourceNote:
      'פסקת התגברות ברוב של 61 ח"כים הייתה דרישה מרכזית של גורמי הימין הדתי-לאומי (כולל בן גביר ועוצמה יהודית) במשא ומתן הקואליציוני להקמת הממשלה ה-37 (סוף 2022). בן גביר תקף פומבית פסיקות בג"ץ המבטלות חקיקה, וקרא לממשלה "להעביר את הרפורמה במלואה".',
  },
  {
    partyId: "otzma-yehudit",
    questionId: "jud-2",
    stanceValue: -2,
    sourceUrl: "https://m.calcalist.co.il/Article.aspx?guid=r1mr0bmqs",
    sourceNote:
      "חלק ממתווה הרפורמה המשפטית של השר לוין (2023), שכלל גם שינוי הרכב הוועדה לבחירת שופטים לטובת רוב קואליציוני וגם ביטול עילת הסבירות ופסקת התגברות.",
  },
  {
    partyId: "otzma-yehudit",
    questionId: "jud-3",
    stanceValue: 2,
    sourceUrl: "https://www.tachlith.org.il/q-and-a-levin-saar-supreme-court-selection/",
    sourceNote:
      "מתווה לוין-סער (2025) להענקת רוב לנציגי הקואליציה/נבחרי ציבור בוועדה לבחירת שופטים.",
  },
  { partyId: "otzma-yehudit", questionId: "jud-5", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "jud-7", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "jud-8", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "jud-9", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "gov-1", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "gov-3", stanceValue: -1 },
  { partyId: "otzma-yehudit", questionId: "gov-4", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "gov-5", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "soc-1", stanceValue: 2 },
  {
    partyId: "otzma-yehudit",
    questionId: "soc-2",
    stanceValue: -2,
    sourceUrl: "https://www.inn.co.il/news/576700",
    sourceNote:
      'בן גביר (רדיו וואלה, 7.9.2022): "הקו האדום שלי הוא נישואי להט"ב" -- הצהיר שלא יתיר בחקיקה נישואין חד-מיניים או פונדקאות להט"ב, בנימוק שבמדינה יהודית נישואין צריכים להיות "כדת משה וישראל".',
  },
  { partyId: "otzma-yehudit", questionId: "soc-3", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "soc-5", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "soc-6", stanceValue: -2 },
  { partyId: "otzma-yehudit", questionId: "soc-7", stanceValue: 2 },
  { partyId: "otzma-yehudit", questionId: "soc-10", stanceValue: -2 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'ישראל ביתנו לynet (27.9.26): "תומכת בחיזוק ההתיישבות ביהודה ושומרון, ובכלל זה בקידום הבנייה באזור E1", ו"תומכים בהחלת ריבונות ישראלית בשטחי C". (עדכון מ-1.)',
  },
  { partyId: "yisrael-beiteinu", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.kan.org.il/content/kan-news/politic/953432/",
    sourceNote:
      "הכנסת אישרה בפברואר 2024 ברוב גדול החלטת ממשלה לפיה ישראל תתנגד להטלת מדינה פלסטינית מבחוץ; המפלגה תמכה בהחלטה כחלק מהקואליציה.",
  },
  { partyId: "yisrael-beiteinu", questionId: "sec-4", stanceValue: -2 },
  { partyId: "yisrael-beiteinu", questionId: "sec-5", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "sec-6", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "sec-7", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "sec-8", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "sec-9", stanceValue: -1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://www.israelhayom.co.il/news/geopolitics/article/18964361",
    sourceNote:
      'ליברמן: "צריך לשגר על איראן 400 טילים" (ישיבת סיעה), וקורא להקמת חיל חדש שיוכל "לפגוע בכל נקודה באיראן תוך 12 דקות", תוך ביקורת על "תפיסת הכלה" פסיבית מדי של הממשלה.',
  },
  {
    partyId: "yisrael-beiteinu",
    questionId: "sec-11",
    stanceValue: 2,
    sourceUrl: "https://www.news1.co.il/Archive/001-D-522171-00.html",
    sourceNote:
      'ליברמן (12.8.2026), בביקור במעבר כרם שלום: נתניהו ויתר על עצמאות ישראל בקבלת החלטות ביטחוניות, וישראל "לא יכולה להזיז סיכה בלי לתאם עם ארצות הברית".',
  },
  { partyId: "yisrael-beiteinu", questionId: "sec-12", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "sec-13", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "eco-1", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "eco-2",
    stanceValue: 0,
    sourceUrl: "https://beytenu.org.il/%D7%94%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%94%D7%9B%D7%9C%D7%9B%D7%9C%D7%99%D7%AA-%D7%A9%D7%9C-%D7%90%D7%91%D7%99%D7%92%D7%93%D7%95%D7%A8-%D7%9C%D7%99%D7%91%D7%A8%D7%9E%D7%9F/",
    sourceNote:
      'התוכנית הכלכלית הרשמית של ליברמן כוללת העלאת קצבת קשישים ב-20% והגדלת המענק השנתי לניצולי שואה מ-6,500 ל-8,000 ש"ח -- הגדלה ממוקדת של קצבאות מסוימות, לצד התנגדות עקבית להעלאות רוחביות פופוליסטיות (ר\' eco-4). עמדה מעורבת/סלקטיבית ולא גורפת.',
  },
  { partyId: "yisrael-beiteinu", questionId: "eco-3", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "eco-4",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/economy/article/skjbe11be5",
    sourceNote:
      'ליברמן הגיב בסרקזם לדרישה להעלות שכר מינימום ל-6,500 ש"ח ("למה לא ל-8,500?"), והזהיר כי העלאה משמעותית "תתגלגל לצרכן ותגרום לעליות מחירים ולאינפלציה" ותייצר אבטלה.',
  },
  { partyId: "yisrael-beiteinu", questionId: "eco-5", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "eco-6",
    stanceValue: 1,
    sourceUrl: "https://beytenu.org.il/party-platform/",
    sourceNote:
      "המצע הרשמי כולל תוכנית פעילה להגדלת היצע הדיור (זירוז רישוי, שיטות בנייה תעשייתיות, תמריצים לרשויות מקומיות) ומשכנתאות מסובסדות עד 90% משווי הדירה לזוגות צעירים ומשוחררי צבא -- דגש על הרחבת היצע/סבסוד ביקוש ולא על דיור ציבורי קלאסי.",
  },
  { partyId: "yisrael-beiteinu", questionId: "eco-7", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "eco-8", stanceValue: -1 },
  { partyId: "yisrael-beiteinu", questionId: "eco-9", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "eco-10", stanceValue: -1 },
  { partyId: "yisrael-beiteinu", questionId: "eco-11", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "eco-12",
    stanceValue: 2,
    sourceUrl: "https://beytenu.org.il/party-platform/",
    sourceNote:
      'המצע הרשמי קורא במפורש ל"הסרת חסמים, צמצום הרגולציה", ביטול בלעדיות יבואנים, ופירוק "מועצות הייצור" (חלב, ירקות) המגנות על יצרנים מקומיים.',
  },
  {
    partyId: "yisrael-beiteinu",
    questionId: "inf-1",
    stanceValue: 0,
    sourceUrl: "https://liberman.org.il/%D7%A2%D7%A7%D7%A8%D7%95%D7%A0%D7%95%D7%AA/",
    sourceNote:
      'דף העקרונות של ליברמן מציע גם הרחבת מסילות רכבת לדרום וגם הרחבת כביש 90 -- תמיכה מקבילה בתחבורה ציבורית וגם בתשתית כבישים, לא הפניית "עיקר" התקציב לרכבות על חשבון כבישים.',
  },
  { partyId: "yisrael-beiteinu", questionId: "inf-2", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "inf-3", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "inf-4", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "inf-5", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "inf-6", stanceValue: -1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "rel-2",
    stanceValue: 2,
    sourceUrl: "https://news.walla.co.il/item/3062892",
    sourceNote:
      'ישראל ביתנו יזמה הצעת חוק להפעלת תחבורה ציבורית בשבת (ח"כים עודד פורר ויוליה מלינובסקי).',
  },
  { partyId: "yisrael-beiteinu", questionId: "rel-3", stanceValue: -2 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "rel-4",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/articles/0,7340,L-5573716,00.html",
    sourceNote:
      'המצע הרשמי (2026: "מתן אפשרות לנישואים וגירושים אזרחיים") ודף העקרונות של ליברמן ("מיסוד נישואים אזרחיים לכל הזוגות שיחפצו בכך") חוזרים על ההתחייבות -- עמדה עקבית לאורך שנים.',
  },
  {
    partyId: "yisrael-beiteinu",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://www.zman.co.il/652488/",
    sourceNote:
      "עמדת יסוד-המפלגה: שוויון בנטל הגיוס וביטול פטור הישיבות -- סמן זהות מרכזי של המפלגה החילונית-לאומית.",
  },
  { partyId: "yisrael-beiteinu", questionId: "rel-7", stanceValue: -2 },
  { partyId: "yisrael-beiteinu", questionId: "rel-8", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "rel-9", stanceValue: -2 },
  { partyId: "yisrael-beiteinu", questionId: "rel-10", stanceValue: 2 },
  { partyId: "yisrael-beiteinu", questionId: "rel-11", stanceValue: 2 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://beytenu.org.il/party-platform/",
    sourceNote:
      'המצע הרשמי: "התנגדות לחוק הצרפתי ולפסקת ההתגברות". ליברמן (מרץ 2023): "פסקת ההתגברות IN -- שוויון בנטל OUT... העברת פסקת ההתגברות היא יריקה בפרצופם של חיילי צה"ל ומשרתי המילואים".',
  },
  {
    partyId: "yisrael-beiteinu",
    questionId: "jud-2",
    stanceValue: 1,
    sourceUrl: "https://news.walla.co.il/item/3855572",
    sourceNote:
      'עמדת ישראל ביתנו: להשאיר את הוועדה הקיימת לבחירת שופטים כפי שהיא, ולהקים לצידה בית משפט חוקתי נפרד שחבריו ייבחרו ע"י נבחרי ציבור -- עמדת ביניים המשמרת בפועל את עצמאות ביהמ"ש העליון הקיים.',
  },
  {
    partyId: "yisrael-beiteinu",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://news.walla.co.il/item/3855572",
    sourceNote:
      'אותה כתבה קובעת מפורשות שליברמן "מתנגד לשינוי הרכב הוועדה הקיימת", ומציע במקומה בית משפט חוקתי נפרד -- תוך השארת הוועדה הקיימת ללא שינוי הרכב.',
  },
  { partyId: "yisrael-beiteinu", questionId: "jud-5", stanceValue: -1 },
  { partyId: "yisrael-beiteinu", questionId: "jud-7", stanceValue: -1 },
  { partyId: "yisrael-beiteinu", questionId: "jud-8", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "jud-9", stanceValue: 0 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'ישראל ביתנו לynet (3.10.26): "בעד הקמת ועדת חקירה ממלכתית בדיוק לפי החוק הקיים... זו תהיה ההחלטה הראשונה שנקבל בממשלה שנקים".',
  },
  { partyId: "yisrael-beiteinu", questionId: "gov-3", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "gov-4",
    stanceValue: 2,
    sourceUrl: "https://liberman.org.il/%D7%A2%D7%A7%D7%A8%D7%95%D7%A0%D7%95%D7%AA/",
    sourceNote:
      "דף העקרונות הנוכחי (2026) קובע איסור מפורש על אדם שהוגש נגדו כתב אישום מלהרכיב ממשלה, לכהן כנשיא, או לעמוד בראש מפלגה.",
  },
  { partyId: "yisrael-beiteinu", questionId: "gov-5", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "soc-1", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "soc-2",
    stanceValue: 1,
    sourceUrl: "https://liberman.org.il/%D7%A2%D7%A7%D7%A8%D7%95%D7%A0%D7%95%D7%AA/",
    sourceNote:
      'דף העקרונות של ליברמן קובע "מיסוד נישואים אזרחיים לכל הזוגות שיחפצו בכך" -- ניסוח שאינו מבחין לפי מגדר בני הזוג, אך אין הצהרה ממוקדת על זכויות זוגיות חד-מינית מעבר לכך, ותועדו גם אמירות מסויגות של ליברמן כלפי הקהילה הגאה בעבר.',
  },
  { partyId: "yisrael-beiteinu", questionId: "soc-3", stanceValue: 0 },
  { partyId: "yisrael-beiteinu", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "yisrael-beiteinu",
    questionId: "soc-6",
    stanceValue: 2,
    sourceUrl: "https://beytenu.org.il/%D7%94%D7%A6%D7%A2%D7%AA-%D7%97%D7%95%D7%A7-%D7%99%D7%99%D7%A6%D7%95%D7%92-%D7%94%D7%95%D7%9C%D7%9D-%D7%9C%D7%A0%D7%A9%D7%99%D7%9D-%D7%91%D7%A8%D7%A9%D7%99%D7%9E%D7%95%D7%AA-%D7%9C%D7%9B%D7%A0%D7%A1/",
    sourceNote:
      'המצע הרשמי כולל התחייבות מפורשת ל"הבטחת ייצוג הולם לנשים ברשימות המתמודדות לכנסת". ח"כית שרון ניר (ישראל ביתנו) יזמה ביולי 2024 הצעת חוק לייצוג הולם לנשים בכנסת.',
  },
  { partyId: "yisrael-beiteinu", questionId: "soc-7", stanceValue: 1 },
  { partyId: "yisrael-beiteinu", questionId: "soc-10", stanceValue: 0 },
  {
    partyId: "hademocratim",
    questionId: "sec-1",
    stanceValue: -2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (אפריל 2026, פרק 4) קובע במפורש "לא לסיפוח, כן להיפרדות אחראית" ו"עצירת כל מהלכי סיפוח -- חוקיים, זוחלים או בפועל".',
  },
  { partyId: "hademocratim", questionId: "sec-2", stanceValue: -1 },
  {
    partyId: "hademocratim",
    questionId: "sec-3",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 4) קורא ל"יוזמה מדינית לפתרון הסכסוך הפלסטיני... היפרדות אחראית" הכוללת "פירוז מלא של המדינה הפלסטינית העתידית -- ללא צבא או איום טרור".',
  },
  { partyId: "hademocratim", questionId: "sec-4", stanceValue: 1 },
  { partyId: "hademocratim", questionId: "sec-5", stanceValue: 0 },
  { partyId: "hademocratim", questionId: "sec-6", stanceValue: -1 },
  { partyId: "hademocratim", questionId: "sec-7", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "sec-8", stanceValue: -1 },
  { partyId: "hademocratim", questionId: "sec-9", stanceValue: 2 },
  {
    partyId: "hademocratim",
    questionId: "sec-10",
    stanceValue: 1,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 4) קורא במפורש ל"דוקטרינה חדשה של יוזמה אסטרטגית מונעת", הכוללת "פגיעה מקדימה בהתבססות אויב על גבולותינו" ו"דוקטרינת הרתעה חדה וברורה"; מדגיש גם פעולה בשותפות עם ארה"ב ומדינות ערביות מתונות, לא הרפתקנות חד-צדדית.',
  },
  {
    partyId: "hademocratim",
    questionId: "sec-11",
    stanceValue: -2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי מדגיש "חיזוק השותפות האסטרטגית עם ארה"ב" כאבן יסוד; יאיר גולן (גלובס): "לא נוכל להילחם באיראן לבד".',
  },
  { partyId: "hademocratim", questionId: "sec-12", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "sec-13", stanceValue: 1 },
  { partyId: "hademocratim", questionId: "eco-1", stanceValue: -2 },
  {
    partyId: "hademocratim",
    questionId: "eco-2",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 5, "שיפור השירותים החברתיים") קובע יעד מפורש: "הגדלת השקעה בשירותים החברתיים עם עדיפות ברורה לאוכלוסיות מוחלשות -- כולל בעלי מוגבלויות, קשישים, משפחות חד-הוריות ונוער בסיכון".',
  },
  { partyId: "hademocratim", questionId: "eco-3", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "eco-4", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "eco-5", stanceValue: 2 },
  {
    partyId: "hademocratim",
    questionId: "eco-6",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרקים 5 ו-7) קורא ל"מימוש הזכות לדיור", "שחרור שוק הקרקעות הממשלתיות -- להוזלת הדיור" ול"תוכנית ארצית לדיור ציבורי".',
  },
  { partyId: "hademocratim", questionId: "eco-7", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "eco-8", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "eco-9", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "eco-10", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "eco-11", stanceValue: 2 },
  {
    partyId: "hademocratim",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 5, "הורדת יוקר המחיה") קורא במפורש ל"פתיחת שוק המזון ליבוא ותחרות, כולל ביטול חסמי תקינה מיותרים".',
  },
  {
    partyId: "hademocratim",
    questionId: "inf-1",
    stanceValue: 1,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי תומך בהעדפת תחבורה ציבורית ("נשקיע במערכת תחבורה... המתעדפת הולכי רגל, תחבורה ציבורית, ואופניים"), אך מזכיר גם "כבישים, רכבות, אנרגיה מתחדשת" כהשקעות תשתית מקבילות, לא הפניית עיקר התקציב לרכבות דווקא.',
  },
  { partyId: "hademocratim", questionId: "inf-2", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "inf-3", stanceValue: -1 },
  { partyId: "hademocratim", questionId: "inf-4", stanceValue: -1 },
  { partyId: "hademocratim", questionId: "inf-5", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "inf-6", stanceValue: 2 },
  {
    partyId: "hademocratim",
    questionId: "rel-2",
    stanceValue: 1,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 6): "תופעל תחבורה ציבורית במתכונת מצומצמת באזורים חילוניים או מעורבים, תוך שמירה על צביון השבת באזורים דתיים. הרשויות המקומיות יוסמכו להחליט על היקף השירות" -- תחבורה חלקית ומוסמכת-מקומית, לא הפעלה מלאה גורפת בכל הארץ.',
  },
  { partyId: "hademocratim", questionId: "rel-3", stanceValue: -2 },
  {
    partyId: "hademocratim",
    questionId: "rel-4",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 6): "הדמוקרטים יפעלו להקמת מערך נישואין אזרחיים מקביל לרבנות... נישואין אלו יעניקו לנישאים בהם זכויות מלאות ושוות", וכן "גירושין בבתי דין אזרחיים".',
  },
  {
    partyId: "hademocratim",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 1, "שוויון בנטל"): "נחייב שירות צבאי לפי החוק הקיים, תוך ביטול פטורים וחקיקה סקטוריאלית". יאיר גולן טען בנפרד שאי אפשר "לגייס את כל החרדים מחר בבוקר" והציע מסלולי "שנת שירות" מגוונים לצד השירות הצבאי כעוגן מרכזי -- הסתייגות מקצב היישום, לא מכיוון העמדה.',
  },
  { partyId: "hademocratim", questionId: "rel-7", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "rel-8", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "rel-9", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "rel-10", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "rel-11", stanceValue: 2 },
  {
    partyId: "hademocratim",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 3): "נקבע בחוק כי שום רשות לא תשלוט ברעותה, ונבטיח מניעת חקיקה עוקפת בג"ץ או פסקת התגברות גורפת".',
  },
  {
    partyId: "hademocratim",
    questionId: "jud-2",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 3): "נחזק את עצמאות הרשות השופטת ונגן על סמכות הביקורת החוקתית של בג"ץ".',
  },
  {
    partyId: "hademocratim",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 3, "חיזוק שומרי הסף"): "מינויים מקצועיים בלבד על ידי ועדות בלתי תלויות" -- התנגדות מפורשת לרוב פוליטי בוועדה לבחירת שופטים.',
  },
  { partyId: "hademocratim", questionId: "jud-5", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "jud-7", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "jud-8", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "jud-9", stanceValue: -2 },
  {
    partyId: "hademocratim",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'הדמוקרטים לynet (3.10.26): "הקמת ועדת חקירה ממלכתית תהיה ההחלטה הראשונה שהמפלגה תוביל בממשלה הבאה... חברי הוועדה ימונו בידי נשיא העליון".',
  },
  { partyId: "hademocratim", questionId: "gov-3", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "gov-4", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "gov-5", stanceValue: 2 },
  { partyId: "hademocratim", questionId: "soc-1", stanceValue: -2 },
  {
    partyId: "hademocratim",
    questionId: "soc-2",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 6) כולל את "זוגות להט"בים" באופן מפורש במסגרת מערך הנישואין האזרחיים המוצע, עם "זכויות מלאות ושוות".',
  },
  { partyId: "hademocratim", questionId: "soc-3", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "hademocratim",
    questionId: "soc-6",
    stanceValue: 2,
    sourceUrl: "https://democrats.org.il/wp-content/uploads/2026/04/vision0426.pdf",
    sourceNote:
      'המצע הרשמי (פרק 1, "שוויון"): "שוויון הזדמנויות על ידי שילוב ערבים, חרדים, עולים, נשים ותושבי פריפריה בכל דרגי השירות הציבורי, האקדמיה, וההנהגה", וכן "שוויון מגדרי" כערך יסוד מוצהר.',
  },
  { partyId: "hademocratim", questionId: "soc-7", stanceValue: -2 },
  { partyId: "hademocratim", questionId: "soc-10", stanceValue: 2 },
  { partyId: "shas", questionId: "sec-1", stanceValue: 1 },
  { partyId: "shas", questionId: "sec-2", stanceValue: 1 },
  {
    partyId: "shas",
    questionId: "sec-3",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/article/skjasx8or",
    sourceNote:
      'הכנסת אישרה (פברואר 2024, ביוזמת ח"כ זאב אלקין) הצהרה שהכנסת מתנגדת להקמת מדינה פלסטינית; חברי ש"ס הצביעו בעד, אך אריה דרעי עצמו (כמו נתניהו וגלנט) לא השתתף בהצבעה.',
  },
  { partyId: "shas", questionId: "sec-4", stanceValue: -1 },
  { partyId: "shas", questionId: "sec-5", stanceValue: 1 },
  { partyId: "shas", questionId: "sec-6", stanceValue: 1 },
  { partyId: "shas", questionId: "sec-7", stanceValue: 0 },
  { partyId: "shas", questionId: "sec-8", stanceValue: 1 },
  { partyId: "shas", questionId: "sec-9", stanceValue: -1 },
  {
    partyId: "shas",
    questionId: "sec-10",
    stanceValue: -1,
    sourceUrl: "https://www.c14.co.il/article/1580025",
    sourceNote:
      'גדי איזנקוט טען בריאיון שדרעי התנגד לתגובה עוצמתית בתוך איראן לאחר מתקפת הטילים של אפריל 2024. בישיבת קבינט מצומצם דרעי אמר "מספיק עם הרעיונות לתקוף איראן ולבנון... צריך להיות ריאלי" -- בניגוד לקו התוקפני של סמוטריץ\' ובן גביר; דרעי הכחיש בדיעבד שדובר ב"נזיפה".',
  },
  { partyId: "shas", questionId: "sec-11", stanceValue: 0 },
  { partyId: "shas", questionId: "sec-12", stanceValue: -1 },
  { partyId: "shas", questionId: "sec-13", stanceValue: 0 },
  { partyId: "shas", questionId: "eco-1", stanceValue: -1 },
  {
    partyId: "shas",
    questionId: "eco-2",
    stanceValue: 2,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/h1qxiymzjg",
    sourceNote:
      'דרעי, נתניהו וסמוטריץ\' סיכמו לבטל את הקפאת הקצבאות -- חוץ מקצבאות הילדים שיוקפאו; דרעי התנגד לתוכנית האוצר להקפיא קצבאות זקנה/נכות (חיסכון של כ-5 מיליארד ש"ח בשנה) והביא לביטולה, במימון חלופי מהעלאת דמי ביטוח לאומי.',
  },
  { partyId: "shas", questionId: "eco-3", stanceValue: -1 },
  {
    partyId: "shas",
    questionId: "eco-4",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/economy/article/rjcptaa2jl",
    sourceNote:
      'שכר המינימום עלה מ-5,880 ל-6,247.67 ש"ח החל מ-1.4.2025 (שר העבודה יואב בן צור, ש"ס, חתם על הצו); המגמה נמשכה גם באפריל 2026 (עלייה נוספת ל-6,443.85 ש"ח).',
  },
  { partyId: "shas", questionId: "eco-5", stanceValue: 1 },
  { partyId: "shas", questionId: "eco-6", stanceValue: 1 },
  { partyId: "shas", questionId: "eco-7", stanceValue: -1 },
  { partyId: "shas", questionId: "eco-8", stanceValue: 1 },
  { partyId: "shas", questionId: "eco-9", stanceValue: -2 },
  { partyId: "shas", questionId: "eco-10", stanceValue: 1 },
  { partyId: "shas", questionId: "eco-11", stanceValue: 0 },
  { partyId: "shas", questionId: "eco-12", stanceValue: 0 },
  { partyId: "shas", questionId: "inf-1", stanceValue: 1 },
  { partyId: "shas", questionId: "inf-2", stanceValue: -1 },
  { partyId: "shas", questionId: "inf-3", stanceValue: -1 },
  { partyId: "shas", questionId: "inf-4", stanceValue: 0 },
  { partyId: "shas", questionId: "inf-5", stanceValue: 0 },
  { partyId: "shas", questionId: "inf-6", stanceValue: 0 },
  {
    partyId: "shas",
    questionId: "rel-2",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/articles/0,7340,L-5612495,00.htm",
    sourceNote:
      'דרעי וליצמן דרשו כחלק ממו"מ קואליציוני לעגן בחוק את שימור הסטטוס-קוו (אין תחבורה ציבורית בשבת) -- התנגדות עקרונית עקבית ומתועדת היטב לאורך שנים.',
  },
  { partyId: "shas", questionId: "rel-3", stanceValue: 2 },
  { partyId: "shas", questionId: "rel-4", stanceValue: -2 },
  {
    partyId: "shas",
    questionId: "rel-5",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%97%D7%95%D7%A7_%D7%94%D7%92%D7%99%D7%95%D7%A1",
    sourceNote:
      'ביוני 2023 החליטה הממשלה לקדם חקיקה חדשה בנושא גיוס, תוך קביעה שבתקופת הביניים לא תיאכף חובת הגיוס (בפועל המשך הפטור). ש"ס ממשיכה להתנגד לחקיקת גיוס כפוי גם ב-2026.',
  },
  { partyId: "shas", questionId: "rel-7", stanceValue: 2 },
  { partyId: "shas", questionId: "rel-8", stanceValue: -2 },
  { partyId: "shas", questionId: "rel-9", stanceValue: 2 },
  { partyId: "shas", questionId: "rel-10", stanceValue: -2 },
  { partyId: "shas", questionId: "rel-11", stanceValue: -2 },
  { partyId: "shas", questionId: "jud-1", stanceValue: 2 },
  {
    partyId: "shas",
    questionId: "jud-2",
    stanceValue: -2,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/r1mr0bmqs",
    sourceNote:
      'הצגת הרפורמה המשפטית של השר לוין (4.1.2023), הכוללת ביטול עילת הסבירות ("לא עוד ביטול החלטות ממשלה חוקיות בטענת אי-סבירות") וחקיקת פסקת התגברות ברוב 61.',
  },
  {
    partyId: "shas",
    questionId: "jud-3",
    stanceValue: 2,
    sourceUrl: "https://www.tachlith.org.il/q-and-a-levin-saar-supreme-court-selection/",
    sourceNote:
      "מתווה לוין-סער (פורסם 16.1.2025) לשינוי הרכב הוועדה לבחירת שופטים -- 4 נציגי קואליציה, 2 נציגי אופוזיציה ו-3 שופטי עליון, עם רוב מוכרע לנציגים פוליטיים ברוב מקרים.",
  },
  { partyId: "shas", questionId: "jud-5", stanceValue: 2 },
  { partyId: "shas", questionId: "jud-7", stanceValue: 2 },
  { partyId: "shas", questionId: "jud-8", stanceValue: -2 },
  { partyId: "shas", questionId: "jud-9", stanceValue: 2 },
  {
    partyId: "shas",
    questionId: "gov-1",
    stanceValue: -1,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/r1ect5kmbx",
    sourceNote:
      'הצעת החוק להקמת ועדת חקירה פוליטית חלופית (במקום ממלכתית) עברה בקריאה טרומית ב-24.12.2025 ברוב של 50-48; חלק מחברי ש"ס נעדרו מההצבעה במחאה על אי-קידום "חוק ההשתמטות" (חוק הגיוס).',
  },
  { partyId: "shas", questionId: "gov-3", stanceValue: -2 },
  {
    partyId: "shas",
    questionId: "gov-4",
    stanceValue: -2,
    sourceUrl: "https://news.walla.co.il/item/3818727",
    sourceNote:
      'ש"ס (22.2.2026): "ש"ס תומכת בחוק של בן גביר. הסמכות הבלעדית למנות ולפטר שרים שייכת לרה"מ בלבד, וכך ראוי במדינה דמוקרטית" -- "חוק דרעי 2", תיקון לחוק יסוד: הממשלה שנועד לבטל את סמכות בג"ץ למנוע מינוי/לפסול שרים בעקבות כתב אישום.',
  },
  { partyId: "shas", questionId: "gov-5", stanceValue: -1 },
  { partyId: "shas", questionId: "soc-1", stanceValue: 2 },
  { partyId: "shas", questionId: "soc-2", stanceValue: -2 },
  { partyId: "shas", questionId: "soc-3", stanceValue: 2 },
  { partyId: "shas", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "shas",
    questionId: "soc-6",
    stanceValue: -2,
    sourceUrl: "https://www.c14.co.il/%D7%94%D7%93%D7%A8%D7%AA-%D7%A0%D7%A9%D7%99%D7%9D-%D7%94%D7%94%D7%A6%D7%94%D7%A8%D7%94-%D7%94%D7%9E%D7%A4%D7%AA%D7%99%D7%A2%D7%94-%D7%A9%D7%9C-%D7%99%D7%95%D7%A8-%D7%A1-%D7%90%D7%A8%D7%99/",
    sourceNote:
      'כמקובל במפלגות החרדיות, ש"ס אינה מציבה נשים ברשימתה לכנסת כלל; דרעי הצהיר בנפרד שהנהגה פוליטית "זה לא המקום הטבעי" של נשים.',
  },
  { partyId: "shas", questionId: "soc-7", stanceValue: 2 },
  { partyId: "shas", questionId: "soc-10", stanceValue: -2 },
  {
    partyId: "yahadut-hatorah",
    questionId: "sec-1",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/article/r1linvomjx",
    sourceNote:
      'יצחק גולדקנופף (יו"ר יהדות התורה) קידם באופן אישי התיישבות יהודית בעזה ("ההתיישבות היהודית כאן היא התשובה לטבח הנורא", נוב\' 2024), אך משה גפני (יו"ר דגל התורה) התנער מכך בפומבי: "אתה לא מייצג אותי בשום צורה" -- אין עמדה מפלגתית אחידה.',
  },
  { partyId: "yahadut-hatorah", questionId: "sec-2", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-3", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-4", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-5", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-6", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-7", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-8", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-9", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "sec-10", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-11", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-12", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "sec-13", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "eco-1", stanceValue: -1 },
  {
    partyId: "yahadut-hatorah",
    questionId: "eco-2",
    stanceValue: 1,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%99%D7%94%D7%93%D7%95%D7%AA_%D7%94%D7%AA%D7%95%D7%A8%D7%94",
    sourceNote:
      'המפלגה, בניגוד לשמרנותה הדתית-חברתית, מאמצת עמדות כלכליות "סוציאל-דמוקרטיות" הנובעות מהחולשה הסוציו-אקונומית של ציבור הבוחרים שלה (משפחות ברוכות ילדים התלויות בקצבאות).',
  },
  { partyId: "yahadut-hatorah", questionId: "eco-3", stanceValue: -1 },
  {
    partyId: "yahadut-hatorah",
    questionId: "eco-4",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/economy/article/hjecq9vby",
    sourceNote:
      'ח"כ יעקב אשר (יהדות התורה) חתם, יחד עם ח"כים מהקואליציה והאופוזיציה, על הצעת חוק להעלאת שכר המינימום מ-29.12 ש"ח ל-40 ש"ח לשעה.',
  },
  { partyId: "yahadut-hatorah", questionId: "eco-5", stanceValue: 1 },
  {
    partyId: "yahadut-hatorah",
    questionId: "eco-6",
    stanceValue: 1,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%99%D7%A6%D7%97%D7%A7_%D7%92%D7%95%D7%9C%D7%93%D7%A7%D7%A0%D7%95%D7%A4%D7%A3",
    sourceNote:
      "בתקופת כהונתו של יצחק גולדקנופף כשר השיכון (דצמ' 2022 - יוני 2025), לפי מחקר המכון הישראלי לדמוקרטיה, שיעור ההשתתפות של הציבור החרדי במסלולי דיור מוזל/בר-השגה היה גבוה במאות אחוזים מחלקו באוכלוסייה.",
  },
  { partyId: "yahadut-hatorah", questionId: "eco-7", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "eco-8", stanceValue: 1 },
  { partyId: "yahadut-hatorah", questionId: "eco-9", stanceValue: -2 },
  { partyId: "yahadut-hatorah", questionId: "eco-10", stanceValue: 1 },
  { partyId: "yahadut-hatorah", questionId: "eco-11", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "eco-12", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "inf-1", stanceValue: 1 },
  { partyId: "yahadut-hatorah", questionId: "inf-2", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "inf-3", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "inf-4", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "inf-5", stanceValue: 0 },
  { partyId: "yahadut-hatorah", questionId: "inf-6", stanceValue: 0 },
  {
    partyId: "yahadut-hatorah",
    questionId: "rel-2",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/judaism/article/hyruplhvs",
    sourceNote:
      'בשאלון תשובות מלא ומעודכן של יהדות התורה: "השבת היא יום המנוחה הרשמי, וכך חייב להישמר הסטטוס-קוו באופן מובהק".',
  },
  { partyId: "yahadut-hatorah", questionId: "rel-3", stanceValue: 2 },
  {
    partyId: "yahadut-hatorah",
    questionId: "rel-4",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/judaism/article/hyruplhvs",
    sourceNote:
      'אותו שאלון: "הסטטוס-קוו הלאומי חייב להישמר גם בנושא זה" (נישואין אזרחיים), תוך שהמפלגה מגדירה נישואין אזרחיים כפריצת גבול המאיימת על הזהות היהודית.',
  },
  {
    partyId: "yahadut-hatorah",
    questionId: "rel-5",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/judaism/article/hyruplhvs",
    sourceNote:
      'אותו שאלון, בפרק "גיוס חרדים ולימודי ליבה": "כל חוק גיוס חייב לאפשר לכל תלמיד החפץ בכך ומתחייב להקדיש את שנותיו למטרה זו בלבד -- למלא את משך שנות לימוד התורה באופן מלא", תוך דרישה לשימור הסדר בן-גוריון המקורי.',
  },
  { partyId: "yahadut-hatorah", questionId: "rel-7", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "rel-8", stanceValue: -2 },
  { partyId: "yahadut-hatorah", questionId: "rel-9", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "rel-10", stanceValue: -2 },
  { partyId: "yahadut-hatorah", questionId: "rel-11", stanceValue: -2 },
  {
    partyId: "yahadut-hatorah",
    questionId: "jud-1",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%9E%D7%A9%D7%94_%D7%92%D7%A4%D7%A0%D7%99",
    sourceNote:
      'יחסו של גפני למערכת המשפט "מאופיין בביקורתיות"; טען לא פעם כי "בית המשפט פוסק באופן שיטתי נגד הציבור החרדי", ואף איים בעבר בצעדי מחאה אזרחיים כמו מרד מסים.',
  },
  {
    partyId: "yahadut-hatorah",
    questionId: "jud-2",
    stanceValue: -2,
    sourceUrl: "https://m.calcalist.co.il/Article.aspx?guid=r1mr0bmqs",
    sourceNote:
      "חלק ממתווה הרפורמה המשפטית של השר לוין (2023), שכלל גם שינוי הרכב הוועדה לבחירת שופטים לטובת רוב קואליציוני וגם ביטול עילת הסבירות ופסקת התגברות.",
  },
  {
    partyId: "yahadut-hatorah",
    questionId: "jud-3",
    stanceValue: 2,
    sourceUrl: "https://www.tachlith.org.il/q-and-a-levin-saar-supreme-court-selection/",
    sourceNote:
      "מתווה לוין-סער (2025) להענקת רוב לנציגי הקואליציה/נבחרי ציבור בוועדה לבחירת שופטים.",
  },
  { partyId: "yahadut-hatorah", questionId: "jud-5", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "jud-7", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "jud-8", stanceValue: -2 },
  { partyId: "yahadut-hatorah", questionId: "jud-9", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "gov-1", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "gov-3", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "gov-4", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "gov-5", stanceValue: -1 },
  { partyId: "yahadut-hatorah", questionId: "soc-1", stanceValue: 2 },
  {
    partyId: "yahadut-hatorah",
    questionId: "soc-2",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/judaism/article/hyruplhvs",
    sourceNote:
      "אותו שאלון: התנגדות מפורשת וחדה לנישואין אזרחיים כפריצת גבול המאיימת על הזהות היהודית. השאלון אינו מתייחס במפורש לזוגיות חד-מינית, אך ההתנגדות ההלכתית של הזרם החרדי-ליטאי/חסידי לזוגיות חד-מינית היא עמדה ידועה ועקבית בציבור החרדי.",
  },
  { partyId: "yahadut-hatorah", questionId: "soc-3", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "soc-5", stanceValue: 1 },
  {
    partyId: "yahadut-hatorah",
    questionId: "soc-6",
    stanceValue: -2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%99%D7%94%D7%93%D7%95%D7%AA_%D7%94%D7%AA%D7%95%D7%A8%D7%94",
    sourceNote:
      'ויקיפדיה מתעדת במפורש כי "כמו מפלגות חרדיות אחרות, ברשימות המפלגה לאורך השנים ישנם גברים בלבד".',
  },
  { partyId: "yahadut-hatorah", questionId: "soc-7", stanceValue: 2 },
  { partyId: "yahadut-hatorah", questionId: "soc-10", stanceValue: -2 },
  { partyId: "raam", questionId: "sec-1", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-2", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-3", stanceValue: 2 },
  { partyId: "raam", questionId: "sec-4", stanceValue: 1 },
  { partyId: "raam", questionId: "sec-5", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-6", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-7", stanceValue: 0 },
  { partyId: "raam", questionId: "sec-8", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-9", stanceValue: 1 },
  { partyId: "raam", questionId: "sec-10", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-11", stanceValue: -1 },
  { partyId: "raam", questionId: "sec-12", stanceValue: 1 },
  { partyId: "raam", questionId: "sec-13", stanceValue: 0 },
  { partyId: "raam", questionId: "eco-1", stanceValue: -1 },
  {
    partyId: "raam",
    questionId: "eco-2",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/article/hjmpnzqut",
    sourceNote:
      'תוכנית החומש (30 מיליארד ש"ח) שהשיג עבאס כללה גם רכיבי רווחה, בריאות ותעסוקה לצמצום פערים בחברה הערבית.',
  },
  { partyId: "raam", questionId: "eco-3", stanceValue: -1 },
  { partyId: "raam", questionId: "eco-4", stanceValue: 1 },
  { partyId: "raam", questionId: "eco-5", stanceValue: 0 },
  {
    partyId: "raam",
    questionId: "eco-6",
    stanceValue: 1,
    sourceUrl: "https://www.globes.co.il/news/article.aspx?did=1001373921",
    sourceNote:
      'ההישג המרכזי של מנסור עבאס במו"מ הקואליציוני ב-2021 היה תוכנית חומש בהיקף 30 מיליארד ש"ח לצמצום פערים בחברה הערבית, שכללה גם רכיב דיור משמעותי.',
  },
  { partyId: "raam", questionId: "eco-7", stanceValue: 0 },
  { partyId: "raam", questionId: "eco-8", stanceValue: 1 },
  { partyId: "raam", questionId: "eco-9", stanceValue: 0 },
  { partyId: "raam", questionId: "eco-10", stanceValue: 1 },
  { partyId: "raam", questionId: "eco-11", stanceValue: 2 },
  { partyId: "raam", questionId: "eco-12", stanceValue: 0 },
  { partyId: "raam", questionId: "inf-1", stanceValue: 1 },
  { partyId: "raam", questionId: "inf-2", stanceValue: 1 },
  { partyId: "raam", questionId: "inf-3", stanceValue: 0 },
  { partyId: "raam", questionId: "inf-4", stanceValue: 0 },
  { partyId: "raam", questionId: "inf-5", stanceValue: 2 },
  { partyId: "raam", questionId: "inf-6", stanceValue: 1 },
  { partyId: "raam", questionId: "rel-2", stanceValue: -1 },
  { partyId: "raam", questionId: "rel-3", stanceValue: 1 },
  { partyId: "raam", questionId: "rel-4", stanceValue: -1 },
  { partyId: "raam", questionId: "rel-5", stanceValue: 1 },
  { partyId: "raam", questionId: "rel-7", stanceValue: 1 },
  { partyId: "raam", questionId: "rel-8", stanceValue: -1 },
  { partyId: "raam", questionId: "rel-9", stanceValue: 1 },
  { partyId: "raam", questionId: "rel-10", stanceValue: -1 },
  { partyId: "raam", questionId: "rel-11", stanceValue: 0 },
  { partyId: "raam", questionId: "jud-1", stanceValue: 0 },
  { partyId: "raam", questionId: "jud-2", stanceValue: 1 },
  { partyId: "raam", questionId: "jud-3", stanceValue: -1 },
  { partyId: "raam", questionId: "jud-5", stanceValue: -1 },
  { partyId: "raam", questionId: "jud-7", stanceValue: -1 },
  { partyId: "raam", questionId: "jud-8", stanceValue: 1 },
  { partyId: "raam", questionId: "jud-9", stanceValue: -1 },
  {
    partyId: "raam",
    questionId: "gov-1",
    stanceValue: 1,
    sourceUrl: "https://www.youtube.com/shorts/lxpjaUhPRdo",
    sourceNote:
      'יו"ר רע"ם מנסור עבאס הביע תמיכה בחקירת מחדלי 7 באוקטובר, כולל בחינת שרשרת האירועים עשורים אחורה.',
  },
  { partyId: "raam", questionId: "gov-3", stanceValue: 0 },
  { partyId: "raam", questionId: "gov-4", stanceValue: 0 },
  { partyId: "raam", questionId: "gov-5", stanceValue: 0 },
  { partyId: "raam", questionId: "soc-1", stanceValue: -1 },
  {
    partyId: "raam",
    questionId: "soc-2",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/article/HJIRSudN00",
    sourceNote:
      'לפי ערך הוויקיפדיה (he.wikipedia.org/wiki/מנסור_עבאס): עבאס "תומך בערכי משפחה מסורתיים", התנגד למצעדי גאווה, ודחה כניסת ארגוני להט"ב לבתי ספר ערביים; "אין ברצונה של רע"מ לכפות את דעתה בנושא וכי הוא מכבד כל אדם כמו שהוא" (הימנעות-מכפייה, לא תמיכה בהכרה מלאה). ח"כ וליד טאהא (רע"ם, 2020): "לחברה הערבית יש מערכת דתית-תרבותית-ערכית שאינה מקבלת זאת כלגיטימי", והצביע נגד חוק איסור טיפולי המרה.',
  },
  {
    partyId: "raam",
    questionId: "soc-3",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/HJIRSudN00",
    sourceNote:
      'אותם מקורות: עבאס "דחה כניסת ארגוני להט"ב לבתי ספר ערביים" -- כמעט התאמה מדויקת להגבלת תכנים הנוגעים למגדר ולנטייה מינית בחינוך. ח"כ וליד טאהא (2020) חיזק זאת בהתייחסותו לאי-לגיטימיות בעיני החברה הערבית.',
  },
  { partyId: "raam", questionId: "soc-5", stanceValue: 2 },
  { partyId: "raam", questionId: "soc-6", stanceValue: 1 },
  { partyId: "raam", questionId: "soc-7", stanceValue: -1 },
  { partyId: "raam", questionId: "soc-10", stanceValue: 2 },
  {
    partyId: "hadash-taal",
    questionId: "sec-1",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'הרשימה המשותפת לynet (27.9.26): את כלל ההתנחלויות "יש לפנות לאלתר וללא כל דיחוי", "כולל ירושלים המזרחית, מעלה אדומים, אריאל".',
  },
  { partyId: "hadash-taal", questionId: "sec-2", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "sec-3",
    stanceValue: 2,
    sourceUrl: "https://www.mekomit.co.il/%D7%90%D7%99%D7%99%D7%9E%D7%9F-%D7%A2%D7%95%D7%93%D7%94-%D7%94%D7%A6%D7%99%D7%92-%D7%97%D7%96%D7%95%D7%9F-%D7%9C%D7%A4%D7%9C%D7%A1%D7%98%D7%99%D7%A0%D7%99%D7%9D-%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C/",
    sourceNote:
      'איימן עודה: "אני מתריע מזניחת ההישגים המצטברים העמוקים [של פתרון שתי המדינות] והחלפתם בבריחה קדימה לכיוון פתרון המדינה האחת" - בניגוד לבל"ד, חד"ש תומכת בכנות בפתרון שתי המדינות המסורתי.',
  },
  { partyId: "hadash-taal", questionId: "sec-4", stanceValue: 2 },
  {
    partyId: "hadash-taal",
    questionId: "sec-5",
    stanceValue: -2,
    sourceUrl: "https://jointlist.org.il/he/economic-plan/",
    sourceNote:
      'התוכנית הכלכלית-חברתית של הרשימה המשותפת: "קיצוץ עמוק בהוצאות הצבאיות והפסקת מימון המלחמה בעזה, ההתנחלויות והכיבוש".',
  },
  { partyId: "hadash-taal", questionId: "sec-6", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "sec-7", stanceValue: 0 },
  { partyId: "hadash-taal", questionId: "sec-8", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "sec-9", stanceValue: 2 },
  {
    partyId: "hadash-taal",
    questionId: "sec-10",
    stanceValue: -2,
    sourceUrl: "https://www.emess.co.il/radio/1834051",
    sourceNote:
      'לאחר המבצע הישראלי-אמריקאי נגד איראן (יוני 2025), אחמד טיבי: "לא היה מכה מקדימה, אלא תוקפנות יזומה מצד ממשלות ארה"ב וישראל"; איימן עודה התנגד לתקיפה וקרא להימנע מ"מלחמת נצח".',
  },
  { partyId: "hadash-taal", questionId: "sec-11", stanceValue: -1 },
  { partyId: "hadash-taal", questionId: "sec-12", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "sec-13", stanceValue: 0 },
  { partyId: "hadash-taal", questionId: "eco-1", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "eco-2",
    stanceValue: 2,
    sourceUrl: "https://maki.org.il/%D7%A4%D7%95%D7%A8%D7%A1%D7%9D-%D7%94%D7%9E%D7%A6%D7%A2-%D7%A9%D7%9C-%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA-%D7%A9%D7%9C-%D7%97%D7%93%D7%A9-%D7%95%D7%94/",
    sourceNote:
      'תואם באופן ישיר את סעיף הכלכלה במצע המפלגה: "חיזוק זכויות עובדים ואיגודים מקצועיים", "השקעה ציבורית מסיבית ברווחה".',
  },
  { partyId: "hadash-taal", questionId: "eco-3", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "eco-4",
    stanceValue: 2,
    sourceUrl: "https://maki.org.il/%D7%A4%D7%95%D7%A8%D7%A1%D7%9D-%D7%94%D7%9E%D7%A6%D7%A2-%D7%A9%D7%9C-%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA-%D7%A9%D7%9C-%D7%97%D7%93%D7%A9-%D7%95%D7%94/",
    sourceNote:
      "עמדה פרו-עובדים מוצהרת ועקבית של המפלגה בעד העלאת שכר מינימום משמעותית.",
  },
  { partyId: "hadash-taal", questionId: "eco-5", stanceValue: 1 },
  {
    partyId: "hadash-taal",
    questionId: "eco-6",
    stanceValue: 2,
    sourceUrl: "https://maki.org.il/%D7%A4%D7%95%D7%A8%D7%A1%D7%9D-%D7%94%D7%9E%D7%A6%D7%A2-%D7%A9%D7%9C-%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA-%D7%A9%D7%9C-%D7%97%D7%93%D7%A9-%D7%95%D7%94/",
    sourceNote:
      "תואם למצע ולפרופיל האידאולוגי הסוציאליסטי המוצהר של המפלגה (דיור כזכות יסוד, השקעה ציבורית מסיבית).",
  },
  { partyId: "hadash-taal", questionId: "eco-7", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "eco-8", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "eco-9", stanceValue: 1 },
  {
    partyId: "hadash-taal",
    questionId: "eco-10",
    stanceValue: 2,
    sourceUrl: "https://jointlist.org.il/he/economic-plan/",
    sourceNote:
      'התוכנית הכלכלית-חברתית: ביטול הטבות המס לבעלי הון ולתאגידים, והעלאת המס על רווחי הון, כולל רווחי בורסה, ל-30%.',
  },
  { partyId: "hadash-taal", questionId: "eco-11", stanceValue: 2 },
  {
    partyId: "hadash-taal",
    questionId: "eco-12",
    stanceValue: -2,
    sourceUrl: "https://jointlist.org.il/he/economic-plan/",
    sourceNote:
      'התוכנית הכלכלית-חברתית: "הגנה על הייצור המקומי מפני יבוא במחירי היצף, והטלת מכסים על ארצות הברית בדומה למכסים שארצות הברית הטילה על ישראל".',
  },
  {
    partyId: "hadash-taal",
    questionId: "inf-1",
    stanceValue: 2,
    sourceUrl: "https://oknesset.org/meetings/2/2/2208776.html",
    sourceNote:
      'בדיון ועדת כנסת על חוק הרכבת התחתית (מטרו, 2024) איימן עודה: "כל פרויקט לטובת כלל האוכלוסייה, ובמיוחד המוחלשים כמו תחבורה ציבורית צריך לברך", וביקש התייחסות מיוחדת לחיבור יישובים ערביים למטרו.',
  },
  { partyId: "hadash-taal", questionId: "inf-2", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "inf-3", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "inf-4", stanceValue: -1 },
  { partyId: "hadash-taal", questionId: "inf-5", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "inf-6", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "rel-2", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "rel-3", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "rel-4",
    stanceValue: 2,
    sourceUrl: "https://www.ceci.org.il/ezgov/%D7%94%D7%A6%D7%A2%D7%AA-%D7%97%D7%95%D7%A7-%D7%A0%D7%99%D7%A9%D7%95%D7%90%D7%99%D7%9D-%D7%90%D7%96%D7%A8%D7%97%D7%99%D7%99%D7%9D-%D7%94%D7%AA%D7%A9%D7%A4%D7%92-2022-%D7%A9%D7%9C-%D7%97%D7%94%D7%9B-2/",
    sourceNote:
      'תואם באופן ישיר לסעיף מפורש במצע המפלגה: "הכרה מלאה בנישואים אזרחיים", "ביטול מונופול הרבנות".',
  },
  {
    partyId: "hadash-taal",
    questionId: "rel-5",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14898966",
    sourceNote:
      'הרשימה המשותפת לynet (15.9.26) מתנגדת "לגיוס חרדים או לכל גיוס חובה": "אין להטיל סנקציות על אדם שבוחר שלא להתגייס". היא לא תומכת בפטור ייחודי לישיבות, אבל גם לא בביטולו - ולכן 0. (עדכון מ-2-.)',
  },
  { partyId: "hadash-taal", questionId: "rel-7", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "rel-8", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "rel-9", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "rel-10", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "rel-11", stanceValue: 2 },
  {
    partyId: "hadash-taal",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%97%D7%90%D7%94_%D7%A0%D7%92%D7%93_%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94_%D7%94%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%AA",
    sourceNote:
      'תואם למצע המפלגה: "התנגדות נחרצת לכל רפורמה משפטית", לצד השתתפות מוכרת של הרשימה המשותפת במחאה נגד הרפורמה המשפטית ב-2023.',
  },
  {
    partyId: "hadash-taal",
    questionId: "jud-2",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%97%D7%90%D7%94_%D7%A0%D7%92%D7%93_%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94_%D7%94%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%AA",
    sourceNote:
      "מפלגת אופוזיציה מרכזית שהובילה את המחאה ההמונית נגד הרפורמה המשפטית של 2023 (שכללה גם את שינוי הרכב הוועדה לבחירת שופטים), ותומכת בשימור עצמאות בית המשפט העליון.",
  },
  {
    partyId: "hadash-taal",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%97%D7%90%D7%94_%D7%A0%D7%92%D7%93_%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94_%D7%94%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%AA",
    sourceNote:
      "מפלגת אופוזיציה שהתנגדה לשינוי הרכב הוועדה לבחירת שופטים לרוב קואליציוני, כחלק מהתנגדותה למכלול הרפורמה המשפטית של 2023.",
  },
  { partyId: "hadash-taal", questionId: "jud-5", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "jud-7", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "jud-8", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "jud-9", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'הרשימה המשותפת לynet (3.10.26): "תומכת בהקמת ועדת חקירה ממלכתית בהתאם לדין הקיים, בראשות שופט מבית המשפט העליון ובמינוי של נשיא בית המשפט העליון".',
  },
  { partyId: "hadash-taal", questionId: "gov-3", stanceValue: 1 },
  {
    partyId: "hadash-taal",
    questionId: "gov-4",
    stanceValue: 2,
    sourceUrl: "https://www.maariv.co.il/news/politics/Article-871919",
    sourceNote:
      'איימן עודה בטוויטר (20.10.2021), בהקשר "חוק נתניהו" שמונע מנאשם בכתב אישום להרכיב ממשלה: "לאיילת שקד יש רק אצבע אחת - לנו יש שש. גדעון סער, אפשר להעביר את החוק".',
  },
  { partyId: "hadash-taal", questionId: "gov-5", stanceValue: 2 },
  { partyId: "hadash-taal", questionId: "soc-1", stanceValue: -2 },
  {
    partyId: "hadash-taal",
    questionId: "soc-2",
    stanceValue: 0,
    sourceUrl: "https://www.inn.co.il/news/469635",
    sourceNote:
      'אחמד טיבי (ריאיון, 2.3.2021, ושוב עד עונת הגאווה 2025): "אנחנו נגד קידום תופעת הלהט"בים", והוא וחברי הרשימה המשותפת הצביעו נגד שינוי המינוח "אבא ואמא" במסמכים רשמיים. איימן עודה זכה לביקורת פומבית (מאקו) על הימנעות שיטתית מנקיטת עמדה תומכת בזכויות הקהילה הגאה -- עמדה מפוצלת בתוך הרשימה המשותפת, לא חד-משמעית.',
  },
  {
    partyId: "hadash-taal",
    questionId: "soc-3",
    stanceValue: 0,
    sourceUrl: "https://www.inn.co.il/news/469635",
    sourceNote:
      'אחמד טיבי הבהיר במפורש התנגדות ל"כניסת הקהילה הלהט"בית לבתי ספר לצורכי קידום תרבותי" -- עמדה שנויה במחלוקת בתוך הרשימה עצמה (הזרם החילוני-קומוניסטי של חד"ש מול עמדת טיבי/תע"ל), ללא עמדה מאוחדת ומוצהרת רשמית.',
  },
  { partyId: "hadash-taal", questionId: "soc-5", stanceValue: 0 },
  {
    partyId: "hadash-taal",
    questionId: "soc-6",
    stanceValue: 2,
    sourceUrl: "https://maki.org.il/%D7%A4%D7%95%D7%A8%D7%A1%D7%9D-%D7%94%D7%9E%D7%A6%D7%A2-%D7%A9%D7%9C-%D7%94%D7%A8%D7%A9%D7%99%D7%9E%D7%94-%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A4%D7%AA-%D7%A9%D7%9C-%D7%97%D7%93%D7%A9-%D7%95%D7%94/",
    sourceNote:
      'המצע קובע במפורש: "הרשימה המשותפת נאבקת למען שוויון זכויות לנשים בכל תחומי החיים".',
  },
  { partyId: "hadash-taal", questionId: "soc-7", stanceValue: -2 },
  { partyId: "hadash-taal", questionId: "soc-10", stanceValue: 2 },
  {
    partyId: "religious-zionism",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/h1eqbsxnxe",
    sourceNote:
      "סמוטריץ' הכריז על 2025 כ'שנת הריבונות' ביהודה ושומרון, והפך לדרג המדיני המאשר בנייה חדשה בהתנחלויות.",
  },
  { partyId: "religious-zionism", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "religious-zionism",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/article/rkxhwox3t",
    sourceNote:
      'הכנסת אישרה ברוב 99-11 הצהרה המתנגדת להקמת/הכרה במדינה פלסטינית; סמוטריץ\' הוביל ציבורית את המהלך וכתב שמדובר בהכרעה "נגד הקמת מדינת טרור ערבית בישראל... לא כעת ולא לעולם".',
  },
  { partyId: "religious-zionism", questionId: "sec-4", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "sec-5", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "sec-6", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "sec-7", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "sec-8", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "sec-9", stanceValue: -2 },
  {
    partyId: "religious-zionism",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/hk0csqpwgl",
    sourceNote:
      'סמוטריץ\': "ההסכם רע, נצטרך להמשיך בעצמנו" - קורא להמשך המערכה מול איראן באופן עצמאי.',
  },
  {
    partyId: "religious-zionism",
    questionId: "sec-11",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/article/hk0csqpwgl",
    sourceNote:
      'סמוטריץ\': "ההסכם רע, נצטרך להמשיך בעצמנו" - עמדה עקבית של פעולה עצמאית מול איראן גם ללא גיבוי אמריקאי.',
  },
  { partyId: "religious-zionism", questionId: "sec-12", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "sec-13", stanceValue: 1 },
  { partyId: "religious-zionism", questionId: "eco-1", stanceValue: 2 },
  {
    partyId: "religious-zionism",
    questionId: "eco-2",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/economy/article/syxfneuac",
    sourceNote:
      'תוכנית התקציב של סמוטריץ\' (סוף 2025) כללה "הקפאת רוב קצבאות הביטוח הלאומי", העלאות מיסים, וביטול העלאת שכר המינימום המתוכננת -- עד כדי כך שנתניהו עצמו התנגד לגזרות אלה והעדיף מסלול של הקלות מס לחברות.',
  },
  { partyId: "religious-zionism", questionId: "eco-3", stanceValue: 2 },
  {
    partyId: "religious-zionism",
    questionId: "eco-4",
    stanceValue: -2,
    sourceUrl: "https://www.kan.org.il/content/kan-news/economic/826273/",
    sourceNote:
      "משא ומתן אוצר-הסתדרות הוביל להקפאת שכר המינימום לשנה כחלק מצמצום הגירעון, ביוזמת משרד האוצר בראשות סמוטריץ'.",
  },
  { partyId: "religious-zionism", questionId: "eco-5", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "eco-6", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "eco-7", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "eco-8", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "eco-9", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "eco-10", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "eco-11", stanceValue: 0 },
  {
    partyId: "religious-zionism",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://www.calcalist.co.il/local_news/article/sygx7kdj0",
    sourceNote:
      'סמוטריץ\', כשר האוצר, קידם את רפורמת הייבוא ("מה שטוב לאירופה טוב לישראל", 2024-2025) מול התנגדות שר החקלאות דיכטר - עדכון מ-0 (ניטרלי) ל-1, בעקבות ראיה ישירה לתמיכה פעילה.',
  },
  { partyId: "religious-zionism", questionId: "inf-1", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "inf-2", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "inf-3", stanceValue: 1 },
  { partyId: "religious-zionism", questionId: "inf-4", stanceValue: 0 },
  { partyId: "religious-zionism", questionId: "inf-5", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "inf-6", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "rel-2", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "rel-3", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "rel-4", stanceValue: -2 },
  {
    partyId: "religious-zionism",
    questionId: "rel-5",
    stanceValue: 2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%97%D7%95%D7%A7_%D7%94%D7%92%D7%99%D7%95%D7%A1",
    sourceNote:
      "הממשלה (בראשות הליכוד, עם ש\"ס, יהדות התורה, עוצמה יהודית והציונות הדתית) קיבלה ב-2023 את החלטה 682 שדחתה את גיוס תלמידי הישיבות עד לחקיקה מוסכמת, בפועל ממשיכה את הפטור בפועל.",
  },
  { partyId: "religious-zionism", questionId: "rel-7", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "rel-8", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "rel-9", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "rel-10", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "rel-11", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "jud-1", stanceValue: 2 },
  {
    partyId: "religious-zionism",
    questionId: "jud-2",
    stanceValue: -2,
    sourceUrl: "https://m.calcalist.co.il/Article.aspx?guid=r1mr0bmqs",
    sourceNote:
      "חלק ממתווה הרפורמה המשפטית של השר לוין (2023), שכלל גם שינוי הרכב הוועדה לבחירת שופטים לטובת רוב קואליציוני וגם ביטול עילת הסבירות ופסקת התגברות.",
  },
  {
    partyId: "religious-zionism",
    questionId: "jud-3",
    stanceValue: 2,
    sourceUrl: "https://www.tachlith.org.il/q-and-a-levin-saar-supreme-court-selection/",
    sourceNote:
      "מתווה לוין-סער (2025) להענקת רוב לנציגי הקואליציה/נבחרי ציבור בוועדה לבחירת שופטים.",
  },
  { partyId: "religious-zionism", questionId: "jud-5", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "jud-7", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "jud-8", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "jud-9", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "gov-1", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "gov-3", stanceValue: -1 },
  { partyId: "religious-zionism", questionId: "gov-4", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "gov-5", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "soc-1", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "soc-2", stanceValue: -2 },
  {
    partyId: "religious-zionism",
    questionId: "soc-3",
    stanceValue: 2,
    sourceUrl: "https://www.maariv.co.il/news/politics/article-972858",
    sourceNote:
      'סמוטריץ\' הגדיר עצמו בפני תלמידים כ"הומופוב בגאווה", ותחת ממשלתו הועברה יחידת התוכניות החיצוניות במשרד החינוך לידי אבי מעוז (נעם), שביקש להסיר תכני סובלנות כלפי הקהילה הגאה.',
  },
  { partyId: "religious-zionism", questionId: "soc-5", stanceValue: 1 },
  { partyId: "religious-zionism", questionId: "soc-6", stanceValue: -2 },
  { partyId: "religious-zionism", questionId: "soc-7", stanceValue: 2 },
  { partyId: "religious-zionism", questionId: "soc-10", stanceValue: -2 },


  {
    partyId: "kachol-lavan",
    questionId: "sec-1",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'כחול לבן לynet (27.9.26): "המפלגה תומכת בחיזוק ההתיישבות ביהודה ושומרון בדגש על הבקעה, יישובי גב ההר, דרום הר חברון וקו התפר... אין צורך בפינוי יישובים". (עדכון מ-1-.)',
  },
  { partyId: "kachol-lavan", questionId: "sec-2", stanceValue: 1 },
  {
    partyId: "kachol-lavan",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.maariv.co.il/news/politics/article-1194144",
    sourceNote:
      'גנץ, כנס "מקור ראשון" בהתנחלות אפרת (מאי 2025): "מי שמדבר על מדינה פלסטינית או נסיגות מנותק מהמציאות" -- הצהיר כי על ישראל לשמור שליטה ביטחונית מלאה וחופש פעולה בעזה, ביהודה ושומרון, בדרום לבנון ובגבול סוריה.',
  },
  { partyId: "kachol-lavan", questionId: "sec-4", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "sec-5", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "sec-6", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "sec-7", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "sec-8", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "sec-9", stanceValue: 1 },
  {
    partyId: "kachol-lavan",
    questionId: "sec-10",
    stanceValue: 1,
    sourceUrl: "https://www.srugim.co.il/1116188-%D7%92%D7%A0%D7%A5-%D7%A7%D7%95%D7%A8%D7%90-%D7%9C%D7%A4%D7%A2%D7%95%D7%9C%D7%94-%D7%9E%D7%99%D7%99%D7%93%D7%99%D7%AA-%D7%91%D7%90%D7%99%D7%A8%D7%90%D7%9F-%D7%96%D7%94-%D7%94%D7%96%D7%9E%D7%9F",
    sourceNote:
      'גנץ (אפריל 2025) קרא "לתאם עם האמריקאים תקיפה, ומהלך פעולות שישנה את המזרח התיכון", תוך אזכור ש"איראן חלשה מאי פעם" ו"חלון הזדמנויות היסטורי וצר" -- אך במפורש בתיאום עם ארה"ב, לא כפעולה עצמאית.',
  },
  {
    partyId: "kachol-lavan",
    questionId: "sec-11",
    stanceValue: -2,
    sourceUrl: "https://www.srugim.co.il/1116188-%D7%92%D7%A0%D7%A5-%D7%A7%D7%95%D7%A8%D7%90-%D7%9C%D7%A4%D7%A2%D7%95%D7%9C%D7%94-%D7%9E%D7%99%D7%99%D7%93%D7%99%D7%AA-%D7%91%D7%90%D7%99%D7%A8%D7%90%D7%9F-%D7%96%D7%94-%D7%94%D7%96%D7%9E%D7%9F",
    sourceNote:
      'גנץ קרא לפעולה נגד איראן "תוך תיאום עם ארה"ב - לא פעולה עצמאית". מצע המפלגה קובע כעיקרון מוצהר "שמירה על קשר הדוק ותיאום מלא עם ארה"ב" -- כמעט היפוך ישיר של עצמאות ביטחונית גם במחיר עימות.',
  },
  { partyId: "kachol-lavan", questionId: "sec-12", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "sec-13", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "eco-1", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "eco-2", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "eco-3", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "eco-4", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "eco-5", stanceValue: 2 },
  { partyId: "kachol-lavan", questionId: "eco-6", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "eco-7", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "eco-8", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "eco-9", stanceValue: 2 },
  { partyId: "kachol-lavan", questionId: "eco-10", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "eco-11", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "eco-12", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "inf-1", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "inf-2", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "inf-3", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "inf-4", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "inf-5", stanceValue: 2 },
  { partyId: "kachol-lavan", questionId: "inf-6", stanceValue: 1 },
  {
    partyId: "kachol-lavan",
    questionId: "rel-2",
    stanceValue: 1,
    sourceUrl: "https://www.kikar.co.il/324389.html",
    sourceNote:
      'גנץ (ציוץ, יולי 2019): "בשיח פתוח, מתחשב ומכבד, נוכל למצוא את דרך המלך ולהפעיל תחבורה ציבורית בשבת ברשויות המעוניינות בכך" -- תמיכה מותנית ומבוססת-בחירה מקומית, לא קריאה לחקיקה ארצית גורפת.',
  },
  { partyId: "kachol-lavan", questionId: "rel-3", stanceValue: -1 },
  { partyId: "kachol-lavan", questionId: "rel-4", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "rel-5", stanceValue: -2 },
  { partyId: "kachol-lavan", questionId: "rel-7", stanceValue: -1 },
  { partyId: "kachol-lavan", questionId: "rel-8", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "rel-9", stanceValue: -1 },
  { partyId: "kachol-lavan", questionId: "rel-10", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "rel-11", stanceValue: 1 },
  {
    partyId: "kachol-lavan",
    questionId: "jud-1",
    stanceValue: -2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%97%D7%90%D7%94_%D7%A0%D7%92%D7%93_%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94_%D7%94%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%AA",
    sourceNote:
      "פסקת ההתגברות הייתה מרכיב מרכזי במכלול הרפורמה המשפטית של 2023; כחול לבן, כמפלגת אופוזיציה מובילה במחאה נגד הרפורמה, התנגדה למכלול כולו.",
  },
  {
    partyId: "kachol-lavan",
    questionId: "jud-2",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'כחול לבן לynet (21.9.26): "נכון להיום הכוח של מערכת המשפט גדול מדי, ובעיקר בלתי-מוסדר, ומצד שני אסור להכניס פוליטיזציה לתוך החלטות משפטיות". (עדכון מ-2.)',
  },
  {
    partyId: "kachol-lavan",
    questionId: "jud-3",
    stanceValue: -2,
    sourceUrl: "https://he.wikipedia.org/wiki/%D7%94%D7%9E%D7%97%D7%90%D7%94_%D7%A0%D7%92%D7%93_%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94_%D7%94%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%AA",
    sourceNote:
      "מפלגת אופוזיציה שהתנגדה לשינוי הרכב הוועדה לבחירת שופטים לרוב קואליציוני, כחלק מהתנגדותה למכלול הרפורמה המשפטית של 2023.",
  },
  {
    partyId: "kachol-lavan",
    questionId: "jud-5",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'כחול לבן לynet (21.9.26): "התוכנית שלנו... תגביל את היכולת של בית המשפט להתערב בהחלטות הממשלה" - צמצום הביקורת על הממשלה, בלי התחייבות לביטול עילת הסבירות. (עדכון מ-2-.)',
  },
  { partyId: "kachol-lavan", questionId: "jud-7", stanceValue: -2 },
  { partyId: "kachol-lavan", questionId: "jud-8", stanceValue: 2 },
  { partyId: "kachol-lavan", questionId: "jud-9", stanceValue: -1 },
  {
    partyId: "kachol-lavan",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'כחול לבן לynet (3.10.26): "בעד הקמת ועדת חקירה ממלכתית, עצמאית ובלתי תלויה... המנגנון הנוכחי הוא מנגנון טוב".',
  },
  { partyId: "kachol-lavan", questionId: "gov-3", stanceValue: 1 },
  {
    partyId: "kachol-lavan",
    questionId: "gov-4",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/articles/0,7340,L-5454672,00.html",
    sourceNote:
      'גנץ בנאומו הראשון כיו"ר המפלגה: "ראש ממשלה שמוגש נגדו אישום לא יכול לכהן" - עמדה עקבית שחזר עליה לאורך השנים.',
  },
  { partyId: "kachol-lavan", questionId: "gov-5", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "soc-1", stanceValue: 0 },
  {
    partyId: "kachol-lavan",
    questionId: "soc-2",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/articles/0,7340,L-5481891,00.html",
    sourceNote:
      'גנץ, כנס בחירות בבאר טוביה (מרץ 2019): "אני נחוש לסיים את ההפליה כלפי הקהילה הגאה... בלתי נתפס שעדיין נשללות זכויות לקהילה שלמה".',
  },
  { partyId: "kachol-lavan", questionId: "soc-3", stanceValue: -1 },
  { partyId: "kachol-lavan", questionId: "soc-5", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "soc-6", stanceValue: 1 },
  { partyId: "kachol-lavan", questionId: "soc-7", stanceValue: 0 },
  { partyId: "kachol-lavan", questionId: "soc-10", stanceValue: 1 },

  // עמך ישראל (עופר וינטר) - נוספה באוקטובר 2026
  {
    partyId: "amcha-yisrael",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'עמך ישראל לynet (27.9.26): "תומכים בהקמת יישובים ביהודה ושומרון ובכל חבלי הארץ", ו"על המדינה להעמיק את האחיזה בקרקע ולהחיל ריבונות ביהודה ושומרון ובכל מקום בארץ".',
  },
  { partyId: "amcha-yisrael", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "amcha-yisrael",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://jewishinsider.com/2026/10/amcha-yisrael-leader-ofer-winter-israeli-elections/",
    sourceNote:
      'וינטר (Jewish Insider, אוקטובר 2026): "אין עם פלסטיני", ולדבריו רעיון המדינה הפלסטינית נועד "להשמיד את ישראל".',
  },
  { partyId: "amcha-yisrael", questionId: "sec-4", stanceValue: -2 },
  { partyId: "amcha-yisrael", questionId: "sec-5", stanceValue: 2 },
  {
    partyId: "amcha-yisrael",
    questionId: "sec-6",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'עמך ישראל לynet (27.9.26): "פינוי יישובים והעברתם לאויב היא סכנה קיומית ולא פתרון".',
  },
  { partyId: "amcha-yisrael", questionId: "sec-7", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "sec-8", stanceValue: 2 },
  {
    partyId: "amcha-yisrael",
    questionId: "sec-9",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14914571",
    sourceNote:
      'וינטר תומך בהתיישבות יהודית ברצועה ובעידוד "הגירה מרצון" של תושביה, כולל שליטה ישראלית בחלוקת הסיוע - כלומר נגד העברת השליטה האזרחית לגורם בינלאומי או ערבי.',
  },
  { partyId: "amcha-yisrael", questionId: "sec-10", stanceValue: 2 },
  {
    partyId: "amcha-yisrael",
    questionId: "sec-11",
    stanceValue: 2,
    sourceUrl: "https://amchaisrael.co.il/foundations",
    sourceNote:
      'מסמך אבני היסוד של עמך ישראל: "אנו מאמינים במדינה שעצמאות ההכרעה שלה אינה נתונה לוויכוח והחלטות לגורלה נקבעות בירושלים". (עדכון מ-1.)',
  },
  { partyId: "amcha-yisrael", questionId: "sec-12", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "sec-13", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "eco-1", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "eco-2", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "eco-3", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "eco-4", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "eco-5", stanceValue: 2 },
  { partyId: "amcha-yisrael", questionId: "eco-6", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "eco-7", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "eco-8", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "eco-9", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "eco-10", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "eco-11", stanceValue: 1 },
  {
    partyId: "amcha-yisrael",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://amchaisrael.co.il/foundations",
    sourceNote:
      'אבני היסוד: "פתיחת השווקים לתחרות אמיתית, הסרת חסמי יבוא ורגולציה מיותרת", לצד "פיתוח החקלאות" כחלק מביסוס הריבונות - ולכן 1 ולא 2.',
  },
  { partyId: "amcha-yisrael", questionId: "inf-1", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "inf-2", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "inf-3", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "inf-4", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "inf-5", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "inf-6", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "rel-2", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "rel-3", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "rel-4", stanceValue: -1 },
  {
    partyId: "amcha-yisrael",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://amchaisrael.co.il/foundations",
    sourceNote:
      'אבני היסוד: "נחוקק חוק יסוד: השירות, לפיו כל אזרח במדינת ישראל ישרת את המדינה", לצד "מסלולים ייחודיים למצוינות תורנית" במכסות. לynet (15.9.26): חקיקת חוק המשרתים לפני השבעת הממשלה היא "תנאי סף עבור כניסתנו לכל ממשלה".',
  },
  { partyId: "amcha-yisrael", questionId: "rel-7", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "rel-8", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "rel-9", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "rel-10", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "rel-11", stanceValue: 0 },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-1",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'עמך ישראל לynet (21.9.26) ובמצע: במקום פסקת התגברות היא מציעה "להוסיף ערכאה נוספת" - ערכאת ערעור על פסיקות בג"ץ שבה ימונו שופטים "על בסיס רצון הציבור". לא התייחסה להתגברות ברוב רגיל. (עדכון מ-1.)',
  },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-2",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'עמך ישראל לynet (21.9.26): "האיזון בין הרשויות הופר ובית המשפט לקח לעצמו סמכויות-יתר", ולכן נדרש תיקון שיאפשר לרצון העם לבוא לידי ביטוי.',
  },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-3",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'עמך ישראל לynet (21.9.26): "נציגי לשכת עורכי הדין יוצאו מהוועדה לבחירת שופטים ותתאפשר בחירה מאוזנת של שופטים".',
  },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-5",
    stanceValue: 1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'עמך ישראל לynet (21.9.26): "אחד מהתיקונים הנדרשים... הוא צמצום עילת הסבירות" - צמצום ולא ביטול, ולכן 1.',
  },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-7",
    stanceValue: 1,
    sourceUrl: "https://amchaisrael.co.il/foundations",
    sourceNote:
      'אבני היסוד: "נקדם את חלוקת תפקיד היועץ המשפטי לממשלה - לתובע כללי עצמאי ולייעוץ המשפטי לממשלה, שיסייע לה לקדם את מדיניותה".',
  },
  {
    partyId: "amcha-yisrael",
    questionId: "jud-8",
    stanceValue: -1,
    sourceUrl: "https://amchaisrael.co.il/foundations",
    sourceNote:
      'אבני היסוד: פיצול תפקיד היועמ"ש, כך שהייעוץ המשפטי "יסייע לממשלה לקדם את מדיניותה" ולא ישמש גורם מייעץ בלתי תלוי.',
  },
  { partyId: "amcha-yisrael", questionId: "jud-9", stanceValue: 1 },
  {
    partyId: "amcha-yisrael",
    questionId: "gov-1",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'עמך ישראל לynet (3.10.26): ועדת חקירה מיד עם הקמת הממשלה, אבל אף אחת מההצעות הקיימות (כולל ועדה ממלכתית) "לא עונה" לדרישת האמון. במקומה: "הצבעה חשאית בכנסת החדשה למינוי יו"ר הוועדה וסגנו". במצע: סמכויות של ועדה ממלכתית, אבל מינוי שאינו בידי נשיא העליון - ולכן 1- ולא 2-.',
  },
  { partyId: "amcha-yisrael", questionId: "gov-3", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "gov-4", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "gov-5", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "soc-1", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "soc-2", stanceValue: -1 },
  { partyId: "amcha-yisrael", questionId: "soc-3", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "soc-5", stanceValue: 2 },
  { partyId: "amcha-yisrael", questionId: "soc-6", stanceValue: 0 },
  { partyId: "amcha-yisrael", questionId: "soc-7", stanceValue: 1 },
  { partyId: "amcha-yisrael", questionId: "soc-10", stanceValue: 0 },

  // המילואימניקים והכלכלית (הנדל / זליכה) - נוספה באוקטובר 2026
  {
    partyId: "hamiluimnikim",
    questionId: "sec-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'המילואימניקים לynet (27.9.26): "אנו דוגלים בהתיישבות בכל שטחי מדינת ישראל". במצע: "חיזוק ההתיישבות ביהודה ושומרון והכרעה על קרקעות בשטחי C". (עדכון מ-1.)',
  },
  { partyId: "hamiluimnikim", questionId: "sec-2", stanceValue: 2 },
  {
    partyId: "hamiluimnikim",
    questionId: "sec-3",
    stanceValue: -2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "נפעל כדי למנוע מדינה פלסטינית בצירים הדיפלומטיים והמדיניים, לצד יצירת מציאות של הכרעה בשטח".',
  },
  { partyId: "hamiluimnikim", questionId: "sec-4", stanceValue: -1 },
  {
    partyId: "hamiluimnikim",
    questionId: "sec-5",
    stanceValue: 2,
    sourceUrl: "https://www.thepetek.com/party/reservists-economic",
    sourceNote:
      'המפלגה הכלכלית (זליכה) דורשת תקציב ביטחון של כ-7% מהתמ"ג.',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "sec-6",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14910407",
    sourceNote:
      'המילואימניקים לynet (27.9.26), על פינוי במסגרת הסדר: "לא. כל מה שעלה באישור המדינה וצה"ל יישאר".',
  },
  { partyId: "hamiluimnikim", questionId: "sec-7", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "sec-8", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "sec-9",
    stanceValue: -1,
    sourceUrl: "https://www.thepetek.com/party/reservists-economic",
    sourceNote:
      'המילואימניקים (הנדל): שליטה צבאית מלאה ברצועה ומנהלת להגירה מרצון. המפלגה הכלכלית: ללא נסיגה. סותר העברת השליטה לגורם חיצוני, אם כי לא נאמר במפורש מה יהיה עם הניהול האזרחי.',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "sec-10",
    stanceValue: 2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "אין לישראל יכולת להכיל איראן עם אמצעי וכוונה לאורך זמן". המשימה "לא הסתיימה".',
  },
  { partyId: "hamiluimnikim", questionId: "sec-11", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "sec-12", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "sec-13", stanceValue: 2 },
  { partyId: "hamiluimnikim", questionId: "eco-1", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "eco-2", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "eco-3", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "eco-4", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "eco-5", stanceValue: 2 },
  { partyId: "hamiluimnikim", questionId: "eco-6", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "eco-7", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "eco-8", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "eco-9",
    stanceValue: 2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "שינוי סדרי עדיפויות בתקציב: העברת תקציבים מהציבור המשתמט אל הציבור המשרת".',
  },
  { partyId: "hamiluimnikim", questionId: "eco-10", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "eco-11", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "eco-12",
    stanceValue: 1,
    sourceUrl: "https://www.thepetek.com/party/reservists-economic",
    sourceNote:
      'המפלגה הכלכלית (זליכה): "ביטול מכסים ומכסות יבוא, ופירוק מונופולים". מנגד, מצע המילואימניקים מדגיש "חיזוק ותמיכה בחקלאות" כחלק מההתיישבות - ולכן 1 ולא 2. (עדכון מ-2.)',
  },
  { partyId: "hamiluimnikim", questionId: "inf-1", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "inf-2", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "inf-3", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "inf-4", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "inf-5", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "inf-6", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "rel-2", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "rel-3", stanceValue: -1 },
  { partyId: "hamiluimnikim", questionId: "rel-4", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "rel-5",
    stanceValue: -2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14898966",
    sourceNote:
      'המילואימניקים-הכלכלית לynet (15.9.26): "למעט פטורים רפואיים, על מי שלא ישרת יוטלו סנקציות ויישללו הטבות מהמדינה". במצע: פטור זמני רק במבחן "עילויים בתורה, עילויים באקדמיה וספורטאים מצטיינים".',
  },
  { partyId: "hamiluimnikim", questionId: "rel-7", stanceValue: -1 },
  { partyId: "hamiluimnikim", questionId: "rel-8", stanceValue: 0 },
  {
    partyId: "hamiluimnikim",
    questionId: "rel-9",
    stanceValue: -2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "תקציבי חינוך יינתנו רק למי שתורם למדינה, אין תקצוב ותמיכה למוסדות בלי שותפות בשירות".',
  },
  { partyId: "hamiluimnikim", questionId: "rel-10", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "rel-11",
    stanceValue: 2,
    sourceUrl: "https://www.thepetek.com/party/reservists-economic",
    sourceNote:
      'המפלגה הכלכלית (זליכה): הפרטת הכשרות ושבירת המונופול של הרבנות.',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "jud-1",
    stanceValue: -1,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'המילואימניקים-הכלכלית לynet (21.9.26): "כדי שהכנסת תוכל לגבור על פסילת בג"ץ, צריך רוב מיוחס של יותר מ-72 חברי כנסת" - בעד התגברות, אבל לא ברוב רגיל. (המקור הקודם, The Petek, ייחס למילואימניקים התנגדות להתגברות.)',
  },
  { partyId: "hamiluimnikim", questionId: "jud-2", stanceValue: 1 },
  {
    partyId: "hamiluimnikim",
    questionId: "jud-3",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'המילואימניקים-הכלכלית לynet (21.9.26): "חברי הכנסת יקבעו בחקיקה הרכב מאוזן לוועדה לבחירת שופטים" - בלי לקבוע אם לפוליטיקאים יהיה בה רוב.',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "jud-5",
    stanceValue: 0,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14903844",
    sourceNote:
      'המילואימניקים-הכלכלית לynet (21.9.26): "בנוגע לעילת הסבירות - צריך לצמצם אבל לא לבטל".',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "jud-7",
    stanceValue: 0,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "פיצול תפקידי היועמ"ש" ו"ביקורת חיצונית ולא תלויה על מערכת המשפט", בלי פירוט לגבי מינוי יועצים משפטיים בידי שרים. (עדכון מ-1-.)',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "jud-8",
    stanceValue: 0,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "פיצול תפקידי היועמ"ש" - שינוי במעמד הנוכחי, בלי לקבוע אם הייעוץ יישאר בלתי תלוי. (עדכון מ-1.)',
  },
  { partyId: "hamiluimnikim", questionId: "jud-9", stanceValue: 0 },
  {
    partyId: "hamiluimnikim",
    questionId: "gov-1",
    stanceValue: 2,
    sourceUrl: "https://www.ynet.co.il/news/elections2026/article/yokra14915209",
    sourceNote:
      'המילואימניקים-הכלכלית לynet (3.10.26): "בעד ועדת חקירה ממלכתית. רצוי להגיע להרכב בהסכמה רחבה. מי ימנה אותה? בית המשפט העליון בעדיפות לסולברג".',
  },
  {
    partyId: "hamiluimnikim",
    questionId: "gov-3",
    stanceValue: 2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "הגבלת כהונה לשמונה שנים או לשתי קדנציות למשרת ראש ממשלה". (עדכון מ-1.)',
  },
  { partyId: "hamiluimnikim", questionId: "gov-4", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "gov-5", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "soc-1", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "soc-2", stanceValue: 0 },
  { partyId: "hamiluimnikim", questionId: "soc-3", stanceValue: 0 },
  {
    partyId: "hamiluimnikim",
    questionId: "soc-5",
    stanceValue: 2,
    sourceUrl: "https://www.themiluimnikim.org.il/platform/",
    sourceNote:
      'מצע המילואימניקים: "השבת המשילות משימה לאומית דחופה", כולל "הקמת נקודות שיטור נוספות בנגב, בגליל ובכלל במגזר הערבי" ושב"כ שמוביל את האכיפה. (עדכון מ-1.)',
  },
  { partyId: "hamiluimnikim", questionId: "soc-6", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "soc-7", stanceValue: 1 },
  { partyId: "hamiluimnikim", questionId: "soc-10", stanceValue: 0 },
];
