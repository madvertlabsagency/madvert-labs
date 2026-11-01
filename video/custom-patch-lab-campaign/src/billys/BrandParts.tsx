import React from 'react';
import {Img, staticFile, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeInOut, easeOut, mix, prog} from '../shared/motion';
import {B, PRISM} from './brand';

/**
 * The supplied Billys logo, unaltered, on its own white background: a rounded
 * white plate (the logo is black + colour artwork, so it needs a light ground
 * on the navy video). Springs in with a light sweep.
 */
export const LogoPlate: React.FC<{at: number; width: number; top: number}> = ({at, width, top}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 14, stiffness: 130, mass: 0.9}});
  const sweep = prog(f, at + 22, 22, easeInOut);
  const h = width * (165 / 374) + 44;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 540 - (width + 60) / 2,
        width: width + 60,
        height: h,
        borderRadius: 30,
        background: '#FFFFFF',
        boxShadow: '0 26px 60px rgba(0,0,0,0.5), 0 0 0 4px rgba(0,194,255,0.35)',
        transform: `scale(${mix(0.6, 1, s)}) translateY(${(1 - s) * 40}px)`,
        opacity: Math.min(1, s * 1.6),
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Img src={staticFile('brand/billys-logo.png')} style={{width, display: 'block'}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(110deg, transparent ${mix(-40, 100, sweep)}%, rgba(255,255,255,0.65) ${mix(-30, 110, sweep)}%, transparent ${mix(-20, 120, sweep)}%)`,
          opacity: sweep > 0 && sweep < 1 ? 1 : 0,
        }}
      />
      {/* prism base strip */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, display: 'flex'}}>
        {PRISM.map((c) => (
          <div key={c} style={{flex: 1, background: c}} />
        ))}
      </div>
    </div>
  );
};

/**
 * Prism wave / ribbon (brand element): four colour bands sweeping across on a
 * shared curve, drawing on with a stagger. `flip` mirrors it.
 */
export const PrismRibbon: React.FC<{at: number; top: number; dur?: number; flip?: boolean; opacity?: number; thickness?: number}> = ({
  at,
  top,
  dur = 22,
  flip,
  opacity = 1,
  thickness = 26,
}) => {
  const f = useCurrentFrame();
  const drift = (f - at) * 0.6;
  return (
    <svg width={1080} height={420} viewBox="0 0 1080 420" style={{position: 'absolute', left: 0, top, opacity, transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible'}}>
      {[...PRISM, B.purple].map((c, i) => {
        const p = prog(f, at + i * 3, dur, easeOut);
        const y = 60 + i * (thickness - 2);
        const d = `M -60 ${y + 260} C 240 ${y + 220 - drift * 0.2}, 520 ${y - 40}, 1140 ${y - 60 + drift * 0.1}`;
        return (
          <path
            key={c}
            d={d}
            fill="none"
            stroke={c}
            strokeWidth={thickness}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - p}
            style={{filter: `drop-shadow(0 0 10px ${c}88)`}}
          />
        );
      })}
    </svg>
  );
};

/** Slanted multi-panel prism blocks (brand element), popping in left to right. */
export const PrismPanels: React.FC<{at: number; top: number; size?: number}> = ({at, top, size = 70}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14}}>
      {PRISM.map((c, i) => {
        const p = prog(f, at + i * 3, 10, easeOut);
        return (
          <div
            key={c}
            style={{
              width: size * 1.6,
              height: size,
              borderRadius: 12,
              background: `linear-gradient(160deg, ${c}, ${c}AA)`,
              transform: `skewX(-18deg) translateY(${(1 - p) * 40}px)`,
              opacity: p,
              boxShadow: `0 10px 26px ${c}55, inset 0 2px 0 rgba(255,255,255,0.35)`,
            }}
          />
        );
      })}
    </div>
  );
};
