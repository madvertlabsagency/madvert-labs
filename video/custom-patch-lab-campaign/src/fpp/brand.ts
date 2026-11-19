import {CPL_THEME, type Theme} from '../shared/theme';
import type {Brand} from '../markhor/hyper';

/**
 * Future PVC Patch — brand system, derived from the supplied logo (an isometric
 * hexagon cube in an indigo → cyan gradient on white; no wordmark).
 *  - Colours sampled from the logo: indigo #1E3980 → blue #1363A2 → cyan #0396C9.
 *  - Type: Montserrat ExtraBold, upright, geometric (Markhor uses slanted Manrope).
 *  - Highlights and CTAs use hexagon-pointed shapes; light cube-outline motif.
 *  - Logo: the supplied file, unaltered, on a white rounded tile; the name is
 *    typeset next to it because the logo has no wordmark.
 */
export const FPP = {
  navy: '#1E3980',
  royal: '#1363A2',
  cyan: '#0396C9',
  white: '#FFFFFF',
  light: '#EAF4FA',
  deep: '#0C1838',
} as const;

export const FPP_BRAND: Brand = {
  c: FPP,
  font: 'Montserrat, Inter, Arial, sans-serif',
  weight: 800,
  slant: 0,
  tracking: '0.005em',
  strip: 'hex',
  stripGradient: `linear-gradient(90deg, ${FPP.navy} 0%, ${FPP.royal} 50%, ${FPP.cyan} 100%)`,
  logo: 'brand/fpp-logo.jpg',
  logoTile: true,
  name: 'FUTURE PVC PATCH',
  url: 'www.futurepvcpatch.com',
  domain: 'futurepvcpatch.com',
  motif: 'hex',
};

export const FPP_THEME: Theme = {
  ...CPL_THEME,
  base: FPP.deep,
  tint: 'linear-gradient(180deg, rgba(3,150,201,0.05), rgba(12,24,56,0.10))',
  vignette: 'radial-gradient(120% 78% at 50% 48%, rgba(0,0,0,0) 64%, rgba(12,24,56,0.4) 100%)',
  shadeRgb: '12,24,56',
};
