import type { Testimonial } from "@/types/content";

/** Only real, playable client videos are shown. Bracketed placeholders never sit next to real clients. */
export function realTestimonials(items: Testimonial[]) {
  return items.filter((t) => !t.placeholder && !!t.videoUrl);
}
