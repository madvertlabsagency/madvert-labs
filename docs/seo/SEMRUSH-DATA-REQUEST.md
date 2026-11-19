# Semrush data needed (in priority order)

Export as CSV or Excel where the plan allows; otherwise full-page screenshots. Name each file as listed.
Database: **Pakistan (pk)** unless stated. Repeat the marked reports for **United States (us)** and **United Arab Emirates (ae)**.

## 1. Our own site
| # | Report (Semrush menu) | Settings | File name |
|---|---|---|---|
| 1 | Organic Research → Positions | domain `madvertlabs.com`, root domain, pk, then us | `semrush-positions-pk.csv`, `semrush-positions-us.csv` |
| 2 | Organic Research → Pages | same | `semrush-pages-pk.csv` |
| 3 | Backlink Analytics → Overview + Referring Domains | `madvertlabs.com` | `semrush-backlinks.csv` |
| 4 | Site Audit → Issues | project `madvertlabs.com`, crawl all pages | `semrush-site-audit.csv` (or screenshots of Errors and Warnings) |

## 2. Competitors (5 sites you lose deals to, or that rank for "digital marketing agency karachi")
| # | Report | Settings | File name |
|---|---|---|---|
| 5 | Organic Research → Competitors | `madvertlabs.com`, pk | `semrush-competitors.csv` |
| 6 | Organic Research → Positions | each competitor, pk, top 100 by traffic | `competitor-<name>-positions.csv` |
| 7 | Organic Research → Pages | each competitor, pk | `competitor-<name>-pages.csv` |
| 8 | Keyword Gap | madvertlabs.com vs up to 4 competitors, pk, filter **Missing** and **Weak** | `semrush-keyword-gap.csv` |
| 9 | Backlink Gap | same domains | `semrush-backlink-gap.csv` |

## 3. Keyword research
| # | Report | Seeds | File name |
|---|---|---|---|
| 10 | Keyword Magic Tool (pk), all match types, then the **Questions** filter | meta ads, facebook ads, lead generation, digital marketing agency, seo, google ads, marketing automation, crm, real estate leads, whatsapp marketing | `kmt-<seed>-pk.csv` and `kmt-<seed>-questions-pk.csv` |
| 11 | Keyword Magic Tool (us) | white label marketing, b2b lead generation, answer engine optimization, generative engine optimization, ai seo, gohighlevel | `kmt-<seed>-us.csv` |
| 12 | Keyword Overview → Bulk analysis | paste `docs/seo/keyword-lists/pakistan.txt`, then `united-states.txt`, `united-arab-emirates.txt` | `bulk-pk.csv`, `bulk-us.csv`, `bulk-ae.csv` |

## 4. Not Semrush, but just as useful
| # | Source | What | File name |
|---|---|---|---|
| 13 | Google Search Console | Performance, last 3 months: Queries, Pages, Countries (and repeat every month) | `gsc-queries.csv`, `gsc-pages.csv` |
| 14 | GA4 | Reports → Engagement → Landing page, filter Session default channel group = Organic Search, last 3 months, with key events | `ga4-organic-landing-pages.csv` |
| 15 | Bing Webmaster Tools | Search Performance → Keywords and Pages | `bing-keywords.csv`, `bing-pages.csv` |
| 16 | Your team | 20 real customer questions from calls and WhatsApp; 5 to 10 of Usama's strong opinions (voice notes are fine) | any format |
| 17 | Your data (for original research) | Anonymised campaign numbers per industry: spend, CPM, CTR, leads, qualified leads, meetings, closes | spreadsheet |

Item 17 lets us publish original benchmark studies (for example "Meta Ads lead generation benchmarks in Pakistan"), the type of content other sites and AI answers cite. Only aggregated, anonymised numbers will be published, and only with your approval.

## What each export is used for
- Positions + GSC queries → striking-distance keywords (positions 5 to 20) to push onto page 1 first.
- Pages + GSC pages → content refresh: pages losing clicks, high impressions with low CTR, cannibalisation.
- Keyword Gap + competitor pages → topics competitors rank for that Madvert Labs has no page for.
- Keyword Magic Tool + questions → new articles and FAQs, grouped one primary page per intent.
- Bulk analysis → real volume and difficulty to replace "Unverified" in `keyword-master.csv`.
- Backlink gap → real sites (directories, publications, partners) that link to competitors and could link to Madvert Labs. No paid or spam links.
