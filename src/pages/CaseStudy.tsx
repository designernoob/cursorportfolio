import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  getCaseStudy,
  adjacentProjects,
  type CaseBlock,
  type CaseStudy as CaseStudyType,
} from "../content";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { renderRichText } from "../components/TermPopover";
import { scrollToId } from "../lib/scroll";

type SectionStop = { id: string; title: string };

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const { scrollYProgress } = useScroll();
  const readingTime = useReadingTime(study);
  const activeId = useScrollSpy(study?.sections.map((s) => s.id) ?? []);

  const stops = useMemo<SectionStop[]>(() => {
    if (!study) return [];
    return study.sections.map((s) => ({ id: s.id, title: s.heading }));
  }, [study]);

  if (!study) return <Navigate to="/" replace />;

  const { prev, next } = adjacentProjects(slug);

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[85] h-[3px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <Nav />

      <NextSectionPill stops={stops} />

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative px-6 pt-28 md:px-10 md:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-15%] top-0 h-[40vw] w-[40vw] rounded-full opacity-20 blur-[130px]"
            style={{ background: study.accent }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <Link
              to="/"
              state={{ scrollTo: "work" }}
              data-hover
              className="link-underline mb-10 inline-flex items-center gap-2 text-sm text-muted"
            >
              ← All work
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.25em] text-muted">
              <span className="text-accent">{study.company}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{study.year}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{readingTime} min read</span>
            </div>

            <h1 className="max-w-5xl font-sans text-[11vw] font-semibold leading-[0.95] tracking-tightest text-ink md:text-[6.5vw]">
              {study.title}
            </h1>

            <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
              {study.subtitle}
            </p>
          </motion.div>

          {/* Cover placeholder */}
          <Reveal className="relative z-10 mt-14">
            <Figure
              accent={study.accent}
              label={study.cover}
              ratio="wide"
              big
            />
          </Reveal>
        </section>

        {/* ── Deep dive (hiring manager / designer) ──────────── */}
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="border-t border-line pt-16 md:pt-24">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Deep dive
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-3 max-w-3xl font-sans text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
                Process, decisions, and the work in detail.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                For hiring managers and designers who want the full narrative —
                research, trade-offs, solution, and reflection.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
              {/* Table of contents */}
              <aside className="hidden md:col-span-2 md:block">
                <nav className="sticky top-28">
                  <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">
                    Contents
                  </p>
                  <ul className="space-y-3">
                    {study.sections.map((s, i) => {
                      const active = activeId === s.id;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            data-hover
                            onClick={() => scrollToId(s.id)}
                            className={`group flex items-center gap-2.5 text-left text-sm transition-colors duration-300 ${
                              active ? "text-ink" : "text-muted hover:text-ink"
                            }`}
                          >
                            <span
                              className={`text-xs tabular-nums transition-colors ${
                                active ? "text-accent" : "text-muted"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`h-px transition-all duration-300 ${
                                active ? "w-5 bg-accent" : "w-2.5 bg-line"
                              }`}
                            />
                            {s.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>

              {/* Sections */}
              <div className="md:col-span-9 md:col-start-4">
                <div className="flex flex-col gap-24">
                  {study.sections.map((s, i) => (
                    <article
                      key={s.id}
                      id={s.id}
                      className="scroll-mt-28"
                    >
                      <Reveal>
                        <div className="mb-8 flex items-baseline gap-4 border-b border-line pb-5">
                          <span className="font-sans text-sm text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                            {s.heading}
                          </h3>
                        </div>
                      </Reveal>
                      <div className="flex flex-col gap-8">
                        {s.blocks.map((b, j) => (
                          <Block key={j} block={b} accent={study.accent} />
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Prev / Next ───────────────────────────────────── */}
        <section className="border-t border-line px-6 md:px-10">
          <div className="grid grid-cols-1 divide-line md:grid-cols-2 md:divide-x">
            {prev && (
              <NextLink
                dir="prev"
                slug={prev.slug}
                title={prev.title}
                company={prev.company}
                accent={prev.accent}
              />
            )}
            {next && (
              <NextLink
                dir="next"
                slug={next.slug}
                title={next.title}
                company={next.company}
                accent={next.accent}
              />
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

/* ── Next-section pill (Tony / tongxingdesign pattern) ──────── */
function NextSectionPill({ stops }: { stops: SectionStop[] }) {
  const [next, setNext] = useState<SectionStop | null>(stops[0] ?? null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!stops.length) return;

    const update = () => {
      const marker = window.innerHeight * 0.55;
      let current = -1;
      for (let i = 0; i < stops.length; i++) {
        const el = document.getElementById(stops[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = i;
      }
      const upcoming = stops[current + 1] ?? null;
      setNext(upcoming);

      const doc = document.documentElement;
      const nearEnd =
        window.scrollY + window.innerHeight >= doc.scrollHeight - 280;
      setVisible(!!upcoming && !nearEnd);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [stops]);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 sm:bottom-8">
      <AnimatePresence>
        {visible && next && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              aria-label={`Skip to next section: ${next.title}`}
              onClick={() => scrollToId(next.id)}
              className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white/70 py-2.5 pr-4 pl-5 text-sm font-medium text-black/70 shadow-[0_10px_32px_rgba(35,29,16,0.14)] backdrop-blur-xl backdrop-saturate-150 transition-colors hover:border-black/20 hover:bg-white/90 hover:text-black"
            >
              <span className="relative block min-w-0 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={next.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap"
                  >
                    {next.title}
                  </motion.span>
                </AnimatePresence>
              </span>
              <motion.svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="14"
                height="14"
                aria-hidden
                className="shrink-0"
                animate={{ y: [0, 2.5, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
              </motion.svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Block renderer ─────────────────────────────────────────── */
function Block({ block, accent }: { block: CaseBlock; accent: string }) {
  switch (block.type) {
    case "text":
      return (
        <Reveal>
          <p className="max-w-[68ch] text-lg leading-relaxed text-muted md:text-xl">
            {renderRichText(block.text)}
          </p>
        </Reveal>
      );
    case "bullets":
      return (
        <Reveal>
          <ul className="max-w-[68ch] space-y-4">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-4 text-lg leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{renderRichText(it)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal>
          <figure className="max-w-3xl border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="font-sans text-2xl font-medium leading-[1.35] tracking-tight text-ink md:text-3xl">
              {renderRichText(block.text)}
            </blockquote>
            {block.by && (
              <figcaption className="mt-4 text-xs uppercase tracking-widest text-muted">
                {block.by}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );
    case "figure":
      return (
        <Reveal>
          <Figure
            accent={accent}
            label={block.label}
            caption={block.caption}
            ratio={block.ratio}
            src={block.src}
            fit={block.fit}
          />
        </Reveal>
      );
    case "gallery":
      return (
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {block.items.map((it, i) => (
              <Figure
                key={i}
                accent={accent}
                label={it.label}
                caption={it.caption}
                src={it.src}
                ratio="square"
              />
            ))}
          </div>
        </Reveal>
      );
    case "iterations":
      return (
        <Reveal>
          <IterationStory
            intro={block.intro}
            items={block.items}
          />
        </Reveal>
      );
    default:
      return null;
  }
}

type IterationItem = {
  label: string;
  annotation: string;
  src: string;
};

/** Horizontal iteration strip — soft rejected proofs + expand for detail. */
function IterationStory({
  intro,
  items,
}: {
  intro?: string;
  items: IterationItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : Math.min(items.length - 1, i + 1)));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, items.length]);

  const shortTitle = (label: string) =>
    label.replace(/^Iteration 0?\d+\s*[—–-]\s*/i, "");

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {intro && (
        <p className="max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
          {renderRichText(intro)}
        </p>
      )}

      <ol className="-mx-1 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:-mx-2 md:gap-5 lg:-mx-3">
        {items.map((it, i) => (
          <li key={i} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group flex w-full flex-col gap-3 text-left outline-none"
              aria-label={`Expand ${it.label}`}
            >
              <div className="relative overflow-hidden rounded-xl border border-line bg-[#f3f2ef] transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_rgba(20,24,40,0.1)] group-focus-visible:ring-2 group-focus-visible:ring-ink/30">
                <div className="aspect-[826/935] p-2 sm:p-2.5">
                  <img
                    src={it.src}
                    alt={it.label}
                    className="h-full w-full rounded-lg object-contain object-top opacity-[0.92] transition-[opacity,transform] duration-400 group-hover:opacity-100"
                    width={826}
                    height={935}
                  />
                </div>
                <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-line bg-paper/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
                  Rejected
                </span>
                <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line bg-paper/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/70 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Expand
                </span>
              </div>
              <div className="flex flex-col gap-1.5 px-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-soft">
                  {String(i + 1).padStart(2, "0")} · {shortTitle(it.label)}
                </p>
                <p className="text-[13px] leading-relaxed text-muted">
                  {renderRichText(it.annotation)}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ol>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <IterationLightbox
                items={items}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onPrev={() =>
                  setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)))
                }
                onNext={() =>
                  setOpenIndex((i) =>
                    i === null ? i : Math.min(items.length - 1, i + 1)
                  )
                }
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function IterationLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: IterationItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const it = items[index];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#12141a]/72 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={it.label}
        className="relative z-[1] grid max-h-[min(92vh,920px)] w-full max-w-6xl overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_rgba(20,24,40,0.28)] md:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.85fr)]"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex min-h-0 items-center justify-center bg-[#f3f2ef] p-3 md:p-5">
          <img
            src={it.src}
            alt={it.label}
            className="max-h-[min(78vh,820px)] w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-line p-5 text-ink md:border-l md:border-t-0 md:p-7">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-soft">
              Rejected · {String(index + 1).padStart(2, "0")} of{" "}
              {String(items.length).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              {it.label.replace(/^Iteration 0?\d+\s*[—–-]\s*/i, "")}
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">
              {it.annotation}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={index === 0}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition enabled:hover:bg-surface disabled:opacity-30"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={index === items.length - 1}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition enabled:hover:bg-surface disabled:opacity-30"
              >
                Next
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-on-accent"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Image / placeholder figure ─────────────────────────────── */
function Figure({
  accent,
  label,
  caption,
  ratio = "wide",
  src,
  big = false,
  fit,
}: {
  accent: string;
  label?: string;
  caption?: string;
  ratio?: "wide" | "square" | "tall" | "screen" | "diagram";
  src?: string;
  big?: boolean;
  fit?: "cover" | "contain";
}) {
  const ratioClass =
    ratio === "square"
      ? "aspect-square"
      : ratio === "tall"
      ? "aspect-[3/4]"
      : ratio === "screen"
      ? "aspect-[16/9]"
      : ratio === "diagram"
      ? "aspect-[3/1]"
      : big
      ? "aspect-[16/9] md:aspect-[2.2/1]"
      : "aspect-[16/10]";

  const isDiagram = !!src && /\.svg($|\?)/i.test(src);
  const objectFit = fit ?? (isDiagram ? "contain" : "cover");
  const isContain = objectFit === "contain";

  return (
    <figure className="-mx-1 md:-mx-2 lg:-mx-3">
      <div
        className={`group relative overflow-hidden rounded-2xl border border-line ${ratioClass}${
          isContain || isDiagram
            ? ratio === "diagram"
              ? " bg-[#eef2f5]"
              : " bg-[#0b1220]"
            : ""
        }`}
      >
        {src ? (
          <img
            src={src}
            alt={(caption || label || "").replace(/\[\[([^\]]+)\]\]/g, "$1")}
            className={`h-full w-full ${
              isContain ? "object-contain" : "object-cover"
            }`}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.13] transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: accent }}
            />
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(22,21,15,0.10) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-accent">
                ✦
              </span>
              <span className="max-w-sm text-sm text-ink/80">
                {label || "Add image"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted">
                Image placeholder
              </span>
            </div>
          </>
        )}
      </div>
      {(label || caption) && src && (
        <figcaption className="mt-4 flex flex-col gap-1.5 px-0.5">
          {label && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-soft">
              {label}
            </p>
          )}
          {caption && (
            <p className="max-w-[68ch] text-sm leading-relaxed text-muted md:text-[15px]">
              {renderRichText(caption)}
            </p>
          )}
        </figcaption>
      )}
      {!src && caption && (
        <figcaption className="mt-3 text-sm text-muted">
          {renderRichText(caption)}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Prev / next project ────────────────────────────────────── */
function NextLink({
  dir,
  slug,
  title,
  company,
  accent,
}: {
  dir: "prev" | "next";
  slug: string;
  title: string;
  company: string;
  accent: string;
}) {
  return (
    <Link
      to={`/work/${slug}`}
      data-hover
      className={`group relative flex flex-col gap-3 overflow-hidden px-2 py-12 md:px-10 md:py-16 ${
        dir === "next" ? "md:items-end md:text-right" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.1]"
        style={{ background: accent }}
      />
      <span className="relative z-10 text-xs uppercase tracking-[0.25em] text-muted">
        {dir === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="relative z-10 font-sans text-3xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-5xl">
        {title}
      </span>
      <span className="relative z-10 text-sm text-muted">{company}</span>
    </Link>
  );
}

/* ── Helpers ────────────────────────────────────────────────── */
function useReadingTime(study?: CaseStudyType) {
  return useMemo(() => {
    if (!study) return 1;
    let words = study.subtitle.split(/\s+/).length +
      study.overview.summary.split(/\s+/).length;
    study.sections.forEach((s) => {
      s.blocks.forEach((b) => {
        if (b.type === "text") words += b.text.split(/\s+/).length;
        if (b.type === "bullets")
          words += b.items.join(" ").split(/\s+/).length;
        if (b.type === "quote") words += b.text.split(/\s+/).length;
      });
    });
    return Math.max(1, Math.round(words / 200));
  }, [study]);
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}
