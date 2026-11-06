import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {FONT_BODY, FONT_HEAD, LOGO, M} from './brand';

export type W = {t: string; hi?: boolean};
export const ws = (s: string, hi: string[] = []): W[] => s.split(' ').map((t) => ({t, hi: hi.includes(t)}));

/** Masked word-by-word rise in heavy oblique (style sheet: Montserrat Black,
 * slanted); highlight words sit white on a slanted cyan → royal-blue bar. */
export const Words: React.FC<{
  words: W[];
  at: number;
  size: number;
  color?: string;
  hiColor?: string;
  weight?: number;
  stagger?: number;
  tracking?: number;
  exitAt?: number;
  align?: 'left' | 'center';
  font?: string;
  lineHeight?: number;
  slant?: number;
}> = ({words, at, size, color = M.navy, weight = 900, stagger = 3, tracking = -0.01, exitAt, align = 'left', font = FONT_HEAD, lineHeight = 1.04, slant = -10}) => {
  const f = useCurrentFrame();
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 8, easeIn);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.24,
        lineHeight,
        opacity: 1 - q,
        transform: `translateY(${-q * 24}px) skewX(${slant}deg)`,
        filter: q > 0 ? `blur(${q * 8}px)` : undefined,
      }}
    >
      {words.map((w, i) => {
        const p = prog(f, at + i * stagger, 12, easeOut);
        const bar = prog(f, at + i * stagger + 2, 10, easeOut);
        return (
          <span key={i} style={{position: 'relative', display: 'inline-block', overflow: w.hi ? 'visible' : 'hidden', paddingBottom: size * 0.06}}>
            {w.hi && (
              <span
                style={{
                  position: 'absolute',
                  left: -size * 0.16,
                  right: -size * 0.16,
                  top: size * 0.06,
                  bottom: size * 0.02,
                  background: `linear-gradient(100deg, ${M.cyan} 0%, #0E86DC 100%)`,
                  boxShadow: '0 10px 26px rgba(10,120,210,0.35)',
                  transform: `scaleX(${bar})`,
                  transformOrigin: '0 50%',
                }}
              />
            )}
            <span style={{position: 'relative', display: 'inline-block', overflow: 'hidden'}}>
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - p) * 105}%)`,
                  fontFamily: font,
                  fontWeight: weight,
                  fontSize: size,
                  letterSpacing: `${tracking}em`,
                  color: w.hi ? M.white : color,
                }}
              >
                {w.t}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Tapered cyan brush swash (style sheet underline), wipes on left → right. */
export const IceRule: React.FC<{at: number; width: number; exitAt?: number; align?: 'left' | 'center'; thickness?: number}> = ({at, width, exitAt, align = 'left', thickness = 12}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 14, easeOut);
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 8, easeIn);
  const h = thickness;
  return (
    <svg
      width={width}
      height={h + 4}
      viewBox={`0 0 ${width} ${h + 4}`}
      style={{display: 'block', margin: align === 'center' ? '0 auto' : undefined, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, opacity: 1 - q, overflow: 'visible'}}
    >
      <defs>
        <linearGradient id={`sw${width}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0E86DC" />
          <stop offset="0.6" stopColor={M.cyan} />
          <stop offset="1" stopColor={M.cyan} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d={`M 0 ${h * 0.75} Q ${width * 0.5} ${h * 0.05} ${width} ${h * 0.25} L ${width} ${h * 0.4} Q ${width * 0.55} ${h * 0.55} ${width * 0.02} ${h + 2} Z`} fill={`url(#sw${width})`} />
    </svg>
  );
};

/** The supplied logo as an untouched square tile (its own dark-blue artwork background). */
export const LogoTile: React.FC<{at: number; size: number; top: number}> = ({at, size, top}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 16, stiffness: 120, mass: 0.9}});
  const sweep = prog(f, at + 18, 26, easeInOut);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 540 - size / 2,
        width: size,
        height: size,
        borderRadius: 34,
        overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(10,40,90,0.28), 0 0 0 2px rgba(31,195,242,0.35), 0 0 60px rgba(31,195,242,0.25)',
        transform: `translateY(${(1 - s) * 50}px) scale(${mix(0.9, 1, s)})`,
        opacity: Math.min(1, s * 1.5),
      }}
    >
      <Img src={staticFile(LOGO)} style={{width: size, height: size, display: 'block'}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(115deg, transparent ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.22) ${mix(-30, 110, sweep)}%, transparent ${mix(-20, 120, sweep)}%)`,
          opacity: sweep > 0 && sweep < 1 ? 1 : 0,
        }}
      />
    </div>
  );
};

/** Ice-white field with pale blue / cyan gradient light. */
export const IceField: React.FC<{drift?: number}> = ({drift = 0}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(70% 38% at ${50 + drift * 6}% 30%, rgba(31,195,242,0.20), rgba(31,195,242,0) 70%), radial-gradient(80% 40% at 50% 100%, rgba(150,205,240,0.45), rgba(150,205,240,0) 70%), linear-gradient(180deg, ${M.ice} 0%, ${M.ice2} 100%)`,
    }}
  />
);

/** Navy CTA button with cyan arrow. Local frames. */
export type CtaStyle = 'navy' | 'cyan' | 'outline' | 'pale';
const CTA_STYLES: Record<CtaStyle, {bg: string; fg: string; arrow: string; border?: string; shadow: string}> = {
  navy: {bg: `linear-gradient(180deg, ${M.navy2}, ${M.navy})`, fg: M.white, arrow: M.cyan, shadow: '0 22px 50px rgba(10,26,58,0.35)'},
  cyan: {bg: `linear-gradient(100deg, ${M.cyan}, #13A9EC)`, fg: M.navy, arrow: M.navy, shadow: '0 22px 50px rgba(19,169,236,0.35)'},
  outline: {bg: 'rgba(255,255,255,0.85)', fg: M.navy, arrow: M.navy, border: `4px solid ${M.navy}`, shadow: '0 18px 40px rgba(10,26,58,0.18)'},
  pale: {bg: `linear-gradient(180deg, #E3F3FD, ${M.pale})`, fg: M.navy, arrow: M.navy, shadow: '0 18px 40px rgba(10,60,120,0.18)'},
};

export const CtaButton: React.FC<{at: number; text: string; top: number; size?: number; variant?: CtaStyle}> = ({at, text, top, size = 46, variant = 'navy'}) => {
  const st = CTA_STYLES[variant];
  const f = useCurrentFrame();
  const p = prog(f, at, 14, easeOut);
  const nudge = Math.sin(Math.max(0, f - at - 16) * 0.2) * 7 * prog(f, at + 16, 10);
  const shine = prog(f, at + 26, 22, easeInOut);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '30px 44px 30px 52px',
          borderRadius: 999,
          background: st.bg,
          border: st.border,
          boxShadow: `${st.shadow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{fontFamily: FONT_HEAD, fontWeight: 800, fontSize: size, letterSpacing: '0.03em', color: st.fg, lineHeight: 1}}>{text}</span>
        <svg width={56} height={40} viewBox="0 0 56 40" style={{transform: `translateX(${nudge}px)`}}>
          <path d="M 4 20 L 48 20 M 32 5 L 50 20 L 32 35" fill="none" stroke={st.arrow} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(110deg, transparent ${mix(-40, 100, shine)}%, rgba(160,225,255,0.28) ${mix(-30, 110, shine)}%, transparent ${mix(-20, 120, shine)}%)`,
            opacity: shine > 0 && shine < 1 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

/** End card content (field + logo + CTA + rule), local frames from its start. */
export const EndCard: React.FC<{cta: string; ctaSize?: number; line?: string; delay?: number; variant?: CtaStyle}> = ({cta, ctaSize = 46, line, delay = 0, variant = 'navy'}) => {
  const f = useCurrentFrame();
  const d = delay;
  return (
    <AbsoluteFill>
      <IceField drift={Math.sin(f / 40)} />
      {line && (
        <div style={{position: 'absolute', top: 250, left: 60, right: 60}}>
          {line.split('|').map((l, i) => (
            <Words key={i} words={ws(l.trim(), ['BRAND.'])} at={d + 2 + i * 6} size={72} align="center" stagger={3} weight={900} />
          ))}
        </div>
      )}
      <LogoTile at={d + 6} size={540} top={line ? 470 : 430} />
      <CtaButton at={d + 22} text={cta} top={line ? 1100 : 1060} size={ctaSize} variant={variant} />
      <div style={{position: 'absolute', top: line ? 1262 : 1222, left: 0, right: 0}}>
        <IceRule at={d + 32} width={300} align="center" />
      </div>
    </AbsoluteFill>
  );
};

export {FONT_BODY};
