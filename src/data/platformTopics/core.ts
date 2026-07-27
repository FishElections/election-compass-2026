import { PlatformTopicKey } from "@/types";

export interface PlatformTopicMetaCore {
  key: PlatformTopicKey;
  icon: string;
}

export const platformTopicsCore: PlatformTopicMetaCore[] = [
  {
    "key": "security",
    "icon": "🛡️"
  },
  {
    "key": "economy",
    "icon": "💰"
  },
  {
    "key": "justice",
    "icon": "⚖️"
  },
  {
    "key": "religionAndState",
    "icon": "✡️"
  },
  {
    "key": "society",
    "icon": "🎓"
  }
];
