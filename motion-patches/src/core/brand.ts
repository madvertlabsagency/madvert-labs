// Madvert Labs brand tokens — premium light theme.
export const W = 1920;
export const H = 1080;
export const FPS = 60;

/** Voiceover starts this many seconds into the film. */
export const VO_OFFSET = 0.3;
/** Film length in seconds (VO is 91.8 s; the end frame holds after it). */
export const DURATION = 95.5;

export const C = {
  // surfaces (premium light theme, matches the first Madvert film)
  bg0: "#F8FBFF",
  bg1: "#E9F2FB",
  bg2: "#DCEAF8",
  panel: "#FFFFFF",
  panel2: "#F7FAFE",
  solid: "#FFFFFF",
  well: "#F2F6FB",
  line: "rgba(140,175,215,0.42)",
  line2: "rgba(110,150,200,0.6)",
  // type
  text: "#0A0F1C",
  sub: "#5B6B82",
  mute: "#94A3B8",
  navy: "#0A0F1C",
  ink: "#1B2740",
  // accents
  blue: "#0084FF",
  elec: "#00B4FF",
  cyan: "#00E5FF",
  green: "#00C27A",
  red: "#F0506E",
  amber: "#F5A524",
  white: "#FFFFFF",
  cold: "#A9B8CC",
};

export const F = {
  head: "Sora",
  body: "Inter",
  mono: "JetBrains Mono",
};

export const font = (weight: number, size: number, family: string = F.head) =>
  `${weight} ${size}px ${family}`;

/** Brand gradient #00B4FF -> #00E5FF (optionally from #0084FF). */
export function brandGrad(ctx: any, x0: number, y0: number, x1: number, y1: number, deep = true) {
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
