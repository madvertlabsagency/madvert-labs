"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps a decorative scene and marks it `data-live` while it is on screen (CSS animations run
 * only then) and `data-seen` once it has appeared (one-shot entrance animations). Reduced motion
 * is handled in about.css, where every animation falls back to its static final state.
 */
export function Live({
  children,
  className = "",
  style,
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        el.toggleAttribute("data-live", e.isIntersecting);
        if (e.isIntersecting) el.setAttribute("data-seen", "");
      },
      { rootMargin: "60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={style} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}
