/**
 * Crawl policy, shared by robots.txt (src/app/robots.ts) and the SEO control center so the page
 * that reports the policy can never disagree with the file that enforces it.
 */

/** Never public: portal, operations, offer builder, shared offers, API and auth routes. */
export const PRIVATE_PATHS = ["/api/", "/ops", "/onboarding", "/offer-builder", "/offer/", "/client", "/internal", "/auth", "/admin"];

/** Search and AI search crawlers, named explicitly so their access is a deliberate, visible choice. */
export const SEARCH_CRAWLERS: { agent: string; purpose: string }[] = [
  { agent: "Googlebot", purpose: "Google Search, AI Overviews and AI Mode" },
  { agent: "Bingbot", purpose: "Bing and Microsoft Copilot (ChatGPT Search also uses Bing's index)" },
  { agent: "OAI-SearchBot", purpose: "ChatGPT Search results and citations" },
  { agent: "ChatGPT-User", purpose: "Pages a ChatGPT user asks it to open" },
  { agent: "PerplexityBot", purpose: "Perplexity search answers" },
  { agent: "Applebot", purpose: "Apple Spotlight, Siri and Safari suggestions" },
  { agent: "DuckDuckBot", purpose: "DuckDuckGo search" },
];

/**
 * Crawlers that collect content for model training, not search results. GPTBot is OpenAI's
 * training crawler and is separate from OAI-SearchBot: blocking it does not affect ChatGPT Search.
 */
export const TRAINING_CRAWLERS = ["GPTBot", "Google-Extended", "Applebot-Extended", "CCBot", "ClaudeBot", "anthropic-ai", "Bytespider", "meta-externalagent"];

/**
 * Owner decision, set with AI_TRAINING_CRAWLERS. Unset means training crawlers follow the `*`
 * group (allowed), which is the site's current, unchanged behaviour. "block" opts out of training.
 */
export function trainingCrawlerPolicy(): "allowed" | "blocked" {
  return process.env.AI_TRAINING_CRAWLERS === "block" ? "blocked" : "allowed";
}
