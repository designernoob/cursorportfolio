import { experience } from "../content";
import { Reveal } from "./Reveal";

/**
 * Document-like Experience & Education block.
 * Soft paper panel + inset table rows (inspired by clean “contact card”
 * document UIs). Content lives in content.ts — easy to rename later.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 py-24 md:px-10 md:py-36"
    >
      <Reveal>
        <div className="experience-doc relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] px-6 py-8 md:px-10 md:py-12">
          {/* Soft paper grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-14 md:items-start">
            {/* Left: title block */}
            <div className="md:sticky md:top-28">
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-[color:var(--doc-ink-soft)]">
                {experience.kicker}
              </p>
              <h2 className="hero-display mt-4 text-[2.4rem] leading-[1.05] text-[color:var(--doc-ink)] md:text-[2.8rem]">
                {experience.heading}
              </h2>
              <div
                aria-hidden
                className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--doc-mark)] text-[color:var(--doc-ink)] shadow-inner"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M8 7h8M8 12h8M8 17h5"
                    strokeLinecap="round"
                  />
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                </svg>
              </div>
            </div>

            {/* Right: table-like rows */}
            <div className="min-w-0">
              <div className="mb-3 hidden grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_auto] gap-4 px-1 font-sans text-[10px] uppercase tracking-[0.22em] text-[color:var(--doc-ink-soft)] md:grid">
                <span>Company / School</span>
                <span>Duration</span>
                <span className="text-right">Type</span>
              </div>

              <ul className="divide-y divide-[color:var(--doc-rule)] border-y border-[color:var(--doc-rule)]">
                {experience.entries.map((entry) => (
                  <li
                    key={`${entry.org}-${entry.duration}`}
                    className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_auto] md:items-baseline md:gap-4 md:py-5"
                  >
                    <div className="min-w-0">
                      <p className="font-sans text-[15px] font-semibold tracking-tight text-[color:var(--doc-ink)] md:text-base">
                        {entry.org}
                      </p>
                      {entry.note && (
                        <p className="mt-0.5 font-sans text-sm text-[color:var(--doc-ink-soft)]">
                          {entry.note}
                        </p>
                      )}
                    </div>
                    <p className="font-sans text-sm tabular-nums tracking-wide text-[color:var(--doc-ink)] md:text-[15px]">
                      <span className="mr-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[color:var(--doc-ink-soft)] md:hidden">
                        Duration
                      </span>
                      {entry.duration}
                    </p>
                    <p className="font-sans text-sm text-[color:var(--doc-ink-soft)] md:text-right md:text-[15px]">
                      <span className="mr-2 font-sans text-[10px] uppercase tracking-[0.18em] md:hidden">
                        Type
                      </span>
                      {entry.kind}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
