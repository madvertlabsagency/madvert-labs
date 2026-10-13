// Dark-theme product UI kit. Everything is drawn live so it can animate.
import { C, F } from "../core/brand";
import { card, chip, rr, text, icon, glow } from "../core/draw";
import { clamp, lerp, outCubic, outBack, rgba } from "../core/ease";
import type { Ctx } from "../core/draw";

export type Rect = { x: number; y: number; w: number; h: number };

/** Glass panel with a hairline top highlight. focus 0..1 adds a cyan rim + glow. */
export function glass(ctx: Ctx, x: number, y: number, w: number, h: number, o: { r?: number; focus?: number; alpha?: number; fill?: string; shadow?: number } = {}) {
  const r = o.r ?? 20, f = o.focus ?? 0;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  if (f > 0) glow(ctx, x + w / 2, y + h / 2, Math.max(w, h) * 0.75, C.elec, 0.10 * f);
  card(ctx, x, y, w, h, { r, fill: o.fill ?? C.panel, stroke: f > 0 ? rgba(C.cyan, 0.25 + 0.55 * f) : C.line, shadow: o.shadow ?? 0.8 });
  // top sheen
  const g = ctx.createLinearGradient(0, y, 0, y + Math.min(80, h));
  g.addColorStop(0, "rgba(255,255,255,0.06)"); g.addColorStop(1, "rgba(255,255,255,0)");
  rr(ctx, x + 1, y + 1, w - 2, Math.min(80, h) - 1, r); ctx.fillStyle = g; ctx.fill();
  ctx.restore();
}

/** App window chrome (dark). Returns content rect. */
export function appWindow(ctx: Ctx, x: number, y: number, w: number, h: number, title = "", o: { alpha?: number; focus?: number; url?: string } = {}): Rect {
  glass(ctx, x, y, w, h, { r: 18, alpha: o.alpha, focus: o.focus, fill: "rgba(12,20,34,0.92)" });
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  const bar = 44;
  ctx.beginPath(); ctx.roundRect(x, y, w, bar, [18, 18, 0, 0]); ctx.fillStyle = "rgba(255,255,255,0.035)"; ctx.fill();
  ctx.fillStyle = C.line; ctx.fillRect(x, y + bar, w, 1);
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => { ctx.beginPath(); ctx.arc(x + 22 + i * 18, y + bar / 2, 5.5, 0, 7); ctx.fillStyle = rgba(c, 0.85); ctx.fill(); });
  if (o.url) {
    const uw = Math.min(380, w * 0.45);
    rr(ctx, x + w / 2 - uw / 2, y + 9, uw, 26, 13); ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fill();
    text(ctx, o.url, x + w / 2, y + 27, { size: 13, weight: 500, color: C.sub, align: "center" });
  } else if (title) text(ctx, title, x + 86, y + 28, { size: 14, weight: 600, color: C.sub });
  ctx.restore();
  return { x, y: y + bar, w, h: h - bar };
}

/** Phone (dark) – returns screen rect. */
export function phone(ctx: Ctx, x: number, y: number, w: number, h: number, o: { alpha?: number } = {}): Rect {
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.shadowColor = "rgba(0,0,0,0.6)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 24;
  rr(ctx, x, y, w, h, w * 0.15);
  const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, "#3A4556"); g.addColorStop(0.5, "#1A2230"); g.addColorStop(1, "#4A5566");
  ctx.fillStyle = g; ctx.fill();
  ctx.shadowColor = "transparent";
  const b = w * 0.03;
  rr(ctx, x + b, y + b, w - 2 * b, h - 2 * b, w * 0.13); ctx.fillStyle = "#05080E"; ctx.fill();
  rr(ctx, x + w / 2 - w * 0.16, y + b + 10, w * 0.32, w * 0.085, w * 0.045); ctx.fillStyle = "#000"; ctx.fill();
  ctx.restore();
  return { x: x + b, y: y + b, w: w - 2 * b, h: h - 2 * b };
}

/** Toggle switch; on 0..1. */
export function toggle(ctx: Ctx, x: number, y: number, on: number, s = 1) {
  const w = 52 * s, h = 30 * s;
  rr(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = mixHex("#2A374B", "#22D39B", on); ctx.fill();
  ctx.beginPath(); ctx.arc(x + h / 2 + (w - h) * on, y + h / 2, h / 2 - 3 * s, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
}

export function mixHex(a: string, b: string, t: number) {
  const h = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * clamp(t))).join(",")})`;
}

/** Skeleton text lines. */
export function lines(ctx: Ctx, x: number, y: number, w: number, n: number, o: { gap?: number; h?: number; color?: string; p?: number } = {}) {
  const gap = o.gap ?? 18, h = o.h ?? 9, p = o.p ?? 1;
  for (let i = 0; i < n; i++) {
    const lw = w * (i === n - 1 ? 0.6 : 0.92 - (i % 3) * 0.08) * clamp(p * n - i);
    if (lw <= 0) continue;
    rr(ctx, x, y + i * gap, lw, h, h / 2);
    ctx.fillStyle = o.color ?? "rgba(255,255,255,0.08)"; ctx.fill();
  }
}

/** Initials avatar (no faces). */
export function avatar(ctx: Ctx, x: number, y: number, r: number, initials: string, bg: string = C.blue) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7);
  ctx.fillStyle = bg; ctx.fill();
  text(ctx, initials, x, y + r * 0.34, { size: r * 0.82, weight: 700, color: "#fff", align: "center" });
}

/** Primary CTA button. press 0..1 (compress), hover 0..1 (glow). */
export function button(ctx: Ctx, x: number, y: number, w: number, h: number, label: string, o: { press?: number; hover?: number; ghost?: boolean; size?: number; alpha?: number; icon?: string } = {}) {
  const pr = clamp(o.press ?? 0);
  const sc = 1 - Math.sin(pr * Math.PI) * 0.05;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.translate(x + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-x - w / 2, -y - h / 2);
  if (!o.ghost) {
    ctx.shadowColor = rgba(C.elec, 0.35 + 0.35 * (o.hover ?? 0)); ctx.shadowBlur = 24 + 20 * (o.hover ?? 0); ctx.shadowOffsetY = 6;
  }
  rr(ctx, x, y, w, h, h / 2);
  if (o.ghost) { ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fill(); ctx.strokeStyle = C.line2; ctx.lineWidth = 1.5; ctx.stroke(); }
  else { const g = ctx.createLinearGradient(x, y, x + w, y); g.addColorStop(0, C.blue); g.addColorStop(1, C.elec); ctx.fillStyle = g; ctx.fill(); }
  ctx.shadowColor = "transparent";
  const size = o.size ?? h * 0.36;
  text(ctx, label, x + w / 2, y + h / 2 + size * 0.36, { size, weight: 700, color: "#fff", align: "center" });
  ctx.restore();
}

/** Labelled input field typing to `value` with progress p. */
export function field(ctx: Ctx, x: number, y: number, w: number, label: string, value: string, p: number, active = false, done = false) {
  text(ctx, label, x, y, { size: 14, weight: 600, color: C.sub });
  rr(ctx, x, y + 10, w, 46, 10);
  ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fill();
  ctx.lineWidth = active ? 2 : 1.2;
  ctx.strokeStyle = active ? C.elec : done ? rgba(C.green, 0.5) : C.line; ctx.stroke();
  const n = Math.round(clamp(p) * value.length);
  if (n > 0) text(ctx, value.slice(0, n), x + 16, y + 40, { size: 17, weight: 500, color: C.text });
  if (active && n < value.length) { rr(ctx, x + 18 + n * 9.2, y + 22, 2, 22, 1); ctx.fillStyle = C.cyan; ctx.fill(); }
  if (done) { ctx.beginPath(); ctx.arc(x + w - 22, y + 33, 10, 0, 7); ctx.fillStyle = C.green; ctx.fill(); icon(ctx, "check", x + w - 31, y + 24, 18, "#04110B", 3); }
}

/** Status pill (dot + label) that pops in with p. */
export function pill(ctx: Ctx, x: number, y: number, label: string, p: number, color: string = C.green, size = 16) {
  if (p <= 0) return 0;
  ctx.save();
  ctx.globalAlpha *= clamp(p * 3);
  const s = lerp(0.7, 1, outBack(clamp(p), 1.6));
  ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y);
  const w = chip(ctx, label, x, y, { size, fg: mixHex(color, "#FFFFFF", 0.35), bg: rgba(color, 0.14), dot: color });
  ctx.restore();
  return w;
}

/** Green circular check badge. */
export function checkBadge(ctx: Ctx, x: number, y: number, r: number, p = 1) {
  if (p <= 0) return;
  ctx.save();
  const s = outBack(clamp(p), 2);
  ctx.translate(x, y); ctx.scale(s, s);
  glow(ctx, 0, 0, r * 2.4, C.green, 0.35);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 7);
  const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, "#5BF0B8"); g.addColorStop(1, "#13B57E");
  ctx.fillStyle = g; ctx.fill();
  icon(ctx, "check", -r * 0.62, -r * 0.62, r * 1.24, "#03150D", 3.2);
  ctx.restore();
}

/** Icon inside a rounded glass tile. */
export function iconTile(ctx: Ctx, name: string, x: number, y: number, s: number, color: string = C.cyan, on = 1) {
  rr(ctx, x, y, s, s, s * 0.26);
  ctx.fillStyle = rgba(C.elec, 0.08 + 0.1 * on); ctx.fill();
  ctx.strokeStyle = rgba(C.cyan, 0.15 + 0.35 * on); ctx.lineWidth = 1.2; ctx.stroke();
  icon(ctx, name, x + s * 0.22, y + s * 0.22, s * 0.56, color, 2.2);
}

/** "Example data" disclosure tag. */
export function exampleTag(ctx: Ctx, x: number, y: number, a = 1) {
  text(ctx, "EXAMPLE DATA", x, y, { size: 12, weight: 700, family: F.mono, ls: 2, color: C.mute, alpha: a });
}

export { icon, outCubic };
