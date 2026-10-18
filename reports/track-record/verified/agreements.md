# Verified — agreements (methodology v1.3 §3.1)

Snapshot 2026-10-18 · Methodology v1.3 · Independent verification of `reports/track-record/pass2/agreements.md`, plus the archival completion pass.

**Rules applied (v1.3 §3.1, §2.3, §5).**
- Qualifies: a SIGNED treaty or agreement between Israel and another state (any state Israel recognized at signing) that ends a state of war or establishes or restores diplomatic relations.
- Signed but never in force: kept and labelled "Signed; never took effect".
- One item per country, with earlier steps listed inside it.
- Upgrades of existing relations do not count.
- Credit goes only to the party of the PM leading the coalition at signing, or to its documented predecessor.
- Evidence bar, kept identical to pass 2 so every party is treated the same: an official source (treaty text, UNTS record, www.gov.il, knesset.gov.il) **or** 2 independent approved publishers, **and** at least one source saying the instrument was signed (signed / exchange of notes or letters / signed joint communiqué or declaration). "Announced", "agreed" or "established" alone is not enough.

**How this pass worked.**
- Every URL cited below was opened on 2026-10-18 (accessed date for all rows). Methods:
  - curl, with quotes extracted by text search;
  - WebFetch for timesofisrael.com;
  - the built-in browser for www.gov.il pages and the treaties.un.org detail pages;
  - macOS PDFKit for PDFs;
  - `textutil` for Knesset .DOC/.docx protocols.
- Part of the archival search was fanned out to four research helpers, one per period.
- I re-opened every source that supports a kept row myself and confirmed the quoted wording. Leads the helpers found but that I did not re-open are only listed in the gaps section, never in a table.
- No archive copies were made or requested from web.archive.org.

**PM and faction records.** All come from Knesset OData, `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition(<id>)?$format=json` (publisher `knesset`). PositionID 45 is prime minister and 54 is faction. They are cited by record id below as `KPP(<id>)`.

## Continuity used (with sources)

| party id | predecessor / member party credited | §2.3 ground | evidence (publisher \| URL \| quote) |
|---|---|---|---|
| likud | Likud 1977–today | Merger (1988) of the joint list's member parties into one party named Likud. Also the v1.3 same-name rule. | idi \| https://www.idi.org.il/policy/parties-and-elections/parties/likud/ \| "בשנת 1988 התמזגו המפלגות לכדי מפלגה אחת בשם הליכוד. הליכוד, בראשותו של מנחם בגין, הגיע לראשונה לשלטון בשנת 1977"; "יצחק שמיר כיהן כראש ממשלה מטעם הליכוד בשנים 1992-1986" |
| likud | Netanyahu 1996–99 ran on the joint list "ליכוד - גשר - צומת" | v1.1 joint list; credit goes to Likud by name | knesset \| KPP(28011): faction 637 "ליכוד - גשר - צומת". IDI Likud page (above): Likud "שב לשלטון בראשות בנימין נתניהו בשנים 1999-1996" |
| likud | Sharon is counted only until 2005-11-23 | Left Likud (faction "אחריות לאומית", then Kadima) | knesset \| KPP(28518): faction "אחריות לאומית" from 2005-11-23. No qualifying item was found under Sharon. |
| hademocratim | Israeli Labor Party (העבודה) | Merger/rename into The Democrats | See `reports/track-record/hademocratim.md` (high on the merger, medium on the legal mechanism). **All hademocratim rows below are conditional on that link.** |
| hademocratim | Labor inside the Alignment (המערך), 1969–1988 | v1.1 joint list | idi \| https://www.idi.org.il/policy/parties-and-elections/parties/maarach/ \| "לקראת הבחירות הבאות (1969) הורחבה הרשימה באופן שכלל את מפלגת העבודה ... ואת מפ"ם"; "בפעם האחרונה התמודדה הרשימה בשם זה בבחירות לכנסת השתים עשרה (1988)". idi \| https://www.idi.org.il/policy/parties-and-elections/parties/haavoda/ \| "עד הבחירות לכנסת השתיים עשרה (1988) התמודדה מפלגת העבודה במסגרת רשימת המערך" |
| hademocratim | Labor inside One Israel (ישראל אחת), 1999 | v1.1 joint list | idi \| https://www.idi.org.il/policy/parties-and-elections/parties/one-israel/ \| "ישראל אחת הוא שמה של רשימת מועמדים משותפת למפלגת העבודה, גשר ומימד"; "מועמדה לראשות הממשלה, אהוד ברק, נבחר" |
| hademocratim | **Mapai** (מפא"י, Knesset faction "מפלגת פועלי ארץ-ישראל"), predecessor of Labor | Merger: Mapai merged with Ahdut HaAvoda and Rafi to form Labor in January 1968 ("a merger in which B joined A"). Items are credited **to Mapai by name**. | idi \| https://www.idi.org.il/policy/parties-and-elections/parties/haavoda/ \| "מפלגת העבודה הישראלית היא יורשתה וממשיכתה של מפא"י. המפלגה נוסדה בינואר 1968 בעקבות איחוד בין מפא"י, אחדות העבודה ורפ"י". idi \| https://www.idi.org.il/policy/parties-and-elections/parties/mapai/ \| "ארבעת ראשי הממשלה הראשונים (דוד בן-גוריון, משה שרת, לוי אשכול וגולדה מאיר) היו ממפא"י". knesset \| KPP(26333): Eshkol in faction "מפלגת פועלי ארץ-ישראל" until 1965-11-22; KPP(26527): Eshkol in "מפלגת העבודה הישראלית" from 1968-01-23. |
| hademocratim | Labor PMs | — | idi, Labor page (above) \| "היושב ראש הראשון של המפלגה היה ראש הממשלה לוי אשכול, ומאז כיהנו מטעמה עוד ארבעה ראשי ממשלה: גולדה מאיר, יצחק רבין, שמעון פרס ואהוד ברק" |
| beyachad | Yesh Atid only (Lapid PM 2022-07-01 to 2022-12-29) | Member party; Bennett 2026 has no predecessor | See `reports/track-record/beyachad.md`. knesset \| KPP(30115), KPP(30333) |

## likud

### Peace / normalization (listed in full)

| id | agreement | other state | signed | in force? | PM (party or predecessor) | steps included | sources (publisher-id \| URL \| accessed) |
|---|---|---|---|---|---|---|---|
| likud-egypt-1979 | Treaty of Peace between the State of Israel and the Arab Republic of Egypt (with annexes and maps) | Egypt | 1979-03-26, Washington | Yes, from 1979-04-25 (exchange of ratifications, Om-Khosheib) | Menachem Begin (Likud). KPP(4065), faction KPP(27127) | Camp David Accords, 1978-09-17 (White House): "Framework for Peace in the Middle East" and "Framework for the conclusion of a Peace Treaty between Egypt and Israel", signed by Sadat and Begin | un-treaties \| https://treaties.un.org/doc/Publication/UNTS/Volume%201138/volume-1138-I-17855-English.pdf \| 2026-10-18 (Israel's registration I-17855. Art. I: "The state of war between the Parties will be terminated and peace will be established"; footnote: "Came into force on 25 April 1979"; "Signed by Menachem Begin") ; gov-il \| https://www.gov.il/en/pages/peace-with-egypt \| 2026-10-18 ("The Israel-Egypt Peace Treaty was signed on 26 March 1979"; "included cessation of the state of war") ; gov-il \| https://www.gov.il/en/pages/camp-david-accords \| 2026-10-18 ("the accords which were signed by Egyptian President Sadat and Israeli Prime Minister Begin") ; times-of-israel \| https://www.timesofisrael.com/a-look-at-the-landmark-egypt-israel-peace-treaty-sealed-40-years-ago/ \| 2026-10-18 |
| likud-lebanon-1983 | Agreement between Israel and Lebanon of 17 May 1983 ("May 17 Agreement") | Lebanon | 1983-05-17 (place not confirmed in approved sources) | **Signed; never took effect.** Annulled by Lebanon, March 1984 (Israel Hayom) | Menachem Begin (Likud). KPP(4066), faction KPP(27304) | Government statement to the Knesset, 1983-05-11; Knesset approval, 1983-05-16 | knesset \| https://fs.knesset.gov.il//10/Plenum/10_ptm_236562.DOC \| 2026-10-18 (FM Shamir, 11 May 1983: "הוא קובע בראש ובראשונה את סיום מצב המלחמה בין ישראל לבין לבנון") ; knesset \| https://fs.knesset.gov.il//10/Plenum/10_ptm_236428.DOC \| 2026-10-18 (16 May 1983: "הכנסת מאשרת את ההסכם בין ישראל לבין לבנון"; adopted with 45 abstentions) ; knesset \| https://fs.knesset.gov.il/10/Plenum/10_ptm_530053.pdf \| 2026-10-18 ("ההסכם שנחתם ב-17 במאי לאחר משא-ומתן ממושך") ; walla \| https://news.walla.co.il/item/3830607 \| 2026-10-18 (2026-04-14: "הכרזה משותפת על תום מצב המלחמה") ; israel-hayom \| https://www.israelhayom.co.il/news/world-news/middle-east/article/20328088 \| 2026-10-18 (2026-04-15: "ב־17 במאי 1983 ... נחתם הסכם"; "בוטל על ידי לבנון במארס 1984") ; jpost \| https://www.jpost.com/middle-east/article-900727 \| 2026-10-18 (2026-06-28: "the two countries signed the May 17 Agreement") |
| likud-uae-2020 | Abraham Accords Peace Agreement: Treaty of Peace, Diplomatic Relations and Full Normalization between the UAE and the State of Israel | United Arab Emirates | 2020-09-15, Washington, DC | Yes, from 2021-01-05 | Benjamin Netanyahu (Likud). KPP(21838), faction KPP(29788) | — | gov-il \| https://www.gov.il/BlobFolder/news/the-abraham-accords-declaration-15-dep-2020/en/English_ABRAHAM_ACCORDS_Israel-UAE-treaty-15-Sept-2020.pdf \| 2026-10-18 (Art. 1: "Peace, diplomatic relations and full normalization of bilateral ties are hereby established") ; un-treaties \| https://treaties.un.org/Pages/showDetails.aspx?objid=08000002805a7d1f&clang=_en \| 2026-10-18 (I-56565, Washington 15/09/2020, EIF "5 January 2021") ; times-of-israel \| https://www.timesofisrael.com/marking-dawn-of-new-middle-east-israel-signs-historic-deals-with-uae-bahrain/ \| 2026-10-18 |
| likud-bahrain-2020 | Joint Communiqué on the establishment of diplomatic, peaceful and friendly relations between the State of Israel and the Kingdom of Bahrain | Bahrain | 2020-10-18, Manama (display date) | Yes, from 2020-12-10 | Benjamin Netanyahu (Likud). KPP(21838), faction KPP(29788) | Abraham Accords: Declaration of Peace, Cooperation, and Constructive Diplomatic and Friendly Relations, 2020-09-15, Washington | un-treaties \| https://treaties.un.org/Pages/showDetails.aspx?objid=08000002805a7d2b&clang=_en \| 2026-10-18 (I-56566, Manama 18/10/2020, EIF "10 December 2020") ; gov-il \| https://www.gov.il/BlobFolder/news/the-abraham-accords-declaration-15-dep-2020/en/English_ABRAHAM_ACCORDS_Abraham-Accords-Israel-Bahrain-Agreement-15-Sep-2020.pdf \| 2026-10-18 ("to establish full diplomatic relations") ; times-of-israel \| https://www.timesofisrael.com/israel-bahrain-sign-historic-agreement-formally-establishing-diplomatic-ties/ \| 2026-10-18 (Ben-Shabbat and Al-Zayani signed the communiqué) ; gov-il \| https://www.gov.il/BlobFolder/dynamiccollectorresultitem/prospectuses_18k_report_2022/en/Prospectuses_prospectuses_18k_report_2022.pdf \| 2026-10-18 ("the normalization of Israel's relations with the UAE, Bahrain, Morocco and Sudan") |
| likud-morocco-2020 | Joint Declaration of the United States, the Kingdom of Morocco and the State of Israel (title as reported; official text not found on an approved host) | Morocco | 2020-12-22, Rabat | Not stated in sources | Benjamin Netanyahu (Likud). KPP(21838), faction KPP(29788) | — (the liaison offices of 1994, closed in 2000, came before it; see Open issues) | walla \| https://www.walla.co.il/news/politics/3406817 \| 2026-10-18 (2020-12-22. Bourita: "חתמנו היום בפגישה עם המלך על הודעה משולשת"; "כינון יחסים דיפלומטיים ישרת את שתי המדינות") ; gov-il \| https://www.gov.il/BlobFolder/dynamiccollectorresultitem/prospectuses_18k_report_2022/en/Prospectuses_prospectuses_18k_report_2022.pdf \| 2026-10-18 ("In December 2020, Israel and Morocco established full diplomatic relations"; "normalization of Israel's relations with the UAE, Bahrain, Morocco and Sudan") ; times-of-israel \| https://www.timesofisrael.com/israel-morocco-ink-deals-agree-to-reopen-mutual-liaison-offices-within-weeks/ \| 2026-10-18 (the declaration commits the parties to "resume full official contacts"; liaison offices "closed in late 2000") ; ynet \| https://www.ynetnews.com/article/byqclddyge \| 2026-10-18 (2026-09-16: "Morocco renewed diplomatic relations with Israel in 2020") |

### Diplomatic relations only (grouped)

| id | other state | signed | type (establish/restore) | PM (party or predecessor) | sources |
|---|---|---|---|---|---|
| likud-hungary-1989 | Hungary | September 1989, Budapest (exact day not in approved sources). Instrument: "פרוטוקול חידוש היחסים", signed by FM Arens | restore | Yitzhak Shamir (Likud). KPP(4298), faction KPP(27757) | knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236983.DOC \| 2026-10-18 (FM Arens, 7 May 1990: "בספטמבר 1989 חתמתי בבודפשט על פרוטוקול חידוש היחסים עם הונגריה"; "בבודפשט, בפראג ובוורשה, בעת מעמד טקסי החתימה על חידוש היחסים הדיפלומטיים") |
| likud-czechoslovakia-1990 | Czechoslovakia (relations today with the Czech Republic and Slovakia) | Early February 1990, Prague. Instrument: "הסכם לחידוש הקשרים הדיפלומטיים" | restore | Yitzhak Shamir (Likud). KPP(4298), faction KPP(27757) | knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236983.DOC \| 2026-10-18 ("בראשית פברואר שנה זו חתמתי בפראג על הסכם לחידוש הקשרים הדיפלומטיים") |
| likud-poland-1990 | Poland | Late February 1990, Warsaw (FMs Arens and Skubiszewski) | restore | Yitzhak Shamir (Likud). KPP(4298), faction KPP(27757) | knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236983.DOC \| 2026-10-18 ("היחסים הדיפלומטיים בין ישראל ובין פולין חודשו בסוף חודש פברואר השנה, במהלך ביקור שקיימתי בוורשה"; signing ceremonies "בבודפשט, בפראג ובוורשה") ; jpost \| https://www.jpost.com/Diplomacy-and-Politics/Polish-President-Bronislaw-Komorowski-to-visit-Israel-next-week-329966 \| 2026-10-18 (2013-10-28: Mazowiecki "witnessed the signing of the agreements between Israel and Polands' foreign ministers Moshe Arens and Krysztof Skubiszewski for the full restoration of diplomatic ties") |
| likud-bulgaria-1990 | Bulgaria | Late April or early May 1990, Sofia ("a few days" before 7 May 1990). Instrument: "הסכם לחידוש היחסים הדיפלומטיים המלאים" | restore | Yitzhak Shamir (Likud). KPP(4298), faction KPP(27757) | knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236983.DOC \| 2026-10-18 ("בולגריה היתה המדינה הרביעית במזרח-אירופה המחדשת יחסים עם ישראל. רק לפני ימים ספורים שבתי" … "מביקור בסופיה שבמהלכו חתמתי על הסכם לחידוש היחסים הדיפלומטיים המלאים". The .DOC splits this sentence across a column break, so check the joined text against the PDF of the same session.) |
| likud-ussr-1991 | USSR (relations continued with Russia) | October 1991, in Israel, during FM Boris Pankin's visit ("at the end of last week" before 23 Oct 1991; exact day not stated). Instrument: "הסכם על כינון קשרים דיפלומטיים מלאים" | restore (after a 24-year break) | Yitzhak Shamir (Likud). KPP(4525), faction KPP(27757) | knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236674.DOC \| 2026-10-18 (FM Levy, 23 Oct 1991: "במהלכן נחתם בישראל הסכם על כינון קשרים דיפלומטיים מלאים לאחר 24 שנות ניתוק") |
| likud-china-1992 | People's Republic of China | 1992-01-24 (FM David Levy and FM Qian Qichen; city not stated in approved sources) | establish | Yitzhak Shamir (Likud). KPP(4525), faction KPP(27757) | jpost \| https://www.jpost.com/breaking-news/israels-pres-herzog-chinas-xi-talk-iran-middle-east-685225 \| 2026-10-18 (2021-11-17: "On January 24, 1992, then-foreign minister David Levy ... signed an agreement for the establishment of diplomatic relations with his Chinese counterpart, Qian Qichen") ; ynet \| https://www.ynetnews.com/article/rjfuefkc11l \| 2026-10-18 (2026-05-06: "Israel's 1992 joint communique establishing diplomatic relations with China", in a passage attributed to China's embassy) ; jpost \| https://www.jpost.com/history/article-908268 \| 2026-10-18 (2026-09-10: "on January 24, 1992, the two countries finally established full diplomatic relations"; same publisher as the first source) |
| likud-guinea-2016 | Guinea | 2016-07-20, Paris (MFA DG Dore Gold and Ibrahim Khalil Kaba) | restore (cut in 1967) | Benjamin Netanyahu (Likud). KPP(17248), faction KPP(29170) | times-of-israel \| https://www.timesofisrael.com/after-49-years-israel-renewes-diplomatic-ties-with-guinea/ \| 2026-10-18 ("Dore Gold signed an agreement with Ibrahim Khalil Kaba") ; haaretz \| https://www.haaretz.com/israel-news/2016-07-20/ty-article/israel-and-guinea-renew-diplomatic-relations-after-49-years/0000017f-e671-df5f-a17f-ffff148e0000 \| 2026-10-18 ("signed a joint statement announcing the renewing of relations") |
| likud-chad-2019 | Chad | 2019-01-20, N'Djamena | restore (cut in 1972) | Benjamin Netanyahu (Likud). KPP(17248), faction KPP(29170) | times-of-israel \| https://www.timesofisrael.com/in-historic-first-israeli-plane-flies-over-south-sudan-with-khartoums-okay/ \| 2026-10-18 ("minutes before he signed the formal document sealing the resumption of diplomatic relations") ; haaretz \| https://www.haaretz.com/israel-news/netanyahu-set-to-arrive-in-chad-and-re-establish-the-ties-cut-in-1972-1.6852370 \| 2026-10-18 ("several agreements he has signed with Netanyahu, including the renewal of diplomatic ties") ; gov-il \| 18-K 2022 (URL above) \| 2026-10-18 ("renewed its diplomatic relations with Chad") |
| likud-bhutan-2020 | Bhutan | 2020-12-12, New Delhi (ambassadors; exchange of notes) | establish | Benjamin Netanyahu (Likud). KPP(21838), faction KPP(29788) | gov-il \| https://www.gov.il/en/pages/israel-and-kingdom-of-bhutan-announce-establishment-of-full-diplomatic-relations-12-december-2020 \| 2026-10-18 ("signed this evening (Saturday, 12 December 2020) a declaration of the establishment of full diplomatic relations"; "official exchange of notes ceremony") ; times-of-israel \| https://www.timesofisrael.com/israel-inks-deal-establishing-diplomatic-relations-with-bhutan/ \| 2026-10-18 |
| likud-kosovo-2021 | Kosovo | 2021-02-01, virtual ceremony (FMs Ashkenazi and Haradinaj-Stublla) | establish | Benjamin Netanyahu (Likud). KPP(21838), faction KPP(29788). The signer, FM Ashkenazi, was from Blue and White; credit follows the PM. | jpost \| https://www.jpost.com/israel-news/israel-kosovo-establish-diplomatic-ties-over-zoom-657431 \| 2026-10-18 ("signed three agreements: a joint communiqué on the establishment of diplomatic relations") ; times-of-israel \| https://www.timesofisrael.com/israel-kosovo-forge-official-ties-over-zoom-confirm-jerusalem-embassy-to-open/ \| 2026-10-18 ("signed a joint declaration establishing ties") ; gov-il \| 18-K 2022 (URL above) \| 2026-10-18 ("signed an agreement establishing diplomatic relations between Israel and Kosovo") |
| likud-niue-2023 | Niue (**"another state": see Open issues 3**) | 31 July or 1 August 2023, Alofi (Ambassador Ran Yaakoby and Premier Dalton Tagelagi). ToI says "Monday"; ynet says "Tuesday". | establish | Benjamin Netanyahu (Likud). KPP(30679), faction KPP(30204) | times-of-israel \| https://www.timesofisrael.com/israel-establishes-diplomatic-ties-with-miniscule-island-of-niue/ \| 2026-10-18 (2023-08-04: "visited Niue on Monday to sign an agreement with Premier Dalton Tagelagi"; "Niue is part of the realm of New Zealand") ; ynet \| https://www.ynet.co.il/news/article/hjyifw5o3 \| 2026-10-18 (2023-08-04: "ראש ממשלת ניואה דלטון טאגלאגי חתם על הסכם כינון היחסים עם השגריר יעקובי"; "כינון היחסים בין שתי המדינות") ; n12 \| https://www.mako.co.il/news-diplomatic/2023_q3/Article-6a4ac69a8bfb981027.htm \| 2026-10-18 (2023-08-04, announcement) ; jpost \| https://www.jpost.com/israel-news/article-898076 \| 2026-10-18 (relations with "non-UN member states, the Cook Islands and Niue") |
| likud-bolivia-2025 | Bolivia | **2025-12-09**, Washington (FM Sa'ar and FM Fernando Aramayo) | restore (cut 2023) | Benjamin Netanyahu (Likud). KPP(30679), faction KPP(30204) | times-of-israel \| https://www.timesofisrael.com/israel-and-bolivia-renew-diplomatic-ties-after-two-years-of-rupture-over-gaza-war/ \| 2026-10-18 (caption: "sign an agreement renewing ties ... in Washington, DC, on December 9, 2025") ; haaretz \| https://www.haaretz.com/israel-news/2025-12-11/ty-article/.premium/israel-and-bolivia-restore-diplomatic-relations-cut-off-after-gaza-war/0000019b-0c8c-d868-affb-5cfd76aa0000 \| 2026-10-18 ("On Tuesday, Israeli Foreign Minister Gideon Sa'ar and his Bolivian counterpart, Fernando Aramayo, signed an agreement") ; jpost \| https://www.jpost.com/israel-news/article-879824 \| 2026-10-18 ("signed the joint declaration at a ceremony in Washington") |
| likud-somaliland-2025 | Somaliland (counts under v1.3) | 2025-12-26 (Netanyahu, Sa'ar and President Abdullahi; joint declaration of mutual recognition) | establish | Benjamin Netanyahu (Likud). KPP(30679), faction KPP(30204) | times-of-israel \| https://www.timesofisrael.com/israel-becomes-first-country-to-recognize-breakaway-somaliland-as-independent-state/ \| 2026-10-18 (Netanyahu and Sa'ar "signed the declaration for Israel") ; jpost \| https://www.jpost.com/israel-news/article-881475 \| 2026-10-18 (quotes Sa'ar: "we signed an agreement on mutual recognition and the establishment of full diplomatic relations") |

### Verdicts on earlier rows

| pass-2 row | verdict | reason |
|---|---|---|
| likud-egypt-1979 | **KEEP, sources FIXED** | Facts confirmed. Two of pass 2's UNTS links are not the treaty itself: 08000002800f1f7f is the additional *letter agreement* registered under 17813, and I-20414 is a **US–Egypt** letter agreement. Replace them with Israel's own registration I-17855 (vol. 1138), which has extractable text: Art. I, "Came into force on 25 April 1979", "Signed by Menachem Begin". Add gov.il "Peace with Egypt". Camp David (1978) moves inside this item as a step (v1.3). |
| likud-uae-2020 | **KEEP** | Treaty text, UNTS record and ToI all confirmed. |
| likud-bahrain-2020 | **KEEP, FIX classification and date** | Classified as **peace / normalization**: the declaration is a "Declaration of Peace", and the 18-K lists Bahrain among the normalizations. Display date 2020-10-18 (UNTS), with the 2020-09-15 declaration listed as a step. The 18-K's "November 2020" contradicts UNTS; UNTS is used. |
| likud-morocco-2020 | **KEEP, FIX classification** | Classified as **peace / normalization**: the official 18-K calls it a normalization and says relations were established. Type: restore. Signing evidence comes from Walla (Bourita: "חתמנו"); ToI says only that the declaration was "issued". See Open issues 1 on the level of relations. |
| likud-bhutan-2020 | **KEEP** | gov.il press release and ToI confirmed. |
| likud-kosovo-2021 | **KEEP** | v1.3 settles statehood. JPost, ToI and the 18-K confirmed. |
| likud-chad-2019 | **KEEP** | ToI, Haaretz and the 18-K confirmed. |
| likud-guinea-2016 | **KEEP** | ToI and Haaretz confirmed. |
| likud-bolivia-2025 | **KEEP, FIX date → 2025-12-09** | ToI caption and Haaretz ("On Tuesday") give 9 December in Washington. JPost's "Wednesday" is the Israel-time date of its 07:19 UTC report. JPost's own summary line names a different Bolivian minister (Espinosa), contradicting its body text, so name Aramayo only, as ToI and Haaretz do. |
| likud-china-1992 | **KEEP (was "not ready")** | Now meets the rule. JPost says "signed" and ynetnews (a different publisher) refers to the 1992 joint communiqué establishing relations. Weakness: only JPost uses the word "signed", and there is no official Israeli source. See Open issues 2. |
| likud-somaliland-2025 | **KEEP** | v1.3 counts Somaliland. ToI and JPost confirmed. |
| labor-jordan-1994 | **KEEP, FIX steps** | The Washington Declaration (1994-07-25) goes **inside** this item as a step, sourced officially (see the hademocratim table). |
| labor-holy-see-1993 | **KEEP, FIX sources** | v1.3 counts the Holy See. Added UNTS I-30925 (signed at Jerusalem, in force 1994-03-10, Art. 14) and a Knesset protocol. |
| Not-qualifying: Turkey 2022 (beyachad) | **Confirmed not qualifying** | See the beyachad section. |
| Not-qualifying: Lebanon maritime 2022 | **Confirmed** | Not peace and not relations. |
| Not-qualifying: Sudan 2020/21 | **Confirmed** | 18-K: Sudan "acceded to the Abraham Accords" (an accession with the US). The MFA list (updated 15.02.2023) shows Sudan "No". |
| Not-qualifying: Nicaragua 2017 | **Confirmed** | JPost: "issued a joint statement"; no signing reported. |
| Not-qualifying: South Sudan 2011 | **Confirmed** | Haaretz: "The Foreign Ministry announced ... has established full diplomatic relations". No signing reported. |
| Not-qualifying: India 1992 | **Confirmed (insufficient data)** | Still no approved source describes a signed instrument. Maariv 2017 says "כוננו יחסים דיפלומטיים מלאים רק בסוף ינואר 92'". |
| Not-qualifying: Colombia 2026 | **Confirmed** | JPost 2026-07-16: ministers "agreed ... to fully restore"; no signing. |
| Not-qualifying: Venezuela 2026 | **Confirmed** | Consular relations only (JPost). |
| Not-qualifying: Morocco 2026 upgrade | **Confirmed (v1.3 upgrade rule)** | ynetnews: "already have formal diplomatic relations, agreed to elevate their liaison offices to full embassies". |
| Not-qualifying: Lebanon framework 2026-06-26 | **Confirmed** | Signed, but it declares only an *intent* to "formally conclude any state of war" in the future. Re-check if a final agreement is signed. |
| Not-qualifying: Camp David 1978 | **Changed: now a step inside likud-egypt-1979** | v1.3 steps rule. |
| Not-qualifying: Israel–PLO agreements | **Confirmed** | The counterpart is not a state. |
| Open issue 3: Lebanon 1983 | **Resolved → KEEP as likud-lebanon-1983** | v1.3 keeps signed-never-in-force items. Now sourced officially (Knesset protocols) plus three news publishers. |
| Open issue 4: Washington Declaration | **Resolved → step inside the Jordan item** | v1.3. |

**Other not-qualifying items found in this pass (likud):**
- **Turkey reconciliation agreement, 2016-06-28 (signed, Netanyahu): excluded as an upgrade.**
  - haaretz \| https://www.haaretz.com/israel-news/2016-06-28/ty-article/israel-and-turkey-formalize-landmark-reconciliation-pact/0000017f-e14b-d568-ad7f-f36bfce40000 \| 2026-10-18: "Dore Gold signed the reconciliation agreement with Turkey on Tuesday".
  - Relations had been downgraded, not severed.
- **Bolivia, 2019-11-28: excluded (no signing).** Restoration was announced only (helper's sources: ToI and Haaretz, 2019-11-28; not re-opened by me).
- **Austria 2003 (Sharon): excluded as an upgrade.** Resumption of full ties, nothing signed (helper's Haaretz lead; not re-opened).
- **Zaire 1982, Liberia 1983, Ethiopia 1989, and the 1991 group: excluded (no signing documented).**
  - The 1991 group is Mongolia, Congo, Zambia, Albania, Yugoslavia, Lithuania, Latvia and Estonia.
  - Relations restored or established per Knesset protocols, e.g. knesset \| https://fs.knesset.gov.il//12/Plenum/12_ptm_236968.DOC (Minister Milo, 15 Jan 1992, as reported by the helper).
  - These are not re-opened by me and not listed until a signed instrument is sourced.
- **Former Soviet republics, 1992: excluded (no signing documented).** Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Georgia are dated by JPost only (one publisher, no signing).

## hademocratim

All rows are conditional on the Labor → The Democrats continuity in `hademocratim.md`.

### Peace / normalization (listed in full)

| id | agreement | other state | signed | in force? | PM (party or predecessor) | steps included | sources (publisher-id \| URL \| accessed) |
|---|---|---|---|---|---|---|---|
| labor-jordan-1994 | Treaty of peace between the State of Israel and the Hashemite Kingdom of Jordan (with annexes, agreed minutes and maps) | Jordan | 1994-10-26, Arava/Araba Crossing Point | Yes, from 1994-11-10 (exchange of ratifications) | Yitzhak Rabin (Israeli Labor Party). KPP(4178), faction KPP(27892) | **Washington Declaration**, signed 1994-07-25 in Washington by Rabin, King Hussein and President Clinton. It ended the state of war, and the Knesset approved it on 1994-08-03. | un-treaties \| https://treaties.un.org/Pages/showDetails.aspx?objid=080000028009bc5b&clang=_en \| 2026-10-18 (No. 35325; EIF "10 November 1994 by the exchange of the instruments of ratification") ; gov-il \| https://www.gov.il/en/pages/peace-with-jordan \| 2026-10-18 ("On 26 October 1994 Israel and Jordan signed a peace treaty"; "establishing diplomatic relations") ; knesset \| https://fs.knesset.gov.il//13/Plenum/13_ptm_532258.docx \| 2026-10-18 (Rabin, 3 Aug 1994: "הצהרת וושינגטון אשר נחתמה בבירת ארצות-הברית ביום ... 25 ביולי 1994"; "תם מצב המלחמה בין מדינת ישראל לבין הממלכה ההאשמית הירדנית"; resolution: "הכנסת מאשרת את הצהרת וושינגטון ... שנחתמה על-ידי ראש הממשלה יצחק רבין, מלך ירדן המלך חוסיין ונשיא ארצות-הברית") ; jpost \| https://www.jpost.com/history/article-862095 \| 2026-10-18 (Washington Declaration "officially ending the state of enmity") |

### Diplomatic relations only (grouped)

| id | other state | signed | type (establish/restore) | PM (party or predecessor) | sources |
|---|---|---|---|---|---|
| mapai-germany-1965 | Federal Republic of Germany (West Germany) | 1965-05-12 | establish | Levi Eshkol (**Mapai**, Labor's predecessor). KPP(4053), faction KPP(26333) "מפלגת פועלי ארץ-ישראל" | gov-il \| https://www.gov.il/en/pages/levi_eshkol \| 2026-10-18 ("He also established full diplomatic relations with West Germany") ; walla \| https://www.walla.co.il/news/israel/2853176 \| 2026-10-18 (2015-05-11: "ב-12 במאי 1965 כוננו מדינת ישראל והרפובליקה הפדרלית של גרמניה את היחסים הדיפלומטים") ; ynet \| https://www.ynet.co.il/articles/0,7340,L-4712760,00.html \| 2026-10-18 (2015-10: "50 השנים שחלפו מאז נחתם ההסכם ב-12 במאי 1965") ; jpost \| https://www.jpost.com/israel-news/israel-and-germany-mark-golden-anniversary-as-friends-402475 \| 2026-10-18 ("Erhard and ... Eshkol establish diplomatic relations and arrange for the exchange of ambassadors"). **Medium:** "signed" comes from one publisher (ynet), in a tourism-event report. See Open issues 2. |
| labor-spain-1986 | Spain | January 1986, the Netherlands (Peres–González meeting). 17 January comes only from a Haaretz op-ed by Spain's FM. | establish | Shimon Peres (Labor, within the Alignment). KPP(4317), faction KPP(27535) "מערך" | knesset \| https://fs.knesset.gov.il//11/Plenum/11_ptm_235986.DOC \| 2026-10-18 (MK M. Peled, Feb 1986: "לאחר שנחתם הסכם של החלפת שגרירים ... לא בספרד אלא בהולנד") ; knesset \| https://fs.knesset.gov.il//11/Plenum/11_ptm_236229.DOC \| 2026-10-18 (PM Peres, 7 Oct 1986: "כוננו יחסים דיפלומטיים עם ספרד") ; haaretz \| https://www.haaretz.com/2004-12-02/ty-article/a-shared-past-spain-and-israel/0000017f-dc69-df62-a9ff-dcffbead0000 \| 2026-10-18 (2004-12-02, op-ed by Spain's FM Moratinos: "On January 17 ... the date marking the establishment of diplomatic relations"). **Medium:** "signed" comes from an opposition MK's speech in the official record. |
| labor-holy-see-1993 | Holy See (counts under v1.3) | 1993-12-30, Jerusalem (Fundamental Agreement, with Additional Protocol) | establish | Yitzhak Rabin (Israeli Labor Party). KPP(4178), faction KPP(27892) | un-treaties \| https://treaties.un.org/doc/Publication/UNTS/Volume%201775/volume-1775-I-30925-English.pdf \| 2026-10-18 ("Signed at Jerusalem on 30 December 1993"; "Came into force on 10 March 1994"; Art. 14: "will establish full diplomatic relations at the level of Apostolic Nunciature") ; gov-il \| https://www.gov.il/en/pages/israel-vatican-diplomatic-relations \| 2026-10-18 ("the signing of the Fundamental Agreement ... on 30 December 1993"; ambassadors exchanged May 1994) ; knesset \| https://fs.knesset.gov.il//13/Plenum/13_ptm_532128.docx \| 2026-10-18 ("ביום חמישי, 30 בדצמבר 1993 ... במשרד החוץ בירושלים, נחתם הסכם הפיוס ההיסטורי") |
| labor-mauritania-1999 | Mauritania | October 1999 (exact day, place and signatories not confirmed in approved sources) | establish. Mauritania severed relations in 2009–2010; state this as a fact, as for a later repeal (§3.4). | Ehud Barak (Labor, within One Israel). KPP(4472), faction KPP(28122) "ישראל אחת" | walla \| https://www.walla.co.il/news/israel/1257240 \| 2026-10-18 (2008-03-30: "למאוריטניה יש קשרים דיפלומטיים עם ישראל מאז אוקטובר 1999. הם נחתמו בתקופתו של הנשיא לשעבר מועאוויה ולד אל-טאיע") ; ynet \| https://www.ynet.co.il/articles/0,7340,L-3650931,00.html \| 2026-10-18 (2009-01-05: "היחסים הדיפלומטיים עם ישראל, שכוננו ב-1999") ; knesset \| https://fs.knesset.gov.il//15/Plenum/15_ptm_532904.docx \| 2026-10-18 (MK Chazan, 12 Apr 2000: "מאוריטניה היא המדינה השלישית בליגה הערבית שכוננה יחסים דיפלומטיים עם ישראל") ; haaretz \| https://www.haaretz.com/2010-03-21/ty-article/mauritania-formally-severs-diplomatic-ties-with-israel/0000017f-dbea-d856-a37f-ffea79a70000 \| 2026-10-18 (2010-03-21: "Mauritania has fully severed diplomatic ties with Israel"). **Medium:** "signed" rests on Walla's wording only. |

### Verdicts on earlier rows

- labor-jordan-1994: **KEEP**, with the Washington Declaration added as a step (official Knesset source).
- labor-holy-see-1993: **KEEP**. Statehood is settled by v1.3. Added UNTS I-30925 and the Knesset record. The pass-2 note that it is "not registered in UNTS" was **wrong**: it is I-30925, vol. 1775.
- New rows: mapai-germany-1965, labor-spain-1986, labor-mauritania-1999.

**Not qualifying (hademocratim):**
- **1949 Armistice Agreements (Ben-Gurion, Mapai).** They did not end the state of war. gov-il \| https://www.gov.il/en/pages/peace-with-egypt: the 1979 treaty "included cessation of the state of war"; the I-17855 text (above) terminates the state of war in 1979.
- **Sinai I (1974), Syria disengagement (1974), Sinai II (1975).** Interim and military agreements, not peace and not relations. Helper's gov.il quotes: "not regarded ... as a final peace agreement", "This agreement is not a peace agreement". Not re-opened by me.
- **Morocco liaison office and Tunisia interest office (1994), Oman and Qatar trade offices (1996).** Not diplomatic relations: Deputy FM Beilin called them steps "לקראת הקמת יחסים דיפלומטיים מלאים" (helper's Knesset lead, 13_ptm_532255). See Open issues 1 for the Morocco consistency question.
- **Comoros 1994.** Announced, then suspended; no signing.
- **Côte d'Ivoire and Cameroon (1986, Peres); Burkina Faso, Gabon, Mauritius, Cambodia and Turkmenistan (autumn 1993, Rabin); Vietnam (1993); Sri Lanka (2000).** Relations established or restored per the Knesset or news, but **no signing documented** (helper leads, not re-opened by me). Insufficient data until a signed instrument is sourced.
- **Madagascar (1961) and Gabon (1962) Treaties of Friendship (Ben-Gurion, Mapai).** Signed and in UNTS (I-7032 and I-7027), but the texts do not say they establish relations, and their preambles refer to existing ties. Not listed; see Open issues 5.
- **Philippines (1958) and Liberia (1959) friendship treaties.** Relations already existed: they were signed by a resident Israeli minister and ambassador.

## beyachad

### Peace / normalization (listed in full)

| id | agreement | other state | signed | in force? | PM (party or predecessor) | steps included | sources (publisher-id \| URL \| accessed) |
|---|---|---|---|---|---|---|---|
| — | none | — | — | — | — | — | — |

### Diplomatic relations only (grouped)

| id | other state | signed | type (establish/restore) | PM (party or predecessor) | sources |
|---|---|---|---|---|---|
| — | none | — | — | — | — |

### Verdicts on earlier rows

**"None qualifying": KEEP.** The only period that counts is Lapid's (Yesh Atid), 2022-07-01 to 2022-12-29: knesset \| KPP(30115), KPP(30333).

**Turkey 2022, re-checked: does not qualify, for two independent reasons.**

1. **No signed instrument.** The official MFA statement says the restoration was concluded by phone:
   - gov-il \| https://www.gov.il/en/pages/israel-and-turkiye-restore-full-diplomatic-ties-17-aug-2022 \| 2026-10-18 (published 17.08.2022): "Following the conversation between Prime Minister Yair Lapid and Turkish President Recep Tayyip Erdoğan – Israel and Türkiye restore full diplomatic ties".
   - Same page: "Last night (16 August, 2022), Foreign Ministry Director-General Alon Ushpiz spoke with Turkish Deputy Foreign Minister Sedat Önal, and the two concluded the matter."
   - The official 18-K matches: "Israel and Turkey agreed to resume normal diplomatic relations with the announcement that the two countries will return their ambassadors" (gov-il \| 18-K 2022 PDF, URL above).
   - Haaretz (2022-08-17), ynetnews (2022-08-17) and JPost (2022-08-17, "announced that they would return to full normalization") report an announcement and a phone call, with no signing (haaretz \| https://www.haaretz.com/israel-news/2022-08-17/ty-article/israel-turkey-restore-full-diplomatic-ties/00000182-ab7a-de3d-abe3-af7b04190000 ; ynet \| https://www.ynetnews.com/article/b1qnbi9rc ; jpost \| https://www.jpost.com/breaking-news/article-714948 ; all 2026-10-18).
2. **It is an upgrade of existing relations (v1.3).**
   - Relations were never severed: Haaretz says both capitals "withdrew their respective ambassadors" in 2018.
   - The MFA statement itself says: "It was decided to once again upgrade the level of the relations between the two countries to that of full diplomatic ties and to return ambassadors and consuls general".

**Other Lapid-period items.**
- The Lebanon maritime agreement (2022-10-27) remains excluded: not peace, not relations.
- No other establishment or restoration of relations was found for July–December 2022 (search of ToI, JPost, gov.il, ynetnews and Haaretz).

## Not checked / remaining gaps

The lists above are complete **only** for items whose signing could be sourced. These periods and countries were not checked, or could not be resolved with approved sources:

**Likud**
- **1977–1984.** Zaire (1982) and Liberia (1983) relations were restored, but no signing is sourced. Costa Rica and other moves were not checked.
- **1986–1988.** Togo (1987), Kenya (1988) and the Central African Republic: not documented.
- **1990–1992.**
  - Greece (1990): establishment or upgrade unresolved.
  - Mongolia, Congo, Zambia, Albania, Yugoslavia and the Baltic states (1991): no signing sourced.
  - India (Jan 1992): no signing sourced.
  - Former Soviet republics (Jan–Jul 1992): Ukraine, Belarus, Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan (1993, Rabin), Azerbaijan, Armenia, Georgia and Moldova. No signing sourced; Georgia had a "החתימה על הסכם כינון היחסים" mention in an MK question (helper lead, 13_ptm_532053, not re-opened).
  - Slovenia and Croatia (1992), Nigeria, Angola, Seychelles, Sierra Leone, Gambia, Benin: not checked.
  - **April–July 1992:** there are no 12th-Knesset plenum protocols after 18 March 1992, so the main official route is closed.
- **1996–1999.** Croatia and Bosnia (1997), Niger (1996, month unknown, so Peres or Netanyahu), and Andorra, Monaco, San Marino and Liechtenstein: no approved source with date or form.
- **2001–2005 (Sharon).** Thin coverage. Timor-Leste is undetermined.
- **2009–2021.** Globes's 2019 fact-check (helper lead, not re-opened: https://www.globes.co.il/news/article.aspx?did=1001278270) lists only South Sudan, Guinea, Nicaragua and Chad for 2009–early 2019. Pacific states (Kiribati, Tuvalu, Nauru, Palau, Cook Islands) are undetermined.

**Labor / Alignment / Mapai**
- **1948–1977.** No country-by-country sweep was done for the roughly 100 states that established relations then (Africa 1957–66, Asia, Latin America, Western Europe). Specifically unresolved:
  - Portugal (1977): date unknown, so Rabin or Begin is unresolved.
  - Japan (1952), Iran (1950), Burma, Ghana, Thailand, Nepal, Sri Lanka, Cyprus and Singapore (1969).
  - USSR rupture and restoration (1953).
  - UN Treaty Series indexes after volume 1400 were not searched for this period.
- **1984–1986.** Côte d'Ivoire and Cameroon: no signing sourced.
- **1992–1996.**
  - Vietnam, Cambodia, Laos, Eritrea, Turkmenistan, Burkina Faso, Gabon, Mauritius, Zimbabwe, Botswana, Madagascar, Mozambique, Namibia, Senegal, Ghana, Equatorial Guinea, Cape Verde, Guinea-Bissau, Uganda, Tanzania, Rwanda, Burundi, North Macedonia (1995, month unknown) and the Oceania states: no signing sourced, or not checked.
  - Mauritania interest sections (Nov 1995): not found.
- **1999–2001.** Sri Lanka (2000): no signing sourced. Mauritania 1999: the date, place and signatories are not in approved sources.

**Possible routes for a later pass:**
- the MFA "Israel's Foreign Relations – Selected Documents" volumes on www.gov.il (URLs not found);
- Knesset plenum protocols for 1948–1977 (scanned PDFs extract badly);
- 18-K editions other than 2021–2023 (not found on gov.il).

## Open issues for the contributor

1. **Morocco: level of relations.**
   - The 2020 declaration is counted as restoring relations, and the 2026 embassy step as an upgrade. The 18-K (2022) says "established full diplomatic relations" in 2020.
   - ToI (2020) describes liaison offices and "resume full official contacts".
   - The 1994 liaison office (Rabin) is **not** counted: the Knesset called it a step "toward" full relations, and no signing is sourced.
   - Please confirm this reading. If 2020 is a restoration, someone may ask what was restored.
2. **Single-publisher signing evidence.** Each of these items meets the rule as applied (official or 2 publishers for the relationship, plus one source saying "signed"), but the word "signed" appears in only one source:
   - China 1992 (JPost)
   - Germany 1965 (ynet, tourism report)
   - Spain 1986 (an MK's speech)
   - Mauritania 1999 (Walla)

   Decide whether to show them or hold them as "Insufficient data". Dropping them would also be consistent, as long as it is applied to all four.
3. **Niue (likud-niue-2023).** Niue is not a UN member and is "part of the realm of New Zealand" (ToI). Ynet calls the parties "שתי המדינות", and JPost calls Niue a "non-UN member state". No approved source says Israel recognized Niue as a state. Confirm whether it counts under the v1.3 "another state" rule.
4. **Turkey 2016 reconciliation agreement.** It was signed (Haaretz) but is treated as an upgrade, because relations had been downgraded, not cut. The Turkey 2022 finding rests partly on the same reasoning. Confirm.
5. **Madagascar (1961) and Gabon (1962) friendship treaties (Mapai).** Signed and registered in UNTS, with a right to accredit diplomats, but not described as establishing relations. Kept out unless the contributor decides otherwise.
6. **Mapai as a predecessor.**
   - IDI documents the 1968 merger and calls Labor Mapai's "heir and continuation". Read here as "a merger in which B joined A", credited to Mapai by name.
   - Eshkol's 1965 Germany item was under his Mapai faction (Alignment list only from 1965-11-22).
   - Confirm. Everything under hademocratim also depends on the Labor → The Democrats link in `hademocratim.md`.
7. **Exact dates still open:**
   - Hungary: September 1989, day unknown.
   - USSR: October 1991, about 18–19 October, day unknown.
   - Bulgaria: late April or early May 1990.
   - Poland: late February 1990.
   - Niue: 31 July or 1 August 2023.
   - Mauritania: October 1999.
   - Spain: January 1986.

   Display month and year where the day is not sourced.
8. **The Bulgaria quote** is joined across a column break in the Knesset .DOC. Check it against the session PDF before shipping.
9. **Hebrew official titles** were not found on an approved host for most items. The Knesset protocols give Hebrew descriptive names for Lebanon, Hungary, Czechoslovakia, Bulgaria, the USSR and the Washington Declaration.
10. **Archived copies:** none were made. The §5 archive step is still to do.
11. **Kosovo** was signed by FM Ashkenazi (Blue and White). It is credited to Likud only because §3.1 credits the PM's party, which should be stated on the card.
