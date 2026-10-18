import type { ReactNode } from "react";
import "@/styles/facts.css";

/** "2026-10-18" -> "18 October 2026" (fixed UTC so server and client agree). */
export function formatIsoDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The short, self-contained answer placed directly under a page's H1: two to four plain sentences
 * that name the subject, so the answer can be read (and quoted) on its own. Server-rendered.
 *
 * Pass `answer` as one string per paragraph, or `children` for custom markup (keep it to <p>s).
 */
export function DirectAnswer({
  answer,
  children,
  updated,
  label = "Short answer",
  className = "",
}: {
  answer?: string | string[];
  children?: ReactNode;
  /** ISO date of the last material update of this answer. */
  updated?: string;
  label?: string;
  className?: string;
}) {
  const paragraphs = answer === undefined ? [] : Array.isArray(answer) ? answer : [answer];
  return (
    <section aria-label={label} className={`fx-answer max-w-[720px] ${className}`} data-direct-answer>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {children}
      {updated ? (
        <p className="!mt-4 !text-[13px] !text-ink-3">
          Updated <time dateTime={updated}>{formatIsoDate(updated)}</time>
        </p>
      ) : null}
    </section>
  );
}
