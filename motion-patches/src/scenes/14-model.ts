// 14 ONE SIMPLE MODEL — the five separate jobs collapse into one partnership card.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip, orb } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, inCubic } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline } from "../components/kinetic";
import { glass, checkBadge } from "../components/ui";
import { sectionTag } from "../components/rfq";
import { BURDENS, burdenCard, bx, BY, BW, BH } from "./13-burden";

export function modelCard(ctx: any, cx: number, cy: number, s: number, t: number, a = 1) {
  const w = 760, h = 440;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-w / 2, -h / 2);
  glow(ctx, w / 2, h / 2, 600, C.cyan, 0.2);
  glass(ctx, 0, 0, w, h, { r: 32, focus: 1, shadow: 1 });
  const ic = img("icon");
  if (ic) { ctx.save(); ctx.beginPath(); ctx.roundRect(36, 36, 110, 110, 26); ctx.clip(); ctx.drawImage(ic, 36, 36, 110, 110); ctx.restore(); }
  text(ctx, "Madvert Labs", 172, 80, { size: 24, weight: 700, color: C.sub });
  text(ctx, "Patches Partnership", 172, 126, { size: 44, weight: 800, family: F.head });
  ctx.fillStyle = C.line; ctx.fillRect(36, 180, w - 72, 1);
  BURDENS.forEach(([n, ic2], i) => {
    const x = 36 + (i % 3) * 232, y = 206 + Math.floor(i / 3) * 70;
    rr(ctx, x, y, 220, 56, 14); ctx.fillStyle = rgba(C.elec, 0.08); ctx.fill(); ctx.strokeStyle = rgba(C.elec, 0.3); ctx.lineWidth = 1.2; ctx.stroke();
    icon(ctx, ic2, x + 14, y + 14, 28, C.blue, 2.2);
    text(ctx, n === "CRM" ? "CRM" : n.charAt(0) + n.slice(1).toLowerCase(), x + 54, y + 36, { size: 18, weight: 700 });
  });
  rr(ctx, 36 + 2 * 232, 206 + 70, 220, 56, 14); ctx.fillStyle = rgba(C.green, 0.1); ctx.fill();
  checkBadge(ctx, 36 + 2 * 232 + 30, 206 + 70 + 28, 13, 1);
  text(ctx, "All included", 36 + 2 * 232 + 54, 206 + 70 + 35, { size: 18, weight: 800, color: "#05834F" });
  text(ctx, "Built into one simple model", 36, h - 40, { size: 20, weight: 600, color: C.sub });
  ctx.restore();
}

export function drawModel(ctx: any, t: number) {
  const t0 = ws("everything is built") - 0.25;
  const tOne = ws("one simple model");
  background(ctx, t, { grid: 0.4, glowA: 1.3 });
  sectionTag(ctx, "12", "One partnership", ep(t, t0, 0.4));
  const pull = ep(t, t0 + 0.05, 0.9, inOutExpo);
  // cards fly to centre and fold away
  BURDENS.forEach((_, i) => {
    const x0 = bx(i) + (i - 2) * 40, y0 = BY + Math.abs(i - 2) * 18;
    const x = lerp(x0, W / 2 - BW / 2, pull), y = lerp(y0, 470 - BH / 2, pull);
    const s = lerp(0.96, 0.25, inCubic(pull));
    if (pull < 0.98) burdenCard(ctx, i, x, y, s, 1, 1 - ep(t, t0 + 0.6, 0.35), (i - 2) * 0.035 * (1 - pull));
  });
  const c = ep(t, t0 + 0.7, 0.7, outBack);
  if (c > 0) {
    modelCard(ctx, W / 2, 470, lerp(0.5, 1, c), t, clamp(c * 2));
    const p = prog(t, tOne + 0.3, tOne + 1.3);
    if (p > 0 && p < 1) orb(ctx, W / 2 - 380 + 91, 470 - 220 + 91 + 18, 14, p, 1 - p);
  }
  kline(ctx, t, { x: W / 2, y: 260 - 70, size: 56, align: "center", weight: 700, color: C.sub, out: tOne - 0.1, outAnim: "up", outDur: 0.25,
    words: [{ s: "EVERYTHING", t: ws("everything") }, { s: "BUILT", t: ws("built") }, { s: "INTO", t: ws("into one") }] });
  kline(ctx, t, { x: W / 2, y: 860, size: 120, align: "center",
    words: [{ s: "ONE", t: tOne, anim: "slam" }, { s: "SIMPLE", t: ws("simple"), anim: "slam" }, { s: "MODEL.", t: ws("model"), anim: "slam", grad: true }] });
}
