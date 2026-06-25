"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hash, Trash2, Loader2 } from "lucide-react";
import {
  generateAllHashes,
  HASH_ALGOS,
  type HashAlgo,
} from "@/lib/hash";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

const EMPTY: Record<HashAlgo, string> = {
  MD5: "",
  SHA1: "",
  SHA256: "",
  SHA512: "",
};

const ALGO_COLORS: Record<HashAlgo, string> = {
  MD5: "#FF4D6D",
  SHA1: "#FFB703",
  SHA256: "#00B4D8",
  SHA512: "#06D6A0",
};

export function HashGeneratorTool() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<HashAlgo, string>>(EMPTY);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    if (!text) {
      setHashes(EMPTY);
      return;
    }
    setBusy(true);
    generateAllHashes(text).then((res) => {
      if (active) {
        setHashes(res);
        setBusy(false);
      }
    });
    return () => {
      active = false;
    };
  }, [text]);

  const handleClear = () => {
    setText("");
    setHashes(EMPTY);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <label
            htmlFor="hash-input"
            className="text-sm font-medium text-foreground/90"
          >
            Input text
          </label>
          <textarea
            id="hash-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text to hash…"
            rows={4}
            spellCheck={false}
            className="flex w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-ring focus-visible:border-cyber-primary/60"
          />
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              {busy ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Hash className="h-3.5 w-3.5" /> {text.length} characters
                </>
              )}
            </span>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {HASH_ALGOS.map((algo, idx) => (
          <motion.div
            key={algo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="flex w-24 shrink-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: ALGO_COLORS[algo] }}
                  />
                  <span className="font-mono text-sm font-semibold">{algo}</span>
                </div>
                <code className="min-w-0 flex-1 break-all rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-foreground/80">
                  {hashes[algo] || (
                    <span className="text-muted-foreground">
                      Awaiting input…
                    </span>
                  )}
                </code>
                <CopyButton value={hashes[algo]} disabled={!hashes[algo]} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
