# Track record: methodology

**Version:** 1.2 (2026-10-19; v1.0 approved 2026-10-17, see §8 for changes)
**Applies to:** key achievements and the leader's legal record, for veteran parties.
**Status:** once approved, this file is committed *before* any research starts. From that commit on, the rules are frozen.

---

## 0. Why this document exists

This site's value depends on being objective. These two features are among
the most open to "the site is biased" criticism. The only defense is to
decide every rule **before** looking at any party's data, write the rules
down, and apply them identically to every party. If a rule turns out to be
wrong, it is changed here, in a new version, and re-applied to **all** parties
(see §8). It is never adjusted for one party.

## 1. Principles

1. **Grounded.** Every statement shown to visitors is backed by a public source
   with a link and a date. No opinions, no inferences presented as facts.
2. **When in doubt, "Insufficient data".** If a fact cannot be confirmed under
   the rules below, it is left out, or the section shows "Insufficient data".
   Nothing is guessed.
3. **Static snapshot.** All data is researched once, committed to the repo and
   shown identically to every visitor. Nothing is fetched or generated at page
   load, nothing varies by visitor, and nothing updates itself. Each party
   shows the date its data was collected ("as of").
4. **Deterministic.** Given the same data, the same rules always produce the
   same result. Veteran status is computed by code from the stored data, not
   entered by hand.
5. **Neutral presentation.** Factual wording, no evaluative adjectives, and no
   "good/bad" colours (no green/red).
6. **Same rules for everyone.** No party-specific exceptions.
7. **All site languages.** Everything ships in Hebrew, English and Arabic.

## 2. Definitions

### 2.1 Party
An entry in `src/data/parties/core.ts` at the time of the snapshot.

### 2.2 Leader
The person in **position #1 on the party's list submitted to the Central
Elections Committee for the 26th Knesset election**, as published by the
Committee or reported by a source meeting §5. If no such source is found, the
legal-record section for that party is not shown.

### 2.3 Predecessor party (continuity)
Party B is a predecessor of party A only if a source meeting §5 documents
that A continues B through one of these:
- a formal rename of the same registered party,
- a merger in which B joined A,
- a split in which A kept B's name or registration,
- **a joint list:** A is a joint list in which B runs as a member party (v1.1).

Without such a source, B is not a predecessor.

**Joint lists (v1.1).** A joint list inherits a member party's Knesset time
(§2.4) only when an approved source confirms that the member party is part of
the list. Its achievements (§3) include only items led by one of its member
parties, credited to that member party by name.

### 2.4 Veteran party
A party is veteran if it, including documented predecessors, has held Knesset seats
for a **combined total of at least 4 years**. Four years is the length of one
full Knesset term under Basic Law: The Knesset, §8 ("The term of office of the
Knesset shall be four years from the day on which it is elected").
Source: [gov.il, Basic Law: The Knesset](https://www.gov.il/apps/elections/eng/law/BasicLawKnesset_eng.html)

- **Holding seats:** at least one of the party's own members served as an MK,
  elected on a list the party ran on, alone or as part of a joint list.
- **Measuring time:** for each Knesset, count from the day the party's members
  took their seats until the day that Knesset's tenure ended (the next Knesset
  was sworn in). For the current Knesset, count until the snapshot date. Each
  period needs a source.
- A combined time we cannot source means the party is treated as **not veteran**.

Non-veteran parties show "Not applicable: the party has not yet served a full
Knesset term".

## 3. Key achievements

An achievement is a **contribution to the public that can be shown with
facts**. What the party says about itself plays no role. There are three
categories, and the party (or a documented predecessor) must have **led** the
item. **Not enough on its own:** being in the coalition, voting in favor, or
publicly supporting something.

### 3.1 Peace and normalization agreements (always shown)
- **What (v1.2):** any signed treaty or agreement between Israel and another
  state that ends a state of war, or establishes or restores diplomatic
  relations. This includes peace treaties, normalization agreements and
  agreements establishing diplomatic relations with any state.
- **Whose:** the party of the prime minister who led the coalition when it
  was signed. Other coalition parties do not get credit.
- **Always shown:** every such agreement attributed to the party is shown,
  regardless of the limit in §3.4.
- **Source:** the agreement text or an official government publication, or 2
  independent sources (§5).

### 3.2 Major reforms
- **What:** a government decision or national program led by a minister from
  the party, within their ministry.
- **"Major":** an official source (gov.il, the State Comptroller, the Bank of
  Israel, the Central Bureau of Statistics, or the Knesset Research and
  Information Center) documents that it was applied **nationwide** and
  states its **scale** (budget, number of beneficiaries, or units).
- **Impact:** the same evidence test as legislation (§3.3).

### 3.3 Legislation with a demonstrated positive impact
A law qualifies only if **all** of these hold:
1. It passed its final (third) reading, and a party MK initiated it or a
   minister from the party sponsored it as a government bill.
2. **Its own stated goal is identified** from the law's purpose clause or its
   official explanatory notes (דברי הסבר).
3. **Data shows the goal was met:** an independent evaluation shows that a
   measurable indicator of that goal moved in the intended direction after the
   law took effect. The evaluation must come from the State Comptroller, the Bank
   of Israel, Central Bureau of Statistics data, the Knesset Research and
   Information Center, the Israel Democracy Institute, or a peer-reviewed study.
4. **No conflicting evidence:** no source of equal standing reports the
   opposite. If sources conflict, the law is not shown.

"Positive impact" therefore means **it achieved its own stated goal according to
independent data**, not our opinion of the goal. Each law shows its goal, the
indicator, the before and after figures, and the evaluation's source.

### 3.4 Selection
1. **Peace and normalization agreements:** all of them, always.
2. **Reforms and legislation:** the qualifying items, up to 5 in total, newest first.
3. **Nothing qualifies:** the section shows "Insufficient data".

### 3.5 Wording
Each item has its official name, one factual sentence on what it does, the
party's role (signed / led / initiated / sponsored), the date, and the source's
name and link. No evaluative adjectives ("historic", "harmful", etc.); the data
speaks for itself.

## 4. Leader's legal record

Shown in its own section. It is about the leader (§2.2) personally, not the party.

### 4.1 Scope
**Criminal proceedings** against the leader personally, at any time:
investigations, decisions to indict, indictments, trials, verdicts, appeals, plea agreements,
pardons and closures. Included are **closures for any reason**, including
insufficient evidence. **Not included:** civil lawsuits, Knesset Ethics
Committee matters, and proceedings against other party members.

**Jurisdiction (v1.2):** Israeli, international (e.g. the International
Criminal Court) and foreign national proceedings are all included. Every case
is labelled with its jurisdiction ("Israel", "International", or the country's
name).

**Current status not confirmed (v1.2):** a case whose current status cannot be
established from approved sources is still shown, clearly labelled: "Current
status not confirmed. Last confirmed: [status] on [date]."

### 4.2 Open and closed cases
**All** cases are shown, **open and closed, including past ones**, each
separately. They are grouped as "Open proceedings" and "Concluded proceedings".
The section states this explicitly.

### 4.3 Statuses
- **Open:** under investigation · decision to indict, subject to a hearing ·
  indicted / on trial · convicted, appeal pending.
- **Concluded:** convicted (final) · convicted under a plea agreement (final) ·
  acquitted · pardoned · case closed (with the reason as stated by the source) ·
  ended otherwise (as described by the source).
- If a court ruled on **moral turpitude** (קלון), it is shown as part of that
  case.

### 4.4 Wording
- **Open cases** always show: "Presumption of innocence: every person is
  innocent until proven guilty by a final judgment." The same line is shown for a
  conviction still under appeal.
- **Language:** each case is described in the source's wording, with dates and the source.
- **No cases (v1.2):** the section is still shown, with the text "No criminal
  proceedings were found in the sources we checked" and an ⓘ that lists those
  sources. It never says "no proceedings exist", because we cannot prove a negative.

### 4.5 Where legal information comes from
There is no public official registry of criminal proceedings. Israel's criminal
register is closed to the public by law (the Criminal Information and
Rehabilitation of Offenders Law, 2019, in force since July 2022). Each case is
therefore built from public, case-specific sources, in this order of priority:

1. **Court rulings and court decisions.**
2. **Official announcements** by the police, the State Attorney or the
   Attorney General (gov.il).
3. **News reports**, only for a step that no official source covers, and
   then from **2 independent outlets** (§5).

For international and foreign proceedings, the official documents of that
court or prosecutor come first (e.g. the International Criminal Court's own
publications). Otherwise the same 2-independent-outlets rule applies.

Each step of a case (e.g. indictment, verdict) shows **the source's name and a
link**.

## 5. Sources

**Primary (preferred):**
- the Knesset website and legislation database
- gov.il
- the Central Elections Committee's official publications
- the Official Gazette (Reshumot)
- court rulings
- official treaty texts
- the International Criminal Court's own publications (v1.2)

**Evaluation bodies** (for §3.2 and §3.3): the State Comptroller, the Bank of
Israel, the Central Bureau of Statistics, the Knesset Research and Information
Center, the Israel Democracy Institute, and peer-reviewed studies.

**News outlets, used only where the rules allow news:** Kan, Haaretz, Ynet,
The Times of Israel, The Jerusalem Post, Globes, Calcalist, Walla, Maariv, N12
and Israel Hayom.

**The list is closed.** A source that is not on this list is not used. Adding
or removing one is a rule change (§8). This keeps research deterministic:
two people applying these rules would use the same pool of sources.

**Independent** means a different publisher. For example, Ynet and Calcalist
share a publisher, so together they count as one source.

**Never used:** social media posts (anyone's) and blogs. Wikipedia and the
party's own materials are not on the list either, so they are not cited.

**Shown to visitors:** every item shows the source's name (the publisher, e.g.
"Bank of Israel", "Knesset website") and a link to it.

**Stored for every source:** the URL, the date it was accessed, and an archived
copy (web.archive.org) when one can be made. The archived copy protects against
broken links.

## 6. Research and verification process

1. **Research:** one report per party, at `reports/track-record/<party-id>.md`,
   following the existing `reports/stance-verification/` format.
   - **Each row:** the claim, its type, the date, the sources, the archived link, a
     confidence level and a note.
   - **Rejected candidates** are listed too, with the reason.
2. **Verification:** an independent second pass re-checks every row against its
   sources. Rows that do not hold up are removed.
3. **Human review:** the contributor reviews every report before anything enters
   the site.
4. **Data:** only rows that passed all three steps are added to the data files, in all
   languages.
5. **Automatic checks:** tests fail the build if any item lacks a source or
   date, if a non-veteran party has track-record data, or if a translation is
   missing.

## 7. Display rules

- **Neutral colours only.** Each status has text, never colour alone.
- **Every section shows its "as of" date.**
- **Wording for missing data:**
  - Achievements (v1.2): "No achievement met our evidence standard", with an
    ⓘ that states the standard (§3).
  - Legal record (v1.2): see §4.4.
  - "Not applicable": "The party has not yet served a full Knesset term."

## 8. Changing these rules

The rules are frozen at the commit that adds this file. A change needs:
1. a new version number here, with what changed and why,
2. the change re-applied to **every** party, not only the one that prompted it.

### Change log
- **v1.1 (2026-10-18):** joint lists added to §2.3. Why: the rules did not say
  whether a list of existing parties inherits their history, which affects
  Beyachad and the Joint List. Decided by the contributor after the veteran-status
  research (reports/track-record/veteran-status.md) and before any achievement or
  legal research. Applies to every party.
- **v1.2 (2026-10-19):** decided by the contributor after research pass 1.
  - §3.1 now includes every agreement establishing or restoring diplomatic
    relations, not only peace and normalization.
  - §4.1 includes international and foreign proceedings, labelled by
    jurisdiction, and cases whose current status is not confirmed, labelled as such.
  - §4.4 shows the legal section even when no case is found.
  - §7 adds new wording for an empty achievements section.
  - Deputy ministers do not count as ministers (§3.2, unchanged).
  - Applies to every party; pass 2 re-checks all of them.

---

## Appendix: decisions

**Approved by the contributor (2026-10-17):**
- Veteran = at least 4 combined years of seats (§2.4).
- Achievements are public contributions shown by facts, not party claims (§3).
- Coalition-agreement deliverables don't count unless a party office-holder led them.
- Legal scope = criminal proceedings only (§4.1).
- A case whose current status cannot be found is shown, labelled "Current status not confirmed" (changed in v1.2; was "not shown").
- Legal sources: official first, news only as a fallback (§4.5). Source name and link always shown.

- Peace agreements are credited to the party of the prime minister leading the coalition (§3.1).
- Closed source list; social media posts and blogs are never used (§5).

- Reforms must be nationwide, with an officially stated scale, **and** pass the "goal met per data" test used for legislation (§3.2).
- No Arabic-language outlets on the source list (§5).

All decisions are confirmed. Nothing is left open.
