"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use";
import { degToRad } from "three/src/math/MathUtils";

import BrainModel from "./Brain";

const commonScrollTrigger: ScrollTrigger.Vars = {};

gsap.registerPlugin(ScrollTrigger);

function BrainScene() {
    const brainRef = useRef<THREE.Group | null>(null);
    const brainMeshRef = useRef<THREE.Mesh | null>(null);
    const { width, height } = useWindowSize();
    const isDesktop = width > 1000;

    const onResize = (e: any) => {
        ScrollTrigger.refresh();
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
    }, []);

    // cleanup
    useLayoutEffect(
        () => () => {
            window.removeEventListener("resize", onResize);
        },
        []
    );

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!brainRef.current) return;

            if (isDesktop) {
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
                            autoAlpha: isDesktop ? 0.3 : 0.2,
                        },
                        {
                            autoAlpha: 1,
                            duration: 2,
                            ease: "linear",
                        }
                    )
                    .fromTo(
                        brainRef.current.scale,
                        {
                            x: 0.8,
                            y: 0.8,
                            z: 0.8,
                        },
                        {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 1,
                            ease: "sine.inOut",
                        },
                        "<"
                    )
                    .to(
                        brainRef.current.position,
                        {
                            x: -380,
                            duration: 2,
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
                        x: 80,
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
            } else {
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
                            autoAlpha: isDesktop ? 0.3 : 0.2,
                        },
                        {
                            autoAlpha: 1,
                            duration: 0.5,
                            ease: "linear",
                        }
                    )

                    .to(brainRef.current.rotation, {
                        y: 2,
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
                            x: 0.8,
                            y: 0.8,
                            z: 0.8,
                            duration: 0.5,
                            ease: "sine.inOut",
                        },
                        "<"
                    );
            }
        });

        return () => ctx.revert();
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
