import { Link } from "react-router-dom";
import { projects, type Project } from "../content";
import { Reveal } from "./Reveal";
import ProjectCarousel from "./ProjectCarousel";

const SLIDE_CAPTIONS = ["Overview", "Key flow", "Details"];

export default function Work() {
  return (
    <section id="work" className="relative px-6 pb-24 pt-8 md:px-10 md:pb-40 md:pt-12">
      <div className="mb-12 border-b border-line pb-6 md:mb-16">
        <Reveal>
          <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-muted">
            Selected Work
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col gap-20 md:gap-32">
        {projects.map((p, i) => (
          <ProjectBlock key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.03}>
      <article className="group/card">
        {/* Media: auto-scrolling carousel with a click-through overlay */}
        <div className="relative">
          <ProjectCarousel accent={project.accent} captions={SLIDE_CAPTIONS} />
          <Link
            to={`/work/${project.slug}`}
            aria-label={`View ${project.title} case study`}
            className="absolute inset-0 z-10 rounded-3xl"
          />
          <span className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest text-ink backdrop-blur transition-transform duration-500 group-hover/card:translate-x-1">
            Case study
            <span aria-hidden>↗</span>
          </span>
        </div>

        {/* Meta: title, description, timeline */}
        <div className="mt-6 flex flex-col gap-6 md:mt-7 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-xs text-muted">{project.index}</span>
              <Link to={`/work/${project.slug}`}>
                <h3 className="font-serif text-3xl font-medium leading-tight text-ink transition-colors duration-300 hover:text-accent md:text-[2.6rem]">
                  {project.title}
                </h3>
              </Link>
            </div>
            <p className="mt-3 font-sans text-base leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-sans text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <dl className="flex shrink-0 gap-10 md:flex-col md:gap-5 md:text-right">
            <div>
              <dt className="font-sans text-[11px] uppercase tracking-widest text-muted">
                Timeline
              </dt>
              <dd className="mt-1 font-sans text-sm text-ink">{project.period}</dd>
            </div>
            <div>
              <dt className="font-sans text-[11px] uppercase tracking-widest text-muted">
                Role
              </dt>
              <dd className="mt-1 font-sans text-sm text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="font-sans text-[11px] uppercase tracking-widest text-muted">
                Company
              </dt>
              <dd className="mt-1 font-sans text-sm text-ink">{project.company}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Reveal>
  );
}
