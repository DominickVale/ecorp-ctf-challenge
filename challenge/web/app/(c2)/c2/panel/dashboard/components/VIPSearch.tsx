import React from "react";

import { cn } from "@/lib/utils";

interface VIPSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FrameLeft = () => (
  <svg
    className="absolute left-[-3%] top-1/3"
    width="3.2%"
    height="36%"
    viewBox="0 0 21 258"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="fill-background-light"
      d="M20.0535 0.986328C20.0535 6.29358 17.9441 11.3832 14.1897 15.1344L5.8638 23.4534C2.10944 27.2046 0 32.2942 0 37.6014V220.889C0 226.196 2.10944 231.286 5.86379 235.037L14.1897 243.356C17.9441 247.107 20.0535 252.197 20.0535 257.504V0.986328Z"
    />
  </svg>
);

const FrameRight = () => (
  <svg
    className="absolute right-[-5%] top-1/4"
    width="5%"
    height="63%"
    viewBox="0 0 28 405"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="fill-background-light"
      d="M15.4689 384.646L11.6033 386.434C4.52875 389.707 0 396.791 0 404.586V0C0 7.79484 4.52875 14.8795 11.6033 18.152L15.4689 19.9402C22.5435 23.2127 27.0723 30.2974 27.0723 38.0922V366.494C27.0723 374.289 22.5435 381.374 15.4689 384.646Z"
    />
  </svg>
);


export function VIPSearch(props: VIPSearchProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border-1 border-elements-light bg-background-light pt-1 px-8 2xl:max-w-[35vw] 3xl:max-w-[29vw]",
        props.className
      )}
    >
      <FrameLeft />
      <FrameRight />
      <div className="flex w-full items-center justify-between rounded-2xl py-2">
        <h4 className="text-md font-bold tracking-display text-background-dark">{props.title}</h4>
        <div className="h-[0.35rem] w-[0.35rem] rounded-full bg-elements-light" />
      </div>
      {props.children}
    </div>
  );
}

// <section className="absolute left-0 top-0 h-full w-20">
//   <div className="sticky top-0 h-[calc(100vh-57px)] overflow-hidden">
//             <span className="py-8 pt-16 flex flex-col justify-around place-items-center h-full">
//               <p className="h-max rotate-marquee tracking-display">
//                 ⋅&nbsp;&nbsp;CHECK OUT THE NEW NEUROTAP T-SHIRTS ON OUR SHOP
//               </p>
//             </span>
//   </div>
// </section>
