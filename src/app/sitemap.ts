import type { MetadataRoute } from "next";
import { getCaseStudies, getResources } from "@/cms";
import { pageDates } from "@/content/page-dates";
import { absoluteUrl } from "@/lib/site";

/**
 * Only canonical, indexable, public URLs: no portal or API routes, no parameters, no redirects,
 * no placeholder case studies and no resources that are only a pointer to another page.
 * lastmod comes from deliberate content dates (see src/content/page-dates.ts and each
 * case study / resource's dateModified), never from the build time.
 */
export async function sitemapEntries(): Promise<{ url: string; lastModified?: string }[]> {
  const [studies, resources] = await Promise.all([getCaseStudies(), getResources()]);
  return [
    ...Object.entries(pageDates).map(([path, date]) => ({ url: absoluteUrl(path), lastModified: date })),
    ...studies
      .filter((s) => !s.placeholder)
      .map((s) => ({ url: absoluteUrl(`/case-studies/${s.slug}`), lastModified: s.dateModified ?? s.publishedAt })),
    ...resources
      .filter((r) => !(r.externalUrl && !r.fileUrl && r.gating === "open"))
      .map((r) => ({ url: absoluteUrl(`/resources/${r.slug}`), lastModified: r.dateModified ?? r.datePublished })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await sitemapEntries()).map((e) => ({ url: e.url, lastModified: e.lastModified }));
}
