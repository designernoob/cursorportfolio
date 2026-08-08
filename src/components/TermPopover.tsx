import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { glossary, type GlossaryTerm } from "../content";

const OPEN_DELAY = 160;
const CLOSE_DELAY = 140;

/** Split prose on [[Term]] markers into plain text + interactive terms. */
export function renderRichText(text: string): ReactNode[] {
  const parts = text.split(/(\[\[[^\]]+\]\])/g).filter(Boolean);
  return parts.map((part, i) => {
    const match = part.match(/^\[\[([^\]]+)\]\]$/);
    if (!match) return <span key={i}>{part}</span>;
    const key = match[1];
    const entry = glossary[key];
    if (!entry) return <span key={i}>{key}</span>;
    return <Term key={`${key}-${i}`} termKey={key} entry={entry} />;
  });
}

function Term({ termKey, entry }: { termKey: string; entry: GlossaryTerm }) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panelId = useId();

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    const card = cardRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const cardW = card?.offsetWidth || 340;
    const cardH = card?.offsetHeight || 180;
    const gap = 10;
    const pad = 16;

    let left = rect.left + rect.width / 2 - cardW / 2;
    left = Math.max(pad, Math.min(left, window.innerWidth - cardW - pad));

    const spaceBelow = window.innerHeight - rect.bottom;
    const placeBelow = spaceBelow > cardH + gap + pad || rect.top < cardH + gap;
    const top = placeBelow ? rect.bottom + gap : rect.top - cardH - gap;

    setPos({ top, left });
  }, []);

  const scheduleOpen = () => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), OPEN_DELAY);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useLayoutEffect(() => {
    if (!open) return;
    place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, place]);

  useEffect(() => () => clearTimers(), []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="term-trigger"
        aria-describedby={open ? panelId : undefined}
        aria-expanded={open}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
        onClick={(e) => {
          // Touch / keyboard: toggle
          e.preventDefault();
          clearTimers();
          setOpen((v) => !v);
        }}
      >
        {termKey}
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={cardRef}
                id={panelId}
                role="tooltip"
                className="term-popover"
                style={{ top: pos.top, left: pos.left }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={scheduleOpen}
                onMouseLeave={scheduleClose}
                onAnimationComplete={place}
              >
                <p className="term-popover__title">{entry.title}</p>
                {entry.subtitle && (
                  <p className="term-popover__subtitle">{entry.subtitle}</p>
                )}
                <p className="term-popover__blurb">{entry.blurb}</p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
