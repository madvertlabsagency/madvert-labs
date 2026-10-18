"use client";

import type { ReactNode } from "react";
import { useActiveStep } from "@/animations/useActiveStep";
import { Deferred } from "@/components/perf/Deferred";

/**
 * Scrollytelling layout.
 * Desktop (lg+): a sticky stage beside a column of steps; the stage reacts to the step in view.
 * Mobile: no sticky stage at all. Each step carries its own compact copy of the stage, so the
 * visual always scrolls away with its text and nothing ever sits on top of copy. The stage for a
 * step animates in from the previous state as that step reaches the reading line.
 * No scroll hijacking on any breakpoint.
 */
export function StickyStory({
  steps,
  stage,
  stageSide = "right",
  className = "",
  stepClassName = "",
  stageAspect,
}: {
  steps: ReactNode[];
  stage: (active: number) => ReactNode;
  stageSide?: "left" | "right";
  className?: string;
  stepClassName?: string;
  /**
   * CSS aspect ratio of the stage (e.g. "640 / 470"). When set, stages are decorative and mount
   * only near the viewport, and only the variant for the current breakpoint ever mounts
   * (a hidden stage never intersects).
   */
  stageAspect?: string;
}) {
  const lazy = (node: ReactNode) =>
    stageAspect ? (
      <Deferred style={{ aspectRatio: stageAspect }} rootMargin="600px 0px">
        {node}
      </Deferred>
    ) : (
      node
    );
  const { active, bind } = useActiveStep<HTMLLIElement>(steps.length, 0.5);
  return (
    <div className={`relative grid grid-cols-1 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <div
        className={`sticky top-[calc(50vh-min(260px,30vh))] z-10 hidden h-fit lg:block ${
          stageSide === "right" ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"
        }`}
      >
        <div className="mx-auto max-w-[620px]">{lazy(stage(active))}</div>
      </div>
      <ol className={`relative lg:col-span-5 ${stageSide === "right" ? "lg:order-1" : "lg:col-start-8"}`}>
        {steps.map((s, i) => (
          <li
            key={i}
            ref={bind(i)}
            aria-current={active === i ? "step" : undefined}
            className={`story-step py-8 transition-opacity duration-500 lg:flex lg:min-h-[78vh] lg:items-center lg:py-10 ${
              active === i ? "lg:opacity-100" : "lg:opacity-35"
            } ${stepClassName}`}
          >
            <div className="w-full">
              <div className="mx-auto mb-6 max-w-[520px] lg:hidden" aria-hidden="true">
                {lazy(stage(active >= i ? i : Math.max(0, i - 1)))}
              </div>
              {s}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
