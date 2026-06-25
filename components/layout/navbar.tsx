"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tools/url-scanner", label: "URL Scanner" },
  { href: "/tools/phishing-detector", label: "Phishing" },
  { href: "/tools/password-checker", label: "Password" },
  { href: "/tools/hash-generator", label: "Hash" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus-ring rounded-lg">
            <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-accent shadow-neon-primary">
              <Shield className="h-5 w-5 text-cyber-bg" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Saad10x <span className="gradient-text">TOOL</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-ring",
                    active
                      ? "text-cyber-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/dashboard">
              <Button size="sm">Launch App</Button>
            </Link>
          </div>

          <button
            className="focus-ring rounded-lg p-2 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-x-0 border-t-0 md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-cyber-primary/10 text-cyber-primary"
                      : "text-foreground/70 hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
