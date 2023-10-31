import React, { useRef } from "react";

import { cn } from "@/lib/utils";

export interface H1Props extends React.InputHTMLAttributes<HTMLHeadingElement> {
    small?: boolean;
    smaller?: boolean;
}

export function H1({ className, small, smaller, ...props }: H1Props) {
    return (
        <h1
            className={cn(
                "font-heading text-[clamp(1.5rem,8.054vw,3.4rem)] leading-[1.18] tracking-display text-black lg:text-xl xl:text-[clamp(3.4rem,5.8vw,9.054rem)] 4xl:text-[clamp(6.854rem,4vw,11.09rem)]",
                small &&
                    "lg:text-[clamp(2.1rem,2vw,2.7rem)] xl:text-[clamp(3.4rem,4vw,3.7rem)] 3xl:text-[clamp(3rem,2.8vw,3.7rem)] 4xl:text-[clamp(4.4rem,4vw,7.09rem)]",
                smaller &&
                    "lg:text-[clamp(1.5rem,1.5vw,2rem)] xl:text-[clamp(1.8rem,5vw,3rem)] 3xl:text-[clamp(3rem,2.8vw,3.7rem)] 4xl:text-[clamp(4.4rem,4vw,7.09rem)]",
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
                "mb-4 mr-auto rounded-lg font-heading text-[clamp(1rem,17vw,1.3rem)] font-bold uppercase text-background-dark md:bg-background-dark md:px-4 md:text-base md:text-background-light",
                className
            )}
            {...props}
        />
    );
}
