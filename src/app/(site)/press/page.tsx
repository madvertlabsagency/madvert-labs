import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingSection } from "@/components/booking/BookingSection";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SpSection } from "@/components/service-page/SpSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { pageDates } from "@/content/page-dates";
import { founder, organization } from "@/lib/entities";
import { pageMetadata, schema } from "@/lib/seo";
import { office, whatsapp } from "@/lib/site";
import { QuoteText } from "@/sections/facts/QuoteText";
import { boilerplate, brandColours, founderBio, founderPhotos, logoDownloads } from "@/sections/facts/data";
import "@/styles/service-page.css";
import "@/styles/facts-page.css";

/*
 * Press and media kit: approved boilerplate, founder bio, logos, photos and brand colours.
 * Every asset listed here exists in /public; every statement comes from sections/facts/data.ts.
 */

const path = "/press";
const title = `${organization.name} Press and Media Kit`;
const description = `Press and media kit for ${organization.name}: approved company boilerplate, founder bio for ${founder.name}, logos, photos, brand colours and media contact.`;

export const metadata: Metadata = pageMetadata({ title: "Press and Media Kit", description, path });

export default function PressPage() {
  const updated = pageDates[path];
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-[calc(var(--header-h)+40px)] md:pb-14" aria-labelledby="page-title">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Press", path }]} />
          <div className="mt-12 max-w-[860px] md:mt-14">
            <Eyebrow>Press</Eyebrow>
            <h1 id="page-title" className="t-display mt-7 !text-[clamp(34px,4.6vw,62px)]">
              Press and <span className="t-grad">Media Kit</span>
            </h1>
            <p className="t-lead measure mt-6">
              Everything a writer, event organiser or directory needs to describe {organization.name} accurately: approved descriptions, the founder bio, logos and photos.
              For verified company facts, see the{" "}
              <Link href="/about/facts" className="sp-inline-link">
                company fact sheet
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SpSection id="boilerplate" label="Boilerplate" title={`About ${organization.name}`}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <QuoteText id="boilerplate-short" label="Short boilerplate" paragraphs={[boilerplate.short]} />
          <QuoteText id="boilerplate-long" label="Long boilerplate" paragraphs={boilerplate.long} />
        </div>
      </SpSection>

      <SpSection id="founder" label="Founder" title={`${founder.name}, ${founder.jobTitle}`}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <QuoteText id="founder-short" label="Short bio" paragraphs={[founderBio.short]} />
          <QuoteText id="founder-long" label="Long bio" paragraphs={founderBio.long} />
        </div>
        <p className="mt-6 text-[15px] text-ink-2">
          Quote: “{founderBio.quote}” {founder.name}.{" "}
          <Link href={founder.path} className="sp-inline-link">
            Read the founder profile
          </Link>
        </p>
      </SpSection>

      <SpSection id="logos" label="Logos" title="Logo files">
        <p className="mb-6 max-w-[760px] text-[15px] text-ink-2">
          Spell the name as {organization.name} in text, or {organization.brandMark} where the wordmark style is used. Do not stretch, recolour or add effects to the logo.
        </p>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {logoDownloads.map((d) => (
            <li key={d.href} className="panel flex flex-col p-5">
              <div className={`fp-tile ${d.tile === "dark" ? "fp-tile-dark" : "fp-tile-light"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.href} alt={`${organization.name} ${d.label.toLowerCase()}`} loading="lazy" decoding="async" />
              </div>
              <p className="mt-4 font-display text-[15.5px] font-semibold text-ink">{d.label}</p>
              <p className="text-[13.5px] text-ink-3">
                {d.format} · {d.detail}
              </p>
              <a href={d.href} download className="group/btn mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-text">
                Download {d.format} <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </SpSection>

      <SpSection id="photos" label="Photos" title={`Photos of ${founder.name}`}>
        <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {founderPhotos.map((p) => (
            <li key={p.href} className="panel flex flex-col p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image src={p.href} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
              </div>
              <p className="mt-3 px-1 font-display text-[14.5px] font-semibold text-ink">{p.label}</p>
              <p className="px-1 text-[13px] text-ink-3">
                {p.format} · {p.detail}
              </p>
              <a href={p.href} download className="mt-2 px-1 text-[13.5px] font-semibold text-accent-text">
                Download
              </a>
            </li>
          ))}
        </ul>
      </SpSection>

      <SpSection id="colours" label="Brand colours" title="Brand colours">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {brandColours.map((c) => (
            <li key={c.hex} className="panel p-5">
              <div className="fp-swatch" style={{ background: c.hex }} aria-hidden="true" />
              <p className="mt-4 font-display text-[15.5px] font-semibold text-ink">{c.name}</p>
              <p className="text-[13.5px] text-ink-3">
                {c.hex} · {c.use}
              </p>
            </li>
          ))}
        </ul>
      </SpSection>

      <SpSection id="media-contact" label="Media contact" title="Media enquiries">
        <div className="max-w-[760px] space-y-2 text-[15.5px] text-ink-2">
          <p>
            Phone and WhatsApp:{" "}
            <a href={`tel:${office.phoneE164}`} className="sp-inline-link">
              {office.phone}
            </a>{" "}
            (
            <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="sp-inline-link" data-track="whatsapp_click" data-track-label="press_page">
              chat on WhatsApp
            </a>
            )
          </p>
          {organization.email ? (
            <p>
              Email:{" "}
              <a href={`mailto:${organization.email}`} className="sp-inline-link">
                {organization.email}
              </a>
            </p>
          ) : null}
          <p>
            Office: {office.streetAddress}, {office.locality}, {office.city}, {office.country}
          </p>
        </div>
      </SpSection>

      <BookingSection eyebrow="Talk to Madvert Labs" context="press" />
      <JsonLd data={{ ...schema.webPage(title, description, path), dateModified: updated }} />
    </>
  );
}
