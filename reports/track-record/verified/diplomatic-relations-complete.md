# Diplomatic relations — complete list (methodology v1.5 §3.1)

Snapshot / accessed 2026-10-18. **Status: INCOMPLETE (interim hand-off).** This pass found the official backbone list and set up the PM/party lookup. The country-by-country dating had been handed to six regional research helpers, but this pass ended before their results came back and were re-checked. As a result, **no new row is added here**. Every period and country still to do is listed under "Unchecked / gaps".

## Backbone source(s)

**Official list found (which states, no dates).**
- gov-il \| https://www.gov.il/en/pages/israeli_relations \| 2026-10-18. Title: "List of countries and status of diplomatic relations with Israel". MFA page, published 02.05.2021, updated 15.02.2023. Opened in the built-in browser. Its table has 195 rows, each giving a country and "Status of Diplomatic Relations: Yes/No".
- The page's download "Status of relations – list of countries" (`.xlsx`, same BlobFolder path, opened and unpacked in the browser) has only these columns: number, Hebrew name, English name, "Diplomatic Relations". **It has no establishment or restoration dates.**
- The page's second download, "Map of Israel's foreign relations (Hebrew)" (May 2021 PDF), produced no extractable text, so it was not used.

**No official list with dates was found.** These were checked:
- **Israel's Form 18-K annual reports on www.gov.il, 2021, 2022 and 2023.** Opened and text-extracted. URL pattern: `https://www.gov.il/BlobFolder/dynamiccollectorresultitem/prospectuses_18k_report_<year>/en/Prospectuses_prospectuses_18k_report_<year>.pdf`. The 2018–2020, 2024 and 2025 editions return 404 at that path. The reports give only:
  - a count ("diplomatic relations with 166 countries");
  - the recent events already in `agreements.md` (UAE, Bahrain, Morocco, Bhutan, Kosovo, Chad, Turkey 2022);
  - the 2023 statement "Nicaragua and Belize severed their diplomatic relations with Israel".

  None of them has a dated list.
- **Knesset (knesset.gov.il, fs.knesset.gov.il) and Knesset RIC.** Web searches turned up no consolidated list of establishment dates.

Under v1.5 §3.1 ("Otherwise each period is checked"), the backbone is therefore:
1. the MFA status list, for *which* states;
2. per-country dating from Knesset protocols, gov.il, UNTS, or 2 independent closed-list news publishers.

Step 2 is not done (see gaps).

**MFA list, status "Yes" (backbone for which states must be dated).** Uganda, Uzbekistan, Austria, Australia, Ukraine, Uruguay, Azerbaijan, UAE, Italy, Bahamas, Marshall Islands, Seychelles, Cook Islands, Solomon Islands, Iceland, Ireland, El Salvador, Albania, Angola, Andorra, Antigua & Barbuda, Eswatini, Estonia, Ecuador, Argentina, Eritrea, Armenia, United States, Ethiopia, Bhutan, Bulgaria, Bolivia, Bosnia and Herzegovina, Burundi, Botswana, Burkina Faso, Bahrain, Belarus, Belgium, Belize, Benin, Barbados, Brazil, United Kingdom, Gabon, Ghana, Guatemala, Guyana, Georgia, Guinea, Guinea-Bissau, Equatorial Guinea, Jamaica, Gambia, Germany, Grenada, Dominica, Denmark, South Africa, South Sudan, Haiti, India, Netherlands, Hungary, Honduras, Dominican Republic, DR Congo, Holy See, Vietnam, Vanuatu, Zimbabwe, Zambia, Côte d'Ivoire, Tajikistan, Tuvalu, Togo, Tonga, Tanzania, Trinidad and Tobago, Greece, Japan, Jordan, Lao PDR, Luxembourg, Latvia, Liberia, Lithuania, Liechtenstein, Lesotho, Mauritius, Madagascar, Mozambique, Moldova, Mongolia, Montenegro, Monaco, East Timor, Myanmar, Micronesia, Malawi, Malta, Egypt, Mexico, Morocco, Nauru, Norway, Nigeria, New Zealand, Nicaragua, Namibia, Nepal, Sao Tome & Principe, Suriname, Sierra Leone, China, Singapore, Slovenia, Slovakia, Samoa, San Marino, Senegal, Saint Vincent and the Grenadines, Saint Lucia, Saint Kitts & Nevis, Spain, Serbia, Sri Lanka, Poland, Portugal, Fiji, Philippines, Finland, Palau, Panama, Papua New Guinea, Paraguay, Peru, Chad, Chile, Czech Republic, North Macedonia, France, Colombia, Congo, Kosovo, Costa Rica, Republic of Korea, Kazakhstan, Cape Verde, Kyrgyzstan, Kiribati, Cambodia, Cameroon, Canada, Kenya, Cyprus, Croatia, Rwanda, Romania, Russia, Central African Republic, Sweden, Switzerland, Thailand, Turkey, Turkmenistan.

**Status "No".** Indonesia, Iran, Algeria, Afghanistan, Bangladesh, Brunei, Djibouti, Maldives, Venezuela, Kuwait, Lebanon, Libya, Mauritania, Mali, Malaysia, Niger, Sudan, Somalia, Syria, Saudi Arabia, Oman, Iraq, Pakistan, North Korea, Cuba, Comoros, Qatar, Tunisia, Yemen. Several of these had relations earlier, e.g. Mauritania, Niger, Mali, Iran, Cuba, Venezuela and the Maldives. Those past establishments still need dating.

**Changes after the list's 15.02.2023 update** (to be confirmed per row):
- Nicaragua and Belize severed relations in 2023 (gov-il 18-K 2023, quote above).
- Bolivia severed in 2023 and restored on 2025-12-09 (already listed).
- Colombia severed in 2024. A 2026 restoration is unconfirmed.
- Somaliland was established in 2025 (already listed).
- Niue was established in 2023 (already listed).

**PM and party lookup (official).** All records come from Knesset OData (publisher `knesset`), opened on 2026-10-18:
- PM records: `https://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition?$filter=PositionID eq 45&$format=json`, 67 records;
- faction records: `…?$filter=PersonID eq <id> and PositionID eq 54&$format=json`.

Credit by period:

| period | PM | faction record(s) | credit |
|---|---|---|---|
| 1948-05-14 – 1954-01-26 | Ben-Gurion | KPP 6674 (Provisional Council), 25741, 25881: "מפלגת פועלי ארץ-ישראל" | hademocratim, via **Mapai** |
| 1954-01-26 – 1955-11-03 | Sharett | 25998, 26164: Mapai | hademocratim (Mapai) |
| 1955-11-03 – 1963-06-26 | Ben-Gurion | 26034, 26194, 26343: Mapai | hademocratim (Mapai) |
| 1963-06-26 – 1969-02-26 | Eshkol | 26333 Mapai, to 1965-11-22; 26526 מערך; 26527 Labor from 1968-01-23; 26528 מערך | hademocratim (Mapai / Labor in the Alignment) |
| 1969-02-26 – 1969-03-17 | Allon | 26503: מערך | hademocratim (Labor in the Alignment) |
| 1969-03-17 – 1974-06-03 | Meir | 26645, 26862, 27035: מערך | hademocratim |
| 1974-06-03 – 1977-06-20 | Rabin | 27076, 27251: מערך | hademocratim |
| 1977-06-20 – 1983-10-10 | Begin | 27127, 27304: הליכוד | likud |
| 1983-10-10 – 1984-09-13 | Shamir | 27419, 27564: הליכוד | likud |
| 1984-09-13 – 1986-10-20 | Peres | 27535: מערך | hademocratim |
| 1986-10-20 – 1992-07-13 | Shamir | 27564, 27757: הליכוד | likud |
| 1992-07-13 – 1995-11-04 | Rabin | 27892: Labor | hademocratim |
| 1995-11-05 – 1996-06-18 | Peres | 27881, 28041: Labor | hademocratim |
| 1996-06-18 – 1999-07-06 | Netanyahu | 28011 (joint list ליכוד-גשר-צומת), 28012, 28013, 28223 | likud |
| 1999-07-06 – 2001-03-07 | Barak | 28122: ישראל אחת | hademocratim (Labor in One Israel) |
| 2001-03-07 – 2005-11-23 | Sharon | 28275, 28517: הליכוד | likud |
| 2005-11-23 – 2006-01-04 | Sharon | 28518 אחריות לאומית, then Kadima | **not credited** |
| 2006-01-04 – 2009-03-31 | Olmert | 28289, 28290, 28533: Kadima | **not credited** |
| 2009-03-31 – 2021-06-13 | Netanyahu | 28833, 28982/28983 (Likud joint lists, credited to Likud by name), 29170, 29477, 29625, 29788, 23547 | likud |
| 2021-06-13 – 2022-07-01 | Bennett | 23586: ימינה | **not credited** |
| 2022-07-01 – 2022-12-29 | Lapid | 23597: יש עתיד | beyachad (Yesh Atid) |
| 2022-12-29 – snapshot | Netanyahu | PM record 30679 (no finish date); faction 30204 | likud |

The Mapai, Alignment and Labor continuity is cited in `verified/agreements.md`, on the IDI pages listed there. It is not re-opened here.

## Credited rows

No new row was verified in this pass. The rows below are carried over unchanged from `reports/track-record/verified/agreements.md`, which holds their sources, quotes and accessed dates. They were **not re-opened in this pass**.

| state | established/restored (date) | type | PM (party credited) | sources (publisher-id \| URL \| accessed) | already listed? |
|---|---|---|---|---|---|
| Egypt | 1979-03-26 (treaty; relations under it) | peace treaty | Begin (likud) | see verified/agreements.md, likud-egypt-1979 | already listed |
| United Arab Emirates | 2020-09-15 | establish (peace) | Netanyahu (likud) | likud-uae-2020 | already listed |
| Bahrain | 2020-10-18 (step: 2020-09-15) | establish (peace) | Netanyahu (likud) | likud-bahrain-2020 | already listed |
| Morocco | 2020-12-22 | restore/establish (see Open issue 1 there) | Netanyahu (likud) | likud-morocco-2020 | already listed |
| Hungary | Sept 1989 | restore | Shamir (likud) | likud-hungary-1989 | already listed |
| Czechoslovakia | early Feb 1990 | restore | Shamir (likud) | likud-czechoslovakia-1990 | already listed |
| Poland | late Feb 1990 | restore | Shamir (likud) | likud-poland-1990 | already listed |
| Bulgaria | late Apr / early May 1990 | restore | Shamir (likud) | likud-bulgaria-1990 | already listed |
| USSR | Oct 1991 | restore | Shamir (likud) | likud-ussr-1991 | already listed |
| China | 1992-01-24 | establish | Shamir (likud) | likud-china-1992 | already listed |
| Guinea | 2016-07-20 | restore | Netanyahu (likud) | likud-guinea-2016 | already listed |
| Chad | 2019-01-20 | restore | Netanyahu (likud) | likud-chad-2019 | already listed |
| Bhutan | 2020-12-12 | establish | Netanyahu (likud) | likud-bhutan-2020 | already listed |
| Kosovo | 2021-02-01 | establish | Netanyahu (likud) | likud-kosovo-2021 | already listed |
| Niue | 31 Jul / 1 Aug 2023 | establish ("another state" open) | Netanyahu (likud) | likud-niue-2023 | already listed |
| Bolivia | 2025-12-09 | restore | Netanyahu (likud) | likud-bolivia-2025 | already listed |
| Somaliland | 2025-12-26 | establish | Netanyahu (likud) | likud-somaliland-2025 | already listed |
| Jordan | 1994-10-26 | peace treaty (relations) | Rabin (hademocratim via Labor) | labor-jordan-1994 | already listed |
| West Germany | 1965-05-12 | establish | Eshkol (hademocratim via Mapai) | mapai-germany-1965 | already listed |
| Spain | Jan 1986 | establish | Peres (hademocratim via Labor/Alignment) | labor-spain-1986 | already listed |
| Holy See | 1993-12-30 | establish | Rabin (hademocratim via Labor) | labor-holy-see-1993 | already listed |
| Mauritania | Oct 1999 | establish (severed 2009–10) | Barak (hademocratim via Labor/One Israel) | labor-mauritania-1999 | already listed |

**beyachad (Yesh Atid, 2022-07-01 – 2022-12-29):** nothing qualifying, carried from `agreements.md`. Turkey 2022 is an upgrade: relations were not severed (gov-il MFA statement and 18-K there). Under v1.5 the missing signed text no longer matters, but the upgrade exclusion still applies.

**New rows: none verified in this pass.**

## Not credited (PM's party is not a current party)

| state | date | PM (party) |
|---|---|---|
| — | — | Not yet determined. Establishments or restorations in 2005-11-23 – 2009-03-31 (Sharon after leaving Likud, then Olmert; Kadima) and 2021-06-13 – 2022-07-01 (Bennett, Yamina) have not been dated in this pass. A likely candidate to check is Montenegro (independence in 2006, so its establishment would fall under Olmert), but it is unverified. |

## Unchecked / gaps

**Everything below is unchecked in this pass.** For each "Yes" or formerly-related state, the first establishment and any severance and restoration still need a dated source (official, or 2 closed-list publishers).

1. **1948–1977 (Mapai / Alignment / Labor PMs): fully unchecked.** This covers:
   - USSR, Poland, Czechoslovakia, Hungary, Romania, Bulgaria and Yugoslavia (1948–49 establishments, 1953 and 1967 severances);
   - the US, UK, France and all of Western Europe except West Germany;
   - all of Latin America and the Caribbean (establishments 1948–1970s);
   - Asia: Japan 1952, Burma, Thailand, Philippines, Nepal, Sri Lanka, ROK 1962, Singapore 1969, Laos, Cambodia, the Maldives, and Iran (de facto);
   - every sub-Saharan African establishment, 1957–1966;
   - Cyprus, Malta, Turkey, Greece (de facto), Ireland, Portugal (1977: Rabin or Begin unresolved), Australia, New Zealand, Canada.
2. **1977–1992 (Begin, Shamir, Peres, Shamir), unchecked:**
   - African restorations, e.g. Zaire 1982, Liberia 1983, Côte d'Ivoire and Cameroon 1986, Togo 1987, Kenya 1988, Ethiopia 1989, CAR, Nigeria;
   - 1991 establishments and restorations: Mongolia, Congo, Zambia, Albania, Yugoslavia, Estonia, Latvia, Lithuania (lead: knesset `fs.knesset.gov.il//12/Plenum/12_ptm_236968.DOC`, not opened in this pass);
   - Greece 1990 (establishment or upgrade);
   - India, January 1992;
   - former Soviet republics before 1992-07-13.
3. **1992–1999 (Rabin, Peres, Netanyahu), unchecked:**
   - former Soviet republics and ex-Yugoslav states (the 1992-07-13 and 1996-06-18 PM boundaries matter);
   - Czech Republic and Slovakia (1993 succession);
   - Vietnam, Cambodia, Laos, Eritrea, Turkmenistan;
   - African restorations 1992–97: Uganda, Tanzania, Ghana, Senegal, Gabon, Benin, Burkina Faso, Niger 1996, Gambia, Sierra Leone, etc.;
   - Andorra, Monaco, San Marino, Liechtenstein, Croatia, Bosnia, North Macedonia;
   - Pacific states.
4. **1999–2009 (Barak, Sharon, Olmert), unchecked:** Sri Lanka 2000, Timor-Leste, Montenegro 2006; also the severances of Niger 2002 and Mauritania 2009–10.
5. **2009–2026, partly checked** (rows above, from the earlier pass). Still unchecked under v1.5's no-signature rule:
   - South Sudan 2011 (Netanyahu): was excluded only for lack of a signing;
   - Nicaragua restoration 2017 (Netanyahu): same reason;
   - Bolivia restoration 2019-11-28 (Netanyahu): same reason;
   - Pacific states;
   - Colombia 2026: any restoration needs official or 2-publisher confirmation with a date;
   - Lapid period: re-confirm that no establishment or restoration occurred under v1.5 (the earlier pass searched ToI, JPost, gov.il, ynetnews and Haaretz).
6. **States on the MFA "No" list with past relations** need dating of their establishment and severance: Mauritania (pre-1999), Niger, Mali, Iran, Cuba, Venezuela, the Maldives.
7. **Rows newly eligible under v1.5** (no signed text needed), each to be re-checked with official or 2-publisher evidence: India 1992, South Sudan 2011, Nicaragua 2017, Bolivia 2019, the 1991 Knesset-listed group, Zaire 1982, Liberia 1983, Côte d'Ivoire and Cameroon 1986, Ethiopia 1989, the 1992 ex-Soviet group, Burkina Faso, Gabon, Mauritius, Cambodia, Turkmenistan and Vietnam (1993), Sri Lanka 2000, and Greece 1990.
8. **Helpers.** Six regional research helpers were launched: W. Europe/N. America/Oceania-developed, E. Europe/ex-USSR, W./Central Africa, E./Southern Africa, Asia-Pacific, and Latin America/Caribbean. Their brief is in the session scratchpad. Their output was **not received or verified** before this hand-off, so none of it is used here. Every helper finding must have its URLs re-opened, and its quotes matched, before it is listed.
