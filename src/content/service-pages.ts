/**
 * Copy for the specialist service pages rendered by src/components/service-page/ServicePage.tsx.
 *
 * Rules for this file (from the client brief):
 * - Service names, URLs and the opening definition always come from src/lib/entities.ts.
 * - No invented results, statistics, prices, client counts or guarantees. Proof only references
 *   real case studies in src/cms/fallback.ts by slug; figures are rendered from there verbatim.
 * - FAQs are genuine buyer questions with honest answers, and they are rendered visibly.
 * - Inline links are written as [anchor text](/path) and rendered by <Rich>.
 */
import type { RelatedLink } from "@/components/service-page/RelatedLinks";
import type { ServiceKey } from "@/lib/entities";

export type ServicePageContent = {
  key: ServiceKey;
  /** Unique <title> (the site template appends the brand). */
  metaTitle: string;
  /** Unique meta description, 140–160 characters. */
  metaDescription: string;
  /** Lowercase phrase used inside headings, e.g. "Meta Ads lead generation". */
  short: string;
  /** Title-case phrase used at the start of headings. */
  shortTitle: string;
  eyebrow: string;
  h1: string;
  h1Accent?: string;
  /** Sentences that complete the direct answer after the entity definition. */
  answer: string[];
  glance: { label: string; value: string }[];
  whoFor: { title: string; items: string[]; notFor?: string[] };
  problem: { title: string; paragraphs: string[] };
  process: { title: string; intro?: string; steps: { name: string; text: string }[] };
  comparison?: {
    title: string;
    intro?: string;
    caption: string;
    rowHeader: string;
    columns: string[];
    rows: { label: string; cells: string[] }[];
    highlight?: number;
    note?: string;
  };
  included: string[];
  excluded: string[];
  examples: { title: string; intro?: string; items: { name: string; text: string }[] };
  proof?: { title: string; intro: string; slugs: string[] };
  /** A line that genuinely appears in the site's founder copy. Never invent one. */
  quote?: string;
  faqs: { q: string; a: string }[];
  related: RelatedLink[];
  /** Lead magnet slugs from src/content/lead-magnets.ts. The first is offered in the hero. */
  resources: string[];
  cta: { title: string; accent?: string; body?: string; label: string };
  /** schema.org BusinessAudience label. */
  audience: string;
};

export const servicePages: Record<string, ServicePageContent> = {
  /* ───────────────────────── Full Stack Digital Marketing ───────────────────────── */
  "digital-marketing": {
    key: "digital-marketing",
    metaTitle: "Full Stack Digital Marketing: An Outsourced Marketing Team",
    metaDescription:
      "Full Stack Digital Marketing from Madvert Labs: one outsourced marketing department for strategy, paid media, creative, website conversion, CRM, automation and analytics.",
    short: "Full Stack Digital Marketing",
    shortTitle: "Full Stack Digital Marketing",
    eyebrow: "Full Stack Digital Marketing",
    h1: "Full Stack Digital Marketing.",
    h1Accent: "One Marketing Department, Not Six Vendors.",
    answer: [
      "The service is built for businesses that need marketing to behave like one department with one direction, rather than a group of agencies and freelancers each reporting their own numbers. It is the service behind the idea to [hire your marketing department](/#hire) on the Madvert Labs homepage.",
      "Madvert Labs diagnoses what growth requires first, then staffs the work across the [growth system](/growth-systems) instead of selling a fixed package.",
    ],
    glance: [
      { label: "Best for", value: "Established businesses without an in-house marketing team, or with a small team that needs specialist support." },
      { label: "Covers", value: "Strategy, paid media, SEO, creative, websites and landing pages, CRM, automation and analytics." },
      { label: "Measured by", value: "Qualified opportunities, booked calls, response speed and revenue by source." },
      { label: "Engagement", value: "Ongoing and scoped after a strategy call. No fixed packages." },
    ],
    whoFor: {
      title: "Who an outsourced marketing department is for",
      items: [
        "Founders who are currently the marketing department and need that time back.",
        "Businesses paying several agencies and freelancers whose work does not connect.",
        "Companies with a sales team or booking process that needs a steady flow of qualified opportunities.",
        "Businesses entering a new market or launching a new offer that needs brand, demand and follow up at the same time.",
      ],
      notFor: [
        "Businesses that need one deliverable, such as a logo or a single video. A specialist service such as [Madvert Studios](/studios) is a better fit.",
        "Teams that want the cheapest possible lead and are not interested in what happens after the form.",
      ],
    },
    problem: {
      title: "Most marketing problems are connection problems",
      paragraphs: [
        "A growing business may need paid media, SEO, content, creative, funnels, CRM, automation, analytics and technology. Finding each service is rarely the hard part. Getting all of them to work together is.",
        "When the ads agency, the web designer, the content freelancer and the CRM consultant work in isolation, nobody owns the full journey. Leads arrive at a page that was not written for the ad, follow up depends on whoever is online, and each vendor's report measures something different.",
        "Full Stack Digital Marketing replaces that fragmentation with one team, one plan and one set of measures that run from the first impression to revenue.",
      ],
    },
    process: {
      title: "How the outsourced marketing department works",
      intro: "The order matters: diagnosis comes before prescription, so the plan is shaped by the business rather than by a service list.",
      steps: [
        { name: "Diagnose", text: "Madvert Labs reviews the business, the offer, the current channels, the website, the follow up and the data before recommending anything." },
        { name: "Plan", text: "A growth plan sets priorities, channels, budget allocation, the offer and the measures that matter, agreed with the business before work starts." },
        { name: "Build what is missing", text: "The team builds what the plan needs first: campaigns, creative, landing pages, tracking, CRM pipelines or automated follow up, in the order that unlocks growth fastest." },
        { name: "Run as one programme", text: "Campaigns, content and follow up run together with a single point of contact, so a change in one channel is reflected everywhere else." },
        { name: "Measure through to revenue", text: "Reporting follows enquiries through to booked calls and, where the data allows, revenue, so decisions are based on outcomes rather than activity." },
        { name: "Improve", text: "The plan is reviewed regularly and budget, creative and journeys are adjusted on what the numbers show." },
      ],
    },
    comparison: {
      title: "In-house hire, separate vendors or one outsourced department",
      intro: "Each option can work. The right choice depends on how many connected pieces the business needs and who has time to manage them.",
      caption: "Ways to resource marketing compared",
      rowHeader: "Consideration",
      columns: ["Hiring in-house", "Separate agencies and freelancers", "Full Stack Digital Marketing"],
      highlight: 2,
      rows: [
        { label: "Skills covered", cells: ["Limited to the people hired", "Broad, but split across contracts", "Strategy, paid media, creative, web, CRM and automation in one team"] },
        { label: "Who owns the full journey", cells: ["The marketing lead, if there is one", "Often nobody", "One team, from attention to revenue"] },
        { label: "Reporting", cells: ["Built internally", "Each vendor reports its own metrics", "One set of measures agreed upfront"] },
        { label: "Management load", cells: ["Recruiting, training and managing staff", "Coordinating every vendor", "One point of contact"] },
        { label: "Best when", cells: ["Marketing volume justifies a full team", "One well-defined task is needed", "Several connected pieces need to work together"] },
      ],
    },
    included: [
      "Marketing strategy and growth planning",
      "Offer and positioning work",
      "[Meta Ads](/services/meta-ads) and [Google Ads](/services/google-ads) campaign management",
      "[SEO](/services/seo) and [AI search visibility](/services/ai-seo-aeo)",
      "Ad creative, short form video and campaign content through Madvert Studios",
      "Website and landing page improvements focused on conversion",
      "CRM setup, pipelines and automated WhatsApp and email follow up",
      "Tracking, analytics and cross-channel reporting",
    ],
    excluded: [
      "Fixed monthly packages with a set number of posts or ads. Scope follows the diagnosis.",
      "Guaranteed rankings, lead volumes or returns. No honest marketer can promise those.",
      "Running the sales conversation itself. The system delivers and qualifies opportunities; the business's own team closes them.",
      "Activity that does not serve an agreed, measurable growth goal.",
    ],
    examples: {
      title: "What the work can look like",
      intro: "These are examples of deliverables, not results. What is built depends on the diagnosis.",
      items: [
        { name: "A launch for a new offer", text: "Offer positioning, campaign structure on Meta and Google, a dedicated landing page, a qualification form and an automated first reply, delivered as one launch." },
        { name: "One connected report", text: "A single view of spend, enquiries, qualified opportunities and booked calls by source, instead of separate dashboards from separate vendors." },
        { name: "Follow up for every new enquiry", text: "WhatsApp and email messages triggered when a lead arrives, with a reminder to the sales team when a reply has not been sent." },
        { name: "A monthly creative pipeline", text: "Static and video ad concepts planned from campaign data, produced by [Madvert Studios](/studios) and tested in market." },
      ],
    },
    proof: {
      title: "Engagements that connected several disciplines",
      intro: "Each of these real case studies combined more than one part of the system in a single engagement, such as offer strategy, creative, paid social, landing pages, qualification and CRM delivery.",
      slugs: ["dubai-real-estate-nigeria", "bookkeeping-appointments", "agency-lead-generation"],
    },
    faqs: [
      {
        q: "What is the difference between Full Stack Digital Marketing and a marketing agency?",
        a: "Many agencies specialise in one channel, such as ads or social media. Full Stack Digital Marketing at Madvert Labs covers strategy, paid acquisition, creative, website conversion, CRM, automation and analytics as one team, so the work is planned and measured together rather than vendor by vendor.",
      },
      {
        q: "Can an outsourced marketing department replace an in-house team?",
        a: "It can. Some businesses use Madvert Labs as their whole marketing department. Others keep an in-house marketer and use Madvert Labs for the specialist skills and systems one person cannot cover alone.",
      },
      {
        q: "Do you sell fixed packages?",
        a: "No. Madvert Labs diagnoses the business problem first, then scopes what growth actually requires. Some businesses need acquisition first; others need conversion or follow up fixed before more traffic makes sense.",
      },
      {
        q: "How much does Full Stack Digital Marketing cost?",
        a: "The cost depends on scope: which channels are needed, how much creative and build work is involved, and the advertising budget, which is separate from the cost of the work. Madvert Labs does not publish fixed prices; scope and cost are agreed after the strategy call.",
      },
      {
        q: "How is success measured?",
        a: "By qualified opportunities, booked calls, response speed and, where the data allows, revenue by source. Impressions and raw lead counts are reported but not treated as the goal.",
      },
      {
        q: "How do we start?",
        a: "Book a business strategy call. Madvert Labs reviews the business before the conversation, so the call is about the actual problem rather than a generic pitch.",
      },
    ],
    related: [
      { href: "/#hire", anchor: "Hire Your Marketing Department", note: "The homepage overview of how one integrated external team fits together." },
      { key: "client-acquisition", anchor: "Qualified client acquisition", note: "Paid social, paid search, SEO and AI search, judged by opportunity quality." },
      { key: "conversion", anchor: "Websites and journeys that convert", note: "Landing pages, offers and booking journeys that make paid traffic pay." },
      { key: "automation-revenue-systems", anchor: "CRM and automated follow up", note: "Pipelines, WhatsApp and email follow up so no enquiry goes cold." },
      { key: "studios", anchor: "Ad creative and video", note: "Creative production built to earn attention in the first seconds." },
      { key: "branding-marketing", anchor: "Brand strategy and identity", note: "When the business looks smaller online than it really is." },
      { href: "/glossary#external-growth-department", anchor: "What an external growth department is", note: "How one connected outside team differs from an agency or an in-house hire." },
    ],
    resources: ["growth-systems-audit", "qualified-lead-generation-playbook", "revenue-leakage-audit"],
    cta: {
      title: "Hire Your Marketing Department.",
      accent: "Start With the Diagnosis.",
      body: "Tell us where growth is getting stuck. The first conversation is about the business, not a package.",
      label: "Book a Business Strategy Call",
    },
    audience: "Established businesses that want one outsourced marketing team",
  },

  /* ───────────────────────── Meta Ads Lead Generation ───────────────────────── */
  "meta-ads": {
    key: "meta-ads",
    metaTitle: "Meta Ads Lead Generation for Facebook and Instagram",
    metaDescription:
      "Meta Ads Lead Generation from Madvert Labs: offer, creative, targeting, lead forms, tracking and qualification for Facebook and Instagram campaigns that create sales conversations.",
    short: "Meta Ads lead generation",
    shortTitle: "Meta Ads lead generation",
    eyebrow: "Meta Ads Lead Generation",
    h1: "Meta Ads Lead Generation.",
    h1Accent: "Built for Sales Conversations, Not Form Fills.",
    answer: [
      "Madvert Labs treats the offer, the creative and the questions on the form as part of targeting, because Facebook and Instagram reward ads people actually respond to. The service sits inside the wider [Client Acquisition](/services/client-acquisition) pillar, and every published Madvert Labs case study listed below was built on Meta.",
    ],
    glance: [
      { label: "Platforms", value: "Facebook, Instagram and other Meta placements." },
      { label: "Lead capture", value: "Instant forms, landing pages or application funnels, chosen per offer." },
      { label: "Measured by", value: "Cost per qualified lead, lead quality and booked calls, not cost per lead alone." },
    ],
    whoFor: {
      title: "Who Meta Ads lead generation is for",
      items: [
        "Home services, solar, real estate, fitness, professional services and other businesses whose buyers can be reached by location, interest or life stage.",
        "Businesses whose last Meta campaign produced cheap leads that never answered the phone.",
        "Teams with a sales process ready to call, message or book new enquiries quickly.",
        "Businesses selling across borders that need to reach a specific audience in another country.",
      ],
      notFor: [
        "Services people only look for in an emergency, such as urgent repairs. [Google Ads lead generation](/services/google-ads) usually captures that intent better.",
        "Offers that cannot yet be explained clearly in a few seconds. The offer needs work first.",
      ],
    },
    problem: {
      title: "Why a low cost per lead is not the goal",
      paragraphs: [
        "Meta can produce leads at a very low cost. The trouble starts when those leads do not answer, did not understand the offer or never had the budget. The sales team spends its week chasing people who were never going to buy, while the campaign still looks good on the dashboard.",
        "Most failed campaigns were decided before launch: an offer nobody wanted, tracking that never fired, creative that blended into the feed and no follow up after the lead arrived.",
        "Meta Ads Lead Generation at Madvert Labs addresses those causes directly, so cost per lead is always read alongside lead quality and what happens next.",
      ],
    },
    process: {
      title: "How a Meta lead generation campaign is built",
      steps: [
        { name: "Offer and audience", text: "Define who the campaign is for, what they are offered and why it is worth responding to now. Offer work comes first because a strong offer lowers acquisition friction." },
        { name: "Creative and messaging", text: "Produce static and video ads with hooks, angles and proof that speak to the buyer's real motivation, with several variants ready to test." },
        { name: "Lead capture and qualification", text: "Choose between instant forms, a landing page or an application flow, and add qualifying questions such as budget, location, timeline or requirement so the form filters before anyone calls." },
        { name: "Tracking", text: "Set up and verify the Meta Pixel, the Conversions API and conversion events before budget goes live, so optimisation is based on real outcomes." },
        { name: "Launch, test and optimise", text: "Launch with a clear test plan, then shift budget towards the audiences, creatives and offers that produce qualified conversations." },
        { name: "Hand-off and follow up", text: "Deliver leads into the CRM or the sales team's channel with their answers attached, and set up fast first responses through [CRM and automation](/services/automation-revenue-systems)." },
      ],
    },
    included: [
      "Campaign strategy and account structure on Facebook and Instagram",
      "Offer positioning and messaging angles",
      "Ad copy, static creative and short form video direction",
      "Audience and targeting strategy, including retargeting",
      "Instant form, landing page or application flow setup",
      "Qualifying questions and lead routing",
      "Meta Pixel, Conversions API and event verification",
      "Ongoing testing, optimisation and reporting on lead quality",
    ],
    excluded: [
      "The advertising budget itself, which is agreed separately from the scope of work.",
      "A guaranteed cost per lead or lead volume. Results depend on the market, the offer and the budget.",
      "Buying lead lists or contact data.",
      "Organic posting on the business's profiles, which sits under [Social Media Management](/services/social-media-management).",
    ],
    examples: {
      title: "Examples of Meta campaign builds",
      items: [
        { name: "A homeowner offer campaign", text: "A renovation or solar offer written for homeowners, with location targeting, benefit-led creatives and a form that captures property details and interest before the call." },
        { name: "An application funnel for high-value services", text: "Ad, landing page and multi-step application asking about budget and timeline, so only serious prospects reach the calendar." },
        { name: "A cross-border investor campaign", text: "Creative and messaging for an audience in one country buying in another, with every lead screened against budget, authority, need and timeline (BANT)." },
        { name: "A no-funnel lead ads campaign", text: "Clean instant forms with a strong, programme-specific offer, used when friction is the main barrier and the sales team can respond fast." },
      ],
    },
    proof: {
      title: "Real Meta Ads results",
      intro: "Every figure below is taken from the case study it belongs to, including the currency it was reported in. Open a study to see the Ads Manager evidence and what was built.",
      slugs: [
        "home-improvement-uae",
        "agency-lead-generation",
        "dubai-real-estate-nigeria",
        "texas-solar",
        "cellsol-energy",
        "tap-center-fitness",
        "bookkeeping-appointments",
      ],
    },
    faqs: [
      {
        q: "How much should we spend on Meta ads to start?",
        a: "There is no single right figure. The budget needs to be large enough to test more than one audience and creative and to give Meta's delivery system enough data, and it depends on the market and the value of a customer. The case studies on this page ran at very different spend levels. Madvert Labs recommends a starting budget after reviewing the offer and the market.",
      },
      {
        q: "Instant forms or a landing page: which works better?",
        a: "Neither is always better. Instant forms reduce friction and usually produce more leads; landing pages and application flows ask more of the visitor and usually filter harder. The choice depends on the offer, the price point and how quickly the sales team can respond, and the case studies here include both approaches.",
      },
      {
        q: "Why are our Meta leads low quality?",
        a: "Common causes are an offer that attracts curiosity rather than intent, a form with no qualifying questions, broad messaging that does not say who the offer is for, and slow follow up. Each can be fixed, and the fix is rarely just a new audience.",
      },
      {
        q: "Do you guarantee a cost per lead?",
        a: "No. Cost per lead depends on the market, the offer, the creative and the budget. Madvert Labs reports cost per lead next to lead quality and booked calls, and the published case studies are examples of what has been achieved, not a promised number.",
      },
      {
        q: "Should we run Meta Ads and Google Ads together?",
        a: "Often, yes. Meta creates demand among people who were not searching yet; [Google Ads](/services/google-ads) captures people who already are. Planning both together stops the two channels competing for the same budget without a shared view of results.",
      },
    ],
    related: [
      { key: "client-acquisition", anchor: "The wider client acquisition system", note: "How paid social fits alongside search, SEO and AI search visibility." },
      { key: "google-ads", anchor: "Capture people already searching", note: "Search campaigns for buyers who know what they need." },
      { key: "studios", anchor: "Scroll-stopping ad creative", note: "Static, motion and video ads produced for performance." },
      { key: "conversion", anchor: "Landing pages for paid traffic", note: "Pages and forms that turn the click into a qualified enquiry." },
      { key: "automation-revenue-systems", anchor: "Follow up that starts in minutes", note: "CRM delivery, WhatsApp replies and booking after the lead arrives." },
      { href: "/glossary#qualified-lead", anchor: "What counts as a qualified lead", note: "The definition Meta campaigns are judged against." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Work out your cost per qualified lead", note: "A free calculator for CPL, CPQL and qualification rate." },
    ],
    resources: ["meta-ads-pre-launch-checklist", "steal-these-hooks", "build-that-offer"],
    cta: {
      title: "Planning to Launch Meta Ads?",
      accent: "Check the Whole System First.",
      body: "Offer, tracking, creative and follow up: we will look at everything that decides the campaign before the budget goes live.",
      label: "Book a Meta Ads Strategy Call",
    },
    audience: "Businesses generating leads through Facebook and Instagram",
  },

  /* ───────────────────────── Google Ads Lead Generation ───────────────────────── */
  "google-ads": {
    key: "google-ads",
    metaTitle: "Google Ads Lead Generation and Paid Search Management",
    metaDescription:
      "Google Ads Lead Generation from Madvert Labs: search campaigns, keyword intent, landing pages and conversion tracking that turn people already searching into qualified enquiries.",
    short: "Google Ads lead generation",
    shortTitle: "Google Ads lead generation",
    eyebrow: "Google Ads Lead Generation",
    h1: "Google Ads Lead Generation.",
    h1Accent: "Be There When They Are Already Looking.",
    answer: [
      "Google Ads works best for services people actively search for, because the search itself shows intent. Madvert Labs runs it as part of [qualified client acquisition](/services/client-acquisition), connecting keywords, ad copy, landing pages and conversion tracking so budget follows the enquiries that become sales conversations.",
    ],
    glance: [
      { label: "Campaigns", value: "Search campaigns first; other campaign types where the data supports them." },
      { label: "Lead capture", value: "Dedicated landing pages, calls and forms." },
      { label: "Measured by", value: "Cost per qualified enquiry, conversion rate by keyword and booked calls." },
    ],
    whoFor: {
      title: "Who Google Ads lead generation is for",
      items: [
        "Service businesses whose customers search for the service by name, such as clinics, contractors, consultants, installers and B2B providers.",
        "Local businesses that want to appear when nearby customers search.",
        "Businesses already running Google Ads that pay for clicks on searches that were never going to buy.",
        "Companies that want demand they can switch on while [SEO](/services/seo) builds longer-term visibility.",
      ],
      notFor: [
        "Brand-new categories nobody searches for yet. Demand creation through [Meta Ads](/services/meta-ads) or content usually has to come first.",
        "Businesses without a page that can convert the click. That needs fixing first, otherwise the budget pays for bounces.",
      ],
    },
    problem: {
      title: "Search intent is valuable, and easy to waste",
      paragraphs: [
        "A person typing a service into Google has already said what they want. That intent is valuable, which is why competitive keywords are expensive.",
        "Budget is usually wasted in three places: broad keywords that match irrelevant searches, traffic sent to a general home page that never shows the next step, and conversion tracking that counts page views or duplicate submissions as leads. When tracking is wrong, automated bidding optimises towards the wrong outcome.",
        "Google Ads Lead Generation at Madvert Labs fixes the chain from search term to enquiry, and judges campaigns on qualified enquiries rather than clicks.",
      ],
    },
    process: {
      title: "How a Google Ads lead generation account is run",
      steps: [
        { name: "Search demand research", text: "Map the searches buyers use when they are ready to act, the searches to exclude and the competitors bidding for the same customers." },
        { name: "Account structure", text: "Group keywords by service and intent so each ad and landing page matches what the person searched for." },
        { name: "Ads and landing pages", text: "Write ads that answer the search, and send traffic to a page built for that service and that promise, with one clear next step." },
        { name: "Conversion tracking", text: "Set up and test conversion actions for forms, calls and bookings, and where possible import qualified outcomes from the CRM so bidding learns from lead quality." },
        { name: "Optimise", text: "Review search terms, add negative keywords, adjust bids and budgets, and test ads and pages against qualified enquiries." },
        { name: "Report", text: "Report spend, enquiries, cost per qualified enquiry and booked calls by campaign, with clear notes on what changed and why." },
      ],
    },
    included: [
      "Keyword and search intent research",
      "Search campaign builds and account restructuring",
      "Ad copy and ad assets such as sitelinks and callouts",
      "Negative keyword management and search term reviews",
      "Landing page recommendations, or builds through [Web Development](/services/web-development)",
      "Conversion tracking for forms, calls and bookings",
      "Offline conversion import from the CRM where the setup allows",
      "Ongoing optimisation and reporting",
    ],
    excluded: [
      "The advertising budget, which is agreed separately from the scope of work.",
      "Guaranteed ad positions, click volumes or cost per lead. Auction prices are set by the market.",
      "Organic rankings. Paid search does not improve organic positions; that is the job of [SEO](/services/seo).",
      "Buying volume on searches the business cannot serve profitably.",
    ],
    examples: {
      title: "Examples of Google Ads work",
      items: [
        { name: "Service-specific landing pages", text: "One page per core service or location group, each matching the keywords and the ad promise that lead to it." },
        { name: "A search term audit", text: "A review of the searches an existing account is paying for, with irrelevant ones excluded and profitable ones given their own campaigns." },
        { name: "Call and form tracking", text: "Conversion actions that separate genuine enquiries from duplicate submissions and very short calls, so reporting shows real leads." },
        { name: "A CRM feedback loop", text: "Qualified and closed outcomes sent back from the CRM to Google Ads, so bidding learns which clicks become customers." },
      ],
    },
    faqs: [
      {
        q: "Is Google Ads better than Meta Ads for lead generation?",
        a: "Each channel does a different job. Google Ads captures people already searching for the service; [Meta Ads](/services/meta-ads) reaches people before they search. Businesses with clear search demand often start with Google, businesses that need to create demand often start with Meta, and many need both.",
      },
      {
        q: "How long does Google Ads take to work?",
        a: "Campaigns can receive clicks soon after launch, but it takes time to collect enough search term and conversion data to optimise properly. Madvert Labs watches early data closely and makes larger structural decisions once there is enough of it.",
      },
      {
        q: "Can you guarantee the top ad position?",
        a: "No. Ad positions are decided in an auction on every search, based on bids, ad quality and relevance. Better relevance and landing pages help the budget compete more efficiently, but no one can guarantee a position.",
      },
      {
        q: "Can you take over our existing Google Ads account?",
        a: "Yes. Work on an existing account starts with a review of search terms, conversion tracking and structure, because historical data is useful once the tracking can be trusted.",
      },
      {
        q: "Do we need a new website to run Google Ads?",
        a: "Not always. Many accounts improve with a few dedicated landing pages rather than a full rebuild. If the existing site is slow or unclear, [Web Development](/services/web-development) can build pages designed to convert paid traffic.",
      },
    ],
    related: [
      { key: "client-acquisition", anchor: "Client acquisition across paid and organic", note: "Where paid search sits in the full acquisition plan." },
      { key: "seo", anchor: "Organic search visibility", note: "Build rankings the business owns alongside paid search." },
      { key: "meta-ads", anchor: "Demand creation on Facebook and Instagram", note: "Reach buyers before they start searching." },
      { key: "conversion", anchor: "Conversion work on landing pages", note: "Make every paid click more likely to become an enquiry." },
      { key: "automation-revenue-systems", anchor: "Fast replies to new enquiries", note: "Route search leads into the CRM and follow up automatically." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Compare cost per qualified lead", note: "Check what each qualified search enquiry really costs." },
      { href: "/glossary#meta-ads-vs-google-ads", anchor: "Meta Ads or Google Ads?", note: "A side by side comparison of demand creation and demand capture." },
    ],
    resources: ["landing-pages-that-sell", "conversion-leak-checklist", "qualified-lead-generation-playbook"],
    cta: {
      title: "Stop Paying for Searches",
      accent: "That Were Never Going to Buy.",
      body: "We will look at what the account pays for, what it tracks and where qualified enquiries are being lost.",
      label: "Book a Google Ads Review",
    },
    audience: "Service businesses whose customers search on Google",
  },

  /* ───────────────────────── SEO ───────────────────────── */
  seo: {
    key: "seo",
    metaTitle: "SEO Services: Technical, Content and Local Search Optimisation",
    metaDescription:
      "SEO from Madvert Labs: technical health, useful service and location content, internal linking and authority building that help a business get found in Google and Bing.",
    short: "SEO",
    shortTitle: "SEO",
    eyebrow: "Search Engine Optimisation",
    h1: "Search Engine Optimisation (SEO).",
    h1Accent: "Organic Demand the Business Owns.",
    answer: [
      "The work follows Google's and Bing's own guidance: pages that are easy to crawl, content written for people and signals that show the business is real and trustworthy. Paid campaigns stop when the budget stops, while organic visibility keeps working, which is why SEO sits alongside paid media inside [Client Acquisition](/services/client-acquisition).",
    ],
    glance: [
      { label: "Covers", value: "Technical SEO, content, local SEO, internal linking and authority." },
      { label: "Search engines", value: "Google and Bing, including Google Maps and local results." },
      { label: "Measured by", value: "Qualified organic enquiries, visibility for buying searches and index coverage." },
    ],
    whoFor: {
      title: "Who SEO is for",
      items: [
        "Businesses that rely on paid ads because organic search barely brings enquiries.",
        "Local and service businesses competing in Google Maps and local results.",
        "Companies whose website looks fine but is not indexed properly, loads slowly or has thin service pages.",
        "Businesses willing to invest for months, not weeks, in an asset they own.",
      ],
      notFor: [
        "Businesses that need enquiries this week. [Google Ads](/services/google-ads) delivers speed; SEO builds over time.",
        "Anyone looking for shortcuts such as bought links or mass-produced pages. Those tactics breach search engine spam policies and put the site at risk.",
      ],
    },
    problem: {
      title: "Why good businesses stay invisible in search",
      paragraphs: [
        "Many established businesses are better than the competitors that outrank them. The website is often the reason: service pages that say little, one page trying to rank for everything, technical issues that stop pages being indexed, and no clear signals about who the business is, where it works and why it is credible.",
        "Search has also split. Buyers move between Google results, Maps and local packs, AI-generated answers, and the publications and reviews those answers read.",
        "SEO at Madvert Labs starts with the fundamentals every one of those surfaces depends on, then builds content and authority on top.",
      ],
    },
    process: {
      title: "How SEO work is carried out",
      steps: [
        { name: "Technical audit", text: "Check crawling, indexing, speed, mobile experience, redirects, canonical tags, structured data and sitemaps, and fix what stops search engines understanding the site." },
        { name: "Search demand and page mapping", text: "Map the searches buyers use at each stage to specific pages, so every core service and location has one clear page rather than several competing ones." },
        { name: "Content", text: "Write or improve service, location and guide pages that answer real questions in plain language, supported by evidence such as case studies." },
        { name: "Internal linking", text: "Connect related pages with descriptive links, so people and search engines can follow the structure from the main services to the specialist ones." },
        { name: "Local SEO", text: "Optimise the Google Business Profile and keep business details consistent for local searches and Maps, where the business serves local customers." },
        { name: "Authority and measurement", text: "Earn mentions and links through useful content and [digital PR](/services/branding-marketing), and track organic enquiries, not only rankings, in Google Search Console, Bing Webmaster Tools and analytics." },
      ],
    },
    included: [
      "Technical SEO audit and fixes",
      "Keyword and search intent research",
      "Service and location page strategy",
      "Content writing and on-page optimisation",
      "Internal linking and site structure",
      "Structured data that matches visible page content",
      "Local SEO and Google Business Profile optimisation",
      "Google Search Console and Bing Webmaster Tools setup and reporting",
    ],
    excluded: [
      "Guaranteed rankings or a promised number one position. Search engines do not sell organic positions.",
      "Buying links, private blog networks or other tactics that breach Google's spam policies.",
      "Near-identical pages created only to rank, such as one template copied for every town.",
      "Fake reviews or structured data that describes content the page does not show.",
    ],
    examples: {
      title: "Examples of SEO deliverables",
      items: [
        { name: "A service page rebuild", text: "A thin service page turned into a complete answer: what the service is, who it is for, how it works, proof and answers to common questions." },
        { name: "An indexing clean-up", text: "Duplicate, outdated and parameter URLs consolidated with redirects and canonical tags, so search engines focus on the pages that matter." },
        { name: "A location page plan", text: "Location pages only where the business genuinely serves the area and has something specific to say about it." },
        { name: "An internal link map", text: "A map from each pillar service to its specialist pages and supporting guides, used to update navigation and in-content links." },
      ],
    },
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "SEO is a long-term channel. Technical fixes can be picked up as soon as search engines recrawl the pages, while new content and authority usually take months to build. The timeline depends on competition, the site's history and how much work is needed, so Madvert Labs does not promise a date for a ranking.",
      },
      {
        q: "Can you guarantee first page rankings?",
        a: "No. Google and Bing decide rankings, and Google's own guidance warns against anyone who guarantees them. Madvert Labs commits to the work and to honest reporting on visibility and enquiries.",
      },
      {
        q: "What is the difference between SEO and AI SEO?",
        a: "SEO improves how a business appears in traditional search results and Maps. [AI SEO and answer engine optimisation](/services/ai-seo-aeo) builds on the same foundations to make the business easier for AI search experiences to understand and cite. Without solid SEO, AI visibility work has little to stand on.",
      },
      {
        q: "Do we need SEO if we already run ads?",
        a: "Ads stop when the budget stops. SEO builds visibility the business owns and reduces dependence on a single paid channel over time. Most businesses benefit from both, weighted by how urgently they need demand.",
      },
      {
        q: "Who writes the content?",
        a: "Either side can. Madvert Labs can write the content, or edit and structure drafts from the team. The strongest pages usually combine Madvert Labs' structure with the business's own expertise and examples.",
      },
    ],
    related: [
      { key: "client-acquisition", anchor: "Paid and organic client acquisition", note: "How SEO works alongside paid media in one acquisition plan." },
      { key: "ai-seo-aeo", anchor: "Visibility in AI search answers", note: "Extend SEO foundations to Google AI Overviews, ChatGPT Search and Copilot." },
      { key: "google-ads", anchor: "Paid search while rankings build", note: "Capture search demand immediately with Google Ads." },
      { key: "web-development", anchor: "Fast, crawlable websites", note: "Technical foundations built in from the first line of code." },
      { key: "branding-marketing", anchor: "Digital PR and authority building", note: "Coverage and mentions that support trust in search." },
      { href: "/glossary#seo-vs-paid-ads", anchor: "SEO compared with paid ads", note: "When owned search visibility pays off and when paid search is faster." },
    ],
    resources: ["seo-ai-search-playbook", "landing-pages-that-sell"],
    cta: {
      title: "Build Search Visibility",
      accent: "the Business Owns.",
      body: "We will look at how the site is crawled, what it ranks for and where the quickest organic wins are.",
      label: "Book an SEO Strategy Call",
    },
    audience: "Businesses that want organic visibility in Google and Bing",
  },

  /* ───────────────────────── AI SEO and AEO ───────────────────────── */
  "ai-seo-aeo": {
    key: "ai-seo-aeo",
    metaTitle: "AI SEO and Answer Engine Optimisation (AEO) Services",
    metaDescription:
      "AI SEO and AEO from Madvert Labs: crawlable pages, clear entity information and evidence-backed content that help AI Overviews, ChatGPT Search and Copilot understand a business.",
    short: "AI SEO and AEO",
    shortTitle: "AI SEO and AEO",
    eyebrow: "AI SEO and Answer Engine Optimisation",
    h1: "AI SEO and Answer Engine Optimisation.",
    h1Accent: "Be Understood Before You Are Recommended.",
    answer: [
      "AI search experiences still depend on pages they can crawl, index and trust, so this work builds on [SEO](/services/seo) rather than replacing it. No one can guarantee that an AI system will cite a particular business; Madvert Labs improves the conditions that make an accurate citation possible, as part of [Client Acquisition](/services/client-acquisition).",
    ],
    glance: [
      { label: "Surfaces", value: "Google AI Overviews and AI Mode, ChatGPT Search and Microsoft Copilot." },
      { label: "Foundations", value: "Crawl access, entity clarity, evidence and consistent business information." },
      { label: "Never used", value: "Hidden text, prompt tricks, fake reviews or promised citations." },
    ],
    whoFor: {
      title: "Who AI SEO and AEO is for",
      items: [
        "Brands that want to show up when buyers ask ChatGPT, Gemini or Google's AI answers for recommendations.",
        "Businesses whose company description, services or founder details are inconsistent across the website and profiles.",
        "Companies with real expertise and case studies buried in PDFs, images or pages search engines cannot read.",
        "Teams that already have SEO fundamentals and want to extend them to AI search.",
      ],
      notFor: [
        "Anyone looking for a guaranteed mention in ChatGPT or Google AI answers. That guarantee does not exist.",
        "Sites that cannot yet be crawled or indexed properly. [Technical SEO](/services/seo) comes first.",
      ],
    },
    problem: {
      title: "How AI search changes what buyers see",
      paragraphs: [
        "Buyers increasingly ask a question and read a generated answer before visiting any website. Google shows AI Overviews and AI Mode alongside its results, ChatGPT Search answers with links to its sources, and Microsoft Copilot draws on Bing's index.",
        "These systems can only use what they can find and understand. A business whose services are described differently on every page, whose proof sits in images without text, or whose pages block crawlers gives AI systems little to work with, and the answer names someone else.",
        "Google states that the same SEO best practices apply to its AI features and that no special file or markup is required to appear in them. AI SEO at Madvert Labs therefore focuses on fundamentals done thoroughly, not tricks.",
      ],
    },
    process: {
      title: "How AI search visibility work is done",
      steps: [
        { name: "Baseline", text: "Ask the questions buyers ask in Google, ChatGPT and Copilot, and record which businesses and sources are named. This is a snapshot, not a ranking, because AI answers vary between sessions and users." },
        { name: "Crawl access", text: "Check robots.txt, server responses and rendering so search and AI crawlers can reach important pages, and make sure key text is in the HTML rather than only in scripts or images." },
        { name: "Entity clarity", text: "Describe the business, its services, its founder and its locations the same way across the website, structured data and official profiles, so systems can connect the facts." },
        { name: "Evidence-backed content", text: "Turn real expertise into clear pages: direct definitions, how the service works, honest answers to common questions and case studies with real figures in readable text." },
        { name: "Structured data", text: "Add Organization, Service, Article, FAQ and breadcrumb markup only where it describes content that is visible on the page." },
        { name: "Mentions and measurement", text: "Support genuine coverage and accurate profiles, track visits from AI search in analytics, and repeat the baseline questions over time." },
      ],
    },
    comparison: {
      title: "Where AI search experiences find their sources",
      intro: "Each provider works differently, and each changes its systems often. Madvert Labs checks the current official documentation rather than relying on assumptions.",
      caption: "Major AI search experiences and what a business can influence",
      rowHeader: "AI search experience",
      columns: ["What it draws on", "What a business can influence"],
      rows: [
        { label: "Google AI Overviews and AI Mode", cells: ["Google's search index. A page must be indexed and eligible to appear with a snippet.", "Indexing, helpful content, page experience and structured data that matches visible content."] },
        { label: "ChatGPT Search", cells: ["Web search results, including pages OpenAI's search crawler (OAI-SearchBot) is allowed to access.", "Allowing OAI-SearchBot in robots.txt, server-rendered text and clear, quotable pages."] },
        { label: "Microsoft Copilot", cells: ["Bing's index and web results.", "Bing Webmaster Tools, sitemaps, IndexNow and accurate, crawlable content."] },
        { label: "Third-party sources", cells: ["Publications, reviews, directories and profiles that mention the business.", "Consistent business information and genuine coverage. Never fabricated reviews."] },
      ],
    },
    included: [
      "AI visibility baseline across Google, ChatGPT and Copilot",
      "Crawler access review, including robots.txt rules for search and AI crawlers",
      "Checks that key content is server-rendered and readable",
      "Entity and brand information audit across the site and official profiles",
      "Definition-led service pages and genuine FAQs",
      "Structured data aligned with visible content",
      "Case study and evidence pages in readable text",
      "Analytics setup to identify visits from AI search referrals",
    ],
    excluded: [
      "Guaranteed citations, mentions or recommendations in any AI system.",
      "Hidden text, content shown only to bots, or instructions written to manipulate AI models.",
      "Fake reviews, invented statistics or fabricated expert quotes.",
      "Mass-produced AI content created only to target questions.",
    ],
    examples: {
      title: "Examples of AI SEO deliverables",
      items: [
        { name: "Definition blocks", text: "A short, self-contained answer at the top of each service page that names the service and says what it is and who it is for, in text any system can quote accurately." },
        { name: "Readable case studies", text: "Results that only existed inside a PDF or an image republished as text with the real figures, the context and the source document linked." },
        { name: "An entity sheet", text: "One agreed description of the company, its services and its founder, used across the website, the schema and official profiles." },
        { name: "An AI answer log", text: "A repeatable list of buyer questions, checked periodically across AI search tools, recording the sources each answer cites." },
      ],
    },
    faqs: [
      {
        q: "What is answer engine optimisation (AEO)?",
        a: "Answer engine optimisation (AEO) is the practice of making a business's information easy for search and AI systems to find, understand and quote when they answer questions. In practice it means crawlable pages, clear and consistent facts about the business, direct answers to real questions and visible evidence.",
      },
      {
        q: "Can you guarantee our business will appear in ChatGPT or Google AI Overviews?",
        a: "No. Google, OpenAI and Microsoft decide what their systems show, answers change between users and sessions, and none of them sells placement in organic AI answers. Madvert Labs improves the factors those systems rely on and reports honestly on what changes.",
      },
      {
        q: "Do we need an llms.txt file or special AI markup?",
        a: "Google says no special files or markup are needed to appear in its AI features. Madvert Labs does not treat an llms.txt file as a visibility lever; crawlable pages, clear content and accurate structured data matter far more.",
      },
      {
        q: "Is AI SEO different from normal SEO?",
        a: "AI SEO builds on SEO. The foundations are the same: crawling, indexing, helpful content and trust. AI SEO puts more weight on entity clarity, direct self-contained answers, consistent business information across the web and evidence that can be quoted.",
      },
      {
        q: "How do you measure AI search visibility?",
        a: "Through a repeatable set of buyer questions checked across AI tools, referral visits from AI search in analytics, and data from Google Search Console and Bing Webmaster Tools. These measures are directional, because AI answers are not a fixed ranking.",
      },
    ],
    related: [
      { key: "client-acquisition", anchor: "Client acquisition, including AI search", note: "Where AI visibility fits with paid and organic demand." },
      { key: "seo", anchor: "Search engine optimisation fundamentals", note: "Crawling, indexing and content: the base AI search depends on." },
      { key: "web-development", anchor: "Server-rendered, fast websites", note: "Sites whose content is readable without running scripts." },
      { key: "branding-marketing", anchor: "Consistent brand messaging and PR", note: "One clear story about the business, told the same way everywhere." },
      { href: "/glossary#aeo", anchor: "What answer engine optimisation means", note: "A plain definition of AEO and how it relates to SEO." },
      { href: "/glossary#ai-seo-vs-traditional-seo", anchor: "AI SEO vs traditional SEO", note: "What changes, and what stays the same, when answers come from AI." },
    ],
    resources: ["seo-ai-search-playbook", "brand-perception-checklist"],
    cta: {
      title: "Make the Business Easy",
      accent: "for AI Search to Understand.",
      body: "We will look at how the business shows up across Google, ChatGPT and Copilot today, and what is stopping it being understood.",
      label: "Book an AI Search Visibility Call",
    },
    audience: "Businesses that want to be understood by AI search experiences",
  },

  /* ───────────────────────── Social Media Management ───────────────────────── */
  "social-media-management": {
    key: "social-media-management",
    metaTitle: "Social Media Management for Established Businesses",
    metaDescription:
      "Social Media Management from Madvert Labs: content strategy, calendars, creative production, publishing, community management and reviews that keep a brand consistent.",
    short: "social media management",
    shortTitle: "Social media management",
    eyebrow: "Social Media Management",
    h1: "Social Media Management.",
    h1Accent: "A Consistent Brand Between Campaigns.",
    answer: [
      "The service is part of [Branding and Marketing](/services/branding-marketing) because organic social is often where a buyer checks whether a business is active, credible and worth contacting. The focus is consistency and quality, not volume for its own sake.",
    ],
    glance: [
      { label: "Platforms", value: "The ones the audience actually uses, such as Instagram, Facebook, LinkedIn or TikTok." },
      { label: "Covers", value: "Strategy, calendar, creative, publishing, community management and review." },
      { label: "Measured by", value: "Consistency, engagement quality, profile visits and enquiries from social." },
    ],
    whoFor: {
      title: "Who social media management is for",
      items: [
        "Established businesses whose social profiles look less professional than the business really is.",
        "Teams that post when someone has time, with no plan, no consistent look and no review of what works.",
        "Brands running paid campaigns whose profiles need to reassure the people who click through to check them.",
        "Founders who want to appear on camera but need help with planning, scripting and editing.",
      ],
      notFor: [
        "Businesses that need leads from social within days. Paid social through [Meta Ads lead generation](/services/meta-ads) is built for that.",
        "Anyone wanting follower growth through bought followers or engagement groups.",
      ],
    },
    problem: {
      title: "Why most business social media does not work",
      paragraphs: [
        "Posting every day is not a strategy. Neither is putting “Happy Monday” over a stock photo.",
        "Many business accounts follow the same pattern: bursts of activity followed by silence, a different visual style every month, posts about the business rather than for the customer, and nobody checking which content actually led to conversations.",
        "The cost is quiet but real. A buyer who clicks an ad or hears a recommendation checks the profile, and an inactive or inconsistent profile makes a serious business look smaller than it is.",
      ],
    },
    process: {
      title: "How social media management works",
      steps: [
        { name: "Brand and audience review", text: "Review the brand, the audience, competitors and existing content to decide what each channel is for and which platforms deserve the effort." },
        { name: "Content pillars and calendar", text: "Set a small number of content themes tied to what the business sells, then plan a monthly calendar so posting does not depend on spare time." },
        { name: "Production", text: "Create posts, carousels, short form video and captions in the brand's identity, with video and motion support from [Madvert Studios](/studios)." },
        { name: "Approval and publishing", text: "Share the content for approval before it goes live, then schedule and publish it at times that suit the audience." },
        { name: "Community management", text: "Respond to comments and messages within agreed hours, and route genuine enquiries to the sales team or the CRM." },
        { name: "Monthly review", text: "Review what earned attention and conversations, and use it to shape the next month's plan." },
      ],
    },
    included: [
      "Social media strategy and platform selection",
      "Content pillars and monthly content calendars",
      "Post, carousel and short form video production",
      "Caption writing in the brand's voice",
      "Scheduling and publishing",
      "Community management and enquiry routing",
      "Monthly performance reviews",
    ],
    excluded: [
      "Paid social campaigns, which run under [Meta Ads Lead Generation](/services/meta-ads).",
      "Bought followers, likes or engagement.",
      "Guaranteed follower counts or viral reach.",
      "Influencer fees and contracts, which are scoped separately under [influencer marketing](/services/branding-marketing).",
    ],
    examples: {
      title: "Examples of social media deliverables",
      items: [
        { name: "A monthly content calendar", text: "Themes, formats, dates and captions for the month, approved in one review rather than post by post." },
        { name: "A founder video series", text: "Short talking head videos planned around the questions customers ask, filmed in one session and edited into a month of content." },
        { name: "A profile refresh", text: "Bio, highlights, pinned posts and visual style aligned with the brand guidelines, so the profile reassures new visitors." },
        { name: "Campaign support content", text: "Organic posts that reinforce the message of a paid campaign, so people who check the profile see the same promise." },
      ],
    },
    faqs: [
      {
        q: "How many posts per week does a business need?",
        a: "There is no universal number. Consistency and quality matter more than volume. The right frequency depends on the platform, the audience and how much genuinely useful content the business can support, and it is agreed in the monthly plan.",
      },
      {
        q: "Is social media management the same as running ads?",
        a: "No. Social Media Management covers organic content on the business's own profiles. Paid campaigns are a separate discipline with different goals, covered by [Meta Ads lead generation](/services/meta-ads). Many businesses need both, planned together.",
      },
      {
        q: "Who creates the content?",
        a: "Madvert Labs plans and produces it. The business supplies knowledge, approvals and, where it helps, people on camera, because real faces and real work are usually more convincing than stock imagery.",
      },
      {
        q: "How is social media success measured?",
        a: "Through consistency against the plan, engagement quality, profile visits, and messages and enquiries that came from social. Follower count is reported but is not treated as the goal.",
      },
      {
        q: "Which platforms should we be on?",
        a: "The platforms where the audience already spends time and where the business can show up properly. Being consistent on two platforms is usually more valuable than being inactive on five.",
      },
    ],
    related: [
      { key: "branding-marketing", anchor: "Brand strategy and visual identity", note: "The identity system every post is built on." },
      { key: "studios", anchor: "Video and motion production", note: "Short form video, motion graphics and brand films." },
      { key: "meta-ads", anchor: "Paid social campaigns", note: "Facebook and Instagram ads built to produce sales conversations." },
      { key: "automation-revenue-systems", anchor: "Routing social enquiries into the CRM", note: "Messages and comments that turn into tracked opportunities." },
      { key: "digital-marketing", anchor: "A complete outsourced marketing team", note: "When social is one of several pieces that need to work together." },
    ],
    resources: ["steal-these-hooks", "ai-content-automation-playbook", "brand-perception-checklist"],
    cta: {
      title: "Make the Profile",
      accent: "Look Like the Business.",
      body: "We will review how the brand shows up on social today and what a consistent plan would look like.",
      label: "Book a Brand Strategy Call",
    },
    audience: "Established businesses that need consistent organic social media",
  },

  /* ───────────────────────── Web Development ───────────────────────── */
  "web-development": {
    key: "web-development",
    metaTitle: "Web Development: Fast Marketing Websites and Landing Pages",
    metaDescription:
      "Web Development from Madvert Labs: fast marketing websites, landing pages and web apps built for conversion and connected to analytics, CRM and lead routing from day one.",
    short: "web development",
    shortTitle: "Web development",
    eyebrow: "Web Development",
    h1: "Web Development.",
    h1Accent: "Built to Convert. Connected From Day One.",
    answer: [
      "Web Development sits under [Conversion](/services/conversion) because a website is judged by what visitors do on it. Every build includes the tracking, forms and integrations that let marketing and sales see where enquiries come from and what happens to them next.",
    ],
    glance: [
      { label: "Builds", value: "Marketing websites, landing pages and web applications." },
      { label: "Built for", value: "Speed, mobile, accessibility, and readability for search engines and AI crawlers." },
      { label: "Connected to", value: "Analytics, CRM, booking and lead routing." },
    ],
    whoFor: {
      title: "Who web development is for",
      items: [
        "Businesses whose website looks outdated, loads slowly or does not explain what they do.",
        "Companies running paid campaigns that send traffic to a general home page instead of a page built for the offer.",
        "Teams whose website forms send enquiries to an inbox nobody checks, with no link to a CRM.",
        "Businesses that need a calculator, application flow or client area as part of the customer journey.",
      ],
      notFor: [
        "Businesses that only need a small text change on an existing site.",
        "Projects where the main need is a native mobile app. [App Development](/services/app-development) covers that.",
      ],
    },
    problem: {
      title: "A website can look expensive and still lose people",
      paragraphs: [
        "Traffic does not pay a business; customers do. Many websites are designed to impress the owner rather than help a visitor decide: slow on mobile, vague about the service, crowded with options and ending in a contact form that asks too much.",
        "The second problem is invisible. Forms that are not connected to a CRM, missing analytics events and pages that search engines cannot render mean the business cannot see which marketing works or follow up quickly.",
        "Web Development at Madvert Labs solves both: each page is built to convert, and the connections behind it are in place from launch.",
      ],
    },
    process: {
      title: "How a website is planned and built",
      steps: [
        { name: "Discovery and journey mapping", text: "Map who visits, where they come from, what they need to know and the one action each page should lead to." },
        { name: "Structure and copy", text: "Plan the page structure, service pages and internal links, and write conversion copy that says what the business does in plain language." },
        { name: "Design", text: "Design responsive layouts in the brand's identity, with clear calls to action, proof close to decisions, and accessible contrast and type." },
        { name: "Build", text: "Develop a fast, server-rendered site so content is visible to visitors, search engines and AI crawlers without waiting for scripts." },
        { name: "Connect", text: "Set up analytics events, forms, booking, CRM integration and lead routing, and test every path end to end." },
        { name: "Launch and improve", text: "Launch with redirects and search settings handled, then use real behaviour data for ongoing [conversion rate optimisation](/services/conversion)." },
      ],
    },
    included: [
      "Website and landing page strategy and structure",
      "Conversion copywriting",
      "Responsive UI and UX design",
      "Front end and back end development",
      "Technical SEO foundations: speed, metadata, structured data, sitemaps and redirects",
      "Analytics and conversion event tracking",
      "Form, booking and CRM integration with lead routing",
      "Launch support and post-launch improvements",
    ],
    excluded: [
      "Guaranteed conversion rates. Madvert Labs identifies friction, tests improvements and reports what changed.",
      "Native mobile apps, which are covered by [App Development](/services/app-development).",
      "Ongoing rankings work after launch, which is part of [SEO](/services/seo).",
      "Publishing content the business has not approved. Every page is reviewed before launch.",
    ],
    examples: {
      title: "Examples of web development projects",
      items: [
        { name: "A campaign landing page", text: "One campaign, one promise, one clear next step: a page written for a specific ad campaign, with a qualifying form connected to the CRM." },
        { name: "A service website rebuild", text: "A site rebuilt around one page per core service, with clear navigation, proof and booking on every key page." },
        { name: "An application flow", text: "A multi-step application that collects budget, timeline and requirements before a prospect can book." },
        { name: "An interactive calculator", text: "A quote or savings calculator that lets customers estimate before the sales call and sends their answers to the CRM." },
      ],
    },
    proof: {
      title: "A landing page in a real campaign",
      intro: "In this case study, the landing page and application flow were part of the system that turned Meta traffic into qualified applications.",
      slugs: ["agency-lead-generation"],
    },
    faqs: [
      {
        q: "How long does it take to build a website?",
        a: "It depends on the number of pages, the content available and the integrations needed. A single landing page is a much shorter project than a full website with CRM integration. Madvert Labs gives a timeline after discovery, once the scope is clear.",
      },
      {
        q: "Will the website be optimised for search engines?",
        a: "Yes. Technical foundations are part of every build: fast loading, server-rendered content, clean URLs, metadata, structured data and sitemaps. Ongoing rankings work is a separate service, [SEO](/services/seo).",
      },
      {
        q: "Can you connect the website to our CRM?",
        a: "Yes. Forms and booking can feed CRMs such as GoHighLevel or HubSpot directly or through tools like Zapier, Make or n8n, with each lead routed to the right person.",
      },
      {
        q: "Can we edit the website ourselves?",
        a: "Where the team needs to update content regularly, the build can include a content management system so pages can be edited without a developer.",
      },
      {
        q: "Should we fix the website before running more ads?",
        a: "Usually, yes. Improving the journey for traffic the business already pays for changes the economics of every future campaign.",
      },
    ],
    related: [
      { key: "conversion", anchor: "Conversion rate optimisation", note: "Offers, forms and booking journeys that turn traffic into enquiries." },
      { key: "app-development", anchor: "Custom web and mobile apps", note: "When the project is a product rather than a marketing site." },
      { key: "seo", anchor: "Technical and content SEO", note: "Keep the new site visible after launch." },
      { key: "automation-revenue-systems", anchor: "CRM integration and lead routing", note: "What happens to each enquiry after the form is sent." },
      { key: "google-ads", anchor: "Paid search that needs landing pages", note: "Search campaigns matched to pages built for each service." },
    ],
    resources: ["landing-pages-that-sell", "conversion-leak-checklist", "build-that-offer"],
    cta: {
      title: "Build a Website",
      accent: "That Earns Its Traffic.",
      body: "Tell us what the site needs to achieve. We will look at the journey, the friction and the connections behind it.",
      label: "Discuss a Website Project",
    },
    audience: "Businesses that need a website or landing pages built for conversion",
  },

  /* ───────────────────────── App Development ───────────────────────── */
  "app-development": {
    key: "app-development",
    metaTitle: "App Development: Mobile Apps, Web Apps and Client Portals",
    metaDescription:
      "App Development from Madvert Labs: mobile and web applications, client portals and internal apps, designed and built with the backend, integrations and analytics they need.",
    short: "app development",
    shortTitle: "App development",
    eyebrow: "App Development",
    h1: "App Development.",
    h1Accent: "Apps Built Around How the Business Grows.",
    answer: [
      "App Development is part of [Tech and Product Development](/services/tech-product-development), where Madvert Labs builds software when a growth problem needs a tool rather than another campaign. Every app starts with the business case: who will use it, what it replaces and how its success will be measured.",
    ],
    glance: [
      { label: "Builds", value: "Mobile apps, web apps, client portals and internal apps." },
      { label: "Includes", value: "Design, backend, integrations and analytics." },
      { label: "Approach", value: "Build versus buy decision first, then delivery in stages." },
    ],
    whoFor: {
      title: "Who app development is for",
      items: [
        "Businesses whose customers repeatedly message the team for updates, bookings or documents that an app or portal could provide.",
        "Service businesses that want customers to book, reorder or track progress without a phone call.",
        "Teams running core processes in spreadsheets and chat groups that they have outgrown.",
        "Founders with a product idea that needs a first version built properly and connected to marketing from the start.",
      ],
      notFor: [
        "Problems an existing off-the-shelf tool already solves well. Madvert Labs will say so rather than build it.",
        "Ideas with no clear user or business outcome yet. A [Tech Opportunity Audit](/resources/tech-opportunity-audit) is the better first step.",
      ],
    },
    problem: {
      title: "When the business has outgrown messages and spreadsheets",
      paragraphs: [
        "Some growth problems are not marketing problems. When customers chase the team for updates, staff copy data between tools and the important numbers live in separate spreadsheets, more advertising only adds pressure to a process that cannot scale.",
        "Off-the-shelf software solves many of these problems and should be used when it fits. When it forces the business to change how it works, a custom app can fit the process instead. Technology should fit the business, not force the business to fit the technology.",
        "The main risk is building the wrong thing. App Development at Madvert Labs reduces that risk by starting with the opportunity and building in stages.",
      ],
    },
    process: {
      title: "How an app is scoped and built",
      steps: [
        { name: "Opportunity audit", text: "Map the bottleneck, the users, the data and the existing tools, then decide whether the answer is marketing, automation, an existing product or custom code." },
        { name: "Scope the first version", text: "Define the smallest version that solves the core problem for real users, with the features that can wait listed separately." },
        { name: "UX and interface design", text: "Design screens and flows around the tasks users actually perform, and review them before development starts." },
        { name: "Build in stages", text: "Develop the app, backend and admin tools in stages, with working releases reviewed along the way rather than one reveal at the end." },
        { name: "Integrate", text: "Connect the app to the CRM, payments, booking, analytics or other systems it needs, so data does not have to be copied by hand." },
        { name: "Launch and support", text: "Release to users, monitor usage and errors, and improve the app based on what people actually do." },
      ],
    },
    comparison: {
      title: "Mobile app or web app?",
      intro: "Both are valid. The right choice depends on how people will use the product.",
      caption: "Mobile apps and web apps compared",
      rowHeader: "Consideration",
      columns: ["Web app", "Mobile app"],
      rows: [
        { label: "Access", cells: ["Any modern browser, no install", "Installed from the App Store or Google Play"] },
        { label: "Updates", cells: ["Live as soon as they are released", "Usually distributed through app store releases"] },
        { label: "Device features", cells: ["Some, depending on the browser", "Full access, such as push notifications and offline use"] },
        { label: "Best for", cells: ["Portals, dashboards and tools used on desktop and mobile", "Products customers open often on their phone"] },
      ],
    },
    included: [
      "Opportunity audit and build versus buy recommendation",
      "Product scoping and feature prioritisation",
      "UX and UI design",
      "Mobile app and web app development",
      "Backend, database and admin panel development",
      "Integrations with CRM, booking, payment and other tools",
      "Analytics and usage tracking",
      "Launch support and ongoing improvements",
    ],
    excluded: [
      "Building software when an existing tool already fits. Madvert Labs recommends the existing tool instead.",
      "Promised app store rankings or download numbers.",
      "Apps with no agreed user, purpose or measure of success.",
    ],
    examples: {
      title: "Examples of apps and portals",
      items: [
        { name: "A client portal", text: "A secure area where customers see project status, documents and invoices, so they do not need to message the team for every update." },
        { name: "A booking and reorder app", text: "A mobile app that lets repeat customers book or reorder in a few taps, connected to the business's calendar and CRM." },
        { name: "An internal operations app", text: "A tool that replaces a spreadsheet and a chat group with one shared view of jobs, owners and deadlines." },
        { name: "A growth dashboard", text: "One view of marketing, sales and operational numbers, pulled from the tools the business already uses." },
      ],
    },
    faqs: [
      {
        q: "Should we build a mobile app or a web app?",
        a: "It depends on how customers will use it. A web app works in any browser and is usually faster to launch and update. A mobile app makes sense when the product needs to live on the phone, with notifications, offline use, device features or frequent repeat use. Madvert Labs recommends one after the opportunity audit.",
      },
      {
        q: "How much does it cost to build an app?",
        a: "The cost depends on the features, the number of platforms, the integrations and the design work involved. Madvert Labs does not publish fixed prices; a first version is scoped after the audit so the estimate reflects the real work.",
      },
      {
        q: "Why would a marketing company build apps?",
        a: "Because some growth problems are not marketing problems. When a tool is the answer, Madvert Labs designs and builds the tool and connects it to the marketing, CRM and analytics around it.",
      },
      {
        q: "How do app projects start?",
        a: "With a tech opportunity audit. Madvert Labs maps the bottleneck, the data and the existing tools, then recommends whether the problem needs marketing, automation or code.",
      },
      {
        q: "Can the app work with our existing systems?",
        a: "Yes, integrations are a core part of the work, from CRMs and booking tools to payment providers and internal databases, using their APIs or webhooks where they are available.",
      },
    ],
    related: [
      { key: "tech-product-development", anchor: "Custom software and internal tools", note: "Dashboards, calculators, portals and integrations." },
      { key: "web-development", anchor: "Marketing websites and landing pages", note: "When the need is a site that converts rather than a product." },
      { key: "ai-agents", anchor: "AI agents inside existing tools", note: "Assistants that answer, qualify and book inside the app or CRM." },
      { key: "automation-revenue-systems", anchor: "CRM and workflow automation", note: "Connect the app to the pipeline and follow up." },
    ],
    resources: ["tech-opportunity-audit"],
    cta: {
      title: "Show Us the Bottleneck.",
      accent: "We Will Tell You Whether It Needs an App.",
      body: "Sometimes the answer is custom software. Sometimes it is a better use of a tool you already pay for.",
      label: "Discuss an App Project",
    },
    audience: "Businesses that need a mobile app, web app or client portal",
  },

  /* ───────────────────────── AI Agents ───────────────────────── */
  "ai-agents": {
    key: "ai-agents",
    metaTitle: "AI Agents for Lead Response, Qualification and Booking",
    metaDescription:
      "AI agents from Madvert Labs answer enquiries, qualify leads, book appointments and prepare reports inside tools such as WhatsApp and the CRM, with human review where it matters.",
    short: "AI agents",
    shortTitle: "AI agents",
    eyebrow: "AI Agents",
    h1: "AI Agents.",
    h1Accent: "Instant Replies. Consistent Qualification. People Where It Matters.",
    answer: [
      "AI agents belong to [CRM and Automation](/services/automation-revenue-systems) because an agent is only useful when it is connected to the pipeline, the calendar and the team that takes over. Madvert Labs scopes each agent to a specific job, sets clear limits on what it can say and do, and keeps a person in the loop for decisions that carry risk.",
    ],
    glance: [
      { label: "Jobs", value: "Answer enquiries, qualify leads, book appointments and prepare reports." },
      { label: "Works in", value: "WhatsApp, website chat, email, the CRM and the calendar." },
      { label: "Safeguards", value: "Defined scope, approved knowledge and human hand-off." },
    ],
    whoFor: {
      title: "Who AI agents are for",
      items: [
        "Businesses whose leads wait hours for a first reply because the team is busy, offline or in another time zone.",
        "Sales teams that spend a large part of the day asking the same qualifying questions.",
        "Businesses receiving enquiries on WhatsApp and website chat outside working hours.",
        "Teams that compile the same weekly report by hand from several tools.",
      ],
      notFor: [
        "Processes that are not defined yet. Automation should remove friction, not automate confusion, so the process is fixed first.",
        "Decisions with legal, medical or financial consequences that should not be made without a qualified person.",
      ],
    },
    problem: {
      title: "Interest has a temperature",
      paragraphs: [
        "Interest has a temperature, and most systems let it cool. A lead who enquires in the evening and hears back the next afternoon may already have spoken to a competitor.",
        "Hiring more people to reply faster is expensive and still leaves gaps at night, at weekends and during busy periods. Basic chatbots fill the gap badly, with rigid menus that frustrate the people they were meant to help.",
        "A well-scoped AI agent responds straight away, asks qualifying questions in natural language, books the next step and hands over to a person with the full context. The best response time should not depend on who is online.",
      ],
    },
    process: {
      title: "How an AI agent is designed and launched",
      steps: [
        { name: "Choose the job", text: "Pick one job the agent will do well, such as first response and qualification, and define what a successful conversation looks like." },
        { name: "Map the conversation and rules", text: "Write down the questions, the answers the agent may give, the details it must collect and the moments it must hand over to a person." },
        { name: "Prepare approved knowledge", text: "Give the agent only approved information about services, policies and availability, so answers stay accurate and on brand." },
        { name: "Connect the tools", text: "Connect the agent to channels such as WhatsApp, website chat or email, and to the CRM and calendar, so conversations, answers and bookings are recorded." },
        { name: "Test with real scenarios", text: "Test against real past enquiries, edge cases and difficult questions before launch, and adjust the rules wherever the agent gets it wrong." },
        { name: "Launch with review", text: "Launch with conversation reviews and clear escalation, then improve the agent from what real conversations show." },
      ],
    },
    included: [
      "Use case selection and conversation design",
      "Knowledge base preparation from approved information",
      "Agent build and configuration",
      "WhatsApp, website chat and email connection",
      "CRM, pipeline and calendar integration",
      "Human hand-off and escalation rules",
      "Testing against real scenarios",
      "Conversation review and ongoing improvement",
    ],
    excluded: [
      "Replacing the sales team. Agents respond and qualify so the team spends its time on the conversations that matter.",
      "Agents that commit to prices, discounts or contract terms without approval rules agreed with the business.",
      "Launching an agent that has not been tested against real scenarios.",
      "Collecting more personal data than the job needs.",
    ],
    examples: {
      title: "Examples of AI agents",
      items: [
        { name: "A WhatsApp first-response agent", text: "Replies to new enquiries straight away, asks about requirement, location, budget and timeline, and books qualified leads into the calendar." },
        { name: "A website enquiry assistant", text: "Answers common questions about services and process from approved information, and passes complex questions to the team with the conversation attached." },
        { name: "A booking and reminder agent", text: "Confirms appointments, sends reminders and handles reschedule requests, updating the CRM automatically." },
        { name: "A weekly reporting agent", text: "Pulls figures from the ad platforms and the CRM each week and prepares a summary for the team to review before it is shared." },
      ],
    },
    faqs: [
      {
        q: "Will AI agents replace our sales team?",
        a: "No. AI agents respond instantly, qualify consistently and keep follow up moving, so the sales team spends its time on the conversations that matter.",
      },
      {
        q: "What happens when the agent does not know the answer?",
        a: "The agent is set up to say so and hand over to a person, with the conversation and collected details attached. Hand-off rules are agreed before launch, including topics the agent should never answer.",
      },
      {
        q: "Which tools can AI agents work with?",
        a: "Agents can connect to channels such as WhatsApp, website chat and email, and to CRMs such as GoHighLevel or HubSpot, calendars and booking tools, directly or through tools like Zapier, Make or n8n.",
      },
      {
        q: "How is customer data handled?",
        a: "Each agent is designed to access only the information its job needs and to record conversations in the business's own systems, such as the CRM. Data handling is agreed with the business before launch, in line with the privacy rules that apply to it.",
      },
      {
        q: "How do we know the agent is working?",
        a: "Through response time, qualification rate, bookings made, hand-off rate and regular reviews of real conversations. These measures are agreed before launch.",
      },
    ],
    related: [
      { key: "automation-revenue-systems", anchor: "CRM pipelines and automated follow up", note: "The revenue system every agent plugs into." },
      { key: "meta-ads", anchor: "Lead generation that needs fast replies", note: "Campaigns where response speed decides lead quality." },
      { key: "app-development", anchor: "Custom apps and client portals", note: "Products where an agent can sit inside the experience." },
      { key: "tech-product-development", anchor: "Custom software and integrations", note: "When the agent needs a tool or data source that does not exist yet." },
      { href: "/glossary#revenue-response-system", anchor: "What a revenue response system is", note: "How enquiries get answered, qualified and booked without delay." },
      { href: "/glossary#speed-to-lead", anchor: "Why speed-to-lead matters", note: "The time between an enquiry and the first reply." },
    ],
    resources: ["automated-lead-engine", "revenue-leakage-audit", "ai-content-automation-playbook"],
    cta: {
      title: "Your Marketing Worked Hard to Create the Lead.",
      accent: "Make Sure Someone Replies.",
      body: "We will map what happens after an enquiry arrives and where an agent would make the biggest difference.",
      label: "Book an AI Agents Call",
    },
    audience: "Businesses that need faster lead response and qualification",
  },
};

export function getServicePage(key: ServiceKey) {
  const c = servicePages[key];
  if (!c) throw new Error(`No service page content for ${key}`);
  return c;
}
