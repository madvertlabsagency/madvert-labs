// 04 INTERRUPT — "Madvert Labs fixes that!" The problem UI freezes, a cyan sweep cuts
// through, the A mark ignites and the official logo lands.
import { C, F, W, H, heroGrad } from "../core/brand";
import { background, text, glow, orb, streak, vignette } from "../core/draw";
import { clamp, ep, outExpo, inOutExpo, inOutCubic, lerp, prog, outBack, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { ribbon } from "../components/ribbon";
import { drawAds } from "./03-ads";

export function drawInterrupt(ctx: any, t: number) {
  const t0 = ws("madvert labs fixes") - 0.3;
  const tFix = ws("fixes");
  const sweep = ep(t, t0 + 0.12, 0.45, inOutExpo);
  // frozen, desaturated problem frame under the sweep
  if (sweep < 1) {
    ctx.save();
    drawAds(ctx, t, t0);
    ctx.fillStyle = "rgba(240,245,251,0.55)"; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "saturation"; ctx.fillStyle = "#808080"; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }
  // new dark field revealed by the sweep
  const edge = W * sweep;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, 0, edge, H); ctx.clip();
  background(ctx, t, { grid: 0.25, glowA: 1.4 });
  const [sx, sy] = shake(t, tFix, 6);
  ctx.translate(sx, sy);
  // A mark ignites at centre, then rises as the lockup lands
  const ig = ep(t, t0 + 0.35, 0.6, outExpo);
  const rise = ep(t, ws("labs") + 0.1, 0.7, inOutCubic);
  const am = img("icon");
  glow(ctx, W / 2, lerp(H / 2 - 20, 300, rise), lerp(500, 380, rise), C.elec, 0.35 * ig);
  if (am && ig > 0) {
    const s = lerp(1.25, 1, ig) * lerp(1, 0.55, rise);
    const size = 300 * s;
    ctx.save();
    ctx.globalAlpha = clamp(ig * 1.5) * (1 - ep(t, ws("labs") + 0.4, 0.4));
    const cy = lerp(H / 2 - 20, 300, rise);
    ctx.shadowColor = "rgba(0,100,200,0.35)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 20;
    ctx.beginPath(); ctx.roundRect(W / 2 - size / 2, cy - size / 2, size, size, size * 0.22); ctx.clip();
    ctx.drawImage(am, W / 2 - size / 2, cy - size / 2, size, size);
    ctx.restore();
  }
  // official logo (dark-background version) — revealed with a mask wipe
  const lg = img("logo");
  const lr = ep(t, ws("labs") + 0.25, 0.7, inOutExpo);
  if (lg && lr > 0) {
    const w = 900, h = lg.height * w / lg.width, x = W / 2 - w / 2, y = 200;
    ctx.save();
    ctx.beginPath(); ctx.rect(x - 20, y - 20, (w + 40) * lr, h + 40); ctx.clip();
    ctx.drawImage(lg, x, y, w, h);
    ctx.restore();
    // orb activation pulse (orb centre measured in logo-light.png: 26.33% / 46.75%)
    const p = prog(t, ws("labs") + 0.9, ws("labs") + 1.8);
    if (p > 0 && p < 1) orb(ctx, x + w * 0.2633, y + h * 0.4675, h * 0.1069, p, 1 - p);
  }
  kline(ctx, t, { x: W / 2, y: 690, size: 176, align: "center",
    words: [{ s: "FIXES", t: tFix, anim: "slam" }, { s: "THAT.", t: ws("that!"), anim: "slam", grad: true }] });
  ribbon(ctx, [[W / 2 - 520, 760], [W / 2 - 100, 735], [W / 2 + 300, 750], [W / 2 + 560, 728]], { to: ep(t, ws("that!") + 0.1, 0.6, inOutCubic), width: 5, flow: t, speed: 0.6 });
  ctx.restore();
  if (sweep > 0 && sweep < 1) streak(ctx, edge, 1, 0.12);
}
