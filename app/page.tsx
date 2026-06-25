import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Testimonials />

      {/* Final CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-cyber-primary/20 bg-gradient-to-br from-cyber-primary/10 via-cyber-surface/40 to-cyber-accent/10 p-10 text-center md:p-16">
          <div className="cyber-grid absolute inset-0 -z-10 opacity-30" />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to secure your digital life?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Jump into the dashboard and start using all four tools instantly.
            No sign-up, no cost, no data ever leaves your browser.
          </p>
          <Link href="/dashboard" className="mt-8 inline-block">
            <Button size="lg">
              Open Dashboard <ArrowRight />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
