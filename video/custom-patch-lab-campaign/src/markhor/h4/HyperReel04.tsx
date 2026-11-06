import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {BrightField, EndCard, H, HYPER_THEME, Headline, Sub, hi, punchAt, shotsOf, w} from '../hyper';
import edl from './edl.json';

/* Markhor Patches — Hyper-cut 04 "THE PATCH DROP" (11 s, no VO / music).
 * 0.0 s  four 8-frame material flashes under NOT / JUST / A / PATCH. (one word per hit)
 * 1.1 s  macros on beats: eagle thread, mountain border, chenille pile, PVC, weave
 * 3.6 s  the chenille M on a varsity jacket (slow-mo)
 * 5.0 s  branded strip wipe → collection reveal: four patches slam into a grid on
 *        8-frame hits (tiles are real frames from m5 / m6, cropped, not redrawn)
 * 8.0 s  CTA card                                                             */
const {seg} = shotsOf(edl, 'h4');
const COLL = edl.collection;
const CARD = 240;
const CUTS = edl.cuts.slice(0, -1);
const FRAMING: Record<string, {scale?: number; drift?: [number, number]; origin?: {x: number; y: number}}> = {
  f: {scale: 1.02, drift: [1.1, 1.0], origin: {x: 540, y: 1100}},
};
const TILES = [
  {src: 'markhor2/tiles/emb.jpg', at: 0},
  {src: 'markhor2/tiles/pvc.jpg', at: 8},
  {src: 'markhor2/tiles/chenille.jpg', at: 16},
  {src: 'markhor2/tiles/mountain.jpg', at: 24},
];

export const HyperReel04: React.FC = () => (
  <Themed theme={HYPER_THEME}>
    <Reel />
  </Themed>
);

const Tile: React.FC<{src: string; at: number; x: number; y: number; size: number; exitAt: number}> = ({src, at, x, y, size, exitAt}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 240, mass: 0.7}});
  const q = prog(f, exitAt, 8, easeIn);
  const float = Math.sin((f - at) / 18 + x) * 4;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + float - q * 900,
        width: size,
        height: size,
        borderRadius: 30,
        overflow: 'hidden',
        boxShadow: '0 26px 60px rgba(11,35,69,0.22), 0 0 0 1px rgba(16,104,215,0.12)',
        transform: `scale(${mix(1.35, 1, s)})`,
        opacity: Math.min(1, s * 2),
      }}
    >
      <Img src={staticFile(src)} style={{width: size, height: size, display: 'block'}} />
    </div>
  );
};

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const punch = Math.max(0, ...CUTS.map((c) => punchAt(f, c, 6)));
  const wipe = prog(f, COLL - 4, 9, easeInOut); // diagonal cyan→royal strip reveals the white stage
  const cardIn = prog(f, CARD - 6, 8, easeInOut);
  const size = 440;
  const gx = [540 - size - 18, 540 + 18];
  const gy = [560, 560 + size + 36];
  return (
    <AbsoluteFill style={{background: H.navy}}>
      <MotionBlur id="h4-p" x={punch * 5} y={punch * 5} />

      {edl.shots.map((s) => {
        const inPunch = f >= s.from && f < s.from + 6 && punch > 0.02;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.frames + (s.id === 'f' ? 10 : 0)} name={s.id}>
            <Footage
              src={seg(s.id)}
              scale={FRAMING[s.id]?.scale ?? 1.05}
              drift={FRAMING[s.id]?.drift ?? [1, 1.05]}
              origin={FRAMING[s.id]?.origin}
              shadeTop={0.7}
              fx={{transform: `scale(${1 + (inPunch ? punch : 0) * 0.08})`}}
              fxFilter={inPunch ? 'url(#h4-p)' : undefined}
            />
          </Sequence>
        );
      })}

      {/* hook: one word per hit */}
      <Sequence from={0} durationInFrames={44}>
        <Headline lines={[[w('NOT', 0), w('JUST', 8)], [w('A', 16), hi('PATCH.', 24)]]} size={138} top={260} exitAt={38} />
      </Sequence>
      <Sequence from={107} durationInFrames={43}>
        <Headline lines={[[w("IT'S", 4), w('A', 8)], [hi('STATEMENT.', 14)]]} size={110} top={240} exitAt={36} />
      </Sequence>

      {/* collection reveal */}
      <Sequence from={COLL - 4} durationInFrames={CARD - COLL + 14}>
        <AbsoluteFill style={{clipPath: `polygon(0 0, ${wipe * 140}% 0, ${wipe * 140 - 40}% 100%, 0 100%)`}}>
          <BrightField />
          <Sequence from={4}>
            {TILES.map((t, i) => (
              <Tile key={t.src} src={t.src} at={t.at} x={gx[i % 2]} y={gy[Math.floor(i / 2)]} size={size} exitAt={CARD - COLL - 6} />
            ))}
            <Headline dark lines={[[w('THE', 34), w('PATCH', 37), hi('DROP.', 42)]]} size={104} top={330} exitAt={CARD - COLL - 8} />
            <Sub dark text="Embroidered, PVC, chenille and more." at={50} top={1560} size={38} exitAt={CARD - COLL - 8} />
          </Sequence>
        </AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            top: -200,
            bottom: -200,
            left: `${wipe * 140 - 20}%`,
            width: 90,
            background: `linear-gradient(180deg, ${H.cyan}, ${H.royal})`,
            transform: 'skewX(-22deg)',
            opacity: wipe > 0 && wipe < 1 ? 1 : 0,
          }}
        />
      </Sequence>

      <Sequence from={CARD - 6}>
        <AbsoluteFill style={{opacity: cardIn, transform: `translateY(${(1 - cardIn) * 60}px)`}}>
          <EndCard headline={[w('NOT', 0), w('JUST', 3), w('A', 6), hi('PATCH.', 9)]} cta="BRING YOUR DESIGN TO LIFE" variant="navy" ctaSize={40} delay={6} />
        </AbsoluteFill>
      </Sequence>

      <Audio src={staticFile('audio/markhor-h4-mix.wav')} />
    </AbsoluteFill>
  );
};
