/**
 * Single source of truth for the entities search engines and AI systems should understand:
 * the organisation, its founder and its services. Every page, nav item and JSON-LD block that
 * names one of these should read the name, URL and description from here, so the business is
 * described the same way everywhere.
 *
 * Only verified facts belong in this file. No reviews, ratings, awards, client counts, office
 * addresses or founding years are stated, because none have been supplied and verified.
 */
import { absoluteUrl, site } from "./site";

/** One canonical description of the company, reused for meta descriptions and Organization schema. */
export const organization = {
  name: site.name,
  legalName: site.legalName,
  /** Brand wordmark spelling, used where the logo-style name is shown. */
  brandMark: "MADVERT LABS",
  descriptor: site.descriptor,
  slogan: site.tagline,
  description:
    "Madvert Labs is a digital marketing and growth systems company. It connects branding, client acquisition, conversion, creative production, CRM and automation, AI and technology into one growth system built around each client's business.",
  url: site.url,
  logo: absoluteUrl("/brand/app-icon-512.png"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  /**
   * Verified official profiles only (company LinkedIn, Instagram, YouTube…).
   * Set NEXT_PUBLIC_SAME_AS as a comma separated list of full URLs. Nothing is invented here.
   */
  sameAs: (process.env.NEXT_PUBLIC_SAME_AS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https:\/\//.test(s)),
} as const;

export const founder = {
  name: site.founder.name,
  givenName: "Usama",
  familyName: "Abbas Dahri",
  jobTitle: "Founder",
  path: "/about/usama-abbas-dahri",
  image: "/images/usama-abbas-dahri.jpg",
  /** Verified official profiles for the founder. Comma separated full URLs. */
  sameAs: (process.env.NEXT_PUBLIC_FOUNDER_SAME_AS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https:\/\//.test(s)),
} as const;

export type ServiceEntity = {
  /** Stable key used for internal links and content relationships. */
  key: ServiceKey;
  /** The one public name for the service. */
  name: string;
  /** Canonical path. */
  path: string;
  /** One sentence definition, self-contained (no "we"/"it" without a subject). */
  definition: string;
  /** schema.org serviceType label. */
  serviceType: string;
  /** Parent pillar key, when the service sits under a broader pillar page. */
  parent?: ServiceKey;
};

export type ServiceKey =
  | "growth-systems"
  | "digital-marketing"
  | "branding-marketing"
  | "client-acquisition"
  | "meta-ads"
  | "google-ads"
  | "seo"
  | "ai-seo-aeo"
  | "social-media-management"
  | "conversion"
  | "web-development"
  | "studios"
  | "automation-revenue-systems"
  | "ai-agents"
  | "tech-product-development"
  | "app-development";

export const serviceEntities: ServiceEntity[] = [
  {
    key: "growth-systems",
    name: "Growth Systems",
    path: "/growth-systems",
    definition:
      "A growth system is the connected set of brand, demand generation, conversion, follow up, data and technology that turns attention into revenue, designed and measured as one system instead of separate vendors and campaigns.",
    serviceType: "Growth system design",
  },
  {
    key: "digital-marketing",
    name: "Full Stack Digital Marketing",
    path: "/services/digital-marketing",
    definition:
      "Full Stack Digital Marketing from Madvert Labs is an outsourced marketing department that plans and runs strategy, paid acquisition, creative, website conversion, CRM, automation and analytics as one connected team.",
    serviceType: "Full service digital marketing",
  },
  {
    key: "branding-marketing",
    name: "Branding and Marketing",
    path: "/services/branding-marketing",
    definition:
      "Branding and Marketing at Madvert Labs covers brand strategy, identity, messaging and the marketing assets that make a business look, sound and show up consistently everywhere.",
    serviceType: "Brand strategy and identity design",
  },
  {
    key: "client-acquisition",
    name: "Client Acquisition",
    path: "/services/client-acquisition",
    definition:
      "Client Acquisition at Madvert Labs builds qualified demand across paid social, paid search, SEO and AI search, and judges success by qualified opportunities rather than raw lead volume.",
    serviceType: "Lead generation and customer acquisition",
  },
  {
    key: "meta-ads",
    name: "Meta Ads Lead Generation",
    path: "/services/meta-ads",
    definition:
      "Meta Ads Lead Generation is the planning, creative, targeting, lead capture and qualification of Facebook and Instagram advertising campaigns built to produce sales conversations, not just form fills.",
    serviceType: "Facebook and Instagram advertising",
    parent: "client-acquisition",
  },
  {
    key: "google-ads",
    name: "Google Ads Lead Generation",
    path: "/services/google-ads",
    definition:
      "Google Ads Lead Generation captures people who are already searching for a service, using search campaigns, landing pages and conversion tracking that feed qualified enquiries into sales follow up.",
    serviceType: "Google Ads and paid search management",
    parent: "client-acquisition",
  },
  {
    key: "seo",
    name: "SEO",
    path: "/services/seo",
    definition:
      "Search engine optimisation (SEO) at Madvert Labs improves how a business is found in Google and Bing through technical health, useful service and location content, internal linking and authority building.",
    serviceType: "Search engine optimisation",
    parent: "client-acquisition",
  },
  {
    key: "ai-seo-aeo",
    name: "AI SEO and Answer Engine Optimisation",
    path: "/services/ai-seo-aeo",
    definition:
      "AI SEO and answer engine optimisation (AEO) makes a business easier for AI search experiences such as Google AI Overviews, ChatGPT Search and Microsoft Copilot to find, understand and cite, using crawlable pages, clear entity information and evidence-backed content.",
    serviceType: "AI search visibility and answer engine optimisation",
    parent: "client-acquisition",
  },
  {
    key: "social-media-management",
    name: "Social Media Management",
    path: "/services/social-media-management",
    definition:
      "Social Media Management at Madvert Labs plans, produces, publishes and reviews organic content for a business's social channels so the brand stays visible and consistent between paid campaigns.",
    serviceType: "Social media management",
    parent: "branding-marketing",
  },
  {
    key: "conversion",
    name: "Conversion",
    path: "/services/conversion",
    definition:
      "Conversion at Madvert Labs designs websites, landing pages, offers, forms and booking journeys that turn paid and organic traffic into enquiries and booked calls.",
    serviceType: "Website design and conversion rate optimisation",
  },
  {
    key: "web-development",
    name: "Web Development",
    path: "/services/web-development",
    definition:
      "Web Development at Madvert Labs designs and builds fast marketing websites, landing pages and web applications that are connected to analytics, CRM and lead routing from day one.",
    serviceType: "Website and web application development",
    parent: "conversion",
  },
  {
    key: "studios",
    name: "Madvert Studios",
    path: "/studios",
    definition:
      "Madvert Studios is the creative production arm of Madvert Labs, producing ad creatives, short form video, motion graphics and brand films designed to earn attention and support campaigns.",
    serviceType: "Creative and video production",
  },
  {
    key: "automation-revenue-systems",
    name: "CRM and Automation",
    path: "/services/automation-revenue-systems",
    definition:
      "CRM and Automation at Madvert Labs sets up the CRM, pipelines, WhatsApp and email follow up, lead routing and reporting that keep every enquiry moving towards a sale.",
    serviceType: "CRM implementation and marketing automation",
  },
  {
    key: "ai-agents",
    name: "AI Agents",
    path: "/services/ai-agents",
    definition:
      "AI agents from Madvert Labs are task-specific assistants that answer enquiries, qualify leads, book appointments or prepare reports inside a business's existing tools, with human review where it matters.",
    serviceType: "AI agent and AI automation development",
    parent: "automation-revenue-systems",
  },
  {
    key: "tech-product-development",
    name: "Tech and Product Development",
    path: "/services/tech-product-development",
    definition:
      "Tech and Product Development at Madvert Labs designs and builds custom software, internal tools, dashboards and integrations when a business's growth needs a tool that does not exist off the shelf.",
    serviceType: "Custom software development",
  },
  {
    key: "app-development",
    name: "App Development",
    path: "/services/app-development",
    definition:
      "App Development at Madvert Labs designs and builds mobile and web applications, from customer-facing apps to client portals, with the backend, integrations and analytics they need.",
    serviceType: "Mobile and web app development",
    parent: "tech-product-development",
  },
];

export function getServiceEntity(key: ServiceKey) {
  const s = serviceEntities.find((x) => x.key === key);
  if (!s) throw new Error(`Unknown service entity ${key}`);
  return s;
}

/** Short alias URLs people (and AI answers) are likely to use, redirected to the canonical page. */
export const serviceAliases: Record<string, string> = {
  "/digital-marketing": "/services/digital-marketing",
  "/full-stack-digital-marketing": "/services/digital-marketing",
  "/meta-ads": "/services/meta-ads",
  "/facebook-ads": "/services/meta-ads",
  "/google-ads": "/services/google-ads",
  "/seo": "/services/seo",
  "/ai-seo-aeo": "/services/ai-seo-aeo",
  "/ai-seo": "/services/ai-seo-aeo",
  "/aeo": "/services/ai-seo-aeo",
  "/branding": "/services/branding-marketing",
  "/social-media-management": "/services/social-media-management",
  "/madvert-studios": "/studios",
  "/crm-automation": "/services/automation-revenue-systems",
  "/ai-agents": "/services/ai-agents",
  "/web-development": "/services/web-development",
  "/app-development": "/services/app-development",
};
