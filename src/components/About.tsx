import { about } from "../content";
import { MaskedLines, Reveal } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="mb-3 font-sans text-sm uppercase tracking-[0.3em] text-muted">
              About
            </h2>
          </Reveal>
          <h3 className="font-sans text-4xl font-medium leading-[1.02] tracking-tightest text-ink md:text-6xl">
            <MaskedLines lines={about.heading} />
          </h3>

          <div className="mt-10 max-w-xl space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {about.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className="bg-paper"
              >
                <div className="flex h-full flex-col justify-between gap-8 p-6">
                  <span className="font-sans text-4xl font-medium tracking-tight text-accent md:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-xs leading-snug text-muted">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <Reveal>
              <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted">
                Capabilities
              </h4>
            </Reveal>
            <ul className="flex flex-col">
              {about.capabilities.map((c, i) => (
                <Reveal key={c} delay={i * 0.05}>
                  <li className="group flex items-center justify-between border-b border-line py-3 text-sm text-ink">
                    <span>{c}</span>
                    <span className="text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
