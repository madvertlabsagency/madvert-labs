// 09 REAL BUYING INTENT — weak leads fall away; the complete RFQ stays, its signals tick.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, inCubic, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, checkBadge, avatar } from "../components/ui";
import { sectionTag, rfqCard, weakLead } from "../components/rfq";

export function drawIntent(ctx: any, t: number) {
  const t0 = ws("so your team") - 0.25;
  const tOnly = ws("only on people"), tReal = ws("real buying");
  background(ctx, t, { grid: 0.35 });
  sectionTag(ctx, "08", "Only high-intent buyers", ep(t, t0, 0.4));
  // weak leads (left) fall away
  const leads: [[string, string], string][] = [[["SM", "Sam M."], "Need price"], [["JD", "John D."], "Just checking"], [["RK", "Rob K."], "Looking around"]];
  leads.forEach(([who, q], i) => {
    const a = ep(t, t0 + i * 0.1, 0.5, outQuart);
    const f = ep(t, tOnly + i * 0.12, 0.8, inCubic);
    if (a <= 0 || f >= 1) return;
    weakLead(ctx, 110 + i * 70, 250 + i * 150 + f * 700, 0.9, who, q, { alpha: a * (1 - f), rot: (i - 1) * 0.05 + f * (i - 1) * 0.3, grey: ep(t, tOnly - 0.2, 0.4) });
  });
  // the RFQ: enters right, moves centre-left as the noise clears
  const ea = ep(t, t0 + 0.2, 0.6, outQuart);
  const mv = ep(t, tOnly - 0.05, 0.55, inOutExpo);
  const cx = lerp(1200, 330, mv), cy = 215;
  rfqCard(ctx, cx + (1 - ea) * 200, cy, 0.9, { qualified: 1, focus: 1, alpha: ea });
  // checklist
  const ca = ep(t, tOnly + 0.3, 0.5, outQuart);
  if (ca > 0) {
    const x = 940, y = 250;
    ctx.save(); ctx.globalAlpha *= ca; ctx.translate((1 - ca) * 80, 0);
    glass(ctx, x, y, 760, 560, { r: 28, focus: 0.8 });
    ctx.beginPath(); ctx.arc(x + 90, y + 92, 50, 0, 7); ctx.fillStyle = rgba(C.elec, 0.12); ctx.fill(); ctx.strokeStyle = C.elec; ctx.lineWidth = 3; ctx.stroke();
    icon(ctx, "user", x + 66, y + 68, 48, C.blue, 2.4);
    text(ctx, "High-intent", x + 168, y + 84, { size: 40, weight: 800, family: F.head });
    text(ctx, "buyer", x + 168, y + 128, { size: 40, weight: 800, family: F.head, color: C.blue });
    const items = ["Specifications complete", "Contact verified", "Deadline provided", "Artwork attached"];
    const ticks = [ws("people"), ws("who have"), ws("already"), ws("shown")];
    items.forEach((s, i) => {
      const yy = y + 190 + i * 88, p = ep(t, ticks[i], 0.35, outBack);
      rr(ctx, x + 40, yy, 680, 72, 16); ctx.fillStyle = p > 0.5 ? rgba(C.green, 0.08) : "#F5F8FC"; ctx.fill(); ctx.strokeStyle = p > 0.5 ? rgba(C.green, 0.35) : C.line; ctx.lineWidth = 1.2; ctx.stroke();
      if (p > 0) checkBadge(ctx, x + 84, yy + 36, 20, p); else { ctx.beginPath(); ctx.arc(x + 84, yy + 36, 18, 0, 7); ctx.strokeStyle = "#C8D5E5"; ctx.lineWidth = 2; ctx.stroke(); }
      text(ctx, s, x + 128, yy + 45, { size: 26, weight: 700, color: p > 0.5 ? C.text : C.mute });
    });
    ctx.restore();
  }
  kline(ctx, t, { x: 120, y: 175, size: 54, out: tReal - 0.15, outAnim: "up", outDur: 0.25,
    words: [{ s: "YOUR", t: ws("your team") }, { s: "TEAM'S", t: ws("team") }, { s: "TIME", t: ws("time"), grad: true }] });
  kline(ctx, t, { x: W / 2, y: 180, size: 92, align: "center",
    words: [{ s: "REAL", t: tReal, anim: "slam" }, { s: "BUYING", t: ws("buying") }, { s: "INTENT.", t: ws("intent"), grad: true, anim: "slam" }] });
}
