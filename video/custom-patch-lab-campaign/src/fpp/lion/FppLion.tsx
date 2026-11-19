import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Themed} from '../../shared/theme';
import {BlueprintGrid, NavyField, SpeedStreaks} from '../../shared/components/BrandBackdrop';
import {FilmGrain} from '../../shared/components/FilmGrain';
import {Footage} from '../../shared/components/Footage';
import {GoldFramePanel} from '../../shared/components/GoldFramePanel';
import {GoldRule} from '../../shared/components/GoldRule';
import {KineticText, words} from '../../shared/components/KineticText';
import {MotionBlur} from '../../shared/components/MotionBlur';
import {DiagonalReveal, WipeStreaks} from '../../shared/components/Transitions';
import edl from '../../ad01/edl.json';
import {FPP, FPP_AD_THEME, FPP_BRAND} from '../brand';
import {easeIn, easeInOut, easeOut, mix, prog} from '../../shared/motion';
import {CubeLines} from '../../markhor/hyper';

const shot = (id: string) => {
  const s = edl.shots.find((x) => x.id === id);
  if (!s) throw new Error(`Shot ${id} missing from edl.json`);
  return s;
};

/* ------------------------------------------------------------------ cut points
 * 120 BPM → 15 frames per beat. Every cut sits on a kick or snare of the score
 * (scripts/sound-design.py uses the same seconds).                            */
const CUT_1 = 90; // 3.0 s  speed-ramp punch, macro → reveal
const CUT_2 = 180; // 6.0 s  vertical whip → gloved hands
const CUT_3 = 270; // 9.0 s  cream light-streak wipe → jacket
const CUT_4 = 360; // 12.0 s speed-ramp punch → lifestyle
const CUT_5 = 450; // 15.0 s navy diagonal wipe → benefit
const CUT_6 = 480; // 16.0 s logo reveal / outro

/* Future PVC Patch — Ad 01 (lion, no voiceover). Same edit, footage, timing and
 * daf beat as the Custom Patch Lab / Billys / EPCF Ad 01, with new on-screen copy
 * (no guarantee line) and the FPP brand layer (FPP_AD_THEME, logo on a white tile). */
export const FppLion: React.FC = () => (
  <Themed theme={FPP_AD_THEME}>
    <Ad />
  </Themed>
);

const Ad: React.FC = () => {
  const f = useCurrentFrame();

  // T1 — zoom punch through the cut at 3.0 s
  const t1Out = prog(f, CUT_1 - 8, 8, easeIn);
  const t1In = prog(f, CUT_1, 9, easeOut);
  // T2 — vertical whip (both shots on screen for 10 frames)
  const t2 = prog(f, CUT_2 - 5, 10, easeInOut);
  const t2Blur = Math.sin(Math.PI * t2) * 55;
  // T3 — light-streak wipe left → right
  const t3 = prog(f, CUT_3 - 5, 11, easeInOut);
  const t3Edge = mix(-260, 1340, t3);
  // T4 — punch into the lifestyle reveal
  const t4 = prog(f, CUT_4, 8, easeOut);
  // T5 — diagonal navy wipe with a gold edge
  const t5 = prog(f, CUT_5 - 4, 10, easeInOut);

  // exposure pops on the two speed-ramp punches
  const pop = (cut: number, peak: number, len: number) =>
    f < cut - 2 ? 0 : peak * prog(f, cut - 2, 2) * (1 - prog(f, cut, len));
  const flash = Math.max(pop(CUT_1, 0.38, 7), pop(CUT_4, 0.2, 6));

  return (
    <AbsoluteFill style={{background: '#070F26'}}>
      <MotionBlur id="t1out" x={t1Out * 9} y={t1Out * 9} />
      <MotionBlur id="t1in" x={(1 - t1In) * 9} y={(1 - t1In) * 9} />
      <MotionBlur id="t2" x={0} y={t2Blur} />
      <MotionBlur id="t3" x={Math.sin(Math.PI * t3) * 40} y={0} />
      <MotionBlur id="t4" x={(1 - t4) * 5} y={(1 - t4) * 5} />

      {/* ------------------------------------------------ 0–3 s  extreme macro */}
      <Sequence from={shot('s1').from} durationInFrames={shot('s1').frames} name="S1 Macro">
        <Footage
          src="segments/ad01/s1.mp4"
          scale={1.15}
          y={100}
          drift={[1, 1.06]}
          shadeTop={1}
          fx={{transform: `scale(${1 + 0.2 * t1Out})`}}
          fxFilter={t1Out > 0.01 ? 'url(#t1out)' : undefined}
        />
        <KineticText
          id="s1"
          style={{top: 262}}
          exitAt={74}
          lines={[
            {words: words('MAKE IT'), at: 13, size: 112, stagger: 4},
            {words: words('IMPOSSIBLE'), at: 21, size: 100},
            {words: words('TO MISS.', true), at: 29, size: 124, tracking: [0.16, 0.02]},
          ]}
        />
        <GoldRule at={38} top={660} width={200} exitAt={74} />
      </Sequence>

      {/* ------------------------------------------------ 3–6 s  full reveal */}
      <Sequence from={shot('s2').from} durationInFrames={shot('s2').frames} name="S2 Reveal">
        <Footage
          src="segments/ad01/s2.mp4"
          scale={1.12}
          y={-105}
          drift={[1.03, 1]}
          shadeBottom={prog(f, 110, 20)}
          fx={{
            transform: `scale(${1.14 - 0.14 * t1In}) translateY(${-t2 * 1920}px)`,
          }}
          fxFilter={t1In < 0.99 ? 'url(#t1in)' : t2 > 0.01 ? 'url(#t2)' : undefined}
        />
        <KineticText
          id="s2"
          style={{top: 1262}}
          exitAt={78}
          lines={[
            {words: words('BOLD', true), at: 36, size: 50, font: 'sans', weight: 800, tracking: [0.75, 0.34]},
            {words: words('FROM EVERY ANGLE.'), at: 42, size: 76, stagger: 5, lineHeight: 1.25},
          ]}
        />
        <GoldRule at={52} top={1458} width={260} exitAt={78} />
      </Sequence>

      {/* ------------------------------------------------ 6–9 s  gloved hands */}
      <Sequence from={shot('s3').from} durationInFrames={shot('s3').frames} name="S3 Hands">
        <Footage
          src="segments/ad01/s3.mp4"
          scale={1.12}
          y={150}
          drift={[1, 1.05]}
          shadeTop={1}
          fx={{
            transform: `translateY(${(1 - t2) * 1920}px) translateX(${t3 * 90}px)`,
          }}
          fxFilter={t2 > 0 && t2 < 0.99 ? 'url(#t2)' : t3 > 0.01 ? 'url(#t3)' : undefined}
        />
        <KineticText
          id="s3"
          style={{top: 238}}
          exitAt={86}
          lines={[
            {words: words('EVERY'), at: 20, size: 116, tracking: [0.22, 0.04]},
            {words: words('EDGE. SHARP.', ['SHARP.']), at: 28, size: 84, stagger: 4, lineHeight: 1.12},
          ]}
        />
      </Sequence>

      {/* ------------------------------------------------ 9–12 s  varsity jacket */}
      <Sequence from={shot('s4').from} durationInFrames={shot('s4').frames} name="S4 Jacket">
        <AbsoluteFill
          style={{
            WebkitMaskImage: `linear-gradient(90deg, #000 ${t3Edge - 140}px, transparent ${t3Edge + 40}px)`,
            maskImage: `linear-gradient(90deg, #000 ${t3Edge - 140}px, transparent ${t3Edge + 40}px)`,
          }}
        >
          <Footage
            src="segments/ad01/s4.mp4"
            scale={1.1}
            y={-92}
            drift={[1, 1.03]}
            shadeBottom={prog(f, 290, 20)}
            fx={{transform: `translateX(${(1 - t3) * -90}px)`}}
            fxFilter={t3 > 0 && t3 < 0.99 ? 'url(#t3)' : undefined}
          />
        </AbsoluteFill>
        <KineticText
          id="s4"
          style={{top: 1240}}
          exitAt={83}
          lines={[
            {words: words('YOUR VISION.'), at: 35, size: 84, stagger: 4, lineHeight: 1.1},
            {words: words('MADE REAL.', true), at: 50, size: 108, stagger: 5, tracking: [0.14, 0.02]},
          ]}
        />
        <GoldRule at={60} top={1478} width={220} exitAt={83} />
      </Sequence>

      {/* light streaks riding the T3 wipe edge */}
      {t3 > 0 && t3 < 1 && <WipeStreaks edge={t3Edge} strength={Math.sin(Math.PI * t3)} />}

      {/* ------------------------------------------------ 12–15 s  lifestyle */}
      <Sequence from={shot('s5').from} durationInFrames={shot('s5').frames} name="S5 Lifestyle">
        <Footage
          src="segments/ad01/s5.mp4"
          scale={1.05}
          y={-46}
          drift={[1, 1.04]}
          shadeBottom={1}
          fx={{transform: `scale(${1.07 - 0.07 * t4})`}}
          fxFilter={t4 < 0.99 ? 'url(#t4)' : undefined}
        />
        <KineticText
          id="s5"
          style={{top: 1128}}
          exitAt={84}
          exit="blur"
          lines={[
            {words: words('WEAR'), at: 15, size: 96, tracking: [0.3, 0.06]},
            {words: words('YOUR'), at: 21, size: 96, lineHeight: 1.04},
            {words: words('IDENTITY.', true), at: 28, size: 112, lineHeight: 1.04},
          ]}
        />
      </Sequence>

      {flash > 0.001 && (
        <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #E6F8FF, ${FPP.cyan} 70%)`, opacity: flash, mixBlendMode: 'screen'}} />
      )}

      {/* ------------------------------------------------ 15–19 s  branded close */}
      <Sequence from={CUT_5 - 4} durationInFrames={edl.durationInFrames - CUT_5 + 4} name="Brand layer">
        <DiagonalReveal p={t5}>
          <BrandClose />
        </DiagonalReveal>
      </Sequence>

      <FilmGrain />
      <Audio src={staticFile('audio/fpp-lion-mix.wav')} />
    </AbsoluteFill>
  );
};

/** 15–19 s: benefit beat (design-02 language) handing over to the outro (design-03). Local frame 0 = 446. */
const BrandClose: React.FC = () => {
  const f = useCurrentFrame() + CUT_5 - 4; // back to global frames for readability
  const patchIn = prog(f, CUT_5 - 2, 16, easeOut);
  const patchOut = prog(f, CUT_6 - 8, 9, easeIn);
  const outroZoom = mix(1, 1.025, prog(f, CUT_6, 90, easeInOut));
  return (
    <AbsoluteFill>
      <NavyField />
      <Sequence from={0} name="Benefit grid">
        <BlueprintGrid at={4} top={420} height={600} opacity={1 - prog(f, CUT_6 - 4, 10)} />
      </Sequence>
      <Sequence from={0} name="Streaks">
        <SpeedStreaks
          seed="close"
          at={0}
          speed={16}
          bands={[
            {y: 470, side: 'right'},
            {y: 930, side: 'left'},
            {y: 1260, side: 'left'},
          ]}
          opacity={0.75}
        />
      </Sequence>

      {/* benefit beat, 15–16 s */}
      <MotionBlur id="patchblur" x={(1 - patchIn) * 14 + patchOut * 20} y={(1 - patchIn) * 8 + patchOut * 14} />
      <Img
        src={staticFile('brand/lion-patch.png')}
        style={{
          position: 'absolute',
          width: 880,
          left: 300,
          top: 1010,
          transform: `translate(${(1 - patchIn) * 320 + patchOut * 520}px, ${(1 - patchIn) * 300 + patchOut * 420}px) rotate(${mix(9, -4, patchIn)}deg)`,
          filter: `${patchIn < 0.99 || patchOut > 0.01 ? 'url(#patchblur) ' : ''}drop-shadow(0 40px 60px rgba(0,0,0,0.6))`,
          opacity: 1 - prog(f, CUT_6 - 3, 4),
        }}
      />
      <Sequence from={0} durationInFrames={CUT_6 + 6 - (CUT_5 - 4)} name="Benefit pill">
        <BenefitPill />
      </Sequence>

      {/* outro, 16–19 s — design-03 */}
      <Sequence from={CUT_6 - (CUT_5 - 4)} name="Outro">
        <AbsoluteFill style={{transform: `scale(${outroZoom})`}}>
          <Outro />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const BenefitPill: React.FC = () => (
  <GoldFramePanel at={6} top={560} width={800} height={316} exitAt={30}>
    <KineticText
      id="benefit"
      style={{position: 'relative'}}
      lines={[
        {words: words('YOUR BRAND,'), at: 10, size: 70, stagger: 3, lineHeight: 1.1},
        {words: words('ELEVATED.', true), at: 14, size: 82, stagger: 3, lineHeight: 1.1},
      ]}
    />
  </GoldFramePanel>
);

/** The supplied FPP logo, unaltered, on a white rounded tile (it is delivered on white), with a cube-outline ripple. */
const LogoTile: React.FC<{at: number; size: number; top: number}> = ({at, size, top}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 14, stiffness: 120, mass: 0.9}});
  const ring = prog(f, at + 2, 26, easeOut);
  const sweep = prog(f, at + 48, 22);
  return (
    <div style={{position: 'absolute', top, left: 540 - size / 2, width: size, height: size}}>
      <div style={{position: 'absolute', left: -size * 0.14, top: -size * 0.14, opacity: (1 - ring) * 0.9, transform: `scale(${mix(0.9, 1.25, ring)})`}}>
        <CubeLines size={size * 1.28} color={FPP.cyan} width={4} draw={ring} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: size * 0.13,
          overflow: 'hidden',
          background: '#FFFFFF',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 4px rgba(3,150,201,0.45), 0 0 50px rgba(3,150,201,0.35)',
          transform: `scale(${mix(0.55, 1, s)}) rotate(${mix(-10, 0, s)}deg)`,
          opacity: prog(f, at, 10),
        }}
      >
        <Img src={staticFile(FPP_BRAND.logo)} style={{width: '100%', height: '100%', display: 'block'}} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, rgba(255,255,255,0) ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.6) ${mix(-30, 110, sweep)}%, rgba(255,255,255,0) ${mix(-20, 120, sweep)}%)`,
            opacity: sweep > 0 && sweep < 1 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

/** Local frame 0 = 16.0 s. Logo → name → CTA, each on a beat. */
const Outro: React.FC = () => (
  <AbsoluteFill>
    <BlueprintGrid at={4} top={660} height={360} opacity={0.6} />
    <LogoTile at={0} size={420} top={190} />
    <KineticText
      id="name"
      style={{top: 690}}
      lines={[
        {words: words('FUTURE PVC PATCH'), at: 12, size: 66, font: 'sans', weight: 900, stagger: 3, tracking: [0.4, 0.12]},
        {words: words('CUSTOM PATCHES.', ['PATCHES.']), at: 19, size: 84, stagger: 4, lineHeight: 1.25, tracking: [0.14, 0.02]},
      ]}
    />
    <GoldFramePanel at={26} top={1000} width={880} height={380}>
      <KineticText
        id="cta"
        style={{position: 'relative'}}
        lines={[
          {words: words('GET YOUR'), at: 30, size: 62, stagger: 4, lineHeight: 1.12},
          {words: words('CUSTOM QUOTE', true), at: 38, size: 86, stagger: 4, lineHeight: 1.12},
          {words: words(FPP_BRAND.domain.toUpperCase()), at: 46, size: 38, font: 'sans', weight: 800, stagger: 2, lineHeight: 1.6, tracking: [0.2, 0.06]},
        ]}
      />
    </GoldFramePanel>
  </AbsoluteFill>
);
