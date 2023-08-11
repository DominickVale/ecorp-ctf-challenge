import React from "react";

import { cn } from "@/lib/utils";

interface LinesProps extends React.HTMLAttributes<HTMLDivElement> {
  o: "top" | "bottom" | "left" | "right";
}

export function Line(props: LinesProps) {
  const { o } = props;

  return (
    <div
      className={cn(
        "bg-gray-500 absolute opacity-60 z-[-1]",
        { "h-[1px] w-full": o === "top" || o === "bottom" },
        { "w-[1px] h-full": o === "left" || o === "right" },
        { "top-0": o === "top" },
        { "bottom-0": o === "bottom" },
        { "left-0": o === "left" },
        { "right-0": o === "right" },
        props.className
      )}
    />
  );
}
