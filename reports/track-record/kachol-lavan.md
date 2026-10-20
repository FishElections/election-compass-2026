# kachol-lavan — track-record research
Snapshot 2026-10-18 · Methodology v1.1 · Researcher: automated pass 1 (to be independently verified)

Scope note for the verifier: the web-search budget for this run ran out before
the legal-record (§4) and legislation-impact (§3.3) searches were done. Those two
sections are therefore **incomplete**, not "checked and empty". See Open issues.

## Leader (#1 on the list)

- **name:** Benny Gantz (בנימין (בני) גנץ)
- **sources:**
  - idi | https://www.idi.org.il/media/32327/כחול-לבן.pdf | 2026-10-18
    A copy, hosted by IDI, of the Central Elections Committee page "הבחירות לכנסת ה-26".
    Header: "כחול לבן" / "רשימת המועמדים הוגשה מטעם מפלגת כחול לבן חוסן לישראל" /
    publication date 08.09.2026. Position 1: "גנץ בנימין". Positions 2–3: "תמנו פנינה (פנחס)", "בלוך גאולה עליזה".
    WebFetch could not read the page text, because it is embedded as images. I downloaded the PDF and rendered page 1 locally to read it.
  - jpost | https://www.jpost.com/israel-election-2026/article-907976 | 2026-10-18
    Dated 2026-09-08: "Second on the list after Gantz is current Blue and White MK Pnina Tameno-Shete."
    It says the party "submitted its list without merging with any other party".
  - times-of-israel | https://www.timesofisrael.com/israels-election-takes-shape-as-38-parties-submit-slates-from-likud-to-joint-list/ | 2026-10-18
    Dated 2026-09-09: "Gantz will remain at the top of the slate."
- **confidence:** high
- **note:** This matches the leader in `src/data/parties/en.ts`. The CEC's own host
  (bechirot.gov.il) did not return readable content (bot challenge / empty shell),
  so the CEC publication is cited through IDI's copy. IDI is an evaluation body on
  the closed list (§5). The verifier may prefer to find the bechirot.gov.il URL and
  cite it as `cec` instead. Per the CEC header, the list was submitted by the
  registered party "כחול לבן חוסן לישראל".

## Peace and normalization agreements

None qualify.

| id | agreement | other state | signed (date) | PM (party) | sources | confidence | notes |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | No Blue and White member served as prime minister. Knesset data for Benny Gantz (knesset \| https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition()?$filter=PersonID%20eq%2030657&$format=json \| 2026-10-18) shows "ראש הממשלה החליפי" (Alternate PM, 35th government, 2020-05-17 to 2021-06-13) and "סגן ראש הממשלה" (Deputy PM, 36th government), but no PM position. Neither of these roles qualifies under §3.1. See Rejected candidates. |

## Major reforms

| id | name | date | led by (minister, ministry) | nationwide evidence | scale (value, unit, source) | stated goal (source) | indicator | before (value, date) | after (value, date) | direction | evaluation source | confidence | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| nefesh-achat | "One Soul" reform for IDF and security-forces disabled veterans (רפורמת "נפש אחת"), Government Decision 981 (החלטת ממשלה מס' 981) | 2021-05-09 | Benny Gantz, Minister of Defense (שר הביטחון), Ministry of Defense. Knesset: Gantz held the post 2021-04-06 to 2021-06-13 (35th govt) and 2021-06-13 to 2022-11-15 (36th), and was an MK in faction 969 "כחול לבן". knesset \| https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition(23685)?$format=json \| 2026-10-18; knesset \| https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition(23611)?$format=json \| 2026-10-18. On his role, State Comptroller: "הורה שר הביטחון דאז להתחיל באופן מיידי בביצוע רפורמה" and "שר הביטחון אישר את עיקרי התוכנית". Maariv, 2021-05-06, quotes Gantz: "ואמשיך להוביל עד ליישום הרפורמה". maariv \| https://www.maariv.co.il/news/military/Article-838789 \| 2026-10-18 | The decision text, as quoted by the State Comptroller, reads "יש לפעול ליישום תוכנית לאומית". In 2022 the Rehabilitation Division handled about 60,000 disabled veterans with 20%+ disability (State Comptroller). | NIS 1.5 billion for 2021–2022, of which NIS 300 million was a one-time budget. state-comptroller \| https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2024/2024.01-74A/2024-74A-401-Nefesh1-Taktzir.docx \| 2026-10-18 | "תוכנית לאומית שמטרתה להביא לשיפור משמעותי של הטיפול והשיקום הניתנים לנכי צה"ל ומערכת הביטחון". The decision also called for "שיפור מיידי באיכות השירות" by the Rehabilitation Division. Both are quoted from Decision 981 in the State Comptroller report (full report below). The decision number and date are confirmed by the explanatory notes of bill P/4462/25: knesset \| https://fs.knesset.gov.il/25/law/25_lst_4254382.pdf \| 2026-10-18 | Number of disability-recognition requests decided per year by the Rehabilitation Division's recognition unit (מספר הבקשות שהתקבלה החלטה בעניינן). Chart 6, report p. 1505. | 3,049 (2020) | 6,219 (2022) | up (in the goal's direction: faster handling of recognition requests) | state-comptroller \| https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2024/2024.01-74A/2024-74A-401-Nefesh1.pdf \| 2026-10-18 (State Comptroller annual report 74A, January 2024, "רפורמת 'נפש אחת' - טיפול משרד הביטחון בנכי צה"ל וכוחות הביטחון - דוח מיוחד") | medium | (1) The report's text says the division "הצליח להגדיל ביותר מפי שניים את מספר התיקים שבעניינם התקבלה החלטה לעומת שנת 2020". The exact figures appear only in chart 6, which I read by rendering the PDF page locally; WebFetch cannot read this Hebrew PDF. (2) Requests submitted also rose, from 2,802 (2020) to 4,215 (2022). (3) **Possible conflict, for the reviewer (§3.3 rule 4):** the same report finds cumulative budget execution of about 30% (NIS 443M of 1.5B), and 14% for the PTSD component. It says the reform "לא הושלמה בשלושה תחומי ליבה" and that this harms the ability to reach the goal. Average satisfaction in 2023 was 53/100, with no baseline given. None of these is an indicator moving in the *opposite* direction, but the reviewer must decide whether they count as conflicting evidence. (4) The indicator measures the service and processing part of the goal, not rehabilitation outcomes. (5) The 2022 figure falls inside Gantz's tenure, which ran until 2022-12-29 per Knesset data. (6) archive: none listed. |

## Legislation

No qualifying item found in this pass.

| id | law (Hebrew name) | final reading date | initiator/sponsor (party role) | Knesset source | stated goal (source) | indicator | before | after | direction | evaluation source | confidence | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — | — | — | Knesset OData lists dozens of laws (StatusID 118) with an initiator who was at some point a Blue and White faction MK. No evaluation-body source (§3.3 rule 3) showing a measured indicator moving after the law took effect was found for any of them. The search budget ran out before a systematic check. See Open issues for leads. |

## Leader's legal record

None found in approved sources. **Caveat:** this section was **not researched** in
this pass, because the search budget ran out. It must not be read as "checked, none
exist". A follow-up pass is required before anything is concluded (see Open issues).

| id | status | since | ended | description (source's terms) | sources (in priority order) | confidence | notes |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | Not researched; see Open issues. |

## Rejected candidates

| candidate | section | reason |
|---|---|---|
| Abraham Accords with the UAE and Bahrain (signed 2020-09-15, White House) | Peace | Signed by PM Benjamin Netanyahu (Likud) while Gantz was Defense Minister and Alternate PM. Per §3.1, only the PM's party gets credit. times-of-israel \| https://www.timesofisrael.com/marking-dawn-of-new-middle-east-israel-signs-historic-deals-with-uae-bahrain/ \| 2026-10-18 (names "Israeli Prime Minister Benjamin Netanyahu" as a signer). |
| Later 2020–21 normalization agreements (Morocco, Sudan, Kosovo; dates from memory, not verified) | Peace | Not individually source-checked in this pass, because the result would not change: no Blue and White member held the PM post (Knesset positions data above). |
| Disabled Persons Law amendment no. 32 (car and housing benefits; חוק הנכים (תגמולים ושיקום) (תיקון מס' 32)), final reading July 2023 per the State Comptroller report | Legislation | Third reading took place under the 37th government. Gantz was not Defense Minister then (Knesset data: his term ended 2022-12-29). Search results said a Gantz–Liberman government bill was approved by the ministerial committee in 2022; I did not verify this. The sponsor at final reading was not established. Excluded. |
| Bill P/4462/25 (additional entitlements for disabled veterans, initiator incl. MK Michael Biton) | Legislation | A bill tabled 2024-03-26, not a law that passed its third reading. Used only as a source confirming Decision 981. |
| Import reform "What's good for Europe is good for Israel" (Economy Minister Orit Farkash-Hacohen, 2021–22) | Reform | Not researched (budget). It was a joint Finance and Economy initiative; Finance was held by Yisrael Beiteinu. It would need a source showing it was led within the Economy Ministry, plus an evaluation-body before/after. Lead only. |
| Operation Tzur Israel, Ethiopian aliyah (Aliyah Minister Pnina Tamano-Shata, 2020–21) | Reform | Not researched (budget). It is a one-off operation rather than a nationwide program with an evaluation indicator. Lead only. |
| Fifth Dimension (הממד החמישי) police probe, 2019, concerning a company Gantz had chaired | Legal | A lead from general knowledge, **not verified**. Not researched in this pass. Whether any proceeding was against Gantz personally, and its status, is unknown. It must not be shown without §4.5 sources. |

## Open issues

- **Legal record (§4) not researched.** The web-search budget ran out before this
  section. A follow-up pass must search court rulings, police / AG / State Attorney
  announcements and news for any criminal proceeding against Benny Gantz personally.
  Known leads: the 2019 Fifth Dimension police probe (whether Gantz was a suspect is
  unverified), and any other matter from his IDF and ministerial career. Until then,
  the site shows no legal section, per §4.4.
- **nefesh-achat: conflicting-evidence judgment.** The single source (State
  Comptroller) shows the chosen indicator doubling, but also documents low budget
  execution and incomplete core components (see row notes). A human reviewer must
  decide under §3.3 rule 4. Also confirm that "number of recognition requests decided"
  is an acceptable indicator for the decision's stated goal.
- **nefesh-achat: decision text.** gov.il returned HTTP 403 to WebFetch and curl, so
  Government Decision 981 was not read in its original form. Its goal is quoted
  from the State Comptroller report, and its number and date come from Knesset bill
  P/4462/25. The verifier should try to open the gov.il decision page to confirm the
  proposing minister (מציע).
- **Legislation leads (not evaluated).** Laws passed with Blue and White-affiliated
  initiators per Knesset OData (KNS_BillInitiator × KNS_Bill StatusID 118). Several were passed while
  the MK sat in the National Unity (המחנה הממלכתי) faction, which raises a §2.3
  joint-list attribution question. Examples: חוק מחיקת רישומים פליליים ומשטרתיים של
  יוצאי אתיופיה, התשפ"ד–2024 (MK Pnina Tamano-Shata, 2024-07-18); חוק הנכים (תגמולים
  ושיקום) (תיקון מס' 35), התשפ"ו–2026 (MK Orit Farkash-Hacohen, 2026-07-19); חוק
  ביטוח בריאות ממלכתי (תיקון מס' 74), התשפ"ו–2026 (MK Michael Biton, 2026-04-05). None has
  an evaluation-body impact source yet. Many are too recent for one to exist.
- **Faction attribution in the 21st–22nd Knessets.** Faction "כחול לבן" then
  included Yesh Atid and Telem MKs (e.g., Meirav Cohen, Boaz Toporovsky, Karine
  Elharrar, Yorai Lahav Hertzanu appear among initiators). Laws by those MKs should
  not be credited to kachol-lavan without a §2.3 source.
- **Knesset OData oddity (for the veteran-status data, not this report):** Gantz has
  a position record in Knesset 26, faction 1120 "כחול לבן", with StartDate
  2026-11-10, which is after the snapshot (KNS_PersonToPosition(33984), last updated
  2026-10-14). It looks like a pre-entered placeholder. It must not be counted as seat time.
- **CEC host.** bechirot.gov.il did not return readable content. The leader is cited
  through IDI's copy of the CEC page plus two news outlets. If the verifier can open
  the original CEC URL, it should be added as `cec`.
- **Archives:** no web.archive.org copies were looked up (no save requests made).
