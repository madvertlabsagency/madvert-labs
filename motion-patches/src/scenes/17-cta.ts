// 17 SCALE + CTA — qualified RFQs flow in while production runs; then the end frame.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, cover, cursor, orb } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { img, video } from "../core/assets";
import { kline } from "../components/kinetic";
import { appWindow, button, pill } from "../components/ui";
import { ribbon } from "../components/ribbon";
import { sectionTag } from "../components/rfq";
import { orderCard, ORDERS } from "./16-orders";

const FLOW: [any, string, string, string][] = [...ORDERS, ["riverside", "Riverside FD", "250 · Woven · 3 in · Velcro", "Dec 9"], ["pine", "Pine Valley", "750 · Chenille · 4 in · Sew-On", "Jan 6"], ["eagle", "Ironclad Gear", "400 · Embroidered · 3 in · Iron-On", "Dec 18"]];

export function drawCTA(ctx: any, t: number) {
  const t0 = ws("if you're serious") - 0.25;
  const tFlow = ws("consistent flow"), tBook = ws("book a discovery");
  const end = ep(t, tBook - 0.25, 0.7, inOutExpo);
  background(ctx, t, { grid: 0.4, glowA: 1 + end * 0.5 });
  if (end < 1) {
    ctx.save(); ctx.globalAlpha = 1 - end; ctx.translate(0, -end * 80);
    sectionTag(ctx, "14", "Scale", ep(t, t0, 0.4));
    // production footage (factory floor band)
    const fa = ep(t, t0 + 0.1, 0.6, outQuart);
    ctx.save(); ctx.globalAlpha *= fa;
    rr(ctx, 1000, 250, 810, 600, 26); ctx.save(); ctx.clip();
    cover(ctx, video("embroidery", (t - t0) * 0.9 + 1.5), 1000, 250, 810, 600, 0.5, 0.6, 1.05);
    ctx.restore();
    ctx.strokeStyle = C.line2; ctx.lineWidth = 1.5; rr(ctx, 1000, 250, 810, 600, 26); ctx.stroke();
    pill(ctx, 1030, 280, "Production active", ep(t, ws("scaling"), 0.4), C.green, 16);
    ctx.restore();
    // incoming RFQ column
    const wa = ep(t, t0, 0.6, outQuart);
    const r = appWindow(ctx, 110, 250, 850, 600, "New qualified RFQs", { alpha: wa });
    ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
    FLOW.forEach(([k, n, s, d], i) => {
      const ti = ws("custom patch", 1) + i * 0.75;
      const a = ep(t, ti, 0.55, outBack);
      if (a <= 0) return;
      const yy = r.y + 20 + FLOW.slice(i + 1).reduce((acc, _, j) => acc + 166 * ep(t, ws("custom patch", 1) + (i + 1 + j) * 0.75, 0.45, inOutCubic), 0);
      orderCard(ctx, r.x + 20, yy - (1 - a) * 60, r.w - 40, k, n, s, d, clamp(a * 2));
    });
    ctx.restore();
    kline(ctx, t, { x: 110, y: 200, size: 60, out: tFlow - 0.15, outAnim: "up", outDur: 0.25,
      words: [{ s: "SERIOUS", t: ws("serious"), color: C.sub }, { s: "ABOUT", t: ws("about scaling"), color: C.sub }, { s: "SCALING?", t: ws("scaling"), grad: true }] });
    kline(ctx, t, { x: 110, y: 200, size: 60,
      words: [{ s: "A", t: ws("a consistent") }, { s: "CONSISTENT", t: tFlow }, { s: "FLOW", t: ws("flow") }, { s: "OF", t: ws("of qualified") }, { s: "QUALIFIED", t: ws("qualified", 1), grad: true }, { s: "RFQs.", t: ws("rfqs"), grad: true }] });
    ctx.restore();
  }
  if (end > 0) {
    ctx.save(); ctx.globalAlpha = end;
    const lg = img("logo");
    if (lg) {
      const w = 820, h = lg.height * w / lg.width, x = W / 2 - w / 2, y = 170 + (1 - end) * 40;
      ctx.drawImage(lg, x, y, w, h);
      const p1 = prog(t, ws("labs", 2) - 0.1, ws("labs", 2) + 0.9), p2 = prog(t, we("today") + 1.2, we("today") + 2.2);
      const p = p1 > 0 && p1 < 1 ? p1 : p2;
      if (p > 0 && p < 1) orb(ctx, x + w * 0.2633, y + h * 0.4675, h * 0.1069, p, 1 - p);
    }
    const ba = ep(t, tBook, 0.6, outBack);
    const press = prog(t, ws("call") + 0.05, ws("call") + 0.4);
    if (ba > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
      const bw = 980 * lerp(0.8, 1, ba), bh = 128;
      glow(ctx, W / 2, 600, 700, C.cyan, 0.2);
      button(ctx, W / 2 - bw / 2, 540, bw, bh, "BOOK A DISCOVERY CALL", { size: 54, press, hover: 1 });
      ctx.restore();
    }
    cursor(ctx, lerp(W / 2 + 560, W / 2 + 330, ep(t, tBook + 0.2, 0.6, inOutCubic)), lerp(820, 620, ep(t, tBook + 0.2, 0.6, inOutCubic)), press, ep(t, tBook + 0.2, 0.3) * (1 - ep(t, we("today") + 0.5, 0.4)));
    kline(ctx, t, { x: W / 2, y: 780, size: 40, align: "center", weight: 700, color: C.sub,
      words: [{ s: "Madvert", t: ws("madvert", 2), anim: "blur" }, { s: "Labs", t: ws("labs", 2), anim: "blur" }, { s: "Patches", t: ws("labs", 2) + 0.2, anim: "blur", color: C.blue }, { s: "Partnership", t: ws("labs", 2) + 0.3, anim: "blur", color: C.blue }] });
    ribbon(ctx, [[W / 2 - 420, 820], [W / 2, 808], [W / 2 + 420, 820]], { to: ep(t, ws("today"), 0.8, inOutCubic), width: 4, flow: t, speed: 0.4, alpha: 0.9 });
    ctx.restore();
  }
}
