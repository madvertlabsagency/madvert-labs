"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { track } from "@/analytics/track";
import type { Testimonial } from "@/types/content";
import { VideoLightbox } from "./VideoLightbox";
import { realTestimonials } from "./utils";
import "@/styles/testimonials.css";

/** Below this many real videos the wall shows them as featured stories instead of a marquee. */
const MARQUEE_MIN = 6;


/** Repeat a row until it is long enough to fill a wide screen, so the marquee never shows a gap. */
function fill<T>(list: T[], min: number): T[] {
  if (!list.length) return list;
  const out = [...list];
  while (out.length < min) out.push(...list);
  return out;
}

const businessOf = (t: Testimonial) => t.business ?? t.company;

/** Orientation of the poster the viewer just clicked, so the lightbox opens at the right shape. */
function posterIsPortrait(e: MouseEvent<HTMLElement>) {
  const img = e.currentTarget.closest("[data-tm-card]")?.querySelector("img");
  return img && img.naturalWidth ? img.naturalHeight > img.naturalWidth : undefined;
}

export function TestimonialWall({ items }: { items: Testimonial[] }) {
  const real = realTestimonials(items);
  const [open, setOpen] = useState<{ t: Testimonial; portrait?: boolean } | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const play = (t: Testimonial, portrait?: boolean) => {
    track("showreel_play", { source: "testimonial", label: t.name, page: window.location.pathname });
    setOpen({ t, portrait });
  };

  if (!real.length) return null;

  return (
    <>
      {real.length >= MARQUEE_MIN ? <Marquee items={real} onPlay={play} /> : <Featured items={real} onPlay={play} />}
      <VideoLightbox item={open?.t ?? null} portrait={open?.portrait} onClose={close} />
    </>
  );
}

type PlayFn = (t: Testimonial, portrait?: boolean) => void;

/* ───────── Featured stories: a small number of real videos, shown large ───────── */

function Featured({ items, onPlay }: { items: Testimonial[]; onPlay: PlayFn }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: items.length <= 2 });
  const slider = items.length > 2;

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !slider) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [slider, update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  return (
    <div className="container-x">
      <div className={slider ? "tm-slider" : undefined}>
        <ul ref={ref} className={`tm-feature ${items.length === 1 ? "tm-feature--one" : ""} ${slider ? "tm-feature--slide" : ""}`} aria-label="Client video testimonials">
          {items.map((t, i) => (
            <li key={t.id} data-reveal style={{ ["--reveal-delay" as string]: i * 90 }}>
              <StoryCard t={t} onPlay={onPlay} />
            </li>
          ))}
        </ul>
        {slider ? (
          <div className="tm-slider-nav">
            <button type="button" className="tm-slider-btn" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="tm-slider-btn" onClick={() => go(1)} disabled={edge.end} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StoryCard({ t, onPlay }: { t: Testimonial; onPlay: PlayFn }) {
  const business = businessOf(t);
  const label = `Play video testimonial from ${t.name}${business ? `, ${business}` : ""}${t.duration ? ` (${t.duration})` : ""}`;
  return (
    <figure className="tm-story" data-tm-card>
      <button type="button" className="tm-story-media" onClick={(e) => onPlay(t, posterIsPortrait(e))} aria-label={label}>
        {t.posterUrl ? <Image src={t.posterUrl} alt="" fill sizes="(min-width: 1024px) 230px, 40vw" className="tm-story-img" /> : null}
        <span className="tm-story-shade" aria-hidden="true" />
        <PlayButton />
        {t.duration ? <span className="tm-story-dur">{t.duration}</span> : null}
      </button>
      <figcaption className="tm-story-body">
        {t.industry ? <span className="tm-story-ind">{t.industry}</span> : null}
        <blockquote className="tm-story-quote">
          <span className="tm-qmark" aria-hidden="true">
            “
          </span>
          {t.quote}
        </blockquote>
        <div className="tm-story-who">
          <span className="tm-story-name">{t.name}</span>
          <span className="tm-story-role">{[t.role, business].filter(Boolean).join(", ")}</span>
        </div>
        <button type="button" className="tm-story-watch" onClick={(e) => onPlay(t, posterIsPortrait(e))} tabIndex={-1} aria-hidden="true">
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M3.5 2.2v7.6L9.8 6z" fill="currentColor" />
          </svg>
          Watch the story{t.duration ? ` · ${t.duration}` : ""}
        </button>
      </figcaption>
    </figure>
  );
}

function PlayButton() {
  return (
    <span className="tm-play" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M8.5 5.8v12.4L18.6 12z" fill="currentColor" />
      </svg>
    </span>
  );
}

/* ───────── Marquee: two opposing rows, used once there are enough real videos ───────── */

function Marquee({ items, onPlay }: { items: Testimonial[]; onPlay: PlayFn }) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  // The duplicate cards that make the marquee seamless exist only once the wall is in view on a
  // screen where it actually scrolls (desktop, motion allowed), so they never weigh down first load.
  const [loop, setLoop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) setLoop(true);
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const half = Math.ceil(items.length / 2);
  const rows = [
    { key: "a", label: "Client video reviews", dir: "right" as const, list: items.slice(0, half) },
    { key: "b", label: "More client stories", dir: "left" as const, list: items.slice(half) },
  ].filter((r) => r.list.length);

  return (
    <div ref={ref} className="tm-wall" data-paused={paused || !inView ? "true" : "false"}>
      {rows.map((row, ri) => {
        const set = fill(row.list, 6);
        return (
          <div key={row.key} className="tm-row-wrap">
            <div className="container-x tm-row-head">
              <span className="tm-row-icon" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="10" height="10">
                  <path d="M3.5 2.2v7.6L9.8 6z" fill="currentColor" />
                </svg>
              </span>
              <h3 className="tm-row-label">{row.label}</h3>
              <span className="tm-row-rule" aria-hidden="true" />
              {ri === 0 ? (
                <button type="button" className="tm-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
                  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                    {paused ? <path d="M3.5 2.2v7.6L9.8 6z" fill="currentColor" /> : <path d="M3.2 2.2h2v7.6h-2zM6.8 2.2h2v7.6h-2z" fill="currentColor" />}
                  </svg>
                  <span>{paused ? "Play motion" : "Pause motion"}</span>
                </button>
              ) : null}
            </div>
            <div className={`tm-row tm-row--${row.dir}`} style={{ ["--tm-dur" as string]: `${set.length * 7}s` }}>
              <ul className="tm-track" aria-label={row.label}>
                {set.map((t, i) => (
                  <li key={`${t.id}-${i}`} className={`tm-item ${i >= row.list.length ? "tm-item--fill" : ""}`} aria-hidden={i >= row.list.length || undefined}>
                    <TestimonialCard t={t} featured={i % 4 === 1} onPlay={onPlay} hidden={i >= row.list.length} />
                  </li>
                ))}
                {loop &&
                  set.map((t, i) => (
                    <li key={`dup-${t.id}-${i}`} className="tm-item tm-item--dup" aria-hidden="true">
                      <TestimonialCard t={t} featured={i % 4 === 1} onPlay={onPlay} hidden />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCard({ t, featured, onPlay, hidden }: { t: Testimonial; featured: boolean; onPlay: PlayFn; hidden?: boolean }) {
  const business = businessOf(t);
  const meta = [t.industry, t.market].filter(Boolean).join(" · ");
  return (
    <figure className={`tm-card ${featured ? "tm-card--feat" : ""}`} data-tm-card>
      <div className="tm-thumb">
        {t.posterUrl ? <Image src={t.posterUrl} alt="" fill sizes="340px" className="tm-thumb-img" /> : null}
        {t.duration ? <span className="tm-duration">{t.duration}</span> : null}
        <span className="tm-shade" aria-hidden="true" />
      </div>
      <button
        type="button"
        className="tm-hit"
        tabIndex={hidden ? -1 : undefined}
        onClick={(e) => onPlay(t, posterIsPortrait(e))}
        aria-label={`Play video testimonial from ${t.name}${business ? `, ${business}` : ""}`}
      >
        <PlayButton />
      </button>
      <figcaption className="tm-info">
        <blockquote className="tm-quote">
          <span className="tm-qmark" aria-hidden="true">
            “
          </span>
          {t.quote}
        </blockquote>
        <div className="tm-who">
          <span className="min-w-0">
            <span className="tm-name">{t.name}</span>
            <span className="tm-meta">{[business, meta].filter(Boolean).join(" · ")}</span>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
