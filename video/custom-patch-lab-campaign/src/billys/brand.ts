import type {Theme} from '../shared/theme';

// Billys Custom Patches — brand identity kit (Multi-Panel Prism).
export const B = {
  blue: '#075BC4',
  green: '#18A94A',
  yellow: '#FFC328',
  red: '#EE293A',
  navy: '#101331',
  navyDeep: '#0A0C24',
  purple: '#6931C7',
  white: '#F7F8FC',
  cyan: '#00C2FF',
} as const;

export const PRISM = [B.blue, B.green, B.yellow, B.red] as const;
export const FONT_HEAD = '"Bebas Neue", Oswald, sans-serif';
export const FONT_SUB = 'Montserrat, Arial, sans-serif';
export const FONT_BODY_B = 'Manrope, Inter, Arial, sans-serif';
export const URL = 'billyscustompatches.com';

// Offers that appeared in the Custom Patch Lab version but are NOT confirmed for
// Billys. Flip only after the client confirms them in writing.
export const CLAIMS = {
  freeMockup24h: false,
} as const;

export const BILLYS_THEME: Theme = {
  text: B.white,
  displayFont: FONT_HEAD,
  displayAxes: undefined,
  displayWeight: 400,
  condensedFont: FONT_HEAD,
  iconA: `linear-gradient(160deg, ${B.blue}, #0A3F8C)`,
  iconB: `linear-gradient(160deg, ${B.red}, #A8162A)`,
  bar: `linear-gradient(90deg, ${B.blue}, ${B.green} 33%, ${B.yellow} 66%, ${B.red})`,
  key: B.yellow,
  accent: 'linear-gradient(180deg, #FFE27A 0%, #FFC328 50%, #F59E0B 100%)',
  rule: `linear-gradient(90deg, rgba(7,91,196,0) 0%, ${B.blue} 14%, ${B.green} 38%, ${B.yellow} 62%, ${B.red} 86%, rgba(238,41,58,0) 100%)`,
  ruleGlow: 'rgba(0,194,255,0.45)',
  panelFill: 'linear-gradient(180deg, rgba(24,26,78,0.94), rgba(12,13,40,0.96))',
  panelStroke: [B.cyan, B.yellow, B.red],
  panelGlowRgb: '0,194,255',
  panelGlint: 'rgba(0,194,255,0.9)',
  field: `radial-gradient(85% 45% at 50% 22%, rgba(105,49,199,0.55) 0%, rgba(7,91,196,0.35) 40%, rgba(16,19,49,0) 75%),
        radial-gradient(120% 70% at 50% 100%, rgba(0,194,255,0.14) 0%, rgba(16,19,49,0) 60%),
        linear-gradient(180deg, #14184A 0%, ${B.navy} 55%, ${B.navyDeep} 100%)`,
  fieldVignette: 'radial-gradient(130% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(5,6,20,0.6) 100%)',
  gridLine: '#6F8CFF',
  mark: B.red,
  markGlow: 'rgba(238,41,58,0.8)',
  streakA: 'linear-gradient(90deg, rgba(255,195,40,0), rgba(255,195,40,0.85), rgba(255,195,40,0))',
  streakB: 'linear-gradient(90deg, rgba(0,194,255,0), rgba(0,194,255,0.7), rgba(0,194,255,0))',
  wipeGlow: 'linear-gradient(90deg, rgba(0,194,255,0), rgba(0,194,255,0.45), rgba(0,194,255,0))',
  wipeBar: `linear-gradient(90deg, rgba(7,91,196,0), ${B.blue}, ${B.green}, ${B.yellow}, ${B.red})`,
  edge: B.yellow,
  edgeGlow: 'rgba(255,195,40,0.9)',
  base: B.navyDeep,
  tint: 'linear-gradient(180deg, rgba(105,49,199,0.14), rgba(7,91,196,0.18))',
  vignette: 'radial-gradient(120% 75% at 50% 46%, rgba(0,0,0,0) 55%, rgba(6,7,24,0.62) 100%)',
  shadeRgb: '10,12,36',
};
