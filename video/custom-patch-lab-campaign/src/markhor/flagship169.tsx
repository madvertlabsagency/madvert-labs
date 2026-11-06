/**
 * Markhor Patches — 16:9 (1920×1080) versions of the flagship cuts.
 *
 * All source footage is 9:16, so the landscape edit is a designed layout, not
 * a crop: the SAME timeline (spec, cuts, transitions, soundtrack) is staged as
 *   panel   – one vertical footage panel on the right, headline column left
 *   gallery – panels fill the width one by one on the hits (applications /
 *             patch types), each with its caption, so the frame builds up
 *   web     – the real website in the phone (right), headline left
 *   card    – logo left, headline + CTA + URL right
 * The website hero gets a full-bleed triptych that loops seamlessly.
 */
import React from 'react';
import {AbsoluteFill, Audio, Freeze, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmGrain} from '../shared/components/FilmGrain';
import {Footage} from '../shared/components/Footage';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {Themed} from '../shared/theme';
import {ShotLayer} from './commercial';
import {BrightWide, CardIn, type FlagSpec, type Geo, type ShotSpec, type WebSpec, WebBlock} from './flagship';
import {CtaPill, FONT, H, HYPER_THEME, LOGO_LIGHT, Line, URL, type Word} from './hyper';

type Group = {shots: string[]; word?: string; sub?: string};
type WideSection =
  | {mode: 'panel'; from: number; to: number}
  | {mode: 'gallery'; from: number; to: number; groups: Group[]; title?: [string, number, boolean?][][]};
export type WideSpec = FlagSpec & {wide: WideSection[]};

const W = 1920;
const TAIL = 8;
const WEB_GEO: Geo = {screenW: 420, top: 74, cx: 1440, minTop: 40, wide: true};

/* ------------------------------------------------------------------ stage pieces */

const NavyStage: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(60% 80% at ${72 + Math.sin(f / 60) * 3}% 50%, rgba(16,104,215,0.38), rgba(16,104,215,0) 70%), linear-gradient(120deg, #07182F 0%, ${H.navy} 55%, #0E2C57 100%)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -300, width: 1400, top: 990, height: 10, background: `linear-gradient(90deg, rgba(0,194,255,0), ${H.cyan}, ${H.royal}, rgba(16,104,215,0))`, transform: 'skewY(-3deg)', opacity: 0.55}} />
    </AbsoluteFill>
  );
};

/** A 9:16 footage canvas (1080×1920 coordinates) shown at `w` px wide. */
const Canvas: React.FC<{w: number; h?: number; children: React.ReactNode}> = ({w, h, children}) => {
  const s = w / 1080;
  const ph = h ?? w * (16 / 9);
  return (
    <div style={{position: 'relative', width: w, height: ph, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: (ph - 1920 * s) / 2, width: 1080, height: 1920, transform: `scale(${s})`, transformOrigin: '0 0'}}>{children}</div>
    </div>
  );
};

/** Shots of one run, back to back inside a canvas (local frames from `start`), last frame held until `hold`. */
const ShotRun: React.FC<{shots: ShotSpec[]; start: number; hold: number; dir: string}> = ({shots, start, hold, dir}) => {
  const last = shots[shots.length - 1];
  const lastEnd = last.from + last.frames - start;
  return (
    <AbsoluteFill style={{background: H.navy}}>
      {hold > lastEnd && (
        <Sequence from={lastEnd - 1} durationInFrames={hold - lastEnd + 1} name="hold">
          <Freeze frame={last.frames - 1}>
            <Sequence durationInFrames={last.frames + TAIL}>
              <Footage src={`segments/markhor/${dir}/${last.id}.mp4`} scale={last.scale ?? 1.03} y={last.y ?? 0} drift={last.drift ?? [1, 1.04]} origin={last.origin} />
            </Sequence>
          </Freeze>
        </Sequence>
      )}
      {shots.map((s, i) => {
        const nx = shots[i + 1];
        const next = nx && nx.from === s.from + s.frames ? nx : undefined;
        return (
          <Sequence key={s.id} from={s.from - start} durationInFrames={s.frames + (next ? TAIL : 1)} name={s.id}>
            <ShotLayer s={s} next={next} dir={dir} id={`w${dir}`} shade={0} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const PANEL = {w: 540, h: 960, top: 60, left: W - 130 - 540};

const PanelSection: React.FC<{shots: ShotSpec[]; start: number; len: number; dir: string}> = ({shots, start, len, dir}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 18, stiffness: 160, mass: 0.8}});
  return (
    <AbsoluteFill>
      <NavyStage />
      <div
        style={{
          position: 'absolute',
          left: PANEL.left,
          top: PANEL.top,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 40px 90px rgba(0,0,0,0.45), 0 0 0 2px rgba(0,194,255,0.22)',
          transform: `translateX(${(1 - s) * 120}px)`,
          opacity: Math.min(1, s * 1.5),
        }}
      >
        <Canvas w={PANEL.w} h={PANEL.h}>
          <ShotRun shots={shots} start={start} hold={len} dir={dir} />
        </Canvas>
      </div>
    </AbsoluteFill>
  );
};

const GallerySection: React.FC<{sec: Extract<WideSection, {mode: 'gallery'}>; byId: Record<string, ShotSpec>; dir: string}> = ({sec, byId, dir}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = sec.groups.length;
  const gap = 28;
  const hasTitle = !!sec.title;
  const hasCaps = sec.groups.some((g) => g.word);
  const maxH = hasTitle ? 600 : n > 4 ? 520 : 690;
  let pw = (W - 2 * 120 - (n - 1) * gap) / n;
  let ph = pw * (16 / 9);
  if (ph > maxH) {
    ph = maxH;
    pw = ph * (9 / 16);
  }
  const total = n * pw + (n - 1) * gap;
  const capH = hasCaps ? (n > 4 ? 120 : 150) : 0;
  const top = hasTitle ? 300 : (1080 - ph - capH) / 2;
  const capSize = n > 4 ? 34 : 56;
  const len = sec.to - sec.from;
  return (
    <AbsoluteFill>
      <NavyStage />
      {hasTitle && (
        <div style={{position: 'absolute', top: 90, left: 120, right: 120}}>
          {sec.title!.map((l, i) => (
            <Line key={i} words={l.map(([t, at, h]) => ({t, at: at - sec.from, hi: !!h}))} size={92} dark={false} exitAt={len - 6} />
          ))}
        </div>
      )}
      {sec.groups.map((g, i) => {
        const gs = g.shots.map((id) => byId[id]);
        const at = gs[0].from - sec.from;
        if (f < at) return null;
        const nextAt = i + 1 < n ? sec.groups[i + 1].shots.map((id) => byId[id])[0].from - sec.from : len;
        const s = spring({frame: f - at, fps, config: {damping: 15, stiffness: 220, mass: 0.7}});
        const active = f >= at && f < nextAt;
        const x = (W - total) / 2 + i * (pw + gap);
        return (
          <div key={i} style={{position: 'absolute', left: x, top, width: pw}}>
            <div
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: active ? '0 30px 70px rgba(0,0,0,0.5), 0 0 0 3px rgba(0,194,255,0.6)' : '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
                transform: `translateY(${(1 - s) * 90}px) scale(${mix(1.08, 1, s)})`,
                opacity: Math.min(1, s * 1.6),
                filter: active ? undefined : 'brightness(0.82)',
              }}
            >
              <Canvas w={pw} h={ph}>
                <Sequence from={at}>
                  <ShotRun shots={gs} start={gs[0].from} hold={len - at} dir={dir} />
                </Sequence>
              </Canvas>
            </div>
            {g.word && (
              <div style={{marginTop: 26, marginLeft: -gap / 2, width: pw + gap, opacity: prog(f, at + 2, 8), transform: `translateY(${(1 - prog(f, at + 2, 10, easeOut)) * 20}px)`}}>
                <Line words={[{t: g.word, at: at + 2, hi: active}]} size={capSize} dark={false} />
                {g.sub && <div style={{marginTop: 12, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: n > 4 ? 18 : 22, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.72)'}}>{g.sub}</div>}
              </div>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ left-column type */

const LeftText: React.FC<{spec: WideSpec; gallery: [number, number][]}> = ({spec, gallery}) => (
  <>
    {spec.text.map((t, i) => {
      if (gallery.some(([a, b]) => t.from >= a && t.from < b)) return null; // galleries carry their own captions
      const len = t.to - t.from;
      if (t.type === 'headline') {
        const size = Math.min(124, Math.round(t.size * 0.86));
        const blockH = t.lines.length * size * 1.12;
        return (
          <Sequence key={i} from={t.from} durationInFrames={len}>
            <div style={{position: 'absolute', left: 130, width: 1020, top: 520 - blockH / 2 - 30, display: 'flex', flexDirection: 'column', gap: size * 0.12}}>
              {t.lines.map((l, j) => (
                <Line key={j} words={l.map((x) => ({t: x.t, at: x.at - t.from, hi: x.hi}) as Word)} size={size} dark={!!t.dark} align="left" exitAt={len - 6} />
              ))}
            </div>
          </Sequence>
        );
      }
      return (
        <Sequence key={i} from={t.from} durationInFrames={len}>
          <SideNote text={t.text} dark={!!t.dark} kind={t.type} len={len} />
        </Sequence>
      );
    })}
  </>
);

const SideNote: React.FC<{text: string; dark: boolean; kind: 'label' | 'sub'; len: number}> = ({text, dark, kind, len}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 8, easeOut);
  const q = prog(f, len - 5, 5, easeIn);
  return (
    <div style={{position: 'absolute', left: 130, top: 760, opacity: p * (1 - q), transform: `translateX(${(1 - p) * -30}px)`}}>
      {kind === 'label' ? (
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <span style={{width: 40, height: 8, background: `linear-gradient(90deg, ${H.cyan}, ${H.royal})`}} />
          <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 34, letterSpacing: '0.12em', color: dark ? H.navy : H.white}}>{text}</span>
        </div>
      ) : (
        <span style={{fontFamily: FONT, fontWeight: 600, fontSize: 40, color: dark ? H.navy : H.white}}>{text}</span>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ end card */

const EndCardWide: React.FC<{headline: Word[]; cta: string; variant: 'navy' | 'cyan'}> = ({headline, cta, variant}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 2, fps, config: {damping: 16, stiffness: 150, mass: 0.8}});
  const url = prog(f, 32, 12, easeOut);
  return (
    <AbsoluteFill>
      <BrightWide />
      <Img src={staticFile(LOGO_LIGHT)} style={{position: 'absolute', left: 170, top: 180, width: 640, height: 640, transform: `scale(${mix(0.86, 1, s)})`, opacity: Math.min(1, s * 1.5)}} />
      <div style={{position: 'absolute', left: 900, width: 900, top: 330}}>
        <Line words={headline.map((x) => ({...x, at: x.at + 4}))} size={78} dark align="left" />
      </div>
      <div style={{position: 'absolute', left: 900, width: 900, top: 0, height: 1080}}>
        <CtaPill at={24} text={cta} top={560} variant={variant} size={40} justify="flex-start" />
      </div>
      <div style={{position: 'absolute', left: 904, top: 700, fontFamily: FONT, fontWeight: 600, fontSize: 36, letterSpacing: '0.06em', color: H.navy, opacity: url, transform: `translateY(${(1 - url) * 14}px)`}}>{URL}</div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ composition */

export const makeWide = (spec: WideSpec, dir: string) => {
  const byId: Record<string, ShotSpec> = Object.fromEntries(spec.shots.map((s) => [s.id, s]));
  const blocks: WebSpec[][] = [];
  spec.web.forEach((w) => {
    const last = blocks[blocks.length - 1];
    if (last && last[last.length - 1].from + last[last.length - 1].frames === w.from) last.push(w);
    else blocks.push([w]);
  });
  const gallery = spec.wide.filter((s) => s.mode === 'gallery').map((s) => [s.from, s.to] as [number, number]);
  const Comp: React.FC = () => (
    <Themed theme={HYPER_THEME}>
      <AbsoluteFill style={{background: H.navy}}>
        {spec.wide.map((sec) => {
          const len = sec.to - sec.from;
          if (sec.mode === 'panel') {
            const shots = spec.shots.filter((s) => s.from >= sec.from && s.from < sec.to);
            return (
              <Sequence key={sec.from} from={sec.from} durationInFrames={len} name={`panel ${sec.from}`}>
                <PanelSection shots={shots} start={sec.from} len={len} dir={dir} />
              </Sequence>
            );
          }
          return (
            <Sequence key={sec.from} from={sec.from} durationInFrames={len} name={`gallery ${sec.from}`}>
              <GallerySection sec={sec} byId={byId} dir={dir} />
            </Sequence>
          );
        })}
        {blocks.map((b) => {
          const start = b[0].from;
          const len = b.reduce((a, w) => a + w.frames, 0);
          return (
            <Sequence key={start} from={start} durationInFrames={len} name={`website ${start}`}>
              <WebBlock items={b} start={start} dir={dir} g={WEB_GEO} />
            </Sequence>
          );
        })}
        <LeftText spec={spec} gallery={gallery} />
        {spec.card && (
          <Sequence from={spec.card.from} name="end card">
            <CardIn>
              <EndCardWide headline={spec.card.headline.map(([t, at, hi]) => ({t, at, hi: !!hi}))} cta={spec.card.cta} variant={spec.card.variant} />
            </CardIn>
          </Sequence>
        )}
        <FilmGrain opacity={0.035} />
        {spec.audio && <Audio src={staticFile(`audio/markhor-${dir}-mix.wav`)} />}
      </AbsoluteFill>
    </Themed>
  );
  return Comp;
};

/* ------------------------------------------------------------------ website hero (16:9) */

type HeroSpec = {durationInFrames: number; shots: ShotSpec[]; slots: string[][]; switchAt: number; fade: number};

/** Full-bleed triptych: three slow-motion macros side by side, each swapping once, looping seamlessly. */
export const makeWideHero = (spec: HeroSpec, dir: string) => {
  const byId: Record<string, ShotSpec> = Object.fromEntries(spec.shots.map((s) => [s.id, s]));
  const slotW = W / 3;
  const Clip: React.FC<{s: ShotSpec; frozen?: boolean}> = ({s, frozen}) => {
    const body = (
      <Sequence durationInFrames={s.frames + TAIL}>
        <Footage src={`segments/markhor/${dir}/${s.id}.mp4`} scale={s.scale ?? 1.03} drift={s.drift ?? [1, 1.04]} origin={s.origin} />
      </Sequence>
    );
    return <Canvas w={slotW} h={1080}>{frozen ? <Freeze frame={0}>{body}</Freeze> : body}</Canvas>;
  };
  const Fade: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
    const f = useCurrentFrame();
    return <AbsoluteFill style={{opacity: prog(f, 0, dur, easeInOut)}}>{children}</AbsoluteFill>;
  };
  const Comp: React.FC = () => (
    <Themed theme={{...HYPER_THEME, vignette: 'none'}}>
      <AbsoluteFill style={{background: H.navy}}>
        {spec.slots.map(([a, b], i) => (
          <div key={i} style={{position: 'absolute', left: i * slotW, top: 0, width: slotW, height: 1080, overflow: 'hidden'}}>
            <Sequence durationInFrames={spec.switchAt}>
              <Clip s={byId[a]} />
            </Sequence>
            <Sequence from={spec.switchAt - spec.fade}>
              <Fade dur={spec.fade}>
                <Sequence from={0}>
                  <Clip s={byId[b]} />
                </Sequence>
              </Fade>
            </Sequence>
            <Sequence from={spec.durationInFrames - spec.fade}>
              <Fade dur={spec.fade}>
                <Clip s={byId[a]} frozen />
              </Fade>
            </Sequence>
          </div>
        ))}
        {[1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: i * slotW - 3, top: 0, width: 6, height: 1080, background: H.navy}} />
        ))}
        <FilmGrain opacity={0.03} />
      </AbsoluteFill>
    </Themed>
  );
  return Comp;
};
