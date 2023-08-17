"use client";

import React from "react";
import { usePageFromPathname } from "@/common/hooks";

import { Line } from "@/components/decorations/line";

interface LayoutLinesProps {}

export function LayoutLines(props: LayoutLinesProps) {
  const page = usePageFromPathname();

  return (
    <div className="layout-lines-1 pointer-events-none absolute h-full w-full overflow-hidden">
      <Line o="right" className="left-[61.8%]" />
      {page !== "blog" && (
        <Line o="right" className="left-[76.39999999999%] top-[calc(61.8vh-57px)]" />
      )}
      <Line o="bottom" className="right-0 top-[calc(61.8vh-57px)] w-[38.2%]" />
    </div>
  );
}
