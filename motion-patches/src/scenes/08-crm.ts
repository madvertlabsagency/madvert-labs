// 08 CRM + AUTOMATIONS — form data detaches and assembles into the RFQ object, which
// snaps into the CRM, fires the automations and arrives on the client's phone.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, chip, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, inCubic } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { appWindow, phone, checkBadge, pill, iconTile, avatar } from "../components/ui";
import { patch } from "../components/patches";
import { ribbon } from "../components/ribbon";
import { sectionTag, rfqCard, notif, pulseDot } from "../components/rfq";
import { drawForm, VALUES, SUM, sumRowY } from "./07-form";

const BOARD = { x: 640, y: 175, w: 1160, h: 590 };
const COLS = ["New RFQ", "Reviewing", "Quote sent", "Won"];
const EXAMPLES: [number, string, string, any][] = [
  [1, "Riverside FD", "250 · Woven", "riverside"], [1, "Lakeside Co.", "300 · Embroidered", "lakeside"],
  [2, "Summit Crew", "1,000 · PVC", "summit"], [3, "Pine Valley", "750 · Chenille", "pine"],
];

export function drawCRM(ctx: any, t: number) {
  const t0 = ws("from there") - 0.1;
  const tCRM = ws("crm", 0), tAuto = ws("automations", 0), tRFQ = ws("request for quotation"), tSend = ws("send it"), tYou = ws("directly");
  // A: the form recedes, its values detach and assemble the RFQ
  const rec = ep(t, t0, 0.6, inOutCubic);
  if (rec < 1) {
    ctx.save();
    ctx.globalAlpha = 1 - rec;
    ctx.translate(W / 2, H / 2); ctx.scale(1 - rec * 0.12, 1 - rec * 0.12); ctx.translate(-W / 2, -H / 2);
    drawForm(ctx, t0, { noType: true });
    ctx.restore();
  }
  if (rec > 0) { ctx.save(); ctx.globalAlpha = rec; background(ctx, t, { grid: 0.35 }); ctx.restore(); }
  sectionTag(ctx, "07", "CRM & automations", ep(t, t0 + 0.3, 0.4));

  // RFQ card position across the beats
  const assemble = ep(t, t0 + 0.15, 0.7, inOutCubic);
  const toCRM = ep(t, tCRM - 0.1, 0.7, inOutExpo);
  const hero = ep(t, tRFQ - 0.3, 0.6, inOutExpo);
  const send = ep(t, tSend - 0.15, 0.6, inOutExpo);
  let cx = 680, cy = 170, cs = 0.95;
  cx = lerp(cx, 120, toCRM); cy = lerp(cy, 230, toCRM); cs = lerp(cs, 0.72, toCRM);
  cx = lerp(cx, 680, hero); cy = lerp(cy, 160, hero); cs = lerp(cs, 0.98, hero);
  cx = lerp(cx, 140, send); cy = lerp(cy, 230, send); cs = lerp(cs, 0.82, send);

  // CRM board (behind) — appears on "CRM", recedes for the hero beat
  const ba = ep(t, tCRM - 0.2, 0.5, outQuart) * (1 - 0.8 * hero) * (1 - send);
  if (ba > 0.01) {
    ctx.save(); ctx.globalAlpha *= ba; ctx.translate((1 - ep(t, tCRM - 0.2, 0.5, outQuart)) * 120, 0);
    const r = appWindow(ctx, BOARD.x, BOARD.y, BOARD.w, BOARD.h, "CRM · RFQ pipeline");
    const cw = (r.w - 50) / 4;
    COLS.forEach((c, i) => {
      const x = r.x + 20 + i * (cw + 3);
      rr(ctx, x, r.y + 16, cw - 10, r.h - 32, 14); ctx.fillStyle = i === 0 ? "#EEF7FF" : "#F5F8FC"; ctx.fill();
      text(ctx, c, x + 16, r.y + 48, { size: 16, weight: 800 });
      const n = i === 0 ? (t > tAuto - 0.2 ? 1 : 0) : EXAMPLES.filter((e) => e[0] === i).length;
      chip(ctx, String(n), x + cw - 60, r.y + 28, { size: 13, h: 26 });
    });
    EXAMPLES.forEach(([col, name, sub, kind], k) => {
      const x = r.x + 20 + col * (cw + 3) + 10, idx = EXAMPLES.slice(0, k).filter((e) => e[0] === col).length;
      const y = r.y + 70 + idx * 112;
      rr(ctx, x, y, cw - 30, 100, 12); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke();
      patch(ctx, kind, x + 40, y + 50, 56, { shadow: 0.3 });
      text(ctx, name, x + 80, y + 44, { size: 15, weight: 700 });
      text(ctx, sub, x + 80, y + 66, { size: 13, weight: 500, color: C.sub });
    });
    text(ctx, "EXAMPLE DATA", r.x + r.w - 30, r.y + r.h - 14, { size: 11, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
    // automation chain along the bottom
    const steps: [string, string][] = [["Capture RFQ", "doc"], ["Create record", "db"], ["Attach artwork", "clip"], ["Email alert", "mail"], ["WhatsApp alert", "chat"], ["Push to phone", "bell"]];
    const ay = BOARD.y + BOARD.h + 40;
    steps.forEach(([lab, ic], i) => {
      const x = BOARD.x + i * 196;
      const on = ep(t, tAuto + i * 0.17, 0.25, outBack);
      if (i > 0) { ctx.strokeStyle = on > 0.5 ? C.elec : "#CFDAE6"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 60, ay + 30); ctx.lineTo(x - 8, ay + 30); ctx.stroke(); }
      iconTile(ctx, ic, x, ay, 60, on > 0.5 ? C.blue : C.mute, on);
      if (on > 0.5) glow(ctx, x + 30, ay + 30, 70, C.cyan, 0.25 * (1 - prog(t, tAuto + i * 0.17, tAuto + i * 0.17 + 0.6)));
      text(ctx, lab, x + 30, ay + 88, { size: 14, weight: 700, align: "center", color: on > 0.5 ? C.text : C.mute });
    });
    ctx.restore();
  }
  // card flight into the New RFQ column (compact) on "CRM", snapped by "automations"
  const snap = ep(t, tCRM + 0.25, 0.55, inOutExpo) * (1 - hero);
  const colX = BOARD.x + 30, colY = BOARD.y + 44 + 70;
  if (snap > 0 && hero < 1) {
    const sx = lerp(cx, colX, snap), sy = lerp(cy, colY, snap), ss = lerp(cs, 0.47, snap);
    rfqCard(ctx, sx, sy, ss, { reveal: 6, art: 1, qualified: 0, compact: snap > 0.5, focus: 1 });
    if (snap >= 1) glow(ctx, colX + 130, colY + 110, 200, C.cyan, 0.3 * (1 - prog(t, tCRM + 0.8, tCRM + 1.6)));
  } else {
    rfqCard(ctx, cx, cy, cs, { reveal: assemble * 6.2, art: ep(t, t0 + 0.65, 0.4), qualified: ep(t, tRFQ + 0.6, 0.5), focus: 1 });
  }
  // flying data chips (A)
  for (let i = 0; i < 6; i++) {
    const q = prog(t, t0 + 0.05 + i * 0.06, t0 + 0.55 + i * 0.06);
    if (q <= 0 || q >= 1) continue;
    const e = inOutCubic(q);
    const tx = cx + (28 + (i % 2) * 256 + 54) * cs, ty = cy + (196 + Math.floor(i / 2) * 76 + 40) * cs;
    const x = lerp(SUM.x + 78, tx, e), y = lerp(sumRowY(i) + 30, ty, e);
    chip(ctx, VALUES[i], x, y - 16, { size: 15, fg: "#fff", bg: C.blue });
  }

  // D: notifications arrive, pulse runs to the client's phone
  if (t > tSend - 0.2) {
    const px = 1460, py = 140, pw = 330, ph = 680;
    const pa = ep(t, tSend, 0.5, outQuart);
    ctx.save(); ctx.globalAlpha *= pa; ctx.translate((1 - pa) * 120, 0);
    const scr = phone(ctx, px, py, pw, ph);
    ctx.save(); rr(ctx, scr.x, scr.y, scr.w, scr.h, 44); ctx.clip();
    const g = ctx.createLinearGradient(0, scr.y, 0, scr.y + scr.h); g.addColorStop(0, "#DCEBFA"); g.addColorStop(1, "#BFDDF7");
    ctx.fillStyle = g; ctx.fillRect(scr.x, scr.y, scr.w, scr.h);
    text(ctx, "9:41", scr.x + scr.w / 2, scr.y + 170, { size: 72, weight: 300, family: F.body, color: C.navy, align: "center" });
    text(ctx, "Tuesday, November 3", scr.x + scr.w / 2, scr.y + 90, { size: 16, weight: 600, color: C.sub, align: "center" });
    const pn = ep(t, tYou + 0.3, 0.45, outBack);
    if (pn > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(pn * 2); ctx.translate(0, (1 - pn) * -40);
      rr(ctx, scr.x + 14, scr.y + 220, scr.w - 28, 108, 20); ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fill();
      rr(ctx, scr.x + 28, scr.y + 236, 40, 40, 10); ctx.fillStyle = C.blue; ctx.fill(); icon(ctx, "bell", scr.x + 36, scr.y + 244, 24, "#fff", 2.2);
      text(ctx, "New Qualified RFQ", scr.x + 80, scr.y + 254, { size: 16, weight: 800 });
      text(ctx, "now", scr.x + scr.w - 30, scr.y + 254, { size: 12, weight: 600, color: C.sub, align: "right" });
      text(ctx, "Apex Apparel · 500 embroidered", scr.x + 80, scr.y + 280, { size: 13, weight: 500, color: C.sub });
      text(ctx, "patches · artwork attached", scr.x + 80, scr.y + 300, { size: 13, weight: 500, color: C.sub });
      ctx.restore();
    }
    ctx.restore(); ctx.restore();
    notif(ctx, 940, 300, "crm", ep(t, tSend + 0.05, 0.4));
    notif(ctx, 940, 440, "email", ep(t, tSend + 0.3, 0.4));
    notif(ctx, 940, 580, "whatsapp", ep(t, tSend + 0.55, 0.4));
    // pulse from card to notifications to phone
    const pp = prog(t, tSend - 0.05, tYou + 0.35);
    if (pp > 0 && pp < 1) {
      const pts: [number, number][] = [[560, 520], [900, 360], [940, 500], [940, 640], [1460, 420]];
      ribbon(ctx, pts, { to: inOutCubic(pp), width: 4, flow: t, speed: 0, strands: 1, alpha: 0.8 });
    }
  }
  // type
  kline(ctx, t, { x: 120, y: 152, size: 52, out: tRFQ - 0.35, outAnim: "up", outDur: 0.25,
    words: [{ s: "CRM", t: tCRM, grad: true }, { s: "+", t: ws("and automations") }, { s: "AUTOMATIONS", t: tAuto, grad: true }], });
  if (hero > 0.5 && t < tSend + 0.1) {
    kline(ctx, t, { x: W / 2, y: 128, size: 58, align: "center", out: tSend - 0.1, outAnim: "up", outDur: 0.25,
      words: [{ s: "REQUEST", t: tRFQ }, { s: "FOR", t: ws("for quotation") }, { s: "QUOTATION", t: ws("quotation", 1), grad: true }] });
  }
  kline(ctx, t, { x: 140, y: 160, size: 64,
    words: [{ s: "DIRECTLY", t: tYou, anim: "slam" }, { s: "TO", t: ws("to you") }, { s: "YOU.", t: we("to you") - 0.18, grad: true, anim: "slam" }] });
}
