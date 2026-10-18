"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLockup, BrandMark } from "./BrandMark";
import { prefersReducedMotion, useLive } from "./useLive";

type Tile = {
  key: string;
  label: string;
  /** Scattered offset (percent of the tile) and rotation, plus the off brand colour and font. */
  off: { x: number; y: number; r: number; color: string; font: string };
  on: ReactNode;
  offBody: ReactNode;
};

const tiles: Tile[] = [
  {
    key: "logo",
    label: "Logo",
    off: { x: -14, y: 22, r: -7, color: "#ef4444", font: "Georgia, serif" },
    offBody: <span className="bm-off-word">YOUR brand</span>,
    on: (
      <div className="bm-is-logo">
        <span className="bm-is-guide" />
        <BrandLockup size={26} />
        <div className="bm-is-variants">
          <span className="bm-is-v">
            <BrandMark size={18} />
          </span>
          <span className="bm-is-v is-dark">
            <BrandMark size={18} />
          </span>
          <span className="bm-is-v is-grad">
            <span className="bm-mark-w" />
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "type",
    label: "Typography",
    off: { x: 28, y: -30, r: 8, color: "#22c55e", font: "Comic Sans MS, cursive" },
    offBody: <span className="bm-off-word text-[34px]">Aa</span>,
    on: (
      <div className="bm-is-type">
        <span className="bm-is-aa">Aa</span>
        <div>
          <p className="bm-is-cap">Display</p>
          <i className="bm-bar w-14" />
          <p className="bm-is-cap mt-2">Body</p>
          <i className="bm-bar w-10" />
        </div>
      </div>
    ),
  },
  {
    key: "colour",
    label: "Colour",
    off: { x: 34, y: 26, r: -9, color: "#f59e0b", font: "Courier New, monospace" },
    offBody: (
      <div className="flex gap-1.5">
        {["#f59e0b", "#ec4899", "#84cc16"].map((c) => (
          <span key={c} className="h-7 w-7 rounded-full" style={{ background: c }} />
        ))}
      </div>
    ),
    on: (
      <div className="bm-is-swatches">
        <span style={{ background: "#6d5dfc" }} />
        <span style={{ background: "#22d3ee" }} />
        <span style={{ background: "#0b1530" }} />
        <span style={{ background: "#eef2ff" }} />
      </div>
    ),
  },
  {
    key: "photo",
    label: "Photography",
    off: { x: -26, y: -12, r: 6, color: "#a855f7", font: "Times New Roman, serif" },
    offBody: <span className="bm-off-word">stock photo</span>,
    on: (
      <div className="bm-is-photo">
        <span className="bm-is-sun" />
        <span className="bm-is-hill a" />
        <span className="bm-is-hill b" />
        <span className="bm-is-tag">
          <BrandMark size={10} /> Graded to the palette
        </span>
      </div>
    ),
  },
  {
    key: "social",
    label: "Social",
    off: { x: -10, y: 40, r: -10, color: "#ec4899", font: "Impact, sans-serif" },
    offBody: <span className="bm-off-word">Happy Monday!!</span>,
    on: (
      <div className="bm-is-social">
        <div className="flex items-center gap-1.5">
          <BrandMark size={12} />
          <span className="bm-handle">yourbrand</span>
        </div>
        <div className="bm-is-post">
          <span>Proof, not promises.</span>
        </div>
      </div>
    ),
  },
  {
    key: "web",
    label: "Website",
    off: { x: 18, y: -38, r: 5, color: "#0ea5e9", font: "Brush Script MT, cursive" },
    offBody: <span className="bm-off-word">Welcome to our website</span>,
    on: (
      <div className="bm-is-web">
        <div className="bm-chrome">
          <i />
          <i />
          <i />
        </div>
        <div className="bm-is-web-b">
          <div>
            <BrandLockup size={9} />
            <p className="bm-web-h !text-[13px]">Look as good as you are.</p>
            <span className="bm-btn">Book a call</span>
          </div>
          <div className="bm-web-hero !mt-0 !h-full" />
        </div>
      </div>
    ),
  },
  {
    key: "ads",
    label: "Advertising",
    off: { x: 30, y: 30, r: 9, color: "#84cc16", font: "Papyrus, fantasy" },
    offBody: <span className="bm-off-word">BIG SALE</span>,
    on: (
      <div className="bm-is-ad">
        <span className="bm-micro">Sponsored</span>
        <p>Serious work deserves a serious look.</p>
        <span className="bm-btn !mt-0">Learn more</span>
      </div>
    ),
  },
  {
    key: "deck",
    label: "Proposal and sales deck",
    off: { x: -24, y: 18, r: -5, color: "#f97316", font: "Trebuchet MS, sans-serif" },
    offBody: <span className="bm-off-word">Proposal_final_v7</span>,
    on: (
      <div className="bm-is-deck">
        <div className="bm-is-slide">
          <BrandLockup size={8} />
          <p>Proposal</p>
          <i className="bm-bar w-[60%]" />
        </div>
        <div className="bm-is-slide is-b">
          <span className="bm-is-chart">
            <i style={{ height: "40%" }} />
            <i style={{ height: "62%" }} />
            <i style={{ height: "84%" }} />
          </span>
        </div>
      </div>
    ),
  },
];

export function IdentitySystem() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root, 0.35);
  const [reduced] = useState(prefersReducedMotion);
  const [unified, setUnified] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    // Snap together shortly after it enters; scatter again once it leaves so it replays next time.
    const id = window.setTimeout(() => setUnified(live), live ? 700 : 0);
    return () => window.clearTimeout(id);
  }, [live, reduced]);

  return (
    <div ref={root} className="bm bm-is" data-unified={unified ? "" : undefined} aria-hidden="true">
      <div className="bm-is-head">
        <BrandLockup size={13} />
        <span className="bm-is-status">
          <span className="bm-is-led" />
          <span className="bm-is-s-off">Eight assets. Eight different companies.</span>
          <span className="bm-is-s-on">One brand system</span>
        </span>
      </div>
      <div className="bm-is-grid">
        {tiles.map((t, i) => (
          <div
            key={t.key}
            className={`bm-is-tile bm-is-${t.key}`}
            style={{
              ["--x" as string]: `${t.off.x}%`,
              ["--y" as string]: `${t.off.y}%`,
              ["--r" as string]: `${t.off.r}deg`,
              ["--d" as string]: `${i * 70}ms`,
            }}
          >
            <div className="bm-is-layer bm-is-off" style={{ color: t.off.color, fontFamily: t.off.font }}>
              <span className="bm-is-lab">{t.label}</span>
              <span className="bm-is-dot" style={{ background: t.off.color }} />
              <div className="bm-is-body">{t.offBody}</div>
            </div>
            <div className="bm-is-layer bm-is-on">
              <span className="bm-is-lab">{t.label}</span>
              <div className="bm-is-body">{t.on}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
