"use client";

import { useId, useRef } from "react";
import { useLive } from "./useLive";

/** Small deterministic PRNG so server and client agree and the layout never jumps. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Pt = { x: number; y: number; h: number };

function scatter(n: number, cx: number, cy: number, rx: number, ry: number, seed: number): Pt[] {
  const r = rng(seed);
  const out: Pt[] = [];
  while (out.length < n) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    out.push({ x: +(cx + Math.cos(a) * d * rx).toFixed(1), y: +(cy + Math.sin(a) * d * ry).toFixed(1), h: r() });
  }
  return out;
}

function edges(pts: Pt[], k = 2) {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push([i, j]);
        }
      });
  });
  return out;
}

// Desktop scene (560 x 400)
const bigD = scatter(240, 148, 262, 124, 106, 7);
const fitD = scatter(24, 428, 262, 92, 84, 31);
const fitEdgesD = edges(fitD);
const hubD = { x: 428, y: 262 };

// Mobile scenes (340 x 150 each)
const bigM = scatter(150, 170, 78, 155, 64, 11);
const fitM = scatter(16, 170, 78, 110, 58, 23);
const fitEdgesM = edges(fitM);
const hubM = { x: 170, y: 78 };

function heat(h: number) {
  // Relevance heat from teal to bright cyan.
  return h > 0.66 ? "#00e5ff" : h > 0.33 ? "#22c9e8" : "#2fb3c9";
}

function Signals({ items, good }: { items: string[]; good: boolean }) {
  return (
    <ul className="bm-ag-sig">
      {items.map((s) => (
        <li key={s} data-good={good ? "" : undefined}>
          {good ? (
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.3l2.3 2.2 4.7-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" />
            </svg>
          )}
          {s}
        </li>
      ))}
    </ul>
  );
}

function Profile({ good }: { good: boolean }) {
  return (
    <div className="bm-ag-prof" data-good={good ? "" : undefined}>
      <div className="flex items-center gap-2">
        <span className="bm-ag-av" />
        <div className="min-w-0">
          <p className="bm-ag-name">{good ? "Aligned creator" : "Biggest account"}</p>
          <p className="bm-ag-sub">{good ? "Smaller, trusted following" : "Huge, general following"}</p>
        </div>
      </div>
      <Signals good={good} items={good ? ["Same buyer", "Same category", "Trusted voice"] : ["Different buyer", "Off category"]} />
    </div>
  );
}

function Meter({ good }: { good: boolean }) {
  return (
    <div className="bm-ag-meter" data-good={good ? "" : undefined}>
      <span className="bm-ag-ml">Relevance</span>
      <span className="bm-ag-track">
        <i />
      </span>
      <span className="bm-ag-mv">{good ? "High" : "Low"}</span>
    </div>
  );
}

export function AttentionGraph() {
  const root = useRef<HTMLDivElement>(null);
  useLive(root, 0.3);
  const uid = useId().replace(/:/g, "");
  const heatId = `bm-heat-${uid}`;
  const heatIdM = `bm-heatm-${uid}`;

  return (
    <div ref={root} className="bm bm-ag panel" aria-hidden="true">
      {/* Desktop */}
      <div className="bm-ag-desk">
        <svg viewBox="0 0 560 400" className="bm-ag-svg">
          <defs>
            <radialGradient id={heatId} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#00e5ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <line x1="290" y1="120" x2="290" y2="390" className="bm-ag-div" />
          {bigD.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.2 + p.h * 1.4} className="bm-ag-dot" style={{ ["--d" as string]: `${(p.h * 6).toFixed(2)}s` }} data-flick={i % 23 === 0 ? "" : undefined} />
          ))}
          <ellipse cx={hubD.x} cy={hubD.y} rx="120" ry="112" fill={`url(#${heatId})`} className="bm-ag-heat" />
          {fitEdgesD.map(([a, b], i) => (
            <line key={i} x1={fitD[a].x} y1={fitD[a].y} x2={fitD[b].x} y2={fitD[b].y} className="bm-ag-edge" pathLength={1} style={{ ["--d" as string]: `${i * 40}ms` }} />
          ))}
          {fitD.map((p, i) => (
            <line key={`h${i}`} x1={hubD.x} y1={hubD.y} x2={p.x} y2={p.y} className="bm-ag-spoke" pathLength={1} style={{ ["--d" as string]: `${i * 50}ms` }} />
          ))}
          {fitD.map((p, i) => (
            <circle key={`f${i}`} cx={p.x} cy={p.y} r={4.6 + p.h * 2.2} fill={heat(p.h)} className="bm-ag-node" style={{ ["--d" as string]: `${300 + i * 60}ms` }} />
          ))}
          <circle cx={hubD.x} cy={hubD.y} r="9" className="bm-ag-hub" />
        </svg>
        <div className="bm-ag-col bm-ag-col-a">
          <p className="bm-ag-cap">Biggest audience</p>
          <Profile good={false} />
        </div>
        <div className="bm-ag-col bm-ag-col-b">
          <p className="bm-ag-cap is-good">Right audience</p>
          <Profile good />
        </div>
        <div className="bm-ag-meters">
          <Meter good={false} />
          <Meter good />
        </div>
      </div>

      {/* Mobile */}
      <div className="bm-ag-mob">
        {[false, true].map((good) => (
          <div key={String(good)} className="bm-ag-mcard" data-good={good ? "" : undefined}>
            <p className={`bm-ag-cap ${good ? "is-good" : ""}`}>{good ? "Right audience" : "Biggest audience"}</p>
            <svg viewBox="0 0 340 156" className="bm-ag-svg">
              {good ? (
                <>
                  <defs>
                    <radialGradient id={heatIdM} cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0" stopColor="#00e5ff" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#00e5ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx={hubM.x} cy={hubM.y} rx="150" ry="74" fill={`url(#${heatIdM})`} className="bm-ag-heat" />
                  {fitEdgesM.map(([a, b], i) => (
                    <line key={i} x1={fitM[a].x} y1={fitM[a].y} x2={fitM[b].x} y2={fitM[b].y} className="bm-ag-edge" pathLength={1} style={{ ["--d" as string]: `${i * 40}ms` }} />
                  ))}
                  {fitM.map((p, i) => (
                    <line key={`h${i}`} x1={hubM.x} y1={hubM.y} x2={p.x} y2={p.y} className="bm-ag-spoke" pathLength={1} style={{ ["--d" as string]: `${i * 50}ms` }} />
                  ))}
                  {fitM.map((p, i) => (
                    <circle key={`f${i}`} cx={p.x} cy={p.y} r={4.4 + p.h * 2} fill={heat(p.h)} className="bm-ag-node" style={{ ["--d" as string]: `${300 + i * 60}ms` }} />
                  ))}
                  <circle cx={hubM.x} cy={hubM.y} r="8" className="bm-ag-hub" />
                </>
              ) : (
                bigM.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={2.4 + p.h * 1.4} className="bm-ag-dot" style={{ ["--d" as string]: `${(p.h * 6).toFixed(2)}s` }} data-flick={i % 19 === 0 ? "" : undefined} />
                ))
              )}
            </svg>
            <Profile good={good} />
            <Meter good={good} />
          </div>
        ))}
      </div>
    </div>
  );
}
