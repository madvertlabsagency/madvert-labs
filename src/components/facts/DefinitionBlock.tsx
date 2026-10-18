import type { ReactNode } from "react";

/**
 * A direct, self-contained definition of a term: 2–4 plain sentences that name the subject, so the
 * answer can be read (and quoted) on its own. The term is marked with <dfn> the first time it appears.
 *
 * `definition` should start with the term (e.g. "Meta Ads Lead Generation is …"); when it does, that
 * opening words are wrapped in <dfn>. Otherwise the term is prefixed as a label.
 */
export function DefinitionBlock({
  term,
  definition,
  children,
  heading,
  id,
  as = "section",
  className = "",
  textClassName = "t-lead",
}: {
  term: string;
  definition: string;
  /** Extra sentences that complete the answer (rendered as further paragraphs). */
  children?: ReactNode;
  /** Optional visible heading, e.g. "What is a growth system?". */
  heading?: string;
  id?: string;
  /** Use "div" when the block sits inside an existing section (e.g. directly under the H1). */
  as?: "section" | "div";
  className?: string;
  textClassName?: string;
}) {
  const Root = as;
  const headingId = heading && id ? `${id}-title` : undefined;
  const startsWithTerm = definition.toLowerCase().startsWith(term.toLowerCase());
  const body = startsWithTerm ? (
    <>
      <dfn className="not-italic font-semibold text-ink">{definition.slice(0, term.length)}</dfn>
      {definition.slice(term.length)}
    </>
  ) : (
    <>
      <dfn className="not-italic font-semibold text-ink">{term}</dfn>: {definition}
    </>
  );
  return (
    <Root id={id} className={`sp-definition ${className}`} aria-labelledby={headingId} data-definition>
      {heading ? (
        <h2 id={headingId} className="t-h2">
          {heading}
        </h2>
      ) : null}
      <div className={`${heading ? "mt-6" : ""} space-y-4 ${textClassName}`}>
        <p>{body}</p>
        {children}
      </div>
    </Root>
  );
}
