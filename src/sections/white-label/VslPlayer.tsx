"use client";

import Image from "next/image";
import { WL_VSL } from "@/content/white-label";
import { track } from "@/analytics/track";

/** Founder VSL. Without a configured `src` it shows a clearly labelled slot, never a stand-in video. */
export function VslPlayer() {
  if (WL_VSL.src) {
    return (
      <div className="wl-vsl">
        <video
          src={WL_VSL.src}
          poster={WL_VSL.poster}
          controls
          playsInline
          preload="metadata"
          onPlay={() => track("vsl_play", { context: "white_label" })}
        />
      </div>
    );
  }
  return (
    <div className="wl-vsl">
      <Image src={WL_VSL.poster} alt="Usama Abbas Dahri, founder of Madvert Labs" fill sizes="(min-width:1024px) 760px, 100vw" className="object-cover object-[50%_25%] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_15_28/0.1),rgb(10_15_28/0.85))]" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <div>
          <p className="wl-label text-[#00e5ff]">Founder walkthrough</p>
          <p className="mt-1 font-display text-[18px] font-semibold text-white sm:text-[22px]">How the white-label partnership works</p>
        </div>
        <span className="wl-label shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-white/80">Video coming soon</span>
      </div>
    </div>
  );
}
