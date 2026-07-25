import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { projects, type Project } from "../content";
import { Reveal } from "./Reveal";

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 25 });
  const sy = useSpring(my, { stiffness: 250, damping: 25 });

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section id="work" className="relative px-6 pb-24 pt-8 md:px-10 md:pb-40 md:pt-12">
      <div className="mb-14 flex items-end justify-between border-b border-line pb-6">
        <Reveal>
          <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-muted">
            Selected Work
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="font-serif text-lg italic text-muted">
            ({String(projects.length).padStart(2, "0")})
          </span>
        </Reveal>
      </div>

      <div onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <Row
            key={p.index}
            project={p}
            index={i}
            active={active === i}
            onEnter={() => setActive(i)}
          />
        ))}
      </div>

      {/* Floating preview that follows the cursor */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="pointer-events-none fixed z-[60] hidden h-64 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl md:block"
            style={{ left: sx, top: sy, background: projects[active].accent }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-full flex-col justify-between p-6 text-ink">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest">
                {projects[active].company}
              </span>
              <div>
                <div className="font-sans text-3xl font-medium leading-none tracking-tight">
                  {projects[active].title}
                </div>
                <div className="mt-2 text-xs font-medium opacity-70">
                  View case → {projects[active].period}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Row({
  project,
  index,
  active,
  onEnter,
}: {
  project: Project;
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <Link
        to={`/work/${project.slug}`}
        data-hover
        data-cursor="View case"
        onMouseEnter={onEnter}
        className="group relative block border-b border-line py-8 md:py-10"
      >
        {/* Sliding accent wash on hover */}
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-bottom"
          style={{ background: project.accent }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="relative z-10 flex items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-5 md:gap-10">
            <span
              className={`font-sans text-sm transition-colors duration-500 ${
                active ? "text-ink/60" : "text-muted"
              }`}
            >
              {project.index}
            </span>
            <h3
              className={`font-sans text-4xl font-medium leading-none tracking-tightest transition-all duration-500 md:text-7xl ${
                active ? "translate-x-2 text-ink md:translate-x-4" : "text-ink"
              }`}
            >
              {project.title}
            </h3>
          </div>
          <div
            className={`hidden shrink-0 text-right transition-colors duration-500 md:block ${
              active ? "text-ink/80" : "text-muted"
            }`}
          >
            <div className="text-sm font-medium">{project.company}</div>
            <div className="text-xs">{project.period}</div>
          </div>
        </div>

        <div
          className={`relative z-10 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 transition-colors duration-500 ${
            active ? "text-ink/70" : "text-muted"
          }`}
        >
          <span className="max-w-2xl text-sm leading-relaxed">
            {project.description}
          </span>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 text-xs transition-colors duration-500 ${
                active
                  ? "border-ink/30 text-ink/80"
                  : "border-line text-muted"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}
