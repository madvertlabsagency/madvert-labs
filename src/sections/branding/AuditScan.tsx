"use client";

import { useRef } from "react";
import { BrandLockup } from "./BrandMark";
import { useLive } from "./useLive";

const rows: { k: string; v: "ok" | "mixed" | "fix"; note: string }[] = [
  { k: "Search result", v: "ok", note: "Clear" },
  { k: "Instagram profile", v: "mixed", note: "Mixed signals" },
  { k: "Website", v: "ok", note: "Consistent" },
  { k: "Ads", v: "fix", note: "Off brand" },
  { k: "Reviews", v: "mixed", note: "Unanswered" },
  { k: "Proposal and deck", v: "fix", note: "Outdated" },
];

/** An outside in audit report, scanning each touchpoint a buyer sees before the first call. */
export function AuditScan() {
  const root = useRef<HTMLDivElement>(null);
  useLive(root, 0.3);
  return (
    <div ref={root} className="bm bm-au" aria-hidden="true">
      <div className="bm-au-sheet">
        <div className="bm-au-head">
          <div>
            <p className="bm-au-eyebrow">Brand perception audit</p>
            <BrandLockup size={15} className="mt-1.5" />
          </div>
          <span className="bm-au-live">
            <i />
            Viewing as a new buyer
          </span>
        </div>
        <ul className="bm-au-rows">
          {rows.map((r, i) => (
            <li key={r.k} className={`is-${r.v}`} style={{ ["--i" as string]: i, ["--f" as string]: r.v === "ok" ? 0.92 : r.v === "mixed" ? 0.55 : 0.28 }}>
              <span className="bm-au-k">{r.k}</span>
              <span className="bm-au-bar">
                <i />
              </span>
              <span className={`bm-au-v is-${r.v}`}>{r.note}</span>
            </li>
          ))}
        </ul>
        <div className="bm-au-foot">
          <span>First impression</span>
          <b>Not yet the company you are</b>
        </div>
        <span className="bm-au-scan" />
      </div>
      <div className="bm-au-chip">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="13" rx="2.5" />
          <path d="M3 8h14M7 2.5v3M13 2.5v3" />
        </svg>
        Walk through it together on a call
      </div>
    </div>
  );
}
