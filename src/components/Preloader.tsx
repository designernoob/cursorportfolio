import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../content";

/**
 * A counting preloader that wipes away to reveal the site — a
 * signature opening moment for high-end portfolios.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let current = 0;
    const timers: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setCount(100);
      setShow(false);
      timers.push(window.setTimeout(onDone, 900));
    };

    const tick = () => {
      // ease the counter so it slows near the end
      const step = current < 80 ? 4 : current < 95 ? 2 : 1;
      current = Math.min(100, current + step);
      setCount(current);
      if (current < 100) {
        timers.push(window.setTimeout(tick, current < 80 ? 28 : 60));
      } else {
        timers.push(window.setTimeout(finish, 350));
      }
    };

    timers.push(window.setTimeout(tick, 250));
    // Hard failsafe: never leave the Cursor Browser stuck on this screen.
    timers.push(window.setTimeout(finish, 4500));

    return () => {
      finished = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-paper px-6 py-6 md:px-10 md:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted">
            <span>{site.name}</span>
            <span>{site.role}</span>
          </div>

          <div className="flex items-end justify-between">
            <motion.p
              className="max-w-xs text-sm leading-relaxed text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Crafting the interface. One considered pixel at a time.
            </motion.p>
            <div className="font-sans text-[18vw] font-medium leading-[0.8] tracking-tightest md:text-[12vw]">
              {count}
              <span className="text-accent">%</span>
            </div>
          </div>

          <motion.div
            className="h-px w-full origin-left bg-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: "linear" }}
          >
            <div className="h-px bg-accent" style={{ width: `${count}%` }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
