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
  related: { href: string; anchor: string; note: string }[];
  cta: { title: string; accent?: string; body: string; label: string };
};

export const CPQL_CALCULATOR_PATH = "/tools/cost-per-qualified-lead-calculator";

export const articles: Article[] = [
  {
    slug: "lead-generation-vs-qualified-lead-generation",
    title: "Lead Generation vs Qualified Lead Generation",
    metaTitle: "Lead Generation vs Qualified Lead Generation: The Difference",
    description:
      "Lead generation produces enquiries; qualified lead generation produces enquiries that meet written buying criteria. How they differ, how to measure CPQL and when each fits.",
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
      label: "Book Your Business Strategy Call",
    },
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function articlePath(a: Article) {
  return a.path ?? `/insights/${a.slug}`;
}
