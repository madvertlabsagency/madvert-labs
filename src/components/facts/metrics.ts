import type { Metric } from "@/types/content";

/** A metric as it may arrive from the CMS or fallback data; `verified: false` marks a figure that must not be shown. */
export type MaybeVerifiedMetric = Pick<Metric, "label" | "value"> & Partial<Omit<Metric, "label" | "value">> & { verified?: boolean };

/**
 * True only for a figure that may be rendered as proof: it has a label and a value, neither contains
 * a bracketed placeholder such as "[REAL RESULT]", and it has not been explicitly marked
 * `verified: false`. Use this before rendering any case-study metric.
 */
export function isPublishableMetric(m: MaybeVerifiedMetric | null | undefined): m is MaybeVerifiedMetric {
  if (!m) return false;
  if (m.verified === false) return false;
  const value = (m.value ?? "").trim();
  const label = (m.label ?? "").trim();
  if (!value || !label) return false;
  return !value.includes("[") && !label.includes("[");
}

/** The publishable subset of a metric list, in the original order. */
export function publishableMetrics<T extends MaybeVerifiedMetric>(metrics: T[] | null | undefined): T[] {
  return (metrics ?? []).filter((m): m is T => isPublishableMetric(m));
}
