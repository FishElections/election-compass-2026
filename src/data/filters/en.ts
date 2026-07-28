import { FilterLabels } from "./index";

export const filterLabelsEn: FilterLabels = {
  sectors: {
    "arab": "An Arab party",
    "jewish": "A Jewish party",
    "haredi": "A Haredi party",
    "religious-zionist": "A Religious-Zionist party",
    "islamist": "An Islamist party",
    "non-religious": "A non-religious party",
  },
  bloc: {
    any: "Doesn't matter to me",
    anti: "Only parties that won't back Netanyahu",
    pro: "Only parties that will back Netanyahu",
  },
  size: {
    any: "Doesn't matter to me",
    large: "A large party that could lead a government",
    small: "A small party with a sharp agenda",
  },
  exclusionReasons: {
    sector: "A sector you filtered out",
    bloc: "Doesn't match your bloc choice",
    threshold: "Below the electoral threshold",
  },
  notes: {
    "below-threshold": "Below the electoral threshold in polls",
    "near-threshold": "Close to the electoral threshold",
    large: "Large party",
    small: "Small party",
  },

  pollSource: {
    "channel13": "Channel 13 News",
  },
};
