"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0..100
  className?: string;
  indicatorClassName?: string;
}

/** Animated progress / meter bar. */
export function Progress({
  value,
  className,
  indicatorClassName,
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-white/10",
        className
      )}
    >
      <motion.div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary",
          indicatorClassName
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
