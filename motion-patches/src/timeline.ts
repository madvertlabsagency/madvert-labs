import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { background, text } from "./core/draw";
import { patch } from "./components/patches";
import { glass, button, field, pill, checkBadge, iconTile } from "./components/ui";
export function timeline(): Scene[] {
  return [{ id: "test", start: 0, end: DURATION, draw: (ctx, t) => {
    background(ctx, t);
    (["apex", "summit", "riverside", "lakeside", "pine", "eagle"] as const).forEach((k, i) => patch(ctx, k, 200 + i * 300, 260, 260));
    glass(ctx, 120, 480, 700, 420, { focus: 1 });
    field(ctx, 160, 540, 300, "Quantity", "500 pcs", 1, true);
    field(ctx, 160, 640, 300, "Deadline", "Nov 15", 1, false, true);
    button(ctx, 160, 760, 280, 60, "Get a quote", { hover: 1 });
    pill(ctx, 520, 560, "Artwork attached", 1);
    checkBadge(ctx, 560, 700, 26);
    ["box","ruler","clip","upload","bell","doc","funnel","db","image","building","megaphone","users","eye","clock","pointer","alert"].forEach((n,i)=>iconTile(ctx,n,900+(i%8)*110,520+Math.floor(i/8)*110,84));
  } }];
}
