"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import BrainModel from "./Brain";

function BrainScene() {
    const brainRef = useRef<THREE.Group | null>(null);

    return <BrainModel ref={brainRef} position={[100, 20, 20]} scale={[0.8, 0.8, 0.8]} />;
}

function BlogScene() {
    return (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full">
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
