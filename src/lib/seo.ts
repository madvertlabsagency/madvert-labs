import type { Metadata } from "next";
import { absoluteUrl, office, site } from "./site";
import { founder, organization } from "./entities";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? ogImageUrl(title, path);
  const images = [{ url: ogImage, width: image ? undefined : 1200, height: image ? undefined : 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url, siteName: site.name, type, images, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

const OG_LABELS: [RegExp, string][] = [
  [/^\/services\//, "Services"],
  [/^\/case-studies\//, "Case Study"],
  [/^\/insights\//, "Insights"],
  [/^\/resources\//, "Madvert Vault"],
  [/^\/industries/, "Industries"],
  [/^\/glossary/, "Glossary"],
  [/^\/(about|press)/, "About"],
];

/** Branded /og card for pages without their own image (see src/app/og/route.tsx). */
export function ogImageUrl(title: string, path: string) {
  const label = OG_LABELS.find(([re]) => re.test(path))?.[1] ?? site.name;
  const clean = title.replace(/\s*\|\s*Madvert Labs$/, "");
  return `/og?${new URLSearchParams({ title: clean, label }).toString()}`;
}

const ORG_ID = `${site.url}/#organization`;
const PERSON_ID = `${site.url}/#founder`;

export const schema = {
  /**
   * Organization + ProfessionalService: the Karachi office has a verified Google Business Profile,
   * so the address and phone below are real and must stay identical to that profile.
   */
  organization: () => ({
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: organization.name,
    alternateName: ["Madvert", organization.brandMark],
    description: organization.description,
    slogan: organization.slogan,
    url: organization.url,
    logo: { "@type": "ImageObject", url: organization.logo, width: 512, height: 512 },
    email: organization.email,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.city,
      addressRegion: office.region,
      addressCountry: office.countryCode,
    },
    telephone: office.phoneE164,
    image: absoluteUrl("/brand/app-icon-512.png"),
    hasMap: office.gbpUrl ?? office.mapsUrl,
    areaServed: organization.areaServed,
    sameAs: [...organization.sameAs, ...(office.gbpUrl ? [office.gbpUrl] : [])].length ? [...organization.sameAs, ...(office.gbpUrl ? [office.gbpUrl] : [])] : undefined,
    knowsAbout: [
      "Digital marketing",
      "Growth systems",
      "Branding",
      "Meta Ads lead generation",
      "Google Ads",
      "Search engine optimisation",
      "AI search visibility",
      "Conversion rate optimisation",
      "Creative and video production",
      "CRM and marketing automation",
      "AI agents",
      "Web and app development",
    ],
  }),
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: organization.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  }),
  founder: () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: founder.name,
    givenName: founder.givenName,
    familyName: founder.familyName,
    jobTitle: founder.jobTitle,
    url: absoluteUrl(founder.path),
    image: absoluteUrl(founder.image),
    worksFor: { "@id": ORG_ID },
    sameAs: founder.sameAs.length ? founder.sameAs : undefined,
  }),
  video: (v: { name: string; description: string; thumbnail: string; contentUrl: string; uploadDate: string; duration: string; path: string }) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: [absoluteUrl(v.thumbnail)],
    contentUrl: absoluteUrl(v.contentUrl),
    uploadDate: v.uploadDate,
    duration: v.duration,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    url: absoluteUrl(v.path),
  }),
  webPage: (name: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": ORG_ID },
  }),
  breadcrumbs: (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }),
  service: (s: { name: string; description: string; path: string; serviceType: string; audience?: string }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": ORG_ID },
    areaServed: organization.areaServed,
    audience: s.audience ? { "@type": "BusinessAudience", audienceType: s.audience } : undefined,
  }),
  faq: (items: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }),
  article: (a: {
    headline: string;
    description: string;
    path: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    type?: string;
    /** "founder" only when the page visibly shows the founder's byline. */
    author?: "founder" | "organization";
    about?: string[];
  }) => ({
    "@context": "https://schema.org",
    "@type": a.type ?? "Article",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    image: a.image,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { "@id": a.author === "founder" ? PERSON_ID : ORG_ID },
    publisher: { "@id": ORG_ID },
    about: a.about?.length ? a.about.map((name) => ({ "@type": "Thing", name })) : undefined,
    inLanguage: "en",
  }),
};
