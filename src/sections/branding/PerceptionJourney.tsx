"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLockup, BrandMark } from "./BrandMark";
import { prefersReducedMotion, useLive } from "./useLive";

function IgGlyph({ size = 14 }: { size?: number }) {
  return (
    <span className="bm-ig" style={{ width: size, height: size }}>
      <span />
    </span>
  );
}

function Stars() {
  return (
    <span className="bm-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 12 12" width="10" height="10">
          <path d="M6 .8l1.6 3.4 3.7.4-2.8 2.5.8 3.7L6 9 2.7 10.8l.8-3.7L.7 4.6l3.7-.4z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

const stages: { key: string; label: string; line: string; ui: ReactNode; icon: ReactNode }[] = [
  {
    key: "search",
    label: "Search",
    line: "They look you up.",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M13 13l4.5 4.5" />
      </svg>
    ),
    ui: (
      <div className="bm-ui">
        <div className="bm-search">
          <svg viewBox="0 0 20 20" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M13 13l4.5 4.5" />
          </svg>
          your brand
        </div>
        <div className="bm-res">
          <div className="flex items-center gap-1.5">
            <BrandMark size={12} />
            <span className="bm-url">yourbrand.com</span>
          </div>
          <p className="bm-res-t">Your Brand | Built for serious buyers</p>
          <i className="bm-bar w-[92%]" />
          <i className="bm-bar w-[70%]" />
          <div className="mt-1.5 flex gap-1">
            <span className="bm-sl">Services</span>
            <span className="bm-sl">About</span>
          </div>
        </div>
        <div className="bm-res bm-res-dim">
          <i className="bm-bar w-[60%]" />
          <i className="bm-bar w-[85%]" />
        </div>
      </div>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    line: "They scroll your profile.",
    icon: <IgGlyph size={18} />,
    ui: (
      <div className="bm-ui">
        <div className="flex items-center gap-2">
          <span className="bm-avatar">
            <BrandMark size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="bm-handle">yourbrand</p>
            <div className="mt-1 flex gap-1.5">
              <i className="bm-bar !mt-0 w-4" />
              <i className="bm-bar !mt-0 w-4" />
              <i className="bm-bar !mt-0 w-4" />
            </div>
          </div>
          <IgGlyph size={12} />
        </div>
        <div className="bm-grid3">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`bm-post bm-post-${i % 3}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "website",
    label: "Website",
    line: "They check the website.",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="3.5" width="16" height="13" rx="2.5" />
        <path d="M2 7.5h16" />
      </svg>
    ),
    ui: (
      <div className="bm-ui !p-0">
        <div className="bm-chrome">
          <i />
          <i />
          <i />
        </div>
        <div className="p-2.5">
          <div className="flex items-center justify-between">
            <BrandLockup size={8.5} />
            <span className="bm-pill-sm" />
          </div>
          <p className="bm-web-h">Look as good as you are.</p>
          <i className="bm-bar w-[80%]" />
          <span className="bm-btn">Book a call</span>
          <div className="bm-web-hero" />
        </div>
      </div>
    ),
  },
  {
    key: "ad",
    label: "Ad",
    line: "They see your ad again.",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M3 8v4h3l6 4V4L6 8z" />
        <path d="M15 7.5c1 .8 1 4.2 0 5" strokeLinecap="round" />
      </svg>
    ),
    ui: (
      <div className="bm-ui">
        <div className="flex items-center gap-1.5">
          <BrandMark size={14} />
          <div className="leading-none">
            <p className="bm-handle">Your Brand</p>
            <p className="bm-micro">Sponsored</p>
          </div>
        </div>
        <div className="bm-ad-art">
          <span>Proof, not promises.</span>
        </div>
        <div className="flex items-center justify-between">
          <i className="bm-bar !mt-0 w-[50%]" />
          <span className="bm-btn !mt-0">Learn more</span>
        </div>
      </div>
    ),
  },
  {
    key: "reviews",
    label: "Reviews",
    line: "They read what others say.",
    icon: (
      <svg viewBox="0 0 12 12" width="17" height="17">
        <path d="M6 .8l1.6 3.4 3.7.4-2.8 2.5.8 3.7L6 9 2.7 10.8l.8-3.7L.7 4.6l3.7-.4z" fill="currentColor" />
      </svg>
    ),
    ui: (
      <div className="bm-ui">
        <div className="flex items-center gap-1.5">
          <BrandMark size={14} />
          <p className="bm-handle">Your Brand</p>
        </div>
        {[0, 1].map((r) => (
          <div key={r} className="bm-review">
            <div className="flex items-center justify-between">
              <span className="bm-rv-av" />
              <Stars />
            </div>
            <i className="bm-bar w-[94%]" />
            <i className="bm-bar w-[66%]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "proposal",
    label: "Proposal",
    line: "They open the proposal.",
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M5 2.5h7l3.5 3.5v11.5H5z" />
        <path d="M12 2.5V6h3.5M8 10h5M8 13h4" strokeLinecap="round" />
      </svg>
    ),
    ui: (
      <div className="bm-ui">
        <div className="bm-doc">
          <BrandLockup size={8.5} />
          <p className="bm-doc-t">Proposal</p>
          <i className="bm-bar w-[70%]" />
          <div className="bm-doc-band" />
          <div className="grid grid-cols-3 gap-1">
            <span className="bm-doc-cell" />
            <span className="bm-doc-cell" />
            <span className="bm-doc-cell" />
          </div>
        </div>
      </div>
    ),
  },
];

const END = stages.length; // index of the "first sales call" endpoint

function useStepper(live: boolean, total: number, ms = 1150) {
  // Mounted client side only (inside <Deferred>), so reading the media query here is safe.
  const [reduced] = useState(prefersReducedMotion);
  const [step, setStep] = useState(() => (reduced ? total : -1));
  useEffect(() => {
    if (reduced || !live) return;
    const id = window.setInterval(() => setStep((s) => (s >= total + 2 ? -1 : s + 1)), ms);
    return () => window.clearInterval(id);
  }, [live, total, ms, reduced]);
  return step;
}

function state(i: number, step: number) {
  if (step > i) return "done";
  if (step === i) return "on";
  return "idle";
}

function EndCard({ step }: { step: number }) {
  return (
    <div className="bm-end" data-state={step >= END ? "on" : "idle"}>
      <div className="bm-end-icon">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <path d="M4.5 3h3l1.5 4-2 1.3a9 9 0 0 0 4.7 4.7L13 11l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.6 16.6 3.4 10.4 3 4.6A1.5 1.5 0 0 1 4.5 3z" />
        </svg>
      </div>
      <p className="bm-end-t">First sales call</p>
      <p className="bm-end-s">Opinion already formed</p>
      <div className="bm-end-chips">
        <span className="bm-end-chip is-win">Premium</span>
        <span className="bm-end-chip">Trustworthy</span>
      </div>
    </div>
  );
}

export function PerceptionJourney() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root, 0.3);
  const step = useStepper(live, END);
  const progress = Math.max(0, Math.min(step, END)) / END;

  return (
    <div ref={root} className="bm bm-journey" aria-hidden="true">
      {/* Desktop: one path, left to right */}
      <div className="bm-journey-desk">
        <div className="bm-track">
          <span className="bm-track-fill" style={{ transform: `scaleX(${step < 0 ? 0 : progress})` }} />
          <span className="bm-track-run" style={{ transform: `translateX(${(step < 0 ? 0 : progress) * 100}%)` }}>
            <span className="bm-track-dot" />
          </span>
        </div>
        <ol className="bm-stages">
          {stages.map((s, i) => (
            <li key={s.key} className="bm-stage" data-state={state(i, step)} style={{ ["--i" as string]: i }}>
              <div className="bm-card">{s.ui}</div>
              <div className="bm-stage-meta">
                <span className="bm-node" />
                <span className="bm-step-n">0{i + 1}</span>
                <span className="bm-step-l">{s.label}</span>
              </div>
              <span className="bm-check">On brand</span>
            </li>
          ))}
          <li className="bm-stage bm-stage-end" data-state={step >= END ? "on" : "idle"}>
            <EndCard step={step} />
            <div className="bm-stage-meta">
              <span className="bm-node bm-node-end" />
              <span className="bm-step-l">Then they speak to you</span>
            </div>
          </li>
        </ol>
      </div>

      {/* Mobile: a vertical path with compact rows */}
      <div className="bm-journey-mob">
        <ol className="bm-mrows">
          {stages.map((s, i) => (
            <li key={s.key} className="bm-mrow" data-state={state(i, step)}>
              <span className="bm-micon">{s.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="bm-mrow-l">
                  <span>0{i + 1}</span> {s.label}
                </p>
                <p className="bm-mrow-s">{s.line}</p>
              </div>
              <span className="bm-mtick">
                <BrandMark size={14} />
              </span>
            </li>
          ))}
        </ol>
        <EndCard step={step} />
      </div>
    </div>
  );
}
