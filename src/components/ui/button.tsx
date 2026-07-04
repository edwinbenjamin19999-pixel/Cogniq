import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * MINIMALIST MONOCHROME: svartvitt, skarpa hörn, inversions-hover.
 * Etiketter i mono/versaler med brett spärr. Rörelse: omedelbar (100ms).
 * Fokus = 3px svart outline med offset.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-xs uppercase tracking-widest font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-foreground focus-visible:outline-offset-[3px] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  { variants: { variant: {
        // Solid svart → inverterar till vit med svart kant
        default: "bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground",
        destructive: "bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground",
        // Outline → fylls svart
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-muted text-foreground border-2 border-transparent hover:border-foreground",
        ghost: "text-foreground hover:underline underline-offset-4 decoration-2",
        link: "text-foreground underline-offset-4 hover:underline normal-case tracking-normal font-serif",
        chip: "border border-foreground bg-transparent text-foreground normal-case tracking-normal hover:bg-foreground hover:text-background",
        hero: "bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground text-sm",
        glass: "bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground",
      },
      size: { default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
