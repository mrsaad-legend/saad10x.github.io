"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TOOLS } from "@/lib/tools-meta";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Four powerful tools, <span className="gradient-text">one toolkit</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Everything a developer, student or security enthusiast needs to stay
          safe online — fast, free and private.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link href={tool.href} className="group block h-full">
                <Card className="h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-cyber-primary/40">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        background: `${tool.color}1a`,
                        border: `1px solid ${tool.color}40`,
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: tool.color }} />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold">{tool.title}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-cyber-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                    <ul className="mt-auto space-y-1.5 pt-2">
                      {tool.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs text-foreground/70"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: tool.color }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
