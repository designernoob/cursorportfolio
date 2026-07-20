import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { marqueeItems } from "../content";

/**
 * A velocity-aware ticker: it drifts on its own and speeds up with
 * scroll, a subtle detail that makes the page feel alive.
 */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useTransform(scrollY, (v) => v);
  const prev = useRef(0);
  const boost = useRef(0);

  useAnimationFrame((_, delta) => {
    let moveBy = -0.03 * delta; // constant drift
    const current = scrollVelocity.get();
    const diff = current - prev.current;
    prev.current = current;
    boost.current = diff * 0.9;
    moveBy += -boost.current;

    let next = baseX.get() + moveBy;
    // wrap within one repetition (we render the list 4x, so 25%)
    if (next <= -25) next += 25;
    if (next > 0) next -= 25;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={ref}
      className="relative flex overflow-hidden border-y border-line py-6 md:py-8"
    >
      <motion.div className="flex shrink-0 whitespace-nowrap" style={{ x }}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-sans text-2xl font-medium tracking-tight text-cream md:px-10 md:text-4xl">
              {item}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
