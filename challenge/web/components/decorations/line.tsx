import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const lineVariants = cva("relative rounded-full", {
  variants: {
    o: {
      top: "h-[1px] w-full",
      bottom: "h-[1px] w-full",
      left: "w-[1px] h-full",
      right: "w-[1px] h-full",
    },
    isBg: {
      true: "absolute bg-gray-500 opacity-60 z-[-1]",
    },
    dark: {
      true: "bg-elements-light",
    },
    light: {
      true: "bg-background-light",
    },
  },
  defaultVariants: {
    o: "top",
    isBg: true,
    dark: true,
  },
  compoundVariants: [
    {
      o: "top",
      isBg: true,
      className: "top-0",
    },
    {
      o: "bottom",
      isBg: true,
      className: "bottom-0",
    },
    {
      o: "left",
      isBg: true,
      className: "left-0",
    },
    {
      o: "right",
      isBg: true,
      className: "right-0",
    },
  ],
});

interface LinesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lineVariants> {}

export function Line(props: LinesProps) {
  const { o, isBg, dark, light } = props;

  return <div className={cn(lineVariants({ o, isBg, dark, light }), props.className)} />;
}
