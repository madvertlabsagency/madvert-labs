import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../brand';
import {easeInOut, mix, prog} from '../motion';
import {useTheme} from '../theme';

type Props = {
  /** Conformed segment path inside public/, e.g. segments/ad02/s1.mp4 (exact length, 30 fps). */
  src: string;
  /** Static framing: scale about centre and vertical offset (px) to keep the face clear of type. */
  scale?: number;
  y?: number;
  /** Slow push across the whole shot (multiplies `scale`). */
  drift?: [number, number];
  /** Point (px in the 1080x1920 frame) that scale/drift zoom into. Defaults to centre. */
  origin?: {x: number; y: number};
  /** Legibility shading behind type, 0–1. */
  shadeTop?: number;
  shadeBottom?: number;
  /** Extra transform/filter injected by a transition. */
  fx?: React.CSSProperties;
  fxFilter?: string;
};

/**
 * A conformed shot with the
 * campaign grade: gentle contrast/saturation, teal-navy shadows, warm
 * highlights, vignette and optional shading where type sits.
 */
export const Footage: React.FC<Props> = ({
  src,
  scale = 1,
  y = 0,
  drift = [1, 1.04],
  origin,
  shadeTop = 0,
  shadeBottom = 0,
  fx,
  fxFilter,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const theme = useTheme();
  const d = mix(drift[0], drift[1], prog(frame, 0, durationInFrames, easeInOut));
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: theme.base, ...fx}}>
      <AbsoluteFill style={{filter: fxFilter}}>
        <AbsoluteFill
          style={{
            transform: `translateY(${y}px) scale(${scale * d})`,
            transformOrigin: origin ? `${origin.x}px ${origin.y}px` : undefined,
            filter: 'contrast(1.07) saturate(1.1) brightness(1.01)',
          }}
        >
          <OffthreadVideo muted src={staticFile(src)} style={{width: '100%', height: '100%'}} />
        </AbsoluteFill>
        {/* split-tone: cool teal-navy into the shadows, warmth stays in the thread colours */}
        <AbsoluteFill style={{background: theme.tint, mixBlendMode: 'soft-light'}} />
        <AbsoluteFill
          style={{background: theme.vignette}}
        />
        {shadeTop > 0 && (
          <AbsoluteFill
            style={{
              background: `linear-gradient(180deg, rgba(${theme.shadeRgb},${0.86 * shadeTop}) 0%, rgba(${theme.shadeRgb},${0.55 * shadeTop}) 22%, rgba(${theme.shadeRgb},0) 42%)`,
            }}
          />
        )}
        {shadeBottom > 0 && (
          <AbsoluteFill
            style={{
              background: `linear-gradient(0deg, rgba(${theme.shadeRgb},${0.9 * shadeBottom}) 0%, rgba(${theme.shadeRgb},${0.62 * shadeBottom}) 26%, rgba(${theme.shadeRgb},0) 48%)`,
            }}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
