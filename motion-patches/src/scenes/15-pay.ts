// 15 PAY PER QUALIFIED RFQ — the cleanest, strongest type moment. No price.
import { C, F, W, H } from "../core/brand";
import { background, text, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutCubic, lerp, prog, rgba, outBack, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { ribbon } from "../components/ribbon";
import { rfqCard, sectionTag } from "../components/rfq";

export function drawPay(ctx: any, t: number) {
  const t0 = ws("you simply pay") - 0.25;
  const tPay = ws("pay"), tQ = ws("qualified", 0), tR = ws("rfq", 0);
  const [sx, sy] = shake(t, tR, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.25, glowA: 1.5 });
  // light sweeps behind
  ribbon(ctx, [[-100, 900], [500, 760], [1100, 820], [2000, 600]], { to: ep(t, t0, 1.2, inOutCubic), width: 5, flow: t, speed: 0.3, alpha: 0.6 });
  ribbon(ctx, [[-100, 980], [700, 880], [1400, 940], [2000, 760]], { to: ep(t, t0 + 0.2, 1.2, inOutCubic), width: 3, flow: t + 3, speed: 0.25, alpha: 0.4 });
  // RFQ card behind/right, tilted, floating
  const ca = ep(t, t0 + 0.1, 0.8, outQuart);
  ctx.save();
  ctx.translate(1440, 540 + noise(t * 0.5) * 6); ctx.rotate(0.05 * (1 - ca) + 0.03); ctx.translate(-1440, -540);
  glow(ctx, 1440, 520, 520, C.cyan, 0.22 * ca);
  rfqCard(ctx, 1190 + (1 - ca) * 120, 200, 0.9, { qualified: ep(t, tR, 0.5), focus: 1, alpha: ca });
  ctx.restore();
  kline(ctx, t, { x: 116, y: 270, size: 46, weight: 700, family: F.body, ls: 0, color: C.sub, words: [{ s: "You", t: ws("you simply") }, { s: "simply", t: ws("simply") }] });
  kline(ctx, t, { x: 106, y: 470, size: 170, words: [{ s: "PAY", t: tPay, anim: "slam" }, { s: "PER", t: ws("per"), anim: "slam" }] });
  kline(ctx, t, { x: 106, y: 650, size: 160, words: [{ s: "QUALIFIED", t: tQ, anim: "rise", grad: true }] });
  kline(ctx, t, { x: 100, y: 865, size: 205, words: [{ s: "RFQ.", t: tR, anim: "slam", grad: true }] });
  ctx.restore();
}
