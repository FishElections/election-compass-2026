import { describe, expect, test } from "vitest";
import { partiesCore } from "@/data/parties/core";
import {
  CANDIDATE_LISTS_CHECKED_ON,
  TOP_PLACES,
  WOMEN_SOURCE,
  womenRepresentation,
} from "@/data/candidateLists/core";
import { candidateLinks, wikipediaLinks } from "@/data/candidateLists/links";
import { candidateListsCore } from "@/data/candidateLists/parties/registry";
import he from "@/dictionaries/he.json";
import en from "@/dictionaries/en.json";
import ar from "@/dictionaries/ar.json";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const partyIds = partiesCore.map((p) => p.id).sort();

/**
 * The candidate lists are copied from the Central Elections Committee and the
 * women figures from IDI. These checks fail the build on a missing list, a
 * source off gov.il / idi.org.il, or a candidate link off the party's site.
 */
describe("candidate lists", () => {
  test("every party on the site has exactly one official list", () => {
    expect(Object.keys(candidateListsCore).sort()).toEqual(partyIds);
  });

  test("every list cites its committee page and has valid dates", () => {
    for (const [id, list] of Object.entries(candidateListsCore)) {
      expect(list.sourceUrl, id).toMatch(/^https:\/\/www\.gov\.il\/he\/pages\/[\w-]+$/);
      expect(list.published, id).toMatch(ISO);
      expect(list.updated, id).toMatch(ISO);
      expect(list.published <= list.updated, id).toBe(true);
      expect(list.updated <= CANDIDATE_LISTS_CHECKED_ON, id).toBe(true);
      expect(list.names.length, id).toBeGreaterThan(0);
      for (const name of list.names) expect(name.trim(), id).toBe(name);
    }
  });

  test("every party has an IDI women figure in range", () => {
    expect(WOMEN_SOURCE.url).toMatch(/^https:\/\/www\.idi\.org\.il\//);
    expect(Object.keys(womenRepresentation).sort()).toEqual(partyIds);
    for (const [id, w] of Object.entries(womenRepresentation)) {
      expect(w.realisticPlaces, id).toBeGreaterThanOrEqual(4);
      expect(w.womenPercent, id).toBeGreaterThanOrEqual(0);
      expect(w.womenPercent, id).toBeLessThanOrEqual(100);
    }
  });

  test("candidate links are top-20 only and on the party's own site", () => {
    const banned = /wikipedia\.org|facebook\.com|x\.com|twitter\.com|instagram\.com|tiktok\.com|youtube\.com|linkedin\.com|knesset\.gov\.il/;
    for (const [id, links] of Object.entries(candidateLinks)) {
      const list = candidateListsCore[id];
      expect(list, id).toBeDefined();
      expect(links.officialHosts.length, id).toBeGreaterThan(0);
      for (const [place, url] of Object.entries(links.byPlace)) {
        const n = Number(place);
        expect(n >= 1 && n <= Math.min(TOP_PLACES, list.names.length), `${id} #${place}`).toBe(true);
        const host = new URL(url).hostname;
        expect(url, `${id} #${place}`).toMatch(/^https:\/\//);
        expect(banned.test(host), `${id} #${place}`).toBe(false);
        expect(links.officialHosts.includes(host), `${id} #${place}: ${host}`).toBe(true);
      }
    }
  });

  test("Wikipedia is used only where the party's site has no page", () => {
    for (const [id, byPlace] of Object.entries(wikipediaLinks)) {
      const list = candidateListsCore[id];
      expect(list, id).toBeDefined();
      for (const [place, url] of Object.entries(byPlace)) {
        const n = Number(place);
        expect(n >= 1 && n <= Math.min(TOP_PLACES, list.names.length), `${id} #${place}`).toBe(true);
        expect(url, `${id} #${place}`).toMatch(/^https:\/\/he\.wikipedia\.org\/wiki\/[^#?]+$/);
        expect(candidateLinks[id]?.byPlace[n], `${id} #${place} has a party page`).toBeUndefined();
      }
    }
  });

  test("the section's strings exist in every locale", () => {
    const keys = Object.keys(he.candidateList).sort();
    expect(Object.keys(en.candidateList).sort()).toEqual(keys);
    expect(Object.keys(ar.candidateList).sort()).toEqual(keys);
    for (const dict of [he, en, ar]) {
      expect(dict.candidateList.womenText).toContain("{source}");
    }
  });
});
