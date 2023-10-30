"use client"

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap"

type PageTransitionProps = {} & React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>;

function PageTransition(props: PageTransitionProps) {
    const { children, ...rest } = props;
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {});

        ctx.add("show", () => {
            console.log("HIDING");
            gsap.timeline().to(ctx.selector?.('[data-animate-opacity="true"]'), {
                opacity: 1,
                duration: 0.5,
                stagger: 0.2,
                ease: "power4.in",
            });
        });
        ctx.add("hide", () => {
            console.log("HIDING");
            gsap.timeline().to(ctx.selector?.('[data-animate-opacity="true"]'), {
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power4.in",
            });
        });
        return () => ctx.revert();
    }, []);
    return <div ref={comp} {...rest}>{children}</div>;
}

export default PageTransition;
