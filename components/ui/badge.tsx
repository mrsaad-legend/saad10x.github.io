import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-cyber-primary/40 bg-cyber-primary/10 text-cyber-primary",
        secondary:
          "border-cyber-secondary/40 bg-cyber-secondary/10 text-cyber-secondary",
        accent: "border-cyber-accent/40 bg-cyber-accent/15 text-[#c77dff]",
        success: "border-cyber-success/40 bg-cyber-success/10 text-cyber-success",
        warning: "border-amber-400/40 bg-amber-400/10 text-amber-300",
        danger: "border-cyber-danger/40 bg-cyber-danger/10 text-cyber-danger",
        outline: "border-white/15 text-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
