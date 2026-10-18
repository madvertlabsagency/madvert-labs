import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt
 *
 * Public marketing pages are open to every search and AI search crawler. Private areas (the client
 * onboarding portal, Madvert Operations, the Offer Builder, shared offers and API routes) are
 * disallowed; they also send `X-Robots-Tag: noindex` and sit behind sign-in, because robots.txt
 * alone does not keep a URL out of an index.
 *
 * Crawlers obey only the most specific group that names them, so every named group repeats the
 * private disallow list.
 *
 * AI training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot…) are a separate business
 * decision from AI search visibility. They follow the `*` group by default. Set
 * AI_TRAINING_CRAWLERS=block to opt out of model training without affecting Google Search,
 * Bing, Copilot or ChatGPT Search (OAI-SearchBot).
 *
 * Preview and development deployments disallow everything so staging URLs are never crawled.
 */
const PRIVATE = ["/api/", "/ops", "/onboarding", "/offer-builder", "/offer/", "/client", "/internal", "/auth", "/admin"];

/** Search and AI search crawlers named explicitly so their access is a deliberate, visible choice. */
const SEARCH_CRAWLERS = [
  "Googlebot", // Google Search, AI Overviews and AI Mode
  "Bingbot", // Bing and Microsoft Copilot
  "OAI-SearchBot", // ChatGPT Search results and citations
  "ChatGPT-User", // pages a ChatGPT user asks it to open
  "PerplexityBot", // Perplexity search answers
  "Applebot", // Apple Spotlight, Siri and Safari suggestions
  "DuckDuckBot",
];

/** Crawlers that collect content for training models, not for search results. */
const TRAINING_CRAWLERS = ["GPTBot", "Google-Extended", "Applebot-Extended", "CCBot", "ClaudeBot", "anthropic-ai", "Bytespider", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  const isProduction = (process.env.VERCEL_ENV ?? "production") === "production";
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: SEARCH_CRAWLERS, allow: "/", disallow: PRIVATE },
    { userAgent: "*", allow: "/", disallow: PRIVATE },
  ];
  if (process.env.AI_TRAINING_CRAWLERS === "block") {
    rules.splice(1, 0, { userAgent: TRAINING_CRAWLERS, disallow: "/" });
  }

  return { rules, sitemap: `${site.url}/sitemap.xml` };
}
