"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";
import { useIsUiLoaded } from "./preloader/preloader.hooks";

interface OuterLayoutLinesProps extends React.HTMLAttributes<HTMLDivElement> { }

export function OuterLayoutLines(props: OuterLayoutLinesProps) {
  const { className, ...rest } = props;
  const isUiLoaded = useIsUiLoaded();

  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isUiLoaded) return
    const ctx = gsap.context(
      () => {
        const tl = gsap.timeline({});
        tl.to(".outer-line-left", {
          duration: 2.5,
          scaleY: 1,
          ease: "power4.inOut",
        })
          .to(
            ".outer-line-top",
            {
              duration: 2.5,
              scaleX: 1,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            ".outer-line-right",
            {
              duration: 2.5,
              scaleY: 1,
              ease: "power4.inOut",
            },
            ""
          );
      },
      [comp]
    );
    return () => ctx.revert(); // <- Cleanup!
  }, [isUiLoaded])

  //@todo change 50px to 80px for coherence
  return (
    <div
      className={cn(
        "layout-lines-1 pointer-events-none absolute z-10 hidden h-full w-full overflow-hidden md:block",
        className
      )}
      {...rest}
      ref={comp}
    >
      <Line o="left" className="outer-line-1 outer-line-left left-0 scale-y-0" />
      <Line o="left" className="outer-line-left left-[80px] scale-y-0" />
      <Line o="top" className="outer-line-top left-0 top-[57px] scale-x-0" />
      <Line o="right" className="outer-line-right right-[80px] scale-y-0" />
      <Line o="right" className="outer-line-right right-0 scale-y-0" />
    </div>
  );
}
