"use client";

import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Suspense, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { degToRad } from "three/src/math/MathUtils";

import { GSAP_DESKTOP_MEDIA, GSAP_MOBILE_MEDIA } from "@/common/constants";
import BrainModel from "./Brain";

gsap.registerPlugin(ScrollTrigger);

function BrainScene() {
    const brainRef = useRef<THREE.Mesh | null>(null);

    const onResize = (e: any) => {
        ScrollTrigger.refresh();
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(GSAP_DESKTOP_MEDIA, () => {
            if (!brainRef.current) return;
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    scrub: 1,
                    start: "top top",
                    end: "bottom+=100% bottom",
                    invalidateOnRefresh: true,
                    immediateRender: false,
                },
            })
                .fromTo(
                    "canvas",
                    {
                        autoAlpha: 0.3,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "linear",
                    }
                )

                .to(
                    brainRef.current.position,
                    {
                        x: -180,
                        duration: 0.5,
                        ease: "sine.inOut",
                    },
                    "<"
                );

            gsap.timeline({
                scrollTrigger: {
                    trigger: "footer",
                    scrub: 1,
                    start: "top-=50% center",
                    end: "bottom bottom",
                    invalidateOnRefresh: true,
                    immediateRender: false,
                },
            })
                .to(brainRef.current.position, {
                    x: 200,
                    duration: 0.5,
                    ease: "sine.inOut",
                })
                .to(
                    brainRef.current.scale,
                    {
                        x: 0.8,
                        y: 0.8,
                        z: 0.8,
                        duration: 0.5,
                        ease: "sine.inOut",
                    },
                    "<"
                );
        });
        mm.add(GSAP_MOBILE_MEDIA, () => {
            if (!brainRef.current) return;
            gsap.set("canvas", { autoAlpha: 0.3 });
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero",
                    scrub: 1,
                    start: "top top",
                    end: "bottom+=100% bottom",
                    invalidateOnRefresh: true,
                    immediateRender: false,
                },
            })
                .fromTo(
                    "canvas",
                    {
                        autoAlpha: 0.2,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "linear",
                    }
                )
                .to(
                    brainRef.current.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.5,
                        ease: "sine.inOut",
                    },
                    "<"
                )
                .to(brainRef.current.rotation, {
                    y: degToRad(90),
                    duration: 1,
                    ease: "linear",
                });

            gsap.timeline({
                scrollTrigger: {
                    trigger: "footer",
                    scrub: 1,
                    start: "top-=50% center",
                    end: "bottom bottom",
                    invalidateOnRefresh: true,
                    immediateRender: false,
                },
            })
                .to(brainRef.current.rotation, {
                    y: degToRad(-90),
                    ease: "linear",
                })
                .to(
                    brainRef.current.scale,
                    {
                        x: 0.2,
                        y: 0.2,
                        z: 0.2,
                        duration: 0.5,
                        ease: "sine.inOut",
                    },
                    "<"
                );
        });
        return () => mm.revert();
    }, []);

    return <BrainModel ref={brainRef} />;
}

function FrontPageScene() {
    // const globeViewRef = useRef<HTMLDivElement>(document.querySelector("#footerGlobe")!);

    return (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full">
            <Canvas
                camera={{
                    fov: 60,
                    position: [0, 0, 360],
                }}
            >
                <Suspense fallback={null}>
                    <BrainScene />
                    {/* <View track={globeViewRef}> */}
                    {/*     <Globe /> */}
                    {/* </View> */}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default FrontPageScene;
