"use client";

import dynamic from "next/dynamic";
import { Deferred } from "@/components/perf/Deferred";
import type { ServiceVisualKey } from "./ServiceVisuals";

// The eight card illustrations live in their own chunk and render only near the viewport.
const ServiceVisual = dynamic(() => import("./ServiceVisuals").then((m) => m.ServiceVisual), {
  ssr: false,
  loading: () => <div className="scv-box" />,
});

export function ServiceVisualDeferred({ name }: { name: ServiceVisualKey }) {
  return (
    <Deferred className="scv-defer">
      <ServiceVisual name={name} />
    </Deferred>
  );
}
