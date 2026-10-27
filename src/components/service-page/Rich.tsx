import Link from "next/link";
import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders copy that may contain inline links written as [anchor text](/path). */
export function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      /^https?:\/\//.test(m[2]) ? (
        <a key={i} href={m[2]} className="sp-inline-link" target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>
      ) : (
        <Link key={i} href={m[2]} className="sp-inline-link">
          {m[1]}
        </Link>
      ),
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}

/** The same copy as plain text (for meta descriptions and JSON-LD). */
export function plain(text: string) {
  return text.replace(LINK, "$1");
}
