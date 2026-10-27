import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies, getResources, getTestimonials } from "@/cms";
import { BookingSection } from "@/components/booking/BookingSection";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { founder, organization } from "@/lib/entities";
import { pageMetadata, schema } from "@/lib/seo";
import { site } from "@/lib/site";
import { AboutHeroVisual } from "@/sections/about/AboutHeroVisual";
import { BuiltForNow } from "@/sections/about/BuiltForNow";
import { Capabilities } from "@/sections/about/Capabilities";
import { Consultant } from "@/sections/about/Consultant";
import { CredentialCard } from "@/sections/about/CredentialCard";
import { GrowthPhilosophy } from "@/sections/about/GrowthPhilosophy";
import { MeetUsama } from "@/sections/about/MeetUsama";
import { Portfolio } from "@/sections/about/Portfolio";
import { Principles } from "@/sections/about/Principles";
import { WhoWeAre } from "@/sections/about/WhoWeAre";
import { industryChips } from "@/sections/about/data";
import { FinalCta } from "@/sections/shared/FinalCta";
import "@/styles/about.css";

const description = `${organization.name} is an external growth department for established businesses, founded by ${founder.name}, connecting marketing, conversion, CRM and technology.`;

export const metadata: Metadata = pageMetadata({ title: "About Us: Your External Growth Department", description, path: "/about" });

export default async function AboutPage() {
  const [studies, resources, testimonials] = await Promise.all([getCaseStudies(), getResources(), getTestimonials()]);
  const realStudies = studies.filter((s) => !s.placeholder);
  const realResources = resources.filter((r) => !r.placeholder);
  const chips = industryChips(realStudies, testimonials);
  const caseIndustries = chips.filter((c) => c.kind === "Case study").length;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <GrowthRibbon shape="wave" spread={60} className="absolute -bottom-20 left-0 h-[260px] w-full" opacity={0.4} id="about-ribbon" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />
          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>About Madvert Labs</Eyebrow>
              </div>
              <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7 !text-[clamp(36px,4.6vw,66px)]">
                We Did Not Set Out to Do Everything. <span className="t-grad">We Kept Finding Problems Nobody Else Owned.</span>
              </h1>
              <p data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="t-lead measure mt-7">
                That is how a marketing company became a growth systems company. {site.tagline}
              </p>
              <div data-reveal style={{ ["--reveal-delay" as string]: 200 }} className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
                <Cta href={site.primaryCta.href} size="lg" track="strategy_call_click" trackLabel="about_hero" className="!whitespace-normal">
                  {site.primaryCta.label}
                </Cta>
                <Link href="#meet-usama" className="inline-flex min-h-11 items-center text-[15px] font-medium text-accent-text underline-offset-4 hover:underline">
                  Meet the founder
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <AboutHeroVisual />
            </div>
          </div>
        </div>
      </section>

      <WhoWeAre />
      <GrowthPhilosophy />
      <BuiltForNow studies={realStudies} industryCount={caseIndustries} resourceCount={realResources.length} />
      <Capabilities />
      <MeetUsama />
      <Consultant />
      <CredentialCard />
      <Portfolio chips={chips} />
      <Principles />

      <FinalCta title="Bring Us the Business Problem." accent="We Will Start There." primary={site.founderCta} />
      <BookingSection eyebrow="Ready When You Are" context="about" />
      <JsonLd
        data={{
          ...schema.webPage(`About ${organization.name}`, description, "/about"),
          "@type": "AboutPage",
          mainEntity: { "@id": `${site.url}/#organization` },
          mentions: { "@id": `${site.url}/#founder` },
        }}
      />
    </>
  );
}
