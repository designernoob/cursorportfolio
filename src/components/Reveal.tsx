import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const MARGIN = "0px 0px -12% 0px";

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: MARGIN });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a headline into lines that each rise out of a mask.
 * Words wrapped in *asterisks* render in the serif italic accent.
 */
export function MaskedLines({
  lines,
  className = "",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: MARGIN });
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 1,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {renderEmphasis(line)}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function renderEmphasis(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={i} className="font-serif italic text-accent">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
