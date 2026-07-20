import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { site } from "../content";
import Magnetic from "./Magnetic";
import { useSectionNav } from "../hooks/useSectionNav";

const links = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Words", id: "words" },
  { label: "Contact", id: "contact" },
];

export default function Nav({ ready = true }: { ready?: boolean }) {
  const goToSection = useSectionNav();
  const navigate = useNavigate();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[80] mix-blend-difference"
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
          <span className="font-sans text-sm font-semibold tracking-tight text-white">
            {site.name}
            <span className="text-accent">.</span>
          </span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => goToSection(l.id)}
                data-hover
                className="link-underline text-sm font-medium text-white/90"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.5}>
          <button
            type="button"
            onClick={() => goToSection("contact")}
            data-hover
            className="rounded-full border border-white/40 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Let's talk
          </button>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
