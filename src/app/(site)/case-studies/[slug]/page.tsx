import { TopicLinks } from "@/components/seo/TopicLinks";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow, Placeholder } from "@/components/ui/Section";
import { pageMetadata, schema } from "@/lib/seo";
import { BookingSection } from "@/components/booking/BookingSection";
import { CoverMedia } from "@/components/case-studies/CoverMedia";
import {
  categoryLabels,
  isReal,
  primaryCategory,
  verifiedMetrics,
} from "@/components/case-studies/utils";
import { Arrow } from "@/components/ui/Button";
import { CaseStudyResult } from "@/components/facts/CaseStudyResult";
import { VerifiedMetric } from "@/components/facts/VerifiedMetric";
import { getServiceEntity, organization } from "@/lib/entities";
import { absoluteUrl, site } from "@/lib/site";
import Link from "next/link";
import "@/styles/cases.css";

const ORG_ID = `${site.url}/#organization`;

/** "2026-10-15" -> "15 October 2026" (fixed UTC so server and client agree). */
function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.seo?.title ?? s.title,
    description: s.seo?.description ?? s.summary,
    path: `/case-studies/${s.slug}`,
    image: s.cover?.url ?? s.featuredImage?.url,
    type: "article",
    noindex: s.placeholder,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) notFound();

  const real = (v?: string | null) =>
    s.placeholder ? v || undefined : isReal(v) ? v : undefined;
  const metrics = verifiedMetrics(s);
  const outcome = !s.placeholder
    ? [s.outcome, s.result].find(isReal)
    : undefined;
  const cover = s.cover ?? s.featuredImage;
  const cat = primaryCategory(s);
  const services = (s.serviceKeys ?? []).map(getServiceEntity);
  const confidential = /confidential/i.test(
    `${s.context ?? ""} ${s.client ?? ""}`,
  );
  const clientLabel = isReal(s.client)
    ? s.client
    : s.placeholder
      ? undefined
      : confidential
        ? "Identity withheld for confidentiality"
        : "Not named in the case study";
  const clientShort = isReal(s.client) ? s.client : undefined;
  const datePublished = s.datePublished ?? s.publishedAt;
  const dateModified = s.dateModified ?? datePublished;

  const sections = [
    {
      id: "challenge",
      label: "The Problem",
      body: real(s.challenge) ?? s.problem,
    },
    { id: "strategy", label: "Strategy", body: real(s.strategy) ?? s.move },
    {
      id: "built",
      label: "What Madvert Built",
      body: real(s.built) ?? s.system,
    },
    {
      id: "implementation",
      label: "Execution",
      body: real(s.implementation) ?? s.execution,
    },
    { id: "creative", label: "Creative", body: s.creative },
  ].filter((x) => x.body);
  const learned = isReal(s.learned) ? s.learned : undefined;
  const hasResult = Boolean(outcome || metrics.length);
  const hasLimits = Boolean(s.limitations?.length);
  const gallery = s.gallery?.length ? s.gallery : null;

  // Numbered steps in reading order, used by both the page index and the step badges.
  const index: { id: string; label: string }[] = [
    { id: "context", label: "Client and Context" },
    ...sections.map((x) => ({ id: x.id, label: x.label })),
    ...(hasResult ? [{ id: "outcome", label: "Verified Outcome" }] : []),
    ...(hasLimits
      ? [{ id: "limitations", label: "Limitations and Context" }]
      : []),
    ...(services.length
      ? [{ id: "services", label: "Relevant Services" }]
      : []),
    ...(learned ? [{ id: "learned", label: "What We Learned" }] : []),
    { id: "gallery", label: "Screenshots" },
  ];
  const stepNo = (id: string) => index.findIndex((x) => x.id === id) + 1;
  const stepBadge = (id: string) => (
    <span className="cs-step-num" aria-hidden="true">
      {String(stepNo(id)).padStart(2, "0")}
    </span>
  );
  const stepClass = "cs-step scroll-mt-28 border-t border-line py-10";

  const facts = [
    ["Client", clientLabel],
    ["Industry", s.industry],
    ["Market", s.market ?? s.region],
    ["Channels", s.channels?.join(", ")],
    ["Growth system", s.systemType],
    ["Reporting period", s.period],
  ].filter((f): f is [string, string] => isReal(f[1]));

  const jsonLd = {
    ...schema.article({
      headline: s.title,
      description: s.seo?.description ?? s.summary,
      path: `/case-studies/${s.slug}`,
      image: cover?.url ? absoluteUrl(cover.url) : undefined,
      datePublished,
    }),
    dateModified,
    mainEntityOfPage: absoluteUrl(`/case-studies/${s.slug}`),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: services.length
      ? services.map((x) => ({
          "@type": "Service",
          name: x.name,
          url: absoluteUrl(x.path),
          provider: { "@id": ORG_ID },
        }))
      : undefined,
  };

  return (
    <article>
      <header className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)]">
        <div
          className="bg-blueprint pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { name: "Case Studies", path: "/case-studies" },
              { name: s.title, path: `/case-studies/${s.slug}` },
            ]}
          />
          <div className="mt-14 max-w-[960px]">
            <div data-reveal className="flex flex-wrap items-center gap-3">
              <Eyebrow>{categoryLabels[cat]}</Eyebrow>
              {isReal(s.systemType) ? (
                <span className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-2">
                  {s.systemType}
                </span>
              ) : null}
              {s.placeholder ? (
                <span className="rounded-full border border-dashed border-line-strong px-3 py-1 text-[12px] text-ink-3">
                  Framework awaiting real client data
                </span>
              ) : null}
            </div>
            <h1
              data-reveal
              style={{ ["--reveal-delay" as string]: 60 }}
              className="t-display mt-7 !text-[clamp(34px,4.2vw,60px)]"
            >
              {s.title}
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: 120 }}
              className="t-lead mt-6"
            >
              {isReal(s.oneLiner) ? s.oneLiner : s.summary}
            </p>
            {datePublished ? (
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: 150 }}
                className="mt-5 text-[13.5px] text-ink-3"
              >
                Case study by {organization.name} · Published{" "}
                <time dateTime={datePublished}>
                  {formatDate(datePublished)}
                </time>
                {dateModified ? (
                  <>
                    {" "}
                    · Updated{" "}
                    <time dateTime={dateModified}>
                      {formatDate(dateModified)}
                    </time>
                  </>
                ) : null}
              </p>
            ) : null}
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: 180 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#book"
                className="cs-btn cs-btn--primary group/btn !h-12 !px-6"
                data-track="strategy_call_click"
                data-track-label={`case_hero_${s.slug}`}
              >
                Book a Strategy Call <Arrow />
              </a>
              {s.pdfUrl ? (
                <a
                  href={s.pdfUrl}
                  download
                  className="cs-btn cs-btn--ghost !h-12 !px-6"
                  data-track="resource_download"
                  data-track-label={`case_pdf_${s.slug}`}
                >
                  Download PDF
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="container-x">
        <div className="cs-detail-cover">
          <CoverMedia
            study={s}
            sizes="(min-width:1024px) 480px, 80vw"
            priority
            className="cs-detail-svg"
          />
        </div>
        {s.services?.length ? (
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Services involved"
          >
            {s.services.map((x) => (
              <li
                key={x}
                className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink-2"
              >
                {x}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {metrics.length ? (
        <section
          className="section-tight !pb-0"
          aria-labelledby="numbers-title"
        >
          <div className="container-x">
            <h2 id="numbers-title" className="t-label">
              Verified Numbers
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {metrics.slice(0, 4).map((m) => (
                <VerifiedMetric
                  key={`${m.label}-${m.value}`}
                  metric={m}
                  compact
                />
              ))}
            </dl>
            {hasResult ? (
              <p className="mt-4 text-[13px] text-ink-3">
                Sources, caveats and every figure:{" "}
                <a
                  href="#outcome"
                  className="text-accent-text underline-offset-4 hover:underline"
                >
                  Verified Outcome
                </a>
                {hasLimits ? (
                  <>
                    {" "}
                    and{" "}
                    <a
                      href="#limitations"
                      className="text-accent-text underline-offset-4 hover:underline"
                    >
                      Limitations and Context
                    </a>
                  </>
                ) : null}
                .
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="container-x grid grid-cols-1 gap-12 pb-10 pt-14 lg:grid-cols-12 lg:pt-20">
        <nav
          aria-label="On this page"
          className="hidden lg:col-span-3 lg:block"
        >
          <ol className="sticky top-[calc(var(--header-h)+32px)] space-y-2 border-l border-line pl-5 text-[14px]">
            {index.map((x) => (
              <li key={x.id}>
                <a
                  href={`#${x.id}`}
                  className="text-ink-3 transition-colors hover:text-ink"
                >
                  {x.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:col-span-8 lg:col-start-5">
          <section
            id="context"
            className={stepClass}
            aria-labelledby="context-title"
          >
            {stepBadge("context")}
            <div>
              <h2 id="context-title" className="t-label !text-accent-text">
                Client and Context
              </h2>
              {(real(s.context) ?? s.diagnosis) ? (
                <p className="mt-4 text-[18px] leading-relaxed text-ink">
                  {real(s.context) ?? s.diagnosis}
                </p>
              ) : null}
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-xl border border-line px-4 py-3"
                  >
                    <dt className="text-[12px] text-ink-3">{k}</dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
                {services.length ? (
                  <div className="rounded-xl border border-line px-4 py-3 sm:col-span-2">
                    <dt className="text-[12px] text-ink-3">Services</dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink">
                      {services.map((x, i) => (
                        <span key={x.key}>
                          {i ? ", " : null}
                          <Link
                            href={x.path}
                            className="text-accent-text underline-offset-4 hover:underline"
                          >
                            {x.name}
                          </Link>
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </section>

          {sections.map((x) => (
            <section
              key={x.id}
              id={x.id}
              className={stepClass}
              aria-labelledby={`${x.id}-title`}
            >
              {stepBadge(x.id)}
              <div>
                <h2 id={`${x.id}-title`} className="t-label !text-accent-text">
                  {x.label}
                </h2>
                <p className="mt-4 text-[18px] leading-relaxed text-ink">
                  {x.body}
                </p>
              </div>
            </section>
          ))}

          <CaseStudyResult
            outcome={outcome}
            metrics={metrics}
            limitations={s.limitations}
            client={clientShort}
            period={s.period}
            stepClassName={stepClass}
            outcomeNumber={stepNo("outcome")}
            limitationsNumber={stepNo("limitations")}
          />

          {services.length ? (
            <section
              id="services"
              className={stepClass}
              aria-labelledby="services-title"
            >
              {stepBadge("services")}
              <div>
                <h2 id="services-title" className="t-label !text-accent-text">
                  Relevant Services
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3">
                  {services.map((x) => (
                    <li key={x.key}>
                      <Link
                        href={x.path}
                        className="group/btn block rounded-2xl border border-line p-5 transition-colors hover:border-[color:var(--accent)]"
                      >
                        <span className="flex items-center gap-2 font-display text-[16px] font-semibold text-ink">
                          {x.name} <Arrow />
                        </span>
                        <span className="mt-2 block text-[14.5px] leading-relaxed text-ink-2">
                          {x.definition}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {learned ? (
            <section
              id="learned"
              className={stepClass}
              aria-labelledby="learned-title"
            >
              {stepBadge("learned")}
              <div>
                <h2 id="learned-title" className="t-label !text-accent-text">
                  What We Learned
                </h2>
                <p className="mt-4 text-[18px] leading-relaxed text-ink">
                  {learned}
                </p>
              </div>
            </section>
          ) : null}

          <section
            id="gallery"
            className="scroll-mt-28 border-t border-line py-10"
            aria-labelledby="gallery-title"
          >
            <h2 id="gallery-title" className="t-label !text-accent-text">
              Screenshots
            </h2>
            {gallery ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {gallery.map((g) => (
                  <figure key={g.url}>
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener"
                      className="group block overflow-hidden rounded-2xl border border-line transition-colors hover:border-[color:var(--accent)]"
                    >
                      <Image
                        src={g.url}
                        alt={g.alt}
                        width={g.width ?? 1200}
                        height={g.height ?? 800}
                        loading="lazy"
                        sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw"
                        className="h-auto w-full"
                      />
                      <span className="sr-only">
                        {" "}
                        (opens full size in a new tab)
                      </span>
                    </a>
                    <figcaption className="mt-3 text-[13px] leading-snug text-ink-3">
                      <span className="text-ink-2">
                        From the case study PDF:
                      </span>{" "}
                      {g.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Placeholder
                  label="[REAL CAMPAIGN OR CRM SCREENSHOT]"
                  className="aspect-[4/3]"
                />
                <Placeholder
                  label="[REAL SYSTEM OR CREATIVE SCREENSHOT]"
                  className="aspect-[4/3]"
                />
              </div>
            )}
          </section>

          {s.testimonial?.quote || s.placeholder ? (
            <section
              className="border-t border-line py-10"
              aria-labelledby="client-title"
            >
              <h2 id="client-title" className="t-label !text-accent-text">
                Client
              </h2>
              {s.testimonial && !s.testimonial.placeholder ? (
                <figure className="mt-5">
                  <blockquote className="t-h3 !font-medium">
                    “{s.testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-[14px] text-ink-3">
                    {s.testimonial.name}
                    {s.testimonial.role ? `, ${s.testimonial.role}` : ""}
                  </figcaption>
                </figure>
              ) : (
                <Placeholder
                  label="[REAL CLIENT VIDEO OR TESTIMONIAL]"
                  className="mt-5 aspect-video"
                />
              )}
            </section>
          ) : null}

          {s.pdfUrl ? (
            <section
              className="cs-cta-panel mt-4 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9"
              aria-labelledby="pdf-title"
            >
              <div>
                <h2 id="pdf-title" className="t-h3">
                  Take the Full Case File With You
                </h2>
                <p className="mt-2 text-[15px] text-ink-2">
                  The complete write-up as a PDF, ready to share with your team.
                </p>
              </div>
              <a
                href={s.pdfUrl}
                download
                className="cs-btn cs-btn--primary !h-12 shrink-0 !px-6"
                data-track="resource_download"
                data-track-label={`case_pdf_${s.slug}`}
              >
                <svg
                  viewBox="0 0 16 16"
                  width="15"
                  height="15"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2.5v8m0 0L4.8 7.3M8 10.5l3.2-3.2M3 13.5h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download PDF
              </a>
            </section>
          ) : null}
        </div>
      </div>

      <section
        className="container-x pb-6 pt-10"
        aria-labelledby="case-cta-title"
      >
        <div className="cs-cta-panel px-7 py-12 text-center md:px-12 md:py-16">
          <h2 id="case-cta-title" className="t-h1 mx-auto max-w-[820px]">
            Want Us to Look at{" "}
            <span className="t-grad">Your Growth System?</span>
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[600px]">
            Bring the business, the numbers and the challenge. We will show you
            where growth is leaking and the next most valuable move.
          </p>
          <a
            href="#book"
            className="cs-btn cs-btn--primary group/btn mt-8 !h-14 !px-7 !text-[16px]"
            data-track="strategy_call_click"
            data-track-label={`case_final_${s.slug}`}
          >
            Book a Business Strategy Call <Arrow />
          </a>
        </div>
      </section>

      <TopicLinks path={`/case-studies/${s.slug}`} />
      <BookingSection eyebrow="Ready When You Are" context="case-study" />
      <JsonLd data={jsonLd} />
    </article>
  );
}
