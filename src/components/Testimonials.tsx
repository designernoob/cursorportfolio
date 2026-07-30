import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "../content";
import { Reveal } from "./Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type LetterLayout = {
  rotate: number;
  x: string;
  y: string;
  /** Soft crease positions as % of letter height — uneven per card */
  creases: readonly number[];
};

const LETTER_LAYOUT: readonly LetterLayout[] = [
  { rotate: -2.2, x: "-2%", y: "0rem", creases: [38, 72] },
  { rotate: 1.6, x: "5%", y: "3.25rem", creases: [55] },
  { rotate: 2.4, x: "-5%", y: "-1rem", creases: [28, 64] },
  { rotate: -1.4, x: "6%", y: "2.25rem", creases: [46] },
  { rotate: -2.8, x: "1%", y: "0.75rem", creases: [33, 78] },
  { rotate: 2.0, x: "-3%", y: "3.75rem", creases: [42, 68] },
];

function Letter({
  t,
  open,
  onToggle,
  index,
  layout,
}: {
  t: Testimonial;
  open: boolean;
  onToggle: () => void;
  index: number;
  layout: LetterLayout;
}) {
  const reduce = useReducedMotion();

  return (
    <article
      className={`letter${open ? " is-open" : " is-closed"}`}
      style={
        {
          zIndex: open ? 12 : 2 + index,
          "--letter-rot": `${layout.rotate}deg`,
          "--letter-x": layout.x,
          "--letter-y": layout.y,
        } as CSSProperties
      }
    >
      <motion.button
        type="button"
        className="letter-paper"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} letter from ${t.name}`}
        layout={!reduce}
        transition={{ layout: { duration: 0.45, ease: EASE } }}
      >
        {/* Soft paper creases — decorative, uneven per letter */}
        {layout.creases.map((pct) => (
          <span
            key={pct}
            className="letter-paper__crease"
            style={{ top: `${pct}%` }}
            aria-hidden
          />
        ))}

        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="open"
              className="letter-paper__inner"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <p className="letter-paper__greeting">{t.greeting}</p>
              <p className="letter-paper__quote">“{t.quote}”</p>
              <p className="letter-paper__closing">{t.closing}</p>
              <footer className="letter-paper__footer">
                <p className="letter-paper__name">{t.name}</p>
                <p className="letter-paper__role">{t.title}</p>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              className="letter-paper__inner letter-paper__inner--closed"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <p className="letter-paper__lead">{t.firstName}</p>
              <p className="letter-paper__preview">{t.preview}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </article>
  );
}

export default function Testimonials() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(testimonials.map((t) => [t.name, true]))
  );

  const allOpen = useMemo(
    () => testimonials.every((t) => openMap[t.name]),
    [openMap]
  );
  const allClosed = useMemo(
    () => testimonials.every((t) => !openMap[t.name]),
    [openMap]
  );

  const setAll = (open: boolean) => {
    setOpenMap(Object.fromEntries(testimonials.map((t) => [t.name, open])));
  };

  return (
    <section id="words" className="testimonials-section relative">
      <div aria-hidden className="testimonials-section__grid" />
      <div aria-hidden className="testimonials-section__fade" />

      <div className="relative z-10 px-6 py-24 md:px-10 md:py-36">
        <div className="letter-board__header">
          <div>
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-muted">
                Kind words
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.05] tracking-tighter2 text-ink md:text-5xl">
                Letters from people I’ve worked with.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div
              className="letter-toggle"
              role="group"
              aria-label="Fold letters"
            >
              <button
                type="button"
                className="letter-toggle__btn"
                onClick={() => setAll(true)}
                disabled={allOpen}
                aria-label="Open all letters"
                title="Open all"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                  <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
              <button
                type="button"
                className="letter-toggle__btn"
                onClick={() => setAll(false)}
                disabled={allClosed}
                aria-label="Close all letters"
                title="Close all"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 8V5a2 2 0 0 1 2-2h3" />
                  <path d="M19 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M5 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M19 16v3a2 2 0 0 1-2 2h-3" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="letter-stack">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.05}
              className={`letter-slot letter-slot--${i + 1}`}
            >
              <Letter
                t={t}
                index={i}
                layout={LETTER_LAYOUT[i] ?? LETTER_LAYOUT[0]}
                open={!!openMap[t.name]}
                onToggle={() =>
                  setOpenMap((prev) => ({
                    ...prev,
                    [t.name]: !prev[t.name],
                  }))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
