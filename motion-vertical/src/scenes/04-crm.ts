// 04 RFQ → CRM — the form collapses into NEW QUALIFIED RFQ; on "delivered" the card
// compresses, rides the cyan path and snaps into the CRM pipeline.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { glass, checkBadge, iconTile, pill, avatar } from "../components/ui";
import { patch } from "../components/patches";
import { rfqCard, pulseDot } from "../components/rfq";
import { ribbon } from "../components/ribbon";
import { drawDemo, CARD } from "./03-demo";

const BOARD = { x: 90, y: 560, w: 900, h: 1120 };
const SLOT = { x: BOARD.x + 40, y: BOARD.y + 300 };
const EX: [string, string, any][] = [["Riverside FD", "250 · Woven", "riverside"], ["Summit Crew", "1,000 · PVC", "summit"], ["Lakeside Co.", "300 · Embroidered", "lakeside"]];

export function drawCRM(ctx: any, t: number) {
  const t0 = ws("then") - 0.12, tFull = ws("full"), tDel = ws("delivered"), tStr = ws("straight"), tCRM = ws("crm");
  const [sx, sy] = shake(t, tCRM, 6);
  ctx.save(); ctx.translate(sx, sy);
  // A: the funnel card collapses into the RFQ
  const col = ep(t, t0, 0.45, inOutExpo);
  background(ctx, t, { grid: 0.6, glowA: 1.2 });
  if (col < 1) { ctx.save(); ctx.globalAlpha = 1 - col; ctx.translate(W / 2, 1060); ctx.scale(1 - 0.3 * col, 1 - 0.3 * col); ctx.translate(-W / 2, -1060); drawDemo(ctx, t0); ctx.restore(); }
  // B: card position: hero → travels into the CRM slot
  const go = ep(t, tDel - 0.1, 0.75, inOutExpo);
  const hx = 120, hy = 560, hs = 1.5;
  const cx = lerp(hx, SLOT.x, go), cy = lerp(hy, SLOT.y, go), cs = lerp(hs, 0.39 * (BOARD.w - 80) / 360, go);
  // CRM board fades up behind as the card leaves
  const ba = ep(t, tDel, 0.5, outQuart);
  if (ba > 0) {
    ctx.save(); ctx.globalAlpha *= ba; ctx.translate(0, (1 - ba) * 60);
    glass(ctx, BOARD.x, BOARD.y, BOARD.w, BOARD.h, { r: 36, shadow: 1 });
    text(ctx, "Sales pipeline", BOARD.x + 40, BOARD.y + 80, { size: 44, weight: 800, family: F.head, color: C.navy });
    text(ctx, "Your CRM", BOARD.x + BOARD.w - 40, BOARD.y + 80, { size: 22, weight: 600, color: C.sub, align: "right" });
    ["New", "Qualified", "Quoted", "Won"].forEach((s, i) => {
      const x = BOARD.x + 40 + i * 205, on = i === 1;
      rr(ctx, x, BOARD.y + 120, 190, 64, 32); ctx.fillStyle = on ? C.blue : "#F2F6FB"; ctx.fill();
      text(ctx, s, x + 95, BOARD.y + 162, { size: 24, weight: 700, color: on ? "#fff" : C.sub, align: "center" });
    });
    text(ctx, "QUALIFIED", BOARD.x + 40, BOARD.y + 250, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.blue });
    // highlighted landing slot
    const land = ep(t, tStr + 0.15, 0.3);
    rr(ctx, SLOT.x - 8, SLOT.y - 8, BOARD.w - 64, 330, 22);
    ctx.setLineDash(land > 0.5 ? [] : [12, 10]); ctx.strokeStyle = rgba(C.elec, 0.5 + 0.5 * land); ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]);
    // existing example opportunities (pushed down on landing)
    EX.forEach(([n, s, k], i) => {
      const y = BOARD.y + 660 + i * 130 + land * 10;
      rr(ctx, BOARD.x + 40, y, BOARD.w - 80, 112, 18); ctx.fillStyle = "#F7FAFE"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.stroke();
      patch(ctx, k, BOARD.x + 100, y + 56, 76, { shadow: 0.3 });
      text(ctx, n, BOARD.x + 160, y + 50, { size: 26, weight: 800, color: C.navy });
      text(ctx, s, BOARD.x + 160, y + 84, { size: 22, weight: 500, color: C.sub });
      pill(ctx, BOARD.x + BOARD.w - 230, y + 36, "Qualified", 1, C.green, 18);
    });
    text(ctx, "EXAMPLE DATA", BOARD.x + BOARD.w - 40, BOARD.y + BOARD.h - 26, { size: 16, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
    ctx.restore();
  }
  // the cyan pathway the card rides
  if (go > 0 && go < 1) {
    ribbon(ctx, [[hx + 280, hy + 900], [W - 60, 1200], [SLOT.x + 300, SLOT.y + 160]], { to: inOutCubic(clamp(go * 1.3)), width: 6, flow: t, speed: 0 });
  }
  const ca = ep(t, t0 + 0.2, 0.5, outBack);
  if (go < 1) rfqCard(ctx, cx, cy, cs * lerp(0.85, 1, ca), { qualified: ep(t, tFull + 0.2, 0.4), focus: 1, alpha: clamp(ca * 2), compact: go > 0.6 });
  else {
    // landed: compact opportunity card in the Qualified column
    const y = SLOT.y, x = SLOT.x;
    rr(ctx, x, y, BOARD.w - 80, 312, 20); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = C.elec; ctx.lineWidth = 3; ctx.stroke();
    glow(ctx, x + 400, y + 150, 420, C.cyan, 0.18 * (1 - prog(t, tCRM + 0.5, tCRM + 1.5)));
    patch(ctx, "apex", x + 90, y + 100, 130);
    text(ctx, "Apex Apparel", x + 180, y + 82, { size: 34, weight: 800, color: C.navy });
    text(ctx, "500 embroidered patches · Nov 15", x + 180, y + 124, { size: 24, weight: 600, color: C.sub });
    pill(ctx, x + BOARD.w - 260, y + 30, "NEW", 1, C.elec, 18);
    ["Qualified", "Artwork attached", "Contact ready"].forEach((s, i) => pill(ctx, x + 30 + [0, 190, 470][i], y + 220, s, ep(t, tCRM - 0.1 + i * 0.12, 0.3), i === 0 ? C.green : C.elec, 20));
  }
  // notification lands
  const nt = ep(t, tCRM - 0.15, 0.4, outBack);
  if (nt > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(nt * 2); ctx.translate(0, (1 - nt) * -60);
    glass(ctx, 140, 380, 800, 120, { r: 28, shadow: 1, focus: 0.5 });
    rr(ctx, 164, 404, 72, 72, 18); ctx.fillStyle = C.blue; ctx.fill(); icon(ctx, "bell", 180, 420, 40, "#fff", 2.4);
    text(ctx, "New qualified RFQ", 258, 432, { size: 30, weight: 800, color: C.navy });
    text(ctx, "Apex Apparel · artwork attached", 258, 470, { size: 22, weight: 500, color: C.sub });
    text(ctx, "now", 910, 432, { size: 20, weight: 600, color: C.blue, align: "right" });
    ctx.restore();
  }
  // type
  kline(ctx, t, { x: 90, y: 300, size: 92, out: tDel - 0.1, outAnim: "up", outDur: 0.25, words: [{ s: "NEW", t: t0 + 0.1 }, { s: "QUALIFIED", t: t0 + 0.2, color: C.cyan }] });
  kline(ctx, t, { x: 90, y: 440, size: 120, out: tDel - 0.1, outAnim: "up", outDur: 0.25, words: [{ s: "RFQ.", t: ws("rfq"), anim: "slam" }] });
  // DELIVERED TO YOUR CRM badge
  const da = ep(t, tDel, 0.4, outQuart);
  if (da > 0) {
    ctx.save(); ctx.globalAlpha *= da;
    const by = 200 + (1 - da) * 30;
    rr(ctx, 90, by, 900, 140, 70); ctx.fillStyle = "#06132A"; ctx.fill();
    ctx.strokeStyle = rgba(C.cyan, 0.8); ctx.lineWidth = 3; ctx.stroke();
    glow(ctx, 170, by + 70, 120, C.cyan, 0.4);
    ctx.beginPath(); ctx.arc(170, by + 70, 46, 0, 7); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.stroke();
    icon(ctx, "bolt", 146, by + 46, 48, C.cyan, 2.6);
    ctx.restore();
    kline(ctx, t, { x: 240, y: by + 90, size: 50, words: [{ s: "DELIVERED", t: tDel + 0.05 }, { s: "TO", t: tStr }, { s: "YOUR", t: ws("your crm") }, { s: "CRM", t: tCRM, color: C.cyan, anim: "slam" }] });
  }
  ctx.restore();
}
