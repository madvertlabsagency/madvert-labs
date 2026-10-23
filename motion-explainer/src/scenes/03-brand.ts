// 03 YOUR BRAND — "Buyer aapke brand ke naam aur aapke brand ke page se ad dekhta hai, phir
// apke branded landing page per ata he." Brand page → branded ad → branded landing page, all
// under the client's name. Madvert only appears as "powered in the backend".
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, cover, cursor } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, hash } from "../core/ease";
import { ws, we } from "../core/words";
import { video } from "../core/assets";
import { kline } from "../components/kinetic";
import { phone, button, lines, avatar } from "../components/ui";
import { patch } from "../components/patches";
import { shield, brandMark } from "../components/explainer";
import { logo } from "../components/brand";

const P = { x: 300, y: 640, w: 480, h: 880 };

export function drawBrand(ctx: any, t: number) {
  const tB = ws("buyer", 1), tBr = ws("brand"), tPg = ws("page"), tAd = ws("ad"), tPh = ws("phir"), tLand = ws("branded");
  background(ctx, t, { grid: 0.5 });
  // headline slot (one line at a time; previous ones become ticks)
  const L = [["YOUR", "BRAND."], ["YOUR", "PAGE."], ["YOUR", "LANDING PAGE."]];
  const cues = [tBr, tPg, tLand];
  L.forEach(([a, b], i) => {
    const tout = i < 2 ? cues[i + 1] - 0.12 : undefined;
    kline(ctx, t, { x: W / 2, y: 560, size: i === 2 ? 84 : 104, align: "center", out: tout, outAnim: "up", outDur: 0.22,
      words: [{ s: a, t: cues[i] - 0.05, anim: "rise" }, { s: b, t: cues[i] + 0.08, anim: "rise", grad: true }] });
  });
  // phone with three screens
  const pa = ep(t, tB - 0.1, 0.5, outQuart);
  ctx.save(); ctx.globalAlpha *= pa; ctx.translate(0, (1 - pa) * 80);
  const scr = phone(ctx, P.x, P.y, P.w, P.h);
  ctx.save(); rr(ctx, scr.x, scr.y, scr.w, scr.h, 52); ctx.clip();
  ctx.fillStyle = "#F5F8FC"; ctx.fillRect(scr.x, scr.y, scr.w, scr.h);
  const s1 = ep(t, tAd - 0.35, 0.5, inOutExpo), s2 = ep(t, tPh + 0.2, 0.55, inOutExpo);
  // screen 1: brand page profile
  if (s1 < 1) {
    ctx.save(); ctx.translate(-s1 * scr.w, 0);
    const x = scr.x, y = scr.y;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, scr.w, 260); ctx.clip();
    cover(ctx, video("stitch", 4.2 + t * 0.3), x, y, scr.w, 260, 0.6, 0.5, 1.1);
    ctx.fillStyle = "rgba(6,20,48,0.25)"; ctx.fillRect(x, y, scr.w, 260);
    ctx.restore();
    ctx.beginPath(); ctx.arc(x + 90, y + 260, 62, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
    ctx.beginPath(); ctx.arc(x + 90, y + 260, 54, 0, 7); ctx.fillStyle = "#FFF1E6"; ctx.fill();
    shield(ctx, x + 90, y + 260, 1.9);
    text(ctx, "Your Brand", x + 30, y + 370, { size: 34, weight: 800, family: F.head });
    text(ctx, "Custom patches · Embroidery", x + 30, y + 404, { size: 20, weight: 600, color: C.sub });
    button(ctx, x + 30, y + 432, 200, 54, "Follow", { size: 20 });
    button(ctx, x + 244, y + 432, 190, 54, "Message", { size: 20, ghost: true });
    text(ctx, "Message", x + 339, y + 466, { size: 20, weight: 700, color: C.navy, align: "center" });
    // posts grid
    const kinds: any[] = ["apex", "summit", "riverside", "lakeside", "pine", "eagle"];
    kinds.forEach((k, i) => {
      const gx = x + 20 + (i % 3) * 146, gy = y + 512 + Math.floor(i / 3) * 146;
      rr(ctx, gx, gy, 138, 138, 12); ctx.fillStyle = i % 2 ? "#0B1D3F" : "#EAF1FA"; ctx.fill();
      patch(ctx, k, gx + 69, gy + 69, 104, { shadow: 0.2 });
    });
    ctx.restore();
  }
  // screen 2: the brand's ad in the feed
  if (s1 > 0 && s2 < 1) {
    ctx.save(); ctx.translate((1 - s1) * scr.w - s2 * scr.w, 0);
    const x = scr.x + 18, y = scr.y + 80, w = scr.w - 36;
    text(ctx, "Feed", scr.x + 26, scr.y + 56, { size: 24, weight: 800, family: F.head });
    rr(ctx, x, y, w, 700, 22); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 40, y + 42, 24, 0, 7); ctx.fillStyle = "#FFF1E6"; ctx.fill(); shield(ctx, x + 40, y + 42, 0.9);
    text(ctx, "Your Brand", x + 76, y + 38, { size: 21, weight: 800 });
    text(ctx, "Sponsored", x + 76, y + 62, { size: 15, weight: 500, color: C.sub });
    ctx.save(); ctx.beginPath(); ctx.rect(x, y + 84, w, 470); ctx.clip();
    cover(ctx, video("embroidery", 2 + t * 0.8), x, y + 84, w, 470, 0.5, 0.6, 1.2);
    const g = ctx.createLinearGradient(0, y + 84, 0, y + 554); g.addColorStop(0, "rgba(4,10,20,0.3)"); g.addColorStop(1, "rgba(4,10,20,0.85)"); ctx.fillStyle = g; ctx.fillRect(x, y + 84, w, 470);
    patch(ctx, "apex", x + w / 2, y + 270, 200);
    text(ctx, "CUSTOM PATCHES", x + w / 2, y + 470, { size: 36, weight: 800, family: F.head, align: "center", color: "#fff" });
    text(ctx, "Built for your brand", x + w / 2, y + 510, { size: 22, weight: 700, align: "center", color: C.cyan });
    ctx.restore();
    const press = prog(t, tPh - 0.05, tPh + 0.25);
    button(ctx, x + 20, y + 590, w - 40, 72, "Get a quote  →", { size: 26, press, hover: 1 });
    ctx.restore();
    if (s2 < 0.3) cursor(ctx, lerp(P.x + P.w + 60, P.x + P.w * 0.6, ep(t, tPh - 0.6, 0.5, inOutCubic)), lerp(P.y + P.h + 40, scr.y + 80 + 626, ep(t, tPh - 0.6, 0.5, inOutCubic)), press, ep(t, tPh - 0.6, 0.2));
  }
  // screen 3: the branded landing page
  if (s2 > 0) {
    ctx.save(); ctx.translate((1 - s2) * scr.w, 0);
    const x = scr.x, y = scr.y;
    ctx.fillStyle = "#fff"; ctx.fillRect(x, y, scr.w, scr.h);
    ctx.fillStyle = "#F3F7FC"; ctx.fillRect(x, y + 40, scr.w, 56);
    rr(ctx, x + 60, y + 52, scr.w - 120, 34, 17); ctx.fillStyle = "#fff"; ctx.fill();
    text(ctx, "quote.yourbrand.com", x + scr.w / 2, y + 75, { size: 17, weight: 600, color: C.sub, align: "center" });
    brandMark(ctx, x + 40, y + 140, 1);
    text(ctx, "Custom patches,", x + 30, y + 236, { size: 40, weight: 800, family: F.head });
    text(ctx, "made for your", x + 30, y + 284, { size: 40, weight: 800, family: F.head });
    text(ctx, "brand.", x + 30, y + 332, { size: 40, weight: 800, family: F.head, color: "#C2410C" });
    lines(ctx, x + 30, y + 370, 300, 2, { gap: 22, h: 10 });
    patch(ctx, "apex", x + scr.w - 110, y + 300, 150, { rot: 0.08 });
    ["Embroidered", "Woven", "PVC", "Chenille"].forEach((s, i) => {
      rr(ctx, x + 30 + (i % 2) * 206, y + 440 + Math.floor(i / 2) * 76, 194, 62, 14); ctx.fillStyle = "#F5F8FC"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
      text(ctx, s, x + 127 + (i % 2) * 206, y + 480 + Math.floor(i / 2) * 76, { size: 21, weight: 700, color: C.navy, align: "center" });
    });
    button(ctx, x + 30, y + 620, scr.w - 60, 80, "Start your quote  →", { size: 26, hover: 0.5 + 0.5 * Math.sin(t * 3) });
    text(ctx, "Tell us what you need. We quote it.", x + scr.w / 2, y + 750, { size: 18, weight: 600, color: C.sub, align: "center" });
    ctx.restore();
  }
  ctx.restore();
  ctx.restore();
  // backend tag
  const ba = ep(t, tLand + 0.4, 0.5, outQuart);
  if (ba > 0) {
    ctx.save(); ctx.globalAlpha *= ba;
    text(ctx, "Powered by", W / 2 - 150, 1600, { size: 24, weight: 600, color: C.sub, align: "right" });
    logo(ctx, W / 2 - 10, 1574, 220);
    text(ctx, "in the backend", W / 2 + 112, 1600, { size: 24, weight: 600, color: C.sub });
    ctx.restore();
  }
}
