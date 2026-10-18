/**
 * Lightweight crawler observability: which search and AI crawlers fetched which public URL, when,
 * and what the site answered. Only the crawler's self-reported name, category, path and status
 * are stored: no IP addresses, cookies or full user-agent strings. User agents can be spoofed, so
 * treat this as an indication, not verified bot traffic.
 */
export type CrawlerCategory = "search" | "ai-search" | "ai-training" | "seo-tool";

const CRAWLERS: { name: string; test: RegExp; category: CrawlerCategory }[] = [
  { name: "Googlebot", test: /Googlebot|Google-InspectionTool|GoogleOther/i, category: "search" },
  { name: "Bingbot", test: /bingbot|BingPreview|adidxbot/i, category: "search" },
  { name: "OAI-SearchBot", test: /OAI-SearchBot/i, category: "ai-search" },
  { name: "ChatGPT-User", test: /ChatGPT-User/i, category: "ai-search" },
  { name: "PerplexityBot", test: /PerplexityBot|Perplexity-User/i, category: "ai-search" },
  { name: "Applebot", test: /Applebot(?!-Extended)/i, category: "search" },
  { name: "DuckDuckBot", test: /DuckDuckBot/i, category: "search" },
  { name: "GPTBot", test: /GPTBot/i, category: "ai-training" },
  { name: "ClaudeBot", test: /ClaudeBot|Claude-User|anthropic-ai/i, category: "ai-training" },
  { name: "CCBot", test: /CCBot/i, category: "ai-training" },
  { name: "Bytespider", test: /Bytespider/i, category: "ai-training" },
  { name: "AhrefsBot", test: /AhrefsBot/i, category: "seo-tool" },
  { name: "SemrushBot", test: /SemrushBot/i, category: "seo-tool" },
];

export function identifyCrawler(userAgent: string | null) {
  if (!userAgent) return null;
  const hit = CRAWLERS.find((c) => c.test.test(userAgent));
  return hit ? { name: hit.name, category: hit.category } : null;
}

export type CrawlerHit = {
  id: string;
  crawler: string;
  category: CrawlerCategory;
  path: string;
  status: string;
  lastSeen: string;
};
