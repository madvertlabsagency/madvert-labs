# Search and AI search visibility

> Current crawler, canonical, Cloudflare and IndexNow reference: `docs/SEO-AEO-CRAWLER-SETUP.md`.
> Topic → primary URL map: `docs/SEO-TOPIC-MAP.md`. Live controls: `/ops/seo`.

How madvertlabs.com is made discoverable and citation-ready for Google Search (including AI
Overviews and AI Mode), Bing and Microsoft Copilot, ChatGPT Search and other AI search
experiences. Everything here follows the engines' own guidance; there are no AI-only pages,
hidden text or prompt tricks.

## Crawl control — `src/app/robots.ts`

| Directive | Why |
| --- | --- |
| Named group: Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Applebot, DuckDuckBot → `Allow: /` | Search and AI search crawlers may read every public page. OAI-SearchBot must stay allowed for ChatGPT Search. |
| `Disallow: /api/ /ops /onboarding /offer-builder /offer/ /auth /admin` (repeated in every group) | Private portal, operations, shared offers and API routes. A crawler only reads the most specific group naming it, so each group repeats the list. |
| `User-agent: *` → same rules | Every other crawler follows the same public/private split. |
| AI training crawlers | Not blocked by default. `AI_TRAINING_CRAWLERS=block` adds a group disallowing GPTBot, Google-Extended, Applebot-Extended, CCBot, ClaudeBot, anthropic-ai, Bytespider and meta-externalagent. Training access is a separate decision from search visibility. |
| `Sitemap: https://madvertlabs.com/sitemap.xml` | Points every engine to the canonical URL list. |
| Preview deployments | `VERCEL_ENV !== production` → `Disallow: /` for everyone, plus `X-Robots-Tag: noindex` on `*.vercel.app`. |

robots.txt does not remove pages from an index, so private routes also send
`X-Robots-Tag: noindex, nofollow` (next.config.ts headers), the portal layout sets
`robots: noindex`, and Operations requires sign in.

## Sitemap — `src/app/sitemap.ts`

Only canonical, indexable public URLs: fixed pages from `src/content/page-dates.ts`, real (non
placeholder) case studies and resource landing pages. No portal/API routes, parameters, redirects
or pointer-only resources. `lastmod` comes from deliberate content dates — change a date in
`page-dates.ts` (or a case study / resource's `dateModified`) only when the content changes
materially.

## IndexNow — `src/seo/indexnow*.ts`

1. Generate a key: `openssl rand -hex 16`. Add it as `INDEXNOW_KEY` in Vercel (Production).
2. Make sure `CRON_SECRET` and `DATABASE_URL` are set (both already used by the onboarding portal).
3. Redeploy, then validate:
   - `https://madvertlabs.com/indexnow-key.txt` returns exactly the key.
   - `curl -H "Authorization: Bearer $CRON_SECRET" https://madvertlabs.com/api/indexnow/sync`
     → first run submits every sitemap URL (`added`), later runs submit nothing unless content changed.
   - Bing Webmaster Tools → IndexNow shows the received URLs.

When it runs: daily via the Vercel cron (`vercel.json`), after every Sanity publish/unpublish
(webhook to `/api/revalidate`), and manually with the curl above after a deploy. The sync compares
the sitemap with the last submitted state (Postgres table `onb_indexnow_state`) and sends only URLs
that are new (published), have a newer lastmod (materially updated) or disappeared (deleted).
Submissions only happen on the production deployment.

## Entities and structured data

`src/lib/entities.ts` is the single source for the organisation, founder and service names, URLs
and definitions. `src/lib/seo.ts` builds JSON-LD from it:

- Every page: Organization + ProfessionalService (verified Karachi office from the Google Business Profile), WebSite, Person (founder).
- Homepage: WebPage + VideoObject (with the film's caption transcript).
- Service pages: Service + BreadcrumbList (+ FAQPage only where the FAQ is visible).
- Case studies: Article; resources: CreativeWork with author and dates; founder page: ProfilePage.

Nothing is fabricated: no reviews, ratings, awards, client counts or years. `sameAs` holds the
Google Business Profile and the founder's LinkedIn; add more verified profile URLs with
`NEXT_PUBLIC_SAME_AS` / `NEXT_PUBLIC_FOUNDER_SAME_AS`.
Validate with https://search.google.com/test/rich-results and https://validator.schema.org.

## Crawler observability — Operations → Crawlers

`src/proxy.ts` records search and AI crawler visits (crawler name, category, path, response, last
seen) in `onb_crawler_hits`, one row per crawler + URL, throttled to one write per 15 minutes. No
IP addresses, cookies or full user agents are stored. User agents can be spoofed, so treat the
report as an indication. "unlisted (possible 404)" means the URL is not a known public page.

## llms.txt

Not used. It is not a ranking or citation requirement for any major engine.
