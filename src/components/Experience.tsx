import { experience } from "../content";
import { Reveal } from "./Reveal";

const COLS =
  "grid-cols-1 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,0.8fr)]";

/**
 * Real crumpled-paper document with a clean single-font table
 * of experience + education. Logos sit beside each org name.
 */
export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="experience-doc relative w-full overflow-hidden">
          {/* Crumpled paper photo + warm sticky wash */}
          <div aria-hidden className="experience-doc__paper" />
          <div aria-hidden className="experience-doc__wash" />

          <div className="relative z-10 px-6 py-9 md:px-10 md:py-12">
            <header className="border-b border-[color:var(--doc-rule)] pb-5 md:pb-6">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.26em] text-[color:var(--doc-ink-soft)]">
                {experience.kicker}
              </p>
              <h2 className="mt-3 max-w-2xl font-sans text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[color:var(--doc-ink)] md:text-[2.35rem]">
                {experience.heading}
              </h2>
            </header>

            <div
              className="mt-5 md:mt-7"
              role="table"
              aria-label="Experience and education"
            >
              <div
                role="row"
                className={`mb-1.5 hidden ${COLS} gap-x-6 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--doc-ink-soft)] md:grid`}
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
                    className={`grid ${COLS} gap-x-6 gap-y-1.5 border-b border-[color:var(--doc-rule)] py-4 md:items-center md:py-[1.15rem]`}
                  >
                    <div role="cell" className="flex min-w-0 items-center gap-3">
                      <img
                        src={entry.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 shrink-0 rounded-[7px] shadow-sm ring-1 ring-black/5"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-sans text-[15px] font-semibold tracking-tight text-[color:var(--doc-ink)] md:text-base">
                          {entry.org}
                        </p>
                        {entry.note && (
                          <p className="mt-0.5 truncate font-sans text-[13px] font-normal text-[color:var(--doc-ink-soft)] md:text-sm">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <p
                      role="cell"
                      className="font-sans text-[13px] font-medium tabular-nums tracking-wide text-[color:var(--doc-ink)] md:text-sm"
                    >
                      <span className="mr-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--doc-ink-soft)] md:hidden">
                        Duration
                      </span>
                      {entry.duration}
                    </p>

                    <p
                      role="cell"
                      className="font-sans text-[13px] font-medium text-[color:var(--doc-ink-soft)] md:text-sm"
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
