import type { CSSProperties, ReactNode } from "react";
import "@/styles/facts.css";

/**
 * A process drawn as connected steps: a semantic <ol> whose items are joined by a CSS line
 * (horizontal when its container is at least 760px wide, vertical below). Server-rendered, no JavaScript or canvas.
 */
export function ProcessDiagram({
  steps,
  label,
  headingLevel = "h3",
  className = "",
}: {
  steps: { name: string; text?: ReactNode }[];
  /** Accessible name for the list, e.g. "How a lead becomes a qualified lead". */
  label?: string;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const H = headingLevel;
  const cols = Math.min(Math.max(steps.length, 2), 5);
  return (
    <div className={`fx-diagram-wrap ${className}`}>
    <ol className="fx-diagram" aria-label={label} style={{ "--fx-cols": cols } as CSSProperties}>
      {steps.map((s, i) => (
        <li key={s.name} className="fx-diagram-step">
          <span className="fx-diagram-dot" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="fx-diagram-body">
            <H className="font-display text-[17px] font-semibold leading-snug text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {s.name}
            </H>
            {s.text ? <div className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.text}</div> : null}
          </div>
        </li>
      ))}
    </ol>
    </div>
  );
}
