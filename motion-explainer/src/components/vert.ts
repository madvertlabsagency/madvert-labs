// Vertical-format helpers: footage plates, hyperframe bursts, punch-ins, US cue.
import { C, F, W, H } from "../core/brand";
import { cover, rr, text, glow } from "../core/draw";
import { clamp, ep, outExpo, prog, rgba } from "../core/ease";
import { video } from "../core/assets";

const CROPS: Record<string, [number, number, number, number]> = {
  stitch: [0, 0, 1280, 720],
  owner: [0, 0, 1280, 720],
  inspect: [0, 0, 720, 1280],
  embroidery: [0, 0, 1280, 720],
};

/** Full-bleed footage plate with a camera punch (scale decays from `punch` after `t0`). */
export function plate(ctx: any, key: string, vt: number, o: { fx?: number; fy?: number; zoom?: number; punchAt?: number; punch?: number; dim?: number; x?: number; y?: number; w?: number; h?: number } = {}) {
  const x = o.x ?? 0, y = o.y ?? 0, w = o.w ?? W, h = o.h ?? H;
  let z = o.zoom ?? 1;
  if (o.punchAt !== undefined) z *= 1 + (o.punch ?? 0.08) * (1 - outExpo(clamp(prog(vt, o.punchAt, o.punchAt + 0.35))));
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  cover(ctx, video(key, vt), x, y, w, h, o.fx ?? 0.5, o.fy ?? 0.5, z, CROPS[key]);
  // cool grade
  ctx.fillStyle = "rgba(4,22,58,0.22)"; ctx.fillRect(x, y, w, h);
  if (o.dim) { ctx.fillStyle = `rgba(3,8,20,${o.dim})`; ctx.fillRect(x, y, w, h); }
  ctx.restore();
}

/** Type-legibility gradients over footage (top and bottom). */
export function scrims(ctx: any, top = 0.75, bottom = 0.85) {
  const g1 = ctx.createLinearGradient(0, 0, 0, 760);
  g1.addColorStop(0, `rgba(3,8,20,${top})`); g1.addColorStop(1, "rgba(3,8,20,0)");
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, 760);
  const g2 = ctx.createLinearGradient(0, H - 900, 0, H);
  g2.addColorStop(0, "rgba(3,8,20,0)"); g2.addColorStop(1, `rgba(3,8,20,${bottom})`);
  ctx.fillStyle = g2; ctx.fillRect(0, H - 900, W, 900);
}

/** Which item of a hyperframe burst is on screen: durations in seconds from t0. Returns [index, localTime]. */
export function burst(t: number, t0: number, durs: number[]): [number, number] {
  let acc = t0;
  for (let i = 0; i < durs.length; i++) {
    if (t < acc + durs[i]) return [i, t - acc];
    acc += durs[i];
  }
  return [durs.length - 1, t - (acc - durs[durs.length - 1])];
}

/** Refined US market cue: tiny flag mark + label. */
export function usChip(ctx: any, x: number, y: number, a = 1, label = "US MARKET") {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.font = `700 22px ${F.mono}`; ctx.letterSpacing = "4px";
  const tw = ctx.measureText(label).width;
  rr(ctx, x, y, tw + 104, 56, 28); ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.fill();
  ctx.strokeStyle = rgba(C.cyan, 0.45); ctx.lineWidth = 1.5; ctx.stroke();
  const fx = x + 20, fy = y + 16, fw = 40, fh = 24;
  ctx.save(); rr(ctx, fx, fy, fw, fh, 3); ctx.clip();
  for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? "#fff" : "#E5404F"; ctx.fillRect(fx, fy + i * (fh / 7), fw, fh / 7 + 0.5); }
  ctx.fillStyle = "#1F3A93"; ctx.fillRect(fx, fy, fw * 0.45, fh * 0.55);
  ctx.restore();
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#fff"; ctx.fillText(label, x + 78, y + 36);
  ctx.restore();
}

/** Cyan flash line used at hard cuts (one or two frames of light). */
export function cutFlash(ctx: any, t: number, at: number, dur = 0.08) {
  const p = prog(t, at, at + dur);
  if (p <= 0 || p >= 1) return;
  ctx.save();
  ctx.fillStyle = `rgba(160,240,255,${0.35 * (1 - p)})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

export { glow, text };
