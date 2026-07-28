# Analytics — what we collect and how to read it

Google Analytics 4 (GA4). The tag is injected in `src/app/[lang]/layout.tsx` and
only loads when the `GA_ID` env var is set (Production: `G-295BD1LYBF`). All
custom events go through the tiny `trackEvent(name, params)` helper in
`src/lib/analytics.ts`, which is a no-op when GA isn't configured or during SSR.

Nothing personally identifying is ever sent to GA (no emails, no answers text —
only anonymous aggregates like which party came out on top).

**The results filters are deliberately reported as counts only.** `quiz_filters`
sends *how many* sectors were filtered out and *whether* the bloc/size/threshold
filters were used — never *which* sector or *which* bloc. Those answers are the
closest thing this site holds to a declaration of political identity, and they
stay on the device. This costs us genuinely interesting data; it is still the
right call for a public tool. Filter answers likewise never enter the share URL.

## Events

| Event | Fires when | Parameters |
|---|---|---|
| `page_view` | every page (GA automatic) | `page_location`, `language` |
| `quiz_start` | a quiz run begins | `mode`: `"short"` \| `"long"` |
| `quiz_resume` | user resumes a saved quiz | `mode`, `answered` |
| `quiz_complete` | results are shown | `top_party` (id of the #1 match), `match` (%), `answered` |
| `topic_priority_step` | the optional weighting step | `skipped`, `weightedCount`, `mode` |
| `quiz_filters` | the optional results-filter step | `skipped`, `sectorCount`, `bloc` (bool), `size` (bool), `threshold` (bool), `mode` |
| `share` | a result is shared | `method`: `whatsapp`\|`native`\|`copy`, `party`, `match` |
| `guide_view` | the how-it-works guide opens | — |
| `guide_station` | a guide station scrolls into view | `station` (index) |
| `guide_coalition_built` | the coalition toy reaches a majority | `seats` |
| `guide_cta_quiz` | guide → quiz CTA clicked | — |
| `linkedin_click` | a builder's LinkedIn is opened (About) | `person`: `"ohad"` \| `"itay"` |

## One-time GA setup: register custom dimensions

GA4 will **not** show a custom parameter (`mode`, `top_party`, `person`, …) in
reports until it's registered as a **custom dimension**. Do this once:

**Admin → Data display → Custom definitions → Custom dimensions → Create**, and
add each as **event-scoped**, with the *Event parameter* matching the name exactly:

- `mode`, `top_party`, `person`, `method`, `party`, `station`, `answered`, `match`

(GA starts collecting a dimension only from when you register it, so do this early.)

## The reports we care about

Use **Explore** (Reports → Explore → blank) for these. Set the date range to
**on/after launch** (see "Starting fresh" below).

### How many started the quiz — short vs long  (ג)
- Technique: **Free form**. Dimension: `mode`. Metric: **Event count**.
  Filter: `Event name exactly quiz_start`.
- Result: two rows, `short` and `long`, with their counts.

### Which party came out #1, and for how many people  (ד)
- Free form. Dimension: `top_party`. Metric: **Event count**.
  Filter: `Event name exactly quiz_complete`.
- Result: one row per party id, ranked by how many users got it as their top match.

### LinkedIn clicks — and whose  (ה)
- Free form. Dimension: `person`. Metric: **Event count**.
  Filter: `Event name exactly linkedin_click`.
- Result: `ohad` vs `itay` click counts.

## Starting fresh (א)

GA4 can't instantly wipe historical data, so pick one:
1. **Simplest — analyze from a start date.** Note the launch date and set every
   report's date range to on/after it; ignore earlier test traffic.
2. **Cleanest — a new GA4 property.** Create a fresh property, swap its
   Measurement ID into the `GA_ID` env var in Vercel, and redeploy. Old data
   stays in the old property, new data starts empty.
3. **Deletion request** (Admin → Data deletion requests) removes events over a
   date range but takes up to ~7 days and is meant for privacy, not resets.

Recommended: **#1** now (zero risk), and #2 only if you want a truly empty slate.

## Testing events

- **Realtime** (Reports → Realtime) shows events within seconds.
- **DebugView** (Admin → DebugView) shows event params live — open the site with
  the GA Debugger extension, take the quiz, and watch `quiz_start`,
  `quiz_complete` (with `top_party`), and `linkedin_click` appear.
