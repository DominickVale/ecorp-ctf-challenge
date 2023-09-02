import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, children, ...props }, ref) => {
    return (
      <div className="relative min-w-[10rem] w-full">
          {children}
        <input
          type={type}
          className={cn(
            // dark is default for now, change it
            "focus-visible:ring-ring tracking-wide flex h-14 w-full rounded-md border border-elements-light bg-background-dark px-3 py-1 text-sm font-normal text-stone-300 shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            theme === "light" && "border-b-background-dark bg-opacity-5 text-background-dark placeholder-neutral-500 tracking-display text-xs",
            children && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
