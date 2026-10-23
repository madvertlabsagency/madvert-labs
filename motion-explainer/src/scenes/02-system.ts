// 02 SYSTEM — "Isi lye Madvert Labs me ham aapke liye ek complete customer acquisition system
// build karte hain." The connected chain AD → LANDING PAGE → QUALIFICATION → RFQ → SALES TEAM,
// with Madvert Labs shown as the backend builder (not the brand the buyer sees).
import { C, F, W, H } from "../core/brand";
import { background, text, rr, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { iconTile, checkBadge } from "../components/ui";
import { pulseDot } from "../components/rfq";
import { logo } from "../components/brand";

const NODES: [string, string, string][] = [
  ["AD", "megaphone", "Runs as your brand"], ["BRANDED LANDING PAGE", "globe", "Your page, your offer"], ["QUALIFICATION", "funnel", "Patch specs, quantity, deadline"],
  ["QUALIFIED RFQ", "doc", "Quote-ready requirement"], ["SALES TEAM", "users", "Your team follows up"],
];
const NY = (i: number) => 770 + i * 140;

export function drawSystem(ctx: any, t: number) {
  const tM = ws("madvert") - 0.1, tC = ws("complete"), tCu = ws("customer"), tSys = ws("system"), tB = ws("build");
  const [sx, sy] = shake(t, tSys, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.6, glowA: 1.2 });
  // title
  kline(ctx, t, { x: W / 2, y: 500, size: 48, align: "center", weight: 700, ls: 6, words: [{ s: "COMPLETE", t: tC, anim: "rise", color: C.sub }] });
  kline(ctx, t, { x: W / 2, y: 600, size: 72, align: "center", words: [{ s: "CUSTOMER", t: tCu, anim: "rise" }, { s: "ACQUISITION", t: ws("acquisition"), anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 700, size: 96, align: "center", words: [{ s: "SYSTEM", t: tSys, anim: "slam", grad: true }] });
  // backbone line
  const path: [number, number][] = [[150, NY(0)], [150, NY(4)]];
  const sp = sample(path, 120);
  const on = [tC + 0.1, tCu + 0.2, ws("acquisition") + 0.2, tSys + 0.1, tB];
  const rp = ep(t, on[0] - 0.1, on[4] - on[0] + 0.3, inOutCubic);
  if (rp > 0.01) ribbon(ctx, sp, { to: rp, width: 5, flow: t, speed: t > tB ? 1 : 0, pulses: 2 });
  NODES.forEach(([lab, ic, sub], i) => {
    const a = ep(t, on[i] - 0.15, 0.4, outQuart);
    if (a <= 0) return;
    const act = ep(t, on[i], 0.3);
    const x = 110, y = NY(i) - 56, w = 860, h = 112;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * -60, 0);
    if (i === 3 && act > 0) glow(ctx, x + w / 2, y + h / 2, 420, C.cyan, 0.16 * act);
    ctx.shadowColor = "rgba(20,60,120,0.14)"; ctx.shadowBlur = 36; ctx.shadowOffsetY = 12;
    rr(ctx, x + 80, y, w - 80, h, 26); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.lineWidth = 2.5; ctx.strokeStyle = rgba(C.elec, 0.2 + 0.6 * act); ctx.stroke();
    ctx.beginPath(); ctx.arc(150, NY(i), 26, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = act > 0.5 ? C.elec : C.line2; ctx.stroke();
    text(ctx, String(i + 1), 150, NY(i) + 9, { size: 24, weight: 800, family: F.head, color: C.blue, align: "center" });
    iconTile(ctx, ic, x + 104, y + 20, 72, C.blue, act);
    text(ctx, lab, x + 200, y + 52, { size: 34, weight: 800, family: F.head, color: C.navy });
    text(ctx, sub, x + 200, y + 86, { size: 22, weight: 600, color: C.sub });
    if (act > 0.5 && i === 3) checkBadge(ctx, x + w - 46, y + h / 2, 20, (act - 0.5) * 2);
    ctx.restore();
  });
  const pp = prog(t, tB, tB + 1.0);
  if (pp > 0 && pp < 1) { const p = pointAt(sp, inOutCubic(pp)); pulseDot(ctx, p.x, p.y, 11); }
  // opener: Madvert Labs builds it for you (then docks into the backend bar)
  const op = ep(t, tM, 0.6, inOutExpo) * (1 - ep(t, tC - 0.3, 0.35, inOutCubic));
  if (op > 0) {
    ctx.save(); ctx.globalAlpha *= op;
    logo(ctx, W / 2, 820, 620, { reveal: ep(t, tM, 0.6, inOutExpo), pulse: prog(t, ws("labs") + 0.1, ws("labs") + 1.0) });
    kline(ctx, t, { x: W / 2, y: 1100, size: 52, align: "center", weight: 700, ls: 4, words: [{ s: "BUILDS", t: ws("ham") - 0.05, color: C.sub }, { s: "IT", t: ws("ham") + 0.05, color: C.sub }, { s: "FOR", t: ws("aapke") }, { s: "YOU", t: ws("liye"), color: C.blue }] });
    ctx.restore();
  }
  // Madvert Labs as the builder, quietly underneath
  const ma = ep(t, tC - 0.1, 0.5, outQuart);
  if (ma > 0) {
    ctx.save(); ctx.globalAlpha *= ma;
    rr(ctx, 110, 1474, 860, 76, 38); ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fill(); ctx.strokeStyle = rgba(C.elec, 0.3); ctx.lineWidth = 1.5; ctx.stroke();
    text(ctx, "BUILT & RUN BY", 160, 1521, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.sub });
    logo(ctx, 640, 1490, 230);
    text(ctx, "BACKEND", 930, 1521, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.blue, align: "right" });
    ctx.restore();
  }
  ctx.restore();
}
