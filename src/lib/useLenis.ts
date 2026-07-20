import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery inertial smooth-scrolling, the kind you feel on
 * award-winning sites. Respects users who prefer reduced motion.
 */
export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}
