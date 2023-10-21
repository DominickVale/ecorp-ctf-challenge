import React from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";

import Button from "@/components/buttons/button";
import ScrollIndicator from "@/components/decorations/scroll-indicator";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { H1 } from "@/components/typography";
import BrainBackground from "@/components/Brain";

interface HeroProps {}

export function Hero(props: HeroProps) {
    return (
        <section
            className="relative min-h-screen grid-cols-golden grid-rows-golden px-6 md:px-0 lg:grid"
            id="hero"
        >
            <GoldenLayoutLines />
            <div className="mx-auto mt-14 sm:max-w-[80vw] md:mx-14 md:ml-32 md:mt-[8vh]">
                <H1>
                    TRANSCEND
                    <br />
                    ORDINARY&nbsp;\\
                    <br />
                    EVOLVE
                </H1>
                <p className="mt-12 max-w-2xl text-sm font-light leading-tight sm:text-md md:mt-[6vh] 2xl:text-base 2xl:leading-9">
                    E-Corp pioneers the convergence of mind and machine, unleashing the limitless
                    potential within each individual. With Neurotap, we revolutionize human
                    experiences, and shape a future beyond imagination.
                </p>
                <Button className="mt-14 hidden md:block">ORDER NOW</Button>
            </div>
            <div className="col-start-2 row-start-2 mt-16 flex place-items-center justify-center">
                <ScrollIndicator />
            </div>
        </section>
    );
}
