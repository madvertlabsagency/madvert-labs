import { fallbackCaseStudies } from "@/cms/fallback";
import { leadMagnets } from "@/content/lead-magnets";
import { pageDates } from "@/content/page-dates";

/** Public pages the site is known to serve, used to label crawler hits on unknown URLs. */
export const knownPublicPaths = new Set<string>([
  ...Object.keys(pageDates),
  ...fallbackCaseStudies.map((s) => `/case-studies/${s.slug}`),
  ...leadMagnets.map((r) => `/resources/${r.slug}`),
]);
