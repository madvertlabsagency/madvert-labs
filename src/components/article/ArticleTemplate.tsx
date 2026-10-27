import { TopicLinks } from "@/components/seo/TopicLinks";
import Link from "next/link";
import type { ReactNode } from "react";
import { fallbackCaseStudies } from "@/cms/fallback";
import { BookingSection } from "@/components/booking/BookingSection";
import { Checklist } from "@/components/facts/Checklist";
import { ComparisonTable } from "@/components/facts/ComparisonTable";
import { DefinitionBlock } from "@/components/facts/DefinitionBlock";
import { DirectAnswer, formatIsoDate } from "@/components/facts/DirectAnswer";
import { FAQ } from "@/components/facts/FAQ";
import { ProcessDiagram } from "@/components/facts/ProcessDiagram";
import { ProofCard } from "@/components/facts/ProofCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow, Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { articlePath, type Article, type ArticleBlock } from "@/content/articles";
import { founder, organization } from "@/lib/entities";
import { absoluteUrl, site } from "@/lib/site";
import { plainText, RichText } from "./RichText";
import "@/styles/service-page.css";
import "@/styles/facts.css";

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
    case "h3":
      return (
        <h3 id={b.id} className={b.id ? "scroll-mt-28" : undefined}>
          {b.text}
        </h3>
      );
    case "list": {
      const items = b.items.map((t) => (
        <li key={t}>
          <RichText text={t} />
        </li>
      ));
      return b.ordered ? <ol className="fx-numbers">{items}</ol> : <ul className="fx-bullets">{items}</ul>;
    }
    case "checklist":
      return (
        <Checklist
          label={b.label}
          items={b.items.map((it) => ({ key: it.text, text: <RichText text={it.text} />, detail: it.detail ? <RichText text={it.detail} /> : undefined }))}
        />
      );
    case "table":
      return (
        <div className="!mt-8">
          <ComparisonTable caption={b.caption} rowHeader={b.rowHeader} columns={b.columns} rows={b.rows} highlight={b.highlight} note={b.note} className={b.columns.length <= 2 ? "fx-compact" : ""} />
        </div>
      );
    case "definition":
      return (
        <DefinitionBlock as="div" id={b.id} term={b.term} definition={b.definition} textClassName="text-[16.5px] leading-relaxed text-ink-2" className="panel scroll-mt-28 p-6 sm:p-7">
          {b.more?.map((m) => (
            <p key={m}>
              <RichText text={m} />
            </p>
          ))}
        </DefinitionBlock>
      );
    case "diagram":
      return (
        <div className="!mt-8">
          <ProcessDiagram label={b.label} steps={b.steps.map((s) => ({ name: s.name, text: <RichText text={s.text} /> }))} />
        </div>
      );
    case "callout":
      return (
        <aside className="fx-callout" aria-label={b.label}>
          <p className="t-label !text-accent-text">{b.label}</p>
          {b.text.map((t) => (
            <p key={t} className="mt-2 text-[15.5px] leading-relaxed text-ink-2">
              <RichText text={t} />
            </p>
          ))}
        </aside>
      );
  }
}

/**
 * Article / resource template. Order: breadcrumbs → H1 → byline with dates → direct answer →
 * optional tool slot → body sections (why it matters, framework, example, mistakes, decision
 * criteria) → proof from real case studies → visible FAQs → related resources → CTA + booking.
 * Every word is server-rendered. Article JSON-LD is emitted unless `schema="none"` (e.g. a tool page
 * that describes itself as a WebApplication instead).
 */
export function ArticleTemplate({
  article: a,
  afterAnswer,
  schema = "article",
  bookingContext,
}: {
  article: Article;
  /** Rendered full-width between the hero and the body, e.g. a calculator. */
  afterAnswer?: ReactNode;
  schema?: "article" | "none";
  bookingContext?: string;
}) {
  const path = articlePath(a);
  const url = absoluteUrl(path);
  const crumbs = a.crumbs ?? [
    { name: "Insights", path: "/insights" },
    { name: a.title, path },
  ];
  const proofStudies = (a.proof?.items ?? [])
    .map((it) => ({ it, study: fallbackCaseStudies.find((s) => s.slug === it.slug && !s.placeholder) }))
    .filter((x) => x.study);
  const faqItems = a.faqs.map((f) => ({
    q: f.q,
    a: plainText(f.a),
    answer: (
      <p>
        <RichText text={f.a} />
      </p>
    ),
  }));
  const toc = [
    ...a.sections.map((s) => ({ id: s.id, label: s.label })),
    ...(proofStudies.length ? [{ id: "proof", label: "Proof" }] : []),
    ...(faqItems.length ? [{ id: "faqs", label: "FAQs" }] : []),
    ...(a.related.length ? [{ id: "related", label: "Related resources" }] : []),
  ];
  const role = `${founder.jobTitle}, ${organization.name}`;

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16">
          <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
          <GrowthRibbon shape="rise" spread={50} className="absolute -bottom-20 left-0 h-[220px] w-full" opacity={0.28} id={`article-ribbon-${a.slug}`} />
          <div className="container-x relative">
            <Breadcrumbs items={crumbs} />
            <div className="mt-12 max-w-[860px] md:mt-16">
              <div data-reveal>
                <Eyebrow>{a.eyebrow}</Eyebrow>
              </div>
              <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.6vw,62px)]">
                {a.title}
              </h1>
              <p className="sp-byline mt-6">
                <span>
                  By{" "}
                  <Link href={founder.path} rel="author">
                    {founder.name}
                  </Link>
                  , {role}
                </span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>
                  Published <time dateTime={a.datePublished}>{formatIsoDate(a.datePublished)}</time>
                </span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span>
                  Updated <time dateTime={a.dateModified}>{formatIsoDate(a.dateModified)}</time>
                </span>
              </p>
              <DirectAnswer answer={a.answer} className="mt-8" />
            </div>
          </div>
        </header>

        {afterAnswer ? (
          <div className="relative pb-6">
            <div className="container-x">{afterAnswer}</div>
          </div>
        ) : null}

        <div className="container-x grid grid-cols-1 gap-10 pb-8 pt-6 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="On this page" className="fx-toc hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--header-h)+32px)]">
              <p className="t-label">On this page</p>
              <ol className="mt-4 space-y-2.5 border-l border-line pl-4 text-[14.5px]">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-9 xl:col-span-8">
            {a.sections.map((s, i) => (
              <section key={s.id} id={s.id} className={`scroll-mt-28 ${i ? "mt-16 border-t border-line pt-14" : ""}`} aria-labelledby={`${s.id}-title`}>
                <p className="t-label">{s.label}</p>
                <h2 id={`${s.id}-title`} className="t-h2 mt-4">
                  {s.title}
                </h2>
                <div className="fx-prose mt-7">
                  {s.blocks.map((b, j) => (
                    <Block key={j} b={b} />
                  ))}
                </div>
              </section>
            ))}

            {proofStudies.length && a.proof ? (
              <section id="proof" className="mt-16 scroll-mt-28 border-t border-line pt-14" aria-labelledby="proof-title">
                <p className="t-label">Proof</p>
                <h2 id="proof-title" className="t-h2 mt-4">
                  {a.proof.title}
                </h2>
                {a.proof.intro ? (
                  <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-ink-2">
                    <RichText text={a.proof.intro} />
                  </p>
                ) : null}
                <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {proofStudies.map(({ it, study }) => (
                    <li key={it.slug}>
                      <ProofCard study={study} metricLabel={it.metric} note={it.note} />
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px]">
                  <Link href="/case-studies" className="group/btn inline-flex items-center gap-2 font-medium text-accent-text">
                    See all case studies <Arrow />
                  </Link>
                </p>
              </section>
            ) : null}

            {faqItems.length ? (
              <section id="faqs" className="mt-16 scroll-mt-28 border-t border-line pt-14" aria-labelledby="faqs-title">
                <p className="t-label">FAQs</p>
                <h2 id="faqs-title" className="t-h2 mt-4">
                  Frequently asked questions
                </h2>
                <FAQ items={faqItems} withSchema className="mt-8" />
              </section>
            ) : null}

            {a.related.length ? (
              <section id="related" className="mt-16 scroll-mt-28 border-t border-line pt-14" aria-labelledby="related-title">
                <p className="t-label">Related resources</p>
                <h2 id="related-title" className="t-h2 mt-4">
                  Keep going
                </h2>
                <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {a.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="panel group/btn flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
                      >
                        <span className="inline-flex items-center gap-2 font-display text-[17px] font-semibold text-ink">
                          {r.anchor} <Arrow />
                        </span>
                        <span className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <aside className="panel mt-16 p-7 sm:p-10" aria-labelledby="article-cta-title">
              <h2 id="article-cta-title" className="t-h2">
                {a.cta.title} {a.cta.accent ? <span className="t-grad">{a.cta.accent}</span> : null}
              </h2>
              <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-ink-2">{a.cta.body}</p>
              <div className="mt-8">
                <Cta href="#book" size="lg" track="strategy_call_click" trackLabel={`article_${a.slug}`} className="!whitespace-normal">
                  {a.cta.label}
                </Cta>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <TopicLinks path={path} />
      <BookingSection context={bookingContext ?? `article_${a.slug}`} />

      {schema === "article" ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            author: { "@id": `${site.url}/#founder` },
            publisher: { "@id": `${site.url}/#organization` },
            datePublished: a.datePublished,
            dateModified: a.dateModified,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
            inLanguage: "en",
          }}
        />
      ) : null}
    </>
  );
}
