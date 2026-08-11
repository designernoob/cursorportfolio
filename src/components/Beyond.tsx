import { beyond } from "../content";
import { MaskedLines, Reveal } from "./Reveal";

export default function Beyond() {
  return (
    <section id="beyond" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <h2 className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-muted">
              {beyond.kicker}
            </h2>
          </Reveal>
          <h3 className="font-serif text-4xl font-medium leading-[1.02] tracking-tighter2 text-ink md:text-6xl">
            <MaskedLines lines={beyond.heading} />
          </h3>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted md:text-lg">
              {beyond.intro}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {beyond.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06}>
                <div
                  data-hover
                  className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="relative z-10 font-sans text-[11px] uppercase tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <div className="font-serif text-2xl font-medium text-ink md:text-3xl">
                      {it.title}
                    </div>
                    <div className="mt-1 font-sans text-sm text-muted">
                      {it.note}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
