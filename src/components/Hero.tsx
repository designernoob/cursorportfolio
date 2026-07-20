import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, site } from "../content";
import { renderEmphasis } from "./Reveal";

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const lineUp = {
    hidden: { y: "115%" },
    show: {
      y: "0%",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-32 md:px-10 md:pt-40"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[45vw] w-[45vw] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mt-auto">
        <motion.div
          className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-muted" />
          {hero.intro}
        </motion.div>

        <motion.h1
          className="font-sans text-[13.5vw] font-medium leading-[0.92] tracking-tightest text-cream md:text-[9vw]"
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {hero.headline.map((line, i) => (
            <span className="line-mask" key={i}>
              <motion.span className="block" variants={lineUp}>
                {renderEmphasis(line)}
              </motion.span>
            </span>
          ))}
        </motion.h1>
      </motion.div>

      <motion.div
        className="relative z-10 mt-14 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg">
          {hero.summary}
        </p>
        <div className="flex shrink-0 items-center gap-3 text-sm text-cream">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {site.availability}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
      >
        Scroll
        <motion.span
          className="h-8 w-px bg-muted"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
