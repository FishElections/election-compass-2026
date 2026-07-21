import { PlatformTopicKey } from "@/types";

export interface PlatformTopicMeta {
  key: PlatformTopicKey;
  label: string;
  icon: string;
}

export const platformTopics: PlatformTopicMeta[] = [
  { key: "security", label: "ביטחון ומדיניות חוץ", icon: "🛡️" },
  { key: "economy", label: "כלכלה ויוקר מחיה", icon: "💰" },
  { key: "justice", label: "מערכת המשפט וממשל", icon: "⚖️" },
  { key: "religionAndState", label: "דת ומדינה", icon: "✡️" },
  { key: "society", label: "חברה וחינוך", icon: "🎓" },
];
