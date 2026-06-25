"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getTool } from "@/lib/tools-meta";

interface ToolPageHeaderProps {
  /** Tool slug — the icon, title, description and color are resolved on the client. */
  slug: string;
}

export function ToolPageHeader({ slug }: ToolPageHeaderProps) {
  const tool = getTool(slug);
  if (!tool) return null;
  const { icon: Icon, title, description, color } = tool;

  return (
    <div className="mb-8">
      <Link
        href="/dashboard"
        className="focus-ring mb-6 inline-flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground transition-colors hover:text-cyber-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
          style={{ background: `${color}1a`, border: `1px solid ${color}40` }}
        >
          <Icon className="h-7 w-7" style={{ color }} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}
