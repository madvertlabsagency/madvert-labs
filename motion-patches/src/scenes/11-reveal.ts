// 11 PRODUCT-NAME REVEAL — the camera pulls back from the workspace to reveal the whole
// connected chain; "Madvert Labs Patches Partnership".
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { scratch } from "../core/assets";
import { kline } from "../components/kinetic";
import { iconTile } from "../components/ui";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { pulseDot } from "../components/rfq";
import { drawWorkspace } from "./10-workspace";

const NODES: [string, string][] = [["Ad", "megaphone"], ["Funnel", "funnel"], ["RFQ", "doc"], ["CRM", "db"], ["Alerts", "bell"], ["You", "building"]];
export const NODE_Y = 760;
export const nodeX = (i: number) => 200 + i * 304;

export function chain(ctx: any, t: number, a: number, t0: number) {
  const path: [number, number][] = NODES.map((_, i) => [nodeX(i), NODE_Y]);
  const s = sample([[60, NODE_Y], ...path, [1860, NODE_Y]], 200);
  ribbon(ctx, s, { to: ep(t, t0, 1.0, inOutCubic), width: 6, flow: t, speed: 0.45, pulses: 2, alpha: a });
  NODES.forEach(([lab, ic], i) => {
    const p = ep(t, t0 + 0.1 + i * 0.1, 0.5, outBack);
    if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= a * clamp(p * 2);
    const x = nodeX(i), s0 = lerp(0.6, 1, p);
    ctx.translate(x, NODE_Y); ctx.scale(s0, s0);
    ctx.shadowColor = "rgba(20,60,120,0.18)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
    rr(ctx, -80, -80, 160, 160, 34); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.strokeStyle = rgba(C.elec, 0.5); ctx.lineWidth = 2; ctx.stroke();
    iconTile(ctx, ic, -34, -56, 68, C.blue);
    text(ctx, lab, 0, 52, { size: 20, weight: 800, align: "center" });
    ctx.restore();
  });
}

export function drawReveal(ctx: any, t: number) {
  const t0 = ws("that's the madvert") - 0.3;
  const pull = ep(t, t0, 1.0, inOutExpo);
  background(ctx, t, { grid: 0.45, glowA: 1.3 });
  // workspace shrinks into the final "You" node
  if (pull < 1) {
    const c = scratch("ws-layer", W, H);
    const x = c.getContext("2d");
    x.clearRect(0, 0, W, H);
    drawWorkspace(x, t0, { noType: true });
    const tx = nodeX(5), ty = NODE_Y, s = lerp(1, 0.08, pull);
    ctx.save();
    ctx.globalAlpha = 1 - ep(t, t0 + 0.6, 0.4);
    ctx.translate(lerp(W / 2, tx, pull), lerp(H / 2, ty, pull)); ctx.scale(s, s); ctx.translate(-W / 2, -H / 2);
    ctx.drawImage(c, 0, 0, W, H);
    ctx.restore();
  }
  chain(ctx, t, ep(t, t0 + 0.4, 0.5), t0 + 0.4);
  kline(ctx, t, { x: W / 2, y: 330, size: 76, align: "center", weight: 700, color: C.sub,
    words: [{ s: "MADVERT", t: ws("madvert", 1), anim: "rise" }, { s: "LABS", t: ws("labs", 1), anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 490, size: 140, align: "center",
    words: [{ s: "PATCHES", t: ws("patches"), anim: "slam", grad: true }, { s: "PARTNERSHIP", t: ws("partnership"), anim: "slam", grad: true }] });
}
