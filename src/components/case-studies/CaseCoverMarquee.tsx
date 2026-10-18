"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/types/content";
import "@/styles/case-marquee.css";

export type CoverItem = { slug: string; title: string; industry?: string; cover: ImageAsset };

/**
 * Real case study covers (PDF page one) drifting in two opposing rows on desktop.
 * Pauses on hover / focus and when off screen. The duplicate set that makes the loop seamless is
 * only added once the rows are in view on a screen where they actually move (desktop, motion allowed).
 * Mobile and reduced motion: one static, swipeable scroll-snap row with no duplicates.
 */
export function CaseCoverMarquee({ items, label = "Case study covers" }: { items: CoverItem[]; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) setLoop(true);
      },
      { rootMargin: "160px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!items.length) return null;

  // Row B runs the other way with the order rotated, so the two rows never line up the same cover.
  const shift = Math.ceil(items.length / 2);
  const rows = [
    { key: "a", dir: "left", list: items },
    { key: "b", dir: "right", list: [...items.slice(shift), ...items.slice(0, shift)] },
  ] as const;

  return (
    <div ref={ref} className="cm-wall" data-loop={loop || undefined} data-paused={!inView || undefined}>
      {rows.map((row) => (
        <div key={row.key} className={`cm-row cm-row--${row.dir} cm-row--${row.key}`} style={{ ["--cm-dur" as string]: `${row.list.length * 5}s` }}>
          <ul className="cm-track" aria-label={row.key === "a" ? label : undefined} aria-hidden={row.key === "b" || undefined}>
            {row.list.map((s) => (
              <Cover key={s.slug} s={s} hidden={row.key === "b"} />
            ))}
            {loop && row.list.map((s) => <Cover key={`dup-${s.slug}`} s={s} hidden />)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Cover({ s, hidden }: { s: CoverItem; hidden?: boolean }) {
  return (
    <li className="cm-item" aria-hidden={hidden || undefined}>
      <Link
        href={`/case-studies/${s.slug}`}
        className="cm-card"
        tabIndex={hidden ? -1 : undefined}
        data-track="case_study_open"
        data-track-label={`home_cover_marquee:${s.slug}`}
      >
        <span className="cm-cover">
          <Image
            src={s.cover.url}
            alt=""
            width={s.cover.width ?? 1000}
            height={s.cover.height ?? 1777}
            sizes="220px"
            loading="lazy"
            className="cm-img"
          />
        </span>
        {s.industry ? <span className="cm-ind">{s.industry}</span> : null}
        <span className="cm-info">
          <span className="cm-title">{s.title}</span>
          <span className="cm-open" aria-hidden="true">
            Read the case study
            <svg viewBox="0 0 12 12" width="10" height="10">
              <path d="M3 9l6-6M4.5 3H9v4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </Link>
    </li>
  );
}
