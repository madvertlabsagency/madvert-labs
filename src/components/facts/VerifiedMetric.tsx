import type { Metric } from "@/types/content";

/**
 * One verified figure from a real case study, rendered as a <dt>/<dd> pair so the label, value,
 * source and caveat stay together in the server-rendered HTML. Must be placed inside a <dl>.
 *
 * Only pass figures that exist in the case study evidence. `source` says where a reader can check
 * the number; `qualification` states any honest caveat (rounding, what the screenshot does not show).
 */
export function VerifiedMetric({
  metric,
  client,
  period,
  compact = false,
}: {
  metric: Metric;
  /** Client or client description the figure belongs to. */
  client?: string;
  /** Reporting period, only when the evidence states it. */
  period?: string;
  /** Compact tile: value, label and context only (used in the headline band). */
  compact?: boolean;
}) {
  const meta = [client, period].filter(Boolean).join(" · ");
  return (
    <div className="rounded-2xl border border-line bg-glass p-5 md:p-6" data-metric>
      <dt className="text-[13.5px] text-ink-3">{metric.label}</dt>
      <dd className="mt-3 font-display text-[clamp(22px,2.4vw,34px)] font-semibold tracking-tight text-ink">{metric.value}</dd>
      {metric.context ? <dd className="mt-2 text-[12.5px] text-ink-3">{metric.context}</dd> : null}
      {!compact && (metric.source || meta) ? (
        <dd className="mt-3 border-t border-line pt-3 text-[12.5px] leading-snug text-ink-3">
          {metric.source ? (
            <>
              <span className="text-ink-2">Source:</span> {metric.source}
            </>
          ) : null}
          {meta ? <span className="block">{meta}</span> : null}
        </dd>
      ) : null}
      {!compact && metric.qualification ? (
        <dd className="mt-2 text-[12.5px] leading-snug text-ink-2">
          <span className="text-accent-text">Note:</span> {metric.qualification}
        </dd>
      ) : null}
    </div>
  );
}
