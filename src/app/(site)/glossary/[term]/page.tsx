import { TopicLinks } from "@/components/seo/TopicLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingSection } from "@/components/booking/BookingSection";
import { DirectAnswer } from "@/components/facts/DirectAnswer";
import { ProcessSteps } from "@/components/facts/ProcessSteps";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedLinks } from "@/components/service-page/RelatedLinks";
import { Rich } from "@/components/service-page/Rich";
import { SpSection } from "@/components/service-page/SpSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { glossaryTerms } from "@/content/glossary";
import { glossaryPagePath, glossaryPages } from "@/content/glossary-pages";
import { getServiceEntity } from "@/lib/entities";
import { pageMetadata, schema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import "@/styles/service-page.css";

/** Definition pages exist only for terms with full page content in glossary-pages.ts. */
export function generateStaticParams() {
  return Object.keys(glossaryPages).map((term) => ({ term }));
}

function load(id: string) {
  const page = glossaryPages[id];
  const term = glossaryTerms.find((t) => t.id === id);
  return page && term ? { page, term } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const data = load((await params).term);
  if (!data) return {};
  return pageMetadata({ title: data.page.metaTitle, description: data.page.metaDescription, path: glossaryPagePath(data.term.id), type: "article" });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const data = load((await params).term);
  if (!data) notFound();
  const { page, term } = data;
  const path = glossaryPagePath(term.id);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { name: "Glossary", path: "/glossary" },
              { name: term.term, path },
            ]}
          />
          <div className="mt-12 max-w-[860px] md:mt-14">
            <Eyebrow>Growth Glossary</Eyebrow>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.6vw,60px)]">
              {page.question}
            </h1>
            <div className="mt-7">
              <DirectAnswer label={`Definition of ${term.term}`} answer={term.definition} updated={page.updated} />
            </div>
          </div>
        </div>
      </section>

      <SpSection id="how-it-works" label="How it works" title="How it works in practice" intro={page.howItWorks.intro ? <p>{page.howItWorks.intro}</p> : undefined}>
        <ProcessSteps steps={page.howItWorks.steps.map((s) => ({ name: s.name, text: <p>{s.text}</p> }))} />
      </SpSection>

      <SpSection id="why-it-matters" label="Why it matters" title="Why it matters">
        <div className="max-w-[780px] space-y-4 text-[16.5px] leading-relaxed text-ink-2">
          {page.whyItMatters.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
        </div>
      </SpSection>

      <SpSection id="example" label="Example" title="An example">
        <figure className="panel max-w-[860px] p-6 sm:p-8">
          <p className="text-[16.5px] leading-relaxed text-ink">
            <Rich text={page.example.text} />
          </p>
          {page.example.href ? (
            <Link href={page.example.href} className="group/btn mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-accent-text">
              {page.example.anchor ?? "Read more"} <Arrow />
            </Link>
          ) : null}
        </figure>
      </SpSection>

      <SpSection id="common-mistake" label="Common mistake" title="The common mistake">
        <p className="max-w-[780px] text-[16.5px] leading-relaxed text-ink-2">
          <Rich text={page.commonMistake} />
        </p>
        {page.framework ? (
          <aside className="mt-8 max-w-[780px] rounded-2xl border border-line bg-glass p-6" aria-label="Related Madvert framework">
            <p className="t-label">Related Madvert framework</p>
            <p className="mt-2 font-display text-[18px] font-semibold text-ink">{page.framework.name}</p>
            <p className="mt-1 text-[15.5px] text-ink-2">{page.framework.text}</p>
            <Link href={page.framework.href} className="group/btn mt-3 inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent-text">
              See it in practice <Arrow />
            </Link>
          </aside>
        ) : null}
      </SpSection>

      <SpSection id="related" label="Related" title="Related services and reading">
        <RelatedLinks
          links={[
            ...page.services.map((key) => ({ key, anchor: getServiceEntity(key).name, note: getServiceEntity(key).definition })),
            ...page.reading,
          ]}
        />
        <p className="mt-8 text-[15px]">
          <Link href="/glossary" className="group/btn inline-flex items-center gap-2 font-semibold text-accent-text">
            All growth glossary terms <Arrow />
          </Link>
        </p>
      </SpSection>

      <TopicLinks path={path} />
      <BookingSection eyebrow="Next Step" context={`glossary:${term.id}`} />

      <JsonLd
        data={{
          ...schema.webPage(page.metaTitle, page.metaDescription, path),
          dateModified: page.updated,
          mainEntity: { "@id": `${absoluteUrl(path)}#term` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "@id": `${absoluteUrl(path)}#term`,
          name: term.term,
          description: term.definition,
          url: absoluteUrl(path),
          inDefinedTermSet: { "@type": "DefinedTermSet", name: "Madvert Labs Growth Glossary", url: absoluteUrl("/glossary") },
        }}
      />
    </>
  );
}
