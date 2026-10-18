import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { schema } from "@/lib/seo";

export type FaqItem = {
  q: string;
  /** Plain-text answer. Used for FAQPage JSON-LD, so it must say the same as the visible answer. */
  a: string;
  /** Optional rich version of the same answer (e.g. with links) for display. */
  answer?: ReactNode;
};

/**
 * Visible FAQ accordion built on <details>/<summary>: every question and answer is in the
 * server-rendered HTML whether or not it is expanded. Set `withSchema` to emit FAQPage JSON-LD
 * for exactly these visible items (only use it for genuine buyer questions).
 */
export function FAQ({
  items,
  withSchema = false,
  openFirst = true,
  className = "",
}: {
  items: FaqItem[];
  withSchema?: boolean;
  openFirst?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <div className={className}>
      <div className="divide-y divide-[color:var(--line)] border-y border-line">
        {items.map((f, i) => (
          <details key={f.q} className="group py-1" open={openFirst && i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <h3 className="text-[17px] font-semibold leading-snug">{f.q}</h3>
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-3 transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="pb-5 pr-2 text-[15.5px] leading-relaxed text-ink-2 sm:pr-10">{f.answer ?? <p>{f.a}</p>}</div>
          </details>
        ))}
      </div>
      {withSchema ? <JsonLd data={schema.faq(items.map(({ q, a }) => ({ q, a })))} /> : null}
    </div>
  );
}
