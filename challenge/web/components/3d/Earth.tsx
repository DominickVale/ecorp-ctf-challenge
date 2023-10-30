import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import { Mesh, TextureLoader } from "three";

type EarthProps = {
    position?: [number, number, number];
};
function Earth(props: EarthProps) {
    const meshRef = useRef<Mesh>(null);
    const texture = useLoader(TextureLoader, "/map.png");

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    useEffect(() => {
        if (meshRef.current) {
            gsap.to(meshRef.current.rotation, {
                duration: 100,
                y: meshRef.current.rotation.y + 10,
                repeat: -1,
                ease: "none",
            });
        }
    }, []);

    return (
        <group>
            <mesh position={props.position}>
                <sphereGeometry args={[9.4, 32, 32]} />
                <meshBasicMaterial color="#2a2a2a"/>
            </mesh>
            <mesh ref={meshRef} position={props.position}>
                <sphereGeometry args={[9.5, 32, 32]} />
                <meshBasicMaterial alphaMap={texture} transparent={true} color="#575757" />
            </mesh>
        </group>
    );
}

export default Earth;
