// 07 PAY PER QUALIFIED RFQ — "Aapka focus sirf qualified RFQs par hota hai, aur agreed model
// ke mutabiq aap per qualified RFQ pay karte hain." Clicks / impressions / random leads fall
// away; the Qualified RFQ stays lit.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { checkBadge, iconTile } from "../components/ui";

const ROWS: [string, string][] = [["Clicks", "cursor"], ["Impressions", "eye"], ["Random leads", "users"], ["Qualified RFQ", "doc"]];

export function drawPay(ctx: any, t: number) {
  const t0 = ws("aapka") - 0.1, tQ = ws("qualified"), tAg = ws("agreed"), tP = ws("per", 1), tQ2 = ws("qualified", 1), tR = ws("rfq"), tPay = ws("pay");
  const [sx, sy] = shake(t, tR, 8);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.35, glowA: 0.9 + 0.5 * ep(t, tR, 0.4) });
  // basis list: what you are NOT paying for fades away
  const up = ep(t, tAg - 0.25, 0.6, inOutExpo);
  ROWS.forEach(([lab, ic], i) => {
    const a = ep(t, t0 + 0.1 + i * 0.18, 0.45, outQuart);
    if (a <= 0) return;
    const keep = i === 3;
    const fade = keep ? 0 : ep(t, ws("rfqs") + i * 0.12, 0.5);
    const y = lerp(520 + i * 118, keep ? 470 : 520 + i * 118, up);
    const al = a * (keep ? 1 : (1 - 0.82 * fade) * (1 - up));
    if (al <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= al; ctx.translate((1 - a) * -60 + (keep ? 0 : fade * -30), 0);
    const x = 140, w = 800, h = 96;
    if (keep) glow(ctx, x + w / 2, y + h / 2, 460, C.cyan, 0.18 * ep(t, tQ, 0.4));
    ctx.shadowColor = "rgba(20,60,120,0.12)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
    rr(ctx, x, y, w, h, 26); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.lineWidth = keep ? 3 : 1.5; ctx.strokeStyle = keep ? rgba(C.elec, 0.3 + 0.7 * ep(t, tQ, 0.4)) : C.line; ctx.stroke();
    iconTile(ctx, ic, x + 22, y + 16, 64, keep ? C.blue : C.mute, keep ? 1 : 0.3);
    text(ctx, lab, x + 112, y + 60, { size: 36, weight: 800, family: F.head, color: keep ? C.navy : C.mute });
    if (!keep && fade > 0) { ctx.strokeStyle = rgba(C.red, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 104, y + 48); ctx.lineTo(x + 112 + 300 * outExpo(fade), y + 48); ctx.stroke(); }
    if (keep) checkBadge(ctx, x + w - 54, y + h / 2, 24, ep(t, tQ + 0.2, 0.4));
    ctx.restore();
  });
  // agreed model note
  const na = ep(t, tAg + 0.2, 0.5, outQuart);
  if (na > 0) {
    ctx.save(); ctx.globalAlpha *= na;
    rr(ctx, 190, 600 + (1 - na) * 20, 700, 64, 32); ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill(); ctx.strokeStyle = rgba(C.elec, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
    icon(ctx, "check", 222, 616 + (1 - na) * 20, 30, C.blue, 2.6);
    text(ctx, "Based on agreed qualification criteria", 266, 642 + (1 - na) * 20, { size: 25, weight: 700, color: C.navy });
    ctx.restore();
  }
  // hero
  kline(ctx, t, { x: W / 2, y: 900, size: 92, align: "center", words: [{ s: "PAY", t: tP - 0.1, anim: "rise" }, { s: "PER", t: tP + 0.05, anim: "rise" }] });
  const qa = ep(t, tQ2, 0.4, outExpo);
  if (qa > 0) {
    ctx.save();
    ctx.font = `800 150px ${F.head}`; ctx.letterSpacing = "-3px"; ctx.textAlign = "center";
    const tw = ctx.measureText("QUALIFIED").width, y = 1060 + (1 - qa) * 30;
    ctx.globalAlpha = clamp(qa * 2);
    const fill = ep(t, tQ2 + 0.1, 0.45, inOutCubic);
    const g = ctx.createLinearGradient(W / 2 - tw / 2, 0, W / 2 + tw / 2, 0);
    g.addColorStop(0, C.blue); g.addColorStop(Math.max(0.001, fill), C.elec); g.addColorStop(Math.min(1, fill + 0.001), C.navy); g.addColorStop(1, C.navy);
    ctx.fillStyle = g; ctx.fillText("QUALIFIED", W / 2, y);
    ctx.restore();
    checkBadge(ctx, W / 2 + tw / 2 + 10, y - 120, 30, ep(t, tQ2 + 0.45, 0.35));
  }
  kline(ctx, t, { x: W / 2, y: 1350, size: 300, align: "center", ls: -8, words: [{ s: "RFQ", t: tR, anim: "slam", dur: 0.3, grad: true }] });
  const ul = ep(t, tPay, 0.5, outExpo);
  if (ul > 0) { rr(ctx, W / 2 - 300 * ul, 1395, 600 * ul, 8, 4); ctx.fillStyle = C.cyan; ctx.fill(); }
  const sw = prog(t, tR, tR + 0.7);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.5, 0.25);
  ctx.restore();
}
