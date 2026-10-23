// 01 PROBLEM — "Aksar custom patch businesses ka masla ye nahi hota ke inquiries nahi aa rahi
// hotin. Masla ye hota hai ke inquiries random hoti hain, serious buyer ka pata nahi chalta,
// aur sales team ka time waste hota hai." Volume without qualification.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { bubble, footage } from "../components/explainer";
import { pill } from "../components/ui";
import { cutFlash } from "../components/vert";

// [initials, message, missing tag]
const LEADS: [string, string, string][] = [
  ["JM", "I need patches", "No quantity"], ["AK", "Need pricing", "No artwork"], ["RS", "Just checking", "No deadline"],
  ["TL", "How much?", "No quantity"], ["DB", "Send prices", "No artwork"], ["MC", "I need patches", "No deadline"],
  ["KO", "Just checking", ""], ["PN", "Need pricing", "No quantity"], ["SV", "Hi, price?", "No artwork"],
];

export function drawProblem(ctx: any, t: number) {
  const tInq = ws("inquiries"), tM2 = ws("masla", 1) - 0.15, tRand = ws("random"), tSer = ws("serious"), tSales = ws("sales") - 0.15, tWaste = ws("waste");
  background(ctx, t, { grid: 0.5 });
  const [sx, sy] = shake(t, tRand, 8);
  ctx.save(); ctx.translate(sx, sy);
  // A — macro embroidery footage, the business is busy; inquiries keep landing
  const fa = 1 - ep(t, tM2, 0.6, inOutCubic) * 0.75;
  const toOwner = ep(t, tSales, 0.55, inOutExpo);
  const fx = 70, fy = 430, fw = 940, fh = 1060;
  if (toOwner < 1) {
    ctx.save(); ctx.globalAlpha *= fa * (1 - toOwner);
    footage(ctx, "embroidery", 0.3 + t * 0.8, fx, fy, fw, fh, { fx: 0.5, fy: 0.55, zoom: 1.2 + t * 0.02, dim: 0.15 + 0.3 * ep(t, tM2, 0.6) });
    ctx.restore();
  }
  // inquiry bubbles: many, staggered, back layers small and soft (volume, not all readable)
  const grey = ep(t, tRand, 0.6);
  LEADS.forEach(([who, msg, tag], i) => {
    const at = 0.35 + i * (tInq + 0.6 - 0.35) / LEADS.length + (i > 5 ? 0.6 : 0);
    const a = ep(t, at, 0.45, outBack);
    if (a <= 0) return;
    const back = i % 3 === 2;
    const s = (back ? 0.72 : 0.95) * lerp(0.85, 1, a);
    const col = i % 2, row = Math.floor(i / 2);
    const x = (col ? 470 : 90) + (hash(i * 3.1) - 0.5) * 60;
    const y = 480 + row * 205 + (hash(i * 7.3) - 0.5) * 50 - (1 - a) * 60 + Math.sin(t * 0.8 + i) * 6;
    const out = ep(t, tSales - 0.1, 0.45, inOutCubic);
    ctx.save(); ctx.globalAlpha *= clamp(a * 2) * (back ? 0.55 : 1) * (1 - out);
    bubble(ctx, x, y - out * 80, s, who, msg, tag, { grey, rot: (hash(i * 5.7) - 0.5) * 0.08 });
    ctx.restore();
  });
  // inquiry counter
  const ca = ep(t, tInq - 0.2, 0.4, outBack) * (1 - ep(t, tSales - 0.1, 0.3));
  if (ca > 0) {
    const n = Math.min(48, Math.floor(clamp((t - tInq + 0.2) / 3.5) * 48));
    ctx.save(); ctx.globalAlpha *= clamp(ca * 2);
    rr(ctx, 70, 300, 420, 84, 42); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = rgba(C.elec, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(116, 342, 22, 0, 7); ctx.fillStyle = C.blue; ctx.fill(); icon(ctx, "bell", 102, 328, 28, "#fff", 2.4);
    text(ctx, `+${n} new inquiries`, 156, 354, { size: 34, weight: 800, color: C.navy });
    ctx.restore();
  }
  ctx.restore();

  // B — kinetic: RANDOM LEADS. → INQUIRIES ≠ QUALIFIED BUYERS
  const scr = ep(t, tM2, 0.5) * (1 - ep(t, tSales, 0.4));
  if (scr > 0) { ctx.save(); ctx.globalAlpha = scr * 0.82; ctx.fillStyle = "#F7FAFE"; ctx.fillRect(0, 1180, W, 420); ctx.restore(); }
  kline(ctx, t, { x: W / 2, y: 1330, size: 112, align: "center", out: tSer - 0.15, outAnim: "up", outDur: 0.25,
    words: [{ s: "RANDOM", t: tRand, anim: "slam" }, { s: "LEADS.", t: tRand + 0.2, anim: "slam", color: C.red }] });
  kline(ctx, t, { x: W / 2, y: 1300, size: 104, align: "center", out: tSales - 0.15, outAnim: "up", outDur: 0.25, words: [{ s: "INQUIRIES", t: tSer - 0.1, anim: "rise" }] });
  const nb = kline(ctx, t, { x: W / 2, y: 1440, size: 104, align: "center", out: tSales - 0.15, outAnim: "up", outDur: 0.25,
    words: [{ s: "=", t: tSer + 0.15, anim: "slam", color: C.red }, { s: "QUALIFIED", t: ws("buyer") - 0.05, grad: true }] });
  // the "not equal" slash (the brand font has no ≠ glyph)
  const sl = ep(t, tSer + 0.3, 0.25, outExpo) * (1 - ep(t, tSales - 0.15, 0.2));
  if (sl > 0) {
    const b = nb[0], cx = b.x + b.w / 2, cy = b.y + b.h * 0.42;
    ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 10; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx + 26, cy - 44); ctx.lineTo(cx + 26 - 52 * sl, cy - 44 + 88 * sl); ctx.stroke(); ctx.restore();
  }
  kline(ctx, t, { x: W / 2, y: 1560, size: 104, align: "center", out: tSales - 0.15, outAnim: "up", outDur: 0.25, words: [{ s: "BUYERS", t: ws("buyer") + 0.15, grad: true }] });

  // C — the sales team's time: owner at the laptop, clock running
  if (toOwner > 0) {
    ctx.save(); ctx.globalAlpha *= toOwner;
    const lt = t - tSales;
    footage(ctx, "owner", 1.0 + lt * 0.7, fx, fy, fw, 760, { fx: 0.6, fy: 0.4, zoom: 1.15 + lt * 0.02, dim: 0.1 + 0.2 * ep(t, tWaste, 0.5) });
    // time sink card
    const ka = ep(t, tSales + 0.25, 0.5, outBack);
    if (ka > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(ka * 2); ctx.translate(0, (1 - ka) * 40);
      rr(ctx, 130, 1050, 820, 116, 30); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = rgba(C.red, 0.35); ctx.lineWidth = 2; ctx.stroke();
      // clock
      ctx.save(); ctx.translate(200, 1108);
      ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.stroke();
      const ang = (t - tSales) * 5;
      ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(ang) * 24, -Math.cos(ang) * 24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(ang / 12) * 15, -Math.cos(ang / 12) * 15); ctx.stroke();
      ctx.restore();
      text(ctx, "Chasing unclear inquiries", 260, 1100, { size: 32, weight: 800, color: C.navy });
      text(ctx, "Quantity? Artwork? Deadline?", 260, 1140, { size: 26, weight: 600, color: C.sub });
      ctx.restore();
    }
    ctx.restore();
    kline(ctx, t, { x: W / 2, y: 1330, size: 120, align: "center", words: [{ s: "WASTED", t: tWaste - 0.15, anim: "slam", color: C.red }] });
    kline(ctx, t, { x: W / 2, y: 1460, size: 120, align: "center", words: [{ s: "SALES", t: tWaste + 0.05, anim: "rise" }, { s: "TIME.", t: tWaste + 0.2, anim: "rise" }] });
  }
  cutFlash(ctx, t, tSales + 0.2);
  const sw = prog(t, tRand - 0.1, tRand + 0.4);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.5, 0.2);
}
