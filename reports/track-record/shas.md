# shas — track-record research

Snapshot 2026-10-18 · Methodology v1.1 · Researcher: automated pass 1 (to be independently verified)

Veteran status: confirmed in `reports/track-record/veteran-status.md` (Knesset OData, 2,021 days).

**How sources were opened.** WebFetch returned HTTP 403 for www.gov.il and connection resets for supremedecisions.court.gov.il. Both were therefore opened in the built-in browser. The court rulings were read in full from the court's own download endpoint (HTML for HCJ 8948/22, PDF text for HCJ 232/16). Every row below was checked against the text of the cited source. No web.archive.org copy exists for any cited URL (checked with the read-only availability API), so the archive fields are blank.

## Leader (#1 on the list)

- **Name:** Aryeh Makhluf Deri (דרעי אריה מכלוף)
- **Sources:**
  - gov-il | https://www.gov.il/he/pages/shas_list19 | 2026-10-18. This is the Central Elections Committee page "הבחירות לכנסת ה-26 – התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל".
    - It says: "רשימת המועמדים הוגשה מטעם מפלגת ש"ס - התאחדות הספרדים העולמית שומרי תורה".
    - Published 08.09.2026, updated 29.09.2026.
    - The list shows "1. דרעי אריה מכלוף".
  - ynet | https://www.ynet.co.il/news/elections2026/article/hkjzuqtofe | 2026-10-18. Supporting source only. It states "יו"ר ש"ס אריה דרעי נשאר בראש". The article has no dateline; the image path suggests 2026-09-08.
- **Confidence:** high
- **Note:**
  - The official CEC list page settles the question on its own.
  - It is hosted on www.gov.il, but `sources.ts` lists only `bechirot.gov.il` for publisher `cec`. It is therefore recorded as `gov-il`; see Open issues.
  - The 29.09.2026 update concerns only position 117: the candidate there resigned on 15.9.2026. Position #1 is unchanged.

## Peace and normalization agreements

| id | agreement | other state | signed (date) | PM (party) | sources | confidence | notes |
|---|---|---|---|---|---|---|---|
| — | none | — | — | — | — | — | No prime minister has come from Shas or a documented predecessor, so §3.1 credits no agreement to this party. This is a negative statement and no source was cited for it. The verifier may confirm it against the Knesset list of prime ministers. |

## Major reforms

| id | name | date | led by (minister, ministry) | nationwide evidence | scale (value, unit, source) | stated goal (source) | indicator | before (value, date) | after (value, date) | direction | evaluation source | confidence | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| — | none qualifying | | | | | | | | | | | | No candidate met every §3.2 condition: led by a Shas minister, nationwide, officially stated scale, and an evaluation body showing the indicator moved toward the goal. See Rejected candidates. The section should show "Insufficient data". |

## Legislation

| id | law (Hebrew name) | final reading date | initiator/sponsor (party role) | Knesset source | stated goal (source) | indicator | before | after | direction | evaluation source | confidence | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| — | none qualifying | | | | | | | | | | | No law initiated by a Shas MK or sponsored by a Shas minister was found with an evaluation-body source (State Comptroller, Bank of Israel, CBS, Knesset RIC, IDI, or peer-reviewed) showing that its stated goal was met. The section should show "Insufficient data". |

## Leader's legal record

Shared sources used below:
- **[S1]** courts | https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%2F22%2F480%2F089%2Fv17&fileName=22089480.V17&type=2 | 2026-10-18
  - HCJ 8948/22 Sheinfeld v. Knesset (בג"ץ 8948/22 שיינפלד נ' הכנסת), judgment of 18.1.2023, "רקע הדברים" paragraphs 2–11.
- **[S2]** courts | https://supremedecisions.court.gov.il/Home/Download?path=HebrewVerdicts%2F16%2F320%2F002%2Fh04&fileName=16002320_h04.txt&type=4 | 2026-10-18
  - HCJ 232/16 Movement for Quality Government v. Prime Minister (בג"ץ 232/16 התנועה למען איכות השלטון נ' ראש ממשלת ישראל), judgment of 8.5.2016, paragraphs 2–4 and the Handel opinion.

| id | status | since | ended | description (source's terms) | sources (in priority order) | confidence | notes |
|---|---|---|---|---|---|---|---|
| personal-case-bribery | Concluded: convicted (final). Moral turpitude (קלון): the District Court ruled that it attaches to the conviction ([S2] para 3). | 1993 (indictment, ת"פ (מחוזי י-ם) 305/93) | 2000-07-12 (Supreme Court appeal judgment) | **"התיק האישי".** Charges concerned acts in 1984–1990 at the Interior Ministry, including as minister: "לקיחת שוחד וניצול של תפקידו על מנת לקדם את ענייניה של עמותה" ([S1] para 2).<br>**District Court (1999):** the Jerusalem District Court convicted him of "לקיחת שוחד בסכום כולל של 155,000 דולר", three counts of fraud and breach of trust, and obtaining by fraud under aggravating circumstances. Sentence: 4 years in prison and a NIS 250,000 fine (sentencing 15.4.1999).<br>**Appeal (ע"פ 3575/99):** the Supreme Court partly accepted the appeal. It acquitted him on one fraud and breach-of-trust count, narrowed the bribery conviction, and reduced the sentence to 3 years in prison.<br>**Release:** July 2002, after serving two-thirds of the sentence ([S1] para 3). | courts [S1]; courts [S2] | high | [S2] para 3 dates the appeal judgment 12.7.2000. In 1993, HCJ 3094/93 ordered his removal as Interior Minister after the decision to indict. That was an administrative ruling, not a separate criminal proceeding ([S1] para 2). |
| public-case-breach-of-trust | Concluded: convicted (final). See notes. | 1999 (case no. ת"פ (שלום י-ם) 1872/99; the exact indictment date is not stated) | 2003-11-20 (sentence) | **"התיק הציבורי".** He was convicted of one count of breach of trust for acts in 1989 as Interior Minister: arranging NIS 400,000 in support, through the Jerusalem municipality, to an association run by his brother ([S1] para 4; [S2] para 4).<br>**Verdict:** 24.9.2003 ([S2]).<br>**Sentence (20.11.2003):** 3 months suspended prison and a NIS 10,000 fine, or 15 days in prison instead ([S1] para 4). | courts [S1]; courts [S2] | medium-high | Neither source uses the word "final". [S2] calls it a conviction and states that no further conviction has been recorded against him since. Neither source mentions an appeal. Neither source mentions moral turpitude for this case. |
| bar-on-hebron | Concluded: case closed. Reason as stated by the source: "על רקע הרשעתו ב'תיק האישי' והתקדמות ההליכים ב'תיק הציבורי'". | 1997-04 (the AG adopted the indictment recommendation, subject to a hearing) | 2001-12-16 | **"פרשת בר-און חברון".** Suspicion that he made Shas's support for the "Hebron agreement" conditional on appointing attorney Roni Bar-On as Attorney General, to obtain a favourable plea deal in the personal case.<br>**Recommendation:** the State Attorney recommended indictment for fraud and breach of trust, extortion by threats and obstruction of justice, subject to a hearing and lifting of immunity. The AG adopted this in April 1997.<br>**Closure:** "ביום 16.12.2001 הורה היועץ המשפטי לממשלה על סגירת התיק" ([S1] paras 5 and the Handel opinion). | courts [S1]; courts [S2] | high | [S2] adds that, in the AG's view at the time, "החשדות לא הופרכו" and the file was closed for non-evidentiary reasons. No indictment was filed. |
| 2016-investigation-non-tax | Concluded: case closed. Reason as stated by the source: "לא נמצא בסיס ראייתי מספיק לצורך העמדתו לדין". | 2016-03 (the AG ordered a criminal investigation) | 2021-01-08 (AG announcement) | In March 2016, AG Avichai Mandelblit ordered a criminal investigation "בחשדות חמורים הנוגעים, בין היתר, לעבירות שוחד, מרמה והפרת אמונים והלבנת הון". On 8.1.2021 the AG announced that, apart from the tax matters, "לא נמצא בסיס ראייתי מספיק לצורך העמדתו לדין" ([S1] para 7). | courts [S1] | high | Same investigation as the next row. The two rows are split because the outcomes differ; the human reviewer may merge them. The 2018 police recommendation is not included (news only, not verified). |
| tax-offenses-plea | Concluded: convicted under a plea agreement (final). Moral turpitude: no court ruling (see notes). | 2021-01-08 (decision to indict, subject to a hearing) | 2022-02-01 (plea agreement approved and sentence imposed) | **Decision to indict (8.1.2021):** the AG found a sufficient evidentiary basis to consider indictment, subject to a hearing, for "חלק מהאירועים שעניינם עבירות מס".<br>**Plea agreement:** signed 23.12.2021 and filed 26.12.2021 in the Jerusalem Magistrate's Court (ת"פ (שלום י-ם) 56231-12-21).<br>**Offenses:** aiding an incorrect declaration (Real Estate Taxation Law §98(ג1)); an incorrect report without reasonable justification (Income Tax Ordinance §217); 2 counts of failing to file a report on time (§216(4)); 2 counts of failing to keep books (§216(5)).<br>**Conviction:** he resigned from the Knesset on 23.1.2022 and was convicted on his admission on 25.1.2022.<br>**Sentence:** on 1.2.2022 the court approved the plea agreement: 12 months suspended prison for 3 years and a NIS 180,000 fine, or a year in prison instead ([S1] paras 7–11). | courts [S1] | high | **Moral turpitude:** plea agreement §4 says the AG "לא טוען בעניין הקלון בפני הערכאה הדיונית". HCJ 8954/21 (17.1.2022) held that if he resigned, the criminal court would have no power to rule on moral turpitude ([S1] para 9).<br>**Finality:** the word "final" is not used. [S1] (2023) treats these as "העבירות האחרונות שבהן הורשע" and mentions no appeal.<br>**HCJ 8948/22 (18.1.2023):** later voided his appointment as minister. That ruling is administrative, not a criminal proceeding. |

## Rejected candidates

| candidate | section | reason |
|---|---|---|
| Food-assistance cards (כרטיסי סיוע לרכישת מזון), Interior Ministry under Deri, 2020–21 | Reforms | No evaluation-body source found showing a food-security indicator moved toward the goal. The allocation was challenged in the HCJ and partly moved to the Welfare Ministry (news leads only, not opened or cited). |
| Mandatory pension extension order (צו הרחבה לביטוח פנסיוני מקיף במשק), 2008, Industry-Trade-Labor Minister Eli Yishai | Reforms | The underlying agreement was negotiated by the Histadrut and the employers' organizations. The minister's role was to issue the extension order, which does not clearly meet "led by a minister" (§3.2). The signature was not confirmed from an approved source. Not pursued further, so as not to stretch the rule. |
| Cellular number portability (ניוד מספרים), 2007, Communications Minister Ariel Atias | Reforms | The obligation came from the Communications Law, not from a program the minister led. No evaluation-body source found. News leads only. |
| Minimum-wage update order, April 2025, Labor Minister Yoav Ben-Tzur | Reforms | This is a statutory periodic update under the Minimum Wage Law, not a reform the minister led. No evaluation source. |
| israelhayom.co.il/israelnow/article/21382356 (Shas list submitted) | Leader | HTTP 403. Could not be opened, so not cited. |
| mako.co.il liveblog 5bc9483b18b70a1026 | Leader | Opened. It reports the list's composition (Deri #1) but not its submission to the CEC, so it is superseded by the official CEC page. |
| idi.org.il/media/32339/שס.pdf | Leader | A printed copy of the gov.il CEC page; the original was cited instead. |
| AG announcement of 8.1.2021 on gov.il / CEC 25th-Knesset disqualification file | Legal | No standalone gov.il press release was found. The step is covered by court ruling [S1], which has higher priority. |
| Police recommendation to indict (Nov 2018) | Legal | Only news leads were found (not opened). It is an intermediate step inside a case whose outcome is established by [S1]. |

## Open issues

- **Source access:** WebFetch was blocked for gov.il (403) and supremedecisions.court.gov.il (ECONNRESET). All three official sources were opened through the built-in browser instead. The verifier should re-open them the same way.
- **CEC host:** the CEC candidate list is published on `www.gov.il`, but `sources.ts` lists `bechirot.gov.il` only for `cec`. It was recorded as `gov-il`. Adding `www.gov.il` to `cec` would be a data fix (allowed per the comment in `sources.ts`).
- **Finality:**
  - The public case (2003) and the tax plea conviction (2022) are not called "final" in the cited rulings. The status "final" rests on the Supreme Court's later description of them as convictions, with no appeal mentioned.
  - The verifier should confirm, or downgrade the status wording.
- **Moral turpitude in the personal case:** it is sourced to the District Court via [S2]. [S2] does not say whether the Supreme Court revisited it on appeal.
- **Indictment dates:** exact dates for the personal case (1993) and the public case (1999) are not stated in the sources. The years come from the case numbers or the surrounding narrative.
- **Row structure:** the 2016–2021 investigation is shown as two rows (non-tax closed / tax plea). The human reviewer should decide whether to merge them.
- **Reforms and legislation:** this pass did not survey every Shas ministry systematically (Interior, Labor & Welfare, Religious Services, Health, Communications, Housing, Economy, Negev & Galilee). A deeper pass could search State Comptroller and Knesset RIC reports for any Shas-led program with before/after data. Nothing found so far meets §3.2/§3.3.
- **Peace section:** the "no Shas prime minister" statement is not sourced; it should be confirmed if the site displays an explicit empty state.
