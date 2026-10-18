import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { drawTestimonial } from "./scenes/testimonial";
export function timeline(): Scene[] {
  return [{ id: "testimonial", start: 0, end: DURATION, draw: drawTestimonial }];
}
