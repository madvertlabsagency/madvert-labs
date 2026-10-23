import type { Metadata } from "next";
import { BookingSection } from "@/components/booking/BookingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageDates } from "@/content/page-dates";
import { pageMetadata, schema } from "@/lib/seo";
import { karachiMeta, karachiPath } from "@/sections/location/karachi-content";
import { LocationFaq, LocationIndustries, LocationProcess, LocationProof, LocationServices, LocationVisit } from "@/sections/location/LocationBody";
import { LocationHero } from "@/sections/location/LocationHero";
import "@/styles/service-page.css";
import "@/sections/location/location.css";

export const metadata: Metadata = pageMetadata({ title: karachiMeta.title, description: karachiMeta.description, path: karachiPath });

/**
 * The one location page: Madvert Labs' real Karachi office (verified Google Business Profile).
 * No pages are created for other cities, because there is no office there.
 */
export default function KarachiPage() {
  return (
    <>
      <LocationHero updated={pageDates[karachiPath]} />
      <LocationServices />
      <LocationProcess />
      <LocationIndustries />
      <LocationProof />
      <LocationVisit />
      <LocationFaq />
      <BookingSection
        eyebrow="Next Step"
        body="Book a business strategy call at the Karachi office or online. We will look at the business, the current system and the next most valuable move."
        context="location:karachi"
      />
      <JsonLd data={schema.webPage(karachiMeta.title, karachiMeta.description, karachiPath)} />
    </>
  );
}
