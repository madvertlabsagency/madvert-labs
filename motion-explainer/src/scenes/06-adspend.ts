// 06 AD SPEND — "Secondly is model mein apko ad spend ki fikar karne ki zrurat nahi he, kyunke
// ad spend hum khud invest karte hain." The biggest commercial hook: minimal, slower, room to
// breathe. No amounts, no "unlimited", no "free".
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { glass, toggle, checkBadge } from "../components/ui";
import { shield } from "../components/explainer";
import { logo } from "../components/brand";

export function drawAdSpend(ctx: any, t: number) {
  const t0 = ws("secondly") - 0.1, tAd = ws("ad", 1), tFikar = ws("fikar"), tAd2 = ws("ad", 2), tHum = ws("hum", 1), tInv = ws("invest");
  const [sx, sy] = shake(t, tInv, 8);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.35, glowA: 0.9 + 0.5 * ep(t, tInv, 0.5) });
  // eyebrow
  kline(ctx, t, { x: W / 2, y: 470, size: 34, align: "center", weight: 700, ls: 8, words: [{ s: "THE", t: t0 + 0.05, color: C.sub }, { s: "COMMERCIAL", t: t0 + 0.15, color: C.sub }, { s: "MODEL", t: t0 + 0.25, color: C.blue }] });
  // ad account card: campaigns running, media spend funded by Madvert Labs
  const ca = ep(t, t0 + 0.2, 0.7, outQuart);
  const fund = ep(t, tAd2 + 0.1, 0.7, inOutCubic);
  const lift = ep(t, tHum - 0.2, 0.7, inOutExpo);
  ctx.save(); ctx.globalAlpha *= ca; ctx.translate(0, (1 - ca) * 60 - lift * 40);
  const x = 130, y = 540, w = 820, h = 430;
  glass(ctx, x, y, w, h, { r: 34, shadow: 1, focus: fund });
  shield(ctx, x + 60, y + 66, 1.2);
  text(ctx, "Your Brand · Ad account", x + 96, y + 76, { size: 30, weight: 800, color: C.navy });
  text(ctx, "Campaigns live", x + w - 140, y + 76, { size: 22, weight: 700, color: "#05834F", align: "right" });
  toggle(ctx, x + w - 112, y + 54, 1, 1.3);
  ctx.fillStyle = C.line; ctx.fillRect(x + 40, y + 118, w - 80, 1.5);
  text(ctx, "MEDIA SPEND", x + 40, y + 180, { size: 22, weight: 700, family: F.mono, ls: 3, color: C.sub });
  // meter: a steady, flowing fill (no numbers)
  const mf = 0.25 + 0.45 * ep(t, tAd - 0.1, 2.4, inOutCubic) + 0.02 * noise(t * 2);
  rr(ctx, x + 40, y + 206, w - 80, 26, 13); ctx.fillStyle = "#E3EBF5"; ctx.fill();
  const g = ctx.createLinearGradient(x + 40, 0, x + w - 40, 0); g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan);
  rr(ctx, x + 40, y + 206, (w - 80) * mf, 26, 13); ctx.fillStyle = g; ctx.fill();
  const sh = ((t * 0.6) % 1);
  ctx.save(); rr(ctx, x + 40, y + 206, (w - 80) * mf, 26, 13); ctx.clip();
  const sg = ctx.createLinearGradient(x + 40 + (w - 80) * (sh - 0.2), 0, x + 40 + (w - 80) * sh, 0); sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(1, "rgba(255,255,255,0.5)");
  ctx.fillStyle = sg; ctx.fillRect(x + 40, y + 206, w - 80, 26); ctx.restore();
  // funded by row: "You" crossed out → Madvert Labs
  text(ctx, "FUNDED BY", x + 40, y + 312, { size: 22, weight: 700, family: F.mono, ls: 3, color: C.sub });
  const ya = ep(t, tFikar - 0.1, 0.4);
  if (fund < 1) {
    ctx.save(); ctx.globalAlpha *= ya * (1 - fund);
    text(ctx, "You", x + 40, y + 380, { size: 44, weight: 800, color: C.navy });
    const st = ep(t, tFikar + 0.2, 0.4, outExpo);
    ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x + 32, y + 366); ctx.lineTo(x + 32 + 100 * st, y + 366); ctx.stroke();
    ctx.restore();
  }
  if (fund > 0) {
    ctx.save(); ctx.globalAlpha *= fund; ctx.translate((1 - fund) * 40, 0);
    logo(ctx, x + 40 + 170, y + 334, 340);
    checkBadge(ctx, x + w - 70, y + 360, 26, ep(t, tInv, 0.4));
    ctx.restore();
  }
  ctx.restore();
  // first beat: the question every partner asks
  kline(ctx, t, { x: W / 2, y: 1240, size: 120, align: "center", out: tHum - 0.15, outAnim: "up", outDur: 0.25, words: [{ s: "AD", t: tAd, anim: "rise", color: C.sub }, { s: "SPEND?", t: tAd + 0.12, anim: "rise", color: C.sub }] });
  kline(ctx, t, { x: W / 2, y: 1350, size: 48, align: "center", weight: 700, out: tHum - 0.15, outAnim: "up", outDur: 0.25, words: [{ s: "NOT", t: ws("nahi", 4), anim: "blur" }, { s: "YOUR", t: ws("nahi", 4) + 0.08, anim: "blur" }, { s: "WORRY.", t: ws("nahi", 4) + 0.16, anim: "blur", color: C.blue }] });
  // hero type
  glow(ctx, W / 2, 1220, 600, C.elec, 0.14 * ep(t, tInv, 0.5));
  kline(ctx, t, { x: W / 2, y: 1170, size: 120, align: "center", words: [{ s: "WE", t: tHum, anim: "rise" }, { s: "INVEST", t: tInv, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1300, size: 104, align: "center", words: [{ s: "THE", t: tInv + 0.25, anim: "rise" }, { s: "AD", t: tInv + 0.32, anim: "rise" }, { s: "SPEND.", t: tInv + 0.4, anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 1420, size: 44, align: "center", weight: 700, ls: 2, color: C.sub,
    words: [{ s: "YOU", t: (tInv + 0.75) + 0.05, anim: "blur" }, { s: "DON'T", t: (tInv + 0.75) + 0.12, anim: "blur" }, { s: "FUND", t: (tInv + 0.75) + 0.19, anim: "blur", color: C.navy }, { s: "THE", t: (tInv + 0.75) + 0.26, anim: "blur", color: C.navy }, { s: "CAMPAIGNS.", t: (tInv + 0.75) + 0.33, anim: "blur", color: C.navy }] });
  const sw = prog(t, tInv - 0.05, tInv + 0.6);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.45, 0.2);
  ctx.restore();
}
