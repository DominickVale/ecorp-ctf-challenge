import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "items-center justify-center text-center duration-500 rounded-2xl inline-flex text-sm font-bold tracking-action transition-all",
  {
    variants: {
      variant: {
        default: "",
      },
      theme: {
        light:
          "bg-background-light text-background-dark hover:enabled:bg-background-dark hover:enabled:text-background-light",
        dark: "bg-background-dark text-background-light hover:enabled:bg-background-light hover:enabled:text-background-dark",
        neon: "bg-background-light text-background-dark hover:enabled:bg-background-dark hover:enabled:text-background-light shadow-neon-white",
      },
      size: {
        sm: "w-full text-xs font-bold min-w-max px-3 py-1 outline outline-background-light outline-1 tracking-wide",
        display: "w-96 h-20 text-sm",
        fluid: "h-auto w-full",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed shadow-none",
      },
      destructive: {
        true: "outline outline-red-500 text-red-500 hover:enabled:bg-red-500 hover:enabled:text-background-dark",
      },
    },
    defaultVariants: {
      variant: "default",
      theme: "dark",
      size: "display",
    },
    compoundVariants: [
      {
        theme: "neon",
        disabled: true,
        className: "hover:bg-background-light hover:text-background-dark shadow-none",
      },
    ],
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, disabled, size, theme, destructive, ...rest } = props;
  return (
    <button
      className={cn(className, buttonVariants({ variant, disabled, size, theme, destructive }))}
      ref={ref}
      disabled={!!disabled}
      {...rest}
    />
  );
});
Button.displayName = "Button";

export default Button;
