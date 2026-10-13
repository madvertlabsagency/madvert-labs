// 07 CTA — the underline has become the button. Logo, Patches Partnership, Book your call.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, glow, cursor } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { button } from "../components/ui";
import { ribbon } from "../components/ribbon";
import { logoDark } from "./02-system";
import { CTA_BOX } from "./06-offer";

export function drawCTA(ctx: any, t: number) {
  const tB = ws("book"), tCall = ws("call"), tLabs = ws("labs", 1), tEnd = we("today");
  background(ctx, t, { grid: 0.5, glowA: 1.3 });
  // logo mask reveal
  const lr = ep(t, tB - 0.1, 0.6, inOutExpo);
  const p1 = prog(t, tLabs, tLabs + 1.0), p2 = prog(t, tEnd + 1.0, tEnd + 2.0);
  logoDark(ctx, W / 2, 540, 820, lr, p1 > 0 && p1 < 1 ? p1 : p2);
  kline(ctx, t, { x: W / 2, y: 940, size: 66, align: "center", ls: 6, words: [{ s: "PATCHES", t: tB + 0.15, anim: "rise", grad: true }, { s: "PARTNERSHIP", t: tB + 0.3, anim: "rise", grad: true }] });
  const sa = ep(t, ws("discovery") + 0.1, 0.5);
  text(ctx, "Potential Order System for Custom Patch Businesses", W / 2, 1020, { size: 30, weight: 600, color: "#CFE9FF", align: "center", alpha: sa });
  // button (inherits the underline's container), breathing glow on the CTA only
  const press = prog(t, tCall + 0.05, tCall + 0.4);
  const breathe = 0.5 + 0.5 * Math.sin((t - tB) * 3.2);
  glow(ctx, W / 2, CTA_BOX.y + CTA_BOX.h / 2, 560, C.cyan, 0.16 + 0.1 * breathe);
  const la = ep(t, tB, 0.3);
  button(ctx, CTA_BOX.x, CTA_BOX.y, CTA_BOX.w, CTA_BOX.h, "", { press, hover: 0.6 + 0.4 * breathe });
  kline(ctx, t, { x: W / 2, y: CTA_BOX.y + CTA_BOX.h / 2 + 17, size: 46, align: "center",
    words: [{ s: "BOOK", t: tB, anim: "rise" }, { s: "YOUR", t: ws("your discovery") }, { s: "DISCOVERY", t: ws("discovery") }, { s: "CALL", t: tCall, anim: "rise" }] });
  cursor(ctx, lerp(940, 760, ep(t, tCall - 0.4, 0.4, inOutCubic)), lerp(1620, CTA_BOX.y + 110, ep(t, tCall - 0.4, 0.4, inOutCubic)), press, ep(t, tCall - 0.45, 0.2) * (1 - ep(t, tEnd, 0.4)));
  text(ctx, "madvertlabs.com", W / 2, 1520, { size: 34, weight: 700, color: "#fff", align: "center", alpha: ep(t, tEnd - 0.3, 0.5) });
  ribbon(ctx, [[160, 1590], [W / 2, 1570], [W - 160, 1590]], { to: ep(t, tEnd - 0.2, 0.8, inOutCubic), width: 4, flow: t, speed: 0.35 });
}
