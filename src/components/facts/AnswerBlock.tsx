import Link from "next/link";
import type { ReactNode } from "react";
import { Rich } from "@/components/service-page/Rich";
import "@/styles/facts.css";

export type AnswerBlockProps = {
  /** The question exactly as a buyer would ask it; rendered as a heading. */
  question: string;
  /** Self-contained direct answer (about 40 to 70 words) that names the subject. Plain text or [anchor](/path) links. */
  answer: string;
  /** Optional supporting explanation paragraphs. */
  support?: string[];
  /** Optional example or first-party evidence, ideally linking to a published case study. */
  evidence?: { text: string; href?: string; anchor?: string };
  /** Optional related resource for readers who want more. */
  related?: { href: string; anchor: string };
  headingLevel?: "h2" | "h3";
  id?: string;
  children?: ReactNode;
};

/**
 * AEO answer block: Question → Direct answer → Supporting explanation → Example / evidence →
 * Related resource. Server-rendered and fully visible (never inside a closed tab), so people,
 * search engines and answer engines read the same answer. Pair with schema.faq() only when the
 * blocks on a page are genuine buyer questions.
 */
export function AnswerBlock({ question, answer, support, evidence, related, headingLevel = "h3", id, children }: AnswerBlockProps) {
  const H = headingLevel;
  return (
    <section className="fx-answer-block panel p-6 sm:p-7" id={id} aria-labelledby={id ? `${id}-q` : undefined} data-answer-block>
      <H id={id ? `${id}-q` : undefined} className="font-display text-[19px] font-semibold leading-snug text-ink">
        {question}
      </H>
      <p className="mt-3 text-[16px] leading-relaxed text-ink" data-direct-answer>
        <Rich text={answer} />
      </p>
      {support?.map((p) => (
        <p key={p} className="mt-3 text-[15px] leading-relaxed text-ink-2">
          <Rich text={p} />
        </p>
      ))}
      {evidence ? (
        <p className="fx-answer-evidence mt-4 text-[14.5px] leading-relaxed text-ink-2">
          <span className="t-label mr-2 !text-accent-text">Example</span>
          <Rich text={evidence.text} />
          {evidence.href ? (
            <>
              {" "}
              <Link href={evidence.href} className="sp-inline-link">
                {evidence.anchor ?? "See the evidence"}
              </Link>
            </>
          ) : null}
        </p>
      ) : null}
      {children}
      {related ? (
        <p className="mt-4 text-[14.5px]">
          <Link href={related.href} className="font-semibold text-accent-text hover:underline">
            {related.anchor}
          </Link>
        </p>
      ) : null}
    </section>
  );
}
