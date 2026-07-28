---
name: bilingual-feature
description: Multi-locale development workflow for this elections site (currently Hebrew RTL + English LTR, architected for more). Use this skill EVERY time you implement or modify a feature, page, component, UI text, quiz/party/topic data, styling, or animation — even if the request mentions only one language or doesn't mention languages at all. It ensures the change ships correctly in every locale registered in `src/i18n/config.ts` so no change lands in one locale only.
---

# Bilingual Feature Development

This site serves every locale registered in `src/i18n/config.ts` from one
codebase — today that's Hebrew (default, `/`, RTL) and English (`/en`, LTR),
with Arabic (RTL) anticipated as a future addition. A feature that works in
only one locale is a regression, not a smaller feature — every user-facing
change must land in **all registered locales** in the same commit. This skill
exists so a request phrased in Hebrew ("תוסיף כפתור...") still produces an
English-complete, LTR-correct result without being asked.

Never write `locale === "he"` (or `"en"`) to decide direction or behavior.
Always go through the registry (`dirFor(locale)`, `isLocale()`,
`locales`/`defaultLocale` from `@/i18n/config`) — that's what makes adding a
locale later a registry entry plus content files, not a rewrite.

## Infrastructure map

- **Registry** — `src/i18n/config.ts`: `Locale` type, `locales` array
  (`code`, `dir`, `label`, `ogLocale`, `isDefault`), `defaultLocale`,
  `isLocale()`, `dirFor()`, `ogLocaleFor()`, `pathWithoutLocale()`,
  `localizedPath()`. This is the only file where a bare locale-code literal
  belongs outside dictionary/data files.
- **Routing** — pages live under `src/app/[lang]/…`; `src/proxy.ts` rewrites
  bare paths to the default locale internally (never redirects) and passes
  non-default prefixes (`/en/...`) through untouched.
- **Internal links** — use `LocalizedLink` (`src/components/LocalizedLink.tsx`)
  instead of `next/link`'s `Link` for any same-site link built from a bare
  path (`"/quiz"`, `` `/parties/${id}` ``). This routing is hand-rolled (no
  Next.js built-in i18n config), so a plain `Link` never carries the current
  locale forward — it's an easy silent bug (clicking a link from `/en/...`
  bounces back to the default locale) that has bitten this codebase before.
  If you're inside a server component that already has `lang`, `locale`, or
  `dir` in scope and don't need the hook, building the href via
  `localizedPath()` directly is fine too.
- **UI strings** — `src/dictionaries/{locale}.json`, loaded via
  `getDictionary(locale)` (server-only) and distributed through
  `DictionaryProvider`/`useDictionary()` (`src/i18n/{dictionaries,
  DictionaryProvider}.tsx`). Client components call `useDictionary()` to get
  `{ dict, locale, dir }` — never import a dictionary file directly.
- **Content data** — every domain (`questions`, `parties`, `hotTopics`,
  `counterArguments`, `electionGuide`, `quickStanceLabels`, `likert`,
  `platformTopics`) lives at `src/data/{domain}/{core,{locale}}.ts` +
  `index.ts`: `core.ts` holds locale-invariant ids/numbers/colors, one file
  per locale holds its translated text, and `index.ts` exports
  `getX(locale)`, which merges core + text by id and **throws on a missing
  id** — a missing translation is a runtime error, not a silent blank.
- **Page metadata** — `alternatesFor(lang, barePath)` (`src/i18n/metadata.ts`)
  builds `{ canonical, languages }` for every registered locale; use it for
  every page's `alternates` instead of a hardcoded `{ canonical: "/x" }`.
- **Coverage test** — `src/data/__tests__/locale-coverage.test.ts` asserts
  every core id has text in every registered locale. Run it
  (`npx vitest run`) after adding or editing content data.

## The rules

### 1. Text

- No hardcoded user-facing strings in components. Every string gets a key in
  **every** locale's dictionary file in the same edit — a missing key in one
  locale is a silent gap in that locale, so never leave one "for later".
- Translate meaning, not words. Political terminology must use the accepted
  English terms (e.g. "judicial overhaul", "Haredi conscription", "West Bank
  sovereignty"), not literal renderings. If unsure of the accepted term,
  check how major English-language Israeli outlets phrase it.
- Ballot letters stay in Hebrew in every locale (they are Hebrew on the
  physical ballot); other locales explain them rather than transliterate them.
- A person's name (e.g. an About-page bio) is translated/transliterated text
  like any other string — put it in the dictionary, don't hardcode it once
  and reuse it across locales (this was a real bug: builder names on the
  About page stayed in Hebrew script on the English page until fixed).
- Dates and numbers go through `Intl.DateTimeFormat` / `Intl.NumberFormat`
  with the current locale — no manual formatting.

### 2. Data

- New questions/parties/topics: shared fields (id, stance numbers, weights,
  category) go in `core.ts`; every text field is added to **every** locale's
  file. IDs are locale-independent and permanent — id-keyed lookups
  (calculator stance tables, coalition-builder state, etc.) break in every
  locale if an id is renamed or removed after shipping.
- Run `npx vitest run` after any content-data change — the coverage test
  turns a missed translation into a failing test instead of a silent gap.

### 3. Layout — logical properties only

Direction flips automatically via `dir`, but only if styles are
direction-agnostic. Never use physical direction classes for layout:

| Don't (physical)              | Do (logical)                  |
|--------------------------------|--------------------------------|
| `ml-` / `mr-`                  | `ms-` / `me-`                  |
| `pl-` / `pr-`                  | `ps-` / `pe-`                  |
| `left-` / `right-`             | `start-` / `end-`              |
| `text-left` / `text-right`     | `text-start` / `text-end`      |
| `rounded-l-*` / `rounded-r-*`  | `rounded-s-*` / `rounded-e-*`  |
| `border-l-*` / `border-r-*`    | `border-s-*` / `border-e-*`    |
| `bg-gradient-to-l` / `-to-r`   | `dir === "rtl" ? "...to-l" : "...to-r"` (no logical Tailwind equivalent — branch on `dir` from `useDictionary()`) |

Physical classes are allowed only for things that are genuinely physical and
identical in both directions (e.g. a decorative illustration, a centered
absolute overlay via `left-1/2 -translate-x-1/2`). When you must use one, add
a brief comment saying why it's direction-independent.

CSS-only animations (`@keyframes` in `globals.css`, not framer-motion) can't
read `dir` directly in a media-query sense, but `:dir(ltr)`/`:dir(rtl)` CSS
selectors do work — see `--drawer-offscreen-x`/`--nav-item-offset-x` in
`globals.css` for the pattern: define the physical value as a custom property
at `:root`, override it under `:dir(ltr)`, and reference the property (never
a literal `translateX(100%)`) inside the keyframe.

### 4. Direction-sensitive behavior

- "Forward" points left in Hebrew/RTL and right in English/LTR. Never place
  a raw `ChevronLeft`/`ArrowLeft` for a forward-pointing CTA — use
  `ChevronRight` with `className="rtl:rotate-180"` (Tailwind's `rtl:` variant
  reads the ambient `dir` with no JS needed). "Back" links are the mirror
  image: `ChevronLeft` with `rtl:rotate-180`.
- A hover/tap "nudge" toward the forward direction (e.g.
  `group-hover:-translate-x-1`) is direction-sensitive too — derive the sign
  from `dir`, e.g. `dir === "rtl" ? "group-hover:-translate-x-1" :
  "group-hover:translate-x-1"`. Don't leave it hardcoded to one direction.
- framer-motion animations with horizontal movement (`x` offsets, slide
  enter/exit, a positional narrative like "moves through a door" or "bounces
  back") must sign-flip the `x` values based on `dir`, e.g.
  `const sign = dir === "rtl" ? -1 : 1` multiplied into every keyframe. It is
  not enough to destructure `dir` and forget to use it — that shipped as a
  real bug once (`ThresholdDoor`'s accept/reject animation looked backwards
  in RTL for a full PR cycle because `dir` was read but never applied).
- Swipe/drag gestures and carousel order follow reading direction.

### 5. Text expansion

English runs ~20–30% longer than Hebrew (and other locales will have their
own ratio). Any layout that is width- or height-constrained (the one-screen
mobile homepage, buttons, badges, cards with line clamps) must be checked
with the real translated strings, not assumed.

## Self-check before finishing

Run on your changed files (not the whole repo):

```bash
git diff --name-only | xargs grep -nE '\b(ml|mr|pl|pr)-[0-9]|text-(left|right)\b|\b(left|right)-[0-9]|rounded-[lr]-|border-[lr]-|bg-gradient-to-[lr]\b' -- 2>/dev/null
```

Any hit is either a bug or needs a "why physical is correct here" comment.

Then check for hardcoded string literals (any script) added outside
dictionary/data-locale files — adjust the character class for the locale
you're working in (below catches Hebrew; add Arabic's `؀-ۿ` etc.
once that locale exists):

```bash
git diff -U0 -- 'src/**/*.tsx' 'src/**/*.ts' ':!src/dictionaries/*' ':!src/data/*' | grep -nP '^\+.*[\x{0590}-\x{05FF}]'
```

Comments are fine; JSX/string literals and `title`/`alt`/`aria-label` values
are not — every one of those must resolve through `dict`.

Also check that every new `<Link href="/...">` uses `LocalizedLink`, not
`next/link` directly:

```bash
git diff --name-only | xargs grep -nE 'from "next/link"' 2>/dev/null
```

A hit is fine only if every href in that file is external or already
locale-prefixed — for a bare internal path, it's a bug.

## Verification

If the change is visually observable, verify in the browser before reporting
done: every registered locale, mobile (375px) and desktop widths. Confirm:
correct language everywhere (no stray text from another locale), mirrored
layout looks right, forward/back arrows point the correct way, internal
navigation stays in the current locale (click through, don't just check the
`href` string), nothing overflows or wraps badly, and any positional
animation (slide-ins, "moves through/bounces off" narratives) reads correctly
in every direction. Screenshot the result in each locale you touched.

## Adding a new locale (e.g. Arabic)

1. Add one entry to `locales` in `src/i18n/config.ts` (code, `dir`, `label`,
   `ogLocale`). This alone makes `/{code}/*` routable.
2. Add `src/dictionaries/{code}.json` (same shape as the existing files —
   copy one as a template and translate every value) and `{code}.ts` under
   every `src/data/{domain}/` directory.
3. Run `npx vitest run` — the coverage test will fail on anything missed.
4. Do **not** assume RTL-ness (or anything else) transfers correctly just
   because Arabic is RTL like Hebrew:
   - **Fonts**: none of this site's fonts (Heebo, Rubik, Secular One) have
     Arabic glyphs. Pick and wire up a font with Arabic coverage before
     anything renders correctly — don't reuse the Hebrew font stack blind.
   - **The OG image route's bidi workaround does not generalize.**
     `applyRtlWorkaround()` in `src/app/api/og/route.tsx` is a Hebrew-specific
     hack (word/letter reversal to compensate for satori's lack of bidi
     support) and is explicitly gated to `locale === "he"`. Arabic needs
     contextual letter-shaping (a glyph's form depends on its neighbors) on
     top of bidi reordering — this is unsolved and needs its own
     implementation and visual verification, not a copy of the Hebrew path.
   - Re-verify every "genuine positional metaphor" animation (the kind
     covered in Direction-sensitive behavior above) visually in the new
     locale — the sign-flip logic should already generalize since it derives
     from `dir` rather than a hardcoded locale check, but confirm it visually
     rather than assuming.
