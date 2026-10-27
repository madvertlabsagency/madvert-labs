import type { Metadata } from "next";
import { ArticleTemplate } from "@/components/article/ArticleTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { CpqlCalculator } from "@/components/tools/CpqlCalculator";
import { CPQL_CALCULATOR_PATH, type Article } from "@/content/articles";
import { organization } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const path = CPQL_CALCULATOR_PATH;

/*
 * Copy rules: the worked example uses round, illustrative numbers and is labelled "Example".
 * Real figures appear only through the case-study proof cards (values exactly as stored).
 */
const page: Article = {
  slug: "cost-per-qualified-lead-calculator",
  path,
  title: "Cost Per Qualified Lead Calculator",
  metaTitle: "Cost Per Qualified Lead (CPQL) Calculator",
  description:
    "Free cost per qualified lead calculator: enter ad spend, leads, qualified leads and closed deals to get CPL, CPQL, qualification rate and cost per closed deal.",
  eyebrow: "Free Tool",
  answer: [
    "Cost per qualified lead (CPQL) is ad spend divided by the number of leads that met a business's written qualification criteria in the same period. CPQL matters more than cost per lead (CPL) because CPL counts every enquiry, including people who will never buy, while CPQL measures what it costs to reach someone the sales team can actually sell to.",
    "The calculator below works out CPL, CPQL, qualification rate and, if you add closed deals, cost per closed deal and close rates.",
  ],
  author: "founder",
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
  crumbs: [
    { name: "Insights", path: "/insights" },
    { name: "Cost Per Qualified Lead Calculator", path },
  ],
  sections: [
    {
      id: "why",
      label: "Why this matters",
      title: "Why CPQL matters more than CPL",
      blocks: [
        {
          type: "p",
          text: "Cost per lead tells a business what it paid for an enquiry. It says nothing about whether that enquiry could ever become a customer. Two campaigns with the same budget can show very different CPLs and the opposite ranking on CPQL, because one attracts many people who were never going to buy.",
        },
        {
          type: "p",
          text: "CPQL keeps marketing and sales looking at the same number. It rewards campaigns, offers and forms that bring in people who fit, and it exposes cheap lead sources that only create work for the sales team. The word “qualified” has to mean something specific, so start with a written definition of a [qualified lead](/glossary#qualified-lead).",
        },
      ],
    },
    {
      id: "framework",
      label: "Formula",
      title: "The cost per qualified lead formula",
      blocks: [
        {
          type: "callout",
          label: "Formula",
          text: ["**CPQL = ad spend ÷ qualified leads**, for the same campaign and the same period."],
        },
        {
          type: "list",
          items: [
            "**Cost per lead (CPL)** = ad spend ÷ total leads.",
            "**Qualification rate** = qualified leads ÷ total leads × 100.",
            "**Cost per closed deal** = ad spend ÷ closed deals.",
            "**Lead-to-close rate** = closed deals ÷ total leads × 100.",
            "**Qualified-to-close rate** = closed deals ÷ qualified leads × 100.",
          ],
        },
        {
          type: "p",
          text: "CPQL and CPL are linked: CPQL equals CPL divided by the qualification rate. A campaign with a higher CPL can still have a lower CPQL if a much larger share of its leads qualify.",
        },
        { type: "h3", text: "What to count as ad spend and as qualified" },
        {
          type: "p",
          text: "Use the media spend reported by the ad platform for the period. If you want the full cost of acquisition, run the calculation a second time with agency fees and creative costs added, and label the two figures clearly. Count a lead as qualified only when it met criteria written down before the campaign ran, such as budget, need, authority and timeline.",
        },
      ],
    },
    {
      id: "example",
      label: "Example",
      title: "Example: working out CPQL step by step",
      blocks: [
        {
          type: "callout",
          label: "Example",
          text: [
            "Round, illustrative numbers chosen to show the arithmetic; they are not client results. Use “Load the example numbers” in the calculator to see the same figures.",
          ],
        },
        {
          type: "table",
          caption: "Example: one campaign over one month",
          rowHeader: "Example figure",
          columns: ["Input or result", "Working"],
          rows: [
            { label: "Ad spend", cells: ["PKR 100,000", "From the ad platform"] },
            { label: "Total leads", cells: ["400", "Every form fill, call and message"] },
            { label: "Qualified leads", cells: ["100", "Met the written criteria"] },
            { label: "Closed deals", cells: ["10", "Won from those leads"] },
            { label: "Cost per lead", cells: ["PKR 250.00", "100,000 ÷ 400"] },
            { label: "Cost per qualified lead", cells: ["PKR 1,000.00", "100,000 ÷ 100"] },
            { label: "Qualification rate", cells: ["25.00%", "100 ÷ 400 × 100"] },
            { label: "Cost per closed deal", cells: ["PKR 10,000.00", "100,000 ÷ 10"] },
            { label: "Lead-to-close rate", cells: ["2.50%", "10 ÷ 400 × 100"] },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      label: "Common mistakes",
      title: "Common mistakes when calculating CPQL",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Mixing periods.** Spend from one month and qualified leads from another make the figure meaningless. Use the same dates for every input.",
            "**Changing the definition of qualified mid-campaign.** If the criteria change, start a new comparison.",
            "**Counting duplicates.** The same person enquiring by form and by WhatsApp is one lead, not two.",
            "**Letting the ad platform decide what is qualified.** A platform “lead” is a form submission; qualification happens in your CRM or sales process.",
            "**Comparing CPQL across very different offers.** A qualified lead for a high-value service is worth more than one for a low-priced product, so compare CPQL against what a qualified lead is worth to you.",
          ],
        },
      ],
    },
    {
      id: "decision",
      label: "Decision criteria",
      title: "How to judge whether your CPQL is good",
      blocks: [
        {
          type: "p",
          text: "There is no universal good CPQL. A useful ceiling comes from your own numbers: the most you can afford to pay for a qualified lead is roughly the gross profit of an average deal multiplied by your qualified-to-close rate.",
        },
        {
          type: "checklist",
          items: [
            { text: "CPQL is below what a qualified lead is worth to you.", detail: "Average gross profit per deal × qualified-to-close rate gives a break-even CPQL." },
            { text: "The sales team has enough qualified conversations.", detail: "A very low CPQL with too few qualified leads may mean the targeting is too narrow." },
            { text: "CPQL is stable or falling as spend grows.", detail: "A sharp rise when budget increases often means the campaign has run out of the right audience." },
            { text: "Qualified leads are turning into closed deals.", detail: "If they are not, revisit the qualification criteria or the follow-up, not just the ads." },
          ],
        },
        {
          type: "p",
          text: "When CPQL is too high, the fix is often outside the ad account: a clearer offer, better qualifying questions, or faster follow-up. Madvert Labs works on those parts together through [Client Acquisition](/services/client-acquisition), [Meta Ads lead generation](/services/meta-ads), [Google Ads lead generation](/services/google-ads) and [CRM and Automation](/services/automation-revenue-systems).",
        },
      ],
    },
  ],
  proof: {
    title: "Qualified-lead costs from real Madvert Labs campaigns",
    intro:
      "These case studies report costs for qualified leads, exactly as stated in each case study. The bookkeeping campaign reports $57.51 per qualified inquiry on $2,012.70 ad spend; the Dubai real estate campaign reports 142 BANT-qualified investor leads at a cost per lead of AED 4.17. Each full write-up lists the source of the figures and their limitations.",
    items: [
      { slug: "bookkeeping-appointments", metric: "Cost Per Qualified Inquiry", note: "International traffic, filtered by qualification questions before appointments were booked." },
      { slug: "dubai-real-estate-nigeria", metric: "BANT-Qualified Investor Leads", note: "Every lead screened against Budget, Authority, Need and Timeline, then delivered to the CRM." },
    ],
  },
  faqs: [
    {
      q: "What is the difference between CPL and CPQL?",
      a: "CPL (cost per lead) divides ad spend by every lead. CPQL (cost per qualified lead) divides the same spend by only the leads that met your qualification criteria. CPQL is always equal to or higher than CPL, and it is the better guide to what marketing really costs per sales opportunity.",
    },
    {
      q: "Should ad spend include agency fees?",
      a: "Use media spend for comparing campaigns and channels, because fees do not change between them. For the full cost of acquiring a customer, add agency fees and creative costs and calculate again, labelling the figure clearly.",
    },
    {
      q: "What if I do not track closed deals yet?",
      a: "Leave Closed deals empty. The calculator still shows CPL, CPQL and qualification rate. Tracking which leads close, ideally in a CRM, is the step that turns CPQL into a decision about profit.",
    },
    {
      q: "Does the currency selector convert between currencies?",
      a: "No. The currency selector only changes how results are displayed. Enter all amounts in the currency you choose; no exchange rates are applied.",
    },
    {
      q: "Is my data stored or sent anywhere?",
      a: "No. The calculation runs in your browser and the numbers you enter are not sent to Madvert Labs or stored.",
    },
  ],
  related: [
    {
      href: "/insights/lead-generation-vs-qualified-lead-generation",
      anchor: "Lead Generation vs Qualified Lead Generation",
      note: "How the two approaches differ, with a worked comparison of CPL and CPQL.",
    },
    { href: "/glossary#qualified-lead", anchor: "Glossary: qualified lead", note: "A self-contained definition of a qualified lead and a qualified RFQ." },
    { href: "/services/meta-ads", anchor: "Meta Ads Lead Generation", note: "Facebook and Instagram campaigns built to produce sales conversations, not just form fills." },
    { href: "/services/google-ads", anchor: "Google Ads Lead Generation", note: "Search campaigns that capture people already looking for the service." },
    { href: "/services/client-acquisition", anchor: "Client Acquisition", note: "Qualified demand across paid social, paid search, SEO and AI search." },
    { href: "/services/automation-revenue-systems", anchor: "CRM and Automation", note: "Track qualified leads and closed deals so CPQL can be measured properly." },
  ],
  cta: {
    title: "Want a Lower Cost Per",
    accent: "Qualified Lead?",
    body: "Bring your CPL, CPQL and close-rate numbers to a Business Strategy Call. Madvert Labs will look at the offer, targeting, qualification and follow-up behind them.",
    label: "Book a Free Strategy Call",
  },
};

export const metadata: Metadata = pageMetadata({ title: page.metaTitle, description: page.description, path });

export default function CpqlCalculatorPage() {
  return (
    <>
      <ArticleTemplate article={page} afterAnswer={<CpqlCalculator />} schema="none" bookingContext="cpql_calculator" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: page.title,
          description: page.description,
          url: absoluteUrl(path),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          inLanguage: "en",
          publisher: { "@id": `${site.url}/#organization`, name: organization.name },
        }}
      />
    </>
  );
}
