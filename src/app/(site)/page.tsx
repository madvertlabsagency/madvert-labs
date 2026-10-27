import type { Metadata } from "next";
import { getCaseStudies, getProof, getResources, getSiteSettings, getTestimonials } from "@/cms";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, schema } from "@/lib/seo";
import { site } from "@/lib/site";
import { OpeningIntro } from "@/sections/home/OpeningIntro";
import { Hero } from "@/sections/home/Hero";
import { ProblemStory } from "@/sections/home/ProblemStory";
import { OwnedDemand } from "@/sections/home/OwnedDemand";
import { AiLeverage } from "@/sections/home/AiLeverage";
import { Proof } from "@/sections/home/Proof";
import { CasePreview } from "@/sections/home/CasePreview";
import { Vault } from "@/sections/home/Vault";
import { FounderBlock } from "@/sections/shared/FounderBlock";
import { FinalCta } from "@/sections/shared/FinalCta";
import { AccentHeadline } from "@/components/ui/Section";
import { BookingSection } from "@/components/booking/BookingSection";
import { ServicesGrid } from "@/sections/home/ServicesGrid";
import { HireDepartment } from "@/sections/home/HireDepartment";
import { IntroVideo } from "@/sections/home/IntroVideo";
import { INTRO_TRANSCRIPT, INTRO_VIDEO } from "@/content/intro-video";

const description =
  "Madvert Labs is your external growth department: paid acquisition, SEO and AEO, branding, conversion, CRM, automation and technology connected in one growth system.";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.descriptor} | ${site.name}`, description, path: "/" }),
  title: { absolute: `${site.descriptor} | ${site.name}` },
};

export default async function HomePage() {
  const [settings, studies, resources, proof, testimonials] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getResources(),
    getProof(),
    getTestimonials(),
  ]);

  return (
    <>
      <OpeningIntro />
      <Hero />
      <IntroVideo />

      <section className="section pb-0" aria-label="The problem">
        <div className="container-x">
          <div className="max-w-[900px]" data-reveal>
            <AccentHeadline as="h2" text="Your Dashboard Can Glow Green While Your Sales Floor Stays Quiet." className="t-h1" />
          </div>
          <div className="mt-6 lg:mt-0">
            <ProblemStory />
          </div>
        </div>
      </section>

      <ServicesGrid />
      <HireDepartment />
      <Proof items={proof} testimonials={testimonials} />
      <CasePreview studies={studies} />
      <FounderBlock photo={settings.founderPhoto} />
      <OwnedDemand />
      <AiLeverage />
      <Vault resources={resources} />
      <BookingSection context="home" />
      <FinalCta
        title="You Probably Already Know Something Is Leaking."
        accent="Let Us Find Out Where."
        primary={site.primaryCta}
        secondary={{ label: "Start With a Free Growth Systems Audit", href: "/resources/growth-systems-audit", track: "lead_magnet_click" }}
        micro="No pressure. No generic pitch. Just a serious conversation about growth."
      >
        <p>Bring the business. Bring the numbers. Bring the challenge.</p>
        <p className="mt-1">We will bring the questions.</p>
      </FinalCta>
      <JsonLd
        data={[
          schema.webPage(site.name, description, "/"),
          {
            ...schema.video({
              ...INTRO_VIDEO,
              thumbnail: "/video/madvert-intro-poster-v2.webp",
              contentUrl: "/video/madvert-intro-1080.mp4",
              path: "/",
            }),
            transcript: INTRO_TRANSCRIPT.join(" "),
          },
        ]}
      />
    </>
  );
}
