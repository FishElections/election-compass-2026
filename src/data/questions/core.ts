import { CategoryId } from "@/types";

export interface CategoryCore {
  id: CategoryId;
  icon: string;
}

export const categoriesCore: CategoryCore[] = [
  {
    "id": "security",
    "icon": "🛡️"
  },
  {
    "id": "economy",
    "icon": "💰"
  },
  {
    "id": "infrastructure",
    "icon": "🏗️"
  },
  {
    "id": "religion_state",
    "icon": "🕊️"
  },
  {
    "id": "judiciary",
    "icon": "⚖️"
  },
  {
    "id": "governance",
    "icon": "🏛️"
  },
  {
    "id": "society",
    "icon": "🤝"
  }
];

export interface QuestionCore {
  id: string;
  category: CategoryId;
  isShort: boolean;
}

export const questionsCore: QuestionCore[] = [
  {
    "id": "sec-1",
    "category": "security",
    "isShort": true
  },
  {
    "id": "sec-2",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-3",
    "category": "security",
    "isShort": true
  },
  {
    "id": "sec-4",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-5",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-6",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-7",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-8",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-9",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-10",
    "category": "security",
    "isShort": true
  },
  {
    "id": "sec-11",
    "category": "security",
    "isShort": true
  },
  {
    "id": "sec-12",
    "category": "security",
    "isShort": false
  },
  {
    "id": "sec-13",
    "category": "security",
    "isShort": false
  },
  {
    "id": "eco-1",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-2",
    "category": "economy",
    "isShort": true
  },
  {
    "id": "eco-3",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-4",
    "category": "economy",
    "isShort": true
  },
  {
    "id": "eco-5",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-6",
    "category": "economy",
    "isShort": true
  },
  {
    "id": "eco-7",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-8",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-9",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-10",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-11",
    "category": "economy",
    "isShort": false
  },
  {
    "id": "eco-12",
    "category": "economy",
    "isShort": true
  },
  {
    "id": "inf-1",
    "category": "infrastructure",
    "isShort": true
  },
  {
    "id": "inf-2",
    "category": "infrastructure",
    "isShort": false
  },
  {
    "id": "inf-3",
    "category": "infrastructure",
    "isShort": false
  },
  {
    "id": "inf-4",
    "category": "infrastructure",
    "isShort": false
  },
  {
    "id": "inf-5",
    "category": "infrastructure",
    "isShort": false
  },
  {
    "id": "inf-6",
    "category": "infrastructure",
    "isShort": false
  },
  {
    "id": "rel-2",
    "category": "religion_state",
    "isShort": true
  },
  {
    "id": "rel-3",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "rel-4",
    "category": "religion_state",
    "isShort": true
  },
  {
    "id": "rel-5",
    "category": "religion_state",
    "isShort": true
  },
  {
    "id": "rel-7",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "rel-8",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "rel-9",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "rel-10",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "rel-11",
    "category": "religion_state",
    "isShort": false
  },
  {
    "id": "jud-1",
    "category": "judiciary",
    "isShort": true
  },
  {
    "id": "jud-2",
    "category": "judiciary",
    "isShort": true
  },
  {
    "id": "jud-3",
    "category": "judiciary",
    "isShort": true
  },
  {
    "id": "jud-5",
    "category": "judiciary",
    "isShort": false
  },
  {
    "id": "jud-7",
    "category": "judiciary",
    "isShort": false
  },
  {
    "id": "jud-8",
    "category": "judiciary",
    "isShort": false
  },
  {
    "id": "jud-9",
    "category": "judiciary",
    "isShort": false
  },
  {
    "id": "gov-1",
    "category": "governance",
    "isShort": true
  },
  {
    "id": "gov-3",
    "category": "governance",
    "isShort": false
  },
  {
    "id": "gov-4",
    "category": "governance",
    "isShort": true
  },
  {
    "id": "gov-5",
    "category": "governance",
    "isShort": false
  },
  {
    "id": "soc-1",
    "category": "society",
    "isShort": false
  },
  {
    "id": "soc-2",
    "category": "society",
    "isShort": true
  },
  {
    "id": "soc-3",
    "category": "society",
    "isShort": true
  },
  {
    "id": "soc-5",
    "category": "society",
    "isShort": false
  },
  {
    "id": "soc-6",
    "category": "society",
    "isShort": true
  },
  {
    "id": "soc-7",
    "category": "society",
    "isShort": false
  },
  {
    "id": "soc-10",
    "category": "society",
    "isShort": false
  }
];
