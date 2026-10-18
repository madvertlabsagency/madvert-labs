import type { ReactNode } from "react";

/** An ordered process: each step has a name and a plain explanation, as a semantic <ol>. */
export function ProcessSteps({
  steps,
  className = "",
  headingLevel = "h3",
}: {
  steps: { name: string; text: ReactNode }[];
  className?: string;
  headingLevel?: "h3" | "h4";
}) {
  const H = headingLevel;
  return (
    <ol className={`sp-steps ${className}`}>
      {steps.map((s, i) => (
        <li key={s.name} className="sp-step" data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
          <span className="sp-step-num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <H className="font-display text-[18px] font-semibold leading-snug text-ink">
            <span className="sr-only">Step {i + 1}: </span>
            {s.name}
          </H>
          <div className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{s.text}</div>
        </li>
      ))}
    </ol>
  );
}
