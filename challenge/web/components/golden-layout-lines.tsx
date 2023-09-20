"use client";

import React, { useLayoutEffect, useRef } from "react";
import { usePageFromPathname } from "@/common/hooks";
import gsap from 'gsap'

import { Line } from "@/components/decorations/line";
import { cn } from "@/lib/utils";
import { useIsUiLoaded } from "./preloader/preloader.hooks";

interface LayoutLinesProps extends React.HTMLAttributes<HTMLDivElement> { }

export function GoldenLayoutLines(props: LayoutLinesProps) {
  const { className, ...rest } = props
  const page = usePageFromPathname();

  const isUiLoaded = useIsUiLoaded();

  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);

  const isBlog = page === "blog"
  const isBlogPost = page === "blog-post"

  useLayoutEffect(() => {
    if (!isUiLoaded) return
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({})
      tl.fromTo(
        line1.current,
        { scaleY: 0 },
        {
          duration: 2.5,
          scaleY: 1,
          ease: "power4.inOut",
        }
      ).fromTo(
        line2.current,
        { scaleX: 0 },
        {
          duration: 1,
          scaleX: 1,
          ease: "power4.inOut",
        }, "<40%"
      ).fromTo(
        line3.current,
        { scaleY: 0 },
        {
          duration: 1,
          scaleY: 1,
          ease: "power4.inOut",
        }, "<30%"
      )
    });
    return () => ctx.revert(); // <- Cleanup!
  }, [isUiLoaded])

  return (
    <div className={cn("hidden lg:block layout-lines-1 pointer-events-none absolute h-full w-full overflow-hidden", className)} {...rest}>
      <Line o="right" className="left-[61.8%] scale-y-0" ref={line1} />
      <Line o="bottom" className={cn("right-0 top-[calc(61.8vh-57px)] w-[38.2%] scale-x-0", isBlog && "hidden 2xl:block", isBlogPost && "hidden")} ref={line2} />

      <Line o="right" className={cn("hidden left-[76.39999999999%] top-[calc(61.8vh-57px)] scale-y-0", ( isBlog || isBlogPost ) ? "hidden" : "lg:block")} ref={line3} />

    </div>
  );
}
