/**
 * Future PVC Patch — Meta ads (A: 45.5 s premium, B: 25.5 s aggressive).
 * Spec: src/fpp/ads/<cut>.json (scripts/fpp-ads-specs.py), cut against the
 * voiceover word timings in src/fpp/ads/vo-{a,b}.json.
 *
 * Layers: footage (campaign ShotLayer transitions) → kinetic type (headlines,
 * labels, material tags, full-screen slams) → word-synced captions → website
 * funnel in a browser frame (real recording, camera moves, tap rings) → brand
 * reveal → CLICK BELOW CTA → end card. Electric blue / deep navy / white brand
 * layer; footage keeps its own colours (no tint).
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {Themed, type Theme} from '../../shared/theme';
import {ShotLayer, segPath, type Trans} from '../../markhor/commercial';
import {BrandProvider, CubeLines, Headline, Line, type Brand, type Word} from '../../markhor/hyper';
import {FPP_BRAND, FPP_THEME} from '../brand';

/* ------------------------------------------------------------------ brand */

export const X = {
  deep: '#040A1C',
  navy: '#0A1638',
  electric: '#1E6BFF',
  cyan: '#19B6F2',
  white: '#FFFFFF',
  light: '#EAF4FA',
} as const;
const FONT = 'Montserrat, Inter, Arial, sans-serif';
const LOGO = 'brand/fpp-logo-cut.png'; // supplied logo, background removed, otherwise unaltered
const DOMAIN = 'futurepvcpatch.com';

export const FPP_ADS_BRAND: Brand = {
  ...FPP_BRAND,
  c: {navy: X.navy, royal: X.electric, cyan: X.cyan, white: X.white, light: X.light, deep: X.deep},
  stripGradient: `linear-gradient(90deg, ${X.electric} 0%, #2F8BFF 50%, ${X.cyan} 100%)`,
  weight: 800,
};
/** Footage grade: keep product colours — no colour tint, light vignette only. */
const ADS_THEME: Theme = {
  ...FPP_THEME,
  base: X.deep,
  tint: 'none',
  vignette: 'radial-gradient(120% 80% at 50% 48%, rgba(0,0,0,0) 62%, rgba(4,10,28,0.42) 100%)',
  shadeRgb: '4,10,28',
};

/* ------------------------------------------------------------------ spec */

type Shot = {id: string; from: number; frames: number; trans: Trans; scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}};
type Desk = {id: string; from: number; frames: number; focus: [number, number, number]; taps: [number, number, number][]; step: number; title: string; kind: string};
type W = {t: string; at: number; hi?: boolean};
type Text =
  | {type: 'head'; from: number; to: number; top: number; size: number; lines: W[][]}
  | {type: 'label'; from: number; to: number; text: string; top: number}
  | {type: 'material'; from: number; to: number; text: string; idx: number}
  | {type: 'slam'; from: number; to: number; text: string; size: number; top: number; sub?: string | null};
type VoWord = {w: string; start: number; end: number};
type VoPhrase = {start: number; end: number; words: VoWord[]};
export type AdSpec = {
  durationInFrames: number;
  style: 'premium' | 'aggressive';
  voFile: string;
  shots: Shot[];
  desk: Desk[];
  text: Text[];
  reveal?: {from: number; to: number; lines: [string, number, boolean?][][]};
  cta?: {from: number; to: number; clickAt: number; quoteAt: number};
  card: {from: number; variant?: 'made'};
  capsOff: [number, number][];
  flashes: number[];
  shakes: number[];
};

/* ------------------------------------------------------------------ stage */

const Stage: React.FC<{light?: boolean}> = ({light}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: light
          ? `radial-gradient(80% 50% at 50% 30%, #FFFFFF 0%, ${X.light} 70%, #D3E6F7 100%)`
          : `radial-gradient(70% 45% at 50% ${34 + Math.sin(f / 50) * 3}%, rgba(30,107,255,0.55) 0%, rgba(30,107,255,0) 70%), radial-gradient(90% 50% at 50% 100%, rgba(25,182,242,0.28) 0%, rgba(25,182,242,0) 70%), linear-gradient(180deg, ${X.navy} 0%, ${X.deep} 100%)`,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', right: -260, top: -180, opacity: light ? 0.1 : 0.16, transform: `rotate(${f * 0.05}deg)`}}>
        <CubeLines size={820} color={light ? X.electric : X.cyan} width={4} />
      </div>
      <div style={{position: 'absolute', left: -320, bottom: -260, opacity: light ? 0.08 : 0.12, transform: `rotate(${-f * 0.04}deg)`}}>
        <CubeLines size={760} color={light ? X.cyan : X.electric} width={4} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: -400,
          right: -400,
          top: 1500 + Math.sin(f / 30) * 10,
          height: 90,
          background: `linear-gradient(100deg, rgba(25,182,242,0) 0%, rgba(25,182,242,${light ? 0.18 : 0.22}) 40%, rgba(30,107,255,${light ? 0.18 : 0.22}) 70%, rgba(30,107,255,0) 100%)`,
          transform: `skewY(-6deg) translateX(${(f % 120) * 2 - 120}px)`,
        }}
      />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: `linear-gradient(90deg, ${X.electric}, ${X.cyan})`}} />
    </AbsoluteFill>
  );
};

/** Electric wipe into a block (diagonal, with a cyan bar). Local frames. */
const Wipe: React.FC<{children: React.ReactNode; dur?: number}> = ({children, dur = 9}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, dur, easeInOut);
  return (
    <>
      <AbsoluteFill style={{clipPath: `polygon(0 0, ${p * 140}% 0, ${p * 140 - 40}% 100%, 0 100%)`}}>{children}</AbsoluteFill>
      {p > 0 && p < 1 && (
        <div style={{position: 'absolute', top: -200, bottom: -200, left: `${p * 140 - 20}%`, width: 90, background: `linear-gradient(180deg, ${X.cyan}, ${X.electric})`, transform: 'skewX(-22deg)', boxShadow: `0 0 60px ${X.cyan}`}} />
      )}
    </>
  );
};

const LogoMark: React.FC<{at: number; size: number; top: number; halo?: boolean}> = ({at, size, top, halo = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 150, mass: 0.8}});
  const ring = prog(f, at + 1, 22, easeOut);
  const sweep = prog(f, at + 14, 22, easeInOut);
  return (
    <div style={{position: 'absolute', top, left: 540 - size / 2, width: size, height: size}}>
      {halo && <div style={{position: 'absolute', inset: -size * 0.35, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(110,180,255,0.25) 45%, rgba(30,107,255,0) 75%)', opacity: Math.min(1, s)}} />}
      <div style={{position: 'absolute', left: -size * 0.12, top: -size * 0.12, opacity: (1 - ring) * 0.9, transform: `scale(${mix(0.85, 1.3, ring)})`}}>
        <CubeLines size={size * 1.24} color={X.cyan} width={5} draw={ring} />
      </div>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${mix(0.4, 1, s)}) rotate(${mix(-14, 0, s)}deg)`, opacity: Math.min(1, s * 1.6)}}>
        <Img src={staticFile(LOGO)} style={{width: size, height: size, display: 'block', filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.5))'}} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            WebkitMaskImage: `url(${staticFile(LOGO)})`,
            WebkitMaskSize: '100% 100%',
            background: `linear-gradient(115deg, rgba(255,255,255,0) ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.75) ${mix(-30, 110, sweep)}%, rgba(255,255,255,0) ${mix(-20, 120, sweep)}%)`,
            opacity: sweep > 0 && sweep < 1 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

const BrandName: React.FC<{at: number; top: number; size?: number; color?: string}> = ({at, top, size = 64, color = X.white}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 14, easeOut);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: size, letterSpacing: `${mix(0.5, 0.18, p)}em`, color, opacity: p, textShadow: '0 6px 30px rgba(30,107,255,0.6)', whiteSpace: 'nowrap'}}>
      FUTURE PVC PATCH
    </div>
  );
};

/** Hex-pointed CTA pill. */
const QuotePill: React.FC<{at: number; top: number; text?: string; size?: number}> = ({at, top, text = 'GET YOUR INSTANT QUOTE', size = 50}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 12, stiffness: 220, mass: 0.7}});
  const shine = prog(f, at + 14, 20, easeInOut);
  const pulse = 1 + Math.max(0, Math.sin((f - at - 20) / 9)) * 0.025 * prog(f, at + 20, 10);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${mix(0.6, 1, s) * pulse})`, opacity: Math.min(1, s * 1.8)}}>
      <div
        style={{
          position: 'relative',
          padding: '34px 84px',
          clipPath: 'polygon(42px 0, calc(100% - 42px) 0, 100% 50%, calc(100% - 42px) 100%, 42px 100%, 0 50%)',
          background: `linear-gradient(100deg, ${X.electric}, #2F8BFF 55%, ${X.cyan})`,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: size,
          letterSpacing: '0.02em',
          color: X.white,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {text}
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${mix(-40, 100, shine)}%, rgba(255,255,255,0.45) ${mix(-30, 110, shine)}%, transparent ${mix(-20, 120, shine)}%)`, opacity: shine > 0 && shine < 1 ? 1 : 0}} />
      </div>
    </div>
  );
};

const ClickBelow: React.FC<{at: number; top: number; size?: number}> = ({at, top, size = 96}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 12, stiffness: 240, mass: 0.6}});
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: Math.min(1, s * 1.8), transform: `scale(${mix(1.4, 1, s)})`}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: size, letterSpacing: '0.06em', color: X.white, textShadow: '0 8px 40px rgba(30,107,255,0.7)'}}>CLICK BELOW</div>
      <div style={{marginTop: 12, height: 120, position: 'relative', width: 120}}>
        {[0, 1, 2].map((i) => {
          const ph = ((f - at) / 18 + i / 3) % 1;
          return (
            <svg key={i} width={120} height={60} viewBox="0 0 120 60" style={{position: 'absolute', left: 0, top: ph * 70, opacity: Math.sin(ph * Math.PI)}}>
              <path d="M 20 12 L 60 46 L 100 12" fill="none" stroke={i === 1 ? X.cyan : X.white} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ type */

const MaterialTag: React.FC<{text: string; idx: number; len: number}> = ({text, idx, len}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 6, easeOut);
  const q = prog(f, len - 4, 4, easeIn);
  const size = Math.min(150, Math.floor(980 / (text.length * 0.78)));
  return (
    <div style={{position: 'absolute', top: 270, left: 0, right: 0, opacity: 1 - q}}>
      <div style={{textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 34, letterSpacing: '0.4em', color: X.cyan, opacity: p, textShadow: '0 3px 12px rgba(0,0,0,0.6)'}}>
        {String(idx).padStart(2, '0')} / 05
      </div>
      <div style={{marginTop: 10}}>
        <Line words={[{t: `${text}.`, at: 0, hi: true}]} size={size} dark={false} />
      </div>
    </div>
  );
};

const TopLabel: React.FC<{text: string; len: number}> = ({text, len}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 7, easeOut);
  const q = prog(f, len - 4, 4, easeIn);
  return (
    <div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p * (1 - q)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '18px 36px', background: 'rgba(4,10,28,0.66)', transform: `translateY(${(1 - p) * -24}px)`, clipPath: 'polygon(22px 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 22px 100%, 0 50%)'}}>
        <svg width={30} height={34} viewBox="0 0 30 34">
          <path d="M15 1 L29 9 L29 25 L15 33 L1 25 L1 9 Z" fill={X.cyan} />
        </svg>
        <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 54, letterSpacing: '0.1em', color: X.white}}>{text}</span>
      </div>
    </div>
  );
};

const Slam: React.FC<{text: string; size: number; top: number; sub?: string | null; len: number}> = ({text, size, top, sub, len}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 11, stiffness: 320, mass: 0.55}});
  const q = prog(f, len - 3, 3, easeIn);
  const fit = Math.min(size, Math.floor(1000 / (text.length * 0.7)));
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', opacity: (1 - q) * Math.min(1, s * 2.2)}}>
      {sub && <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 52, letterSpacing: '0.16em', color: X.cyan, marginBottom: 6, textShadow: '0 4px 18px rgba(0,0,0,0.7)', transform: `translateY(${(1 - s) * -30}px)`}}>{sub}</div>}
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: fit,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: X.white,
          transform: `scale(${mix(1.45, 1, s) + q * 0.1})`,
          textShadow: '0 10px 40px rgba(0,0,0,0.65), 0 0 2px rgba(0,0,0,0.6)',
          WebkitTextStroke: `2px ${X.electric}`,
        }}
      >
        {text}
      </div>
      <div style={{margin: '18px auto 0', width: 260 * s, height: 12, background: `linear-gradient(90deg, ${X.electric}, ${X.cyan})`, clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%)'}} />
    </div>
  );
};

/* ------------------------------------------------------------------ captions */

const Captions: React.FC<{phrases: VoPhrase[]; off: [number, number][]; top: number}> = ({phrases, off, top}) => {
  const f = useCurrentFrame();
  const t = f / 30;
  if (off.some(([a, b]) => f >= a && f < b)) return null;
  const i = phrases.findIndex((p, k) => t >= p.start - 0.08 && t < (k + 1 < phrases.length ? Math.min(phrases[k + 1].start - 0.08, p.end + 0.6) : p.end + 0.6));
  if (i < 0) return null;
  const p = phrases[i];
  const inP = prog(f, Math.round((p.start - 0.08) * 30), 5, easeOut);
  return (
    <div style={{position: 'absolute', top, left: 60, right: 60, display: 'flex', justifyContent: 'center', opacity: inP}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 14, rowGap: 4, maxWidth: 940, padding: '16px 30px 18px', borderRadius: 20, background: 'rgba(4,10,28,0.72)', boxShadow: '0 10px 30px rgba(0,0,0,0.35)', transform: `translateY(${(1 - inP) * 14}px)`}}>
        {p.words.map((w, k) => {
          const on = t >= w.start - 0.03;
          const cur = on && (k + 1 >= p.words.length || t < p.words[k + 1].start - 0.03);
          return (
            <span key={k} style={{fontFamily: FONT, fontWeight: 800, fontSize: 46, lineHeight: 1.15, color: cur ? X.cyan : X.white, opacity: on ? 1 : 0.38, transform: cur ? 'scale(1.06)' : undefined, display: 'inline-block'}}>
              {w.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ website funnel */

const WIN = {w: 1000, left: 40, top: 500, bar: 58};
const SRC = {w: 1040, h: 794};
const WIN_H = Math.round((WIN.w * SRC.h) / SRC.w);

const DeskBlock: React.FC<{items: Desk[]; start: number; dir: string}> = ({items, start, dir}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = spring({frame: f - 2, fps, config: {damping: 18, stiffness: 140, mass: 0.8}});
  // camera
  let [cx, cy, z] = items[0].focus;
  items.forEach((w, i) => {
    const local = w.from - start;
    if (f >= local) {
      const prev = i ? items[i - 1].focus : [w.focus[0], w.focus[1], 1];
      const k = prog(f, local, 12, easeInOut);
      cx = mix(prev[0], w.focus[0], k);
      cy = mix(prev[1], w.focus[1], k);
      z = mix(prev[2], w.focus[2], k);
    }
  });
  const base = WIN.w / SRC.w;
  const sc = base * z;
  const tx = Math.min(0, Math.max(WIN.w - SRC.w * sc, WIN.w / 2 - cx * sc));
  const ty = Math.min(0, Math.max(WIN_H - SRC.h * sc, WIN_H / 2 - cy * sc));
  const cur = items.reduce((a, w) => (f >= w.from - start ? w : a), items[0]);
  const stepIn = prog(f, cur.from - start, 8, easeOut);
  return (
    <AbsoluteFill>
      <Stage light />
      {/* step header */}
      <div style={{position: 'absolute', top: 250, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: 18, marginBottom: 26}}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={{width: n === cur.step ? 70 : 22, height: 14, borderRadius: 7, background: n <= cur.step ? `linear-gradient(90deg, ${X.electric}, ${X.cyan})` : 'rgba(10,22,56,0.18)', transition: 'none'}} />
          ))}
        </div>
        <div key={cur.step} style={{display: 'flex', alignItems: 'center', gap: 22, opacity: stepIn, transform: `translateY(${(1 - stepIn) * 24}px)`}}>
          <div style={{position: 'relative', width: 78, height: 90}}>
            <svg width={78} height={90} viewBox="0 0 100 115.47" style={{position: 'absolute', inset: 0}}>
              <path d="M50 0 L100 28.87 L100 86.6 L50 115.47 L0 86.6 L0 28.87 Z" fill={X.electric} />
            </svg>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 38, color: X.white}}>{cur.step}</div>
          </div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 56, color: X.navy, letterSpacing: '0.01em'}}>{cur.title}</div>
        </div>
      </div>
      {/* browser window */}
      <div
        style={{
          position: 'absolute',
          left: WIN.left,
          top: WIN.top,
          width: WIN.w,
          height: WIN_H + WIN.bar,
          borderRadius: 26,
          overflow: 'hidden',
          background: X.white,
          boxShadow: '0 40px 90px rgba(10,22,56,0.35), 0 0 0 2px rgba(30,107,255,0.25)',
          transform: `translateY(${(1 - rise) * 240}px) scale(${mix(0.92, 1, rise)})`,
          opacity: Math.min(1, rise * 1.5),
        }}
      >
        <div style={{height: WIN.bar, background: '#F1F4F9', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: '1px solid #DDE3EC'}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <span key={c} style={{width: 16, height: 16, borderRadius: 8, background: c}} />
          ))}
          <div style={{marginLeft: 18, flex: 1, height: 36, borderRadius: 18, background: X.white, border: '1px solid #DDE3EC', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', fontFamily: FONT, fontWeight: 600, fontSize: 22, color: '#4A5568'}}>
            <svg width={16} height={18} viewBox="0 0 16 18">
              <rect x={2} y={8} width={12} height={9} rx={2} fill="#7A869A" />
              <path d="M5 8 V5 a3 3 0 0 1 6 0 V8" fill="none" stroke="#7A869A" strokeWidth={2} />
            </svg>
            {DOMAIN}
          </div>
        </div>
        <div style={{position: 'relative', width: WIN.w, height: WIN_H, overflow: 'hidden', background: '#0B1530'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: SRC.w, height: SRC.h, transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${sc})`}}>
            {items.map((w) => (
              <Sequence key={w.id} from={w.from - start} durationInFrames={w.frames} name={w.id}>
                <OffthreadVideo muted src={staticFile(segPath(dir, w.id))} style={{width: SRC.w, height: SRC.h, display: 'block'}} />
                {w.taps.map(([at, x, y], i) => (
                  <TapRing key={i} at={at} x={x} y={y} />
                ))}
              </Sequence>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TapRing: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
  const f = useCurrentFrame();
  if (f < at - 6 || f > at + 20) return null;
  const pre = prog(f, at - 6, 6, easeOut);
  const ring = prog(f, at, 16, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, background: 'rgba(25,182,242,0.35)', border: `5px solid ${X.cyan}`, opacity: pre * (1 - prog(f, at + 6, 10)), transform: `scale(${f < at ? mix(1.4, 1, pre) : mix(1, 0.85, prog(f, at, 4))})`}} />
      <div style={{position: 'absolute', left: x - 90 * ring, top: y - 90 * ring, width: 180 * ring, height: 180 * ring, borderRadius: '50%', border: `6px solid ${X.electric}`, opacity: f >= at ? 1 - ring : 0}} />
    </>
  );
};

/* ------------------------------------------------------------------ blocks */

const Reveal: React.FC<{spec: NonNullable<AdSpec['reveal']>; premium: boolean}> = ({spec, premium}) => {
  const len = spec.to - spec.from;
  return (
    <AbsoluteFill>
      <Stage />
      <LogoMark at={2} size={premium ? 520 : 600} top={premium ? 330 : 470} />
      <BrandName at={10} top={premium ? 900 : 1120} size={premium ? 66 : 74} />
      {spec.lines.length > 0 && (
        <div style={{position: 'absolute', top: 1040, left: 50, right: 50}}>
          {spec.lines.map((l, i) => (
            <Line key={i} words={l.map(([t, at, hi]) => ({t, at: at - spec.from, hi: !!hi}) as Word)} size={92} dark={false} exitAt={len - 5} />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Cta: React.FC<{spec: NonNullable<AdSpec['cta']>}> = ({spec}) => (
  <AbsoluteFill>
    <Stage />
    <LogoMark at={0} size={240} top={250} halo={false} />
    <ClickBelow at={spec.clickAt - spec.from} top={620} size={108} />
    <QuotePill at={spec.quoteAt - spec.from} top={1000} size={52} />
  </AbsoluteFill>
);

const EndCard: React.FC<{variant?: 'made'}> = ({variant}) => {
  const f = useCurrentFrame();
  const url = prog(f, 26, 12, easeOut);
  if (variant === 'made') {
    const u2 = prog(f, 34, 12, easeOut);
    return (
      <AbsoluteFill>
        <Stage />
        <LogoMark at={0} size={330} top={150} />
        <BrandName at={4} top={520} size={56} />
        <div style={{position: 'absolute', top: 640, left: 50, right: 50}}>
          <Line words={[{t: 'GET', at: 6}, {t: 'YOUR', at: 8}, {t: 'CUSTOM', at: 10}]} size={86} dark={false} />
          <div style={{height: 12}} />
          <Line words={[{t: 'PATCHES', at: 12}, {t: 'MADE.', at: 14, hi: true}]} size={96} dark={false} />
        </div>
        <ClickBelow at={20} top={930} size={84} />
        <QuotePill at={26} top={1180} size={48} />
        <div style={{position: 'absolute', top: 1350, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 42, letterSpacing: '0.08em', color: X.white, opacity: u2, transform: `translateY(${(1 - u2) * 14}px)`}}>
          {DOMAIN}
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <Stage />
      <LogoMark at={0} size={430} top={200} />
      <BrandName at={6} top={700} size={62} />
      <ClickBelow at={12} top={840} size={92} />
      <QuotePill at={18} top={1110} size={50} />
      <div style={{position: 'absolute', top: 1290, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 44, letterSpacing: '0.08em', color: X.white, opacity: url, transform: `translateY(${(1 - url) * 14}px)`}}>
        {DOMAIN}
      </div>
    </AbsoluteFill>
  );
};

const FlashShake: React.FC<{flashes: number[]; children: React.ReactNode; shakes: number[]}> = ({flashes, shakes, children}) => {
  const f = useCurrentFrame();
  const sh = shakes.reduce((a, s) => a + (f >= s && f < s + 9 ? (1 - (f - s) / 9) : 0), 0);
  const dx = Math.sin(f * 2.3) * 14 * sh;
  const dy = Math.cos(f * 3.1) * 10 * sh;
  const fl = flashes.reduce((a, s) => Math.max(a, f >= s && f < s + 5 ? 0.55 * (1 - (f - s) / 5) : 0), 0);
  return (
    <>
      <AbsoluteFill style={{transform: sh > 0 ? `translate(${dx}px, ${dy}px) scale(${1 + sh * 0.02})` : undefined}}>{children}</AbsoluteFill>
      {fl > 0 && <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #FFFFFF, #9FD8FF 70%)', opacity: fl, mixBlendMode: 'screen'}} />}
    </>
  );
};

/* ------------------------------------------------------------------ composition */

export const makeFppAd = (spec: AdSpec, vo: {phrases: VoPhrase[]} | null, dir: string) => {
  const premium = spec.style === 'premium';
  const deskStart = spec.desk.length ? spec.desk[0].from : 0;
  const deskLen = spec.desk.reduce((a, w) => a + w.frames, 0);
  const Comp: React.FC = () => (
    <BrandProvider value={FPP_ADS_BRAND}>
      <Themed theme={ADS_THEME}>
        <AbsoluteFill style={{background: X.deep}}>
          <FlashShake flashes={spec.flashes} shakes={spec.shakes}>
            {spec.shots.map((s, i) => {
              const nx = spec.shots[i + 1];
              const next = nx && nx.from === s.from + s.frames ? nx : undefined;
              return (
                <Sequence key={s.id} from={s.from} durationInFrames={s.frames + 8} name={s.id}>
                  <ShotLayer s={s} next={next} dir={dir} id={dir.replace(/\//g, '-')} shade={premium ? 0.75 : 0.45} />
                </Sequence>
              );
            })}
            {spec.text.map((t, i) => {
              const len = t.to - t.from;
              return (
                <Sequence key={i} from={t.from} durationInFrames={len} name={`${t.type} ${t.from}`}>
                  {t.type === 'head' && <Headline lines={t.lines.map((l) => l.map((x) => ({t: x.t, at: x.at - t.from, hi: x.hi}) as Word))} size={t.size} top={t.top} exitAt={len - 5} />}
                  {t.type === 'label' && <TopLabel text={t.text} len={len} />}
                  {t.type === 'material' && <MaterialTag text={t.text} idx={t.idx} len={len} />}
                  {t.type === 'slam' && <Slam text={t.text} size={t.size} top={t.top} sub={t.sub} len={len} />}
                </Sequence>
              );
            })}
          </FlashShake>

          {spec.reveal && (
            <Sequence from={spec.reveal.from} durationInFrames={spec.reveal.to - spec.reveal.from + 2} name="brand reveal">
              <Wipe dur={6}>
                <Reveal spec={spec.reveal} premium={premium} />
              </Wipe>
            </Sequence>
          )}
          {spec.cta && (
            <Sequence from={spec.cta.from} durationInFrames={spec.cta.to - spec.cta.from + 10} name="click below">
              <Cta spec={spec.cta} />
            </Sequence>
          )}
          {deskLen > 0 && (
            <Sequence from={deskStart} durationInFrames={deskLen + 8} name="website funnel">
              <Wipe>
                <DeskBlock items={spec.desk} start={deskStart} dir={dir} />
              </Wipe>
            </Sequence>
          )}
          <Sequence from={spec.card.from} name="end card">
            <Wipe dur={7}>
              <EndCard variant={spec.card.variant} />
            </Wipe>
          </Sequence>

          {vo && <Captions phrases={vo.phrases} off={spec.capsOff} top={premium ? 1330 : 1360} />}
          <FilmGrain opacity={0.035} />
          <Audio src={staticFile(`audio/${spec.voFile}-mix.wav`)} />
        </AbsoluteFill>
      </Themed>
    </BrandProvider>
  );
  return Comp;
};
