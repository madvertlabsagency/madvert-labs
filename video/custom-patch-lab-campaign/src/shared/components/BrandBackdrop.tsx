import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {C} from '../brand';
import {easeInOut, mix, prog} from '../motion';
import {useTheme} from '../theme';

/** Deep navy → teal field from the USP / outro styleframes, with a soft top light. */
export const NavyField: React.FC = () => {
  const theme = useTheme();
  return (
    <AbsoluteFill style={{background: theme.field}}>
      <AbsoluteFill style={{background: theme.fieldVignette}} />
    </AbsoluteFill>
  );
};

/**
 * Blueprint grid with red registration marks — the "lab" layer of the
 * styleframes. Lines draw in from the centre; marks pop on afterwards.
 */
export const BlueprintGrid: React.FC<{
  at: number;
  top: number;
  height: number;
  left?: number;
  width?: number;
  cell?: number;
  opacity?: number;
}> = ({at, top, height, left = 60, width = 960, cell = 60, opacity = 1}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const p = prog(frame, at, 28, easeInOut);
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const marks = [
    [0.16, 0.0],
    [0.92, 0.12],
    [0.08, 0.83],
    [0.84, 0.66],
  ];
  return (
    <svg
      width={1080}
      height={1920}
      style={{position: 'absolute', inset: 0, opacity}}
      viewBox="0 0 1080 1920"
    >
      <defs>
        <radialGradient id="gridFade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`gridMask-${top}-${height}`}>
          <rect x={left} y={top} width={width} height={height} fill="url(#gridFade)" />
        </mask>
      </defs>
      <g mask={`url(#gridMask-${top}-${height})`} stroke={theme.gridLine} strokeWidth={1} opacity={0.22}>
        {Array.from({length: cols + 1}, (_, i) => {
          const x = left + i * cell;
          const half = (height / 2) * p;
          return <line key={`v${i}`} x1={x} x2={x} y1={top + height / 2 - half} y2={top + height / 2 + half} />;
        })}
        {Array.from({length: rows + 1}, (_, i) => {
          const y = top + i * cell;
          const half = (width / 2) * p;
          return <line key={`h${i}`} y1={y} y2={y} x1={left + width / 2 - half} x2={left + width / 2 + half} />;
        })}
      </g>
      {/* red guide lines + registration diamonds */}
      {marks.map(([mx, my], i) => {
        const q = prog(frame, at + 12 + i * 3, 16);
        const x = left + Math.round((mx * width) / cell) * cell;
        const y = top + Math.round((my * height) / cell) * cell;
        const len = 150 * q;
        return (
          <g key={i} opacity={q}>
            <line x1={x} x2={x} y1={y - len} y2={y + len} stroke={theme.mark} strokeWidth={1.5} opacity={0.55} />
            <line x1={x - len} x2={x + len} y1={y} y2={y} stroke={theme.mark} strokeWidth={1.5} opacity={0.55} />
            <rect
              x={x - 5}
              y={y - 5}
              width={10}
              height={10}
              fill={theme.mark}
              transform={`rotate(45 ${x} ${y}) scale(1)`}
              style={{filter: `drop-shadow(0 0 6px ${theme.markGlow})`}}
            />
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Cream / teal speed streaks sliding across, as in the styleframes. `seed`
 * gives each use its own arrangement; `speed` in px/frame.
 */
export const SpeedStreaks: React.FC<{
  seed: string;
  at: number;
  bands: Array<{y: number; side: 'left' | 'right'}>;
  speed?: number;
  opacity?: number;
}> = ({seed, at, bands, speed = 14, opacity = 1}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const t = frame - at;
  const fadeIn = prog(frame, at, 10);
  return (
    <AbsoluteFill style={{opacity: opacity * fadeIn, pointerEvents: 'none'}}>
      {bands.flatMap((b, bi) =>
        Array.from({length: 4}, (_, k) => {
          const r = (n: string) => random(`${seed}-${bi}-${k}-${n}`);
          const w = mix(160, 420, r('w'));
          const h = mix(3, 10, r('h'));
          const dy = mix(-26, 26, r('y'));
          const travel = (t * speed * mix(0.6, 1.2, r('s')) + r('o') * 400) % 700;
          const x = b.side === 'left' ? -w - 80 + travel * 0.55 : 1080 + 80 - travel * 0.55;
          const cream = r('c') > 0.3;
          return (
            <div
              key={`${bi}-${k}`}
              style={{
                position: 'absolute',
                top: b.y + dy,
                left: x,
                width: w,
                height: h,
                borderRadius: h,
                background: cream
                  ? theme.streakA
                  : theme.streakB,
                filter: `blur(${mix(1.5, 5, r('b'))}px)`,
                opacity: mix(0.35, 0.9, r('a')),
              }}
            />
          );
        }),
      )}
    </AbsoluteFill>
  );
};
