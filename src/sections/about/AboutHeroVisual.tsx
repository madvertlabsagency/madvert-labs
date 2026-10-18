import { MadvertMark } from "@/components/ui/MadvertMark";
import { Live } from "./Live";

/**
 * Hero illustration: three stacked plates showing how a marketing company became a growth
 * systems company. Campaigns at the base, the conversion and follow up layer above, the connected
 * growth system on top. Pure CSS 3D, decorative only.
 */
const plates = [
  { label: "Campaigns", sub: "Where it started", tone: "base" },
  { label: "Conversion and Follow Up", sub: "What we kept fixing", tone: "mid" },
  { label: "Growth System", sub: "What we build now", tone: "top" },
] as const;

export function AboutHeroVisual() {
  return (
    <Live className="ab-hero-vis" aria-hidden>
      <div className="ab-hero-stage">
        <div className="ab-hero-stack">
          {plates.map((p, i) => (
            <div key={p.label} className={`ab-plate ab-plate--${p.tone}`} style={{ ["--i" as string]: i }}>
              <div className="ab-plate-face">
                {p.tone === "top" ? (
                  <span className="ab-plate-mark">
                    <MadvertMark className="h-full w-full text-ink" orbClassName="ab-orb" />
                  </span>
                ) : (
                  <span className="ab-plate-grid" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ol className="ab-hero-labels">
        {[...plates].reverse().map((p, i) => (
          <li key={p.label} className={`ab-hero-label ab-hero-label--${p.tone}`} style={{ ["--d" as string]: `${i * 140}ms` }}>
            <span className="ab-hero-label-dot" />
            <span>
              <span className="ab-hero-label-t">{p.label}</span>
              <span className="ab-hero-label-s">{p.sub}</span>
            </span>
          </li>
        ))}
      </ol>
    </Live>
  );
}
