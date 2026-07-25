import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
import { hero, type HeroToken } from "../content";

/* A few tasteful placeholder gradients for inline media chips. */
const MEDIA_GRADIENTS = [
  "linear-gradient(135deg,#2b23ff,#7db0ff)",
  "linear-gradient(135deg,#ff5b26,#ffb03a)",
  "linear-gradient(135deg,#17c98b,#8df0d0)",
  "linear-gradient(135deg,#ff4d8d,#ffb199)",
];

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // expand the token stream into per-word atoms for nice wrapping + stagger
  const atoms = expand(hero.statement);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.028, delayChildren: 0.15 } },
  };
  const atom = {
    hidden: { y: "0.35em", opacity: 0 },
    show: {
      y: "0em",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  let mediaIndex = 0;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pt-32"
    >
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[20%] h-[42vw] w-[42vw] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "radial-gradient(circle,var(--accent),transparent 60%)" }}
      />

      {/* eyebrow */}
      <motion.div
        className="relative z-10 flex flex-wrap items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {hero.name} — Portfolio ’26
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {hero.status}
        </span>
      </motion.div>

      {/* statement */}
      <motion.h1
        style={{ y, opacity }}
        className="relative z-10 mt-auto max-w-[16ch] font-serif text-[13vw] font-medium leading-[1.02] tracking-tighter2 text-ink md:max-w-[15ch] md:text-[7vw]"
      >
        <motion.span
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {atoms.map((a, i) => {
            const key = i;
            if (a.kind === "space") return <span key={key}> </span>;
            if (a.kind === "word")
              return (
                <motion.span key={key} variants={atom} className="inline-block">
                  {a.text}
                </motion.span>
              );
            if (a.kind === "em")
              return (
                <motion.span
                  key={key}
                  variants={atom}
                  className="inline-block italic text-accent"
                >
                  {a.text}
                </motion.span>
              );
            if (a.kind === "media") {
              const g = MEDIA_GRADIENTS[mediaIndex++ % MEDIA_GRADIENTS.length];
              return (
                <motion.span key={key} variants={atom} className="inline-block">
                  <MediaChip token={a.token} gradient={g} />
                </motion.span>
              );
            }
            // hover word
            return (
              <motion.span key={key} variants={atom} className="inline-block">
                <HoverWord token={a.token} />
              </motion.span>
            );
          })}
        </motion.span>
      </motion.h1>

      {/* bottom row */}
      <motion.div
        className="relative z-10 mt-14 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="max-w-md font-sans text-sm leading-relaxed text-muted">
          {hero.availability}. Previously at Sprinklr, Nutanix &amp; UpGrad —
          CS engineer from BITS Pilani.
        </p>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          Scroll to explore
          <motion.span
            aria-hidden
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Inline media chip (image / GIF placeholder) ────────────── */
function MediaChip({
  token,
  gradient,
}: {
  token: Extract<HeroToken, { type: "media" }>;
  gradient: string;
}) {
  const [hovered, setHovered] = useState(false);
  const shape = token.shape ?? "rect";
  const size =
    shape === "circle"
      ? "h-[0.92em] w-[0.92em] rounded-full"
      : shape === "pill"
      ? "h-[0.82em] w-[1.9em] rounded-full"
      : "h-[0.9em] w-[1.5em] rounded-[0.22em]";

  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      data-cursor={token.src ? "Play" : "Media"}
      className={`relative mx-[0.12em] inline-block translate-y-[0.1em] overflow-hidden border border-black/10 align-middle shadow-sm ${size}`}
      animate={{
        rotate: hovered ? -4 : 0,
        scale: hovered ? 1.12 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={{ verticalAlign: "middle" }}
    >
      {token.src ? (
        <img
          src={token.src}
          alt={token.label}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <span className="absolute inset-0" style={{ background: gradient }} />
          <motion.span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)",
            }}
            animate={{ x: hovered ? ["-120%", "120%"] : "-120%" }}
            transition={{
              duration: 0.9,
              repeat: hovered ? Infinity : 0,
              ease: "linear",
            }}
          />
        </>
      )}
    </motion.span>
  );
}

/* ── Interactive word that reveals a floating media on hover ─── */
function HoverWord({
  token,
}: {
  token: Extract<HeroToken, { type: "hover" }>;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        data-hover
        data-cursor="Peek"
        className="cursor-none border-b-2 border-dotted border-accent/60 text-accent transition-colors duration-300 hover:border-accent"
      >
        {token.text}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute bottom-[105%] left-1/2 z-20 block w-[46vw] -translate-x-1/2 overflow-hidden rounded-2xl border border-black/10 shadow-xl md:w-[16rem]"
            initial={{ opacity: 0, scale: 0.7, y: 12, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.7, y: 12, rotate: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <span className="block aspect-[4/3] w-full">
              {token.src ? (
                <img
                  src={token.src}
                  alt={token.label}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#2b23ff,#9db8ff)" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/90">
                    GIF / image
                  </span>
                </span>
              )}
            </span>
            <span className="block bg-white px-3 py-2.5 font-sans text-xs font-medium not-italic leading-snug tracking-normal text-ink">
              {token.label}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ── Expand tokens into renderable atoms (words wrap naturally) ── */
type Atom =
  | { kind: "word"; text: string }
  | { kind: "em"; text: string }
  | { kind: "space" }
  | { kind: "media"; token: Extract<HeroToken, { type: "media" }> }
  | { kind: "hover"; token: Extract<HeroToken, { type: "hover" }> };

function expand(tokens: HeroToken[]): Atom[] {
  const out: Atom[] = [];
  tokens.forEach((t, ti) => {
    if (ti > 0) out.push({ kind: "space" });
    if (t.type === "text") {
      const words = t.text.split(" ");
      words.forEach((w, wi) => {
        if (wi > 0) out.push({ kind: "space" });
        out.push({ kind: "word", text: w });
      });
    } else if (t.type === "em") {
      out.push({ kind: "em", text: t.text });
    } else if (t.type === "media") {
      out.push({ kind: "media", token: t });
    } else {
      out.push({ kind: "hover", token: t });
    }
  });
  return out;
}
