/**
 * Markhor Patches — hyper-cut campaign design system (applied identically to
 * every reel, per the supplied visual style guide):
 *  - Headlines: Manrope ExtraBold, uppercase, slightly italic (−8° slant; the
 *    bundled Manrope has no italic). Navy on light, white on dark footage.
 *  - Highlight words (1–3 per headline): white on an angled cyan → royal-blue strip.
 *  - Subheads: Manrope Semibold, sentence case. Labels/subtitles: white semibold
 *    with a navy shadow, inside the mobile-safe area.
 *  - CTA: navy or cyan pill. Logo: the ORIGINAL supplied file (light version on
 *    the bright end cards), untouched.
 */
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {CPL_THEME, type Theme} from '../shared/theme';

export const H = {
  navy: '#0B2345',
  royal: '#1068D7',
  cyan: '#00C2FF',
  white: '#FFFFFF',
  light: '#EAF5FF',
} as const;
export const FONT = 'Manrope, Inter, Arial, sans-serif';
export const LOGO_LIGHT = 'brand/markhor-logo-light.png'; // supplied file, unaltered
export const URL = 'www.markhorpatches.com';
export const BEAT = 15; // 120 BPM at 30 fps

/**
 * Brand switch for this design system. Every component below reads the active
 * brand from context; the default is Markhor Patches, so Markhor compositions
 * render exactly as before. Other clients wrap their composition in
 * <BrandProvider value={...}>.
 */
export type Brand = {
  c: {navy: string; royal: string; cyan: string; white: string; light: string; deep: string};
  font: string;
  weight: number;
  slant: number; // degrees (negative = italic lean)
  tracking: string;
  strip: 'slant' | 'hex'; // highlight-word shape
  stripGradient: string;
  logo: string;
  logoTile: boolean; // show the logo on a white rounded tile (logos supplied on white)
  name?: string; // typeset brand name under the logo (when the logo has no wordmark)
  url: string;
  domain: string;
  motif: 'strip' | 'hex';
};
export const MARKHOR_BRAND: Brand = {
  c: {...H, deep: H.navy}, // deep = shadow tone
  font: FONT,
  weight: 800,
  slant: -8,
  tracking: '-0.01em',
  strip: 'slant',
  stripGradient: `linear-gradient(100deg, ${H.cyan} 0%, ${H.royal} 100%)`,
  logo: LOGO_LIGHT,
  logoTile: false,
  url: URL,
  domain: 'markhorpatches.com',
  motif: 'strip',
};
const BrandCtx = createContext<Brand>(MARKHOR_BRAND);
export const BrandProvider = BrandCtx.Provider;
export const useBrand = () => useContext(BrandCtx);
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');

export const HYPER_THEME: Theme = {
  ...CPL_THEME,
  base: H.navy,
  tint: 'linear-gradient(180deg, rgba(0,194,255,0.05), rgba(11,35,69,0.10))',
  vignette: 'radial-gradient(120% 78% at 50% 48%, rgba(0,0,0,0) 64%, rgba(11,35,69,0.38) 100%)',
  shadeRgb: '11,35,69',
};
export const HYPER_STUDIO_THEME: Theme = {...HYPER_THEME, base: H.white, tint: 'none', vignette: 'none'};

/* ------------------------------------------------------------------ type */

export type Word = {t: string; hi?: boolean; at: number};
/** Words with explicit (beat) entry frames: `w('ONE', 0)`, `hi('PATCH.', 15)`. */
export const w = (t: string, at: number): Word => ({t, at});
export const hi = (t: string, at: number): Word => ({t, at, hi: true});

/**
 * Headline line: each word punches in on its own frame (fast rise + tiny
 * overshoot), highlight words get the angled strip which wipes in first.
 */
export const Line: React.FC<{words: Word[]; size: number; dark?: boolean; align?: 'center' | 'left'; exitAt?: number}> = ({words, size, dark = true, align = 'center', exitAt}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const H = b.c;
  const FONT = b.font;
  const hex = b.strip === 'hex';
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 6, easeIn);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.24,
        rowGap: size * 0.1,
        transform: `${b.slant ? `skewX(${b.slant}deg) ` : ''}translateY(${-q * 30}px)`,
        opacity: 1 - q,
        lineHeight: 1.02,
      }}
    >
      {words.map((x, i) => {
        if (f < x.at) return <span key={i} style={{fontFamily: FONT, fontWeight: b.weight, fontSize: size, letterSpacing: b.tracking, visibility: 'hidden', margin: x.hi ? `0 ${size * 0.16}px` : undefined}}>{x.t}</span>;
        const s = spring({frame: f - x.at, fps, config: {damping: 15, stiffness: 260, mass: 0.6}});
        const strip = prog(f, x.at - 1, 6, easeOut);
        return (
          <span key={i} style={{position: 'relative', display: 'inline-block', margin: x.hi ? `0 ${size * 0.16}px` : undefined}}>
            {x.hi && (
              <span
                style={{
                  position: 'absolute',
                  left: -size * 0.18,
                  right: -size * 0.18,
                  top: size * 0.04,
                  bottom: -size * 0.02,
                  background: b.stripGradient,
                  transform: `scaleX(${strip})${hex ? '' : ' skewX(-6deg)'}`,
                  transformOrigin: '0 50%',
                  boxShadow: hex ? undefined : '0 10px 28px rgba(16,104,215,0.35)',
                  clipPath: hex ? `polygon(${size * 0.16}px 0, calc(100% - ${size * 0.16}px) 0, 100% 50%, calc(100% - ${size * 0.16}px) 100%, ${size * 0.16}px 100%, 0 50%)` : undefined,
                }}
              />
            )}
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                fontFamily: FONT,
                fontWeight: b.weight,
                fontSize: size,
                letterSpacing: b.tracking,
                color: x.hi ? H.white : dark ? H.navy : H.white,
                transform: `translateY(${(1 - s) * size * 0.5}px) scale(${mix(1.25, 1, s)})`,
                opacity: Math.min(1, s * 2),
                textShadow: !dark && !x.hi ? `0 4px 18px rgba(${rgb(H.deep)},0.65)` : undefined,
              }}
            >
              {x.t}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Headline block in the top safe band. `dark` = navy type (light backgrounds). */
export const Headline: React.FC<{lines: Word[][]; size: number; dark?: boolean; top?: number; exitAt?: number; sizes?: number[]}> = ({lines, size, dark = false, top = 250, exitAt, sizes}) => (
  <div style={{position: 'absolute', top, left: 56, right: 56, display: 'flex', flexDirection: 'column', gap: size * 0.12}}>
    {lines.map((l, i) => (
      <Line key={i} words={l} size={sizes?.[i] ?? size} dark={dark} exitAt={exitAt} />
    ))}
  </div>
);

/** Subhead: Manrope Semibold sentence case. */
export const Sub: React.FC<{text: string; at: number; top: number; dark?: boolean; size?: number; exitAt?: number}> = ({text, at, top, dark = false, size = 40, exitAt}) => {
  const f = useCurrentFrame();
  const b = useBrand();
  const H = b.c;
  const FONT = b.font;
  const p = prog(f, at, 10, easeOut);
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 6, easeIn);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 60,
        right: 60,
        textAlign: 'center',
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: size,
        color: dark ? H.navy : H.white,
        opacity: p * (1 - q),
        transform: `translateY(${(1 - p) * 18}px)`,
        textShadow: dark ? undefined : `0 3px 14px rgba(${rgb(H.deep)},0.8)`,
      }}
    >
      {text}
    </div>
  );
};

/** Material / style label: white semibold caps with navy shadow + cyan tick, slides in. */
export const Label: React.FC<{text: string; at: number; top?: number; exitAt?: number; dark?: boolean}> = ({text, at, top = 1530, exitAt, dark = false}) => {
  const f = useCurrentFrame();
  const b = useBrand();
  const H = b.c;
  const FONT = b.font;
  const hex = b.strip === 'hex';
  const p = prog(f, at, 6, easeOut);
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 4, easeIn);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p * (1 - q)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, transform: `translateX(${(1 - p) * -40}px)${b.slant ? ` skewX(${b.slant}deg)` : ''}`}}>
        {hex ? (
          <svg width={30} height={34} viewBox="0 0 30 34">
            <path d="M15 1 L29 9 L29 25 L15 33 L1 25 L1 9 Z" fill={H.cyan} />
          </svg>
        ) : (
          <span style={{width: 34, height: 8, background: `linear-gradient(90deg, ${H.cyan}, ${H.royal})`}} />
        )}
        <span
          style={{
            fontFamily: FONT,
            fontWeight: b.weight,
            fontSize: hex ? 46 : 54,
            letterSpacing: hex ? '0.14em' : '0.08em',
            color: dark ? H.navy : H.white,
            padding: '14px 30px 12px',
            background: dark ? 'rgba(255,255,255,0.8)' : `rgba(${rgb(H.deep)},0.72)`,
            boxShadow: `0 10px 30px rgba(${rgb(H.deep)},0.25)`,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ end card */

export const CtaPill: React.FC<{at: number; text: string; top: number; variant?: 'navy' | 'cyan'; size?: number; justify?: 'center' | 'flex-start'}> = ({at, text, top, variant = 'navy', size = 44, justify = 'center'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 14, stiffness: 200, mass: 0.7}});
  const nudge = Math.sin(Math.max(0, f - at - 14) * 0.22) * 7 * prog(f, at + 14, 8);
  const shine = prog(f, at + 24, 20, easeInOut);
  const navy = variant === 'navy';
  const b = useBrand();
  const H = b.c;
  const FONT = b.font;
  const hex = b.strip === 'hex';
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: justify, transformOrigin: justify === 'center' ? '50% 50%' : '0% 50%', opacity: f < at ? 0 : Math.min(1, s * 1.6), transform: `translateY(${(1 - s) * 40}px) scale(${mix(0.9, 1, s)})`}}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: hex ? '30px 70px 30px 74px' : '30px 48px 30px 56px',
          borderRadius: hex ? 0 : 999,
          clipPath: hex ? 'polygon(34px 0, calc(100% - 34px) 0, 100% 50%, calc(100% - 34px) 100%, 34px 100%, 0 50%)' : undefined,
          background: hex ? (navy ? `linear-gradient(100deg, ${H.navy}, ${H.royal})` : b.stripGradient) : navy ? H.navy : `linear-gradient(100deg, ${H.cyan}, #19A9F0)`,
          boxShadow: navy ? `0 22px 50px rgba(${rgb(H.deep)},0.35)` : '0 22px 50px rgba(0,150,230,0.35)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{fontFamily: FONT, fontWeight: b.weight, fontSize: size, letterSpacing: '0.02em', color: navy || hex ? H.white : H.navy, lineHeight: 1}}>{text}</span>
        <svg width={54} height={40} viewBox="0 0 54 40" style={{transform: `translateX(${nudge}px)`}}>
          <path d="M 4 20 L 46 20 M 30 5 L 48 20 L 30 35" fill="none" stroke={hex ? H.white : navy ? H.cyan : H.navy} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(110deg, transparent ${mix(-40, 100, shine)}%, rgba(255,255,255,0.3) ${mix(-30, 110, shine)}%, transparent ${mix(-20, 120, shine)}%)`,
            opacity: shine > 0 && shine < 1 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

/** Bright premium field: white top (the light logo sits on it seamlessly), light blue below, a slow diagonal strip. */
export const BrightField: React.FC = () => {
  const f = useCurrentFrame();
  const b = useBrand();
  if (b.motif === 'hex') return <HexField />;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${H.white} 0%, ${H.white} 46%, ${H.light} 100%)`, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: -300,
          right: -300,
          top: 1620 + Math.sin(f / 30) * 10,
          height: 120,
          background: `linear-gradient(100deg, rgba(0,194,255,0) 0%, rgba(0,194,255,0.22) 40%, rgba(16,104,215,0.22) 70%, rgba(16,104,215,0) 100%)`,
          transform: `skewY(-6deg) translateX(${(f % 120) * 2 - 120}px)`,
        }}
      />
      <div style={{position: 'absolute', left: -300, right: -300, top: 1760, height: 26, background: `linear-gradient(100deg, rgba(0,194,255,0), ${H.cyan}, ${H.royal}, rgba(16,104,215,0))`, transform: 'skewY(-6deg)', opacity: 0.55}} />
    </AbsoluteFill>
  );
};

/** Isometric cube outline (the FPP logo's geometry, as a light line motif — not the logo itself). */
export const CubeLines: React.FC<{size: number; color: string; width?: number; draw?: number}> = ({size, color, width = 3, draw = 1}) => {
  const r = size / 2;
  const pts = [0, 60, 120, 180, 240, 300].map((a) => [r + r * Math.cos(((a - 90) * Math.PI) / 180), r + r * Math.sin(((a - 90) * Math.PI) / 180)]);
  const hexPath = `M ${pts.map((p) => p.join(' ')).join(' L ')} Z`;
  const inner = `M ${pts[5].join(' ')} L ${r} ${r} L ${pts[1].join(' ')} M ${r} ${r} L ${pts[3].join(' ')}`;
  return (
    <svg width={size} height={size} viewBox={`${-width} ${-width} ${size + width * 2} ${size + width * 2}`} style={{overflow: 'visible'}}>
      <path d={hexPath} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} />
      <path d={inner} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} />
    </svg>
  );
};

/** Bright field for hexagon brands: white → light, two slow cube outlines and a gradient base bar. */
export const HexField: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const b = useBrand();
  const H = b.c;
  const wide = width > height;
  return (
    <AbsoluteFill style={{background: `linear-gradient(${wide ? 120 : 180}deg, ${H.white} 0%, ${H.white} ${wide ? 40 : 46}%, ${H.light} 100%)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: wide ? -160 : -240, top: wide ? -200 : -180, transform: `rotate(${f * 0.04}deg)`, opacity: 0.1}}>
        <CubeLines size={wide ? 760 : 820} color={H.royal} width={4} />
      </div>
      <div style={{position: 'absolute', left: wide ? -220 : -300, bottom: wide ? -260 : -220, transform: `rotate(${-f * 0.03}deg)`, opacity: 0.08}}>
        <CubeLines size={wide ? 680 : 760} color={H.cyan} width={4} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: wide ? 14 : 18, background: `linear-gradient(90deg, ${H.navy}, ${H.royal} 50%, ${H.cyan})`}} />
    </AbsoluteFill>
  );
};

/** End card: original logo, one short headline, one CTA, the website. Local frames. */
export const EndCard: React.FC<{headline: Word[]; cta: string; variant?: 'navy' | 'cyan'; ctaSize?: number; delay?: number}> = ({headline, cta, variant = 'navy', ctaSize = 44, delay = 0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const d = delay;
  const s = spring({frame: f - d, fps, config: {damping: 16, stiffness: 150, mass: 0.8}});
  const breathe = 1 + Math.sin(Math.max(0, f - d - 20) / 22) * 0.008;
  const url = prog(f, d + 30, 12, easeOut);
  const b = useBrand();
  if (b.logoTile) return <TileEndCard headline={headline} cta={cta} variant={variant} ctaSize={ctaSize} delay={delay} />;
  return (
    <AbsoluteFill>
      <BrightField />
      <Img
        src={staticFile(LOGO_LIGHT)}
        style={{
          position: 'absolute',
          top: 230,
          left: 540 - 300,
          width: 600,
          height: 600,
          transform: `scale(${mix(0.86, 1, s) * breathe})`,
          opacity: Math.min(1, s * 1.5),
        }}
      />
      <div style={{position: 'absolute', top: 900, left: 50, right: 50}}>
        <Line words={headline.map((x) => ({...x, at: x.at + d}))} size={76} dark />
      </div>
      <CtaPill at={d + 22} text={cta} top={1080} variant={variant} size={ctaSize} />
      <div style={{position: 'absolute', top: 1238, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 600, fontSize: 38, letterSpacing: '0.06em', color: H.navy, opacity: url, transform: `translateY(${(1 - url) * 14}px)`}}>
        {URL}
      </div>
    </AbsoluteFill>
  );
};

/** The supplied logo, unaltered, on a white rounded tile (for logos delivered on a white background). */
export const LogoTile: React.FC<{size: number; s: number}> = ({size, s}) => {
  const b = useBrand();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.12,
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: `0 30px 70px rgba(${rgb(b.c.deep)},0.22), 0 0 0 2px rgba(${rgb(b.c.cyan)},0.25)`,
        transform: `scale(${mix(0.8, 1, s)}) rotate(${(1 - s) * -8}deg)`,
        opacity: Math.min(1, s * 1.6),
      }}
    >
      <Img src={staticFile(b.logo)} style={{width: size, height: size, display: 'block'}} />
    </div>
  );
};

/** Typeset brand name (used when the logo is a symbol without a wordmark). */
export const BrandName: React.FC<{at: number; size: number; align?: 'center' | 'left'}> = ({at, size, align = 'center'}) => {
  const f = useCurrentFrame();
  const b = useBrand();
  const p = prog(f, at, 14, easeOut);
  if (!b.name) return null;
  return (
    <div
      style={{
        fontFamily: b.font,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: `${mix(0.4, 0.16, p)}em`,
        textAlign: align,
        background: `linear-gradient(90deg, ${b.c.navy}, ${b.c.royal} 55%, ${b.c.cyan})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        opacity: p,
        whiteSpace: 'nowrap',
      }}
    >
      {b.name}
    </div>
  );
};

const TileEndCard: React.FC<{headline: Word[]; cta: string; variant?: 'navy' | 'cyan'; ctaSize?: number; delay?: number}> = ({headline, cta, variant = 'navy', ctaSize = 44, delay = 0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = useBrand();
  const d = delay;
  const s = spring({frame: f - d, fps, config: {damping: 15, stiffness: 140, mass: 0.8}});
  const ring = prog(f, d + 2, 22, easeOut);
  const url = prog(f, d + 30, 12, easeOut);
  return (
    <AbsoluteFill>
      <BrightField />
      <div style={{position: 'absolute', top: 150, left: 540 - 340, width: 680, height: 680, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'absolute', opacity: 0.5 * (1 - prog(f, d + 24, 20))}}>
          <CubeLines size={660} color={b.c.cyan} width={3} draw={ring} />
        </div>
        <LogoTile size={540} s={s} />
      </div>
      <div style={{position: 'absolute', top: 870, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <BrandName at={d + 8} size={74} />
      </div>
      <div style={{position: 'absolute', top: 1000, left: 50, right: 50}}>
        <Line words={headline.map((x) => ({...x, at: x.at + d + 6}))} size={70} dark />
      </div>
      <CtaPill at={d + 24} text={cta} top={1210} variant={variant} size={ctaSize + 4} />
      <div style={{position: 'absolute', top: 1380, left: 0, right: 0, textAlign: 'center', fontFamily: b.font, fontWeight: 700, fontSize: 42, letterSpacing: '0.08em', color: b.c.navy, opacity: url, transform: `translateY(${(1 - url) * 14}px)`}}>
        {b.url}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ helpers */

type Edl = {shots: {id: string; from: number; frames: number}[]};
export const shotsOf = (edl: Edl, dir: string) => {
  const shot = (id: string) => {
    const s = edl.shots.find((x) => x.id === id);
    if (!s) throw new Error(`Shot ${id} missing (${dir})`);
    return s;
  };
  const seg = (id: string) => `segments/markhor/${dir}/${id}.mp4`;
  const Shot: React.FC<{id: string; children: React.ReactNode}> = ({id, children}) => (
    <Sequence from={shot(id).from} durationInFrames={shot(id).frames} name={id}>
      {children}
    </Sequence>
  );
  return {shot, seg, Shot};
};

/** Punch on a cut: 1 at the cut → 0 over n frames. */
export const punchAt = (f: number, c: number, n = 6) => (f >= c ? 1 - prog(f, c, n, easeOut) : 0);
