import { getLenis } from "./useLenis";

/** Smoothly scroll to an element by id (works with or without Lenis). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Jump (or glide) back to the top of the page. */
export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
