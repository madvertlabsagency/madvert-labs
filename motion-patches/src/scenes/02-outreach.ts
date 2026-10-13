// 02 OUTREACH — every MORE adds operational load until the frame is overloaded.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutCubic, inCubic, lerp, prog, hash, rgba, outBack, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, avatar, pill, lines, appWindow } from "../components/ui";
import { sectionTag } from "../components/rfq";

const CALLS = [
  ["Northline Uniforms", "No answer"], ["Brightside Clubs", "Voicemail"], ["Harbor Sports", "Call back"],
  ["Metro Fire Assoc.", "No answer"], ["Oakridge Scouts", "Not interested"], ["Granite Works", "Voicemail"],
  ["Summit Crew", "Call back"], ["Delta Racing", "No answer"], ["Coastline Co.", "Voicemail"], ["Ridge Brewing", "No answer"],
];

export function drawOutreach(ctx: any, t: number) {
  const t0 = ws("you might") - 0.2;
  const cues = [ws("more staff"), ws("more follow-up"), ws("more salaries"), ws("more management")];
  const clear = ep(t, we("management") + 0.05, 0.45, inCubic);
  const load = cues.reduce((a, c) => a + ep(t, c, 0.5), 0); // 0..4
  background(ctx, t, { grid: 0.4 });
  sectionTag(ctx, "02", "Outreach", ep(t, t0, 0.4) * (1 - clear));
  kline(ctx, t, { x: 120, y: 200, size: 56, weight: 800, out: we("management") + 0.05, outAnim: "fade",
    words: [{ s: "RELYING", t: ws("relying") }, { s: "ON", t: ws("on outreach") }, { s: "OUTREACH", t: ws("outreach"), grad: true }] });

  ctx.save();
  ctx.translate(0, clear * 260); ctx.globalAlpha = 1 - clear;
  // console window
  const wx = 120, wy = 250, ww = 980, wh = 640;
  const wa = ep(t, t0 + 0.1, 0.6, outQuart);
  ctx.save(); ctx.globalAlpha *= wa; ctx.translate(0, (1 - wa) * 40 + noise(t * 9) * load * 0.8);
  const r = appWindow(ctx, wx, wy, ww, wh, "Outreach console");
  // call list scrolling
  ctx.save(); rr(ctx, r.x, r.y, 600, r.h, 0); ctx.clip();
  const scroll = (t - t0) * 38;
  text(ctx, "COLD-CALL LIST", r.x + 28, r.y + 40, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  for (let i = 0; i < 14; i++) {
    const [name, st] = CALLS[i % CALLS.length];
    const ry = r.y + 64 + i * 56 - (scroll % 56) - Math.floor(scroll / 56) * 0;
    if (ry < r.y + 50 || ry > r.y + r.h - 40) continue;
    rr(ctx, r.x + 20, ry, 560, 48, 10); ctx.fillStyle = C.well; ctx.fill();
    icon(ctx, "phone", r.x + 34, ry + 12, 24, C.sub, 2);
    text(ctx, name, r.x + 72, ry + 31, { size: 17, weight: 600 });
    chip(ctx, st, r.x + 420, ry + 10, { size: 13, h: 28, fg: st === "Call back" ? "#9A6200" : "#C2263F", bg: st === "Call back" ? rgba(C.amber, 0.12) : rgba(C.red, 0.12) });
  }
  ctx.restore();
  // right side of console: load modules
  const mx = r.x + 620, mw = 340;
  ctx.fillStyle = C.line; ctx.fillRect(mx - 10, r.y, 1, r.h);
  // staff seats
  const s1 = ep(t, cues[0], 0.5, outBack);
  if (s1 > 0) {
    text(ctx, "SALES REPS", mx + 10, r.y + 40, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub, alpha: clamp(s1) });
    ["JM", "DK", "AR", "TS", "BL", "RN"].forEach((n, i) => {
      const a = ep(t, cues[0] + i * 0.09, 0.35, outBack);
      if (a > 0) { ctx.save(); ctx.globalAlpha *= clamp(a); avatar(ctx, mx + 34 + (i % 3) * 66, r.y + 82 + Math.floor(i / 3) * 66, 26 * a, n, [C.blue, "#3B5BDB", "#1C7ED6", "#0B7285", "#5C7CFA", "#228BE6"][i]); ctx.restore(); }
    });
  }
  // follow-up queue
  const s2 = ep(t, cues[1], 0.5);
  if (s2 > 0) {
    ctx.save(); ctx.globalAlpha *= s2;
    text(ctx, "FOLLOW-UP QUEUE", mx + 10, r.y + 236, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
    const q = Math.round(lerp(12, 64, ep(t, cues[1], 2.2, outQuart)));
    text(ctx, String(q), mx + 10, r.y + 292, { size: 48, weight: 800, family: F.head, color: C.amber });
    text(ctx, "tasks overdue", mx + 90, r.y + 288, { size: 16, weight: 600, color: C.sub });
    ctx.restore();
  }
  // salaries
  const s3 = ep(t, cues[2], 0.5);
  if (s3 > 0) {
    ctx.save(); ctx.globalAlpha *= s3;
    text(ctx, "PAYROLL", mx + 10, r.y + 344, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
    for (let i = 0; i < 6; i++) {
      const h = 30 + i * 14 * ep(t, cues[2] + i * 0.06, 0.4, outBack);
      rr(ctx, mx + 10 + i * 50, r.y + 440 - h, 34, h, 6); ctx.fillStyle = rgba(C.red, 0.35 + i * 0.08); ctx.fill();
    }
    ctx.restore();
  }
  // management layer
  const s4 = ep(t, cues[3], 0.5);
  if (s4 > 0) {
    ctx.save(); ctx.globalAlpha *= s4;
    text(ctx, "MANAGEMENT", mx + 10, r.y + 484, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
    avatar(ctx, mx + 150, r.y + 520, 22, "MG", "#495057");
    for (let i = 0; i < 5; i++) { ctx.strokeStyle = C.line2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mx + 150, r.y + 542); ctx.lineTo(mx + 30 + i * 60, r.y + 576); ctx.stroke(); rr(ctx, mx + 14 + i * 60, r.y + 576, 32, 14, 7); ctx.fillStyle = "#DCE6F2"; ctx.fill(); }
    ctx.restore();
  }
  ctx.restore();

  // the MORE stack (right)
  const ys = [370, 490, 610, 730];
  const words = [["STAFF", ws("staff")], ["FOLLOW-UP", ws("follow-up")], ["SALARIES", ws("salaries")], ["MANAGEMENT", ws("management")]] as const;
  words.forEach(([w, tw], i) => {
    kline(ctx, t, { x: 1150, y: ys[i], size: 60, weight: 800,
      words: [{ s: "MORE", t: cues[i], anim: "slideR", color: C.sub }, { s: w, t: tw, anim: "slam", color: i === 3 ? C.red : C.text }] });
  });
  ctx.restore();
}
