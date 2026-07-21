export type CategoryId =
  | "security"
  | "economy"
  | "religion_state"
  | "judiciary"
  | "society";

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export type PlatformTopicKey =
  | "security"
  | "economy"
  | "justice"
  | "religionAndState"
  | "society";

export interface PlatformTopic {
  topicKey: PlatformTopicKey;
  topicName: string;
  summary: string;
  bulletPoints: string[];
}

export interface Party {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  leader: string;
  description: string;
  platform: PlatformTopic[];
}

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  isShort: boolean;
}

/** -2 = נגד מאוד, -1 = נגד, 0 = ניטרלי, 1 = בעד, 2 = בעד מאוד */
export type StanceValue = -2 | -1 | 0 | 1 | 2;

export interface PartyStance {
  partyId: string;
  questionId: string;
  stanceValue: StanceValue;
}

export interface LikertOption {
  value: StanceValue;
  label: string;
}

export type QuizMode = "short" | "long";

export type UserAnswers = Record<string, StanceValue | undefined>;

export interface PartyResult {
  party: Party;
  matchPercentage: number;
  answeredCount: number;
}
