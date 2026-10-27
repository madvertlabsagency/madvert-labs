# SEO, AEO and Crawler Setup

Internal reference for how madvertlabs.com is crawled, indexed and understood by Google, Bing, ChatGPT Search and other answer engines. No secrets are stored here.

Live control: **Madvert Operations → SEO** (`/ops/seo`, admins). It shows crawl policy, setup status, the latest technical audit, IndexNow state, AI crawler activity and the topic map, and has buttons to run an audit, sync IndexNow and submit specific URLs.

## 1. Canonical domain

| Item | State |
|---|---|
| Canonical origin | `https://madvertlabs.com` (apex, HTTPS) |
| `www.madvertlabs.com` | 308 redirect to the apex, same path (`next.config.ts`) |
| HTTP | Redirected to HTTPS by Vercel; HSTS header `max-age=31536000; includeSubDomains; preload` |
| Trailing slash | `/path/` → 308 → `/path` (Next.js default). Canonicals never end in a slash, except the homepage origin |
| Query strings (`?utm_…`, `?fbclid`…) | Page renders normally; the canonical tag points to the clean URL, so variants consolidate |
| Old and short URLs | 301/308 only where a clear replacement exists (`next.config.ts` redirects and `serviceAliases` in `src/lib/entities.ts`). Nothing is redirected to the homepage by default |
| Unknown URLs | Real HTTP 404 with `noindex` (no soft 404s). Unknown `/insights`, `/case-studies`, `/resources`, `/industries` and `/glossary` slugs are rewritten to the 404 page by `src/proxy.ts` |
| Preview deployments | `robots.txt` disallows everything and `*.vercel.app` responses carry `X-Robots-Tag: noindex, nofollow` |

## 2. robots.txt (final state)

Source: `src/app/robots.ts` + `src/seo/crawl-policy.ts` (one list feeds both the file and `/ops/seo`).

```
User-Agent: Googlebot
User-Agent: Bingbot
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
User-Agent: PerplexityBot
User-Agent: Applebot
User-Agent: DuckDuckBot
Allow: /
Disallow: /api/
Disallow: /ops
Disallow: /onboarding
Disallow: /offer-builder
Disallow: /offer/
Disallow: /client
Disallow: /internal
Disallow: /auth
Disallow: /admin

User-Agent: *
Allow: /
(same Disallow list)

Sitemap: https://madvertlabs.com/sitemap.xml
```

### Crawler status

| Crawler | Purpose | Status |
|---|---|---|
| **Googlebot** | Google Search, AI Overviews, AI Mode | Allowed (named group) |
| **Bingbot** | Bing, Microsoft Copilot; ChatGPT Search also draws on Bing's index | Allowed (named group) |
| **OAI-SearchBot** | ChatGPT Search results and citations | **Allowed** (named group) |
| **ChatGPT-User** | Pages a ChatGPT user asks it to open | Allowed (named group) |
| PerplexityBot, Applebot, DuckDuckBot | Other search and answer engines | Allowed (named group) |
| **GPTBot** | OpenAI model **training** (not ChatGPT Search) | **Allowed by default through the `*` group. Unchanged; owner decision.** |
| Google-Extended, Applebot-Extended, CCBot, ClaudeBot, anthropic-ai, Bytespider, meta-externalagent | Model training | Same as GPTBot |

**GPTBot policy.** The site has never blocked training crawlers, and this setup does not change that. OAI-SearchBot, ChatGPT-User and GPTBot are separate user agents: ChatGPT Search needs OAI-SearchBot, not GPTBot. To opt out of training without affecting any search engine, set `AI_TRAINING_CRAWLERS=block` in Vercel (Production) and redeploy. That adds one group disallowing all training crawlers listed above.

Private routes are also protected by `X-Robots-Tag: noindex, nofollow` headers and sign-in, because robots.txt alone does not remove a URL from an index.

## 3. Cloudflare (owner action)

The repository contains no Cloudflare configuration. The recommended DNS setup is **DNS only (grey cloud)** for `@` (A `76.76.21.21`) and `www` (CNAME `cname.vercel-dns.com`), so traffic goes straight to Vercel and Cloudflare's bot and WAF features are not in the request path.

If the records are **proxied (orange cloud)**, check these in the Cloudflare dashboard so legitimate crawlers never receive a 403, 429, challenge or CAPTCHA:

1. **Security → Bots.** *Bot Fight Mode* challenges many automated clients and cannot be scoped. Turn it off, or use *Super Bot Fight Mode* with **"Allow verified bots"** on. Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User and PerplexityBot are Cloudflare verified bots.
2. **Security → Settings → "Block AI bots" / AI Scrapers and Crawlers.** This can block OAI-SearchBot and PerplexityBot together with training bots. Leave it off, or allow the search crawlers explicitly.
3. **WAF custom rules / managed challenge rules.** Any rule that challenges by country, ASN or "known bots" must skip `cf.client.bot` (verified bots). Do not add challenges to `/robots.txt`, `/sitemap.xml`, `/indexnow-key.txt` or `/llms.txt`.
4. **Rate limiting.** Exclude verified bots, or keep thresholds well above crawl rates (crawlers can fetch dozens of URLs a minute).
5. **Cache rules.** Do not cache HTML for longer than Vercel does; never cache `/api/*`, `/ops*` or `/onboarding*`.
6. **Verify.** Cloudflare → Security → Events, filtered by user agent `OAI-SearchBot` and `bingbot`, should show no blocks or challenges. In Bing Webmaster Tools use URL Inspection; in Google Search Console use URL Inspection → Test live URL.

General security (WAF managed rules, DDoS protection, HTTPS) should stay on; only bot handling needs these exceptions.

## 4. Sitemap

- URL: `https://madvertlabs.com/sitemap.xml` (single file; a sitemap index is not needed below 50,000 URLs).
- Source: `src/app/sitemap.ts`. It includes fixed pages (`src/content/page-dates.ts`), published articles, glossary definition pages, real case studies and resource landing pages, and `/custom-patches`.
- Excluded: portal, operations, API, auth, shared offers, previews, draft articles, placeholder case studies, pointer-only resources (for example the Studios showreel, which is `noindex`), redirects and query variants.
- `lastmod` comes from deliberate content dates. Change a date only when a reader would notice the change. No `changefreq` or `priority` values are set.
- 77 URLs as of 27 October 2026.

## 5. IndexNow

- Key: the `INDEXNOW_KEY` environment variable (Vercel, Production). Never committed. Served at `https://madvertlabs.com/indexnow-key.txt` and sent as `keyLocation`.
- What is submitted: only URLs that are new, have a newer `lastmod`, or were removed from the sitemap (`src/seo/indexnow-sync.ts`, state in Postgres `onb_indexnow_state`). A sync with no content changes submits nothing.
- When: daily Vercel cron (`/api/indexnow/sync`), after Sanity publish/unpublish (webhook), and on demand from `/ops/seo`.
- Submissions run only on the production deployment and never throw; errors are returned and shown in `/ops/seo`.

## 6. Metadata and structured data

- `pageMetadata()` in `src/lib/seo.ts` gives every page a unique title (`<topic> | Madvert Labs`), description, self-referencing canonical, Open Graph and Twitter card. Pages without their own image get a branded card from `/og?title=…&label=…` (`src/app/og/route.tsx`).
- Sitewide JSON-LD: Organization + ProfessionalService (one `@id`, verified Karachi address and phone, founder, `sameAs` with the Google Business Profile and LinkedIn), WebSite, Person (founder).
- Per page, where valid: BreadcrumbList, Service, Article, FAQPage (only for visible FAQs), VideoObject (homepage film), ProfilePage, AboutPage, ContactPage, CollectionPage, DefinedTerm (glossary pages), WebApplication (CPQL calculator).
- Never added: Review, AggregateRating or any rating. No verified, eligible reviews exist on the site.
- `/custom-patches` (static export from `landing-source/`) references the same Organization `@id`.

## 7. Search Console and Bing Webmaster Tools

Verification is set with environment variables (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`) or by DNS. Existing verification is kept.

| Tool | What to do |
|---|---|
| Google Search Console | Add a Domain property for `madvertlabs.com` (DNS TXT). Submit `https://madvertlabs.com/sitemap.xml`. Inspect `/`, `/services/meta-ads`, `/white-label-partnership`, `/custom-patches`, `/glossary/qualified-lead` and request indexing. Check Pages → "Why pages aren't indexed" monthly. |
| Bing Webmaster Tools | Import from Search Console. Submit the sitemap. Confirm IndexNow receives URLs (Configuration → IndexNow). Use URL Inspection for the same pages. |

## 8. Analytics

GTM `GTM-MDFSNH4H` and GA4 `G-MNM7Y974JB` load once per page (`src/analytics/AnalyticsScripts.tsx`; the custom patches page loads the same IDs through its own layout because it is a separate document). Organic conversion events:

| Requested name | Event actually sent | Notes |
|---|---|---|
| strategy_call_click | `strategy_call_click` | Every booking CTA |
| contact_submit | `contact_form_complete` | Existing name kept so GA4 history and key events are not broken |
| lead_magnet_conversion | `lead_magnet_conversion` | Vault resource forms |
| white_label_book_call_click | `white_label_call_click` | Existing name kept for the same reason |
| custom_patch_inquiry | `custom_patch_inquiry` | New. Fires once per application GoHighLevel confirms on `/custom-patches` |

Mark the conversion events as key events in GA4 and filter by Session default channel group = Organic Search to see organic conversions.

## 9. Ongoing checks

- `npm run seo:audit -- https://madvertlabs.com` (or a local server) prints every issue and exits 1 on errors. The same audit runs weekly (`/api/seo/audit` cron) and on demand in `/ops/seo`.
- `/llms.txt` is an optional summary for AI assistants. It is not a ranking requirement and does not replace HTML, the sitemap, robots.txt, internal links or structured data.
