"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Fish,
  XCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import {
  detectPhishing,
  type PhishingResult,
  type PhishingVerdict,
} from "@/lib/phishing";
import { sanitizeInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreRing } from "@/components/score-ring";

const VERDICT_STYLE: Record<
  PhishingVerdict,
  { badge: "success" | "warning" | "danger"; color: string; Icon: typeof ShieldCheck }
> = {
  Legitimate: { badge: "success", color: "#06D6A0", Icon: ShieldCheck },
  "Potential Phishing": { badge: "warning", color: "#FFB703", Icon: ShieldAlert },
  "High Risk": { badge: "danger", color: "#FF4D6D", Icon: ShieldX },
};

export function PhishingDetectorTool() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    const clean = sanitizeInput(value);
    if (!clean) {
      setError("Please enter a URL to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(detectPhishing(clean));
      setLoading(false);
    }, 800);
  };

  const style = result ? VERDICT_STYLE[result.verdict] : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="http://paypa1-secure-login.example.com"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              aria-label="URL to analyze"
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              variant="accent"
              className="sm:w-44"
            >
              <Fish /> {loading ? "Analyzing…" : "Detect Phishing"}
            </Button>
          </div>
          {error && <p className="text-sm text-cyber-danger">{error}</p>}
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2 text-sm text-cyber-secondary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-secondary" />
              Running AI phishing analysis…
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}

      <AnimatePresence>
        {result && style && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
                <ScoreRing
                  value={result.confidence}
                  label="Phishing"
                  color={style.color}
                  suffix="%"
                />
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <style.Icon
                      className="h-6 w-6"
                      style={{ color: style.color }}
                    />
                    <Badge variant={style.badge}>{result.verdict}</Badge>
                  </div>
                  <p className="break-all font-mono text-sm text-foreground/80">
                    {result.hostname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Confidence this URL is phishing:{" "}
                    <span className="font-semibold" style={{ color: style.color }}>
                      {result.confidence}%
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="space-y-3 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Reasons Detected
                  </h3>
                  <ul className="space-y-2">
                    {result.reasons.map((r) => (
                      <li key={r.id} className="flex items-start gap-3">
                        {r.type === "positive" ? (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyber-success" />
                        ) : (
                          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyber-danger" />
                        )}
                        <span className="text-sm text-foreground/85">
                          {r.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-3 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Security Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-cyber-primary" />
                        <span className="text-sm text-foreground/85">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
