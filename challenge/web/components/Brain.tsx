"use client";

import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = {
    nodes: {
        brain: THREE.Mesh;
    };
} & GLTF;

function BrainModel() {
    const { camera } = useThree();
    const { nodes } = useGLTF("/brain.gltf") as GLTFResult;
    // const {
    // xPos, yPos, zPos
    // brainColor
    // } = useControls({
    //     xPos: debugRot,
    //     yPos: debugRot,
    //     zPos: debugRot,
    // brainColor: { value: "#DDDFDF"}
    // });
    const [brainLoaded, setBrainLoaded] = useState(false);

    const brainRef = useRef<THREE.Mesh | null>(null);
    const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -200));
    const raycasterRef = useRef(new THREE.Raycaster());
    const pointOfIntersectionRef = useRef(new THREE.Vector3());
    const mouseRef = useRef(new THREE.Vector2());

    function handleMouseMove(e: MouseEvent) {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }

    useEffect(() => {
        // "hack" since useFrame's mouse doesn't update when canvas loses focus.
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        if (brainRef.current) setBrainLoaded(true);
    }, [brainRef.current]);

    useFrame(({ clock }) => {
        if (!brainRef.current || !mouseRef.current) return;

        // Intersect with plane
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        raycasterRef.current.ray.intersectPlane(planeRef.current, pointOfIntersectionRef.current);

        brainRef.current.lookAt(
            pointOfIntersectionRef.current.x,
            pointOfIntersectionRef.current.y,
            pointOfIntersectionRef.current.z
        );
        if (brainRef.current && pointsRef.current) {
            pointsRef.current.position.copy(brainRef.current.position);
            pointsRef.current.rotation.copy(brainRef.current.rotation);
            pointsRef.current.scale.copy(brainRef.current.scale);
        }
    });

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            if (!brainRef.current) return;

            const animation = gsap.timeline();

            animation.to(brainRef.current.position, {
                x: -152,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "-5% top",
                    end: "bottom top",
                    immediateRender: false,
                    scrub: 1,
                },
            });
            animation.to(brainRef.current.position, {
                x: 210,
                duration: 0.5,
                ease: "linear",
                scrollTrigger: {
                    trigger: "footer",
                    start: "top bottom",
                    end: "top top",
                    immediateRender: false,
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [camera]);

    const pointsRef = useRef<THREE.Points | null>(null);

    return (
        <Float speed={3} rotationIntensity={0.1} floatIntensity={1} floatingRange={[-10, 10]}>
            <group>
                <mesh
                    ref={brainRef}
                    geometry={(nodes["brain"] as THREE.Mesh).geometry}
                    position={[180, 20, -20]}
                >
                    <meshBasicMaterial color="#969494" wireframe />
                </mesh>
                {brainLoaded && (
                    <points ref={pointsRef}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={brainRef.current?.geometry.attributes.position.count || 0}
                                array={
                                    brainRef.current?.geometry.attributes.position.array ||
                                    undefined
                                }
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <pointsMaterial
                            size={3}
                            color="#000000"
                            sizeAttenuation
                            depthWrite={false}
                        />
                    </points>
                )}
            </group>
        </Float>
    );
}

function BrainBackground() {
    return (
        <Canvas
            camera={{
                fov: 60,
                position: [0, 0, 360],
            }}
        >
            <Suspense fallback={null}>
                <BrainModel />
            </Suspense>
        </Canvas>
    );
}

export default BrainBackground;
