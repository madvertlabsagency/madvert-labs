// Embroidered patch artworks drawn in code (example designs, not real clients).
// Each design is rendered once into a cached 512px canvas with a thread texture and
// merrowed border, then drawn scaled with a soft shadow.
import { scratch } from "../core/assets";
import { F } from "../core/brand";
import { hash } from "../core/ease";

const S = 512;
const built = new Set<string>();

type Kind = "apex" | "summit" | "riverside" | "lakeside" | "pine" | "eagle";

function thread(x: any, path: () => void, color: string, angle: number, dense = 3.2) {
  x.save();
  path(); x.clip();
  x.fillStyle = color; x.fillRect(0, 0, S, S);
  x.translate(S / 2, S / 2); x.rotate(angle); x.translate(-S, -S);
  for (let i = 0; i < S * 2; i += dense) {
    x.strokeStyle = i % (dense * 2) < dense ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.16)";
    x.lineWidth = dense * 0.55;
    x.beginPath(); x.moveTo(0, i); x.lineTo(S * 2, i + 6 * Math.sin(i * 0.05)); x.stroke();
  }
  x.restore();
}
function merrow(x: any, path: () => void, color: string, width = 22) {
  x.save();
  path();
  x.lineWidth = width; x.strokeStyle = color; x.stroke();
  // stitched ridges across the border
  x.setLineDash([2.2, 3.2]); x.lineWidth = width; x.strokeStyle = "rgba(0,0,0,0.28)"; x.stroke();
  x.setLineDash([]); x.lineWidth = 2; x.strokeStyle = "rgba(255,255,255,0.18)"; x.stroke();
  x.restore();
}
function hexPath(x: any, r: number) {
  return () => {
    x.beginPath();
    for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + (i * Math.PI) / 3; const px = S / 2 + Math.cos(a) * r, py = S / 2 + Math.sin(a) * r; i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.closePath();
  };
}
function circlePath(x: any, r: number) { return () => { x.beginPath(); x.arc(S / 2, S / 2, r, 0, Math.PI * 2); }; }
function rrPath(x: any, w: number, h: number, r: number) { return () => { x.beginPath(); x.roundRect(S / 2 - w / 2, S / 2 - h / 2, w, h, r); }; }

function mountains(x: any, base: number, peaks: [number, number][], fill: string, snow: string) {
  const path = () => {
    x.beginPath(); x.moveTo(peaks[0][0] - 120, base);
    for (const [px, py] of peaks) { x.lineTo(px - 70, base - (base - py) * 0.35); x.lineTo(px, py); x.lineTo(px + 70, base - (base - py) * 0.35); }
    x.lineTo(peaks[peaks.length - 1][0] + 140, base); x.closePath();
  };
  thread(x, path, fill, 0.9, 3);
  for (const [px, py] of peaks) {
    const sp = () => { x.beginPath(); x.moveTo(px, py); x.lineTo(px + 34, py + 46); x.lineTo(px + 12, py + 38); x.lineTo(px - 4, py + 52); x.lineTo(px - 20, py + 40); x.lineTo(px - 36, py + 48); x.closePath(); };
    thread(x, sp, snow, -0.5, 2.6);
  }
}
function label(x: any, s: string, y: number, size: number, color: string, ls = 2, weight = 800) {
  x.save();
  x.font = `${weight} ${size}px ${F.head}`; x.letterSpacing = `${ls}px`; x.textAlign = "center"; x.textBaseline = "alphabetic";
  x.lineWidth = size * 0.16; x.strokeStyle = "rgba(0,0,0,0.55)"; x.strokeText(s, S / 2, y);
  x.fillStyle = color; x.fillText(s, S / 2, y);
  x.restore();
}

function build(kind: Kind) {
  const c = scratch("patch-" + kind, S, S);
  const x = c.getContext("2d");
  x.setTransform(c.width / S, 0, 0, c.height / S, 0, 0);
  x.clearRect(0, 0, S, S);
  switch (kind) {
    case "apex": {
      const P = hexPath(x, 236);
      thread(x, P, "#11203A", 0.6);
      x.save(); P(); x.clip();
      thread(x, () => { x.beginPath(); x.arc(S / 2 + 40, 200, 70, 0, Math.PI * 2); }, "#F07A1F", 0.3, 2.6);
      mountains(x, 330, [[180, 180], [290, 140], [380, 205]], "#3B5578", "#F2F4F7");
      thread(x, () => { x.beginPath(); x.rect(0, 318, S, 200); }, "#0C1830", 0.5);
      x.restore();
      label(x, "APEX", 385, 92, "#F4F6FA", 4);
      label(x, "APPAREL", 422, 26, "#F07A1F", 9, 700);
      merrow(x, P, "#0A1426", 24);
      break;
    }
    case "summit": {
      const P = rrPath(x, 440, 300, 40);
      thread(x, P, "#141414", 0.4);
      x.save(); P(); x.clip(); mountains(x, 260, [[256, 150]], "#E07A22", "#F7F2EA"); x.restore();
      label(x, "SUMMIT", 330, 76, "#F7F2EA", 6);
      merrow(x, P, "#E07A22", 20);
      break;
    }
    case "riverside": {
      const P = circlePath(x, 228);
      thread(x, P, "#B3171E", 0.7);
      thread(x, circlePath(x, 150), "#F5F1EA", -0.4);
      x.save(); circlePath(x, 150)(); x.clip();
      thread(x, () => { x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.moveTo(S / 2, S / 2); x.lineTo(S / 2 + Math.cos(a) * 120, S / 2 + Math.sin(a) * 120); x.lineTo(S / 2 + Math.cos(a + 0.25) * 120, S / 2 + Math.sin(a + 0.25) * 120); x.closePath(); } }, "#B3171E", 0.2);
      x.restore();
      label(x, "RIVERSIDE", 120, 40, "#F5F1EA", 6);
      label(x, "FIRE DEPT", 420, 36, "#F5F1EA", 6);
      merrow(x, P, "#F5F1EA", 18);
      break;
    }
    case "lakeside": {
      const P = circlePath(x, 228);
      thread(x, P, "#0E2A4A", 0.5);
      x.save(); P(); x.clip();
      thread(x, () => { x.beginPath(); x.rect(0, 300, S, 40); }, "#4CA3D9", 0.2, 2.6);
      mountains(x, 300, [[200, 190], [320, 170]], "#2C5D86", "#E8F1F8");
      x.restore();
      label(x, "LAKESIDE", 400, 54, "#E8F1F8", 4);
      merrow(x, P, "#E8F1F8", 18);
      break;
    }
    case "pine": {
      const P = circlePath(x, 228);
      thread(x, P, "#0F2E22", 0.6);
      x.save(); P(); x.clip();
      for (let i = 0; i < 5; i++) {
        const cx = 140 + i * 58, h = 150 + hash(i) * 70, by = 380;
        thread(x, () => { x.beginPath(); x.moveTo(cx, by - h); x.lineTo(cx + 40, by); x.lineTo(cx - 40, by); x.closePath(); }, i % 2 ? "#2F7A52" : "#3E9466", 1.1, 2.6);
      }
      x.restore();
      label(x, "PINE VALLEY", 418, 32, "#EADFC8", 4);
      merrow(x, P, "#EADFC8", 18);
      break;
    }
    case "eagle": {
      const P = hexPath(x, 230);
      thread(x, P, "#1B1B22", 0.6);
      x.save(); P(); x.clip();
      thread(x, () => { x.beginPath(); x.moveTo(110, 250); x.quadraticCurveTo(256, 120, 402, 250); x.quadraticCurveTo(256, 200, 110, 250); x.closePath(); }, "#C9A54A", 0.2, 2.6);
      x.restore();
      label(x, "IRONCLAD", 340, 50, "#C9A54A", 4);
      merrow(x, P, "#C9A54A", 20);
      break;
    }
  }
  built.add(kind);
  return c;
}

/** Draw an embroidered patch centred at (cx, cy), `size` px wide. */
export function patch(ctx: any, kind: Kind, cx: number, cy: number, size: number, o: { rot?: number; alpha?: number; shadow?: number } = {}) {
  const c = built.has(kind) ? scratch("patch-" + kind, S, S) : build(kind);
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.translate(cx, cy);
  if (o.rot) ctx.rotate(o.rot);
  const sh = o.shadow ?? 1;
  if (sh > 0) { ctx.shadowColor = `rgba(0,0,0,${0.6 * sh})`; ctx.shadowBlur = size * 0.12; ctx.shadowOffsetY = size * 0.05; }
  ctx.drawImage(c, -size / 2, -size / 2, size, size);
  ctx.restore();
}
export type { Kind as PatchKind };
