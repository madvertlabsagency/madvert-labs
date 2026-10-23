/** A block of approved, ready-to-quote text with a label and a character count. Server-rendered. */
export function QuoteText({ label, paragraphs, id }: { label: string; paragraphs: string[]; id?: string }) {
  const chars = paragraphs.join("\n\n").length;
  return (
    <figure className="fp-quote panel" id={id}>
      <figcaption className="fp-quote-head">
        <span className="t-label !text-accent-text">{label}</span>
        <span className="fp-count">{chars} characters</span>
      </figcaption>
      <blockquote>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </blockquote>
    </figure>
  );
}
