import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-accent text-accent-foreground shadow hover:bg-accent/90",
      outline:
        "border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent",
      ghost: "hover:bg-accent/10 hover:text-accent",
      glass: "glass hover:bg-white/20 dark:hover:bg-white/10 text-foreground",
    };

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-8 rounded-full px-4 text-xs",
      lg: "h-12 rounded-full px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
