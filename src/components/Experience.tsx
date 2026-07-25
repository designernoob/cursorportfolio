import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { experience } from "../content";

const COLS =
  "grid-cols-1 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)_minmax(0,0.85fr)]";

/**
 * Sticky-note paper sheet: full content width, fold creases,
 * scroll-driven unfold from a single vertical fold.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 35%"],
  });

  // 78° → 0°: opens from a single left-edge fold
  const fold = useTransform(scrollYProgress, [0, 1], [78, 0]);
  const shade = useTransform(scrollYProgress, [0, 1], [0.28, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 py-24 md:px-10 md:py-36"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="experience-doc relative w-full origin-left will-change-transform"
        style={
          reduceMotion
            ? undefined
            : {
                rotateY: fold,
                y: lift,
              }
        }
      >
        {/* Folding shade that fades as the sheet opens */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(40,30,10,0.22), transparent 42%)",
              opacity: shade,
            }}
          />
        )}

        {/* Paper fiber / grain */}
        <div aria-hidden className="experience-doc__grain" />

        {/* Remaining fold creases (cross) */}
        <div aria-hidden className="experience-doc__crease experience-doc__crease--v" />
        <div aria-hidden className="experience-doc__crease experience-doc__crease--h" />

        <div className="relative z-10 px-6 py-8 md:px-10 md:py-12">
          {/* Document header */}
          <header className="border-b border-[color:var(--doc-rule)] pb-6 md:pb-8">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[color:var(--doc-ink-soft)]">
              {experience.kicker}
            </p>
            <h2 className="hero-display mt-3 max-w-3xl text-[2.35rem] leading-[1.05] text-[color:var(--doc-ink)] md:text-[3rem]">
              {experience.heading}
            </h2>
          </header>

          {/* Aligned table */}
          <div className="mt-6 md:mt-8" role="table" aria-label="Experience and education">
            <div
              role="row"
              className={`mb-2 hidden ${COLS} gap-x-6 font-sans text-[10px] uppercase tracking-[0.22em] text-[color:var(--doc-ink-soft)] md:grid`}
            >
              <span role="columnheader">Company / School</span>
              <span role="columnheader">Duration</span>
              <span role="columnheader">Type</span>
            </div>

            <ul className="border-t border-[color:var(--doc-rule)]">
              {experience.entries.map((entry) => (
                <li
                  key={`${entry.org}-${entry.duration}`}
                  role="row"
                  className={`grid ${COLS} gap-x-6 gap-y-1 border-b border-[color:var(--doc-rule)] py-4 md:items-baseline md:py-5`}
                >
                  <div role="cell" className="min-w-0">
                    <p className="font-sans text-[15px] font-semibold tracking-tight text-[color:var(--doc-ink)] md:text-base">
                      {entry.org}
                    </p>
                    {entry.note && (
                      <p className="mt-0.5 font-sans text-sm text-[color:var(--doc-ink-soft)]">
                        {entry.note}
                      </p>
                    )}
                  </div>

                  <p
                    role="cell"
                    className="font-sans text-sm tabular-nums tracking-wide text-[color:var(--doc-ink)] md:text-[15px]"
                  >
                    <span className="mr-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[color:var(--doc-ink-soft)] md:hidden">
                      Duration
                    </span>
                    {entry.duration}
                  </p>

                  <p
                    role="cell"
                    className="font-sans text-sm text-[color:var(--doc-ink-soft)] md:text-[15px]"
                  >
                    <span className="mr-2 font-sans text-[10px] uppercase tracking-[0.18em] md:hidden">
                      Type
                    </span>
                    {entry.kind}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
