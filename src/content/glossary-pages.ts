/**
 * Full definition pages (/glossary/<id>) for the terms buyers and answer engines ask about most.
 * The definition itself always comes from glossary.ts, so the hub and the page say the same thing.
 *
 * Rules: short, quotable sections; frameworks are Madvert Labs' own (Growth Loop, Revenue
 * Response System) and appear as text; examples cite only published case studies with figures
 * copied exactly from src/cms/fallback.ts. Inline links use [anchor](/path). No em dashes.
 * A term gets a page only when an entry exists here; every other term stays an anchor on /glossary.
 */
import type { ServiceKey } from "@/lib/entities";

export type GlossaryPage = {
  /** Visible H1, phrased as the question people ask. */
  question: string;
  metaTitle: string;
  /** 140–160 characters. */
  metaDescription: string;
  howItWorks: { intro?: string; steps: { name: string; text: string }[] };
  whyItMatters: string[];
  example: { text: string; href?: string; anchor?: string };
  commonMistake: string;
  framework?: { name: string; text: string; href: string };
  services: ServiceKey[];
  reading: { href: string; anchor: string; note: string }[];
  /** Last material change (ISO date); feeds sitemap lastmod and dateModified. */
  updated: string;
};

export const glossaryPages: Record<string, GlossaryPage> = {
  "growth-system": {
    question: "What Is a Growth System?",
    metaTitle: "What Is a Growth System? Definition",
    metaDescription:
      "A growth system connects brand, demand, conversion, follow up, data and technology into one measured system. A short definition, how it works and an example.",
    howItWorks: {
      intro: "Madvert Labs builds growth systems with the Madvert Growth Loop:",
      steps: [
        { name: "Diagnose", text: "Find where growth is actually getting stuck: the offer, the channels, the website, the follow up or the data." },
        { name: "Build", text: "Build the missing or weakest part first, whether that is the offer, the campaigns, the landing page, the CRM or a custom tool." },
        { name: "Connect", text: "Connect each part to the next: ads to pages written for them, forms to the CRM, the CRM to fast follow up, and every step to tracking." },
        { name: "Compound", text: "Measure the whole chain, improve the weakest link and reinvest in what works." },
      ],
    },
    whyItMatters: [
      "Most growth problems sit between departments. The ads work but the landing page leaks, or the leads arrive but nobody follows up. Fixing one part in isolation is often undone by a gap in another.",
      "Designing the parts together means every improvement is measured against revenue, not against the metric of a single channel.",
    ],
    example: {
      text: "For a Dubai real estate company, the system was an investor offer, Meta Ads creative, BANT qualifying questions and delivery of each lead into the client's CRM. It produced 142 BANT-qualified investor leads at AED 4.17 CPL.",
      href: "/case-studies/dubai-real-estate-nigeria",
      anchor: "Read the Dubai real estate case study",
    },
    commonMistake: "Buying more traffic to fix a problem that sits after the click, such as a slow reply, a weak offer or a landing page that does not answer the buyer's questions.",
    framework: { name: "The Madvert Growth Loop", text: "Diagnose, Build, Connect, Compound.", href: "/growth-systems" },
    services: ["digital-marketing", "client-acquisition", "automation-revenue-systems"],
    reading: [
      { href: "/growth-systems", anchor: "What is a growth system? The full guide", note: "Components, warning signs and how to build one." },
      { href: "/resources/growth-systems-audit", anchor: "Growth Systems Audit", note: "Find the weakest link in your own system." },
    ],
    updated: "2026-10-27",
  },

  "external-growth-department": {
    question: "What Is an External Growth Department?",
    metaTitle: "What Is an External Growth Department?",
    metaDescription:
      "An external growth department is an outside team that runs marketing, acquisition, conversion and follow up as one function. How it works and when it fits.",
    howItWorks: {
      steps: [
        { name: "One plan", text: "Strategy, channels, creative, website, CRM and reporting are planned together against the business's revenue goals." },
        { name: "One team", text: "Specialists work as one department with one point of accountability, instead of several vendors reporting separately." },
        { name: "Your accounts", text: "Ad accounts, pixels, website, CRM and data stay in the business's name; the external team works inside them." },
        { name: "Shared reporting", text: "Regular reviews cover qualified leads, booked calls and sales, so decisions are made on the whole funnel." },
      ],
    },
    whyItMatters: [
      "Most established businesses need several marketing skills working together but cannot justify hiring a full-time specialist for each one.",
      "Managing several agencies creates gaps between them. An external growth department removes the gaps by owning the connected outcome.",
    ],
    example: {
      text: "Madvert Labs delivers this model as Full Stack Digital Marketing. For Earthly Elementals, a private label health brand in Pakistan, creative strategy, creator content, campaigns and a conversion-focused product page worked together and recorded 162 website purchases at Rs 844.57 per purchase.",
      href: "/case-studies/earthly-elementals",
      anchor: "Read the Earthly Elementals case study",
    },
    commonMistake: "Treating an external growth department like a channel vendor: judging it on one platform's metrics, or handing over account ownership so the business loses its own data.",
    services: ["digital-marketing", "performance-marketing", "branding-marketing"],
    reading: [
      { href: "/glossary#agency-vs-in-house-vs-external-growth-department", anchor: "Agency vs in-house team vs external growth department", note: "A side by side comparison." },
      { href: "/insights/how-to-choose-digital-marketing-agency-karachi", anchor: "How to choose a digital marketing agency", note: "Checks to run before you sign with any partner." },
    ],
    updated: "2026-10-27",
  },

  "full-stack-digital-marketing": {
    question: "What Is Full Stack Digital Marketing?",
    metaTitle: "What Is Full Stack Digital Marketing?",
    metaDescription:
      "Full stack digital marketing is one team running strategy, paid acquisition, creative, website conversion, CRM, automation and analytics. What it covers and why.",
    howItWorks: {
      steps: [
        { name: "Strategy and offer", text: "Who the business sells to, what it offers and why a buyer should choose it now." },
        { name: "Acquisition", text: "Meta Ads, Google Ads, SEO and AI search bring in the right demand." },
        { name: "Creative", text: "Ads, video and content made for the offer and the audience." },
        { name: "Conversion", text: "Landing pages, forms and booking journeys that turn traffic into enquiries." },
        { name: "CRM, automation and analytics", text: "Every enquiry is followed up, tracked and attributed to its source." },
      ],
    },
    whyItMatters: [
      "“Full stack” means the team covers every layer between the first ad impression and the closed sale, not only the channels.",
      "The practical difference from a single-service agency is accountability for whether enquiries turn into revenue.",
    ],
    example: {
      text: "In a sample Cellsol Energy solar campaign, offer work, creative and direct lead ads produced 569 leads at Rs. 9.12, and the wider engagement reached 200+ qualified leads a day, after which the client expanded its sales team.",
      href: "/case-studies/cellsol-energy",
      anchor: "Read the Cellsol Energy case study",
    },
    commonMistake: "Comparing full stack partners on the monthly fee alone, instead of on what is included and how results are measured.",
    services: ["digital-marketing", "performance-marketing", "conversion"],
    reading: [
      { href: "/insights/performance-marketing-vs-digital-marketing", anchor: "Performance marketing vs digital marketing", note: "Which kind of help a business needs." },
      { href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing at Madvert Labs", note: "Scope, process and pricing approach." },
    ],
    updated: "2026-10-27",
  },

  "qualified-lead": {
    question: "What Is a Qualified Lead?",
    metaTitle: "What Is a Qualified Lead? Definition and Example",
    metaDescription:
      "A qualified lead meets buying criteria written down in advance: need, budget, authority and timing. How qualification works, an example and the common mistake.",
    howItWorks: {
      steps: [
        { name: "Write the criteria", text: "Agree what a lead must have before sales spends time on it, for example budget, authority, need and timeline (BANT)." },
        { name: "Ask at capture", text: "Put the most important questions in the form, chat or first call, so answers arrive with the lead." },
        { name: "Record in the CRM", text: "Store the answers so the sales team can prioritise and so qualification can be measured." },
        { name: "Measure CPQL", text: "Divide ad spend by the number of leads that met the criteria to get the cost per qualified lead." },
      ],
    },
    whyItMatters: [
      "A cheap lead that never buys still costs sales time. Judging campaigns by qualified leads keeps marketing and sales working towards the same result.",
      "Qualification also improves the campaigns: ad platforms learn from the leads you mark as good.",
    ],
    example: {
      text: "For a Dubai real estate company targeting investors in Nigeria, every lead was screened against BANT before delivery to the client's CRM: 142 BANT-qualified investor leads at AED 4.17 CPL.",
      href: "/case-studies/dubai-real-estate-nigeria",
      anchor: "Read the Dubai real estate case study",
    },
    commonMistake: "Optimising for the lowest cost per lead. Every extra qualifying question lowers volume, so the right set is tested, but removing all of them usually fills the pipeline with people who were never going to buy.",
    services: ["client-acquisition", "meta-ads", "automation-revenue-systems"],
    reading: [
      { href: "/insights/lead-generation-vs-qualified-lead-generation", anchor: "Lead generation vs qualified lead generation", note: "How they differ and when each fits." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost per qualified lead calculator", note: "Work out CPQL from your own numbers." },
      { href: "/resources/qualified-lead-generation-playbook", anchor: "Qualified Lead Generation Playbook", note: "Free playbook from the Madvert Vault." },
    ],
    updated: "2026-10-27",
  },

  "qualified-rfq": {
    question: "What Is a Qualified RFQ?",
    metaTitle: "What Is a Qualified RFQ? B2B Definition",
    metaDescription:
      "A qualified RFQ is a B2B request for quotation with enough detail to quote against: buyer, specification, quantity, location and timeline. How it is qualified.",
    howItWorks: {
      steps: [
        { name: "Identify the buyer", text: "Company name and contact details that can be verified." },
        { name: "Capture the specification", text: "The product, size, materials or other details needed to price the job." },
        { name: "Confirm quantity and delivery", text: "Order quantity, delivery location and the date the buyer needs it." },
        { name: "Route to estimating", text: "Only RFQs that pass these checks reach the person who prepares quotes." },
      ],
    },
    whyItMatters: [
      "Every quotation costs estimating time. An RFQ that is really a price check has a real cost to a manufacturer or supplier.",
      "Asking for specification and quantity at the enquiry stage separates genuine trade buyers from “best price?” messages.",
    ],
    example: {
      text: "Madvert Labs runs a performance-based customer acquisition partnership for established U.S. custom patch and embroidery manufacturers, priced per accepted qualified RFQ.",
      href: "/custom-patches",
      anchor: "See the custom patch RFQ partnership",
    },
    commonMistake: "Counting every quote request as a lead. Without qualification, the RFQ volume looks healthy while the estimating team spends its week on buyers who will not order.",
    services: ["client-acquisition", "google-ads", "meta-ads"],
    reading: [
      { href: "/glossary/qualified-lead", anchor: "What is a qualified lead?", note: "The same logic for consumer and service leads." },
      { href: "/glossary/lead-qualification-system", anchor: "What is a lead qualification system?", note: "Questions, scoring, routing and follow up." },
    ],
    updated: "2026-10-27",
  },

  "lead-qualification-system": {
    question: "What Is a Lead Qualification System?",
    metaTitle: "What Is a Lead Qualification System?",
    metaDescription:
      "A lead qualification system decides which enquiries reach sales, in what order and with what information, using questions, scoring, routing and follow up.",
    howItWorks: {
      steps: [
        { name: "Qualifying questions", text: "Asked at capture in the form, chat or first call." },
        { name: "CRM record", text: "Answers are stored with the lead and its source campaign." },
        { name: "Scoring or rules", text: "Simple must-have rules first; weighted scores once there is closed-deal data to check them against." },
        { name: "Routing", text: "Each lead goes to the right person or team, ready leads first." },
        { name: "Follow up", text: "Leads that are not ready yet enter a nurture sequence instead of being lost." },
      ],
    },
    whyItMatters: [
      "Without a system, sales teams decide lead by lead, inconsistently, and good leads wait behind poor ones.",
      "With one, marketing can be measured on qualified opportunities and sales spends its time where it is most likely to close.",
    ],
    example: {
      text: "In the Dubai real estate campaign, budget, authority, need and timeline were asked before delivery, and the answers arrived in the client's CRM with each lead.",
      href: "/case-studies/dubai-real-estate-nigeria",
      anchor: "Read the Dubai real estate case study",
    },
    commonMistake: "Building a complex scoring model before there is enough closed-deal data. Without outcomes to check against, the points are guesses.",
    framework: { name: "The Madvert Revenue Response System", text: "Capture, Respond, Qualify, Nurture, Book, Track.", href: "/services/automation-revenue-systems" },
    services: ["automation-revenue-systems", "ai-agents", "client-acquisition"],
    reading: [
      { href: "/glossary#lead-scoring", anchor: "Lead scoring", note: "Ranking leads by likelihood to buy." },
      { href: "/resources/revenue-leakage-audit", anchor: "Revenue Leakage Audit", note: "Find where leads are lost after they arrive." },
    ],
    updated: "2026-10-27",
  },

  "revenue-response-system": {
    question: "What Is a Revenue Response System?",
    metaTitle: "What Is a Revenue Response System?",
    metaDescription:
      "A revenue response system makes sure every enquiry gets a timely, relevant reply and keeps moving towards a sale: capture, respond, qualify, nurture, book, track.",
    howItWorks: {
      intro: "The Madvert Revenue Response System has six steps:",
      steps: [
        { name: "Capture", text: "Every enquiry lands in one place, with its source attached." },
        { name: "Respond", text: "A reply goes out quickly, on the channel the lead prefers." },
        { name: "Qualify", text: "The right questions are asked and answered before a person steps in." },
        { name: "Nurture", text: "Leads that are not ready yet receive useful follow up that keeps the conversation warm." },
        { name: "Book", text: "Qualified leads choose a time without the back and forth." },
        { name: "Track", text: "Every outcome is recorded, so the business knows what produced revenue." },
      ],
    },
    whyItMatters: [
      "Many businesses lose more revenue after the enquiry than before it: messages go unanswered, quotes are not chased and no one can see which leads went cold.",
      "A revenue response system closes those gaps with clear ownership, automated WhatsApp and email follow up, and pipeline reports a manager can act on.",
    ],
    example: {
      text: "The free Revenue Leakage Audit walks through each of the six steps for your own business and shows where enquiries are being lost.",
      href: "/resources/revenue-leakage-audit",
      anchor: "Take the Revenue Leakage Audit",
    },
    commonMistake: "Spending more on ads while enquiries wait hours or days for a first reply.",
    framework: { name: "The Madvert Revenue Response System", text: "Capture, Respond, Qualify, Nurture, Book, Track.", href: "/services/automation-revenue-systems" },
    services: ["automation-revenue-systems", "ai-agents"],
    reading: [
      { href: "/glossary#speed-to-lead", anchor: "Speed to lead", note: "Why response time matters, and how to measure it honestly." },
      { href: "/services/ai-agents", anchor: "AI lead response agents", note: "Instant replies and consistent qualification inside your tools." },
    ],
    updated: "2026-10-27",
  },

  "ai-seo": {
    question: "What Is AI SEO?",
    metaTitle: "What Is AI SEO? Definition and How It Works",
    metaDescription:
      "AI SEO makes a business easier for Google AI Overviews, ChatGPT Search and Microsoft Copilot to find, understand and cite. How it works and the common mistake.",
    howItWorks: {
      steps: [
        { name: "Crawl access", text: "Search and AI search crawlers such as Googlebot, Bingbot and OAI-SearchBot can reach every public page, which is indexed in Google and Bing." },
        { name: "Clear entity information", text: "The business name, services, founder, address and profiles are stated consistently on the site and in structured data." },
        { name: "Direct answers", text: "Pages answer real buyer questions in their first sentences, then give the detail." },
        { name: "Evidence", text: "Claims are supported by first-party proof such as published case studies." },
        { name: "Corroboration", text: "Independent profiles, directories and reviews describe the business the same way." },
      ],
    },
    whyItMatters: [
      "AI answers name a small number of businesses. Being understood and trusted is now part of being found.",
      "AI SEO builds on SEO rather than replacing it: most AI search experiences draw on the same search indexes.",
    ],
    example: {
      text: "Madvert Labs applies the same approach to its own site: a public company fact sheet, consistent entity data, answer-first service pages and published case studies with verified figures.",
      href: "/about/facts",
      anchor: "See the Madvert Labs fact sheet",
    },
    commonMistake: "Blocking the crawlers AI search depends on, or writing content for machines instead of buyers. Hidden text and keyword stuffing do not help and can harm.",
    services: ["ai-seo-aeo", "seo"],
    reading: [
      { href: "/insights/what-is-aeo", anchor: "What is AEO?", note: "Answer engine optimisation explained." },
      { href: "/resources/seo-ai-search-playbook", anchor: "SEO and AI Search Playbook", note: "Free playbook from the Madvert Vault." },
    ],
    updated: "2026-10-27",
  },

  aeo: {
    question: "What Is AEO (Answer Engine Optimisation)?",
    metaTitle: "What Is AEO? Answer Engine Optimisation Defined",
    metaDescription:
      "AEO structures content so search and AI answer engines can extract a clear, accurate answer and attribute it to the business. How it works, with an example.",
    howItWorks: {
      steps: [
        { name: "Question as heading", text: "Use the words buyers use, such as “What makes a lead qualified?”" },
        { name: "Direct answer first", text: "A self-contained answer of about 40 to 70 words, naming the subject." },
        { name: "Supporting detail", text: "How it works, why it matters and the exceptions." },
        { name: "Evidence", text: "An example, a figure from a real case study or a comparison table." },
        { name: "Matching structured data", text: "Schema that describes only what is visible on the page." },
      ],
    },
    whyItMatters: [
      "Answer engines quote passages, not pages. A clear, self-contained answer is easier to extract and attribute correctly.",
      "The same structure helps human readers find the answer without scrolling.",
    ],
    example: {
      text: "This page follows the structure: the question as the heading, a direct definition, then how it works, why it matters, an example and the common mistake.",
    },
    commonMistake: "Adding long lists of FAQs to every page. Use FAQs only for real buyer questions and keep each answer short and factual.",
    services: ["ai-seo-aeo", "seo"],
    reading: [
      { href: "/insights/what-is-aeo", anchor: "What is AEO? The full guide", note: "AEO for businesses in Pakistan." },
      { href: "/glossary/ai-seo", anchor: "What is AI SEO?", note: "The wider practice AEO sits within." },
    ],
    updated: "2026-10-27",
  },
};

export const glossaryPagePath = (id: string) => `/glossary/${id}`;
