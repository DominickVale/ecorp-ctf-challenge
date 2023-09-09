import React from "react";

import { cn } from "@/lib/utils";

export interface H1Props extends React.InputHTMLAttributes<HTMLHeadingElement> {
  small?: boolean;
    smaller?: boolean;
}

export function H1({ className, small, smaller, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        "font-heading text-[clamp(1.5rem,8.054vw,3.4rem)] lg:text-xl xl:text-[clamp(3.4rem,7vw,9.054rem)] 4xl:text-[clamp(6.854rem,4vw,11.09rem)] leading-[1.18] tracking-display text-black",
        small && "lg:text-[clamp(2.1rem,2vw,2.7rem)] xl:text-[clamp(3.4rem,4vw,3.7rem)] 3xl:text-[clamp(3rem,2.8vw,3.7rem)] 4xl:text-[clamp(4.4rem,4vw,7.09rem)]",
          smaller && "lg:text-[clamp(1.5rem,1.5vw,2rem)] xl:text-[clamp(1.8rem,5vw,3rem)] 3xl:text-[clamp(3rem,2.8vw,3.7rem)] 4xl:text-[clamp(4.4rem,4vw,7.09rem)]",
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, small, ...props }: H1Props) {
  return (
    <h2
      className={cn(
        "font-heading text-[clamp(1.5rem,8.5vw,2.3rem)] leading-[1.18] tracking-wide text-background-light 2xl:text-[clamp(4.4rem,4vw,7.09rem)]",
        small && "3xl:text-[clamp(4.4rem,3vw,7.09rem)]",
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, small, ...props }: H1Props) {
    return (
        <h3
            className={cn(
                "font-heading text-[clamp(1rem,17vw,1.3rem)] md:text-base font-bold uppercase mb-4 text-background-dark md:text-background-light md:bg-background-dark mr-auto md:px-4 rounded-lg",
                className
            )}
            {...props}
        />
    );
}
