"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Search,
  AlertTriangle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { scanUrl, type UrlScanResult, type RiskVerdict } from "@/lib/url-scanner";
import { sanitizeInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreRing } from "@/components/score-ring";

const VERDICT_STYLE: Record<
  RiskVerdict,
  { badge: "success" | "warning" | "danger"; color: string; Icon: typeof ShieldCheck }
> = {
  Safe: { badge: "success", color: "#06D6A0", Icon: ShieldCheck },
  Suspicious: { badge: "warning", color: "#FFB703", Icon: ShieldAlert },
  Malicious: { badge: "danger", color: "#FF4D6D", Icon: ShieldX },
};

const SEVERITY_ICON = {
  info: Info,
  warning: AlertTriangle,
  critical: ShieldX,
} as const;

export function UrlScannerTool() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UrlScanResult | null>(null);
  const [error, setError] = useState("");

  const handleScan = () => {
    const clean = sanitizeInput(value);
    if (!clean) {
      setError("Please enter a URL to scan.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    // brief artificial delay to surface the loading state
    setTimeout(() => {
      setResult(scanUrl(clean));
      setLoading(false);
    }, 650);
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
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="https://example.com/login"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              aria-label="URL to scan"
            />
            <Button onClick={handleScan} disabled={loading} className="sm:w-40">
              <Search /> {loading ? "Scanning…" : "Scan URL"}
            </Button>
          </div>
          {error && <p className="text-sm text-cyber-danger">{error}</p>}
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-6">
              <Skeleton className="h-[140px] w-[140px] rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
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
              <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-center">
                <ScoreRing
                  value={result.score}
                  label="Security"
                  color={style.color}
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
                    {result.hostname || result.normalizedUrl}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Detailed Findings ({result.findings.length})
                </h3>
                <ul className="space-y-2">
                  {result.findings.map((f) => {
                    const Icon =
                      f.severity === "info"
                        ? CheckCircle2
                        : SEVERITY_ICON[f.severity];
                    const tone =
                      f.severity === "critical"
                        ? "text-cyber-danger"
                        : f.severity === "warning"
                        ? "text-amber-300"
                        : "text-cyber-success";
                    return (
                      <li
                        key={f.id}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {f.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {f.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
