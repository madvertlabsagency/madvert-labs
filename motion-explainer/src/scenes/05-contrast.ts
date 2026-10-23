// 05 BEFORE / AFTER — "Matlab aapko sirf 'I need patches' wala message nahi milta... balke
// aapko proper requirement milti hai." A bare inquiry vs the complete Qualified RFQ.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { glass, avatar } from "../components/ui";
import { rfqCard } from "../components/rfq";

/** The thin "I need patches" inquiry: name, phone, nothing usable. Design 440 x 640. */
function bareLead(ctx: any, x: number, y: number, s: number, grey: number) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glass(ctx, 0, 0, 440, 640, { r: 26 });
  avatar(ctx, 56, 60, 30, "JM", grey > 0.5 ? "#A9B8CC" : C.red);
  text(ctx, "New inquiry", 102, 52, { size: 18, weight: 700, family: F.mono, ls: 1, color: C.mute });
  text(ctx, "via Messenger", 102, 80, { size: 18, weight: 600, color: C.sub });
  rr(ctx, 26, 116, 388, 92, 18); ctx.fillStyle = C.well; ctx.fill();
  text(ctx, "“I need patches”", 220, 174, { size: 34, weight: 800, color: C.navy, align: "center" });
  [["Name", "John M.", false], ["Phone", "+1 ••• ••• ••42", false], ["Patch type", "Missing", true], ["Quantity", "Missing", true], ["Artwork", "Missing", true], ["Deadline", "Missing", true]].forEach(([k, v, miss], i) => {
    const ry = 238 + i * 64;
    ctx.fillStyle = C.line; ctx.fillRect(26, ry + 52, 388, 1);
    text(ctx, k as string, 30, ry + 36, { size: 21, weight: 600, color: C.sub });
    if (miss) chip(ctx, v as string, 414 - 128, ry + 12, { size: 16, fg: "#C2263F", bg: rgba(C.red, 0.1), dot: C.red, h: 32 });
    else text(ctx, v as string, 410, ry + 36, { size: 22, weight: 700, color: C.navy, align: "right" });
  });
  if (grey > 0) { rr(ctx, 0, 0, 440, 640, 26); ctx.fillStyle = `rgba(233,240,248,${0.55 * grey})`; ctx.fill(); }
  ctx.restore();
}

export function drawContrast(ctx: any, t: number) {
  const t0 = ws("matlab") - 0.1, tNeed = ws("i need"), tBalke = ws("balke"), tProper = ws("proper"), tReq = ws("requirement");
  const [sx, sy] = shake(t, tProper, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.5 });
  // the bare lead: centre stage, then moves left and greys as the RFQ arrives
  const la = ep(t, t0, 0.5, outBack);
  const mv = ep(t, tBalke - 0.1, 0.6, inOutExpo);
  const lx = lerp(W / 2 - 260, 34, mv), ls = lerp(1.18, 0.8, mv);
  ctx.save(); ctx.globalAlpha *= clamp(la * 2);
  bareLead(ctx, lx, lerp(640, 760, mv) + (1 - la) * 60, ls, ep(t, tReq, 0.5));
  ctx.restore();
  // label tags
  const ta = ep(t, tBalke + 0.2, 0.4);
  if (ta > 0) {
    text(ctx, "BEFORE", 34 + 176, 1310, { size: 24, weight: 700, family: F.mono, ls: 4, color: C.mute, align: "center", alpha: ta });
  }
  // the RFQ arrives on the right
  const ra = ep(t, tBalke + 0.15, 0.6, outBack);
  if (ra > 0) {
    const rv = clamp((t - tBalke - 0.4) / 1.4) * 6;
    ctx.save(); ctx.translate((1 - ra) * 200, 0);
    glow(ctx, 720, 1000, 480, C.cyan, 0.18 * ra);
    rfqCard(ctx, 400, 610, 1.14, { reveal: rv, art: ep(t, tProper, 0.4), qualified: ep(t, tReq, 0.4), focus: 1, alpha: clamp(ra * 2) });
    ctx.restore();
    text(ctx, "QUALIFIED RFQ", 400 + 319, 1450, { size: 24, weight: 700, family: F.mono, ls: 4, color: C.blue, align: "center", alpha: ta });
  }
  // type
  kline(ctx, t, { x: W / 2, y: 530, size: 84, align: "center", out: tBalke - 0.12, outAnim: "up", outDur: 0.25,
    words: [{ s: "NOT", t: tNeed - 0.1, anim: "rise" }, { s: "JUST", t: tNeed + 0.1, anim: "rise" }, { s: "A", t: ws("patches") - 0.1 }, { s: "LEAD.", t: ws("patches"), anim: "slam", color: C.red }] });
  kline(ctx, t, { x: W / 2, y: 540, size: 96, align: "center",
    words: [{ s: "A", t: tProper - 0.15, anim: "rise" }, { s: "PROPER", t: tProper, anim: "slam", grad: true }, { s: "RFQ.", t: tReq, anim: "slam", grad: true }] });
  text(ctx, "Sample values for illustration", W / 2, 1500, { size: 22, weight: 600, color: C.mute, align: "center", alpha: ep(t, tReq, 0.5) });
  const sw = prog(t, tProper - 0.1, tProper + 0.5);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.5, 0.2);
  ctx.restore();
}
