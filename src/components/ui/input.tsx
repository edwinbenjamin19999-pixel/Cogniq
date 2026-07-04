import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => { return (
      <input
        type={type}
        className={cn(
          // Monochrome: vit yta, svart 2px-kant som tjocknar till 3px vid fokus (ingen ring)
          "flex h-11 w-full rounded-none border-2 border-foreground bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:italic focus-visible:outline-none focus-visible:border-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-100",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
