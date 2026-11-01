import React, {createContext, useContext} from 'react';
import {C, DISPLAY_AXES, FONT_CONDENSED, FONT_DISPLAY, GOLD_GRADIENT, GOLD_LINE} from './brand';

/**
 * Visual theme for the shared motion components. The default is the Custom
 * Patch Lab look (values identical to what the components used before), so
 * existing ads render unchanged; a different brand wraps its composition in
 * <ThemeProvider value={...}>.
 */
export type Theme = {
  text: string;
  displayFont: string;
  displayAxes?: string;
  displayWeight: number;
  /** 'condensed' headline font (Ads 02–03 style) and benefit-badge type. */
  condensedFont: string;
  /** Benefit-badge medallion fills and the solid accent bar. */
  iconA: string;
  iconB: string;
  bar: string;
  /** Highlight colour for key words in word captions. */
  key: string;
  /** Gradient used for accent words (text clip). */
  accent: string;
  /** Horizontal accent rule gradient + its glow colour. */
  rule: string;
  ruleGlow: string;
  /** Panel fill gradient, stroke gradient stops, glow rgb and inner edge-glint colour. */
  panelFill: string;
  panelStroke: [string, string, string];
  panelGlowRgb: string;
  panelGlint: string;
  /** Background field. */
  field: string;
  fieldVignette: string;
  gridLine: string;
  mark: string;
  markGlow: string;
  streakA: string;
  streakB: string;
  wipeGlow: string;
  wipeBar: string;
  edge: string;
  edgeGlow: string;
  /** Footage grade. */
  base: string;
  tint: string;
  vignette: string;
  shadeRgb: string;
};

export const CPL_THEME: Theme = {
  text: C.text,
  displayFont: FONT_DISPLAY,
  displayAxes: DISPLAY_AXES,
  displayWeight: 760,
  condensedFont: FONT_CONDENSED,
  iconA: `linear-gradient(160deg, ${C.teal}, #0A5560)`,
  iconB: `linear-gradient(160deg, ${C.orange}, #C9471F)`,
  bar: `linear-gradient(180deg, #FF7A45, ${C.orange} 55%, #D9501F)`,
  key: C.mustard,
  accent: GOLD_GRADIENT,
  rule: GOLD_LINE,
  ruleGlow: 'rgba(244,185,66,0.55)',
  panelFill: 'linear-gradient(180deg, rgba(10,52,65,0.94), rgba(5,32,42,0.96))',
  panelStroke: ['#FFE29A', '#F4B942', '#D98A2B'],
  panelGlowRgb: '244,185,66',
  panelGlint: 'rgba(255,226,154,0.95)',
  field: `radial-gradient(85% 45% at 50% 22%, rgba(18,92,108,0.85) 0%, rgba(10,58,72,0.6) 40%, rgba(8,46,59,0) 75%),
        radial-gradient(120% 70% at 50% 100%, rgba(15,124,138,0.18) 0%, rgba(8,46,59,0) 60%),
        linear-gradient(180deg, ${C.navy} 0%, #072a35 55%, ${C.navyDeep} 100%)`,
  fieldVignette: 'radial-gradient(130% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(2,14,19,0.55) 100%)',
  gridLine: '#8FB7BE',
  mark: C.red,
  markGlow: 'rgba(230,57,70,0.8)',
  streakA: 'linear-gradient(90deg, rgba(255,249,243,0), rgba(255,249,243,0.85), rgba(255,249,243,0))',
  streakB: 'linear-gradient(90deg, rgba(15,124,138,0), rgba(120,200,210,0.6), rgba(15,124,138,0))',
  wipeGlow: 'linear-gradient(90deg, rgba(255,240,210,0), rgba(255,240,210,0.55), rgba(255,240,210,0))',
  wipeBar: 'linear-gradient(90deg, rgba(255,249,243,0), rgba(255,249,243,0.95))',
  edge: '#F4B942',
  edgeGlow: 'rgba(244,185,66,0.9)',
  base: C.navyDeep,
  tint: 'linear-gradient(180deg, rgba(15,124,138,0.16), rgba(8,46,59,0.22))',
  vignette: 'radial-gradient(120% 75% at 50% 46%, rgba(0,0,0,0) 55%, rgba(3,20,27,0.62) 100%)',
  shadeRgb: '4,26,34',
};

const ThemeContext = createContext<Theme>(CPL_THEME);
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);

export const Themed: React.FC<{theme: Theme; children: React.ReactNode}> = ({theme, children}) => (
  <ThemeProvider value={theme}>{children}</ThemeProvider>
);
