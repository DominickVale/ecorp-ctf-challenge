"use client";

import React from "react";
import { usePageFromPathname } from "@/common/hooks";

import { Line } from "@/components/decorations/line";
import {cn} from "@/lib/utils";

interface LayoutLinesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LayoutLines(props: LayoutLinesProps) {
    const { className, ...rest} = props
  const page = usePageFromPathname();

    const isBlog = page === "blog"
    const isBlogPost= page === "blog-post"

  return (
    <div className={cn("hidden lg:block layout-lines-1 pointer-events-none absolute h-full w-full overflow-hidden", className)} {...rest}>
      <Line o="right" className="left-[61.8%]" />
      {!isBlog && !isBlogPost && (
        <Line o="right" className="hidden left-[76.39999999999%] top-[calc(61.8vh-57px)] lg:block" />
      )}
      {!isBlogPost && ( <Line o="bottom" className={cn("right-0 top-[calc(61.8vh-57px)] w-[38.2%]", isBlog && "hidden 2xl:block")}/>  )}
    </div>
  );
}
