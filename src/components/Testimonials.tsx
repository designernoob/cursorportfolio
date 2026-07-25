import { testimonials } from "../content";
import { Reveal } from "./Reveal";

export default function Testimonials() {
  return (
    <section id="words" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mb-14 border-b border-line pb-6">
        <Reveal>
          <h2 className="font-sans text-sm uppercase tracking-[0.3em] text-muted">
            Kind Words
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-x-16 gap-y-16 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.1}>
            <figure className="flex h-full flex-col justify-between gap-8">
              <blockquote className="text-balance font-serif text-2xl leading-[1.3] text-ink md:text-3xl">
                <span className="text-accent">“</span>
                {t.quote}
                <span className="text-accent">”</span>
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t border-line pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-sans text-sm text-accent">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="font-sans text-sm font-medium text-ink">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted">{t.title}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
