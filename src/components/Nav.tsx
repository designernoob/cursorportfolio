import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../content";
import Magnetic from "./Magnetic";
import { useSectionNav } from "../hooks/useSectionNav";

/* A minimal, always-rotating spark used as the logo mark.
   Placeholder for now — easy to swap for a custom icon later. */
function LogoMark() {
  return (
    <motion.svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      className="text-ink"
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      whileHover={{ scale: 1.15 }}
    >
      <path
        d="M12 1c.6 5.2 2.8 7.4 8 8-5.2.6-7.4 2.8-8 8-.6-5.2-2.8-7.4-8-8 5.2-.6 7.4-2.8 8-8Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

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
          aria-label="Home"
          className="transition-transform duration-300 hover:rotate-12"
        >
          <LogoMark />
        </button>

        <ul className="flex items-center gap-4 sm:gap-6 md:gap-10">
          {navLinks.map((l) => (
            <li key={l.label}>
              {l.kind === "section" ? (
                <button
                  type="button"
                  onClick={() => goToSection(l.target)}
                  className="link-underline whitespace-nowrap font-sans text-sm font-medium text-ink md:text-[17px]"
                >
                  {l.label}
                </button>
              ) : (
                <Magnetic strength={0.3}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 font-sans text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent md:text-[17px]"
                  >
                    {l.label}
                    <span aria-hidden className="text-xs">↗</span>
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
