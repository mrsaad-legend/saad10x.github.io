"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X, Lock, Lightbulb, Timer } from "lucide-react";
import {
  analyzePassword,
  type StrengthLabel,
  type PasswordChecks,
} from "@/lib/password";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LABEL_META: Record<
  StrengthLabel,
  { color: string; badge: "danger" | "warning" | "secondary" | "success" }
> = {
  Weak: { color: "#FF4D6D", badge: "danger" },
  Medium: { color: "#FFB703", badge: "warning" },
  Strong: { color: "#00B4D8", badge: "secondary" },
  "Very Strong": { color: "#06D6A0", badge: "success" },
};

const CHECK_LABELS: Record<keyof PasswordChecks, string> = {
  length: "At least 12 characters",
  uppercase: "Uppercase letter (A-Z)",
  lowercase: "Lowercase letter (a-z)",
  numbers: "Number (0-9)",
  symbols: "Symbol (!@#$…)",
  noCommonPattern: "No common patterns",
};

export function PasswordCheckerTool() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const result = useMemo(() => analyzePassword(password), [password]);
  const meta = LABEL_META[result.label];
  const hasInput = password.length > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password to test its strength…"
              autoComplete="new-password"
              spellCheck={false}
              aria-label="Password to analyze"
              className="px-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Animated strength meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Strength
              </span>
              {hasInput && (
                <Badge variant={meta.badge}>{result.label}</Badge>
              )}
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
                  boxShadow: hasInput ? `0 0 14px ${meta.color}` : "none",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Score: {result.score}/100</span>
              <span>Entropy: {result.entropyBits} bits</span>
            </div>
          </div>

          <p className="rounded-lg border border-cyber-success/20 bg-cyber-success/5 px-3 py-2 text-xs text-cyber-success">
            🔒 Your password is analyzed entirely in your browser and is never
            stored or transmitted.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Requirements
            </h3>
            <ul className="space-y-2">
              {(Object.keys(CHECK_LABELS) as (keyof PasswordChecks)[]).map(
                (key) => {
                  const passed = result.checks[key];
                  return (
                    <li key={key} className="flex items-center gap-3">
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full ${
                          passed
                            ? "bg-cyber-success/15 text-cyber-success"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {passed ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span
                        className={`text-sm ${
                          passed ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {CHECK_LABELS[key]}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <Timer className="h-5 w-5 text-cyber-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Estimated offline crack time
                </p>
                <p className="font-semibold text-foreground">
                  {hasInput ? result.crackTime : "—"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Suggestions
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-cyber-primary" />
                    <span className="text-sm text-foreground/85">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
