import type { CaseStudy, Testimonial } from "@/types/content";

/**
 * About page data that is derived from real site content only.
 *
 * Industries come from the published case studies (fallbackCaseStudies or the CMS), the real
 * client video testimonials, and the custom patches partnership landing page. Nothing here is
 * invented: a study without a curated label falls back to its own `industry` field, so new case
 * studies appear automatically.
 */

export type IndustryChip = { label: string; href?: string; kind: "Case study" | "Client story" | "Client work" };

/** Shorter display labels for the industries named in each published case study. */
const caseLabels: Record<string, string> = {
  "home-improvement-uae": "Home Improvement",
  "agency-lead-generation": "Marketing Agencies",
  "texas-solar": "Residential Solar",
  "tap-center-fitness": "Fitness and Wellness",
  "cellsol-energy": "Renewable Energy",
  "bookkeeping-appointments": "Bookkeeping and Finance",
  "dubai-real-estate-nigeria": "Real Estate Investment",
  "dubai-interior-design": "Luxury Interior Design",
  "earthly-elementals": "Private Label Health Products",
};

/** Real client testimonial industries (see realTestimonials in src/cms/fallback.ts), relabelled for display. */
const testimonialLabels: Record<string, string> = {
  Events: "Events Management",
  "Home Chef Business": "Home Chef Food Business",
};

function cleanIndustry(s: string) {
  return s
    .replace(/\(.*?\)/g, "")
    .replace(/\s*\/\s*/g, " and ")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim();
}

export function industryChips(studies: CaseStudy[], testimonials: Testimonial[]): IndustryChip[] {
  const out: IndustryChip[] = [];
  const seen = new Set<string>();
  const push = (c: IndustryChip) => {
    const k = c.label.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    out.push(c);
  };
  for (const s of studies) {
    if (s.placeholder || !s.industry) continue;
    push({ label: caseLabels[s.slug] ?? cleanIndustry(s.industry), href: `/case-studies/${s.slug}`, kind: "Case study" });
  }
  for (const t of testimonials) {
    if (t.placeholder || !t.industry) continue;
    push({ label: testimonialLabels[t.industry] ?? cleanIndustry(t.industry), kind: "Client story" });
  }
  // The custom patches partnership programme (www.madvertlabs.com/custom-patches).
  push({ label: "Custom Patches Manufacturing", kind: "Client work" });
  return out;
}

/**
 * Verified credentials (certificates, platform partner badges). EMPTY until the client supplies
 * the real certificate file. Add an entry here and <CredentialCard /> renders it; with no entries
 * the card renders nothing at all. Never add a credential that has not been verified.
 *
 * Example:
 * { title: "Meta Certified Media Buying Professional", issuer: "Meta", logo: "/brand/meta.svg",
 *   image: "/images/credentials/meta-certificate.webp", url: "https://www.credly.com/..." }
 */
export type Credential = {
  title: string;
  issuer: string;
  /** Issuer logo (path under /public). Optional. */
  logo?: string;
  /** Certificate image (path under /public). Optional. */
  image?: string;
  /** Public verification URL. Optional. */
  url?: string;
};

export const credentials: Credential[] = [];
