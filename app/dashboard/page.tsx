import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { TOOLS } from "@/lib/tools-meta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access all Saad10x TOOL security utilities in one place.",
};

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="container py-12">
        <div className="mb-10">
          <Badge variant="default" className="mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Security Dashboard
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your security <span className="gradient-text">command center</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick a tool to get started. Every utility runs locally in your
            browser — nothing is uploaded, logged or tracked.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.slug}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-cyber-primary/40"
              >
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl transition-transform group-hover:scale-110"
                      style={{
                        background: `${tool.color}1a`,
                        border: `1px solid ${tool.color}40`,
                      }}
                    >
                      <Icon className="h-7 w-7" style={{ color: tool.color }} />
                    </span>
                    <Badge variant="outline">{tool.short}</Badge>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{tool.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <Link href={tool.href}>
                      <Button className="w-full">
                        Open {tool.title} <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
