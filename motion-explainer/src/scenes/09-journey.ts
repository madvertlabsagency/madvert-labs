// 09 NOT GENERIC + 10 YOUR BRAND, END TO END — "Aur ye system generic nahi hota. Campaign aapke
// brand ke naam se chalta hai, landing page aapke brand ke liye build hota hai, aur buyer ko
// poora experience aapke business ka hi nazar aata hai."
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { iconTile, checkBadge } from "../components/ui";
import { pulseDot } from "../components/rfq";
import { shield } from "../components/explainer";
import { logo } from "../components/brand";

/** Short visual reset: a generic grey template gets stamped with the client's brand. */
export function drawGeneric(ctx: any, t: number) {
  const t0 = ws("aur ye system") - 0.1, tGen = ws("generic"), tNot = ws("nahi hota", 1);
  background(ctx, t, { grid: 0.25, glowA: 0.7 });
  // grey template card that turns into the branded one
  const brand = ep(t, tNot + 0.15, 0.5, inOutExpo);
  const a = ep(t, t0, 0.4, outQuart);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(W / 2, 760); ctx.rotate(-0.03 * (1 - brand)); ctx.scale(lerp(0.96, 1, brand), lerp(0.96, 1, brand)); ctx.translate(-W / 2, -760);
  rr(ctx, 240, 540, 600, 440, 30); ctx.fillStyle = brand > 0.5 ? "#fff" : "#EEF2F7"; ctx.fill();
  ctx.strokeStyle = brand > 0.5 ? "#F07A1F" : C.line2; ctx.lineWidth = 3; ctx.setLineDash(brand > 0.5 ? [] : [14, 10]); ctx.stroke(); ctx.setLineDash([]);
  if (brand < 0.5) {
    text(ctx, "GENERIC TEMPLATE", W / 2, 640, { size: 26, weight: 700, family: F.mono, ls: 4, color: C.mute, align: "center" });
    for (let i = 0; i < 3; i++) { rr(ctx, 300, 690 + i * 70, 480 - i * 90, 30, 15); ctx.fillStyle = "#DCE3EC"; ctx.fill(); }
  } else {
    shield(ctx, W / 2, 680, 3.2 * outBack(clamp((brand - 0.5) * 2)));
    text(ctx, "YOUR BRAND", W / 2, 840, { size: 54, weight: 800, family: F.head, color: C.navy, align: "center" });
    text(ctx, "Campaign · Page · Landing page", W / 2, 900, { size: 26, weight: 600, color: C.sub, align: "center" });
  }
  ctx.restore();
  kline(ctx, t, { x: W / 2, y: 1170, size: 120, align: "center", out: tNot + 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "NOT", t: tGen - 0.15, anim: "slam" }, { s: "GENERIC.", t: tGen, anim: "slam", color: C.red }] });
  kline(ctx, t, { x: W / 2, y: 1150, size: 76, align: "center", words: [{ s: "BUILT", t: tNot + 0.2, anim: "rise" }, { s: "AROUND", t: tNot + 0.3, anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 1260, size: 96, align: "center", words: [{ s: "YOUR", t: tNot + 0.4, anim: "rise", grad: true }, { s: "BRAND.", t: tNot + 0.5, anim: "rise", grad: true }] });
}

const NODES: [string, string, string, number][] = [
  ["YOUR BRAND PAGE", "store", "Facebook & Instagram", 0], ["YOUR AD", "megaphone", "Runs under your name", 1], ["YOUR LANDING PAGE", "globe", "quote.yourbrand.com", 2],
  ["YOUR RFQ", "doc", "Branded quote request", 3], ["YOUR SALES TEAM", "users", "Your team closes the deal", 4],
];
const NY = (i: number) => 520 + i * 136;

export function drawJourney(ctx: any, t: number) {
  const tC = ws("campaign"), tL = ws("landing", 1), tBuild = ws("build", 1), tBuyer = ws("buyer", 2), tPoora = ws("poora"), tBiz = ws("business", 1);
  const on = [tC - 0.05, ws("brand", 2), tL, tBuild + 0.1, tBuyer + 0.1];
  const [sx, sy] = shake(t, tPoora, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.5 });
  const path: [number, number][] = [[150, NY(0)], [150, NY(4)]];
  const sp = sample(path, 120);
  const rp = ep(t, on[0], on[4] - on[0] + 0.2, inOutCubic);
  if (rp > 0.01) ribbon(ctx, sp, { to: rp, width: 5, flow: t, speed: t > on[4] ? 1 : 0, pulses: 2 });
  NODES.forEach(([lab, ic, sub], i) => {
    const a = ep(t, on[i] - 0.15, 0.4, outQuart);
    if (a <= 0) return;
    const act = ep(t, on[i], 0.3);
    const x = 110, y = NY(i) - 54, w = 860, h = 108;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * 60, 0);
    ctx.shadowColor = "rgba(20,60,120,0.14)"; ctx.shadowBlur = 36; ctx.shadowOffsetY = 12;
    rr(ctx, x + 80, y, w - 80, h, 26); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.lineWidth = 2.5; ctx.strokeStyle = act > 0.5 ? "rgba(240,122,31,0.55)" : C.line; ctx.stroke();
    ctx.beginPath(); ctx.arc(150, NY(i), 30, 0, 7); ctx.fillStyle = "#FFF1E6"; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = "#F07A1F"; ctx.stroke();
    shield(ctx, 150, NY(i), 0.95);
    iconTile(ctx, ic, x + 104, y + 18, 72, C.blue, act);
    text(ctx, lab, x + 200, y + 50, { size: 33, weight: 800, family: F.head, color: C.navy });
    text(ctx, sub, x + 200, y + 84, { size: 22, weight: 600, color: C.sub });
    if (act > 0.5) checkBadge(ctx, x + w - 46, y + h / 2, 18, (act - 0.5) * 2);
    ctx.restore();
  });
  const pp = prog(t, tBuyer, tBuyer + 1.0);
  if (pp > 0 && pp < 1) { const p = pointAt(sp, inOutCubic(pp)); pulseDot(ctx, p.x, p.y, 11); }
  // Madvert operates the engine underneath
  const ea = ep(t, tBuild, 0.5, outQuart);
  if (ea > 0) {
    ctx.save(); ctx.globalAlpha *= ea * 0.95;
    rr(ctx, 110, 1210, 860, 70, 35); ctx.fillStyle = "rgba(10,15,28,0.06)"; ctx.fill();
    ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.elec, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
    text(ctx, "ENGINE ROOM", 150, 1254, { size: 19, weight: 700, family: F.mono, ls: 3, color: C.sub });
    logo(ctx, 620, 1226, 200);
    text(ctx, "operates it", 930, 1254, { size: 22, weight: 600, color: C.sub, align: "right" });
    ctx.restore();
  }
  glow(ctx, W / 2, 1400, 500, C.elec, 0.12 * ep(t, tPoora, 0.5));
  kline(ctx, t, { x: W / 2, y: 1400, size: 100, align: "center", words: [{ s: "YOUR", t: tPoora - 0.05, anim: "slam" }, { s: "BRAND.", t: tPoora + 0.15, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1500, size: 70, align: "center", weight: 800, words: [{ s: "END", t: tBiz - 0.1, anim: "rise" }, { s: "TO", t: tBiz }, { s: "END.", t: tBiz + 0.1, anim: "rise", color: C.blue }] });
  ctx.restore();
}
