// Closing act: the white-label model (client ↔ your agency, Madvert behind), you focus /
// we execute, and the call to action.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak, cursor } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { ribbon } from "../components/ribbon";
import { button, checkBadge, iconTile } from "../components/ui";
import { logoD } from "../components/brand";

function chatBubble(ctx: any, x: number, y: number, w: number, s: string, me: boolean, a: number) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= clamp(a * 2); ctx.translate(0, (1 - outExpo(clamp(a))) * 16);
  rr(ctx, x, y, w, 56, 22); ctx.fillStyle = me ? "#DDF0FF" : "#fff"; ctx.fill();
  text(ctx, s, x + 22, y + 37, { size: 23, weight: 700, color: C.navy });
  ctx.restore();
}

// ---------------------------------------------------------------- 10 WHITE-LABEL MODEL
const BACK: [string, string][] = [["Paid Media", "megaphone"], ["Funnels", "funnel"], ["Creative", "image"], ["CRM", "db"], ["Automation", "bolt"], ["Analytics", "chart"], ["Development", "gear"]];
export function drawModel(ctx: any, t: number) {
  const tSell = ws("sell"), tName = ws("agency name"), tKeep = ws("keep your"), tRel = ws("relationship"), tHave = ws("have us"), tBack = ws("backend"), tWL = ws("white label", 1), tDo = ws("we can do that");
  const [sx, sy] = shake(t, tWL, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.45, glowA: 1.1 });
  // CLIENT (top) ↔ YOUR AGENCY (middle)
  const ca = ep(t, tSell - 0.2, 0.5, outQuart);
  ctx.save(); ctx.globalAlpha *= ca;
  rr(ctx, 290, 450, 500, 120, 30); ctx.fillStyle = "#fff"; ctx.fill();
  iconTile(ctx, "building", 316, 474, 72, C.blue, 1);
  text(ctx, "CLIENT", 410, 525, { size: 38, weight: 800, family: F.head, color: C.navy });
  ctx.restore();
  const aa = ep(t, tName - 0.2, 0.5, outBack);
  if (aa > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(aa * 2);
    ctx.translate(W / 2, 805); ctx.scale(lerp(0.85, 1, aa), lerp(0.85, 1, aa)); ctx.translate(-W / 2, -805);
    glow(ctx, W / 2, 805, 420, C.cyan, 0.16);
    ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
    rr(ctx, 190, 730, 700, 150, 34); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.strokeStyle = C.elec; ctx.lineWidth = 4; ctx.stroke();
    rr(ctx, 224, 763, 84, 84, 20); ctx.fillStyle = C.navy; ctx.fill();
    text(ctx, "YA", 266, 818, { size: 34, weight: 800, family: F.head, color: "#fff", align: "center" });
    text(ctx, "YOUR AGENCY", 334, 800, { size: 44, weight: 800, family: F.head, color: C.navy });
    text(ctx, "Your name · your brand · your client", 334, 842, { size: 22, weight: 600, color: C.sub });
    ctx.restore();
  }
  // the relationship: conversation happens between client and agency only
  const ra = ep(t, tKeep - 0.1, 0.4);
  if (ra > 0) {
    ctx.save(); ctx.globalAlpha *= ra;
    ctx.strokeStyle = rgba(C.cyan, 0.9); ctx.lineWidth = 4; ctx.setLineDash([2, 12]); ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(W / 2, 572); ctx.lineTo(W / 2, 728); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    chatBubble(ctx, 120, 598, 330, "Can we launch Monday?", false, ep(t, tKeep, 0.35));
    chatBubble(ctx, 620, 650, 340, "Yes, all set for you.", true, ep(t, tRel - 0.1, 0.35));
  }
  // divider: behind the scenes
  const da = ep(t, tHave - 0.15, 0.4);
  if (da > 0) {
    ctx.save(); ctx.globalAlpha *= da;
    ctx.strokeStyle = "rgba(207,233,255,0.35)"; ctx.lineWidth = 2; ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.moveTo(90, 950); ctx.lineTo(W - 90, 950); ctx.stroke(); ctx.setLineDash([]);
    rr(ctx, W / 2 - 170, 932, 340, 36, 18); ctx.fillStyle = "#071A3A"; ctx.fill();
    text(ctx, "BEHIND THE SCENES", W / 2, 957, { size: 18, weight: 700, family: F.mono, ls: 4, color: "#CFE9FF", align: "center" });
    ctx.restore();
  }
  // Madvert backend (only connected to the agency)
  const ma = ep(t, tBack - 0.2, 0.5, outQuart);
  if (ma > 0) {
    ribbon(ctx, [[W / 2, 882], [W / 2, 1010]], { to: ep(t, tBack - 0.1, 0.4), width: 5, flow: t, speed: 1.2, pulses: 2 });
    ctx.save(); ctx.globalAlpha *= ma; ctx.translate(0, (1 - ma) * 40);
    rr(ctx, 110, 1010, 860, 330, 34); ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.fill(); ctx.strokeStyle = rgba(C.cyan, 0.45); ctx.lineWidth = 2; ctx.stroke();
    logoD(ctx, W / 2, 1040, 330, { pulse: prog(t, tBack, tBack + 1.0) });
    text(ctx, "BACKEND DELIVERY", W / 2, 1150, { size: 22, weight: 700, family: F.mono, ls: 5, color: C.cyan, align: "center" });
    BACK.forEach(([lab, ic], i) => {
      const a = ep(t, tBack + 0.1 + i * 0.12, 0.3, outBack);
      if (a <= 0) return;
      const row = i < 4 ? 0 : 1, n = row ? 3 : 4, k = row ? i - 4 : i;
      const bw = 190, x0 = W / 2 - (n * bw + (n - 1) * 12) / 2 + k * (bw + 12), y0 = 1180 + row * 74;
      ctx.save(); ctx.globalAlpha *= clamp(a * 2);
      rr(ctx, x0, y0, bw, 60, 30); ctx.fillStyle = "#fff"; ctx.fill();
      icon(ctx, ic, x0 + 16, y0 + 16, 28, C.blue, 2.2);
      text(ctx, lab, x0 + 52, y0 + 39, { size: lab.length > 10 ? 18 : 21, weight: 800, color: C.navy });
      ctx.restore();
    });
    ctx.restore();
  }
  // type (bottom)
  const ty = 1460;
  kline(ctx, t, { x: W / 2, y: ty, size: 62, align: "center", out: tKeep - 0.12, outAnim: "up", outDur: 0.2, words: [{ s: "YOUR", t: tName - 0.1 }, { s: "AGENCY", t: tName, color: C.cyan }, { s: "NAME.", t: tName + 0.3 }] });
  kline(ctx, t, { x: W / 2, y: ty, size: 62, align: "center", out: tHave - 0.12, outAnim: "up", outDur: 0.2, words: [{ s: "YOUR", t: tKeep }, { s: "CLIENT.", t: ws("client", 1), color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: ty, size: 62, align: "center", out: tWL - 0.12, outAnim: "up", outDur: 0.2, words: [{ s: "OUR", t: tHave + 0.1 }, { s: "BACKEND.", t: tBack, color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: ty, size: 62, align: "center", out: tDo - 0.1, outAnim: "up", outDur: 0.2, words: [{ s: "WHITE", t: tWL, anim: "slam" }, { s: "LABEL.", t: tWL + 0.15, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: ty, size: 62, align: "center", words: [{ s: "WE", t: tDo }, { s: "CAN", t: tDo + 0.1 }, { s: "DO", t: tDo + 0.2 }, { s: "THAT.", t: tDo + 0.35, color: C.cyan }] });
  ctx.restore();
}

// ---------------------------------------------------------------- 11 YOU FOCUS / WE EXECUTE
export function drawFocus(ctx: any, t: number) {
  const tF = ws("focus"), tGet = ws("getting", 1), tRet = ws("retaining"), tWe = ws("we handle", 1), tEx = ws("execution");
  background(ctx, t, { grid: 0.4, glowA: 1.2 });
  const panel = (y: number, a: number, who: string, head: string, sub: string, ic: string, dark: boolean) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * (dark ? 80 : -80), 0);
    rr(ctx, 110, y, 860, 360, 36); ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "#fff"; ctx.fill();
    if (dark) { ctx.strokeStyle = rgba(C.cyan, 0.5); ctx.lineWidth = 2; ctx.stroke(); }
    text(ctx, who, 160, y + 74, { size: 24, weight: 700, family: F.mono, ls: 5, color: dark ? C.cyan : C.blue });
    iconTile(ctx, ic, 160, y + 110, 96, dark ? C.cyan : C.blue, 1);
    text(ctx, head, 290, y + 166, { size: 52, weight: 800, family: F.head, color: dark ? "#fff" : C.navy });
    text(ctx, sub, 290, y + 218, { size: 26, weight: 600, color: dark ? "#CFE9FF" : C.sub });
    ctx.restore();
  };
  panel(460, ep(t, tF - 0.2, 0.5, outQuart), "YOU", "CLOSE.", "Get and retain clients", "users", false);
  panel(860, ep(t, tWe - 0.15, 0.5, outQuart), "MADVERT LABS", "DELIVER.", "We handle the execution", "bolt", true);
  checkBadge(ctx, 900, 540, 26, ep(t, tRet, 0.4));
  checkBadge(ctx, 900, 940, 26, ep(t, tEx, 0.4));
  kline(ctx, t, { x: W / 2, y: 1360, size: 96, align: "center", words: [{ s: "YOU", t: tGet }, { s: "CLOSE.", t: tRet, color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: 1480, size: 96, align: "center", words: [{ s: "WE", t: tWe }, { s: "DELIVER.", t: tEx, anim: "slam", grad: true }] });
}

// ---------------------------------------------------------------- 12 CTA
export function drawCTA(ctx: any, t: number) {
  const t0 = ws("if that") - 0.1, tBook = ws("book"), tCall = ws("call", 1), tShow = ws("show"), tPart = ws("partner"), tBis = ws("bismillah"), tScale = ws("scale");
  background(ctx, t, { grid: 0.4, glowA: 1.3 });
  logoD(ctx, W / 2, 430, 640, { reveal: ep(t, t0, 0.7, inOutExpo), pulse: prog(t, tBis, tBis + 1.0) });
  kline(ctx, t, { x: W / 2, y: 720, size: 64, align: "center", words: [{ s: "READY", t: t0 + 0.2 }, { s: "TO", t: t0 + 0.3 }, { s: "SCALE", t: t0 + 0.4, color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: 800, size: 50, align: "center", weight: 700, words: [{ s: "WITHOUT", t: t0 + 0.6 }, { s: "BUILDING", t: t0 + 0.7 }, { s: "THE", t: t0 + 0.8 }, { s: "WHOLE", t: t0 + 0.9 }, { s: "TEAM?", t: t0 + 1.0, color: C.cyan }] });
  const ba = ep(t, tBook - 0.15, 0.5, outBack), press = prog(t, tCall + 0.1, tCall + 0.45);
  if (ba > 0) {
    const breathe = 0.5 + 0.5 * Math.sin((t - tBook) * 3.2);
    ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
    glow(ctx, W / 2, 1000, 560, C.cyan, 0.18 + 0.1 * breathe);
    const bw = 900 * lerp(0.85, 1, ba);
    button(ctx, W / 2 - bw / 2, 930, bw, 140, "BOOK A WHITE-LABEL STRATEGY CALL", { size: 38, press, hover: 0.6 + 0.4 * breathe });
    ctx.restore();
  }
  cursor(ctx, lerp(900, 720, ep(t, tCall - 0.4, 0.4, inOutCubic)), lerp(1500, 1020, ep(t, tCall - 0.4, 0.4, inOutCubic)), press, ep(t, tCall - 0.45, 0.2) * (1 - ep(t, tShow + 0.3, 0.4)));
  // calendar confirmation
  const cc = ep(t, tCall + 0.45, 0.5, outBack);
  if (cc > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(cc * 2); ctx.translate(0, (1 - cc) * 30);
    rr(ctx, 230, 1110, 620, 90, 26); ctx.fillStyle = "#fff"; ctx.fill();
    icon(ctx, "calendar", 262, 1137, 36, C.blue, 2.4);
    text(ctx, "Strategy call requested", 316, 1166, { size: 28, weight: 800, color: C.navy });
    checkBadge(ctx, 810, 1155, 20, cc);
    ctx.restore();
  }
  const sa = ep(t, tShow - 0.1, 0.6);
  text(ctx, "Let's see if Madvert is the right", W / 2, 1270, { size: 32, weight: 600, color: "#CFE9FF", align: "center", alpha: sa });
  text(ctx, "backend partner for your agency.", W / 2, 1314, { size: 32, weight: 600, color: "#CFE9FF", align: "center", alpha: sa });
  ribbon(ctx, [[180, 1380], [W / 2, 1362], [W - 180, 1380]], { to: ep(t, tPart, 0.8, inOutCubic), width: 4, flow: t, speed: 0.35 });
  text(ctx, "madvertlabs.com", W / 2, 1440, { size: 32, weight: 700, color: C.cyan, align: "center", alpha: ep(t, tPart, 0.5) });
  kline(ctx, t, { x: W / 2, y: 1560, size: 60, align: "center", words: [{ s: "BISMILLAH.", t: tBis, anim: "blur", color: "#CFE9FF" }, { s: "LET'S", t: ws("let's"), anim: "rise" }, { s: "SCALE.", t: tScale, anim: "slam", grad: true }] });
}
