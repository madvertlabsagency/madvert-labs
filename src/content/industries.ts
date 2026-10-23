/**
 * Copy for the industry pages (/industries and /industries/<slug>), rendered by src/sections/industry/*.
 *
 * Rules for this file (from the client brief):
 * - Only industries backed by a REAL case study or a real client video testimonial in src/cms/fallback.ts.
 * - Proof is referenced by case study slug and metric label; figures are rendered from fallback.ts
 *   verbatim. When a figure is quoted in copy below it is copied exactly as stored there.
 * - Never claim more clients or results than the case studies show. Say "for example" and link.
 * - `markets` drives schema areaServed and lists only countries the linked proof supports.
 * - FAQs are genuine buyer questions with honest answers, rendered visibly (FAQPage JSON-LD).
 * - Inline links are written as [anchor text](/path) and rendered by <Rich>. No em dashes.
 */
import type { RelatedLink } from "@/components/service-page/RelatedLinks";
import type { ServiceKey } from "@/lib/entities";

export type IndustryMotif = "real-estate" | "solar" | "home" | "ecommerce";

export type IndustryProofItem = {
  slug: string;
  /** "primary" proof is the industry itself; "related" is an honest adjacency, labelled as such. */
  relation: "primary" | "related";
  /** Why this study is relevant to the industry (one or two sentences). */
  note: string;
  /** Metric labels to show, exactly as stored in the case study. */
  metrics: string[];
};

export type IndustryPage = {
  slug: string;
  path: string;
  motif: IndustryMotif;
  /** Display name, e.g. "Real Estate". */
  name: string;
  /** Lowercase phrase used inside sentences and headings, e.g. "real estate". */
  short: string;
  /** Unique <title> (the site template appends " | Madvert Labs"). */
  metaTitle: string;
  /** 140–160 characters. */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  /** Two to four sentences under the H1, citing real proof inline with a link. */
  answer: string[];
  glance: { label: string; value: string }[];
  /** Index card summary (one sentence, with the headline proof). */
  cardSummary: string;
  hard: { title: string; paragraphs: string[]; journey: { stage: string; text: string }[] };
  system: { intro: string; steps: { name: string; text: string }[] };
  qualification: { title: string; intro: string; questions: { q: string; why: string }[]; note?: string };
  channels: { key: ServiceKey; note: string; proven?: string }[];
  proof: { intro: string; items: IndustryProofItem[] };
  testimonial?: { quote: string; name: string; role: string; business: string; note: string };
  faqs: { q: string; a: string }[];
  related: RelatedLink[];
  resources: string[];
  cta: { title: string; accent: string; body: string; label: string };
  /** Service schema. */
  serviceName: string;
  serviceType: string;
  audience: string;
  /** Countries the published proof supports (schema areaServed). */
  markets: string[];
};

export const industriesPath = "/industries";

export const industriesMeta = {
  title: "Industries and Lead Generation Proof",
  description:
    "Industries Madvert Labs builds lead generation and growth systems for, from real estate and solar to home services and e-commerce, each with a real case study.",
};

export const industryPages: IndustryPage[] = [
  /* ───────────────────────── Real estate ───────────────────────── */
  {
    slug: "real-estate",
    path: "/industries/real-estate",
    motif: "real-estate",
    name: "Real Estate",
    short: "real estate",
    metaTitle: "Real Estate Lead Generation Agency, Dubai",
    metaDescription:
      "Real estate lead generation by Madvert Labs: investor offers, Meta Ads, BANT qualifying questions and CRM delivery, with a real Dubai investor case study.",
    eyebrow: "Industries · Real Estate",
    h1: "Lead Generation for Real Estate Companies.",
    h1Accent: "Investors Qualified Before the Sales Call.",
    answer: [
      "Madvert Labs builds lead generation systems for real estate developers and brokerages: an investor-focused offer, Meta Ads creative and targeting, qualifying questions on budget, authority, need and timeline, and delivery of each qualified lead into the sales team's CRM.",
      "For example, for a Dubai real estate company targeting investors in Nigeria, Madvert Labs generated 142 BANT-qualified investor leads at AED 4.17 CPL on AED 591.58 of ad spend ([read the Dubai real estate case study](/case-studies/dubai-real-estate-nigeria)). The team works from [Karachi](/digital-marketing-agency-karachi) with property businesses in the UAE, Pakistan and other markets.",
    ],
    glance: [
      { label: "Built for", value: "Developers, brokerages and agents selling to buyers and investors, locally or across borders." },
      { label: "Proof", value: "[142 BANT-qualified investor leads](/case-studies/dubai-real-estate-nigeria) for a Dubai real estate company." },
      { label: "Main channel", value: "Meta Ads, with Google search, SEO and CRM follow up where the project needs them." },
      { label: "Measured by", value: "Cost per qualified lead and conversations the sales team can progress, not raw lead volume." },
    ],
    cardSummary: "142 BANT-qualified investor leads from Nigeria for a Dubai real estate company at AED 4.17 CPL.",
    hard: {
      title: "What makes lead generation hard in real estate",
      paragraphs: [
        "Property is a high-value, slow decision. A buyer or investor may enquire months before committing, compare several projects and need reassurance about the developer, the payment plan and the area before speaking seriously to an agent.",
        "Cheap real estate leads are easy to buy and expensive to work. Forms filled by people who were only curious about prices, could never afford the down payment or were not the decision maker take up the sales team's week and make the campaign look better than it is.",
        "Cross-border buyers add another layer. A Dubai project marketed to investors in another country has to earn trust from a distance, answer questions about returns, residency and ownership, and reach people the sales team can follow up across time zones. In the [Dubai real estate case study](/case-studies/dubai-real-estate-nigeria), the client asked for serious, high-intent investors, not random real estate leads.",
      ],
      journey: [
        { stage: "Curious", text: "Sees a project or a price and wants to know more, with no budget or timeline in mind yet." },
        { stage: "Comparing", text: "Weighs areas, developers, payment plans and expected returns across several options." },
        { stage: "Checking trust", text: "Looks for proof that the developer and the agent are credible before sharing details." },
        { stage: "Ready to talk", text: "Has a budget, a reason (home, return or residency) and a timeline, and wants a call or viewing." },
      ],
    },
    system: {
      intro:
        "The system below is the one used in the Dubai real estate case study, written as steps a property business can check against its own marketing.",
      steps: [
        {
          name: "Offer and project positioning",
          text: "Turn the project into an offer an investor can understand in seconds: who it is for, the benefit, the payment terms and a reason to act. The Dubai campaign used future-facing messaging and risk reversal to reduce hesitation.",
        },
        {
          name: "Channels and creative",
          text: "Meta Ads reach buyers and investors by location, interest and life stage, including audiences in another country. Premium images and angles are built around the buyer's motivation rather than a list of amenities.",
        },
        {
          name: "Qualifying questions",
          text: "The form asks about budget, authority, need and timeline (BANT) before the lead reaches sales, so agents spend their time on people who can and want to buy.",
        },
        {
          name: "Follow up and CRM",
          text: "Qualified leads arrive in the CRM with their answers attached, such as budget, timeline and investment goal, so the sales team can call or message quickly. [CRM and Automation](/services/automation-revenue-systems) can add WhatsApp and email follow up.",
        },
        {
          name: "Reporting",
          text: "Reports show cost per lead and cost per qualified lead side by side, and how many leads became conversations the team could progress. Viewings and sales are reported where the client's CRM records them.",
        },
      ],
    },
    qualification: {
      title: "Qualifying questions for real estate leads",
      intro: "These are the four BANT criteria used to screen every lead in the Dubai real estate case study, phrased as questions a form or first call can ask.",
      questions: [
        { q: "Budget: can you afford the project or the down payment (for example 10%)?", why: "Separates investors who can act from people browsing prices." },
        { q: "Authority: are you the decision maker or a serious investor?", why: "Avoids long conversations with people who cannot commit." },
        { q: "Need: are you buying a home, an investment for return, or for residency?", why: "Lets the agent open the call with the right project and argument." },
        { q: "Timeline: are you ready now or within a reasonable near term?", why: "Puts ready buyers at the front of the follow up queue." },
      ],
      note: "Questions are adapted to each project and market. Every extra question lowers volume, so the set is tested rather than fixed.",
    },
    channels: [
      { key: "meta-ads", note: "Investor and buyer campaigns on Facebook and Instagram with qualifying lead forms.", proven: "Used in the Dubai real estate case study" },
      { key: "automation-revenue-systems", note: "Qualified leads delivered into the CRM with their answers, plus follow up workflows.", proven: "CRM delivery used in the Dubai real estate case study" },
      { key: "google-ads", note: "Search campaigns for people already searching an area, a project type or a developer." },
      { key: "seo", note: "Project, area and buyer guide pages that keep bringing enquiries after ads stop." },
      { key: "ai-seo-aeo", note: "Clear, evidence-backed pages that AI search can understand when buyers ask where to invest." },
    ],
    proof: {
      intro: "The real estate figures below are from one campaign for one client, shown exactly as reported. A related Dubai property interiors case study is included because its buyers and qualification are similar.",
      items: [
        {
          slug: "dubai-real-estate-nigeria",
          relation: "primary",
          note: "A Dubai real estate company wanted serious investors from Nigeria for a Dubai project. Madvert Labs engineered the offer, built premium creative and screened every lead against BANT before delivering it to the client's CRM.",
          metrics: ["BANT-Qualified Investor Leads", "Cost Per Lead", "Total Ad Spend"],
        },
        {
          slug: "dubai-interior-design",
          relation: "related",
          note: "Related, not real estate: a Dubai luxury interior design company. Each inquiry was qualified by property type, size, project scope, finish level and timeline before a consultation was booked.",
          metrics: ["Qualified Inquiries", "Cost Per Inquiry", "Total Spend"],
        },
      ],
    },
    faqs: [
      {
        q: "How do real estate companies get qualified leads from Meta Ads?",
        a: "Real estate companies get qualified leads from Meta Ads by pairing a clear project offer with creative aimed at the buyer's motivation and a form that asks about budget, authority, need and timeline before the lead reaches sales. In the [Dubai real estate case study](/case-studies/dubai-real-estate-nigeria), that approach produced 142 BANT-qualified investor leads at AED 4.17 CPL.",
      },
      {
        q: "Can Madvert Labs find overseas investors for a property project?",
        a: "Yes. Meta Ads can target investors in another country, and the creative and offer are built for that audience's questions. The published example is a Dubai real estate company that targeted investors in Nigeria. Results for other countries depend on the project, the offer and the budget, so they are not promised in advance.",
      },
      {
        q: "What does a BANT-qualified real estate lead mean?",
        a: "A BANT-qualified real estate lead has answered questions on Budget (can afford the project or down payment), Authority (is the decision maker or a serious investor), Need (wants a home, a return or residency) and Timeline (is ready now or in the near term). The answers travel with the lead into the CRM so the agent can prioritise.",
      },
      {
        q: "Does Madvert Labs work with real estate businesses in Pakistan?",
        a: "Yes. Madvert Labs is based in [Karachi](/digital-marketing-agency-karachi) and can build the same offer, qualification and CRM system for developers, brokerages and agents in Pakistan. The published real estate case study is from Dubai, so Pakistani campaigns are planned and measured on their own numbers.",
      },
      {
        q: "How much does a real estate lead cost?",
        a: "There is no fixed price. Cost per lead depends on the market, the project, the offer and how strict the qualifying questions are. The AED 4.17 CPL in the Dubai case study describes one campaign and is not a benchmark. Madvert Labs judges real estate campaigns by cost per qualified lead, which can be worked out with the [cost per qualified lead calculator](/tools/cost-per-qualified-lead-calculator).",
      },
      {
        q: "Does Madvert Labs guarantee property sales?",
        a: "No. Madvert Labs builds and runs the system that produces qualified leads and gets them to the sales team quickly. Closing a sale depends on the project, the price and the sales team. The Dubai real estate case study reports qualified leads and does not report property sales.",
      },
    ],
    related: [
      { key: "meta-ads", anchor: "Meta Ads lead generation", note: "How Facebook and Instagram campaigns are built for sales conversations." },
      { key: "automation-revenue-systems", anchor: "CRM and follow up for property leads", note: "Pipelines, lead routing and WhatsApp follow up for sales teams." },
      { href: "/case-studies/dubai-real-estate-nigeria", anchor: "Dubai real estate investor case study", note: "The full write-up, with the BANT criteria and the PDF." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost per qualified lead calculator", note: "Work out what each qualified enquiry really costs from your own numbers." },
    ],
    resources: ["qualified-lead-generation-playbook", "meta-ads-pre-launch-checklist", "automated-lead-engine"],
    cta: {
      title: "Selling a Project?",
      accent: "Talk to Investors Who Can Actually Buy.",
      body: "We will look at the project, the offer, the current lead flow and the follow up before recommending a campaign.",
      label: "Book a Real Estate Strategy Call",
    },
    serviceName: "Lead generation for real estate companies",
    serviceType: "Lead generation for real estate",
    audience: "Real estate developers, brokerages and agents",
    markets: ["United Arab Emirates"],
  },

  /* ───────────────────────── Solar ───────────────────────── */
  {
    slug: "solar-energy",
    path: "/industries/solar-energy",
    motif: "solar",
    name: "Solar Energy",
    short: "solar",
    metaTitle: "Solar Lead Generation Agency, Pakistan & US",
    metaDescription:
      "Solar lead generation by Madvert Labs: offers, Meta Ads, qualifying questions on bills and property, and follow up, proven for Cellsol Energy and in Texas.",
    eyebrow: "Industries · Solar Energy",
    h1: "Lead Generation for Solar Companies.",
    h1Accent: "Sales-Ready Enquiries, Not Price Shoppers.",
    answer: [
      "Madvert Labs builds lead generation for solar installers and solar brands: a benefit-driven solar offer, Meta Ads aimed at property owners, qualifying questions on electricity bills, property and installation interest, and fast follow up by the sales team.",
      "For example, Cellsol Energy reached 200+ qualified leads per day at ~Rs. 10 CPL, with a sample campaign showing 569 leads at Rs. 9.12 ([Cellsol Energy case study](/case-studies/cellsol-energy)). For a Texas solar company, a July 2025 campaign produced 136 website applications at $13.72 and 36 Meta leads at $15.09 ([Texas solar case study](/case-studies/texas-solar)).",
    ],
    glance: [
      { label: "Built for", value: "Residential, commercial and agricultural solar installers and solar brands." },
      { label: "Proof", value: "[Cellsol Energy](/case-studies/cellsol-energy) and a [Texas solar company](/case-studies/texas-solar)." },
      { label: "Main channel", value: "Meta Ads lead forms and landing page funnels, with Google search and SEO where intent exists." },
      { label: "Measured by", value: "Cost per qualified lead and appointments the sales team can run, not form fills alone." },
    ],
    cardSummary: "Cellsol Energy reached 200+ qualified leads per day at ~Rs. 10 CPL; a Texas solar campaign produced 136 website applications at $13.72.",
    hard: {
      title: "What makes lead generation hard in solar",
      paragraphs: [
        "Solar is a considered purchase with a large upfront cost. Most people who click a solar ad want a rough price first, and many are tenants, live outside the service area or have no plan to install soon. Those enquiries look like leads on a dashboard but rarely become site visits.",
        "Many installers advertise similar offers to the same audience, which pushes lead costs up. In the [Cellsol Energy case study](/case-studies/cellsol-energy), the solar market was highly competitive and lead costs were high for most players.",
        "The sale also depends on speed and information. A sales team that receives a name and a phone number has to start from zero, while a team that already knows the monthly bill, the property and the level of interest can have a useful first conversation.",
      ],
      journey: [
        { stage: "Bill pressure", text: "A high electricity bill or unreliable supply prompts a first look at solar." },
        { stage: "Price check", text: "Wants a rough cost and payback before speaking to anyone." },
        { stage: "Comparing installers", text: "Asks several companies, looks at equipment, warranty and trust." },
        { stage: "Ready for a survey", text: "Owns the property, knows the bill and wants a quote or appointment." },
      ],
    },
    system: {
      intro: "This is the system behind both solar case studies, set out as steps a solar company can compare with its current lead flow.",
      steps: [
        {
          name: "A solar offer that earns attention",
          text: "A clear, benefit-driven offer is the biggest lever. Both solar campaigns started with offer creation before any targeting decisions.",
        },
        {
          name: "Channels and creative",
          text: "Meta Ads reach property owners by location, interest and behaviour. Creative uses simple messaging and real-life visuals. Direct lead ads (Cellsol Energy) and a landing page funnel (Texas) are chosen per market and tested.",
        },
        {
          name: "Qualifying questions",
          text: "The form captures the details a solar sales team needs before calling. The Texas lead-gen flow captured bill details, property info and installation interest.",
        },
        {
          name: "Follow up and CRM",
          text: "Leads are routed to the sales team quickly, with their answers attached, so the first call can move to a survey or appointment. [CRM and Automation](/services/automation-revenue-systems) adds reminders and WhatsApp follow up where needed.",
        },
        {
          name: "Reporting",
          text: "Reports separate lead types (for example lead form leads and website applications) and track cost per qualified lead and appointments, so budget moves to what the sales team can close.",
        },
      ],
    },
    qualification: {
      title: "Qualifying questions for solar leads",
      intro: "Questions a solar lead form or first call can ask. The first three reflect what the Texas solar flow captured.",
      questions: [
        { q: "What is your average monthly electricity bill?", why: "Bill size shapes the system size and the savings argument." },
        { q: "Do you own the property, and what type is it (home, farm, business)?", why: "Owners can decide; property type decides the proposal." },
        { q: "How soon are you looking to install?", why: "Separates people ready for a survey from people collecting prices." },
        { q: "Where is the property located?", why: "Keeps enquiries inside the area the installer serves." },
        { q: "Are you paying upfront or looking at financing?", why: "Lets the sales team prepare the right option for the first call." },
      ],
      note: "Each question is tested against volume. A shorter form can suit a direct lead ad, while a funnel can ask more.",
    },
    channels: [
      { key: "meta-ads", note: "Lead form and landing page funnel campaigns aimed at property owners.", proven: "Used in both solar case studies" },
      { key: "performance-marketing", note: "Meta, Google and YouTube planned together and judged by cost per qualified lead." },
      { key: "google-ads", note: "Search campaigns for people already searching for solar installation in an area." },
      { key: "seo", note: "Service area and cost guide pages that bring in people researching solar." },
      { key: "ai-seo-aeo", note: "Pages that AI search can cite when people ask how solar costs and savings work." },
    ],
    proof: {
      intro: "Two solar campaigns, shown exactly as reported. They use different currencies, markets and lead types, so the figures should not be compared directly.",
      items: [
        {
          slug: "cellsol-energy",
          relation: "primary",
          note: "Cellsol Energy needed a consistent flow of qualified leads in a competitive solar market. Direct Meta lead ads, a benefit-driven offer and targeting with property ownership signals produced leads of a quality the client describes as high enough to expand its sales team. Figures are in Pakistani rupees.",
          metrics: ["Qualified Leads/Day", "Total Leads", "Cost Per Lead", "Total Ad Spend"],
        },
        {
          slug: "texas-solar",
          relation: "primary",
          note: "A Texas solar company wanted high-intent prospects it could turn into direct appointments. Two Meta campaigns ran from 1 to 31 July 2025: a funnel form and a lead form.",
          metrics: ["Website Applications", "Cost Per Website Application", "Meta Leads", "Cost Per Meta Lead"],
        },
      ],
    },
    faqs: [
      {
        q: "How do solar companies get leads?",
        a: "Solar companies usually get leads from paid social ads, search ads, referrals and their own website. Madvert Labs focuses on Meta Ads with a strong offer and qualifying questions, supported by search and SEO. For example, [Cellsol Energy](/case-studies/cellsol-energy) reached 200+ qualified leads per day at ~Rs. 10 CPL with direct lead ads.",
      },
      {
        q: "Should a solar company use Meta lead forms or a landing page?",
        a: "Both can work, and the choice is tested. Lead forms are quicker to complete, while a landing page funnel can ask more and filter harder. In the [Texas solar case study](/case-studies/texas-solar), the funnel form campaign produced 136 website applications at $13.72 and the lead form campaign produced 36 Meta leads at $15.09, which are different lead types.",
      },
      {
        q: "What should a solar lead form ask?",
        a: "A solar lead form should ask what the sales team needs for a useful first call: the monthly electricity bill, whether the person owns the property and what type it is, the location and how soon they want to install. The Texas solar flow captured bill details, property info and installation interest.",
      },
      {
        q: "Does Madvert Labs work with solar companies in Pakistan and the United States?",
        a: "Yes. The published solar work includes Cellsol Energy, with figures in Pakistani rupees, and a Texas solar company in the United States. Madvert Labs is based in [Karachi](/digital-marketing-agency-karachi) and plans campaigns for each market on its own numbers.",
      },
      {
        q: "Is a cheap solar lead a good solar lead?",
        a: "Not on its own. A low cost per lead only helps if the leads own a property, sit in the service area and want to install. Madvert Labs reads cost per lead alongside lead quality and appointments, and uses [cost per qualified lead](/glossary#cost-per-qualified-lead) as the main measure.",
      },
      {
        q: "Can Madvert Labs guarantee solar installations?",
        a: "No. Madvert Labs builds and runs the system that brings in qualified enquiries and gets them to the sales team. Installations depend on pricing, the sales process and the customer. Both solar case studies report leads and their cost, not installations or revenue.",
      },
    ],
    related: [
      { key: "meta-ads", anchor: "Meta Ads lead generation", note: "Offer, creative, targeting and lead forms for Facebook and Instagram." },
      { key: "performance-marketing", anchor: "Performance marketing", note: "Paid channels planned together and judged by qualified leads." },
      { href: "/case-studies/cellsol-energy", anchor: "Cellsol Energy solar case study", note: "Direct lead ads, the offer and the full figures." },
      { href: "/case-studies/texas-solar", anchor: "Texas solar case study", note: "Funnel form and lead form campaigns from July 2025." },
    ],
    resources: ["build-that-offer", "meta-ads-pre-launch-checklist", "revenue-leakage-audit"],
    cta: {
      title: "Running Solar Ads Already?",
      accent: "Find Out Which Leads Your Team Can Close.",
      body: "We will look at the offer, the form, the follow up and the cost per qualified lead before recommending any change.",
      label: "Book a Solar Strategy Call",
    },
    serviceName: "Lead generation for solar companies",
    serviceType: "Lead generation for solar energy companies",
    audience: "Solar installers and solar energy brands",
    markets: ["Pakistan", "United States"],
  },

  /* ───────────────────────── Home services ───────────────────────── */
  {
    slug: "home-services",
    path: "/industries/home-services",
    motif: "home",
    name: "Home Services",
    short: "home services",
    metaTitle: "Home Improvement Lead Generation Agency",
    metaDescription:
      "Home improvement and home services lead generation by Madvert Labs: offer, Meta Ads, homeowner qualifying questions and follow up, with a real UAE case study.",
    eyebrow: "Industries · Home Services",
    h1: "Lead Generation for Home Improvement and Home Services Companies.",
    h1Accent: "Homeowners With Real Service Intent.",
    answer: [
      "Madvert Labs builds lead generation for home improvement and home services companies: a sharper offer for homeowners, trust-driven Meta Ads creative, precise targeting, qualifying questions about the property and the job, and a steady pipeline the business can follow up.",
      "For example, a UAE home improvement company received ~100 qualified homeowner leads at $3.10 CPL, with the Ads Manager screenshot showing 93 website submit applications on $288.47 of spend ([UAE home improvement case study](/case-studies/home-improvement-uae)). Related work includes a [Texas solar](/case-studies/texas-solar) campaign for homeowners.",
    ],
    glance: [
      { label: "Built for", value: "Renovation, maintenance, upgrade, fit-out and other services sold to homeowners." },
      { label: "Proof", value: "[~100 qualified homeowner leads](/case-studies/home-improvement-uae) in the UAE at $3.10 CPL." },
      { label: "Main channel", value: "Meta Ads for planned projects, Google search for urgent jobs, plus local SEO." },
      { label: "Measured by", value: "Cost per qualified lead and quotes or visits booked, not clicks." },
    ],
    cardSummary: "~100 qualified homeowner leads for a UAE home improvement company at $3.10 CPL.",
    hard: {
      title: "What makes lead generation hard in home services",
      paragraphs: [
        "Home improvement is competitive, and generic advertising gets expensive fast. Many companies offer similar services, so an ad that only lists services blends in with every other one in the feed.",
        "Homeowners are letting someone into their home and often paying a large amount, so trust decides who gets the call. Credibility has to be built in the ad and the form, not only after the first visit.",
        "Not every enquiry is a job. Tenants who cannot approve work, people outside the service area and people collecting quotes with no timeline all cost the team time. The [UAE home improvement case study](/case-studies/home-improvement-uae) set out to produce relevant conversations with homeowners considering renovation, maintenance and upgrade services, not just clicks.",
      ],
      journey: [
        { stage: "Trigger", text: "Something breaks, looks dated or no longer fits how the family lives." },
        { stage: "Planning", text: "Collects ideas, rough costs and a sense of what is possible." },
        { stage: "Shortlisting", text: "Compares a few companies on trust, past work and how quickly they respond." },
        { stage: "Ready for a quote", text: "Knows the scope and timing and wants a visit or a price." },
      ],
    },
    system: {
      intro: "The system below follows the UAE home improvement case study, from offer to sales pipeline.",
      steps: [
        {
          name: "A stronger offer",
          text: "A sharper, more compelling offer that speaks directly to homeowner needs, instead of a list of services every competitor also offers.",
        },
        {
          name: "Channels and trust-driven creative",
          text: "Meta Ads reach homeowners by location, interests and homeowner intent, with messaging and creative built to establish credibility quickly. [Google Ads](/services/google-ads) suits urgent jobs people search for.",
        },
        {
          name: "Qualifying questions",
          text: "The form asks about the property, the job and the timing, so the business can tell a planned project from a price check before calling.",
        },
        {
          name: "Follow up and CRM",
          text: "Enquiries flow into a pipeline the business can follow up quickly. [CRM and Automation](/services/automation-revenue-systems) adds instant replies, reminders and WhatsApp follow up.",
        },
        {
          name: "Reporting and optimisation",
          text: "Continuous testing and performance improvement to reduce cost per lead, read alongside lead quality and the visits or quotes that follow.",
        },
      ],
    },
    qualification: {
      title: "Qualifying questions for home services leads",
      intro: "Questions a home services form or first call can ask. Property type and project scope mirror the qualification used in the Dubai interior design case study.",
      questions: [
        { q: "What do you need: renovation, maintenance or an upgrade?", why: "Routes the lead to the right person and the right offer." },
        { q: "What type of property is it (apartment, villa, townhouse)?", why: "Shapes the scope, the price range and who visits." },
        { q: "Do you own the property or need the owner's approval?", why: "Avoids quotes for work nobody can approve." },
        { q: "Where is the property?", why: "Keeps enquiries inside the service area." },
        { q: "When would you like the work to start?", why: "Puts ready homeowners at the front of the queue." },
      ],
      note: "The question set is tested against lead volume and adjusted to each service.",
    },
    channels: [
      { key: "meta-ads", note: "Homeowner campaigns on Facebook and Instagram with qualifying forms.", proven: "Used in the UAE home improvement case study" },
      { key: "google-ads", note: "Search campaigns for urgent jobs and people already searching for a service near them." },
      { key: "seo", note: "Service and area pages so the business is found in Google and Bing between campaigns." },
      { key: "ai-seo-aeo", note: "Clear service pages that AI search can understand and cite for homeowner questions." },
      { key: "automation-revenue-systems", note: "Instant replies, routing and WhatsApp follow up so enquiries do not go cold." },
    ],
    proof: {
      intro: "The home improvement figures below are from one campaign, shown exactly as reported. Two related case studies are included and labelled as related.",
      items: [
        {
          slug: "home-improvement-uae",
          relation: "primary",
          note: "A UAE home improvement company needed a more predictable way to reach homeowners considering renovation, maintenance and upgrades. Madvert Labs sharpened the offer, built trust-driven creative and ran precise Meta targeting.",
          metrics: ["Qualified Leads", "Cost Per Lead", "Website Submit Applications", "Amount spent"],
        },
        {
          slug: "texas-solar",
          relation: "related",
          note: "Related: the case study lists the industry as Solar / Home Services. A Texas solar company reached homeowners with a lead-gen flow that captured bill details, property info and installation interest.",
          metrics: ["Website Applications", "Cost Per Website Application", "Meta Leads", "Cost Per Meta Lead"],
        },
        {
          slug: "dubai-interior-design",
          relation: "related",
          note: "Related: a Dubai luxury interior design company whose ads spoke to people planning to renovate. A six-step funnel qualified each inquiry by property type, scope, finish level and timeline.",
          metrics: ["Qualified Inquiries", "Cost Per Inquiry", "Total Spend"],
        },
      ],
    },
    faqs: [
      {
        q: "What is the best way to get home improvement leads?",
        a: "Home improvement leads come most reliably from a clear offer shown to the right homeowners, with qualifying questions and quick follow up. Madvert Labs uses Meta Ads for planned projects and Google search for urgent jobs. For example, a [UAE home improvement company](/case-studies/home-improvement-uae) received ~100 qualified homeowner leads at $3.10 CPL from Meta Ads.",
      },
      {
        q: "Are Meta Ads or Google Ads better for home services?",
        a: "Meta Ads suit planned work such as renovation and upgrades, because homeowners can be reached before they search. Google Ads suit urgent jobs, because people search when something breaks. Many home services businesses use both. The [Meta Ads vs Google Ads](/glossary#meta-ads-vs-google-ads) comparison explains the difference.",
      },
      {
        q: "How do you avoid low quality home services leads?",
        a: "Low quality leads are reduced by making the offer specific, asking about the property, ownership, location and timing on the form, and judging the campaign by cost per qualified lead rather than cost per lead. Follow up speed matters too, because a slow reply turns good leads cold.",
      },
      {
        q: "Does Madvert Labs work with home services companies in Pakistan, the UAE and the US?",
        a: "Yes. The published home improvement case study is from the UAE and a related solar campaign was for homeowners in Texas. Madvert Labs is based in [Karachi](/digital-marketing-agency-karachi) and also works with home services businesses in Pakistan, planning each market on its own numbers.",
      },
      {
        q: "How much does a home improvement lead cost?",
        a: "It depends on the market, the service, the offer and how strictly leads are qualified. The $3.10 CPL in the UAE case study describes one Meta campaign and is not a benchmark for other markets. Madvert Labs agrees a target cost per qualified lead with each business before scaling spend.",
      },
    ],
    related: [
      { key: "meta-ads", anchor: "Meta Ads lead generation", note: "Offer, creative, targeting and forms for homeowner campaigns." },
      { key: "google-ads", anchor: "Google Ads lead generation", note: "Search campaigns for homeowners who need a service now." },
      { key: "conversion", anchor: "Landing pages and forms", note: "Pages that turn a click into a qualified enquiry." },
      { href: "/case-studies/home-improvement-uae", anchor: "UAE home improvement case study", note: "The offer, the system and the full figures." },
    ],
    resources: ["qualified-lead-generation-playbook", "landing-pages-that-sell", "revenue-leakage-audit"],
    cta: {
      title: "Paying for Leads That Never Book?",
      accent: "Build a Pipeline of Homeowners Ready to Start.",
      body: "We will look at the offer, the targeting, the form and the follow up before recommending a campaign.",
      label: "Book a Home Services Strategy Call",
    },
    serviceName: "Lead generation for home improvement and home services companies",
    serviceType: "Lead generation for home services",
    audience: "Home improvement and home services companies",
    markets: ["United Arab Emirates", "United States"],
  },

  /* ───────────────────────── E-commerce ───────────────────────── */
  {
    slug: "ecommerce",
    path: "/industries/ecommerce",
    motif: "ecommerce",
    name: "E-commerce",
    short: "e-commerce",
    metaTitle: "E-commerce Meta Ads Agency in Pakistan",
    metaDescription:
      "Meta Ads and creative for e-commerce brands in Pakistan: angle research, creator content, product pages and testing, with a real private label case study.",
    eyebrow: "Industries · E-commerce",
    h1: "Meta Ads and Growth for E-commerce Brands.",
    h1Accent: "Creative That Sells, Pages That Close.",
    answer: [
      "Madvert Labs builds e-commerce growth systems for online brands: angle research and creative testing, creator and direct response video content from [Madvert Studios](/studios), Meta Ads, and a conversion-focused product page, measured by purchases and cost per purchase.",
      "For example, Earthly Elementals PK, a private label health brand in Pakistan, recorded 162 website purchases at Rs 844.57 per purchase on Rs136,820.57 of spend ([Earthly Elementals case study](/case-studies/earthly-elementals)). A home chef business owner, Saniya Khan of DE Wooden Spoon, said in a video testimonial that the business now gets 5 to 6 orders a day.",
    ],
    glance: [
      { label: "Built for", value: "Private label, D2C and food brands selling online or through order messages." },
      { label: "Proof", value: "[162 website purchases](/case-studies/earthly-elementals) for Earthly Elementals PK in Pakistan." },
      { label: "Main channel", value: "Meta Ads, supported by creator content, video and product page optimisation." },
      { label: "Measured by", value: "Purchases, cost per purchase and, where the store data allows, revenue." },
    ],
    cardSummary: "162 website purchases at Rs 844.57 per purchase for Earthly Elementals PK, a private label brand in Pakistan.",
    hard: {
      title: "What makes growth hard in e-commerce",
      paragraphs: [
        "An online shopper cannot touch the product, so the ad and the product page have to answer the questions a shop assistant would: is it genuine, what is in it, who else uses it, how quickly will it arrive and what happens if it is not right.",
        "Creative wears out quickly. An angle that sold well last month can stop working, so a brand needs a steady supply of new hooks, formats and messages, and a way to learn which ones actually drive purchases.",
        "Traffic is only half of the system. A strong ad sending people to a slow or unclear product page wastes the budget, which is why the [Earthly Elementals case study](/case-studies/earthly-elementals) combined creative strategy, content and landing page optimisation rather than ads alone.",
      ],
      journey: [
        { stage: "Scroll", text: "Sees the product in the feed, often for the first time." },
        { stage: "Interest", text: "Watches a creator or product video and wants to know if it works." },
        { stage: "Trust", text: "Checks the product page, ingredients, proof and delivery terms." },
        { stage: "Purchase", text: "Orders on the website or by message, ideally without friction." },
      ],
    },
    system: {
      intro: "The system below follows the Earthly Elementals case study: creative strategy, content and landing page optimisation working together.",
      steps: [
        {
          name: "Offer and angle research",
          text: "Test which angles move the product, such as health, energy, stamina and trust for Earthly Elementals, and make the offer and the product's strongest point obvious.",
        },
        {
          name: "Channels and creative",
          text: "Meta Ads carry the message, supported by creator collaborations for relatability and direct response video shoots for product visuals. Multiple hooks, formats and messages are tested.",
        },
        {
          name: "Product page and purchase path",
          text: "A conversion-focused product page with trust-building product education, the offer and the USP, so the click becomes a purchase.",
        },
        {
          name: "Follow up and retention",
          text: "Order confirmation, WhatsApp and email follow up and repeat purchase reminders can be added through [CRM and Automation](/services/automation-revenue-systems).",
        },
        {
          name: "Reporting",
          text: "Reports track purchases and cost per purchase by creative and angle, and revenue and return on ad spend where the store's data allows, so budget follows what sells.",
        },
      ],
    },
    qualification: {
      title: "What the creative and product page must answer",
      intro: "E-commerce does not qualify leads with a form. Instead, the ad and the product page answer the buyer's questions before the purchase.",
      questions: [
        { q: "Is it genuine, and why should I trust this brand?", why: "Trust signals and product education reduce hesitation." },
        { q: "What will it do for me?", why: "The angle (for example energy or stamina) has to match the buyer's reason." },
        { q: "Who else uses it?", why: "Creator and customer content makes the product relatable." },
        { q: "What does it cost, and is there an offer?", why: "A clear offer and USP give a reason to buy now." },
        { q: "How does delivery and payment work?", why: "Clear terms remove the last reason to wait." },
      ],
      note: "Product claims are the brand's own. Madvert Labs presents them as the brand states them and does not verify certifications.",
    },
    channels: [
      { key: "meta-ads", note: "Prospecting and retargeting campaigns on Facebook and Instagram.", proven: "Used in the Earthly Elementals case study" },
      { key: "studios", note: "Creator content, direct response video and product visuals for testing.", proven: "Influencer and DVC content in the Earthly Elementals case study" },
      { key: "conversion", note: "Product page and checkout improvements so paid traffic converts.", proven: "Landing page optimisation in the Earthly Elementals case study" },
      { key: "performance-marketing", note: "Meta, Google and YouTube planned together and judged by purchases." },
      { key: "seo", note: "Category and product content that brings in shoppers without paying for every click." },
    ],
    proof: {
      intro: "The e-commerce figures below are from one ads dashboard screenshot, shown exactly as reported, followed by a client's own words from a video testimonial.",
      items: [
        {
          slug: "earthly-elementals",
          relation: "primary",
          note: "Earthly Elementals PK sells Pure Himalayan Shilajit resin online in Pakistan. Madvert Labs delivered strategy, creatives and scaling: angle research, influencer collaborations, DVC shoots, creative testing and a conversion-focused product page.",
          metrics: ["Website Purchases", "Cost Per Purchase", "Amount spent"],
        },
      ],
    },
    testimonial: {
      quote: "Now, MashaAllah, we get 5 to 6 orders a day. I would definitely recommend Usama and Madvert Labs.",
      name: "Saniya Khan",
      role: "Owner",
      business: "DE Wooden Spoon",
      note: "A home chef business. From a client video testimonial.",
    },
    faqs: [
      {
        q: "How do e-commerce brands in Pakistan grow with Meta Ads?",
        a: "E-commerce brands grow with Meta Ads by testing several angles and creative formats, using creator and product video to build trust, and sending traffic to a product page that answers the buyer's questions. For example, [Earthly Elementals PK](/case-studies/earthly-elementals) recorded 162 website purchases at Rs 844.57 per purchase.",
      },
      {
        q: "What is a good cost per purchase?",
        a: "A good cost per purchase depends on the product's price, margin and repeat purchase rate, so there is no single figure. The Rs 844.57 cost per purchase in the Earthly Elementals case study describes one brand's campaign and is not a benchmark. Madvert Labs agrees a target with each brand based on its own margins.",
      },
      {
        q: "Does Madvert Labs create the ad content too?",
        a: "Yes. [Madvert Studios](/studios), the creative production arm of Madvert Labs, produces ad creatives and short form video. For Earthly Elementals, the work included influencer collaborations and direct response video shoots alongside the ads.",
      },
      {
        q: "Does the product page matter as much as the ads?",
        a: "Often, yes. Ads bring people to the page, but the page has to convince them to buy. The Earthly Elementals system paired creative strategy with landing page optimisation, including trust-building product education and clear offer and USP highlighting.",
      },
      {
        q: "Can Madvert Labs help a small food or home-based business get orders?",
        a: "Yes. Madvert Labs has worked with a home chef business, DE Wooden Spoon, whose owner said in a video testimonial that the business now gets 5 to 6 orders a day. The plan for any business starts with its offer, its audience and how orders are taken.",
      },
    ],
    related: [
      { key: "meta-ads", anchor: "Meta Ads campaigns", note: "How Facebook and Instagram campaigns are planned, built and tested." },
      { key: "studios", anchor: "Ad creative and video production", note: "Creator content, product video and statics for testing." },
      { key: "conversion", anchor: "Product and landing page optimisation", note: "Pages that turn paid traffic into purchases." },
      { href: "/case-studies/earthly-elementals", anchor: "Earthly Elementals case study", note: "The creative strategy, the product page and the full figures." },
    ],
    resources: ["steal-these-hooks", "stop-the-scroll", "landing-pages-that-sell"],
    cta: {
      title: "Selling Online?",
      accent: "Find the Angles That Actually Sell.",
      body: "We will look at the product, the creative, the product page and the numbers before recommending a plan.",
      label: "Book an E-commerce Strategy Call",
    },
    serviceName: "Meta Ads and growth for e-commerce brands",
    serviceType: "E-commerce performance marketing and creative",
    audience: "E-commerce, private label and D2C brands",
    markets: ["Pakistan"],
  },
];

/** Industries with published proof but no dedicated page (yet). Shown on /industries. */
export const otherProvenIndustries: { name: string; summary: string; source: string; href?: string }[] = [
  {
    name: "Fitness and wellness",
    summary: "8-9% CTR and 145 Meta leads at PKR 29.41 for TAP Center using strong offers and clean lead ads.",
    source: "TAP Center case study",
    href: "/case-studies/tap-center-fitness",
  },
  {
    name: "Professional services: bookkeeping",
    summary: "35 qualified bookkeeping inquiries from international traffic at $57.51 each, on $2,012.70 ad spend.",
    source: "Bookkeeping appointments case study",
    href: "/case-studies/bookkeeping-appointments",
  },
  {
    name: "Marketing agencies",
    summary: "99 qualified website applications for an agency across four English-speaking markets at $4.10 each.",
    source: "Agency lead generation case study",
    href: "/case-studies/agency-lead-generation",
  },
  {
    name: "Luxury interior design",
    summary: "111 qualified interior design inquiries for Casa Elegance Interiors in Dubai at AED 93.02 per inquiry.",
    source: "Dubai interior design case study",
    href: "/case-studies/dubai-interior-design",
  },
  {
    name: "Events",
    summary: "“From my side, it's 10 out of 10 for these people.” Muhammad Azeem Qadir, CEO & Founder, The Event Planet.",
    source: "Client video testimonial",
  },
];

export const industriesFaqs: { q: string; a: string }[] = [
  {
    q: "Which industries does Madvert Labs work with?",
    a: "Published Madvert Labs case studies and client testimonials cover real estate, solar energy, home improvement, e-commerce, fitness, bookkeeping, marketing agencies, luxury interior design, events and a home chef business. The approach is not limited to these industries, because every engagement starts with a diagnosis of the business.",
  },
  {
    q: "Does Madvert Labs need experience in my exact industry?",
    a: "Not always. The parts of a lead generation system (offer, channels, qualifying questions, follow up and reporting) carry across industries, while the questions and the buying journey change. Where there is no case study in your industry, Madvert Labs says so and plans the campaign on your own numbers.",
  },
  {
    q: "Are the results on these pages typical?",
    a: "No figure on these pages is presented as typical or as a benchmark. Each one comes from a specific campaign for a specific client and is shown exactly as reported in the linked [case study](/case-studies), together with what the case study does not show. Past results do not guarantee future results.",
  },
];

export function getIndustryPage(slug: string) {
  return industryPages.find((p) => p.slug === slug);
}
