/**
 * Markhor Patches — flagship commercial engine (50 s / 30 s / 15 s / website hero).
 * A spec (src/markhor/<cut>/edl.json) lists footage shots and website segments
 * back to back, beat-timed text, and the end card. Footage uses the campaign
 * ShotLayer (transition grammar) and the shared design system (./hyper.tsx).
 * Website segments are the REAL markhorpatches.com screen recordings, shown in
 * a phone composite with camera moves, tap highlights and step callouts.
 */
import React from 'react';
import {AbsoluteFill, Audio, Freeze, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmGrain} from '../shared/components/FilmGrain';
import {Footage} from '../shared/components/Footage';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {Themed} from '../shared/theme';
import {ShotLayer, type Trans} from './commercial';
import {BrightField, EndCard, FONT, H, HYPER_THEME, Headline, Label, Sub, type Word} from './hyper';

export type ShotSpec = {id: string; from: number; frames: number; trans: Trans; scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}};
export type WebSpec = {id: string; from: number; frames: number; taps: [number, number, number][]; focus: [number, number]; chips?: string[] | null};
type W = {t: string; at: number; hi?: boolean};
export type TextSpec =
  | {type: 'headline'; from: number; to: number; top: number; size: number; sizes?: number[] | null; dark?: boolean; lines: W[][]}
  | {type: 'label'; from: number; to: number; text: string; dark?: boolean; top?: number}
  | {type: 'sub'; from: number; to: number; text: string; top: number; dark?: boolean; size?: number};
export type FlagSpec = {
  durationInFrames: number;
  audio: boolean;
  shots: ShotSpec[];
  web: WebSpec[];
  text: TextSpec[];
  card?: {from: number; len: number; headline: [string, number, boolean?][]; cta: string; variant: 'navy' | 'cyan'};
  loop?: {at: number; dur: number};
};

/* ------------------------------------------------------------------ phone composite */

const SRC_W = 1080; // recording px
const CROP_TOP = 80; // status bar removed in conform-web.py
const BEZEL = 14;
/** Phone placement: screen width, top edge, horizontal centre, and the highest the top edge may rise during a push-in. */
export type Geo = {screenW: number; top: number; cx: number; minTop: number; wide?: boolean};
export const VERTICAL_GEO: Geo = {screenW: 520, top: 455, cx: 540, minTop: 400};
const screenH = (g: Geo) => Math.round((g.screenW * 1464) / 720);

const Tap: React.FC<{at: number; x: number; y: number; g: Geo}> = ({at, x, y, g}) => {
  const f = useCurrentFrame();
  if (f < at - 8 || f > at + 22) return null;
  const k = g.screenW / 520;
  const pre = prog(f, at - 8, 8, easeOut);
  const ring = prog(f, at, 18, easeOut);
  const p = {x: (x * g.screenW) / SRC_W, y: ((y - CROP_TOP) * g.screenW) / SRC_W};
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: p.x - 22 * k,
          top: p.y - 22 * k,
          width: 44 * k,
          height: 44 * k,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          border: `${4 * k}px solid ${H.cyan}`,
          boxShadow: '0 6px 18px rgba(11,35,69,0.35)',
          opacity: pre * (1 - prog(f, at + 8, 10)),
          transform: `scale(${f < at ? mix(1.3, 1, pre) : mix(1, 0.86, prog(f, at, 4))})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: p.x - 80 * k * ring,
          top: p.y - 80 * k * ring,
          width: 160 * k * ring,
          height: 160 * k * ring,
          borderRadius: '50%',
          border: `${5 * k}px solid ${H.cyan}`,
          opacity: f >= at ? 1 - ring : 0,
        }}
      />
    </>
  );
};

const Chips: React.FC<{chips: string[]; frames: number; g: Geo}> = ({chips, frames, g}) => {
  const f = useCurrentFrame();
  const k = g.screenW / 520;
  const step = frames / chips.length;
  const inP = prog(f, 0, 8, easeOut);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: screenH(g) - 250 * k, display: 'flex', justifyContent: 'center', opacity: inP * (1 - prog(f, frames - 4, 4))}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 * k, padding: `${14 * k}px ${16 * k}px`, borderRadius: 22 * k, background: 'rgba(11,35,69,0.92)', boxShadow: '0 16px 40px rgba(11,35,69,0.35)', maxWidth: g.screenW - 40 * k}}>
        {chips.map((c, i) => {
          const on = f >= i * step;
          return (
            <span
              key={c}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 19 * k,
                letterSpacing: '0.08em',
                padding: `${8 * k}px ${12 * k}px`,
                borderRadius: 999,
                color: on ? H.navy : 'rgba(255,255,255,0.55)',
                background: on ? H.cyan : 'rgba(255,255,255,0.08)',
              }}
            >
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const UrlChip: React.FC<{g: Geo}> = ({g}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = g.screenW / 520;
  const s = spring({frame: f - 6, fps, config: {damping: 14, stiffness: 200, mass: 0.7}});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: screenH(g) - 170 * k, display: 'flex', justifyContent: 'center', opacity: f < 6 ? 0 : Math.min(1, s * 1.5), transform: `translateY(${(1 - s) * 30}px) scale(${mix(0.9, 1, s)})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14 * k, padding: `${18 * k}px ${30 * k}px`, borderRadius: 999, background: H.navy, boxShadow: '0 18px 44px rgba(11,35,69,0.4)'}}>
        <svg width={30 * k} height={30 * k} viewBox="0 0 24 24">
          <circle cx={12} cy={12} r={10} fill="none" stroke={H.cyan} strokeWidth={2.4} />
          <path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" fill="none" stroke={H.cyan} strokeWidth={2} />
        </svg>
        <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 32 * k, letterSpacing: '0.02em', color: H.white}}>markhorpatches.com</span>
      </div>
    </div>
  );
};

/** Bright stage for 16:9 (ice white → light blue, slow cyan strip). */
export const BrightWide: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(120deg, ${H.white} 0%, ${H.white} 40%, ${H.light} 100%)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -400, right: -400, top: 900 + Math.sin(f / 30) * 8, height: 90, background: 'linear-gradient(100deg, rgba(0,194,255,0) 0%, rgba(0,194,255,0.2) 40%, rgba(16,104,215,0.2) 70%, rgba(16,104,215,0) 100%)', transform: `skewY(-4deg) translateX(${(f % 120) * 2 - 120}px)`}} />
      <div style={{position: 'absolute', left: -400, right: -400, top: 1010, height: 18, background: `linear-gradient(100deg, rgba(0,194,255,0), ${H.cyan}, ${H.royal}, rgba(16,104,215,0))`, transform: 'skewY(-4deg)', opacity: 0.5}} />
    </AbsoluteFill>
  );
};

/** One contiguous run of website segments: bright stage, phone, camera moves. Local frames. */
export const WebBlock: React.FC<{items: WebSpec[]; start: number; dir: string; g?: Geo}> = ({items, start, dir, g = VERTICAL_GEO}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const SH = screenH(g);
  const k = g.screenW / 520;
  const len = items.reduce((a, w) => a + w.frames, 0);
  const wipe = prog(f, 0, 10, easeInOut);
  const rise = spring({frame: f - 2, fps, config: {damping: 18, stiffness: 120, mass: 0.9}});
  // camera: ease from the previous segment's focus to this one's
  let fy = items[0].focus[0];
  let sc = items[0].focus[1];
  items.forEach((w, i) => {
    const local = w.from - start;
    if (f >= local) {
      const prev = i ? items[i - 1].focus : [w.focus[0], 1];
      const kk = prog(f, local, 16, easeInOut);
      fy = mix(prev[0], w.focus[0], kk);
      sc = mix(prev[1], w.focus[1], kk);
    }
  });
  const out = prog(f, len - 5, 5, easeIn);
  const ph = SH + BEZEL * 2 * k;
  return (
    <AbsoluteFill style={{clipPath: `polygon(0 0, ${wipe * 140}% 0, ${wipe * 140 - 40}% 100%, 0 100%)`}}>
      {g.wide ? <BrightWide /> : <BrightField />}
      <div
        style={{
          position: 'absolute',
          left: g.cx - g.screenW / 2 - BEZEL * k,
          top: g.top,
          width: g.screenW + BEZEL * 2 * k,
          height: ph,
          transformOrigin: `50% ${fy * 100}%`,
          // keep the phone's top edge below the headline band while the camera pushes in
          transform: `translateY(${(1 - rise) * 260 * k + Math.max(0, g.minTop - (g.top - fy * ph * (sc - 1)))}px) scale(${sc * (1 + out * 0.08)})`,
          opacity: Math.min(1, rise * 1.4),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 70 * k,
            background: 'linear-gradient(160deg, #1B2A44, #070D19)',
            boxShadow: '0 40px 90px rgba(11,35,69,0.38), 0 0 0 2px rgba(0,194,255,0.25), inset 0 2px 0 rgba(255,255,255,0.18)',
          }}
        />
        <div style={{position: 'absolute', left: BEZEL * k, top: BEZEL * k, width: g.screenW, height: SH, borderRadius: 56 * k, overflow: 'hidden', background: H.white}}>
          {items.map((w) => (
            <Sequence key={w.id} from={w.from - start} durationInFrames={w.frames} name={w.id}>
              <OffthreadVideo muted src={staticFile(`segments/markhor/${dir}/${w.id}.mp4`)} style={{width: g.screenW, height: SH, display: 'block'}} />
              {w.taps.map(([at, x, y], i) => (
                <Tap key={i} at={at} x={x} y={y} g={g} />
              ))}
              {w.chips && <Chips chips={w.chips} frames={w.frames} g={g} />}
              {(w.id === 'whome' || w.id === 'wquote') && <UrlChip g={g} />}
            </Sequence>
          ))}
        </div>
      </div>
      {wipe > 0 && wipe < 1 && (
        <div style={{position: 'absolute', top: -200, bottom: -200, left: `${wipe * 140 - 20}%`, width: 80, background: `linear-gradient(180deg, ${H.cyan}, ${H.royal})`, transform: 'skewX(-22deg)'}} />
      )}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ composition */

export const CardIn: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 9, easeOut);
  return <AbsoluteFill style={{opacity: Math.min(1, p * 1.6), transform: `scale(${mix(1.08, 1, p)})`, filter: p < 1 ? `blur(${(1 - p) * 10}px)` : undefined}}>{children}</AbsoluteFill>;
};

export const makeFlagship = (spec: FlagSpec, dir: string) => {
  const blocks: WebSpec[][] = [];
  spec.web.forEach((w) => {
    const last = blocks[blocks.length - 1];
    if (last && last[last.length - 1].from + last[last.length - 1].frames === w.from) last.push(w);
    else blocks.push([w]);
  });
  const Comp: React.FC = () => (
    <Themed theme={HYPER_THEME}>
      <AbsoluteFill style={{background: H.navy}}>
        {spec.shots.map((s, i) => {
          const nx = spec.shots[i + 1];
          const next = nx && nx.from === s.from + s.frames ? nx : undefined;
          return (
            <Sequence key={s.id} from={s.from} durationInFrames={s.frames + 8} name={s.id}>
              <ShotLayer s={s} next={next} dir={dir} id={dir} shade={spec.loop ? 0 : 0.7} />
            </Sequence>
          );
        })}

        {blocks.map((b) => {
          const start = b[0].from;
          const len = b.reduce((a, w) => a + w.frames, 0);
          return (
            <Sequence key={start} from={start} durationInFrames={len} name={`website ${start}`}>
              <WebBlock items={b} start={start} dir={dir} />
            </Sequence>
          );
        })}

        {spec.text.map((t, i) => {
          const len = t.to - t.from;
          return (
            <Sequence key={i} from={t.from} durationInFrames={len} name={`${t.type} ${t.from}`}>
              {t.type === 'headline' && (
                <Headline
                  dark={t.dark}
                  top={t.top}
                  size={t.size}
                  sizes={t.sizes ?? undefined}
                  lines={t.lines.map((l) => l.map((x) => ({t: x.t, at: x.at - t.from, hi: x.hi}) as Word))}
                  exitAt={len - 6}
                />
              )}
              {t.type === 'label' && <Label text={t.text} at={0} top={t.top} exitAt={len - 4} dark={t.dark} />}
              {t.type === 'sub' && <Sub text={t.text} at={0} top={t.top} dark={t.dark} size={t.size} exitAt={len - 6} />}
            </Sequence>
          );
        })}

        {spec.card && (
          <Sequence from={spec.card.from} name="end card">
            <CardIn>
              <EndCard headline={spec.card.headline.map(([t, at, hi]) => ({t, at, hi: !!hi}))} cta={spec.card.cta} variant={spec.card.variant} ctaSize={40} delay={4} />
            </CardIn>
          </Sequence>
        )}

        {spec.loop && (
          <Sequence from={spec.loop.at} name="loop back to frame 0">
            <LoopFade dur={spec.loop.dur} first={spec.shots[0]} dir={dir} />
          </Sequence>
        )}

        <FilmGrain opacity={0.04} />
        {spec.audio && <Audio src={staticFile(`audio/markhor-${dir}-mix.wav`)} />}
      </AbsoluteFill>
    </Themed>
  );
  return Comp;
};

/** Website hero: cross-fade into the exact first frame so the file loops seamlessly. */
const LoopFade: React.FC<{dur: number; first: ShotSpec; dir: string}> = ({dur, first, dir}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: prog(f, 0, dur, easeInOut)}}>
      <Freeze frame={0}>
        <Sequence durationInFrames={first.frames + 8}>
          <Footage src={`segments/markhor/${dir}/${first.id}.mp4`} scale={first.scale ?? 1.03} y={first.y ?? 0} drift={first.drift ?? [1, 1.04]} origin={first.origin} shadeTop={0} />
        </Sequence>
      </Freeze>
    </AbsoluteFill>
  );
};
