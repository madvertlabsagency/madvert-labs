# AI Answer Engine Visibility (ChatGPT, Copilot, Perplexity, Gemini, AI Overviews)

How Madvert Labs gets named and cited when people ask AI assistants for an agency.

## 1. How AI engines pick sources

| Engine | Where its answers come from | What to do |
|---|---|---|
| **ChatGPT Search** | Bing's index plus its own crawler `OAI-SearchBot`; also its training data | Be indexed in Bing (Bing Webmaster Tools, IndexNow), allow OAI-SearchBot, be listed on Bing Places |
| **Microsoft Copilot** | Bing index and Bing Places | Same as above |
| **Google AI Overviews / AI Mode / Gemini** | Google index, Google Business Profile, YouTube | Search Console, GBP reviews and posts, structured data |
| **Perplexity** | Its own crawler `PerplexityBot` plus Bing/Google results | Allowed in robots.txt; answer-first pages |
| **Claude, other assistants** | Web search (often Brave/Bing) and training data | Consistent mentions across third-party sites |

Three things decide whether Madvert Labs is named:
1. **Retrievable:** the page is indexed and crawlable (robots.txt, sitemap, IndexNow, fast server-rendered HTML).
2. **Understandable:** the page answers the question in the first two sentences, names the entity, and has matching schema.
3. **Corroborated:** independent sites (directories, reviews, media, LinkedIn) say the same facts. This is the step most businesses miss, and it is mostly off-site work (see `docs/entity-kit.md`).

## 2. What the website already does

- robots.txt explicitly allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot and Applebot (`src/app/robots.ts`).
- IndexNow pings Bing, Yandex and others whenever a page's lastmod changes (`src/seo/indexnow-sync.ts`). Needs `INDEXNOW_KEY` and `CRON_SECRET` set in Vercel.
- Organization + ProfessionalService schema with the Karachi address, phone, founder, GBP and LinkedIn in `sameAs` (`src/lib/seo.ts`).
- One entity file (`src/lib/entities.ts`) so every page describes the company and services identically.
- Answer-first pages: every service, location, industry and article page opens with a self-contained direct answer.
- Pages built for AI questions:
  - `/about/facts`: company fact sheet ("What is Madvert Labs?", "Who founded Madvert Labs?", "Where is Madvert Labs?")
  - `/press`: approved boilerplate and founder bio
  - `/digital-marketing-agency-karachi`: "digital marketing agency in Karachi"
  - `/industries/*`: "real estate / solar / home services / e-commerce lead generation"
  - `/insights/*`: Pakistan cost, comparison and how-to questions
  - `/glossary`: definitions (CPQL, growth system, AEO)
- `/llms.txt` gives AI assistants a plain markdown map of services, industries, case studies and guides (`src/app/llms.txt/route.ts`).
- Crawler log records visits from AI crawlers (`src/seo/crawler-log.ts`), so you can see when OAI-SearchBot or PerplexityBot fetch pages.

## 3. Off-site checklist (owner tasks)

- [ ] Bing Places listing live and matching GBP exactly
- [ ] LinkedIn company page created, Usama linked as Founder & CEO
- [ ] Clutch, GoodFirms, DesignRush profiles with the long description from the entity kit
- [ ] 3+ Clutch verified reviews, 10+ Google reviews mentioning service and Karachi
- [ ] Facebook, Instagram, YouTube with identical name and description
- [ ] Send all profile URLs so they go into `NEXT_PUBLIC_SAME_AS`
- [ ] One earned media mention per month
- [ ] Usama posts on LinkedIn weekly (results, lessons, Pakistan market data)

## 4. Test prompts

Run these in ChatGPT (with search on), Copilot, Perplexity and Google (AI Mode) on the first Monday of each month. Record for each: named (yes/no), position, which URL was cited.

**Brand and entity**
1. What is Madvert Labs?
2. Who is the founder of Madvert Labs?
3. Where is Madvert Labs located?
4. Is Madvert Labs a good digital marketing agency?
5. Madvert Labs reviews
6. What services does Madvert Labs offer?

**Local and category**
7. Best digital marketing agency in Karachi
8. Digital marketing agency in Bahria Town Karachi
9. Meta Ads lead generation agency in Pakistan
10. Performance marketing agency in Pakistan
11. Who does Facebook ads for real estate in Pakistan?
12. Google Ads agency in Karachi
13. AI SEO or AEO services in Pakistan
14. Full stack digital marketing agency in Pakistan
15. Agency that sets up WhatsApp lead follow-up and CRM in Pakistan

**Questions (informational)**
16. How much do Meta ads cost in Pakistan?
17. How to get qualified leads from Facebook ads in Pakistan?
18. What is answer engine optimisation?
19. Performance marketing vs digital marketing
20. How to choose a digital marketing agency in Karachi
21. What is a cost per qualified lead?
22. Lead generation for solar companies in Pakistan
23. How to find investors for a Dubai real estate project with Facebook ads
24. What is a growth system in marketing?
25. Lead generation vs qualified lead generation

## 5. Monthly routine (about 2 hours)

1. **Test** the 25 prompts above and log the results in a sheet.
2. **Check Bing Webmaster Tools:** indexed pages, crawl errors, and the AI performance or Copilot report if available. Check the Search Console Performance report for new queries.
3. **Update one page** with a real new fact (a new case study, updated cost data from your own campaigns), then bump its date in `src/content/page-dates.ts` so IndexNow re-submits it.
4. **Publish one article** answering a question from step 1 where Madvert Labs was not named.
5. **Get two reviews** (Google or Clutch) and **one mention** (directory, podcast, guest post).
6. **Check the crawler log** for OAI-SearchBot, PerplexityBot and Bingbot visits.

Expect movement over months, not days. AI engines refresh their sources as Bing and Google re-crawl, and as third-party mentions accumulate.
