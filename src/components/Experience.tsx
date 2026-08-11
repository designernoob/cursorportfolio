import { experience } from "../content";
import { Reveal } from "./Reveal";

const COLS =
  "grid-cols-1 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,0.8fr)]";

/**
 * Crumpled off-white paper document with a clean single-font table.
 * Logos sit beside each org name.
 */
export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="experience-doc relative w-full overflow-hidden">
          <div aria-hidden className="experience-doc__paper" />
          <div aria-hidden className="experience-doc__wash" />

          <div className="relative z-10 px-6 py-9 md:px-12 md:py-14">
            <header className="pb-6 md:pb-7">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.26em] text-[color:var(--doc-ink-soft)]">
                {experience.kicker}
              </p>
              <h2 className="mt-3 max-w-3xl font-sans text-[2rem] font-semibold leading-[1.12] tracking-tight text-[color:var(--doc-ink)] md:text-[2.6rem]">
                {experience.heading}
              </h2>
              <p className="mt-3 font-sans text-[15px] font-medium text-[color:var(--doc-ink-soft)] md:text-base">
                {experience.location}
              </p>
            </header>

            <div
              className="mt-6 md:mt-8"
              role="table"
              aria-label="Experience and education"
            >
              <div
                role="row"
                className={`mb-2 hidden ${COLS} gap-x-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--doc-ink-soft)] md:grid`}
              >
                <span role="columnheader">Company / School</span>
                <span role="columnheader">Duration</span>
                <span role="columnheader">Type</span>
              </div>

              <ul className="border-t border-[color:var(--doc-rule)]">
                {experience.entries.map((entry) => (
                  <li
                    key={`${entry.org}-${entry.duration}`}
                    role="row"
                    className={`grid ${COLS} gap-x-8 gap-y-1.5 border-b border-[color:var(--doc-rule)] py-5 md:items-center md:py-6`}
                  >
                    <div role="cell" className="flex min-w-0 items-center gap-3.5 md:gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-white shadow-sm ring-1 ring-black/8 md:h-11 md:w-11">
                        <img
                          src={entry.logo}
                          alt=""
                          width={44}
                          height={44}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-sans text-lg font-semibold tracking-tight text-[color:var(--doc-ink)] md:text-xl">
                          {entry.org}
                        </p>
                        {entry.note && (
                          <p className="mt-0.5 truncate font-sans text-[15px] font-normal text-[color:var(--doc-ink-soft)] md:text-base">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <p
                      role="cell"
                      className="font-sans text-[15px] font-medium tabular-nums tracking-wide text-[color:var(--doc-ink)] md:text-base"
                    >
                      <span className="mr-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--doc-ink-soft)] md:hidden">
                        Duration
                      </span>
                      {entry.duration}
                    </p>

                    <p
                      role="cell"
                      className="font-sans text-[15px] font-medium text-[color:var(--doc-ink-soft)] md:text-base"
                    >
                      <span className="mr-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] md:hidden">
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
