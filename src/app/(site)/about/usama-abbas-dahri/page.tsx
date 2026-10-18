import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCaseStudies, getResources } from "@/cms";
import { BookingSection } from "@/components/booking/BookingSection";
import { CaseShowcaseCard } from "@/components/case-studies/CaseShowcaseCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ResourceCard } from "@/components/lead-magnets/ResourceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow, Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { pageDates } from "@/content/page-dates";
import { founder, getServiceEntity, organization, type ServiceKey } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

/*
 * Founder profile. Every statement on this page is taken from copy already published on the site
 * (FounderBlock, About page, booking copy, the official resource covers that name the author).
 * No years of experience, employers, education, awards or client counts are stated, because none
 * have been supplied. Add verified facts here (and to entities.ts sameAs) when the client provides them.
 */

const path = founder.path;
const portrait = {
  url: "/images/usama-abbas-dahri-portrait.webp",
  alt: "Portrait of Usama Abbas Dahri, Founder of Madvert Labs",
  width: 800,
  height: 1000,
};
const description = `${founder.name} is the founder of ${organization.name}, a digital marketing and growth systems company. Usama leads business strategy calls and is the author of several free Madvert Vault playbooks and checklists.`;

export const metadata: Metadata = pageMetadata({
  title: `${founder.name}, Founder of ${organization.name}`,
  description,
  path,
  type: "profile",
  image: absoluteUrl(founder.image),
});

/** The questions Usama asks (from the founder section of the About page) and the service that answers each. */
const questions: { q: string; key: ServiceKey }[] = [
  { q: "Why are the leads weak?", key: "client-acquisition" },
  { q: "Why did conversion drop?", key: "conversion" },
  { q: "Why did the customer disappear?", key: "automation-revenue-systems" },
  { q: "Why does the business look smaller online than it really is?", key: "branding-marketing" },
  { q: "Why is the team still doing this manually?", key: "ai-agents" },
  { q: "Why can we not build something better?", key: "tech-product-development" },
];

export default async function FounderPage() {
  const [resources, studies] = await Promise.all([getResources(), getCaseStudies()]);
  const authored = resources.filter((r) => r.author === "founder");
  const realStudies = studies.filter((s) => !s.placeholder);

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${site.url}/#founder`,
    name: founder.name,
    givenName: founder.givenName,
    familyName: founder.familyName,
    jobTitle: founder.jobTitle,
    image: absoluteUrl(founder.image),
    url: absoluteUrl(path),
    worksFor: { "@id": `${site.url}/#organization` },
  };
  if (founder.sameAs.length) person.sameAs = founder.sameAs;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <GrowthRibbon shape="wave" spread={60} className="absolute -bottom-20 left-0 h-[260px] w-full" opacity={0.4} id="founder-ribbon" />
        <div className="container-x relative">
          <Breadcrumbs
            items={[
              { name: "About Us", path: "/about" },
              { name: founder.name, path },
            ]}
          />
          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>Founder Profile</Eyebrow>
              </div>
              <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7 !text-[clamp(38px,5vw,72px)]">
                {founder.name}
              </h1>
              <p data-reveal style={{ ["--reveal-delay" as string]: 100 }} className="mt-4 font-display text-[18px] font-semibold text-accent-text">
                {founder.jobTitle},{" "}
                <Link href="/about" className="underline-offset-4 hover:underline">
                  {organization.name}
                </Link>
              </p>
              <p data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="t-lead measure mt-6">
                {founder.name} is the founder of {organization.name}, a digital marketing and growth systems company. {organization.slogan}
              </p>
              <div data-reveal style={{ ["--reveal-delay" as string]: 200 }} className="mt-9">
                <Cta href={site.founderCta.href} size="lg" track="strategy_call_click" trackLabel="founder_profile_hero" className="!whitespace-normal">
                  {site.founderCta.label}
                </Cta>
              </div>
            </div>
            <div className="lg:col-span-5" data-reveal="fade">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]">
                <div className="absolute -inset-3 rounded-[34px] bg-[radial-gradient(circle_at_70%_10%,rgb(0_180_255/0.25),transparent_60%)] blur-2xl" aria-hidden="true" />
                <Image
                  src={portrait.url}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(min-width:1024px) 440px, (min-width:640px) 380px, 300px"
                  className="rounded-[28px] border border-line object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="about-usama-title">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="about-usama-title" data-reveal className="t-h1">
              About <span className="t-grad">Usama</span>
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7">
            <p data-reveal className="text-ink">
              Usama Abbas Dahri founded {organization.name} and is the person at the company who asks &ldquo;Why?&rdquo; one more time. That curiosity shapes
              how {organization.name} works: the team does not stop at the first visible problem and keeps looking until the business logic makes sense.
            </p>
            <p data-reveal>
              {organization.name} started with marketing. A client needed leads, so the team ran campaigns. Then the landing page was weak, the follow up was
              slow, the CRM was missing and reporting was fragmented, so each problem was fixed in turn. That is how a marketing company became a growth
              systems company.
            </p>
            <p data-reveal className="border-l-2 border-[#00e5ff] pl-5 t-h3 !font-medium text-ink">
              The Channel Is Never More Important Than the Business Behind It.
            </p>
            <p data-reveal>
              <Link href="/about" className="group/btn inline-flex items-center gap-2 font-medium text-accent-text">
                Read the {organization.name} story <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="works-on-title">
        <div className="container-x">
          <h2 id="works-on-title" data-reveal className="t-h1 max-w-[900px]">
            What Usama Works On <span className="t-grad">at {organization.name}</span>
          </h2>
          <p data-reveal className="t-lead measure mt-6">
            Usama leads the Business Strategy Calls at {organization.name}, where the business is reviewed before the conversation and the discussion starts
            with the problem, not a generic package. Each question below is one Usama asks, and each links to the {organization.name} service built to answer
            it.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map(({ q, key }, i) => {
              const s = getServiceEntity(key);
              return (
                <li key={key} data-reveal style={{ ["--reveal-delay" as string]: i * 60 }}>
                  <Link href={s.path} className="panel group/btn flex h-full flex-col p-6 transition-colors hover:border-[color:var(--accent)]">
                    <span className="font-display text-[12px] font-semibold text-accent-text">0{i + 1}</span>
                    <span className="mt-3 text-[17px] font-medium text-ink">{q}</span>
                    <span className="mt-4 flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
                      {s.name} <Arrow />
                    </span>
                    <span className="mt-2 text-[14px] leading-relaxed text-ink-3">{s.definition}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {authored.length ? (
        <section className="section-tight" aria-labelledby="resources-title">
          <div className="container-x">
            <h2 id="resources-title" data-reveal className="t-h1">
              Resources <span className="t-grad">by Usama</span>
            </h2>
            <p data-reveal className="t-lead measure mt-6">
              Usama Abbas Dahri is named as the author on the cover of each of these free {organization.name} playbooks and checklists in the Madvert Vault.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {authored.map((r) => (
                <li key={r.slug} data-reveal>
                  <ResourceCard r={r} trackLabel={`founder_${r.slug}`} />
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-8 text-[15px]">
              <Link href="/resources" className="group/btn inline-flex items-center gap-2 font-medium text-accent-text">
                Browse the full Madvert Vault <Arrow />
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {realStudies.length ? (
        <section className="section-tight" aria-labelledby="cases-title">
          <div className="container-x">
            <h2 id="cases-title" data-reveal className="t-h1">
              Case Studies <span className="t-grad">from {organization.name}</span>
            </h2>
            <p data-reveal className="t-lead measure mt-6">
              Real client work from {organization.name}, with the verified numbers, sources and limitations for each campaign.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {realStudies.map((s) => (
                <li key={s.slug}>
                  <CaseShowcaseCard study={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <BookingSection
        eyebrow="Talk to Usama"
        title="Book a Business Strategy Call"
        accent="with Usama."
        body="Bring the business, the numbers and the challenge. Usama will look at the current system and the next most valuable move."
        context="founder_profile"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `${founder.name}, Founder of ${organization.name}`,
          description,
          url: absoluteUrl(path),
          dateModified: pageDates[path],
          isPartOf: { "@id": `${site.url}/#website` },
          mainEntity: person,
        }}
      />
    </>
  );
}
