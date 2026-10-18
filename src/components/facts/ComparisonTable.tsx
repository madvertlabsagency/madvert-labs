/**
 * A real, accessible comparison table: <caption>, column headers with scope="col" and row headers
 * with scope="row". Scrolls horizontally inside its own wrapper on narrow screens, never the page.
 */
export function ComparisonTable({
  caption,
  rowHeader,
  columns,
  rows,
  highlight,
  note,
  className = "",
}: {
  caption: string;
  /** Header for the first column (the row labels). */
  rowHeader: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
  /** Index of the column to visually emphasise (e.g. Madvert's approach). */
  highlight?: number;
  /** Optional footnote shown under the table. */
  note?: string;
  className?: string;
}) {
  return (
    <figure className={`sp-table-wrap ${className}`}>
      <div className="sp-table-scroll" tabIndex={0} role="region" aria-label={caption}>
        <table className="sp-table">
          <caption className="sp-table-caption">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">{rowHeader}</th>
              {columns.map((c, i) => (
                <th key={c} scope="col" className={highlight === i ? "is-highlight" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.cells.map((cell, i) => (
                  <td key={i} className={highlight === i ? "is-highlight" : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <figcaption className="mt-4 text-[13.5px] leading-relaxed text-ink-3">{note}</figcaption> : null}
    </figure>
  );
}
