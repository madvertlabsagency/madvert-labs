import React from 'react';
import {AbsoluteFill, Audio, Freeze, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {FONT_BODY, M, MARKHOR_THEME} from '../brand';
import {Beat, makeShots} from '../common';
import {EndCard, Words, ws} from '../Parts';
import edl from './edl.json';

/* Markhor Patches — Reel 04 "Look closer" (9.1 s, no VO, no music).
 * Slow-motion macro montage: embroidered eagle, merrowed mountain border,
 * chenille pile, raised PVC edge. Lens push-through transitions, a loupe
 * frame, and one small ice tag per shot naming what you are looking at.
 * The ice card wipes up with the closing line above the logo.               */
const {seg, Shot} = makeShots(edl, 'r4');
const [C1, C2, C3, CARD] = edl.cuts;
const TAGS = [
  {from: 0, to: C1, t: 'FINE THREADWORK'},
  {from: C1, to: C2, t: 'CLEAN BORDERS'},
  {from: C2, to: C3, t: 'DEEP TEXTURE'},
  {from: C3, to: CARD, t: 'CRISP RAISED EDGES'},
];

export const MarkhorReel04: React.FC = () => (
  <Themed theme={MARKHOR_THEME}>
    <Reel />
  </Themed>
);

const Tag: React.FC<{t: string; dur: number}> = ({t, dur}) => {
  const f = useCurrentFrame();
  const p = prog(f, 6, 12, easeOut);
  const q = prog(f, dur - 8, 7, easeIn);
  return (
    <div style={{position: 'absolute', top: 1392, left: 86, opacity: p * (1 - q), transform: `translateX(${(1 - p) * -30}px)`}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 28px',
          borderRadius: 14,
          background: 'rgba(245,250,254,0.92)',
          boxShadow: '0 12px 30px rgba(6,18,42,0.3)',
          fontFamily: FONT_BODY,
          fontWeight: 900,
          fontSize: 36,
          letterSpacing: '0.1em',
          fontStyle: 'normal',
          transform: 'skewX(-10deg)',
          color: M.navy,
        }}
      >
        <span style={{width: 14, height: 14, borderRadius: 7, background: M.cyan}} />
        {t}
      </div>
    </div>
  );
};

/** Loupe frame: four thin corner brackets that breathe in on each cut. */
const Loupe: React.FC<{k: number}> = ({k}) => {
  const inset = mix(48, 70, k);
  const arm = 86;
  const c = (x: number, y: number, dx: number, dy: number) => <path d={`M ${x + dx * arm} ${y} L ${x} ${y} L ${x} ${y + dy * arm}`} fill="none" stroke="rgba(245,250,254,0.9)" strokeWidth={4} />;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'}}>
      {c(inset, 200 + inset, 1, 1)}
      {c(1080 - inset, 200 + inset, -1, 1)}
      {c(inset, 1640 - inset, 1, -1)}
      {c(1080 - inset, 1640 - inset, -1, -1)}
    </svg>
  );
};

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  // lens push-through: outgoing scales up and blurs over 4 frames, incoming settles from 0.92
  const out = (c: number) => (f < c ? prog(f, c - 4, 4, easeIn) : 0);
  const inn = (c: number) => (f >= c ? 1 - prog(f, c, 7, easeOut) : 0);
  const lens = Math.max(...[C1, C2, C3].map((c) => Math.max(out(c), inn(c))));
  const k = Math.max(...[0, C1, C2, C3].map((c) => (f >= c ? 1 - prog(f, c, 10, easeOut) : 0)));
  const wipe = prog(f, CARD - 6, 14, easeInOut);
  const fx = (prev: number | null, next: number | null): React.CSSProperties => ({
    transform: `scale(${(next !== null ? 1 + out(next) * 0.25 : 1) * (prev !== null ? 1 - inn(prev) * 0.08 : 1)})`,
  });

  return (
    <AbsoluteFill style={{background: M.navy}}>
      <MotionBlur id="m4-lens" x={lens * 10} y={lens * 10} />

      <Shot id="eagle">
        <Footage src={seg('eagle')} scale={1.08} drift={[1.12, 1.0]} origin={{x: 460, y: 1000}} fx={fx(null, C1)} fxFilter={out(C1) > 0.01 ? 'url(#m4-lens)' : undefined} />
      </Shot>
      <Shot id="mtn">
        <Footage src={seg('mtn')} scale={1.06} drift={[1, 1.06]} fx={fx(C1, C2)} fxFilter={lens > 0.01 ? 'url(#m4-lens)' : undefined} />
      </Shot>
      <Shot id="chen">
        <Footage src={seg('chen')} scale={1.08} drift={[1.06, 1]} fx={fx(C2, C3)} fxFilter={lens > 0.01 ? 'url(#m4-lens)' : undefined} />
      </Shot>
      <Shot id="pvc">
        <Footage src={seg('pvc')} scale={1.06} drift={[1, 1.07]} fx={fx(C3, null)} fxFilter={inn(C3) > 0.01 ? 'url(#m4-lens)' : undefined} />
      </Shot>

      {/* hold pvc's last frame under the end-card wipe */}
      <Sequence from={CARD} durationInFrames={12}>
        <Freeze frame={41}>
          <Footage src={seg('pvc')} scale={1.06} drift={[1.07, 1.07]} />
        </Freeze>
      </Sequence>

      <Loupe k={k} />
      {/* hook */}
      <Beat from={0} to={C1}>
        <div style={{position: 'absolute', top: 300, left: 60, right: 60, filter: 'drop-shadow(0 6px 22px rgba(6,18,42,0.75))'}}>
          <Words words={ws('LOOK CLOSER.', ['CLOSER.'])} at={0} size={132} color={M.white} hiColor={M.cyan} align="center" weight={900} stagger={4} exitAt={C1 - 9} />
        </div>
      </Beat>
      {TAGS.map((t) => (
        <Beat key={t.from} from={t.from} to={t.to}>
          <Tag t={t.t} dur={t.to - t.from} />
        </Beat>
      ))}

      {/* ice card wipes up */}
      <Sequence from={CARD - 6}>
        <AbsoluteFill style={{clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)`}}>
          <EndCard cta="GET YOUR FREE QUOTE" ctaSize={48} line="THE DETAILS | ARE THE BRAND." delay={6} variant="navy" />
        </AbsoluteFill>
        <div style={{position: 'absolute', left: 0, right: 0, top: `${(1 - wipe) * 100}%`, height: 6, background: `linear-gradient(90deg, ${M.pale}, ${M.cyan}, ${M.pale})`, opacity: wipe > 0 && wipe < 1 ? 1 : 0}} />
      </Sequence>

      <FilmGrain opacity={0.05} />
      <Audio src={staticFile('audio/markhor-r4-mix.wav')} />
    </AbsoluteFill>
  );
};
