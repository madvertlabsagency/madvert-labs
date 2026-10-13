// 16 ACTIVITY vs ORDERS — marketing activity on the left fades; real potential orders remain.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip, lineChart } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, iconTile, pill, exampleTag } from "../components/ui";
import { patch } from "../components/patches";
import { sectionTag } from "../components/rfq";

export function orderCard(ctx: any, x: number, y: number, w: number, kind: any, name: string, spec: string, due: string, a = 1) {
  ctx.save(); ctx.globalAlpha *= a;
  glass(ctx, x, y, w, 150, { r: 20, focus: 0.4 });
  rr(ctx, x + 16, y + 16, 118, 118, 16); ctx.fillStyle = "#EEF3F9"; ctx.fill();
  patch(ctx, kind, x + 75, y + 75, 100, { shadow: 0.4 });
  text(ctx, name, x + 154, y + 46, { size: 22, weight: 800 });
  pill(ctx, x + w - 170, y + 24, "Qualified RFQ", 1, C.green, 14);
  text(ctx, spec, x + 154, y + 80, { size: 17, weight: 600, color: C.sub });
  icon(ctx, "calendar", x + 154, y + 98, 20, C.blue, 2); text(ctx, due, x + 182, y + 115, { size: 15, weight: 700 });
  icon(ctx, "clip", x + 300, y + 98, 20, C.blue, 2); text(ctx, "Artwork attached", x + 328, y + 115, { size: 15, weight: 700 });
  ctx.restore();
}
export const ORDERS: [any, string, string, string][] = [
  ["apex", "Apex Apparel", "500 · Embroidered · 3.5 in · Iron-On", "Nov 15"],
  ["summit", "Summit Crew", "1,000 · PVC · 3 in · Velcro", "Dec 2"],
  ["lakeside", "Lakeside Co.", "300 · Woven · 2.5 in · Sew-On", "Nov 28"],
];

export function drawOrders(ctx: any, t: number) {
  const t0 = ws("so instead") - 0.25;
  const tAct = ws("marketing activity"), tReal = ws("real potential");
  background(ctx, t, { grid: 0.35 });
  sectionTag(ctx, "13", "What you pay for", ep(t, t0, 0.4));
  const fade = ep(t, tReal - 0.1, 0.7, inOutCubic);
  // LEFT: marketing activity
  const la = ep(t, t0, 0.5, outQuart) * (1 - 0.85 * fade);
  ctx.save(); ctx.globalAlpha *= la;
  ctx.translate(110 + 450, 560); ctx.scale(1 - 0.12 * fade, 1 - 0.12 * fade); ctx.translate(-(110 + 450), -560);
  const hl = ep(t, tAct, 0.4);
  glass(ctx, 110, 260, 820, 600, { r: 26, focus: hl * (1 - fade) });
  text(ctx, "MARKETING ACTIVITY", 150, 312, { size: 15, weight: 700, family: F.mono, ls: 3, color: C.sub });
  const g = clamp((t - t0) / 3.5);
  [["Impressions", "eye", 412580], ["Clicks", "pointer", 12946], ["Spend", "dollar", 8732]].forEach(([n, ic, v], i) => {
    const x = 150 + i * 255;
    rr(ctx, x, 340, 235, 140, 16); ctx.fillStyle = C.well; ctx.fill();
    iconTile(ctx, ic as string, x + 16, 356, 44, C.blue);
    text(ctx, n as string, x + 72, 384, { size: 15, weight: 600, color: C.sub });
    const val = Math.round((v as number) * (0.6 + 0.4 * g));
    text(ctx, (i === 2 ? "$" : "") + val.toLocaleString("en-US"), x + 16, 452, { size: 30, weight: 800, family: F.head });
  });
  text(ctx, "Activity over time", 150, 530, { size: 16, weight: 700 });
  lineChart(ctx, 150, 550, 740, 220, [0.2, 0.3, 0.26, 0.42, 0.38, 0.55, 0.5, 0.68, 0.62, 0.8, 0.92], ep(t, t0 + 0.2, 2.5, inOutCubic), { lw: 3.5 });
  exampleTag(ctx, 150, 836);
  ctx.restore();
  // RIGHT: real potential orders — slides to centre when the left fades
  const rx = lerp(990, 560, fade), rw = lerp(820, 800, fade);
  const ra = ep(t, ws("you're paying") - 0.2, 0.5, outQuart);
  if (ra > 0) {
    ctx.save(); ctx.globalAlpha *= ra;
    text(ctx, "REAL POTENTIAL ORDERS", rx + 10, 312, { size: 15, weight: 700, family: F.mono, ls: 3, color: C.blue });
    ORDERS.forEach(([k, n, s, d], i) => {
      const a = ep(t, ws("you're paying") + i * 0.25, 0.5, outBack);
      if (a > 0) orderCard(ctx, rx + (1 - a) * 80, 340 + i * 172, rw, k, n, s, d, clamp(a * 2));
    });
    text(ctx, "EXAMPLE DATA", rx + rw, 312, { size: 12, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
    ctx.restore();
  }
  // type
  kline(ctx, t, { x: 110, y: 190, size: 58, weight: 700, color: C.sub, out: tReal - 0.15, outAnim: "up", outDur: 0.25,
    words: [{ s: "NOT", t: ws("instead") }, { s: "MARKETING", t: tAct, color: C.text }, { s: "ACTIVITY", t: ws("activity"), color: C.text }] });
  const st = ep(t, ws("activity") + 0.35, 0.35);
  if (st > 0 && t < tReal - 0.1) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(250, 170); ctx.lineTo(250 + 640 * outExpo(st), 170); ctx.stroke(); ctx.restore(); }
  kline(ctx, t, { x: W / 2, y: 200, size: 92, align: "center",
    words: [{ s: "REAL", t: tReal, anim: "slam" }, { s: "POTENTIAL", t: ws("potential"), grad: true }, { s: "ORDERS.", t: ws("orders", 1), grad: true, anim: "slam" }] });
}
