import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { hero, type HeroToken } from "../content";
import { scrollToId } from "../lib/scroll";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const atoms = expand(hero.statement);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.026, delayChildren: 0.12 } },
  };
  const atom = {
    hidden: { y: "0.3em", opacity: 0 },
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
      className="relative flex min-h-[56svh] flex-col justify-start px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28"
    >
      <motion.div style={{ y, opacity }} className="relative z-10">
        <motion.h1
          className="hero-display max-w-[18ch] text-[9vw] text-ink md:max-w-[28ch] md:text-[4.2vw]"
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
                  className="inline-block text-[color:var(--muted)]"
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
            return (
              <motion.span key={key} variants={atom} className="inline-block">
                <HoverWord token={a.token} />
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Soft role line — duller ink, lighter optical weight */}
        <motion.p
          className="hero-sub mt-5 max-w-[28ch] text-[6.5vw] md:mt-6 md:text-[2.6vw]"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.role.before}
          <a
            href={hero.role.href}
            target="_blank"
            rel="noreferrer"
            className="link-underline transition-colors duration-300 hover:text-ink"
          >
            {hero.role.company}
          </a>
        </motion.p>

        {/* CTA — soft pill, elvinhu-adjacent */}
        <motion.div
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            type="button"
            onClick={() => scrollToId("work")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group inline-flex items-center gap-3 rounded-full bg-surface py-2.5 pl-5 pr-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            <span className="font-sans text-[15px] font-medium">
              See selected work
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:translate-y-0.5 group-hover:bg-surface">
              ↓
            </span>
          </motion.button>
        </motion.div>
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
      className={`relative mx-[0.12em] inline-block translate-y-[0.1em] cursor-pointer overflow-hidden border border-black/10 align-middle shadow-sm ${size}`}
      animate={{ rotate: hovered ? -4 : 0, scale: hovered ? 1.12 : 1 }}
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
function HoverWord({ token }: { token: Extract<HeroToken, { type: "hover" }> }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="cursor-pointer border-b border-dotted border-[color:var(--muted)] text-[color:var(--muted)] transition-colors duration-300 hover:border-ink hover:text-ink">
        {token.text}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute bottom-[108%] left-1/2 z-20 block w-[44vw] -translate-x-1/2 overflow-hidden rounded-2xl border border-black/10 shadow-xl md:w-[15rem]"
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
                  <span className="font-sans text-[10px] uppercase tracking-widest text-white/90">
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
