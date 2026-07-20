import { useEffect, useState } from "react";
import { site } from "../content";
import { MaskedLines, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: site.timezone,
          }).format(new Date())
        );
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useLocalTime();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-6 pb-10 pt-24 md:px-10 md:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }}
      />

      <div className="relative z-10">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-10 bg-muted" /> Have an idea?
          </p>
        </Reveal>

        <a
          href={`mailto:${site.email}`}
          data-hover
          data-cursor="Email"
          className="block"
        >
          <h2 className="font-sans text-[15vw] font-medium leading-[0.9] tracking-tightest text-cream transition-colors duration-500 hover:text-accent md:text-[13vw]">
            <MaskedLines lines={["Let's build", "something *great*."]} />
          </h2>
        </a>

        <div className="mt-14 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${site.email}`}
                data-hover
                className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 font-sans text-base font-medium text-ink transition-transform"
              >
                {site.email}
                <span className="text-xl">↗</span>
              </a>
            </Magnetic>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {site.availability}. Based in {site.location}.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted">
                Socials
              </h4>
              <ul className="space-y-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-hover
                      className="link-underline text-sm text-cream"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted">
                Local time
              </h4>
              <div className="font-sans text-sm tabular-nums text-cream">
                {time} <span className="text-muted">IST</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 text-xs text-muted md:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. Designed & built with care.
          </span>
          <a href="#top" data-hover className="link-underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
