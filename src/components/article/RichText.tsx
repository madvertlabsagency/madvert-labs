import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/** Renders copy with inline [anchor text](/path) links and **bold** text. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1]) {
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
    } else {
      out.push(<strong key={i}>{m[3]}</strong>);
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}

/** The same copy as plain text (meta descriptions, JSON-LD). */
export function plainText(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}
