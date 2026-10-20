import type { PartyTrackRecordText, TrackRecordLocaleText } from "./he";
import { partyRecords } from "./parties/registry";

/** Each party file holds its own he/en/ar text (see ./parties/registry). */
function textFor(locale: "he" | "en" | "ar"): Record<string, PartyTrackRecordText> {
  return Object.fromEntries(
    Object.entries(partyRecords).map(([id, record]) => [id, record.text[locale]])
  );
}

export const trackRecordTextAr: TrackRecordLocaleText = {
  publishers: {
    knesset: "الكنيست",
    "gov-il": "موقع الحكومة الإسرائيلية (gov.il)",
    police: "شرطة إسرائيل",
    "attorney-general": "مكتب المستشار القضائي للحكومة",
    "state-attorney": "النيابة العامة للدولة",
    courts: "السلطة القضائية",
    cec: "لجنة الانتخابات المركزية",
    reshumot: "ريشوموت (الجريدة الرسمية)",
    "un-treaties": "مجموعة معاهدات الأمم المتحدة",
    icc: "المحكمة الجنائية الدولية",
    "state-comptroller": "مراقب الدولة",
    "bank-of-israel": "بنك إسرائيل",
    cbs: "دائرة الإحصاء المركزية",
    "knesset-ric": "مركز الأبحاث والمعلومات في الكنيست",
    idi: "المعهد الإسرائيلي للديمقراطية",
    "peer-reviewed": "دراسة محكّمة",
    kan: "كان",
    haaretz: "هآرتس",
    ynet: "واينت",
    "times-of-israel": "تايمز أوف إسرائيل",
    jpost: "جيروزاليم بوست",
    globes: "غلوبس",
    calcalist: "كالكاليست",
    walla: "والا",
    maariv: "معاريف",
    n12: "N12",
    "israel-hayom": "يسرائيل هيوم",
  },
  parties: textFor("ar"),
};
