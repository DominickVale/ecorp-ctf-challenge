import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
}

const MagnifyingGlass = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4.5" stroke="#181818" />
    <rect x="9" y="6" width="8" height="2" transform="rotate(30 9 6)" fill="#181818" />
  </svg>
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute left-0 top-0 flex h-full w-10 items-center justify-center">
          <MagnifyingGlass />
        </div>
        <input
          type={type}
          className={cn(
            // dark is default for now, change it
            "focus-visible:ring-ring tracking-wide flex h-14 w-full rounded-md border border-elements-light bg-background-dark px-3 py-1 text-sm font-normal text-stone-300 shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
            theme === "light" && "border-b-background-dark bg-opacity-5 text-background-dark placeholder-neutral-500 tracking-display text-xs",
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
