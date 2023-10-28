"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useWindowSize } from "react-use";
import { degToRad } from "three/src/math/MathUtils";

import BrainModel from "./Brain";

const commonScrollTrigger: ScrollTrigger.Vars = {
    scrub: 1,
    invalidateOnRefresh: true,
    immediateRender: false,
    trigger: "footer",
    start: "top 40%",
    end: "top top",
};

gsap.registerPlugin(ScrollTrigger);

function BrainScene() {
    const brainRef = useRef<THREE.Group | null>(null);
    const brainMeshRef = useRef<THREE.Mesh | null>(null);
    const { width, height } = useWindowSize();
    const isDesktop = width > 1000;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!brainRef.current) return;
            const tl = gsap.timeline();

            tl.set("canvas", { autoAlpha: 0 });
            tl.set(brainRef.current.scale, { x: 0.1, y: 0.1, z: 0.1 });
            tl.set(brainRef.current.position, { x: 500 });
            tl.fromTo(
                "canvas",
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "linear",
                    scrollTrigger: commonScrollTrigger,
                }
            );

            tl.to(brainRef.current.scale, {
                x: 0.7,
                y: 0.7,
                z: 0.7,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: commonScrollTrigger,
            });
            tl.to(brainRef.current.position, {
                x: 100,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: commonScrollTrigger,
            });
        });

        return () => ctx.revert();
    }, []);

    return <BrainModel ref={brainRef} />;
}

function BlogScene() {
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
                </Suspense>
            </Canvas>
        </div>
    );
}

export default BlogScene;
