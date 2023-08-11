import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "display" | "sm";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, type, ...props }, ref) => {
    return (
      <button
        className={cn(
          "items-center justify-center text-center text-white duration-200 bg-black border-2 border-black rounded-xl inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black font-bold tracking-action",
          {
            "opacity-50 cursor-not-allowed": props.disabled,
          },
          {
            "w-96 h-20 text-sm": props.variant === "display",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
