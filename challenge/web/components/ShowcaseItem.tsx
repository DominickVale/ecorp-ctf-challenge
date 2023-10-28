import React from "react";

import { cn } from "@/lib/utils";

export type ShowcaseItem = {
  title: string;
  number: string | number;
  description: string;
};

type ShowcaseItemProps = {} & React.HTMLAttributes<HTMLDivElement> & ShowcaseItem;

const Frame = () => (
  <svg
    className="absolute right-[-1px] top-[-1rem]"
    width="392"
    height="17"
    viewBox="0 0 392 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M392 8C392 3.58172 388.418 0 384 0H35.4724L-3.76701e-05 17H392V8Z"
      className="fill-background-dark"
    />
  </svg>
);

function getPositionByNumber(number: string | number) {
  switch (number) {
    case 1:
        return "md:left-[25vw] lg:left-[45vw] md:top-[20vh]";
    case 2:
        return "md:left-[5vw] lg:left-[25vw] md:top-[30vh]";
    case 3:
        return "md:left-[15vw] lg:left-[35vw] md:top-[50vh]";
    default:
      return "md:left-[15vw] lg:left-[45vw] md:top-[20vh]"
  }
}
export function ShowcaseItem(props: ShowcaseItemProps) {
  const { title, description, number, className, ...rest } = props;
  return (
    <div className={cn("fixed md:absolute w-full h-max md:w-max md:max-w-xl left-0 bottom-0", getPositionByNumber(number))}>
      <div
        className={cn(
          "relative flex w-full h-full flex-col lg:rounded-lg lg:rounded-tr-none border border-neutral-800 bg-background-light",
          className
        )}
        {...rest}
      >
        <Frame />
        <span className="relative flex justify-between bg-background-dark px-4 py-2 text-md font-bold tracking-display text-background-light">
          <h3>{title}</h3>
          <h3 className="flex gap-3">
            {number}
            <div className="flex h-full w-6 items-center">
              <div className="h-[2px] w-full rounded-full bg-background-light" />
            </div>
          </h3>
        </span>
        <p className="p-8 bg-background-light rounded-lg">{description}</p>
      </div>
    </div>
  );
}
