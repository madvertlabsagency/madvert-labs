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

/**
 * Theme for the shared ad components (Lion / Eagle / Tiger ad family):
 * Montserrat display type, white text with cyan-gradient accent words,
 * deep-indigo field with blue/cyan light, cyan rules, edges and streaks.
 */
export const FPP_AD_THEME: Theme = {
  ...CPL_THEME,
  text: FPP.white,
  displayFont: 'Montserrat, Inter, Arial, sans-serif',
  displayAxes: undefined,
  displayWeight: 800,
  condensedFont: 'Montserrat, Inter, Arial, sans-serif',
  iconA: `linear-gradient(160deg, ${FPP.royal}, ${FPP.navy})`,
  iconB: `linear-gradient(160deg, ${FPP.cyan}, ${FPP.royal})`,
  bar: `linear-gradient(180deg, #6FD3F4, ${FPP.cyan} 55%, ${FPP.royal})`,
  key: '#5CCBF0',
  accent: 'linear-gradient(180deg, #A9E7FA 0%, #39B9E8 45%, #0396C9 75%, #1A6FB5 100%)',
  rule: `linear-gradient(90deg, rgba(3,150,201,0) 0%, ${FPP.royal} 16%, ${FPP.cyan} 50%, ${FPP.royal} 84%, rgba(3,150,201,0) 100%)`,
  ruleGlow: 'rgba(3,150,201,0.55)',
  panelFill: 'linear-gradient(180deg, rgba(30,57,128,0.94), rgba(12,24,56,0.97))',
  panelStroke: ['#8FDDF7', FPP.cyan, FPP.royal],
  panelGlowRgb: '3,150,201',
  panelGlint: 'rgba(170,232,250,0.95)',
  field: `radial-gradient(70% 40% at 50% 26%, rgba(19,99,162,0.65) 0%, rgba(30,57,128,0.4) 45%, rgba(12,24,56,0) 75%),
        radial-gradient(120% 70% at 50% 100%, rgba(3,150,201,0.18) 0%, rgba(12,24,56,0) 60%),
        linear-gradient(180deg, #16296A 0%, ${FPP.deep} 58%, #070F26 100%)`,
  fieldVignette: 'radial-gradient(130% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(4,8,22,0.6) 100%)',
  gridLine: '#3FA9D6',
  mark: FPP.cyan,
  markGlow: 'rgba(3,150,201,0.85)',
  streakA: 'linear-gradient(90deg, rgba(150,225,250,0), rgba(150,225,250,0.85), rgba(150,225,250,0))',
  streakB: 'linear-gradient(90deg, rgba(19,99,162,0), rgba(40,130,210,0.6), rgba(19,99,162,0))',
  wipeGlow: 'linear-gradient(90deg, rgba(150,225,250,0), rgba(150,225,250,0.5), rgba(150,225,250,0))',
  wipeBar: 'linear-gradient(90deg, rgba(150,225,250,0), rgba(150,225,250,0.95))',
  edge: FPP.cyan,
  edgeGlow: 'rgba(3,150,201,0.9)',
  base: '#070F26',
  tint: 'linear-gradient(180deg, rgba(19,99,162,0.12), rgba(12,24,56,0.2))',
  vignette: 'radial-gradient(120% 75% at 50% 46%, rgba(0,0,0,0) 55%, rgba(4,8,22,0.62) 100%)',
  shadeRgb: '12,24,56',
};
