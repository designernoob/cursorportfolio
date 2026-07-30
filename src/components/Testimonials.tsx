import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "../content";
import { Reveal } from "./Reveal";

const TONE: Record<
  Testimonial["tone"],
  { paper: string; adhesive: string; ink: string; shadow: string }
> = {
  yellow: {
    paper: "#f4e7a3",
    adhesive: "#efe08a",
    ink: "#3d3820",
    shadow: "rgba(90, 70, 10, 0.22)",
  },
  pink: {
    paper: "#f3cfd8",
    adhesive: "#eebfcb",
    ink: "#4a2e36",
    shadow: "rgba(90, 40, 55, 0.2)",
  },
  mint: {
    paper: "#cfe8d6",
    adhesive: "#bdddbf",
    ink: "#24382c",
    shadow: "rgba(30, 70, 45, 0.2)",
  },
  blue: {
    paper: "#cfe0f2",
    adhesive: "#bdd3ea",
    ink: "#243448",
    shadow: "rgba(30, 50, 80, 0.2)",
  },
};

function StickyNote({ t, index }: { t: Testimonial; index: number }) {
  const [peeled, setPeeled] = useState(false);
  const reduce = useReducedMotion();
  const tone = TONE[t.tone];
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const peel = !reduce && peeled;

  return (
    <article
      className="sticky-note"
      style={
        {
          "--note-rot": `${t.rotate}deg`,
          "--note-paper": tone.paper,
          "--note-adhesive": tone.adhesive,
          "--note-ink": tone.ink,
          "--note-shadow": tone.shadow,
          zIndex: peel ? 20 : 1 + index,
        } as CSSProperties
      }
      onMouseEnter={() => setPeeled(true)}
      onMouseLeave={() => setPeeled(false)}
      onFocus={() => setPeeled(true)}
      onBlur={() => setPeeled(false)}
      tabIndex={0}
      aria-label={`Testimonial from ${t.name}. Hover or focus to peel the note.`}
    >
      {/* Surface the note is stuck to — revealed as it peels */}
      <div className="sticky-note__surface" aria-hidden={!peel}>
        <p className="sticky-note__surface-kicker">{t.relationship}</p>
        <p className="sticky-note__surface-name">{t.name}</p>
        <p className="sticky-note__surface-about">{t.about}</p>
      </div>

      {/* The sticky note sheet — peels up from the adhesive top edge */}
      <motion.div
        className="sticky-note__sheet"
        initial={false}
        animate={
          reduce
            ? { rotateX: 0, rotateZ: 0, y: 0 }
            : peel
              ? { rotateX: -58, rotateZ: -2.5, y: -4 }
              : { rotateX: 0, rotateZ: 0, y: 0 }
        }
        transition={{
          type: "spring",
          stiffness: 78,
          damping: 15,
          mass: 0.9,
        }}
        style={{ transformPerspective: 1200, transformOrigin: "top center" }}
      >
        <div className="sticky-note__adhesive" aria-hidden />
        <div className="sticky-note__grain" aria-hidden />

        <div className="sticky-note__person">
          <div className="sticky-note__photo">
            {t.photo ? (
              <img src={t.photo} alt="" width={48} height={48} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <div className="sticky-note__name">{t.name}</div>
            <div className="sticky-note__title">{t.title}</div>
          </div>
        </div>

        <blockquote className="sticky-note__quote">
          <span aria-hidden>“</span>
          {t.quote}
          <span aria-hidden>”</span>
        </blockquote>

        {/* Lit curl on the peeling edge */}
        <div className="sticky-note__curl" aria-hidden />
        <div className="sticky-note__backface" aria-hidden />
      </motion.div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section id="words" className="testimonials-section relative">
      <div aria-hidden className="testimonials-section__grid" />
      <div aria-hidden className="testimonials-section__fade" />

      <div className="relative z-10 px-6 py-24 md:px-10 md:py-36">
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-muted">
              Kind words
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.05] tracking-tighter2 text-ink md:text-5xl">
              Notes left on the desk.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted md:text-base">
              Hover a sticky to peel it back — a little more about who left it
              is written underneath.
            </p>
          </Reveal>
        </div>

        <div className="sticky-board">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} className="sticky-board__slot">
              <StickyNote t={t} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
