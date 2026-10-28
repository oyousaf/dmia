import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

type Station = { slug: string; short: string; title: string; capability: string; x: number; y: number; below?: boolean };
type Cap = { id: string; title: string };

const LINES = [
  { id: "Rail", d: "M40 124 H340 L480 264 H640 L780 124 H960", color: "var(--coral)", lx: 40, ly: 156 },
  { id: "Bus", d: "M40 280 H960", color: "var(--fg)", lx: 40, ly: 312 },
  { id: "Road", d: "M40 436 H340 L480 296 H640 L780 436 H960", color: "var(--verdigris)", lx: 40, ly: 418 },
];

const POS: Record<string, { x: number; y: number; below?: boolean }> = {
  "a-train-acquisition": { x: 140, y: 124 },
  "mdsb-rolling-stock-financing": { x: 270, y: 124 },
  "european-rail-freight-market-study": { x: 710, y: 194 },
  "caledonian-sleeper-rolling-stock": { x: 880, y: 124 },
  "london-general-electric-bus-financing": { x: 200, y: 280 },
  "canadian-highways-ppp": { x: 170, y: 436, below: true },
  "m25-dbfo-procurement": { x: 870, y: 436, below: true },
};

export default function SectorMap({
  stations,
  caps,
}: {
  stations: Omit<Station, "x" | "y">[];
  caps: Cap[];
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [cap, setCap] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const placed: Station[] = stations.map((s) => ({ ...s, ...POS[s.slug] }));
  const lit = (s: Station) => !cap || s.capability === cap;
  const active = placed.filter(lit);

  return (
    <div>
      <div role="group" aria-label="Filter by capability" className="mb-8 flex flex-wrap gap-2">
        {[{ id: null, title: "All services" } as { id: string | null; title: string }, ...caps].map((c) => (
          <button
            key={c.title}
            type="button"
            aria-pressed={cap === c.id}
            onClick={() => setCap(c.id)}
            className="label rounded-full border border-rule px-4 py-2.5 transition-colors hover:border-coral aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {c.title}
          </button>
        ))}
      </div>

      <svg ref={ref} viewBox="0 0 1000 520" className="h-auto w-full overflow-visible" role="img" aria-label="Network map of projects by sector">
        {/* interchange */}
        <motion.rect
          x={462}
          y={244}
          width={196}
          height={72}
          rx={36}
          fill="var(--bg)"
          stroke="var(--fg)"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ transformOrigin: "560px 280px" }}
        />
        {LINES.map((l, i) => (
          <g key={l.id}>
            <motion.path
              d={l.d}
              fill="none"
              stroke={l.color}
              strokeWidth={9}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.6, delay: i * 0.18, ease: [0.7, 0, 0.2, 1] }}
            />
            <text x={l.lx} y={l.ly} className="fill-muted font-mono text-[13px] tracking-[0.14em] uppercase">
              {l.id} line
            </text>
          </g>
        ))}
        <text x={560} y={230} textAnchor="middle" className="fill-fg font-mono text-[12px] tracking-[0.2em] uppercase">
          DMIA interchange
        </text>

        {placed.map((s, i) => {
          const on = lit(s);
          return (
            <a key={s.slug} href={`/work/${s.slug}`} aria-label={s.title}>
              <motion.g
                onMouseEnter={() => setHover(s.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.slug)}
                onBlur={() => setHover(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: on ? 1 : 0.25, scale: hover === s.slug ? 1.25 : 1 } : {}}
                transition={{ delay: inView && !cap ? 0.7 + i * 0.06 : 0, type: "spring", stiffness: 300, damping: 18 }}
                style={{ transformOrigin: `${s.x}px ${s.y}px`, cursor: "pointer" }}
              >
                <circle cx={s.x} cy={s.y} r={14} fill="var(--bg)" stroke="var(--fg)" strokeWidth={4} />
                {on && cap && <circle cx={s.x} cy={s.y} r={6} fill="var(--coral)" />}
                <text
                  x={s.x}
                  y={s.below ? s.y + 38 : s.y - 28}
                  textAnchor="middle"
                  className="hidden fill-fg font-mono text-[13px] tracking-[0.06em] sm:block"
                >
                  {s.short}
                </text>
              </motion.g>
            </a>
          );
        })}
      </svg>

      <ul className="mt-8 grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {active.map((s) => (
            <motion.li
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="border-r border-b border-rule"
            >
              <a href={`/work/${s.slug}`} className="group flex h-full items-start justify-between gap-4 p-5 hover:bg-panel">
                <span>
                  <span className="label block text-muted">{s.short}</span>
                  <span className="mt-2 block leading-snug">{s.title}</span>
                </span>
                <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
