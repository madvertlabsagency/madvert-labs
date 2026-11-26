/**
 * American Custom (Patch Lab) — "Cobra Drop" 18 s Meta ad (9:16, no voiceover).
 * Spec: src/americancustom/cobra18.json (scripts/ac-cobra-spec.py).
 *
 * Brand layer from quote.americancustompatchlab.com: deep navy (#0C1D48 /
 * #081234), crimson (#B8002E), gold (#D6B360), royal blue (#2F5399) and cream
 * (#F6F2EA); condensed caps headlines (Bebas Neue) over Manrope; the site's
 * blue → gold → crimson gradient edge; stars from the logo. The logo is the
 * supplied file on its own white canvas (cropped, never recoloured), shown on a
 * white card. Footage keeps its own colours — the green cobra is never tinted.
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmGrain} from '../shared/components/FilmGrain';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {CPL_THEME, Themed, type Theme} from '../shared/theme';
import {ShotLayer, type Trans} from '../markhor/commercial';
import {BrandProvider, Headline, Line, type Brand, type Word} from '../markhor/hyper';

/* ------------------------------------------------------------------ brand */

export const AC = {
  deep: '#081234',
  navy: '#0C1D48',
  mid: '#152C64',
  royal: '#2F5399',
  crimson: '#B8002E',
  red: '#D0243A',
  gold: '#D6B360',
  cream: '#F6F2EA',
  white: '#FFFFFF',
} as const;
const DISPLAY = '"Bebas Neue", Oswald, Arial Narrow, sans-serif';
const BODY = 'Manrope, Inter, Arial, sans-serif';
const LOGO = 'brand/ac-logo-crop.png'; // supplied logo, white canvas trimmed (976 x 368)
const LOGO_AR = 976 / 368;
const DOMAIN = 'quote.americancustompatchlab.com';
const EDGE = `linear-gradient(90deg, ${AC.royal} 0%, ${AC.gold} 38%, ${AC.red} 72%, ${AC.crimson} 100%)`;

const AC_BRAND: Brand = {
  c: {navy: AC.navy, royal: AC.royal, cyan: AC.gold, white: AC.white, light: AC.cream, deep: AC.deep},
  font: DISPLAY,
  weight: 400,
  slant: 0,
  tracking: '0.02em',
  strip: 'slant',
  stripGradient: `linear-gradient(100deg, ${AC.crimson} 0%, ${AC.red} 100%)`,
  logo: LOGO,
  logoTile: true,
  url: DOMAIN,
  domain: DOMAIN,
  motif: 'strip',
};
const AC_THEME: Theme = {
  ...CPL_THEME,
  base: AC.deep,
  tint: 'none',
  vignette: 'radial-gradient(120% 80% at 50% 48%, rgba(0,0,0,0) 62%, rgba(8,18,52,0.45) 100%)',
  shadeRgb: '8,18,52',
};

/* ------------------------------------------------------------------ spec */

type Shot = {id: string; from: number; frames: number; trans: Trans; scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}};
type W = {t: string; at: number; hi?: boolean};
type Text =
  | {type: 'head'; from: number; to: number; top: number; size: number; lines: W[][]}
  | {type: 'slam'; from: number; to: number; text: string; size: number; top: number; sub?: string | null};
export type CobraSpec = {
  durationInFrames: number;
  voFile: string;
  shots: Shot[];
  text: Text[];
  card: {from: number};
  flashes: number[];
  shakes: number[];
};

/* ------------------------------------------------------------------ pieces */

const Star: React.FC<{size: number; color: string; stroke?: boolean}> = ({size, color, stroke}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 4 L61.2 38.6 L97.6 38.6 L68.2 60 L79.4 94.6 L50 73.2 L20.6 94.6 L31.8 60 L2.4 38.6 L38.8 38.6 Z"
      fill={stroke ? 'none' : color}
      stroke={stroke ? color : 'none'}
      strokeWidth={stroke ? 4 : 0}
      strokeLinejoin="round"
    />
  </svg>
);

/** Navy field: soft royal / crimson light, drifting stars, a stripe band and the site's gradient edge. */
const Stage: React.FC = () => {
  const f = useCurrentFrame();
  const stars: [number, number, number, number][] = [
    [90, 180, 70, 0.16], [930, 260, 54, 0.14], [150, 1560, 60, 0.12], [960, 1490, 84, 0.12], [820, 1760, 40, 0.1], [60, 860, 36, 0.1], [1010, 980, 44, 0.1],
  ];
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(70% 42% at 50% ${30 + Math.sin(f / 50) * 2}%, rgba(47,83,153,0.55) 0%, rgba(47,83,153,0) 70%), radial-gradient(80% 40% at 50% 104%, rgba(184,0,46,0.30) 0%, rgba(184,0,46,0) 70%), linear-gradient(180deg, ${AC.mid} 0%, ${AC.navy} 45%, ${AC.deep} 100%)`,
        overflow: 'hidden',
      }}
    >
      {stars.map(([x, y, s, o], i) => (
        <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2 + Math.sin((f + i * 20) / 28) * 6, opacity: o, transform: `rotate(${(f + i * 30) * 0.25}deg)`}}>
          <Star size={s} color={i % 2 ? AC.gold : AC.white} stroke={i % 3 === 0} />
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          left: -300,
          right: -300,
          top: 1440,
          height: 120,
          background: `repeating-linear-gradient(180deg, rgba(184,0,46,0.22) 0 20px, rgba(255,255,255,0.06) 20px 40px)`,
          transform: `skewY(-7deg) translateX(${((f * 2) % 160) - 80}px)`,
        }}
      />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: EDGE}} />
    </AbsoluteFill>
  );
};

/** Diagonal wipe into a block, led by a crimson bar with a gold edge. Local frames. */
const Wipe: React.FC<{children: React.ReactNode; dur?: number}> = ({children, dur = 8}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, dur, easeInOut);
  return (
    <>
      <AbsoluteFill style={{clipPath: `polygon(0 0, ${p * 140}% 0, ${p * 140 - 40}% 100%, 0 100%)`}}>{children}</AbsoluteFill>
      {p > 0 && p < 1 && (
        <>
          <div style={{position: 'absolute', top: -200, bottom: -200, left: `${p * 140 - 20}%`, width: 80, background: `linear-gradient(180deg, ${AC.red}, ${AC.crimson})`, transform: 'skewX(-22deg)', boxShadow: '0 0 50px rgba(184,0,46,0.8)'}} />
          <div style={{position: 'absolute', top: -200, bottom: -200, left: `calc(${p * 140 - 20}% + 80px)`, width: 14, background: AC.gold, transform: 'skewX(-22deg)'}} />
        </>
      )}
    </>
  );
};

const Slam: React.FC<{text: string; size: number; top: number; sub?: string | null; len: number}> = ({text, size, top, sub, len}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 11, stiffness: 320, mass: 0.55}});
  const q = prog(f, len - 3, 3, easeIn);
  const fit = Math.min(size, Math.floor(1000 / (text.length * 0.43)));
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', opacity: (1 - q) * Math.min(1, s * 2.2)}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: -60, bottom: -40, background: 'radial-gradient(closest-side, rgba(8,18,52,0.62), rgba(8,18,52,0.3) 60%, rgba(8,18,52,0) 100%)'}} />
      {sub && (
        <div style={{position: 'relative', fontFamily: DISPLAY, fontSize: 68, lineHeight: 1, letterSpacing: '0.22em', color: AC.gold, marginBottom: 4, textShadow: '0 4px 18px rgba(0,0,0,0.75)', transform: `translateY(${(1 - s) * -30}px)`}}>{sub}</div>
      )}
      <div
        style={{
          position: 'relative',
          fontFamily: DISPLAY,
          fontSize: fit,
          lineHeight: 0.95,
          letterSpacing: '0.03em',
          color: AC.white,
          transform: `scale(${mix(1.45, 1, s) + q * 0.1})`,
          textShadow: `0 10px 40px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.6), 6px 6px 0 ${AC.crimson}`,
        }}
      >
        {text}
      </div>
      <div style={{position: 'relative', margin: '14px auto 0', width: 300 * s, height: 12, background: EDGE, borderRadius: 6}} />
    </div>
  );
};

/** The supplied logo on a white card with the site's gradient edge; shine sweep after it lands. */
const LogoCard: React.FC<{at: number; width: number; top: number}> = ({at, width, top}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 160, mass: 0.8}});
  const sweep = prog(f, at + 14, 22, easeInOut);
  const pad = 26;
  const h = width / LOGO_AR;
  return (
    <div style={{position: 'absolute', top, left: 540 - width / 2 - pad, width: width + pad * 2, transform: `scale(${mix(0.5, 1, s)}) rotate(${mix(-6, 0, s)}deg)`, opacity: Math.min(1, s * 1.6)}}>
      <div style={{position: 'absolute', inset: -70, borderRadius: 80, background: 'radial-gradient(closest-side, rgba(255,255,255,0.32), rgba(47,83,153,0.18) 55%, rgba(47,83,153,0) 80%)'}} />
      <div style={{position: 'relative', padding: 6, borderRadius: 40, background: `linear-gradient(135deg, ${AC.gold}, ${AC.red} 45%, ${AC.crimson} 60%, ${AC.royal})`, boxShadow: '0 30px 70px rgba(0,0,0,0.55)'}}>
        <div style={{position: 'relative', borderRadius: 34, background: '#FFFFFF', padding: `${pad - 6}px ${pad - 6}px`, overflow: 'hidden'}}>
          <Img src={staticFile(LOGO)} style={{width, height: h, display: 'block'}} />
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, rgba(255,255,255,0) ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.6) ${mix(-30, 110, sweep)}%, rgba(255,255,255,0) ${mix(-20, 120, sweep)}%)`, opacity: sweep > 0 && sweep < 1 ? 1 : 0}} />
        </div>
      </div>
    </div>
  );
};

const ClickBelow: React.FC<{at: number; top: number; size?: number}> = ({at, top, size = 110}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 12, stiffness: 240, mass: 0.6}});
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: Math.min(1, s * 1.8), transform: `scale(${mix(1.4, 1, s)})`}}>
      <div style={{fontFamily: DISPLAY, fontSize: size, lineHeight: 1, letterSpacing: '0.08em', color: AC.white, textShadow: `0 8px 34px rgba(0,0,0,0.5), 5px 5px 0 ${AC.crimson}`}}>CLICK BELOW</div>
      <div style={{marginTop: 6, height: 92, position: 'relative', width: 110}}>
        {[0, 1, 2].map((i) => {
          const ph = ((f - at) / 18 + i / 3) % 1;
          return (
            <svg key={i} width={110} height={54} viewBox="0 0 120 60" style={{position: 'absolute', left: 0, top: ph * 46, opacity: Math.sin(ph * Math.PI)}}>
              <path d="M 20 12 L 60 46 L 100 12" fill="none" stroke={i === 1 ? AC.gold : AC.white} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

/** Crimson pill like the site's "Get my free quote" button. */
const QuotePill: React.FC<{at: number; top: number; text?: string; size?: number}> = ({at, top, text = 'GET YOUR QUOTE', size = 78}) => {
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
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          padding: '22px 64px 18px',
          borderRadius: 999,
          background: `linear-gradient(180deg, ${AC.red}, ${AC.crimson})`,
          boxShadow: `0 18px 44px rgba(184,0,46,0.5), inset 0 0 0 3px rgba(255,255,255,0.18)`,
          fontFamily: DISPLAY,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: '0.05em',
          color: AC.white,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {text}
        <svg width={size * 0.62} height={size * 0.5} viewBox="0 0 60 48" style={{marginTop: -6}}>
          <path d="M4 24 H52 M34 6 L54 24 L34 42" fill="none" stroke={AC.white} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${mix(-40, 100, shine)}%, rgba(255,255,255,0.45) ${mix(-30, 110, shine)}%, transparent ${mix(-20, 120, shine)}%)`, opacity: shine > 0 && shine < 1 ? 1 : 0}} />
      </div>
    </div>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const u = prog(f, 36, 12, easeOut);
  return (
    <AbsoluteFill>
      <Stage />
      <LogoCard at={0} width={840} top={230} />
      <div style={{position: 'absolute', top: 650, left: 50, right: 50}}>
        <Line words={[{t: 'GET', at: 6}, {t: 'YOUR', at: 8}, {t: 'CUSTOM', at: 10}]} size={128} dark={false} />
        <div style={{height: 10}} />
        <Line words={[{t: 'PATCHES', at: 12}, {t: 'MADE.', at: 14, hi: true}]} size={128} dark={false} />
      </div>
      <ClickBelow at={20} top={985} size={104} />
      <QuotePill at={26} top={1190} size={80} />
      <div style={{position: 'absolute', top: 1345, left: 0, right: 0, textAlign: 'center', fontFamily: BODY, fontWeight: 700, fontSize: 36, letterSpacing: '0.04em', color: AC.cream, opacity: u, transform: `translateY(${(1 - u) * 14}px)`}}>
        {DOMAIN}
      </div>
    </AbsoluteFill>
  );
};

const FlashShake: React.FC<{flashes: number[]; shakes: number[]; children: React.ReactNode}> = ({flashes, shakes, children}) => {
  const f = useCurrentFrame();
  const sh = shakes.reduce((a, s) => a + (f >= s && f < s + 9 ? 1 - (f - s) / 9 : 0), 0);
  const dx = Math.sin(f * 2.3) * 14 * sh;
  const dy = Math.cos(f * 3.1) * 10 * sh;
  const fl = flashes.reduce((a, s) => Math.max(a, f >= s && f < s + 5 ? 0.5 * (1 - (f - s) / 5) : 0), 0);
  return (
    <>
      <AbsoluteFill style={{transform: sh > 0 ? `translate(${dx}px, ${dy}px) scale(${1 + sh * 0.02})` : undefined}}>{children}</AbsoluteFill>
      {fl > 0 && <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #FFFFFF, #F3E3B8 70%)', opacity: fl, mixBlendMode: 'screen'}} />}
    </>
  );
};

/* ------------------------------------------------------------------ composition */

export const makeCobraAd = (spec: CobraSpec, dir: string) => {
  const Comp: React.FC = () => (
    <BrandProvider value={AC_BRAND}>
      <Themed theme={AC_THEME}>
        <AbsoluteFill style={{background: AC.deep}}>
          <FlashShake flashes={spec.flashes} shakes={spec.shakes}>
            {spec.shots.map((s, i) => {
              const nx = spec.shots[i + 1];
              const next = nx && nx.from === s.from + s.frames ? nx : undefined;
              return (
                <Sequence key={s.id} from={s.from} durationInFrames={s.frames + 8} name={s.id}>
                  <ShotLayer s={s} next={next} dir={dir} id={dir.replace(/\//g, '-')} shade={0.5} />
                </Sequence>
              );
            })}
            {spec.text.map((t, i) => {
              const len = t.to - t.from;
              return (
                <Sequence key={i} from={t.from} durationInFrames={len} name={`${t.type} ${t.from}`}>
                  {t.type === 'head' && <Headline lines={t.lines.map((l) => l.map((x) => ({t: x.t, at: x.at - t.from, hi: x.hi}) as Word))} size={t.size} top={t.top} exitAt={len - 5} />}
                  {t.type === 'slam' && <Slam text={t.text} size={t.size} top={t.top} sub={t.sub} len={len} />}
                </Sequence>
              );
            })}
          </FlashShake>
          <Sequence from={spec.card.from} name="end card">
            <Wipe dur={7}>
              <EndCard />
            </Wipe>
          </Sequence>
          <FilmGrain opacity={0.035} />
          <Audio src={staticFile(`audio/${spec.voFile}-mix.wav`)} />
        </AbsoluteFill>
      </Themed>
    </BrandProvider>
  );
  return Comp;
};
