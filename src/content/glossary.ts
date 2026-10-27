/**
 * Glossary hub content (/glossary), one anchor per term. The most important terms also get a full
 * definition page (/glossary/<id>) when glossary-pages.ts has real content for them; no thin pages.
 *
 * Rules: each definition is self-contained (names the term, 1–2 sentences) so it can be quoted on
 * its own. Context paragraphs give Madvert Labs' practical view without invented statistics.
 * Service definitions and paths come from src/lib/entities.ts; definitions here must not
 * contradict them. Inline links use [anchor](/path).
 */
import { CPQL_CALCULATOR_PATH } from "./articles";

export type GlossaryTerm = {
  /** Anchor id, used as /glossary#<id>. */
  id: string;
  term: string;
  /** Self-contained definition that starts with the term. */
  definition: string;
  /** 2–4 sentences of practical context. */
  context: string;
  related: { href: string; anchor: string }[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "growth-system",
    term: "Growth System",
    definition:
      "A growth system is the connected set of brand, demand generation, conversion, follow-up, data and technology that turns attention into revenue, designed and measured as one system instead of separate vendors and campaigns.",
    context:
      "Madvert Labs uses the term because most growth problems sit between departments: the ads work but the landing page leaks, or the leads arrive but nobody follows up. Designing the parts together means a fix in one place is not undone by a gap in another. For an established business this usually starts with an audit of where enquiries are lost.",
    related: [
      { href: "/growth-systems", anchor: "What is a growth system?" },
      { href: "/resources/growth-systems-audit", anchor: "Growth Systems Audit" },
    ],
  },
  {
    id: "external-growth-department",
    term: "External Growth Department",
    definition:
      "An external growth department is an outside team that runs a company's marketing, acquisition, conversion and follow-up as one connected function, in place of hiring each specialist in-house or managing several separate agencies.",
    context:
      "This model suits businesses that need strategy, paid media, creative, website, CRM and reporting working together but cannot justify a full in-house team for each skill. The business keeps ownership of decisions, accounts and data; the external team does the planning and execution. Madvert Labs delivers this through Full Stack Digital Marketing.",
    related: [{ href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing" }],
  },
  {
    id: "full-stack-digital-marketing",
    term: "Full Stack Digital Marketing",
    definition:
      "Full Stack Digital Marketing from Madvert Labs is an outsourced marketing department that plans and runs strategy, paid acquisition, creative, website conversion, CRM, automation and analytics as one connected team.",
    context:
      "“Full stack” means the team covers every layer between the first ad impression and the closed sale, not only the channels. The practical difference from a single-service agency is accountability: one team answers for whether enquiries turn into revenue, not just whether a campaign spent its budget.",
    related: [
      { href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing" },
      { href: "/services", anchor: "All services" },
    ],
  },
  {
    id: "qualified-lead",
    term: "Qualified Lead",
    definition:
      "A qualified lead is an enquiry that meets buying criteria a business has written down in advance, such as a real need, the budget to pay, authority to decide and a timeframe that makes a sales conversation worthwhile.",
    context:
      "A form submission or WhatsApp message is only a lead until it passes that check. Madvert Labs judges acquisition by qualified opportunities rather than raw lead volume, because a cheap lead that never buys still costs sales time. BANT (budget, authority, need, timeline) is a common starting point, but the criteria should fit the business.",
    related: [
      { href: "/services/client-acquisition", anchor: "Client Acquisition" },
      { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation" },
      { href: "/insights/lead-generation-vs-qualified-lead-generation", anchor: "Lead generation vs qualified lead generation" },
    ],
  },
  {
    id: "qualified-rfq",
    term: "Qualified RFQ",
    definition:
      "A qualified RFQ (request for quotation) is a B2B enquiry, typically for a manufacturer, exporter or industrial supplier, that includes enough verifiable detail to quote against: an identifiable buyer, the product or specification, quantity, delivery location and timeline.",
    context:
      "Every quotation costs estimating time, so an RFQ that is really a price check has a real cost. For manufacturers and exporters in Pakistan, asking for company details, specification and quantity at the enquiry stage separates genuine buyers from “best price?” messages. The same qualification logic as for consumer leads applies, with criteria suited to trade buyers.",
    related: [
      { href: "/services/client-acquisition", anchor: "Client Acquisition" },
      { href: "/services/google-ads", anchor: "Google Ads Lead Generation" },
    ],
  },
  {
    id: "cost-per-qualified-lead",
    term: "Cost per Qualified Lead",
    definition:
      "Cost per qualified lead (CPQL) is ad spend divided by the number of leads that met the business's qualification criteria in the same period.",
    context:
      "CPQL is a better guide than cost per lead because it ignores enquiries that were never going to buy. A campaign with a higher cost per lead can have a lower CPQL when more of its leads qualify. The most a business can afford to pay is roughly the gross profit of an average deal multiplied by its qualified-to-close rate.",
    related: [
      { href: CPQL_CALCULATOR_PATH, anchor: "Cost Per Qualified Lead Calculator" },
      { href: "/services/client-acquisition", anchor: "Client Acquisition" },
    ],
  },
  {
    id: "speed-to-lead",
    term: "Speed-to-Lead",
    definition:
      "Speed-to-lead is the time between an enquiry arriving and the first useful response to it from a person or an automated message.",
    context:
      "Interest cools and buyers often contact more than one supplier, so a fast response usually helps, but only if the response moves the conversation forward. Madvert Labs does not apply a universal response-time rule; the honest approach is to record response times in the CRM and compare close rates across response-time bands. Automated WhatsApp or email replies can cover the gap outside working hours.",
    related: [{ href: "/services/automation-revenue-systems", anchor: "CRM and Automation" }],
  },
  {
    id: "lead-scoring",
    term: "Lead Scoring",
    definition:
      "Lead scoring is a method of ranking leads by how likely they are to buy, using points or grades based on who the lead is and what they have done.",
    context:
      "A scoring model is only as reliable as the closed-deal data behind it; without enough outcomes to check against, the points are guesses. Start with simple rules (meets the must-have criteria or not), add weighted signals once there is data, and review the model against actual sales every few months.",
    related: [
      { href: "/services/automation-revenue-systems", anchor: "CRM and Automation" },
      { href: "/services/ai-agents", anchor: "AI Agents" },
    ],
  },
  {
    id: "lead-qualification-system",
    term: "Lead Qualification System",
    definition:
      "A lead qualification system is the set of questions, rules, scoring, routing and follow-up that decides which enquiries reach the sales team, in what order and with what information attached.",
    context:
      "In practice it combines qualifying questions at capture (in the form, chat or call), a CRM that records the answers, routing to the right person and a follow-up sequence for leads that are not ready yet. Madvert Labs' Dubai real estate campaign, for example, screened every lead against BANT before delivering it to the client's CRM.",
    related: [
      { href: "/services/automation-revenue-systems", anchor: "CRM and Automation" },
      { href: "/case-studies/dubai-real-estate-nigeria", anchor: "Dubai real estate case study" },
    ],
  },
  {
    id: "revenue-response-system",
    term: "Revenue Response System",
    definition:
      "A revenue response system is the part of a growth system that makes sure every enquiry receives a timely, relevant response and keeps moving towards a sale, through CRM pipelines, automated follow-up, reminders and reporting.",
    context:
      "Many businesses lose more revenue after the enquiry than before it: messages go unanswered, quotes are not chased and no one can see which leads went cold. A revenue response system closes those gaps with clear ownership, automated WhatsApp and email follow-up, and pipeline reports a manager can act on.",
    related: [
      { href: "/services/automation-revenue-systems", anchor: "CRM and Automation" },
      { href: "/resources/revenue-leakage-audit", anchor: "Revenue Leakage Audit" },
    ],
  },
  {
    id: "ai-seo",
    term: "AI SEO",
    definition:
      "AI SEO is the practice of making a business easier for AI search experiences, such as Google AI Overviews, ChatGPT Search and Microsoft Copilot, to find, understand and cite, alongside ranking in traditional search results.",
    context:
      "AI SEO builds on the same foundations as SEO: crawlable pages, accurate structured data and genuinely useful content. The emphasis shifts towards clear entity information (who the business is and what it does), direct answers to buyer questions and evidence such as real case studies. It does not involve hidden text or content written only for machines.",
    related: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and Answer Engine Optimisation" },
      { href: "/services/seo", anchor: "SEO" },
    ],
  },
  {
    id: "aeo",
    term: "AEO (Answer Engine Optimisation)",
    definition:
      "AEO (Answer Engine Optimisation) is the work of structuring content so that search and AI answer engines can extract a clear, accurate answer to a specific question and attribute it to the business.",
    context:
      "Good AEO looks like good writing: the question as a heading, a self-contained answer in the first sentences, then the detail and evidence. Visible FAQs, definitions and comparison tables help, and structured data must describe only what is on the page. Madvert Labs treats AEO as part of AI SEO, not a separate trick.",
    related: [{ href: "/services/ai-seo-aeo", anchor: "AI SEO and Answer Engine Optimisation" }],
  },
];

export type GlossaryComparison = {
  id: string;
  title: string;
  intro: string;
  caption: string;
  rowHeader: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
  note?: string;
  links: { href: string; anchor: string }[];
};

export const glossaryComparisons: GlossaryComparison[] = [
  {
    id: "agency-vs-in-house-vs-external-growth-department",
    title: "Agency vs in-house team vs external growth department",
    intro: "Three common ways to staff marketing. Each can work; the right choice depends on budget, how many skills are needed and who owns the outcome.",
    caption: "Agency vs in-house team vs external growth department",
    rowHeader: "Factor",
    columns: ["Single-service agency", "In-house team", "External growth department"],
    rows: [
      {
        label: "Scope",
        cells: ["Usually one or two channels", "Whatever the team's skills cover", "Strategy, acquisition, creative, conversion, CRM and reporting together"],
      },
      {
        label: "Accountability",
        cells: ["For its own channel's metrics", "Full, inside the business", "For the connected outcome, from enquiry to sale"],
      },
      {
        label: "Cost structure",
        cells: ["Fee per service", "Salaries, tools and training for each role", "One retained team instead of several hires or agencies"],
      },
      {
        label: "Business knowledge",
        cells: ["Limited to the channel", "Deepest", "Built up through shared reporting and regular reviews"],
      },
      {
        label: "Main risk",
        cells: ["Gaps between several vendors", "Hard to hire and keep every specialist", "Depends on a good working relationship and clear ownership of accounts and data"],
      },
    ],
    links: [{ href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing" }],
  },
  {
    id: "meta-ads-vs-google-ads",
    title: "Meta Ads vs Google Ads",
    intro: "Meta and Google reach buyers at different moments. Many businesses use both: Google for existing demand, Meta for creating it.",
    caption: "Meta Ads vs Google Ads for lead generation",
    rowHeader: "Factor",
    columns: ["Meta Ads (Facebook and Instagram)", "Google Ads (search)"],
    rows: [
      { label: "Buyer intent", cells: ["Not searching yet; interest is created by the ad", "Already searching for the service"] },
      { label: "What wins", cells: ["The offer and the creative", "Keywords, relevance and the landing page"] },
      { label: "Best for", cells: ["New demand, visual offers, broad local and cross-border audiences", "Urgent or specific needs people search for"] },
      { label: "Lead quality risk", cells: ["Easy-to-submit forms can bring low-intent leads without qualifying questions", "Broad keywords can bring researchers and job seekers without negative keywords"] },
      { label: "Volume limit", cells: ["Large audiences; limited mainly by budget and creative", "Limited by how many people search"] },
    ],
    links: [
      { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation" },
      { href: "/services/google-ads", anchor: "Google Ads Lead Generation" },
    ],
  },
  {
    id: "seo-vs-paid-ads",
    title: "SEO vs paid ads",
    intro: "SEO and paid ads are not substitutes. Paid ads buy visibility now; SEO builds visibility the business owns over time.",
    caption: "SEO vs paid ads",
    rowHeader: "Factor",
    columns: ["SEO", "Paid ads"],
    rows: [
      { label: "Speed", cells: ["Builds over months", "Can bring enquiries within days of launch"] },
      { label: "Cost model", cells: ["Ongoing work on content, technical health and authority", "Pay for each click, view or lead"] },
      { label: "When spending stops", cells: ["Rankings usually decline gradually, not overnight", "Traffic stops"] },
      { label: "Control", cells: ["Less direct; search engines decide rankings", "Direct control of budget, audience and message"] },
      { label: "Best use", cells: ["Long-term, lower-cost demand capture", "Testing offers and filling the pipeline quickly"] },
    ],
    links: [
      { href: "/services/seo", anchor: "SEO" },
      { href: "/services/client-acquisition", anchor: "Client Acquisition" },
    ],
  },
  {
    id: "ai-seo-vs-traditional-seo",
    title: "AI SEO vs traditional SEO",
    intro: "AI SEO extends SEO rather than replacing it. The foundations are shared; the emphasis differs.",
    caption: "AI SEO vs traditional SEO",
    rowHeader: "Factor",
    columns: ["Traditional SEO", "AI SEO and AEO"],
    rows: [
      { label: "Goal", cells: ["Rank pages in search results", "Be found, understood and cited in AI answers as well as search results"] },
      { label: "Content emphasis", cells: ["Pages that match search queries", "Direct answers, clear definitions, comparisons and evidence"] },
      { label: "Entity clarity", cells: ["Helpful", "Central: consistent facts about who the business is and what it offers"] },
      { label: "Measurement", cells: ["Rankings, clicks and organic leads", "Also citations and mentions in AI answers, which are harder to measure"] },
      { label: "Shared foundations", cells: ["Crawlable pages, technical health, honest structured data", "The same foundations"] },
    ],
    links: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and Answer Engine Optimisation" },
      { href: "/services/seo", anchor: "SEO" },
    ],
  },
  {
    id: "crm-automation-vs-manual-follow-up",
    title: "CRM automation vs manual follow-up",
    intro: "Automation does not replace sales people; it makes sure nothing waits for someone to remember it.",
    caption: "CRM automation vs manual follow-up",
    rowHeader: "Factor",
    columns: ["Manual follow-up", "CRM automation"],
    rows: [
      { label: "First response", cells: ["Depends on who sees the enquiry and when", "Immediate acknowledgement or qualifying question, any time of day"] },
      { label: "Consistency", cells: ["Varies by person and workload", "The same sequence for every lead"] },
      { label: "Visibility", cells: ["Spread across phones, inboxes and spreadsheets", "One pipeline with stages, owners and reports"] },
      { label: "Personal touch", cells: ["High, when someone has time", "Kept for the conversations that need it"] },
      { label: "Main risk", cells: ["Leads forgotten or answered late", "Poorly written automation that feels robotic"] },
    ],
    links: [{ href: "/services/automation-revenue-systems", anchor: "CRM and Automation" }],
  },
];
