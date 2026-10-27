/**
 * Insights articles rendered by src/components/article/ArticleTemplate.tsx at /insights/<slug>.
 *
 * Rules for this file (from the client brief):
 * - Service names and URLs come from src/lib/entities.ts; link to them, do not redefine them.
 * - No invented results, statistics, benchmarks, prices or client counts. Worked examples use
 *   obviously round, illustrative numbers and are labelled "Example". Proof references real case
 *   studies in src/cms/fallback.ts by slug; their figures are rendered from there verbatim, and any
 *   figure quoted in prose must match the stored value exactly.
 * - FAQs are genuine buyer questions answered honestly, and they are always rendered visibly.
 * - Inline links are written as [anchor text](/path); **text** is bold. Rendered by <RichText>.
 * - dateModified changes only when a reader would notice the change.
 */

import { october2026Articles } from "./articles-2026-10";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; label?: string; items: { text: string; detail?: string }[] }
  | {
      type: "table";
      caption: string;
      rowHeader: string;
      columns: string[];
      rows: { label: string; cells: string[] }[];
      highlight?: number;
      note?: string;
    }
  | { type: "definition"; term: string; definition: string; id?: string; more?: string[] }
  | { type: "diagram"; label: string; steps: { name: string; text: string }[] }
  | { type: "callout"; label: string; text: string[] };

export type ArticleSection = {
  id: string;
  /** Small label above the H2, e.g. "Why this matters". */
  label: string;
  title: string;
  blocks: ArticleBlock[];
};

export type Article = {
  slug: string;
  /**
   * "draft" keeps an article out of every route, the sitemap, IndexNow, /llms.txt and the insights
   * index until its content is approved. Use it for comparison pages and founder POV pieces in progress.
   */
  status?: "draft" | "published";
  /** Canonical path; defaults to /insights/<slug>. */
  path?: string;
  /** Visible H1. */
  title: string;
  /** <title> (the site template appends the brand). */
  metaTitle: string;
  /** Meta description and Article description, 140–160 characters. */
  description: string;
  eyebrow: string;
  /** Direct answer under the H1: 2–4 self-contained sentences, one string per paragraph. */
  answer: string[];
  author: "founder";
  datePublished: string;
  dateModified: string;
  /** Breadcrumb trail after Home, ending with this page. Defaults to Insights → title. */
  crumbs?: { name: string; path: string }[];
  sections: ArticleSection[];
  proof?: { title: string; intro?: string; items: { slug: string; metric?: string; note?: string }[] };
  faqs: { q: string; a: string }[];
  /** External sources the article relies on, shown as a visible list and as schema `citation`. */
  sources?: { title: string; publisher: string; url: string }[];
  related: { href: string; anchor: string; note: string }[];
  cta: { title: string; accent?: string; body: string; label: string };
};

export const CPQL_CALCULATOR_PATH = "/tools/cost-per-qualified-lead-calculator";

const allArticles: Article[] = [
  {
    slug: "lead-generation-vs-qualified-lead-generation",
    title: "Lead Generation vs Qualified Lead Generation",
    metaTitle: "Lead Generation vs Qualified Lead Generation",
    description:
      "Lead generation produces enquiries; qualified lead generation produces enquiries that meet written buying criteria. How they differ and how to measure CPQL.",
    eyebrow: "Client Acquisition Insight",
    answer: [
      "Lead generation is the work of producing enquiries: form fills, calls and WhatsApp messages from people who may be interested in a product or service. Qualified lead generation produces enquiries that already meet written buying criteria, such as budget, need, authority and timing, so a sales team spends its time on people who can actually buy.",
      "The two are judged by different numbers. Lead generation is usually judged by cost per lead (CPL); qualified lead generation is judged by cost per qualified lead (CPQL) and by the sales conversations and revenue those leads create.",
    ],
    author: "founder",
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    sections: [
      {
        id: "definitions",
        label: "Definitions",
        title: "What counts as a qualified lead (and a qualified RFQ)",
        blocks: [
          {
            type: "definition",
            term: "A qualified lead",
            id: "qualified-lead",
            definition:
              "A qualified lead is an enquiry from a person or business that meets criteria the company has written down in advance: they have a real need the company solves, the budget or means to pay, the authority to decide (or direct access to whoever decides) and a timeframe that makes a sales conversation worthwhile.",
            more: [
              "The criteria belong to the business, not to the ad platform. A lead form submission is only a lead; the word “qualified” should mean it passed a check that the sales team agrees with.",
            ],
          },
          {
            type: "definition",
            term: "A qualified RFQ",
            id: "qualified-rfq",
            definition:
              "A qualified RFQ (request for quotation) is a B2B enquiry, typically for manufacturers, exporters and industrial suppliers, that includes enough verifiable detail to quote against: an identifiable buyer company, the product or specification, the quantity, the delivery location and timeline, and a realistic commercial expectation.",
            more: [
              "Many RFQs that arrive through marketplaces, directories or broad campaigns are price checks from buyers who will never order. For a factory in Sialkot, Faisalabad or Karachi quoting export orders, one qualified RFQ with a named buyer and a real specification is worth more than dozens of “send your best price” messages, because every quote costs estimating time.",
            ],
          },
          {
            type: "table",
            caption: "Lead generation vs qualified lead generation",
            rowHeader: "Dimension",
            columns: ["Lead generation", "Qualified lead generation"],
            highlight: 1,
            rows: [
              {
                label: "Goal",
                cells: ["As many enquiries as the budget allows", "Enquiries that meet written buying criteria"],
              },
              {
                label: "Main metric",
                cells: ["Cost per lead (CPL) and lead volume", "Cost per qualified lead (CPQL), qualification rate, pipeline created"],
              },
              {
                label: "Lead capture",
                cells: ["Short forms with as few fields as possible", "Forms, chats or calls that ask the questions sales needs answered"],
              },
              {
                label: "Offer and messaging",
                cells: ["Broad appeal, often discount-led", "Speaks to the buyer who fits, and states who the offer is not for"],
              },
              {
                label: "What sales receives",
                cells: ["A list of names and numbers to sort through", "Leads with qualification data (budget, need, timeline) attached"],
              },
              {
                label: "Follow-up",
                cells: ["Often manual, in whatever order leads are noticed", "Routed by score and fit, with response times tracked"],
              },
              {
                label: "Main risk",
                cells: ["Cheap leads that waste sales time and never buy", "Too strict a filter, so volume drops below what sales can use"],
              },
              {
                label: "Fits best",
                cells: [
                  "Low-priced offers, simple decisions, a team that can call every lead quickly",
                  "Higher-value services, B2B and RFQ-driven sales, limited sales capacity, cross-border buyers",
                ],
              },
            ],
            note: "Most businesses need both stages: enough lead volume to learn from, and a qualification step so that volume does not swamp the sales team.",
          },
        ],
      },
      {
        id: "why",
        label: "Why this matters",
        title: "Why cheap leads can be the most expensive leads",
        blocks: [
          {
            type: "p",
            text: "A campaign that produces many leads at a low cost per lead looks efficient in an ad dashboard. The cost shows up later, in the sales team: hours spent calling people who did not mean to enquire, who wanted a price for something the business does not sell, or who have no budget this year. That time is not in the CPL figure, but it is real.",
          },
          {
            type: "p",
            text: "Ad platforms optimise towards the event a business tells them to count. If every form fill is reported as a conversion, Meta and Google will look for more people who fill in forms, whether or not they buy. When the business instead reports which leads were qualified, or which became customers, the platform has a better signal to learn from. This is one reason [Meta Ads lead generation](/services/meta-ads) and [Google Ads lead generation](/services/google-ads) work better when the CRM and the ad accounts are connected.",
          },
          {
            type: "p",
            text: "For established businesses in Pakistan, the problem often arrives through WhatsApp: a stream of “price?” messages that look like demand but rarely turn into orders. Qualified lead generation does not mean fewer conversations for the sake of it. It means the conversations the team has are the ones worth having.",
          },
        ],
      },
      {
        id: "framework",
        label: "Framework",
        title: "How qualified lead generation works in practice",
        blocks: [
          {
            type: "diagram",
            label: "From enquiry to qualified lead",
            steps: [
              {
                name: "Write the criteria",
                text: "Agree with sales what makes a lead worth a call: need, budget, authority, timeline, and any hard disqualifiers.",
              },
              {
                name: "Filter at capture",
                text: "Ask two to four questions in the form, chat or call that map directly to those criteria.",
              },
              {
                name: "Score and route",
                text: "Mark each lead qualified or not, and send it to the right person with its answers attached.",
              },
              {
                name: "Respond quickly",
                text: "Contact qualified leads while the enquiry is fresh, and track how long that takes.",
              },
              {
                name: "Feed results back",
                text: "Report qualified leads and closed deals to the ad platforms and review CPQL, not just CPL.",
              },
            ],
          },
          { type: "h3", text: "Speed-to-lead, explained honestly", id: "speed-to-lead" },
          {
            type: "p",
            text: "**Speed-to-lead** is the time between an enquiry arriving and a person (or a well-designed automated message) responding to it. A fast response matters because interest cools and buyers often contact more than one supplier. Speed only helps, though, when the response is useful: an instant message that asks the right qualifying question beats an instant “we will get back to you”.",
          },
          {
            type: "p",
            text: "Madvert Labs does not quote a universal response-time rule, because the effect differs by industry, price and channel. The honest approach is to measure it: record the response time for every lead in the CRM, then compare how often leads close in each response-time band. That shows what speed is worth in your own business.",
          },
          { type: "h3", text: "Lead scoring, explained honestly", id: "lead-scoring" },
          {
            type: "p",
            text: "**Lead scoring** assigns points or a grade to each lead based on who they are and what they have done, so the team knows whom to call first. A scoring model is only as good as the data behind it. Without enough closed deals to compare against, points are guesses that look precise.",
          },
          {
            type: "list",
            items: [
              "Start with rules, not points: a lead either meets the must-have criteria or it does not.",
              "Add a small number of weighted signals (company size, order quantity, urgency) once there are enough closed deals to check them against.",
              "Review the model against actual outcomes every few months and remove signals that do not predict sales.",
              "Keep the score visible to the sales team, with the reasons, so they can challenge it.",
            ],
          },
          {
            type: "p",
            text: "Speed-to-lead, scoring and routing are part of a [lead qualification system](/glossary#lead-qualification-system). Madvert Labs builds these inside the client's CRM through [CRM and Automation](/services/automation-revenue-systems).",
          },
        ],
      },
      {
        id: "example",
        label: "Example",
        title: "Example: why the cheaper campaign can cost more",
        blocks: [
          {
            type: "callout",
            label: "Example",
            text: [
              "The numbers below are round, illustrative figures chosen to show the arithmetic. They are not client results.",
            ],
          },
          {
            type: "table",
            caption: "Example: two campaigns with the same budget",
            rowHeader: "Example figure",
            columns: ["Campaign A", "Campaign B"],
            highlight: 1,
            rows: [
              { label: "Ad spend", cells: ["PKR 100,000", "PKR 100,000"] },
              { label: "Total leads", cells: ["1,000", "250"] },
              { label: "Cost per lead (CPL)", cells: ["PKR 100", "PKR 400"] },
              { label: "Qualified leads", cells: ["50", "100"] },
              { label: "Qualification rate", cells: ["5%", "40%"] },
              { label: "Cost per qualified lead (CPQL)", cells: ["PKR 2,000", "PKR 1,000"] },
            ],
          },
          {
            type: "p",
            text: "Judged on CPL, Campaign A looks four times better. Judged on CPQL, Campaign B costs half as much per lead worth calling, and the sales team makes 250 calls instead of 1,000 to reach twice as many qualified buyers. The [Cost Per Qualified Lead Calculator](/tools/cost-per-qualified-lead-calculator) runs the same arithmetic on your own numbers.",
          },
        ],
      },
      {
        id: "mistakes",
        label: "Common mistakes",
        title: "Common mistakes when moving to qualified leads",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Calling a lead “qualified” without written criteria.** If sales and marketing each use their own definition, the qualified-lead count means nothing.",
              "**Judging campaigns on CPL alone.** A low CPL with a low qualification rate can produce a higher CPQL than a campaign that looks expensive.",
              "**Adding so many form questions that genuine buyers leave.** Ask only what sales needs to decide whether to call, and ask the rest on the call.",
              "**Treating qualification as a one-off filter.** Criteria should be reviewed against which leads actually became customers.",
              "**Ignoring response time.** A qualified lead that waits a day for a reply may have already spoken to a competitor.",
              "**Not sending results back to the ad platforms.** Without qualified-lead or sales data, the platforms keep optimising for form fills.",
            ],
          },
        ],
      },
      {
        id: "decision",
        label: "Decision criteria",
        title: "When plain lead generation is enough, and when it is not",
        blocks: [
          { type: "h3", text: "Plain lead generation can be enough when" },
          {
            type: "checklist",
            items: [
              { text: "The offer is low-priced and the decision is simple.", detail: "Sorting leads on a short call costs less than filtering them up front." },
              { text: "The sales team can contact every lead quickly.", detail: "Volume is only a problem when it exceeds the team's capacity." },
              { text: "Almost anyone who enquires is a potential customer.", detail: "For example a broad consumer service in a single city." },
            ],
          },
          { type: "h3", text: "Qualified lead generation is worth it when" },
          {
            type: "checklist",
            items: [
              { text: "Each sale is high-value or the sales cycle is long.", detail: "Sales time per lead is expensive, so filtering pays for itself." },
              { text: "The business quotes against RFQs.", detail: "Every quote costs estimating time, so unqualified RFQs have a real cost." },
              { text: "Sales capacity is limited.", detail: "A small team needs its calls focused on the buyers most likely to close." },
              { text: "Buyers are in another country.", detail: "Cross-border buyers need checking for budget, timeline and seriousness before the team invests in them." },
            ],
          },
        ],
      },
    ],
    proof: {
      title: "Qualified lead generation in real Madvert Labs campaigns",
      intro:
        "These case studies used a qualification step before leads reached sales. Figures are shown exactly as they appear in each case study, with the source and limitations on the full write-up. A Dubai real estate company received 142 BANT-qualified investor leads at a cost per lead of AED 4.17. A Pakistan-based bookkeeping company received 35 qualified inquiries at $57.51 per qualified inquiry on $2,012.70 ad spend; that case study does not report how many inquiries became customers.",
      items: [
        {
          slug: "dubai-real-estate-nigeria",
          metric: "BANT-Qualified Investor Leads",
          note: "Every lead was screened against Budget, Authority, Need and Timeline, then delivered to the client's CRM with its qualification data.",
        },
        {
          slug: "bookkeeping-appointments",
          metric: "Cost Per Qualified Inquiry",
          note: "Qualification questions in the funnel filtered for serious business owners before appointments were booked.",
        },
        {
          slug: "cellsol-energy",
          metric: "Qualified Leads/Day",
          note: "A solar brand (figures in Pakistani rupees) where, according to the case study, lead quality was high enough that the client expanded its sales team.",
        },
      ],
    },
    faqs: [
      {
        q: "What is the difference between a lead and a qualified lead?",
        a: "A lead is anyone who enquires. A qualified lead is an enquiry that meets criteria the business has written down in advance, such as a real need, budget, decision-making authority and a near-term timeframe. The difference is whether the enquiry passed a check the sales team agrees with.",
      },
      {
        q: "How do I calculate cost per qualified lead?",
        a: "Divide ad spend by the number of qualified leads in the same period. For example, PKR 100,000 spend and 100 qualified leads gives a CPQL of PKR 1,000. The [Cost Per Qualified Lead Calculator](/tools/cost-per-qualified-lead-calculator) also shows CPL, qualification rate and cost per closed deal.",
      },
      {
        q: "Will qualifying leads reduce my lead volume?",
        a: "Usually yes, and that is often the point: fewer enquiries that sales can act on. If volume drops below what the sales team can use, the criteria or the form questions are too strict and should be loosened. Track qualified leads and closed deals, not total leads, to judge the change.",
      },
      {
        q: "What is a good qualification rate?",
        a: "There is no universal benchmark, because the rate depends on how strict your criteria are, the offer and the channel. A more useful test is whether CPQL and cost per closed deal are falling over time while the sales team has enough qualified conversations.",
      },
      {
        q: "Is BANT the only way to qualify leads?",
        a: "No. BANT (budget, authority, need, timeline) is a common starting point and was used in Madvert Labs' Dubai real estate campaign. Some businesses use their own criteria, such as order quantity for manufacturers or service area for local businesses. What matters is that the criteria are written down and checked against which leads actually buy.",
      },
      {
        q: "Does Madvert Labs run qualified lead generation for businesses in Pakistan?",
        a: "Yes. Madvert Labs works with established businesses in Pakistan first and with international businesses as well, through [Client Acquisition](/services/client-acquisition), paid campaigns and the CRM follow-up that qualifies and routes each lead.",
      },
    ],
    related: [
      {
        href: "/tools/cost-per-qualified-lead-calculator",
        anchor: "Cost Per Qualified Lead Calculator",
        note: "Work out CPL, CPQL, qualification rate and cost per closed deal from your own campaign numbers.",
      },
      {
        href: "/glossary#qualified-lead",
        anchor: "Glossary: qualified lead, speed-to-lead and lead scoring",
        note: "Short, self-contained definitions of the terms used in this article.",
      },
      {
        href: "/resources/qualified-lead-generation-playbook",
        anchor: "Qualified Lead Generation Playbook",
        note: "The free Madvert Vault playbook on building demand that sales can act on.",
      },
      {
        href: "/services/client-acquisition",
        anchor: "Client Acquisition",
        note: "How Madvert Labs builds qualified demand across paid social, paid search, SEO and AI search.",
      },
      {
        href: "/services/meta-ads",
        anchor: "Meta Ads Lead Generation",
        note: "Facebook and Instagram campaigns with lead capture and qualification built in.",
      },
      {
        href: "/services/automation-revenue-systems",
        anchor: "CRM and Automation",
        note: "Lead routing, WhatsApp and email follow-up and reporting that keep qualified leads moving.",
      },
    ],
    cta: {
      title: "Want Leads Your Sales Team",
      accent: "Is Glad to Call?",
      body: "Bring your current lead numbers to a Business Strategy Call. Madvert Labs will look at how leads are captured, qualified and followed up, and where the system is leaking.",
      label: "Book a Free Strategy Call",
    },
  },
  {
    slug: "meta-ads-lead-generation-pakistan",
    title: "Meta Ads Lead Generation in Pakistan: How to Get Leads That Actually Buy",
    metaTitle: "Meta Ads Lead Generation in Pakistan",
    description:
      "How Pakistani businesses get Meta leads that buy: lead forms vs website funnels, qualifying questions, fast WhatsApp follow-up, Urdu and English creative, CAPI.",
    eyebrow: "Meta Ads Insight",
    answer: [
      "Meta Ads lead generation in Pakistan works when four things are designed together: an offer worth enquiring about, a lead capture step that asks two or three qualifying questions, a WhatsApp or phone response within the same working session, and tracking that tells Meta which leads became customers. Cheap leads on their own are easy to buy; leads that buy come from the whole system.",
      "The right choice between Meta instant forms and a website funnel depends on the price of the offer, how much explaining it needs and how quickly the sales team can respond. Both can work, and Madvert Labs has real Pakistani campaigns on each side.",
    ],
    author: "founder",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    sections: [
      {
        id: "why",
        label: "Why this matters",
        title: "Why so many Meta leads in Pakistan never buy",
        blocks: [
          {
            type: "p",
            text: "Facebook and Instagram reach most of the people an established Pakistani business wants to sell to. That reach is also the problem. An instant form that takes two taps to submit will be submitted by curious people, people who misread the offer and people who wanted a price for something else.",
          },
          {
            type: "p",
            text: "The usual symptoms are familiar: a sales team calling numbers that do not answer, a WhatsApp inbox full of “price?” messages, and an owner who concludes that “Facebook leads are fake”. In most accounts the leads are real people. What is missing is a filter before the lead arrives and a fast, useful response after it does.",
          },
          {
            type: "p",
            text: "Meta's delivery system learns from the events it is told to count. If every form submission is reported as success, Meta finds more people who submit forms. If the business reports which leads were qualified or became customers, Meta has a better signal. That is why [Meta Ads Lead Generation](/services/meta-ads) at Madvert Labs is judged on [cost per qualified lead](/glossary#cost-per-qualified-lead), not on cost per lead alone.",
          },
        ],
      },
      {
        id: "framework",
        label: "Framework",
        title: "A five-part framework for Meta leads that buy",
        blocks: [
          {
            type: "diagram",
            label: "Meta lead generation as one system",
            steps: [
              { name: "Offer", text: "A specific reason to enquire now: a programme, a site survey, a free sample, a fixed-price package." },
              { name: "Creative", text: "Hooks and visuals in the language the buyer actually uses, tested in several angles." },
              { name: "Capture", text: "An instant form or a website page that asks the questions sales needs answered." },
              { name: "Follow-up", text: "WhatsApp or a call while the enquiry is fresh, with the lead's answers in front of the person replying." },
              { name: "Feedback", text: "Pixel, Conversions API and CRM outcomes sent back so Meta learns which leads matter." },
            ],
          },
          { type: "h3", text: "Lead forms vs website funnels", id: "lead-forms-vs-website" },
          {
            type: "table",
            caption: "Meta instant forms vs website landing pages",
            rowHeader: "Factor",
            columns: ["Meta instant form", "Website landing page"],
            rows: [
              { label: "Friction", cells: ["Low: details are pre-filled from the Meta profile", "Higher: the page has to load and persuade"] },
              { label: "Room to explain", cells: ["Short intro and a few questions", "Full page: proof, pricing logic, FAQs, video"] },
              { label: "Typical lead quality risk", cells: ["Accidental or low-intent submissions", "Fewer leads if the page is slow or unclear"] },
              { label: "Tracking", cells: ["Leads stay inside Meta unless synced to a CRM", "Needs the pixel and ideally the Conversions API"] },
              { label: "Fits best", cells: ["Clear, simple offers and a team that calls fast", "Higher-priced or complex offers, and online purchases"] },
            ],
            note: "Instant forms offer a “higher intent” form type that adds a review step before submission. It usually reduces volume and often improves quality; test it against the standard form on your own offer.",
          },
          { type: "h3", text: "Qualification questions that do not kill volume", id: "qualifying-questions" },
          {
            type: "p",
            text: "Two to four questions are usually enough. Each question should map to something the sales team uses to decide whether to call. Multiple-choice answers work better than free text on mobile.",
          },
          {
            type: "list",
            items: [
              "**Need:** “Which programme are you interested in?” or “What do you need solar for: home, shop or agriculture?”",
              "**Location or service area:** “Which city or area is the property in?” for businesses that only serve part of Pakistan.",
              "**Timing:** “When do you want to start?” with options such as this month, in one to three months, just researching.",
              "**Budget or size:** a range rather than an exact figure, or a proxy such as order quantity for manufacturers.",
            ],
          },
          { type: "h3", text: "WhatsApp follow-up speed", id: "whatsapp-follow-up" },
          {
            type: "p",
            text: "Most Pakistani buyers prefer to continue a conversation on WhatsApp. A lead who submitted a form at 10pm and hears nothing until the next afternoon has often spoken to a competitor. [Speed-to-lead](/glossary#speed-to-lead) matters, but only when the first reply is useful: greet the person by name, confirm what they asked for, and ask the next qualifying question. Madvert Labs does not quote a universal response-time rule; record response times in the CRM and compare close rates by response band to see what speed is worth in your business. [CRM and Automation](/services/automation-revenue-systems) can send the first WhatsApp or email reply automatically outside working hours and route the lead to the right salesperson.",
          },
          { type: "h3", text: "Urdu, English or Roman Urdu creative", id: "language" },
          {
            type: "p",
            text: "There is no single right language. Test it. English often suits B2B, premium and export-facing offers; Urdu or Roman Urdu often feels more natural for local consumer offers and for audiences outside the largest cities. Many strong ads mix them, for example an English headline with a Roman Urdu hook. Keep the form questions in the same language as the ad, so the buyer does not switch context at the moment of enquiry.",
          },
          { type: "h3", text: "Pixel and Conversions API basics", id: "pixel-capi" },
          {
            type: "list",
            items: [
              "**Meta Pixel:** a browser script on the website that reports events such as page views, leads and purchases.",
              "**Conversions API (CAPI):** a server-side connection that sends the same events from the website or CRM, so fewer are lost to browser restrictions and ad blockers.",
              "**Deduplication:** when both are used, each event carries the same event ID so Meta counts it once.",
              "**CRM outcomes:** for instant forms, sending lead stages (qualified, booked, won) back to Meta lets campaigns optimise towards leads that progress, not just submissions.",
            ],
          },
        ],
      },
      {
        id: "example",
        label: "Example",
        title: "Example: the same budget, two different follow-up systems",
        blocks: [
          {
            type: "callout",
            label: "Example",
            text: ["The figures below are round, illustrative numbers chosen to show the arithmetic. They are not client results."],
          },
          {
            type: "table",
            caption: "Example: one campaign, two follow-up processes",
            rowHeader: "Example figure",
            columns: ["Slow, manual follow-up", "Qualifying form + fast WhatsApp"],
            highlight: 1,
            rows: [
              { label: "Ad spend", cells: ["PKR 50,000", "PKR 50,000"] },
              { label: "Leads", cells: ["500", "300"] },
              { label: "Cost per lead", cells: ["PKR 100", "PKR 167"] },
              { label: "Leads reached", cells: ["200", "270"] },
              { label: "Qualified after first conversation", cells: ["30", "90"] },
              { label: "Cost per qualified lead", cells: ["PKR 1,667", "PKR 556"] },
            ],
          },
          {
            type: "p",
            text: "The second process looks worse on cost per lead and far better on cost per qualified lead, because the form filtered at capture and the team reached most people while they still remembered the ad. Run your own figures through the [Cost Per Qualified Lead Calculator](/tools/cost-per-qualified-lead-calculator).",
          },
        ],
      },
      {
        id: "mistakes",
        label: "Common mistakes",
        title: "Common mistakes in Meta lead generation",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Optimising for the cheapest lead.** A campaign rewarded only on CPL will drift towards the easiest people to convert, not the best buyers.",
              "**A form with no questions.** Name and phone number alone tell the sales team nothing about fit.",
              "**Leads left in a spreadsheet.** If leads are downloaded once a day, the fastest competitor wins the conversation.",
              "**One creative, one angle.** Without several hooks and formats, there is nothing to learn from when results change.",
              "**No pixel, no CAPI, no CRM feedback.** Meta cannot learn what a good lead looks like if nobody tells it.",
            ],
          },
          {
            type: "p",
            text: "The free [Meta Ads Pre-Launch Checklist](/resources/meta-ads-pre-launch-checklist) covers the setup checks that catch most of these before money is spent.",
          },
        ],
      },
      {
        id: "decision",
        label: "Decision criteria",
        title: "When to use instant forms, and when to send traffic to a website",
        blocks: [
          { type: "h3", text: "Start with Meta instant forms when" },
          {
            type: "checklist",
            items: [
              { text: "The offer is easy to understand in one image or a short video.", detail: "A class, a consultation, a site survey or a simple package." },
              { text: "The team can respond on WhatsApp or by phone within the same working session.", detail: "Instant forms rely on speed to turn low friction into conversations." },
              { text: "A website landing page does not exist yet or converts poorly on mobile.", detail: "Forms let a campaign start while the page is improved." },
            ],
          },
          { type: "h3", text: "Use a website funnel when" },
          {
            type: "checklist",
            items: [
              { text: "The product is sold online and paid for at checkout.", detail: "Purchases need the website, the pixel and ideally the Conversions API." },
              { text: "The offer is higher-priced or needs proof before someone enquires.", detail: "A page can carry case studies, pricing logic and answers to objections." },
              { text: "Form leads are plentiful but rarely qualify.", detail: "A page adds useful friction and lets buyers self-select. See [Conversion](/services/conversion) for how Madvert Labs builds these pages." },
            ],
          },
        ],
      },
    ],
    proof: {
      title: "Meta campaigns for Pakistani businesses",
      intro:
        "These are real Madvert Labs campaigns, each with its own offer, audience and budget, so the figures describe those campaigns only and are not market averages. In the TAP Center fitness campaign, Meta instant forms produced 145 Meta leads at PKR 29.41 on PKR 4,265 spend. In a sample Cellsol Energy solar campaign, direct lead ads produced 569 leads at Rs. 9.12 on Rs. 5,186.94 spend. For Earthly Elementals, a website funnel produced 162 website purchases at Rs 844.57 per purchase on Rs136,820.57 spend.",
      items: [
        {
          slug: "tap-center-fitness",
          metric: "Cost Per Meta Lead",
          note: "Instant forms with programme-specific offers for MMA, gymnastics and fitness classes, and no website funnel.",
        },
        {
          slug: "cellsol-energy",
          metric: "Cost Per Lead",
          note: "Direct lead ads for solar with property-owner targeting and optimised follow-up. According to the case study, the client expanded its sales team.",
        },
        {
          slug: "earthly-elementals",
          metric: "Cost Per Purchase",
          note: "A website funnel: creative testing, creator content and a conversion-focused product page for a private label health brand.",
        },
      ],
    },
    faqs: [
      {
        q: "Are Facebook lead forms or a website better for leads in Pakistan?",
        a: "Neither is better in every case. Instant forms create less friction and suit clear, simple offers when the team can respond quickly. A website suits online purchases, higher-priced offers and buyers who need proof first. Many accounts test both and judge them on cost per qualified lead, not cost per lead.",
      },
      {
        q: "How many questions should a Meta lead form have?",
        a: "Usually two to four beyond contact details, each linked to a decision the sales team makes, such as need, location, timing or budget range. Multiple-choice answers keep the form quick on mobile. If volume drops below what sales can handle, remove the least useful question.",
      },
      {
        q: "Why are my Meta leads not answering the phone?",
        a: "Common causes are slow follow-up, a form that was too easy to submit by accident, an unclear offer and calls from unknown numbers. A prompt WhatsApp message confirming what the person asked for often gets a better response than a cold call the next day.",
      },
      {
        q: "Do I need the Meta Conversions API?",
        a: "For website campaigns it is strongly recommended, because browser tracking alone misses some events. For instant form campaigns, the more useful step is sending CRM lead stages back to Meta so campaigns can learn which leads progressed. Both need consent-aware setup and correct deduplication.",
      },
      {
        q: "Should Meta ads in Pakistan be in Urdu or English?",
        a: "Test both. English often suits B2B and premium offers, while Urdu or Roman Urdu often reads more naturally for local consumer offers. Mixing them in one ad is common and can work well. Keep the form in the same language as the ad.",
      },
      {
        q: "Does Madvert Labs run Meta Ads for businesses in Pakistan?",
        a: "Yes. Madvert Labs works with established businesses in Pakistan first, from its Karachi office, and with international clients as well. The [Meta Ads Lead Generation](/services/meta-ads) service covers offer, creative, targeting, lead capture, qualification and the follow-up system.",
      },
    ],
    related: [
      { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation", note: "Facebook and Instagram campaigns built to produce sales conversations, not just form fills." },
      { href: "/insights/meta-ads-cost-pakistan", anchor: "How much do Meta Ads cost in Pakistan?", note: "What drives CPM and cost per lead, and how to set a test budget." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost Per Qualified Lead Calculator", note: "Turn spend, leads and qualification rate into CPQL and cost per closed deal." },
      { href: "/resources/meta-ads-pre-launch-checklist", anchor: "Meta Ads Pre-Launch Checklist", note: "The setup checks to run before a Meta campaign spends its first rupee." },
      { href: "/services/automation-revenue-systems", anchor: "CRM and Automation", note: "WhatsApp follow-up, lead routing and CRM feedback to Meta." },
      { href: "/glossary#qualified-lead", anchor: "Glossary: qualified lead", note: "What makes an enquiry qualified, defined in one place." },
    ],
    cta: {
      title: "Getting Meta Leads",
      accent: "That Never Buy?",
      body: "Bring your current Meta results to a Business Strategy Call. Madvert Labs will review the offer, the form, the follow-up and the tracking, and show where qualified leads are being lost.",
      label: "Book a Free Strategy Call",
    },
  },
  {
    slug: "meta-ads-cost-pakistan",
    title: "How Much Do Meta Ads Cost in Pakistan?",
    metaTitle: "Meta Ads Cost in Pakistan: CPM, CPL and Budget",
    description:
      "Meta Ads in Pakistan have no fixed price. What drives CPM and cost per lead, how to set a test budget with simple formulas, and why CPQL matters more than CPL.",
    eyebrow: "Meta Ads Insight",
    answer: [
      "Meta Ads in Pakistan have no fixed price. Facebook and Instagram ads are sold in an auction, so the cost of reaching people (CPM) and the cost of each lead or sale change with the audience, the creative, the offer, the season, the campaign objective and whether leads come through an instant form or a website.",
      "A business sets its own budget, and Meta spends it to find the cheapest results it can within the chosen objective. The useful question is not “what does a lead cost?” but “how much can I afford to pay for a qualified lead or a customer?”, and then whether a test budget is large enough to find out.",
    ],
    author: "founder",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    sections: [
      {
        id: "why",
        label: "Why this matters",
        title: "Why there is no honest single price",
        blocks: [
          {
            type: "p",
            text: "Any article that states “the average cost per lead in Pakistan is X” is mixing very different campaigns: a fitness class and an industrial solar system, a Karachi audience and a national one, Ramadan and a quiet month. Madvert Labs does not publish market averages, because no single figure would describe your campaign.",
          },
          {
            type: "p",
            text: "Meta's auction does not simply sell to the highest bidder. Meta describes the winning ad as the one with the highest total value, combining the advertiser's bid, the estimated chance that the person will take the desired action, and ad quality. In practice that means a relevant, well-made ad for a strong offer can reach people for less than a weak ad from a competitor with a bigger budget.",
          },
        ],
      },
      {
        id: "drivers",
        label: "Framework",
        title: "What drives Meta Ads costs",
        blocks: [
          {
            type: "definition",
            term: "CPM, CPL and CPQL",
            id: "cpm-cpl-cpql",
            definition:
              "CPM (cost per mille) is the cost of 1,000 impressions. CPL (cost per lead) is ad spend divided by leads. CPQL (cost per qualified lead) is ad spend divided by the leads that met the business's written qualification criteria.",
            more: [
              "CPM describes what attention costs; CPL describes how well the ad and form convert that attention; CPQL describes whether the leads are worth calling. See the [glossary entry for CPQL](/glossary#cost-per-qualified-lead).",
            ],
          },
          {
            type: "table",
            caption: "What moves Meta Ads costs, and how",
            rowHeader: "Driver",
            columns: ["What it mainly affects", "What to do about it"],
            rows: [
              { label: "Audience", cells: ["CPM: narrow, high-demand audiences cost more to reach", "Start broader with clear creative; narrow only with evidence"] },
              { label: "Creative", cells: ["Click-through and conversion rate, and so CPL", "Test several hooks, formats and languages; refresh fatigued ads"] },
              { label: "Offer", cells: ["How many people respond at all", "Make the reason to enquire specific and time-bound"] },
              { label: "Season", cells: ["CPM rises when many advertisers compete", "Plan for Ramadan, Eid, 11.11, year-end sales and the end of quarters"] },
              { label: "Objective", cells: ["Who Meta shows the ad to", "Choose leads or sales, not reach or engagement, when leads are the goal"] },
              { label: "Form vs website", cells: ["CPL and lead quality together", "Compare on CPQL, not CPL"] },
              { label: "Tracking quality", cells: ["How well Meta learns", "Use the pixel, the Conversions API and CRM feedback"] },
            ],
          },
          {
            type: "p",
            text: "Billing is a cost too. Ads are paid in the ad account's currency, which is set when the account is created. Depending on the payment method and currency, a bank may add foreign transaction charges or taxes, so check the true cost on a statement before calculating CPL.",
          },
        ],
      },
      {
        id: "budget",
        label: "Budget",
        title: "How to set a Meta Ads test budget",
        blocks: [
          {
            type: "p",
            text: "A test budget has one job: to buy enough results to make a decision. Meta's own guidance is that an ad set needs roughly 50 optimisation events within a week to leave the learning phase. That is a useful planning reference, not a requirement for every test. Three simple formulas do most of the work.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Affordable cost per qualified lead** = average gross profit per sale × qualified-to-sale rate.",
              "**Test budget** = number of qualified leads you need to judge the test × expected CPQL.",
              "**Daily budget** = test budget ÷ number of days in the test.",
            ],
          },
          {
            type: "callout",
            label: "Example",
            text: [
              "Illustrative numbers, not client results or market averages.",
              "A business makes PKR 40,000 gross profit per sale and closes 1 in 5 qualified leads. Its affordable CPQL is PKR 40,000 × 0.2 = PKR 8,000. It wants 30 qualified leads to judge two creatives and guesses a CPQL of PKR 2,000, so the test budget is 30 × PKR 2,000 = PKR 60,000, or PKR 3,000 a day over 20 days.",
              "If the test finishes with a CPQL of PKR 3,500, the campaign is still well under the affordable PKR 8,000 and is worth improving. If the CPQL is PKR 10,000, the offer, creative, form or follow-up needs to change before more money is spent.",
            ],
          },
          {
            type: "p",
            text: "The [Cost Per Qualified Lead Calculator](/tools/cost-per-qualified-lead-calculator) works through the same numbers, including cost per closed deal.",
          },
        ],
      },
      {
        id: "cpql",
        label: "Why CPQL",
        title: "Why CPQL matters more than CPL",
        blocks: [
          {
            type: "p",
            text: "CPL rewards whatever is easiest to submit. A campaign can halve its CPL by removing every question from the form and still produce fewer customers. CPQL ties the ad spend to the leads the sales team agrees are worth calling, so it moves only when the system actually improves.",
          },
          {
            type: "table",
            caption: "Example: lower CPL, higher CPQL",
            rowHeader: "Example figure",
            columns: ["Form without questions", "Form with three questions"],
            highlight: 1,
            rows: [
              { label: "Ad spend", cells: ["PKR 60,000", "PKR 60,000"] },
              { label: "Leads", cells: ["600", "240"] },
              { label: "CPL", cells: ["PKR 100", "PKR 250"] },
              { label: "Qualified leads", cells: ["24", "60"] },
              { label: "CPQL", cells: ["PKR 2,500", "PKR 1,000"] },
            ],
            note: "Example figures for illustration only.",
          },
        ],
      },
      {
        id: "mistakes",
        label: "Common mistakes",
        title: "Common budgeting mistakes",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Comparing your CPL with someone else's.** Another campaign's offer, audience and follow-up are not yours.",
              "**Spreading a small budget over many ad sets.** Each ad set gets too few results to learn from or to judge.",
              "**Judging a test after two days.** Early results swing; decide on the number of qualified leads, not the calendar.",
              "**Changing the campaign every day.** Significant edits can restart learning and make the numbers impossible to read.",
              "**Choosing reach or engagement to save money.** Cheap impressions and likes are not leads.",
              "**Ignoring the sales side.** If half the leads are never contacted, the real CPQL is double what the dashboard implies.",
            ],
          },
        ],
      },
      {
        id: "decision",
        label: "Decision criteria",
        title: "Is your Meta budget working?",
        blocks: [
          {
            type: "checklist",
            items: [
              { text: "You know your affordable CPQL.", detail: "Gross profit per sale × qualified-to-sale rate." },
              { text: "Every lead is marked qualified or not in a CRM or sheet.", detail: "Without this, CPQL cannot be calculated." },
              { text: "Each test reached enough qualified leads to compare.", detail: "Decide the number before the test starts." },
              { text: "CPQL is below the affordable figure, or falling towards it.", detail: "If not, change the offer, creative, form or follow-up before raising spend." },
              { text: "Spend increases happen gradually, with CPQL checked after each step.", detail: "A higher budget usually reaches less responsive people as well." },
            ],
          },
          {
            type: "p",
            text: "If the numbers work, [Meta Ads Lead Generation](/services/meta-ads) can scale them; if leads arrive faster than the team can respond, start with [CRM and Automation](/services/automation-revenue-systems). For a wider view across channels, see [performance marketing](/services/performance-marketing).",
          },
        ],
      },
    ],
    proof: {
      title: "Real Meta campaign figures, with their context",
      intro:
        "These figures come from specific Madvert Labs campaigns and describe those campaigns only; they are not averages or predictions. In the TAP Center fitness campaign, Meta lead forms produced 145 Meta leads at PKR 29.41 on PKR 4,265 spend. In a sample Cellsol Energy solar campaign, 569 leads cost Rs. 9.12 each on Rs. 5,186.94 spend. In the Earthly Elementals e-commerce campaign, which optimised for purchases on a website, 162 website purchases cost Rs 844.57 each on Rs136,820.57 spend. A purchase and a form lead are different results, so the figures are not comparable with each other.",
      items: [
        { slug: "tap-center-fitness", metric: "Cost Per Meta Lead", note: "In this campaign: instant forms, programme-specific fitness offers and a small spend." },
        { slug: "cellsol-energy", metric: "Cost Per Lead", note: "In this sample campaign: agricultural solar, direct lead ads and property-owner targeting." },
        { slug: "earthly-elementals", metric: "Cost Per Purchase", note: "In this campaign: website purchases for a private label health product, not form leads." },
      ],
    },
    faqs: [
      {
        q: "What is the minimum budget for Meta Ads in Pakistan?",
        a: "Meta allows very small daily budgets, but the useful minimum is the budget that buys enough results to make a decision. Multiply the number of qualified leads you need to judge a test by the CPQL you expect. A budget that produces only a handful of leads cannot tell a good campaign from a bad one.",
      },
      {
        q: "What is a good cost per lead on Facebook in Pakistan?",
        a: "There is no universal good CPL. A good figure is one where cost per qualified lead stays below what a qualified lead is worth to your business, which is roughly gross profit per sale multiplied by the share of qualified leads that buy.",
      },
      {
        q: "Why did my Meta Ads cost suddenly go up?",
        a: "Common causes are seasonal competition (for example around Ramadan, Eid and year-end sales), creative fatigue, a narrower audience, a change of objective or significant edits that restarted learning. Check CPM, click-through rate and conversion rate separately to see which stage changed.",
      },
      {
        q: "Are Meta lead forms cheaper than website leads?",
        a: "Lead forms often show a lower CPL because they are easier to submit. Whether they are cheaper per qualified lead depends on the offer, the questions in the form and how quickly the team follows up. Compare the two on CPQL.",
      },
      {
        q: "Should I boost posts or use Ads Manager?",
        a: "Boosting is quick, but Ads Manager gives control over the objective, placements, audiences, forms and testing. For lead generation or sales, structured campaigns in Ads Manager are usually the better choice.",
      },
    ],
    related: [
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost Per Qualified Lead Calculator", note: "Work out CPL, CPQL and cost per closed deal from your own numbers." },
      { href: "/insights/meta-ads-lead-generation-pakistan", anchor: "Meta Ads lead generation in Pakistan", note: "Lead forms vs websites, qualifying questions and WhatsApp follow-up." },
      { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation", note: "Facebook and Instagram campaigns judged on qualified leads." },
      { href: "/resources/meta-ads-pre-launch-checklist", anchor: "Meta Ads Pre-Launch Checklist", note: "Catch setup and tracking problems before they cost money." },
      { href: "/glossary#cost-per-qualified-lead", anchor: "Glossary: cost per qualified lead", note: "A short, self-contained definition of CPQL." },
    ],
    cta: {
      title: "Not Sure What Your Meta Budget",
      accent: "Should Be?",
      body: "Bring your margins and current results to a Business Strategy Call. Madvert Labs will work out an affordable CPQL with you and a test plan that can answer the question.",
      label: "Book a Free Strategy Call",
    },
  },
  {
    slug: "what-is-aeo",
    title: "What Is AEO? Answer Engine Optimization Explained for Pakistani Businesses",
    metaTitle: "What Is AEO? Answer Engine Optimization Explained",
    description:
      "AEO (answer engine optimisation) helps AI Overviews, ChatGPT Search, Copilot and Perplexity find, understand and cite a business. What works, what does not.",
    eyebrow: "AI Search Insight",
    answer: [
      "AEO (Answer Engine Optimisation, also spelt optimization) is the work of making a business's information easy for answer engines, such as Google AI Overviews, ChatGPT Search, Microsoft Copilot and Perplexity, to find, understand, trust and cite when someone asks a question.",
      "AEO is not a separate trick from SEO. It rests on the same foundations: pages that can be crawled and indexed, consistent facts about the business, direct answers to real buyer questions, and evidence that others can verify. No one can guarantee that an AI system will cite a particular business; good AEO makes it more likely and makes the business easier to describe accurately.",
    ],
    author: "founder",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    sections: [
      {
        id: "definitions",
        label: "Definitions",
        title: "AEO, AI SEO and SEO in plain terms",
        blocks: [
          {
            type: "definition",
            term: "Answer engine optimisation (AEO)",
            id: "aeo-definition",
            definition:
              "Answer engine optimisation is the practice of structuring accurate, useful content so that search and AI answer engines can extract a clear answer to a specific question and attribute it to the business that published it.",
            more: [
              "Madvert Labs treats AEO as part of [AI SEO](/glossary#ai-seo), which in turn builds on [SEO](/services/seo). The short definition also lives in the [glossary](/glossary#aeo).",
            ],
          },
          {
            type: "table",
            caption: "The main answer engines and where their information comes from",
            rowHeader: "Answer engine",
            columns: ["What it is", "What a business can check"],
            rows: [
              { label: "Google AI Overviews and AI Mode", cells: ["AI summaries inside Google Search, drawing on Google's index", "The page is indexed and eligible to show a snippet in Google Search"] },
              { label: "ChatGPT Search", cells: ["Web search inside ChatGPT, with linked sources", "robots.txt does not block OAI-SearchBot"] },
              { label: "Microsoft Copilot", cells: ["AI answers grounded in Bing search results", "The site is verified and indexed in Bing Webmaster Tools"] },
              { label: "Perplexity", cells: ["An answer engine that searches the web and shows citations", "robots.txt does not block PerplexityBot"] },
            ],
            note: "Each provider publishes its own crawler and publisher documentation. Check it directly, because names and controls change.",
          },
        ],
      },
      {
        id: "why",
        label: "Why this matters",
        title: "Why AEO matters for businesses in Pakistan",
        blocks: [
          {
            type: "p",
            text: "Buyers increasingly ask full questions instead of typing two keywords: “which agency in Karachi runs Meta ads for solar companies?” or “how much does a website cost in Pakistan?”. An answer engine replies with a summary and a few sources. A business that is not one of those sources may not be seen at all for that question, even if it ranks somewhere on page one.",
          },
          {
            type: "p",
            text: "AEO is also about accuracy. If a company's name, address, services and phone number differ between its website, Google Business Profile, Facebook page and directory listings, an AI system may describe it wrongly, merge it with another business or leave it out. Many Pakistani businesses have exactly this problem: an old number on one listing, a different spelling of the brand on another.",
          },
        ],
      },
      {
        id: "framework",
        label: "Framework",
        title: "How answer engines choose sources, and what a business can do",
        blocks: [
          {
            type: "p",
            text: "None of the providers publish a full formula for which sources they cite. What they do publish points in the same direction: the content has to be reachable by their crawler or search index, relevant to the question, and from a source that looks reliable. Google states that there are no extra technical requirements for AI Overviews beyond the normal requirements for Google Search.",
          },
          {
            type: "diagram",
            label: "Five layers of AEO",
            steps: [
              { name: "Crawlable", text: "Important pages return a 200 status, are not blocked in robots.txt, and show their text in the HTML rather than only after JavaScript runs." },
              { name: "Consistent", text: "The business name, address, phone, services and founder are the same on the website, Google Business Profile and every major listing." },
              { name: "Answer-first", text: "Each page answers its main question in the first sentences, then gives detail, a table or steps, and visible FAQs." },
              { name: "Evidenced", text: "Claims are backed by real case studies, named authors, dates and sources a reader can check." },
              { name: "Mentioned", text: "Genuine reviews, press, partner pages and industry listings describe the business in their own words." },
            ],
          },
          { type: "h3", text: "Crawlability and indexing", id: "crawlability" },
          {
            type: "list",
            items: [
              "Check robots.txt for rules that block Googlebot, Bingbot, OAI-SearchBot or PerplexityBot by accident.",
              "Verify the site in Google Search Console and Bing Webmaster Tools, submit a sitemap and fix indexing errors.",
              "Avoid nosnippet or very small max-snippet settings on pages you want quoted; Google applies these controls to AI features too.",
              "Make sure service pages, prices or pricing logic, and FAQs are in the server-rendered HTML, not hidden behind tabs that load later.",
            ],
          },
          { type: "h3", text: "Entity consistency, Google Business Profile and NAP", id: "entity-consistency" },
          {
            type: "p",
            text: "An entity is a thing a search system can identify: a company, a person, a place. Make the business easy to identify. Use one name, one address and one phone number (often shortened to NAP) everywhere. Complete the Google Business Profile with the correct category, services, hours and photos, and keep it in step with the website's contact page. Add Organization structured data that matches what is visible on the page, and link the official social profiles. For local queries in Karachi, Lahore or Islamabad, the Google Business Profile is often the first source Google trusts.",
          },
          { type: "h3", text: "Answer-first pages and evidence", id: "answer-first" },
          {
            type: "p",
            text: "Write each important page around the question a buyer actually asks. Put a direct, self-contained answer at the top, naming the subject instead of opening with “it” or “we”. Follow with the reasoning, a comparison table or process, a worked example and real proof. This article follows that structure. Evidence carries weight: a case study with specific figures, a named author, publication dates and honest limitations is easier to trust and to quote than general claims.",
          },
          { type: "h3", text: "Reviews and mentions", id: "reviews-mentions" },
          {
            type: "p",
            text: "Ask real customers for reviews on Google and respond to them. Appear where your industry is discussed: association member lists, supplier directories, interviews, podcasts, partner case studies. These are signals a business cannot write about itself, which is exactly why they matter.",
          },
        ],
      },
      {
        id: "example",
        label: "Example",
        title: "Example: rewriting one service page answer-first",
        blocks: [
          {
            type: "callout",
            label: "Example",
            text: ["A hypothetical Lahore solar installer, used only to illustrate the structure."],
          },
          {
            type: "table",
            caption: "Example: before and after an answer-first rewrite",
            rowHeader: "Page element",
            columns: ["Before", "After"],
            highlight: 1,
            rows: [
              { label: "H1", cells: ["Welcome to the Future of Energy", "Commercial Solar Installation in Lahore"] },
              { label: "First paragraph", cells: ["We are passionate about a greener tomorrow", "Who the installer serves, system sizes offered, areas covered and what a site survey includes"] },
              { label: "Pricing", cells: ["“Contact us for price”", "What changes the price (system size, batteries, roof type), with a clear way to get a quote"] },
              { label: "Proof", cells: ["Stock photos", "Named projects with photos, system size and dates, used with permission"] },
              { label: "FAQs", cells: ["None", "Five real questions from sales calls, answered visibly on the page"] },
              { label: "Entity details", cells: ["Phone number differs from Google Business Profile", "Same name, address and number as the profile and listings"] },
            ],
          },
        ],
      },
      {
        id: "mistakes",
        label: "What not to do",
        title: "AEO myths and tactics to avoid",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Relying on llms.txt.** llms.txt is a proposed file format, not an accepted standard. Google has said its search systems do not use it, and no major answer engine has said it uses the file to choose citations. It does no harm, but it is not a substitute for crawlable pages.",
              "**Hidden text or AI-only content.** Text hidden from people but shown to crawlers breaks search engine spam policies and can remove a site from results.",
              "**Fake or padded FAQs.** FAQs should answer questions buyers actually ask, be visible on the page, and match any FAQ structured data exactly.",
              "**Schema that describes what is not on the page.** Reviews, ratings or awards in structured data must be real and visible.",
              "**Prompt-injection tricks.** Instructions aimed at AI systems inside a page are manipulative and can damage trust in the whole site.",
              "**Mass-produced pages.** Hundreds of near-identical city or keyword pages are thin content, whoever or whatever writes them.",
              "**Anyone promising guaranteed AI citations.** No provider offers a way to buy or guarantee organic citations.",
            ],
          },
        ],
      },
      {
        id: "decision",
        label: "Decision criteria",
        title: "Where to start, and when to get help",
        blocks: [
          { type: "h3", text: "Do these yourself first" },
          {
            type: "checklist",
            items: [
              { text: "Claim and complete the Google Business Profile.", detail: "Correct category, services, hours, photos and the same phone number as the website." },
              { text: "Verify the site in Google Search Console and Bing Webmaster Tools.", detail: "Both are free and show indexing problems directly." },
              { text: "Check robots.txt for accidental blocks.", detail: "Including the crawlers used by ChatGPT Search and Perplexity, if you want to appear there." },
              { text: "Rewrite the top three service pages answer-first.", detail: "Direct answer, detail, proof, visible FAQs." },
            ],
          },
          { type: "h3", text: "Bring in specialist help when" },
          {
            type: "checklist",
            items: [
              { text: "The site is large or built with a JavaScript framework that may hide text from crawlers." },
              { text: "Business details are inconsistent across many listings and profiles." },
              { text: "You need structured data, internal linking and content planned as one system.", detail: "This is the work of [AI SEO and Answer Engine Optimisation](/services/ai-seo-aeo) at Madvert Labs, alongside [SEO](/services/seo)." },
            ],
          },
          {
            type: "p",
            text: "The free [SEO and AI search playbook](/resources/seo-ai-search-playbook) covers both sides in more depth.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between AEO and SEO?",
        a: "SEO improves how a business is found and ranked in search results. AEO focuses on making content easy for answer engines to quote and attribute as a direct answer. They share the same foundations, so AEO without good SEO rarely works.",
      },
      {
        q: "Can anyone guarantee my business will be cited by ChatGPT or Google AI Overviews?",
        a: "No. The providers decide which sources to show and do not sell organic citations. A business can improve its chances by being crawlable, consistent, clear and well evidenced, and by earning genuine mentions elsewhere.",
      },
      {
        q: "Do I need an llms.txt file?",
        a: "It is optional. llms.txt is a proposal, not an accepted standard, and Google has said its search systems do not use it. Time is better spent on crawlable pages, consistent business information and answer-first content.",
      },
      {
        q: "Does my Google Business Profile affect AI answers?",
        a: "It helps Google identify the business and its location, and AI features in Google Search draw on Google's understanding of the business. Keep the name, address, phone number, category and services accurate and consistent with the website.",
      },
      {
        q: "How long does AEO take to show results?",
        a: "Technical fixes such as unblocking crawlers can matter as soon as pages are recrawled. Content, reviews and mentions take longer to build. Track impressions in Google Search Console and Bing Webmaster Tools, and note when AI answers mention the business, rather than expecting a fixed timeline.",
      },
      {
        q: "Does Madvert Labs offer AEO for businesses in Pakistan?",
        a: "Yes. [AI SEO and Answer Engine Optimisation](/services/ai-seo-aeo) is offered to businesses in Pakistan and internationally. It covers crawlability, entity information, answer-first content, structured data and evidence, with no guarantee of citations.",
      },
    ],
    related: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and Answer Engine Optimisation", note: "How Madvert Labs makes businesses easier for AI search to find, understand and cite." },
      { href: "/glossary#aeo", anchor: "Glossary: AEO", note: "A short, self-contained definition of answer engine optimisation." },
      { href: "/services/seo", anchor: "SEO", note: "Technical health, useful content and authority building for Google and Bing." },
      { href: "/resources/seo-ai-search-playbook", anchor: "Get Found on Google. Get Discovered by AI.", note: "The free playbook on search and AI discovery." },
      { href: "/glossary#ai-seo-vs-traditional-seo", anchor: "AI SEO vs traditional SEO", note: "A side-by-side comparison of what changes and what stays the same." },
    ],
    cta: {
      title: "Want AI Search to Describe",
      accent: "Your Business Accurately?",
      body: "Book a Business Strategy Call. Madvert Labs will review how your business appears in search and AI answers, and what to fix first.",
      label: "Book a Free Strategy Call",
    },
  },
  {
    slug: "performance-marketing-vs-digital-marketing",
    title: "Performance Marketing vs Digital Marketing: What Is the Difference?",
    metaTitle: "Performance Marketing vs Digital Marketing",
    description:
      "Digital marketing covers every online channel; performance marketing is the part paid for and judged by measurable results. When each one fits a business.",
    eyebrow: "Growth Strategy Insight",
    answer: [
      "Digital marketing is all marketing done through digital channels: website, search, social media, content, email, WhatsApp and paid advertising. Performance marketing is the part of digital marketing that is planned, paid for and judged by measurable actions such as leads, sales, bookings or qualified enquiries.",
      "Every performance marketing campaign is digital marketing, but not all digital marketing is performance marketing. Brand content, organic social and SEO build demand over time; performance marketing turns demand into measurable results now. Most established businesses need both, connected in one growth system.",
    ],
    author: "founder",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    sections: [
      {
        id: "definitions",
        label: "Definitions",
        title: "Definitions and the key differences",
        blocks: [
          {
            type: "definition",
            term: "Performance marketing",
            id: "performance-marketing",
            definition:
              "Performance marketing is marketing where spend is tied to measurable actions, such as a lead, a purchase or a booked call, and where campaigns are continually adjusted based on the cost and quality of those actions.",
            more: [
              "It usually runs on paid channels such as [Meta Ads](/services/meta-ads) and [Google Ads](/services/google-ads), and depends on tracking, landing pages and follow-up. Madvert Labs offers it as [performance marketing](/services/performance-marketing).",
            ],
          },
          {
            type: "definition",
            term: "Digital marketing",
            id: "digital-marketing",
            definition:
              "Digital marketing is any marketing activity carried out through digital channels, including websites, search engines, social media, content, email, messaging apps and online advertising, whether its goal is awareness, trust or direct response.",
            more: [
              "[Full Stack Digital Marketing](/services/digital-marketing) at Madvert Labs runs these channels together as an outsourced marketing department. The term is defined in the [glossary](/glossary#full-stack-digital-marketing).",
            ],
          },
          {
            type: "table",
            caption: "Performance marketing vs digital marketing",
            rowHeader: "Factor",
            columns: ["Performance marketing", "Digital marketing"],
            highlight: 0,
            rows: [
              { label: "Scope", cells: ["Measurable, action-focused campaigns", "Every digital channel and activity"] },
              { label: "Main goal", cells: ["Leads, sales, bookings, qualified enquiries", "Awareness, trust, engagement and results"] },
              { label: "Typical channels", cells: ["Meta Ads, Google Ads, other paid media, conversion pages", "Website, SEO, AI search, social, content, email, WhatsApp, paid media"] },
              { label: "Main metrics", cells: ["CPL, CPQL, cost per purchase, return on ad spend", "Reach, engagement, search visibility, plus performance metrics"] },
              { label: "Time to results", cells: ["Days to weeks once tracking is right", "Weeks to months for organic channels"] },
              { label: "Stops when spend stops", cells: ["Mostly yes", "Organic assets keep working"] },
              { label: "Main risk", cells: ["Chasing cheap results that do not turn into revenue", "Activity without clear commercial measurement"] },
            ],
          },
        ],
      },
      {
        id: "why",
        label: "Why this matters",
        title: "Why the difference matters when hiring help",
        blocks: [
          {
            type: "p",
            text: "In Pakistan, both labels are used loosely. A “digital marketing agency” may only post on social media; a “performance marketing agency” may only run ads and leave the follow-up to the client. Asking which outcome a partner is responsible for, and how it will be measured, matters more than the label.",
          },
          {
            type: "p",
            text: "Performance marketing without brand, content and a working website often hits a ceiling: costs rise because the ads must do all the persuading. Digital marketing without performance measurement often produces activity no one can connect to revenue. The difference tells you what to ask for, and what is missing.",
          },
        ],
      },
      {
        id: "framework",
        label: "Framework",
        title: "How they fit into one growth system",
        blocks: [
          {
            type: "diagram",
            label: "Where performance marketing sits in a growth system",
            steps: [
              { name: "Brand and content", text: "Digital marketing builds recognition and trust: social content, SEO, AI search visibility, creative." },
              { name: "Demand capture", text: "Performance marketing turns attention into enquiries and purchases with paid campaigns and offers." },
              { name: "Conversion", text: "Landing pages, forms and checkout turn clicks into leads and sales." },
              { name: "Follow-up", text: "CRM, WhatsApp and email make sure every lead gets a timely response." },
              { name: "Measurement", text: "Qualified leads, sales and revenue are fed back to channels and to the next plan." },
            ],
          },
          {
            type: "p",
            text: "A [growth system](/glossary#growth-system) treats these as one design rather than separate vendors. The performance layer is where results show up first, but its costs depend on the other layers: better creative and a clearer offer lower CPL, a faster [CRM and Automation](/services/automation-revenue-systems) setup raises the share of leads that buy, and [SEO](/services/seo) and [AI SEO](/services/ai-seo-aeo) reduce dependence on paid traffic over time.",
          },
        ],
      },
      {
        id: "example",
        label: "Example",
        title: "Example: one business, two plans",
        blocks: [
          {
            type: "callout",
            label: "Example",
            text: [
              "A hypothetical Karachi home furniture brand used to illustrate the choice. No figures are client results.",
              "**Plan A, performance only:** Meta and Google campaigns send traffic to product pages and WhatsApp. Results arrive within weeks. When the brand pauses ads during a slow month, enquiries drop almost to zero, and every new campaign starts from cold audiences.",
              "**Plan B, performance inside digital marketing:** the same campaigns run, supported by regular product content, an improved website, a complete Google Business Profile and search-friendly category pages. Paid campaigns still produce most early sales, while organic search, returning customers and social followers gradually add enquiries that do not depend on the ad budget.",
            ],
          },
        ],
      },
      {
        id: "mistakes",
        label: "Common mistakes",
        title: "Common mistakes",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Calling social media posting “digital marketing” and stopping there.** Posting is one channel, not a strategy.",
              "**Running ads before tracking works.** Without the pixel, conversion tracking and lead outcomes, performance marketing is guesswork.",
              "**Judging brand work on next week's sales.** Content and SEO compound; measure them on visibility and assisted enquiries.",
              "**Judging performance campaigns on clicks or CPL alone.** Measure [cost per qualified lead](/tools/cost-per-qualified-lead-calculator) and sales.",
              "**Hiring separate vendors who never speak.** The ads team, website developer and sales team need one shared view of the numbers.",
            ],
          },
        ],
      },
      {
        id: "decision",
        label: "Decision criteria",
        title: "Which one does your business need?",
        blocks: [
          { type: "h3", text: "Start with performance marketing when" },
          {
            type: "checklist",
            items: [
              { text: "The offer is proven and the business needs more enquiries or sales now." },
              { text: "There is a sales team or WhatsApp process ready to respond quickly." },
              { text: "Tracking is in place, or can be set up before spend starts.", detail: "See [performance marketing](/services/performance-marketing)." },
            ],
          },
          { type: "h3", text: "Start with broader digital marketing when" },
          {
            type: "checklist",
            items: [
              { text: "The brand, website or offer is not ready to convert paid traffic." },
              { text: "The business has no consistent presence on search, social or Google Business Profile." },
              { text: "Leadership wants one team accountable for strategy, channels and reporting.", detail: "See [Full Stack Digital Marketing](/services/digital-marketing)." },
            ],
          },
          {
            type: "p",
            text: "The free [Growth Systems Audit](/resources/growth-systems-audit) helps identify which layer is weakest before choosing.",
          },
        ],
      },
    ],
    proof: {
      title: "Performance results inside wider systems",
      intro:
        "These Madvert Labs campaigns were judged on measurable actions, and each also relied on offer, creative or website work beyond the ads. Earthly Elementals combined creative strategy, creator content and a conversion-focused product page; that campaign produced 162 website purchases at Rs 844.57 per purchase. In a sample Cellsol Energy solar campaign, offer work and direct lead ads produced 569 leads at Rs. 9.12. For a Dubai luxury interior design company, Meta campaigns produced 111 qualified inquiries at AED 93.02 per inquiry. Each figure describes that campaign only.",
      items: [
        { slug: "earthly-elementals", metric: "Cost Per Purchase", note: "Performance campaigns supported by creative strategy, creator content and landing page optimisation." },
        { slug: "cellsol-energy", metric: "Cost Per Lead", note: "Offer creation, creative and targeting working with lead follow-up." },
        { slug: "dubai-interior-design", metric: "Cost Per Inquiry", note: "An international campaign judged on qualified inquiries rather than raw leads." },
      ],
    },
    faqs: [
      {
        q: "Is performance marketing the same as paid advertising?",
        a: "Not exactly. Paid advertising is a channel. Performance marketing is an approach: spend is tied to measurable actions and adjusted on their cost and quality. Most performance marketing uses paid ads, but it also includes the landing pages, tracking and follow-up that decide whether ads produce results.",
      },
      {
        q: "Which is better for a small or new business?",
        a: "If the offer is proven and the team can follow up quickly, performance marketing produces measurable results faster. If the website, brand or offer is not ready, spending on ads first usually wastes budget; fix the foundations through broader digital marketing first.",
      },
      {
        q: "Does performance marketing include SEO?",
        a: "SEO is usually counted as organic digital marketing because results are not bought per action. It can still be measured by performance metrics such as leads from organic search. Many businesses run SEO and paid campaigns together.",
      },
      {
        q: "How should performance marketing be measured?",
        a: "By the cost and quality of the actions that matter: cost per qualified lead, cost per purchase, sales and, where revenue data is available, return on ad spend. Clicks, reach and CPL are useful diagnostics, not goals.",
      },
      {
        q: "Does Madvert Labs offer both?",
        a: "Yes. Madvert Labs offers [performance marketing](/services/performance-marketing) and [Full Stack Digital Marketing](/services/digital-marketing) for established businesses in Pakistan and international clients, and connects them through CRM, automation and reporting.",
      },
    ],
    related: [
      { href: "/services/performance-marketing", anchor: "Performance Marketing", note: "Paid campaigns, conversion and tracking judged on measurable results." },
      { href: "/services/digital-marketing", anchor: "Full Stack Digital Marketing", note: "An outsourced marketing department running every channel as one team." },
      { href: "/growth-systems", anchor: "Growth Systems", note: "How brand, demand, conversion, follow-up and data connect." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost Per Qualified Lead Calculator", note: "Measure campaigns on qualified leads, not just leads." },
      { href: "/resources/growth-systems-audit", anchor: "Growth Systems Audit", note: "Find the weakest layer before choosing where to invest." },
    ],
    cta: {
      title: "Not Sure Which Kind of Marketing",
      accent: "Your Business Needs?",
      body: "Book a Business Strategy Call. Madvert Labs will look at your offer, channels, website and follow-up, and recommend where to start.",
      label: "Book a Free Strategy Call",
    },
  },
  {
    slug: "how-to-choose-digital-marketing-agency-karachi",
    title: "How to Choose a Digital Marketing Agency in Karachi (2026 Guide)",
    metaTitle: "How to Choose a Digital Marketing Agency in Karachi",
    description:
      "A practical checklist for choosing a digital marketing agency in Karachi: proof to ask for, first call questions, contract terms and red flags to avoid.",
    eyebrow: "Buyer's Guide",
    answer: [
      "To choose a digital marketing agency in Karachi, check five things: published proof with real numbers and their limits, a clear diagnosis of your business before any proposal, reporting on qualified leads and sales rather than clicks, ownership of your ad accounts and data, and a verifiable office and team you can meet.",
      "Avoid agencies that guarantee results, quote a price before understanding the business, or keep your ad accounts in their own name. A short paid pilot with agreed measures is a safer start than a long contract.",
    ],
    author: "founder",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    sections: [
      {
        id: "decide-first",
        label: "Before you search",
        title: "Decide what you need before comparing agencies",
        blocks: [
          {
            type: "p",
            text: "Karachi has hundreds of agencies, freelancers and studios, and most of them describe themselves the same way. Comparing them is easier once the business knows which problem it is buying a solution for.",
          },
          {
            type: "table",
            caption: "Match the problem to the type of help",
            rowHeader: "If the main problem is",
            columns: ["Look for"],
            rows: [
              { label: "Not enough enquiries", cells: ["[Performance marketing](/services/performance-marketing) or [Meta Ads lead generation](/services/meta-ads) with proof in lead generation"] },
              { label: "Plenty of leads, few sales", cells: ["Lead qualification, follow up and [CRM and automation](/services/automation-revenue-systems), not more ad spend"] },
              { label: "People search but do not find you", cells: ["[SEO](/services/seo) and [AI SEO and AEO](/services/ai-seo-aeo) for Google, ChatGPT and Copilot"] },
              { label: "The brand looks weaker than competitors", cells: ["[Branding and Marketing](/services/branding-marketing) and creative production"] },
              { label: "Several of the above, and no in-house team", cells: ["[Full Stack Digital Marketing](/services/digital-marketing): one team accountable for the whole system"] },
            ],
          },
        ],
      },
      {
        id: "checklist",
        label: "Checklist",
        title: "Seven checks before you sign",
        blocks: [
          {
            type: "checklist",
            label: "Agency selection checklist",
            items: [
              { text: "Published case studies with real numbers, the spend behind them and what they do not show.", detail: "A screenshot of a cheap cost per lead without spend, dates or lead quality proves little. See how [Madvert Labs case studies](/case-studies) state their limits." },
              { text: "A diagnosis before a proposal.", detail: "A good agency asks about your offer, margins, sales process and follow up before naming a budget or a channel." },
              { text: "Measurement on qualified leads and sales, not clicks or reach.", detail: "Ask how they define a qualified lead. The [cost per qualified lead calculator](/tools/cost-per-qualified-lead-calculator) shows why it matters." },
              { text: "You own the ad accounts, pixel, website and CRM data.", detail: "Accounts should sit in your Business Manager and Google Ads account, with the agency added as a partner." },
              { text: "A named team and a real address you can visit.", detail: "Check the Google Business Profile, the founder's LinkedIn and whether the address matches across sites." },
              { text: "Clear reporting rhythm and access.", detail: "Weekly or fortnightly reports, live dashboards and direct access to the person running the account." },
              { text: "Honest answers about what will not work.", detail: "An agency that says no to part of your plan is usually more useful than one that agrees with everything." },
            ],
          },
        ],
      },
      {
        id: "questions",
        label: "First call",
        title: "Questions to ask on the first call",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Which of your published results is closest to my business, and what was the spend, the market and the time period?",
              "How will you decide whether a lead is qualified, and who checks it?",
              "What happens to a lead in the first five minutes after it arrives?",
              "Which numbers will you report every week, and which one decides whether we continue?",
              "Who will actually run my account, and can I speak to them directly?",
              "What do you need from my team to make this work?",
              "If we stop working together, what do I keep?",
            ],
          },
        ],
      },
      {
        id: "red-flags",
        label: "Red flags",
        title: "Red flags when hiring an agency in Karachi",
        blocks: [
          {
            type: "list",
            items: [
              "**Guaranteed results**, such as a fixed number of leads or a promised return on ad spend. No agency controls the market, your price or your sales team.",
              "**A price before a conversation.** Packages sold by number of posts or ads say little about outcomes.",
              "**Ad accounts in the agency's name.** If the relationship ends, the history and audiences go with them.",
              "**Results without context.** A cost per lead with no spend, date, market or lead quality cannot be compared.",
              "**Long lock-in contracts** before any pilot has shown how the team works.",
              "**Reporting on reach and likes only** when the goal is enquiries or sales.",
            ],
          },
          {
            type: "callout",
            label: "A safer way to start",
            text: [
              "Agree a defined pilot, usually one offer and one or two channels, with the measures written down in advance: cost per qualified lead, speed of follow up and booked calls or sales. Decide on a longer engagement once the pilot has real numbers.",
            ],
          },
        ],
      },
      {
        id: "madvert",
        label: "Disclosure",
        title: "Where Madvert Labs fits",
        blocks: [
          {
            type: "p",
            text: "This guide is written by Madvert Labs, a digital marketing and growth systems company with an office in [Bahria Town Karachi](/digital-marketing-agency-karachi). Use the checklist on any agency, including this one. Madvert Labs publishes its [case studies](/case-studies) with spend and limitations, keeps ad accounts in the client's name and judges work by qualified leads and sales. It may not be the right fit for a business that only wants posting packages or the lowest monthly fee.",
          },
        ],
      },
    ],
    proof: {
      title: "What published proof looks like",
      intro:
        "These are examples of case studies that state the result, the spend and the market. For a Dubai real estate company, Madvert Labs generated 142 BANT-qualified investor leads at AED 4.17 CPL. Earthly Elementals recorded 162 website purchases at Rs 844.57 per purchase. Each figure describes one campaign only and is not a benchmark.",
      items: [
        { slug: "dubai-real-estate-nigeria", metric: "Cost Per Lead", note: "Qualification criteria and CRM delivery are described in full." },
        { slug: "earthly-elementals", metric: "Cost Per Purchase", note: "Website purchases for a Pakistani health brand, with total spend shown." },
        { slug: "cellsol-energy", metric: "Cost Per Lead", note: "A sample solar campaign in Pakistan, labelled as a sample." },
      ],
    },
    faqs: [
      {
        q: "How much does a digital marketing agency in Karachi cost?",
        a: "There is no standard price. Fees depend on scope (one channel or a full team), the work involved in creative and tracking, and the ad budget, which is paid separately to Meta or Google. Compare proposals on what is included and how results will be measured, not on the monthly fee alone.",
      },
      {
        q: "Should I hire a freelancer or an agency?",
        a: "A freelancer can suit one well defined task, such as running a single ad account. An agency suits a business that needs strategy, creative, ads, website and follow up to work together, or needs cover when one person is unavailable.",
      },
      {
        q: "How long before digital marketing shows results?",
        a: "Paid campaigns usually produce first data within the first weeks, and need further weeks of testing to improve cost and lead quality. SEO and AI search visibility build over months. Be cautious of anyone promising fixed results in a fixed time.",
      },
      {
        q: "Is it better to choose an agency based in Karachi?",
        a: "A local agency makes in-person meetings easier and understands local buyers, pricing and WhatsApp-led sales. Location matters less than proof, process and ownership of your accounts, so judge a Karachi agency by the same checklist as any other.",
      },
      {
        q: "What should be in a digital marketing agency contract?",
        a: "The scope of work, deliverables, reporting frequency, the measures that define success, who owns the ad accounts, pixel, content and data, notice period, and what happens to assets if the engagement ends.",
      },
    ],
    related: [
      { href: "/digital-marketing-agency-karachi", anchor: "Madvert Labs in Karachi", note: "Services, office address and how the Karachi team works." },
      { href: "/case-studies", anchor: "Published case studies", note: "Real numbers, spend and limitations for each campaign." },
      { href: "/about/facts", anchor: "Company facts", note: "Verified facts about Madvert Labs in one place." },
      { href: "/tools/cost-per-qualified-lead-calculator", anchor: "Cost Per Qualified Lead Calculator", note: "Compare agencies on qualified leads, not raw leads." },
      { href: "/insights/performance-marketing-vs-digital-marketing", anchor: "Performance marketing vs digital marketing", note: "Which kind of help a business actually needs." },
    ],
    cta: {
      title: "Comparing Agencies?",
      accent: "Put Us Through the Same Checklist.",
      body: "Book a Business Strategy Call. Ask every question on this page and we will answer with published proof.",
      label: "Book a Free Strategy Call",
    },
  },
];

/** Published articles only. Every route, list, sitemap and feed reads from this. */
export const articles: Article[] = [...allArticles, ...october2026Articles].filter((a) => a.status !== "draft");

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function articlePath(a: Article) {
  return a.path ?? `/insights/${a.slug}`;
}
