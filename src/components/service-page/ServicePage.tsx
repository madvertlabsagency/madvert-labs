import { TopicLinks } from "@/components/seo/TopicLinks";
import Link from "next/link";
import { AppointmentCta } from "@/components/booking/AppointmentCta";
import { BookingSection } from "@/components/booking/BookingSection";
import { ComparisonTable } from "@/components/facts/ComparisonTable";
import { DefinitionBlock } from "@/components/facts/DefinitionBlock";
import { ExpertQuote } from "@/components/facts/ExpertQuote";
import { FAQ } from "@/components/facts/FAQ";
import { ProcessSteps } from "@/components/facts/ProcessSteps";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow, Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { getLeadMagnet } from "@/content/lead-magnets";
import type { ServicePageContent } from "@/content/service-pages";
import { getServiceEntity } from "@/lib/entities";
import { schema } from "@/lib/seo";
import { FinalCta } from "@/sections/shared/FinalCta";
import { ProofCards } from "./ProofCards";
import { RelatedLinks } from "./RelatedLinks";
import { RelatedResources } from "./RelatedResources";
import { plain, Rich } from "./Rich";
import { SpSection } from "./SpSection";
import "@/styles/service-page.css";

function Bullets({ items, tone = "yes" }: { items: string[]; tone?: "yes" | "no" }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
          <span className={`sp-mark ${tone === "no" ? "is-no" : ""}`} aria-hidden="true">
            {tone === "no" ? "–" : "✓"}
          </span>
          <span>
            <Rich text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Data-driven service page. Order is deliberate for people and answer engines alike:
 * H1 → direct definition → who it is for → problem → process → scope → examples → proof → FAQs →
 * related services → resources → next step. Every piece of copy is server-rendered.
 */
export function ServicePage({ content: c }: { content: ServicePageContent }) {
  const entity = getServiceEntity(c.key);
  const parent = entity.parent ? getServiceEntity(entity.parent) : undefined;
  const crumbs = [
    { name: "What We Do", path: "/services" },
    ...(parent ? [{ name: parent.name, path: parent.path }] : []),
    { name: entity.name, path: entity.path },
  ];
  const heroResource = c.resources[0] ? getLeadMagnet(c.resources[0]) : undefined;
  const faqItems = c.faqs.map((f) => ({ q: f.q, a: plain(f.a), answer: <p><Rich text={f.a} /></p> }));
  const description = c.metaDescription;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <GrowthRibbon shape="rise" spread={60} className="absolute -bottom-16 left-0 h-[260px] w-full" opacity={0.35} id={`sp-ribbon-${c.key}`} />
        <div className="container-x relative">
          <Breadcrumbs items={crumbs} />
          <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>{c.eyebrow}</Eyebrow>
              </div>
              <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7 !text-[clamp(34px,4.2vw,60px)]">
                {c.h1} {c.h1Accent ? <span className="t-grad">{c.h1Accent}</span> : null}
              </h1>
              <div data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="mt-7 max-w-[680px]">
                <DefinitionBlock as="div" term={entity.name} definition={entity.definition}>
                  {c.answer.map((p) => (
                    <p key={p}>
                      <Rich text={p} />
                    </p>
                  ))}
                </DefinitionBlock>
              </div>
              <div data-reveal style={{ ["--reveal-delay" as string]: 200 }} className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Cta href="#book" size="lg" track="strategy_call_click" trackLabel={`${c.key}_hero`}>
                  {c.cta.label}
                </Cta>
                {heroResource ? (
                  <Link
                    href={`/resources/${heroResource.slug}`}
                    data-track="lead_magnet_click"
                    data-track-label={`${c.key}_hero_${heroResource.slug}`}
                    className="group/btn inline-flex items-center gap-2 text-[15px] font-medium text-accent-text"
                  >
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]">Free</span>
                    {heroResource.formCta ?? heroResource.title}
                    <Arrow />
                  </Link>
                ) : null}
              </div>
            </div>
            <aside data-reveal="fade" style={{ ["--reveal-delay" as string]: 180 }} className="lg:col-span-5" aria-label={`${entity.name} at a glance`}>
              <div className="panel sp-glance p-6 sm:p-8">
                <p className="t-label">At a glance</p>
                <dl className="mt-5 divide-y divide-[color:var(--line)]">
                  {c.glance.map((g) => (
                    <div key={g.label} className="grid grid-cols-1 gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[130px_1fr] sm:gap-4">
                      <dt className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">{g.label}</dt>
                      <dd className="text-[15px] leading-relaxed text-ink-2">
                        <Rich text={g.value} />
                      </dd>
                    </div>
                  ))}
                  {parent ? (
                    <div className="grid grid-cols-1 gap-1 py-4 last:pb-0 sm:grid-cols-[130px_1fr] sm:gap-4">
                      <dt className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">Part of</dt>
                      <dd className="text-[15px] text-ink-2">
                        <Link href={parent.path} className="sp-inline-link">
                          {parent.name}
                        </Link>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SpSection id="who" label="Who this is for" title={c.whoFor.title}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="panel p-6 sm:p-8 lg:col-span-7" data-reveal>
            <h3 className="t-label !text-accent-text">A good fit</h3>
            <div className="mt-5">
              <Bullets items={c.whoFor.items} />
            </div>
          </div>
          {c.whoFor.notFor?.length ? (
            <div className="panel p-6 sm:p-8 lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: 80 }}>
              <h3 className="t-label">Probably not the right fit</h3>
              <div className="mt-5">
                <Bullets items={c.whoFor.notFor} tone="no" />
              </div>
            </div>
          ) : null}
        </div>
      </SpSection>

      <SpSection id="problem" label="The problem" title={c.problem.title}>
        <div className="max-w-[760px] space-y-5 text-[17px] leading-[1.7] text-ink-2" data-reveal>
          {c.problem.paragraphs.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
        </div>
      </SpSection>

      <SpSection id="how-it-works" label="How it works" title={c.process.title} intro={c.process.intro ? <p><Rich text={c.process.intro} /></p> : undefined}>
        <ProcessSteps steps={c.process.steps.map((s) => ({ name: s.name, text: <p><Rich text={s.text} /></p> }))} />
        <AppointmentCta context={`service_${c.key}`} title={`Want ${c.short} built for your business?`} />
      </SpSection>

      {c.comparison ? (
        <SpSection id="comparison" label="Comparison" title={c.comparison.title} intro={c.comparison.intro ? <p><Rich text={c.comparison.intro} /></p> : undefined}>
          <div data-reveal>
            <ComparisonTable
              caption={c.comparison.caption}
              rowHeader={c.comparison.rowHeader}
              columns={c.comparison.columns}
              rows={c.comparison.rows}
              highlight={c.comparison.highlight}
              note={c.comparison.note}
            />
          </div>
        </SpSection>
      ) : null}

      <SpSection id="scope" label="Scope" title={`What is included in ${c.short}`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="panel p-6 sm:p-8" data-reveal>
            <h3 className="t-h3">Included</h3>
            <div className="mt-6">
              <Bullets items={c.included} />
            </div>
          </div>
          <div className="panel p-6 sm:p-8" data-reveal style={{ ["--reveal-delay" as string]: 80 }}>
            <h3 className="t-h3">Not included</h3>
            <div className="mt-6">
              <Bullets items={c.excluded} tone="no" />
            </div>
          </div>
        </div>
      </SpSection>

      <SpSection id="examples" label="Examples" title={c.examples.title} intro={c.examples.intro ? <p><Rich text={c.examples.intro} /></p> : undefined}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {c.examples.items.map((e, i) => (
            <li key={e.name} className="panel p-6 sm:p-7" data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 70 }}>
              <h3 className="font-display text-[18px] font-semibold text-ink">{e.name}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
                <Rich text={e.text} />
              </p>
            </li>
          ))}
        </ul>
      </SpSection>

      {c.proof?.slugs.length ? (
        <SpSection id="proof" label="Proof" title={c.proof.title} intro={<p><Rich text={c.proof.intro} /></p>}>
          <ProofCards slugs={c.proof.slugs} />
          <p className="mt-8 text-[15px] text-ink-3">
            All results are from real Madvert Labs campaigns and are shown exactly as reported in each case study. Past results do not guarantee future results.{" "}
            <Link href="/case-studies" className="sp-inline-link">
              See every case study
            </Link>
            .
          </p>
        </SpSection>
      ) : null}

      {c.quote ? (
        <section className="section-tight !py-[clamp(40px,5vw,72px)]" aria-label="From the founder">
          <div className="container-x">
            <div className="panel mx-auto max-w-[920px] p-8 sm:p-12" data-reveal>
              <ExpertQuote quote={c.quote} />
            </div>
          </div>
        </section>
      ) : null}

      <SpSection id="faq" label="Common questions" title={`${c.shortTitle}: common questions`}>
        <div className="max-w-[860px]">
          <FAQ items={faqItems} withSchema />
        </div>
      </SpSection>

      <SpSection id="related" label="Related services" title="Where this connects to the rest of the system">
        <RelatedLinks links={c.related} />
      </SpSection>

      {c.resources.length ? (
        <SpSection id="resources" label="Related resources" title="Free resources from the Madvert Vault">
          <RelatedResources slugs={c.resources} />
        </SpSection>
      ) : null}

      <FinalCta title={c.cta.title} accent={c.cta.accent} primary={{ label: c.cta.label, href: "#book" }}>
        {c.cta.body ?? null}
      </FinalCta>
      <TopicLinks path={entity.path} />
      <BookingSection eyebrow="Next Step" context={`services:${c.key}`} />

      <JsonLd
        data={[
          schema.service({ name: entity.name, serviceType: entity.serviceType, description: entity.definition, path: entity.path, audience: c.audience }),
          schema.webPage(c.metaTitle, description, entity.path),
        ]}
      />
    </>
  );
}
