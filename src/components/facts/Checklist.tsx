import type { ReactNode } from "react";
import "@/styles/facts.css";

/** A checklist as a semantic <ul>; each item may carry a short explanatory detail. Server-rendered. */
export function Checklist({
  items,
  label,
  className = "",
}: {
  items: { text: ReactNode; detail?: ReactNode; key?: string }[];
  /** Accessible name for the list. */
  label?: string;
  className?: string;
}) {
  return (
    <ul className={`fx-check ${className}`} aria-label={label}>
      {items.map((it, i) => (
        <li key={it.key ?? (typeof it.text === "string" ? it.text : i)}>
          <span className="fx-check-mark" aria-hidden="true">
            <svg viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7.4l2.9 2.8 6.1-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block text-[16px] font-medium leading-relaxed text-ink">{it.text}</span>
            {it.detail ? <span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{it.detail}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
