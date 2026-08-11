import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* Overlays layered on top of the project's accent gradient so each
   auto-advancing slide reads as a distinct "screen". */
const SLIDE_TINTS = [
  "linear-gradient(120deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 60%)",
  "linear-gradient(300deg, rgba(0,0,0,0.20), rgba(0,0,0,0) 55%)",
  "linear-gradient(60deg, rgba(255,255,255,0.10), rgba(0,0,0,0.14))",
];

export default function ProjectCarousel({
  accent,
  captions,
}: {
  accent: string;
  captions: string[];
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = captions.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 3200);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line sm:aspect-[16/10] md:aspect-[16/8]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex h-full"
        animate={{ x: `-${idx * 100}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {captions.map((cap, i) => (
          <div
            key={i}
            className="relative h-full w-full flex-none"
            style={{ background: accent }}
          >
            <div
              className="absolute inset-0"
              style={{ background: SLIDE_TINTS[i % SLIDE_TINTS.length] }}
            />
            <ScreenMock variant={i} caption={cap} />
          </div>
        ))}
      </motion.div>

      {/* progress dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {captions.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIdx(i);
            }}
            className="h-1.5 rounded-full bg-white/60 transition-all duration-300"
            style={{
              width: i === idx ? 22 : 8,
              background: i === idx ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* A lightweight, abstract UI mock so placeholders resemble product
   screens. Layout varies by slide for visual variety. */
function ScreenMock({ variant, caption }: { variant: number; caption: string }) {
  return (
    <div className="absolute inset-6 flex flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl md:inset-10">
      <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="ml-3 h-2 w-28 rounded bg-black/10" />
        <span className="ml-auto font-sans text-[9px] uppercase tracking-widest text-black/30">
          {caption}
        </span>
      </div>
      <div className="flex-1 p-5">{renderVariant(variant)}</div>
    </div>
  );
}

function bar(w: string, extra = "") {
  return <span className={`block h-2 rounded bg-black/10 ${extra}`} style={{ width: w }} />;
}

function renderVariant(variant: number) {
  const v = variant % 3;
  if (v === 0) {
    // hero / detail layout
    return (
      <div className="flex h-full flex-col gap-3">
        <span className="h-4 w-1/2 rounded bg-black/15" />
        {bar("80%")}
        {bar("70%")}
        <div className="mt-auto grid grid-cols-3 gap-3">
          <span className="h-14 rounded-lg bg-black/[0.07]" />
          <span className="h-14 rounded-lg bg-black/[0.07]" />
          <span className="h-14 rounded-lg bg-black/[0.07]" />
        </div>
      </div>
    );
  }
  if (v === 1) {
    // dashboard layout
    return (
      <div className="flex h-full gap-4">
        <div className="flex w-1/4 flex-col gap-2">
          {bar("100%")}
          {bar("80%")}
          {bar("90%")}
          {bar("60%")}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <span className="h-16 rounded-lg bg-black/[0.07]" />
            <span className="h-16 rounded-lg bg-black/[0.07]" />
          </div>
          <span className="h-full rounded-lg bg-black/[0.05]" />
        </div>
      </div>
    );
  }
  // list layout
  return (
    <div className="flex h-full flex-col gap-3">
      {[0, 1, 2, 3].map((r) => (
        <div key={r} className="flex items-center gap-3">
          <span className="h-8 w-8 rounded-full bg-black/[0.08]" />
          <div className="flex flex-1 flex-col gap-1.5">
            {bar(r % 2 ? "55%" : "70%")}
            {bar("35%")}
          </div>
          <span className="h-5 w-12 rounded bg-black/[0.08]" />
        </div>
      ))}
    </div>
  );
}
