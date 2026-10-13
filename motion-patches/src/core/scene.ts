import type { Ctx } from "./draw";

export type Trans = { type: "swipe" | "fade" | "zoom" | "cut" | "wipeUp" | "flash" | "push"; dur: number };

export type Scene = {
  id: string;
  start: number;
  end: number;
  /** transition into this scene */
  in?: Trans;
  /** subtitle theme while this scene is on screen */
  subs?: "dark" | "subtle" | "hide" | ((t: number) => "dark" | "subtle" | "hide");
  draw: (ctx: Ctx, t: number) => void;
};
