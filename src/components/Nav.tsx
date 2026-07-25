import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { navLinks, site } from "../content";
import Magnetic from "./Magnetic";
import { useSectionNav } from "../hooks/useSectionNav";
import { getLenis } from "../lib/useLenis";

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

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CalendlyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Official Calendly mark (Simple Icons) */}
      <path d="M19.655 14.262c.281 0 .557.023.828.064 0 .005-.005.01-.005.014-.105.267-.234.534-.381.786l-1.219 2.106c-1.112 1.936-3.177 3.127-5.411 3.127h-2.432c-2.23 0-4.294-1.191-5.412-3.127l-1.218-2.106a6.251 6.251 0 0 1 0-6.252l1.218-2.106C6.736 4.832 8.8 3.641 11.035 3.641h2.432c2.23 0 4.294 1.191 5.411 3.127l1.219 2.106c.147.252.271.519.381.786 0 .004.005.009.005.014-.267.041-.543.064-.828.064-1.816 0-2.501-.607-3.291-1.306-.764-.676-1.711-1.517-3.44-1.517h-1.029c-1.251 0-2.387.455-3.2 1.278-.796.805-1.233 1.904-1.233 3.099v1.411c0 1.196.437 2.295 1.233 3.099.813.823 1.949 1.278 3.2 1.278h1.034c1.729 0 2.676-.841 3.439-1.517.791-.703 1.471-1.306 3.287-1.301Zm.005-3.237c.399 0 .794-.036 1.179-.11-.002-.004-.002-.01-.002-.014-.073-.414-.193-.823-.349-1.218.731-.12 1.407-.396 1.986-.819 0-.004-.005-.013-.005-.018-.331-1.085-.832-2.101-1.489-3.03-.649-.915-1.435-1.719-2.331-2.395-1.867-1.398-4.088-2.138-6.428-2.138-1.448 0-2.855.28-4.175.841-1.273.543-2.423 1.315-3.407 2.299S2.878 6.552 2.341 7.83c-.557 1.324-.842 2.726-.842 4.175 0 1.448.281 2.855.842 4.174.542 1.274 1.314 2.423 2.298 3.407s2.129 1.761 3.407 2.299c1.324.556 2.727.841 4.175.841 2.34 0 4.561-.74 6.428-2.137a10.815 10.815 0 0 0 2.331-2.396c.652-.929 1.158-1.949 1.489-3.03 0-.004.005-.014.005-.018-.579-.423-1.255-.699-1.986-.819.161-.395.276-.804.349-1.218.005-.009.005-.014.005-.023.869.166 1.692.506 2.404 1.035.685.505.552 1.075.446 1.416C22.184 20.437 17.619 24 12.221 24c-6.625 0-12-5.375-12-12s5.37-12 12-12c5.398 0 9.963 3.563 11.471 8.464.106.341.239.915-.446 1.421-.717.529-1.535.873-2.404 1.034.128.716.128 1.45 0 2.166-.387-.074-.782-.11-1.182-.11-4.184 0-3.968 2.823-6.736 2.823h-1.029c-1.899 0-3.15-1.357-3.15-3.095v-1.411c0-1.738 1.251-3.094 3.15-3.094h1.034c2.768 0 2.552 2.823 6.731 2.827Z" />
    </svg>
  );
}

function EmailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / denied permissions
      window.prompt("Copy email address:", site.email);
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="link-underline whitespace-nowrap font-sans text-sm font-medium text-ink md:text-[17px]"
      >
        Contact
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Contact options"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-line bg-paper p-1.5 shadow-[0_12px_40px_rgba(14,16,16,0.1)]">
              <ContactIconButton
                href={site.linkedinUrl}
                label="LinkedIn"
                tooltip="LinkedIn"
              >
                <LinkedInIcon />
              </ContactIconButton>

              <ContactIconButton
                href={site.calendlyUrl}
                label="Schedule a call on Calendly"
                tooltip="Schedule call"
              >
                <CalendlyIcon />
              </ContactIconButton>

              <ContactIconButton
                label={copied ? "Copied!" : `Copy ${site.email}`}
                tooltip={copied ? "Copied!" : "Copy email"}
                onClick={copyEmail}
                active={copied}
              >
                <EmailIcon />
              </ContactIconButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactIconButton({
  href,
  label,
  tooltip,
  onClick,
  active,
  children,
}: {
  href?: string;
  label: string;
  tooltip: string;
  onClick?: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  const className = `group/tip relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
    active
      ? "bg-ink text-paper"
      : "bg-surface text-ink hover:bg-ink hover:text-paper"
  }`;

  const tip = (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-sans text-[11px] font-medium text-paper opacity-0 shadow-sm transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100"
    >
      {tooltip}
      <span
        aria-hidden
        className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink"
      />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        role="menuitem"
        aria-label={label}
        className={className}
      >
        {children}
        {tip}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      aria-label={label}
      onClick={onClick}
      className={className}
    >
      {children}
      {tip}
    </button>
  );
}

export default function Nav({ ready = true }: { ready?: boolean }) {
  const goToSection = useSectionNav();
  const navigate = useNavigate();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => {
      const lenis = getLenis();
      const y = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop;
      setSolid(y > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });

    let detachLenis: (() => void) | undefined;
    const attachId = window.setInterval(() => {
      const lenis = getLenis();
      if (!lenis || detachLenis) return;
      lenis.on("scroll", update);
      detachLenis = () => lenis.off("scroll", update);
      window.clearInterval(attachId);
    }, 80);

    return () => {
      window.removeEventListener("scroll", update);
      window.clearInterval(attachId);
      detachLenis?.();
    };
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        solid
          ? "border-b border-line bg-paper/95 shadow-[0_1px_0_rgba(14,16,16,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
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

        <ul className="flex items-center gap-3 sm:gap-5 md:gap-8">
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
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-surface px-4 py-2 font-sans text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-paper md:text-[17px]"
                  >
                    {l.label}
                    <span aria-hidden className="text-xs">
                      ↗
                    </span>
                  </a>
                </Magnetic>
              )}
            </li>
          ))}
          <li>
            <ContactMenu />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
