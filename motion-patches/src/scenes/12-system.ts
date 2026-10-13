// 12 WE HANDLE THE ACQUISITION SYSTEM — a living hub: every part connected, data moving.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, orb } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline } from "../components/kinetic";
import { iconTile } from "../components/ui";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { pulseDot } from "../components/rfq";

export const SAT: [string, string][] = [["Ads", "megaphone"], ["Creatives", "image"], ["Funnel", "funnel"], ["RFQ", "doc"], ["CRM", "db"], ["Automations", "bolt"], ["Notifications", "bell"], ["Delivery", "building"]];
export const HUB = { x: W / 2, y: 610, rx: 640, ry: 290 };
export const satPos = (i: number, t = 0) => {
  const a = -Math.PI / 2 + (i / SAT.length) * Math.PI * 2 + t * 0.03;
  return [HUB.x + Math.cos(a) * HUB.rx, HUB.y + Math.sin(a) * HUB.ry] as [number, number];
};

export function hub(ctx: any, t: number, t0: number, a = 1) {
  // connectors with data pulses running into the hub
  SAT.forEach((_, i) => {
    const [x, y] = satPos(i, t);
    const p = ep(t, t0 + 0.05 * i, 0.6, inOutCubic);
    const s = sample([[x, y], [lerp(x, HUB.x, 0.5), lerp(y, HUB.y, 0.5) + (i % 2 ? 30 : -30)], [HUB.x, HUB.y]], 40);
    ribbon(ctx, s, { to: p, width: 3, flow: t + i, speed: 0.8, pulses: 1, strands: 0, glow: 0.7, alpha: a });
  });
  // hub
  ctx.save(); ctx.globalAlpha *= a;
  const hp = ep(t, t0, 0.6, outBack);
  glow(ctx, HUB.x, HUB.y, 300, C.cyan, 0.25);
  ctx.translate(HUB.x, HUB.y); ctx.scale(hp, hp);
  ctx.shadowColor = "rgba(0,100,200,0.3)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 16;
  ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.lineWidth = 4; ctx.strokeStyle = C.elec; ctx.stroke();
  const ic = img("icon");
  if (ic) { ctx.save(); ctx.beginPath(); ctx.roundRect(-62, -78, 124, 124, 28); ctx.clip(); ctx.drawImage(ic, -62, -78, 124, 124); ctx.restore(); }
  text(ctx, "Partnership", 0, 78, { size: 17, weight: 800, align: "center", color: C.blue });
  ctx.restore();
  SAT.forEach(([lab, icn], i) => {
    const [x, y] = satPos(i, t);
    const p = ep(t, t0 + 0.1 + 0.06 * i, 0.5, outBack);
    if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= a * clamp(p * 2);
    ctx.translate(x, y); ctx.scale(lerp(0.6, 1, p), lerp(0.6, 1, p));
    ctx.shadowColor = "rgba(20,60,120,0.16)"; ctx.shadowBlur = 26; ctx.shadowOffsetY = 8;
    ctx.font = `700 20px ${F.body}`; const tw = ctx.measureText(lab).width;
    rr(ctx, -tw / 2 - 52, -32, tw + 86, 64, 32); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.strokeStyle = rgba(C.elec, 0.45); ctx.lineWidth = 1.5; ctx.stroke();
    icon(ctx, icn, -tw / 2 - 38, -14, 28, C.blue, 2.2);
    text(ctx, lab, -tw / 2 + 2, 8, { size: 20, weight: 700 });
    ctx.restore();
  });
}

export function drawSystem(ctx: any, t: number) {
  const t0 = ws("we handle") - 0.25;
  background(ctx, t, { grid: 0.4, glowA: 1.2 });
  hub(ctx, t, t0);
  kline(ctx, t, { x: W / 2, y: 170, size: 66, align: "center",
    words: [{ s: "WE", t: ws("we handle") }, { s: "HANDLE", t: ws("handle"), anim: "slam" }, { s: "THE", t: ws("the acquisition") },
      { s: "ACQUISITION", t: ws("acquisition system"), grad: true }, { s: "SYSTEM.", t: ws("system"), grad: true }] });
}
