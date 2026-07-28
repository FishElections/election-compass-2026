import { FilterLabels } from "./index";

export const filterLabelsHe: FilterLabels = {
  sectors: {
    "arab": "מפלגה ערבית",
    "jewish": "מפלגה יהודית",
    "haredi": "מפלגה חרדית",
    "religious-zionist": "מפלגה דתית-לאומית",
    "islamist": "מפלגה איסלאמית",
    "non-religious": "מפלגה לא-דתית",
  },
  bloc: {
    any: "לא משנה לי",
    anti: "רק מפלגות שלא ימליצו על נתניהו",
    pro: "רק מפלגות שימליצו על נתניהו",
  },
  size: {
    any: "לא משנה לי",
    large: "מפלגה גדולה שיכולה להוביל ממשלה",
    small: "מפלגה קטנה עם אג'נדה חדה",
  },
  exclusionReasons: {
    sector: "מגזר שסיננת",
    bloc: "לא תואם את בחירת הגוש",
    threshold: "לא עוברת את אחוז החסימה",
  },
  notes: {
    "below-threshold": "מתחת לאחוז החסימה בסקרים",
    "near-threshold": "סמוך לאחוז החסימה",
    large: "מפלגה גדולה",
    small: "מפלגה קטנה",
  },

  pollSource: {
    "channel13": "חדשות 13",
  },
};
