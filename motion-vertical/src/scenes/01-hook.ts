// 01 HOOK (0 → "Madvert Labs"): audience, USA market, the acquisition problem, then a
// hyperframe burst through the system that snaps into the brand.
import { C, F, W, H } from "../core/brand";
import { rr, text, icon, glow, streak, background } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { plate, scrims, burst, usChip, cutFlash } from "../components/vert";
import { glass, pill, checkBadge, iconTile, button, avatar } from "../components/ui";
import { patch } from "../components/patches";
import { rfqCard, pulseDot } from "../components/rfq";
import { ribbon } from "../components/ribbon";

export function drawHook(ctx: any, t: number) {
  const tServe = ws("serves") - 0.15, tBut = ws("but") - 0.12, tThis = ws("this is for"), tBurst = we("for you") - 0.12;
  if (t < tServe) opening(ctx, t);
  else if (t < tBut) usa(ctx, t, tServe, tBut);
  else if (t < tBurst) problem(ctx, t, tBut, tThis);
  else montage(ctx, t, tBurst);
}

// 0.00 → "serves": macro hyperframes + CUSTOM PATCH / OR EMBROIDERY / BUSINESS?
function opening(ctx: any, t: number) {
  const tBiz = ws("business");
  const [i, lt] = burst(t, 0, [0.42, 0.34, 0.5, 0.58, 9]);
  const shots: [string, number, number, number, number][] = [
    ["stitch", 0.25, 0.42, 0.45, 1.35], // needle strike macro
    ["inspect", 2.1, 0.6, 0.55, 1.6], // caliper on stitched edge
    ["stitch", 2.4, 0.3, 0.15, 1.3], // needle row close
    ["stitch", 4.9, 0.62, 0.62, 1.55], // finished patch stacks
    ["stitch", 0.9, 0.38, 0.5, 1.5], // needle close again
  ];
  const [k, vt, fx, fy, z] = shots[i];
  plate(ctx, k, vt + lt, { fx, fy, zoom: z * (1 + lt * 0.05), punchAt: vt, punch: 0.1 });
  scrims(ctx, 0.55, 0.9);
  const [sx, sy] = shake(t, tBiz, 10);
  ctx.save(); ctx.translate(sx, sy);
  text(ctx, "CUSTOM PATCH & EMBROIDERY", W / 2, 330, { size: 24, weight: 700, family: F.mono, ls: 6, color: C.cyan, align: "center", alpha: ep(t, 0.05, 0.3) });
  kline(ctx, t, { x: 80, y: 1120, size: 196, words: [{ s: "CUSTOM", t: 0.0, anim: "slideL", dur: 0.35 }] });
  kline(ctx, t, { x: 80, y: 1300, size: 196, words: [{ s: "PATCH", t: ws("patch") - 0.05, anim: "slideR", dur: 0.35, color: C.cyan }] });
  kline(ctx, t, { x: 84, y: 1410, size: 72, weight: 700, words: [{ s: "OR", t: ws("or") }, { s: "EMBROIDERY", t: ws("embroidery") }] });
  kline(ctx, t, { x: 80, y: 1580, size: 150, words: [{ s: "BUSINESS?", t: tBiz, anim: "slam", dur: 0.3 }] });
  ctx.restore();
  for (const c of [0.42, 0.76, 1.26, 1.84]) cutFlash(ctx, t, c);
}

// "serves the USA": production floor push-in, USA expands, then stretches into a blur wipe
function usa(ctx: any, t: number, t0: number, t1: number) {
  const lt = t - t0;
  plate(ctx, "stitch", 3.3 + lt * 0.9, { fx: 0.62, fy: 0.45, zoom: 1.12 + lt * 0.05, punchAt: 3.3, punch: 0.12 });
  scrims(ctx, 0.6, 0.9);
  const tU = ws("usa");
  kline(ctx, t, { x: 80, y: 1180, size: 120, weight: 800, words: [{ s: "SERVING", t: t0 + 0.02, anim: "slideL", dur: 0.3 }, { s: "THE", t: ws("the usa"), anim: "rise" }] });
  // USA: expands with tracking + cyan fill, then stretches horizontally on exit
  const e = ep(t, tU, 0.45, outExpo);
  const out = prog(t, t1 - 0.22, t1);
  if (e > 0) {
    ctx.save();
    const ls = lerp(60, 14, e);
    ctx.font = `800 300px ${F.head}`; ctx.letterSpacing = `${ls}px`;
    const tw = ctx.measureText("USA?").width;
    const cx = W / 2, y = 1480;
    ctx.translate(cx, y - 100); ctx.scale(lerp(0.7, 1, e) * (1 + out * 2.2), lerp(0.7, 1, e) * (1 - out * 0.6)); ctx.translate(-cx, -(y - 100));
    if (out > 0) ctx.filter = `blur(${(out * 24).toFixed(1)}px)`;
    ctx.globalAlpha = clamp(e * 2) * (1 - out * 0.6);
    const g = ctx.createLinearGradient(cx - tw / 2, 0, cx + tw / 2, 0);
    g.addColorStop(0, "#fff"); g.addColorStop(clamp(e), C.cyan); g.addColorStop(1, C.elec);
    ctx.fillStyle = g; ctx.textAlign = "center"; ctx.fillText("USA?", cx, y);
    ctx.restore();
  }
  usChip(ctx, 80, 360, ep(t, tU + 0.15, 0.35));
  if (out > 0) streak(ctx, lerp(-100, W + 100, out), 1, Math.PI / 2 - 0.0001);
  cutFlash(ctx, t, t0);
}

// "but customer acquisition is still inconsistent, this is for you."
function problem(ctx: any, t: number, t0: number, tThis: number) {
  const lt = t - t0;
  plate(ctx, "owner", 2.3 + lt * 0.8, { fx: 0.62, fy: 0.4, zoom: 1.06 + lt * 0.015, punchAt: 2.3, punch: 0.06, dim: 0.1 + 0.25 * ep(t, ws("still"), 0.5) });
  scrims(ctx, 0.7, 0.92);
  // capacity tick (small, top)
  const ca = ep(t, t0 + 0.05, 0.4, outQuart);
  if (ca > 0) {
    ctx.save(); ctx.globalAlpha *= ca;
    rr(ctx, 80, 250, 520, 76, 38); ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill(); ctx.strokeStyle = rgba(C.green, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
    checkBadge(ctx, 122, 288, 20, ca);
    text(ctx, "PRODUCTION CAPACITY", 158, 298, { size: 26, weight: 800, family: F.head, color: "#fff" });
    ctx.restore();
  }
  // inconsistent inquiry signal (glossy card)
  const ia = ep(t, ws("customer"), 0.5, outQuart) * (1 - ep(t, ws("still") - 0.1, 0.3));
  if (ia > 0) {
    ctx.save(); ctx.globalAlpha *= ia; ctx.translate(0, 580 + (1 - ia) * 40);
    glass(ctx, 80, 420, 920, 300, { r: 28 });
    text(ctx, "NEW INQUIRIES · WEEK BY WEEK", 120, 478, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.sub });
    pill(ctx, 760, 452, "Unpredictable", ep(t, ws("inconsistent"), 0.4), C.amber, 18);
    const bars = [0.8, 0.1, 0.25, 0.05, 0.65, 0.0, 0.15, 0.55, 0.05, 0.3, 0.02, 0.45];
    bars.forEach((v, i) => {
      const p = ep(t, ws("customer") + 0.1 + i * 0.07, 0.35, outBack);
      const h = Math.max(6, 170 * v * p), bx = 120 + i * 72;
      rr(ctx, bx, 690 - h, 48, h, 8);
      ctx.fillStyle = v < 0.2 ? rgba(C.red, 0.8) : C.elec; ctx.fill();
    });
    ctx.restore();
  }
  const up = -280 * ep(t, ws("still") - 0.12, 0.35, inOutCubic);
  kline(ctx, t, { x: 80, y: 1400 + up, size: 88, weight: 800, out: tThis - 0.12, outAnim: "up", outDur: 0.25,
    words: [{ s: "CUSTOMER", t: ws("customer"), anim: "rise" }] });
  kline(ctx, t, { x: 80, y: 1500 + up, size: 88, weight: 800, out: tThis - 0.12, outAnim: "up", outDur: 0.25,
    words: [{ s: "ACQUISITION", t: ws("acquisition"), anim: "rise" }] });
  kline(ctx, t, { x: 76, y: 1420, size: 170, out: tThis - 0.12, outAnim: "up", outDur: 0.25, words: [{ s: "STILL", t: ws("still"), anim: "slam", color: C.cyan }] });
  kline(ctx, t, { x: 80, y: 1550, size: 108, out: tThis - 0.12, outAnim: "up", outDur: 0.25, words: [{ s: "INCONSISTENT?", t: ws("inconsistent"), anim: "slam" }] });
  // "this is for you." hero frame
  kline(ctx, t, { x: W / 2, y: 1330, size: 112, align: "center", words: [{ s: "THIS", t: tThis, anim: "rise" }, { s: "IS", t: ws("is for") }, { s: "FOR", t: ws("for you") }] });
  kline(ctx, t, { x: W / 2, y: 1530, size: 210, align: "center", words: [{ s: "YOU.", t: ws("you."), anim: "slam", color: C.cyan }] });
  // cyan signal starts from the laptop
  ribbon(ctx, [[900, 1000], [700, 1700], [W / 2, 1880]], { to: ep(t, ws("you.") + 0.05, 0.4, inOutCubic), width: 5, flow: t, speed: 0 });
  cutFlash(ctx, t, t0);
}

// hyperframe burst: PATCH → AD → FORM → RFQ → CRM (each ~9 frames), cyan signal throughline
function montage(ctx: any, t: number, t0: number) {
  const [i, lt] = burst(t, t0, [0.15, 0.15, 0.15, 0.15, 0.2]);
  background(ctx, t, { grid: 0.6, glowA: 1.4 });
  const labels = ["PATCH", "AD", "FORM", "RFQ", "CRM"];
  const sc = lerp(1.08, 1, outExpo(clamp(lt / 0.12)));
  ctx.save(); ctx.translate(W / 2, 960); ctx.scale(sc, sc); ctx.translate(-W / 2, -960);
  if (i === 0) patch(ctx, "apex", W / 2, 900, 640);
  if (i === 1) { glass(ctx, 190, 520, 700, 820, { r: 30 }); patch(ctx, "apex", W / 2, 830, 360); button(ctx, 250, 1190, 580, 92, "Get a quote  →", { size: 34, hover: 1 }); }
  if (i === 2) { glass(ctx, 160, 560, 760, 720, { r: 30 }); ["Patch type", "Quantity", "Size", "Backing"].forEach((f, k) => { rr(ctx, 210, 640 + k * 140, 660, 100, 18); ctx.fillStyle = "#F2F6FB"; ctx.fill(); text(ctx, f, 240, 702 + k * 140, { size: 34, weight: 700, color: C.text }); checkBadge(ctx, 820, 690 + k * 140, 22, 1); }); }
  if (i === 3) rfqCard(ctx, 180, 480, 1.3, { qualified: 1, focus: 1 });
  if (i === 4) { glass(ctx, 140, 560, 800, 760, { r: 30 }); text(ctx, "Pipeline", 200, 650, { size: 48, weight: 800, family: F.head, color: C.text }); ["New RFQ", "Qualified", "Quoted"].forEach((c, k) => { rr(ctx, 200, 720 + k * 180, 680, 150, 20); ctx.fillStyle = k === 1 ? "#E8F6FF" : "#F2F6FB"; ctx.fill(); text(ctx, c, 240, 810 + k * 180, { size: 38, weight: 800, color: k === 1 ? C.blue : C.text }); }); }
  ctx.restore();
  text(ctx, labels[i], W / 2, 1600, { size: 150, weight: 800, family: F.head, align: "center", color: "#fff" });
  ribbon(ctx, [[0, 1700], [W / 2, 1660], [W, 1700]], { width: 5, flow: t, speed: 1.6, pulses: 3 });
  for (const c of [0.15, 0.3, 0.45, 0.6]) cutFlash(ctx, t, t0 + c, 0.05);
}
