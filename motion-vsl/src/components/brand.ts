// Official Madvert Labs logo (supplied PNGs, never redrawn) plus orb activation pulse.
import { C } from "../core/brand";
import { img } from "../core/assets";
import { orb } from "../core/draw";

// orb centre within logo-light(-descriptor).png (1206 px wide), measured from the file
const ORB = { x: 318, y: 117, r: 27 };

/** Draws the logo centred at (cx, top) with width w. reveal 0..1 wipes left->right. Returns orb pos. */
export function logo(ctx: any, cx: number, top: number, w: number, o: { desc?: boolean; reveal?: number; pulse?: number; alpha?: number } = {}) {
  const im = img(o.desc ? "logoDesc" : "logo");
  if (!im) return { x: cx, y: top, r: 10 };
  const s = w / im.width, h = im.height * s, x = cx - w / 2;
  const rv = o.reveal ?? 1;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  if (rv < 1) { ctx.beginPath(); ctx.rect(x - 20, top - 20, (w + 40) * rv, h + 40); ctx.clip(); }
  ctx.drawImage(im, x, top, w, h);
  ctx.restore();
  const p = { x: x + ORB.x * s, y: top + ORB.y * s, r: ORB.r * s };
  if ((o.pulse ?? 0) > 0 && (o.pulse ?? 0) < 1) orb(ctx, p.x, p.y, p.r, o.pulse, 1 - (o.pulse ?? 0) * 0.3);
  return p;
}
export { C };

// orb centre within logo-dark.png, as a fraction of its size
const ORB_D = { x: 0.2716, y: 0.4286, r: 0.0844 };
/** White-wordmark logo for dark scenes, centred at (cx, top). */
export function logoD(ctx: any, cx: number, top: number, w: number, o: { reveal?: number; pulse?: number; alpha?: number } = {}) {
  const im = img("logoDark");
  if (!im) return;
  const h = im.height * w / im.width, x = cx - w / 2, rv = o.reveal ?? 1;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  if (rv < 1) { ctx.beginPath(); ctx.rect(x - 20, top - 20, (w + 40) * rv, h + 40); ctx.clip(); }
  ctx.drawImage(im, x, top, w, h);
  ctx.restore();
  const p = o.pulse ?? 0;
  if (p > 0 && p < 1) orb(ctx, x + w * ORB_D.x, top + h * ORB_D.y, h * ORB_D.r, p, (o.alpha ?? 1) * (1 - p));
}
