import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import { Mesh, MeshBasicMaterial, TextureLoader } from "three";
import { useIsomorphicLayoutEffect } from "react-use";

type EarthProps = {
    position?: [number, number, number];
    isStopped?: boolean;
};
function Earth(props: EarthProps) {
    const { isStopped } = props;
    const meshRef = useRef<Mesh>(null);
    const matRef = useRef<MeshBasicMaterial>(null);
    const texture = useLoader(TextureLoader, "/map.png");

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (meshRef.current && matRef.current) {
                if (isStopped) {
                    gsap.to(matRef.current.color, {
                        duration: 2,
                        r: 1,
                        g: 0,
                        b: 0,
                        ease: "linear",
                    });
                } else {
                    gsap.to(meshRef.current.rotation, {
                        duration: 100,
                        y: meshRef.current.rotation.y + 10,
                        repeat: -1,
                        ease: "none",
                    });
                }
            }
        });
        return () => ctx.revert();
    }, [isStopped]);

    return (
        <group>
            <mesh position={props.position}>
                <sphereGeometry args={[9.4, 32, 32]} />
                <meshBasicMaterial color="#2a2a2a" />
            </mesh>
            <mesh ref={meshRef} position={props.position}>
                <sphereGeometry args={[9.5, 32, 32]} />
                <meshBasicMaterial
                    ref={matRef}
                    alphaMap={texture}
                    transparent={true}
                    color="#575757"
                />
            </mesh>
        </group>
    );
}

export default Earth;
