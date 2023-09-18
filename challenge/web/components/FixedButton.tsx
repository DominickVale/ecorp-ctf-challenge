"use client"

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Button from "./buttons/button";

interface FixedButtonProps {}

export function FixedButton(props: FixedButtonProps) {
  const fixedButton = useRef(null);
  useLayoutEffect(() => {
      gsap.to(fixedButton.current, {
        scrollTrigger: {
          trigger: "#hero",
          start: "center-80% top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        duration: 0.5,
        ease: "sine.inOut",
      });
  });

  return (
    <div className="fixed bottom-0 left-0 h-[5.4rem] w-full px-6 pb-4 md:hidden" ref={fixedButton}>
      <Button size="fluid">ORDER NOW</Button>
    </div>
  );
}
