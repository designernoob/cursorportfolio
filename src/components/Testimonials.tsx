import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
} from "react";
import {
  PeelBack,
  PeelBottom,
  PeelTop,
  PeelWrapper,
  usePeel,
  type PeelRef,
} from "react-peel";
import { useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "../content";
import { Reveal } from "./Reveal";

const NOTE_W = 360;
const NOTE_H = 380;

const TONE: Record<
  Testimonial["tone"],
  { paper: string; adhesive: string; back: string; ink: string; shadow: string }
> = {
  yellow: {
    paper: "#f3e59a",
    adhesive: "#efe07f",
    back: "#e8d789",
    ink: "#3a3420",
    shadow: "rgba(78, 62, 12, 0.28)",
  },
  pink: {
    paper: "#f0c5d0",
    adhesive: "#e9b4c2",
    back: "#e4b6c3",
    ink: "#432832",
    shadow: "rgba(90, 40, 55, 0.26)",
  },
  mint: {
    paper: "#c8e4d0",
    adhesive: "#b6d8bf",
    back: "#b9d7c2",
    ink: "#22362a",
    shadow: "rgba(28, 70, 45, 0.26)",
  },
  blue: {
    paper: "#c7ddf0",
    adhesive: "#b5d0e7",
    back: "#b6cfe4",
    ink: "#223446",
    shadow: "rgba(28, 50, 80, 0.26)",
  },
};

function NoteFace({
  t,
  tone,
}: {
  t: Testimonial;
  tone: (typeof TONE)[Testimonial["tone"]];
}) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="sticky-face" style={{ color: tone.ink }}>
      <div className="sticky-face__adhesive" aria-hidden />
      <div className="sticky-face__fiber" aria-hidden />
      <div className="sticky-face__sheen" aria-hidden />
      <div className="sticky-face__edge" aria-hidden />

      <div className="sticky-face__person">
        <div className="sticky-face__photo">
          {t.photo ? (
            <img src={t.photo} alt="" width={44} height={44} draggable={false} />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <div className="sticky-face__name">{t.name}</div>
          <div className="sticky-face__title">{t.title}</div>
        </div>
      </div>

      <blockquote className="sticky-face__quote">
        <span aria-hidden>“</span>
        {t.quote}
        <span aria-hidden>”</span>
      </blockquote>
    </div>
  );
}

function StickyNote({ t, index }: { t: Testimonial; index: number }) {
  const { peelRef, animate, stop } = usePeel();
  const reduce = useReducedMotion();
  const tone = TONE[t.tone];
  const [peeled, setPeeled] = useState(false);
  const hovering = useRef(false);
  const readyRef = useRef(false);

  const peelOpen = useCallback(async () => {
    if (reduce || !readyRef.current) {
      setPeeled(true);
      return;
    }
    stop();
    setPeeled(true);
    // Deep corner curl — Framer-style sticker peel from bottom-right.
    await animate({
      to: { x: NOTE_W * 0.28, y: NOTE_H * 0.26 },
      duration: 820,
      easing: "spring",
    });
  }, [animate, reduce, stop]);

  const peelClose = useCallback(async () => {
    if (reduce) {
      setPeeled(false);
      return;
    }
    stop();
    setPeeled(false);
    // Settle to a tiny lifted corner so notes never look glued flat.
    await animate({
      to: { x: NOTE_W - 28, y: NOTE_H - 28 },
      duration: 520,
      easing: "easeOut",
    });
  }, [animate, reduce, stop]);

  // Idle affordance: soft corner lift once peel.js is ready.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const id = window.setInterval(() => {
      const el = (peelRef as MutableRefObject<PeelRef | null>).current;
      if (!el?.width || cancelled) return;
      readyRef.current = true;
      window.clearInterval(id);
      void animate({
        to: { x: NOTE_W - 28, y: NOTE_H - 28 },
        duration: 650,
        easing: "easeOut",
      });
    }, 60);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [animate, peelRef, reduce]);

  return (
    <article
      className={`sticky-note${peeled ? " is-peeled" : ""}`}
      style={
        {
          "--note-rot": `${t.rotate}deg`,
          "--note-paper": tone.paper,
          "--note-adhesive": tone.adhesive,
          "--note-back": tone.back,
          "--note-ink": tone.ink,
          "--note-shadow": tone.shadow,
          zIndex: peeled ? 24 : 2 + index,
        } as CSSProperties
      }
      onMouseEnter={() => {
        hovering.current = true;
        void peelOpen();
      }}
      onMouseLeave={() => {
        hovering.current = false;
        void peelClose();
      }}
      onFocus={() => void peelOpen()}
      onBlur={() => void peelClose()}
      tabIndex={0}
      aria-label={`Testimonial from ${t.name}. Hover or focus to peel the note.`}
    >
      <div className="sticky-note__cast-shadow" aria-hidden />

      <PeelWrapper
        ref={peelRef}
        className="sticky-note__peel"
        preset="stickyNote"
        width={NOTE_W}
        height={NOTE_H}
        corner="BOTTOM_RIGHT"
        options={{
          topShadow: true,
          topShadowBlur: 4,
          topShadowAlpha: 0.35,
          topShadowOffsetX: 0,
          topShadowOffsetY: 1,
          backShadow: true,
          backShadowSize: 0.1,
          backShadowAlpha: 0.22,
          bottomShadow: true,
          bottomShadowSize: 1.1,
          bottomShadowDarkAlpha: 0.55,
          bottomShadowLightAlpha: 0.12,
          setPeelOnInit: true,
        }}
      >
        <PeelTop className="sticky-note__top">
          <NoteFace t={t} tone={tone} />
        </PeelTop>

        <PeelBack
          className="sticky-note__back"
          style={{ background: tone.back }}
          aria-hidden
        >
          <div className="sticky-note__back-fiber" />
        </PeelBack>

        <PeelBottom className="sticky-note__bottom">
          <div className="sticky-note__under">
            <p className="sticky-note__under-kicker">{t.relationship}</p>
            <p className="sticky-note__under-name">{t.name}</p>
            <p className="sticky-note__under-about">{t.about}</p>
          </div>
        </PeelBottom>
      </PeelWrapper>
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
              Hover a sticky to peel the corner — a little more about who left
              it is written underneath.
            </p>
          </Reveal>
        </div>

        <div className="sticky-board">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.07}
              className="sticky-board__slot"
            >
              <StickyNote t={t} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
