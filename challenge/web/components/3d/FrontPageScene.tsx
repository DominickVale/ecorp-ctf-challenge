"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use";
import { degToRad } from "three/src/math/MathUtils";

import BrainModel from "./Brain";

const commonScrollTrigger: ScrollTrigger.Vars = {
    scrub: 1,
    // invalidateOnRefresh: true,
    immediateRender: false,
};

gsap.registerPlugin(ScrollTrigger);

function BrainScene() {
    const brainRef = useRef<THREE.Group | null>(null);
    const brainMeshRef = useRef<THREE.Mesh | null>(null);
    const { width, height } = useWindowSize();
    const isDesktop = width > 1000;

    const onResize = (e: any) => {
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

            const tl = gsap.timeline();

            tl.fromTo(
                "canvas",
                {
                    autoAlpha: isDesktop ? 0.3 : 0.2,
                },
                {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "linear",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "#hero",
                        start: "-30% top",
                        end: "bottom center",
                    },
                }
            );

            if (isDesktop) {
                tl.to(brainRef.current.position, {
                    x: -380,
                    duration: 0.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "#hero",
                        start: "-5% top",
                        end: "bottom top",
                    },
                });
                tl.to(brainRef.current.position, {
                    x: 80,
                    duration: 0.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                    },
                });
                tl.to(brainRef.current.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    duration: 0.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                    },
                });
            } else if (brainMeshRef.current) {
                gsap.set("canvas", { autoAlpha: 0.3 });
                tl.to(brainMeshRef.current.rotation, {
                    y: 2,
                    duration: 1,
                    ease: "linear",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "#hero",
                        start: "5% top",
                        end: "bottom top",
                    },
                });
                tl.to(brainMeshRef.current.rotation, {
                    y: degToRad(-90),
                    ease: "linear",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                    },
                });
                tl.to(brainRef.current.position, {
                    x: -20,
                    duration: 0.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        ...commonScrollTrigger,
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                    },
                });
                tl.fromTo(
                    "canvas",
                    {
                        autoAlpha: 1,
                    },
                    {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "sine.inOut",
                        scrollTrigger: {
                            ...commonScrollTrigger,
                            trigger: "footer",
                            start: "5% bottom",
                            end: "top top",
                        },
                    }
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
