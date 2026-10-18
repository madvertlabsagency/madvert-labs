"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Marks a decorative scene as live while it is on screen (data-live) and as seen once it has
 * entered (data-seen). CSS uses data-seen to start the entrance and data-live to pause loops
 * offscreen. Returns `live` for scenes that sequence stages from JS.
 */
export function useLive(ref: RefObject<HTMLElement | null>, threshold = 0.25) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-live", "");
          el.setAttribute("data-seen", "");
        } else el.removeAttribute("data-live");
        setLive(e.isIntersecting);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return live;
}

/** True when the visitor prefers reduced motion (client only; false during SSR). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
