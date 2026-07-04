import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Monochrome: skarpa hörn, mono-versaler, linje/inversion — aldrig pill
  "inline-flex items-center rounded-none border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest font-medium transition-colors focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-foreground focus-visible:outline-offset-2",
  { variants: { variant: { default: "border-foreground bg-foreground text-background",
        secondary: "border-foreground bg-muted text-foreground",
        destructive: "border-foreground bg-foreground text-background",
        outline: "border-foreground text-foreground bg-transparent",
      },
    },
    defaultVariants: { variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
