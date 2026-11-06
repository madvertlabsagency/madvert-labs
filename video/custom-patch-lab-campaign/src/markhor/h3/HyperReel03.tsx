import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {EndCard, H, HYPER_THEME, Headline, Sub, hi, punchAt, shotsOf, w} from '../hyper';
import edl from './edl.json';

/* Markhor Patches — Hyper-cut 03 "PRECISION HITS DIFFERENT" (12 s, no VO / music).
 * Industrial ASMR: needles on every beat (m1, m8, m3), a wide-machine scale
 * contrast, a 0.25 s run of six machine cuts, then the m6 needle on the
 * mountain matched to the same mountain finished. Text only at the hook, the
 * title moment and the hero — the machines carry the rest.                    */
const {shot, seg} = shotsOf(edl, 'h3');
const CARD = edl.cuts[edl.cuts.length - 1];
const CUTS = edl.cuts.slice(0, -1);
const FRAMING: Record<string, {scale?: number; y?: number; drift?: [number, number]; origin?: {x: number; y: number}}> = {
  a: {scale: 1.25, drift: [1, 1.05], origin: {x: 540, y: 900}},
  d: {scale: 1.3, drift: [1, 1.04], origin: {x: 540, y: 860}},
  c: {drift: [1.08, 1]},
  e: {drift: [1, 1.06]},
  i: {scale: 1.12, drift: [1, 1.1], origin: {x: 540, y: 1250}},
  hero: {scale: 1.05, drift: [1.14, 1.02], origin: {x: 530, y: 1050}},
};

export const HyperReel03: React.FC = () => (
  <Themed theme={HYPER_THEME}>
    <Reel />
  </Themed>
);

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const punch = Math.max(0, ...CUTS.map((c) => punchAt(f, c, 6)));
  const whip = f < 30 ? prog(f, 27, 3, easeIn) : 1 - prog(f, 30, 5, easeOut); // b → c lateral whip
  const card = prog(f, CARD - 6, 10, easeInOut);
  return (
    <AbsoluteFill style={{background: H.navy}}>
      <MotionBlur id="h3-p" x={punch * 5} y={punch * 5} />
      <MotionBlur id="h3-w" x={whip * 34} y={0} />

      {edl.shots.map((s) => {
        const inPunch = f >= s.from && f < s.from + 6 && punch > 0.02;
        const whipping = (s.id === 'b' || s.id === 'c') && whip > 0.02;
        const dx = s.id === 'b' ? -whip * 80 : s.id === 'c' ? whip * 80 : 0;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.frames + (s.id === 'hero' ? 10 : 0)} name={s.id}>
            <Footage
              src={seg(s.id)}
              scale={FRAMING[s.id]?.scale ?? 1.04}
              drift={FRAMING[s.id]?.drift ?? [1, 1.04]}
              origin={FRAMING[s.id]?.origin}
              shadeTop={['a', 'b', 'i', 'hero'].includes(s.id) ? 0.8 : 0}
              fx={{transform: `translateX(${dx}px) scale(${1 + (inPunch ? punch : 0) * 0.08})`}}
              fxFilter={whipping ? 'url(#h3-w)' : inPunch ? 'url(#h3-p)' : undefined}
            />
          </Sequence>
        );
      })}

      <Sequence from={0} durationInFrames={30}>
        <Headline lines={[[w('WATCH', 0), hi('THIS.', 15)]]} size={150} top={270} exitAt={26} />
      </Sequence>
      <Sequence from={shot('i').from} durationInFrames={shot('i').frames}>
        <Headline lines={[[w('PRECISION', 0)], [hi('HITS', 8), hi('DIFFERENT.', 12)]]} size={104} top={250} exitAt={36} />
      </Sequence>
      <Sequence from={shot('hero').from} durationInFrames={shot('hero').frames}>
        <Sub text="Same design. Hoop to finished patch." at={10} top={1440} size={46} exitAt={52} />
      </Sequence>

      <Sequence from={CARD - 6}>
        <AbsoluteFill style={{clipPath: `inset(0 ${(1 - card) * 100}% 0 0)`}}>
          <EndCard headline={[w('BUILT', 0), w('STITCH', 3), w('BY', 6), hi('STITCH.', 9)]} cta="GET YOUR CUSTOM QUOTE" variant="navy" ctaSize={44} delay={6} />
        </AbsoluteFill>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: `${card * 100}%`, width: 14, marginLeft: -7, background: `linear-gradient(180deg, ${H.cyan}, ${H.royal})`, opacity: card > 0 && card < 1 ? 1 : 0}} />
      </Sequence>

      <FilmGrain opacity={0.04} />
      <Audio src={staticFile('audio/markhor-h3-mix.wav')} />
    </AbsoluteFill>
  );
};
