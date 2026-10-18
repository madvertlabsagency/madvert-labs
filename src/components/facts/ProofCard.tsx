import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import type { CaseStudy } from "@/types/content";
import { isPublishableMetric } from "./metrics";

/**
 * Links one REAL case study as proof: title, industry, one verified metric (when a publishable one
 * exists) and a link to the full write-up. Placeholder studies render nothing. The metric value is
 * shown exactly as stored; `metricLabel` picks a specific figure, otherwise the first publishable one.
 */
export function ProofCard({
  study,
  metricLabel,
  note,
  headingLevel = "h3",
  className = "",
}: {
  study: CaseStudy | null | undefined;
  metricLabel?: string;
  /** One sentence on why this study is relevant to the page (optional). */
  note?: string;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  if (!study || study.placeholder) return null;
  const metrics = (study.metrics ?? []).filter(isPublishableMetric);
  const metric = (metricLabel ? metrics.find((m) => m.label === metricLabel) : undefined) ?? metrics[0];
  const href = `/case-studies/${study.slug}`;
  const kicker = study.industry && !study.industry.includes("[") ? study.industry : "";
  const H = headingLevel;
  return (
    <article className={`panel flex h-full flex-col p-6 sm:p-7 ${className}`} data-proof-card>
      {kicker ? <p className="t-label">{kicker}</p> : null}
      <H className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink">
        <Link href={href} className="hover:text-accent-text">
          {study.title}
        </Link>
      </H>
      {note ? <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{note}</p> : null}
      {metric ? (
        <dl className="mt-5 border-t border-line pt-4">
          <dt className="text-[13.5px] text-ink-3">{metric.label}</dt>
          <dd className="mt-1 font-display text-[26px] font-semibold tracking-tight text-ink">{metric.value}</dd>
          {metric.source ? <dd className="mt-1 text-[12.5px] leading-snug text-ink-3">Source: {metric.source}</dd> : null}
        </dl>
      ) : null}
      <Link
        href={href}
        className="group/btn mt-auto inline-flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-accent-text"
        aria-label={`Read the case study: ${study.title}`}
      >
        Read the case study <Arrow />
      </Link>
    </article>
  );
}
