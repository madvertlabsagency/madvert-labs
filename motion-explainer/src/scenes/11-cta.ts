// 12 CTA — "Agar aap dekhna chahte hain ke ye system aapke custom patch business ke liye kaise
// implement ho sakta hai, to is video ke baad call book karein. Thanks, talk soon!"
import { C, F, W, H } from "../core/brand";
import { background, text, rr, glow, cursor, icon } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { button } from "../components/ui";
import { ribbon } from "../components/ribbon";
import { logo } from "../components/brand";

const SLOTS = ["Mon 10:00", "Tue 14:30", "Wed 11:00"];

export function drawCTA(ctx: any, t: number) {
  const t0 = ws("agar") - 0.1, tSee = ws("dekhna"), tPatch = ws("patch", 2), tImp = ws("implement"), tCall = ws("call"), tBook = ws("book"), tThx = ws("thanks"), tEnd = we("soon");
  background(ctx, t, { grid: 0.4, glowA: 1.2 });
  const la = ep(t, t0, 0.7, inOutExpo);
  logo(ctx, W / 2, 470, 620, { reveal: la, pulse: prog(t, tThx, tThx + 1.0) });
  kline(ctx, t, { x: W / 2, y: 740, size: 66, align: "center", words: [{ s: "SEE", t: tSee, anim: "rise" }, { s: "HOW", t: tSee + 0.12, anim: "rise" }, { s: "THIS", t: tSee + 0.24, anim: "rise" }, { s: "WORKS", t: tSee + 0.36, anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 830, size: 66, align: "center", words: [{ s: "FOR", t: tPatch - 0.3, anim: "rise" }, { s: "YOUR", t: tPatch - 0.2, anim: "rise" }, { s: "PATCH", t: tPatch, anim: "rise", grad: true }, { s: "BUSINESS.", t: tPatch + 0.15, anim: "rise", grad: true }] });
  const sa = ep(t, tImp, 0.6);
  text(ctx, "Let's look at your current setup and see whether", W / 2, 920, { size: 28, weight: 600, color: C.sub, align: "center", alpha: sa });
  text(ctx, "the qualified RFQ model is a fit.", W / 2, 960, { size: 28, weight: 600, color: C.sub, align: "center", alpha: sa });
  // booking card: pick a slot, then the button
  const ca = ep(t, tImp + 0.3, 0.6, outQuart);
  if (ca > 0) {
    ctx.save(); ctx.globalAlpha *= ca; ctx.translate(0, (1 - ca) * 40);
    rr(ctx, 140, 1030, 800, 150, 28); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
    icon(ctx, "calendar", 176, 1062, 32, C.blue, 2.4);
    text(ctx, "Book your strategy call", 222, 1088, { size: 26, weight: 800, color: C.navy });
    const pick = ep(t, tCall - 0.4, 0.3);
    SLOTS.forEach((s, i) => {
      const x = 176 + i * 250, on = i === 1 && pick > 0.5;
      rr(ctx, x, 1110, 230, 50, 25); ctx.fillStyle = on ? C.blue : "#F2F6FB"; ctx.fill();
      text(ctx, s, x + 115, 1144, { size: 22, weight: 700, color: on ? "#fff" : C.sub, align: "center" });
    });
    ctx.restore();
  }
  const ba = ep(t, tCall - 0.15, 0.5, outBack);
  const press = prog(t, tBook + 0.05, tBook + 0.4);
  if (ba > 0) {
    const breathe = 0.5 + 0.5 * Math.sin((t - tCall) * 3.2);
    ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
    glow(ctx, W / 2, 1290, 560, C.cyan, 0.16 + 0.1 * breathe);
    const bw = 860 * lerp(0.85, 1, ba);
    button(ctx, W / 2 - bw / 2, 1220, bw, 140, "BOOK A STRATEGY CALL", { size: 50, press, hover: 0.6 + 0.4 * breathe });
    ctx.restore();
  }
  cursor(ctx, lerp(900, 700, ep(t, tBook - 0.45, 0.4, inOutCubic)), lerp(1620, 1320, ep(t, tBook - 0.45, 0.4, inOutCubic)), press, ep(t, tBook - 0.5, 0.2) * (1 - ep(t, tThx + 0.3, 0.4)));
  text(ctx, "madvertlabs.com", W / 2, 1450, { size: 34, weight: 700, color: C.blue, align: "center", alpha: ep(t, tThx - 0.2, 0.5) });
  ribbon(ctx, [[180, 1490], [W / 2, 1474], [W - 180, 1490]], { to: ep(t, tThx, 0.8, inOutCubic), width: 4, flow: t, speed: 0.35 });
  kline(ctx, t, { x: W / 2, y: 1620, size: 44, align: "center", weight: 700, color: C.navy, words: [{ s: "Thanks,", t: tThx, anim: "blur" }, { s: "talk", t: ws("talk"), anim: "blur" }, { s: "soon!", t: ws("soon"), anim: "blur", color: C.blue }] });
}
