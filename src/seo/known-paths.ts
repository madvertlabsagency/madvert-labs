import { fallbackCaseStudies } from "@/cms/fallback";
import { leadMagnets } from "@/content/lead-magnets";
import { pageDates } from "@/content/page-dates";
import { articlePath, articles } from "@/content/articles";
import { glossaryPagePath, glossaryPages } from "@/content/glossary-pages";

/** Public pages the site is known to serve, used to label crawler hits on unknown URLs. */
export const knownPublicPaths = new Set<string>([
  ...Object.keys(pageDates),
  ...fallbackCaseStudies.map((s) => `/case-studies/${s.slug}`),
  ...leadMagnets.map((r) => `/resources/${r.slug}`),
  ...articles.map(articlePath),
  ...Object.keys(glossaryPages).map(glossaryPagePath),
]);
