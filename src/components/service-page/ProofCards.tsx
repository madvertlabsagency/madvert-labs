import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { fallbackCaseStudies } from "@/cms/fallback";

/**
 * Real case studies only (from fallbackCaseStudies), linked to their full write-up. Figures are
 * shown exactly as stored; the first three metrics of each study are listed.
 */
export function ProofCards({ slugs, headingLevel = "h3" }: { slugs: string[]; headingLevel?: "h3" | "h4" }) {
  const studies = slugs
    .map((s) => fallbackCaseStudies.find((c) => c.slug === s && !c.placeholder))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  if (!studies.length) return null;
  const H = headingLevel;
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {studies.map((c, i) => (
        <li key={c.slug} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
          <article className="panel flex h-full flex-col p-6 sm:p-7">
            <p className="t-label">{[c.client, c.industry, c.market].filter(Boolean).join(" · ")}</p>
            <H className="mt-3 font-display text-[19px] font-semibold leading-snug text-ink">
              <Link href={`/case-studies/${c.slug}`} className="hover:text-accent-text">
                {c.title}
              </Link>
            </H>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.oneLiner}</p>
            <dl className="mt-5 grid grid-cols-1 gap-2 border-t border-line pt-4 text-[14px] sm:grid-cols-3">
              {c.metrics.slice(0, 3).map((m) => (
                <div key={`${m.label}-${m.value}`}>
                  <dt className="text-ink-3">{m.label}</dt>
                  <dd className="mt-0.5 font-display text-[18px] font-semibold text-ink">{m.value}</dd>
                  {m.context ? <dd className="text-[12px] text-ink-3">{m.context}</dd> : null}
                </div>
              ))}
            </dl>
            <Link
              href={`/case-studies/${c.slug}`}
              className="group/btn mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-accent-text"
              aria-label={`Read the case study: ${c.title}`}
            >
              Read the case study <Arrow />
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
