// 06 OFFER — the climax. Visual silence, then PAY PER / QUALIFIED (validated) / RFQ (heavy).
// The RFQ underline then extends and becomes the CTA container.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { checkBadge } from "../components/ui";
import { rfqCard } from "../components/rfq";

export const CTA_BOX = { x: 100, y: 1250, w: 880, h: 150 };

export function drawOffer(ctx: any, t: number) {
  const tYou = ws("you simply"), tPay = ws("pay"), tQ = ws("qualified", 1), tR = ws("potential", 1);
  const [sx, sy] = shake(t, tR, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.25, glowA: 0.8 + 0.6 * ep(t, tR, 0.4) });
  // the RFQ card, far behind, slowly drifting in depth
  const da = ep(t, tYou, 1.2, outQuart);
  ctx.save(); ctx.globalAlpha = 0.05 * da; ctx.translate(W / 2, 1000); ctx.scale(1.25 + (t - tYou) * 0.02, 1.25 + (t - tYou) * 0.02); ctx.translate(-W / 2, -1000);
  rfqCard(ctx, 260, 560, 1.0, { qualified: 1, focus: 0 });
  ctx.restore();
  glow(ctx, W / 2, 1060, 700, C.elec, 0.18 * ep(t, tR, 0.5));
  kline(ctx, t, { x: W / 2, y: 640, size: 52, align: "center", weight: 700, color: "#CFE9FF", ls: 2,
    words: [{ s: "YOU", t: tYou }, { s: "SIMPLY", t: ws("simply") }, { s: "PAY", t: tPay, color: "#fff" }, { s: "PER", t: ws("per"), color: "#fff" }] });
  // QUALIFIED: validates — cyan fill sweeps left to right, check lands
  const qa = ep(t, tQ, 0.4, outExpo);
  if (qa > 0) {
    ctx.save();
    ctx.font = `800 156px ${F.head}`; ctx.letterSpacing = "-2px"; ctx.textAlign = "center";
    const tw = ctx.measureText("QUALIFIED").width;
    const y = 870 + (1 - qa) * 40;
    ctx.globalAlpha = clamp(qa * 2);
    const fill = ep(t, tQ + 0.15, 0.45, inOutCubic);
    const g = ctx.createLinearGradient(W / 2 - tw / 2, 0, W / 2 + tw / 2, 0);
    g.addColorStop(0, C.cyan); g.addColorStop(Math.max(0.001, fill), C.elec); g.addColorStop(Math.min(1, fill + 0.001), "#FFFFFF"); g.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = g; ctx.fillText("QUALIFIED", W / 2, y);
    ctx.restore();
    checkBadge(ctx, W / 2 + tw / 2 - 10, y - 140, 34, ep(t, tQ + 0.5, 0.35));
  }
  // RFQ: heavy landing
  kline(ctx, t, { x: W / 2, y: 1240, size: 380, align: "center", ls: -8, words: [{ s: "RFQ", t: tR, anim: "slam", dur: 0.3, grad: true }] });
  // thin bright underline; on the CTA cue it extends into the CTA container
  const ul = ep(t, tR + 0.25, 0.4, outExpo);
  const toBox = ep(t, ws("book") - 0.35, 0.45, inOutExpo);
  if (ul > 0) {
    ctx.save();
    const x0 = lerp(W / 2 - 330 * ul, CTA_BOX.x, toBox), x1 = lerp(W / 2 + 330 * ul, CTA_BOX.x + CTA_BOX.w, toBox);
    const y0 = lerp(1335, CTA_BOX.y, toBox), hh = lerp(6, CTA_BOX.h, toBox);
    glow(ctx, W / 2, y0 + hh / 2, 500, C.cyan, 0.25);
    rr(ctx, x0, y0, x1 - x0, hh, lerp(3, CTA_BOX.h / 2, toBox));
    const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan);
    if (toBox < 1) { ctx.fillStyle = g; ctx.globalAlpha = 1 - toBox * 0.4; ctx.fill(); }
    ctx.restore();
  }
  const sw = prog(t, tR + 0.1, tR + 0.8);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.6, 0.25);
  ctx.restore();
}
