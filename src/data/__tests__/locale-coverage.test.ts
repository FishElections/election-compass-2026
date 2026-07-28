import { describe, expect, test } from "vitest";
import { locales } from "@/i18n/config";
import { getCategories, getQuestions } from "@/data/questions";
import { getParties } from "@/data/parties";
import { getHotTopics, getCategoryLabels, topicCategories } from "@/data/hotTopics";
import { getCounterArguments } from "@/data/counterArguments";
import { quickStanceTopicIds, getQuickStanceLabels } from "@/data/quickStanceLabels";
import { getLikertOptions } from "@/data/likert";
import { getPlatformTopics } from "@/data/platformTopics";
import { getFilterLabels } from "@/data/filters";
import {
  blocOptions,
  exclusionReasons,
  partyNoteIds,
  partySectors,
  sizeOptions,
} from "@/data/filters/core";
import {
  getToyParties,
  getDemoSlips,
  getFormationTimeline,
  getWhyVoteFacts,
  getStationFacts,
} from "@/data/electionGuide";
import { categoriesCore, questionsCore } from "@/data/questions/core";
import { partiesCore } from "@/data/parties/core";
import { topicsCore } from "@/data/hotTopics/core";
import { counterArgumentsCore } from "@/data/counterArguments/core";

/**
 * Fails the build the moment a locale is registered in src/i18n/config.ts
 * before its data/dictionary files are fully populated — turning "translator
 * forgot an entry" into a CI failure instead of a silent gap in production.
 */
for (const { code } of locales) {
  describe(`locale coverage: ${code}`, () => {
    test("every category has text", () => {
      expect(getCategories(code)).toHaveLength(categoriesCore.length);
    });
    test("every question has text", () => {
      expect(getQuestions(code)).toHaveLength(questionsCore.length);
    });
    test("every party has text", () => {
      expect(getParties(code)).toHaveLength(partiesCore.length);
    });
    test("every hot topic has text", () => {
      expect(getHotTopics(code)).toHaveLength(topicsCore.length);
    });
    test("every hot-topic category has a label", () => {
      const labels = getCategoryLabels(code);
      for (const cat of topicCategories) {
        expect(labels[cat]).toBeTruthy();
      }
    });
    test("every counter-argument has text", () => {
      expect(getCounterArguments(code)).toHaveLength(counterArgumentsCore.length);
    });
    test("every quick-stance topic has labels", () => {
      const labels = getQuickStanceLabels(code);
      for (const id of quickStanceTopicIds) {
        expect(labels[id]).toBeTruthy();
      }
    });
    test("every likert option has a label", () => {
      expect(getLikertOptions(code)).toHaveLength(5);
    });
    test("every filter option has a label", () => {
      const labels = getFilterLabels(code);
      for (const sector of partySectors) expect(labels.sectors[sector]).toBeTruthy();
      for (const option of blocOptions) expect(labels.bloc[option]).toBeTruthy();
      for (const option of sizeOptions) expect(labels.size[option]).toBeTruthy();
      for (const reason of exclusionReasons) {
        expect(labels.exclusionReasons[reason]).toBeTruthy();
      }
      for (const note of partyNoteIds) expect(labels.notes[note]).toBeTruthy();
      expect(labels.pollSource.channel13).toBeTruthy();
    });
    test("every platform topic has a label", () => {
      const topics = getPlatformTopics(code);
      expect(topics.every((t) => t.label)).toBe(true);
    });
    test("election guide content is fully translated", () => {
      expect(getToyParties(code).every((p) => p.name)).toBe(true);
      expect(getDemoSlips(code).every((s) => s.party)).toBe(true);
      expect(getFormationTimeline(code).every((s) => s.title && s.text)).toBe(true);
      expect(getWhyVoteFacts(code).every((f) => f.lead && f.text)).toBe(true);
      const stationFacts = getStationFacts(code);
      expect(Object.values(stationFacts).every((f) => f.lead && f.text)).toBe(true);
    });
  });
}
