import { publishableMetrics } from "@/components/facts/metrics";
import type { CaseStudy, CaseStudyCategory, Metric } from "@/types/content";

/** A value counts as real content only if it is non-empty and not a bracketed placeholder like "[INDUSTRY]". */
export function isReal(v: string | null | undefined): v is string {
  if (!v) return false;
  const t = v.trim();
  return t.length > 0 && !/\[[^\]]*\]/.test(t);
}

/** Only verified metrics: real values on non-placeholder studies. Renders nothing when absent. */
export function verifiedMetrics(s: CaseStudy): Metric[] {
  if (s.placeholder) return [];
  return publishableMetrics(s.metrics).filter((m) => isReal(m.label) && isReal(m.value));
}

export const categoryLabels: Record<CaseStudyCategory, string> = {
  acquisition: "Client Acquisition",
  seo: "SEO",
  branding: "Branding",
  studios: "Studios",
  automation: "Automation",
  technology: "Technology",
};

export function primaryCategory(s: CaseStudy): CaseStudyCategory {
  return s.categories?.[0] ?? "acquisition";
}

/** Card kicker: "Industry · Market" when real, otherwise the category / system type. */
export function caseKicker(s: CaseStudy): string {
  const real = [s.industry, s.market ?? s.region].filter(isReal);
  if (real.length) return real.join(" · ");
  return isReal(s.systemType) ? s.systemType : categoryLabels[primaryCategory(s)];
}

export function oneLiner(s: CaseStudy): string {
  return (isReal(s.oneLiner) ? s.oneLiner : s.summary) ?? "";
}

/**
 * The fields a case study card needs, for passing to client components. Narrative sections
 * (challenge, strategy, implementation, gallery…) stay on the server, which keeps them out of the
 * page's RSC payload; the full story is rendered on the case study's own page.
 */
export function toCardStudy(s: CaseStudy): CaseStudy {
  return {
    slug: s.slug,
    title: s.title,
    client: s.client,
    industry: s.industry,
    market: s.market,
    region: s.region,
    categories: s.categories,
    services: s.services,
    systemType: s.systemType,
    summary: s.summary,
    oneLiner: s.oneLiner,
    metrics: verifiedMetrics(s).slice(0, 3),
    cover: s.cover,
    featuredImage: s.featuredImage,
    pdfUrl: s.pdfUrl,
    featured: s.featured,
    placeholder: s.placeholder,
    problem: "",
    diagnosis: "",
    move: "",
    system: "",
    result: "",
  };
}
