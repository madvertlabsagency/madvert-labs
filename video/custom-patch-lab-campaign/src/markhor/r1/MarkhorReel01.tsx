import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {M, MARKHOR_THEME} from '../brand';
import {Beat, makeShots} from '../common';
import {EndCard, IceRule, Words, ws} from '../Parts';
import edl from './edl.json';

/* Markhor Patches — Reel 01 "It starts as thread" (11 s, no VO, no music).
 * Satisfying machine ASMR from one clip (m1): thread macro → needle punch-in →
 * the patch filling in → slow push on the nearly finished mountain. Navy type
 * on frosted ice plates, top-left, over the machine heads (patch stays clear).
 * Ends washing into the ice-white CTA card.                                   */
const {seg, Shot} = makeShots(edl, 'r1');
const [C1, C2, C3, CARD] = edl.cuts;

export const MarkhorReel01: React.FC = () => (
  <Themed theme={MARKHOR_THEME}>
    <Reel />
  </Themed>
);

/** Frosted ice plate holding a two-line statement; slides open from the left. */
const Plate: React.FC<{a: string; b: string; hi: string[]; exitAt: number; index: string}> = ({a, b, hi, exitAt, index}) => {
  const f = useCurrentFrame();
  const open = prog(f, 0, 12, easeOut);
  const q = prog(f, exitAt, 8, easeIn);
  return (
    <div
      style={{
        position: 'absolute',
        top: 232,
        left: 64,
        padding: '26px 40px 26px 34px',
        borderRadius: 26,
        background: 'rgba(245,250,254,0.9)',
        boxShadow: '0 18px 44px rgba(6,18,42,0.28)',
        borderLeft: `8px solid ${M.cyan}`,
        clipPath: `inset(0 ${(1 - open) * 100}% 0 0 round 26px)`,
        opacity: 1 - q,
        transform: `translateX(${-q * 60}px)`,
      }}
    >
      <div style={{fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800, fontSize: 26, letterSpacing: '0.3em', color: M.cyanDeep, marginBottom: 10, opacity: prog(f, 6, 10)}}>{index}</div>
      <Words words={ws(a, hi)} at={5} size={70} stagger={3} />
      <Words words={ws(b, hi)} at={10} size={70} stagger={3} />
      <div style={{marginTop: 14}}>
        <IceRule at={16} width={200} />
      </div>
    </div>
  );
};

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const punch = (c: number) => (f >= c ? 1 - prog(f, c, 8, easeOut) : 0);
  const whip = (c: number) => (f < c ? prog(f, c - 3, 3, easeIn) : 1 - prog(f, c, 5, easeOut));
  const p1 = punch(C1);
  const w2 = whip(C2);
  const p3 = punch(C3);
  const wash = prog(f, CARD - 10, 12, easeInOut); // footage pushes into ice-white

  return (
    <AbsoluteFill style={{background: M.navy}}>
      <MotionBlur id="m1-w" x={w2 * 36} y={0} />
      <MotionBlur id="m1-p" x={(p1 + p3) * 5} y={(p1 + p3) * 5} />

      <Shot id="a">
        <Footage src={seg('a')} scale={1.04} drift={[1, 1.08]} origin={{x: 560, y: 900}} />
      </Shot>
      <Shot id="b">
        {/* punch-in on the needle as it drives through the sky fill */}
        <Footage
          src={seg('b')}
          scale={1.34}
          y={40}
          drift={[1, 1.04]}
          origin={{x: 540, y: 860}}
          fx={{transform: `scale(${1 + p1 * 0.07}) translateX(${f >= C2 - 3 ? -w2 * 70 : 0}px)`}}
          fxFilter={p1 > 0.01 ? 'url(#m1-p)' : w2 > 0.01 ? 'url(#m1-w)' : undefined}
        />
      </Shot>
      <Shot id="c">
        <Footage src={seg('c')} scale={1.04} y={-40} drift={[1.04, 1]} fx={{transform: `translateX(${w2 * 70}px)`}} fxFilter={w2 > 0.01 ? 'url(#m1-w)' : undefined} />
      </Shot>
      <Shot id="d">
        <Footage
          src={seg('d')}
          scale={1.02}
          y={-40}
          drift={[1, 1.14]}
          origin={{x: 540, y: 1120}}
          fx={{transform: `scale(${(1 + p3 * 0.07) * mix(1, 1.18, wash)})`}}
          fxFilter={p3 > 0.01 ? 'url(#m1-p)' : undefined}
        />
      </Shot>

      <Beat from={0} to={C1}>
        <Plate index="01" a="IT STARTS" b="AS THREAD." hi={['THREAD.']} exitAt={C1 - 8} />
      </Beat>
      <Beat from={C1} to={C2}>
        <Plate index="02" a="STITCH" b="BY STITCH." hi={['STITCH.']} exitAt={C2 - C1 - 8} />
      </Beat>
      <Beat from={C2} to={C3}>
        <Plate index="03" a="LAYER" b="BY LAYER." hi={['LAYER.']} exitAt={C3 - C2 - 8} />
      </Beat>
      <Beat from={C3} to={CARD}>
        <Plate index="04" a="INTO SOMETHING" b="WORTH WEARING." hi={['WEARING.']} exitAt={CARD - C3 - 12} />
      </Beat>

      {/* wash to ice-white, then the card */}
      <AbsoluteFill style={{background: M.ice, opacity: wash}} />
      <Sequence from={CARD}>
        <EndCard cta="CREATE YOUR CUSTOM PATCH" ctaSize={42} variant="cyan" />
      </Sequence>

      <FilmGrain opacity={0.05} />
      <Audio src={staticFile('audio/markhor-r1-mix.wav')} />
    </AbsoluteFill>
  );
};
