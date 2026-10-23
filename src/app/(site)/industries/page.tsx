import type { Metadata } from "next";
import Link from "next/link";
import { BookingSection } from "@/components/booking/BookingSection";
import { DirectAnswer } from "@/components/facts/DirectAnswer";
import { FAQ } from "@/components/facts/FAQ";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { plain, Rich } from "@/components/service-page/Rich";
import { SpSection } from "@/components/service-page/SpSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { industriesFaqs, industriesMeta, industriesPath, industryPages, otherProvenIndustries } from "@/content/industries";
import { pageDates } from "@/content/page-dates";
import { pageMetadata, schema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import "@/styles/service-page.css";
import "@/styles/industry.css";

export const metadata: Metadata = pageMetadata({ title: industriesMeta.title, description: industriesMeta.description, path: industriesPath });

export default function IndustriesPage() {
  const updated = pageDates[industriesPath];
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Industries", path: industriesPath }]} />
          <div className="mt-12 max-w-[880px] md:mt-16">
            <Eyebrow>Industries</Eyebrow>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.4vw,60px)]">
              Industries We Build Growth Systems For. <span className="t-grad">Each One Backed by Real Proof.</span>
            </h1>
            <div className="mt-7">
              <DirectAnswer label="Industries at a glance" updated={updated}>
                <p>
                  Madvert Labs builds lead generation and growth systems for real estate, solar energy, home services and e-commerce businesses, and has published work for
                  fitness, bookkeeping, agencies, luxury interiors and events. Every industry on this page links to a real{" "}
                  <Link href="/case-studies" className="sp-inline-link">
                    case study
                  </Link>{" "}
                  or a client video testimonial.
                </p>
              </DirectAnswer>
            </div>
          </div>
        </div>
      </section>

      <SpSection id="industry-pages" label="Industry guides" title="Lead generation by industry">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {industryPages.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 60 }}>
              <Link
                href={p.path}
                data-track="industry_card_click"
                data-track-label={p.slug}
                className="panel group/btn flex h-full flex-col p-7 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="t-label">{p.name}</span>
                <h2 className="mt-3 inline-flex items-center gap-2 font-display text-[21px] font-semibold leading-snug text-ink">
                  {p.h1} <Arrow />
                </h2>
                <span className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.cardSummary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SpSection>

      <SpSection id="other" label="More proof" title="Other industries with published work">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherProvenIndustries.map((ind) => (
            <li key={ind.name} className="rounded-2xl border border-line bg-glass p-5">
              <p className="font-display text-[16px] font-semibold text-ink">{ind.name}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{ind.summary}</p>
              <p className="mt-2 text-[13.5px] text-ink-3">
                {ind.href ? (
                  <Link href={ind.href} className="sp-inline-link">
                    {ind.source}
                  </Link>
                ) : (
                  ind.source
                )}
              </p>
            </li>
          ))}
        </ul>
      </SpSection>

      <SpSection id="faq" label="FAQ" title="Questions about industries">
        <FAQ
          withSchema
          className="max-w-[900px]"
          items={industriesFaqs.map((f) => ({
            q: f.q,
            a: plain(f.a),
            answer: (
              <p>
                <Rich text={f.a} />
              </p>
            ),
          }))}
        />
      </SpSection>

      <BookingSection eyebrow="Next Step" context="industries" />
      <JsonLd data={{ ...schema.webPage(industriesMeta.title, industriesMeta.description, industriesPath), "@type": "CollectionPage", dateModified: updated }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: industryPages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.serviceName, url: absoluteUrl(p.path) })),
        }}
      />
    </>
  );
}
