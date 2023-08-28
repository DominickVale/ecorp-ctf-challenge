import React from "react";
import {cn} from "@/lib/utils";

interface SymmetricPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

export function SymmetricPanel(props: SymmetricPanelProps) {
  return (
    <div className={cn("relative rounded-xl border-1 border-elements-light bg-background-dark pt-8", props.className)}>
      <div className="absolute left-0 top-[-1rem] w-full flex justify-between items-center rounded-2xl bg-background-light px-4 py-2">
        <h4 className="text-xs font-bold tracking-display text-background-dark">{props.title}</h4>
        <div className="w-1 h-1 rounded-full bg-elements-light" />
      </div>
        {props.children}
    </div>
  );
}
