import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FONT_BODY} from '../../shared/brand';
import {NavyField} from '../../shared/components/BrandBackdrop';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {GoldFramePanel} from '../../shared/components/GoldFramePanel';
import {GoldRule} from '../../shared/components/GoldRule';
import {KineticText, words} from '../../shared/components/KineticText';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {DiagonalReveal, WipeStreaks} from '../../shared/components/Transitions';
import {WordStack} from '../../shared/components/WordStack';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import edl from './edl.json';
import {Themed} from '../../shared/theme';
import {E, EPCF_THEME} from '../brand';
import {LogoBadge} from '../../shared/components/LogoBadge';
const B = {white: E.ivory, yellow: E.gold, navyDeep: '#031A0D'};
const PRISM = [E.gold, '#2E9E5B', E.goldLight, '#1C7A43'];
import vo from './vo-timing.json';

/* ------------------------------------------------------------------ timing
 * The recorded voiceover is the master clock. Every cue is a word looked up in
 * vo-timing.json (forced-aligned from the recording by scripts/vo-timing.py).
 * Phrase indices follow assets/source/ad03/audio/voiceover-transcript.txt.   */
const VO = edl.voOffsetFrames;
const sf = (s: number) => Math.round(s * edl.fps) + VO;
const word = (phrase: number, w: string) => {
  const hit = vo.phrases[phrase].words.find((x) => x.w.toLowerCase().replace(/[^a-z0-9']/g, '') === w);
  if (!hit) throw new Error(`"${w}" not in VO phrase ${phrase}`);
  return sf(hit.start);
};
const shot = (id: string) => {
  const s = edl.shots.find((x) => x.id === id);
  if (!s) throw new Error(`Shot ${id} missing from edl.json`);
  return s;
};
const seg = (id: string) => `segments/epcf/tiger/${id}.mp4`;
const [CUT_1, CUT_2, CUT_3, CUT_4, CUT_5, CUT_6, CUT_7, CUT_8, CUT_9, CUT_10, CUT_11] = edl.cuts;

/** A shot placed at its EDL position; children render in shot-local frames. */
const Shot: React.FC<{id: string; children: React.ReactNode}> = ({id, children}) => (
  <Sequence from={shot(id).from} durationInFrames={shot(id).frames} name={id}>
    {children}
  </Sequence>
);

/* EPCF — tiger ad: the Custom Patch Lab Ad 03 edit re-timed to the EPCF voiceover
 * (vo-timing.json, 21 recorded phrases), re-skinned with EPCF_THEME. */
export const EpcfTiger: React.FC = () => (
  <Themed theme={EPCF_THEME}>
    <Ad />
  </Themed>
);

const Ad: React.FC = () => {
  const f = useCurrentFrame();
  const local = (id: string, g: number) => g - shot(id).from;

  // transition curves (global frames)
  const t1 = prog(f, CUT_1 - 5, 10, easeInOut); // lateral match cut: tiger texture → needle
  const punch2 = prog(f, CUT_2, 8, easeOut);
  const punch3 = prog(f, CUT_3, 9, easeOut);
  const t4 = prog(f, CUT_4 - 5, 10, easeInOut); // stitched-thread diagonal reveal
  const t5Out = prog(f, CUT_5 - 8, 8, easeIn); // scale match out of the reveal…
  const t5In = prog(f, CUT_5, 10, easeOut); // …into the presented patch
  const punch6 = prog(f, CUT_6, 8, easeOut);
  const t7 = prog(f, CUT_7 - 5, 11, easeInOut); // editorial lateral wipe
  const t7Edge = mix(-260, 1340, t7);
  const t8 = prog(f, CUT_8, 8, easeInOut); // soft dissolve machine → machine (s08 has an 8-frame tail)
  const t9 = prog(f, CUT_9 - 5, 10, easeInOut); // vertical whip
  const punch10 = prog(f, CUT_10, 8, easeOut);
  const t11 = prog(f, CUT_11 - 4, 10, easeInOut); // branded outro reveal

  return (
    <AbsoluteFill style={{background: B.navyDeep}}>
      <MotionBlur id="a3-t1" x={Math.sin(Math.PI * t1) * 60} y={0} />
      <MotionBlur id="a3-p" x={(1 - Math.min(punch2, punch3, punch6, punch10)) * 6} y={(1 - Math.min(punch2, punch3, punch6, punch10)) * 6} />
      <MotionBlur id="a3-t5" x={(t5Out + (1 - t5In)) * 8} y={(t5Out + (1 - t5In)) * 8} />
      <MotionBlur id="a3-t7" x={Math.sin(Math.PI * t7) * 40} y={0} />
      <MotionBlur id="a3-t9" x={0} y={Math.sin(Math.PI * t9) * 60} />

      {/* ============================================ 01 HOOK — "Got a logo? Let's turn it into something amazing." */}
      <Shot id="s01">
        <Footage
          src={seg('s01')}
          scale={1.08}
          y={60}
          drift={[1.02, 1.1]}
          shadeTop={1}
          fx={{transform: `translateX(${-t1 * 1080}px)`}}
          fxFilter={t1 > 0.01 ? 'url(#a3-t1)' : undefined}
        />
        <KineticText
          id="hook1"
          style={{top: 236}}
          exitAt={word(1, 'something') - 9}
          lines={[{words: words('GOT A LOGO?', ['LOGO?']), at: word(0, 'got'), size: 150, font: 'condensed', stagger: 3, tracking: [0.12, 0.01]}]}
        />
        <KineticText
          id="hook2"
          style={{top: 222}}
          exitAt={CUT_1 - 12}
          lines={[
            {words: words('SOMETHING'), at: word(1, 'something'), size: 120, font: 'condensed', weight: 600, tracking: [0.4, 0.14]},
            {words: words('AMAZING.', true), at: word(1, 'amazing'), size: 180, font: 'condensed', impact: true, lineHeight: 0.98},
          ]}
        />
      </Shot>

      {/* ============================================ 02 CRAFT — "At Custom Patch Lab, we create premium custom patches that make your brand stand out." */}
      <Shot id="s02">
        <Footage
          src={seg('s02')}
          scale={1.1}
          y={40}
          drift={[1.06, 1]}
          shadeTop={0.8}
          fx={{transform: `translateX(${(1 - t1) * 1080}px)`}}
          fxFilter={t1 < 0.99 ? 'url(#a3-t1)' : undefined}
        />
        <Eyebrow text="EPCF" at={local('s02', word(2, 'custom'))} top={300} exitAt={local('s02', CUT_2) - 4} />
      </Shot>
      <Shot id="s03">
        <Footage
          src={seg('s03')}
          scale={1.08}
          y={-20}
          drift={[1, 1.06]}
          shadeBottom={1}
          fx={{transform: `scale(${1.08 - 0.08 * punch2})`}}
          fxFilter={punch2 < 0.99 ? 'url(#a3-p)' : undefined}
        />
        <KineticText
          id="premium"
          style={{top: 1214}}
          exitAt={local('s03', CUT_3) - 9}
          lines={[
            {words: words('PREMIUM', true), at: local('s03', word(3, 'premium')), size: 150, font: 'condensed', tracking: [0.5, 0.06]},
            {words: words('CUSTOM PATCHES'), at: local('s03', word(3, 'custom')), size: 104, font: 'condensed', weight: 600, stagger: 5, lineHeight: 1.08, tracking: [0.3, 0.1]},
          ]}
        />
      </Shot>
      <Shot id="s04">
        <Footage
          src={seg('s04')}
          scale={1.04}
          y={90}
          drift={[1, 1.07]}
          shadeTop={1}
          fx={{transform: `scale(${1.08 - 0.08 * punch3})`}}
          fxFilter={punch3 < 0.99 ? 'url(#a3-p)' : undefined}
        />
        <KineticText
          id="standout"
          style={{top: 226}}
          lines={[
            {words: words('MAKE YOUR BRAND'), at: local('s04', word(3, 'make')), size: 104, font: 'condensed', weight: 600, stagger: 4, tracking: [0.24, 0.08]},
            {words: words('STAND OUT.', true), at: local('s04', word(3, 'stand')), size: 184, font: 'condensed', impact: true, stagger: 4, lineHeight: 0.98},
          ]}
        />
        <GoldRule at={local('s04', word(3, 'out')) + 4} top={552} width={360} />
      </Shot>

      {/* ============================================ 03 OBJECTION — "No design? No problem! We'll create one for you." */}
      <Shot id="s05k">
        <DiagonalReveal p={t4} stitch>
          <SketchToPatch sketch={seg('s05k')} real={seg('s05')} at={local('s05k', word(5, 'no')) + 2} fx={{transform: `scale(${1 + 0.1 * t5Out})`}} fxFilter={t5Out > 0.01 ? 'url(#a3-t5)' : undefined} />
        </DiagonalReveal>
        <KineticText
          id="nodesign"
          style={{top: 232}}
          exitAt={local('s05k', CUT_5) - 10}
          lines={[
            {words: words('NO DESIGN?'), at: local('s05k', word(4, 'no')), size: 150, font: 'condensed', stagger: 6, tracking: [0.32, 0.04]},
            {words: words('NO PROBLEM!', true), at: local('s05k', word(5, 'no')), size: 168, font: 'condensed', impact: true, stagger: 3, lineHeight: 0.98},
          ]}
        />
        {/* styleframe copy; matches the spoken "We'll create one for you." */}
        <KineticText
          id="create"
          style={{top: 1404}}
          exitAt={local('s05k', CUT_5) - 10}
          lines={[{words: words('WE CAN CREATE IT FOR YOU.'), at: local('s05k', word(6, "we'll")), size: 74, font: 'condensed', weight: 600, stagger: 2, tracking: [0.2, 0.05]}]}
        />
      </Shot>

      {/* ============================================ 04 BENEFITS — "Get free artwork support, unlimited artwork revisions, and zero setup fees." */}
      <Shot id="s06">
        <Footage
          src={seg('s06')}
          scale={1.08}
          y={120}
          drift={[1, 1.06]}
          shadeTop={1}
          fx={{transform: `scale(${1.18 - 0.18 * t5In})`}}
          fxFilter={t5In < 0.99 ? 'url(#a3-t5)' : undefined}
        />
      </Shot>
      <Shot id="s07">
        <Footage
          src={seg('s07')}
          scale={1.06}
          y={-60}
          drift={[1, 1.05]}
          shadeTop={1}
          shadeBottom={1}
          fx={{transform: `scale(${1.07 - 0.07 * punch6}) translateX(${t7 * 90}px)`}}
          fxFilter={punch6 < 0.99 ? 'url(#a3-p)' : t7 > 0.01 ? 'url(#a3-t7)' : undefined}
        />
      </Shot>

      <Sequence from={CUT_5} durationInFrames={CUT_7 - CUT_5} name="Patch type chips">
        <KineticText
          id="choose"
          style={{top: 226}}
          exitAt={CUT_7 - CUT_5 - 9}
          lines={[{words: words('CHOOSE YOUR PATCH.', ['PATCH.']), at: word(7, 'choose') - CUT_5, size: 112, font: 'condensed', stagger: 4, tracking: [0.2, 0.04]}]}
        />
        <TypeChips from={CUT_5} exitAt={CUT_7 - CUT_5 - 8} />
      </Sequence>

      {/* ============================================ 05 TRUST — USA-based · US-to-US · free backing + shipping · prices */}
      <Shot id="s08">
        <AbsoluteFill
          style={{
            WebkitMaskImage: `linear-gradient(90deg, #000 ${t7Edge - 140}px, transparent ${t7Edge + 40}px)`,
            maskImage: `linear-gradient(90deg, #000 ${t7Edge - 140}px, transparent ${t7Edge + 40}px)`,
          }}
        >
          <Footage
            src={seg('s08')}
            scale={1.06}
            y={-40}
            drift={[1.04, 1]}
            shadeTop={1}
            shadeBottom={1}
            fx={{transform: `translateX(${(1 - t7) * -90}px)`}}
            fxFilter={t7 < 0.99 ? 'url(#a3-t7)' : undefined}
          />
        </AbsoluteFill>
      </Shot>
      {t7 > 0 && t7 < 1 && <WipeStreaks edge={t7Edge} strength={Math.sin(Math.PI * t7)} />}
      <Shot id="s09">
        <AbsoluteFill style={{opacity: t8}}>
          <Footage
            src={seg('s09')}
            scale={1.06}
            y={-40}
            drift={[1, 1.05]}
            shadeTop={1}
            shadeBottom={1}
            fx={{transform: `translateY(${-t9 * 1920}px)`}}
            fxFilter={t9 > 0.01 ? 'url(#a3-t9)' : undefined}
          />
        </AbsoluteFill>
      </Shot>
      <Sequence from={CUT_7} durationInFrames={CUT_9 - CUT_7} name="Trust type">
        <QualityLedger from={CUT_7} />
      </Sequence>

      {/* ============================================ 06 RANGE — "From hats to jackets, uniforms to clothing brands, we bring your ideas to life." */}
      <Shot id="s10">
        <Footage
          src={seg('s10')}
          scale={1.12}
          y={260}
          drift={[1, 1.06]}
          shadeTop={1}
          fx={{transform: `translateY(${(1 - t9) * 1920}px)`, filter: 'brightness(0.78)'}}
          fxFilter={t9 < 0.99 ? 'url(#a3-t9)' : undefined}
        />
        <WordStack
          id="range"
          top={226}
          size={124}
          exitAt={local('s10', CUT_10) - 8}
          items={[
            {text: 'HATS.', at: local('s10', word(15, 'hats'))},
            {text: 'JACKETS.', at: local('s10', word(15, 'jackets'))},
            {text: 'UNIFORMS.', at: local('s10', word(16, 'uniforms'))},
            {text: 'CLOTHING BRANDS.', at: local('s10', word(16, 'clothing'))},
          ]}
        />
      </Shot>
      <Shot id="s11k">
        <SketchToPatch
          sketch={seg('s11k')}
          real={seg('s11')}
          at={local('s11k', word(17, 'life')) - 4}
          fx={{transform: `scale(${1.08 - 0.08 * punch10})`}}
          fxFilter={punch10 < 0.99 ? 'url(#a3-p)' : undefined}
        />
        <KineticText
          id="ideas"
          style={{top: 232}}
          lines={[
            {words: words('WE BRING YOUR'), at: local('s11k', word(17, 'we')), size: 100, font: 'condensed', weight: 600, stagger: 4, tracking: [0.26, 0.08]},
            {words: words('IDEAS TO LIFE.', ['LIFE.']), at: local('s11k', word(17, 'ideas')), size: 168, font: 'condensed', stagger: 6, lineHeight: 0.98},
          ]}
        />
      </Shot>

      {/* ============================================ 07 CTA — "Stop settling for ordinary. Get your free custom patch mockup within 24 hours." */}
      <Sequence from={CUT_11 - 4} name="Outro">
        <DiagonalReveal p={t11} stitch>
          <Outro start={CUT_11 - 4} />
        </DiagonalReveal>
      </Sequence>

      <FilmGrain />
      <Audio src={staticFile('audio/epcf03-mix.wav')} />
    </AbsoluteFill>
  );
};

/** Small tracked label between two gold hairlines. */
const Eyebrow: React.FC<{text: string; at: number; top: number; exitAt?: number}> = ({text, at, top, exitAt}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 18);
  const q = exitAt === undefined ? 0 : prog(f, exitAt, 8, easeIn);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 26,
        opacity: p * (1 - q),
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 40,
        letterSpacing: `${mix(0.6, 0.34, p)}em`,
        color: B.white,
        filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.7))',
      }}
    >
      <div style={{width: 90 * p, height: 2, background: B.yellow}} />
      <span style={{clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}}>{text}</span>
      <div style={{width: 90 * p, height: 2, background: B.yellow}} />
    </div>
  );
};

/** Pencil sketch of the exact patch; the stitched patch wipes across it behind a glowing needle line. */
const SketchToPatch: React.FC<{
  sketch: string;
  real: string;
  at: number;
  fx?: React.CSSProperties;
  fxFilter?: string;
}> = ({sketch, real, at, fx, fxFilter}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 12, easeInOut);
  const edge = mix(-160, 1240, p);
  const mask = `linear-gradient(90deg, #000 ${edge - 70}px, transparent ${edge + 10}px)`;
  return (
    <AbsoluteFill style={{...fx, filter: fxFilter}}>
      <Footage src={sketch} scale={1.06} y={40} drift={[1, 1.05]} shadeTop={0.55} shadeBottom={0.55} />
      <AbsoluteFill style={{WebkitMaskImage: mask, maskImage: mask}}>
        <Footage src={real} scale={1.06} y={40} drift={[1, 1.05]} shadeTop={1} shadeBottom={1} />
      </AbsoluteFill>
      {p > 0 && p < 1 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: edge - 30,
            width: 4,
            background: 'linear-gradient(180deg, rgba(244,185,66,0), #FFE29A 20%, #F4B942 80%, rgba(244,185,66,0))',
            boxShadow: '0 0 22px 6px rgba(244,185,66,0.55)',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

/** Patch-type chips: each lights on its spoken word. Local frame 0 = CUT_5. */
const TypeChips: React.FC<{from: number; exitAt: number}> = ({from, exitAt}) => {
  const f = useCurrentFrame();
  const at = (g: number) => g - from;
  const items: Array<[string, number]> = [
    ['EMBROIDERED', at(word(7, 'embroidered'))],
    ['CHENILLE', at(word(8, 'chenille'))],
    ['PVC', at(word(9, 'pvc'))],
    ['WOVEN', at(word(10, 'woven'))],
    ['PRINTED', at(word(10, 'printed'))],
  ];
  const q = prog(f, exitAt, 8, easeIn);
  const current = items.reduce((acc, it, i) => (f >= it[1] ? i : acc), -1);
  return (
    <div style={{position: 'absolute', top: 372, left: 70, right: 70, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, opacity: 1 - q, transform: `translateY(${q * 40}px)`}}>
      {items.map(([label, t], i) => {
        const p = prog(f, t, 9, easeOut);
        const on = i === current;
        return (
          <div
            key={label}
            style={{
              padding: '10px 26px',
              borderRadius: 999,
              background: on ? PRISM[i % 4] : 'rgba(12,13,40,0.82)',
              border: `3px solid ${PRISM[i % 4]}`,
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 600,
              fontSize: 54,
              lineHeight: 1,
              letterSpacing: '0.04em',
              color: on && i % 2 === 0 ? B.navyDeep : B.white,
              transform: `translateY(${(1 - p) * 50}px) scale(${mix(0.8, 1, p) * (on ? 1.06 : 1)})`,
              opacity: Math.min(1, p * 2),
              boxShadow: on ? `0 0 28px ${PRISM[i % 4]}` : '0 10px 24px rgba(0,0,0,0.45)',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

/** Quality lines, each on its spoken word. Local frame 0 = CUT_7. */
const QualityLedger: React.FC<{from: number}> = ({from}) => {
  const at = (g: number) => g - from;
  return (
    <AbsoluteFill>
      <Eyebrow text="WHY EPCF" at={at(word(11, 'every'))} top={214} exitAt={at(CUT_9) - 10} />
      <KineticText
        id="quality"
        style={{top: 270}}
        exitAt={at(word(12, 'and')) - 6}
        lines={[
          {words: words('PREMIUM'), at: at(word(11, 'premium')), size: 120, font: 'condensed', tracking: [0.2, 0.03]},
          {words: words('QUALITY.', true), at: at(word(11, 'quality')), size: 150, font: 'condensed', lineHeight: 0.98, tracking: [0.2, 0.03]},
        ]}
      />
      <KineticText
        id="satisfaction"
        style={{top: 270}}
        exitAt={at(word(13, 'built')) - 6}
        lines={[
          {words: words('SATISFACTION'), at: at(word(12, 'satisfaction')), size: 120, font: 'condensed', tracking: [0.2, 0.03]},
          {words: words('GUARANTEED.', true), at: at(word(12, 'guaranteed')), size: 150, font: 'condensed', lineHeight: 0.98, tracking: [0.2, 0.03]},
        ]}
      />
      <KineticText
        id="audience"
        style={{top: 270}}
        exitAt={at(CUT_9) - 10}
        lines={[
          {words: words('FOR BUSINESSES,'), at: at(word(13, 'businesses')), size: 110, font: 'condensed', stagger: 4, tracking: [0.2, 0.03]},
          {words: words('TEAMS & BRANDS.', ['BRANDS.']), at: at(word(14, 'teams')), size: 120, font: 'condensed', stagger: 6, lineHeight: 1.0, tracking: [0.2, 0.03]},
        ]}
      />
    </AbsoluteFill>
  );
};

/** Design-05 end card. Local frame 0 = `start` (global). */
const Outro: React.FC<{start: number}> = ({start}) => {
  const f = useCurrentFrame();
  const g = f + start;
  const at = (gf: number) => gf - start;
  const band = prog(g, CUT_11 + 2, 16, easeOut);
  const ctaIn = word(19, 'get');
  const zoom = mix(1, 1.025, prog(g, CUT_11, 213, easeInOut));
  return (
    <AbsoluteFill>
      <NavyField />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <LogoBadge at={at(CUT_11 + 4)} size={250} top={200} src="brand/epcf-logo.png" ratio={1} />
        {/* headline slot: the spoken line first, then the campaign line once the CTA has landed */}
        <KineticText
          id="ordinary"
          style={{top: 496}}
          exitAt={at(word(20, 'factory'))}
          exit="blur"
          lines={[
            {words: words('STOP SETTLING'), at: at(word(18, 'stop')), size: 104, font: 'condensed', stagger: 4, tracking: [0.22, 0.04]},
            {words: words('FOR ORDINARY.', ['ORDINARY.']), at: at(word(18, 'for')), size: 104, font: 'condensed', stagger: 4, lineHeight: 1.02, tracking: [0.22, 0.04]},
          ]}
        />
        <KineticText
          id="nextpatch"
          style={{top: 496}}
          lines={[
            {words: words('YOUR NEXT PATCH'), at: at(word(20, 'factory')) + 10, size: 104, font: 'condensed', stagger: 4, tracking: [0.22, 0.04]},
            {words: words('STARTS HERE.'), at: at(word(20, 'factory')) + 18, size: 104, font: 'condensed', stagger: 4, lineHeight: 1.02, tracking: [0.22, 0.04]},
          ]}
        />
        {/* product band */}
        <AbsoluteFill
          style={{
            clipPath: `inset(${mix(960, 736, band)}px 60px ${mix(960, 736, band)}px 60px round 26px)`,
          }}
        >
          <Footage src={seg('s12')} scale={1} y={-20} drift={[1.06, 1]} />
        </AbsoluteFill>
        <GoldFramePanel at={at(ctaIn) - 2} top={1218} width={920} height={272} radius={26}>
          <KineticText
            id="cta"
            style={{position: 'relative'}}
            lines={[
              {words: words('GET YOUR QUOTE TODAY', ['QUOTE']), at: at(ctaIn), size: 82, font: 'condensed', stagger: 4, lineHeight: 1.05, tracking: [0.16, 0.02]},
              {words: words('EXCELLENCE PUNCH CUSTOM FACTORY'), at: at(word(20, 'excellence')), size: 34, font: 'sans', weight: 800, stagger: 2, lineHeight: 1.7, tracking: [0.16, 0.04]},
            ]}
          />
        </GoldFramePanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
