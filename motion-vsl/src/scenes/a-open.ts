// Opening act: hook (delivery problem) → white-label offer → founder → markets → scale.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, hash, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { ribbon } from "../components/ribbon";
import { checkBadge, iconTile, pill, avatar } from "../components/ui";
import { cutFlash, burst } from "../components/vert";
import { tile } from "../components/explainer";
import { logoD } from "../components/brand";
import { founder, nameTag, PROOFS } from "../components/vsl";

// ---------------------------------------------------------------- 01 HOOK
const NEEDS: [string, string][] = [["Meta Ads", "megaphone"], ["Designer", "pen"], ["Landing Page", "globe"], ["CRM", "db"], ["Automation", "bolt"], ["Developer", "gear"], ["Reporting", "chart"], ["Creative", "image"]];

function agencyCard(ctx: any, x: number, y: number, a: number, signed: number) {
  ctx.save(); ctx.globalAlpha *= a;
  ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 18;
  rr(ctx, x, y, 600, 210, 30); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
  rr(ctx, x + 30, y + 34, 70, 70, 18); ctx.fillStyle = C.navy; ctx.fill();
  text(ctx, "YA", x + 65, y + 81, { size: 28, weight: 800, family: F.head, color: "#fff", align: "center" });
  text(ctx, "Your Agency", x + 122, y + 64, { size: 30, weight: 800, family: F.head, color: C.navy });
  text(ctx, "CRM · Deals", x + 122, y + 96, { size: 21, weight: 600, color: C.sub });
  rr(ctx, x + 30, y + 130, 540, 52, 16); ctx.fillStyle = rgba(C.green, 0.1 + 0.05 * signed); ctx.fill();
  text(ctx, "New client signed", x + 54, y + 164, { size: 25, weight: 800, color: "#05834F" });
  checkBadge(ctx, x + 540, y + 156, 17, signed);
  ctx.restore();
}

export function drawHook(ctx: any, t: number) {
  const tAg = ws("agency"), tCl = ws("clients"), tBut = ws("but"), tDel = ws("delivery"), tHead = ws("headache"), tThis = ws("this is probably"), tOff = ws("offer"), tVal = ws("valuable"), tMy = ws("myself");
  const [sx, sy] = shake(t, tHead, 9);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.5, glowA: 1.2 });
  const cx = W / 2, cy = 900;
  // the agency closes a client
  const ca = ep(t, 0.15, 0.6, outBack) * (1 - ep(t, tThis - 0.1, 0.4, inOutCubic));
  agencyCard(ctx, cx - 300, cy - 105, clamp(ca * 2), ep(t, tCl - 0.1, 0.4));
  // delivery needs swarm around it
  const out = ep(t, tThis - 0.2, 0.5, inOutExpo);
  NEEDS.forEach(([lab, ic], i) => {
    const at = tBut + 0.05 + i * 0.16;
    const a = ep(t, at, 0.45, outBack) * (1 - out);
    if (a <= 0) return;
    const ang = -Math.PI / 2 + (i / NEEDS.length) * Math.PI * 2 + 0.2;
    const R = lerp(150, 420, outExpo(clamp((t - at) / 0.6))) + Math.sin(t * 2 + i) * 6;
    const x = cx + Math.cos(ang) * R * 1.05, y = cy + Math.sin(ang) * R * 0.95;
    ctx.save(); ctx.globalAlpha *= clamp(a * 2);
    ctx.font = `800 26px Inter`; const tw = ctx.measureText(lab).width + 86;
    rr(ctx, x - tw / 2, y - 32, tw, 64, 32); ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
    ctx.strokeStyle = rgba(C.red, 0.5); ctx.lineWidth = 2; ctx.stroke();
    icon(ctx, ic, x - tw / 2 + 18, y - 15, 30, C.blue, 2.4);
    text(ctx, lab, x - tw / 2 + 58, y + 9, { size: 26, weight: 800, color: C.navy });
    ctx.beginPath(); ctx.arc(x + tw / 2 - 10, y - 28, 8, 0, 7); ctx.fillStyle = C.red; ctx.fill();
    ctx.restore();
  });
  // type
  kline(ctx, t, { x: W / 2, y: 520, size: 64, align: "center", weight: 700, out: tBut - 0.1, outAnim: "up", outDur: 0.2, words: [{ s: "YOU", t: tAg - 0.2 }, { s: "GOT", t: tAg }] });
  kline(ctx, t, { x: W / 2, y: 640, size: 108, align: "center", out: tBut - 0.1, outAnim: "up", outDur: 0.2, words: [{ s: "THE", t: tCl - 0.25 }, { s: "CLIENT.", t: tCl, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1420, size: 72, align: "center", weight: 700, out: tThis - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "WHO'S", t: tDel }, { s: "GOING", t: tDel + 0.1 }, { s: "TO", t: tDel + 0.2 }] });
  kline(ctx, t, { x: W / 2, y: 1560, size: 132, align: "center", out: tThis - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "DELIVER?", t: tHead - 0.2, anim: "slam", color: C.cyan }] });
  // this is for you → valuable for both
  kline(ctx, t, { x: W / 2, y: 900, size: 112, align: "center", out: tOff - 0.2, outAnim: "up", outDur: 0.25, words: [{ s: "THIS", t: tThis }, { s: "IS", t: tThis + 0.12 }, { s: "FOR", t: ws("for you") }, { s: "YOU.", t: ws("for you") + 0.15, grad: true, anim: "slam" }] });
  const pa = ep(t, tOff - 0.05, 0.6, outQuart);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    const yN = 860;
    // two parties linked
    rr(ctx, 110, yN - 80, 340, 160, 30); ctx.fillStyle = "#fff"; ctx.fill();
    rr(ctx, 140, yN - 36, 72, 72, 18); ctx.fillStyle = C.navy; ctx.fill();
    text(ctx, "YA", 176, yN + 11, { size: 28, weight: 800, family: F.head, color: "#fff", align: "center" });
    text(ctx, "Your Agency", 230, yN + 10, { size: 26, weight: 800, color: C.navy });
    rr(ctx, 630, yN - 80, 340, 160, 30); ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill(); ctx.strokeStyle = rgba(C.cyan, 0.5); ctx.lineWidth = 2; ctx.stroke();
    logoD(ctx, 800, yN - 30, 260);
    ribbon(ctx, [[450, yN], [540, yN - 40], [630, yN]], { to: ep(t, tOff + 0.2, 0.6, inOutCubic), width: 5, flow: t, speed: 1, pulses: 2 });
    ctx.restore();
  }
  kline(ctx, t, { x: W / 2, y: 1180, size: 78, align: "center", words: [{ s: "VALUABLE", t: tVal - 0.1, anim: "rise", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1290, size: 60, align: "center", weight: 700, words: [{ s: "FOR", t: ws("to you") }, { s: "YOU", t: ws("to you") + 0.12 }, { s: "&", t: ws("and myself"), color: C.cyan }, { s: "FOR", t: tMy - 0.1 }, { s: "US.", t: tMy }] });
  ctx.restore();
}

// ---------------------------------------------------------------- 02 WHITE-LABEL OFFER
const SERV: [string, string][] = [["Paid Media", "megaphone"], ["Funnels", "funnel"], ["Landing Pages", "globe"], ["CRM & Automation", "db"], ["Creative", "image"], ["Analytics", "chart"]];
export function drawOffer(ctx: any, t: number) {
  const t0 = ws("i'm offering") - 0.1, tWL = ws("white label"), tMean = ws("meaning"), tAll = ws("all of our"), tPort = ws("portfolio"), tYours = ws("yours"), tOut = ws("outsource"), tTeam = ws("team");
  const [sx, sy] = shake(t, tYours, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.55, glowA: 1.2 });
  kline(ctx, t, { x: W / 2, y: 520, size: 40, align: "center", weight: 700, ls: 8, color: "#CFE9FF", words: [{ s: "THE", t: t0 + 0.1 }, { s: "OFFER", t: t0 + 0.25 }] });
  kline(ctx, t, { x: W / 2, y: 650, size: 132, align: "center", words: [{ s: "WHITE-LABEL", t: tWL, anim: "slam", grad: true }] });
  // services portfolio card: header flips from Madvert Labs to Your Agency
  const pa = ep(t, tMean - 0.1, 0.6, outQuart);
  const flip = ep(t, tYours - 0.1, 0.5, inOutExpo);
  if (pa > 0) {
    const x = 110, y = 730, w = 860, h = 560;
    ctx.save(); ctx.globalAlpha *= pa; ctx.translate(0, (1 - pa) * 60);
    ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 18;
    rr(ctx, x, y, w, h, 34); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    // header
    const hy = y + 36;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, 110); ctx.clip();
    ctx.translate(0, -flip * 110);
    text(ctx, "SERVICES PORTFOLIO", x + 40, hy + 22, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.sub });
    text(ctx, "Madvert Labs", x + 40, hy + 64, { size: 38, weight: 800, family: F.head, color: C.navy });
    ctx.translate(0, 110);
    text(ctx, "SERVICES PORTFOLIO", x + 40, hy + 22, { size: 20, weight: 700, family: F.mono, ls: 3, color: C.sub });
    rr(ctx, x + 40, hy + 34, 44, 44, 12); ctx.fillStyle = C.navy; ctx.fill();
    text(ctx, "YA", x + 62, hy + 64, { size: 18, weight: 800, family: F.head, color: "#fff", align: "center" });
    text(ctx, "Your Agency", x + 98, hy + 68, { size: 38, weight: 800, family: F.head, color: C.navy });
    ctx.restore();
    if (flip > 0.5) pill(ctx, x + w - 220, y + 60, "Your brand", flip, C.green, 18);
    ctx.fillStyle = C.line; ctx.fillRect(x + 40, y + 120, w - 80, 1.5);
    SERV.forEach(([lab, ic], i) => {
      const a = ep(t, tAll + i * 0.12, 0.35, outBack);
      const col = i % 2, row = Math.floor(i / 2);
      const bx = x + 40 + col * 400, by = y + 150 + row * 130;
      ctx.save(); ctx.globalAlpha *= clamp(a * 2);
      rr(ctx, bx, by, 380, 110, 20); ctx.fillStyle = "#F4F8FD"; ctx.fill(); ctx.strokeStyle = flip > 0.5 ? rgba(C.elec, 0.45) : C.line; ctx.lineWidth = 1.5; ctx.stroke();
      iconTile(ctx, ic, bx + 18, by + 23, 64, C.blue, 1);
      text(ctx, lab, bx + 100, by + 66, { size: 27, weight: 800, color: C.navy });
      ctx.restore();
    });
    ctx.restore();
  }
  kline(ctx, t, { x: W / 2, y: 1420, size: 64, align: "center", out: tOut - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "OUR", t: tAll }, { s: "SERVICES.", t: tAll + 0.15 }, { s: "YOURS.", t: tYours, anim: "slam", color: C.cyan }] });
  // outsource → Madvert team bar
  const oa = ep(t, tOut - 0.1, 0.5, outQuart);
  if (oa > 0) {
    ctx.save(); ctx.globalAlpha *= oa;
    ribbon(ctx, [[W / 2, 1290], [W / 2, 1360]], { to: ep(t, tOut, 0.3), width: 5, flow: t, speed: 1 });
    rr(ctx, 160, 1360, 760, 110, 55); ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.fill(); ctx.strokeStyle = rgba(C.cyan, 0.6); ctx.lineWidth = 2; ctx.stroke();
    text(ctx, "DELIVERED BY", 210, 1424, { size: 20, weight: 700, family: F.mono, ls: 3, color: "#CFE9FF" });
    logoD(ctx, 560, 1385, 230);
    text(ctx, "TEAM", 870, 1424, { size: 22, weight: 800, family: F.mono, ls: 3, color: C.cyan, align: "right", alpha: ep(t, tTeam, 0.3) });
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- 03 FOUNDER
export function drawFounder(ctx: any, t: number) {
  const t0 = ws("i'll keep") - 0.1, tSt = ws("straight"), tDM = ws("digital"), tLG = ws("lead generation"), tGS = ws("growth"), tYrs = ws("five"), tY2 = ws("years");
  background(ctx, t, { grid: 0.4, glowA: 1.1 });
  // hyperframe flashes of real work, then the founder lands
  const tLand = tSt + 0.35;
  if (t < tLand) {
    const [i, lt] = burst(t, t0 + 0.1, [0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 5]);
    const k = [0, 3, 4, 5, 6, 2, 1, 7][i];
    const sc = lerp(1.08, 1, outExpo(clamp(lt / 0.12)));
    ctx.save(); ctx.translate(W / 2, 980); ctx.scale(sc * 1.45, sc * 1.45); ctx.translate(-300, -300);
    tile(ctx, k, t - t0);
    ctx.restore();
    for (let c = 0; c < 7; c++) cutFlash(ctx, t, t0 + 0.1 + c * 0.16, 0.05);
    kline(ctx, t, { x: W / 2, y: 1560, size: 64, align: "center", words: [{ s: "STRAIGHT", t: tSt - 0.05, anim: "rise" }, { s: "TALK.", t: tSt + 0.1, anim: "rise", color: C.cyan }] });
  } else {
    const a = ep(t, tLand, 0.5, outQuart);
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 50);
    founder(ctx, 140, 430, 800, 820, t - tLand, { fy: 0.2 });
    nameTag(ctx, 170, 1100, ep(t, tLand + 0.3, 0.5, outExpo));
    ctx.restore();
    const L = [["DIGITAL MARKETING", tDM], ["LEAD GENERATION", tLG], ["GROWTH SYSTEMS", tGS]] as const;
    L.forEach(([s, at], i) => kline(ctx, t, { x: W / 2, y: 1350 + i * 72, size: 54, align: "center", words: [{ s, t: at - 0.05, anim: "rise", color: i === 1 ? C.cyan : "#fff" }] }));
    // 5+ YEARS badge on the photo
    const ya = ep(t, tYrs - 0.1, 0.4, outBack);
    if (ya > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(ya * 2);
      ctx.translate(800, 560); ctx.scale(lerp(1.3, 1, ya), lerp(1.3, 1, ya));
      ctx.beginPath(); ctx.arc(0, 0, 118, 0, 7);
      const g = ctx.createLinearGradient(-118, -118, 118, 118); g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan); ctx.fillStyle = g; ctx.fill();
      ctx.shadowColor = C.cyan; ctx.shadowBlur = 30;
      text(ctx, "5+", 0, 18, { size: 96, weight: 800, family: F.head, color: "#fff", align: "center" });
      text(ctx, "YEARS", 0, 62, { size: 26, weight: 800, family: F.mono, ls: 5, color: "#fff", align: "center", alpha: ep(t, tY2, 0.3) });
      ctx.restore();
    }
  }
}

// ---------------------------------------------------------------- 04 MARKETS
function flag(ctx: any, k: string, x: number, y: number, w: number, h: number) {
  ctx.save(); rr(ctx, x, y, w, h, 8); ctx.clip();
  if (k === "us") {
    for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? "#fff" : "#D93A49"; ctx.fillRect(x, y + i * h / 7, w, h / 7 + 0.5); }
    ctx.fillStyle = "#1F3A93"; ctx.fillRect(x, y, w * 0.42, h * 0.57);
  } else if (k === "uae") {
    ctx.fillStyle = "#00843D"; ctx.fillRect(x, y, w, h / 3); ctx.fillStyle = "#fff"; ctx.fillRect(x, y + h / 3, w, h / 3); ctx.fillStyle = "#111"; ctx.fillRect(x, y + 2 * h / 3, w, h / 3);
    ctx.fillStyle = "#EF3340"; ctx.fillRect(x, y, w * 0.26, h);
  } else {
    ctx.fillStyle = "#fff"; ctx.fillRect(x, y, w * 0.25, h); ctx.fillStyle = "#01411C"; ctx.fillRect(x + w * 0.25, y, w * 0.75, h);
    const cx = x + w * 0.62, cy = y + h / 2, r = h * 0.3;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx + r * 0.3, cy - r * 0.18, r * 0.86, 0, 7); ctx.fillStyle = "#01411C"; ctx.fill();
    ctx.save(); ctx.translate(cx + r * 0.55, cy - r * 0.35); ctx.fillStyle = "#fff"; ctx.beginPath();
    for (let i = 0; i < 10; i++) { const rr2 = i % 2 ? r * 0.12 : r * 0.3, an = -Math.PI / 2 + i * Math.PI / 5; ctx.lineTo(Math.cos(an) * rr2, Math.sin(an) * rr2); }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  ctx.restore();
}
export function drawMarkets(ctx: any, t: number) {
  const t0 = ws("and alhamdulillah") - 0.1, tAc = ws("across"), tD = ws("dubai"), tP = ws("pakistan"), tSB = ws("servicebased"), tInd = ws("industries");
  const tUS = tAc + 0.45;
  background(ctx, t, { grid: 0.5, glowA: 1.2 });
  kline(ctx, t, { x: W / 2, y: 500, size: 40, align: "center", weight: 700, ls: 8, color: "#CFE9FF", out: tSB - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "WORKED", t: ws("worked") }, { s: "ACROSS", t: tAc }] });
  const M: [string, string, number][] = [["us", "U.S.", tUS], ["uae", "DUBAI", tD], ["pk", "PAKISTAN", tP]];
  const outM = ep(t, tSB - 0.15, 0.35, inOutExpo);
  M.forEach(([k, lab, at], i) => {
    const a = ep(t, at - 0.08, 0.4, outQuart) * (1 - outM);
    if (a <= 0) return;
    const y = 620 + i * 230;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * -80, 0);
    flag(ctx, k, 140, y, 150, 100);
    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 2; rr(ctx, 140, y, 150, 100, 8); ctx.stroke();
    text(ctx, lab, 330, y + 84, { size: 108, weight: 800, family: F.head, color: i === 1 ? C.cyan : "#fff" });
    ctx.restore();
  });
  // industries: fast flashes of the real case-study covers
  if (t >= tSB - 0.15) {
    const [i, lt] = burst(t, tSB - 0.1, [0.28, 0.28, 0.28, 0.28, 3]);
    const P = PROOFS[[1, 2, 3, 4, 0][i]];
    const im = img(P.key);
    if (im) {
      const w = 960, h = w * P.crop[3] / P.crop[2], sc = lerp(1.06, 1, outExpo(clamp(lt / 0.2)));
      ctx.save(); ctx.translate(W / 2, 860); ctx.scale(sc, sc);
      ctx.shadowColor = "rgba(0,120,255,0.45)"; ctx.shadowBlur = 50;
      rr(ctx, -w / 2, -h / 2, w, h, 22); ctx.fillStyle = "#000"; ctx.fill(); ctx.shadowColor = "transparent"; ctx.clip();
      ctx.drawImage(im, P.crop[0], P.crop[1], P.crop[2], P.crop[3], -w / 2, -h / 2, w, h);
      ctx.restore();
    }
    for (let c = 1; c < 5; c++) cutFlash(ctx, t, tSB - 0.1 + c * 0.28, 0.05);
    kline(ctx, t, { x: W / 2, y: 1300, size: 74, align: "center", words: [{ s: "MULTIPLE", t: tSB, anim: "rise" }, { s: "INDUSTRIES.", t: tInd, anim: "rise", color: C.cyan }] });
    kline(ctx, t, { x: W / 2, y: 1400, size: 50, align: "center", weight: 700, color: "#CFE9FF", words: [{ s: "ONE", t: tInd + 0.35 }, { s: "SYSTEMS", t: tInd + 0.45 }, { s: "MINDSET.", t: tInd + 0.55 }] });
  }
}

// ---------------------------------------------------------------- 05 SCALE
export function drawScale(ctx: any, t: number) {
  const t0 = ws("we've managed") - 0.1, tAcc = ws("accounts"), tUp = ws("up to"), tK = ws("30000"), tMo = ws("month"), tHand = ws("handle"), tE2E = ws("endtoend"), tOur = ws("ourselves");
  const [sx, sy] = shake(t, tK, 8);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.45, glowA: 1 + 0.4 * ep(t, tK, 0.4) });
  // abstract monthly spend bars climbing to a cap line (no axis values; the claim lives in the type)
  const ba = ep(t, t0 + 0.1, 0.5);
  ctx.save(); ctx.globalAlpha *= ba * (1 - 0.6 * ep(t, tHand - 0.1, 0.5));
  rr(ctx, 110, 470, 860, 470, 34); ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1.5; ctx.stroke();
  text(ctx, "MONTHLY AD SPEND MANAGED", 150, 530, { size: 22, weight: 700, family: F.mono, ls: 3, color: "#CFE9FF" });
  const vals = [0.18, 0.26, 0.3, 0.42, 0.5, 0.58, 0.66, 0.78, 0.86, 0.94];
  vals.forEach((v, i) => {
    const p = ep(t, tAcc + i * 0.12, 0.5, outBack);
    const hh = 300 * v * p, bx = 160 + i * 78;
    const g = ctx.createLinearGradient(0, 900 - hh, 0, 900); g.addColorStop(0, C.cyan); g.addColorStop(1, C.blue);
    rr(ctx, bx, 900 - hh, 52, Math.max(4, hh), 10); ctx.fillStyle = g; ctx.fill();
  });
  const cl = ep(t, tK, 0.4, outExpo);
  if (cl > 0) {
    ctx.setLineDash([12, 10]); ctx.strokeStyle = rgba(C.cyan, cl); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(150, 590); ctx.lineTo(150 + 780 * cl, 590); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, "up to ~$30K / month", 930, 578, { size: 24, weight: 800, color: C.cyan, align: "right", alpha: cl });
  }
  ctx.restore();
  kline(ctx, t, { x: W / 2, y: 1100, size: 58, align: "center", weight: 700, color: "#CFE9FF", out: tHand - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "UP", t: tUp }, { s: "TO", t: tUp + 0.12 }, { s: "AROUND", t: ws("around") }] });
  kline(ctx, t, { x: W / 2, y: 1270, size: 170, align: "center", ls: -4, out: tHand - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "$30K", t: tK, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1380, size: 58, align: "center", weight: 700, out: tHand - 0.15, outAnim: "up", outDur: 0.2, words: [{ s: "/", t: tMo - 0.2, color: C.cyan }, { s: "MONTH", t: tMo - 0.1 }, { s: "MANAGED", t: tMo + 0.1, color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: 1170, size: 132, align: "center", words: [{ s: "END-TO-END.", t: tE2E, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1300, size: 64, align: "center", weight: 700, words: [{ s: "ALL", t: tOur - 0.1 }, { s: "IN-HOUSE.", t: tOur, color: C.cyan }] });
  ctx.restore();
}
