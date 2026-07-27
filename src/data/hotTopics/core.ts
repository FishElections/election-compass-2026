import { TopicCategory, PartyStancesSummary } from "@/types";

export interface TopicCore {
  id: string;
  category: TopicCategory;
  partyStancesSummary?: PartyStancesSummary;
  relatedQuestionId?: string;
}

export const topicsCore: TopicCore[] = [
  {
    "id": "gaza-day-after",
    "category": "security",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "beyachad",
        "hademocratim",
        "raam",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "oppose": [
        "likud",
        "otzma-yehudit",
        "yisrael-beiteinu",
        "shas",
        "yahadut-hatorah",
        "religious-zionism"
      ],
      "splitOrNeutral": []
    },
    "relatedQuestionId": "sec-9"
  },
  {
    "id": "normalization-agreements",
    "category": "security",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "beyachad",
        "hademocratim",
        "beit-tzioni",
        "kachol-lavan"
      ],
      "oppose": [
        "otzma-yehudit",
        "religious-zionism"
      ],
      "splitOrNeutral": [
        "likud",
        "yisrael-beiteinu",
        "shas",
        "yahadut-hatorah",
        "raam",
        "hadash-taal",
        "balad"
      ]
    },
    "relatedQuestionId": "sec-7"
  },
  {
    "id": "haredi-draft",
    "category": "religion",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "beyachad",
        "yisrael-beiteinu",
        "hademocratim",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "oppose": [
        "likud",
        "otzma-yehudit",
        "shas",
        "yahadut-hatorah",
        "raam",
        "religious-zionism"
      ],
      "splitOrNeutral": []
    },
    "relatedQuestionId": "rel-5"
  },
  {
    "id": "civil-marriage",
    "category": "religion",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "yisrael-beiteinu",
        "hademocratim",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "oppose": [
        "likud",
        "otzma-yehudit",
        "shas",
        "yahadut-hatorah",
        "raam",
        "religious-zionism"
      ],
      "splitOrNeutral": [
        "beyachad"
      ]
    },
    "relatedQuestionId": "rel-4"
  },
  {
    "id": "shabbat-transport",
    "category": "religion"
  },
  {
    "id": "legal-advisor",
    "category": "law"
  },
  {
    "id": "reasonableness-doctrine",
    "category": "law"
  },
  {
    "id": "judges-override-clause",
    "category": "law",
    "partyStancesSummary": {
      "support": [
        "likud",
        "otzma-yehudit",
        "shas",
        "yahadut-hatorah",
        "religious-zionism"
      ],
      "oppose": [
        "yashar",
        "beyachad",
        "yisrael-beiteinu",
        "hademocratim",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "splitOrNeutral": [
        "raam"
      ]
    },
    "relatedQuestionId": "jud-1"
  },
  {
    "id": "press-freedom",
    "category": "law"
  },
  {
    "id": "coalition-funds",
    "category": "law",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "beyachad",
        "yisrael-beiteinu",
        "hademocratim",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "oppose": [
        "likud",
        "otzma-yehudit",
        "shas",
        "yahadut-hatorah",
        "religious-zionism"
      ],
      "splitOrNeutral": [
        "raam"
      ]
    },
    "relatedQuestionId": "eco-9"
  },
  {
    "id": "cost-of-living",
    "category": "economy",
    "partyStancesSummary": {
      "support": [
        "hademocratim",
        "shas",
        "yahadut-hatorah",
        "raam",
        "hadash-taal",
        "beit-tzioni",
        "balad",
        "kachol-lavan"
      ],
      "oppose": [
        "likud",
        "beyachad",
        "otzma-yehudit",
        "religious-zionism"
      ],
      "splitOrNeutral": [
        "yashar",
        "yisrael-beiteinu"
      ]
    },
    "relatedQuestionId": "eco-6"
  },
  {
    "id": "economic-inequality",
    "category": "economy",
    "partyStancesSummary": {
      "support": [
        "yashar",
        "hademocratim",
        "shas",
        "yahadut-hatorah",
        "raam",
        "hadash-taal",
        "beit-tzioni",
        "balad"
      ],
      "oppose": [
        "likud",
        "beyachad",
        "yisrael-beiteinu",
        "religious-zionism"
      ],
      "splitOrNeutral": [
        "otzma-yehudit",
        "kachol-lavan"
      ]
    },
    "relatedQuestionId": "eco-10"
  },
  {
    "id": "arab-citizens-status",
    "category": "society",
    "partyStancesSummary": {
      "support": [
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
        "beit-tzioni",
        "kachol-lavan"
      ],
      "oppose": [],
      "splitOrNeutral": [
        "hadash-taal",
        "balad"
      ]
    },
    "relatedQuestionId": "soc-5"
  },
  {
    "id": "frontline-reconstruction",
    "category": "society",
    "partyStancesSummary": {
      "support": [
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
        "beit-tzioni",
        "kachol-lavan"
      ],
      "oppose": [],
      "splitOrNeutral": [
        "raam",
        "balad"
      ]
    },
    "relatedQuestionId": "eco-5"
  }
];

export const topicCategories: TopicCategory[] = [
  "security",
  "religion",
  "law",
  "economy",
  "society"
];

/** Small icon per category, locale-invariant. */
export const categoryIcons: Record<TopicCategory, string> = {
  "security": "🛡️",
  "religion": "🕯️",
  "law": "⚖️",
  "economy": "💰",
  "society": "🏘️"
};
