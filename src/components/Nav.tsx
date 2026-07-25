import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { site, navLinks } from "../content";
import Magnetic from "./Magnetic";
import { useSectionNav } from "../hooks/useSectionNav";

export default function Nav({ ready = true }: { ready?: boolean }) {
  const goToSection = useSectionNav();
  const navigate = useNavigate();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[80]"
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          data-hover
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-sm font-bold tracking-tight text-ink">
            {site.name}
            <span className="text-accent">.</span>
          </span>
        </button>

        <ul className="flex items-center gap-5 md:gap-9">
          {navLinks.map((l) => (
            <li key={l.label}>
              {l.kind === "section" ? (
                <button
                  type="button"
                  onClick={() => goToSection(l.target)}
                  data-hover
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.12em] text-ink md:text-xs"
                >
                  {l.label}
                </button>
              ) : (
                <Magnetic strength={0.4}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent md:text-xs"
                  >
                    {l.label}
                    <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
