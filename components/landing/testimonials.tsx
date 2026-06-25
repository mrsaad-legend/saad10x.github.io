"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Security Engineer",
    avatar: "AK",
    quote:
      "The phishing detector is shockingly good for a free, client-side tool. I use it daily to triage suspicious links before opening them.",
  },
  {
    name: "Daniel Roberts",
    role: "Full-Stack Developer",
    avatar: "DR",
    quote:
      "Clean UI, instant hashes, and a password meter that actually explains itself. This is the polish I expect from paid products.",
  },
  {
    name: "Maria Santos",
    role: "CS Student",
    avatar: "MS",
    quote:
      "Perfect for learning. The detailed findings taught me more about URL anatomy than my entire intro security course.",
  },
];

export function Testimonials() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by <span className="gradient-text">builders & defenders</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Developers, students and security teams rely on Saad10x TOOL every day.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <Quote className="h-7 w-7 text-cyber-primary/60" />
                <p className="flex-1 text-sm text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-cyber-primary text-cyber-primary"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyber-primary to-cyber-accent text-sm font-bold text-cyber-bg">
                    {t.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
