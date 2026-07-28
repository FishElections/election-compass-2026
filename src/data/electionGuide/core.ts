export interface ToyPartyCore {
  id: string;
  seats: number;
  color: string;
}
export const toyPartiesCore: ToyPartyCore[] = [
  {
    "id": "purple",
    "seats": 24,
    "color": "#7c3aed"
  },
  {
    "id": "orange",
    "seats": 19,
    "color": "#f97316"
  },
  {
    "id": "turquoise",
    "seats": 17,
    "color": "#0e7490"
  },
  {
    "id": "green",
    "seats": 15,
    "color": "#059669"
  },
  {
    "id": "blue",
    "seats": 14,
    "color": "#2563eb"
  },
  {
    "id": "amber",
    "seats": 12,
    "color": "#d97706"
  },
  {
    "id": "gray",
    "seats": 10,
    "color": "#475569"
  },
  {
    "id": "pink",
    "seats": 9,
    "color": "#db2777"
  }
];

export interface DemoSlipCore {
  id: string;
  letters: string;
}
export const demoSlipsCore: DemoSlipCore[] = [
  {
    "id": "purple",
    "letters": "פּ"
  },
  {
    "id": "orange",
    "letters": "זז"
  },
  {
    "id": "turquoise",
    "letters": "קו"
  }
];

export interface TimelineStepCore {
  id: string;
  emoji: string;
}
export const formationTimelineCore: TimelineStepCore[] = [
  {
    "id": "election-day",
    "emoji": "🗳️"
  },
  {
    "id": "official-results",
    "emoji": "📊"
  },
  {
    "id": "president-consults",
    "emoji": "🤝"
  },
  {
    "id": "forming-coalition",
    "emoji": "🧩"
  },
  {
    "id": "confidence-vote",
    "emoji": "✅"
  }
];

export interface GuideFactCore {
  id: string;
  emoji: string;
  sourceUrl: string;
}
export const whyVoteFactsCore: GuideFactCore[] = [
  {
    "id": "close-margins",
    "emoji": "⚖️",
    "sourceUrl": "https://www.bechirot.gov.il/"
  },
  {
    "id": "paid-holiday",
    "emoji": "🏖",
    "sourceUrl": "https://www.bechirot.gov.il/"
  },
  {
    "id": "double-envelopes",
    "emoji": "✉️",
    "sourceUrl": "https://www.bechirot.gov.il/"
  }
];

export const stationFactsCore: Record<string, { emoji: string; sourceUrl: string }> = {
  "ballotLetters": {
    "emoji": "💡",
    "sourceUrl": "https://www.bechirot.gov.il/"
  },
  "wastedVotes": {
    "emoji": "🎈",
    "sourceUrl": "https://www.bechirot.gov.il/"
  },
  "directElection": {
    "emoji": "😯",
    "sourceUrl": "https://main.knesset.gov.il/"
  }
};

export const VOTES_PER_SEAT_APPROX = "40,000";
export const THRESHOLD_PERCENT = "3.25%";
export const MAGIC_NUMBER = 61;
export const TOTAL_SEATS = 120;
