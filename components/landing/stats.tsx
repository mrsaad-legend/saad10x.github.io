"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Zap, Lock, Code2 } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  Icon: typeof ShieldCheck;
  color: string;
}

const STATS: Stat[] = [
  { label: "Security Tools", value: 4, suffix: "", Icon: ShieldCheck, color: "#00F5D4" },
  { label: "Client-Side", value: 100, suffix: "%", Icon: Lock, color: "#06D6A0" },
  { label: "Avg. Scan Time", value: 800, suffix: "ms", Icon: Zap, color: "#00B4D8" },
  { label: "Cost To Use", value: 0, suffix: "$", Icon: Code2, color: "#7B2CBF" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="container py-16">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span
              className="grid h-12 w-12 place-items-center rounded-xl"
              style={{ background: `${stat.color}1a`, color: stat.color }}
            >
              <stat.Icon className="h-6 w-6" />
            </span>
            <span
              className="text-4xl font-extrabold"
              style={{ color: stat.color }}
            >
              <Counter to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
