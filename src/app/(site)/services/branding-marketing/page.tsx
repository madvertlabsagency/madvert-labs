import { AppointmentCta } from "@/components/booking/AppointmentCta";
import { TopicLinks } from "@/components/seo/TopicLinks";
import type { Metadata } from "next";
import { getFaqs } from "@/cms";
import { JsonLd } from "@/components/seo/JsonLd";
import { PillarWorld } from "@/components/visuals/PillarWorld";
import { pageMetadata, schema } from "@/lib/seo";
import { site } from "@/lib/site";
import { ServiceHero } from "@/sections/services/ServiceHero";
import { AnswerBlock, Capability } from "@/sections/services/Blocks";
import { Touchpoints360 } from "@/sections/services/Visuals";
import { Deferred } from "@/components/perf/Deferred";
import { AttentionGraph } from "@/sections/branding/AttentionGraph";
import { ContentPillars } from "@/sections/branding/ContentPillars";
import { IdentitySection } from "@/sections/branding/IdentitySection";
import { JudgingSection } from "@/sections/branding/JudgingSection";
import { LogoEcosystem } from "@/sections/branding/LogoEcosystem";
import { PerceptionAudit } from "@/sections/branding/PerceptionAudit";
import { FinalCta } from "@/sections/shared/FinalCta";
import { BookingSection } from "@/components/booking/BookingSection";
import { SpecialistServices } from "@/components/service-page/SpecialistServices";
import "@/styles/branding.css";

const path = "/services/branding-marketing";
const description =
  "Brand strategy, identity, social media, digital PR and creative from Madvert Labs, so your business looks, sounds and shows up like the company it really is.";

export const metadata: Metadata = pageMetadata({
  title: "Branding, Creative and Brand Strategy",
  description,
  path,
});

export default async function BrandingPage() {
  const faqs = await getFaqs("branding-marketing");
  return (
    <>
      <ServiceHero
        eyebrow="Branding and Marketing"
        title="A Serious Business"
        accent="Should Look Like One."
        campaignLine="Being Good Is Not Enough If You Look Forgettable."
        sub="We build and execute complete brand and marketing systems that shape how your business looks, sounds, communicates and shows up across every important touchpoint."
        primary={{ label: "Build My Brand", href: "#book" }}
        secondary={{
          label: "Get the Brand Perception Checklist",
          href: "/resources/brand-perception-checklist",
        }}
        crumbs={[
          { name: "What We Do", path: "/services" },
          { name: "Branding and Marketing", path },
        ]}
        visual={
          <PillarWorld
            icon="branding"
            satellites={["webApps", "paidMedia", "studios", "crm"]}
            tint="#a78bfa"
          />
        }
      />

      <JudgingSection />
      <IdentitySection />

      <Capability
        id="branding"
        index="01"
        label="Branding"
        title="A Logo Is Not a Brand. It Is One Piece of the Evidence."
        support={
          <>
            <p>A strong identity does more than look attractive.</p>
            <p className="mt-2">
              It creates recognition. It creates consistency. It makes your
              business easier to remember. It makes every campaign, post,
              proposal and customer touchpoint feel like it came from the same
              company.
            </p>
          </>
        }
        icon="branding"
        visual={
          <Deferred className="bm-eco-slot">
            <LogoEcosystem />
          </Deferred>
        }
        items={[
          { name: "Brand Strategy", icon: "strategy" },
          { name: "Visual Identity", icon: "branding" },
          { name: "Logo Systems", icon: "branding" },
          { name: "Brand Guidelines", icon: "systems" },
          { name: "Typography and Colour Systems", icon: "webApps" },
          { name: "Creative Direction", icon: "studios" },
        ]}
      />
      <Capability
        id="social-media"
        index="02"
        label="Social Media"
        title="Posting Every Day Is Not a Strategy."
        support="Neither is putting “Happy Monday” over a stock photo."
        flip
        visual={
          <Deferred className="bm-cp-slot">
            <ContentPillars />
          </Deferred>
        }
        items={[
          { name: "Social Media Management", icon: "mobileApps" },
          { name: "Content Calendars", icon: "systems" },
          { name: "Creative Posts", icon: "branding" },
          { name: "Reels", icon: "studios" },
          { name: "Community Management", icon: "crm" },
          { name: "Campaign Content", icon: "paidMedia" },
        ]}
      />
      <Capability
        id="digital-pr"
        index="03"
        label="Digital PR"
        title="Authority Looks Different When Someone Else Says You Are Good."
        items={[
          { name: "Press Releases", icon: "webApps" },
          { name: "Digital PR", icon: "paidMedia" },
          { name: "Publication Outreach", icon: "seo" },
          { name: "Media Placements", icon: "growth" },
          { name: "Authority Building", icon: "strategy" },
          { name: "Reputation Support", icon: "tracking" },
        ]}
      />
      <Capability
        id="influencer-marketing"
        index="04"
        label="Influencer Marketing"
        title="Borrow the Right Attention. Not Just the Biggest Audience."
        support="A smaller audience that already trusts the voice, buys in your category and looks like your customer is worth more than a huge one that was never going to buy."
        flip
        visual={
          <Deferred className="bm-ag-slot">
            <AttentionGraph />
          </Deferred>
        }
      />
      <Capability
        id="360"
        index="05"
        label="360 Degree Marketing"
        title="The Brand Should Feel Like One Brand Everywhere."
        support="That is what 360 degree brand execution should feel like."
        visual={<Touchpoints360 />}
      />

      <PerceptionAudit />
      <BookingSection
        eyebrow="Need This Built for Your Business?"
        context="services:branding"
      />

      <SpecialistServices
        parent="branding-marketing"
        intro="Organic social media, planned and produced in the brand's identity."
      />

      <AnswerBlock
        service="Branding and Marketing"
        glance={[
          {
            label: "Who it is for",
            value:
              "Established businesses whose quality is not yet reflected in how they look and communicate.",
          },
          {
            label: "Problem solved",
            value:
              "Inconsistent, forgettable or outdated presence across logo, social, website, PR and creative.",
          },
          {
            label: "Process",
            value:
              "Diagnose perception, define strategy and identity, build the system, execute across touchpoints.",
          },
          {
            label: "Measured by",
            value:
              "Consistency, brand search demand, enquiry quality and content performance.",
          },
        ]}
        faqs={faqs}
      />

      <div className="container-x">
        <AppointmentCta context="service_branding" />
      </div>
      <TopicLinks path={path} />
      <FinalCta
        title="Build a Brand Your Marketing Can"
        accent="Actually Be Proud Of."
        primary={{
          label: "Book a Brand Strategy Call",
          href: site.primaryCta.href,
        }}
      />
      <JsonLd
        data={schema.service({
          name: "Branding and Marketing",
          serviceType: "Branding and marketing",
          description,
          path,
          audience: "Established businesses",
        })}
      />
    </>
  );
}
