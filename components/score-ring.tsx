"use client";

import { motion } from "framer-motion";

interface ScoreRingProps {
  /** 0..100 */
  value: number;
  label?: string;
  size?: number;
  color?: string;
  trackColor?: string;
  suffix?: string;
}

/** Animated circular score gauge. */
export function ScoreRing({
  value,
  label,
  size = 140,
  color = "#00F5D4",
  trackColor = "rgba(255,255,255,0.08)",
  suffix = "",
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold" style={{ color }}>
          {Math.round(clamped)}
          {suffix}
        </span>
        {label && (
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
