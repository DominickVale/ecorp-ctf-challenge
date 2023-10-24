"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import photo1 from "@/assets/images/device1.png";
import photo2 from "@/assets/images/device2.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { ShowcaseItem } from "@/components/ShowcaseItem";
import { createBreakpoint } from "react-use";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";

gsap.registerPlugin(ScrollTrigger);

const Parallax = dynamic(() => import("@/components/parallax").then((mod) => mod.Parallax), {
  ssr: false,
});

interface ShowcaseProps { }

const showcases: Array<ShowcaseItem> = [
  {
    number: 1,
    title: "// ELEGANCE — DURABILITY",
    description:
      "Embrace the future of human-machine symbiosis. \nExperience the elegance of Neurotap, the brain-machine implant designed to empower you in ways never thought possible and withstand the test of time with grace and \nNeurotap's durability ensures it endures the challenges of an ever-changing world. As technology advances, Neurotap evolves alongside, safeguarding its users from obsolescence.",
  },
  {
    number: 2,
    title: "// ELEGANCE — DURABILITY",
    description:
      "Embrace the future of human-machine symbiosis. \nExperience the elegance of Neurotap, the brain-machine implant designed to empower you in ways never thought possible and withstand the test of time with grace and \nNeurotap's durability ensures it endures the challenges of an ever-changing world. As technology advances, Neurotap evolves alongside, safeguarding its users from obsolescence.",
  },
  {
    number: 3,
    title: "// ELEGANCE — DURABILITY",
    description:
      "Embrace the future of human-machine symbiosis. \nExperience the elegance of Neurotap, the brain-machine implant designed to empower you in ways never thought possible and withstand the test of time with grace and \nNeurotap's durability ensures it endures the challenges of an ever-changing world. As technology advances, Neurotap evolves alongside, safeguarding its users from obsolescence.",
  },
];

const useBreakpoint = createBreakpoint({ Phone: 768, Laptop: 1280 });

export function Showcase(props: ShowcaseProps) {
  const comp = useRef(null);
  const imgSm1 = useRef(null);
  const imgBig1 = useRef(null);
  const imgSm2 = useRef(null);
  const imgBig2 = useRef(null);
  const breakpoint = useBreakpoint();
  const scrollProgres = useRef(0);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    if (activeItem) {
      gsap.utils.toArray("[data-animate-id]").forEach((el, i) => {
        if (!el) {
          console.error("no el");
          return;
        }
        console.log("break", breakpoint);
        
        
        if (breakpoint === "Laptop") {
          if (i === activeItem - 1) {
            gsap.to(el, { opacity: 1, duration: 0.5 });
          } else {
            gsap.to(el, { opacity: 0, duration: 0.5 });
          }
        } else {
          if (i === activeItem - 1) {
            gsap.to(el, { height: "auto", duration: 0.5 });
          } else {
            gsap.to(el, { height: 0, duration: 0.5 });
          }
        }
      });
    } else {
      if (breakpoint === "Laptop") {
        gsap.set("[data-animate-id]", { opacity: 0 });
      } else {
        gsap.set("[data-animate-id]", { height: 0, overflow: "hidden" });
      }
    }
  }, [activeItem, breakpoint]);

  useLayoutEffect(() => {
    const scrollTrigger: ScrollTrigger.Vars = {
      trigger: comp.current,
      start: "top top",
      end: "+=5000 top",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = Number(self.progress.toFixed(3));
        scrollProgres.current = progress;
        const total = 3;
        // 0 = none shown
        const show = Math.floor(progress * total) + 1;
        setActiveItem(show);
      },
    };

    const ctx = gsap.context((self) => {
      if (breakpoint === "Laptop") {
        gsap.set('div[data-animate-id]', { opacity: 0 });
      } else {
        gsap.set('div[data-animate-id]', { height: 0, overflow: "hidden" });
      }
      // animate with gsap
      const tl1 = gsap
        .timeline()
        .to(imgSm1.current, { y: "-190vh", duration: 1.9, ease: "sine.inOut" })
        .to(imgBig1.current, { y: "-160vh", duration: 2, ease: "sine.inOut" }, "<");
      const tl2 = gsap
        .timeline()
        .to(imgSm2.current, { y: "-190vh", duration: 1.9, ease: "sine.inOut" })
        .to(imgBig2.current, { y: "-160vh", duration: 2, ease: "sine.inOut" }, "<");

      const masterTimeline = gsap
        .timeline({ scrollTrigger })
        .add(tl1, "<")
        .add(tl2, "<50%");
    }, comp);
    return () => ctx.revert(); // <- Cleanup!
  }, [breakpoint]);

  // @todo: refactor into smaller components
  return (
    <section className="relative grid h-screen grid-cols-golden grid-rows-golden z-20" ref={comp}>
    <GoldenLayoutLines layoutType="2-col" scrollTriggered/>
      <div className="absolute left-[61.8%] top-[130vh] h-[16%] w-[14.6%]" ref={imgSm1}>
        <div className="relative h-full w-full">
          <Image
            className="object-cover object-right-top opacity-30 hover:opacity-100"
            src={photo2}
            alt="neurotap prototype small"
            fill
          />
        </div>
      </div>
      <div className="absolute left-[76.4%] top-[100vh] h-[60%] w-[23.6%]" ref={imgBig1}>
        <div className="relative h-full w-full">
          <Image
            className="object-cover opacity-30 hover:opacity-100"
            src={photo1}
            alt="neurotap prototype big"
            fill
          />
        </div>
      </div>
      <div className="absolute left-[61.8%] top-[130vh] h-[16%] w-[14.6%]" ref={imgSm2}>
        <div className="relative h-full w-full">
          <Image
            className="object-cover object-right-top opacity-30 hover:opacity-100"
            src={photo1}
            alt="neurotap prototype small2"
            fill
          />
        </div>
      </div>
      <div className="absolute left-[76.4%] top-[100vh] h-[60%] w-[23.6%]" ref={imgBig2}>
        <div className="relative h-full w-full">
          <Image
            className="object-cover opacity-30 hover:opacity-100"
            src={photo2}
            alt="neurotap prototype big2"
            fill
          />
        </div>
      </div>
      <div className="popups absolute">
        {showcases.map((showcase) => (
          <ShowcaseItem
            number={showcase.number}
            description={showcase.description}
            title={showcase.title}
            data-animate-id={"showcase-item-" + showcase.number}
            key={"showcase-item-" + showcase.number}
          />
        ))}
      </div>
    </section>
  );
}
