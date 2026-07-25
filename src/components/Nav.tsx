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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {/* Calendly-style mark: rounded square with clock/calendar cue */}
      <path d="M19.5 3h-1.25V1.75a.75.75 0 10-1.5 0V3h-9.5V1.75a.75.75 0 10-1.5 0V3H4.5A2.5 2.5 0 002 5.5v14A2.5 2.5 0 004.5 22h15a2.5 2.5 0 002.5-2.5v-14A2.5 2.5 0 0019.5 3zM21 19.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5V9h18v10.5zM21 8H3V5.5A1.5 1.5 0 014.5 4h1.25v.75a.75.75 0 001.5 0V4h9.5v.75a.75.75 0 001.5 0V4H19.5A1.5 1.5 0 0121 5.5V8z" />
      <path d="M12 11.25a.75.75 0 01.75.75v3.19l1.78 1.78a.75.75 0 11-1.06 1.06l-2-2A.75.75 0 0111.25 15.5v-3.5a.75.75 0 01.75-.75z" />
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
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-paper px-4 py-2 font-sans text-sm font-medium text-ink transition-colors duration-300 hover:border-ink md:text-[17px]"
      >
        Contact
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-xs"
        >
          ▾
        </motion.span>
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
            className="absolute right-0 top-full z-50 pt-3"
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
                label="Book a call on Calendly"
                tooltip="Calendly"
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
