import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { cn } from "@/lib/utils";

import BrainModel from "./Brain";
import { degToRad } from "three/src/math/MathUtils";
import { useWindowSize } from "react-use";

type LoginSceneProps = {
    error?: boolean;
};

function LoginScene({ error }: LoginSceneProps) {
const {height} = useWindowSize()
    return (
        <div
            className={cn(
                "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-10 h-full w-full border-4 border-solid border-background-dark",
                error && "border-red-500"
            )}
        >
            <Canvas
                camera={{
                    fov: 60,
                    position: [0, 0, 500],
                }}
            >
                <Suspense fallback={null}>
                    <BrainModel
                        position={[0, -height/14, 0]}
                        rotation={[0, degToRad(-90), 0]}
                        scale={[0.6, 0.6, 0.6]}
                        wireframeColor={error ? "#f00" : "#444" }
                        dotsColor={error ? "#fd0" : "#666" }
                        floatIntensity={0.5}
                        followMouse={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default LoginScene;
