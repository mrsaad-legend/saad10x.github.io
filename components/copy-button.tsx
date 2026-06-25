"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({
  value,
  label,
  className,
  variant = "outline",
  size = "icon",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={label ? size === "icon" ? "sm" : size : size}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(className)}
      {...props}
    >
      {copied ? (
        <Check className="text-cyber-success" />
      ) : (
        <Copy />
      )}
      {label && <span>{copied ? "Copied" : label}</span>}
    </Button>
  );
}
