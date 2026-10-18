// Asset access shared by the offline renderer (Node canvas) and the browser preview.
// Plates call img()/video() synchronously; a miss is recorded so the host can load it
// and redraw (the renderer never writes a frame that had a miss).

export interface AssetHost {
  img(key: string): any | undefined;
  /** Frame of a clip at local time `t` seconds (loops). */
  video(key: string, t: number): any | undefined;
  /** Scratch canvas for compositing (reused per key). */
  canvas(key: string, w: number, h: number): any;
}

export const VIDEOS: Record<string, { frames: number; fps: number; w: number; h: number }> = {
  edit: { frames: 3301, fps: 30, w: 1080, h: 1350 },
};

export const IMAGES: Record<string, string> = {
  logo: "brand/logo-light.png",
  logoDark: "brand/logo-dark.png",
  logoDesc: "brand/logo-light-descriptor.png",
  icon: "brand/app-icon-512.png",
  aMark: "brand/a-mark-glow.png",
};

export const videoFrameIndex = (key: string, t: number) => {
  const v = VIDEOS[key];
  const n = Math.min(Math.floor(Math.max(0, t) * v.fps + 1e-6), v.frames - 1);
  return n + 1;
};
export const videoFramePath = (key: string, idx: number) =>
  `video/${key}/${String(idx).padStart(5, "0")}.jpg`;

let host: AssetHost;
export const setHost = (h: AssetHost) => (host = h);
export const img = (k: string) => host.img(k);
export const video = (k: string, t: number) => host.video(k, t);
export const scratch = (k: string, w: number, h: number) => host.canvas(k, w, h);
