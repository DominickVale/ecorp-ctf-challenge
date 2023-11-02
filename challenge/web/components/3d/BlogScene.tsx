"use client"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import BrainModel from "./Brain";

function BrainScene() {
    return <BrainModel position={[80, -20, 20]} scale={[0.65, 0.65, 0.65]} />;
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
