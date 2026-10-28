import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type Row = { slug: string; ref: string; short: string; title: string; sector: string; service: string };

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+&";

function Flap({ text, delay, run }: { text: string; delay: number; run: boolean }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!run || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    let tick = 0;
    const settle = text.split("").map((_, i) => delay + i * 1.4 + Math.random() * 6);
    const id = setInterval(() => {
      tick++;
      setShown(
        text
          .split("")
          .map((c, i) => (c === " " || tick >= settle[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (tick > Math.max(...settle)) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [run, text, delay]);

  return (
    <span className="inline-flex gap-[2px]" aria-hidden="true">
      {shown.split("").map((c, i) => (
        <span
          key={i}
          className="relative inline-flex h-[1.9em] w-[1.25em] items-center justify-center rounded-[3px] bg-paper/[0.07] text-paper after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-night/80"
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export default function DepartureBoard({ rows, compact = false }: { rows: Row[]; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className="cut overflow-hidden bg-deep font-mono text-paper [--cut:28px]">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-4 text-[0.65rem] tracking-[0.14em] uppercase sm:px-8">
        <span className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-coral" /> Departures · selected work
        </span>
        <span className="opacity-50">{rows.length} services</span>
      </div>

      <div className="hidden grid-cols-[5rem_1fr_6rem_12rem_2rem] gap-4 px-8 pt-4 text-[0.6rem] tracking-[0.14em] uppercase opacity-40 lg:grid">
        <span>Ref</span>
        <span>Project</span>
        <span>Line</span>
        <span>Service</span>
        <span />
      </div>

      <ul>
        {rows.map((r, i) => (
          <li key={r.slug}>
            <a
              href={`/work/${r.slug}`}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-paper/10 px-5 py-4 text-[0.7rem] transition-colors last:border-0 hover:bg-coral/10 sm:px-8 sm:text-xs lg:grid-cols-[5rem_1fr_6rem_12rem_2rem]"
            >
              <span className="sr-only">
                {r.title}, {r.sector}, {r.service}
              </span>
              <span className="hidden text-coral lg:block" aria-hidden="true">
                {r.ref}
              </span>
              <span style={{ viewTransitionName: `case-${r.slug}` }}>
                <Flap text={r.short} delay={i * 4} run={inView} />
              </span>
              <span className="text-right text-coral lg:text-left" aria-hidden="true">
                {r.sector.toUpperCase()}
              </span>
              {!compact && (
                <span className="col-span-2 font-sans text-sm text-paper/70 lg:col-span-1" aria-hidden="true">
                  {r.service}
                </span>
              )}
              {compact && <span className="hidden lg:block" />}
              <span
                className="hidden text-lg transition-transform group-hover:translate-x-1 group-hover:text-coral lg:block"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
