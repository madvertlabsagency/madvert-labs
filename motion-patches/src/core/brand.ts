// Madvert Labs brand tokens — dark cinematic product-film theme.
export const W = 1920;
export const H = 1080;
export const FPS = 60;

/** Voiceover starts this many seconds into the film. */
export const VO_OFFSET = 0.3;
/** Film length in seconds (VO is 91.8 s; the end frame holds after it). */
export const DURATION = 95.5;

export const C = {
  // surfaces
  bg0: "#03060B",
  bg1: "#07101D",
  bg2: "#0B1626",
  panel: "rgba(16,26,44,0.78)",
  panel2: "rgba(24,38,62,0.85)",
  solid: "#0F1A2C",
  well: "rgba(255,255,255,0.045)",
  line: "rgba(140,190,255,0.16)",
  line2: "rgba(140,190,255,0.28)",
  // type
  text: "#F3F8FF",
  sub: "#A7B7CE",
  mute: "#66788F",
  navy: "#0A0F1C",
  // accents
  blue: "#0084FF",
  elec: "#00B4FF",
  cyan: "#00E5FF",
  green: "#22D39B",
  red: "#FF5A6E",
  amber: "#FFB547",
  white: "#FFFFFF",
  cold: "#55667E",
};

export const F = {
  head: "Sora",
  body: "Inter",
  mono: "JetBrains Mono",
};

export const font = (weight: number, size: number, family: string = F.head) =>
  `${weight} ${size}px ${family}`;

/** Brand gradient #00B4FF -> #00E5FF (optionally from #0084FF). */
export function brandGrad(ctx: any, x0: number, y0: number, x1: number, y1: number, deep = false) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  if (deep) { g.addColorStop(0, C.blue); g.addColorStop(0.55, C.elec); g.addColorStop(1, C.cyan); }
  else { g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan); }
  return g;
}
/** White-to-cyan gradient for hero type on dark. */
export function heroGrad(ctx: any, x0: number, y0: number, x1: number, y1: number) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, "#FFFFFF");
  g.addColorStop(1, "#BFEFFF");
  return g;
}
