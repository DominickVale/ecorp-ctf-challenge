import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Earth from "./Earth";
import GlobeNetwork from "./GlobeNetwork";

type FooterSceneProps = {};

function FooterScene(props: FooterSceneProps) {
    return (
        <div
            id="footerGlobe"
            className="pointer-events-none absolute right-[10%] top-[16%] z-10 h-[16rem] w-[16rem] opacity-30 lg:opacity-100"
        >
            <Canvas
                camera={{
                    fov: 60,
                    position: [0, 0, 25],
                }}
            >
                <Suspense fallback={null}>
                    <GlobeNetwork position={[0.35, 0, 0]} />
                    <Earth position={[0.35, 0, 0]} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default FooterScene;
