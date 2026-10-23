// 08 QUALIFICATION GATE — "Yani aap us opportunity ke liye pay kar rahe hain jo defined
// qualification criteria ke mutabiq aapke sales team tak pohanchti hai." Many inquiries in,
// the gate checks the agreed criteria, one clean RFQ goes on to the sales team.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, inCubic, lerp, prog, rgba, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, checkBadge, pill, avatar } from "../components/ui";
import { rfqCard, pulseDot } from "../components/rfq";
import { patch } from "../components/patches";

const CRIT = ["Requirement complete", "Buyer details", "Patch specifications", "Timeline", "Artwork", "Quantity"];
const GATE = { x: 100, y: 660, w: 880, h: 400 };
const IN: [string, boolean][] = [["“Need pricing”", false], ["RFQ · 500 pcs", true], ["“Just checking”", false], ["“I need patches”", false], ["“How much?”", false]];

export function drawGate(ctx: any, t: number) {
  const t0 = ws("yani") - 0.1, tOpp = ws("opportunity"), tDef = ws("defined"), tCrit = ws("criteria"), tSales = ws("sales", 1), tPoh = ws("pohanchti");
  background(ctx, t, { grid: 0.45 });
  // incoming inquiries drop toward the gate; only the complete one passes
  IN.forEach(([lab, ok], i) => {
    const at = t0 + 0.1 + i * 0.35;
    const p = clamp((t - at) / 1.6);
    if (p <= 0) return;
    const x0 = 140 + i * 170, y0 = 470;
    let x = x0, y = lerp(y0, GATE.y - 40, inCubic(clamp(p * 1.6))), a = clamp(p * 5);
    if (!ok && p > 0.62) { const q = (p - 0.62) / 0.38; x += (i < 2 ? -1 : 1) * q * 420; y -= Math.sin(q * Math.PI) * 60; a *= 1 - q; }
    if (ok && p > 0.62) a *= 1 - clamp((p - 0.62) * 6);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    ctx.font = `800 24px Inter`;
    const tw = ctx.measureText(lab).width + 48;
    rr(ctx, x - tw / 2 + 60, y, tw, 58, 29); ctx.fillStyle = ok ? "#fff" : "#F4F6FA"; ctx.fill();
    ctx.strokeStyle = ok ? C.elec : rgba(C.red, 0.4); ctx.lineWidth = 2; ctx.stroke();
    text(ctx, lab, x + 60, y + 38, { size: 24, weight: 800, color: ok ? C.blue : C.mute, align: "center" });
    ctx.restore();
  });
  // the gate
  const ga = ep(t, t0, 0.5, outQuart);
  ctx.save(); ctx.globalAlpha *= ga; ctx.translate(0, (1 - ga) * 40);
  glass(ctx, GATE.x, GATE.y, GATE.w, GATE.h, { r: 34, shadow: 1, focus: ep(t, tDef, 0.5) });
  text(ctx, "QUALIFICATION GATE", GATE.x + 40, GATE.y + 62, { size: 22, weight: 700, family: F.mono, ls: 3, color: C.sub });
  text(ctx, "Agreed criteria", GATE.x + GATE.w - 40, GATE.y + 62, { size: 22, weight: 700, color: C.blue, align: "right" });
  CRIT.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = GATE.x + 40 + col * 410, y = GATE.y + 96 + row * 92;
    const on = ep(t, tDef + 0.1 + i * 0.22, 0.3);
    rr(ctx, x, y, 390, 76, 18); ctx.fillStyle = on > 0.5 ? rgba(C.green, 0.08) : "#F5F8FC"; ctx.fill();
    ctx.strokeStyle = on > 0.5 ? rgba(C.green, 0.45) : C.line; ctx.lineWidth = 1.5; ctx.stroke();
    text(ctx, c, x + 24, y + 48, { size: 25, weight: 700, color: C.navy });
    if (on > 0) checkBadge(ctx, x + 354, y + 38, 17, on); else { ctx.beginPath(); ctx.arc(x + 354, y + 38, 15, 0, 7); ctx.strokeStyle = C.line2; ctx.lineWidth = 2; ctx.stroke(); }
  });
  ctx.restore();
  // output: one clean RFQ → ready for sales follow-up
  const oa = ep(t, tCrit + 0.4, 0.5, outBack);
  if (oa > 0) {
    const pp = prog(t, tCrit + 0.1, tCrit + 0.6);
    if (pp > 0 && pp < 1) pulseDot(ctx, W / 2, lerp(GATE.y + GATE.h, 1120, inOutCubic(pp)), 11);
    ctx.save(); ctx.globalAlpha *= clamp(oa * 2); ctx.translate(0, (1 - oa) * 40);
    glow(ctx, W / 2, 1200, 400, C.cyan, 0.16);
    glass(ctx, 100, 1110, 880, 180, { r: 30, focus: 1, shadow: 1 });
    patch(ctx, "apex", 190, 1200, 110);
    text(ctx, "Qualified RFQ · Apex Apparel", 270, 1180, { size: 32, weight: 800, color: C.navy });
    text(ctx, "Embroidered · 500 pcs · Dec 12 · artwork", 270, 1222, { size: 23, weight: 600, color: C.sub });
    pill(ctx, 270, 1240, "Requirement complete", ep(t, tCrit + 0.7, 0.3), C.green, 17);
    ctx.restore();
  }
  // sales team hand-off
  const sa = ep(t, tSales - 0.1, 0.5, outBack);
  if (sa > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(sa * 2); ctx.translate(0, (1 - sa) * 30);
    rr(ctx, 100, 1330, 880, 120, 60); ctx.fillStyle = C.navy; ctx.fill();
    ["S", "A", "M"].forEach((n, i) => avatar(ctx, 170 + i * 46, 1390, 30, n, [C.blue, C.elec, "#2D7BFF"][i]));
    text(ctx, "READY FOR SALES FOLLOW-UP", 300, 1402, { size: 32, weight: 800, family: F.head, color: "#fff" });
    checkBadge(ctx, 926, 1390, 24, ep(t, tPoh, 0.4));
    ctx.restore();
  }
  // type
  kline(ctx, t, { x: W / 2, y: 520, size: 46, align: "center", weight: 700, ls: 6, words: [{ s: "DEFINED", t: tDef, anim: "rise", color: C.sub }] });
  kline(ctx, t, { x: W / 2, y: 610, size: 62, align: "center",
    words: [{ s: "QUALIFICATION", t: ws("qualification"), anim: "rise", grad: true }, { s: "CRITERIA", t: tCrit, anim: "rise" }] });
}
