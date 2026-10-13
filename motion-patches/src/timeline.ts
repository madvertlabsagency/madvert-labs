// Plate order and cut points, anchored to phrases in the aligned voiceover.
import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { cut, ws, we } from "./core/words";
import { drawHook } from "./scenes/01-hook";
import { drawOutreach } from "./scenes/02-outreach";
import { drawAds } from "./scenes/03-ads";
import { drawInterrupt } from "./scenes/04-interrupt";
import { drawAd } from "./scenes/05-ad";
import { drawFunnel } from "./scenes/06-funnel";
import { drawForm } from "./scenes/07-form";
import { drawCRM } from "./scenes/08-crm";
import { drawIntent } from "./scenes/09-intent";
import { drawWorkspace } from "./scenes/10-workspace";
import { drawReveal } from "./scenes/11-reveal";
import { drawSystem } from "./scenes/12-system";
import { drawBurden } from "./scenes/13-burden";
import { drawModel } from "./scenes/14-model";
import { drawPay } from "./scenes/15-pay";
import { drawOrders } from "./scenes/16-orders";
import { drawCTA } from "./scenes/17-cta";

export function timeline(): Scene[] {
  const S: Omit<Scene, "end">[] = [
    { id: "hook", start: 0, draw: drawHook, subs: (t) => (t > ws("that's the real problem") - 0.1 ? "subtle" : "dark") },
    { id: "outreach", start: cut("you might", 0, 0.3), in: { type: "push", dur: 0.5 }, draw: drawOutreach },
    { id: "ads", start: cut("or you're running", 0, 0.3), in: { type: "wipeUp", dur: 0.45 }, draw: (c, t) => drawAds(c, t), subs: (t) => (t > ws("too many") ? "subtle" : "dark") },
    { id: "interrupt", start: cut("madvert labs fixes", 0, 0.3), in: { type: "cut", dur: 0 }, draw: drawInterrupt, subs: "subtle" },
    { id: "ad", start: cut("we create", 0, 0.25), in: { type: "push", dur: 0.45 }, draw: drawAd, subs: "subtle" },
    { id: "funnel", start: cut("those buyers", 0, 0.3), in: { type: "cut", dur: 0 }, draw: drawFunnel, subs: "subtle" },
    { id: "form", start: cut("where they fill", 0, 0.2), in: { type: "cut", dur: 0 }, draw: (c, t) => drawForm(c, t), subs: "subtle" },
    { id: "crm", start: cut("from there", 0, 0.1), in: { type: "cut", dur: 0 }, draw: drawCRM, subs: "subtle" },
    { id: "intent", start: cut("so your team", 0, 0.25), in: { type: "swipe", dur: 0.45 }, draw: drawIntent, subs: "subtle" },
    { id: "workspace", start: cut("you get the project", 0, 0.25), in: { type: "wipeUp", dur: 0.45 }, draw: (c, t) => drawWorkspace(c, t), subs: "subtle" },
    { id: "reveal", start: cut("that's the madvert", 0, 0.3), in: { type: "cut", dur: 0 }, draw: drawReveal, subs: "subtle" },
    { id: "system", start: cut("we handle", 0, 0.25), in: { type: "fade", dur: 0.35 }, draw: drawSystem, subs: "subtle" },
    { id: "burden", start: cut("and the best part", 0, 0.25), in: { type: "swipe", dur: 0.45 }, draw: drawBurden, subs: "subtle" },
    { id: "model", start: cut("everything is built", 0, 0.25), in: { type: "cut", dur: 0 }, draw: drawModel, subs: "subtle" },
    { id: "pay", start: cut("you simply pay", 0, 0.25), in: { type: "flash", dur: 0.3 }, draw: drawPay, subs: "subtle" },
    { id: "orders", start: cut("so instead", 0, 0.25), in: { type: "wipeUp", dur: 0.45 }, draw: drawOrders, subs: "subtle" },
    { id: "cta", start: cut("if you're serious", 0, 0.25), in: { type: "push", dur: 0.5 }, draw: drawCTA, subs: "subtle" },
  ];
  return S.map((s, i) => ({ ...s, end: i < S.length - 1 ? S[i + 1].start : DURATION }));
}
