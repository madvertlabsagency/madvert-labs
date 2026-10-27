/**
 * Topic map: every important search topic has ONE primary URL, plus the supporting pages that
 * explain, prove or compare it. Two jobs:
 *  1. Avoid cannibalisation: when writing a new page, find its topic here first. If the intent is
 *     already served by a primary URL, improve that page instead of creating another one.
 *  2. Contextual internal links: <TopicLinks path=…> renders the other pages of the same cluster
 *     with these descriptive anchors (see docs/SEO-TOPIC-MAP.md for the human-readable version).
 * Only published URLs belong here; planned pages live in the doc until their content is approved.
 */

export type TopicPage = { href: string; anchor: string; role: "primary" | "definition" | "article" | "comparison" | "proof" | "resource" | "tool" | "location" | "industry" };

export type TopicCluster = {
  id: string;
  name: string;
  /** Search topics (not keywords to repeat) and the intent this cluster answers. */
  topics: string[];
  intent: string;
  pages: TopicPage[];
};

export const topicClusters: TopicCluster[] = [
  {
    id: "full-stack",
    name: "Full stack digital marketing and the external growth department",
    topics: ["full stack digital marketing agency", "external growth department", "outsourced marketing department", "growth system"],
    intent: "Commercial: an established business choosing one partner to run marketing end to end.",
    pages: [
      { href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing", role: "primary" },
      { href: "/growth-systems", anchor: "What is a growth system?", role: "article" },
      { href: "/glossary/external-growth-department", anchor: "What is an external growth department?", role: "definition" },
      { href: "/glossary/full-stack-digital-marketing", anchor: "What is full stack digital marketing?", role: "definition" },
      { href: "/glossary/growth-system", anchor: "Growth system definition", role: "definition" },
      { href: "/insights/performance-marketing-vs-digital-marketing", anchor: "Performance marketing vs digital marketing", role: "comparison" },
      { href: "/insights/how-to-choose-digital-marketing-agency-karachi", anchor: "How to choose a digital marketing agency in Karachi", role: "article" },
      { href: "/digital-marketing-agency-karachi", anchor: "Digital marketing agency in Karachi", role: "location" },
      { href: "/case-studies/earthly-elementals", anchor: "Earthly Elementals: 162 website purchases", role: "proof" },
      { href: "/case-studies/dubai-interior-design", anchor: "111 interior design inquiries in Dubai", role: "proof" },
      { href: "/resources/growth-systems-audit", anchor: "Free Growth Systems Audit", role: "resource" },
    ],
  },
  {
    id: "qualified-leads",
    name: "Qualified lead generation",
    topics: ["qualified lead generation", "B2B lead generation", "what is a qualified lead", "cost per qualified lead", "qualified RFQ", "lead qualification", "why facebook leads don't convert"],
    intent: "Commercial and informational: businesses tired of cheap leads that never buy.",
    pages: [
      { href: "/services/client-acquisition", anchor: "Qualified lead generation and client acquisition", role: "primary" },
      { href: "/services/b2b-lead-generation", anchor: "B2B lead generation", role: "primary" },
      { href: "/insights/why-facebook-leads-dont-convert", anchor: "Why Facebook leads don't convert", role: "article" },
      { href: "/glossary/qualified-lead", anchor: "What is a qualified lead?", role: "definition" },
      { href: "/glossary/qualified-rfq", anchor: "What is a qualified RFQ?", role: "definition" },
      { href: "/glossary/lead-qualification-system", anchor: "What is a lead qualification system?", role: "definition" },
      { href: "/insights/lead-generation-vs-qualified-lead-generation", anchor: "Lead generation vs qualified lead generation", role: "comparison" },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost per qualified lead calculator", role: "tool" },
      { href: "/case-studies/dubai-real-estate-nigeria", anchor: "142 BANT-qualified investor leads in Dubai real estate", role: "proof" },
      { href: "/industries", anchor: "Lead generation by industry", role: "industry" },
      { href: "/industries/real-estate", anchor: "Real estate lead generation", role: "industry" },
      { href: "/industries/home-services", anchor: "Home improvement lead generation", role: "industry" },
      { href: "/custom-patches", anchor: "Qualified custom patch RFQs", role: "primary" },
      { href: "/resources/qualified-lead-generation-playbook", anchor: "Qualified Lead Generation Playbook", role: "resource" },
    ],
  },
  {
    id: "paid-acquisition",
    name: "Meta Ads, Google Ads and paid acquisition",
    topics: ["meta ads lead generation", "facebook ads agency", "google ads agency", "PPC agency", "performance marketing agency", "meta ads cost pakistan", "meta ads vs google ads", "lead forms vs landing pages"],
    intent: "Commercial: businesses hiring someone to run paid advertising for leads or sales.",
    pages: [
      { href: "/services/meta-ads", anchor: "Meta Ads lead generation", role: "primary" },
      { href: "/services/google-ads", anchor: "Google Ads lead generation", role: "primary" },
      { href: "/services/performance-marketing", anchor: "Performance marketing", role: "primary" },
      { href: "/insights/meta-ads-vs-google-ads-lead-generation", anchor: "Meta Ads vs Google Ads for lead generation", role: "comparison" },
      { href: "/insights/why-facebook-leads-dont-convert", anchor: "Why Facebook leads don't convert", role: "article" },
      { href: "/insights/facebook-lead-forms-vs-landing-pages", anchor: "Facebook lead forms vs landing pages", role: "comparison" },
      { href: "/insights/meta-ads-lead-generation-pakistan", anchor: "Meta Ads lead generation in Pakistan", role: "article" },
      { href: "/insights/meta-ads-cost-pakistan", anchor: "How much Meta Ads cost in Pakistan", role: "article" },
      { href: "/resources/meta-ads-pre-launch-checklist", anchor: "Meta Ads pre-launch checklist", role: "resource" },
      { href: "/case-studies/cellsol-energy", anchor: "Solar brand: 200+ qualified leads a day", role: "proof" },
      { href: "/case-studies/texas-solar", anchor: "Texas solar campaign", role: "proof" },
      { href: "/industries/solar-energy", anchor: "Solar lead generation", role: "industry" },
      { href: "/case-studies/home-improvement-uae", anchor: "Home improvement leads in the UAE at $3.10", role: "proof" },
      { href: "/case-studies/tap-center-fitness", anchor: "Fitness Meta Ads at 8-9% CTR", role: "proof" },
      { href: "/industries/ecommerce", anchor: "Meta Ads for e-commerce brands", role: "industry" },
    ],
  },
  {
    id: "seo-aeo",
    name: "SEO, AI SEO and answer engine optimisation",
    topics: ["seo services", "ai seo", "answer engine optimisation", "aeo", "generative engine optimisation", "geo", "seo vs aeo vs geo", "chatgpt visibility"],
    intent: "Commercial and informational: being found on Google, Bing and AI answers.",
    pages: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and AEO services", role: "primary" },
      { href: "/services/seo", anchor: "SEO services", role: "primary" },
      { href: "/insights/seo-vs-aeo-vs-geo", anchor: "SEO vs AEO vs GEO", role: "comparison" },
      { href: "/glossary/ai-seo", anchor: "What is AI SEO?", role: "definition" },
      { href: "/glossary/aeo", anchor: "What is AEO?", role: "definition" },
      { href: "/insights/what-is-aeo", anchor: "AEO explained for businesses in Pakistan", role: "article" },
      { href: "/resources/seo-ai-search-playbook", anchor: "SEO and AI Search Playbook", role: "resource" },
    ],
  },
  {
    id: "crm-automation",
    name: "CRM, revenue response and automation",
    topics: ["crm automation", "crm implementation", "marketing automation", "whatsapp lead follow up", "how to automate lead follow up", "lead response time", "ai lead response agent", "revenue response system"],
    intent: "Commercial: businesses losing leads after they arrive.",
    pages: [
      { href: "/services/automation-revenue-systems", anchor: "CRM and marketing automation", role: "primary" },
      { href: "/services/ai-agents", anchor: "AI lead response agents", role: "primary" },
      { href: "/insights/how-to-automate-lead-follow-up", anchor: "How to automate lead follow-up", role: "article" },
      { href: "/glossary/revenue-response-system", anchor: "What is a revenue response system?", role: "definition" },
      { href: "/glossary/lead-qualification-system", anchor: "What is a lead qualification system?", role: "definition" },
      { href: "/resources/revenue-leakage-audit", anchor: "Revenue Leakage Audit", role: "resource" },
      { href: "/resources/automated-lead-engine", anchor: "Build your automated lead engine", role: "resource" },
    ],
  },
  {
    id: "creative-brand",
    name: "Branding, creative and performance creative",
    topics: ["branding agency", "ad creative production", "video ads", "social media management"],
    intent: "Commercial: businesses that look smaller online than they are, or need ads that earn attention.",
    pages: [
      { href: "/services/branding-marketing", anchor: "Branding, creative and brand strategy", role: "primary" },
      { href: "/studios", anchor: "Madvert Studios: ad creative and video", role: "primary" },
      { href: "/services/social-media-management", anchor: "Social media management", role: "primary" },
      { href: "/resources/brand-perception-checklist", anchor: "Brand Perception Checklist", role: "resource" },
      { href: "/resources/steal-these-hooks", anchor: "Ad hooks playbook", role: "resource" },
      { href: "/resources/stop-the-scroll", anchor: "Video ad playbook", role: "resource" },
      { href: "/resources/build-that-offer", anchor: "Build That Offer playbook", role: "resource" },
    ],
  },
  {
    id: "conversion",
    name: "Landing pages, funnels and conversion",
    topics: ["landing page design", "conversion rate optimisation", "sales funnel"],
    intent: "Commercial: businesses paying for traffic that does not convert.",
    pages: [
      { href: "/services/conversion", anchor: "Landing pages, funnels and CRO", role: "primary" },
      { href: "/services/web-development", anchor: "Web development", role: "primary" },
      { href: "/insights/facebook-lead-forms-vs-landing-pages", anchor: "Lead forms vs landing pages", role: "comparison" },
      { href: "/resources/landing-pages-that-sell", anchor: "Landing Pages That Sell", role: "resource" },
      { href: "/resources/conversion-leak-checklist", anchor: "Conversion Leak Checklist", role: "resource" },
      { href: "/case-studies/agency-lead-generation", anchor: "99 agency leads at $4 CPL", role: "proof" },
      { href: "/case-studies/bookkeeping-appointments", anchor: "Qualified bookkeeping appointments", role: "proof" },
    ],
  },
  {
    id: "technology",
    name: "Technology, AI systems and development",
    topics: ["custom software development", "app development", "ai automation", "dashboards and portals"],
    intent: "Commercial: growth needs a tool that does not exist off the shelf.",
    pages: [
      { href: "/services/tech-product-development", anchor: "Custom software and AI systems", role: "primary" },
      { href: "/services/app-development", anchor: "App development", role: "primary" },
      { href: "/services/web-development", anchor: "Web development", role: "primary" },
      { href: "/services/ai-agents", anchor: "AI agents", role: "primary" },
      { href: "/resources/tech-opportunity-audit", anchor: "Tech Opportunity Audit", role: "resource" },
      { href: "/resources/ai-content-automation-playbook", anchor: "AI content automation playbook", role: "resource" },
    ],
  },
  {
    id: "white-label",
    name: "White label digital marketing for agencies",
    topics: ["white label digital marketing", "white label marketing agency", "agency fulfillment partner", "white label meta ads", "white label lead generation"],
    intent: "Commercial: agency owners who can sell but need fulfillment.",
    pages: [
      { href: "/white-label-partnership", anchor: "White label digital marketing for agencies", role: "primary" },
      { href: "/case-studies/agency-lead-generation", anchor: "Agency lead generation case study", role: "proof" },
      { href: "/services/digital-marketing", anchor: "What a full stack team delivers", role: "article" },
    ],
  },
];

/** Clusters a URL belongs to. */
export function clustersFor(path: string) {
  return topicClusters.filter((c) => c.pages.some((p) => p.href === path));
}

/** Other pages in the same clusters as `path`, primaries first, de-duplicated. */
export function topicLinksFor(path: string, limit = 6): TopicPage[] {
  const seen = new Set<string>([path]);
  const out: TopicPage[] = [];
  const clusters = clustersFor(path);
  const ordered = clusters.flatMap((c) => [...c.pages.filter((p) => p.role === "primary"), ...c.pages.filter((p) => p.role !== "primary")]);
  for (const p of ordered) {
    if (seen.has(p.href)) continue;
    seen.add(p.href);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}
