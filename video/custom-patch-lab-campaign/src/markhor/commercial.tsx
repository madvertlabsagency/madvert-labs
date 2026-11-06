/**
 * Markhor Patches — commercial engine. Every one of the 10 campaign reels is a
 * spec (src/markhor/cNN/edl.json): shots with framing + the transition INTO
 * each shot, beat-timed text events, an optional tile-grid reveal and the end
 * card. Typography / colours / CTA / logo come from the shared design system
 * in ./hyper.tsx, so the whole campaign stays consistent while each reel keeps
 * its own pacing and transition grammar.
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmGrain} from '../shared/components/FilmGrain';
import {Footage} from '../shared/components/Footage';
import {MotionBlur} from '../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, mix, prog} from '../shared/motion';
import {Themed} from '../shared/theme';
import {BrightField, EndCard, H, HYPER_STUDIO_THEME, HYPER_THEME, Headline, Label, Sub, type Word} from './hyper';

export type Trans = 'cut' | 'punch' | 'impact' | 'zoom' | 'whip' | 'dissolve' | 'slide';
type ShotSpec = {id: string; from: number; frames: number; trans: Trans; scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}};
type W = {t: string; at: number; hi?: boolean};
type TextSpec =
  | {type: 'headline'; from: number; to: number; top: number; size: number; sizes?: number[] | null; dark?: boolean; lines: W[][]}
  | {type: 'label'; from: number; to: number; text: string; dark?: boolean}
  | {type: 'sub'; from: number; to: number; text: string; top: number; dark?: boolean; size?: number};
export type Spec = {
  durationInFrames: number;
  studio: boolean;
  shots: ShotSpec[];
  text: TextSpec[];
  card: {from: number; len?: number; headline: [string, number, boolean?][]; cta: string; variant: 'navy' | 'cyan'; enter: 'slideUp' | 'wipe' | 'iris' | 'fade' | 'slide'};
  tiles?: {from: number; len: number; items: string[]};
};

const TAIL = 8; // every shot keeps rendering a few frames past its cut (under the next one) for transitions
const IN = {punch: 6, impact: 8, zoom: 7, whip: 5, dissolve: 8, slide: 6, cut: 0} as const;

const ShotLayer: React.FC<{s: ShotSpec; next?: ShotSpec; dir: string; id: string; shade: number}> = ({s, next, dir, id, shade}) => {
  const f = useCurrentFrame(); // local to the shot
  const pin = s.trans === 'cut' ? 1 : prog(f, 0, IN[s.trans], s.trans === 'dissolve' ? easeInOut : easeOut);
  const end = s.frames;
  // outgoing effect is decided by how the NEXT shot enters
  const nt = next?.trans;
  const outWhip = nt === 'whip' ? prog(f, end - 3, 3, easeIn) : 0;
  const outZoom = nt === 'zoom' ? prog(f, end - 4, 4, easeIn) : 0;
  const outSlide = nt === 'slide' ? prog(f, end, IN.slide, easeInOut) : 0;
  let tx = -outWhip * 90 - outSlide * 1080;
  let sc = 1 + outZoom * 0.22;
  let op = 1;
  let blur = outWhip * 30 + outZoom * 10 + (outSlide > 0 && outSlide < 1 ? 24 : 0);
  if (s.trans === 'punch') { sc *= 1 + (1 - pin) * 0.07; blur += (1 - pin) * 5; }
  if (s.trans === 'impact') { sc *= 1 + (1 - pin) * 0.14; blur += (1 - pin) * 8; }
  if (s.trans === 'zoom') { sc *= mix(0.9, 1, pin); blur += (1 - pin) * 10; }
  if (s.trans === 'whip') { tx += (1 - pin) * 90; blur += (1 - pin) * 30; }
  if (s.trans === 'slide') { tx += (1 - pin) * 1080; blur += pin < 1 ? 24 : 0; }
  if (s.trans === 'dissolve') op = pin;
  if (f >= end + TAIL - 1) op = 0;
  const fid = `${id}-${s.id}`;
  const horizontal = s.trans === 'whip' || s.trans === 'slide' || nt === 'whip' || nt === 'slide';
  return (
    <AbsoluteFill style={{opacity: op}}>
      {blur > 0.3 && <MotionBlur id={fid} x={horizontal ? blur : blur * 0.5} y={horizontal ? 0 : blur * 0.5} />}
      <Footage
        src={`segments/markhor/${dir}/${s.id}.mp4`}
        scale={s.scale ?? 1.03}
        y={s.y ?? 0}
        drift={s.drift ?? [1, 1.04]}
        origin={s.origin}
        shadeTop={shade}
        fx={{transform: `translateX(${tx}px) scale(${sc})`}}
        fxFilter={blur > 0.3 ? `url(#${fid})` : undefined}
      />
    </AbsoluteFill>
  );
};

/** Tile-grid reveal (3 × 2) on a bright stage; tiles slam in on 8-frame hits. Tiles are real footage frames. */
const Tiles: React.FC<{items: string[]; len: number}> = ({items, len}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const size = 300;
  const gap = 26;
  const x0 = 540 - size - gap / 2 - size / 2 - gap / 2;
  return (
    <AbsoluteFill>
      <BrightField />
      {items.map((it, i) => {
        const at = 2 + i * 6;
        if (f < at) return null;
        const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 260, mass: 0.6}});
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <div
            key={it}
            style={{
              position: 'absolute',
              left: x0 + col * (size + gap),
              top: 640 + row * (size + gap) + Math.sin((f + i * 9) / 16) * 3,
              width: size,
              height: size,
              borderRadius: 26,
              overflow: 'hidden',
              boxShadow: '0 22px 50px rgba(11,35,69,0.22), 0 0 0 1px rgba(16,104,215,0.12)',
              transform: `scale(${mix(1.4, 1, s)})`,
              opacity: Math.min(1, s * 2),
            }}
          >
            <Img src={staticFile(`markhor2/tiles/${it}.jpg`)} style={{width: size, height: size, display: 'block'}} />
          </div>
        );
      })}
      <Headline dark lines={[[{t: 'THE', at: 38}, {t: 'FULL', at: 41}], [{t: 'LINEUP.', at: 45, hi: true}]]} size={110} top={300} exitAt={len - 4} />
    </AbsoluteFill>
  );
};

const EnterCard: React.FC<{spec: Spec['card']; children: React.ReactNode}> = ({spec, children}) => {
  const f = useCurrentFrame(); // local: 0 = 6 frames before the card's `from`
  const p = prog(f, 0, 10, easeInOut);
  const style: React.CSSProperties = {};
  if (spec.enter === 'slideUp') style.transform = `translateY(${(1 - p) * 1920}px)`;
  if (spec.enter === 'slide') style.transform = `translateX(${(1 - p) * 1080}px)`;
  if (spec.enter === 'fade') style.opacity = p;
  if (spec.enter === 'wipe') style.clipPath = `polygon(0 0, ${p * 140}% 0, ${p * 140 - 40}% 100%, 0 100%)`;
  if (spec.enter === 'iris') style.clipPath = `circle(${p * 1250}px at 540px 960px)`;
  return (
    <>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {spec.enter === 'wipe' && p > 0 && p < 1 && (
        <div style={{position: 'absolute', top: -200, bottom: -200, left: `${p * 140 - 20}%`, width: 80, background: `linear-gradient(180deg, ${H.cyan}, ${H.royal})`, transform: 'skewX(-22deg)'}} />
      )}
    </>
  );
};

export const makeCommercial = (spec: Spec, dir: string) => {
  const Comp: React.FC = () => (
    <Themed theme={spec.studio ? HYPER_STUDIO_THEME : HYPER_THEME}>
      <AbsoluteFill style={{background: spec.studio ? H.white : H.navy}}>
        {spec.shots.map((s, i) => (
          <Sequence key={s.id} from={s.from} durationInFrames={s.frames + TAIL} name={s.id}>
            <ShotLayer s={s} next={spec.shots[i + 1]} dir={dir} id={dir} shade={spec.studio ? 0 : 0.7} />
          </Sequence>
        ))}

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
                  exitAt={len - 7}
                />
              )}
              {t.type === 'label' && <Label text={t.text} at={0} exitAt={len - 4} dark={t.dark} />}
              {t.type === 'sub' && <Sub text={t.text} at={0} top={t.top} dark={t.dark} size={t.size} exitAt={len - 6} />}
            </Sequence>
          );
        })}

        {spec.tiles && (
          <Sequence from={spec.tiles.from} durationInFrames={spec.tiles.len + 8} name="tiles">
            <Tiles items={spec.tiles.items} len={spec.tiles.len} />
          </Sequence>
        )}

        <Sequence from={spec.card.from - 6} name="end card">
          <EnterCard spec={spec.card}>
            <EndCard
              headline={spec.card.headline.map(([t, at, hi]) => ({t, at, hi: !!hi}))}
              cta={spec.card.cta}
              variant={spec.card.variant}
              ctaSize={spec.card.cta.length > 22 ? 40 : 44}
              delay={8}
            />
          </EnterCard>
        </Sequence>

        <FilmGrain opacity={spec.studio ? 0.03 : 0.045} />
        <Audio src={staticFile(`audio/markhor-${dir}-mix.wav`)} />
      </AbsoluteFill>
    </Themed>
  );
  return Comp;
};
