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

type ShotSpec = {id: string; from: number; frames: number; trans: Trans; scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}};
type WebSpec = {id: string; from: number; frames: number; taps: [number, number, number][]; focus: [number, number]; chips?: string[] | null};
type W = {t: string; at: number; hi?: boolean};
type TextSpec =
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
const SCREEN_W = 520;
const SCREEN_H = Math.round((SCREEN_W * 1464) / 720);
const PHONE_TOP = 455;
const BEZEL = 14;
const toScreen = (x: number, y: number) => ({x: (x * SCREEN_W) / SRC_W, y: ((y - CROP_TOP) * SCREEN_W) / SRC_W});

const Tap: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
  const f = useCurrentFrame();
  if (f < at - 8 || f > at + 22) return null;
  const pre = prog(f, at - 8, 8, easeOut);
  const ring = prog(f, at, 18, easeOut);
  const p = toScreen(x, y);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: p.x - 22,
          top: p.y - 22,
          width: 44,
          height: 44,
          borderRadius: 22,
          background: 'rgba(255,255,255,0.85)',
          border: `4px solid ${H.cyan}`,
          boxShadow: '0 6px 18px rgba(11,35,69,0.35)',
          opacity: pre * (1 - prog(f, at + 8, 10)),
          transform: `scale(${f < at ? mix(1.3, 1, pre) : mix(1, 0.86, prog(f, at, 4))})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: p.x - 80 * ring,
          top: p.y - 80 * ring,
          width: 160 * ring,
          height: 160 * ring,
          borderRadius: '50%',
          border: `5px solid ${H.cyan}`,
          opacity: f >= at ? 1 - ring : 0,
        }}
      />
    </>
  );
};

const Chips: React.FC<{chips: string[]; frames: number}> = ({chips, frames}) => {
  const f = useCurrentFrame();
  const step = frames / chips.length;
  const inP = prog(f, 0, 8, easeOut);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: SCREEN_H - 250, display: 'flex', justifyContent: 'center', opacity: inP * (1 - prog(f, frames - 4, 4))}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, padding: '14px 16px', borderRadius: 22, background: 'rgba(11,35,69,0.92)', boxShadow: '0 16px 40px rgba(11,35,69,0.35)', maxWidth: SCREEN_W - 40}}>
        {chips.map((c, i) => {
          const on = f >= i * step;
          return (
            <span
              key={c}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: '0.08em',
                padding: '8px 12px',
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

const UrlChip: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 6, fps, config: {damping: 14, stiffness: 200, mass: 0.7}});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: SCREEN_H - 170, display: 'flex', justifyContent: 'center', opacity: f < 6 ? 0 : Math.min(1, s * 1.5), transform: `translateY(${(1 - s) * 30}px) scale(${mix(0.9, 1, s)})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '18px 30px', borderRadius: 999, background: H.navy, boxShadow: '0 18px 44px rgba(11,35,69,0.4)'}}>
        <svg width={30} height={30} viewBox="0 0 24 24">
          <circle cx={12} cy={12} r={10} fill="none" stroke={H.cyan} strokeWidth={2.4} />
          <path d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" fill="none" stroke={H.cyan} strokeWidth={2} />
        </svg>
        <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 32, letterSpacing: '0.02em', color: H.white}}>markhorpatches.com</span>
      </div>
    </div>
  );
};

/** One contiguous run of website segments: bright stage, phone, camera moves. Local frames. */
const WebBlock: React.FC<{items: WebSpec[]; start: number; dir: string}> = ({items, start, dir}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
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
      const k = prog(f, local, 16, easeInOut);
      fy = mix(prev[0], w.focus[0], k);
      sc = mix(prev[1], w.focus[1], k);
    }
  });
  const out = prog(f, len - 5, 5, easeIn);
  return (
    <AbsoluteFill style={{clipPath: `polygon(0 0, ${wipe * 140}% 0, ${wipe * 140 - 40}% 100%, 0 100%)`}}>
      <BrightField />
      <div
        style={{
          position: 'absolute',
          left: 540 - SCREEN_W / 2 - BEZEL,
          top: PHONE_TOP,
          width: SCREEN_W + BEZEL * 2,
          height: SCREEN_H + BEZEL * 2,
          transformOrigin: `50% ${fy * 100}%`,
          // keep the phone's top edge below the headline band while the camera pushes in
          transform: `translateY(${(1 - rise) * 260 + Math.max(0, 400 - (PHONE_TOP - fy * (SCREEN_H + BEZEL * 2) * (sc - 1)))}px) scale(${sc * (1 + out * 0.08)})`,
          opacity: Math.min(1, rise * 1.4),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 70,
            background: 'linear-gradient(160deg, #1B2A44, #070D19)',
            boxShadow: '0 40px 90px rgba(11,35,69,0.38), 0 0 0 2px rgba(0,194,255,0.25), inset 0 2px 0 rgba(255,255,255,0.18)',
          }}
        />
        <div style={{position: 'absolute', left: BEZEL, top: BEZEL, width: SCREEN_W, height: SCREEN_H, borderRadius: 56, overflow: 'hidden', background: H.white}}>
          {items.map((w) => (
            <Sequence key={w.id} from={w.from - start} durationInFrames={w.frames} name={w.id}>
              <OffthreadVideo muted src={staticFile(`segments/markhor/${dir}/${w.id}.mp4`)} style={{width: SCREEN_W, height: SCREEN_H, display: 'block'}} />
              {w.taps.map(([at, x, y], i) => (
                <Tap key={i} at={at} x={x} y={y} />
              ))}
              {w.chips && <Chips chips={w.chips} frames={w.frames} />}
              {(w.id === 'whome' || w.id === 'wquote') && <UrlChip />}
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

const CardIn: React.FC<{children: React.ReactNode}> = ({children}) => {
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
