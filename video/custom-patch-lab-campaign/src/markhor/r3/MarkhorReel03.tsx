import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {easeIn, easeInOut, easeOut, prog} from '../../shared/motion';
import {Themed} from '../../shared/theme';
import {FONT_BODY, FONT_HEAD, M, MARKHOR_STUDIO_THEME} from '../brand';
import {Beat, makeShots} from '../common';
import {EndCard, IceRule, Words, ws} from '../Parts';
import edl from './edl.json';

/* Markhor Patches — Reel 03 "Which one is you?" (10 s, no VO, no music).
 * The ice-white studio line-up (m5) cut as a product carousel: an 8-frame
 * stutter of all four styles as the hook, then each style pushes in from the
 * right with a navy spec label; the CTA card arrives as the next "slide".
 * The leather shot in m5 is left out (its stamped word is gibberish).        */
const {shot, seg} = makeShots(edl, 'r3');
const CARD = edl.cuts[edl.cuts.length - 1];
const PUSH = 6; // carousel push length (frames)
const SLIDES = [
  {id: 'emb', n: '01', label: 'EMBROIDERED'},
  {id: 'pvc', n: '02', label: 'PVC'},
  {id: 'che', n: '03', label: 'CHENILLE'},
  {id: 'own', n: '', label: ''},
] as const;

export const MarkhorReel03: React.FC = () => (
  <Themed theme={MARKHOR_STUDIO_THEME}>
    <Reel />
  </Themed>
);

const Label: React.FC<{n: string; label: string}> = ({n, label}) => {
  const f = useCurrentFrame();
  const p = prog(f, PUSH + 2, 12, easeOut);
  return (
    <div style={{position: 'absolute', top: 1436, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: p, transform: `translateY(${(1 - p) * 24}px) skewX(-10deg)`}}>
        <span style={{fontFamily: FONT_BODY, fontWeight: 800, fontSize: 34, letterSpacing: '0.2em', color: M.cyanDeep}}>{n}</span>
        <span style={{width: 46, height: 4, borderRadius: 2, background: M.cyan}} />
        <span style={{fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 66, letterSpacing: '0.06em', color: M.navy}}>{label}</span>
      </div>
    </div>
  );
};

const Reel: React.FC = () => {
  const f = useCurrentFrame();
  // push progress at each slide boundary (the boundary is the slide's EDL `from`)
  const push = (c: number) => prog(f, c - PUSH, PUSH, easeInOut);
  const starts = SLIDES.map((s) => shot(s.id).from);
  const moving = [...starts, CARD].some((c) => f >= c - PUSH && f < c);
  const blur = moving ? 28 : 0;

  return (
    <AbsoluteFill style={{background: M.ice}}>
      <MotionBlur id="m3-push" x={blur} y={0} />

      {/* hook: four styles, 8 frames each */}
      {['h1', 'h2', 'h3', 'h4'].map((id) => (
        <Sequence key={id} from={shot(id).from} durationInFrames={shot(id).frames}>
          <Footage src={seg(id)} scale={1.02} drift={[1.06, 1.0]} />
        </Sequence>
      ))}

      {SLIDES.map((s, i) => {
        const from = starts[i] - PUSH;
        const next = i + 1 < SLIDES.length ? starts[i + 1] : CARD;
        const inP = push(starts[i]);
        const outP = push(next);
        const x = (1 - inP) * 1080 - outP * 1080;
        return (
          <Sequence key={s.id} from={from} durationInFrames={shot(s.id).frames} name={s.id}>
            <AbsoluteFill style={{transform: `translateX(${x}px)`, filter: moving ? 'url(#m3-push)' : undefined}}>
              <Footage src={seg(s.id)} scale={1.02} drift={[1, 1.05]} />
              {s.label && <Label n={s.n} label={s.label} />}
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* headline: the question holds across the carousel, then the turn */}
      <Beat from={0} to={starts[3] - PUSH}>
        <div style={{position: 'absolute', top: 236, left: 60, right: 60}}>
          <Words words={ws('WHICH ONE')} at={0} size={110} align="center" weight={900} stagger={2} exitAt={starts[3] - PUSH - 8} />
          <Words words={ws('IS YOU?', ['YOU?'])} at={4} size={110} align="center" weight={900} stagger={2} exitAt={starts[3] - PUSH - 8} />
        </div>
      </Beat>
      <Beat from={starts[3] - PUSH} to={CARD}>
        <div style={{position: 'absolute', top: 236, left: 60, right: 60}}>
          <Words words={ws('OR SOMETHING')} at={4} size={92} align="center" weight={900} stagger={3} />
          <Words words={ws('ALL YOUR OWN.', ['OWN.'])} at={10} size={92} align="center" weight={900} stagger={3} />
        </div>
        <div style={{position: 'absolute', top: 1450, left: 0, right: 0}}>
          <IceRule at={16} width={220} align="center" />
        </div>
      </Beat>

      {/* the CTA card is the next slide */}
      <Sequence from={CARD - PUSH}>
        <AbsoluteFill style={{transform: `translateX(${(1 - push(CARD)) * 1080}px)`}}>
          <EndCard cta="START YOUR CUSTOM PATCH" ctaSize={44} delay={PUSH} variant="pale" />
        </AbsoluteFill>
      </Sequence>

      <FilmGrain opacity={0.035} />
      <Audio src={staticFile('audio/markhor-r3-mix.wav')} />
    </AbsoluteFill>
  );
};
