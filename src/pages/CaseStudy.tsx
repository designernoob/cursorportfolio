import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  getCaseStudy,
  adjacentProjects,
  type CaseBlock,
  type CaseStudy as CaseStudyType,
} from "../content";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Reveal } from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { scrollToId } from "../lib/scroll";

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const { scrollYProgress } = useScroll();
  const readingTime = useReadingTime(study);
  const activeId = useScrollSpy(study?.sections.map((s) => s.id) ?? []);

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

            <h1 className="max-w-5xl font-sans text-[11vw] font-medium leading-[0.95] tracking-tightest text-cream md:text-[6.5vw]">
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

        {/* ── At a glance: summary + meta ───────────────────── */}
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
                  Overview
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="max-w-2xl font-serif text-2xl leading-[1.35] text-cream md:text-3xl">
                  {study.overview.summary}
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                {study.overview.meta.map((m, i) => (
                  <Reveal key={m.label} delay={i * 0.04}>
                    <div className="border-t border-line pt-3">
                      <dt className="text-xs uppercase tracking-widest text-muted">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-sm text-cream">{m.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Impact strip (outcomes first) ─────────────────── */}
        <section className="px-6 md:px-10">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {study.overview.impact.map((m, i) => (
              <Reveal key={i} className="bg-ink" delay={i * 0.06}>
                <div className="flex h-full flex-col gap-6 p-8 md:p-10">
                  <span className="font-sans text-5xl font-medium tracking-tight text-accent md:text-6xl">
                    {m.value}
                  </span>
                  <span className="text-sm leading-snug text-muted">
                    {m.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Body: sticky TOC + sections ───────────────────── */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Table of contents */}
            <aside className="hidden md:col-span-3 md:block">
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
                          className={`group flex items-center gap-3 text-left text-sm transition-colors duration-300 ${
                            active ? "text-cream" : "text-muted hover:text-cream"
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
                              active ? "w-6 bg-accent" : "w-3 bg-line"
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
            <div className="md:col-span-8 md:col-start-5">
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
                        <h2 className="font-sans text-3xl font-medium tracking-tight text-cream md:text-4xl">
                          {s.heading}
                        </h2>
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

/* ── Block renderer ─────────────────────────────────────────── */
function Block({ block, accent }: { block: CaseBlock; accent: string }) {
  switch (block.type) {
    case "text":
      return (
        <Reveal>
          <p className="max-w-[68ch] text-lg leading-relaxed text-muted md:text-xl">
            {block.text}
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
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal>
          <figure className="max-w-3xl border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="font-serif text-3xl leading-[1.25] text-cream md:text-4xl">
              {block.text}
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
    default:
      return null;
  }
}

/* ── Image / placeholder figure ─────────────────────────────── */
function Figure({
  accent,
  label,
  caption,
  ratio = "wide",
  src,
  big = false,
}: {
  accent: string;
  label?: string;
  caption?: string;
  ratio?: "wide" | "square" | "tall";
  src?: string;
  big?: boolean;
}) {
  const ratioClass =
    ratio === "square"
      ? "aspect-square"
      : ratio === "tall"
      ? "aspect-[3/4]"
      : big
      ? "aspect-[16/9] md:aspect-[2.2/1]"
      : "aspect-[16/10]";

  return (
    <figure>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-line ${ratioClass}`}
      >
        {src ? (
          <img
            src={src}
            alt={caption || label || ""}
            className="h-full w-full object-cover"
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
                  "radial-gradient(circle at 1px 1px, rgba(243,240,233,0.08) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-accent">
                ✦
              </span>
              <span className="max-w-sm text-sm text-cream/80">
                {label || "Add image"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted">
                Image placeholder
              </span>
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
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
      <span className="relative z-10 font-sans text-3xl font-medium tracking-tight text-cream transition-colors duration-300 group-hover:text-accent md:text-5xl">
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
