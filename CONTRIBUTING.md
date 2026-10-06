# Contributing

Thanks for your interest in improving **מצפן בחירות 2026** (Election Compass 2026)!
This is a non-partisan civic tool, so correctness and neutrality matter as much
as code quality.

> בעברית בקצרה: הפרויקט פתוח לתרומות במודל fork & pull. כל אחד יכול לפתוח
> Pull Request; רק בעלי הקוד (איתי ואוהד) מאשרים וממזגים ל-`main`, ומיזוג
> ל-`main` הוא מה שמפרסם לאוויר. הצעדים המלאים למטה (באנגלית).

## How contributions work (fork & pull)

Anyone can open a pull request — you do **not** need to be added to the repo.
Only the code owners (**@itayeylath** and **@ohadoo20**) can approve and merge
into `main`, and merging into `main` is what deploys to production.

1. **Fork** this repository to your own GitHub account.
2. **Clone your fork** and install dependencies:
   ```bash
   git clone https://github.com/<your-username>/election-compass-2026.git
   cd election-compass-2026
   npm install
   ```
   (Optional, to keep your fork current:
   `git remote add upstream https://github.com/FishElections/election-compass-2026.git`)
3. **Read [`AGENTS.md`](./AGENTS.md) first.** This Next.js version has breaking
   changes from what you may expect — check the bundled docs before writing code.
4. Create a branch off `main`: `git checkout -b feat/short-description`
   (use `feat/…`, `fix/…`, `docs/…`, `chore/…`).
5. Make your change.

## Before you push

Every change must pass these locally:

```bash
npx tsc --noEmit            # types
npx eslint src --max-warnings=0
npm test                    # vitest
npm run build               # production build
```

Please also:

- **Ship every user-facing change in all three languages — Hebrew, English, and
  Arabic.** UI strings live in `src/dictionaries/{he,en,ar}.json`; content lives
  in `src/data/<domain>/{he,en,ar}.ts`. A change that lands in only one language
  is considered incomplete. See `.claude/skills/bilingual-feature` for the
  conventions (logical CSS properties for RTL/LTR, `Intl` for numbers/dates, etc.).
- **Keep it neutral and sourced.** Political stance data and claims should be
  accurate and, where relevant, cite a public source — this tool's credibility
  depends on it.
- **Never commit secrets or environment values.**

## Opening the pull request

1. Push your branch to **your fork**.
2. Open a PR against **`FishElections:main`** with a clear description of *what*
   changed and *why*. Fill in the PR checklist.
3. A **Vercel preview** builds automatically on the PR so reviewers can click
   through your change.
4. **@itayeylath** or **@ohadoo20** will review. Once approved and merged, it
   deploys. You won't be able to merge your own PR — that's by design.

Small, focused PRs are reviewed fastest. For a large change, it's worth opening
an issue first to align on the approach.
