import React from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";

import Button from "@/components/buttons/button";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { H1 } from "@/components/typography";

interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <section className="relative min-h-screen grid-cols-golden grid-rows-golden px-6 md:px-0 lg:grid">
      <GoldenLayoutLines />
      <div className="mx-auto mt-14 sm:max-w-[80vw] md:mx-14 md:mt-28 xl:ml-32">
        <H1>
          TRANSCEND
          <br />
          ORDINARY&nbsp;\\
          <br />
          EVOLVE
        </H1>
        <p className="mt-12 max-w-2xl text-sm font-light leading-tight sm:text-base md:mt-20 md:leading-9">
          E-Corp pioneers the convergence of mind and machine, unleashing the limitless potential
          within each individual. With Neurotap, we revolutionize human experiences, and shape a
          future beyond imagination.
        </p>
        <Button className="mt-14 hidden md:block">ORDER NOW</Button>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 col-span-2 col-start-2 h-full w-full md:relative">
        <Image
          className="absolute right-0 top-[15vh] hidden mix-blend-darken md:block lg:right-4 lg:top-8 lg:scale-150 xl:left-[-14.6%] xl:top-[13vh] 3xl:scale-125"
          src={brainProto}
          alt="brain-proto"
        />
        <div className="fixed left-0 top-0 flex h-[25vh] w-screen justify-center mix-blend-darken md:hidden">
          <div className="relative h-full w-full">
            <Image className="object-contain" fill src={brainProto} alt="brain-proto" />
          </div>
        </div>
      </div>
      <div className="col-start-2 row-start-2 mt-16 flex place-items-center justify-center">
        <span className="">SCROLL</span>
      </div>
    </section>
  );
}
