"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import { MadvertMark } from "@/components/ui/MadvertMark";
import { PlatformTile, type PlatformKind } from "@/components/visuals/platforms/PlatformTile";
import { useScrollScene } from "@/animations/gsap";
import "@/styles/hero.css";

/*
 * The MADVERT LABS brand core with eight growth modules wired back into it.
 * Two stage layouts, switched by a container query in hero.css:
 *  - wide   (600 x 640 units): core + 8 module tiles
 *  - narrow (360 x 440 units): core + 6 tiles, 2 per row, nothing overlapping
 * Story on load: modules appear scattered and disconnected → glide into place → signal lines and
 * the Growth Ribbon draw in → data pulses travel INTO the core → tiles float gently.
 */

type Pt = [number, number];
type Node = {
  kind: PlatformKind;
  label: string;
  short?: string; // label on the narrow layout
  d: Pt; // wide-layout centre
  m?: Pt; // narrow-layout centre (omitted = hidden on narrow)
  s: [number, number, number]; // scatter offset (dx, dy in wide units) + rotation
};

/** Core = circle (centre + radius) in each layout's units. `port` is the ring the connectors land on. */
const W = { w: 600, h: 640, core: { cx: 300, cy: 320, r: 100 } };
const M = { w: 360, h: 440, core: { cx: 180, cy: 222, r: 60 } };

const NODES: Node[] = [
  { kind: "paid", label: "Paid Media", d: [94, 118], m: [64, 52], s: [-70, -46, -7] },
  { kind: "search", label: "Search", d: [300, 62], m: [296, 52], s: [26, -64, 5] },
  { kind: "creative", label: "Creative", d: [506, 118], m: [57, 222], s: [78, -30, 8] },
  { kind: "analytics", label: "Analytics", d: [80, 320], m: [303, 222], s: [-86, 14, 6] },
  { kind: "crm", label: "CRM", d: [520, 320], m: [64, 392], s: [84, -12, -6] },
  { kind: "website", label: "Web", d: [94, 524], s: [-64, 48, 7] },
  { kind: "sales", label: "Sales / Revenue", short: "Revenue", d: [300, 584], m: [296, 392], s: [-20, 70, -5] },
  { kind: "automation", label: "Automation", d: [506, 524], s: [72, 52, -8] },
];

type Core = typeof W.core;

/** Curved signal line from a tile centre into the core's port ring. */
function connector([x, y]: Pt, c: Core) {
  const dx = x - c.cx;
  const dy = y - c.cy;
  const len = Math.hypot(dx, dy) || 1;
  const pr = c.r * 1.14;
  const tx = c.cx + (dx / len) * pr;
  const ty = c.cy + (dy / len) * pr;
  // gentle bend, perpendicular to the direct line
  const bend = 0.12;
  const mx = (x + tx) / 2 - dy * bend;
  const my = (y + ty) / 2 + dx * bend;
  return `M${x.toFixed(1)} ${y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`;
}

function port([x, y]: Pt, c: Core): Pt {
  const dx = x - c.cx;
  const dy = y - c.cy;
  const len = Math.hypot(dx, dy) || 1;
  return [c.cx + (dx / len) * c.r * 1.14, c.cy + (dy / len) * c.r * 1.14];
}

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

const RIBBON_W = "M18 604 C 150 646, 205 486, 300 474 S 468 292, 592 188";
const RIBBON_M = "M0 410 C 84 440, 120 322, 180 316 S 292 196, 360 136";

function Stage({ layout, uid }: { layout: "w" | "m"; uid: string }) {
  const L = layout === "w" ? W : M;
  const nodes = NODES.filter((n) => layout === "w" || n.m);
  const ribbon = layout === "w" ? RIBBON_W : RIBBON_M;
  const { cx, cy } = L.core;
  const g = `${uid}-${layout}`;
  const pick = (n: Node): Pt => (layout === "w" ? n.d : n.m!);
  return (
    <svg viewBox={`0 0 ${L.w} ${L.h}`} className={`hv3-svg hv3-svg--${layout}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${g}-line`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#00b4ff" />
          <stop offset="1" stopColor="#00e5ff" />
        </linearGradient>
        <radialGradient id={`${g}-aura`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#00b4ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#00b4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${g}-pulse`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#00e5ff" />
          <stop offset="1" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={L.w * 0.48} fill={`url(#${g}-aura)`} />
      <g fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" className="hv3-rings">
        <ellipse cx={cx} cy={cy} rx={L.w * 0.42} ry={L.h * 0.42} />
        <ellipse cx={cx} cy={cy} rx={L.w * 0.31} ry={L.h * 0.31} opacity="0.6" />
      </g>
      {/* port ring around the core, with one port per connected module */}
      <circle cx={cx} cy={cy} r={L.core.r * 1.14} fill="none" stroke={`url(#${g}-line)`} strokeWidth="1" opacity="0.35" />
      <g className="hv3-ports">
        {nodes.map((n) => {
          const [px, py] = port(pick(n), L.core);
          return <circle key={n.kind} cx={px} cy={py} r={layout === "w" ? 3.2 : 2.4} fill="var(--bg)" stroke="#00c8ff" strokeWidth="1.4" />;
        })}
      </g>
      {/* disconnected stubs (always faintly visible) */}
      <g stroke="var(--node-idle)" strokeWidth="1" fill="none" opacity="0.55" strokeDasharray="3 5" className="hv3-stubs">
        {nodes.map((n) => (
          <path key={n.kind} d={connector(pick(n), L.core)} />
        ))}
      </g>
      <g fill="none" stroke={`url(#${g}-line)`} strokeWidth="1.6" strokeLinecap="round" className="hv3-links">
        {nodes.map((n) => (
          <path key={n.kind} d={connector(pick(n), L.core)} pathLength={1} data-link />
        ))}
      </g>
      <g className="hv3-ribbon">
        <path d={ribbon} fill="none" stroke="#00e5ff" strokeWidth="10" strokeLinecap="round" opacity="0.1" pathLength={1} data-link />
        <path d={ribbon} fill="none" stroke={`url(#${g}-line)`} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" pathLength={1} data-link />
      </g>
      {/* data pulses: module → brand core */}
      <g className="hv3-pulses">
        {nodes.map((n, i) => (
          <circle key={n.kind} r={layout === "w" ? 5 : 4} fill={`url(#${g}-pulse)`} opacity="0">
            <animateMotion dur="2.6s" begin={`${(i * 0.53).toFixed(2)}s`} repeatCount="indefinite" path={connector(pick(n), L.core)} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
            <animate attributeName="opacity" dur="2.6s" begin={`${(i * 0.53).toFixed(2)}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.2;0.8;1" />
          </circle>
        ))}
        <circle r={layout === "w" ? 6 : 4.5} fill={`url(#${g}-pulse)`} opacity="0">
          <animateMotion dur="4.2s" begin="0.4s" repeatCount="indefinite" path={ribbon} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.4 0 0.6 1" />
          <animate attributeName="opacity" dur="4.2s" begin="0.4s" repeatCount="indefinite" values="0;0.9;0.9;0" keyTimes="0;0.1;0.9;1" />
        </circle>
      </g>
    </svg>
  );
}

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const uid = `hv${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Load sequence: plays once, after the opening intro (if any) has cleared.
  useScrollScene(root, ({ motion }, el, { gsap }) => {
    const done = () => el.classList.add("is-armed", "is-connected");
    if (!motion || played.current) {
      done();
      return;
    }
    const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
    const links = el.querySelectorAll<SVGPathElement>("[data-link]");
    const frame = el.querySelectorAll<HTMLElement>("[data-frame]");
    const k = el.offsetWidth / 600;

    gsap.set(links, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(frame, { opacity: 0, scale: 0.965 });
    nodes.forEach((n) => {
      const [dx, dy, r] = (n.dataset.s ?? "0,0,0").split(",").map(Number);
      gsap.set(n, { x: dx * k, y: dy * k, rotation: r, opacity: 0, scale: 0.9 });
    });
    el.classList.add("is-armed");

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    tl.to(frame, { opacity: 1, scale: 1, duration: 1 }, 0)
      // 1. separate, disconnected
      .to(nodes, { opacity: 0.8, scale: 0.94, duration: 0.55, stagger: 0.06, ease: "power1.out" }, 0.1)
      // 2. organise around the founder
      .to(nodes, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.35, ease: "power3.inOut", stagger: 0.07 }, 0.8)
      // 3. connect
      .to(links, { strokeDashoffset: 0, duration: 0.8, stagger: 0.06, ease: "power2.out" }, 1.75)
      // 4. data moves, cards float
      .add(() => {
        el.classList.add("is-connected");
        played.current = true;
      }, 2.45);

    const html = document.documentElement;
    let mo: MutationObserver | null = null;
    const start = () => {
      mo?.disconnect();
      tl.play();
    };
    const t = window.setTimeout(start, html.classList.contains("intro-seen") ? 150 : 2400);
    if (!html.classList.contains("intro-seen")) {
      mo = new MutationObserver(() => {
        if (html.classList.contains("intro-seen")) {
          window.clearTimeout(t);
          window.setTimeout(start, 120);
        }
      });
      mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    }
    return () => {
      window.clearTimeout(t);
      mo?.disconnect();
      tl.kill();
      if (!played.current) el.classList.remove("is-armed", "is-connected");
    };
  });

  // Pause floating / pulses while the hero is off screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle("is-off", !e.isIntersecting);
      el.querySelectorAll("svg.hv3-svg").forEach((s) => {
        const svg = s as SVGSVGElement;
        if (e.isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="hv3 relative mx-auto w-full max-w-[600px]" aria-hidden="true" style={{ ["--hvc-orb" as string]: `url(#${uid}-orb)` }}>
      {/* Own orb gradient: MadvertMark's shared #mm-orb can resolve to a hidden copy elsewhere on the page. */}
      <svg width="0" height="0" className="absolute" focusable="false">
        <defs>
          <radialGradient id={`${uid}-orb`} cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#5ff0ff" />
            <stop offset="0.55" stopColor="#00c8ff" />
            <stop offset="1" stopColor="#008cff" />
          </radialGradient>
        </defs>
      </svg>
      <div className="hv3-stage">
        <Stage layout="w" uid={uid} />
        <Stage layout="m" uid={uid} />

        {/* Brand core: the official Madvert mark on a layered, dimensional plate */}
        <div className="hv3-core-pos">
          <div className="hv3-core" data-frame>
            <span className="hv3-core-depth" />
            <span className="hv3-core-rim" />
            <span className="hv3-core-face">
              <MadvertMark className="hv3-core-mark" orbClassName="hv3-core-orb" />
              <span className="hv3-core-name">MADVERT LABS</span>
              <span className="hv3-core-state">
                <span className="hv3-core-dot" />
                One growth system
              </span>
            </span>
          </div>
        </div>

        {NODES.map((n, i) => {
          const style = {
            "--x": pct(n.d[0], W.w),
            "--y": pct(n.d[1], W.h),
            "--mx": n.m ? pct(n.m[0], M.w) : "50%",
            "--my": n.m ? pct(n.m[1], M.h) : "50%",
            "--ry": `${n.d[0] < 200 ? 9 : n.d[0] > 400 ? -9 : 0}deg`,
            "--rx": `${n.d[1] < 200 ? 6 : n.d[1] > 440 ? -6 : 0}deg`,
            "--fd": `${5.6 + (i % 3) * 0.9}s`,
            "--fdel": `${-(i * 0.8).toFixed(1)}s`,
          } as CSSProperties;
          return (
            <div key={n.kind} className={`hv3-node${n.m ? "" : " hv3-node--wide"}`} style={style}>
              <div data-node data-s={n.s.join(",")}>
                <div className="hv3-float">
                  <PlatformTile
                    kind={n.kind}
                    label={
                      n.short ? (
                        <>
                          <span className="hv3-l-full">{n.label}</span>
                          <span className="hv3-l-short">{n.short}</span>
                        </>
                      ) : (
                        n.label
                      )
                    }
                    uid={uid}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
