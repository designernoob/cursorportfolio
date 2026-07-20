import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A two-part custom cursor: a precise dot and a lagging ring that
 * expands over interactive elements (anything with [data-hover]).
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const raf = useRef<number>();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-hover]"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y, visible]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: label ? 84 : hovering ? 64 : 42,
          height: label ? 84 : hovering ? 64 : 42,
          marginLeft: label ? -42 : hovering ? -32 : -21,
          marginTop: label ? -42 : hovering ? -32 : -21,
          backgroundColor: hovering
            ? "rgba(216,253,81,0.15)"
            : "rgba(255,255,255,0)",
          borderColor: hovering
            ? "rgba(216,253,81,0.9)"
            : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label && (
          <span className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-widest text-accent">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
