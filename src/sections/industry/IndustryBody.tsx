import Link from "next/link";
import { DirectAnswer } from "@/components/facts/DirectAnswer";
import { FAQ } from "@/components/facts/FAQ";
import { ProcessSteps } from "@/components/facts/ProcessSteps";
import { publishableMetrics } from "@/components/facts/metrics";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedLinks } from "@/components/service-page/RelatedLinks";
import { RelatedResources } from "@/components/service-page/RelatedResources";
import { plain, Rich } from "@/components/service-page/Rich";
import { SpSection } from "@/components/service-page/SpSection";
import { Arrow, Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { fallbackCaseStudies } from "@/cms/fallback";
import { industriesPath, type IndustryPage } from "@/content/industries";
import { getServiceEntity } from "@/lib/entities";

export function IndustryHero({ page, updated }: { page: IndustryPage; updated: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-20" aria-labelledby="page-title">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
      <GrowthRibbon shape="rise" spread={60} className="absolute -bottom-16 left-0 h-[260px] w-full" opacity={0.3} id={`ind-ribbon-${page.slug}`} />
      <div className="container-x relative">
        <Breadcrumbs
          items={[
            { name: "Industries", path: industriesPath },
            { name: page.name, path: page.path },
          ]}
        />
        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow>{page.eyebrow}</Eyebrow>
            </div>
            <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7 !text-[clamp(32px,4vw,58px)]">
              {page.h1} <span className="t-grad">{page.h1Accent}</span>
            </h1>
            <div data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="mt-7">
              <DirectAnswer label={`Madvert Labs for ${page.short}`} updated={updated}>
                {page.answer.map((p) => (
                  <p key={p}>
                    <Rich text={p} />
                  </p>
                ))}
              </DirectAnswer>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: 200 }} className="mt-10">
              <Cta href="#book" size="lg" track="strategy_call_click" trackLabel={`industry_${page.slug}_hero`}>
                {page.cta.label}
              </Cta>
            </div>
          </div>
          <aside className="lg:col-span-5" aria-label={`${page.name} at a glance`}>
            <dl className="panel divide-y divide-[color:var(--line)] p-2" data-reveal style={{ ["--reveal-delay" as string]: 160 }}>
              {page.glance.map((g) => (
                <div key={g.label} className="px-5 py-4">
                  <dt className="t-label">{g.label}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
                    <Rich text={g.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function IndustryChallenge({ page }: { page: IndustryPage }) {
  return (
    <SpSection
      id="challenge"
      label="The challenge"
      title={page.hard.title}
      intro={page.hard.paragraphs.map((p) => (
        <p key={p}>
          <Rich text={p} />
        </p>
      ))}
    >
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {page.hard.journey.map((j, i) => (
          <li key={j.stage} className="ind-stage panel p-6" data-reveal style={{ ["--reveal-delay" as string]: i * 60 }}>
            <span className="ind-stage-n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-[17px] font-semibold text-ink">{j.stage}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{j.text}</p>
          </li>
        ))}
      </ol>
    </SpSection>
  );
}

export function IndustrySystem({ page }: { page: IndustryPage }) {
  return (
    <SpSection id="system" label="The system" title={`How Madvert Labs builds lead generation for ${page.short}`} intro={<p>{page.system.intro}</p>}>
      <ProcessSteps
        steps={page.system.steps.map((s) => ({
          name: s.name,
          text: (
            <p>
              <Rich text={s.text} />
            </p>
          ),
        }))}
      />
    </SpSection>
  );
}

export function IndustryQualification({ page }: { page: IndustryPage }) {
  const q = page.qualification;
  return (
    <SpSection id="qualification" label="Qualification" title={q.title} intro={<p>{q.intro}</p>}>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {q.questions.map((item, i) => (
          <li key={item.q} className="rounded-2xl border border-line bg-glass p-6" data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 60 }}>
            <p className="font-display text-[16.5px] font-semibold leading-snug text-ink">{item.q}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-3">{item.why}</p>
          </li>
        ))}
      </ul>
      {q.note ? <p className="mt-6 max-w-[760px] text-[14.5px] text-ink-3">{q.note}</p> : null}
    </SpSection>
  );
}

export function IndustryChannels({ page }: { page: IndustryPage }) {
  return (
    <SpSection id="channels" label="Channels" title={`Services used for ${page.short} lead generation`}>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {page.channels.map((c, i) => {
          const e = getServiceEntity(c.key);
          return (
            <li key={c.key} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
              <Link
                href={e.path}
                data-track="service_cta_click"
                data-track-label={`industry_${page.slug}_${c.key}`}
                className="panel group/btn flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <h3 className="inline-flex items-center gap-2 font-display text-[18px] font-semibold text-ink">
                  {e.name} <Arrow />
                </h3>
                <span className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.note}</span>
                {c.proven ? <span className="ind-proven mt-4">{c.proven}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </SpSection>
  );
}

export function IndustryProof({ page }: { page: IndustryPage }) {
  const items = page.proof.items
    .map((item) => ({ item, study: fallbackCaseStudies.find((c) => c.slug === item.slug && !c.placeholder) }))
    .filter((x): x is { item: typeof x.item; study: NonNullable<typeof x.study> } => Boolean(x.study));
  return (
    <SpSection id="proof" label="Proof" title={`Published ${page.short} results`} intro={<p>{page.proof.intro}</p>}>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {items.map(({ item, study }, i) => {
          const metrics = publishableMetrics(study.metrics).filter((m) => item.metrics.includes(m.label));
          return (
            <li key={item.slug} data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 60 }}>
              <article className="panel flex h-full flex-col p-6 sm:p-7">
                <p className="flex flex-wrap items-center gap-2">
                  <span className={item.relation === "primary" ? "ind-tag ind-tag-primary" : "ind-tag"}>
                    {item.relation === "primary" ? `${page.name} case study` : "Related case study"}
                  </span>
                  <span className="t-label">{[study.client, study.market].filter(Boolean).join(" · ")}</span>
                </p>
                <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-ink">
                  <Link href={`/case-studies/${study.slug}`} className="hover:text-accent-text">
                    {study.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.note}</p>
                {metrics.length ? (
                  <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-line pt-4 text-[14px] sm:grid-cols-3">
                    {metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-ink-3">{m.label}</dt>
                        <dd className="mt-0.5 font-display text-[18px] font-semibold text-ink">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group/btn mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-accent-text"
                  aria-label={`Read the case study: ${study.title}`}
                >
                  Read the case study <Arrow />
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
      {page.testimonial ? (
        <figure className="panel mt-6 p-6 sm:p-8" data-reveal>
          <blockquote className="font-display text-[clamp(19px,1.8vw,24px)] font-medium leading-snug text-ink">“{page.testimonial.quote}”</blockquote>
          <figcaption className="mt-4 text-[14.5px] text-ink-3">
            <span className="font-semibold text-ink-2">{page.testimonial.name}</span>, {page.testimonial.role}, {page.testimonial.business}. {page.testimonial.note}
          </figcaption>
        </figure>
      ) : null}
      <p className="mt-6 max-w-[760px] text-[14px] text-ink-3">Figures describe specific campaigns for specific clients. They are not benchmarks, and past results do not guarantee future results.</p>
    </SpSection>
  );
}

export function IndustryFaq({ page }: { page: IndustryPage }) {
  return (
    <SpSection id="faq" label="FAQ" title={`Questions about lead generation for ${page.short}`}>
      <FAQ
        withSchema
        className="max-w-[900px]"
        items={page.faqs.map((f) => ({
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
  );
}

export function IndustryRelated({ page }: { page: IndustryPage }) {
  return (
    <>
      <SpSection id="related" label="Keep reading" title="Related services and proof">
        <RelatedLinks links={page.related} />
      </SpSection>
      {page.resources.length ? (
        <SpSection id="resources" label="Madvert Vault" title="Free playbooks for this industry">
          <RelatedResources slugs={page.resources} />
        </SpSection>
      ) : null}
    </>
  );
}
