"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandMark } from "./BrandMark";
import { prefersReducedMotion, useLive } from "./useLive";

const pillars = [
  { name: "Authority", color: "#7c8cff", posts: ["Point of view", "Industry take", "Founder note"] },
  { name: "Proof", color: "#2dd4bf", posts: ["Case study", "Client story", "Before and after"] },
  { name: "Education", color: "#38bdf8", posts: ["How it works", "Buyer guide", "Common mistakes"] },
  { name: "Offer", color: "#f5a524", posts: ["The offer", "Who it is for", "What is included"] },
  { name: "Brand", color: "#a78bfa", posts: ["Our standards", "Behind the work", "The team"] },
  { name: "Conversion", color: "#00c8f0", posts: ["Book a call", "Free checklist", "Next step"] },
];

const generic = ["Happy Monday!", "Motivation", "Happy Tuesday!", "Quote of the day", "Happy Monday!", "New week!"];
const phases = [
  ["Posting every day", "Daily posts"],
  ["A busy calendar", "Calendar"],
  ["Strategic pillars", "Pillars"],
] as const;

type Layout = {
  perPillar: number;
  /** Post size in cqw. */
  pw: number;
  ph: number;
  aspect: number;
  feed: (i: number) => [number, number];
  cal: (i: number) => [number, number, number];
  pillar: (p: number, k: number) => [number, number, number];
  head: (p: number) => [number, number];
  calCell: { x: number; y: number; w: number; h: number; cols: number; rows: number };
};

const calDaysDesk = [0, 1, 2, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 19, 20, 22, 26, 27];
const calDaysMob = [0, 1, 3, 4, 7, 8, 9, 13, 15, 16, 22, 26];

const desk: Layout = {
  perPillar: 3,
  pw: 14,
  ph: 12,
  aspect: 100 / 64,
  feed: (i) => [3 + (i % 6) * 16, 9 + Math.floor(i / 6) * 15],
  cal: (i) => {
    const d = calDaysDesk[i];
    return [3.6 + (d % 7) * 13.4, 10.6 + Math.floor(d / 7) * 13, 0.78];
  },
  pillar: (p, k) => [p * 16 + 2.5, 13 + k * 15, 1],
  head: (p) => [p * 16 + 2.5, 3.5],
  calCell: { x: 3, y: 10, w: 13.4, h: 13, cols: 7, rows: 4 },
};

const mob: Layout = {
  perPillar: 2,
  pw: 28,
  ph: 22,
  aspect: 100 / 108,
  feed: (i) => [4 + (i % 3) * 31, 6 + Math.floor(i / 3) * 25],
  cal: (i) => {
    const d = calDaysMob[i];
    return [1.9 + (d % 7) * 13.8, 16 + Math.floor(d / 7) * 21, 0.42];
  },
  pillar: (p, k) => [4 + (p % 3) * 31, 13 + Math.floor(p / 3) * 52 + k * 20, 0.86],
  head: (p) => [4 + (p % 3) * 31, 4 + Math.floor(p / 3) * 52],
  calCell: { x: 1, y: 14, w: 13.8, h: 21, cols: 7, rows: 4 },
};

function Board({ layout, kind }: { layout: Layout; kind: string }) {
  const L = layout;
  const posts = pillars.flatMap((p, pi) => p.posts.slice(0, L.perPillar).map((title, k) => ({ title, pi, k, color: p.color, pillar: p.name })));
  return (
    <div className={`bm-cp-board bm-cp-${kind}`} style={{ aspectRatio: L.aspect, ["--pw" as string]: L.pw, ["--ph" as string]: L.ph } as CSSProperties}>
      {/* Calendar grid layer */}
      <div className="bm-cp-cal">
        {Array.from({ length: L.calCell.cols * L.calCell.rows }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${L.calCell.x + (i % L.calCell.cols) * L.calCell.w}cqw`,
              top: `${L.calCell.y + Math.floor(i / L.calCell.cols) * L.calCell.h}cqw`,
              width: `${L.calCell.w - 0.6}cqw`,
              height: `${L.calCell.h - 0.6}cqw`,
            }}
          >
            {i + 1}
          </span>
        ))}
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <b key={i} style={{ left: `${L.calCell.x + i * L.calCell.w}cqw`, top: `${L.calCell.y - 4.2}cqw`, width: `${L.calCell.w - 0.6}cqw` }}>
            {d}
          </b>
        ))}
      </div>
      {/* Pillar headers */}
      <div className="bm-cp-heads">
        {pillars.map((p, i) => {
          const [x, y] = L.head(i);
          return (
            <span key={p.name} style={{ left: `${x}cqw`, top: `${y}cqw`, ["--c" as string]: p.color, ["--hd" as string]: `${i * 60}ms` }}>
              <i />
              {p.name}
            </span>
          );
        })}
      </div>
      {posts.map((p, i) => {
        const [fx, fy] = L.feed(i);
        const [cx, cy, cs] = L.cal(i);
        const [px, py, ps] = L.pillar(p.pi, p.k);
        const style = {
          "--x0": fx,
          "--y0": fy,
          "--x1": cx,
          "--y1": cy,
          "--s1": cs,
          "--r1": `${((i * 37) % 9) - 4}deg`,
          "--x2": px,
          "--y2": py,
          "--s2": ps,
          "--c": p.color,
          "--pd": `${(p.pi * 3 + p.k) * 35}ms`,
        } as CSSProperties;
        return (
          <div key={i} className="bm-cp-post" style={style}>
            <div className="bm-cp-gen">
              <span className="bm-cp-sun" />
              <span className="bm-cp-gt">{generic[i % generic.length]}</span>
            </div>
            <div className="bm-cp-pil">
              <span className="bm-cp-pbar" />
              <span className="bm-cp-pt">{p.title}</span>
              <span className="bm-cp-pfoot">
                <BrandMark size={8} />
                <i />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContentPillars() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root, 0.3);
  const [reduced] = useState(prefersReducedMotion);
  const [tick, setTick] = useState(() => (reduced ? 2 : 0));

  useEffect(() => {
    if (reduced || !live) return;
    // Feed and calendar get a short beat each; the pillars hold longer.
    const wait = tick % 3 === 2 ? 5200 : 2600;
    const id = window.setTimeout(() => setTick((t) => (t + 1) % 3), wait);
    return () => window.clearTimeout(id);
  }, [tick, live, reduced]);

  const phase = tick;
  return (
    <div ref={root} className="bm bm-cp panel" data-phase={phase} aria-hidden="true">
      <div className="bm-cp-top">
        <div className="bm-cp-tabs">
          {phases.map(([long, short], i) => (
            <span key={long} data-on={phase === i ? "" : undefined}>
              <b className="bm-cp-long">{long}</b>
              <b className="bm-cp-short">{short}</b>
            </span>
          ))}
        </div>
        <span className="bm-cp-state">
          <span className="bm-cp-led" />
          <span className="bm-cp-s0">Activity, no direction</span>
          <span className="bm-cp-s2">Every post has a job</span>
        </span>
      </div>
      <Board layout={desk} kind="desk" />
      <Board layout={mob} kind="mob" />
    </div>
  );
}
