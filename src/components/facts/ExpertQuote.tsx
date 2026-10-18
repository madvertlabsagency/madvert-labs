import Link from "next/link";
import { founder } from "@/lib/entities";

/**
 * A quote from a named person, as <figure><blockquote><figcaption>. Only use it for words that
 * genuinely appear in the site's own copy for that person; never invent or paraphrase a quote.
 * Defaults to the founder and links to the founder page.
 */
export function ExpertQuote({
  quote,
  name = founder.name,
  role = `${founder.jobTitle}, Madvert Labs`,
  href = founder.path,
  className = "",
}: {
  quote: string;
  name?: string;
  role?: string;
  href?: string;
  className?: string;
}) {
  return (
    <figure className={`sp-quote ${className}`}>
      <blockquote>
        <p className="t-h2">“{quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 text-[15px]">
        <span aria-hidden="true" className="h-px w-8 bg-[linear-gradient(90deg,var(--accent),var(--cyan))]" />
        <span>
          <Link href={href} className="font-semibold text-ink underline-offset-4 hover:underline">
            {name}
          </Link>
          <span className="text-ink-3">, {role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
