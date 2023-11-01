import React from "react";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";

interface NewsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    o: "left" | "right";
}

const Frame = ({ o }: { o: "left" | "right" }) => (
    <svg
        className={cn("absolute top-[-1rem]", o === "left" ? " left-0" : "right-0 scale-x-[-1]")}
        width="280"
        height="16"
        viewBox="0 0 280 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            className="fill-background-light"
            d="M0 16H279.332C275.689 15.1695 272.319 13.3268 269.635 10.6421L264.85 5.85786C261.1 2.10713 256.013 0 250.708 0H16.4926C7.54713 0 0.264332 7.11861 0 16Z"
        />
    </svg>
);

const NewsElement = ({
    date,
    important,
    content,
}: {
    date: string;
    content: string;
    important?: boolean;
}) => (
    <div className="flex w-max items-center justify-between gap-2">
        <b className="text-xs font-bold text-neutral-500">{date}</b>
        <p className="text-xs text-neutral-400">{content}</p>
        {important && <b className="text-xs font-bold text-background-dark">!-- IMPORTANT --!</b>}
    </div>
);

export function NewsPanel(props: NewsPanelProps) {
    return (
        <div
            className={cn(
                "relative w-max min-w-[37rem] rounded-xl bg-background-light pt-8",
                props.o === "left" ? "rounded-tl-none " : "rounded-tr-none",
                props.className
            )}
        >
            <Frame o={props.o} />
            <div
                className={cn(
                    "absolute top-[-1rem] flex w-[42%] items-center py-1 pl-7",
                    props.o === "left" ? "left-0" : "right-0 pr-0"
                )}
            >
                <h4
                    className={cn(
                        "text-md font-bold tracking-display text-background-dark",
                        props.o === "left" ? "mr-10" : "mr-9"
                    )}
                >
                    {props.o === "left" ? "INTERNAL" : "EXTERNAL"}&nbsp;NEWS
                </h4>
                <div className="h-[0.35rem] w-[0.35rem] rounded-full bg-elements-light" />
            </div>
            <div className="mx-6 mb-2 flex flex-col gap-1">
                <NewsElement
                    date="06/11/2030"
                    content="Level 0 panel is WIP with ETA Q4."
                    important
                />
                { props.o === "left" ? (
                  <NewsElement
                      date="05/11/2030"
                      content="Neurotap giveaway events planned next week. Increase emotional m. idx."
                      important
                  />
                    ) :
                  (
                  <NewsElement
                      date="25/10/2030"
                      content="Level 1 user search functionality is still WIP due to bugs."
                  />
                  )
                }
                <NewsElement
                    date="24/10/2030"
                    content="Make sure to join us for the security brief. (Monday to tuesday)"
                />
            </div>
            <div className="relative mb-2">
                <div className="relative mt-4 w-full">
                    <Line
                        o="bottom"
                        isBg={false}
                        className="mx-auto h-[2px] w-[50%] bg-elements-light"
                    />
                </div>
            </div>
        </div>
    );
}
