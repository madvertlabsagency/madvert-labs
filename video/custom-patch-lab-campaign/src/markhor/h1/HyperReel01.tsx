import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeInOut, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {EndCard, H, HYPER_STUDIO_THEME, Headline, Label, Sub, hi, punchAt, shotsOf, w} from '../hyper';
import edl from './edl.json';

/* Markhor Patches — Hyper-cut 01 "PATCH SWITCH" (12 s, 120 BPM, no VO / music).
 *   0.0 s  ONE DESIGN. / FIVE PERSONALITIES.   embroidered mountain (m5)
 *   1.0 s  EMBROIDERED  macro → product          (m10, m2)
 *   2.0 s  PVC          macro → product          (m10, m5)
 *   3.0 s  CHENILLE     macro → product          (m10, m5)
 *   4.0 s  WOVEN · 5.0 s LEATHER                 half-bar macros (m10)
 *   6.0 s  0.25 s stutter recap of six textures
 *   7.6 s  hero: back on the mountain · 9.0 s CTA card slides up
 * Every hit is a hard cut with a short punch-in.                             */
const {shot, seg} = shotsOf(edl, 'h1');
const CARD = edl.cuts[edl.cuts.length - 1];
const CUTS = edl.cuts.slice(0, -1);
const FRAMING: Record<string, {scale?: number; y?: number; drift?: [number, number]}> = {
  wov: {drift: [1.0, 1.12]},
  lea: {drift: [1.12, 1.0]},
  hero: {drift: [1.0, 1.08]},
};
const LABELS = [
  {from: 30, to: 60, t: 'EMBROIDERED'},
  {from: 60, to: 90, t: 'PVC'},
  {from: 90, to: 120, t: 'CHENILLE'},
  {from: 120, to: 150, t: 'WOVEN'},
  {from: 150, to: 180, t: 'LEATHER'},
];

export const HyperReel01: React.FC = () => (
  <Themed theme={HYPER_STUDIO_THEME}>
    <Reel />
  </Themed>
);

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const punch = Math.max(0, ...CUTS.map((c) => punchAt(f, c, 6)));
  const up = prog(f, CARD - 5, 7, easeInOut);
  return (
    <AbsoluteFill style={{background: H.white}}>
      <MotionBlur id="h1-p" x={punch * 4} y={punch * 4} />
      <MotionBlur id="h1-up" x={0} y={up > 0 && up < 1 ? 30 : 0} />

      {edl.shots.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.frames + (s.id === 'hero' ? 7 : 0)} name={s.id}>
          <Footage
            src={seg(s.id)}
            scale={FRAMING[s.id]?.scale ?? 1.03}
            drift={FRAMING[s.id]?.drift ?? [1.0, 1.04]}
            fx={{transform: `scale(${1 + (f >= s.from && f < s.from + 6 ? punch : 0) * 0.07})`}}
            fxFilter={f >= s.from && f < s.from + 6 && punch > 0.02 ? 'url(#h1-p)' : undefined}
          />
        </Sequence>
      ))}

      {/* hook — one word-group per hit */}
      <Sequence from={0} durationInFrames={30}>
        <Headline dark lines={[[w('ONE', 0), hi('DESIGN.', 3)], [hi('FIVE', 15), w('PERSONALITIES.', 18)]]} size={86} sizes={[110, 86]} exitAt={26} />
      </Sequence>
      {LABELS.map((l) => (
        <Sequence key={l.t} from={l.from} durationInFrames={l.to - l.from}>
          <Label text={l.t} at={0} exitAt={l.to - l.from - 3} />
        </Sequence>
      ))}
      <Sequence from={shot('hero').from} durationInFrames={shot('hero').frames}>
        <Headline dark lines={[[w('PICK', 2), w('YOUR', 6)], [hi('PERSONALITY.', 12)]]} size={92} />
        <Sub dark text="Embroidered, PVC, chenille, woven or leather." at={18} top={1452} size={38} />
      </Sequence>

      {/* the CTA card slides up over the hero */}
      <Sequence from={CARD - 5}>
        <AbsoluteFill style={{transform: `translateY(${(1 - up) * 1920}px)`, filter: up > 0 && up < 1 ? 'url(#h1-up)' : undefined}}>
          <EndCard headline={[w('MADE', 0), w('YOUR', 3), hi('WAY.', 6)]} cta="EXPLORE CUSTOM PATCHES" variant="cyan" ctaSize={42} delay={6} />
        </AbsoluteFill>
      </Sequence>

      <Audio src={staticFile('audio/markhor-h1-mix.wav')} />
    </AbsoluteFill>
  );
};
