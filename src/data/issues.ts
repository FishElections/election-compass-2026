import { PoliticalIssue } from "@/types";

/**
 * הנושאים המרכזיים לבחירות 2026, לצורך "מרכז הידע האזרחי".
 * partyStancesSummary נגזר ישירות ממטריצת העמדות המבוקרת (party_stances.ts)
 * עבור relatedQuestionId של כל נושא, כדי לשמור על עקביות מלאה מול תוצאות
 * השאלון ומודול "מפרק הבועות". תיאורי הנושא, הדילמה והטיעונים הם עיבוד
 * עריכתי לצורכי הסבר אזרחי בלבד.
 */
export const issues: PoliticalIssue[] = [
  {
    id: "gaza-governance",
    category: "ביטחון ומדיניות",
    title: "מי ינהל את רצועת עזה אחרי המלחמה?",
    simpleExplanation:
      "מאז 2023 ישראל נלחמת בחמאס ברצועת עזה, אך אין הסכמה מי אמור לנהל את חיי היום-יום שם כשהלחימה תיפסק: ישראל עצמה, גוף בינלאומי, מדינות ערביות, או הרשות הפלסטינית.",
    theDilemma:
      "הדילמה היא בין הרצון להימנע משליטה צבאית ישראלית ממושכת ומהמחיר בדם ובכסף שהיא גובה, לבין החשש שכל גורם אחר לא יצליח או לא ירצה למנוע מארגוני טרור לשקם את כוחם.",
    proArgument: {
      title: "בעד העברת השליטה לגורם חיצוני",
      text: "מעביר את הנטל הביטחוני והכלכלי מישראל, מצמצם חיכוך יומיומי מול אוכלוסייה אזרחית, ופותח פתח לשיקום אזרחי מהיר יותר.",
    },
    conArgument: {
      title: "בעד המשך שליטה ביטחונית ישראלית",
      text: "רק נוכחות ביטחונית ישראלית ישירה יכולה להבטיח שארגוני הטרור לא ישקמו את יכולותיהם, כפי שקרה בעבר לאחר נסיגות.",
    },
    partyStancesSummary: {
      support: ["yashar", "beyachad", "hademocratim", "raam", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "otzma-yehudit", "yisrael-beiteinu", "shas", "yahadut-hatorah", "religious-zionism"],
      splitOrNeutral: [],
    },
    relatedQuestionId: "sec-9",
  },
  {
    id: "regional-normalization",
    category: "ביטחון ומדיניות",
    title: "הרחבת הסכמי השלום עם מדינות ערביות",
    simpleExplanation:
      "מאז הסכמי אברהם ב-2020 ישראל חתמה על הסכמי שלום עם מדינות ערביות נוספות. יש הרוצים להרחיב את המעגל הזה, בפרט מול סעודיה, אך חלק מהמדינות דורשות התקדמות מול הפלסטינים כתנאי.",
    theDilemma:
      "הדילמה היא בין ההזדמנות ההיסטורית לשינוי מפת המזרח התיכון ובידוד איראן, לבין החשש שוויתורים לפלסטינים כמחיר לנורמליזציה ייתפסו כתגמול על טרור.",
    proArgument: {
      title: "בעד קידום נורמליזציה גם במחיר ויתורים",
      text: "נורמליזציה רחבה מביאה יתרונות כלכליים וביטחוניים עצומים ומבודדת את איראן, מה שמצדיק גמישות מסוימת בנושא הפלסטיני.",
    },
    conArgument: {
      title: "נגד ויתורים כמחיר לנורמליזציה",
      text: "ויתורים לפלסטינים בעיתוי הזה יתפרשו כתגמול על הטרור, וההסכמים עלולים להיות שבריריים ללא פתרון אמיתי לסכסוך.",
    },
    partyStancesSummary: {
      support: ["yashar", "beyachad", "hademocratim", "yesodot-israel"],
      oppose: ["otzma-yehudit", "religious-zionism"],
      splitOrNeutral: ["likud", "yisrael-beiteinu", "shas", "yahadut-hatorah", "raam", "hadash-taal"],
    },
    relatedQuestionId: "sec-7",
  },
  {
    id: "haredi-draft",
    category: "דת ומדינה",
    title: 'גיוס בני ישיבות לצה"ל',
    simpleExplanation:
      'עשרות שנים נהנו תלמידי ישיבות חרדים מפטור או דחיית שירות צבאי. בג"ץ פסל את ההסדרים הקודמים, ומאז המלחמה הנושא הפך לאחד הרגישים והבוערים ביותר בפוליטיקה הישראלית.',
    theDilemma:
      'הדילמה היא בין עקרון השוויון בנטל, בפרט כשחיילים ומילואימניקים נלחמים ומתים, לבין החשש מפגיעה בזהות ובאורח החיים של קהילה שלמה שרואה בלימוד תורה ערך עליון.',
    proArgument: {
      title: "בעד גיוס חובה שוויוני",
      text: 'שוויון בנטל הוא תנאי בסיסי לחוזה החברתי, וגיוס רחב יותר גם יגדיל את כוח האדם הזמין לצה"ל ויקדם שילוב כלכלי עתידי.',
    },
    conArgument: {
      title: "בעד שימור הפטור ללומדי תורה",
      text: "לימוד תורה נתפס כערך רוחני-קיומי לא פחות מהשירות הצבאי, וכפייה גורפת עלולה לפרק קהילות ולגרום לעימות חברתי קשה.",
    },
    partyStancesSummary: {
      support: ["yashar", "beyachad", "yisrael-beiteinu", "hademocratim", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "otzma-yehudit", "shas", "yahadut-hatorah", "raam", "religious-zionism"],
      splitOrNeutral: [],
    },
    relatedQuestionId: "rel-6",
  },
  {
    id: "civil-marriage",
    category: "דת ומדינה",
    title: "נישואין וגירושין אזרחיים",
    simpleExplanation:
      'בישראל אין מסלול לנישואין אזרחיים, נישואין נערכים רק דרך מוסדות דתיים. זוגות רבים (ביניהם זוגות מעורבי-דת, חד-מיניים או המוגדרים "לא כשרים לנישואין" הלכתית) נוסעים לחו"ל כדי להינשא.',
    theDilemma:
      "הדילמה היא בין חופש הבחירה וזכות היסוד של כל אזרח להינשא כרצונו, לבין החשש מפגיעה באחדות העם היהודי ובמעמד ההלכה כמסגרת מחייבת.",
    proArgument: {
      title: "בעד חקיקת נישואין אזרחיים",
      text: "חופש הבחירה בנישואין הוא זכות יסוד, וחוק אזרחי יפתור עוול כלפי זוגות שאינם יכולים או רוצים להינשא כהלכה.",
    },
    conArgument: {
      title: "נגד נישואין אזרחיים",
      text: "נישואין אזרחיים עלולים לפגוע באחדות העם היהודי ובמעמד ההלכה כמסגרת המחייבת לנישואין ולגירושין.",
    },
    partyStancesSummary: {
      support: ["yashar", "yisrael-beiteinu", "hademocratim", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "otzma-yehudit", "shas", "yahadut-hatorah", "raam", "religious-zionism"],
      splitOrNeutral: ["beyachad"],
    },
    relatedQuestionId: "rel-4",
  },
  {
    id: "judicial-reform",
    category: "משפט וממשל",
    title: "הרפורמה במערכת המשפט",
    simpleExplanation:
      "ב-2023 הממשלה קידמה שינויים מרחיקי לכת במערכת המשפט, כולל פסקת התגברות ושינוי אופן בחירת השופטים. הרפורמה עוררה מחאות המוניות ונותרה שסע פוליטי מרכזי.",
    theDilemma:
      "הדילמה היא בין הרצון לחזק את מרות הרשות המחוקקת הנבחרת מול רשות שופטת שאינה נבחרת, לבין החשש שהחלשת הביקורת השיפוטית תפגע בזכויות מיעוט ובבלמים על השלטון.",
    proArgument: {
      title: "בעד הרפורמה",
      text: "פסקת התגברות ושינויים נלווים משקמים את ריבונות העם המתבטאת בכנסת הנבחרת, מול קבוצה קטנה של שופטים בלתי נבחרים.",
    },
    conArgument: {
      title: "נגד הרפורמה",
      text: "בהיעדר חוקה כתובה ובית שני של מחוקקים, בית המשפט הוא קו ההגנה המרכזי של האזרח מול כוח שלטוני בלתי מרוסן.",
    },
    partyStancesSummary: {
      support: ["likud", "otzma-yehudit", "shas", "yahadut-hatorah", "religious-zionism"],
      oppose: ["yashar", "yisrael-beiteinu", "hademocratim", "hadash-taal", "yesodot-israel"],
      splitOrNeutral: ["beyachad", "raam"],
    },
    relatedQuestionId: "jud-1",
  },
  {
    id: "coalition-funds",
    category: "משפט וממשל",
    title: "כספים קואליציוניים ותקציבי מפלגות",
    simpleExplanation:
      "'כספים קואליציוניים' הם תקציבים ייעודיים המוקצים למגזרים או לרשויות מקומיות כחלק מהסכמים בין מפלגות הקואליציה, לעיתים ללא הליך תקציבי שקוף ומבוקר כמו שאר התקציב.",
    theDilemma:
      "הדילמה היא בין הצורך במימון אמיתי לקהילות מוחלשות, לבין החשש שהקצאות אלה משמשות בעיקר לרכישת תמיכה פוליטית על חשבון שוויון ושקיפות תקציבית.",
    proArgument: {
      title: "בעד צמצום הכספים הקואליציוניים",
      text: "הקצאות שאינן עוברות ביקורת תקציבית רגילה פוגעות בשוויון ובשקיפות, ומשרתות בעיקר אינטרסים פוליטיים צרים.",
    },
    conArgument: {
      title: "נגד צמצום הכספים הקואליציוניים",
      text: "תקציבים אלה מממנים בפועל צרכים אמיתיים במגזרים מוחלשים, וביטולם עלול לפגוע בקהילות שכבר סובלות מתת-תקצוב.",
    },
    partyStancesSummary: {
      support: ["yashar", "beyachad", "yisrael-beiteinu", "hademocratim", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "otzma-yehudit", "shas", "yahadut-hatorah", "religious-zionism"],
      splitOrNeutral: ["raam"],
    },
    relatedQuestionId: "eco-9",
  },
  {
    id: "housing-crisis",
    category: "כלכלה ויוקר מחיה",
    title: 'יוקר הדיור ומשבר הנדל"ן',
    simpleExplanation:
      "מחירי הדירות בישראל עלו באופן חד בעשור האחרון, עד כדי כך שרכישת דירה ראשונה הפכה בלתי אפשרית עבור זוגות צעירים רבים ללא סיוע משפחתי.",
    theDilemma:
      "הדילמה היא בין התערבות ממשלתית ישירה (בנייה ציבורית, סבסוד) שעלולה לעוות תמריצי שוק, לבין הסתמכות על שוק חופשי שדורש הגדלת היצע איטית וממושכת.",
    proArgument: {
      title: "בעד השקעה ממשלתית ישירה בדיור",
      text: "השקעה ממשלתית ישירה היא הדרך היעילה ביותר להוזיל מחירים במהירות ולתת מענה למשפחות צעירות.",
    },
    conArgument: {
      title: "בעד הגדלת היצע דרך שוק חופשי",
      text: "התערבות ממשלתית מסיבית מעוותת תמריצים; הפתרון האמיתי הוא הגדלת ההיצע דרך רגולציה קלה יותר ותכנון ובנייה מהירים יותר.",
    },
    partyStancesSummary: {
      support: ["hademocratim", "shas", "yahadut-hatorah", "raam", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "beyachad", "otzma-yehudit", "religious-zionism"],
      splitOrNeutral: ["yashar", "yisrael-beiteinu"],
    },
    relatedQuestionId: "eco-6",
  },
  {
    id: "wealth-tax",
    category: "כלכלה ויוקר מחיה",
    title: "פערי מיסוי ואי שוויון כלכלי",
    simpleExplanation:
      "ישראל נמנית עם המדינות המערביות עם פערי הכנסה ורכוש גבוהים יחסית. השאלה כיצד למסות הון ורכוש, ובאיזה שיעור, עומדת במרכז הוויכוח הכלכלי-חברתי.",
    theDilemma:
      "הדילמה היא בין מיסוי פרוגרסיבי גבוה יותר שמצמצם פערים אך עלול להבריח הון והשקעות, לבין מיסוי נמוך שמעודד צמיחה אך מעמיק אי-שוויון.",
    proArgument: {
      title: "בעד מיסוי פרוגרסיבי גבוה יותר",
      text: "מיסוי גבוה יותר על הון הוא הדרך ההוגנת לצמצם אי-שוויון ולממן שירותים ציבוריים לכלל האזרחים.",
    },
    conArgument: {
      title: "נגד העלאת מיסוי על הון",
      text: "מיסוי גבוה מדי על הון עלול להבריח משקיעים והון מהמדינה, ולפגוע בסופו של דבר בצמיחה וביצירת מקומות עבודה.",
    },
    partyStancesSummary: {
      support: ["yashar", "hademocratim", "shas", "yahadut-hatorah", "raam", "hadash-taal", "yesodot-israel"],
      oppose: ["likud", "beyachad", "yisrael-beiteinu", "religious-zionism"],
      splitOrNeutral: ["otzma-yehudit"],
    },
    relatedQuestionId: "eco-10",
  },
  {
    id: "arab-society-crime",
    category: "חברה וביטחון פנים",
    title: "פשיעה ונשק בלתי חוקי בחברה הערבית",
    simpleExplanation:
      "בשנים האחרונות נרשמה עלייה חדה במקרי רצח ואלימות חמושה בחברה הערבית בישראל, כאשר מאות בני אדם נרצחים מדי שנה, לצד טענות חוזרות ונשנות על אכיפה בלתי מספקת.",
    theDilemma:
      "הדילמה היא בין הצורך הדחוף בהגברת אכיפה משטרתית להצלת חיים, לבין הטענה שאכיפה בלבד לא תפתור בעיה שיש לה שורשים כלכליים וחברתיים עמוקים יותר.",
    proArgument: {
      title: "בעד הגברת האכיפה המשטרתית",
      text: "המדינה חייבת להגן על חיי אזרחיה בכל מגזר; הזנחה מתמשכת של הנושא החריפה את המשבר לממדים חסרי תקדים.",
    },
    conArgument: {
      title: "בעד גישה משולבת מעבר לאכיפה",
      text: "אכיפה משטרתית בלבד לא תפתור את הבעיה; יש צורך גם בהשקעה כלכלית וחינוכית משמעותית כדי לטפל בשורשי התופעה.",
    },
    partyStancesSummary: {
      support: [
        "yashar",
        "likud",
        "beyachad",
        "otzma-yehudit",
        "yisrael-beiteinu",
        "hademocratim",
        "shas",
        "yahadut-hatorah",
        "raam",
        "religious-zionism",
        "yesodot-israel",
      ],
      oppose: [],
      splitOrNeutral: ["hadash-taal"],
    },
    relatedQuestionId: "soc-5",
  },
  {
    id: "frontline-reconstruction",
    category: "חברה וביטחון פנים",
    title: "שיקום קו העימות, הצפון ועוטף עזה",
    simpleExplanation:
      "יישובי הצפון ועוטף עזה פונו לתקופה ממושכת וספגו נזק כבד במלחמה. תושבים רבים עדיין לא חזרו לבתיהם, ועולה השאלה מהו היקף המשאבים הראוי לשיקום ולפיתוח מחדש של האזורים הללו.",
    theDilemma:
      "הדילמה היא בין החובה המוסרית והכלכלית לשקם באופן מלא את הקהילות שספגו את עיקר הנטל הביטחוני, לבין הצורך לוודא תכנון יעיל ובקרה הדוקה כדי שההוצאה לא תיצור בזבוז או אי-שוויון מול אזורים אחרים.",
    proArgument: {
      title: "בעד תקציב שיקום נרחב",
      text: "יש למדינה חובה מוסרית וכלכלית לשקם באופן מלא את הקהילות שספגו את עיקר הנטל, ולהחזיר את התושבים לבתיהם בתנאים טובים יותר מבעבר.",
    },
    conArgument: {
      title: "בעד בקרה הדוקה על התקציב",
      text: "יש לוודא תכנון יעיל ובקרה הדוקה על ההוצאה, כדי שהשיקום לא ייצור בזבוז או אי-שוויון מול אזורים נפגעים אחרים במדינה.",
    },
    partyStancesSummary: {
      support: [
        "yashar",
        "likud",
        "beyachad",
        "otzma-yehudit",
        "yisrael-beiteinu",
        "hademocratim",
        "shas",
        "yahadut-hatorah",
        "hadash-taal",
        "religious-zionism",
        "yesodot-israel",
      ],
      oppose: [],
      splitOrNeutral: ["raam"],
    },
    relatedQuestionId: "eco-5",
  },
];

export const issueCategories = [
  "ביטחון ומדיניות",
  "דת ומדינה",
  "משפט וממשל",
  "כלכלה ויוקר מחיה",
  "חברה וביטחון פנים",
] as const;
