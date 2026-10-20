# Sample evaluation of verified research

**Method.** I numbered every final row in file order:
- `legal.md`: rows 1–35. Only "Final rows" table rows count. The "No criminal proceedings were found" lists (Bennett, Gantz, Asher, Abbas, Jabareen) are not table rows and were not numbered.
- `agreements.md`: rows 36–58. These are the "Peace / normalization" and "Diplomatic relations only" tables. The continuity table and the beyachad "— none" placeholder rows were not numbered.
- `reforms-legislation.md`: rows 59–61. These are the three kept items: Open Skies, cellular and sugar tax. The Ra'am item (verdict DROP) and the CBS traffic table were not numbered.

Verdict tables were excluded.

From the 61 rows I took two groups:
- **Systematic 20%:** every 5th row starting at row 1 (1, 6, 11 … 61). That is 13 rows.
- **High-stakes rows:** every `legal.md` row whose status is "Open…" or "arrest warrant issued". That adds 11 more: 2, 3, 4, 8, 9, 10, 17, 18, 19, 22, 29. Row 1 is in both groups.

**How sources were opened.** I opened every cited URL in the sampled rows, using four methods:
- the built-in browser for supremedecisions.court.gov.il, www.gov.il and boi.org.il;
- WebFetch for timesofisrael.com;
- curl with text extraction for the other news sites and for knesset.gov.il (OData, .DOC, PDF);
- macOS PDFKit for the UNTS and RIC PDFs.

For the peer-reviewed DOI, the DOI resolved and the abstract was read through the Europe PMC API. Downloads went to a scratch directory only, nothing was saved in the repo, and no archive links were checked.

**Rule checks per row:**
- formally started proceedings only (§4.3);
- identity tied to the leader (§4.3);
- PM's-party credit (§3.1);
- the signed / established evidence bar;
- the closed source list (§5) and the publisher-to-host match (`sources.ts`);
- 2 independent publishers where news is used.

**Sample size:** 24 of 61 rows (39%): 13 systematic and 11 high-stakes.
**Date:** 2026-10-19

## Results summary

| file | rows | sampled | correct | minor | major | unverifiable |
|---|---|---|---|---|---|---|
| legal.md | 35 | 18 (7 systematic + 11 high-stakes) | 16 | 2 | 0 | 0 |
| agreements.md | 23 | 5 | 5 | 0 | 0 | 0 |
| reforms-legislation.md | 3 | 1 | 1 | 0 | 0 | 0 |
| **total** | **61** | **24** | **22** | **2** | **0** | **0** |

**Overall error rates:**
- **Major:** 0 of 24, i.e. 0.0%.
- **Minor + major:** 2 of 24, i.e. 8.3%.
- **Systematic sample only (13 rows, unbiased by the high-stakes add-on):** major 0 of 13 (0%); minor + major 2 of 13 (15.4%).

**Statistical caveat:** with 0 major errors in 24 rows, the 95% upper bound on the true major-error rate is still about 12.5% (rule of three: 3/24). The sample shows no major errors, but it cannot prove the rate is below 5%.

**Not scored as errors:**
- **Broken link (row 61):** one cited supporting URL now returns 404.
- **Open contributor rulings (rows 4, 22, 51):** the verifier already flagged these as needing a decision. See Recommendations.

## Row-by-row

| # | file | row id | score | what was checked | issue (if any) | source opened |
|---|---|---|---|---|---|---|
| 1 | legal.md | legal-cases-1000-2000-4000 | MINOR ERROR | Checked:<br>• HCJ 2848/19: 28.2.2019 notice "שוקל להעמידו לדין", §290/§284.<br>• HCJ 3056/20: "ביום 28.1.2020, הוגש … כתב אישום".<br>• HCJ 2592/20: three counts pending.<br>• ToI 2019-02-28 and 2019-11-21, ynet 2019-11-22: bribery in 4000, fraud and breach in 1000/2000.<br>• Walla 2020-01-28: filing.<br>• JPost and ToI: pardon request 2025-11-30.<br>• ToI liveblog 2026-02-12: "has not yet made any decision".<br>• Walla 2026-09-17: "לא נענה בכלל".<br>• N12: "לאורך פרשת ההגנה".<br>Rule: formally started, official sources first. OK. | The row says "Mandelblit testified for the defense on 2026-10-11". Both cited sources were published that morning, before the hearing: ynet 2026-10-10/11, "מנדלבליט יעיד היום", and N12 2026-10-11 08:25, "יעיד". Neither confirms that he actually testified. Rewording to "was scheduled to testify" would fix it. The row's meaning holds. | All 15 URLs: 3 court, 4 ToI, 3 ynet, 3 Walla, N12, JPost |
| 2 | legal.md | legal-icc-palestine-2024 | CORRECT | Checked:<br>• JPost 2024-11-21: "starvation as a method of warfare"; murder, persecution and other inhumane acts.<br>• Haaretz: "alleged".<br>• ToI 2025-12-15: appeals judges rejected Israel's challenge; the warrants "remain in place".<br>• ToI 2026-07-24: they "can only be withdrawn by ICC judges".<br>• JPost 2026-09-24: warrant still in place.<br>Rule: 2 independent publishers as the §4.5 fallback; jurisdiction label. OK. | — (the ICC's own pages remain unopened, as already disclosed) | All 5 URLs |
| 3 | legal.md | legal-turkey-gaza-2025 | CORRECT | Checked:<br>• ToI 2025-11-08: 37 suspects (Netanyahu + 36), "genocide and crimes against humanity", "firmly rejects, with contempt".<br>• JPost 2025-11-07: 37 warrants, Netanyahu named. | Trivial: the sources say "Istanbul (Public) Prosecutor's Office", while the status label says "Chief Public Prosecutor's Office". Not counted as an error. | Both URLs |
| 4 | legal.md | legal-turkey-flotilla-2026 | CORRECT | Checked:<br>• JPost 2026-04-12: indictment "on Friday" (2026-04-10) over the October 2025 Sumud flotilla.<br>• ToI 2026-04-12: "reportedly filed indictments against 35".<br>• ynetnews 2026-08-21: 11th High Criminal Court, 35 defendants, July 14 warrant, "The request does not mean that Interpol has issued the notices".<br>• ToI 2026-08-21 (article and liveblog): warrant for "genocide", "larger case against 35 people".<br>Each step has 2 publishers. | No error in the row. The disclosed conflict is real: ToI says the interception was "in May" (caption: 2026-05-18), while ynetnews says "the previous Yom Kippur", which matches the October 2025 flotilla. The merge into one row rests on ynetnews. Contributor ruling still pending (Open issue 2). | All 5 URLs |
| 6 | legal.md | legal-bar-on-hebron-1997 | CORRECT | Checked HCJ 2534/97:<br>• "הביאה לפתיחת חקירה משטרתית נגד כל המעורבים".<br>• 18.4.97: "לסגור תיקי החקירה שנפתחו נגד ראש הממשלה … מחוסר ראיות מספיקות", despite the police recommendation.<br>• 15.6.97: "הוחלט ברוב דעות, לדחות את העתירות".<br>All quotes exact. | — (nuance: the police recommendation was "(בכפוף לחקירתו פעם נוספת)"; not material) | Court URL |
| 8 | legal.md | BG-01 italy-flotilla-investigation | CORRECT | Checked:<br>• ToI 2026-06-08: "under investigation"; ANSA: "torture and kidnapping", underway "several weeks".<br>• N12 2026-10-16: "החקירה הפלילית נגד השר … בן גביר באיטליה מתרחבת"; "התביעה ברומא".<br>• ToI 2026-10-16: "expands an investigation that was previously focused on" Ben Gvir.<br>Rule: formally opened by prosecutors; identity explicit. | — | All 3 URLs |
| 9 | legal.md | BG-T1 turkey-gaza-2025 | CORRECT | Checked:<br>• ToI: names "National Security Minister Itamar Ben Gvir" among the 37.<br>• JPost: "The warrant names Netanyahu, … Ben-Gvir".<br>Same-rules-for-everyone addition is consistent with row 3. | — | Both URLs |
| 10 | legal.md | BG-T2 turkey-flotilla-indictment-2026 | CORRECT | Checked:<br>• ToI 2026-04-12: "reportedly filed indictments against 35 top officials", naming Ben Gvir.<br>• JPost: "The 35-member list of those charged also includes … Ben-Gvir".<br>The "(as reported)" label matches ToI. | — | Both URLs |
| 11 | legal.md | BG-03 threats-investigation-2021 | CORRECT | Checked:<br>• HCJ 8910/22 para 2: "נפתחה חקירה … בחשד שביצע עבירת איומים בכך ששלף נשק כלפי מאבטחים … בחודש דצמבר 2021"; "לגנוז את תיק החקירה"; "אינו מקים סיכוי סביר להרשעתו".<br>• N12 2023-09-28: "שנפתח אשתקד".<br>• Maariv 28/09/2023: closure confirmed. | — | All 3 URLs |
| 16 | legal.md | BG-09 insulting-a-public-servant | CORRECT | Checked RAP 1941/98:<br>• Two counts under §288 and one under §216(א)(4).<br>• Complainant MK Ran Cohen.<br>• District Court ע"פ 1156/97 judgment of 12.2.98.<br>• "לפיכך, נדחית הבקשה. ניתנה היום … (8.4.98)". | — | Court URL |
| 17 | legal.md | BG-10 agripas-apartment | CORRECT | Checked BSP 4190/07 (a06, a07):<br>• "בחודש ינואר 2006 הוגש כתב אישום … החזקת פרסום גזעני, החזקת פרסום המסית לאלימות או לטרור ותמיכה בארגון טרור".<br>• Agripas 143 apartment, February–August 2002.<br>• "אני מחליט לדחות את העתירה … (16.3.2008)".<br>Rule: the "not confirmed" label is correctly applied, because the acquittal rests on one publisher. | — | Both court URLs |
| 18 | legal.md | BG-12 magistrates-file-2589/98 | CORRECT | Checked ע"פ 3963/00:<br>• "הוגש כתב אישום המייחס למערער עבירות של התנהגות פסולה במקום ציבורי והפרעה לשוטר".<br>• Case set "להשלמת ראיות הגנה ולסיכומים".<br>• "הערעור נדחה. ניתן היום … (4.7.2000)". | — | Court URL |
| 19 | legal.md | BG-13 magistrates-file-4346/97 | CORRECT | Checked ע"פ 8424/02:<br>• ת.פ. 4346/97, with Ben Gvir as appellant.<br>• "והתיק מחכה עתה לפסק דין".<br>• "הערעור נדחה. ניתן היום … (23.10.2002)".<br>Charges not stated, as the row says. | — | Court URL |
| 21 | legal.md | SM-01 detention-2005 | CORRECT | Checked:<br>• BSP 7194/05: Smotrich is appellant 3; "ביום 12.7.05 נעצרו … קשירת קשר לפשע; … והמרדה"; "הערר נדחה. ניתנה היום … (27.7.05)".<br>• ynetnews 2015-01-12: "No charges were ultimately brought against him".<br>• ToI: "held by the Shin Bet for three weeks but never charged". | — | All 3 URLs |
| 22 | legal.md | SM-02 icc-arrest-warrant-application | CORRECT | Checked:<br>• ToI 2026-05-19: Smotrich quote "submitted a request for a secret, international arrest warrant against me".<br>• JPost 2026-05-18: "forcible transfer of population", "apartheid"; the prosecutor's office "did not deny"; submitted "on April 2"; the court "denies that new arrest warrants have been issued".<br>• ynetnews 2026-05-18: two sources said the report was "credible".<br>Labelled "reported; not confirmed by the ICC". | No error. Rule note: JPost and ynetnews both relay one upstream report (Middle East Eye). They are different publishers, so they meet §5's definition of "independent", but they are not independent reporting. The verifier's existing flag (Open issue 1) should get its ruling. | All 3 URLs |
| 26 | legal.md | DR-04 investigation-2016-non-tax | CORRECT | Checked:<br>• HCJ 8948/22 para 7: March 2016 investigation into "שוחד, מרמה והפרת אמונים והלבנת הון"; 8.1.2021: "לא נמצא בסיס ראייתי מספיק לצורך העמדתו לדין".<br>• N12 and ynet 2018-11-20: police recommendation (fraud, breach of trust, tax/economic offences). | — | All 3 URLs |
| 29 | legal.md | bar-on-1997 (Liberman) | CORRECT | Checked:<br>• Globes 64045 (23.4.1997): "תימשך החקירה נגד מנכ"ל משרד ראש הממשלה אביגדור ליברמן".<br>• Globes 108162: "המשטרה המליצה להעמיד לדין גם את נתניהו, הנגבי וליברמן … ולהמשיך בחקירה נגד ליברמן".<br>• ynet 2018: police recommendation.<br>• ToI 2019: "closed both cases", no date.<br>The "not confirmed" label is correct, because the closure rests on one publisher. | — (the quote sits in 108162 rather than 64045; both are cited) | All 4 URLs |
| 31 | legal.md | campaign-financing-first-case | MINOR ERROR | Checked:<br>• ynet and Walla 2008-08-11: Mazuz shelved "התיק הראשון" over the Party Financing Law, fraud and breach of trust, and false corporate entries, for "היעדר ראיות מספיקות לכתב אישום"; the bribery file stayed open. | The "since" field misattributes its sources. It says "1998 (Walla and ynet, 2008)", but the cited ynet 2008 article (L-3580779) says "בתיק החקירה שנפתח ב-2001". The 1998-leaning ynet item is L-3319229, from 2006 ("שמונה שנים"). The ynet 2011 and 2012 articles quoted for 2001 are not in the row's source list. The conclusion ("not confirmed; sources differ") still holds. | All 3 URLs |
| 36 | agreements.md | likud-egypt-1979 | CORRECT | Checked:<br>• UNTS I-17855: Art. I "The state of war … will be terminated"; "Came into force on 25 April 1979 … Om-Khosheib"; "Signed by Menachem Begin"; "DONE at Washington, D.C., this 26th day of March, 1979".<br>• gov.il "Peace with Egypt": signed 26 March 1979; "cessation of the state of war".<br>• gov.il "Camp David Accords": signed by Sadat and Begin; dated 17.09.1978.<br>• ToI: Washington ceremony.<br>• KPP(4065) Begin PM 1977–81; KPP(27127) faction הליכוד. | — (informational: the gov.il "Peace with Egypt" page dates the Camp David Accords to 18 September 1978, while the Camp David page cited for that step gives 17.09.1978) | All 4 URLs + 2 OData |
| 41 | agreements.md | likud-hungary-1989 | CORRECT | Checked the Knesset protocol of 7 May 1990, FM Arens:<br>• "בספטמבר 1989 חתמתי בבודפשט על פרוטוקול חידוש היחסים עם הונגריה".<br>• "בבודפשט, בפראג ובוורשה, בעת מעמד טקסי החתימה".<br>• KPP(4298): Shamir PM 1988-12-22 to 1990-06-11. KPP(27757): faction הליכוד.<br>Official source; signed; restore. | — | Knesset .DOC + 2 OData |
| 46 | agreements.md | likud-china-1992 | CORRECT | Checked:<br>• JPost 2021-11-17: "On January 24, 1992, … David Levy … signed an agreement for the establishment of diplomatic relations … Qian Qichen".<br>• ynetnews 2026-05-06: embassy, "1992 joint communique establishing diplomatic relations".<br>• JPost 2026-09-10: 24 January 1992.<br>• KPP(4525) Shamir PM 1990–92.<br>Rule: 2 publishers (JPost and ynet). OK. | — | All 3 URLs + 2 OData |
| 51 | agreements.md | likud-niue-2023 | CORRECT | Checked:<br>• ToI 2023-08-04: Yaakoby "visited Niue on Monday to sign an agreement with Premier Dalton Tagelagi"; "part of the realm of New Zealand".<br>• ynet 2023-08-04: "חתם על הסכם כינון היחסים", "ביום שלישי".<br>• N12 2023-08-04: MFA announcement.<br>• JPost: "non-UN member states, the Cook Islands and Niue".<br>• KPP(30679) Netanyahu PM. | No error. The "another state" ruling (Open issue 3) is still pending. The two signing dates are correctly reported as uncertain. | All 4 URLs + 2 OData |
| 56 | agreements.md | labor-spain-1986 | CORRECT | Checked:<br>• Knesset protocol of 3 February 1986, MK Mattityahu Peled: "לאחר שנחתם הסכם של החלפת שגרירים … לא בספרד אלא בהולנד".<br>• Knesset protocol of 7 October 1986, PM Peres: "כוננו יחסים דיפלומטיים עם ספרד".<br>• Haaretz 2004-12-02 (Moratinos): "On January 17 … establishment of diplomatic relations".<br>• KPP(4317) Peres PM 1984–86; KPP(27535) faction מערך. | — | 2 Knesset .DOC + Haaretz + 2 OData |
| 61 | reforms-legislation.md | reform-ssb-tax-2022 | CORRECT | Checked:<br>• Decision 263 (01.08.2021, 36th government): "על מנת לצמצם את התחלואה העודפת…", "להנחות את שר האוצר", proposed rates 1.3 / 0.7.<br>• RIC 2021-10-26: order signed by Liberman as Finance Minister; about NIS 380m a year.<br>• Finance Ministry review (August 2026): about NIS 900m in 2022, about NIS 1.05bn in 2025, 370.2 / 326.3 million litres; tax period 1.1.2022–29.3.2023; further temporary order; permanent repeal January 2025; footnote typo "236".<br>• BoI press release (17/11/2022, updated 22/02/2023): every figure in the row matches Table 1 (−16/−11, −22/−10, −13/−10, −14/−5; untaxed −7/−9); rates 1 / 0.7; confounders and exclusions.<br>• Decision 397 (28.03.2023): "לבטל את החלטת הממשלה מס' 263", "לפרק הזמן שיקבע שר האוצר".<br>• DOI resolves; Europe PMC abstract: −30.7% / −24.1%, then −24% / −13%; no change for small beverages.<br>• KPP(24085) Finance Minister 2021-06-13 to 2022-11-15; KPP(23604) faction ישראל ביתנו.<br>Rules: §3.2 instrument (v1.3), nationwide, scale, §3.3 evaluation body. OK. | No content error. **Link defect:** the second Knesset RIC source (2024-02-11, `…_11_20502.pdf`) returns HTTP 404 from curl (IPv4) and from WebFetch. The repeal it confirms is also covered by Decision 397 and the gov.il review, so the row still holds. | All 9 URLs (1 dead) + 2 OData |

**Closed list and host checks.** Every sampled source belongs to a publisher on the closed list, and every URL host matches that publisher's hosts in `sources.ts`. This includes:
- ynetnews.com under ynet;
- mako.co.il under n12;
- finance.walla.co.il under walla;
- fs.knesset.gov.il under knesset / knesset-ric;
- supremedecisions.court.gov.il under courts.

Middle East Eye is referred to only inside JPost and ynet articles; it is never cited directly.

## Recommendations

1. **No file crosses the 5% major-error threshold in this sample (0 major errors).** No full re-check is triggered. Because the 95% upper bound is about 12.5%, the threshold is not proven met either. If the contributor wants that assurance, the cheapest step is to extend the systematic sample to every 3rd row (about 20 rows). Start with `legal.md` (35 rows, highest stakes); it has the most rows and both minor errors.
2. **Fix the two minor errors before data entry:**
   - Row 1: reword "testified … on 2026-10-11" to "scheduled to testify from 2026-10-11", or cite a post-hearing report.
   - Row 31: correct the "since" source attribution. ynet 2008 says 2001; the 1998 reading comes from Walla 2008 and, by implication, ynet 2006. Either add the ynet 2011 and 2012 URLs to the sources or drop those references.
3. **Targeted re-check of two error patterns across all of `legal.md`:**
   - (a) descriptions of events that were scheduled or forecast in the cited article but are written as completed;
   - (b) "since" and "ended" fields that attribute dates to specific sources.
   
   Both minor errors are of these types, and they are quick to scan for.
4. **Fix the dead RIC link** in `reforms-legislation.md` (sugar tax, RIC 2024-02-11). Either find the current URL, or drop the link and rely on Decision 397 and the gov.il review.
5. **Pending contributor rulings that the sample touched:**
   - Turkey flotilla merge (row 4): the May-versus-October flotilla conflict between ToI and ynetnews is real.
   - SM-02 (row 22): both news reports trace back to one upstream outlet.
   - Niue statehood (row 51).
   
   These are rule decisions, not research errors. They should be settled before shipping.
6. **§5 archive copies:** none of the three files has web.archive.org links. This applies to every row, not only the sample, and is a process step that is still outstanding.
7. **Informational, agreements.md:** the two gov.il pages disagree on the Camp David date (17 versus 18 September 1978). The row cites the page that gives 17.09.1978, which matches the accords text. No change is needed; note it in case a reviewer compares the pages.
