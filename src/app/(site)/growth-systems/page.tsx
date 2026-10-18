import type { Metadata } from "next";
import Link from "next/link";
import { BookingSection } from "@/components/booking/BookingSection";
import { ComparisonTable } from "@/components/facts/ComparisonTable";
import { DefinitionBlock } from "@/components/facts/DefinitionBlock";
import { ExpertQuote } from "@/components/facts/ExpertQuote";
import { FAQ } from "@/components/facts/FAQ";
import { ProcessSteps } from "@/components/facts/ProcessSteps";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProofCards } from "@/components/service-page/ProofCards";
import { RelatedLinks } from "@/components/service-page/RelatedLinks";
import { RelatedResources } from "@/components/service-page/RelatedResources";
import { plain, Rich } from "@/components/service-page/Rich";
import { SpSection } from "@/components/service-page/SpSection";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { founder, getServiceEntity, type ServiceKey } from "@/lib/entities";
import { pageMetadata, schema } from "@/lib/seo";
import { site } from "@/lib/site";
import { FinalCta } from "@/sections/shared/FinalCta";
import "@/styles/service-page.css";

const entity = getServiceEntity("growth-systems");
const path = entity.path;
const title = "What Is a Growth System?";
const description =
  "A growth system connects brand, demand generation, conversion, follow up, data and technology into one measured system. What it includes, how it differs from separate vendors and how to build one.";

/** Visible on the page and mirrored in the Article schema. Update dateModified when the copy changes. */
const datePublished = "2026-10-18";
const dateModified = "2026-10-18";
const formatDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const metadata: Metadata = pageMetadata({ title: "What Is a Growth System? Definition, Components and Examples", description, path, type: "article" });

const components: { name: string; text: string; key?: ServiceKey }[] = [
  { name: "Brand", text: "How the business looks, sounds and communicates. Brand decides whether attention turns into trust before anyone speaks to sales.", key: "branding-marketing" },
  { name: "Demand generation", text: "Paid social, paid search, SEO and AI search that bring the right people to the business, judged by the quality of the opportunities rather than raw volume.", key: "client-acquisition" },
  { name: "Creative", text: "The ads, videos and content that earn attention in the first seconds and explain the value clearly.", key: "studios" },
  { name: "Conversion", text: "Websites, landing pages, offers, forms and booking journeys that turn traffic into enquiries and booked calls.", key: "conversion" },
  { name: "Follow up and CRM", text: "Response, qualification, nurture, booking and pipeline management that keep each enquiry moving towards a decision.", key: "automation-revenue-systems" },
  { name: "Data and measurement", text: "Tracking that follows each enquiry from its source to a booked call and, where possible, to revenue, so decisions are based on what actually produced customers." },
  { name: "Technology", text: "Custom tools, integrations, apps and AI agents for the moments when growth needs something off-the-shelf software does not provide.", key: "tech-product-development" },
];

const signs = [
  "Leads arrive, but the sales team says they are the wrong people.",
  "Enquiries wait hours or days for a first reply.",
  "Each agency or freelancer reports success while revenue stays flat.",
  "Nobody can say which marketing produced last month's customers.",
  "The business looks smaller online than it really is.",
  "The team still does repetitive work by hand that software could do.",
];

const steps = [
  { name: "Diagnose", text: "Review the business, the offer, the channels, the website, the follow up and the data to find where growth is actually getting stuck. Diagnosis comes before prescription." },
  { name: "Build", text: "Build the missing or weakest parts first, whether that is the offer, the campaigns, the landing page, the CRM or a custom tool." },
  { name: "Connect", text: "Connect each part to the next: ads to pages written for them, forms to the CRM, the CRM to fast follow up, and every step to tracking." },
  { name: "Compound", text: "Measure the whole chain, improve the weakest link and reinvest in what works, so each improvement makes the next one more valuable." },
];

const faqs = [
  {
    q: "Is a growth system the same as a marketing funnel?",
    a: "No. A funnel describes the steps a buyer takes towards a purchase. A growth system includes the funnel, but also the brand, creative, follow up, CRM, data and technology that make each step work, and the measurement that shows which step is failing.",
  },
  {
    q: "Does a smaller business need a growth system?",
    a: "A growth system does not have to be large. For a smaller business it may be one offer, one channel, one landing page, a CRM and automated follow up, connected and measured properly. Connecting the parts matters more than the number of parts.",
  },
  {
    q: "Do we have to replace our current agencies?",
    a: "Not necessarily. Some businesses keep specialists they trust and use Madvert Labs to design the system, fill the gaps and connect the parts. Others move everything to one team through [Full Stack Digital Marketing](/services/digital-marketing).",
  },
  {
    q: "How long does it take to build a growth system?",
    a: "It depends on what already exists and what is missing. Madvert Labs builds in priority order, so the parts that unlock growth fastest come first rather than waiting for everything to be finished.",
  },
  {
    q: "How do you measure whether a growth system is working?",
    a: "By qualified opportunities, conversion at each step, response speed and, where the data allows, revenue by source. The measures are agreed before work starts.",
  },
  {
    q: "Where should a business start?",
    a: "With a diagnosis. The free [Growth Systems Audit](/resources/growth-systems-audit) is a starting point, and a business strategy call goes into the specifics.",
  },
];

export default function GrowthSystemsPage() {
  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24">
          <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
          <GrowthRibbon shape="rise" spread={60} className="absolute -bottom-16 left-0 h-[260px] w-full" opacity={0.35} id="gs-ribbon" />
          <div className="container-x relative">
            <Breadcrumbs items={[{ name: entity.name, path }]} />
            <div className="mt-12 max-w-[860px] md:mt-16">
              <div data-reveal>
                <Eyebrow>Growth Systems</Eyebrow>
              </div>
              <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7">
                What Is a <span className="t-grad">Growth System?</span>
              </h1>
              <p data-reveal style={{ ["--reveal-delay" as string]: 100 }} className="sp-byline mt-7">
                <span>
                  By{" "}
                  <Link href={founder.path} rel="author">
                    {founder.name}
                  </Link>
                  , {founder.jobTitle}
                </span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>
                  Published <time dateTime={datePublished}>{formatDate(datePublished)}</time>
                </span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>
                  Updated <time dateTime={dateModified}>{formatDate(dateModified)}</time>
                </span>
              </p>
              <div data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="mt-8">
                <DefinitionBlock as="div" term="growth system" definition={entity.definition}>
                  <p>
                    The idea behind the Madvert Labs belief, “{site.belief}”, is that each part only performs as well as the parts around it. A strong ad that sends people to a weak page, or a strong page that hands leads to slow follow up, stalls growth either way.
                  </p>
                  <p>This guide explains what a growth system contains, how it differs from hiring separate vendors, the signs a business needs one and how Madvert Labs builds them.</p>
                </DefinitionBlock>
              </div>
              <nav data-reveal style={{ ["--reveal-delay" as string]: 200 }} aria-label="On this page" className="mt-10">
                <p className="t-label">On this page</p>
                <ol className="mt-4 flex flex-wrap gap-2 text-[14px]">
                  {[
                    ["#components", "Components"],
                    ["#comparison", "Growth system vs separate vendors"],
                    ["#signs", "Signs you need one"],
                    ["#how-we-build", "How Madvert builds one"],
                    ["#examples", "Examples"],
                    ["#faq", "FAQs"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="inline-block rounded-full border border-line px-3.5 py-1.5 text-ink-2 transition-colors hover:border-line-strong hover:text-ink">
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </header>

        <SpSection
          id="components"
          label="Components"
          title="The seven components of a growth system"
          intro={<p>Every growth system is built around the specific business, but the same components appear in almost all of them. Each one links to the Madvert Labs service that builds it.</p>}
        >
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {components.map((c, i) => {
              const e = c.key ? getServiceEntity(c.key) : undefined;
              return (
                <li key={c.name} className="panel flex flex-col p-6 sm:p-7" data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
                  <span className="sp-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold text-ink">{c.name}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{c.text}</p>
                  {e ? (
                    <p className="mt-auto pt-5 text-[14.5px]">
                      <Link href={e.path} className="sp-inline-link">
                        {e.name}
                      </Link>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </SpSection>

        <SpSection
          id="comparison"
          label="Comparison"
          title="How a growth system differs from hiring separate vendors"
          intro={<p>Separate vendors each optimise their own part. A growth system is designed and measured as one chain, from the first impression to revenue.</p>}
        >
          <div data-reveal>
            <ComparisonTable
              caption="Separate vendors compared with a growth system"
              rowHeader="Consideration"
              columns={["Separate vendors", "A growth system"]}
              highlight={1}
              rows={[
                { label: "Starting point", cells: ["The service each vendor sells", "The business problem, diagnosed first"] },
                { label: "Ownership", cells: ["Each vendor owns its channel; nobody owns the journey", "One team owns the journey from attention to revenue"] },
                { label: "Data", cells: ["Separate reports with different definitions of a lead", "One set of measures, traced through to booked calls and revenue"] },
                { label: "When results drop", cells: ["Each vendor checks its own part", "The whole chain is checked: offer, ad, page, follow up and sales hand-off"] },
                { label: "Making changes", cells: ["Coordinated across several contracts", "Made once and reflected across every connected part"] },
                { label: "Measure of success", cells: ["Channel metrics such as clicks or cost per lead", "Qualified opportunities, conversion and revenue"] },
              ]}
              note="Separate specialists can be the right choice for a single, well-defined task. A growth system matters when the problem crosses marketing, sales follow up, data and technology."
            />
          </div>
        </SpSection>

        <SpSection id="signs" label="Diagnosis" title="Signs a business needs a growth system">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {signs.map((s) => (
              <li key={s} className="flex gap-3 rounded-2xl border border-line bg-glass p-5 text-[16px] leading-relaxed text-ink-2" data-reveal>
                <span className="sp-mark" aria-hidden="true">
                  !
                </span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[760px] text-[16.5px] leading-relaxed text-ink-2">
            Businesses rarely have one marketing problem. They have connected problems, and connected problems need connected thinking. If two or more of these signs sound familiar, the issue is probably the system rather than any single channel.
          </p>
        </SpSection>

        <SpSection
          id="how-we-build"
          label="Process"
          title="How Madvert Labs builds a growth system"
          intro={
            <p>
              Madvert Labs works in four stages: diagnose, build, connect, compound. The business problem comes before the channel, and work is delivered in priority order. For businesses that want one team to run everything, the same approach powers{" "}
              <Link href="/services/digital-marketing" className="sp-inline-link">
                Full Stack Digital Marketing
              </Link>
              .
            </p>
          }
        >
          <ProcessSteps steps={steps.map((s) => ({ name: s.name, text: <p>{s.text}</p> }))} className="xl:!grid-cols-4" />
        </SpSection>

        <section className="section-tight !py-[clamp(40px,5vw,72px)]" aria-label="From the founder">
          <div className="container-x">
            <div className="panel mx-auto max-w-[920px] p-8 sm:p-12" data-reveal>
              <ExpertQuote quote="The Channel Is Never More Important Than the Business Behind It." />
            </div>
          </div>
        </section>

        <SpSection
          id="examples"
          label="Examples"
          title="Growth systems in real campaigns"
          intro={
            <p>
              Each of these real case studies connected several parts of a growth system. The bookkeeping engagement linked market research, the offer, video creative, a qualification funnel and booked appointments; the Dubai real estate campaign linked the offer, creative, BANT qualification and delivery into the client&apos;s CRM.
            </p>
          }
        >
          <ProofCards slugs={["bookkeeping-appointments", "dubai-real-estate-nigeria", "home-improvement-uae", "agency-lead-generation"]} />
          <p className="mt-8 text-[15px] text-ink-3">
            Figures are shown exactly as reported in each case study. Past results do not guarantee future results.{" "}
            <Link href="/case-studies" className="sp-inline-link">
              See every case study
            </Link>
            .
          </p>
        </SpSection>

        <SpSection id="faq" label="Common questions" title="Growth systems: common questions">
          <div className="max-w-[860px]">
            <FAQ items={faqs.map((f) => ({ q: f.q, a: plain(f.a), answer: <p><Rich text={f.a} /></p> }))} withSchema />
          </div>
        </SpSection>

        <SpSection id="related" label="Related services" title="The services that make up a growth system">
          <RelatedLinks
            links={[
              { key: "digital-marketing", anchor: "One team for the whole system", note: "Full Stack Digital Marketing: an outsourced marketing department." },
              { key: "client-acquisition", anchor: "Qualified demand generation", note: "Paid social, paid search, SEO and AI search." },
              { key: "conversion", anchor: "Journeys that turn traffic into enquiries", note: "Websites, landing pages, offers and booking." },
              { key: "automation-revenue-systems", anchor: "Follow up that never goes cold", note: "CRM, WhatsApp and email automation, lead routing and reporting." },
              { key: "branding-marketing", anchor: "A brand worth trusting", note: "Strategy, identity and consistent marketing assets." },
              { href: "/services", anchor: "Everything Madvert Labs does", note: "All six pillars in one place." },
            ]}
          />
        </SpSection>

        <SpSection id="resources" label="Related resources" title="Free resources from the Madvert Vault">
          <RelatedResources slugs={["growth-systems-audit", "automated-lead-engine", "qualified-lead-generation-playbook"]} />
        </SpSection>
      </article>

      <FinalCta title="Growth Is a System." accent="Let Us Look at Yours." primary={{ label: site.founderCta.label, href: "#book" }} secondary={{ label: site.auditCta.label, href: site.auditCta.href }} />
      <BookingSection eyebrow="Next Step" context="growth-systems" />

      <JsonLd
        data={[
          {
            ...schema.article({ headline: title, description, path, datePublished }),
            dateModified,
            author: { "@id": `${site.url}/#founder` },
            mainEntityOfPage: `${site.url}${path}`,
            about: { "@type": "Thing", name: "Growth system", description: entity.definition },
          },
          schema.webPage(title, description, path),
        ]}
      />
    </>
  );
}
