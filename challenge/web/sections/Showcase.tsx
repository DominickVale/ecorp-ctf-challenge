"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import photo1 from "@/assets/images/device1.png";
import photo2 from "@/assets/images/device2.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface ShowcaseProps {}

export function Showcase(props: ShowcaseProps) {
  const image1 = useRef(null);
  const image2 = useRef(null);
  const comp = useRef(null);

  useLayoutEffect(() => {
    // const ctx = gsap.context((self) => {
    //   // animate with gsap
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: comp.current,
    //       start: "top top",
    //       end: "bottom center",
    //       scrub: true,
    //       markers: true,
    //       pin: true,
    //     },
    //   });
    //   tl.fromTo(
    //     image2.current,
    //     {
    //       y: "100vh",
    //     },
    //     {
    //       ease: "none",
    //       y: "-100vh",
    //     }
    //   ).fromTo(
    //     image1.current,
    //     {
    //       y: "100vh",
    //     },
    //     {
    //       ease: "none",
    //       y: "-150vh",
    //     }, "<"
    //   );
    // }, comp);
    // return () => ctx.revert(); // <- Cleanup!
  }, []);

  return (
    <section className="grid h-screen grid-cols-golden grid-rows-golden" ref={comp}>
      <Image className="mix-blend-darken" src={brainProto} alt="brain-proto" />
      <Image
        className="col-start-2 row-start-2 h-[40%] object-cover object-right-top opacity-30"
        src={photo2}
        alt="neurotap prototype"
        data-scroll data-scroll-speed="0.8"
        ref={image1}
      />
      <Image
        className="col-start-3 h-full object-cover opacity-30"
        src={photo1}
        ref={image2}
        data-scroll data-scroll-speed="0.5"
        alt="neurotap prototype"
      />

      <div className="popups absolute">
        <div className="max-w-xl border-1 border-gray-500 p-2">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
        <div className="max-w-xl border-1 border-gray-500 p-2">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
        <div className="max-w-xl border-1 border-gray-500 p-2">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
      </div>
    </section>
  );
}
