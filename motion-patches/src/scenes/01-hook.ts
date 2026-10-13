// 01 HOOK — production capacity is there; customer acquisition is the bottleneck.
import { C, F, W, H } from "../core/brand";
import { background, text, cover, rr, glow, vignette, icon } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutCubic, inOutExpo, lerp, prog, hash, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { video } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { glass, pill } from "../components/ui";
import { sectionTag } from "../components/rfq";

export function drawHook(ctx: any, t: number) {
  const tCap = ws("capacity"), tAcq = ws("customer acquisition"), tProb = ws("that's the real problem");
  const [sx, sy] = shake(t, ws("problem") + 0.02, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.3 });

  // footage: full-bleed hook, then docks into a cinematic panel on "capacity"
  const dock = ep(t, tCap - 0.15, 0.9, inOutExpo);
  const px = lerp(0, 90, dock), py = lerp(0, 150, dock), pw = lerp(W, 980, dock), ph = lerp(H, 700, dock);
  const dim = ep(t, tProb - 0.1, 0.6);
  ctx.save();
  rr(ctx, px, py, pw, ph, lerp(0, 26, dock)); ctx.clip();
  const vt = (t - 0.0) * 0.85;
  cover(ctx, video("embroidery", vt), px, py, pw, ph, 0.5, 0.55, 1.12 - 0.08 * prog(t, 0, 10));
  // cool grade + darken
  ctx.fillStyle = "rgba(4,16,34,0.30)"; ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = "rgba(3,6,11,0.15)"; ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = `rgba(248,251,255,${0.82 * dim})`; ctx.fillRect(px, py, pw, ph);
  ctx.restore();
  if (dock > 0.01) { ctx.save(); ctx.globalAlpha = dock; rr(ctx, px, py, pw, ph, 26); ctx.strokeStyle = C.line2; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  if (dock < 0.99) { ctx.save(); ctx.globalAlpha = 1 - dock; vignette(ctx, 0.75); ctx.restore(); }

  // opening eyebrow typed on
  const eb = "CUSTOM PATCH & EMBROIDERY";
  const n = Math.floor(clamp((t - 0.6) / 0.9) * eb.length);
  text(ctx, eb.slice(0, n), lerp(120, 120, dock), lerp(130, 110, dock), { size: 18, weight: 700, family: F.mono, ls: 6, color: C.elec, alpha: 1 - dim * 0.8 });
  kline(ctx, t, { x: 120, y: 230, size: 64, weight: 800, out: tCap - 0.2, outAnim: "up", outDur: 0.3,
    color: "#fff", words: [{ s: "BUILT", t: ws("business"), anim: "rise" }, { s: "TO", t: ws("business") + 0.12 }, { s: "PRODUCE.", t: ws("and have") + 0.05, color: C.cyan }] });

  // right column: capacity (high) vs acquisition (inconsistent)
  const cx = 1110, cw = 700;
  const a1 = ep(t, tCap, 0.6, outQuart);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1 * (1 - dim * 0.75); ctx.translate((1 - a1) * 60, 0);
    glass(ctx, cx, 150, cw, 270, { focus: t < tAcq ? 1 : 0.2 });
    text(ctx, "PRODUCTION CAPACITY", cx + 32, 196, { size: 15, weight: 700, family: F.mono, ls: 2, color: C.sub });
    const lvl = 0.9 * ep(t, tCap + 0.2, 1.2, inOutCubic);
    rr(ctx, cx + 32, 222, cw - 64, 18, 9); ctx.fillStyle = "#E6EEF7"; ctx.fill();
    const g = ctx.createLinearGradient(cx, 0, cx + cw, 0); g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan);
    rr(ctx, cx + 32, 222, (cw - 64) * lvl, 18, 9); ctx.fillStyle = g; ctx.fill();
    text(ctx, `${Math.round(lvl * 100)}%`, cx + cw - 32, 196, { size: 18, weight: 800, family: F.head, color: C.blue, align: "right" });
    // machines online
    for (let i = 0; i < 12; i++) {
      const on = ep(t, tCap + 0.4 + i * 0.07, 0.25);
      rr(ctx, cx + 32 + i * 53, 268, 42, 42, 10);
      ctx.fillStyle = rgba(C.green, 0.08 + 0.18 * on); ctx.fill();
      ctx.strokeStyle = rgba(C.green, 0.2 + 0.5 * on); ctx.lineWidth = 1.2; ctx.stroke();
      icon(ctx, "gear", cx + 41 + i * 53, 277, 24, on > 0.5 ? "#05834F" : C.mute, 1.8);
    }
    text(ctx, "Machines ready for more orders", cx + 32, 362, { size: 20, weight: 600, color: C.text });
    pill(ctx, cx + cw - 190, 340, "Ready", ep(t, tCap + 1.1, 0.4));
    ctx.restore();
  }
  const a2 = ep(t, tAcq - 0.1, 0.6, outQuart);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2 * (1 - dim * 0.75); ctx.translate((1 - a2) * 60, 0);
    glass(ctx, cx, 470, cw, 380, { focus: 1 - dim });
    text(ctx, "NEW ORDERS / WEEK", cx + 32, 516, { size: 15, weight: 700, family: F.mono, ls: 2, color: C.sub });
    const bars = [0.7, 0.15, 0.05, 0.55, 0.1, 0.0, 0.35, 0.08, 0.6, 0.02, 0.12, 0.4];
    bars.forEach((v, i) => {
      const p = ep(t, tAcq + 0.15 + i * 0.06, 0.4, outBack);
      const h = Math.max(4, 200 * v * p);
      const bx = cx + 36 + i * 54;
      rr(ctx, bx, 790 - h, 36, h, 6);
      ctx.fillStyle = v < 0.2 ? rgba(C.red, 0.75) : rgba(C.elec, 0.8); ctx.fill();
    });
    ctx.strokeStyle = "rgba(100,130,170,0.35)"; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(cx + 32, 600); ctx.lineTo(cx + cw - 32, 600); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, "capacity", cx + cw - 32, 592, { size: 13, weight: 600, color: C.mute, align: "right" });
    pill(ctx, cx + cw - 200, 494, "Inconsistent", ep(t, ws("inconsistent"), 0.4), C.red);
    text(ctx, "Pipeline underfilled", cx + 32, 830, { size: 20, weight: 600, color: C.text });
    ctx.restore();
  }
  // L2: CUSTOMER ACQUISITION over the footage
  kline(ctx, t, { x: 130, y: 800, size: 70, weight: 800, out: tProb - 0.15, outAnim: "fade", outDur: 0.3,
    color: "#fff", words: [{ s: "CUSTOMER", t: tAcq, anim: "rise" }, { s: "ACQUISITION", t: ws("acquisition"), anim: "rise", color: C.cyan }] });
  // L1: THAT'S THE REAL PROBLEM.
  if (t > tProb - 0.1) {
    sectionTag(ctx, "01", "The bottleneck", ep(t, tProb, 0.4));
    kline(ctx, t, { x: W / 2, y: 480, size: 92, weight: 700, align: "center", color: C.sub,
      words: [{ s: "THAT'S", t: tProb, anim: "rise" }, { s: "THE", t: ws("the real") }, { s: "REAL", t: ws("real problem") }] });
    kline(ctx, t, { x: W / 2, y: 650, size: 190, align: "center",
      words: [{ s: "PROBLEM.", t: ws("problem"), anim: "slam", grad: true }] });
  }
  ctx.restore();
}
