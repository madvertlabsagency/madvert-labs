"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLockup, BrandMark } from "./BrandMark";
import { prefersReducedMotion, useLive } from "./useLive";

const sw = (c: string) => <span className="bm-eco-sw" style={{ background: c }} />;

const nodes: { label: string; art: ReactNode }[] = [
  { label: "Messaging", art: <span className="bm-eco-quote">“</span> },
  { label: "Visual identity", art: <span className="flex gap-0.5">{sw("#6d5dfc")}{sw("#22d3ee")}{sw("#0b1530")}</span> },
  {
    label: "Customer experience",
    art: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v6a2.5 2.5 0 0 1-2.5 2.5H9l-4 3v-3h0A2.5 2.5 0 0 1 3 11.5z" />
      </svg>
    ),
  },
  {
    label: "Website",
    art: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="3.5" width="16" height="13" rx="2.5" />
        <path d="M2 7.5h16" />
      </svg>
    ),
  },
  {
    label: "Content",
    art: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <rect x="2" y="3" width="16" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.5 7.2v5.6l4.4-2.8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Proof",
    art: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10.5l3.5 3.5L16 5.5" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    art: (
      <svg viewBox="0 0 12 12" width="15" height="15">
        <path d="M6 .8l1.6 3.4 3.7.4-2.8 2.5.8 3.7L6 9 2.7 10.8l.8-3.7L.7 4.6l3.7-.4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Sales presentation",
    art: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <rect x="2.5" y="3" width="15" height="10.5" rx="2" />
        <path d="M10 13.5V17M7 17h6M6 10l2.5-2.5 2 2L14 6" />
      </svg>
    ),
  },
];

const pos = nodes.map((_, i) => {
  const a = ((-90 + i * 45) * Math.PI) / 180;
  return { x: +(50 + 32 * Math.cos(a)).toFixed(2), y: +(50 + 39 * Math.sin(a)).toFixed(2) };
});

const TOTAL = nodes.length;

export function LogoEcosystem() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root, 0.3);
  const [reduced] = useState(prefersReducedMotion);
  // -1: logo alone. 0..7: evidence appears. Then hold, then restart.
  const [step, setStep] = useState(() => (reduced ? TOTAL + 1 : -2));

  useEffect(() => {
    if (reduced || !live) return;
    const id = window.setInterval(() => setStep((s) => (s >= TOTAL + 6 ? -2 : s + 1)), 750);
    return () => window.clearInterval(id);
  }, [live, reduced]);

  const shrunk = step >= 0;
  return (
    <div ref={root} className="bm bm-eco panel" data-shrunk={shrunk ? "" : undefined} data-done={step >= TOTAL ? "" : undefined} aria-hidden="true">
      <div className="bm-eco-stage">
        <svg className="bm-eco-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {pos.map((p, i) => (
            <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} pathLength={1} data-on={step >= i ? "" : undefined} />
          ))}
        </svg>
        <div className="bm-eco-logo">
          <div className="bm-eco-logo-card">
            <BrandMark size={34} />
            <span className="bm-eco-logo-name">Your Brand</span>
          </div>
          <span className="bm-eco-logo-cap">Logo</span>
        </div>
        <ul className="bm-eco-nodes">
          {nodes.map((n, i) => (
            <li
              key={n.label}
              className="bm-eco-node"
              data-on={step >= i ? "" : undefined}
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, ["--i" as string]: i }}
            >
              <span className="bm-eco-ic">{n.art}</span>
              <span className="bm-eco-l">{n.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bm-eco-foot">
        <span className="bm-eco-alone">A logo, on its own</span>
        <span className="bm-eco-whole">
          <BrandLockup size={11} /> The logo is one of nine pieces of evidence
        </span>
      </div>
    </div>
  );
}
