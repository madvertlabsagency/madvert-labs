import type { CSSProperties } from "react";
import { ChannelLogo, type ChannelKey } from "@/components/visuals/brand-marks";
import { MadvertMark } from "@/components/ui/MadvertMark";
import { InView } from "./InView";
import "@/styles/acquisition.css";

const ring: { key: ChannelKey; name: string }[] = [
  { key: "google", name: "Google" },
  { key: "instagram", name: "Instagram" },
  { key: "facebook", name: "Facebook" },
  { key: "maps", name: "Maps" },
  { key: "search", name: "Search" },
  { key: "youtube", name: "YouTube" },
  { key: "meta", name: "Meta" },
];

const rows: { key: ChannelKey; w: number }[] = [
  { key: "meta", w: 62 },
  { key: "google", w: 48 },
  { key: "youtube", w: 56 },
];

/**
 * Hero visual: every major demand channel feeding one qualified pipeline.
 * Pure CSS/SVG; animations pause off screen and stop for reduced motion.
 */
export function ChannelHub() {
  const R = 41;
  return (
    <InView className="acq-hub">
      <div className="acq-hub-glow" />
      {ring.map((c, i) => (
        <div key={c.key} className="acq-hub-link" style={{ "--a": `${-90 + (i * 360) / ring.length}deg`, "--i": i } as CSSProperties}>
          <span className="acq-hub-pulse" />
          <span className="acq-hub-pulse acq-hub-pulse--late" />
        </div>
      ))}
      {ring.map((c, i) => {
        const a = -90 + (i * 360) / ring.length;
        const rad = (a * Math.PI) / 180;
        const x = 50 + R * Math.cos(rad);
        const y = 50 + R * Math.sin(rad);
        return (
          <div key={c.key} className={`acq-hub-tile acq-hub-tile--${c.key}`} style={{ left: `${x}%`, top: `${y}%`, "--i": i } as CSSProperties}>
            <div className="acq-hub-card">
              <ChannelLogo channel={c.key} uid={`hub-${c.key}`} className="acq-hub-logo" />
            </div>
            <span className="acq-hub-name">{c.name}</span>
          </div>
        );
      })}
      <div className="acq-hub-core">
        <div className="acq-hub-core-head">
          <MadvertMark className="h-3.5 w-auto text-ink" />
          <span>Qualified pipeline</span>
        </div>
        <ul className="acq-hub-rows">
          {rows.map((r, i) => (
            <li key={r.key} style={{ "--i": i } as CSSProperties}>
              <span className="acq-hub-src">
                <ChannelLogo channel={r.key} uid={`hub-row-${r.key}`} className="acq-hub-src-logo" />
              </span>
              <span className="acq-hub-bars">
                <i style={{ width: `${r.w}%` }} />
                <i style={{ width: `${r.w - 20}%` }} />
              </span>
              <span className="acq-hub-chip">Qualified</span>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}
