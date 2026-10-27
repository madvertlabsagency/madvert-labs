import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { PRIVATE_PATHS as PRIVATE, SEARCH_CRAWLERS, TRAINING_CRAWLERS, trainingCrawlerPolicy } from "@/seo/crawl-policy";

/**
 * robots.txt
 *
 * Public marketing pages are open to every search and AI search crawler. Private areas (the client
 * onboarding portal, Madvert Operations, the Offer Builder, shared offers and API routes) are
 * disallowed; they also send `X-Robots-Tag: noindex` and sit behind sign-in, because robots.txt
 * alone does not keep a URL out of an index.
 *
 * Crawlers obey only the most specific group that names them, so every named group repeats the
 * private disallow list. The lists live in src/seo/crawl-policy.ts.
 *
 * AI training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot…) are a separate business
 * decision from AI search visibility. They follow the `*` group by default. Set
 * AI_TRAINING_CRAWLERS=block to opt out of model training without affecting Google Search,
 * Bing, Copilot or ChatGPT Search (OAI-SearchBot).
 *
 * Preview and development deployments disallow everything so staging URLs are never crawled.
 */
const SEARCH = SEARCH_CRAWLERS.map((c) => c.agent);

export default function robots(): MetadataRoute.Robots {
  const isProduction = (process.env.VERCEL_ENV ?? "production") === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: SEARCH, allow: "/", disallow: PRIVATE },
    { userAgent: "*", allow: "/", disallow: PRIVATE },
  ];
  if (trainingCrawlerPolicy() === "blocked") {
    rules.splice(1, 0, { userAgent: TRAINING_CRAWLERS, disallow: "/" });
  }

  return { rules, sitemap: `${site.url}/sitemap.xml` };
}
