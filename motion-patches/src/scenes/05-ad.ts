// 05 HIGH-ENGAGING ADS — the patch ad is built live, then lands in a scrolling feed
// where the thumb stops on it.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, cover, glow, streak, cursor } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { video } from "../core/assets";
import { kline } from "../components/kinetic";
import { glass, phone, lines, avatar, button } from "../components/ui";
import { patch } from "../components/patches";
import { sectionTag, pulseDot } from "../components/rfq";

// final rect of the ad inside the phone feed (shared with scene 06 for continuity)
export const PHONE = { x: 1220, y: 70, w: 430, h: 860 };
export function adRectInFeed() {
  return { x: PHONE.x + 26, y: PHONE.y + 150, w: PHONE.w - 52 };
}
export function ctaRectInFeed() {
  const a = adRectInFeed(), s = a.w / 600;
  return { x: a.x + 24 * s, y: a.y + (96 + 600 + 18) * s, w: (600 - 48) * s, h: 64 * s };
}

/** The client's patch ad (design width 600, height 800). */
export function adUnit(ctx: any, x: number, y: number, w: number, t: number, b: { patch: number; head: number; cta: number; press?: number }) {
  const s = w / 600;
  ctx.save();
  ctx.translate(x, y); ctx.scale(s, s);
  glass(ctx, 0, 0, 600, 800, { r: 22, fill: C.panel, shadow: 1 });
  // header
  ctx.beginPath(); ctx.arc(46, 48, 24, 0, 7); ctx.fillStyle = "#FFF1E6"; ctx.fill();
  icon(ctx, "layers", 34, 36, 24, "#E8590C", 2);
  text(ctx, "Your Brand", 84, 44, { size: 20, weight: 700 });
  text(ctx, "Sponsored", 84, 68, { size: 14, weight: 500, color: C.sub });
  // media
  ctx.save();
  rr(ctx, 0, 96, 600, 600, 0); ctx.clip();
  cover(ctx, video("embroidery", t * 0.9 + 3), 0, 96, 600, 600, 0.45, 0.6, 1.25);
  const g = ctx.createLinearGradient(0, 96, 0, 696); g.addColorStop(0, "rgba(4,10,20,0.35)"); g.addColorStop(1, "rgba(4,10,20,0.85)");
  ctx.fillStyle = g; ctx.fillRect(0, 96, 600, 600);
  if (b.patch > 0) {
    const ps = lerp(1.5, 1, outBack(clamp(b.patch), 1.3));
    patch(ctx, "apex", 300, 330 + (1 - clamp(b.patch)) * -60, 300 * ps, { alpha: clamp(b.patch * 2), rot: -0.05 * (1 - b.patch) });
    // light sweep across the patch
    const sw = prog(t, 0, 1);
    streak(ctx, -9999, 0); // no-op keeps API symmetric
  }
  if (b.head > 0) {
    const h1 = "CUSTOM PATCHES", h2 = "BUILT FOR YOUR BRAND";
    const n1 = Math.ceil(clamp(b.head * 2) * h1.length), n2 = Math.ceil(clamp(b.head * 2 - 1) * h2.length);
    text(ctx, h1.slice(0, n1), 300, 560, { size: 44, weight: 800, family: F.head, align: "center", color: "#fff" });
    text(ctx, h2.slice(0, n2), 300, 606, { size: 30, weight: 700, family: F.head, align: "center", color: C.cyan });
    text(ctx, "Embroidered · Woven · PVC · Chenille", 300, 652, { size: 17, weight: 500, align: "center", color: "#C9D6E6", alpha: clamp(b.head * 2 - 1) });
  }
  ctx.restore();
  // CTA row
  if (b.cta > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(b.cta * 2);
    button(ctx, 24, 696 + 18, 552, 64, "Get a quote  →", { size: 22, press: b.press ?? 0, hover: b.cta });
    ctx.restore();
  }
  ctx.restore();
}

export function drawAd(ctx: any, t: number) {
  const t0 = ws("we create") - 0.25;
  const tHi = ws("high-engaging"), tAds = ws("ads", 1), tDes = ws("designed"), tAtt = ws("attract");
  background(ctx, t, { grid: 0.35 });
  sectionTag(ctx, "04", "Madvert creative", ep(t, t0, 0.4));
  // build beats
  const b = { patch: ep(t, tHi - 0.05, 0.6), head: ep(t, tHi + 0.35, 0.8, inOutCubic), cta: ep(t, tAds, 0.4), press: prog(t, we("buyers", 0) - 0.2, we("buyers", 0) + 0.1) };
  // ad moves from the build stage into the phone feed
  const m = ep(t, tDes - 0.1, 0.8, inOutExpo);
  const A = { x: 300, y: 130, w: 560 };
  const B = adRectInFeed();
  const ax = lerp(A.x, B.x, m), ay = lerp(A.y, B.y, m), aw = lerp(A.w, B.w, m);
  // phone + feed
  const pa = ep(t, tDes - 0.05, 0.6, outQuart);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa; ctx.translate((1 - pa) * 160, 0);
    const scr = phone(ctx, PHONE.x, PHONE.y, PHONE.w, PHONE.h);
    ctx.save(); rr(ctx, scr.x, scr.y, scr.w, scr.h, 50); ctx.clip();
    ctx.fillStyle = "#F5F8FC"; ctx.fillRect(scr.x, scr.y, scr.w, scr.h);
    text(ctx, "Feed", scr.x + 24, scr.y + 74, { size: 22, weight: 800, family: F.head });
    // other posts scroll fast, then stop as the ad lands
    const scroll = (1 - ep(t, tDes - 0.1, 1.0, outExpo)) * 2600;
    for (let i = -3; i < 4; i++) {
      if (i === 0) continue;
      const py = B.y + i * (B.w * 1.36) + scroll;
      if (py > scr.y + scr.h || py + B.w * 1.3 < scr.y) continue;
      rr(ctx, B.x, py, B.w, B.w * 1.3, 18); ctx.fillStyle = "#fff"; ctx.fill();
      avatar(ctx, B.x + 26, py + 28, 14, "", "#CBD8E8");
      lines(ctx, B.x + 50, py + 20, 160, 2, { gap: 14, h: 7 });
      rr(ctx, B.x, py + 56, B.w, B.w * 0.95, 0); ctx.fillStyle = `rgb(${205 + hash(i) * 30},${215 + hash(i + 2) * 25},${228 + hash(i + 4) * 20})`; ctx.fill();
    }
    ctx.restore();
    ctx.restore();
  }
  adUnit(ctx, ax, ay, aw, t, b);
  // callouts while building (left stage)
  const callA = 1 - m;
  if (callA > 0.01) {
    const calls: [string, number, number, number][] = [["Product hero", tHi + 0.1, A.y + 330 * (A.w / 600), 0], ["Clear offer", tHi + 0.5, A.y + 580 * (A.w / 600), 1], ["One clear CTA", tAds + 0.05, A.y + 745 * (A.w / 600), 2]];
    calls.forEach(([lab, tc, y]) => {
      const a = ep(t, tc, 0.4, outQuart) * callA;
      if (a <= 0) return;
      ctx.save(); ctx.globalAlpha *= a;
      const x0 = A.x + A.w + 10, x1 = x0 + 90 * a;
      ctx.strokeStyle = rgba(C.elec, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.beginPath(); ctx.arc(x0, y, 5, 0, 7); ctx.fillStyle = C.elec; ctx.fill();
      text(ctx, lab, x1 + 14, y + 7, { size: 20, weight: 700, color: C.text });
      ctx.restore();
    });
    kline(ctx, t, { x: 1170, y: 400, size: 72, out: tDes - 0.3, outAnim: "up", outDur: 0.25, words: [{ s: "HIGH-ENGAGING", t: tHi, anim: "rise", grad: true }] });
    kline(ctx, t, { x: 1170, y: 490, size: 72, out: tDes - 0.3, outAnim: "up", outDur: 0.25, words: [{ s: "ADS.", t: tAds, anim: "rise" }] });
  }
  // left: ATTRACT THE RIGHT BUYERS
  kline(ctx, t, { x: 120, y: 420, size: 64, weight: 700, color: C.sub, words: [{ s: "DESIGNED", t: tDes }, { s: "TO", t: ws("to attract") }] });
  kline(ctx, t, { x: 116, y: 560, size: 130, words: [{ s: "ATTRACT", t: tAtt, anim: "slam" }] });
  kline(ctx, t, { x: 116, y: 700, size: 130, words: [{ s: "THE", t: ws("the right") }, { s: "RIGHT", t: ws("right"), grad: true }] });
  kline(ctx, t, { x: 116, y: 840, size: 130, words: [{ s: "BUYERS.", t: ws("buyers", 0), grad: true }] });
  // thumb stops + taps the CTA
  const cr = ctaRectInFeed();
  const tap = prog(t, we("buyers", 0) - 0.2, we("buyers", 0) + 0.35);
  if (t > tAtt) cursor(ctx, lerp(PHONE.x + PHONE.w + 40, cr.x + cr.w * 0.6, ep(t, tAtt, 0.8, inOutCubic)), lerp(PHONE.y + PHONE.h - 60, cr.y + cr.h * 0.5, ep(t, tAtt, 0.8, inOutCubic)), tap, ep(t, tAtt, 0.3));
}
