import type {Theme} from '../shared/theme';
import {CPL_THEME} from '../shared/theme';

// EPCF — Excellence Punch Custom Factory. Taken from the supplied logo:
// emerald green field, polished gold ring and crown, ivory serif lettering.
export const E = {
  emerald: '#0E6B36',
  emeraldDeep: '#063A1D',
  black: '#050806',
  gold: '#D4AF37',
  goldLight: '#F3DC8A',
  goldDark: '#9C7A1E',
  ivory: '#F7F1DE',
} as const;

export const FONT_SERIF = 'Cinzel, "Fraunces", Georgia, serif';
export const FONT_SANS_E = 'Montserrat, Arial, sans-serif';

// Shown on the end card. Empty until the client gives us their website.
export const URL: string = '';

export const EPCF_THEME: Theme = {
  ...CPL_THEME,
  text: E.ivory,
  displayFont: FONT_SERIF,
  displayAxes: undefined,
  displayWeight: 700,
  condensedFont: FONT_SERIF,
  accent: `linear-gradient(180deg, ${E.goldLight} 0%, ${E.gold} 50%, ${E.goldDark} 100%)`,
  rule: `linear-gradient(90deg, rgba(212,175,55,0) 0%, ${E.gold} 18%, ${E.goldLight} 50%, ${E.gold} 82%, rgba(212,175,55,0) 100%)`,
  ruleGlow: 'rgba(212,175,55,0.55)',
  panelFill: 'linear-gradient(180deg, rgba(14,90,46,0.94), rgba(5,40,20,0.96))',
  panelStroke: [E.goldLight, E.gold, E.goldDark],
  panelGlowRgb: '212,175,55',
  panelGlint: 'rgba(243,220,138,0.95)',
  field: `radial-gradient(70% 40% at 50% 26%, rgba(40,150,80,0.55) 0%, rgba(14,107,54,0.35) 45%, rgba(6,58,29,0) 75%),
        radial-gradient(120% 70% at 50% 100%, rgba(212,175,55,0.10) 0%, rgba(6,58,29,0) 60%),
        linear-gradient(180deg, #0A4A26 0%, ${E.emeraldDeep} 55%, #031A0D 100%)`,
  fieldVignette: 'radial-gradient(130% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(1,8,4,0.6) 100%)',
  gridLine: '#C9A84A',
  mark: E.gold,
  markGlow: 'rgba(212,175,55,0.8)',
  streakA: 'linear-gradient(90deg, rgba(243,220,138,0), rgba(243,220,138,0.85), rgba(243,220,138,0))',
  streakB: 'linear-gradient(90deg, rgba(14,107,54,0), rgba(60,180,100,0.6), rgba(14,107,54,0))',
  wipeGlow: 'linear-gradient(90deg, rgba(243,220,138,0), rgba(243,220,138,0.5), rgba(243,220,138,0))',
  wipeBar: 'linear-gradient(90deg, rgba(243,220,138,0), rgba(243,220,138,0.95))',
  edge: E.gold,
  edgeGlow: 'rgba(212,175,55,0.9)',
  base: '#031A0D',
  tint: 'linear-gradient(180deg, rgba(14,107,54,0.14), rgba(6,58,29,0.2))',
  vignette: 'radial-gradient(120% 75% at 50% 46%, rgba(0,0,0,0) 55%, rgba(2,14,7,0.62) 100%)',
  shadeRgb: '4,26,14',
  iconA: `linear-gradient(160deg, ${E.emerald}, ${E.emeraldDeep})`,
  iconB: `linear-gradient(160deg, ${E.gold}, ${E.goldDark})`,
  bar: `linear-gradient(180deg, ${E.goldLight}, ${E.gold} 55%, ${E.goldDark})`,
  key: E.gold,
};
