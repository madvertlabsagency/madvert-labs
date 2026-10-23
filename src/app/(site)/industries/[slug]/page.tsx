import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingSection } from "@/components/booking/BookingSection";
import { plain } from "@/components/service-page/Rich";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIndustryPage, industriesPath, industryPages } from "@/content/industries";
import { pageDates } from "@/content/page-dates";
import { pageMetadata, schema } from "@/lib/seo";
import {
  IndustryChallenge,
  IndustryChannels,
  IndustryFaq,
  IndustryHero,
  IndustryProof,
  IndustryQualification,
  IndustryRelated,
  IndustrySystem,
} from "@/sections/industry/IndustryBody";
import "@/styles/service-page.css";
import "@/styles/industry.css";

/** Industry pages exist only where a real case study or client testimonial backs the industry. */
export function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getIndustryPage((await params).slug);
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });
}

export default async function IndustryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getIndustryPage((await params).slug);
  if (!page) notFound();
  const updated = pageDates[page.path] ?? pageDates[industriesPath];

  return (
    <>
      <IndustryHero page={page} updated={updated} />
      <IndustryChallenge page={page} />
      <IndustrySystem page={page} />
      <IndustryQualification page={page} />
      <IndustryChannels page={page} />
      <IndustryProof page={page} />
      <IndustryFaq page={page} />
      <IndustryRelated page={page} />
      <BookingSection eyebrow="Next Step" title={page.cta.title} accent={page.cta.accent} body={page.cta.body} context={`industry:${page.slug}`} />
      <JsonLd data={{ ...schema.webPage(page.metaTitle, page.metaDescription, page.path), dateModified: updated }} />
      <JsonLd
        data={{
          ...schema.service({
            name: page.serviceName,
            description: plain(page.answer[0]),
            path: page.path,
            serviceType: page.serviceType,
            audience: page.audience,
          }),
          areaServed: [{ "@type": "Country", name: "Pakistan" }, ...page.markets.filter((m) => m !== "Pakistan").map((name) => ({ "@type": "Country", name }))],
        }}
      />
    </>
  );
}
