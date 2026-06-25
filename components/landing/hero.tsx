"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="cyber-grid absolute inset-0 -z-10 opacity-40" />
      <div className="container flex flex-col items-center py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="default" className="mb-6">
            <Sparkles className="h-3.5 w-3.5" /> 100% Free & Open-Source
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          The all-in-one{" "}
          <span className="gradient-text neon-text">cybersecurity</span> toolkit
          for the modern web
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          Scan URLs, detect phishing, audit password strength and generate
          cryptographic hashes — all running privately in your browser. No
          tracking, no accounts, no cost.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Launch Dashboard <ArrowRight />
            </Button>
          </Link>
          <Link href="/tools/url-scanner">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <ShieldCheck /> Try URL Scanner
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Lock className="h-4 w-4 text-cyber-success" />
          Privacy-first · Everything runs client-side
        </motion.div>

        {/* Floating shield illustration */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none relative mt-16 grid place-items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute h-56 w-56 rounded-full bg-cyber-primary/20 blur-3xl" />
          <motion.div
            className="animate-float glass-strong relative grid h-40 w-40 place-items-center rounded-3xl"
            style={{ boxShadow: "0 0 60px rgba(0,245,212,0.25)" }}
          >
            <ShieldCheck className="h-20 w-20 text-cyber-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
