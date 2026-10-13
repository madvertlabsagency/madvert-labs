// 05 USP — two full-frame impact beats: NO AD SPEND, then NO RANDOM LEADS.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { glass, toggle } from "../components/ui";
import { weakLead } from "../components/rfq";

export function drawUSP(ctx: any, t: number) {
  const tNo1 = ws("no ad"), tSpend = ws("spend"), tFrom = ws("from"), tNo2 = ws("no random"), tLeads = ws("leads");
  const cut2 = tNo2 - 0.06;
  background(ctx, t, { grid: 0.5, glowA: 1.3 });
  if (t < cut2) {
    const [sx, sy] = shake(t, tNo1, 9);
    ctx.save(); ctx.translate(sx, sy);
    // dimmed ad-spend visual: budget card that switches off
    const dim = ep(t, tSpend + 0.1, 0.5);
    ctx.save(); ctx.globalAlpha = 0.9 - 0.55 * dim;
    ctx.translate(W / 2, 560); ctx.rotate(-0.04); ctx.translate(-W / 2, -560);
    glass(ctx, 150, 360, 780, 380, { r: 32 });
    text(ctx, "AD BUDGET", 200, 440, { size: 24, weight: 700, family: F.mono, ls: 3, color: C.sub });
    text(ctx, "Daily spend", 200, 520, { size: 34, weight: 700, color: C.navy });
    toggle(ctx, 780, 490, 1 - dim, 1.6);
    rr(ctx, 200, 580, 680, 22, 11); ctx.fillStyle = "#E3EBF5"; ctx.fill();
    rr(ctx, 200, 580, 680 * lerp(0.75, 0, dim), 22, 11); ctx.fillStyle = C.elec; ctx.fill();
    text(ctx, dim > 0.5 ? "Not your cost" : "Billed to you", 200, 680, { size: 30, weight: 800, color: dim > 0.5 ? "#05834F" : C.red });
    ctx.restore();
    // strike across the card on "spend"
    const st = ep(t, tSpend + 0.05, 0.3, outExpo);
    if (st > 0) { ctx.save(); ctx.strokeStyle = C.cyan; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(140, 760); ctx.lineTo(140 + 800 * st, 340); ctx.stroke(); ctx.restore(); }
    kline(ctx, t, { x: W / 2, y: 1190, size: 330, align: "center", words: [{ s: "NO", t: tNo1, anim: "slam", grad: true }] });
    kline(ctx, t, { x: W / 2, y: 1380, size: 150, align: "center", words: [{ s: "AD", t: ws("ad spend"), anim: "rise" }, { s: "SPEND", t: tSpend, anim: "rise" }] });
    kline(ctx, t, { x: W / 2, y: 1480, size: 48, align: "center", weight: 700, color: "#CFE9FF", words: [{ s: "FROM", t: tFrom, anim: "blur" }, { s: "YOUR", t: ws("your side") }, { s: "SIDE.", t: ws("side") }] });
    ctx.restore();
  } else {
    const [sx, sy] = shake(t, tNo2 + 0.02, 9);
    const fold = ep(t, we("leads") + 0.12, 0.35, inOutExpo);
    ctx.save(); ctx.translate(sx, sy);
    // random leads fade back and grey out
    const g = ep(t, tLeads, 0.5);
    ctx.save(); ctx.globalAlpha = (0.9 - 0.6 * g) * (1 - fold);
    weakLead(ctx, 90, 380, 1.05, ["JD", "John D."], "What's your price?", { rot: -0.06, grey: g });
    weakLead(ctx, 570, 470, 0.95, ["SM", "Sam M."], "Just checking", { rot: 0.05, grey: g });
    ctx.restore();
    ctx.save(); ctx.globalAlpha = 1 - fold; ctx.translate(W / 2, 1300); ctx.scale(1 - 0.5 * fold, 1 - 0.5 * fold); ctx.translate(-W / 2, -1300);
    kline(ctx, t, { x: W / 2, y: 1190, size: 330, align: "center", words: [{ s: "NO", t: tNo2, anim: "slam", grad: true }] });
    kline(ctx, t, { x: W / 2, y: 1370, size: 136, align: "center", words: [{ s: "RANDOM", t: ws("random"), anim: "rise" }] });
    kline(ctx, t, { x: W / 2, y: 1510, size: 136, align: "center", words: [{ s: "LEADS.", t: tLeads, anim: "rise" }] });
    ctx.restore();
    ctx.restore();
  }
  const f = prog(t, cut2 - 0.02, cut2 + 0.1);
  if (f > 0 && f < 1) streak(ctx, lerp(-100, W + 100, f), 1, 0.2);
}
