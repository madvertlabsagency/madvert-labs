// 06 BRANDED FUNNEL — the CTA expands into the client's own quote funnel.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { appWindow, button, lines } from "../components/ui";
import { patch } from "../components/patches";
import { sectionTag, pulseDot } from "../components/rfq";
import { drawAd, ctaRectInFeed } from "./05-ad";

export const WIN = { x: 120, y: 170, w: 1680, h: 730 };

/** Client brand mark: generic shield + YOUR BRAND wordmark (placeholder for the manufacturer). */
export function brandMark(ctx: any, x: number, y: number, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(16, -11); ctx.lineTo(14, 8); ctx.lineTo(0, 18); ctx.lineTo(-14, 8); ctx.lineTo(-16, -11); ctx.closePath();
  const g = ctx.createLinearGradient(-16, -18, 16, 18); g.addColorStop(0, "#F07A1F"); g.addColorStop(1, "#C2410C"); ctx.fillStyle = g; ctx.fill();
  text(ctx, "YOUR BRAND", 28, 8, { size: 20, weight: 800, family: F.head, ls: 1 });
  ctx.restore();
}

export function funnelHero(ctx: any, r: any, t: number, a = 1, dx = 0) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(dx, 0);
  // nav
  brandMark(ctx, r.x + 56, r.y + 44);
  ["Patches", "How it works", "Gallery", "Contact"].forEach((n, i) => text(ctx, n, r.x + 700 + i * 150, r.y + 50, { size: 16, weight: 600, color: C.sub }));
  ctx.fillStyle = C.line; ctx.fillRect(r.x, r.y + 86, r.w, 1);
  // hero
  text(ctx, "CUSTOM PATCHES · FAST QUOTES", r.x + 60, r.y + 170, { size: 14, weight: 700, family: F.mono, ls: 3, color: "#E8590C" });
  text(ctx, "Custom patches,", r.x + 60, r.y + 240, { size: 58, weight: 800, family: F.head });
  text(ctx, "made for your brand.", r.x + 60, r.y + 310, { size: 58, weight: 800, family: F.head, color: "#E8590C" });
  text(ctx, "Tell us what you need and get an accurate quote.", r.x + 60, r.y + 360, { size: 20, weight: 500, color: C.sub });
  button(ctx, r.x + 60, r.y + 400, 300, 64, "Start your quote  →", { size: 20, hover: 0.6 });
  // patch collage
  const fl = (k: number) => noise(t * 0.6 + k) * 8;
  patch(ctx, "apex", r.x + 1180, r.y + 270 + fl(1), 300, { rot: -0.06 });
  patch(ctx, "summit", r.x + 1420, r.y + 180 + fl(2), 190, { rot: 0.08 });
  patch(ctx, "riverside", r.x + 1440, r.y + 420 + fl(3), 170, { rot: -0.05 });
  patch(ctx, "lakeside", r.x + 960, r.y + 470 + fl(4), 150, { rot: 0.07 });
  ctx.restore();
}

/** Six-step preview strip (also the stepper in scene 07). */
export const STEPS: [string, string][] = [["Patch type", "layers"], ["Quantity", "box"], ["Size", "ruler"], ["Backing", "layers"], ["Deadline", "calendar"], ["Contact", "user"]];

export function drawFunnel(ctx: any, t: number) {
  const t0 = ws("those buyers") - 0.3;
  const ex = ep(t, t0, 0.75, inOutExpo);
  // underneath: the feed from scene 05, receding
  if (ex < 1) {
    ctx.save(); ctx.globalAlpha = 1 - ex * 0.9; drawAd(ctx, t0 + 0.02); ctx.restore();
  }
  // CTA rect expands into the funnel window
  const c = ctaRectInFeed();
  const x = lerp(c.x, WIN.x, ex), y = lerp(c.y, WIN.y, ex), w = lerp(c.w, WIN.w, ex), h = lerp(c.h, WIN.h, ex);
  if (ex >= 1) background(ctx, t, { grid: 0.3 });
  else { ctx.save(); ctx.globalAlpha = ex; background(ctx, t, { grid: 0.3 }); ctx.restore(); }
  if (ex < 0.6) { ctx.save(); rr(ctx, x, y, w, h, lerp(c.h / 2, 18, ex)); ctx.fillStyle = C.blue; ctx.fill(); ctx.restore(); }
  const ca = ep(t, t0 + 0.4, 0.4);
  if (ex > 0.4) {
    const r = appWindow(ctx, x, y, w, h, "", { url: "quote.yourbrand.com", alpha: clamp((ex - 0.4) * 3) });
    if (ex > 0.9) funnelHero(ctx, r, t, ca);
  }
  sectionTag(ctx, "05", "Branded quotation funnel", ep(t, t0 + 0.5, 0.4));
  // pulse travels from the clicked CTA into "Start your quote"
  const pp = ep(t, t0 + 0.5, 0.9, inOutCubic);
  if (pp > 0 && pp < 1) {
    const sx = 1500, sy = 820, txp = WIN.x + 60 + 150, typ = WIN.y + 44 + 432;
    pulseDot(ctx, lerp(sx, txp, pp), lerp(sy, typ, pp) - Math.sin(pp * Math.PI) * 160, 10, 1, [lerp(sx, txp, pp - 0.12), lerp(sy, typ, pp - 0.12) - Math.sin((pp - 0.12) * Math.PI) * 160]);
  }
  // callouts: YOUR BRAND / YOUR FUNNEL
  const tb = ws("your branded"), tf = ws("funnel");
  callout(ctx, t, tb, "YOUR BRAND", WIN.x + 60, WIN.y + 44 + 44, WIN.x + 290, WIN.y + 44 + 58);
  callout(ctx, t, tf, "YOUR FUNNEL", WIN.x + 360, WIN.y + 44 + 432, WIN.x + 620, WIN.y + 44 + 590);
}

function callout(ctx: any, t: number, t0: number, label: string, ax: number, ay: number, bx: number, by: number) {
  const a = ep(t, t0, 0.5, outQuart);
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.elec; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(lerp(ax, bx, a), lerp(ay, by, a)); ctx.stroke();
  ctx.beginPath(); ctx.arc(ax, ay, 6, 0, 7); ctx.fillStyle = C.elec; ctx.fill();
  ctx.font = `800 54px ${F.head}`; ctx.letterSpacing = "0px";
  const tw = ctx.measureText(label).width;
  ctx.save(); ctx.shadowColor = "rgba(20,60,120,0.2)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; rr(ctx, bx, by - 46, tw + 48, 78, 16); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore(); ctx.strokeStyle = rgba(C.elec, 0.7); ctx.lineWidth = 2; ctx.stroke();
  kline(ctx, t, { x: bx + 24, y: by + 12, size: 54, words: [{ s: label, t: t0, anim: "rise", grad: true }] });
  ctx.restore();
}
