import React from "react";

import { cn } from "@/lib/utils";

export interface H1Props extends React.InputHTMLAttributes<HTMLHeadingElement> {
    small?: boolean;
}

export function H1({ className, small, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        "font-heading text-2xl leading-[1.18] tracking-display text-black 3xl:text-[clamp(6.854rem,6vw,11.09rem)]",
        small && "text-xl 3xl:text-[clamp(4.4,3vw,7.09rem)]",
        className
      )}
      {...props}
    />
  );
}
