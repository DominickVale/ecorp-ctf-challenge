"use client";

import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useWindowSize } from "react-use";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { degToRad } from "three/src/math/MathUtils";

type GLTFResult = {
    nodes: {
        brain: THREE.Mesh;
    };
} & GLTF;

function BrainModel() {
    const { camera } = useThree();
    const { nodes } = useGLTF("/brain.gltf") as GLTFResult;
    // const {
    // brainHeight
    // } = useControls({
    //     brainHeight: { value: 0, step: 0.1, min: -100, max: 100}
    // });
    const [brainLoaded, setBrainLoaded] = useState(false);

    const brainRef = useRef<THREE.Mesh | null>(null);
    const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -200));
    const raycasterRef = useRef(new THREE.Raycaster());
    const pointOfIntersectionRef = useRef(new THREE.Vector3());
    const mouseRef = useRef(new THREE.Vector2());

    const { width, height } = useWindowSize();
    const isDesktop = width > 1000;

    function handleMouseMove(e: MouseEvent) {
        mouseRef.current.x = (e.clientX / width) * 2 - 1;
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

    useFrame(({ events }) => {
        const mouse = mouseRef.current;
        if (events?.update) events.update();
        if (!brainRef.current || !mouse) return;

        let scaleFactor = width / 1000;
        if (width > 3000) {
            scaleFactor = 1;
        } else if (width > 2560) {
            scaleFactor -= scaleFactor * 0.65;
        } else if (width > 1920) {
            scaleFactor -= scaleFactor * 0.58;
        } else if (width > 0) {
            scaleFactor -= scaleFactor * 0.2;
        }

        brainRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

        if (isDesktop) {
            // Intersect with plane
            raycasterRef.current.setFromCamera(mouse, camera);
            raycasterRef.current.ray.intersectPlane(
                planeRef.current,
                pointOfIntersectionRef.current
            );

            brainRef.current.lookAt(
                pointOfIntersectionRef.current.x,
                pointOfIntersectionRef.current.y,
                pointOfIntersectionRef.current.z
            );
        }

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

            if (isDesktop) {
                animation.to(brainRef.current.position, {
                    x: -152,
                    duration: 0.5,
                    ease: "sine.inOut",
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
                    ease: "sine.inOut",
                    scrollTrigger: {
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                        immediateRender: false,
                        scrub: true,
                    },
                });
            } else {
                gsap.set("canvas", { autoAlpha: 0.3 });
                animation.fromTo(
                    "canvas",
                    {
                        autoAlpha: 0.3,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "linear",
                        scrollTrigger: {
                            trigger: "#hero",
                            start: "-30% top",
                            end: "bottom center",
                            scrub: 0.5,
                        },
                    }
                );
                animation.to(brainRef.current.rotation, {
                    y: degToRad(90),
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
                animation.to(brainRef.current.rotation, {
                    y: degToRad(-90),
                    ease: "linear",
                    scrollTrigger: {
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                        immediateRender: false,
                        scrub: 2,
                    },
                });
                animation.to(brainRef.current.position, {
                    x: -20,
                    duration: 0.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        trigger: "footer",
                        start: "top bottom",
                        end: "top top",
                        immediateRender: false,
                        scrub: true,
                    },
                });
                animation.fromTo(
                    "canvas",
                    {
                        autoAlpha: 1,
                    },
                    {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "sine.inOut",
                        scrollTrigger: {
                            trigger: "footer",
                            start: "5% bottom",
                            end: "top top",
                            scrub: true,
                        },
                    }
                );
            }
        });
        return () => ctx.revert();
    }, [camera, isDesktop]);

    const pointsRef = useRef<THREE.Points | null>(null);

    return (
        <Float
            speed={3}
            rotationIntensity={0.3}
            floatIntensity={1}
            floatingRange={isDesktop ? [-10, 10] : [-5, 5]}
        >
            <group>
                <mesh
                    ref={brainRef}
                    geometry={(nodes["brain"] as THREE.Mesh).geometry}
                    position={isDesktop ? [180, 20, -20] : [0, height / 10, 0]}
                    rotation={isDesktop ? undefined : [0, degToRad(-85), 0]}
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
