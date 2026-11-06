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

/* Markhor Patches — Reel 02 "You can almost feel this" (11.2 s, no VO, no music).
 * Texture-first: the machine laying chenille loops, a macro glide across the
 * pile with a speed ramp down to 0.6x, then the M revealed on a varsity jacket.
 * Big centred white type in the top band; an ice-white iris opens from the
 * letter into the CTA card.                                                   */
const {seg, Shot} = makeShots(edl, 'r2');
const [C1, C2, C3, CARD] = edl.cuts;

export const MarkhorReel02: React.FC = () => (
  <Themed theme={MARKHOR_THEME}>
    <Reel />
  </Themed>
);

const Center: React.FC<{top: number; children: React.ReactNode}> = ({top, children}) => (
  <div style={{position: 'absolute', top, left: 50, right: 50, filter: 'drop-shadow(0 6px 22px rgba(6,18,42,0.7))'}}>{children}</div>
);

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  const punch = (c: number) => (f >= c ? 1 - prog(f, c, 8, easeOut) : 0);
  const p1 = punch(C1);
  const p2 = punch(C2);
  const blurIn = f >= C3 ? 1 - prog(f, C3, 8, easeOut) : prog(f, C3 - 4, 4, easeIn); // vertical whip into the reveal
  const iris = prog(f, CARD - 4, 16, easeInOut);

  // CHENILLE.: tracking collapses as the ramp slows the texture
  const ch = prog(f, C2 + 2, 26, easeOut);

  return (
    <AbsoluteFill style={{background: M.navy}}>
      <MotionBlur id="m2-p" x={(p1 + p2) * 5} y={(p1 + p2) * 5} />
      <MotionBlur id="m2-v" x={0} y={blurIn * 40} />

      <Shot id="a">
        <Footage src={seg('a')} scale={1.06} drift={[1.06, 1]} shadeTop={0.6} />
      </Shot>
      <Shot id="b1">
        <Footage src={seg('b1')} scale={1.04} drift={[1, 1.05]} shadeTop={0.8} fx={{transform: `scale(${1 + p1 * 0.07})`}} fxFilter={p1 > 0.01 ? 'url(#m2-p)' : undefined} />
      </Shot>
      <Shot id="b2">
        <Footage
          src={seg('b2')}
          scale={1.08}
          drift={[1.05, 1.12]}
          shadeTop={0.8}
          fx={{transform: `scale(${1 + p2 * 0.06}) translateY(${f >= C3 - 4 ? -blurIn * 80 : 0}px)`}}
          fxFilter={p2 > 0.01 ? 'url(#m2-p)' : blurIn > 0.01 ? 'url(#m2-v)' : undefined}
        />
      </Shot>
      <Shot id="c">
        <Footage src={seg('c')} scale={1.02} drift={[1.1, 1]} origin={{x: 540, y: 1100}} shadeTop={0.9} fx={{transform: `translateY(${blurIn * 80}px)`}} fxFilter={blurIn > 0.01 ? 'url(#m2-v)' : undefined} />
      </Shot>

      <Beat from={0} to={C2}>
        <Center top={250}>
          <Words words={ws('YOU CAN ALMOST')} at={2} size={74} color={M.white} align="center" stagger={3} weight={700} tracking={0.04} exitAt={C2 - 8} />
          <Words words={ws('FEEL THIS.', ['THIS.'])} at={10} size={150} color={M.white} hiColor={M.cyan} align="center" weight={900} stagger={5} lineHeight={1} exitAt={C2 - 8} />
        </Center>
      </Beat>
      <Beat from={C2} to={C3}>
        <Center top={300}>
          <div style={{opacity: 1 - prog(f, C3 - 6, 6, easeIn), letterSpacing: 0}}>
            <div style={{transform: `scale(${mix(1.12, 1, ch)})`}}>
              <Words words={ws('CHENILLE.', ['CHENILLE.'])} at={2} size={128} color={M.white} align="center" />
            </div>
          </div>
          <div style={{marginTop: 10}}>
            <IceRule at={12} width={260} align="center" exitAt={C3 - C2 - 6} />
          </div>
        </Center>
      </Beat>
      <Beat from={C3} to={C3 + 60}>
        <Center top={250}>
          <Words words={ws('LOOPED. RAISED. BOLD.', ['BOLD.'])} at={6} size={96} color={M.white} hiColor={M.cyan} align="center" weight={900} stagger={7} exitAt={52} />
        </Center>
      </Beat>
      <Beat from={C3 + 60} to={CARD}>
        <Center top={240}>
          <Words words={ws('READY FOR')} at={2} size={74} color={M.white} align="center" weight={700} tracking={0.04} exitAt={CARD - C3 - 60 - 10} />
          <Words words={ws('THE JACKET.', ['JACKET.'])} at={8} size={130} color={M.white} hiColor={M.cyan} align="center" weight={900} stagger={5} lineHeight={1} exitAt={CARD - C3 - 60 - 10} />
        </Center>
      </Beat>

      {/* ice-white iris from the letter into the card */}
      <Sequence from={CARD - 4}>
        <AbsoluteFill style={{clipPath: `circle(${iris * 1250}px at 540px 1180px)`}}>
          <EndCard cta="BRING YOUR DESIGN TO LIFE" ctaSize={42} delay={8} variant="outline" />
        </AbsoluteFill>
      </Sequence>

      <FilmGrain opacity={0.05} />
      <Audio src={staticFile('audio/markhor-r2-mix.wav')} />
    </AbsoluteFill>
  );
};
