import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyber-primary to-cyber-secondary text-cyber-bg shadow-neon-primary hover:shadow-[0_0_28px_rgba(0,245,212,0.65)] hover:-translate-y-0.5",
        accent:
          "bg-gradient-to-r from-cyber-accent to-cyber-secondary text-white shadow-neon-accent hover:-translate-y-0.5",
        outline:
          "border border-cyber-primary/40 bg-white/5 text-cyber-primary hover:bg-cyber-primary/10 hover:border-cyber-primary",
        ghost: "text-foreground/80 hover:bg-white/5 hover:text-foreground",
        danger:
          "bg-gradient-to-r from-cyber-danger to-[#c9184a] text-white shadow-neon-danger hover:-translate-y-0.5",
        secondary:
          "glass text-foreground hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
