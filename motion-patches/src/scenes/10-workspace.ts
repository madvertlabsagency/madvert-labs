// 10 QUOTE-READY WORKSPACE — details, deadline, contact and artwork are already there.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, cover, cursor, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { video } from "../core/assets";
import { kline } from "../components/kinetic";
import { appWindow, glass, avatar, pill, button, iconTile } from "../components/ui";
import { patch } from "../components/patches";
import { sectionTag, RFQ_ROWS } from "../components/rfq";

export function drawWorkspace(ctx: any, t: number, o: { noType?: boolean } = {}) {
  const t0 = ws("you get the project") - 0.25;
  const tDet = ws("details", 1), tDl = ws("deadline", 1), tCon = ws("contact", 1), tArt = ws("artwork", 1), tBef = ws("before the conversation"), tStart = ws("starts");
  background(ctx, t, { grid: 0.3 });
  sectionTag(ctx, "09", "Quote-ready workspace", ep(t, t0, 0.4));
  const wa = ep(t, t0, 0.6, outQuart);
  ctx.save(); ctx.globalAlpha *= wa; ctx.translate(0, (1 - wa) * 50);
  const r = appWindow(ctx, 120, 190, 1680, 720, "", { url: "app.yourcrm.com/rfq/1028" });
  const focus = (tc: number) => clamp(ep(t, tc - 0.1, 0.3) - 0.7 * ep(t, tc + 1.1, 0.5));
  // header row
  text(ctx, "RFQ-1028 · Apex Apparel", r.x + 30, r.y + 50, { size: 26, weight: 800, family: F.head });
  pill(ctx, r.x + 420, r.y + 28, "Qualified", 1);
  pill(ctx, r.x + 560, r.y + 28, "Quote ready", ep(t, tBef, 0.4), C.elec);
  text(ctx, "EXAMPLE DATA", r.x + r.w - 30, r.y + 50, { size: 12, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
  // contact (left)
  const fc = focus(tCon);
  const lift = (f: number) => -6 * f;
  ctx.save(); ctx.translate(0, lift(fc));
  glass(ctx, r.x + 30, r.y + 90, 440, 450, { r: 20, focus: fc });
  text(ctx, "BUYER CONTACT", r.x + 60, r.y + 130, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  avatar(ctx, r.x + 100, r.y + 200, 40, "DR", C.blue);
  text(ctx, "Daniel Reed", r.x + 160, r.y + 194, { size: 24, weight: 800 });
  text(ctx, "Brand manager · Apex Apparel", r.x + 160, r.y + 222, { size: 15, weight: 500, color: C.sub });
  [["mail", "daniel@apexapparel.co"], ["phone", "+1 (555) 014-2208"], ["building", "Streetwear brand · US"]].forEach(([ic, v], i) => {
    icon(ctx, ic, r.x + 60, r.y + 282 + i * 56, 24, C.blue, 2);
    text(ctx, v, r.x + 100, r.y + 300 + i * 56, { size: 18, weight: 600 });
  });
  pill(ctx, r.x + 60, r.y + 460, "Contact verified", ep(t, tCon + 0.2, 0.4));
  ctx.restore();
  // project details (middle)
  const fd = focus(tDet);
  ctx.save(); ctx.translate(0, lift(fd));
  glass(ctx, r.x + 500, r.y + 90, 560, 450, { r: 20, focus: fd });
  text(ctx, "PROJECT DETAILS", r.x + 530, r.y + 130, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  RFQ_ROWS.slice(0, 4).forEach(([k, v, ic], i) => {
    const x = r.x + 530 + (i % 2) * 255, y = r.y + 150 + Math.floor(i / 2) * 90;
    rr(ctx, x, y, 240, 76, 14); ctx.fillStyle = C.well; ctx.fill();
    icon(ctx, ic, x + 16, y + 24, 28, C.blue, 2);
    text(ctx, k, x + 58, y + 32, { size: 14, weight: 600, color: C.sub });
    text(ctx, v, x + 58, y + 58, { size: 21, weight: 800 });
  });
  // deadline chip
  const fdl = focus(tDl);
  rr(ctx, r.x + 530, r.y + 340, 500, 90, 16); ctx.fillStyle = fdl > 0.3 ? rgba(C.amber, 0.12) : C.well; ctx.fill();
  ctx.strokeStyle = fdl > 0.3 ? rgba(C.amber, 0.7) : C.line; ctx.lineWidth = 1.5; ctx.stroke();
  icon(ctx, "calendar", r.x + 552, r.y + 368, 34, fdl > 0.3 ? "#B26A00" : C.blue, 2.2);
  text(ctx, "Deadline", r.x + 604, r.y + 374, { size: 15, weight: 600, color: C.sub });
  text(ctx, "Nov 15, 2026", r.x + 604, r.y + 408, { size: 26, weight: 800, family: F.head });
  if (fdl > 0) glow(ctx, r.x + 780, r.y + 385, 260, C.amber, 0.12 * fdl);
  text(ctx, "Notes: logo on left chest, navy merrow border", r.x + 530, r.y + 486, { size: 16, weight: 500, color: C.sub });
  ctx.restore();
  // artwork (right)
  const fa = focus(tArt);
  ctx.save(); ctx.translate(0, lift(fa));
  glass(ctx, r.x + 1090, r.y + 90, 560, 450, { r: 20, focus: fa });
  text(ctx, "ARTWORK", r.x + 1120, r.y + 130, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  text(ctx, "apex-logo.ai · 2.4 MB", r.x + 1620, r.y + 130, { size: 14, weight: 600, family: F.mono, color: C.sub, align: "right" });
  rr(ctx, r.x + 1120, r.y + 150, 500, 360, 16); ctx.fillStyle = "#EEF3F9"; ctx.fill();
  const zoom = ep(t, tArt, 0.8, inOutCubic);
  patch(ctx, "apex", r.x + 1310, r.y + 330, 280 + 40 * zoom, { shadow: 0.7 });
  // stitch loupe: macro footage in a lens
  if (zoom > 0) {
    const lx = r.x + 1520, ly = r.y + 250, lr = 90 * outBack(zoom, 1.3);
    ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 7); ctx.clip();
    cover(ctx, video("embroidery", t * 0.8 + 5), lx - lr, ly - lr, lr * 2, lr * 2, 0.55, 0.75, 1.6);
    ctx.restore();
    ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 7); ctx.strokeStyle = "#fff"; ctx.lineWidth = 6; ctx.stroke();
    ctx.strokeStyle = rgba(C.elec, 0.8); ctx.lineWidth = 2; ctx.stroke();
    chip(ctx, "Stitch preview", lx - 70, ly + lr + 10, { size: 14, fg: "#fff", bg: C.navy, alpha: zoom });
  }
  ctx.restore();
  // bottom action bar
  ctx.fillStyle = C.line; ctx.fillRect(r.x, r.y + 570, r.w, 1);
  text(ctx, "Everything needed to quote is here.", r.x + 30, r.y + 626, { size: 20, weight: 600, color: C.sub });
  const press = prog(t, tStart, tStart + 0.35);
  button(ctx, r.x + r.w - 360, r.y + 592, 330, 60, "Start the conversation  →", { size: 19, press, hover: ep(t, tBef, 0.5) });
  if (t > tBef) cursor(ctx, lerp(r.x + r.w - 600, r.x + r.w - 190, ep(t, tBef + 0.4, 0.8, inOutCubic)), lerp(r.y + 520, r.y + 630, ep(t, tBef + 0.4, 0.8, inOutCubic)), press, ep(t, tBef + 0.2, 0.3));
  ctx.restore();
  if (!o.noType) {
    kline(ctx, t, { x: 1800, y: 150, size: 46, align: "right",
      words: [{ s: "BEFORE", t: tBef, anim: "rise" }, { s: "THE", t: ws("the conversation") }, { s: "CONVERSATION", t: ws("conversation"), grad: true }, { s: "EVEN", t: ws("even starts") }, { s: "STARTS.", t: tStart }] });
  }
}
