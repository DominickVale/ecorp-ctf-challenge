import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const lineVariants = cva("relative rounded-full will-change-transform", {
  variants: {
    o: {
      top: "h-[1px] w-full origin-left",
      bottom: "h-[1px] w-full origin-left",
      left: "w-[1px] h-full origin-top",
      right: "w-[1px] h-full origin-top",
    },
    isBg: {
      true: "absolute bg-gray-500 z-[-1]",
    },
    dark: {
      true: "bg-elements-lightest",
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

export const Line = React.forwardRef<HTMLDivElement, LinesProps>((props, ref) => {
  const { o, isBg, dark, light, className, ...rest } = props;

  return <div className={cn(lineVariants({ o, isBg, dark, light }),className)} {...rest} ref={ref}/>;
})
