"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { GoogleLogo, MetaLogo, YouTubeLogo } from "@/components/visuals/brand-marks";
import { useOnScreen, useReducedMotion } from "@/sections/acquisition/InView";
import "@/styles/conversion.css";

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const B = ({ w, s = false }: { w: string; s?: boolean }) => <i className={`cvj-bar ${s ? "cvj-bar--s" : ""}`} style={{ width: w }} />;

const stages: { title: string; text: string; ui: ReactNode }[] = [
  {
    title: "Traffic",
    text: "Paid and organic visitors arrive with a promise in mind.",
    ui: (
      <div className="cvj-sources">
        {[
          <MetaLogo key="m" className="h-2.5 w-auto" uid="cvj-meta" />,
          <GoogleLogo key="g" className="h-3 w-3" />,
          <YouTubeLogo key="y" className="h-2.5 w-auto" />,
        ].map((logo, i) => (
          <span key={i} className="cvj-src" style={{ "--i": i } as CSSProperties}>
            <span className="cvj-src-logo">{logo}</span>
            <B w={`${70 - i * 12}%`} />
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Landing Page",
    text: "The page keeps that promise and removes reasons to leave.",
    ui: (
      <div className="cvj-browser">
        <span className="cvj-browser-top">
          <i />
          <i />
          <i />
        </span>
        <span className="cvj-browser-body">
          <B w="82%" s />
          <B w="60%" s />
          <B w="70%" />
          <span className="cvj-btn">Book a call</span>
        </span>
      </div>
    ),
  },
  {
    title: "Form",
    text: "Short, clear and built to be finished on a phone.",
    ui: (
      <div className="cvj-form">
        {["58%", "44%", "36%"].map((w, i) => (
          <span key={i} className="cvj-field" style={{ "--i": i } as CSSProperties}>
            <B w={w} s />
          </span>
        ))}
        <span className="cvj-btn">Send</span>
      </div>
    ),
  },
  {
    title: "Qualification",
    text: "The right questions sort serious buyers before anyone calls.",
    ui: (
      <ul className="cvj-checks">
        {["Budget", "Location", "Timeline"].map((k, i) => (
          <li key={k} style={{ "--i": i } as CSSProperties}>
            <span className="cvj-tick">
              <Check />
            </span>
            {k}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Booking",
    text: "Qualified leads choose a time without the back and forth.",
    ui: (
      <div className="cvj-cal">
        {Array.from({ length: 15 }, (_, i) => (
          <i key={i} className={i === 8 ? "is-on" : i % 4 === 1 ? "is-off" : ""} />
        ))}
      </div>
    ),
  },
  {
    title: "CRM",
    text: "Every lead lands with its source, answers and next action.",
    ui: (
      <div className="cvj-record">
        <span className="cvj-record-head">
          <span className="cvj-avatar" />
          <span className="grid flex-1 gap-1">
            <B w="70%" s />
            <B w="46%" />
          </span>
        </span>
        <span className="cvj-tags">
          <span className="cvj-tag">Source</span>
          <span className="cvj-tag cvj-tag--ok">Booked</span>
        </span>
      </div>
    ),
  },
  {
    title: "Sales",
    text: "Your team walks into a conversation, not a cold call.",
    ui: (
      <div className="cvj-board">
        {[2, 1, 1].map((n, c) => (
          <span key={c} className={`cvj-col ${c === 2 ? "cvj-col--win" : ""}`}>
            {Array.from({ length: n }, (_, k) => (
              <i key={k} />
            ))}
          </span>
        ))}
      </div>
    ),
  },
];

const STEP_MS = 1700;

/** Traffic to sales, one lead moving through real interface style modules. Illustrative, no data. */
export function ConversionJourney() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { ref, on } = useOnScreen<HTMLOListElement>("0px");
  const shown = reduce ? stages.length - 1 : active;

  useEffect(() => {
    if (!on || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % stages.length), active === stages.length - 1 ? STEP_MS * 2.2 : STEP_MS);
    return () => clearTimeout(t);
  }, [on, reduce, active]);

  return (
    <ol ref={ref} className="cvj" aria-label="The conversion journey from traffic to sales">
      {stages.map((s, i) => {
        const state = i === shown ? "is-current" : i < shown ? "is-done" : "";
        return (
          <li key={s.title} className={`cvj-stage ${state}`}>
            <span className="cvj-link" aria-hidden="true">
              <i />
            </span>
            <div className="cvj-card">
              <div className="cvj-head">
                <span className="cvj-num" aria-hidden="true">
                  {i < shown ? <Check /> : i + 1}
                </span>
                <h3 className="cvj-title">{s.title}</h3>
                <span className="cvj-lead" aria-hidden="true">
                  Lead
                </span>
              </div>
              <div className="cvj-ui" aria-hidden="true">
                {s.ui}
              </div>
              <p className="cvj-text">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
