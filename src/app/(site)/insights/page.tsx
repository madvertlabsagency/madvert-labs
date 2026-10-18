import type { Metadata } from "next";
import Link from "next/link";
import { DirectAnswer, formatIsoDate } from "@/components/facts/DirectAnswer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { articlePath, articles, CPQL_CALCULATOR_PATH } from "@/content/articles";
import { founder, organization } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const path = "/insights";
const title = "Insights";
const description =
  "Practical articles from Madvert Labs on qualified lead generation, client acquisition, CRM follow-up and growth systems, written for established businesses.";

export const metadata: Metadata = pageMetadata({ title: "Insights on Qualified Leads and Growth Systems", description, path });

const sorted = [...articles].filter((a) => !a.path).sort((x, y) => y.datePublished.localeCompare(x.datePublished));

export default function InsightsIndex() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: title, path }]} />
          <div className="mt-12 max-w-[860px] md:mt-16">
            <div data-reveal>
              <Eyebrow>Madvert Labs Insights</Eyebrow>
            </div>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(36px,4.8vw,64px)]">
              Insights
            </h1>
            <DirectAnswer
              className="mt-8"
              answer={[
                `${organization.name} Insights are practical articles on qualified lead generation, client acquisition, CRM follow-up and growth systems. Each article defines its terms, shows the working with clearly labelled examples, and uses only real ${organization.name} case studies as proof.`,
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section-tight !pt-6" aria-labelledby="articles-title">
        <div className="container-x">
          <h2 id="articles-title" className="t-label">
            Articles
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {sorted.map((a) => (
              <li key={a.slug}>
                <article className="panel flex h-full flex-col p-6 sm:p-8">
                  <p className="t-label">{a.eyebrow}</p>
                  <h3 className="t-h3 mt-3">
                    <Link href={articlePath(a)} className="hover:text-accent-text">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{a.description}</p>
                  <p className="mt-5 text-[13.5px] text-ink-3">
                    {founder.name} · <time dateTime={a.dateModified}>{formatIsoDate(a.dateModified)}</time>
                  </p>
                  <Link href={articlePath(a)} className="group/btn mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-accent-text">
                    Read the article <Arrow />
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <h2 className="t-label mt-16">Tools and reference</h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <li>
              <Link href={CPQL_CALCULATOR_PATH} className="panel group/btn flex h-full flex-col p-6 transition-colors hover:border-[color:var(--accent)] sm:p-8">
                <span className="inline-flex items-center gap-2 font-display text-[19px] font-semibold text-ink">
                  Cost Per Qualified Lead Calculator <Arrow />
                </span>
                <span className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  Work out CPL, CPQL, qualification rate and cost per closed deal from your own campaign numbers.
                </span>
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="panel group/btn flex h-full flex-col p-6 transition-colors hover:border-[color:var(--accent)] sm:p-8">
                <span className="inline-flex items-center gap-2 font-display text-[19px] font-semibold text-ink">
                  Growth and Marketing Glossary <Arrow />
                </span>
                <span className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  Plain definitions of growth system, qualified lead, speed-to-lead, AEO and the other terms {organization.name} uses.
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: absoluteUrl(path),
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: sorted.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(articlePath(a)), name: a.title })),
          },
        }}
      />
    </>
  );
}
