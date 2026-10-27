import type { Metadata } from "next";
import Link from "next/link";
import { BookingSection } from "@/components/booking/BookingSection";
import { AnswerBlock } from "@/components/facts/AnswerBlock";
import { plain } from "@/components/service-page/Rich";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { pageDates } from "@/content/page-dates";
import { organization } from "@/lib/entities";
import { pageMetadata, schema } from "@/lib/seo";
import { site } from "@/lib/site";
import { FactSheet } from "@/sections/facts/FactSheet";
import { QuoteText } from "@/sections/facts/QuoteText";
import { companyAnswers } from "@/sections/facts/answers";
import { approvedDescriptions } from "@/sections/facts/data";
import "@/styles/service-page.css";
import "@/styles/facts-page.css";

/*
 * Company fact sheet for people, journalists, directories and AI answer engines. Only verified
 * facts (entities.ts, site.ts office, published case studies and resources). No founding year,
 * team size, client count, award or rating is stated, because none has been verified.
 */

const path = "/about/facts";
const title = `${organization.name}: Company Facts`;
const description = `Verified facts about ${organization.name}: what the company does, founder, Karachi office address, contact, services, published case studies and approved descriptions.`;
const updated = pageDates[path] ?? "2026-10-23";

export const metadata: Metadata = pageMetadata({ title: "Company Facts", description, path });

export default function FactsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-[calc(var(--header-h)+40px)] md:pb-14" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { name: "About Us", path: "/about" },
              { name: "Company Facts", path },
            ]}
          />
          <div className="mt-12 max-w-[860px] md:mt-14">
            <Eyebrow>Fact Sheet</Eyebrow>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.6vw,62px)]">
              {organization.name}: <span className="t-grad">Company Facts</span>
            </h1>
            <p className="t-lead measure mt-6">{approvedDescriptions.oneSentence}</p>
            <p className="mt-5 text-[14.5px] text-ink-3">
              This page lists only verified facts about {organization.name}. Last updated{" "}
              <time dateTime={updated}>{new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Company facts">
        <div className="container-x">
          <FactSheet updated={updated} />
        </div>
      </section>

      <section className="section-tight !pt-0" aria-labelledby="answers-title">
        <div className="container-x">
          <h2 id="answers-title" className="t-h1 max-w-[860px]">
            Questions About <span className="t-grad">{organization.name}</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {companyAnswers.map((a) => (
              <AnswerBlock key={a.id} {...a} />
            ))}
          </div>
          <JsonLd data={schema.faq(companyAnswers.map((a) => ({ q: a.question, a: plain(a.answer) })))} />
        </div>
      </section>

      <section className="section-tight !pt-0" aria-labelledby="describe-title">
        <div className="container-x">
          <h2 id="describe-title" className="t-h1 max-w-[860px]">
            How to Describe <span className="t-grad">{organization.name}</span>
          </h2>
          <p className="t-lead measure mt-6">
            Writers, directories and partners are welcome to quote these approved descriptions as they are. Using the same words everywhere keeps the
            description of {organization.name} consistent.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <QuoteText id="one-sentence" label="One sentence" paragraphs={[approvedDescriptions.oneSentence]} />
            <QuoteText id="one-paragraph" label="One paragraph" paragraphs={[approvedDescriptions.paragraph]} />
          </div>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <Link href="/press" className="group/btn inline-flex items-center gap-2 font-medium text-accent-text">
              Press and media kit <Arrow />
            </Link>
            <Link href="/about" className="group/btn inline-flex items-center gap-2 font-medium text-accent-text">
              The {organization.name} story <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <BookingSection eyebrow="Talk to Madvert Labs" context="about_facts" />

      <JsonLd
        data={{
          ...schema.webPage(title, description, path),
          "@type": "AboutPage",
          dateModified: updated,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
