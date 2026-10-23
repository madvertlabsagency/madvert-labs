"use client";

import { useRef, useState } from "react";
import { WL_VSL } from "@/content/white-label";
import { track } from "@/analytics/track";

/** Founder VSL: vertical 9:16, click-to-play with sound and native controls after start. */
export function VslPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.controls = true;
    void v.play();
  };
  return (
    <div className="wl-vsl wl-vsl--vertical">
      <video
        ref={ref}
        src={WL_VSL.src}
        poster={WL_VSL.poster}
        playsInline
        preload="metadata"
        onPlay={() => track("vsl_play", { context: "white_label" })}
      />
      {started ? null : (
        <button
          type="button"
          onClick={play}
          aria-label="Play the white-label partnership video"
          className="group absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(10_15_28/0.85))]"
        >
          <span className="absolute left-1/2 top-[68%] grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(100deg,#00b4ff,#00e5ff)] shadow-[0_0_0_10px_rgb(0_229_255/0.15),0_20px_50px_-10px_rgb(0_180_255/0.8)] transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path d="M8 5.5v13l10.5-6.5z" fill="#0a0f1c" />
            </svg>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left">
            <span className="wl-label block text-[#00e5ff]">Founder walkthrough · 1:45</span>
            <span className="mt-1 block font-display text-[18px] font-semibold text-white">How the white-label partnership works</span>
          </span>
        </button>
      )}
    </div>
  );
}
