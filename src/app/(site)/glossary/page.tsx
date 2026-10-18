import type { Metadata } from "next";
import Link from "next/link";
import { BookingSection } from "@/components/booking/BookingSection";
import { ComparisonTable } from "@/components/facts/ComparisonTable";
import { DefinitionBlock } from "@/components/facts/DefinitionBlock";
import { DirectAnswer } from "@/components/facts/DirectAnswer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { glossaryComparisons, glossaryTerms } from "@/content/glossary";
import { organization } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import "@/styles/service-page.css";
import "@/styles/facts.css";

const path = "/glossary";
const title = "Growth and Marketing Glossary";
const description =
  "Plain definitions of growth system, qualified lead, qualified RFQ, CPQL, speed-to-lead, lead scoring, AI SEO and AEO, with honest comparisons, from Madvert Labs.";
const dateModified = "2026-10-18";

export const metadata: Metadata = pageMetadata({ title: "Glossary: Growth Systems, Qualified Leads, AI SEO and AEO", description, path });

/** The words the definition opens with that name the term ("A growth system", "Cost per qualified lead"). */
function leadingTerm(term: string, definition: string) {
  const article = /^(an?|the) /i.exec(definition)?.[0] ?? "";
  const candidate = definition.slice(0, article.length + term.length);
  return candidate.toLowerCase() === `${article}${term}`.toLowerCase() ? candidate : term;
}

export default function GlossaryPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Glossary", path }]} />
          <div className="mt-12 max-w-[860px] md:mt-16">
            <div data-reveal>
              <Eyebrow>Glossary</Eyebrow>
            </div>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.6vw,62px)]">
              {title}
            </h1>
            <DirectAnswer
              className="mt-8"
              updated={dateModified}
              answer={[
                `This glossary defines the growth, lead generation and AI search terms ${organization.name} uses with clients, in plain language. Each definition stands on its own, followed by practical context and a link to the most relevant service or tool.`,
              ]}
            />
          </div>

          <nav aria-label="Glossary index" className="fx-jump mt-10">
            <p className="t-label">Jump to a term</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {glossaryTerms.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.term}</a>
                </li>
              ))}
              <li>
                <a href="#comparisons" className="!text-accent-text">
                  Comparisons
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="pb-8" aria-labelledby="terms-title">
        <div className="container-x">
          <h2 id="terms-title" className="t-label">
            Terms
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {glossaryTerms.map((t) => (
              <article key={t.id} id={t.id} className="fx-term panel flex flex-col p-6 sm:p-8" aria-labelledby={`${t.id}-title`}>
                <h3 id={`${t.id}-title`} className="t-h3">
                  {t.term}
                </h3>
                <DefinitionBlock
                  as="div"
                  term={leadingTerm(t.term, t.definition)}
                  definition={t.definition}
                  className="mt-4"
                  textClassName="text-[16.5px] leading-relaxed text-ink-2"
                />
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{t.context}</p>
                <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[14.5px]" aria-label={`Related to ${t.term}`}>
                  {t.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="group/btn inline-flex items-center gap-2 font-semibold text-accent-text">
                        {r.anchor} <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparisons" className="section-tight scroll-mt-24" aria-labelledby="comparisons-title">
        <div className="container-x">
          <div className="hairline mb-12 md:mb-16" />
          <div className="max-w-[820px]">
            <p className="t-label">Comparisons</p>
            <h2 id="comparisons-title" className="t-h2 mt-4">
              Honest comparisons of common choices
            </h2>
            <p className="t-lead mt-5">
              Short side-by-side comparisons of options businesses often weigh up. None is right for every business; each table shows the trade-offs.
              For lead generation versus qualified lead generation, read the full article:{" "}
              <Link href="/insights/lead-generation-vs-qualified-lead-generation" className="sp-inline-link">
                Lead Generation vs Qualified Lead Generation
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 space-y-16">
            {glossaryComparisons.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-28" aria-labelledby={`${c.id}-title`}>
                <h3 id={`${c.id}-title`} className="t-h3">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-ink-2">{c.intro}</p>
                <div className="mt-6">
                  <ComparisonTable caption={c.caption} rowHeader={c.rowHeader} columns={c.columns} rows={c.rows} note={c.note} className={c.columns.length <= 2 ? "fx-compact" : ""} />
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group/btn inline-flex items-center gap-2 font-semibold text-accent-text">
                        {l.anchor} <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <BookingSection context="glossary" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": `${absoluteUrl(path)}#terms`,
          name: title,
          description,
          url: absoluteUrl(path),
          inLanguage: "en",
          dateModified,
          publisher: { "@id": `${site.url}/#organization` },
          hasDefinedTerm: glossaryTerms.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.definition,
            url: `${absoluteUrl(path)}#${t.id}`,
            inDefinedTermSet: `${absoluteUrl(path)}#terms`,
          })),
        }}
      />
    </>
  );
}
