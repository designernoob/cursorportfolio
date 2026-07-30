import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "../content";
import { Reveal } from "./Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Soft scatter so letters occupy the board instead of one column. */
const LETTER_LAYOUT = [
  { rotate: -2.4, x: "-2%", y: "0rem" },
  { rotate: 1.8, x: "4%", y: "3.5rem" },
  { rotate: 2.6, x: "-6%", y: "-1.25rem" },
  { rotate: -1.5, x: "7%", y: "2rem" },
  { rotate: -3.1, x: "1%", y: "0.5rem" },
  { rotate: 2.2, x: "-3%", y: "4rem" },
] as const;

const STAMP: Record<Testimonial["stamp"], string> = {
  violet: "linear-gradient(145deg, #6b4cff 0%, #2a1850 100%)",
  amber: "linear-gradient(145deg, #f0a040 0%, #7a3a10 100%)",
  rose: "linear-gradient(145deg, #e8789a 0%, #6a2038 100%)",
  teal: "linear-gradient(145deg, #3cb8a8 0%, #0f4a48 100%)",
  slate: "linear-gradient(145deg, #7a8aa0 0%, #2a3448 100%)",
  olive: "linear-gradient(145deg, #8aaa5a 0%, #2f4018 100%)",
};

function Stamp({ t }: { t: Testimonial }) {
  const parts = t.name.split(" ");
  const initials = t.firstName.slice(0, 1) + parts[parts.length - 1].slice(0, 1);
  return (
    <div
      className="letter-stamp"
      style={{ background: STAMP[t.stamp] }}
      aria-hidden
    >
      <div className="letter-stamp__perforation" />
      {t.photo ? (
        <img src={t.photo} alt="" className="letter-stamp__photo" />
      ) : (
        <span className="letter-stamp__initials">{initials}</span>
      )}
    </div>
  );
}

function FoldPanel({
  children,
  className = "",
  delay = 0,
  open,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  open: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className={`letter-fold ${className}`}
      initial={false}
      animate={
        reduce
          ? { rotateX: 0, opacity: 1 }
          : open
            ? { rotateX: 0, opacity: 1 }
            : { rotateX: -88, opacity: 0.85 }
      }
      transition={{
        duration: 0.7,
        ease: EASE,
        delay: reduce ? 0 : open ? delay : (0.18 - delay) * 0.5,
      }}
      style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
    >
      <div className="letter-fold__shade letter-fold__shade--top" aria-hidden />
      <div
        className="letter-fold__shade letter-fold__shade--bottom"
        aria-hidden
      />
      <div className="letter-fold__back" aria-hidden />
      <div className="letter-panel">{children}</div>
    </motion.div>
  );
}

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
  layout: (typeof LETTER_LAYOUT)[number];
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
      <div className="letter__scene">
        {/* Fold 1 — closed face (always visible) */}
        <button
          type="button"
          className="letter-fold letter-fold--face"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={`${open ? "Close" : "Open"} letter from ${t.name}`}
        >
          <div
            className="letter-fold__shade letter-fold__shade--bottom"
            aria-hidden
          />
          <div className="letter-face">
            <div className="letter-face__copy">
              <p className="letter-face__name">{t.firstName}</p>
              <p className="letter-face__preview">{t.preview}</p>
            </div>
            <Stamp t={t} />
          </div>
        </button>

        {/* Folds 2–4 — letter body, height + 3D unfold */}
        <motion.div
          className="letter-body"
          initial={false}
          animate={{
            height: open || reduce ? "auto" : 0,
            opacity: open || reduce ? 1 : 0,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ overflow: "hidden", perspective: 1200 }}
        >
          <div className="letter-body__inner">
            <FoldPanel open={open} reduce={reduce} delay={0.02}>
              <p className="letter-panel__greeting">{t.greeting}</p>
            </FoldPanel>

            <FoldPanel open={open} reduce={reduce} delay={0.08}>
              <p className="letter-panel__quote">“{t.quote}”</p>
            </FoldPanel>

            <FoldPanel
              open={open}
              reduce={reduce}
              delay={0.14}
              className="letter-fold--last"
            >
              <div className="letter-panel--sign">
                <p className="letter-panel__closing">{t.closing}</p>
                <p className="letter-panel__from">{t.name}</p>
                <p className="letter-panel__role">{t.title}</p>
              </div>
            </FoldPanel>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  // Open by default (Framer demo starts closed — we invert that).
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
              >
                Open all
              </button>
              <button
                type="button"
                className="letter-toggle__btn"
                onClick={() => setAll(false)}
                disabled={allClosed}
              >
                Close all
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
