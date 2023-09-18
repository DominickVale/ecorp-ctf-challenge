"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger";
// @ts-ignore
import Tempus from "@studio-freight/tempus";

export default function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (lenis.current) lenis.current!.scrollTo(0, { immediate: true });
  }, [pathname, searchParams, lenis]);

  useLayoutEffect(() => {
    lenis.current = new Lenis({
      duration: 2.5,
      smoothWheel: true,
    });
    lenis.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.current?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const resize = setInterval(() => {
      lenis.current!.resize();
    }, 150);

    function onFrame(time: number) {
      lenis.current!.raf(time);
    }

    const unsubscribe = Tempus.add(onFrame);

    return () => {
      unsubscribe();
      clearInterval(resize);
      lenis.current!.destroy();
      lenis.current = null;
    };
  }, []);
  return null;
}
