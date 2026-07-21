import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire/50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-navy text-white shadow-ambient hover:-translate-y-0.5 hover:bg-navy-light hover:shadow-[0_10px_28px_-6px_rgba(37,99,235,0.45)]",
        accent:
          "bg-sapphire text-white shadow-ambient hover:-translate-y-0.5 hover:bg-sapphire-light hover:glow-sapphire",
        outline:
          "border-2 border-gray bg-white text-navy hover:-translate-y-0.5 hover:border-sapphire hover:bg-sapphire/5",
        ghost: "text-navy hover:bg-navy/5",
        success:
          "bg-success text-white shadow-ambient hover:-translate-y-0.5 hover:brightness-110 hover:glow-emerald",
        amber:
          "bg-amber text-white shadow-ambient hover:-translate-y-0.5 hover:brightness-105 hover:glow-amber",
        link: "text-sapphire underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-base",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
