import type { Metric } from "@/types/content";
import { VerifiedMetric } from "./VerifiedMetric";
import { publishableMetrics } from "./metrics";

/**
 * The verified result of a case study: the outcome in the client's terms, every verified figure
 * with its source, and the limitations a reader should weigh before relying on the numbers.
 * Renders two labelled sections (outcome, limitations) so each can be linked from the page index.
 */
export function CaseStudyResult({
  outcome,
  metrics: allMetrics,
  limitations,
  client,
  period,
  outcomeId = "outcome",
  limitationsId = "limitations",
  stepClassName = "cs-step scroll-mt-28 border-t border-line py-10",
  outcomeNumber,
  limitationsNumber,
}: {
  outcome?: string;
  metrics: Metric[];
  limitations?: string[];
  client?: string;
  period?: string;
  outcomeId?: string;
  limitationsId?: string;
  stepClassName?: string;
  outcomeNumber?: number;
  limitationsNumber?: number;
}) {
  const metrics = publishableMetrics(allMetrics);
  const num = (n?: number) =>
    n ? (
      <span className="cs-step-num" aria-hidden="true">
        {String(n).padStart(2, "0")}
      </span>
    ) : null;
  return (
    <>
      {outcome || metrics.length ? (
        <section id={outcomeId} className={stepClassName} aria-labelledby={`${outcomeId}-title`}>
          {num(outcomeNumber)}
          <div>
            <h2 id={`${outcomeId}-title`} className="t-label !text-accent-text">
              Verified Outcome
            </h2>
            {outcome ? <p className="mt-4 text-[18px] leading-relaxed text-ink">{outcome}</p> : null}
            {metrics.length ? (
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {metrics.map((m) => (
                  <VerifiedMetric key={`${m.label}-${m.value}`} metric={m} client={client} period={period} />
                ))}
              </dl>
            ) : null}
          </div>
        </section>
      ) : null}
      {limitations?.length ? (
        <section id={limitationsId} className={stepClassName} aria-labelledby={`${limitationsId}-title`}>
          {num(limitationsNumber)}
          <div>
            <h2 id={`${limitationsId}-title`} className="t-label !text-accent-text">
              Limitations and Context
            </h2>
            <ul className="mt-5 space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
