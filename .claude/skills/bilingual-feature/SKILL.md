---
name: bilingual-feature
description: Bilingual (Hebrew RTL + English LTR) development workflow for this elections site. Use this skill EVERY time you implement or modify a feature, page, component, UI text, quiz/party/topic data, styling, or animation — even if the request mentions only one language or doesn't mention languages at all. It ensures the change ships correctly in both Hebrew (/, RTL) and English (/en, LTR) so no change lands in one locale only.
---

# Bilingual Feature Development

This site serves two locales from one codebase: Hebrew (default, `/`, RTL) and
English (`/en`, LTR). A feature that works in only one of them is a regression,
not a smaller feature — every user-facing change must land in both in the same
commit. This skill exists so a request phrased in Hebrew ("תוסיף כפתור...")
still produces an English-complete, LTR-correct result without being asked.

## Infrastructure map

- Routes live under `src/app/[lang]/…`; `proxy.ts` rewrites `/` → `/he` internally.
- `dir` is derived from the locale in the root layout — never hardcode `dir` elsewhere.
- UI strings: `src/dictionaries/he.json` + `src/dictionaries/en.json`, loaded via
  `getDictionary(locale)` and passed down (client components receive the dict as
  props/context — they must not import a dictionary directly).
- Content data: locale-split files (`questions.he.ts` / `questions.en.ts`, same for
  parties, hotTopics, counterArguments, likert, quickStanceLabels, platformTopics),
  accessed through a `getX(locale)` accessor. Shared core (IDs, stance values,
  weights, categories, colors) lives once in a shared file — never duplicated per locale.

**If this infrastructure does not exist yet** (the i18n migration hasn't landed):
don't invent a partial version of it inside your feature. Instead, keep all new
user-facing strings in one exported constant at the top of the file (not inline in
JSX), use logical CSS classes as described below, and note in your summary that the
strings are pending dictionary extraction. This keeps the future migration mechanical.

## The rules

### 1. Text

- No hardcoded user-facing strings in components. Every string gets a key in
  **both** `he.json` and `en.json` in the same edit — the build/dev experience of a
  missing English key is a silent English gap, so never leave one "for later".
- Translate meaning, not words. Political terminology must use the accepted English
  terms (e.g. "judicial overhaul", "Haredi conscription", "West Bank sovereignty"),
  not literal renderings. If unsure of the accepted term, check how major
  English-language Israeli outlets phrase it.
- Ballot letters stay in Hebrew in both locales (they are Hebrew on the physical
  ballot); the English UI explains them rather than transliterates them.
- Dates and numbers go through `Intl.DateTimeFormat` / `Intl.NumberFormat` with the
  current locale — no manual formatting.

### 2. Data

- New questions/parties/topics: shared fields (id, stance numbers, weights,
  category) go in the shared core; every text field is added to **both** locale
  files. IDs are locale-independent and permanent — the zustand store persists
  answers by ID, so changing an ID breaks saved results in both languages.

### 3. Layout — logical properties only

Direction flips automatically via `dir`, but only if styles are direction-agnostic.
Never use physical direction classes for layout:

| Don't (physical)          | Do (logical)               |
|---------------------------|----------------------------|
| `ml-` / `mr-`             | `ms-` / `me-`              |
| `pl-` / `pr-`             | `ps-` / `pe-`              |
| `left-` / `right-`        | `start-` / `end-`          |
| `text-left` / `text-right`| `text-start` / `text-end`  |
| `rounded-l-*` / `rounded-r-*` | `rounded-s-*` / `rounded-e-*` |
| `border-l-*` / `border-r-*`   | `border-s-*` / `border-e-*`   |

Physical classes are allowed only for things that are genuinely physical and
identical in both directions (e.g. the flag graphic, a centered absolute overlay).
When you must use one, add a brief comment saying why it's direction-independent.

### 4. Direction-sensitive behavior

- "Forward" points left in Hebrew and right in English. Never place a raw
  `ArrowLeft`/`ChevronRight` for navigation — use the shared directional-icon
  helper if one exists, otherwise `rtl:rotate-180` on the icon.
- framer-motion animations with horizontal movement (`x` offsets, slide
  enter/exit): the sign must flip with direction. Derive it from the locale/dir,
  don't hardcode.
- Swipe/drag gestures and carousel order follow reading direction.

### 5. Text expansion

English runs ~20–30% longer than Hebrew. Any layout that is width- or
height-constrained (the one-screen mobile homepage, buttons, badges, cards with
line clamps) must be checked with the real English strings, not assumed.

## Self-check before finishing

Run on your changed files (not the whole repo):

```bash
git diff --name-only | xargs grep -nE '\b(ml|mr|pl|pr)-[0-9]|text-(left|right)\b|\b(left|right)-[0-9]|rounded-[lr]-|border-[lr]-' -- 2>/dev/null
```

Any hit is either a bug or needs a "why physical is correct here" comment.

Then check for Hebrew string literals added outside dictionary/data-locale files:

```bash
git diff -U0 -- 'src/**/*.tsx' 'src/**/*.ts' ':!src/dictionaries/*' ':!src/data/*' | grep -nE '^\+.*[א-ת]'
```

Comments in Hebrew are fine; JSX/string literals are not.

## Verification

If the change is visually observable, verify in the browser before reporting done:
both locales (`/…` and `/en/…`), mobile (375px) and desktop widths — four passes.
Confirm: correct language everywhere (no stray Hebrew in English or vice versa),
mirrored layout looks right, forward-arrows point the correct way, nothing
overflows or wraps badly in English. Screenshot the result in both locales.
