import { SpectrumCategory, OfficialBallotLetter, PlatformTopicKey } from "@/types";

export interface PartyPlatformTopicCore {
  topicKey: PlatformTopicKey;
}

export interface PartyCore {
  id: string;
  color: string;
  spectrumCategory: SpectrumCategory;
  /** Ballot-letter-style abbreviation shown in the round badge across the
   *  site — kept in Hebrew in every locale, same as officialBallotLetter,
   *  since these are real (or placeholder) Knesset ballot letters. */
  logo: string;
  logoImageUrl?: string;
  officialBallotLetter?: OfficialBallotLetter;
  leaderSketchUrl?: string;
  platform: PartyPlatformTopicCore[];
}

export const partiesCore: PartyCore[] = [
  {
    "id": "yashar",
    "color": "#334155",
    "spectrumCategory": "center",
    "logo": "יש",
    "logoImageUrl": "/party_logos/yashar.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "likud",
    "color": "#1e3a8a",
    "spectrumCategory": "right",
    "logo": "מחל",
    "logoImageUrl": "/party_logos/likud.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "beyachad",
    "color": "#0284c7",
    "spectrumCategory": "center",
    "logo": "יח",
    "logoImageUrl": "/party_logos/beyachad.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "otzma-yehudit",
    "color": "#b91c1c",
    "spectrumCategory": "far-right",
    "logo": "ע",
    "logoImageUrl": "/party_logos/otzma-yehudit.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "yisrael-beiteinu",
    "color": "#0e7490",
    "spectrumCategory": "right",
    "logo": "ל",
    "logoImageUrl": "/party_logos/yisrael-beiteinu.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "hademocratim",
    "color": "#15803d",
    "spectrumCategory": "center-left",
    "logo": "ד",
    "logoImageUrl": "/party_logos/hademocratim.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "shas",
    "color": "#7c2d12",
    "spectrumCategory": "sectoral",
    "logo": "שס",
    "logoImageUrl": "/party_logos/shas.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "yahadut-hatorah",
    "color": "#374151",
    "spectrumCategory": "sectoral",
    "logo": "ג",
    "logoImageUrl": "/party_logos/yahadut-hatorah.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "raam",
    "color": "#0f766e",
    "spectrumCategory": "sectoral",
    "logo": "ר",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "hadash-taal",
    "color": "#a16207",
    "spectrumCategory": "sectoral",
    "logo": "ום",
    "logoImageUrl": "/party_logos/hadash-taal.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "religious-zionism",
    "color": "#ea580c",
    "spectrumCategory": "far-right",
    "logo": "צ",
    "logoImageUrl": "/party_logos/religious-zionism.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "beit-tzioni",
    "color": "#3f6212",
    "spectrumCategory": "center",
    "logo": "בצ",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "balad",
    "color": "#1c1917",
    "spectrumCategory": "sectoral",
    "logo": "בל",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  },
  {
    "id": "kachol-lavan",
    "color": "#1d4ed8",
    "spectrumCategory": "center",
    "logo": "כל",
    "logoImageUrl": "/party_logos/kachol-lavan.png",
    "platform": [
      {
        "topicKey": "security"
      },
      {
        "topicKey": "economy"
      },
      {
        "topicKey": "justice"
      },
      {
        "topicKey": "religionAndState"
      },
      {
        "topicKey": "society"
      }
    ]
  }
];
