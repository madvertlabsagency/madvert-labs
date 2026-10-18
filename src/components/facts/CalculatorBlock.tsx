import type { ReactNode } from "react";
import "@/styles/facts.css";

export type CalculatorOutput = {
  id: string;
  label: string;
  /** Display value; use "—" when the figure cannot be calculated. */
  value: string;
  /** Space-separated ids of the inputs this output is calculated from (<output for>). */
  htmlFor?: string;
  note?: string;
  primary?: boolean;
};

/**
 * Generic calculator shell: title, description, an inputs region, results as <output> elements,
 * a formula disclosure and a disclaimer. Holds no state, so it renders on the server or inside a
 * client island; the island owns the inputs and passes computed values in.
 */
export function CalculatorBlock({
  id = "calculator",
  title,
  description,
  inputs,
  outputs,
  status,
  actions,
  formula,
  disclaimer,
  className = "",
}: {
  id?: string;
  title: string;
  description?: ReactNode;
  /** Labelled form controls. */
  inputs: ReactNode;
  outputs: CalculatorOutput[];
  /** Validation summary or other live status, announced politely. */
  status?: ReactNode;
  actions?: ReactNode;
  formula?: ReactNode;
  disclaimer?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`panel scroll-mt-28 p-5 sm:p-8 ${className}`} aria-labelledby={`${id}-title`} data-calculator>
      <h2 id={`${id}-title`} className="t-h3">
        {title}
      </h2>
      {description ? <div className="mt-3 max-w-[720px] text-[15.5px] leading-relaxed text-ink-2">{description}</div> : null}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="t-label mb-5">Your numbers</p>
          {inputs}
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        <div className="lg:col-span-6">
          <p className="t-label mb-5">Results</p>
          <div aria-live="polite" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {outputs.map((o) => (
              <div key={o.id} className={`fx-calc-out ${o.primary ? "is-primary sm:col-span-2" : ""}`}>
                <label htmlFor={o.id} className="text-[13.5px] text-ink-3">
                  {o.label}
                </label>
                <output id={o.id} htmlFor={o.htmlFor} name={o.id}>
                  {o.value}
                </output>
                {o.note ? <p className="mt-1 text-[12.5px] leading-snug text-ink-3">{o.note}</p> : null}
              </div>
            ))}
          </div>
          {status ? (
            <div role="status" className="mt-4">
              {status}
            </div>
          ) : null}
        </div>
      </div>
      {formula ? (
        <details className="fx-calc-formula mt-8 rounded-2xl border border-line p-5">
          <summary className="flex items-center justify-between gap-4 font-display text-[15.5px] font-semibold text-ink">
            How the calculator works
            <span aria-hidden="true" className="text-ink-3">
              +
            </span>
          </summary>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-2">{formula}</div>
        </details>
      ) : null}
      {disclaimer ? <div className="mt-6 text-[13px] leading-relaxed text-ink-3">{disclaimer}</div> : null}
    </section>
  );
}
