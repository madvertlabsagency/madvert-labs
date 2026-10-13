// 02 SYSTEM REVEAL — "Madvert Labs builds a potential order system designed to bring
// qualified RFQs into your pipeline." Logo, title, then the living chain AD→FUNNEL→RFQ→CRM.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, orb } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { iconTile, checkBadge, pill } from "../components/ui";
import { pulseDot } from "../components/rfq";

export const LOGO_ORB = { x: 0.2716, y: 0.4286, r: 0.0844 }; // measured in logo-dark.png

export function logoDark(ctx: any, cx: number, top: number, w: number, reveal = 1, pulse = 0, alpha = 1) {
  const lg = img("logoDark");
  if (!lg) return;
  const h = lg.height * w / lg.width, x = cx - w / 2;
  ctx.save();
  ctx.globalAlpha *= alpha;
  if (reveal < 1) { ctx.beginPath(); ctx.rect(x - 20, top - 20, (w + 40) * reveal, h + 40); ctx.clip(); }
  ctx.drawImage(lg, x, top, w, h);
  ctx.restore();
  if (pulse > 0 && pulse < 1) orb(ctx, x + w * LOGO_ORB.x, top + h * LOGO_ORB.y, h * LOGO_ORB.r, pulse, alpha * (1 - pulse));
}

const NODES: [string, string, string][] = [["AD", "megaphone", "Scroll-stopping patch ads"], ["QUOTATION FUNNEL", "funnel", "Your brand, your form"], ["QUALIFIED RFQ", "doc", "Specs + contact + artwork"], ["YOUR CRM", "db", "Delivered to your pipeline"]];
const NY = (i: number) => 1080 + i * 170;

export function drawSystem(ctx: any, t: number) {
  const tM = ws("madvert") - 0.06, tPot = ws("potential"), tOrd = ws("order system"), tDes = ws("designed"), tQ = ws("qualified"), tR = ws("rfqs"), tPipe = ws("pipeline");
  const [sx, sy] = shake(t, tOrd, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.7, glowA: 1.4 });
  // logo snaps in from the burst
  const lr = ep(t, tM, 0.5, inOutExpo);
  logoDark(ctx, W / 2, 300, 760, lr, prog(t, ws("labs") + 0.1, ws("labs") + 1.0));
  kline(ctx, t, { x: W / 2, y: 690, size: 150, align: "center", words: [{ s: "POTENTIAL", t: tPot, anim: "rise" }] });
  // ORDER SYSTEM locks in as the stronger second beat
  kline(ctx, t, { x: W / 2, y: 830, size: 124, align: "center", ls: -2, words: [{ s: "ORDER", t: tOrd, anim: "slam", grad: true }, { s: "SYSTEM", t: ws("system"), anim: "slam", grad: true }] });
  const fa = ep(t, ws("system") + 0.25, 0.4);
  text(ctx, "FOR CUSTOM PATCH BUSINESSES", W / 2, 910, { size: 26, weight: 700, family: F.mono, ls: lerp(14, 6, fa), color: "#CFE9FF", align: "center", alpha: fa });
  // underline extends into the cyan signal that runs down the chain
  const path: [number, number][] = [[W / 2 - 300, 940], [W / 2 + 300, 940], [930, 990], [960, NY(0)], [960, NY(3)]];
  const sp = sample(path, 200);
  const draw = ep(t, ws("system") + 0.1, 0.5, inOutCubic) * 0.42 + ep(t, tDes, 2.6, inOutCubic) * 0.58;
  ribbon(ctx, sp, { to: Math.max(0.001, draw), width: 5, flow: t, speed: t > tPipe ? 0.9 : 0, pulses: 2 });
  // chain nodes
  const on = [tDes, tDes + 0.4, tQ, tPipe - 0.2];
  NODES.forEach(([lab, ic, sub], i) => {
    const a = ep(t, on[i] - 0.15, 0.4, outQuart);
    if (a <= 0) return;
    const act = ep(t, on[i], 0.3);
    const big = i === 2 ? ep(t, tQ, 0.4, outBack) * (1 - 0.6 * ep(t, tR + 0.6, 0.4)) : 0;
    const x = 110, y = NY(i) - 62, w = 760, h = 124;
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.translate(x + w / 2 + (1 - a) * -80, y + h / 2); ctx.scale(1 + big * 0.06, 1 + big * 0.06); ctx.translate(-(x + w / 2), -(y + h / 2));
    if (act > 0) glow(ctx, x + w / 2, y + h / 2, 420, C.cyan, (0.12 + big * 0.2) * act);
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
    rr(ctx, x, y, w, h, 28); ctx.fillStyle = "#FFFFFF"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.lineWidth = 3; ctx.strokeStyle = rgba(C.elec, 0.25 + 0.75 * act); ctx.stroke();
    iconTile(ctx, ic, x + 24, y + 22, 80, C.blue, act);
    text(ctx, lab, x + 128, y + 62, { size: 38, weight: 800, family: F.head, color: C.navy });
    text(ctx, sub, x + 128, y + 98, { size: 24, weight: 600, color: C.sub });
    if (act > 0.5) checkBadge(ctx, x + w - 52, y + h / 2, 22, (act - 0.5) * 2);
    ctx.restore();
    // connector dot onto the signal line
    if (act > 0) { ctx.beginPath(); ctx.arc(960, NY(i), 10, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.cyan; ctx.stroke(); }
  });
  // QUALIFIED RFQs: chips burst from the RFQ node
  ["Patch type", "Quantity", "Deadline", "Artwork"].forEach((c, i) => {
    const a = ep(t, tR + i * 0.08, 0.3, outBack) * (1 - ep(t, tR + 0.8, 0.3));
    if (a > 0) pill(ctx, 130 + i * 190, NY(2) + 84, c, a, C.green, 22);
  });
  // the pulse travels the chain into the CRM on "pipeline"
  const pp = prog(t, tR + 0.4, tPipe + 0.2);
  if (pp > 0 && pp < 1) { const p = pointAt(sp, lerp(0.42, 1, inOutCubic(pp))); pulseDot(ctx, p.x, p.y, 12); }
  ctx.restore();
}
