import {
  SpectrumCategory,
  OfficialBallotLetter,
  PartyBlocDeclaration,
  PartySector,
  PlatformTopicKey,
} from "@/types";

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
  /** ראו PartySector. חובה - בדיקת שלמות הדאטה אוכפת שהמערך לא ריק. */
  sectors: PartySector[];
  bloc?: PartyBlocDeclaration;
  platform: PartyPlatformTopicCore[];
}

export const partiesCore: PartyCore[] = [
  {
    "id": "yashar",
    "color": "#334155",
    "spectrumCategory": "center",
    "logo": "דרך",
    "logoImageUrl": "/party_logos/yashar.png",
    "officialBallotLetter": {
      "letters": "דרך",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "anti-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "officialBallotLetter": {
      "letters": "מחל",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "רק",
    "logoImageUrl": "/party_logos/beyachad.png",
    "officialBallotLetter": {
      "letters": "רק",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "anti-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "ב",
    "logoImageUrl": "/party_logos/otzma-yehudit.png",
    "officialBallotLetter": {
      "letters": "ב",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "religious-zionist"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "officialBallotLetter": {
      "letters": "ל",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "anti-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "אמת",
    "logoImageUrl": "/party_logos/hademocratim.png",
    "officialBallotLetter": {
      "letters": "אמת",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "anti-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "officialBallotLetter": {
      "letters": "שס",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "haredi"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "officialBallotLetter": {
      "letters": "ג",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "haredi"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "עם",
    "officialBallotLetter": {
      "letters": "עם",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["arab", "islamist"],
    "bloc": {
      "stance": "unaligned",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "ודם",
    "officialBallotLetter": {
      "letters": "ודם",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["arab", "non-religious"],
    "bloc": {
      "stance": "unaligned",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "ט",
    "logoImageUrl": "/party_logos/religious-zionism.png",
    "officialBallotLetter": {
      "letters": "ט",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "religious-zionist"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-11",
      "source": "https://www.haaretz.com/israel-news/elections/2026-10-11/ty-article/israel-election-poll-eisenkot-bloc-continues-slump-as-coalition-gains-ground/000001a1-2c63-d7a5-a7b1-be7397560000"
    },
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
    "logo": "כן",
    "logoImageUrl": "/party_logos/kachol-lavan.png",
    "officialBallotLetter": {
      "letters": "כן",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "anti-netanyahu",
      "asOf": "2026-07-22",
      "source": "https://www.haaretz.com/israel-news/elections/2026-07-22/ty-article/israel-election-poll-the-democrats-hold-steady-as-arab-parties-gain-ground/0000019f-86d5-ded0-abdf-a6d5fe220000"
    },
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
    "id": "amcha-yisrael",
    "color": "#9a3412",
    "spectrumCategory": "right",
    "logo": "ך",
    "officialBallotLetter": {
      "letters": "ך",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "pro-netanyahu",
      "asOf": "2026-10-14",
      "source": "https://jewishinsider.com/2026/10/amcha-yisrael-leader-ofer-winter-israeli-elections/"
    },
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
    "id": "hamiluimnikim",
    "color": "#4d7c0f",
    "spectrumCategory": "center-right",
    "logo": "די",
    "officialBallotLetter": {
      "letters": "די",
      "confirmedAt": "2026-09-27",
      "source": "https://www.ynet.co.il/news/article/s1ibdii5fe"
    },
    "sectors": ["jewish", "non-religious"],
    "bloc": {
      "stance": "unaligned",
      "asOf": "2026-10-14",
      "source": "https://jewishinsider.com/2026/10/israeli-elections-yoaz-hendel-ofer-winter-threshold-polls/"
    },
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
