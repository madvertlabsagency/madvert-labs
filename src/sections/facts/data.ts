import { fallbackCaseStudies, fallbackResources } from "@/cms/fallback";
import { founder, organization } from "@/lib/entities";
import { office } from "@/lib/site";
import { industryChips } from "@/sections/about/data";

/*
 * Data for /about/facts and /press. Every statement here is assembled from verified facts already
 * in the repo: entities.ts (organisation, founder, services), site.ts (office, WhatsApp), the
 * published case studies and resources, and founder copy supplied by the client for the About page.
 * No founding year, team size, client count, award or rating is stated, because none is verified.
 */

/** Published (non-placeholder) case studies, with the industry label used on the About page. */
export function publishedCaseStudies() {
  return fallbackCaseStudies.filter((s) => !s.placeholder);
}

export function caseStudyIndustries() {
  return industryChips(publishedCaseStudies(), []).filter((c) => c.kind === "Case study");
}

export function publishedResourceCount() {
  return fallbackResources.filter((r) => !r.placeholder).length;
}

export const fullAddress = `${office.streetAddress}, ${office.locality}, ${office.city}, ${office.region}, ${office.country}`;

/** Approved descriptions, written once so every page, profile and press mention says the same thing. */
export const approvedDescriptions = {
  oneSentence: `${organization.name} is a digital marketing and growth systems company in Karachi, Pakistan, that connects branding, client acquisition, conversion, creative production, CRM and automation, AI and technology into one growth system for established businesses.`,
  paragraph: `${organization.name} is a digital marketing and growth systems company founded by ${founder.name}, its ${founder.jobTitle}. ${organization.name} works as an external growth department for established businesses, first in Pakistan and also internationally, from its office in Bahria Town Karachi. Instead of selling separate campaigns, ${organization.name} connects branding, client acquisition, conversion, creative production through Madvert Studios, CRM and automation, AI and technology into one growth system, and judges marketing by qualified opportunities and revenue rather than raw lead volume.`,
};

export const boilerplate = {
  short: `${organization.name} is a digital marketing and growth systems company based in Karachi, Pakistan. ${organization.name} connects branding, client acquisition, conversion, creative production, CRM and automation, AI and technology into one growth system for established businesses in Pakistan and internationally.`,
  long: [
    `${organization.name} is a digital marketing and growth systems company founded by ${founder.name} and based in Bahria Town Karachi, Pakistan. ${organization.name} works as an external growth department for established businesses, first in Pakistan and also with international clients.`,
    `${organization.name} plans and runs Meta Ads and Google Ads lead generation, performance marketing, SEO and AI search visibility (answer engine optimisation), branding, social media, websites and landing pages, CRM, WhatsApp and email automation, AI agents and custom software. Its creative production arm, Madvert Studios, produces ad creatives, short form video and brand films.`,
    `${organization.name} designs these as one connected growth system and measures them by qualified opportunities, sales and revenue rather than clicks or raw lead volume. Published case studies with verified numbers are available at madvertlabs.com/case-studies.`,
  ],
};

export const founderBio = {
  short: `${founder.name} is the ${founder.jobTitle} of ${organization.name}. For approximately five years Usama has worked across digital marketing, customer acquisition, funnels, automation and growth systems.`,
  long: [
    `${founder.name} is the ${founder.jobTitle} of ${organization.name}, a digital marketing and growth systems company in Karachi, Pakistan.`,
    `Usama's work began in digital marketing and performance acquisition. The campaigns kept uncovering bigger problems behind them: weak offers, poor landing pages, low quality leads, slow follow up, missing CRM systems, poor tracking and technology gaps. That is why ${organization.name} evolved from campaign execution into connected growth systems.`,
    `For approximately five years Usama has worked across digital marketing, customer acquisition, funnels, automation and growth systems, for businesses ranging from direct to consumer products to established corporate and service based businesses. Usama leads the Business Strategy Calls at ${organization.name} and is the author of several free Madvert Vault playbooks and checklists.`,
  ],
  quote: "When people were learning it, I was building it.",
};

export const brandColours = [
  { name: "Midnight", hex: "#0A0F1C", use: "Primary background and dark surfaces" },
  { name: "Electric Blue", hex: "#00B4FF", use: "Primary accent, buttons and highlights" },
  { name: "Cyan", hex: "#00E5FF", use: "Secondary accent and gradients" },
];

export type Download = { label: string; detail: string; href: string; format: string; tile: "dark" | "light" };

export const logoDownloads: Download[] = [
  { label: "Logo for dark backgrounds", detail: "1377 × 308 px", href: "/brand/logo-dark.png", format: "PNG", tile: "dark" },
  { label: "Logo for dark backgrounds", detail: "640 × 143 px", href: "/brand/logo-dark.webp", format: "WebP", tile: "dark" },
  { label: "Logo with descriptor, dark backgrounds", detail: "1377 × 420 px", href: "/brand/logo-dark-descriptor.png", format: "PNG", tile: "dark" },
  { label: "Logo for light backgrounds", detail: "1206 × 248 px", href: "/brand/logo-light.png", format: "PNG", tile: "light" },
  { label: "Logo for light backgrounds", detail: "640 × 132 px", href: "/brand/logo-light.webp", format: "WebP", tile: "light" },
  { label: "Logo with descriptor, light backgrounds", detail: "1206 × 313 px", href: "/brand/logo-light-descriptor.png", format: "PNG", tile: "light" },
  { label: "App icon", detail: "512 × 512 px", href: "/brand/app-icon-512.png", format: "PNG", tile: "dark" },
];

export const founderPhotos = [
  { label: "Portrait", detail: "800 × 1200 px", href: "/images/usama-abbas-dahri.jpg", format: "JPG", alt: `${founder.name}, ${founder.jobTitle} of ${organization.name}` },
  { label: "Portrait", detail: "800 × 1000 px", href: "/images/usama-abbas-dahri-portrait.webp", format: "WebP", alt: `Portrait of ${founder.name}` },
  { label: "Profile photo", detail: "800 × 1000 px", href: "/images/usama-abbas-dahri-hero.webp", format: "WebP", alt: `${founder.name}, profile photo` },
  { label: "Presenting", detail: "960 × 1280 px", href: "/images/usama-abbas-dahri-presenting.webp", format: "WebP", alt: `${founder.name} presenting in a meeting room` },
];
