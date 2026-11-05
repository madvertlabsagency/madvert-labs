import React from 'react';
import {AbsoluteFill, Audio, Freeze, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {GoldRule} from '../../shared/components/GoldRule';
import {KineticText, words} from '../../shared/components/KineticText';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {B, BILLYS_THEME, FONT_BODY_B, FONT_HEAD, PRISM, URL} from '../brand';
import {LogoPlate, PrismRibbon} from '../BrandParts';
import edl from './edl.json';

/* Billys Custom Patches — 15 s cinematic reel (no VO, no music).
 * One Google Flow clip, seven macro shots cut on needle hits; four statements
 * of restrained kinetic type in the top safe band (the tiger's face sits in the
 * lower half of every shot); end card over a freeze of the finished tiger.
 *   0–3 s  WATCH THIS.                 s1 s2  needle macro
 *   3–6 s  PRECISION IN EVERY STITCH.  s3 s4  machine working
 *   6–9 s  BUILT IN THE DETAILS.       s5 s6  thread texture
 *   9–12 s YOUR DESIGN. BROUGHT TO LIFE. s7   finished tiger
 *  12–15 s logo + GET YOUR CUSTOM QUOTE →     end card                        */

const shot = (id: string) => {
  const s = edl.shots.find((x) => x.id === id);
  if (!s) throw new Error(`Shot ${id} missing from edl.json`);
  return s;
};
const seg = (id: string) => `segments/billys/reel15/${id}.mp4`;
const [C1, C2, C3, C4, C5, C6, CARD] = edl.cuts;

const Shot: React.FC<{id: string; children: React.ReactNode}> = ({id, children}) => (
  <Sequence from={shot(id).from} durationInFrames={shot(id).frames} name={id}>
    {children}
  </Sequence>
);

/** Statement block spanning a section (global frames), in the top safe band. */
const Statement: React.FC<{from: number; to: number; children: (at: (g: number) => number) => React.ReactNode}> = ({from, to, children}) => (
  <Sequence from={from} durationInFrames={to - from} name={`type ${from}`}>
    {children((g) => g - from)}
  </Sequence>
);

export const BillysReel15: React.FC = () => (
  <Themed theme={BILLYS_THEME}>
    <Reel />
  </Themed>
);

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  // in-section cuts: a short punch-in that settles (machine hit)
  const punch = (c: number) => (f >= c ? 1 - prog(f, c, 7, easeOut) : 0);
  // section changes: horizontal whip blur, out over 3 frames / in over 5
  const whip = (c: number) => (f < c ? prog(f, c - 3, 3, easeIn) : 1 - prog(f, c, 5, easeOut));
  const w2 = whip(C2);
  const w4 = whip(C4);
  const w6 = whip(C6);
  const p1 = punch(C1);
  const p3 = punch(C3);
  const p5 = punch(C5);
  const card = prog(f, CARD - 2, 16, easeInOut);

  const whipFx = (w: number, dir: number): React.CSSProperties => ({transform: `translateX(${dir * w * 70}px) scale(${1 + w * 0.04})`});
  const punchFx = (p: number): React.CSSProperties => ({transform: `scale(${1 + p * 0.06})`});

  return (
    <AbsoluteFill style={{background: B.navyDeep}}>
      <MotionBlur id="r15-w2" x={w2 * 38} y={0} />
      <MotionBlur id="r15-w4" x={w4 * 38} y={0} />
      <MotionBlur id="r15-w6" x={0} y={w6 * 38} />
      <MotionBlur id="r15-p" x={(p1 + p3 + p5) * 5} y={(p1 + p3 + p5) * 5} />

      {/* ---------------------------------------------------------------- 0–3 s needle macro */}
      <Shot id="s1">
        <Footage src={seg('s1')} scale={1.04} y={40} drift={[1, 1.05]} origin={{x: 540, y: 700}} shadeTop={0.9} />
      </Shot>
      <Shot id="s2">
        {/* nose macro: pushed in and down so the eyes sit below the headline */}
        <Footage
          src={seg('s2')}
          scale={1.3}
          y={280}
          drift={[1, 1.03]}
          shadeTop={1}
          fx={{...punchFx(p1), ...(f >= C2 - 3 ? whipFx(w2, -1) : {})}}
          fxFilter={p1 > 0.01 ? 'url(#r15-p)' : w2 > 0.01 ? 'url(#r15-w2)' : undefined}
        />
      </Shot>

      {/* ---------------------------------------------------------------- 3–6 s machine working */}
      <Shot id="s3">
        <Footage src={seg('s3')} scale={1.04} y={30} drift={[1.04, 1]} shadeTop={0.9} fx={whipFx(w2, 1)} fxFilter={w2 > 0.01 ? 'url(#r15-w2)' : undefined} />
      </Shot>
      <Shot id="s4">
        <Footage
          src={seg('s4')}
          scale={1.04}
          y={40}
          drift={[1, 1.05]}
          shadeTop={0.9}
          fx={{...punchFx(p3), ...(f >= C4 - 3 ? whipFx(w4, -1) : {})}}
          fxFilter={p3 > 0.01 ? 'url(#r15-p)' : w4 > 0.01 ? 'url(#r15-w4)' : undefined}
        />
      </Shot>

      {/* ---------------------------------------------------------------- 6–9 s thread texture */}
      <Shot id="s5">
        <Footage src={seg('s5')} scale={1.06} y={40} drift={[1.06, 1]} origin={{x: 700, y: 1400}} shadeTop={0.9} fx={whipFx(w4, 1)} fxFilter={w4 > 0.01 ? 'url(#r15-w4)' : undefined} />
      </Shot>
      <Shot id="s6">
        <Footage
          src={seg('s6')}
          scale={1.04}
          y={40}
          drift={[1, 1.06]}
          origin={{x: 540, y: 1300}}
          shadeTop={0.9}
          fx={{...punchFx(p5), ...(f >= C6 - 3 ? {transform: `translateY(${-w6 * 70}px)`} : {})}}
          fxFilter={p5 > 0.01 ? 'url(#r15-p)' : w6 > 0.01 ? 'url(#r15-w6)' : undefined}
        />
      </Shot>

      {/* ---------------------------------------------------------------- 9–12 s finished tiger (slow pull-out) */}
      <Shot id="s7">
        <Footage
          src={seg('s7')}
          scale={1.0}
          y={0}
          drift={[1.12, 1.0]}
          origin={{x: 540, y: 1250}}
          shadeTop={0.9}
          fx={{transform: `translateY(${w6 * 70}px)`}}
          fxFilter={w6 > 0.01 ? 'url(#r15-w6)' : undefined}
        />
      </Shot>

      {/* ---------------------------------------------------------------- headlines */}
      <Statement from={0} to={C2}>
        {(at) => (
          <>
            <KineticText
              id="watch"
              style={{top: 232}}
              exit="blur"
              exitAt={at(C2) - 8}
              lines={[{words: words('WATCH THIS.', ['THIS.']), at: 8, size: 196, font: 'condensed', stagger: 6, tracking: [0.3, 0.04], impact: true}]}
            />
            <GoldRule at={20} top={452} width={300} exitAt={at(C2) - 9} />
          </>
        )}
      </Statement>
      <Statement from={C2} to={C4}>
        {(at) => (
          <>
            <KineticText
              id="precision"
              style={{top: 224}}
              exit="blur"
              exitAt={at(C4) - 8}
              lines={[
                {words: words('PRECISION', true), at: 4, size: 172, font: 'condensed', tracking: [0.36, 0.06]},
                {words: words('IN EVERY STITCH.'), at: 12, size: 104, font: 'condensed', stagger: 4, lineHeight: 1.02, tracking: [0.24, 0.1]},
              ]}
            />
            <GoldRule at={22} top={530} width={340} exitAt={at(C4) - 9} />
          </>
        )}
      </Statement>
      <Statement from={C4} to={C6}>
        {(at) => (
          <>
            <KineticText
              id="details"
              style={{top: 224}}
              exit="blur"
              exitAt={at(C6) - 8}
              lines={[
                {words: words('BUILT IN THE'), at: 4, size: 104, font: 'condensed', stagger: 4, tracking: [0.24, 0.1]},
                {words: words('DETAILS.', true), at: 12, size: 186, font: 'condensed', lineHeight: 0.98, impact: true},
              ]}
            />
            <GoldRule at={24} top={540} width={340} exitAt={at(C6) - 9} />
          </>
        )}
      </Statement>
      <Statement from={C6} to={CARD}>
        {(at) => (
          <>
            <KineticText
              id="life"
              style={{top: 220}}
              exit="blur"
              exitAt={at(CARD) - 10}
              lines={[
                {words: words('YOUR DESIGN.'), at: 6, size: 112, font: 'condensed', stagger: 5, tracking: [0.24, 0.08]},
                {words: words('BROUGHT TO LIFE.', ['LIFE.']), at: 20, size: 150, font: 'condensed', stagger: 5, lineHeight: 1.0},
              ]}
            />
            <GoldRule at={34} top={516} width={380} exitAt={at(CARD) - 11} />
          </>
        )}
      </Statement>

      {/* ---------------------------------------------------------------- 12–15 s end card over the frozen finished tiger */}
      <Sequence from={CARD - 2} name="End card">
        <AbsoluteFill>
          <AbsoluteFill style={{filter: `blur(${mix(0, 16, card)}px)`, transform: `scale(${mix(1, 1.06, card)})`}}>
            <Freeze frame={shot('s7').frames - 1}>
              <Sequence from={0}>
                <Footage src={seg('s7')} scale={1.0} drift={[1, 1]} />
              </Sequence>
            </Freeze>
          </AbsoluteFill>
          <AbsoluteFill style={{opacity: card, background: `linear-gradient(180deg, rgba(10,12,36,0.7) 0%, rgba(16,19,49,0.72) 50%, rgba(10,12,36,0.9) 100%)`}} />
        </AbsoluteFill>
        <EndCard />
      </Sequence>

      <FilmGrain opacity={0.06} />
      <Audio src={staticFile('audio/billys-reel15-mix.wav')} />
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame(); // local: 0 = CARD - 2
  const cta = prog(f, 26, 14, easeOut);
  const url = prog(f, 36, 14, easeOut);
  const sweep = prog(f, 56, 22, easeInOut);
  const nudge = Math.sin(Math.max(0, f - 44) * 0.18) * 6 * prog(f, 44, 10);
  return (
    <AbsoluteFill>
      <PrismRibbon at={4} top={-70} opacity={0.6} thickness={16} />
      <LogoPlate at={8} width={600} top={640} />
      <div
        style={{
          position: 'absolute',
          top: 1080,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: cta,
          transform: `translateY(${(1 - cta) * 36}px)`,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            padding: '20px 44px 16px',
            borderRadius: 999,
            background: B.yellow,
            color: B.navy,
            fontFamily: FONT_HEAD,
            fontSize: 88,
            lineHeight: 1,
            letterSpacing: '0.04em',
            boxShadow: '0 18px 44px rgba(0,0,0,0.5), inset 0 -4px 0 rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          <span>GET YOUR CUSTOM QUOTE</span>
          <svg width={66} height={44} viewBox="0 0 66 44" style={{transform: `translateX(${nudge}px)`, marginTop: -4}}>
            <path d="M 4 22 L 56 22 M 38 5 L 58 22 L 38 39" fill="none" stroke={B.navy} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(110deg, transparent ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.55) ${mix(-30, 110, sweep)}%, transparent ${mix(-20, 120, sweep)}%)`,
              opacity: sweep > 0 && sweep < 1 ? 1 : 0,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1250,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: FONT_BODY_B,
          fontWeight: 800,
          fontSize: 44,
          letterSpacing: `${mix(0.3, 0.12, url)}em`,
          color: B.white,
          opacity: url,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
        }}
      >
        {URL.toUpperCase()}
      </div>
      <div style={{position: 'absolute', top: 1342, left: 540 - 150, width: 300, height: 6, display: 'flex', gap: 6, opacity: url}}>
        {PRISM.map((c, i) => (
          <div key={c} style={{flex: 1, background: c, borderRadius: 3, transform: `scaleX(${prog(f, 40 + i * 3, 10, easeOut)})`}} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
