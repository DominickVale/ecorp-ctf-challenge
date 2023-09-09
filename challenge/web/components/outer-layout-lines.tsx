"use client";

import React, { useLayoutEffect, useRef } from "react";
import { usePageFromPathname } from "@/common/hooks";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";

interface OuterLayoutLinesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OuterLayoutLines(props: OuterLayoutLinesProps) {
  const { className, ...rest } = props;
  const page = usePageFromPathname();

  const comp = useRef<HTMLDivElement>(null);

  const isBlog = page === "blog";
  const isBlogPost = page === "blog-post";

  useLayoutEffect(() => {
    const ctx = gsap.context(
      (self) => {
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
  }, []);

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
      {/*<Line o="right" className="left-[61.8%]" ref={line1} />*/}
      {/*{!isBlogPost && ( <Line o="bottom" className={cn("right-0 top-[calc(61.8vh-57px)] w-[38.2%]", isBlog && "hidden 2xl:block")}  ref={line2} />  )}*/}
      {/*  {!isBlog && !isBlogPost && (*/}
      {/*      <Line o="right" className="hidden left-[76.39999999999%] top-[calc(61.8vh-57px)] lg:block" ref={line3} />*/}
      {/*  )}*/}
    </div>
  );
}
