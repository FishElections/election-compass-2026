import { FilterLabels } from "./index";

export const filterLabelsAr: FilterLabels = {
  sectors: {
    "arab": "حزب عربي",
    "jewish": "حزب يهودي",
    "haredi": "حزب حريدي",
    "religious-zionist": "حزب صهيوني ديني",
    "islamist": "حزب إسلامي",
    "non-religious": "حزب غير ديني",
  },
  bloc: {
    any: "لا يهمّني",
    anti: "أحزاب لن توصي بنتنياهو فقط",
    pro: "أحزاب ستوصي بنتنياهو فقط",
  },
  size: {
    any: "لا يهمّني",
    large: "حزب كبير قادر على قيادة حكومة",
    small: "حزب صغير بأجندة واضحة",
  },
  exclusionReasons: {
    sector: "قطاع استبعدته",
    bloc: "لا يتوافق مع اختيارك للكتلة",
    threshold: "دون نسبة الحسم",
  },
  notes: {
    "below-threshold": "دون نسبة الحسم في الاستطلاعات",
    "near-threshold": "قريب من نسبة الحسم",
    large: "حزب كبير",
    small: "حزب صغير",
  },

  pollSource: {
    "channel13": "قناة 13 الإخبارية",
  },
};
