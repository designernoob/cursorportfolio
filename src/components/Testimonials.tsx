import { type CSSProperties } from "react";
import { testimonials, type Testimonial } from "../content";
import { Reveal } from "./Reveal";

type LetterLayout = {
  rotate: number;
  x: string;
  y: string;
};

const LETTER_LAYOUT: readonly LetterLayout[] = [
  { rotate: -1.8, x: "-1%", y: "0rem" },
  { rotate: 1.4, x: "3%", y: "1.75rem" },
  { rotate: 2.0, x: "-2%", y: "0.35rem" },
  { rotate: -1.2, x: "2%", y: "2.25rem" },
  { rotate: -2.2, x: "1%", y: "0.5rem" },
  { rotate: 1.6, x: "-2%", y: "1.9rem" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function Letter({
  t,
  index,
  layout,
}: {
  t: Testimonial;
  index: number;
  layout: LetterLayout;
}) {
  return (
    <article
      className="letter"
      style={
        {
          zIndex: 2 + index,
          "--letter-rot": `${layout.rotate}deg`,
          "--letter-x": layout.x,
          "--letter-y": layout.y,
        } as CSSProperties
      }
    >
      <div className="letter-paper">
        <span className="letter-paper__crease letter-paper__crease--1" aria-hidden />
        <span className="letter-paper__crease letter-paper__crease--2" aria-hidden />

        <div className="letter-paper__inner">
          <p className="letter-paper__greeting">{t.greeting}</p>
          <p className="letter-paper__quote">{t.quote}</p>
          <p className="letter-paper__closing">{t.closing}</p>

          <footer className="letter-paper__footer">
            <span className="letter-paper__avatar" aria-hidden>
              {t.photo ? (
                <img src={t.photo} alt="" width={40} height={40} />
              ) : (
                <span className="letter-paper__avatar-fallback">
                  {initials(t.name)}
                </span>
              )}
            </span>
            <span className="letter-paper__byline">
              <span className="letter-paper__name">{t.name}</span>
              <span className="letter-paper__role">{t.title}</span>
            </span>
          </footer>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section id="words" className="testimonials-section relative">
      <div aria-hidden className="testimonials-section__grid" />
      <div aria-hidden className="testimonials-section__fade" />

      <div className="relative z-10 px-6 py-24 md:px-10 md:py-32">
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
        </div>

        <div className="letter-stack">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.04}
              className={`letter-slot letter-slot--${i + 1}`}
            >
              <Letter
                t={t}
                index={i}
                layout={LETTER_LAYOUT[i] ?? LETTER_LAYOUT[0]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
