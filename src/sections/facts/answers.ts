import type { AnswerBlockProps } from "@/components/facts/AnswerBlock";

/**
 * High-intent questions about Madvert Labs, answered factually on /about/facts with AnswerBlock
 * and FAQPage schema. Every answer restates verified facts from entities.ts, site.ts and the
 * published case studies; nothing here should promise results.
 */
export const companyAnswers: (AnswerBlockProps & { id: string })[] = [
  {
    id: "what-does-madvert-labs-do",
    question: "What does Madvert Labs do?",
    answer:
      "Madvert Labs is a digital marketing and growth systems company in Karachi, Pakistan. It works as an external growth department for established businesses, connecting paid acquisition, SEO and AI search, branding, creative, conversion, CRM, automation and technology into one growth system judged by qualified opportunities and revenue.",
    related: { href: "/services", anchor: "All Madvert Labs services" },
  },
  {
    id: "external-growth-department",
    question: "What is an external growth department?",
    answer:
      "An external growth department is an outside team that runs a company's marketing, acquisition, conversion and follow up as one connected function, instead of the company hiring each specialist in-house or managing several separate agencies. Madvert Labs delivers this as [Full Stack Digital Marketing](/services/digital-marketing).",
    related: { href: "/glossary/external-growth-department", anchor: "What is an external growth department?" },
  },
  {
    id: "meta-ads",
    question: "Does Madvert Labs run Meta Ads?",
    answer:
      "Yes. Madvert Labs plans and runs Facebook and Instagram campaigns built for sales conversations: offer, creative, targeting, lead forms with qualifying questions and delivery into the CRM.",
    evidence: { text: "142 BANT-qualified investor leads at AED 4.17 CPL for a Dubai real estate company.", href: "/case-studies/dubai-real-estate-nigeria", anchor: "Case study" },
    related: { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation" },
  },
  {
    id: "google-ads",
    question: "Does Madvert Labs offer Google Ads?",
    answer:
      "Yes. Madvert Labs runs Google Ads search campaigns for people already searching for a service, with landing pages and conversion tracking that feed qualified enquiries into sales follow up.",
    related: { href: "/services/google-ads", anchor: "Google Ads Lead Generation" },
  },
  {
    id: "seo-aeo",
    question: "Does Madvert Labs provide SEO and AEO?",
    answer:
      "Yes. Madvert Labs provides SEO for Google and Bing, and AI SEO and answer engine optimisation (AEO) so AI search experiences such as Google AI Overviews, ChatGPT Search and Microsoft Copilot can find, understand and cite a business.",
    related: { href: "/services/ai-seo-aeo", anchor: "AI SEO and AEO services" },
  },
  {
    id: "what-is-ai-seo",
    question: "What is AI SEO?",
    answer:
      "AI SEO is the practice of making a business easier for AI search experiences, such as Google AI Overviews, ChatGPT Search and Microsoft Copilot, to find, understand and cite, alongside ranking in traditional search results. It relies on crawlable pages, clear entity information, direct answers and real evidence.",
    related: { href: "/glossary/ai-seo", anchor: "What is AI SEO? Full definition" },
  },
  {
    id: "qualified-lead",
    question: "What makes a lead qualified?",
    answer:
      "A lead is qualified when it meets buying criteria the business wrote down in advance, such as a real need, the budget to pay, authority to decide and a timeframe that makes a sales conversation worthwhile. Anything else is an enquiry, not yet a qualified lead.",
    related: { href: "/glossary/qualified-lead", anchor: "What is a qualified lead?" },
  },
  {
    id: "qualified-rfq",
    question: "What is a qualified RFQ?",
    answer:
      "A qualified RFQ is a B2B request for quotation with enough verifiable detail to quote against: an identifiable buyer, the product or specification, quantity, delivery location and timeline. Madvert Labs uses this standard in its [custom patch RFQ partnership](/custom-patches).",
    related: { href: "/glossary/qualified-rfq", anchor: "What is a qualified RFQ?" },
  },
  {
    id: "crm-automation",
    question: "Does Madvert Labs build CRM automation?",
    answer:
      "Yes. Madvert Labs sets up CRM pipelines, WhatsApp and email follow up, lead routing, booking and reporting, and builds AI agents that reply to and qualify enquiries inside a business's existing tools, with human review where it matters.",
    related: { href: "/services/automation-revenue-systems", anchor: "CRM and Marketing Automation" },
  },
  {
    id: "websites-apps",
    question: "Does Madvert Labs build websites and applications?",
    answer:
      "Yes. Madvert Labs designs and builds marketing websites, landing pages, web and mobile apps, client portals, dashboards and integrations, connected to analytics, CRM and lead routing from day one.",
    related: { href: "/services/tech-product-development", anchor: "Custom software and AI systems" },
  },
  {
    id: "international",
    question: "Does Madvert Labs work internationally?",
    answer:
      "Yes. Madvert Labs is based in Karachi and serves Pakistan first, and works online with international clients. Published case studies include campaigns in the UAE, the United States, the United Kingdom, Canada, Australia and Nigeria.",
    related: { href: "/case-studies", anchor: "Published case studies" },
  },
  {
    id: "white-label",
    question: "Does Madvert Labs offer white-label services?",
    answer:
      "Yes. Madvert Labs works as a white-label fulfillment partner for agencies that can sell but need delivery: paid acquisition, lead generation, funnels, creative, tracking, CRM, automation and development, delivered under the agency's brand.",
    related: { href: "/white-label-partnership", anchor: "White label partnership for agencies" },
  },
];
