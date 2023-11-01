import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";


import GlobeNetwork from "./GlobeNetwork";
import { useWindowSize } from "react-use";
import Earth from "./Earth";

type C2SceneProps = { isStopped: boolean };

function C2Scene({isStopped}: C2SceneProps) {
const { height } = useWindowSize()

    return (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full border-4 border-solid border-background-dark">
            <Canvas
                camera={{
                    fov: 60,
                    position: [0, 0, 50],
                }}
            >
                <Suspense fallback={null}>
                    <GlobeNetwork position={[0.35,-height/175,0]} isStopped={isStopped} />
                    <Earth position={[0.35,-height/175, 0]} isStopped={isStopped} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default C2Scene;
