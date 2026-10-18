"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Mounts a decorative, aria-hidden visual only when it approaches the viewport.
 *
 * The wrapper is always rendered (with the visual's own size classes or aspect ratio), so layout
 * never shifts. Until then the server HTML contains no SVG for it: smaller documents, less style
 * and layout work on first load, and no hydration cost for scenes far below the fold.
 * Never wrap real content (text, headings, links) in this — only illustrations.
 */
export function Deferred({
  children,
  className = "",
  style,
  rootMargin = "900px 0px",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {show ? children : null}
    </div>
  );
}
