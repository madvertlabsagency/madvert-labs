import {CPL_THEME, type Theme} from '../shared/theme';

// Markhor Patches — ice-white / pale-blue / cyan field, deep-navy type.
export const M = {
  ice: '#F5FAFE',
  ice2: '#E4F1FB',
  pale: '#CBE5F7',
  cyan: '#1FC3F2',
  cyanDeep: '#0A9BD6',
  navy: '#0A1A3A',
  navy2: '#142C5C',
  white: '#FFFFFF',
} as const;

export const FONT_HEAD = 'Montserrat, Inter, Arial, sans-serif';
export const FONT_BODY = 'Manrope, Inter, Arial, sans-serif';
export const LOGO = 'brand/markhor-logo.png'; // supplied artwork, unaltered (1254×1254)

/** Footage grade: cool, clean, light vignette (dark footage). */
export const MARKHOR_THEME: Theme = {
  ...CPL_THEME,
  base: M.navy,
  tint: 'linear-gradient(180deg, rgba(140,205,240,0.08), rgba(10,26,58,0.12))',
  vignette: 'radial-gradient(120% 78% at 50% 48%, rgba(0,0,0,0) 62%, rgba(6,18,42,0.42) 100%)',
  shadeRgb: '6,18,42',
};

/** Grade for the ice-white studio footage: no darkening. */
export const MARKHOR_STUDIO_THEME: Theme = {
  ...MARKHOR_THEME,
  base: M.ice,
  tint: 'linear-gradient(180deg, rgba(200,230,250,0.06), rgba(200,230,250,0.06))',
  vignette: 'none',
};
